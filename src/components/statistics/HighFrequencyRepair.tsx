import React from 'react';
import StatisticsLayout from './StatisticsLayout';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

const data = [
  { name: '某区', value: 400 },
  { name: '其他区', value: 300 },
  { name: '郊区', value: 300 },
];

const typeData = [
  { name: '日常保养', count: 120 },
  { name: '机修', count: 80 },
  { name: '钣金喷漆', count: 50 },
  { name: '轮胎更换', count: 40 },
];

const trendData = [
  { month: '1月', count: 30 },
  { month: '2月', count: 45 },
  { month: '3月', count: 25 },
  { month: '4月', count: 60 },
  { month: '5月', count: 55 },
];

const COLORS = ['#419EFF', '#66B3FF', '#99CCFF'];

export default function HighFrequencyRepair() {
  const filters = (
    <div className="flex gap-4">
      <input type="text" placeholder="辖区单位" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <input type="date" placeholder="开始时间" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <input type="date" placeholder="结束时间" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <input type="number" placeholder="最小修理次数" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <button className="bg-[#419EFF] text-white px-4 py-1.5 rounded text-sm hover:bg-[#337FCC]">查询</button>
    </div>
  );

  const table = (
    <table className="w-full text-sm text-left border-collapse">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th className="px-4 py-3 border-b border-gray-200">行政区划</th>
          <th className="px-4 py-3 border-b border-gray-200">车辆牌号</th>
          <th className="px-4 py-3 border-b border-gray-200">车辆车架号</th>
          <th className="px-4 py-3 border-b border-gray-200">修理次数</th>
          <th className="px-4 py-3 border-b border-gray-200">第一次修理时间</th>
          <th className="px-4 py-3 border-b border-gray-200">最后一次修理时间</th>
          <th className="px-4 py-3 border-b border-gray-200">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
          <td className="px-4 py-4">某区</td>
          <td className="px-4 py-4">闽A88888</td>
          <td className="px-4 py-4">VIN123456789</td>
          <td className="px-4 py-4">12</td>
          <td className="px-4 py-4">2026-01-01</td>
          <td className="px-4 py-4">2026-04-10</td>
          <td className="px-4 py-4 text-[#419EFF] cursor-pointer hover:underline">跟踪分析</td>
        </tr>
      </tbody>
    </table>
  );

  const chart = (
    <div className="grid grid-cols-2 gap-6">
      <div className="p-4 border border-gray-200 rounded-md min-w-0">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">行政区划维修占比</h3>
        <ResponsiveContainer width="100%" height={256}>
          <PieChart>
            <Pie data={data} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 border border-gray-200 rounded-md min-w-0">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">维修类型分布</h3>
        <ResponsiveContainer width="100%" height={256}>
          <BarChart data={typeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#419EFF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 border border-gray-200 rounded-md col-span-2 min-w-0">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">维修次数趋势图</h3>
        <ResponsiveContainer width="100%" height={256}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#419EFF" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return <StatisticsLayout filters={filters} chart={chart} table={table} />;
}
