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
import InspectionStatistics from './components/statistics/InspectionStatistics';
import EnterpriseTrendStatistics from './components/statistics/EnterpriseTrendStatistics';
import HighFrequencyRepair from './components/statistics/HighFrequencyRepair';
import PersonnelAnalysis from './components/statistics/PersonnelAnalysis';
import VehicleTrajectory from './components/statistics/VehicleTrajectory';
import AreaAnalysis from './components/statistics/AreaAnalysis';
import VenueAnalysis from './components/statistics/VenueAnalysis';
import CaseAnalysis from './components/statistics/CaseAnalysis';
import TargetPersonnelAnalysis from './components/statistics/TargetPersonnelAnalysis';
import FugitiveStatistics from './components/statistics/FugitiveStatistics';
import LevelAssessmentManagement from './components/LevelAssessmentManagement';
import AssessmentStandardSettings from './components/AssessmentStandardSettings';
import Announcements from './components/system/Announcements';
import UserManagement from './components/system/UserManagement';
import RoleManagement from './components/system/RoleManagement';
import PermissionManagement from './components/system/PermissionManagement';
import SystemMonitor from './components/system/SystemMonitor';
import RentalVehicleQuery from './components/RentalVehicleQuery';
import BusinessOperationsManagement from './components/BusinessOperationsManagement';
import VenueReportReward from './components/VenueReportReward';
import SafetyInspectionManagement from './components/SafetyInspectionManagement';
import ViolationManagement from './components/ViolationManagement';
import PractitionerPunishment from './components/PractitionerPunishment';
import AlarmManagement from './components/AlarmManagement';
import SuspectManagement from './components/SuspectManagement';
import CapturedFugitiveRegistration from './components/CapturedFugitiveRegistration';
import AlarmInfoPush from './components/AlarmInfoPush';
import WarningInfoView from './components/WarningInfoView';
import HighFreqTracking from './components/HighFreqTracking';
import KeyPersonnelControl from './components/KeyPersonnelControl';
import ProblemFeedback from './components/ProblemFeedback';
import CustomControl from './components/CustomControl';
import EnterpriseAverageUploadStatistics from './components/statistics/EnterpriseAverageUploadStatistics';
import EnterpriseUploadRateStatistics from './components/statistics/EnterpriseUploadRateStatistics';
import AlarmInfoStatistics from './components/statistics/AlarmInfoStatistics';
import LargeScreenDisplay from './components/LargeScreenDisplay';

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
      case '企业基础信息': return <EnterpriseManagement initialRegion={navParams[id]?.region} onNavigate={openTab} />;
      case '等级评定管理': return <LevelAssessmentManagement />;
      case '从业人员信息查询': return <PersonnelManagement initialRegion={navParams[id]?.region} initialTab="info" />;
      case '从业人员处罚信息':
      case '从业人员被处罚信息': return <PersonnelManagement initialRegion={navParams[id]?.region} initialTab="punishment" />;
      case '从业人员黑名单': return <PersonnelManagement initialRegion={navParams[id]?.region} initialTab="blacklist" />;
      case '重点人员查询': return <PersonnelManagement initialRegion={navParams[id]?.region} initialTab="key_personnel" />;
      case '检查记录查询': return <InspectionManagement initialRegion={navParams[id]?.region} initialTab="records" />;
      case '问题整改跟踪': return <InspectionManagement initialTab="rectification" />;
      case '场所营业日志': return <BusinessOperationsManagement initialTab="logs" />;
      case '企业安全巡检': return <SafetyInspectionManagement />;
      case '从业人员考勤管理': return <BusinessOperationsManagement initialTab="attendance" />;
      case '场所内发生案事件情况': return <CaseManagement initialTab="violation" />;
      case '场所被查处情况': return <CaseManagement initialTab="punishment" />;
      case '车辆信息管理': return <VehicleManagement />;
      case '租赁车辆查询': return <RentalVehicleQuery />;
      case '企业发展趋势': return <div className="p-3 h-full overflow-auto"><EnterpriseTrendStatistics /></div>;
      case '高频维修车辆统计分析': return <div className="p-3 h-full overflow-auto"><HighFrequencyRepair /></div>;
      case '送取车人员统计分析': return <div className="p-3 h-full overflow-auto"><PersonnelAnalysis /></div>;
      case '车辆维修轨迹分析': return <div className="p-3 h-full overflow-auto"><VehicleTrajectory /></div>;
      case '检查情况': return <div className="p-3 h-full overflow-auto"><InspectionStatistics /></div>;
      case '重点地区分析': return <div className="p-3 h-full overflow-auto"><AreaAnalysis /></div>;
      case '重点企业分析': return <div className="p-3 h-full overflow-auto"><VenueAnalysis /></div>;
      case '重点案件分析': return <div className="p-3 h-full overflow-auto"><CaseAnalysis /></div>;
      case '重点人员分析': return <div className="p-3 h-full overflow-auto"><TargetPersonnelAnalysis /></div>;
      case '在逃人员抓获统计': return <div className="p-3 h-full overflow-auto"><FugitiveStatistics /></div>;
      case '等级评定': return <LevelAssessmentManagement />;
      case '场所举报奖励': return <VenueReportReward />;
      case '违法违规管理': return <ViolationManagement />;
      case '报警信息管理': return <AlarmManagement />;
      case '可疑人员管理': return <SuspectManagement />;
      case '抓获在逃人员补登': return <CapturedFugitiveRegistration />;
      case '报警信息推送': return <AlarmInfoPush />;
      case '预警信息查看': return <WarningInfoView />;
      case '高频人群跟踪分析': return <HighFreqTracking />;
      case '重点人员管控': return <KeyPersonnelControl />;
      case '问题反馈': return <ProblemFeedback />;
      case '自定义布控': return <CustomControl />;
      case '从业人员处罚管理': return <PractitionerPunishment />;
      case '企业平均上传数量统计': return <div className="p-3 h-full overflow-auto"><EnterpriseAverageUploadStatistics /></div>;
      case '企业上传率统计': return <div className="p-3 h-full overflow-auto"><EnterpriseUploadRateStatistics /></div>;
      case '报警信息统计': return <div className="p-3 h-full overflow-auto"><AlarmInfoStatistics /></div>;
      case '大屏展示': return <LargeScreenDisplay />;
      case '评价标准设置':
      case '考核项目配置':
        return <AssessmentStandardSettings initialTab="items" />;
      case '等级阈值设置':
        return <AssessmentStandardSettings initialTab="thresholds" />;
      case '版本历史':
        return <AssessmentStandardSettings initialTab="history" />;
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
      <div className="flex flex-col flex-1 overflow-hidden relative min-w-0">
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
