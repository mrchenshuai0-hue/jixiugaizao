import React, { useState } from 'react';
import { Search, RotateCcw, Plus, Edit, Trash2, Calendar, FileText, ArrowLeft, Save, XCircle } from 'lucide-react';

interface FugitiveRecord {
  id: string;
  name: string;
  idNumber: string;
  companyName: string;
  captureSituation: string;
  captureUnit: string;
  captureTime: string;
  registrar: string;
  registrationTime: string;
  registrationUnit: string;
  dataSource: string;
}

const MOCK_DATA: FugitiveRecord[] = [
  {
    id: '1',
    name: '张三',
    idNumber: '110101199001011234',
    companyName: '北京测试科技有限公司',
    captureSituation: '现场抓获，无反抗',
    captureUnit: '北京市公安局朝阳分局',
    captureTime: '2026-06-01 14:00',
    registrar: 'admin',
    registrationTime: '2026-06-02 09:00',
    registrationUnit: '北京市公安局',
    dataSource: '系统录入'
  },
  {
    id: '2',
    name: '李四',
    idNumber: '350102198505058899',
    companyName: '福州顺鑫汽修',
    captureSituation: '通过修理厂预警布控机制成功抓获',
    captureUnit: '福州市公安局仓山分局',
    captureTime: '2026-06-05 10:30',
    registrar: 'wang_lin',
    registrationTime: '2026-06-05 14:20',
    registrationUnit: '福州市公安局',
    dataSource: '预警转存'
  }
];

