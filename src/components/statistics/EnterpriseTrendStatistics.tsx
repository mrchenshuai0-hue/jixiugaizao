import React from 'react';
import StatisticsLayout from './StatisticsLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';

const trendData = [
  { name: '1月', count: 30 },
  { name: '2月', count: 45 },
  { name: '3月', count: 25 },
  { name: '4月', count: 50 },
  { name: '5月', count: 40 },
  { name: '6月', count: 60 },
];

const typeData = [
  { name: '一类维修', count: 120 },
  { name: '二类维修', count: 280 },
  { name: '三类维修', count: 450 },
];

const statusData = [
  { name: '正常营业', value: 850 },
  { name: '停业整顿', value: 45 },
  { name: '注销/吊销', value: 20 },
];

const regionData = [
  { name: '某区', count: 320 },
  { name: '其他区', count: 280 },
  { name: '郊区', count: 150 },
  { name: '新区', count: 100 },
];

const COLORS = ['#419EFF', '#FF9F43', '#EA5455', '#28C76F'];

export default function EnterpriseTrendStatistics() {
  const filters = (
    <div className="flex gap-4">
      <input type="text" placeholder="管辖单位" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <input type="date" placeholder="开始时间" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <input type="date" placeholder="结束时间" className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none" />
      <select className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-[#419EFF] outline-none bg-white">
        <option value="">企业类型</option>
        <option value="一类维修">一类维修</option>
        <option value="二类维修">二类维修</option>
        <option value="三类维修">三类维修</option>
      </select>
      <button className="bg-[#419EFF] text-white px-4 py-1.5 rounded text-sm hover:bg-[#337FCC]">查询</button>
    </div>
  );

  const table = (
    <table className="w-full text-sm text-left border-collapse">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th className="px-4 py-3 border-b border-gray-200">管辖单位</th>
          <th className="px-4 py-3 border-b border-gray-200">企业名称</th>
          <th className="px-4 py-3 border-b border-gray-200">企业类型</th>
          <th className="px-4 py-3 border-b border-gray-200">备案日期</th>
          <th className="px-4 py-3 border-b border-gray-200">状态</th>
          <th className="px-4 py-3 border-b border-gray-200">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
          <td className="px-4 py-4">某区</td>
          <td className="px-4 py-4">某汽车维修有限公司</td>
          <td className="px-4 py-4">一类维修</td>
          <td className="px-4 py-4">2026-01-15</td>
          <td className="px-4 py-4"><span className="text-green-600 bg-green-50 px-2 py-1 rounded">正常营业</span></td>
          <td className="px-4 py-4 text-[#419EFF] cursor-pointer hover:underline">查看详情</td>
        </tr>
        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
          <td className="px-4 py-4">某区</td>
          <td className="px-4 py-4">某快捷汽修店</td>
          <td className="px-4 py-4">三类维修</td>
          <td className="px-4 py-4">2026-03-20</td>
          <td className="px-4 py-4"><span className="text-green-600 bg-green-50 px-2 py-1 rounded">正常营业</span></td>
          <td className="px-4 py-4 text-[#419EFF] cursor-pointer hover:underline">查看详情</td>
        </tr>
        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
          <td className="px-4 py-4">其他区</td>
          <td className="px-4 py-4">某专业钣金喷漆</td>
          <td className="px-4 py-4">二类维修</td>
          <td className="px-4 py-4">2025-11-10</td>
          <td className="px-4 py-4"><span className="text-orange-600 bg-orange-50 px-2 py-1 rounded">停业整顿</span></td>
          <td className="px-4 py-4 text-[#419EFF] cursor-pointer hover:underline">查看详情</td>
        </tr>
      </tbody>
    </table>
  );

  const chart = (
    <div className="grid grid-cols-2 gap-6">
      <div className="p-4 border border-gray-200 rounded-md">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">企业新增趋势</h3>
        <ResponsiveContainer width="100%" height={256}>
          <AreaChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" name="新增企业数" stroke="#419EFF" fill="#419EFF" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 border border-gray-200 rounded-md">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">企业类型分布</h3>
        <ResponsiveContainer width="100%" height={256}>
          <BarChart data={typeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="企业数量" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 border border-gray-200 rounded-md">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">辖区企业分布</h3>
        <ResponsiveContainer width="100%" height={256}>
          <BarChart data={regionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="企业数量" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 border border-gray-200 rounded-md">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">企业状态分布</h3>
        <ResponsiveContainer width="100%" height={256}>
          <PieChart>
            <Pie data={statusData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
              {statusData.map((entry, index) => (
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
