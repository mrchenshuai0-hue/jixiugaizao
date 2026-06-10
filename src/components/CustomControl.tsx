import React, { useState } from 'react';
import { Search, ChevronDown, Plus, Download, Eye, Edit, Trash2, ArrowLeft, Save } from 'lucide-react';

interface CustomControlRecord {
  id: string;
  batchNo: string;
  taskName: string;
  targetPersonCount: number;
  targetVehicleCount: number;
  receiverCount: number;
  createTime: string;
  updateTime: string;
  modifier: string;
  status: '已禁用' | '已启用';
}

const MOCK_DATA: CustomControlRecord[] = [
  { id: '1', batchNo: 'BK210202', taskName: '122', targetPersonCount: 0, targetVehicleCount: 0, receiverCount: 0, createTime: '2026-06-08', updateTime: '', modifier: '', status: '已禁用' },
  { id: '2', batchNo: 'BK210182', taskName: '111', targetPersonCount: 1, targetVehicleCount: 1, receiverCount: 2, createTime: '2026-04-01', updateTime: '2026-04-01', modifier: 'admin', status: '已禁用' },
  { id: '3', batchNo: 'BK210164', taskName: '临控预警20250121', targetPersonCount: 0, targetVehicleCount: 0, receiverCount: 0, createTime: '2025-01-24', updateTime: '', modifier: '', status: '已禁用' },
  { id: '4', batchNo: 'BK210163', taskName: '临控预警20250120', targetPersonCount: 1, targetVehicleCount: 1, receiverCount: 2, createTime: '2025-01-20', updateTime: '2025-01-20', modifier: 'admin', status: '已启用' },
  { id: '5', batchNo: 'BK210162', taskName: '自定义布控-冯秋', targetPersonCount: 1, targetVehicleCount: 1, receiverCount: 1, createTime: '2024-11-14', updateTime: '2024-11-14', modifier: '001001', status: '已禁用' }
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

function FormField({ label, value, required, className = "", isTextArea = false, isSelect = false, options = [], type="text", readOnly = false }: any) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700 flex items-center">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </label>
      {isSelect ? (
        <select className="h-9 px-3 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-500" disabled={readOnly} defaultValue={value}>
           {options.map((o: any) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : isTextArea ? (
        <textarea className="h-24 p-3 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-500 resize-none" defaultValue={value} readOnly={readOnly}></textarea>
      ) : (
        <input type={type} className="h-9 px-3 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-500" defaultValue={value} readOnly={readOnly} />
      )}
    </div>
  );
}


export default function CustomControl() {
  const [viewState, setViewState] = useState<{ type: 'list' | 'add' | 'edit' | 'detail', record: CustomControlRecord | null }>({
    type: 'list',
    record: null
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [data, setData] = useState<CustomControlRecord[]>(MOCK_DATA);

  const [filters, setFilters] = useState({
    taskName: '', batchNo: '', status: '全部', dateStart: '', dateEnd: ''
  });
  const [appliedFilters, setAppliedFilters] = useState({ ...filters });

  const handleSearch = () => setAppliedFilters({ ...filters });
  const handleReset = () => {
    const reset = { taskName: '', batchNo: '', status: '全部', dateStart: '', dateEnd: '' };
    setFilters(reset);
    setAppliedFilters(reset);
  };

  const displayData = data.filter(item => {
    if (appliedFilters.taskName && !item.taskName.includes(appliedFilters.taskName)) return false;
    if (appliedFilters.batchNo && !item.batchNo.includes(appliedFilters.batchNo)) return false;
    if (appliedFilters.status !== '全部' && item.status !== appliedFilters.status) return false;
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
    const isDetail = viewState.type === 'detail';
    
    return (
      <div className="flex flex-col h-full bg-[#f0f2f5] overflow-hidden font-sans">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-bold text-gray-800">
               {viewState.type === 'add' ? '新增自定义布控' : (viewState.type === 'edit' ? '修改自定义布控' : '自定义布控详细信息')}
             </h2>
             {r && <span className="px-2 py-0.5 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-xs">任务批号: {r.batchNo}</span>}
          </div>
          <button 
            onClick={() => setViewState({ type: 'list', record: null })}
            className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-1.5" /> 返回列表
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="flex flex-col gap-6">
              <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[150px]">
                <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                    任务详情
                  </h3>
                </div>
                <div className="p-6">
                  {isDetail ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <ReadOnlyField label="任务名称" value={r?.taskName || ''} required />
                      <ReadOnlyField label="任务批号" value={r?.batchNo || ''} />
                      <ReadOnlyField label="状态" value={r?.status || ''} />
                      <ReadOnlyField label="创建人" value={r?.modifier || 'admin'} />
                      <ReadOnlyField label="创建时间" value={r?.createTime || ''} />
                      <ReadOnlyField label="上次更新时间" value={r?.updateTime || ''} />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField label="任务名称" value={r?.taskName || ''} required />
                      <FormField label="任务批号" value={r?.batchNo || ''} />
                      <FormField label="状态" value={r?.status || '已启用'} isSelect options={['已启用', '已禁用']} />
                    </div>
                  )}
                </div>
              </section>

              <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[150px] flex flex-col">
                <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                    预警接收人员名单
                  </h3>
                  {!isDetail && <button className="text-sm text-[#419EFF] flex items-center font-medium hover:text-blue-700"><Plus size={14} className="mr-1"/>添加人员</button>}
                </div>
                <div className="p-6 flex-1 flex flex-col items-center justify-center text-gray-400 text-sm">
                   暂无数据
                </div>
              </section>

              <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[150px] flex flex-col">
                <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                    布控人员名单
                  </h3>
                  {!isDetail && <button className="text-sm text-[#419EFF] flex items-center font-medium hover:text-blue-700"><Plus size={14} className="mr-1"/>添加布控人员</button>}
                </div>
                <div className="p-6 flex-1 flex flex-col items-center justify-center text-gray-400 text-sm">
                   暂无数据
                </div>
              </section>
              
              <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[150px] flex flex-col">
                <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                    布控车辆名单
                  </h3>
                  {!isDetail && <button className="text-sm text-[#419EFF] flex items-center font-medium hover:text-blue-700"><Plus size={14} className="mr-1"/>添加布控车辆</button>}
                </div>
                <div className="p-6 flex-1 flex flex-col items-center justify-center text-gray-400 text-sm">
                   暂无数据
                </div>
              </section>
          </div>

          {!isDetail && (
            <div className="flex justify-center mt-6">
              <button 
                onClick={() => setViewState({ type: 'list', record: null })}
                className="px-8 py-2.5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium flex items-center gap-2 shadow-sm"
              >
                <Save size={16} /> 保存布控信息
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
        <div className="flex-1 grid grid-cols-3 gap-6 mr-6">
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">任务名称</label>
            <input type="text" value={filters.taskName} onChange={e => setFilters({...filters, taskName: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">任务批号</label>
            <input type="text" value={filters.batchNo} onChange={e => setFilters({...filters, batchNo: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">状态</label>
            <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white">
              <option>全部</option>
              <option>已启用</option>
              <option>已禁用</option>
            </select>
          </div>

          {isExpanded && (
            <>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">创建日期</label>
                <div className="flex-1 flex gap-2">
                  <input type="date" value={filters.dateStart} onChange={(e) => setFilters({...filters, dateStart: e.target.value})} className="flex-1 h-9 px-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 min-w-0" />
                  <span className="text-gray-400 flex items-center">-</span>
                  <input type="date" value={filters.dateEnd} onChange={(e) => setFilters({...filters, dateEnd: e.target.value})} className="flex-1 h-9 px-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 min-w-0" />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleSearch} className="h-9 px-5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium">查询</button>
          <button onClick={handleReset} className="h-9 px-5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium">重置</button>
          <button onClick={() => setIsExpanded(!isExpanded)} className="h-9 px-5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium flex items-center">
            {isExpanded ? '收起' : '展开'}
            <ChevronDown size={14} className={`ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
          <h3 className="text-base font-bold text-gray-800 tracking-wide">自定义布控列表</h3>
          <div className="flex gap-2">
            <button onClick={() => setViewState({ type: 'add', record: null })} className="h-8 px-4 bg-blue-50 text-[#419EFF] border border-blue-200 rounded hover:bg-blue-100 transition-colors text-sm font-medium">
              增加自定义布控
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="text-gray-600 text-[13px] font-semibold border-b border-gray-200">
                <th className="px-6 py-3 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#419EFF]" checked={selectedRows.length === displayData.length && displayData.length > 0} onChange={toggleAllRows} />
                </th>
                <th className="px-6 py-3 font-medium">任务批号</th>
                <th className="px-6 py-3 font-medium">任务名称</th>
                <th className="px-6 py-3 font-medium text-center">目标人数</th>
                <th className="px-6 py-3 font-medium text-center">目标车辆</th>
                <th className="px-6 py-3 font-medium text-center">预警接收人数</th>
                <th className="px-6 py-3 font-medium">创建时间</th>
                <th className="px-6 py-3 font-medium">更新时间</th>
                <th className="px-6 py-3 font-medium">修改人</th>
                <th className="px-6 py-3 font-medium text-center w-36">操作</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              {displayData.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors even:bg-gray-50 bg-white">
                  <td className="px-6 py-3.5 text-center">
                    <input type="checkbox" className="rounded" checked={selectedRows.includes(row.id)} onChange={() => toggleRowSelection(row.id)} />
                  </td>
                  <td className="px-6 py-3.5 font-medium text-[#333333] whitespace-nowrap">{row.batchNo}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">{row.taskName}</td>
                  <td className="px-6 py-3.5 text-center">{row.targetPersonCount}</td>
                  <td className="px-6 py-3.5 text-center">{row.targetVehicleCount}</td>
                  <td className="px-6 py-3.5 text-center">{row.receiverCount}</td>
                  <td className="px-6 py-3.5 font-mono whitespace-nowrap">{row.createTime}</td>
                  <td className="px-6 py-3.5 font-mono whitespace-nowrap">{row.updateTime}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">{row.modifier}</td>
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
                   <td colSpan={10} className="px-6 py-10 text-center text-gray-500">暂无数据</td>
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
