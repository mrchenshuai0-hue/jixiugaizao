import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '闽A88888', count: 12 },
  { name: '闽A66666', count: 8 },
  { name: '闽A12345', count: 5 },
  { name: '闽A99999', count: 3 },
  { name: '闽A77777', count: 2 },
];

export default function RepairStatistics() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">高频维修车辆统计分析</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="维修次数" fill="#419EFF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
