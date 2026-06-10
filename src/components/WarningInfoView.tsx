import React, { useState } from 'react';
import { Search, ChevronDown, Plus, Download, Eye, Edit, Trash2 } from 'lucide-react';

interface WarningRecord {
  id: string;
  warningNo: string;
  warningLevel: string;
  publishTime: string;
  publishUnit: string;
  personName: string;
  idNumber: string;
  personSubCategory: string;
  personCategoryMark: string;
  dynamicInfoCategory: string;
}

const MOCK_DATA: WarningRecord[] = [
  { id: '1', warningNo: 'YJ20260608001', warningLevel: '红色预警', publishTime: '2026-06-08 10:00:00', publishUnit: '福州市公安局', personName: '王某某', idNumber: '350102198001011234', personSubCategory: '涉毒人员', personCategoryMark: '重点管控', dynamicInfoCategory: '入住酒店' },
  { id: '2', warningNo: 'YJ20260607023', warningLevel: '橙色预警', publishTime: '2026-06-07 15:30:00', publishUnit: '厦门市公安局', personName: '李某', idNumber: '350203199505058899', personSubCategory: '在逃人员', personCategoryMark: '重点追踪', dynamicInfoCategory: '购买车票' },
  { id: '3', warningNo: 'YJ20260605011', warningLevel: '黄色预警', publishTime: '2026-06-05 09:15:00', publishUnit: '泉州市公安局', personName: '张某', idNumber: '350503198808083344', personSubCategory: '涉稳人员', personCategoryMark: '常规布控', dynamicInfoCategory: '网吧上网' }
];

export default function WarningInfoView() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [data, setData] = useState<WarningRecord[]>(MOCK_DATA);

  const [filters, setFilters] = useState({
    warningNo: '', warningLevel: '', personSubCategory: '', personName: '', idNumber: '', dynamicInfoCategory: '', dateStart: '', dateEnd: ''
  });

  const toggleAllRows = () => {};

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] p-4 font-sans">
      <div className="bg-white rounded-lg border border-gray-200 mb-4 px-6 py-5 shrink-0 flex items-start justify-between">
        <div className="flex-1 grid grid-cols-3 gap-6 mr-6">
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-28 shrink-0 font-medium whitespace-nowrap">预警信息编号</label>
            <input type="text" value={filters.warningNo} onChange={e => setFilters({...filters, warningNo: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-28 shrink-0 font-medium whitespace-nowrap">预警级别</label>
            <input type="text" value={filters.warningLevel} onChange={e => setFilters({...filters, warningLevel: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-28 shrink-0 font-medium whitespace-nowrap">重点人员细类</label>
            <input type="text" value={filters.personSubCategory} onChange={e => setFilters({...filters, personSubCategory: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>

          {isExpanded && (
            <>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-28 shrink-0 font-medium whitespace-nowrap">重点人员姓名</label>
                <input type="text" value={filters.personName} onChange={e => setFilters({...filters, personName: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-28 shrink-0 font-medium whitespace-nowrap">身份证号</label>
                <input type="text" value={filters.idNumber} onChange={e => setFilters({...filters, idNumber: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-28 shrink-0 font-medium whitespace-nowrap">动态信息类别</label>
                <input type="text" value={filters.dynamicInfoCategory} onChange={e => setFilters({...filters, dynamicInfoCategory: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center flex-1 space-x-2 w-full col-span-3 max-w-[500px]">
                <label className="text-sm text-gray-700 w-28 shrink-0 font-medium whitespace-nowrap">预警发布时间</label>
                <input type="date" value={filters.dateStart} onChange={(e) => setFilters({...filters, dateStart: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                <span className="text-gray-400">至</span>
                <input type="date" value={filters.dateEnd} onChange={(e) => setFilters({...filters, dateEnd: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="h-9 px-5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium">查询</button>
          <button className="h-9 px-5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium">重置</button>
          <button onClick={() => setIsExpanded(!isExpanded)} className="h-9 px-5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium flex items-center">
            {isExpanded ? '收起' : '展开'}
            <ChevronDown size={14} className={`ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
          <h3 className="text-base font-bold text-gray-800 tracking-wide">预警信息列表</h3>
          <div className="flex gap-2">
            <button className="h-8 px-4 bg-white text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">导出</button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="text-gray-600 text-[13px] font-semibold border-b border-gray-200">
                <th className="px-6 py-3 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#419EFF]" checked={selectedRows.length === data.length && data.length > 0} onChange={toggleAllRows} />
                </th>
                <th className="px-6 py-3 font-medium">预警信息编号</th>
                <th className="px-6 py-3 font-medium">预警级别</th>
                <th className="px-6 py-3 font-medium">预警发布时间</th>
                <th className="px-6 py-3 font-medium">发布单位</th>
                <th className="px-6 py-3 font-medium">重点人员姓名</th>
                <th className="px-6 py-3 font-medium">身份证号</th>
                <th className="px-6 py-3 font-medium">重点人员细类</th>
                <th className="px-6 py-3 font-medium">重点人员类别标记</th>
                <th className="px-6 py-3 font-medium">动态信息类别</th>
                <th className="px-6 py-3 font-medium text-center w-36">操作</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              {data.length === 0 && (
                <tr>
                   <td colSpan={11} className="px-6 py-10 text-center text-gray-500">暂无数据</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end shrink-0">
          <div className="flex items-center gap-4 text-[13px] text-gray-600">
            <span>共 {data.length} 条</span>
          </div>
        </div>
      </div>
    </div>
  );
}
