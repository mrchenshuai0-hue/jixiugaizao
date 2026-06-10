import React, { useState } from 'react';
import { Search, ChevronDown, Plus, Download, Eye, Edit, Trash2 } from 'lucide-react';

export default function KeyPersonnelControl() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const MOCK_DATA = [
    { id: '1', name: '李明', idNumber: '350102198005081122', hukou: '福建省福州市鼓楼区', phone: '13800138000', gender: '男', businessType: '从业人员', enterpriseName: '福州第一汽修', enterpriseCode: 'FZ001', region: '福州市-鼓楼区', category: '刑拘释放人员', subCategory: '盗窃罪', compareTime: '2026-06-08 15:30:00' },
    { id: '2', name: '张华', idNumber: '350203199510103344', hukou: '福建省厦门市思明区', phone: '13900139000', gender: '女', businessType: '送车人', enterpriseName: '厦门星耀修配', enterpriseCode: 'XM002', region: '厦门市-思明区', category: '涉赌人员', subCategory: '聚众赌博', compareTime: '2026-06-07 09:15:00' }
  ];

  const [data, setData] = useState<any[]>(MOCK_DATA);

  const [filters, setFilters] = useState({
    region: '北京市-北京市公安局', idNumber: '', name: '', dateStart: '2026-05-09', dateEnd: '2026-06-08',
    enterpriseCode: '', enterpriseName: '', personnelCategory: '', businessType: ''
  });

  const toggleAllRows = () => {};

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] p-4 font-sans">
      <div className="bg-white rounded-lg border border-gray-200 mb-4 px-6 py-5 shrink-0 flex items-start justify-between">
        <div className="flex-1 grid grid-cols-3 gap-6 mr-6">
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">行政区划</label>
            <input type="text" value={filters.region} onChange={e => setFilters({...filters, region: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">身份证号</label>
            <input type="text" value={filters.idNumber} onChange={e => setFilters({...filters, idNumber: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">姓名</label>
            <input type="text" value={filters.name} onChange={e => setFilters({...filters, name: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>

          {isExpanded && (
            <>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">比对时间</label>
                <div className="flex-1 flex gap-2">
                  <input type="date" value={filters.dateStart} onChange={(e) => setFilters({...filters, dateStart: e.target.value})} className="flex-1 h-9 px-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 min-w-0" />
                  <span className="text-gray-400 flex items-center">-</span>
                  <input type="date" value={filters.dateEnd} onChange={(e) => setFilters({...filters, dateEnd: e.target.value})} className="flex-1 h-9 px-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 min-w-0" />
                </div>
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">企业编码</label>
                <input type="text" value={filters.enterpriseCode} onChange={e => setFilters({...filters, enterpriseCode: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">关联企业名称</label>
                <input type="text" value={filters.enterpriseName} onChange={e => setFilters({...filters, enterpriseName: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">重点人员类别</label>
                <input type="text" value={filters.personnelCategory} onChange={e => setFilters({...filters, personnelCategory: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">人员业务类型</label>
                <select value={filters.businessType} onChange={e => setFilters({...filters, businessType: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white">
                  <option>--请选择--</option>
                  <option>送车人</option>
                  <option>取车人</option>
                  <option>从业人员</option>
                </select>
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
          <h3 className="text-base font-bold text-gray-800 tracking-wide">重点人员列表</h3>
          <div className="flex gap-2">
            <button className="h-8 px-4 bg-white text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">导出</button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1500px]">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="text-gray-600 text-[13px] font-semibold border-b border-gray-200">
                <th className="px-6 py-3 border-r border-gray-200 font-medium">姓名</th>
                <th className="px-6 py-3 border-r border-gray-200 font-medium">身份证号</th>
                <th className="px-6 py-3 border-r border-gray-200 font-medium">户籍所在地</th>
                <th className="px-6 py-3 border-r border-gray-200 font-medium">电话</th>
                <th className="px-6 py-3 border-r border-gray-200 font-medium">性别</th>
                <th className="px-6 py-3 border-r border-gray-200 font-medium">人员业务类型</th>
                <th className="px-6 py-3 border-r border-gray-200 font-medium">关联企业名称</th>
                <th className="px-6 py-3 border-r border-gray-200 font-medium">企业编码</th>
                <th className="px-6 py-3 border-r border-gray-200 font-medium">行政区划</th>
                <th className="px-6 py-3 border-r border-gray-200 font-medium">重点人员类别</th>
                <th className="px-6 py-3 border-r border-gray-200 font-medium">重点人员细类</th>
                <th className="px-6 py-3 font-medium">比对时间</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              {data.length === 0 ? (
                <tr>
                   <td colSpan={12} className="px-6 py-10 text-center text-gray-500">暂无数据</td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-3 border-r border-gray-200">{item.name}</td>
                    <td className="px-6 py-3 border-r border-gray-200 font-mono text-gray-500">{item.idNumber}</td>
                    <td className="px-6 py-3 border-r border-gray-200">{item.hukou}</td>
                    <td className="px-6 py-3 border-r border-gray-200">{item.phone}</td>
                    <td className="px-6 py-3 border-r border-gray-200">{item.gender}</td>
                    <td className="px-6 py-3 border-r border-gray-200">{item.businessType}</td>
                    <td className="px-6 py-3 border-r border-gray-200">{item.enterpriseName}</td>
                    <td className="px-6 py-3 border-r border-gray-200">{item.enterpriseCode}</td>
                    <td className="px-6 py-3 border-r border-gray-200">{item.region}</td>
                    <td className="px-6 py-3 border-r border-gray-200 text-red-600 font-medium">{item.category}</td>
                    <td className="px-6 py-3 border-r border-gray-200 text-orange-600">{item.subCategory}</td>
                    <td className="px-6 py-3">{item.compareTime}</td>
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
