import React, { useState } from 'react';
import HighFrequencyRepair from './HighFrequencyRepair';
import PersonnelAnalysis from './PersonnelAnalysis';
import VehicleTrajectory from './VehicleTrajectory';
import { Car, Users, Map } from 'lucide-react';

export default function RepairAnalysis() {
  const [activeTab, setActiveTab] = useState('高频维修车辆');

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm">
      <div className="flex border-b border-gray-200 px-5 bg-gray-50 rounded-t-lg">
        <button 
          className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center ${activeTab === '高频维修车辆' ? 'border-[#419EFF] text-[#419EFF] bg-white' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('高频维修车辆')}
        >
          <Car size={16} className="mr-2" /> 高频维修车辆
        </button>
        <button 
          className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center ${activeTab === '送取车人员' ? 'border-[#419EFF] text-[#419EFF] bg-white' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('送取车人员')}
        >
          <Users size={16} className="mr-2" /> 送取车人员
        </button>
        <button 
          className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center ${activeTab === '车辆维修轨迹' ? 'border-[#419EFF] text-[#419EFF] bg-white' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('车辆维修轨迹')}
        >
          <Map size={16} className="mr-2" /> 车辆维修轨迹
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        {activeTab === '高频维修车辆' && <HighFrequencyRepair />}
        {activeTab === '送取车人员' && <PersonnelAnalysis />}
        {activeTab === '车辆维修轨迹' && <VehicleTrajectory />}
      </div>
    </div>
  );
}
