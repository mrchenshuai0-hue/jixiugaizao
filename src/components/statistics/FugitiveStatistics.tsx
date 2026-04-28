import React from 'react';
import StatisticsLayout from './StatisticsLayout';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const fugitiveStatusData = [
  { name: '已抓获', value: 350 },
  { name: '在逃中', value: 120 },
];

const captureTrendData = [
  { month: '1月', count: 45 },
  { month: '2月', count: 52 },
  { month: '3月', count: 38 },
  { month: '4月', count: 60 },
  { month: '5月', count: 48 },
  { month: '6月', count: 72 },
];

const fugitiveTypeData = [
  { name: '抢劫', count: 85 },
  { name: '盗窃', count: 120 },
  { name: '诈骗', count: 65 },
  { name: '伤害', count: 40 },
  { name: '其他', count: 30 },
];

const COLORS = ['#28C76F', '#EA5455', '#419EFF', '#FF9F43', '#99CCFF'];

export default function FugitiveStatistics() {
  const filters = (
    <div className="flex flex-wrap gap-4">
      <input type="text" placeholder="人员姓名" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
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
            <th className="px-4 py-3 border-b border-gray-200">姓名</th>
            <th className="px-4 py-3 border-b border-gray-200">证件号码</th>
            <th className="px-4 py-3 border-b border-gray-200">在逃类别</th>
            <th className="px-4 py-3 border-b border-gray-200">所属地</th>
            <th className="px-4 py-3 border-b border-gray-200">抓获状态</th>
            <th className="px-4 py-3 border-b border-gray-200">抓获日期</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="bg-white border-b border-gray-100 hover:bg-gray-50 text-xs">
              <td className="px-4 py-4 font-medium">张*力</td>
              <td className="px-4 py-4 font-mono">110101******</td>
              <td className="px-4 py-4">盗窃案件</td>
              <td className="px-4 py-4">朝阳区</td>
              <td className="px-4 py-4">
                <span className={`px-2 py-1 rounded-full text-[10px] ${item % 2 === 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {item % 2 === 0 ? '已抓获' : '在逃中'}
                </span>
              </td>
              <td className="px-4 py-4 text-gray-500">{item % 2 === 0 ? '2026-04-15' : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const chart = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#28C76F] pl-2">抓获状态分布</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={fugitiveStatusData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {fugitiveStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#419EFF] pl-2">月度抓获趋势统计</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={captureTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="抓获人数" fill="#419EFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#FF9F43] pl-2">在逃人员案件类别分布</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fugitiveTypeData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="count" name="人员数" fill="#FF9F43" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[
          { label: '抓获总数', value: '350', color: 'text-green-600', bg: 'bg-green-50' },
          { label: '在逃总数', value: '120', color: 'text-red-600', bg: 'bg-red-50' },
          { label: '本月抓获', value: '72', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '抓获率', value: '74.5%', color: 'text-orange-600', bg: 'bg-orange-50' }
        ].map((stat, i) => (
          <div key={i} className={`p-5 rounded-lg border border-gray-100 ${stat.bg}`}>
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return <StatisticsLayout filters={filters} table={table} chart={chart} />;
}
