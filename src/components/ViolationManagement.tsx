import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Plus, Download, Eye, Edit, Trash2, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '../api';
import { ViolationManagementRecord } from '../types';
import ViolationManagementForm from './ViolationManagementForm';
import ViolationManagementDetail from './ViolationManagementDetail';

export default function ViolationManagement() {
  const [view, setView] = useState<'list' | 'edit' | 'audit' | 'detail'>('list');
  const [records, setRecords] = useState<ViolationManagementRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Filter states
  const [filters, setFilters] = useState({
    region: '北京市-北京市公安局',
    companyName: '',
    enterpriseId: '',
    registrar: '',
    startTime: '',
    endTime: '',
    violator: '',
    caseNo: '',
    isInvestigated: '全部'
  });

  // Applied filter state
  const [appliedFilters, setAppliedFilters] = useState({
    region: '北京市-北京市公安局',
    companyName: '',
    enterpriseId: '',
    registrar: '',
    startTime: '',
    endTime: '',
    violator: '',
    caseNo: '',
    isInvestigated: '全部'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await api.violationManagement.getAll();
      setRecords(data);
    } catch (error) {
      console.error('Failed to fetch violation records:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    setAppliedFilters({ ...filters });
  };

  const handleReset = () => {
    const defaultFilters = {
      region: '北京市-北京市公安局',
      companyName: '',
      enterpriseId: '',
      registrar: '',
      startTime: '',
      endTime: '',
      violator: '',
      caseNo: '',
      isInvestigated: '全部'
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  const filteredRecords = records.filter(r => {
    if (appliedFilters.companyName && !r.companyName.includes(appliedFilters.companyName)) return false;
    if (appliedFilters.enterpriseId && !r.enterpriseId.includes(appliedFilters.enterpriseId)) return false;
    if (appliedFilters.registrar && !r.registrar.includes(appliedFilters.registrar)) return false;
    if (appliedFilters.violator && !r.violator.includes(appliedFilters.violator)) return false;
    if (appliedFilters.caseNo && !r.caseNo.includes(appliedFilters.caseNo)) return false;
    if (appliedFilters.isInvestigated !== '全部' && r.isInvestigated !== appliedFilters.isInvestigated) return false;
    // Date filtering simplified
    if (appliedFilters.startTime && r.occurrenceTime < appliedFilters.startTime) return false;
    if (appliedFilters.endTime && r.occurrenceTime > appliedFilters.endTime) return false;
    return true;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除该记录吗？')) {
      try {
        await api.violationManagement.delete(id);
        fetchData();
      } catch (err) {
        alert('删除失败');
      }
    }
  };

  const handleExport = () => {
    alert('正在导出数据...');
  };

  if (view === 'edit' || view === 'audit') {
    return (
      <ViolationManagementForm 
        id={selectedId} 
        mode={view === 'audit' ? 'audit' : 'edit'} 
        onClose={() => { setView('list'); setSelectedId(null); fetchData(); }} 
      />
    );
  }

  if (view === 'detail' && selectedId) {
    return (
      <ViolationManagementDetail 
        id={selectedId} 
        onClose={() => { setView('list'); setSelectedId(null); }} 
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] relative">
      <div className="flex-1 p-3 overflow-auto custom-scrollbar">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          
          {/* 查询区 */}
          <div className="p-5 border-b border-gray-100 bg-[#FCFCFD]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3 items-end">
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">行政区域</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={filters.region} 
                    readOnly
                    className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white transition-colors text-gray-700" 
                  />
                  <Search size={14} className="absolute right-2 top-2 text-blue-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">公司名称</label>
                <input 
                  type="text" 
                  value={filters.companyName}
                  onChange={e => setFilters(f => ({ ...f, companyName: e.target.value }))}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">企业编码</label>
                <input 
                  type="text" 
                  value={filters.enterpriseId}
                  onChange={e => setFilters(f => ({ ...f, enterpriseId: e.target.value }))}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700" 
                />
              </div>

              {isExpanded && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">登记人员</label>
                    <input 
                      type="text" 
                      value={filters.registrar}
                      onChange={e => setFilters(f => ({ ...f, registrar: e.target.value }))}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">发生时间</label>
                    <div className="flex items-center space-x-1">
                      <input 
                        type="date" 
                        value={filters.startTime}
                        onChange={e => setFilters(f => ({ ...f, startTime: e.target.value }))}
                        className="flex-1 h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                      />
                      <span className="text-gray-400 text-xs">至</span>
                      <input 
                        type="date" 
                        value={filters.endTime}
                        onChange={e => setFilters(f => ({ ...f, endTime: e.target.value }))}
                        className="flex-1 h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">违法违规人员(单位)</label>
                    <input 
                      type="text" 
                      value={filters.violator}
                      onChange={e => setFilters(f => ({ ...f, violator: e.target.value }))}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">案件编号</label>
                    <input 
                      type="text" 
                      value={filters.caseNo}
                      onChange={e => setFilters(f => ({ ...f, caseNo: e.target.value }))}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">是否查处</label>
                    <select 
                      value={filters.isInvestigated}
                      onChange={e => setFilters(f => ({ ...f, isInvestigated: e.target.value }))}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-gray-700"
                    >
                      <option value="全部">全部</option>
                      <option value="是">是</option>
                      <option value="否">否</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end items-center gap-3 mt-4 pt-3 border-t border-gray-100">
              <button 
                onClick={handleSearch}
                className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xs font-semibold shadow-sm active:scale-95 duration-100"
              >
                <Search size={14} className="mr-1.5" /> 查询
              </button>
              <button 
                onClick={handleReset}
                className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-xs font-semibold shadow-sm active:scale-95 duration-100"
              >
                <RotateCcw size={14} className="mr-1.5" /> 重置
              </button>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 px-3 bg-blue-50 text-[#419EFF] hover:bg-blue-100 rounded transition-colors flex items-center text-xs font-semibold hover:border-blue-200 border border-transparent shadow-sm"
              >
                <span>{isExpanded ? '收起' : '展开'}</span>
                <ChevronDown size={14} className={`ml-1 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* 操作区 */}
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">
              共找到 <span className="text-[#419EFF] font-medium">{filteredRecords.length}</span> 条记录
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleExport}
                className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
              >
                <Download size={14} className="mr-1.5" /> 导出
              </button>
            </div>
          </div>

          {/* 表格区 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 w-12 text-center text-gray-400 font-medium font-semibold">#</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">公司名称</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">案件编号</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">发生时间</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">登记人员</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">违法违规人员(单位)</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">是否查处</th>
                  <th className="px-4 py-3 font-medium text-center w-64 sticky right-0 bg-gray-50 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)]">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
                {loading ? (
                  <tr><td colSpan={8} className="px-4 py-10 text-center text-gray-500 font-medium">加载中...</td></tr>
                ) : filteredRecords.length === 0 ? (
                  <tr><td colSpan={8} className="px-4 py-10 text-center text-gray-500 font-medium">暂无匹配数据</td></tr>
                ) : filteredRecords.map((record, index) => (
                  <tr 
                    key={record.id} 
                    className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors cursor-pointer group"
                    onClick={() => { setSelectedId(record.id); setView('detail'); }}
                  >
                    <td className="px-4 py-3 text-center text-gray-400">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-[#333333]">{record.companyName}</td>
                    <td className="px-4 py-3 font-mono text-xs text-blue-600 font-semibold">{record.caseNo}</td>
                    <td className="px-4 py-3 font-mono text-xs">{record.occurrenceTime}</td>
                    <td className="px-4 py-3">{record.registrar}</td>
                    <td className="px-4 py-3">{record.violator}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                        record.isInvestigated === '是' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-orange-50 text-orange-700 border-orange-200'
                      }`}>
                        {record.isInvestigated}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center sticky right-0 bg-white group-hover:bg-[#f3f7ff] transition-colors">
                      <div className="flex items-center justify-center gap-4">
                        <button 
                          className="text-[#419EFF] hover:text-blue-700 font-medium whitespace-nowrap text-xs"
                          onClick={(e) => { e.stopPropagation(); setSelectedId(record.id); setView('detail'); }}
                        >
                          详情
                        </button>
                        <button 
                          className="text-[#419EFF] hover:text-blue-700 font-medium whitespace-nowrap text-xs"
                          onClick={(e) => { e.stopPropagation(); setSelectedId(record.id); setView('edit'); }}
                        >
                          修改
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-700 font-medium whitespace-nowrap text-xs"
                          onClick={(e) => { e.stopPropagation(); setSelectedId(record.id); setView('audit'); }}
                        >
                          查处
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-700 font-medium whitespace-nowrap text-xs"
                          onClick={(e) => { e.stopPropagation(); handleDelete(record.id); }}
                        >
                          删除
                        </button>
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
              显示第 1 到第 {filteredRecords.length} 条记录，总共 {filteredRecords.length} 条记录
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 border border-gray-300 rounded text-xs text-[#999999] bg-gray-50 cursor-not-allowed" disabled>上一页</button>
              <button className="px-3 py-1 border border-[#419EFF] rounded text-xs text-white bg-[#419EFF]">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-xs text-[#666666] hover:bg-gray-50" disabled>下一页</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
