import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  Plus, 
  Download, 
  ChevronDown, 
  Eye, 
  Edit, 
  ArrowLeft,
  Save,
  User,
  Trash2,
  FileText
} from 'lucide-react';

interface SuspectRecord {
  id: string;
  name: string;
  gender: '男' | '女';
  idType: string;
  idNumber: string;
  birthDate: string;
  nativePlace: string;
  address: string;
  fugitiveNumber: string;
  briefCase: string;
  isRevoked: '是' | '否';
}

const MOCK_SUSPECTS: SuspectRecord[] = [
  {
    id: 'S001', name: '张三', gender: '男', idType: '居民身份证', idNumber: '110101199001011234',
    birthDate: '1990-01-01', nativePlace: '北京市东城区', address: '北京市东城区某某胡同1号',
    fugitiveNumber: 'T11010100001', briefCase: '涉嫌盗窃案，于2026年初逃离。', isRevoked: '否'
  },
  {
    id: 'S002', name: '李四', gender: '女', idType: '居民身份证', idNumber: '110102199505055678',
    birthDate: '1995-05-05', nativePlace: '北京市西城区', address: '北京市西城区某某街10号',
    fugitiveNumber: 'T11010200002', briefCase: '涉及一起电信诈骗案件。', isRevoked: '否'
  },
  {
    id: 'S003', name: '王五', gender: '男', idType: '居民身份证', idNumber: '310101198810102222',
    birthDate: '1988-10-10', nativePlace: '上海市黄浦区', address: '上海市黄浦区某某路99号',
    fugitiveNumber: 'T31010100003', briefCase: '因合同诈骗被立案侦查。', isRevoked: '是'
  }
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
        <select className="h-9 px-3 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-500" disabled={readOnly}>
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

export default function SuspectManagement() {
  const [viewState, setViewState] = useState<{ type: 'list' | 'add' | 'edit' | 'detail', record: SuspectRecord | null }>({
    type: 'list',
    record: null
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [data, setData] = useState<SuspectRecord[]>(MOCK_SUSPECTS);

  const [filters, setFilters] = useState({
    name: '', idNumber: '', gender: '全部', nativePlace: '', idType: '全部', fugitiveNumber: '', isRevoked: '否', birthStart: '', birthEnd: ''
  });
  const [appliedFilters, setAppliedFilters] = useState({ ...filters });

  const handleSearch = () => setAppliedFilters({ ...filters });
  const handleReset = () => {
    const reset = { name: '', idNumber: '', gender: '全部', nativePlace: '', idType: '全部', fugitiveNumber: '', isRevoked: '否', birthStart: '', birthEnd: '' };
    setFilters(reset);
    setAppliedFilters(reset);
  };

  const displayData = data.filter(item => {
    if (appliedFilters.name && !item.name.includes(appliedFilters.name)) return false;
    if (appliedFilters.idNumber && !item.idNumber.includes(appliedFilters.idNumber)) return false;
    if (appliedFilters.gender !== '全部' && item.gender !== appliedFilters.gender) return false;
    if (appliedFilters.nativePlace && !item.nativePlace.includes(appliedFilters.nativePlace)) return false;
    if (appliedFilters.idType !== '全部' && item.idType !== appliedFilters.idType) return false;
    if (appliedFilters.fugitiveNumber && !item.fugitiveNumber.includes(appliedFilters.fugitiveNumber)) return false;
    if (appliedFilters.isRevoked !== '全部' && item.isRevoked !== appliedFilters.isRevoked) return false;
    return true;
  });

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
  };
  const toggleAllRows = () => {
    setSelectedRows(selectedRows.length === displayData.length ? [] : displayData.map(d => d.id));
  };

  const confirmDelete = (id: string) => {
    if (window.confirm("您确定要删除该人员吗？此操作不可撤销。")) setData(prev => prev.filter(p => p.id !== id));
  };

  if (viewState.type !== 'list') {
    const r = viewState.record;
    const readOnly = viewState.type === 'detail';
    
    return (
      <div className="flex flex-col h-full bg-[#f0f2f5] overflow-hidden font-sans">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-bold text-gray-800">
               {viewState.type === 'add' ? '新增可疑人员' : (viewState.type === 'edit' ? '修改可疑人员' : '可疑人员详情')}
             </h2>
             {r && <span className="px-2 py-0.5 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-xs">人员编号: {r.id}</span>}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                  <ReadOnlyField label="姓名" value={r?.name || ''} required />
                  <ReadOnlyField label="性别" value={r?.gender || ''} />
                  <ReadOnlyField label="出生日期" value={r?.birthDate || ''} required />
                  
                  <ReadOnlyField label="证件类型" value={r?.idType || ''} required />
                  <ReadOnlyField label="证件号码" value={r?.idNumber || ''} required />
                  <ReadOnlyField label="籍贯" value={r?.nativePlace || ''} />
                  
                  <ReadOnlyField label="逃犯编号" value={r?.fugitiveNumber || ''} />
                  <ReadOnlyField label="现住址" value={r?.address || ''} className="md:col-span-2" />
                  
                  <ReadOnlyField label="简要案情" value={r?.briefCase || ''} className="md:col-span-3 h-auto" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                  <FormField label="姓名" value={r?.name || ''} required />
                  <FormField label="性别" value={r?.gender || ''} isSelect options={['男', '女']} />
                  <FormField label="出生日期" value={r?.birthDate || ''} type="date" required />
                  
                  <FormField label="证件类型" value={r?.idType || '居民身份证'} isSelect options={['居民身份证', '护照']} required />
                  <FormField label="证件号码" value={r?.idNumber || ''} required />
                  <FormField label="籍贯" value={r?.nativePlace || ''} />
                  
                  <FormField label="逃犯编号" value={r?.fugitiveNumber || ''} />
                  <FormField label="现住址" value={r?.address || ''} className="md:col-span-2" />
                  
                  <FormField label="简要案情" value={r?.briefCase || ''} isTextArea className="md:col-span-3" />
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
                <Save size={16} />
                保存人员信息
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] p-4 font-sans">
      
      {/* 顶部查询卡片 */}
      <div className="bg-white rounded-lg border border-gray-200 mb-4 px-6 py-5 shrink-0 flex items-start justify-between">
        <div className="flex-1 grid grid-cols-3 gap-6 mr-6">
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">姓名</label>
            <input type="text" value={filters.name} onChange={e => setFilters({...filters, name: e.target.value})} placeholder="请输入姓名" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">性别</label>
            <select value={filters.gender} onChange={e => setFilters({...filters, gender: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500 bg-white">
              <option>全部</option><option>男</option><option>女</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">证件号码</label>
            <input type="text" value={filters.idNumber} onChange={e => setFilters({...filters, idNumber: e.target.value})} placeholder="请输入证件号码" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
          </div>

          {isExpanded && (
            <>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">籍贯</label>
                <input type="text" value={filters.nativePlace} onChange={e => setFilters({...filters, nativePlace: e.target.value})} placeholder="请输入籍贯" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">证件类型</label>
                <select value={filters.idType} onChange={e => setFilters({...filters, idType: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500 bg-white">
                  <option>全部</option><option>居民身份证</option><option>护照</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">逃犯编号</label>
                <input type="text" value={filters.fugitiveNumber} onChange={e => setFilters({...filters, fugitiveNumber: e.target.value})} placeholder="请输入编号" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center flex-1 space-x-2 w-full col-span-3 max-w-[500px]">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">出生日期</label>
                <input type="date" value={filters.birthStart} onChange={(e) => setFilters({...filters, birthStart: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
                <span className="text-gray-400">至</span>
                <input type="date" value={filters.birthEnd} onChange={(e) => setFilters({...filters, birthEnd: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
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
          <h3 className="text-base font-bold text-gray-800 tracking-wide">可疑人员列表</h3>
          <div className="flex gap-2">
            <button onClick={() => setViewState({ type: 'add', record: null })} className="h-8 px-4 bg-blue-50 text-[#419EFF] border border-blue-200 rounded hover:bg-blue-100 transition-colors text-sm font-medium">
              增加可疑信息
            </button>
            <button className="h-8 px-4 bg-white text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">导出</button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="text-gray-600 text-[13px] font-semibold border-b border-gray-200">
                <th className="px-6 py-3 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#419EFF]" checked={selectedRows.length === displayData.length && displayData.length > 0} onChange={toggleAllRows} />
                </th>
                <th className="px-6 py-3 font-medium">姓名</th>
                <th className="px-6 py-3 font-medium">性别</th>
                <th className="px-6 py-3 font-medium">证件类别</th>
                <th className="px-6 py-3 font-medium">证件号码</th>
                <th className="px-6 py-3 font-medium">详细地址</th>
                <th className="px-6 py-3 font-medium">逃犯编号</th>
                <th className="px-6 py-3 font-medium">简要案情</th>
                <th className="px-6 py-3 font-medium text-center w-36">操作</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              {displayData.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors even:bg-gray-50 bg-white">
                  <td className="px-6 py-3.5 text-center">
                    <input type="checkbox" className="rounded" checked={selectedRows.includes(row.id)} onChange={() => toggleRowSelection(row.id)} />
                  </td>
                  <td className="px-6 py-3.5 font-medium text-[#333333] whitespace-nowrap">{row.name}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">{row.gender}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">{row.idType}</td>
                  <td className="px-6 py-3.5 font-mono whitespace-nowrap">{row.idNumber}</td>
                  <td className="px-6 py-3.5 max-w-[200px] truncate">{row.address}</td>
                  <td className="px-6 py-3.5 font-mono whitespace-nowrap">{row.fugitiveNumber}</td>
                  <td className="px-6 py-3.5 max-w-[200px] truncate">{row.briefCase}</td>
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
                   <td colSpan={9} className="px-6 py-10 text-center text-gray-500">暂无数据</td>
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
