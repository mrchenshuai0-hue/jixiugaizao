import React, { useState } from 'react';
import { Search, ChevronDown, Plus, Download, Eye, Edit, Trash2, ArrowLeft, Save } from 'lucide-react';

interface AlarmPushRecord {
  id: string;
  region: string;
  phone: string;
}

const MOCK_DATA: AlarmPushRecord[] = [
  { id: '1', region: '北京市-北京市公安局', phone: '15300000000' }
];

function ReadOnlyField({ label, value, required, className = "" }: { label: string, value: string | number, required?: boolean, className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700 flex items-center">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </label>
      <div className="h-9 px-3 flex items-center bg-gray-50 border border-gray-300 rounded text-sm text-gray-600 truncate border-solid">
        {value || '-'}
      </div>
    </div>
  );
}

function FormField({ label, value, required, className = "", isTextArea = false, isSelect = false, options = [], type="text", readOnly = false, desc }: any) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700 flex items-center">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </label>
      {isSelect ? (
        <select className="h-9 px-3 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-500" disabled={readOnly}>
           {options.map((o: any) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : isTextArea ? (
        <textarea className="h-48 p-3 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-500 resize-none" defaultValue={value} readOnly={readOnly}></textarea>
      ) : (
        <input type={type} className="h-9 px-3 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-500" defaultValue={value} readOnly={readOnly} />
      )}
      {desc && <div className="text-red-500 text-xs mt-1 leading-relaxed">{desc}</div>}
    </div>
  );
}

export default function AlarmInfoPush() {
  const [viewState, setViewState] = useState<{ type: 'list' | 'add' | 'edit' | 'detail', record: AlarmPushRecord | null }>({
    type: 'list',
    record: null
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [data, setData] = useState<AlarmPushRecord[]>(MOCK_DATA);

  const [filters, setFilters] = useState({ region: '', phone: '' });
  const [appliedFilters, setAppliedFilters] = useState({ ...filters });

  const handleSearch = () => setAppliedFilters({ ...filters });
  const handleReset = () => {
    const reset = { region: '', phone: '' };
    setFilters(reset);
    setAppliedFilters(reset);
  };

  const displayData = data.filter(item => {
    if (appliedFilters.region && !item.region.includes(appliedFilters.region)) return false;
    if (appliedFilters.phone && !item.phone.includes(appliedFilters.phone)) return false;
    return true;
  });

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
  };
  const toggleAllRows = () => {
    setSelectedRows(selectedRows.length === displayData.length ? [] : displayData.map(d => d.id));
  };

  const confirmDelete = (id: string) => {
    if (window.confirm("您确定要删除该记录吗？此操作不可撤销。")) setData(prev => prev.filter(p => p.id !== id));
  };

  if (viewState.type !== 'list') {
    const r = viewState.record;
    const readOnly = viewState.type === 'detail';
    
    return (
      <div className="flex flex-col h-full bg-[#f0f2f5] overflow-hidden font-sans">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-bold text-gray-800">
               {viewState.type === 'add' ? '添加报警信息推送' : (viewState.type === 'edit' ? '修改报警信息推送' : '报警信息推送详情')}
             </h2>
             {r && <span className="px-2 py-0.5 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-xs">编号: {r.id}</span>}
          </div>
          <button 
            onClick={() => setViewState({ type: 'list', record: null })}
            className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-1.5" /> 返回列表
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
              <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                基本信息
              </h3>
            </div>
            <div className="p-6">
              {readOnly ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <ReadOnlyField label="行政区域" value={r?.region || ''} required />
                  <ReadOnlyField label="手机号码" value={r?.phone || ''} required className="md:col-span-2" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <FormField label="行政区域" value={r?.region || '北京市-北京市公安局'} required />
                  <FormField 
                    label="手机号码" 
                    value={r?.phone || ''} 
                    isTextArea
                    required
                    className="md:col-span-2"
                    desc={<>注：多个号码之间用逗号隔开,姓名添加在手机号之后。<br/>示例：15300000000张三,18900000000李四</>}
                  />
                </div>
              )}
            </div>
          </section>

          {!readOnly && (
            <div className="flex justify-center mt-6">
              <button 
                onClick={() => setViewState({ type: 'list', record: null })}
                className="px-8 py-2.5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium flex items-center gap-2 shadow-sm"
              >
                <Save size={16} /> 保存推送信息
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] p-4 font-sans">
      <div className="bg-white rounded-lg border border-gray-200 mb-4 px-6 py-5 shrink-0 flex items-start justify-between">
        <div className="flex-1 grid grid-cols-2 gap-6 mr-6 max-w-[800px]">
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">行政区域</label>
            <input type="text" value={filters.region} onChange={e => setFilters({...filters, region: e.target.value})} placeholder="请输入行政区域" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">手机号</label>
            <input type="text" value={filters.phone} onChange={e => setFilters({...filters, phone: e.target.value})} placeholder="请输入手机号" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleSearch} className="h-9 px-5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium">查询</button>
          <button onClick={handleReset} className="h-9 px-5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium">重置</button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
          <h3 className="text-base font-bold text-gray-800 tracking-wide">报警推送设置</h3>
          <div className="flex gap-2">
            <button onClick={() => setViewState({ type: 'add', record: null })} className="h-8 px-4 bg-blue-50 text-[#419EFF] border border-blue-200 rounded hover:bg-blue-100 transition-colors text-sm font-medium">
              增加推送规则
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="text-gray-600 text-[13px] font-semibold border-b border-gray-200">
                <th className="px-6 py-3 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#419EFF]" checked={selectedRows.length === displayData.length && displayData.length > 0} onChange={toggleAllRows} />
                </th>
                <th className="px-6 py-3 font-medium w-1/3">行政区划</th>
                <th className="px-6 py-3 font-medium">手机号码</th>
                <th className="px-6 py-3 font-medium text-center w-36">操作</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              {displayData.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors even:bg-gray-50 bg-white">
                  <td className="px-6 py-3.5 text-center">
                    <input type="checkbox" className="rounded" checked={selectedRows.includes(row.id)} onChange={() => toggleRowSelection(row.id)} />
                  </td>
                  <td className="px-6 py-3.5 font-medium text-[#333333]">{row.region}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">{row.phone}</td>
                  <td className="px-6 py-3.5 text-center transition-colors">
                    <div className="flex items-center justify-center gap-3">
                      <button className="text-[#419EFF] hover:text-blue-700 font-medium text-[13px]" onClick={() => setViewState({ type: 'detail', record: row })}>详情</button>
                      <button className="text-[#419EFF] hover:text-blue-700 font-medium text-[13px]" onClick={() => setViewState({ type: 'edit', record: row })}>修改</button>
                      <button className="text-red-500 hover:text-red-700 font-medium text-[13px]" onClick={() => confirmDelete(row.id)}>删除</button>
                    </div>
                  </td>
                </tr>
              ))}
              {displayData.length === 0 && (
                <tr>
                   <td colSpan={4} className="px-6 py-10 text-center text-gray-500">暂无数据</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end shrink-0">
          <div className="flex items-center gap-4 text-[13px] text-gray-600">
            <span>共 {displayData.length} 条</span>
          </div>
        </div>
      </div>
    </div>
  );
}
