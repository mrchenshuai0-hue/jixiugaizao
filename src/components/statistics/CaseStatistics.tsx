import React from 'react';
import StatisticsLayout from './StatisticsLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: '某区', value: 400 },
  { name: '其他区', value: 300 },
  { name: '郊区', value: 300 },
];

const COLORS = ['#419EFF', '#66B3FF', '#99CCFF'];

export default function CaseStatistics() {
  const filters = (
    <div className="flex gap-4">
      <input type="text" placeholder="管辖单位" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <input type="date" placeholder="开始时间" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <input type="date" placeholder="结束时间" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <select className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none bg-white">
        <option value="">案件类型</option>
        <option value="刑事案件">刑事案件</option>
        <option value="治安案件">治安案件</option>
      </select>
      <button className="bg-[#419EFF] text-white px-4 py-1.5 rounded text-sm hover:bg-[#337FCC]">查询</button>
    </div>
  );

  const table = (
    <table className="w-full text-sm text-left border-collapse">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th className="px-4 py-3 border-b border-gray-200">管辖单位</th>
          <th className="px-4 py-3 border-b border-gray-200">案件类型</th>
          <th className="px-4 py-3 border-b border-gray-200">案件数量</th>
          <th className="px-4 py-3 border-b border-gray-200">涉案企业数</th>
          <th className="px-4 py-3 border-b border-gray-200">涉案人员数</th>
          <th className="px-4 py-3 border-b border-gray-200">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
          <td className="px-4 py-4">某区</td>
          <td className="px-4 py-4">刑事案件</td>
          <td className="px-4 py-4">15</td>
          <td className="px-4 py-4">3</td>
          <td className="px-4 py-4">12</td>
          <td className="px-4 py-4 text-[#419EFF] cursor-pointer hover:underline">查看详情</td>
        </tr>
        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
          <td className="px-4 py-4">某区</td>
          <td className="px-4 py-4">治安案件</td>
          <td className="px-4 py-4">45</td>
          <td className="px-4 py-4">10</td>
          <td className="px-4 py-4">25</td>
          <td className="px-4 py-4 text-[#419EFF] cursor-pointer hover:underline">查看详情</td>
        </tr>
      </tbody>
    </table>
  );

  const chart = (
    <div className="grid grid-cols-2 gap-6">
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 min-w-0">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">重点地区分析</h2>
        <div className="h-64 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#419EFF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 min-w-0">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">重点企业分析</h2>
        <div className="h-64 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 min-w-0">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">重点案件分析</h2>
        <div className="h-64 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 min-w-0">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">重点人员分析</h2>
        <div className="h-64 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-white rounded-lg shadow-sm">
      <StatisticsLayout filters={filters} chart={chart} table={table} />
    </div>
  );
}
