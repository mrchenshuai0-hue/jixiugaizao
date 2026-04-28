import React from 'react';
import StatisticsLayout from './StatisticsLayout';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

const brandData = [
  { name: '大众', count: 150 },
  { name: '丰田', count: 120 },
  { name: '别克', count: 80 },
  { name: '本田', count: 70 },
  { name: '宝马', count: 45 },
];

const originData = [
  { name: '本地', count: 400 },
  { name: '外地', count: 150 },
];

const trendData = [
  { month: '1月', count: 30 },
  { month: '2月', count: 45 },
  { month: '3月', count: 25 },
  { month: '4月', count: 60 },
  { month: '5月', count: 55 },
];

const COLORS = ['#419EFF', '#FF9F43', '#28C76F', '#EA5455', '#99CCFF'];

export default function HighFrequencyRepair() {
  const filters = (
    <div className="flex flex-wrap gap-4">
      <input type="text" placeholder="车辆品牌" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <select className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none bg-white">
        <option value="">车辆归属地</option>
        <option value="本地">本地</option>
        <option value="外地">外地</option>
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
          <th className="px-4 py-3 border-b border-gray-200">车辆品牌</th>
          <th className="px-4 py-3 border-b border-gray-200">号牌号码</th>
          <th className="px-4 py-3 border-b border-gray-200">归属地</th>
          <th className="px-4 py-3 border-b border-gray-200">维修次数</th>
          <th className="px-4 py-3 border-b border-gray-200">最近维修时间</th>
          <th className="px-4 py-3 border-b border-gray-200">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
          <td className="px-4 py-4">大众</td>
          <td className="px-4 py-4 font-medium text-gray-900">京A88888</td>
          <td className="px-4 py-4">本地</td>
          <td className="px-4 py-4"><span className="px-2 py-1 bg-red-50 text-red-600 rounded-full font-bold">12</span></td>
          <td className="px-4 py-4 text-gray-500">2026-04-10 10:30</td>
          <td className="px-4 py-4 text-[#419EFF] cursor-pointer hover:underline">车辆轨迹</td>
        </tr>
        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
          <td className="px-4 py-4">丰田</td>
          <td className="px-4 py-4 font-medium text-gray-900">沪B66666</td>
          <td className="px-4 py-4">外地</td>
          <td className="px-4 py-4"><span className="px-2 py-1 bg-red-50 text-red-600 rounded-full font-bold">8</span></td>
          <td className="px-4 py-4 text-gray-500">2026-04-12 15:45</td>
          <td className="px-4 py-4 text-[#419EFF] cursor-pointer hover:underline">车辆轨迹</td>
        </tr>
      </tbody>
    </table>
  );

  const chart = (
    <div className="grid grid-cols-2 gap-6">
      <div className="p-4 border border-gray-200 rounded-md min-w-0 bg-white">
        <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#419EFF] pl-2">车辆品牌统计</h3>
        <ResponsiveContainer width="100%" height={256}>
          <BarChart data={brandData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" name="维修次数" fill="#419EFF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 border border-gray-200 rounded-md min-w-0 bg-white">
        <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#28C76F] pl-2">车辆归属地分布</h3>
        <ResponsiveContainer width="100%" height={256}>
          <PieChart>
            <Pie data={originData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="count">
              {originData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 border border-gray-200 rounded-md col-span-2 min-w-0 bg-white">
        <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#FF9F43] pl-2">高频维修趋势波动</h3>
        <ResponsiveContainer width="100%" height={256}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" name="高频维修数" stroke="#FF9F43" activeDot={{ r: 8 }} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return <StatisticsLayout filters={filters} chart={chart} table={table} />;
}
