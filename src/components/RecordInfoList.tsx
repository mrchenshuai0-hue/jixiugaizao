import React, { useState } from 'react';
import { Search, RotateCcw, Download, Bell, ShieldCheck, AlertCircle, Clock, Plus, CheckCircle2 } from 'lucide-react';
import { mockRecordEnterprises, RecordEnterprise } from './recordData';

interface RecordInfoListProps {
  onViewDetail: (id: string) => void;
}

export default function RecordInfoList({ onViewDetail }: RecordInfoListProps) {
  // Input states
  const [enterpriseName, setEnterpriseName] = useState('');
  const [uscc, setUscc] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');

  // Applied filter states
  const [appliedFilters, setAppliedFilters] = useState({
    enterpriseName: '',
    uscc: '',
    startDate: '',
    endDate: '',
    status: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已备案': return 'bg-[#e8f8f7] text-[#1ebcaf] border-[#bcece8]';
      case '备案过期': return 'bg-[#ffece9] text-[#fa5e45] border-[#ffd1ca]';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleSearch = () => {
    setAppliedFilters({
      enterpriseName,
      uscc,
      startDate,
      endDate,
      status
    });
  };

  const handleReset = () => {
    setEnterpriseName('');
    setUscc('');
    setStartDate('');
    setEndDate('');
    setStatus('');
    setAppliedFilters({
      enterpriseName: '',
      uscc: '',
      startDate: '',
      endDate: '',
      status: ''
    });
  };

  // Filter mock records
  const filteredData = mockRecordEnterprises.filter(row => {
    if (appliedFilters.enterpriseName) {
      const kw = appliedFilters.enterpriseName.toLowerCase();
      if (!row.name.toLowerCase().includes(kw)) return false;
    }
    if (appliedFilters.uscc) {
      const credit = appliedFilters.uscc.toLowerCase();
      if (!row.uscc.toLowerCase().includes(credit)) return false;
    }
    if (appliedFilters.startDate) {
      if (row.updateDate < appliedFilters.startDate) return false;
    }
    if (appliedFilters.endDate) {
      if (row.updateDate > appliedFilters.endDate) return false;
    }
    if (appliedFilters.status && row.status !== appliedFilters.status) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <div className="flex-1 p-3 overflow-auto">

        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          {/* 顶部查询筛选区 */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="w-56">
                <label className="block text-sm text-[#666666] mb-1.5 font-medium">企业名称</label>
                <input 
                  type="text" 
                  value={enterpriseName}
                  onChange={(e) => setEnterpriseName(e.target.value)}
                  className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" 
                  placeholder="请输入企业名称" 
                />
              </div>
              <div className="w-56">
                <label className="block text-sm text-[#666666] mb-1.5 font-medium">统一社会信用代码</label>
                <input 
                  type="text" 
                  value={uscc}
                  onChange={(e) => setUscc(e.target.value)}
                  className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" 
                  placeholder="请输入社会信用代码" 
                />
              </div>
              <div className="w-80">
                <label className="block text-sm text-[#666666] mb-1.5 font-medium">办结时间</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1 h-8 px-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                  />
                  <span className="text-gray-400 text-xs">至</span>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1 h-8 px-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                  />
                </div>
              </div>
              <div className="w-36">
                <label className="block text-sm text-[#666666] mb-1.5 font-medium">备案状态</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-gray-700"
                >
                  <option value="">全部</option>
                  <option value="已备案">已备案</option>
                  <option value="备案过期">备案过期</option>
                </select>
              </div>
              <div className="flex space-x-2 ml-auto">
                <button 
                  onClick={handleSearch}
                  className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium"
                >
                  <Search size={14} className="mr-1.5" /> 查询
                </button>
                <button 
                  onClick={handleReset}
                  className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
                >
                  <RotateCcw size={14} className="mr-1.5" /> 重置
                </button>
              </div>
            </div>
          </div>

          {/* 全局操作区 */}
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">共找到 <span className="text-[#419EFF] font-medium">{filteredData.length}</span> 条备案记录</div>
            <div className="flex space-x-2">
              <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium select-none">
                <Download size={14} className="mr-1.5" /> 批量导出
              </button>
            </div>
          </div>

          {/* 核心数据展示区 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse text-[#333333]">
              <thead>
                <tr className="bg-[#f2f6fc] text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 font-medium w-16 text-center">序号</th>
                  <th className="px-4 py-3 font-medium">企业名称</th>
                  <th className="px-4 py-3 font-medium">统一社会信用代码</th>
                  <th className="px-4 py-3 font-medium">法定代表人</th>
                  <th className="px-4 py-3 font-medium">经营地址</th>
                  <th className="px-4 py-3 font-medium text-center">备案状态</th>
                  <th className="px-4 py-3 font-medium text-center">附件完整度</th>
                  <th className="px-4 py-3 font-medium">最新更新日期</th>
                  <th className="px-4 py-3 font-medium text-center w-24">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-[#f5f9ff] transition-colors">
                      <td className="px-4 py-3 text-center">{index + 1}</td>
                      <td className="px-4 py-3 font-medium text-[#419EFF] cursor-pointer hover:underline" onClick={() => onViewDetail(row.id)}>
                        <div className="flex items-center">
                          {row.name}
                          {!row.attachmentsComplete && (
                            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-600 border border-red-100 whitespace-nowrap">
                              附件不全
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-[#666666]">{row.uscc}</td>
                      <td className="px-4 py-3 text-[#666666]">{row.legalRep}</td>
                      <td className="px-4 py-3 truncate max-w-[200px] text-[#666666]" title={row.address}>{row.address}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs border ${getStatusColor(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.attachmentsComplete ? (
                          <span className="inline-flex items-center text-xs text-green-600 font-medium">
                            <CheckCircle2 size={12} className="mr-1 text-green-500" /> 已上传 (3/3)
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-xs text-amber-600 font-medium bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            <AlertCircle size={12} className="mr-1 text-amber-500" /> 未上传完整 (2/3)
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#666666]">{row.updateDate}</td>
                      <td className="px-4 py-3 text-center flex items-center justify-center space-x-2">
                        <button 
                          className="text-[#419EFF] hover:text-blue-700 font-medium"
                          onClick={(e) => { e.stopPropagation(); onViewDetail(row.id); }}
                        >
                          详情
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-4 py-16 text-center text-gray-400">
                      暂无匹配的已备案企业记录
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 底部控制区 */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-white select-none">
            <div className="text-sm text-[#666666]">
              显示第 1 到第 {filteredData.length} 条记录，总共 {filteredData.length} 条记录
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-[#999999] bg-gray-50 cursor-not-allowed">上一页</button>
              <button className="px-3 py-1 border border-[#419EFF] rounded text-sm text-white bg-[#419EFF]">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-[#666666] hover:bg-gray-50">下一页</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
