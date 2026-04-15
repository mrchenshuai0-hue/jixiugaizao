import React from 'react';
import StatisticsLayout from './StatisticsLayout';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

const data = [
  { name: '从业人员', value: 700 },
  { name: '非从业人员', value: 300 },
];

const freqData = [
  { name: '1-2次', count: 400 },
  { name: '3-5次', count: 300 },
  { name: '6-10次', count: 200 },
  { name: '10次以上', count: 100 },
];

const timeData = [
  { time: '00:00-06:00', count: 20 },
  { time: '06:00-12:00', count: 150 },
  { time: '12:00-18:00', count: 200 },
  { time: '18:00-24:00', count: 80 },
];

const COLORS = ['#419EFF', '#FF9F40'];

export default function PersonnelAnalysis() {
  const filters = (
    <div className="flex gap-4">
      <input type="text" placeholder="管辖单位" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <input type="date" placeholder="取车时间" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <input type="date" placeholder="送车时间" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <select className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none bg-white">
        <option value="">分析对象</option>
        <option value="从业人员">从业人员</option>
        <option value="非从业人员">非从业人员</option>
      </select>
      <input type="number" placeholder="最小送车频次" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <button className="bg-[#419EFF] text-white px-4 py-1.5 rounded text-sm hover:bg-[#337FCC]">查询</button>
    </div>
  );

  const table = (
    <table className="w-full text-sm text-left border-collapse">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th className="px-4 py-3 border-b border-gray-200">行政区划</th>
          <th className="px-4 py-3 border-b border-gray-200">送车人姓名</th>
          <th className="px-4 py-3 border-b border-gray-200">送车人证件号</th>
          <th className="px-4 py-3 border-b border-gray-200">是否为从业人员</th>
          <th className="px-4 py-3 border-b border-gray-200">修理次数</th>
          <th className="px-4 py-3 border-b border-gray-200">第一次修理时间</th>
          <th className="px-4 py-3 border-b border-gray-200">最后一次修理时间</th>
          <th className="px-4 py-3 border-b border-gray-200">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
          <td className="px-4 py-4">某区</td>
          <td className="px-4 py-4">张三</td>
          <td className="px-4 py-4">110101...</td>
          <td className="px-4 py-4">是</td>
          <td className="px-4 py-4">15</td>
          <td className="px-4 py-4">2026-01-01</td>
          <td className="px-4 py-4">2026-04-10</td>
          <td className="px-4 py-4 text-[#419EFF] cursor-pointer hover:underline">跟踪分析</td>
        </tr>
      </tbody>
    </table>
  );

  const chart = (
    <div className="grid grid-cols-2 gap-6">
      <div className="p-4 border border-gray-200 rounded-md">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">从业人员占比</h3>
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
      <div className="p-4 border border-gray-200 rounded-md">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">送车频次分布</h3>
        <ResponsiveContainer width="100%" height={256}>
          <BarChart data={freqData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#419EFF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 border border-gray-200 rounded-md col-span-2">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">异常送车时间段分析</h3>
        <ResponsiveContainer width="100%" height={256}>
          <LineChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#FF9F40" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return <StatisticsLayout filters={filters} chart={chart} table={table} />;
}
