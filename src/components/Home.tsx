import React, { useState, useEffect } from 'react';
import { Building2, Users, AlertTriangle, ShieldCheck, TrendingUp, FileText, Layers, RefreshCw } from 'lucide-react';
import { api } from '../api';
import { Enterprise, Personnel, Inspection, Case, RepairRecord } from '../types';

interface HomeProps {
  onNavigate?: (menu: string, params?: any) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  // Real dynamic states populated from other modules
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [repairRecords, setRepairRecords] = useState<RepairRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [userJurisdiction, setUserJurisdiction] = useState<'province' | 'city'>('province');

  // Multi fluctuation wave seeding to simulate previous/current states
  const getRegionStats = (name: string, index: number) => {
    // Wave fluctuation seed based on timestamp
    const wave = Math.sin(Date.now() / 4000 + index * 0.5);
    const f = (base: number, scale: number) => Math.max(0, base + Math.round(wave * scale));
    
    // Base static allocations per district/city
    const baseEnts = 2 + (index % 3);
    const basePers = 12 + ((index * 4) % 18);
    const baseVehicles = 420 + ((index * 130) % 650);
    const baseInsps = 4 + (index % 5);
    const baseCases = index % 4 === 0 ? 1 : 0;

    const currentEnts = f(baseEnts, 1);
    const currentPers = f(basePers, 3);
    const currentVehicles = f(baseVehicles, 50);
    const currentInsps = f(baseInsps, 2);
    const currentCases = f(baseCases, 1);

    // Slide comparative states
    const prevWave = Math.sin((Date.now() - 3000) / 4000 + index * 0.5);
    const prevF = (base: number, scale: number) => Math.max(0, base + Math.round(prevWave * scale));
    
    const prevEnts = prevF(baseEnts, 1);
    const prevPers = prevF(basePers, 3);
    const prevVehicles = prevF(baseVehicles, 50);
    const prevInsps = prevF(baseInsps, 2);
    const prevCases = prevF(baseCases, 1);

    return {
      ents: { current: currentEnts, prev: prevEnts },
      pers: { current: currentPers, prev: prevPers },
      vehicles: { current: currentVehicles, prev: prevVehicles },
      insps: { current: currentInsps, prev: prevInsps },
      cases: { current: currentCases, prev: prevCases }
    };
  };

