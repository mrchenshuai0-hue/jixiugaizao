import React from 'react';
import StatisticsLayout from './StatisticsLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: '一季度', count: 45 },
  { name: '二季度', count: 52 },
  { name: '三季度', count: 38 },
  { name: '四季度', count: 60 },
];

const typeData = [
  { name: '日常检查', value: 120 },
  { name: '专项检查', value: 80 },
  { name: '双随机检查', value: 50 },
];

const COLORS = ['#419EFF', '#66B3FF', '#99CCFF'];

export default function InspectionStatistics() {
  const filters = (
    <div className="flex gap-4">
      <input type="text" placeholder="管辖单位" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <input type="date" placeholder="开始时间" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <input type="date" placeholder="结束时间" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <select className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none bg-white">
        <option value="">检查类型</option>
        <option value="日常检查">日常检查</option>
        <option value="专项检查">专项检查</option>
      </select>
      <button className="bg-[#419EFF] text-white px-4 py-1.5 rounded text-sm hover:bg-[#337FCC]">查询</button>
    </div>
  );

  const table = (
    <table className="w-full text-sm text-left border-collapse">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th className="px-4 py-3 border-b border-gray-200">管辖单位</th>
          <th className="px-4 py-3 border-b border-gray-200">检查类型</th>
          <th className="px-4 py-3 border-b border-gray-200">检查次数</th>
          <th className="px-4 py-3 border-b border-gray-200">发现问题数</th>
          <th className="px-4 py-3 border-b border-gray-200">整改完成数</th>
          <th className="px-4 py-3 border-b border-gray-200">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
          <td className="px-4 py-4">某区</td>
          <td className="px-4 py-4">日常检查</td>
          <td className="px-4 py-4">150</td>
          <td className="px-4 py-4">12</td>
          <td className="px-4 py-4">12</td>
          <td className="px-4 py-4 text-[#419EFF] cursor-pointer hover:underline">查看详情</td>
        </tr>
        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
          <td className="px-4 py-4">某区</td>
          <td className="px-4 py-4">专项检查</td>
          <td className="px-4 py-4">45</td>
          <td className="px-4 py-4">5</td>
          <td className="px-4 py-4">4</td>
          <td className="px-4 py-4 text-[#419EFF] cursor-pointer hover:underline">查看详情</td>
        </tr>
      </tbody>
    </table>
  );

  const chart = (
    <div className="grid grid-cols-2 gap-6">
      <div className="p-4 border border-gray-200 rounded-md min-w-0">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">季度检查统计</h3>
        <ResponsiveContainer width="100%" height={256}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="检查次数" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 border border-gray-200 rounded-md min-w-0">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">检查类型占比</h3>
        <ResponsiveContainer width="100%" height={256}>
          <PieChart>
            <Pie data={typeData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
              {typeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-white rounded-lg shadow-sm">
      <StatisticsLayout filters={filters} chart={chart} table={table} />
    </div>
  );
}
