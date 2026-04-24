import React, { useState, useEffect } from 'react';
import { 
  Search, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ChevronDown, 
  Eye, 
  CheckSquare, 
  FileText, 
  History,
  X,
  ShieldCheck,
  ClipboardList
} from 'lucide-react';
import { api } from '../api';

type TabType = 'todo' | 'declaration' | 'done';
type SubTabType = 'change' | 'closure' | 'fault';

interface DeclarationManagementProps {
  initialTab?: TabType;
}

export default function DeclarationManagement({ initialTab = 'todo' }: DeclarationManagementProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>('change');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Mock data for declarations
  const mockTodo = [
    { id: '1', company: '众诚汽修', type: '企业变更', item: '法定代表人', applicant: '张三', time: '2024-03-20 10:00', status: '待审核' },
    { id: '2', company: '安达汽修', type: '故障申报', item: '视频监控异常', applicant: '李四', time: '2024-03-21 09:30', status: '待审核' }
  ];

  const mockChange = [
    { id: '1', company: '众诚汽修', item: '法定代表人', before: '王金龙', after: '李万山', reason: '股份变更', applicant: '李万山', time: '2024-03-20 10:00', status: '待审核' },
    { id: '3', company: '快捷汽修', item: '经营范围', before: '一类维修', after: '一类维修, 配件销售', reason: '业务扩展', applicant: '陈经理', time: '2024-03-22 15:20', status: '待审核' }
  ];

  const mockClosure = [
    { id: '4', company: '顺达汽修', reason: '店面装修', startDate: '2024-04-01', endDate: '2024-05-01', note: '内部装修升级', time: '2024-03-18 11:00', status: '待审核' }
  ];

  const mockFault = [
    { id: '2', company: '安达汽修', faultType: '视频监控', desc: '车间3号摄像头无信号', faultTime: '2024-03-21 08:00', applicant: '李四', time: '2024-03-21 09:30', status: '待审核' }
  ];

  const mockDone = [
    { id: '101', company: '宏远汽修', type: '歇业申报', item: '经营调整', result: '通过', time: '2024-03-15 14:00', auditor: '王警官', finishTime: '2024-03-16 10:00' },
    { id: '102', company: '龙泰汽修', type: '企业变更', item: '联系电话', result: '通过', time: '2024-03-10 16:00', auditor: '林警官', finishTime: '2024-03-11 09:00' }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API fetch delay
    setTimeout(() => {
      if (activeTab === 'todo') setData(mockTodo);
      else if (activeTab === 'done') setData(mockDone);
      else {
        if (activeSubTab === 'change') setData(mockChange);
        else if (activeSubTab === 'closure') setData(mockClosure);
        else setData(mockFault);
      }
      setLoading(false);
    }, 300);
  }, [activeTab, activeSubTab]);

  const handleAudit = (item: any) => {
    setSelectedItem(item);
    setShowAuditModal(true);
  };

  const handleConfirmAudit = (approved: boolean) => {
    // In a real app, this would call an API
    alert(approved ? '审核通过' : '审核驳回');
    setShowAuditModal(false);
    // Move to done items logic would go here
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <div className="flex-1 overflow-hidden flex flex-col p-3">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex-1 flex flex-col overflow-hidden">
          {/* 申报事项子 Tab */}
          {activeTab === 'declaration' && (
            <div className="px-5 pt-3 flex gap-4 border-b border-gray-50 bg-gray-50/20">
              {[
                { id: 'change', label: '企业变更审核' },
                { id: 'closure', label: '歇业申报审核' },
                { id: 'fault', label: '故障申报审核' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubTab(sub.id as SubTabType)}
                  className={`pb-3 text-xs font-medium border-b-2 transition-colors ${activeSubTab === sub.id ? 'border-[#419EFF] text-[#419EFF]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}

          {/* 查询栏位 */}
          <div className="p-5 border-b border-gray-100 bg-gray-50/30 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">公司名称</label>
                <input type="text" className="w-full h-8 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入公司名称" />
              </div>
              {activeTab === 'declaration' && (
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">申报人</label>
                  <input type="text" className="w-full h-8 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入申报人姓名" />
                </div>
              )}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">时间范围</label>
                <input type="date" className="w-full h-8 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div className="flex space-x-2">
                <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xs font-medium">
                  <Search size={14} className="mr-1.5" /> 查询
                </button>
                <button className="h-8 px-4 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors flex items-center text-xs font-medium">
                  <RotateCcw size={14} className="mr-1.5" /> 重置
                </button>
              </div>
            </div>
          </div>

          {/* 表格内容 */}
          <div className="flex-1 overflow-auto custom-scrollbar p-1">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="sticky top-0 z-10 bg-white">
                <tr className="bg-gray-50 text-gray-600 text-xs border-b border-gray-200">
                  <th className="px-4 py-3 font-bold uppercase tracking-wider">单位名称</th>
                  {activeTab === 'done' ? (
                    <>
                      <th className="px-4 py-3 font-bold uppercase tracking-wider">申报类型</th>
                      <th className="px-4 py-3 font-bold uppercase tracking-wider">申报事项</th>
                      <th className="px-4 py-3 font-bold uppercase tracking-wider">结果</th>
                      <th className="px-4 py-3 font-bold uppercase tracking-wider">办理人</th>
                      <th className="px-4 py-3 font-bold uppercase tracking-wider">办结时间</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-3 font-bold uppercase tracking-wider">申报事项</th>
                      <th className="px-4 py-3 font-bold uppercase tracking-wider">申报人</th>
                      <th className="px-4 py-3 font-bold uppercase tracking-wider">申请时间</th>
                      <th className="px-4 py-3 font-bold uppercase tracking-wider">状态</th>
                    </>
                  )}
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-center w-32 sticky right-0 bg-gray-50">操作</th>
                </tr>
              </thead>
              <tbody className="text-xs text-gray-600">
                {loading ? (
                  <tr><td colSpan={10} className="px-4 py-10 text-center text-gray-400">加载中...</td></tr>
                ) : data.length === 0 ? (
                  <tr><td colSpan={10} className="px-4 py-10 text-center text-gray-400">暂无待审核事项</td></tr>
                ) : data.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-800">{item.company}</td>
                    {activeTab === 'done' ? (
                      <>
                        <td className="px-4 py-3">{item.type}</td>
                        <td className="px-4 py-3 font-medium">{item.item}</td>
                        <td className="px-4 py-3">
                          <span className="px-1.5 py-0.5 bg-green-50 text-green-600 rounded">通过</span>
                        </td>
                        <td className="px-4 py-3">{item.auditor}</td>
                        <td className="px-4 py-3 font-mono text-gray-400">{item.finishTime}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 font-medium">{item.item || activeSubTab === 'closure' ? '歇业申请' : '故障申报'}</td>
                        <td className="px-4 py-3">{item.applicant}</td>
                        <td className="px-4 py-3 font-mono text-gray-400">{item.time}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded animate-pulse">待审核</span>
                        </td>
                      </>
                    )}
                    <td className="px-4 py-3 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center justify-center space-x-3">
                        <button 
                          onClick={() => handleAudit(item)}
                          className="text-[#419EFF] hover:text-blue-700 font-bold transition-colors"
                        >
                          {activeTab === 'done' ? '详情' : '审核'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页 */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-white text-xs text-gray-400">
            <div>共 {data.length} 条记录</div>
            <div className="flex gap-1">
              <button disabled className="px-2 py-1 border border-gray-200 rounded opacity-50 cursor-not-allowed">上一页</button>
              <button className="px-2 py-1 bg-[#419EFF] text-white border border-[#419EFF] rounded">1</button>
              <button className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50">下一页</button>
            </div>
          </div>
        </div>
      </div>

      {/* 审核弹窗 */}
      {showAuditModal && selectedItem && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#f8faff]">
               <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                 <ShieldCheck className="text-[#419EFF]" size={22} />
                 审核详情 - {selectedItem.company}
               </h3>
               <button onClick={() => setShowAuditModal(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                 <X size={20} />
               </button>
            </div>
            
            <div className="p-8 space-y-6 max-h-[70vh] overflow-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-b border-gray-50 pb-6">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">申报对象</label>
                  <p className="text-sm font-bold text-gray-800">{selectedItem.company}</p>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">申请人</label>
                  <p className="text-sm font-bold text-gray-800">{selectedItem.applicant || '企业法人'}</p>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">申报类型</label>
                  <p className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block">
                    {selectedItem.type || (activeSubTab === 'change' ? '企业变更' : activeSubTab === 'closure' ? '歇业申报' : '故障申报')}
                  </p>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">申请时间</label>
                  <p className="text-sm font-mono text-gray-600">{selectedItem.time}</p>
                </div>
              </div>

              {/* 业务特有内容 */}
              <div className="space-y-4">
                {(activeSubTab === 'change' || selectedItem.type === '企业变更') && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase">变更内容对比</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-red-50 border border-red-100 rounded">
                        <p className="text-[10px] text-red-400 mb-1">变更前 ({selectedItem.item})</p>
                        <p className="text-sm font-bold text-red-700 line-through">{selectedItem.before || '旧内容'}</p>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-100 rounded">
                        <p className="text-[10px] text-green-400 mb-1">变更后 ({selectedItem.item})</p>
                        <p className="text-sm font-bold text-green-700">{selectedItem.after || '新内容'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {(activeSubTab === 'closure' || selectedItem.type === '歇业申报') && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase">歇业详细信息</h4>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="grid grid-cols-2 gap-y-3 text-xs mb-3">
                        <p><span className="text-gray-400">歇业周期：</span>{selectedItem.startDate || '2024-04-01'} 至 {selectedItem.endDate || '2024-05-01'}</p>
                        <p><span className="text-gray-400">时长建议：</span>1个月</p>
                      </div>
                      <p className="text-xs"><span className="text-gray-400">歇业申请说明：</span>{selectedItem.note || '暂无说明'}</p>
                    </div>
                  </div>
                )}

                {(activeSubTab === 'fault' || selectedItem.type === '故障申报') && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase">故障反馈详情</h4>
                    <div className="bg-orange-50/30 p-4 rounded-lg border border-orange-100 flex gap-3">
                      <AlertCircle size={18} className="text-orange-500 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-gray-800 mb-1">{selectedItem.faultType || '监控硬件'} 故障</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{selectedItem.desc || '详细故障描述信息'}</p>
                        <p className="text-[10px] text-gray-400 mt-2 font-mono">故障发生时刻: {selectedItem.faultTime}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <label className="block text-[10px] text-gray-400 font-bold uppercase">审核意见</label>
                  <textarea 
                    className="w-full h-24 p-3 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#419EFF] resize-none" 
                    placeholder="请输入核实意见或处理方案..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 font-medium">
               <button onClick={() => setShowAuditModal(false)} className="px-6 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">取消</button>
               {activeTab !== 'done' && (
                 <>
                   <button onClick={() => handleConfirmAudit(false)} className="px-6 py-2 text-xs bg-white border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors">审核驳回</button>
                   <button onClick={() => handleConfirmAudit(true)} className="px-10 py-2 text-xs bg-[#419EFF] text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">核准同意</button>
                 </>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
