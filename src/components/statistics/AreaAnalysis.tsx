import React from 'react';
import StatisticsLayout from './StatisticsLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const areaData = [
  { name: '朝阳区', density: 120, investigatedRate: 15 },
  { name: '海淀区', density: 100, investigatedRate: 12 },
  { name: '丰台区', density: 85, investigatedRate: 20 },
  { name: '石景山区', density: 60, investigatedRate: 8 },
  { name: '通州区', density: 95, investigatedRate: 25 },
];

const investigatedData = [
  { name: '已查处企业', value: 45 },
  { name: '未查处企业', value: 300 },
];

const COLORS = ['#EA5455', '#28C76F'];

export default function AreaAnalysis() {
  const filters = (
    <div className="flex flex-wrap gap-4">
      <input type="text" placeholder="地区名称" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
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
            <th className="px-4 py-3 border-b border-gray-200">地区名称</th>
            <th className="px-4 py-3 border-b border-gray-200">企业总数</th>
            <th className="px-4 py-3 border-b border-gray-200">分布密度 (个/k㎡)</th>
            <th className="px-4 py-3 border-b border-gray-200">被查处企业数</th>
            <th className="px-4 py-3 border-b border-gray-200">被查处占比</th>
          </tr>
        </thead>
        <tbody>
          {areaData.map((d, i) => (
            <tr key={i} className="bg-white border-b border-gray-100 hover:bg-gray-50 uppercase text-xs">
              <td className="px-4 py-4 font-medium">{d.name}</td>
              <td className="px-4 py-4">{d.density * 5}</td>
              <td className="px-4 py-4 text-blue-600 font-bold">{d.density}</td>
              <td className="px-4 py-4 text-red-500 font-bold">{(d.density * 5 * (d.investigatedRate / 100)).toFixed(0)}</td>
              <td className="px-4 py-4">
                <span className={`px-2 py-1 rounded ${d.investigatedRate > 20 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {d.investigatedRate}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const chart = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#419EFF] pl-2">企业分布密集度分析</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={areaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="density" name="分布密度" fill="#419EFF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#EA5455] pl-2">各地区查处比例趋势</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={areaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="%" />
            <Tooltip />
            <Legend />
            <Bar dataKey="investigatedRate" name="被查处占比" fill="#EA5455" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return <StatisticsLayout filters={filters} table={table} chart={chart} />;
}
