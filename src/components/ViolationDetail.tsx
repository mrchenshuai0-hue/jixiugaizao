import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, ShieldAlert, Users, Home, ClipboardList, Camera, Eye, Plus } from 'lucide-react';
import { api } from '../api';
import { Case, Enterprise } from '../types';

interface ViolationDetailProps {
  id: string;
  onBack: () => void;
}

export default function ViolationDetail({ id, onBack }: ViolationDetailProps) {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'places' | 'suspects' | 'victims'>('places');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const [result, entList] = await Promise.all([
          api.case.getById(id),
          api.enterprise.getAll()
        ]);
        setCaseData(result);
        setEnterprises(entList);
      } catch (error) {
        console.error('Failed to fetch case detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F3]">
        <div className="text-center font-sans">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#419EFF] mx-auto mb-3"></div>
          <p className="text-xs text-gray-400 font-medium">正在拉取案事件详情大档案柜...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F3] p-6">
        <div className="text-center bg-white border border-gray-200 rounded-lg p-8 max-w-sm shadow-md">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <ShieldAlert size={24} />
          </div>
          <h4 className="text-sm font-bold text-gray-800">未检索到关联案件</h4>
          <p className="text-xs text-gray-500 mt-1">该违法违规编号对应的底册明细已失效或已被管理员清空。</p>
          <button 
            onClick={onBack} 
            className="mt-4 px-4 py-1.5 bg-[#419EFF] text-white text-xs font-bold rounded hover:bg-blue-600 transition-all cursor-pointer"
          >
            返回上一级列表
          </button>
        </div>
      </div>
    );
  }

  // 获取该案件关联的企业场所
  const associatedCompanies = enterprises.filter(ent => {
    // 兼容匹配：支持IDs匹配或者名称完全一致匹配
    if (caseData.associatedEnterpriseIds?.includes(ent.id)) return true;
    if (caseData.associatedPlaceName && caseData.associatedPlaceName.includes(ent.name)) return true;
    if (caseData.company && caseData.company === ent.name) return true;
    return false;
  });

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] overflow-hidden font-sans">
      
      {/* 顶部标题与操作栏 (Style matched with EnterpriseDetail) */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
           <h2 className="text-xl font-bold text-gray-800">{caseData.caseName || caseData.title}</h2>
           <span className="px-2 py-0.5 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-xs">{caseData.caseCategory || caseData.type}</span>
           <span className={`px-2 py-0.5 rounded text-xs border ${
             caseData.isProblemPlaceAssociated === '已关联' 
               ? 'bg-green-50 text-green-700 border-green-200' 
               : caseData.isProblemPlaceAssociated === '不关联'
               ? 'bg-gray-50 text-gray-500 border-gray-200'
               : 'bg-orange-50 text-orange-700 border-orange-200'
           }`}>{caseData.isProblemPlaceAssociated || '未关联'}</span>
           <span className="text-[11px] bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded font-mono font-bold">
             案件编号: {caseData.caseNo || caseData.id}
           </span>
        </div>
        <div className="flex gap-3">
          <button 
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium cursor-pointer"
          >
            <ArrowLeft size={16} className="mr-1.5" /> 返回列表
          </button>
        </div>
      </div>

      {/* 滚动主面板区 */}
      <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
        
        {/* 一、案件基本信息 - Grid arranged 3 fields per row */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              案件基本信息
            </h3>
          </div>
          <div className="p-6 space-y-6">
            
            {/* 3列式网格表格 (Requirement 1 & 2: 每行3个字段排列，纵向展示) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
              <ReadOnlyField label="案件编号" value={caseData.caseNo} required />
              <ReadOnlyField label="案件名称" value={caseData.caseName || caseData.title} required />
              <ReadOnlyField label="案件类别" value={caseData.caseCategory || caseData.type} required />
              
              <ReadOnlyField label="案件类型" value={caseData.caseType || '行政案件'} />
              <ReadOnlyField label="案件开始时间" value={caseData.caseStartTime || caseData.date} required />
              <ReadOnlyField label="案件结束时间" value={caseData.caseEndTime || caseData.date} />
              
              <ReadOnlyField label="案件状态" value={caseData.caseStatus || caseData.status} />
              <ReadOnlyField label="发案派出所" value={caseData.dispatchPoliceStation || '一号地区派出所'} />
              <ReadOnlyField label="警情号" value={caseData.alarmNo || '暂无外接警情号'} />
              
              <ReadOnlyField label="报警时间" value={caseData.alarmTime || '-'} />
              <ReadOnlyField label="案件来源" value={caseData.caseSource || '执法办案系统'} />
              {caseData.caseSource === '民警补登' && (
                <ReadOnlyField label="补登民警" value={caseData.registrationOfficer || '系统管理员'} />
              )}
              
              <ReadOnlyField label="发案地行政区划" value={caseData.caseRegion || caseData.crimeSceneDistrict || '福州市'} />
              <ReadOnlyField label="发案地详细地址" value={caseData.crimeSceneAddress || '暂无发案详细地址'} />
              <div className="hidden md:block"></div>
            </div>

            {/* 简要案情 */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-700 block text-left">简要案情</label>
              <div className="p-3 bg-gray-50 border border-gray-300 rounded text-xs text-gray-600 leading-relaxed font-sans text-left min-h-[80px]">
                {caseData.briefCase || caseData.description || '暂无详细简要案情记录。'}
              </div>
            </div>

            {/* 处罚措施 */}
            <div className="flex flex-col gap-2 bg-amber-50/20 border border-dashed border-amber-200 rounded p-4">
              <label className="text-xs font-bold text-amber-800 block text-left mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                针对性处罚措施/行政强制指令
              </label>
              <div className="text-xs text-gray-700 leading-relaxed text-left">
                {caseData.punishmentMeasures || '暂无制约处罚措施纪录。'}
              </div>
            </div>

          </div>
        </section>

        {/* 二、案件办理及流转进度信息 - Grid arranged 3 fields per row */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              案件办理及流转进度信息
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
              <ReadOnlyField label="立案时间" value={caseData.filingTime} />
              <ReadOnlyField label="立案单位" value={caseData.filingUnit} />
              <ReadOnlyField label="立案人" value={caseData.filingOfficer} />

              <ReadOnlyField label="移送时间" value={caseData.transferTime} />
              <ReadOnlyField label="移送单位" value={caseData.transferUnit} />
              <ReadOnlyField label="移送人" value={caseData.transferOfficer} />

              <ReadOnlyField label="受理/接收时间" value={caseData.acceptanceTime} />
              <ReadOnlyField label="受理/接收单位" value={caseData.acceptanceUnit} />
              <ReadOnlyField label="受理人" value={caseData.acceptor} />

              <ReadOnlyField label="破案时间" value={caseData.solutionTime} />
              <ReadOnlyField label="破案单位" value={caseData.solutionUnit} />
              <ReadOnlyField label="破案人" value={caseData.solutionOfficer} />

              <ReadOnlyField label="结案时间" value={caseData.closingTime} />
              <ReadOnlyField label="销案时间" value={caseData.cancellationTime} />
              
              <div className="hidden md:block"></div>
            </div>
          </div>
        </section>

        {/* 三、案件关联信息 (涉案场所, 嫌疑人, 受害人) */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          
          {/* 页签 Tab 头部 */}
          <div className="bg-[#FAFBFD] border-b border-gray-200 flex items-center justify-between px-5 py-1 shrink-0">
            <div className="flex space-x-6">
              <button 
                type="button"
                onClick={() => setActiveTab('places')}
                className={`py-3.5 text-xs font-bold transition-all border-b-2 relative shrink-0 cursor-pointer ${
                  activeTab === 'places' ? 'text-[#419EFF] border-[#419EFF]' : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                涉案场所 ({associatedCompanies.length})
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('suspects')}
                className={`py-3.5 text-xs font-bold transition-all border-b-2 relative shrink-0 cursor-pointer ${
                  activeTab === 'suspects' ? 'text-[#419EFF] border-[#419EFF]' : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                嫌疑人 ({caseData.suspects?.length || 0})
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('victims')}
                className={`py-3.5 text-xs font-bold transition-all border-b-2 relative shrink-0 cursor-pointer ${
                  activeTab === 'victims' ? 'text-[#419EFF] border-[#419EFF]' : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                受害人 ({caseData.victims?.length || 0})
              </button>
            </div>
          </div>

          {/* 页签内容区 */}
          <div className="p-4">
            
            {/* 1. 涉案场所页签 */}
            {activeTab === 'places' && (
              <div className="overflow-x-auto border border-gray-150 rounded bg-white">
                <table className="w-full text-left text-xs text-gray-600 border-collapse">
                  <thead>
                    <tr className="bg-[#FAFBFD] font-bold text-gray-700 border-b border-gray-200">
                      <th className="px-4 py-2.5">单位名称</th>
                      <th className="px-4 py-2.5">统一社会信用代码</th>
                      <th className="px-4 py-2.5">行业分类</th>
                      <th className="px-4 py-2.5">单位地址</th>
                      <th className="px-4 py-2.5">单位状态</th>
                      <th className="px-4 py-2.5">法定代表人</th>
                      <th className="px-4 py-2.5">法人联系电话</th>
                      <th className="px-4 py-2.5">法人证件号码</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150">
                    {associatedCompanies.length > 0 ? (
                      associatedCompanies.map((ent) => (
                        <tr key={ent.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-2.5 font-bold text-gray-800">{ent.name}</td>
                          <td className="px-4 py-2.5 font-mono text-gray-500">{ent.uscc || ent.enterpriseCode || '91420106MA49K2CX7B'}</td>
                          <td className="px-4 py-2.5">
                            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded font-medium border border-slate-200">
                              {ent.category || '汽车维修服务'}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-gray-500 truncate max-w-[200px]" title={ent.address || ent.registeredAddress}>
                            {ent.address || ent.registeredAddress || '福州市鼓楼区安达路15号'}
                          </td>
                          <td className="px-4 py-2.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ent.status === '正常营业' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-500 border border-red-100'
                            }`}>
                              {ent.status || '正常营业'}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-gray-800 font-medium">{ent.legalRep || '赵先生'}</td>
                          <td className="px-4 py-2.5 font-mono text-gray-500">{ent.legalRepPhone || '13911112222'}</td>
                          <td className="px-4 py-2.5 font-mono text-gray-500">350102197508210344</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-gray-400">
                          暂无关联的涉案场所。您可通过违法案件管理列表上的操作下拉菜单进行“关联问题场所”。
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* 翻页区 */}
                {associatedCompanies.length > 0 && (
                  <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-bold">
                    <span>场所列表数据: {associatedCompanies.length} 条</span>
                    <div className="flex gap-1">
                      <button className="px-2 py-0.5 border border-gray-200 rounded bg-white text-gray-300" disabled>上一页</button>
                      <button className="px-2 py-0.5 border border-[#419EFF] rounded bg-[#419EFF] text-white">1</button>
                      <button className="px-2 py-0.5 border border-gray-200 rounded bg-white text-gray-300" disabled>下一页</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. 嫌疑人页签 */}
            {activeTab === 'suspects' && (
              <div className="overflow-x-auto border border-gray-150 rounded bg-white">
                <table className="w-full text-left text-xs text-gray-600 border-collapse">
                  <thead>
                    <tr className="bg-[#FAFBFD] font-bold text-gray-700 border-b border-gray-200">
                      <th className="px-4 py-2.5">姓名</th>
                      <th className="px-4 py-2.5">性别</th>
                      <th className="px-4 py-2.5">身份证号</th>
                      <th className="px-4 py-2.5">手机号</th>
                      <th className="px-4 py-2.5">涉案状态（审查阶段）</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150">
                    {caseData.suspects && caseData.suspects.length > 0 ? (
                      caseData.suspects.map((susp) => (
                        <tr key={susp.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-2.5 font-bold text-gray-800">{susp.name}</td>
                          <td className="px-4 py-2.5">{susp.gender}</td>
                          <td className="px-4 py-2.5 font-mono text-gray-500">{susp.idCard}</td>
                          <td className="px-4 py-2.5 font-mono text-gray-500">{susp.phone}</td>
                          <td className="px-4 py-2.5">
                            <span className="px-2 py-0.5 bg-red-50 text-red-650 border border-red-150 text-[10px] rounded font-bold">
                              {susp.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-400">该案事件记录中暂无在逃/在案涉案嫌疑人建档档案。</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* 翻页区 */}
                {caseData.suspects && caseData.suspects.length > 0 && (
                  <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-bold">
                    <span>嫌疑人列表: {caseData.suspects.length} 条</span>
                    <div className="flex gap-1">
                      <button className="px-2 py-0.5 border border-gray-200 rounded bg-white text-gray-300" disabled>上一页</button>
                      <button className="px-2 py-0.5 border border-[#419EFF] rounded bg-[#419EFF] text-white">1</button>
                      <button className="px-2 py-0.5 border border-gray-200 rounded bg-white text-gray-300" disabled>下一页</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. 受害人页签 */}
            {activeTab === 'victims' && (
              <div className="overflow-x-auto border border-gray-150 rounded bg-white">
                <table className="w-full text-left text-xs text-gray-600 border-collapse">
                  <thead>
                    <tr className="bg-[#FAFBFD] font-bold text-gray-700 border-b border-gray-200">
                      <th className="px-4 py-2.5">姓名</th>
                      <th className="px-4 py-2.5">性别</th>
                      <th className="px-4 py-2.5">身份证号</th>
                      <th className="px-4 py-2.5">手机号</th>
                      <th className="px-4 py-2.5">身体、伤情与财产损失详情说明</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150">
                    {caseData.victims && caseData.victims.length > 0 ? (
                      caseData.victims.map((vict) => (
                        <tr key={vict.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-2.5 font-bold text-gray-800">{vict.name}</td>
                          <td className="px-4 py-2.5">{vict.gender}</td>
                          <td className="px-4 py-2.5 font-mono text-gray-500">{vict.idCard}</td>
                          <td className="px-4 py-2.5 font-mono text-gray-500">{vict.phone}</td>
                          <td className="px-4 py-2.5 text-gray-700 font-medium">{vict.details}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-400">该案事件记录中暂无受害者（自然人/受害企业）建档纪录。</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* 翻页区 */}
                {caseData.victims && caseData.victims.length > 0 && (
                  <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-bold">
                    <span>受害人列表: {caseData.victims.length} 条</span>
                    <div className="flex gap-1">
                      <button className="px-2 py-0.5 border border-gray-200 rounded bg-white text-gray-300" disabled>上一页</button>
                      <button className="px-2 py-0.5 border border-[#419EFF] rounded bg-[#419EFF] text-white">1</button>
                      <button className="px-2 py-0.5 border border-gray-200 rounded bg-white text-gray-300" disabled>下一页</button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </section>

      </div>

      {/* 图片放大预览模态框 */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/85 z-[120] flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-black rounded overflow-hidden">
            <img 
              src={previewImage} 
              alt="详情图片预览" 
              className="max-w-full max-h-[85vh] object-contain shadow-2xl mx-auto" 
              referrerPolicy="no-referrer"
            />
            <p className="text-center text-white/80 text-xs py-3 bg-zinc-900 border-t border-zinc-800 tracking-wide font-sans">
              随案扫描凭质电子凭单 (点击任何空白区域关闭预览)
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

// 辅助 ReadOnly 字段 (Requirement 2: 保持与企业内页一致的纵向盒模型样式)
function ReadOnlyField({ label, value, required, className = "" }: { label: string; value?: string | number; required?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-semibold text-gray-700 flex items-center">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </label>
      <div className="h-9 px-3 flex items-center bg-[#FAFCFF] border border-gray-200 rounded text-xs text-gray-700 font-medium truncate border-solid">
        {value || '-'}
      </div>
    </div>
  );
}
