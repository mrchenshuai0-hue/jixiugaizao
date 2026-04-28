import React from 'react';
import StatisticsLayout from './StatisticsLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const personnelFreqData = [
  { name: '张工', freq: 5, company: '某汽修一厂' },
  { name: '李强', freq: 4, company: '欣欣汽修店' },
  { name: '王伟', freq: 4, company: '通达中心' },
  { name: '赵六', freq: 3, company: '诚实喷漆' },
  { name: '陈五', freq: 3, company: '快修中心' },
];

const roleData = [
  { name: '维修技师', value: 45 },
  { name: '前台接待', value: 25 },
  { name: '企业负责人', value: 20 },
  { name: '质量检验员', value: 10 },
];

const COLORS = ['#419EFF', '#FF9F43', '#EA5455', '#28C76F'];

export default function TargetPersonnelAnalysis() {
  const filters = (
    <div className="flex flex-wrap gap-4">
      <input type="text" placeholder="人员姓名" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <select className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none bg-white">
        <option value="">岗位筛选</option>
        <option value="技师">维修技师</option>
        <option value="接待">前台接待</option>
        <option value="负责人">企业负责人</option>
      </select>
      <button className="bg-[#419EFF] text-white px-4 py-1.5 rounded text-sm hover:bg-[#337FCC]">查询统计</button>
    </div>
  );

  const table = (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-4 py-3 border-b border-gray-200">姓名</th>
            <th className="px-4 py-3 border-b border-gray-200">所属企业</th>
            <th className="px-4 py-3 border-b border-gray-200">岗位</th>
            <th className="px-4 py-3 border-b border-gray-200">被查处频次 (次/年)</th>
            <th className="px-4 py-3 border-b border-gray-200">处罚记录</th>
          </tr>
        </thead>
        <tbody>
          {personnelFreqData.map((d, i) => (
            <tr key={i} className="bg-white border-b border-gray-100 hover:bg-gray-50 text-xs">
              <td className="px-4 py-4 font-medium">{d.name}</td>
              <td className="px-4 py-4">{d.company}</td>
              <td className="px-4 py-4">维修技师</td>
              <td className="px-4 py-4 text-red-600 font-bold">{d.freq}</td>
              <td className="px-4 py-4 text-[#419EFF] cursor-pointer hover:underline">查看日志</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const chart = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#FF9F43] pl-2">人员被查处频次分析</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={personnelFreqData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="freq" name="查处频次" fill="#FF9F43" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold mb-6 text-gray-700 border-l-4 border-[#419EFF] pl-2">涉案人员岗位分布</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={roleData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
              {roleData.map((entry, index) => (
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

  return <StatisticsLayout filters={filters} table={table} chart={chart} />;
}
