import React from 'react';
import StatisticsLayout from './StatisticsLayout';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const categoryData = [
  { name: '刑事案件', value: 35 },
  { name: '治安案件', value: 45 },
  { name: '违规经营', value: 20 },
];

const filedProblemData = [
  { name: '虚假登记', count: 120 },
  { name: '未采集成像', count: 80 },
  { name: '无资质维修', count: 50 },
  { name: '非法改装', count: 30 },
];

const COLORS = ['#419EFF', '#FF9F43', '#EA5455', '#28C76F'];

export default function CaseAnalysis() {
  const filters = (
    <div className="flex flex-wrap gap-4">
      <select className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none bg-white">
        <option value="">案件类别</option>
        <option value="刑事">刑事</option>
        <option value="治安">治安</option>
      </select>
      <input type="date" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <button className="bg-[#419EFF] text-white px-4 py-1.5 rounded text-sm hover:bg-[#337FCC]">查询统计</button>
    </div>
  );

  const table = (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-4 py-3 border-b border-gray-200">问题类别</th>
            <th className="px-4 py-3 border-b border-gray-200">立案数量</th>
            <th className="px-4 py-3 border-b border-gray-200">占比</th>
            <th className="px-4 py-3 border-b border-gray-200">环比增长</th>
          </tr>
        </thead>
        <tbody>
          {filedProblemData.map((d, i) => (
            <tr key={i} className="bg-white border-b border-gray-100 hover:bg-gray-50 text-xs">
              <td className="px-4 py-4">{d.name}</td>
              <td className="px-4 py-4 font-bold">{d.count}</td>
              <td className="px-4 py-4">{(d.count / 2.8).toFixed(1)}%</td>
              <td className="px-4 py-4 text-green-600">↑ 2.5%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const chart = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#419EFF] pl-2">案件类别占比</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categoryData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#EA5455] pl-2">查处问题类别分布</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filedProblemData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" name="立案数" fill="#EA5455" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return <StatisticsLayout filters={filters} table={table} chart={chart} />;
}
