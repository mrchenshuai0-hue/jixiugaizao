import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  Users, 
  Search, 
  Filter, 
  Download,
  AlertCircle,
  ArrowLeft,
  X,
  Info,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Camera,
  RotateCcw,
  ChevronDown
} from 'lucide-react';

type TabType = 'logs' | 'safety' | 'attendance';

interface BusinessOperationsManagementProps {
  initialTab?: TabType;
}

interface LogRecord {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  manager: string;
  securityManager: string;
  hasCase: boolean;
  hasInspection: boolean;
  staffCount: number;
  attendanceCount: number;
  securityCount: number;
  reportedBy: string;
  lastInspection: string;
  operationStatus: string;
}

interface Enterprise {
  id: string;
  name: string;
  signboard: string;
  category: string;
  manager: string;
  securityManager: string;
  status: string;
  area: string;
  roomCount: string;
  staffCount: number;
  attendanceCount: number;
  securityCount: number;
  businessScope: string;
  logs: LogRecord[];
}

const MOCK_DATA: Enterprise[] = [
  {
    id: 'ENT001',
    name: '福州市鼓楼区顺风美发沙龙',
    signboard: '顺风美发造型',
    category: '美发美容',
    manager: '王建国',
    securityManager: '李小龙',
    status: '正在营业',
    area: '120㎡',
    roomCount: 'VIP包厢 4个',
    staffCount: 15,
    attendanceCount: 14,
    securityCount: 1,
    businessScope: '理发、烫染、美容护理',
    logs: [
      { id: 'L001', date: '2024-06-08', startTime: '09:00', endTime: '22:00', manager: '王建国', securityManager: '李小龙', hasCase: false, hasInspection: true, staffCount: 12, attendanceCount: 11, securityCount: 1, lastInspection: '2024-06-05 14:20:30', reportedBy: '王建国', operationStatus: '今日经营状况良好，客流量平稳，未发现安全隐患。' },
      { id: 'L002', date: '2024-06-07', startTime: '09:00', endTime: '22:00', manager: '王建国', securityManager: '李小龙', hasCase: false, hasInspection: false, staffCount: 12, attendanceCount: 12, securityCount: 1, lastInspection: '2024-06-05 14:20:45', reportedBy: '系统自动上报', operationStatus: '正常营业，消防器材已自行检查。' },
    ]
  },
  {
    id: 'ENT002',
    name: '台江区悦豪KTV娱乐会所',
    signboard: '悦豪至尊KTV',
    category: '大型歌舞娱乐',
    manager: '赵大海',
    securityManager: '张铁柱',
    status: '正在营业',
    area: '2500㎡',
    roomCount: '包间 48个',
    staffCount: 120,
    attendanceCount: 115,
    securityCount: 15,
    businessScope: '卡拉OK自助、酒水服务',
    logs: [
      { id: 'L003', date: '2024-06-08', startTime: '18:00', endTime: '04:00', manager: '赵大海', securityManager: '张铁柱', hasCase: true, hasInspection: false, staffCount: 85, attendanceCount: 82, securityCount: 12, lastInspection: '2024-06-01 22:30:15', reportedBy: '赵大海', operationStatus: '晚间发生一起酒后口角，已由保安劝阻。' }
    ]
  }
];

