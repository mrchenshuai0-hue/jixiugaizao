import React from 'react';
import StatisticsLayout from './StatisticsLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const venueData = [
  { name: '某汽车维修一厂', penaltyFreq: 8, totalRepair: 500 },
  { name: '欣欣汽修店', penaltyFreq: 12, totalRepair: 200 },
  { name: '通达维修中心', penaltyFreq: 5, totalRepair: 800 },
  { name: '诚信钣金喷漆', penaltyFreq: 10, totalRepair: 150 },
  { name: '驰名快修', penaltyFreq: 3, totalRepair: 1200 },
];

export default function VenueAnalysis() {
  const filters = (
    <div className="flex flex-wrap gap-4">
      <input type="text" placeholder="企业名称" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <button className="bg-[#419EFF] text-white px-4 py-1.5 rounded text-sm hover:bg-[#337FCC]">查询统计</button>
    </div>
  );

  const table = (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-4 py-3 border-b border-gray-200">企业/场所名称</th>
            <th className="px-4 py-3 border-b border-gray-200">所属地</th>
            <th className="px-4 py-3 border-b border-gray-200">被查处频率 (次/年)</th>
            <th className="px-4 py-3 border-b border-gray-200">累计维修量</th>
            <th className="px-4 py-3 border-b border-gray-200">最后查处日期</th>
          </tr>
        </thead>
        <tbody>
          {venueData.map((d, i) => (
            <tr key={i} className="bg-white border-b border-gray-100 hover:bg-gray-50 text-xs">
              <td className="px-4 py-4 font-medium">{d.name}</td>
              <td className="px-4 py-4">朝阳区</td>
              <td className="px-4 py-4"><span className="font-bold text-red-600">{d.penaltyFreq}</span></td>
              <td className="px-4 py-4">{d.totalRepair}</td>
              <td className="px-4 py-4 text-gray-500">2026-04-20</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const chart = (
    <div className="grid grid-cols-1 gap-6">
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#FF9F43] pl-2">企业/场所被查处频率分析</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={venueData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="penaltyFreq" name="查处频率" fill="#FF9F43" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return <StatisticsLayout filters={filters} table={table} chart={chart} />;
}
