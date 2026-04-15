import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { subject: '维修频率', A: 120, fullMark: 150 },
  { subject: '违规记录', A: 98, fullMark: 150 },
  { subject: '检查次数', A: 86, fullMark: 150 },
  { subject: '涉案风险', A: 99, fullMark: 150 },
  { subject: '人员流动', A: 85, fullMark: 150 },
];

export default function KeyAnalysisStatistics() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">高频跟踪与重点分析</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="重点分析" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
