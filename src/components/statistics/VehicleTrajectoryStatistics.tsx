import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { x: 10, y: 20, z: 1 },
  { x: 20, y: 30, z: 2 },
  { x: 30, y: 40, z: 3 },
  { x: 40, y: 50, z: 4 },
  { x: 50, y: 60, z: 5 },
];

export default function VehicleTrajectoryStatistics() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm min-w-0">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">车辆维修轨迹分析</h2>
      <div className="h-80 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="时间" />
            <YAxis type="number" dataKey="y" name="维修点" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="维修轨迹" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
