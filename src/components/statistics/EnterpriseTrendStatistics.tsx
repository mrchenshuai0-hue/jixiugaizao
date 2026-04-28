import React from 'react';
import StatisticsLayout from './StatisticsLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';

const trendData = [
  { name: '1月', inLibrary: 1200, new: 50, inOperation: 1150, deregistered: 5 },
  { name: '2月', inLibrary: 1240, new: 45, inOperation: 1190, deregistered: 4 },
  { name: '3月', inLibrary: 1260, new: 30, inOperation: 1210, deregistered: 10 },
  { name: '4月', inLibrary: 1300, new: 60, inOperation: 1250, deregistered: 8 },
  { name: '5月', inLibrary: 1330, new: 40, inOperation: 1280, deregistered: 6 },
  { name: '6月', inLibrary: 1380, new: 55, inOperation: 1320, deregistered: 7 },
];

const COLORS = ['#419EFF', '#28C76F', '#FF9F43', '#EA5455'];

export default function EnterpriseTrendStatistics() {
  const filters = (
    <div className="flex flex-wrap gap-4">
      <input type="text" placeholder="管辖单位" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <div className="flex items-center gap-2">
        <input type="date" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
        <span className="text-gray-400">-</span>
        <input type="date" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      </div>
      <button className="bg-[#419EFF] text-white px-4 py-1.5 rounded text-sm hover:bg-[#337FCC]">查询统计</button>
    </div>
  );

  const table = (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-4 py-3 border-b border-gray-200">月份</th>
            <th className="px-4 py-3 border-b border-gray-200">在库企业</th>
            <th className="px-4 py-3 border-b border-gray-200">新增企业</th>
            <th className="px-4 py-3 border-b border-gray-200">在营企业</th>
            <th className="px-4 py-3 border-b border-gray-200">注销企业</th>
          </tr>
        </thead>
        <tbody>
          {trendData.map((d, i) => (
            <tr key={i} className="bg-white border-b border-gray-100 hover:bg-gray-50 uppercase">
              <td className="px-4 py-4">{d.name}</td>
              <td className="px-4 py-4">{d.inLibrary}</td>
              <td className="px-4 py-4 text-blue-600">+{d.new}</td>
              <td className="px-4 py-4 text-green-600">{d.inOperation}</td>
              <td className="px-4 py-4 text-red-600">{d.deregistered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const chart = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 border border-gray-200 rounded-md min-w-0 bg-white">
          <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#419EFF] pl-2">企业趋势分析 (在库/在营)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="inLibrary" name="在库企业" stroke="#419EFF" fill="#419EFF" fillOpacity={0.1} />
              <Area type="monotone" dataKey="inOperation" name="在营企业" stroke="#28C76F" fill="#28C76F" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4 border border-gray-200 rounded-md min-w-0 bg-white">
          <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#FF9F43] pl-2">企业变动分析 (新增/注销)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="new" name="新增企业" fill="#FF9F43" radius={[4, 4, 0, 0]} />
              <Bar dataKey="deregistered" name="注销企业" fill="#EA5455" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[
          { label: '在库总量', value: '1,380', color: 'text-[#419EFF]', bg: 'bg-blue-50' },
          { label: '本月新增', value: '55', color: 'text-[#28C76F]', bg: 'bg-green-50' },
          { label: '在营总量', value: '1,320', color: 'text-[#FF9F43]', bg: 'bg-orange-50' },
          { label: '本月注销', value: '7', color: 'text-[#EA5455]', bg: 'bg-red-50' }
        ].map((stat, i) => (
          <div key={i} className={`p-5 rounded-lg border border-gray-100 ${stat.bg}`}>
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full bg-white rounded-lg shadow-sm">
      <StatisticsLayout filters={filters} chart={chart} table={table} />
    </div>
  );
}
