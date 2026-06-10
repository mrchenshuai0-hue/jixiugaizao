import React, { useState } from 'react';
import { Search, FileSpreadsheet, Calendar } from 'lucide-react';

const mockData = [
  { region: '清河分局', totalAlarms: 120, personnelAlarms: 45, personnelCaptured: 10, personnelTotalCaptured: 15, vehicleAlarms: 75, vehicleCaptured: 20, vehicleTotalCaptured: 25 },
  { region: '福州仓山分局', totalAlarms: 80, personnelAlarms: 30, personnelCaptured: 5, personnelTotalCaptured: 8, vehicleAlarms: 50, vehicleCaptured: 15, vehicleTotalCaptured: 18 },
  { region: '测试系统单位', totalAlarms: 0, personnelAlarms: 0, personnelCaptured: 0, personnelTotalCaptured: 0, vehicleAlarms: 0, vehicleCaptured: 0, vehicleTotalCaptured: 0 },
  { region: '合计', totalAlarms: 200, personnelAlarms: 75, personnelCaptured: 15, personnelTotalCaptured: 23, vehicleAlarms: 125, vehicleCaptured: 35, vehicleTotalCaptured: 43 },
];

export default function AlarmInfoStatistics() {
  const [startDate, setStartDate] = useState('2026-06-01');
  const [endDate, setEndDate] = useState('2026-06-09');
  const [region, setRegion] = useState('北京市-北京市公安局');

  const filters = (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 mb-3 flex items-start justify-between">
      <div className="flex-1 grid grid-cols-3 gap-6 mr-6">
        <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 w-24 shrink-0 whitespace-nowrap">行政区划</span>
            <div className="relative flex-1">
              <input 
                type="text" 
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1.5 h-9 text-sm focus:border-[#419EFF] outline-none pr-8 bg-white"
              />
              <Search size={16} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#1890ff] cursor-pointer hover:text-blue-700" />
            </div>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 w-24 shrink-0 whitespace-nowrap">检查日期</span>
          <div className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <input 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1 text-sm h-9 focus:border-[#419EFF] outline-none text-gray-600 appearance-none bg-white"
              />
            </div>
            <span className="px-1 text-gray-400">-</span>
            <div className="relative flex-1">
              <input 
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1 text-sm h-9 focus:border-[#419EFF] outline-none text-gray-600 appearance-none bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <div className="flex gap-2">
          <button className="bg-[#f8f9fa] border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-300 px-5 py-2 rounded h-9 flex items-center text-sm transition-colors font-medium shadow-sm active:bg-gray-100">
            报警统计
          </button>
          <button className="bg-[#f8f9fa] border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-300 px-5 py-2 rounded h-9 flex items-center text-sm transition-colors font-medium shadow-sm active:bg-gray-100 gap-2">
            <FileSpreadsheet size={16} className="text-green-600" /> 导出
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-[#f0f2f5] p-3 overflow-auto custom-scrollbar font-sans text-left">
      {filters}
      
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">

        <div className="border border-gray-300 rounded overflow-hidden">
          <table className="w-full text-sm text-center border-collapse bg-white min-w-[1000px]">
            <thead>
              <tr className="bg-[#f8f9fc] text-gray-700 font-bold border-b border-gray-200">
                <th rowSpan={2} className="px-4 py-4 border-r border-gray-200 text-center">行政区划</th>
                <th rowSpan={2} className="px-4 py-4 border-r border-gray-200 text-center">报警总数</th>
                <th colSpan={3} className="px-4 py-4 border-r border-b border-gray-200 text-center">人员报警</th>
                <th colSpan={3} className="px-4 py-4 border-b border-gray-200 text-center">车辆报警</th>
              </tr>
              <tr className="bg-[#f8f9fc] text-gray-700 border-b border-gray-200">
                <th className="px-4 py-4 border-r border-gray-200 font-bold">报警数</th>
                <th className="px-4 py-4 border-r border-gray-200 font-bold">报警抓获数</th>
                <th className="px-4 py-4 border-r border-gray-200 font-bold whitespace-pre-wrap leading-tight">总抓获数<br/>(报警抓获+补登抓获)</th>
                
                <th className="px-4 py-4 border-r border-gray-200 font-bold">报警数</th>
                <th className="px-4 py-4 border-r border-gray-200 font-bold">报警抓获数</th>
                <th className="px-4 py-4 font-bold whitespace-pre-wrap leading-tight">总抓获数<br/>(报警抓获+补登抓获)</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((d, i) => (
                <tr 
                  key={i} 
                  className={`border-b border-gray-100 last:border-b-0 hover:bg-blue-50/50 transition-colors ${
                    i % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'
                  } ${d.region === '合计' ? 'font-bold bg-[#f0f7ff]' : ''}`}
                >
                  <td className="px-4 py-4 border-r border-gray-100 text-center">{d.region}</td>
                  <td className="px-4 py-4 border-r border-gray-100">{d.totalAlarms}</td>
                  
                  <td className="px-4 py-4 border-r border-gray-100">{d.personnelAlarms}</td>
                  <td className="px-4 py-4 border-r border-gray-100">{d.personnelCaptured}</td>
                  <td className="px-4 py-4 border-r border-gray-100">{d.personnelTotalCaptured}</td>
                  
                  <td className="px-4 py-4 border-r border-gray-100">{d.vehicleAlarms}</td>
                  <td className="px-4 py-4 border-r border-gray-100">{d.vehicleCaptured}</td>
                  <td className="px-4 py-4">{d.vehicleTotalCaptured}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