export default function CapturedFugitiveRegistration() {
  const [viewState, setViewState] = useState<{ type: 'list' | 'add' | 'edit', record: FugitiveRecord | null }>({
    type: 'list',
    record: null
  });
  const [isExpanded, setIsExpanded] = useState(false);

  if (viewState.type === 'add' || viewState.type === 'edit') {
    return (
      <div className="flex flex-col h-full bg-[#f0f2f5] overflow-hidden font-sans">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-bold text-gray-800">
               {viewState.type === 'add' ? '抓获在逃人员补登' : '编辑在逃人员登记'}
             </h2>
          </div>
          <button 
            type="button"
            onClick={() => setViewState({ type: 'list', record: null })}
            className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-1.5" />返回列表
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 space-y-6 flex justify-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full max-w-4xl flex flex-col h-fit">
               <div className="px-6 py-4 border-b border-gray-100 bg-[#f8fafc] flex items-center">
                 <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                    查获信息
                 </h3>
               </div>
               <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                    <div className="flex flex-col gap-2">
                       <label className="text-sm font-medium text-gray-700 flex items-center">
                         <span className="text-red-500 mr-1">*</span> 所在单位
                       </label>
                       <input type="text" className="h-10 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#419EFF]" placeholder="请输入" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-sm font-medium text-gray-700 flex items-center">
                          <span className="text-red-500 mr-1">*</span> 行政区域
                       </label>
                       <input type="text" defaultValue="北京市-北京市公安局" className="h-10 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#419EFF]" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-sm font-medium text-gray-700 flex items-center">
                          <span className="text-red-500 mr-1">*</span> 在逃人员姓名
                       </label>
                       <input type="text" defaultValue={viewState.record?.name || ''} className="h-10 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#419EFF]" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-sm font-medium text-gray-700 flex items-center">
                          <span className="text-red-500 mr-1">*</span> 证件号码
                       </label>
                       <input type="text" defaultValue={viewState.record?.idNumber || ''} className="h-10 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#419EFF]" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-sm font-medium text-gray-700 flex items-center">登记单位</label>
                       <input type="text" defaultValue={viewState.record?.registrationUnit || ''} className="h-10 px-3 flex items-center bg-gray-50 border border-gray-300 rounded text-sm text-gray-600 outline-none" readOnly />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-sm font-medium text-gray-700 flex items-center">
                          <span className="text-red-500 mr-1">*</span> 抓获时间
                       </label>
                       <input type="datetime-local" defaultValue={viewState.record?.captureTime || ''} className="h-10 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#419EFF]" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-sm font-medium text-gray-700 flex items-center">
                          <span className="text-red-500 mr-1">*</span> 抓获单位
                       </label>
                       <input type="text" defaultValue={viewState.record?.captureUnit || ''} className="h-10 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#419EFF]" />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-3">
                       <label className="text-sm font-medium text-gray-700 flex items-center">抓获情况</label>
                       <textarea className="w-full h-32 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#419EFF] resize-none" defaultValue={viewState.record?.captureSituation || ''}></textarea>
                    </div>
                  </div>
               </div>
               
               {/* Footer with actions */}
                <div className="px-6 py-4 border-t border-gray-100 bg-[#f8fafc] flex justify-center gap-3 shrink-0">
                  <button
                    onClick={() => setViewState({ type: 'list', record: null })}
                    className="px-6 py-2 bg-[#419EFF] hover:bg-blue-600 text-white rounded text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-sm font-sans"
                  >
                     <Save size={16} /> 保存信息
                  </button>
                    <button
                        onClick={() => setViewState({ type: 'list', record: null })}
                        className="px-6 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-sm font-medium cursor-pointer transition-colors shadow-sm font-sans"
                    >
                         取消
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] p-4 font-sans text-left">
      {/* Query Card */}
      <div className="bg-white rounded-lg border border-gray-200 mb-4 px-6 py-5 shrink-0 flex items-start justify-between">
        <div className="flex-1 grid grid-cols-3 gap-6 mr-6">
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">抓获单位</label>
            <input type="text" className="h-9 flex-1 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#419EFF]" placeholder="请输入" />
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">公司名称</label>
            <input type="text" className="h-9 flex-1 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#419EFF]" placeholder="请输入" />
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">人员姓名</label>
            <input type="text" className="h-9 flex-1 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#419EFF]" placeholder="请输入" />
          </div>

          {isExpanded && (
            <>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">身份证号</label>
                <input type="text" className="h-9 flex-1 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#419EFF]" placeholder="请输入" />
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">抓获日期</label>
                <div className="flex items-center flex-1 gap-2">
                  <input type="date" className="h-9 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#419EFF] w-[130px]" />
                  <span className="text-gray-500 text-xs">-</span>
                  <input type="date" className="h-9 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#419EFF] w-[130px]" />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
           <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#419EFF] text-white rounded flex items-center text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm">
                 <Search size={16} className="mr-1.5" /> 查询
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded flex items-center text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                 <RotateCcw size={16} className="mr-1.5 text-gray-500" /> 重置
              </button>
           </div>
           <button 
             onClick={() => setIsExpanded(!isExpanded)}
             className="text-[#419EFF] text-sm flex items-center hover:text-blue-700 font-medium mr-2"
           >
             {isExpanded ? '收起' : '展开'}
             <svg className={`w-4 h-4 ml-1 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
             </svg>
           </button>
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden shadow-sm">
         <div className="h-14 px-6 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
             <div className="flex items-center gap-2">
                 <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                 <h3 className="text-base font-bold text-gray-800 tracking-tight">在逃人员列表</h3>
             </div>
             <div className="flex items-center gap-2">
                 <button 
                    onClick={() => setViewState({ type: 'add', record: null })}
                    className="px-3 py-1.5 bg-green-50 text-green-600 border border-green-200 rounded text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-1.5"
                 >
                     <Plus size={15} /> 增加
                 </button>
             </div>
         </div>

         <div className="flex-1 overflow-auto custom-scrollbar">
           <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                <tr>
                   <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b border-gray-200">姓名</th>
                   <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b border-gray-200 w-48">证件号码</th>
                   <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b border-gray-200 min-w-[200px]">公司名称</th>
                   <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b border-gray-200">抓获情况</th>
                   <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b border-gray-200">抓获单位</th>
                   <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b border-gray-200">抓获时间</th>
                   <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b border-gray-200 w-24 text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_DATA.map((item, index) => (
                  <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50/30 transition-colors`}>
                    <td className="px-4 py-3.5 text-sm font-medium text-gray-800">{item.name}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-600 font-mono">{item.idNumber}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-600">{item.companyName}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-600">{item.captureSituation}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-600">{item.captureUnit}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-600 font-mono">{item.captureTime}</td>
                    <td className="px-4 py-3.5 text-sm text-center">
                       <div className="flex items-center justify-center gap-2">
                           <button 
                             onClick={() => setViewState({ type: 'edit', record: item })}
                             className="text-blue-500 hover:text-blue-700 flex items-center justify-center p-1.5 rounded-md hover:bg-blue-100 transition-colors"
                             title="修改"
                           >
                              <Edit size={16} />
                           </button>
                           <button 
                             onClick={() => window.confirm('确定要删除该记录吗？')}
                             className="text-red-500 hover:text-red-700 flex items-center justify-center p-1.5 rounded-md hover:bg-red-100 transition-colors"
                             title="删除"
                           >
                              <Trash2 size={16} />
                           </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
         </div>

         {/* Pagination Footer */}
         <div className="h-12 border-t border-gray-200 bg-white flex items-center justify-between px-6 shrink-0 text-gray-500">
             <div className="flex items-center gap-4 text-sm font-medium">
                <div>共 <span className="text-gray-800 font-semibold">{MOCK_DATA.length}</span> 条记录</div>
                <div>本页显示 <span className="text-gray-800 font-semibold">{MOCK_DATA.length}</span> 条</div>
             </div>
             <div className="flex items-center gap-1">
                 <button className="px-2.5 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50">上一页</button>
                 <button className="px-3 py-1 bg-[#419EFF] text-white rounded text-sm">1</button>
                 <button className="px-2.5 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50">下一页</button>
             </div>
         </div>
      </div>
    </div>
  );
}
