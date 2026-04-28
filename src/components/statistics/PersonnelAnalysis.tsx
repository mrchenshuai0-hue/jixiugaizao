import React from 'react';
import StatisticsLayout from './StatisticsLayout';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts';

const hometownData = [
  { name: '北京', count: 320 },
  { name: '上海', count: 280 },
  { name: '河南', count: 250 },
  { name: '山东', count: 210 },
  { name: '河北', count: 180 },
  { name: '浙江', count: 150 },
];

const genderData = [
  { name: '男', count: 850 },
  { name: '女', count: 150 },
];

const trendData = [
  { month: '1月', count: 120 },
  { month: '2月', count: 150 },
  { month: '3月', count: 130 },
  { month: '4月', count: 180 },
];

const COLORS = ['#419EFF', '#EA5455', '#28C76F', '#FF9F43', '#99CCFF'];

export default function PersonnelAnalysis() {
  const filters = (
    <div className="flex flex-wrap gap-4">
      <input type="text" placeholder="籍贯" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <select className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none bg-white">
        <option value="">性别</option>
        <option value="男">男</option>
        <option value="女">女</option>
      </select>
      <input type="date" placeholder="开始时间" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <input type="date" placeholder="结束时间" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <button className="bg-[#419EFF] text-white px-4 py-1.5 rounded text-sm hover:bg-[#337FCC]">查询统计</button>
    </div>
  );

  const table = (
    <table className="w-full text-sm text-left border-collapse">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th className="px-4 py-3 border-b border-gray-200">姓名</th>
          <th className="px-4 py-3 border-b border-gray-200">性别</th>
          <th className="px-4 py-3 border-b border-gray-200">籍贯</th>
          <th className="px-4 py-3 border-b border-gray-200">送/取车次数</th>
          <th className="px-4 py-3 border-b border-gray-200">最后送/取时间</th>
          <th className="px-4 py-3 border-b border-gray-200">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
          <td className="px-4 py-4 font-medium text-gray-900">张三</td>
          <td className="px-4 py-4">男</td>
          <td className="px-4 py-4">北京</td>
          <td className="px-4 py-4 font-bold text-gray-700">15</td>
          <td className="px-4 py-4 text-gray-500">2026-04-20 09:30</td>
          <td className="px-4 py-4 text-[#419EFF] cursor-pointer hover:underline">活动轨迹</td>
        </tr>
        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
          <td className="px-4 py-4 font-medium text-gray-900">李四</td>
          <td className="px-4 py-4">男</td>
          <td className="px-4 py-4">河南</td>
          <td className="px-4 py-4 font-bold text-gray-700">12</td>
          <td className="px-4 py-4 text-gray-500">2026-04-18 14:20</td>
          <td className="px-4 py-4 text-[#419EFF] cursor-pointer hover:underline">活动轨迹</td>
        </tr>
      </tbody>
    </table>
  );

  const chart = (
    <div className="grid grid-cols-2 gap-6">
      <div className="p-4 border border-gray-200 rounded-md min-w-0 bg-white">
        <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#419EFF] pl-2">人员籍贯分布 (Top 6)</h3>
        <ResponsiveContainer width="100%" height={256}>
          <BarChart data={hometownData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" name="人员数" fill="#419EFF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 border border-gray-200 rounded-md min-w-0 bg-white">
        <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#EA5455] pl-2">人员性别占比</h3>
        <ResponsiveContainer width="100%" height={256}>
          <PieChart>
            <Pie data={genderData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="count">
              {genderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 border border-gray-200 rounded-md col-span-2 min-w-0 bg-white">
        <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#28C76F] pl-2">业务频次趋势</h3>
        <ResponsiveContainer width="100%" height={256}>
          <AreaChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" name="送/取车次数" stroke="#28C76F" fill="#28C76F" fillOpacity={0.1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return <StatisticsLayout filters={filters} chart={chart} table={table} />;
}