  // Yesterday's baseline statistics with dynamic comparison trackers
  const [statsState, setStatsState] = useState({
    newEnterprises: { current: 3, prev: 2 },
    newPersonnel: { current: 14, prev: 16 },
    servicedVehicles: { current: 1284, prev: 1270 },
    inspectionsCount: { current: 8, prev: 8 },
    casesCount: { current: 1, prev: 0 }
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [ents, pers, insps, cs, reps] = await Promise.all([
        api.enterprise.getAll(),
        api.personnel.getAll(),
        api.inspection.getAll(),
        api.case.getAll(),
        api.repairRecord.getAll()
      ]);
      setEnterprises(ents || []);
      setPersonnel(pers || []);
      setInspections(insps || []);
      setCases(cs || []);
      setRepairRecords(reps || []);

      // Calculate Yesterday's indicators with realistic dynamic fluctuations on refresh
      setStatsState(prev => {
        const entLength = ents ? ents.length : 0;
        const persLength = pers ? pers.length : 0;
        const repsLength = reps ? reps.length : 0;
        const inspsLength = insps ? insps.length : 0;
        const casesLength = cs ? cs.length : 0;

        // Generate dynamic mock fluctuation to show visual trend on refresh
        const wave = Math.sin(Date.now() / 4000);
        const f = (scale: number) => Math.round(wave * scale);

        const nextEnts = Math.max(0, 3 + entLength + f(1));
        const nextPers = Math.max(0, 14 + persLength + f(2));
        const nextReps = Math.max(0, 1284 + repsLength + f(15));
        const nextInsps = Math.max(0, 8 + inspsLength + f(1));
        const nextCases = Math.max(0, 1 + casesLength + (f(1) >= 0 ? 0 : -1));

        return {
          newEnterprises: { 
            current: nextEnts, 
            prev: prev.newEnterprises.current === nextEnts ? prev.newEnterprises.prev : prev.newEnterprises.current 
          },
          newPersonnel: { 
            current: nextPers, 
            prev: prev.newPersonnel.current === nextPers ? prev.newPersonnel.prev : prev.newPersonnel.current 
          },
          servicedVehicles: { 
            current: nextReps, 
            prev: prev.servicedVehicles.current === nextReps ? prev.servicedVehicles.prev : prev.servicedVehicles.current 
          },
          inspectionsCount: { 
            current: nextInsps, 
            prev: prev.inspectionsCount.current === nextInsps ? prev.inspectionsCount.prev : prev.inspectionsCount.current 
          },
          casesCount: { 
            current: nextCases, 
            prev: prev.casesCount.current === nextCases ? prev.casesCount.prev : prev.casesCount.current 
          }
        };
      });
    } catch (e) {
      console.error('Failed to load home statistics data from services:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleNavigate = (menu: string, params?: any) => {
    if (onNavigate) {
      onNavigate(menu, params);
    }
  };

  // Dynamically calculate the core indicators based on other modules
  // Baseline matching original counts, but incrementing reactively when user adds items in respective modules
  const totalOperatingEnterprises = 1205 + enterprises.filter(e => e.status !== '歇业' && e.status !== '注销').length;
  const totalPersonnel = 8587 + personnel.length;
  const totalInspectionsThisMonth = 153 + inspections.length;
  const totalCasesThisMonth = 18 + cases.length;

  // Grade Rating counts synced dynamically
  const aaaCount = 128;
  const aaCount = 355 + enterprises.filter(e => e.riskCreditLevel === 'AA级' || e.riskCreditLevel === 'AA').length;
  const aCount = 510 + enterprises.filter(e => e.riskCreditLevel === 'A级' || e.riskCreditLevel === 'A').length;
  const bCount = 286 + enterprises.filter(e => e.riskCreditLevel === 'B级' || e.riskCreditLevel === 'B').length;
  const ratingTotalCount = aaaCount + aaCount + aCount + bCount;

  // Region raw details to divide up Fuzhou City (鼓楼, 台江, 仓山, 晋安, 马尾, 闽侯, 福清, 长乐, 连江)
  // Sum of offsets matches 1279 base perfectly. When database items are found, they add up exactly to 1284.
  const regionConfigs = [
    { name: '鼓楼区', entOffset: 282, persOffset: 2238, insOffset: 34, caseOffset: 10, repOffset: 519 },
    { name: '台江区', entOffset: 153, persOffset: 1054, insOffset: 21, caseOffset: 8,  repOffset: 339 },
    { name: '仓山区', entOffset: 311, persOffset: 1810, insOffset: 37, caseOffset: 15, repOffset: 614 },
    { name: '晋安区', entOffset: 195, persOffset: 1319, insOffset: 18, caseOffset: 10, repOffset: 410 },
    { name: '马尾区', entOffset: 41,  persOffset: 246,  insOffset: 6,  caseOffset: 2,  repOffset: 110 },
    { name: '闽侯县', entOffset: 95,  persOffset: 510,  insOffset: 10, caseOffset: 5,  repOffset: 140 },
    { name: '福清市', entOffset: 112, persOffset: 820,  insOffset: 17, caseOffset: 8,  repOffset: 180 },
    { name: '长乐区', entOffset: 58,  persOffset: 360,  insOffset: 6,  caseOffset: 5,  repOffset: 75  },
    { name: '连江县', entOffset: 32,  persOffset: 230,  insOffset: 4,  caseOffset: 3,  repOffset: 47  },
  ];

  // Map enterprise names to region to accurately count child items
  const entNameToRegion: Record<string, string> = {};
  enterprises.forEach(e => {
    entNameToRegion[e.name] = e.region || e.address || '';
  });

  const computedRegions = regionConfigs.map(config => {
    const normName = config.name.slice(0, 2);

    // 1. Matched Enterprises
    const regionEnts = enterprises.filter(e => {
      const regionText = (e.region || e.address || '').toLowerCase();
      return regionText.includes(normName);
    });

    // 2. Matched Personnel 
    const regionPers = personnel.filter(p => {
      const entRegion = entNameToRegion[p.enterprise] || '';
      const personRegion = p.householdPlace || '';
      return entRegion.toLowerCase().includes(normName) || personRegion.toLowerCase().includes(normName);
    });

    // 3. Matched Inspections
    const regionInsps = inspections.filter(i => {
      const entRegion = entNameToRegion[i.enterprise || i.company || ''] || '';
      const inspRegion = i.region || '';
      return entRegion.toLowerCase().includes(normName) || inspRegion.toLowerCase().includes(normName);
    });

    // 4. Matched Cases
    const regionCases = cases.filter(c => {
      const caseText = (c.caseName || c.title || '').toLowerCase();
      if (caseText.includes(normName)) return true;
      const ent = enterprises.find(e => (c.title || '').includes(e.name) || (c.caseName || '').includes(e.name));
      if (ent) {
        return (ent.region || ent.address || '').toLowerCase().includes(normName);
      }
      // Initial hardcoded case alignment for Gulou
      if (config.name === '鼓楼区' && (c.id === '1' || c.id === '3')) return true;
      return false;
    });

    // 5. Matched Repair Records
    const regionRepairs = repairRecords.filter(rep => {
      const entRegion = entNameToRegion[rep.enterprise] || '';
      return entRegion.toLowerCase().includes(normName) || rep.enterprise.toLowerCase().includes(normName);
    });

    return {
      name: config.name,
      ent: config.entOffset + regionEnts.length,
      pers: config.persOffset + regionPers.length,
      ins: config.insOffset + regionInsps.length,
      cases: config.caseOffset + regionCases.length,
      repairs: config.repOffset + regionRepairs.length,
    };
  });

  // Dynamic values for Tasks
  const pendingReviewsCount = 6 + enterprises.filter(e => e.recordStatus === '待备案' || e.recordStatus === '未备案' || e.recordStatus === '备案过期').length;
  const pendingRectifyCount = 4 + inspections.filter(i => i.status === '待整改' || i.result === '限期整改').length;
  const pendingAuditsCount = 10 + enterprises.filter(e => e.status === '歇业').length;

  return (
    <div className="h-full overflow-auto p-6 bg-[#F5F5F5] space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">系统首页</h1>
          <p className="text-xs text-gray-400 mt-1">集成了备案、人员、检查、处罚、承修及评定为一體的综合管理视图</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={loadData}
            className="flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:text-[#419EFF] hover:border-[#419EFF] transition-colors shadow-sm"
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            刷新数据
          </button>
          <div className="text-xs text-gray-500 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg">
            数据更新时间：2026-05-24 11:00:00
          </div>
        </div>
      </div>

      {/* 核心指标区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="在营场所" 
          value={totalOperatingEnterprises.toLocaleString()} 
          icon={Building2} 
          color="bg-blue-500" 
          trend="+4.8%" 
          description="全区网格内处于「在营」合法备案状态的机修企业"
          onClick={() => handleNavigate('企业基础信息')}
        />
        <StatCard 
          title="从业人员" 
          value={totalPersonnel.toLocaleString()} 
          icon={Users} 
          color="bg-green-500" 
          trend="+2.1%" 
          description="登记在网格内的在职、特种作业及高管等从业人员总数"
          onClick={() => handleNavigate('从业人员信息查询')}
        />
        <StatCard 
          title="本月检查" 
          value={totalInspectionsThisMonth.toLocaleString()} 
          icon={ShieldCheck} 
          color="bg-orange-500" 
          trend="+15.2%" 
          description="公安治安部门及辖区派出所本月累计开展的消防/治安核检数"
          onClick={() => handleNavigate('检查记录查询')}
        />
        <StatCard 
          title="本月案事件" 
          value={totalCasesThisMonth.toLocaleString()} 
          icon={AlertTriangle} 
          color="bg-red-500" 
          trend="-8.3%" 
          description="由于违规收销赃、违法拆解、不实登记等下达的治安或行政处罚"
          onClick={() => handleNavigate('场所被查处情况')}
        />
      </div>

      {/* 核心分析展示区：昨日机修业务一览 / 辖区列表数据 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <TrendingUp size={18} className="text-[#419EFF]" />
              昨日机修业务一览
            </h2>
            <p className="text-[11px] text-gray-400 mt-1">
              昨日核心机修业务指标指标数。可通过上方切换管辖视图，点击具体业务数字可跳转至对应板块并联动辖区过滤。
            </p>
          </div>
          
          <div className="flex gap-1.5 bg-gray-150 p-1 bg-gray-100 rounded-lg self-start shrink-0">
            <button
              onClick={() => setUserJurisdiction('province')}
              className={`px-3 py-1.5 text-xs rounded-md transition-all font-medium cursor-pointer ${
                userJurisdiction === 'province'
                  ? 'bg-white text-[#419EFF] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              福建省公安厅（省级视图）
            </button>
            <button
              onClick={() => setUserJurisdiction('city')}
              className={`px-3 py-1.5 text-xs rounded-md transition-all font-medium cursor-pointer ${
                userJurisdiction === 'city'
                  ? 'bg-white text-[#419EFF] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              福州市公安局（市级视图）
            </button>
          </div>
        </div>

        <div className="overflow-x-auto select-none">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50/70">
                <th className="px-5 py-3 rounded-l-md font-medium text-gray-700">所属辖区</th>
                <th className="px-4 py-3 text-center font-medium text-gray-700">昨日新增场所</th>
                <th className="px-4 py-3 text-center font-medium text-gray-700">昨日新增人员</th>
                <th className="px-4 py-3 text-center font-medium text-gray-700">昨日承修车辆</th>
                <th className="px-4 py-3 text-center font-medium text-gray-700">昨日检查数量</th>
                <th className="px-5 py-3 text-center rounded-r-md font-medium text-gray-700">昨日案件数量</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-600">
              {(userJurisdiction === 'province' ? [
                '福州市', '厦门市', '泉州市', '漳州市', '龙岩市', '三明市', '南平市', '宁德市', '莆田市'
              ] : [
                '鼓楼区', '台江区', '仓山区', '晋安区', '马尾区', '闽侯县', '福清市', '长乐区', '连江县'
              ]).map((name, index) => {
                const stats = getRegionStats(name, index);
                
                return (
                  <tr key={name} className="hover:bg-blue-50/10 transition-colors">
                    <td className="px-5 py-4 font-semibold text-gray-800">{name}</td>
                    
                    {/* 昨日新增场所 */}
                    <td className="px-4 py-4 text-center">
                      <ClickableMetricValue 
                        val={stats.ents.current}
                        prevVal={stats.ents.prev}
                        onClick={() => handleNavigate('企业基础信息', { region: name })}
                      />
                    </td>
                    
                    {/* 昨日新增人员 */}
                    <td className="px-4 py-4 text-center">
                      <ClickableMetricValue 
                        val={stats.pers.current}
                        prevVal={stats.pers.prev}
                        onClick={() => handleNavigate('从业人员信息查询', { region: name })}
                      />
                    </td>
                    
                    {/* 昨日承修车辆 */}
                    <td className="px-4 py-4 text-center">
                      <ClickableMetricValue 
                        val={stats.vehicles.current}
                        prevVal={stats.vehicles.prev}
                        onClick={() => handleNavigate('车辆信息管理', { region: name })}
                      />
                    </td>
                    
                    {/* 昨日检查数量 */}
                    <td className="px-4 py-4 text-center">
                      <ClickableMetricValue 
                        val={stats.insps.current}
                        prevVal={stats.insps.prev}
                        onClick={() => handleNavigate('检查记录查询', { region: name })}
                      />
                    </td>
                    
                    {/* 昨日案件数量 */}
                    <td className="px-4 py-4 text-center">
                      <ClickableMetricValue 
                        val={stats.cases.current}
                        prevVal={stats.cases.prev}
                        onClick={() => handleNavigate('场所被查处情况', { region: name })}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 快捷入口与待办事项 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div 
          className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 lg:col-span-2 cursor-pointer hover:shadow-md transition-shadow" 
          onClick={() => handleNavigate('公告与消息')}
        >
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
              <div className="text-xs text-gray-400 shrink-0 ml-4 font-mono">2026-04-10</div>
            </div>
            <div className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors border border-gray-100">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3 shrink-0"></div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800 mb-1">系统升级维护通知</h3>
                <p className="text-xs text-gray-500 line-clamp-1">信息中心定于本周末进行系统升级，届时部分功能可能受影响...</p>
              </div>
              <div className="text-xs text-gray-400 shrink-0 ml-4 font-mono">2026-04-05</div>
            </div>
            <div className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors border border-gray-100">
              <div className="w-2 h-2 mt-2 rounded-full bg-gray-400 mr-3 shrink-0"></div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800 mb-1">关于某区机修企业违规收销赃物案件的通报</h3>
                <p className="text-xs text-gray-500 line-clamp-1">近日，某区公安分局成功破获一起机修企业涉嫌掩饰、隐瞒犯罪所得案...</p>
              </div>
              <div className="text-xs text-gray-400 shrink-0 ml-4 font-mono">2026-04-01</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">我的待办任务</h2>
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between p-3 bg-blue-50 rounded-md border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={() => handleNavigate('等级评定管理')}
              >
                <div className="flex items-center">
                  <Layers size={16} className="text-blue-500 mr-2" />
                  <span className="text-sm text-gray-700">待公示等级评定企业</span>
                </div>
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-mono">{pendingReviewsCount}</span>
              </div>
              <div 
                className="flex items-center justify-between p-3 bg-orange-50 rounded-md border border-orange-100 cursor-pointer hover:bg-orange-100 transition-colors"
                onClick={() => handleNavigate('问题整改跟踪')}
              >
                <div className="flex items-center">
                  <AlertTriangle size={16} className="text-orange-500 mr-2" />
                  <span className="text-sm text-gray-700">待复查限期隐患企业</span>
                </div>
                <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-mono">{pendingRectifyCount}</span>
              </div>
              <div 
                className="flex items-center justify-between p-3 bg-green-50 rounded-md border border-green-100 cursor-pointer hover:bg-green-100 transition-colors"
                onClick={() => handleNavigate('企业基础信息')}
              >
                <div className="flex items-center">
                  <Building2 size={16} className="text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">重点跟进歇业核查</span>
                </div>
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-mono">{pendingAuditsCount}</span>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-gray-400 text-center mt-4">
            待办任务与系统异常状态联动更新
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend, 
  description,
  onClick 
}: { 
  title: string; 
  value: string; 
  icon: React.ComponentType<any>; 
  color: string; 
  trend: string; 
  description?: string;
  onClick?: () => void; 
}) {
  const isPositive = trend.startsWith('+');
  return (
    <div 
      className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-200 h-36"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-500">{title}</div>
        <div className={`w-8 h-8 rounded-full ${color} bg-opacity-10 flex items-center justify-center`}>
          <Icon size={16} className={color.replace('bg-', 'text-')} />
        </div>
      </div>
      
      <div className="my-2 flex items-baseline justify-between">
        <div className="text-2xl font-bold text-gray-800 font-sans tracking-tight">{value}</div>
        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
          isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {trend}
        </span>
      </div>

      {description && (
        <p className="text-[10px] text-gray-400 truncate mt-0.5">{description}</p>
      )}
    </div>
  );
}

function YesterdayMetricRow({
  label,
  current,
  prev,
  icon: Icon,
  color,
  description,
  onClick
}: {
  label: string;
  current: number;
  prev: number;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  onClick?: () => void;
}) {
  const diff = current - prev;
  const isUp = diff > 0;
  const isDown = diff < 0;

  return (
    <div 
      className="flex items-center justify-between p-2 rounded-lg border border-gray-100/70 hover:bg-blue-50/10 hover:border-gray-200 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${color}`}>
          <Icon size={16} />
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-700 group-hover:text-[#419EFF] transition-colors">{label}</div>
          <p className="text-[10px] text-gray-400 mt-0.5 max-w-[180px] md:max-w-[220px] truncate">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-sm font-bold text-gray-800 font-mono">{current.toLocaleString()}</div>
        
        {/* Trend comparison with dynamic indicator arrow */}
        <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold font-mono w-14 justify-center ${
          isUp ? 'bg-green-50 text-green-600' :
          isDown ? 'bg-red-50 text-red-600' :
          'bg-gray-50 text-gray-400'
        }`}>
          {isUp && (
            <>
              <span className="text-xs">↑</span>
              <span>+{diff}</span>
            </>
          )}
          {isDown && (
            <>
              <span className="text-xs">↓</span>
              <span>{Math.abs(diff)}</span>
            </>
          )}
          {!isUp && !isDown && (
            <>
              <span>-</span>
              <span>0</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface ClickableMetricValueProps {
  val: number;
  prevVal?: number;
  onClick: () => void;
}

function ClickableMetricValue({ val, prevVal, onClick }: ClickableMetricValueProps) {
  const diff = prevVal !== undefined ? val - prevVal : 0;
  const isUp = diff > 0;
  const isDown = diff < 0;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="inline-flex items-center gap-1 px-2.5 py-1 border border-blue-105 bg-blue-50/40 hover:bg-blue-100/70 border-blue-200/40 rounded text-xs font-bold text-[#419EFF] font-mono transition-all hover:scale-105 active:scale-95 cursor-pointer max-w-[80px] justify-center shadow-sm"
      title="点击查看数据联动详情"
    >
      <span>{val.toLocaleString()}</span>
      {diff !== 0 && (
        <span className={`text-[9px] font-sans ${isUp ? 'text-emerald-600' : 'text-rose-500'}`} style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
          {isUp ? '▲' : '▼'}{Math.abs(diff)}
        </span>
      )}
    </button>
  );
}
