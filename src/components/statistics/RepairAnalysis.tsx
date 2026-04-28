import React, { useState } from 'react';
import HighFrequencyRepair from './HighFrequencyRepair';
import PersonnelAnalysis from './PersonnelAnalysis';
import VehicleTrajectory from './VehicleTrajectory';
import { Car, Users, Map } from 'lucide-react';

export default function RepairAnalysis() {
  const [activeTab, setActiveTab] = useState('高频维修车辆');

  return (
    <div className="h-full flex bg-[#F0F2F5] p-3 gap-3">
      {/* 左侧三级菜单 */}
      <div className="w-56 bg-white rounded-lg shadow-sm flex flex-col border border-gray-200 overflow-hidden shrink-0">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
          <span className="text-sm font-bold text-gray-700">承修分析菜单</span>
        </div>
        <div className="flex-1 py-4 px-2 space-y-1">
          <button 
            className={`w-full px-4 py-2.5 text-sm font-medium rounded-md flex items-center transition-all ${activeTab === '高频维修车辆' ? 'bg-blue-50 text-[#419EFF] shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            onClick={() => setActiveTab('高频维修车辆')}
          >
            <Car size={16} className="mr-3" /> 高频维修车辆
          </button>
          <button 
            className={`w-full px-4 py-2.5 text-sm font-medium rounded-md flex items-center transition-all ${activeTab === '送取车人员' ? 'bg-blue-50 text-[#419EFF] shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            onClick={() => setActiveTab('送取车人员')}
          >
            <Users size={16} className="mr-3" /> 送取车人员
          </button>
          <button 
            className={`w-full px-4 py-2.5 text-sm font-medium rounded-md flex items-center transition-all ${activeTab === '车辆维修轨迹' ? 'bg-blue-50 text-[#419EFF] shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            onClick={() => setActiveTab('车辆维修轨迹')}
          >
            <Map size={16} className="mr-3" /> 车辆维修轨迹分析
          </button>
        </div>
        <div className="p-4 bg-blue-50/30 border-t border-gray-100 italic">
          <p className="text-[10px] text-gray-400">承修数据实时统计中...</p>
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1 overflow-auto min-w-0 bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === '高频维修车辆' && <HighFrequencyRepair />}
        {activeTab === '送取车人员' && <PersonnelAnalysis />}
        {activeTab === '车辆维修轨迹' && <VehicleTrajectory />}
      </div>
    </div>
  );
}
