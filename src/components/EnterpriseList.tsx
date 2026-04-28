import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Plus, Download, ChevronDown, Eye, ShieldCheck, Key, Settings, AlertCircle, Clock, ShieldAlert, XCircle, Building2, Star, AlertTriangle } from 'lucide-react';
import { api } from '../api';
import { Enterprise } from '../types';

interface EnterpriseListProps {
  onViewDetail: (id: string) => void;
  onAdd: () => void;
  onEdit: (id: string) => void;
}

export default function EnterpriseList({ onViewDetail, onAdd, onEdit }: EnterpriseListProps) {
  const [data, setData] = useState<Enterprise[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Modal states (inherited from previous requirement, will keep for the "Audit" logic)
  const [activeModal, setActiveModal] = useState<'password' | 'change' | 'closure' | 'fault' | null>(null);
  const [selectedEnterprise, setSelectedEnterprise] = useState<Enterprise | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.enterprise.getAll();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch enterprises:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAction = (type: 'password' | 'change' | 'closure' | 'fault', enterprise: Enterprise) => {
    setSelectedEnterprise(enterprise);
    setActiveModal(type);
    setOpenDropdown(null);
  };

  const getRecordStatusStyle = (status: string) => {
    switch (status) {
      case '已备案': return 'bg-[#1ebcaf]/10 text-[#1ebcaf] border-[#1ebcaf]/20';
      case '未备案': return 'bg-[#fa5e45]/10 text-[#fa5e45] border-[#fa5e45]/20';
      case '备案过期': return 'bg-[#ffc23e]/10 text-[#ffc23e] border-[#ffc23e]/20';
      case '待审核': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      <div className="flex-1 p-3 overflow-auto custom-scrollbar">
        {/* 统计卡片区 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-blue-50 rounded-full text-[#419EFF] mr-4">
              <Building2 size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">场所总数</div>
              <div className="text-xl font-bold text-gray-800">1,284</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-green-50 rounded-full text-green-500 mr-4">
              <Plus size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">本月新增</div>
              <div className="text-xl font-bold text-gray-800">12</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-yellow-50 rounded-full text-yellow-500 mr-4">
               <Star size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">AAA级占比</div>
              <div className="text-xl font-bold text-gray-800">18.5%</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-red-50 rounded-full text-red-500 mr-4">
              <AlertTriangle size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">风险隐患企业</div>
              <div className="text-xl font-bold text-gray-800">5</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          
          {/* 查询区 (按新要求调整栏位) */}
          <div className="p-5 border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-3">
              <div>
                <label className="block text-xs text-[#666666] mb-1">行政区域</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white transition-colors">
                  <option value="">全部</option>
                  <option value="fz">福州市</option>
                  <option value="xm">厦门市</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">登录状态 (天未登录)</label>
                <input type="text" placeholder="0 表示从未登录" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">上传状态 (天未上传)</label>
                <input type="text" placeholder="0 表示从未上传" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">公司名称 (含招牌名)</label>
                <input type="text" placeholder="公司名或招牌" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">企业编码</label>
                <input type="text" placeholder="请输入企业编码" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">企业等级</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="AAA">AAA</option>
                  <option value="AA">AA</option>
                  <option value="A">A</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">邮政编码</label>
                <input type="text" placeholder="请输入邮政编码" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">注册地址</label>
                <input type="text" placeholder="模糊查询地址" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">企业状态</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white transition-colors">
                  <option value="">全部</option>
                  <option value="正常">正常营业</option>
                  <option value="歇业">歇业</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">企业类别</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="1">一类维修</option>
                  <option value="2">二类维修</option>
                  <option value="3">三类维修</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">法人代表电话</label>
                <input type="text" placeholder="联系号码" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">社会统一信用代码</label>
                <input type="text" placeholder="18位信用代码" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              
              <div className="flex space-x-2 pt-5 xl:col-start-6 justify-end">
                <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xs font-medium">
                  <Search size={14} className="mr-1.5" /> 查询
                </button>
                <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-xs font-medium">
                  <RotateCcw size={14} className="mr-1.5" /> 重置
                </button>
              </div>
            </div>
          </div>

          {/* 操作区 (去除批量操作) */}
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">
              共找到 <span className="text-[#419EFF] font-medium">{data.length}</span> 条记录
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={onAdd}
                className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium"
              >
                <Plus size={14} className="mr-1.5" /> 新增企业
              </button>
              <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <Download size={14} className="mr-1.5" /> 导出
              </button>
            </div>
          </div>

          {/* 表格区 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 w-12 text-center text-gray-400 font-medium">#</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">公司名称</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">企业编码</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">企业状态</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">风险加信用等级</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">企业所属辖区</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">注册地址</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">标准地址</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">招牌名</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">企业类别</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">所属派出所</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap text-center">企业等级</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">企业法人</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">法人代表电话</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">登记日期</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">最后登录时间</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">最后上传时间</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">企业人数</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">最后检查日期</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">检查次数</th>
                  <th className="px-4 py-3 font-medium text-center w-32 sticky right-0 bg-gray-50 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)]">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
                {loading ? (
                  <tr><td colSpan={22} className="px-4 py-10 text-center text-gray-500">加载中...</td></tr>
                ) : data.map((row, index) => (
                  <tr 
                    key={row.id} 
                    className={`border-b border-gray-100 hover:bg-blue-50/30 transition-colors cursor-pointer group ${openDropdown === row.id ? 'relative z-[60]' : ''}`}
                    onClick={() => onViewDetail(row.id)}
                  >
                    <td className="px-4 py-3 text-center text-gray-400">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-[#333333] whitespace-nowrap">{row.name}</td>
                    <td className="px-4 py-3 font-mono whitespace-nowrap">{row.enterpriseCode || 'E' + row.id.substring(0, 8)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${row.status === '正常' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {row.status || '正常营业'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.riskCreditLevel || 'B级'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.jurisdiction || row.region}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.registeredAddress || '福建省福州市...'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.address || '福州市鼓楼区...'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.brandName || '--'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.category}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.policeStation || '某某派出所'}</td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">{row.level || 'AA'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.legalRep}</td>
                    <td className="px-4 py-3 font-mono text-gray-500 whitespace-nowrap">{row.legalRepPhone || '139****1234'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.registerDate || '2020-01-01'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.lastLoginTime || '2026-04-20 10:00'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.lastUploadTime || '2026-04-21 15:30'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.employeeCount || 10}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.lastCheck}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.inspectionCount || 5}</td>
                    <td className={`px-4 py-3 text-center sticky right-0 bg-white group-hover:bg-[#f3f7ff] transition-colors ${openDropdown === row.id ? 'z-50' : 'z-10'}`}>
                      <div className="flex items-center justify-center gap-4">
                        <button 
                          className="text-[#419EFF] hover:text-blue-700 font-medium whitespace-nowrap text-xs"
                          onClick={(e) => { e.stopPropagation(); onViewDetail(row.id); }}
                        >
                          详情
                        </button>
                        <button 
                          className="text-[#419EFF] hover:text-blue-700 font-medium whitespace-nowrap text-xs"
                          onClick={(e) => { e.stopPropagation(); onEdit(row.id); }}
                        >
                          修改
                        </button>
                        <div className="relative">
                          <button 
                            className="text-[#333] hover:text-[#419EFF] transition-colors p-1"
                            onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === row.id ? null : row.id); }}
                          >
                            <ChevronDown size={14} />
                          </button>
                          {openDropdown === row.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}></div>
                              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-[60] py-1 flex flex-col items-start overflow-hidden">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleAction('password' as any, row); }}
                                  className="w-full flex items-center px-4 py-1.5 text-[10px] text-gray-700 hover:bg-blue-50 hover:text-[#419EFF] transition-colors"
                                >
                                  <Key size={12} className="mr-2" /> 密码重置
                                </button>
                                <button 
                                  className="w-full flex items-center px-4 py-1.5 text-[10px] text-orange-500 hover:bg-orange-50 transition-colors"
                                >
                                  <Clock size={12} className="mr-2" /> 停业
                                </button>
                                <button 
                                  className="w-full flex items-center px-4 py-1.5 text-[10px] text-red-500 hover:bg-red-50 transition-colors"
                                >
                                  <XCircle size={12} className="mr-2" /> 注销
                                </button>
                                <button 
                                  className="w-full flex items-center px-4 py-1.5 text-[10px] text-gray-500 hover:bg-gray-100 transition-colors"
                                >
                                  <AlertCircle size={12} className="mr-2" /> 歇业
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页区 */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-white">
            <div className="text-xs text-[#666666]">
              显示第 1 到第 {data.length} 条记录，总共 {data.length} 条记录
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 border border-gray-300 rounded text-xs text-[#999999] bg-gray-50 cursor-not-allowed">上一页</button>
              <button className="px-3 py-1 border border-[#419EFF] rounded text-xs text-white bg-[#419EFF]">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-xs text-[#666666] hover:bg-gray-50">下一页</button>
            </div>
          </div>
        </div>
      </div>

      {activeModal === 'password' && selectedEnterprise && (
        <AuditModal 
          title="密码重置确认" 
          enterprise={selectedEnterprise} 
          onClose={() => setActiveModal(null)}
          onConfirm={() => { alert('密码已成功重置并发送至该企业法人手机'); setActiveModal(null); }}
        >
          <div className="p-6 text-sm text-gray-600">
            您确认要重置 <span className="font-bold text-gray-800">{selectedEnterprise.name}</span> 的登录密码吗？重置后，新密码将通过短信形式发送至法人代表 <span className="font-bold">{selectedEnterprise.uscc}</span> (模拟法人) 绑定的手机号中。
          </div>
        </AuditModal>
      )}
    </div>
  );
}

function AuditModal({ title, enterprise, onClose, onConfirm, showAuditAction, children }: { 
  title: string, 
  enterprise: Enterprise, 
  onClose: () => void, 
  onConfirm: () => void,
  showAuditAction?: boolean,
  children: React.ReactNode 
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#f8faff]">
           <h3 className="text-lg font-bold text-gray-800">{title}</h3>
           <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600">
             <XCircle size={20} />
           </button>
        </div>
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
          <p className="text-xs text-gray-400 mb-1">操作对象</p>
          <p className="text-sm font-bold text-[#419EFF]">{enterprise.name}</p>
        </div>
        {children}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 font-medium">
           <button onClick={onClose} className="px-5 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">取消</button>
           {showAuditAction ? (
             <>
               <button onClick={() => { alert('已驳回申请'); onClose(); }} className="px-5 py-2 text-sm bg-white border border-red-200 text-red-500 rounded hover:bg-red-50 transition-colors">驳回</button>
               <button onClick={onConfirm} className="px-8 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors shadow-sm">核准</button>
             </>
           ) : (
             <button onClick={onConfirm} className="px-8 py-2 text-sm bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors shadow-sm">确定</button>
           )}
        </div>
      </div>
    </div>
  );
}
