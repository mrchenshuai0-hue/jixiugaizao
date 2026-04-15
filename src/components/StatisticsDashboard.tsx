import React from 'react';
import RepairStatistics from './statistics/RepairStatistics';
import PersonnelStatistics from './statistics/PersonnelStatistics';
import VehicleTrajectoryStatistics from './statistics/VehicleTrajectoryStatistics';
import InspectionStatistics from './statistics/InspectionStatistics';
import SupervisionStatistics from './statistics/SupervisionStatistics';
import CaseStatistics from './statistics/CaseStatistics';
import KeyAnalysisStatistics from './statistics/KeyAnalysisStatistics';

export default function StatisticsDashboard() {
  return (
    <div className="p-6 h-full overflow-auto bg-[#F5F5F5]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">统计分析概览</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RepairStatistics />
        <PersonnelStatistics />
        <VehicleTrajectoryStatistics />
        <InspectionStatistics />
        <SupervisionStatistics />
        <CaseStatistics />
        <KeyAnalysisStatistics />
      </div>
    </div>
  );
}
