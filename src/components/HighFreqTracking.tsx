import React, { useState } from 'react';
import { Search, ChevronDown, Plus, Download, Eye, Edit, Trash2 } from 'lucide-react';

export default function HighFreqTracking() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const MOCK_DATA = [
    { id: '1', region: '福州市-鼓楼区', name: '张伟', idCard: '350102199001014567', isEmployee: '否', repairCount: 15, firstTime: '2026-05-01 09:20:00', lastTime: '2026-06-08 14:30:00' },
    { id: '2', region: '厦门市-思明区', name: '李强', idCard: '350203198512128899', isEmployee: '是', repairCount: 12, firstTime: '2026-04-15 10:15:00', lastTime: '2026-06-07 16:45:00' },
    { id: '3', region: '泉州市-丰泽区', name: '王磊', idCard: '350503199208083344', isEmployee: '否', repairCount: 9, firstTime: '2026-05-10 08:40:00', lastTime: '2026-06-05 11:10:00' },
  ];

  const [data, setData] = useState<any[]>(MOCK_DATA);

  const [filters, setFilters] = useState({
    region: '北京市-北京市公安局', target: '高频送车人', frequency: '5', dateStart: '2026-04-01', dateEnd: '2026-06-09'
  });

  const toggleAllRows = () => {};

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] p-4 font-sans">
      <div className="bg-white rounded-lg border border-gray-200 mb-4 px-6 py-5 shrink-0 flex items-start justify-between">
        <div className="flex-1 grid grid-cols-3 gap-6 mr-6">
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">管辖单位</label>
            <input type="text" value={filters.region} onChange={e => setFilters({...filters, region: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">分析对象</label>
            <select value={filters.target} onChange={e => setFilters({...filters, target: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white">
              <option>高频送车人</option>
              <option>高频取车人</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">统计频次</label>
            <input type="number" value={filters.frequency} onChange={e => setFilters({...filters, frequency: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>

          {isExpanded && (
            <>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">上传时间</label>
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
          <button className="h-9 px-5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium">分析</button>
          <button onClick={() => setIsExpanded(!isExpanded)} className="h-9 px-5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium flex items-center">
            {isExpanded ? '收起' : '展开'}
            <ChevronDown size={14} className={`ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
          <h3 className="text-base font-bold text-gray-800 tracking-wide">高频人群分析结果</h3>
          <div className="flex gap-2">
            <button className="h-8 px-4 bg-white text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">导出</button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="text-gray-600 text-[13px] font-semibold border-b border-gray-200">
                <th className="px-6 py-3 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#419EFF]" checked={selectedRows.length === data.length && data.length > 0} onChange={toggleAllRows} />
                </th>
                <th className="px-6 py-3 font-medium">行政区划</th>
                <th className="px-6 py-3 font-medium">送车人姓名</th>
                <th className="px-6 py-3 font-medium">送车人证件号</th>
                <th className="px-6 py-3 font-medium">是否为从业人员</th>
                <th className="px-6 py-3 font-medium">修理次数</th>
                <th className="px-6 py-3 font-medium">第一次修理时间</th>
                <th className="px-6 py-3 font-medium">最后一次修理时间</th>
                <th className="px-6 py-3 font-medium text-center w-36">跟踪分析</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              {data.length === 0 ? (
                <tr>
                   <td colSpan={9} className="px-6 py-10 text-center text-gray-500">暂无符合条件的数据</td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-3 text-center">
                      <input type="checkbox" className="rounded border-gray-300 text-[#419EFF]" checked={selectedRows.includes(item.id)} onChange={() => {}} />
                    </td>
                    <td className="px-6 py-3">{item.region}</td>
                    <td className="px-6 py-3 font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-3 font-mono text-gray-500">{item.idCard}</td>
                    <td className="px-6 py-3">{item.isEmployee}</td>
                    <td className="px-6 py-3 font-bold text-blue-600">{item.repairCount}</td>
                    <td className="px-6 py-3">{item.firstTime}</td>
                    <td className="px-6 py-3">{item.lastTime}</td>
                    <td className="px-6 py-3 text-center">
                      <button className="text-[#419EFF] hover:text-blue-700 font-medium">详情</button>
                    </td>
                  </tr>
                ))
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