export default function BusinessOperationsManagement({ initialTab = 'logs' }: BusinessOperationsManagementProps = {}) {
  const [showDetail, setShowDetail] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<LogRecord | null>(null);

  // ---- 场所营业日志查询 States ----
  const [filterVenueName, setFilterVenueName] = useState('');
  const [filterSignboard, setFilterSignboard] = useState('');
  const [filterReportTime, setFilterReportTime] = useState('');
  const [filterLogTime, setFilterLogTime] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterHasCase, setFilterHasCase] = useState('all');
  const [filterHasInspection, setFilterHasInspection] = useState('all');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleResetFilters = () => {
    setFilterVenueName('');
    setFilterSignboard('');
    setFilterReportTime('');
    setFilterLogTime('');
    setFilterCategory('all');
    setFilterStatus('all');
    setFilterHasCase('all');
    setFilterHasInspection('all');
  };

  const selectedEnterprise = MOCK_DATA.find(ent => ent.id === showDetail);

  const renderLogs = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F5F5F5]">
      <div className="flex-1 p-3 overflow-auto">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          
          {/* 查询检索过滤栏位 (Style from ViolationList) */}
          <div className="p-5 border-b border-gray-100 bg-[#FCFCFD] text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">场所名称</label>
                <input 
                  type="text" 
                  value={filterVenueName}
                  onChange={e => setFilterVenueName(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                  placeholder="请输入场所名称" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">对外招牌名</label>
                <input 
                  type="text" 
                  value={filterSignboard}
                  onChange={e => setFilterSignboard(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                  placeholder="请输入招牌名" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">汇报时间</label>
                <input 
                  type="date" 
                  value={filterReportTime}
                  onChange={e => setFilterReportTime(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                />
              </div>

              {isSearchExpanded && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">日志时间</label>
                    <input 
                      type="date" 
                      value={filterLogTime}
                      onChange={e => setFilterLogTime(e.target.value)}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">场所类别</label>
                    <select 
                      value={filterCategory}
                      onChange={e => setFilterCategory(e.target.value)}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-gray-700"
                    >
                      <option value="all">全部类别</option>
                      <option value="美发美容">美发美容</option>
                      <option value="大型歌舞娱乐">大型歌舞娱乐</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">经营状态</label>
                    <select 
                      value={filterStatus}
                      onChange={e => setFilterStatus(e.target.value)}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-gray-700"
                    >
                      <option value="all">不限</option>
                      <option value="正在营业">正在营业</option>
                      <option value="暂停营业">暂停营业</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">有无治安/刑事事件</label>
                    <select 
                      value={filterHasCase}
                      onChange={e => setFilterHasCase(e.target.value)}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-gray-700"
                    >
                      <option value="all">不限</option>
                      <option value="true">有</option>
                      <option value="false">无</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">有无部门巡视检查</label>
                    <select 
                      value={filterHasInspection}
                      onChange={e => setFilterHasInspection(e.target.value)}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-gray-700"
                    >
                      <option value="all">不限</option>
                      <option value="true">有</option>
                      <option value="false">无</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end items-center gap-3 mt-4 pt-3 border-t border-gray-100">
              <button 
                onClick={() => {}} // Search functionality placeholder
                className="h-8 px-5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xs font-semibold shadow-sm border border-[#419EFF]"
              >
                <Search size={14} className="mr-1.5" /> 查询
              </button>
              <button 
                onClick={handleResetFilters}
                className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-xs font-semibold shadow-sm decoration-0"
              >
                <RotateCcw size={14} className="mr-1.5" /> 重置
              </button>
              <button 
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="h-8 px-3 bg-blue-50 text-[#419EFF] hover:bg-blue-100 rounded transition-colors flex items-center text-xs font-semibold hover:border-blue-200 border border-transparent shadow-sm"
              >
                <span>{isSearchExpanded ? '收起' : '展开'}</span>
                <ChevronDown size={14} className={`ml-1 transition-transform duration-200 ${isSearchExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">
              共找到 <span className="text-[#419EFF] font-semibold">{MOCK_DATA.length}</span> 条记录
            </div>
            <div className="flex space-x-2">
              <button className="h-8 px-4 bg-[#419EFF] hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors flex items-center gap-1.5 shadow-sm">
                <Download size={14} />
                <span>导出报表</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-white">
            <table className="w-full border-collapse text-left min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-[13px] border-b border-gray-200 font-medium h-10">
                  <th className="px-5 py-3 font-medium">场所名称</th>
                  <th className="px-5 py-3 font-medium">对外招牌名</th>
                  <th className="px-5 py-3 font-medium">场所类别</th>
                  <th className="px-5 py-3 font-medium">场所负责人</th>
                  <th className="px-5 py-3 font-medium">治安负责人</th>
                  <th className="px-5 py-3 font-medium">经营状态</th>
                  <th className="px-5 py-3 text-center sticky right-0 bg-gray-50 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.04)] font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666] divide-y divide-gray-100">
                {MOCK_DATA.map((ent) => (
                  <tr key={ent.id} className="hover:bg-blue-50/10 transition-colors cursor-pointer group text-xs">
                    <td className="px-5 py-3 font-bold text-gray-800">{ent.name}</td>
                    <td className="px-5 py-3 text-gray-500 font-bold">{ent.signboard}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded font-medium text-[11px]">
                        {ent.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-black text-gray-700">{ent.manager}</td>
                    <td className="px-5 py-3 text-slate-400">{ent.securityManager}</td>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-1.5 text-green-600 font-black">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        {ent.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center sticky right-0 bg-white group-hover:bg-[#F9FAFC] transition-colors shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.04)]">
                      <button 
                        onClick={() => setShowDetail(ent.id)}
                        className="text-[#419EFF] hover:text-blue-700 font-medium whitespace-nowrap text-xs underline underline-offset-4 decoration-blue-200"
                      >
                        详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div className="text-xs text-gray-500 font-medium">
              显示 1 到 {MOCK_DATA.length} 条，共 {MOCK_DATA.length} 条记录
            </div>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-50 transition-colors" disabled>
                &lt;
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-[#419EFF] rounded bg-[#419EFF] text-white text-xs font-bold shadow-sm">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 text-xs font-medium transition-colors">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogsDetail = (ent: Enterprise) => (
    <div className="flex-1 flex flex-col bg-[#F5F5F5] overflow-hidden animate-fadeIn text-left font-sans">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">{ent.name}</h2>
          <span className="px-2 py-0.5 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-xs">{ent.category}</span>
          <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded text-xs">{ent.status}</span>
        </div>
        <div className="flex gap-3">
          <button 
            type="button"
            onClick={() => setShowDetail(null)}
            className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-1.5" /> 返回列表
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
             <Download size={16} /> 打印档案
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
        {/* 一、企业基本信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              场所基本注册经营档案信息
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
              {[
                { label: '场所名称', value: ent.name },
                { label: '对外招牌名', value: ent.signboard },
                { label: '场所类别', value: ent.category },
                { label: '经营面积', value: ent.area },
                { label: '包厢/包间量', value: ent.roomCount },
                { label: '场所负责人', value: ent.manager },
                { label: '治安负责人', value: ent.securityManager },
                { label: '从业人员数量', value: ent.staffCount },
                { label: '考勤人员数量', value: ent.attendanceCount },
                { label: '保安人员数量', value: ent.securityCount },
                { label: '核定经营范围', value: ent.businessScope, span: true },
              ].map((field, i) => (
                <div key={i} className={`flex flex-col gap-2 ${field.span ? 'md:col-span-2' : ''}`}>
                  <label className="text-xs font-semibold text-gray-700 block">{field.label}</label>
                  <div className={`h-9 px-3 flex items-center bg-[#FAFCFF] border border-gray-200 rounded text-xs text-gray-700 font-medium ${!field.span ? 'truncate' : ''}`}>
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 二、历史营业日志记录流水 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center justify-between font-bold">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              <h3 className="text-sm text-[#333333]">历史营业日志记录流水</h3>
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="快速检索..." 
                className="pl-9 pr-3 py-1 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-[#419EFF] w-48 font-medium"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-gray-650">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-[13px] border-b border-gray-200 font-medium h-10">
                  <th className="px-6 py-3">营业日期</th>
                  <th className="px-6 py-3">开始营业时间</th>
                  <th className="px-6 py-3">结束营业时间</th>
                  <th className="px-6 py-3">场所负责人</th>
                  <th className="px-6 py-3">治安负责人</th>
                  <th className="px-6 py-3 text-center">是否发生案件</th>
                  <th className="px-6 py-3 text-center">是否有检查</th>
                  <th className="px-6 py-3">上报人</th>
                  <th className="px-6 py-3 text-center">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666] divide-y divide-gray-100">
                {ent.logs.map((log) => (
                  <tr key={log.id} className="hover:bg-blue-50/10 transition-colors cursor-pointer text-xs">
                    <td className="px-6 py-4 font-mono text-gray-700 font-bold">{log.date}</td>
                    <td className="px-6 py-4 text-gray-600">{log.startTime}</td>
                    <td className="px-6 py-4 text-gray-600">{log.endTime}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{log.manager}</td>
                    <td className="px-6 py-4 text-gray-500">{log.securityManager}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                        log.hasCase 
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : 'bg-green-50 text-green-700 border-green-200'
                      }`}>
                        {log.hasCase ? '是' : '无'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                        log.hasInspection 
                          ? 'bg-blue-50 text-blue-700 border-blue-200' 
                          : 'bg-gray-50 text-gray-400 border-gray-200'
                      }`}>
                        {log.hasInspection ? '有' : '无'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium">系统自动采集</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedRecord(log)}
                        className="text-[#419EFF] hover:bg-blue-50 px-3 py-1 rounded border border-blue-50 font-bold text-xs"
                      >
                        详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Business Log History Pagination */}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              营业日志记录总数: {ent.logs.length}
            </div>
            <div className="flex gap-1">
              <button className="px-4 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-tighter border border-gray-200 rounded bg-white hover:bg-gray-50 transition-colors" disabled>上一页</button>
              <button className="px-4 py-1.5 text-[10px] font-black text-[#419EFF] border border-[#419EFF] rounded bg-blue-50/50">1</button>
              <button className="px-4 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-tighter border border-gray-200 rounded bg-white hover:bg-gray-50 transition-colors">下一页</button>
            </div>
          </div>
        </section>
      </div>

      {/* 详情弹窗 (Style matched with Associate Modal from Case module) */}
      {selectedRecord && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150 text-left font-sans">
            
            {/* 顶栏 */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-gray-150 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-[#419EFF] rounded-full flex items-center justify-center border border-blue-100 shadow-sm">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">营业日志登记核查详情</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">查看场所自主上报的每日营业日志流水信息及治安、部门巡查存证记录。</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* 内容主体 (Condition Inputs included) */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[
                  { label: '场所名称', value: ent.name, span: true },
                  { label: '营业日志日期', value: selectedRecord.date },
                  { label: '开始营业时间', value: selectedRecord.startTime },
                  { label: '结束营业时间', value: selectedRecord.endTime },
                  { label: '主体负责人', value: selectedRecord.manager },
                  { label: '治安负责人', value: selectedRecord.securityManager },
                  { label: '从业人员量', value: `${selectedRecord.staffCount} P` },
                  { label: '考勤核实数', value: `${selectedRecord.attendanceCount} P` },
                  { label: '保安配员数', value: `${selectedRecord.securityCount} P` },
                  { label: '上报人', value: selectedRecord.reportedBy },
                  { label: '最后一次巡检时间', value: selectedRecord.lastInspection },
                ].map((field, i) => (
                  <div key={i} className={`flex flex-col gap-1.5 ${field.span ? 'md:col-span-2 lg:col-span-3' : ''}`}>
                    <label className="text-xs font-bold text-gray-500">{field.label}</label>
                    <div className="h-9 px-3 flex items-center bg-[#FAFCFF] border border-gray-200 rounded text-xs text-gray-800 font-semibold italic">
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* 营业情况汇总 */}
              <div className="space-y-3 bg-slate-50/10 p-4 rounded-lg border border-slate-100">
                <label className="text-[11px] font-black text-gray-650 uppercase tracking-wider block">场所当日营业总体情况</label>
                <div className="p-4 bg-white border border-gray-150 rounded-lg text-xs text-gray-700 leading-relaxed font-medium italic shadow-inner">
                  {selectedRecord.operationStatus || '暂无详细营业描述 ...'}
                </div>
              </div>

              {/* 是否发生案件 */}
              <div className="space-y-3 bg-slate-50/30 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black text-gray-650 uppercase tracking-wider">有无治安、刑事案件或事故</label>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black italic border ${
                    selectedRecord.hasCase ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'
                  }`}>
                    {selectedRecord.hasCase ? '发生异常情况' : '未发生异常'}
                  </span>
                </div>
                {selectedRecord.hasCase && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-red-400">异常情况详细说明：</label>
                    <textarea 
                      className="w-full h-24 p-3 bg-white border border-red-100 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-red-200"
                      defaultValue={selectedRecord.operationStatus}
                      placeholder="请输入详细的案事件经过及处理结果..."
                    />
                  </div>
                )}
              </div>

              {/* 是否有部门检查 */}
              <div className="space-y-3 bg-slate-50/30 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black text-gray-650 uppercase tracking-wider">有无管理部门巡视检查</label>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black italic border ${
                    selectedRecord.hasInspection ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-gray-100 text-gray-400 border-gray-200'
                  }`}>
                    {selectedRecord.hasInspection ? '已接待检查' : '无上门检查'}
                  </span>
                </div>
                {selectedRecord.hasInspection && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-blue-400">管理部门巡查意见/结果：</label>
                    <textarea 
                      className="w-full h-20 p-3 bg-white border border-blue-100 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-200"
                      placeholder="请输入检查单位、人员及具体检查意见..."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 顶框底部操作条 */}
            <div className="px-6 py-4 border-t border-gray-200 bg-[#FAFBFD] flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="px-8 py-2 bg-slate-800 text-white rounded hover:bg-black text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSafety = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F3F4F6] p-4 space-y-4">
      <section className="bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden ring-1 ring-black/5 flex flex-col h-full">
        <div className="px-5 py-2.5 border-b border-gray-100 bg-[#EBF3FE] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-3 bg-blue-500 rounded-full"></span>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-tight">企业自主安全巡检记录概览</h3>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded text-[10px] font-black hover:bg-gray-50 flex items-center gap-1.5 shadow-xs">
               <ArrowLeft size={14} className="rotate-90" /> 刷新数据源
            </button>
          </div>
        </div>

        <div className="p-6 overflow-auto custom-scrollbar space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: '本周应检企业', value: '128', color: 'text-blue-600', bg: 'bg-blue-50/50', border: 'border-blue-100' },
              { label: '已完成自检', value: '112', color: 'text-green-600', bg: 'bg-green-50/30', border: 'border-green-100' },
              { label: '逾期未检', value: '16', color: 'text-red-500', bg: 'bg-red-50/30', border: 'border-red-100' }
            ].map((stat, i) => (
              <div key={i} className={`p-6 rounded-lg border ${stat.bg} ${stat.border} shadow-sm relative group`}>
                <div className="text-[10px] font-black opacity-40 mb-1 uppercase tracking-widest">{stat.label}</div>
                <div className={`text-4xl font-black ${stat.color} tracking-tighter italic`}>{stat.value}</div>
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ShieldCheck size={24} />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FAFAFB] rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-gray-200 bg-white flex items-center justify-between">
              <h3 className="text-[11px] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                <AlertCircle size={14} className="text-amber-500" />
                最新异常巡检预警项
              </h3>
              <button className="text-[#419EFF] text-[10px] font-black hover:underline underline-offset-4">查看历史档案</button>
            </div>
            <div className="p-1">
              <div className="space-y-1">
                {[
                  { company: '宏大汽修厂', issue: '消防器材有效期不足', time: '2小时前', level: 'High' },
                  { company: '中心路维修店', issue: '监控录像存储空间报警', time: '5小时前', level: 'Medium' },
                  { company: '快速保养点', issue: '安全出口堆放杂物', time: '1天前', level: 'Medium' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 flex items-center justify-between hover:bg-gray-50/80 transition-colors border-b last:border-b-0 border-gray-50 text-left cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`w-1 h-8 rounded-full ${item.level === 'High' ? 'bg-red-500' : 'bg-amber-400'}`}></div>
                      <div>
                        <div className="text-sm font-black text-gray-800 tracking-tight">{item.company}</div>
                        <div className="text-[11px] text-red-500 flex items-center gap-1.5 mt-0.5 font-bold italic">
                          <AlertTriangle size={12} />
                          {item.issue}
                        </div>
                      </div>
                    </div>
                    <div className="text-[9px] text-gray-300 font-black italic uppercase group-hover:text-gray-400">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderAttendance = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F3F4F6] p-4 space-y-4">
      <section className="bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden ring-1 ring-black/5 flex flex-col h-full">
        <div className="px-5 py-2.5 border-b border-gray-100 bg-[#EBF3FE] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-3 bg-blue-500 rounded-full"></span>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-tight">从业人员实时考勤管理看板</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 border-r border-gray-200 pr-4">
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">在岗: 1,420</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">离岗: 245</span>
                </div>
            </div>
            <button className="text-[10px] font-black text-blue-500 hover:bg-blue-50 px-2 py-1 rounded transition-colors uppercase">数据订阅视图</button>
          </div>
        </div>

        <div className="p-6 overflow-auto custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#FAFAFB] rounded-lg border border-gray-200 overflow-hidden shadow-sm flex flex-col">
                <div className="bg-white px-5 py-3 border-b border-gray-100 font-black text-[11px] text-gray-700 uppercase tracking-widest flex items-center justify-between italic">
                  <span>实时打卡记录流水</span>
                  <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest animate-pulse">正在同步...</span>
                </div>
                <div className="divide-y divide-gray-100 italic bg-white overflow-y-auto max-h-[500px] custom-scrollbar">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:bg-white group-hover:border-[#419EFF]/20 group-hover:text-[#419EFF] transition-all">
                                    <Users size={16} />
                                </div>
                                <div>
                                    <div className="text-sm font-black text-gray-800 tracking-tight">从业人员 #{1024 + i}</div>
                                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">行业认证技师</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-mono font-black text-[#419EFF] italic tracking-tighter">08:45:{12 + i}</div>
                                <div className="text-[8px] text-green-500 font-black tracking-widest uppercase mt-0.5 flex items-center justify-end gap-1">
                                  <CheckCircle2 size={8} /> 已验证
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">实时数据: 8 条记录</span>
                    <div className="flex gap-1">
                        <button className="px-2 py-1 flex items-center justify-center border border-gray-200 rounded bg-white text-gray-400 text-[10px] font-bold" disabled>上一页</button>
                        <button className="w-6 h-6 flex items-center justify-center border border-[#419EFF] rounded bg-[#419EFF] text-white text-[10px] font-black italic">1</button>
                        <button className="px-2 py-1 flex items-center justify-center border border-gray-200 rounded bg-white text-gray-400 text-[10px] font-bold">下一页</button>
                    </div>
                </div>
            </div>
            
            <div className="space-y-6">
                <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm relative overflow-hidden ring-1 ring-black/5 group hover:ring-blue-500/20 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[11px] font-black text-gray-300 uppercase tracking-widest">出勤全局指数</div>
                      <div className="p-2 bg-blue-50 rounded italic text-[10px] font-black text-blue-600">实时看板</div>
                    </div>
                    <div className="text-7xl font-black text-gray-800 mb-6 flex items-baseline gap-1 tracking-tighter italic">
                      98.2<span className="text-2xl font-bold text-gray-300 opacity-60"> %</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                        <div className="bg-[#419EFF] h-full shadow-[0_0_10px_rgba(65,158,255,0.4)] transition-all duration-1000" style={{ width: '98.2%' }}></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-xs hover:shadow-md transition-shadow group border-l-4 border-l-slate-200">
                        <div className="text-[9px] font-black text-gray-300 mb-1 uppercase tracking-widest group-hover:text-gray-500 transition-colors">今日离岗总数</div>
                        <div className="text-4xl font-black text-gray-800 tracking-tighter italic">32</div>
                    </div>
                    <div className="p-6 bg-white border border-red-50 rounded-lg shadow-xs text-red-600 hover:shadow-md transition-shadow group border-l-4 border-l-red-500">
                        <div className="text-[9px] font-black opacity-30 mb-1 uppercase tracking-widest group-hover:opacity-100 transition-opacity">异常红色警报</div>
                        <div className="text-4xl font-black tracking-tighter italic">14</div>
                    </div>
                </div>

                <div className="p-6 bg-slate-900 rounded-lg shadow-xl text-white relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">管理员操作请求</div>
                    <div className="text-sm font-bold tracking-tight mb-4">14 条考勤记录存在逻辑冲突</div>
                    <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all">
                      立刻介入审核档案
                    </button>
                  </div>
                  <AlertTriangle className="absolute -bottom-4 -right-4 size-24 opacity-5 rotate-12 group-hover:rotate-0 transition-transform" />
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col bg-[#F5F5F5] overflow-hidden antialiased">
      <div className="flex-1 overflow-hidden relative">
        {showDetail ? (
          selectedEnterprise ? renderLogsDetail(selectedEnterprise) : <div className="p-20 text-center text-gray-400 italic">未找到企业记录...</div>
        ) : renderLogs()}
      </div>
    </div>
  );
}
