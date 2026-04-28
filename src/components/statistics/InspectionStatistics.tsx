import React from 'react';
import StatisticsLayout from './StatisticsLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const problemCategoryData = [
  { name: '未如实登记', value: 120 },
  { name: '上传不及时', value: 80 },
  { name: '信息不完整', value: 50 },
  { name: '无证经营', value: 30 },
  { name: '非法改装', value: 20 },
];

const timeTrendData = [
  { name: '1月', checkCount: 150, problemCount: 45 },
  { name: '2月', checkCount: 120, problemCount: 38 },
  { name: '3月', checkCount: 180, problemCount: 52 },
  { name: '4月', checkCount: 200, problemCount: 65 },
  { name: '5月', checkCount: 160, problemCount: 42 },
  { name: '6月', checkCount: 190, problemCount: 48 },
];

const COLORS = ['#419EFF', '#FF9F43', '#EA5455', '#28C76F', '#99CCFF'];

export default function InspectionStatistics() {
  const filters = (
    <div className="flex flex-wrap gap-4">
      <input type="text" placeholder="管辖单位" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <div className="flex items-center gap-2">
        <input type="date" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
        <span className="text-gray-400">-</span>
        <input type="date" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      </div>
      <select className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none bg-white">
        <option value="">问题类别</option>
        <option value="未如实登记">未如实登记</option>
        <option value="上传不及时">上传不及时</option>
        <option value="信息不完整">信息不完整</option>
      </select>
      <button className="bg-[#419EFF] text-white px-4 py-1.5 rounded text-sm hover:bg-[#337FCC]">查询统计</button>
    </div>
  );

  const table = (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-4 py-3 border-b border-gray-200">月份</th>
            <th className="px-4 py-3 border-b border-gray-200">检查次数</th>
            <th className="px-4 py-3 border-b border-gray-200">发现问题数</th>
            <th className="px-4 py-3 border-b border-gray-200">整改率</th>
            <th className="px-4 py-3 border-b border-gray-200">占比</th>
          </tr>
        </thead>
        <tbody>
          {timeTrendData.map((d, i) => (
            <tr key={i} className="bg-white border-b border-gray-100 hover:bg-gray-50 uppercase text-xs">
              <td className="px-4 py-4">{d.name}</td>
              <td className="px-4 py-4">{d.checkCount}</td>
              <td className="px-4 py-4 text-red-500 font-bold">{d.problemCount}</td>
              <td className="px-4 py-4 text-green-600">{(100 - (d.problemCount/d.checkCount * 100)).toFixed(1)}%</td>
              <td className="px-4 py-4">{(d.checkCount / 10).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const chart = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 border border-gray-200 rounded-md min-w-0 bg-white shadow-sm">
          <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#EA5455] pl-2">问题类别分布 (饼图)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={problemCategoryData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {problemCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4 border border-gray-200 rounded-md min-w-0 bg-white shadow-sm">
          <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#419EFF] pl-2">检查与问题趋势 (柱状图)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="checkCount" name="检查次数" fill="#419EFF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="problemCount" name="发现问题" fill="#EA5455" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
          <p className="text-xs text-red-600 font-bold mb-2 uppercase tracking-tight">重点关注问题</p>
          <p className="text-lg font-bold text-red-800 mb-1">未如实登记</p>
          <p className="text-sm text-red-600">总计发现 120 起，占比 40%</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <p className="text-xs text-blue-600 font-bold mb-2 uppercase tracking-tight">检查覆盖率</p>
          <p className="text-lg font-bold text-blue-800 mb-1">92.5%</p>
          <p className="text-sm text-blue-600">本年度累计检查 1000 次</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <p className="text-xs text-green-600 font-bold mb-2 uppercase tracking-tight">整改完成率</p>
          <p className="text-lg font-bold text-green-800 mb-1">98.2%</p>
          <p className="text-sm text-green-600">环比上升 2.1%</p>
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
