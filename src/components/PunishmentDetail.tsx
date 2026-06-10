import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer, Download, FileText, AlertCircle, ShieldCheck, CheckCircle2, History, ChevronRight, Briefcase, Users, User, Landmark, Camera } from 'lucide-react';
import { api } from '../api';
import { Case, Enterprise } from '../types';

interface PunishmentDetailProps {
  id: string;
  onBack: () => void;
}

export default function PunishmentDetail({ id, onBack }: PunishmentDetailProps) {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const entList = await api.enterprise.getAll();
        setEnterprises(entList);

        // 优先从 localstorage 数据池读取以同步最新的流转及查处状态
        const localVal = localStorage.getItem('case_supervisions');
        let found: Case | null = null;
        if (localVal) {
          const list = JSON.parse(localVal);
          found = list.find((item: any) => item.id === id);
        }

        if (found) {
          setCaseData(found);
        } else {
          const result = await api.case.getById(id);
          setCaseData(result as any);
        }
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
      <div className="flex items-center justify-center h-full bg-[#F5F5F5]">
        <div className="text-center font-sans">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#419EFF] mx-auto mb-3"></div>
          <p className="text-xs text-gray-500">正在调取督查卷宗档案...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F5] font-sans">
        <div className="text-center p-6 bg-white border rounded">
          <AlertCircle size={36} className="text-[#fa5e45] mx-auto mb-3" />
          <p className="text-xs text-gray-500 font-bold">对不起，未查阅到对应挂账督办文书。</p>
          <button onClick={onBack} className="mt-3 text-xs text-[#419EFF] hover:underline font-bold">返回核查列表</button>
        </div>
      </div>
    );
  }

  const data = caseData;
  const associatedEntIds = data.associatedEnterpriseIds || [];
  const linkedEnts = enterprises.filter(e => associatedEntIds.includes(e.id));

  // 获取流转状态对应的背景色
  const getStatusTextClasses = (status: string) => {
    switch (status) {
      case '待下发': return 'bg-orange-50 text-orange-600 border-orange-100';
      case '督办完成': return 'bg-green-50 text-green-700 border-green-200';
      case '已签收 (查处中)': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-blue-50 text-blue-600 border-blue-200';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] overflow-hidden font-sans">
      
      {/* 顶部标题与操作栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-xs z-10">
        <div className="flex items-center gap-3 text-left">
          <h2 className="text-sm font-bold text-gray-800">
            场所挂牌督办件详情卷宗
          </h2>
          <span className={`px-2 py-0.5 rounded text-[10px] border font-bold ${getStatusTextClasses(data.supervisionStatus || '待下发')}`}>
            {data.supervisionStatus || '待下发'}
          </span>
          <span className="text-[10px] text-gray-400 font-mono">#{id}</span>
        </div>
        <div className="flex gap-2.5">
          <button className="px-3.5 py-1.5 bg-white border border-gray-300 text-gray-650 rounded text-xs font-bold hover:bg-gray-50 transition-all flex items-center">
            <Printer size={13} className="mr-1.5" /> 打印卷宗
          </button>
          <button className="px-3.5 py-1.5 bg-[#419EFF] text-white rounded text-xs font-bold hover:bg-blue-600 transition-all shadow-xs flex items-center">
            <Download size={13} className="mr-1.5" /> 导出归档文书
          </button>
          <button 
            onClick={onBack}
            className="px-3.5 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-xs font-bold hover:bg-gray-50 transition-all flex items-center"
          >
            <ArrowLeft size={13} className="mr-1" /> 返回列表
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar pb-16 text-left">
        
        {/* 1. 案件基本信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#EBF3FE] flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-blue-500 rounded-full"></span>
            <span className="text-xs font-bold text-gray-800">一、案件基本信息</span>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
              <ReadOnlyField label="案件编号" value={data.caseNo} required />
              <ReadOnlyField label="案件名称" value={data.caseName || data.title} required />
              <ReadOnlyField label="案件类别" value={data.caseCategory} required />
              
              <ReadOnlyField label="案件类型" value={data.caseType || '行政处罚案件'} />
              <ReadOnlyField label="案件开始时间" value={data.caseStartTime} />
              <ReadOnlyField label="案件结束时间" value={data.caseEndTime} />
              
              <ReadOnlyField label="案件状态" value={data.caseStatus || data.status} />
              <ReadOnlyField label="发案派出所" value={data.dispatchPoliceStation || '未指派'} />
              <ReadOnlyField label="警情号" value={data.alarmNo} />
              
              <ReadOnlyField label="报警时间" value={data.alarmTime} />
              <ReadOnlyField label="发案地行政区划" value={data.crimeSceneDistrict} />
              <ReadOnlyField label="发案地详细地址" value={data.crimeSceneAddress} />
            </div>

            <div className="space-y-1 text-xs text-left">
              <label className="block text-xs font-bold text-gray-600">简要案情描述</label>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-gray-700 leading-relaxed text-xs min-h-[60px] whitespace-pre-wrap">
                {data.briefCase || '暂无详细案情描述。'}
              </div>
            </div>

            <div className="space-y-1 text-xs text-left">
              <label className="block text-xs font-bold text-gray-600">针对性处罚措施/行政强制指令</label>
              <div className="p-3 bg-blue-50/20 border border-blue-200 text-blue-900 rounded leading-relaxed text-xs min-h-[50px] whitespace-pre-wrap font-medium">
                {data.punishmentMeasures || '暂无登记的处罚措施/整改指令。'}
              </div>
            </div>
          </div>
        </section>

        {/* 2. 案件办理信息 (Synced with form fields) */}
        <section className="bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#E8F8F5] flex items-center">
            <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full"></span>
              二、案件办理时效信息
            </h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
              <ReadOnlyField label="立案时间" value={data.filingTime} />
              <ReadOnlyField label="立案单位" value={data.filingUnit} />
              <ReadOnlyField label="立案人" value={data.filingOfficer} />

              <ReadOnlyField label="移送时间" value={data.transferTime} />
              <ReadOnlyField label="移送单位" value={data.transferUnit} />
              <ReadOnlyField label="移送人" value={data.transferOfficer} />

              <ReadOnlyField label="受理/接收时间" value={data.acceptanceTime} />
              <ReadOnlyField label="受理/接收单位" value={data.acceptanceUnit} />
              <ReadOnlyField label="受理人" value={data.acceptor} />

              <ReadOnlyField label="破案时间" value={data.solutionTime} />
              <ReadOnlyField label="破案单位" value={data.solutionUnit} />
              <ReadOnlyField label="破案人" value={data.solutionOfficer} />

              <ReadOnlyField label="结案时间" value={data.closingTime} />
              <ReadOnlyField label="销案时间" value={data.cancellationTime} />
            </div>
          </div>
        </section>

        {/* 3. 案件关联信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#FCF3EA] flex items-center">
            <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-orange-500 rounded-full"></span>
              三、案件关联信息 (多方参与要素)
            </h3>
          </div>
          
          <div className="p-5 space-y-6">
            {/* 关联涉案企业/网点 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Briefcase size={14} className="text-orange-600" />
                <span className="text-[11px] font-black text-gray-700">关联涉案企业/营业网点名册：</span>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded bg-white">
                <table className="w-full border-collapse text-[10.5px] text-left">
                  <thead className="bg-[#fdfaf7] text-gray-600 font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 w-12 text-center">#</th>
                      <th className="px-4 py-2">场所/企业名称</th>
                      <th className="px-4 py-2">统一社会信用代码</th>
                      <th className="px-4 py-2 text-center">属地行政区</th>
                      <th className="px-4 py-2 text-center">企业类别</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 italic font-medium">
                    {linkedEnts.length > 0 ? linkedEnts.map((ent, idx) => (
                      <tr key={ent.id} className="hover:bg-orange-50/10">
                        <td className="px-4 py-2 text-center text-gray-400 font-mono">{idx + 1}</td>
                        <td className="px-4 py-2 font-bold text-gray-800">{ent.name}</td>
                        <td className="px-4 py-2 font-mono text-gray-500">{ent.uscc}</td>
                        <td className="px-4 py-2 text-center text-gray-600">{ent.region}</td>
                        <td className="px-4 py-2 text-center">
                          <span className="px-2 py-0.5 bg-orange-50 text-orange-700 border border-orange-100 rounded text-[9px] font-bold">
                            {ent.category || '机维修业'}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-10 text-center text-gray-400">尚未关联具体的营业网点信息</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* 翻页区 */}
                {linkedEnts.length > 0 && (
                  <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-bold">
                    <span>场所列表: {linkedEnts.length} 条</span>
                    <div className="flex gap-1">
                      <button className="px-2 py-0.5 border border-gray-200 rounded bg-white text-gray-300" disabled>上一页</button>
                      <button className="px-2 py-0.5 border border-[#419EFF] rounded bg-[#419EFF] text-white">1</button>
                      <button className="px-2 py-0.5 border border-gray-200 rounded bg-white text-gray-300" disabled>下一页</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 违法嫌疑人 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Users size={14} className="text-red-600" />
                <span className="text-[11px] font-black text-gray-700">违法嫌疑人/处罚单位责任人名单：</span>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
                <table className="w-full border-collapse text-[10.5px] text-left">
                  <thead className="bg-[#f4f7fc] text-gray-600 font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 w-10 text-center">#</th>
                      <th className="px-3 py-2">姓名</th>
                      <th className="px-3 py-2 text-center">性别</th>
                      <th className="px-3 py-2">证件号码</th>
                      <th className="px-3 py-2">联系电话</th>
                      <th className="px-3 py-2">身份/职业</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {data.suspects && data.suspects.length > 0 ? data.suspects.map((s, idx) => (
                      <tr key={s.id || idx} className="hover:bg-slate-50/50">
                        <td className="px-3 py-2 text-center text-gray-300 font-mono italic">{idx + 1}</td>
                        <td className="px-3 py-2 font-bold text-gray-900">{s.name}</td>
                        <td className="px-2 py-2 text-center">{s.gender}</td>
                        <td className="px-3 py-2 font-mono text-gray-500">{s.idCard}</td>
                        <td className="px-3 py-2 font-mono text-gray-500">{s.phone}</td>
                        <td className="px-3 py-2 text-gray-600">{s.occupation || s.status}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-400">未登记嫌疑对象资料</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* 翻页区 */}
                {data.suspects && data.suspects.length > 0 && (
                  <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-bold">
                    <span>嫌疑人列表: {data.suspects.length} 条</span>
                    <div className="flex gap-1">
                      <button className="px-2 py-0.5 border border-gray-200 rounded bg-white text-gray-300" disabled>上一页</button>
                      <button className="px-2 py-0.5 border border-[#419EFF] rounded bg-[#419EFF] text-white">1</button>
                      <button className="px-2 py-0.5 border border-gray-200 rounded bg-white text-gray-300" disabled>下一页</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 受害人 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <User size={14} className="text-[#419EFF]" />
                <span className="text-[11px] font-black text-gray-700">案件受害人/报案人基本信息：</span>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
                <table className="w-full border-collapse text-[10.5px] text-left">
                  <thead className="bg-[#f0faf5] text-gray-600 font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 w-10 text-center">#</th>
                      <th className="px-3 py-2">姓名</th>
                      <th className="px-3 py-2 text-center">性别</th>
                      <th className="px-3 py-2">证件号码</th>
                      <th className="px-3 py-2">联系电话</th>
                      <th className="px-3 py-2">身份</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {data.victims && data.victims.length > 0 ? data.victims.map((v, idx) => (
                      <tr key={v.id || idx} className="hover:bg-emerald-50/10">
                        <td className="px-3 py-2 text-center text-gray-300 font-mono italic">{idx + 1}</td>
                        <td className="px-3 py-2 font-bold text-gray-900">{v.name}</td>
                        <td className="px-2 py-2 text-center">{v.gender}</td>
                        <td className="px-3 py-2 font-mono text-gray-500">{v.idCard}</td>
                        <td className="px-3 py-2 font-mono text-gray-500">{v.phone}</td>
                        <td className="px-3 py-2 text-gray-600 font-sans">{v.identity || '受害人'}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-400">未录入受害者信息</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* 翻页区 */}
                {data.victims && data.victims.length > 0 && (
                  <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-bold">
                    <span>受害人列表: {data.victims.length} 条</span>
                    <div className="flex gap-1">
                      <button className="px-2 py-0.5 border border-gray-200 rounded bg-white text-gray-300" disabled>上一页</button>
                      <button className="px-2 py-0.5 border border-[#419EFF] rounded bg-[#419EFF] text-white">1</button>
                      <button className="px-2 py-0.5 border border-gray-200 rounded bg-white text-gray-300" disabled>下一页</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 4. 场所查处信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-[#419EFF] overflow-hidden ring-1 ring-blue-100">
          <div className="px-5 py-3 border-b border-blue-100 bg-[#E8F3FF] flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#1e40af] flex items-center gap-1.5 leading-none">
              <span className="w-1.5 h-3 bg-[#419EFF] rounded-full"></span>
              四、场所查处信息
            </h3>
            <span className={`px-2 py-0.5 rounded-[3px] text-[10px] font-bold border border-blue-200 bg-white text-blue-800`}>
              查处状态：{data.isInvestigated || '未查处'}
            </span>
          </div>

          <div className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ReadOnlyField label="是否已查处" value={data.isInvestigated} required />
              <ReadOnlyField label="最终查办完成时间" value={data.investigationTime} />
              <ReadOnlyField label="查案流水日期" value={data.investigationDate} />
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold text-gray-700">核定具体违法违规行为描述</label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded text-gray-700 leading-relaxed text-xs min-h-[80px] shadow-inner whitespace-pre-wrap">
                  {data.specificIllegalBehavior || '属地派出所尚未提交核查事实报告。'}
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold text-gray-700">行政/治安处罚意见决定书摘要</label>
                <div className="p-3 bg-amber-50/10 border border-amber-200 text-amber-950 rounded leading-relaxed text-xs min-h-[80px] shadow-inner italic whitespace-pre-wrap">
                  {data.punishmentResult || '尚未登记正式惩处结论摘要。'}
                </div>
              </div>
            </div>

            {/* 查处凭证 */}
            <div className="pt-4 border-t border-gray-100 text-left">
              <label className="block text-xs font-bold text-gray-800 flex items-center gap-1.5 mb-4">
                <Camera size={14} className="text-[#419EFF]" />
                查获文书/处罚决定书凭证附件阅览：
              </label>
              
              {data.credentialsUrl && data.credentialsUrl.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {data.credentialsUrl.map((url, idx) => (
                    <div key={idx} className="relative group rounded border border-gray-200 overflow-hidden bg-slate-50 shadow-sm ring-1 ring-black/5">
                      <a href={url} target="_blank" rel="noreferrer" className="block w-24 h-24 hover:opacity-95 transition-opacity">
                        <img src={url} alt="查处凭证图片" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </a>
                      <div className="absolute inset-x-0 bottom-0 py-1 bg-black/60 text-white text-[9px] text-center font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        文书页 {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded bg-slate-50">
                  ⚠️ 基层尚未按照督办卷宗要求上传查处裁决书/执照暂扣令纸质扫描底稿凭证。
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 5. 流转时间步骤轴 (Requirement 6 - 省级以下逐级分拨，基层反馈，逐级向上审核) */}
        <section className="bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-slate-50 flex items-center gap-1.5 justify-between">
            <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1.5 animate-fadeIn">
              <History size={14} className="text-[#419EFF]" />
              五、全流程治安挂账督办下发与审核回溯流转记录轴 (一案双查记录链)
            </h3>
            <span className="text-[10px] text-gray-400 font-bold">
              流转节点共：{data.supervisionLogs?.length || 0} 次
            </span>
          </div>

          <div className="p-5 font-sans">
            {data.supervisionLogs && data.supervisionLogs.length > 0 ? (
              <div className="relative border-l border-blue-100 ml-3 pl-6 space-y-6 text-xs text-left">
                {data.supervisionLogs.map((log, index) => {
                  const isFirst = index === 0;
                  return (
                    <div key={log.id || index} className="relative">
                      {/* 圆点指示 */}
                      <span className={`absolute -left-[30px] top-0.5 rounded-full w-4 h-4 flex items-center justify-center border-2 ${
                        isFirst 
                          ? 'bg-blue-500 border-white ring-4 ring-blue-100 text-white animate-pulse' 
                          : 'bg-white border-slate-300'
                      }`}>
                        {isFirst && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </span>

                      {/* 主要卡面 */}
                      <div className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
                        isFirst 
                          ? 'bg-blue-50/20 border-blue-200 shadow-sm' 
                          : 'bg-[#FCFCFD]/90 border-slate-200'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-1.5 border-b border-gray-100 pb-1.5 mb-2">
                          <span className="font-bold text-gray-800 flex items-center gap-1">
                            <span>办理单位：{log.unit}</span>
                            <span className="px-2 py-0.2 bg-gray-100 text-gray-500 border border-gray-200 rounded text-[9px] font-bold">
                              {log.action}
                            </span>
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono font-bold">{log.time}</span>
                        </div>

                        <p className="text-xs text-gray-700 leading-relaxed font-sans mt-1">
                          <span className="font-semibold text-gray-500 mr-2">承办处理意见：</span>
                          {log.remark}
                        </p>

                        <div className="mt-2 text-[10px] text-gray-400 flex items-center justify-between pt-1 border-t border-dashed border-gray-100">
                          <span>处理柜面管理员：{log.operator}</span>
                          <span>序号：#{data.supervisionLogs!.length - index}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-gray-400 leading-relaxed border border-dashed rounded p-4 border-gray-200 max-w-lg mx-auto">
                <AlertCircle size={20} className="mx-auto text-gray-300 mb-1.5" />
                本督办件尚处于【代发起】或者全新录入件状态，还没有产生多级向下指派、签收及审核交互的回溯流转。
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

function ReadOnlyField({ label, value, required, className = "" }: { label: string, value: string | number, required?: boolean, className?: string }) {
  return (
    <div className={`flex flex-col gap-1 text-left ${className}`}>
      <label className="text-xs font-bold text-gray-500 flex items-center mb-1">
        {required && <span className="text-red-500 mr-1 font-bold">*</span>}
        {label}
      </label>
      <div className="h-8.5 px-3 flex items-center bg-gray-50/80 border border-gray-300 rounded text-xs text-gray-600 truncate border-solid">
        {value || '（未录入）'}
      </div>
    </div>
  );
}
