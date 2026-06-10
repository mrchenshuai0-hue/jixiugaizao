import React, { useState, useEffect } from 'react';
import { 
  Search, 
  RotateCcw, 
  Eye, 
  Edit3, 
  Plus, 
  Trash2, 
  Download,
  Calendar as CalendarIcon,
  ChevronDown
} from 'lucide-react';
import { PractitionerPunishmentRecord } from '../types';
import { practitionerPunishmentService } from '../services/practitionerPunishmentService';
import PractitionerPunishmentForm from './PractitionerPunishmentForm';
import PractitionerPunishmentDetail from './PractitionerPunishmentDetail';

export default function PractitionerPunishment() {
  const [view, setView] = useState<'list' | 'add' | 'edit' | 'detail'>('list');
  const [records, setRecords] = useState<PractitionerPunishmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [filters, setFilters] = useState({
    region: '北京市-北京市公安局',
    companyName: '',
    punishedName: '',
    startDate: '',
    endDate: '',
    caseNo: '',
    punishmentNo: '',
    caseCategory: '',
    punishmentAmount: '',
    handlingUnit: ''
  });

  const [appliedFilters, setAppliedFilters] = useState({
    region: '北京市-北京市公安局',
    companyName: '',
    punishedName: '',
    startDate: '',
    endDate: '',
    caseNo: '',
    punishmentNo: '',
    caseCategory: '',
    punishmentAmount: '',
    handlingUnit: ''
  });

  const fetchData = async () => {
    setLoading(true);
    const data = await practitionerPunishmentService.getAll();
    setRecords(data);
    setLoading(false);
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
      punishedName: '',
      startDate: '',
      endDate: '',
      caseNo: '',
      punishmentNo: '',
      caseCategory: '',
      punishmentAmount: '',
      handlingUnit: ''
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  const filteredRecords = records.filter(r => {
    if (appliedFilters.companyName && !r.workUnit.includes(appliedFilters.companyName)) return false;
    if (appliedFilters.punishedName && !r.punishedName.includes(appliedFilters.punishedName)) return false;
    if (appliedFilters.caseNo && !r.caseNo.includes(appliedFilters.caseNo)) return false;
    if (appliedFilters.punishmentNo && !r.punishmentNo.includes(appliedFilters.punishmentNo)) return false;
    if (appliedFilters.handlingUnit && !r.handlingUnit.includes(appliedFilters.handlingUnit)) return false;
    return true;
  });

  const handleDelete = async (id: string) => {
    if (confirm('确定要删除这条处罚记录吗？')) {
      try {
        await practitionerPunishmentService.delete(id);
        fetchData();
      } catch (err) {
        alert('删除失败');
      }
    }
  };

  const handleExport = () => {
    alert('正在导出数据...');
  };

  if (view === 'add' || view === 'edit') {
    return (
      <PractitionerPunishmentForm 
        id={selectedId} 
        mode={view === 'add' ? 'add' : 'edit'} 
        onClose={() => { setView('list'); setSelectedId(null); fetchData(); }} 
      />
    );
  }

  if (view === 'detail' && selectedId) {
    return (
      <PractitionerPunishmentDetail 
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-3 items-end">
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">行政区划</label>
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
                  onChange={e => setFilters({...filters, companyName: e.target.value})}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5 text-center">被处罚人</label>
                <input 
                  type="text" 
                  value={filters.punishedName}
                  onChange={e => setFilters({...filters, punishedName: e.target.value})}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700" 
                />
              </div>
              <div className="md:col-span-1 lg:col-span-2">
                <label className="block text-xs font-semibold text-[#666666] mb-1.5 text-center">处罚日期</label>
                <div className="flex items-center space-x-1">
                  <input 
                    type="date" 
                    className="flex-1 h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                  />
                  <span className="text-gray-400 text-xs">至</span>
                  <input 
                    type="date" 
                    className="flex-1 h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                  />
                </div>
              </div>

              {isExpanded && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">案件编号</label>
                    <input 
                      type="text" 
                      value={filters.caseNo}
                      onChange={e => setFilters({...filters, caseNo: e.target.value})}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">处罚文号</label>
                    <input 
                      type="text" 
                      value={filters.punishmentNo}
                      onChange={e => setFilters({...filters, punishmentNo: e.target.value})}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5 text-center">案件类别</label>
                    <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-gray-700">
                      <option value="">全部</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5 text-center text-red-600">罚款金额</label>
                    <input 
                      type="text" 
                      value={filters.punishmentAmount}
                      onChange={e => setFilters({...filters, punishmentAmount: e.target.value})}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700" 
                    />
                  </div>
                  <div className="md:col-span-2 xl:col-span-1">
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">办案单位</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={filters.handlingUnit}
                        onChange={e => setFilters({...filters, handlingUnit: e.target.value})}
                        className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700" 
                      />
                      <Search size={14} className="absolute right-2 top-2 text-blue-400" />
                    </div>
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
                onClick={() => setView('add')}
                className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium"
              >
                <Plus size={14} className="mr-1.5" /> 登记
              </button>
              <button 
                onClick={handleExport}
                className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
              >
                <Download size={14} className="mr-1.5" /> 导出
              </button>
              <button 
                onClick={() => selectedId && handleDelete(selectedId)}
                disabled={!selectedId}
                className="h-8 px-4 bg-white border border-red-300 text-red-500 rounded hover:bg-red-50 transition-colors flex items-center text-sm font-medium disabled:opacity-50"
              >
                <Trash2 size={14} className="mr-1.5" /> 删除
              </button>
            </div>
          </div>

          {/* 表格区 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 w-12 text-center text-gray-400 font-medium font-semibold">#</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">公司名称</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">被处罚人</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">处罚日期</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">案件编号</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">处罚文号</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">性别</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">证件号码</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">案件类别</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">罚款金额</th>
                  <th className="px-4 py-3 font-medium text-center w-40 sticky right-0 bg-gray-50 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)]">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
                {loading ? (
                  <tr><td colSpan={11} className="px-4 py-10 text-center text-gray-500 font-medium">加载中...</td></tr>
                ) : filteredRecords.length === 0 ? (
                  <tr><td colSpan={11} className="px-4 py-10 text-center text-gray-500 font-medium">暂无匹配数据</td></tr>
                ) : filteredRecords.map((record, index) => (
                  <tr 
                    key={record.id} 
                    className={`border-b border-gray-100 hover:bg-blue-50/30 transition-colors cursor-pointer group ${selectedId === record.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedId(record.id)}
                  >
                    <td className="px-4 py-3 text-center text-gray-400">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-[#333333]">{record.workUnit}</td>
                    <td className="px-4 py-3">{record.punishedName}</td>
                    <td className="px-4 py-3 font-mono text-xs">{record.punishmentDate}</td>
                    <td className="px-4 py-3 font-mono text-xs text-blue-600 font-semibold">{record.caseNo}</td>
                    <td className="px-4 py-3 font-mono text-xs">{record.punishmentNo}</td>
                    <td className="px-4 py-3">{record.gender}</td>
                    <td className="px-4 py-3 font-mono text-xs">{record.idCard}</td>
                    <td className="px-4 py-3">{record.caseCategory}</td>
                    <td className="px-4 py-3 text-red-600 font-medium">¥{record.punishmentAmount}</td>
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
              显示第 1 到第 {records.length} 条记录，总共 {records.length} 条记录
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
