import React from 'react';
import { Building2, Users, AlertTriangle, ShieldCheck, Activity, TrendingUp, FileText, Layers, Settings } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const trendData = [
  { name: '1月', value: 120 },
  { name: '2月', value: 132 },
  { name: '3月', value: 101 },
  { name: '4月', value: 134 },
  { name: '5月', value: 90 },
  { name: '6月', value: 230 },
];

const repairData = [
  { name: '某区', count: 400 },
  { name: '其他区', count: 300 },
  { name: '郊区', count: 200 },
  { name: '新区', count: 278 },
];

interface HomeProps {
  onNavigate?: (menu: string, params?: any) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const handleNavigate = (menu: string) => {
    if (onNavigate) {
      onNavigate(menu);
    }
  };

  return (
    <div className="h-full overflow-auto p-6 bg-[#F5F5F5] space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-800">系统首页</h1>
        <div className="text-sm text-gray-500">数据更新时间：2026-04-15 10:00:00</div>
      </div>

      {/* 核心指标区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="备案企业总数" 
          value="1,284" 
          icon={Building2} 
          color="bg-blue-500" 
          trend="+5.2%" 
          onClick={() => handleNavigate('备案信息')}
        />
        <StatCard 
          title="从业人员总数" 
          value="8,592" 
          icon={Users} 
          color="bg-green-500" 
          trend="+2.1%" 
          onClick={() => handleNavigate('从业人员信息查询')}
        />
        <StatCard 
          title="待整改隐患" 
          value="34" 
          icon={AlertTriangle} 
          color="bg-orange-500" 
          trend="-12.5%" 
          onClick={() => handleNavigate('问题整改跟踪')}
        />
        <StatCard 
          title="本月行政检查" 
          value="156" 
          icon={ShieldCheck} 
          color="bg-purple-500" 
          trend="+18.2%" 
          onClick={() => handleNavigate('检查记录查询')}
        />
      </div>

      {/* 图表区 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigate('统计分析')}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <TrendingUp size={18} className="mr-2 text-[#419EFF]" />
              近半年维修业务趋势
            </h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#419EFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#419EFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#419EFF" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Layers size={18} className="mr-2 text-[#419EFF]" />
              场所等级评定分布
            </h2>
            <button onClick={() => handleNavigate('等级评定管理')} className="text-xs text-[#419EFF] hover:underline">查看详情</button>
          </div>
          <div className="grid grid-cols-2 gap-4 h-64">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center"><div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>AAA级单位</span>
                <span className="text-sm font-bold">128</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center"><div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>AA级单位</span>
                <span className="text-sm font-bold">356</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>A级单位</span>
                <span className="text-sm font-bold">512</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center"><div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>B级单位</span>
                <span className="text-sm font-bold">288</span>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-[12px] border-gray-100 flex items-center justify-center relative">
                <div className="absolute inset-0 border-[12px] border-yellow-500 rounded-full clip-path-polygon-[0_0,100%_0,100%_30%,0_30%]"></div>
                <div className="text-center">
                  <div className="text-xl font-bold">1,284</div>
                  <div className="text-[10px] text-gray-400">评定总数</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 快捷入口与待办事项 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 lg:col-span-2 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigate('公告与消息')}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FileText size={18} className="mr-2 text-[#419EFF]" />
            最新系统公告与消息
          </h2>
          <div className="space-y-4">
            <div className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors border border-gray-100">
              <div className="w-2 h-2 mt-2 rounded-full bg-red-500 mr-3 shrink-0"></div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800 mb-1">关于开展2026年度机修企业质量信誉考核的通知</h3>
                <p className="text-xs text-gray-500 line-clamp-1">市局治安支队发布，请各单位及时通知辖区内企业准备相关材料...</p>
              </div>
              <div className="text-xs text-gray-400 shrink-0 ml-4">2026-04-10</div>
            </div>
            <div className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors border border-gray-100">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3 shrink-0"></div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800 mb-1">系统升级维护通知</h3>
                <p className="text-xs text-gray-500 line-clamp-1">信息中心定于本周末进行系统升级，届时部分功能可能受影响...</p>
              </div>
              <div className="text-xs text-gray-400 shrink-0 ml-4">2026-04-05</div>
            </div>
            <div className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors border border-gray-100">
              <div className="w-2 h-2 mt-2 rounded-full bg-gray-400 mr-3 shrink-0"></div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800 mb-1">关于某区机修企业违规收销赃物案件的通报</h3>
                <p className="text-xs text-gray-500 line-clamp-1">近日，某区公安分局成功破获一起机修企业涉嫌掩饰、隐瞒犯罪所得案...</p>
              </div>
              <div className="text-xs text-gray-400 shrink-0 ml-4">2026-04-01</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">待办任务</h2>
          <div className="space-y-3">
            <div 
              className="flex items-center justify-between p-3 bg-blue-50 rounded-md border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => handleNavigate('等级评定管理')}
            >
              <div className="flex items-center">
                <Layers size={16} className="text-blue-500 mr-2" />
                <span className="text-sm text-gray-700">待审核等级评定</span>
              </div>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">12</span>
            </div>
            <div 
              className="flex items-center justify-between p-3 bg-orange-50 rounded-md border border-orange-100 cursor-pointer hover:bg-orange-100 transition-colors"
              onClick={() => handleNavigate('问题整改跟踪')}
            >
              <div className="flex items-center">
                <AlertTriangle size={16} className="text-orange-500 mr-2" />
                <span className="text-sm text-gray-700">待复查隐患企业</span>
              </div>
              <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">5</span>
            </div>
            <div 
              className="flex items-center justify-between p-3 bg-green-50 rounded-md border border-green-100 cursor-pointer hover:bg-green-100 transition-colors"
              onClick={() => handleNavigate('备案信息')}
            >
              <div className="flex items-center">
                <Building2 size={16} className="text-green-500 mr-2" />
                <span className="text-sm text-gray-700">新备案企业待核查</span>
              </div>
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, trend, onClick }: { title: string, value: string, icon: any, color: string, trend: string, onClick?: () => void }) {
  const isPositive = trend.startsWith('+');
  return (
    <div 
      className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className={`w-12 h-12 rounded-full ${color} bg-opacity-10 flex items-center justify-center mr-4 shrink-0`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-500 mb-1">{title}</div>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className={`text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend}
          </div>
        </div>
      </div>
    </div>
  );
}
