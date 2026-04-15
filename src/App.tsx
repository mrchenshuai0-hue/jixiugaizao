import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './components/Home';
import RecordInfoDisplay from './components/RecordInfoDisplay';
import EnterpriseManagement from './components/EnterpriseManagement';
import PersonnelManagement from './components/PersonnelManagement';
import InspectionManagement from './components/InspectionManagement';
import CaseManagement from './components/CaseManagement';
import VehicleManagement from './components/VehicleManagement';
import RepairRecordManagement from './components/RepairRecordManagement';
import RepairAnalysis from './components/statistics/RepairAnalysis';
import InspectionStatistics from './components/statistics/InspectionStatistics';
import CaseStatistics from './components/statistics/CaseStatistics';
import EnterpriseTrendStatistics from './components/statistics/EnterpriseTrendStatistics';
import LevelAssessmentManagement from './components/LevelAssessmentManagement';
import AssessmentStandardSettings from './components/AssessmentStandardSettings';
import Announcements from './components/system/Announcements';
import UserManagement from './components/system/UserManagement';
import RoleManagement from './components/system/RoleManagement';
import PermissionManagement from './components/system/PermissionManagement';
import SystemMonitor from './components/system/SystemMonitor';

export type ThemeType = 'light' | 'dark' | 'theme';

export interface Tab {
  id: string;
  title: string;
}

export default function App() {
  const [tabs, setTabs] = useState<Tab[]>([{ id: '首页', title: '首页' }]);
  const [activeTabId, setActiveTabId] = useState('首页');
  const [sidebarTheme, setSidebarTheme] = useState<ThemeType>('theme');
  const [navParams, setNavParams] = useState<Record<string, any>>({});

  const openTab = (menu: string, params?: any) => {
    if (!tabs.find(tab => tab.id === menu)) {
      setTabs([...tabs, { id: menu, title: menu }]);
    }
    if (params) {
      setNavParams(prev => ({ ...prev, [menu]: params }));
    }
    setActiveTabId(menu);
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter(tab => tab.id !== id);
    if (newTabs.length === 0) {
      // Keep at least one tab or show a default
      setTabs([{ id: '首页', title: '首页' }]);
      setActiveTabId('首页');
      return;
    }
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const renderContent = (id: string) => {
    switch (id) {
      case '首页': return <Home onNavigate={openTab} />;
      case '备案信息': return <RecordInfoDisplay />;
      case '企业基础信息': return <EnterpriseManagement onNavigate={openTab} />;
      case '从业人员信息': return <PersonnelManagement />;
      case '行政检查': return <InspectionManagement initialView={navParams['行政检查']?.view} />;
      case '案事件信息': return <CaseManagement initialView={navParams['案事件信息']?.view} />;
      case '车辆信息管理': return <VehicleManagement />;
      case '企业发展趋势': return <div className="p-3 h-full overflow-auto"><EnterpriseTrendStatistics /></div>;
      case '承修情况统计分析': return <RepairAnalysis />;
      case '检查情况': return <div className="p-3 h-full overflow-auto"><InspectionStatistics /></div>;
      case '涉案情况': return <div className="p-3 h-full overflow-auto"><CaseStatistics /></div>;
      case '车辆维修记录': return <RepairRecordManagement />;
      case '等级评定': return <LevelAssessmentManagement />;
      case '评定标准设置': return <AssessmentStandardSettings />;
      case '公告与消息': return <Announcements />;
      case '用户管理': return <UserManagement />;
      case '角色管理': return <RoleManagement />;
      case '权限管理': return <PermissionManagement />;
      case '系统监控': return <SystemMonitor />;
      default:
        return (
          <div className="p-3 h-full overflow-auto">
            <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg bg-white shadow-sm">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">页面内容区</h2>
                <p className="text-gray-500">当前选择：{id}</p>
                <p className="text-sm text-gray-400 mt-4">请在左侧菜单点击“首页”查看完整信息架构，或点击“企业基础信息”查看列表页</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F5F5F5] overflow-hidden font-sans">
      <Sidebar activeMenu={activeTabId} setActiveMenu={openTab} theme={sidebarTheme} />
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Header 
          activeMenu={activeTabId} 
          tabs={tabs} 
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
          closeTab={closeTab}
          theme={sidebarTheme} 
          setTheme={setSidebarTheme} 
        />
        <main className="flex-1 overflow-hidden relative">
          {renderContent(activeTabId)}
        </main>
      </div>
    </div>
  );
}
