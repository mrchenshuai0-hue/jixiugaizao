import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Edit, User, Phone, MapPin, Calendar, Briefcase, Award, ShieldAlert, Clock, AlertTriangle, Building, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../api';

const MOCK_CAREERS = [
  {
    id: 'c1',
    company: '福建众诚汽车修配服务中心',
    position: '高级机修/电工组长',
    entryDate: '2026-04-14',
    exitDate: '至今',
    status: '在任'
  },
  {
    id: 'c2',
    company: '福州市鼓楼区安达汽车维修服务部',
    position: '机修大工',
    entryDate: '2024-03-01',
    exitDate: '2026-04-10',
    status: '离任 (正常转定)'
  },
  {
    id: 'c3',
    company: '福建省中商交通智能检测技术中心',
    position: '学徒/助理机检员',
    entryDate: '2022-09-10',
    exitDate: '2024-02-25',
    status: '离任'
  }
];

const MOCK_CLOCK_INS = [
  {
    id: 't1',
    placeName: '福建众诚汽车修配服务中心 - 主车间',
    placeType: '一类汽车维修厂',
    onDutyTime: '2026-05-27 08:02:15',
    offDutyTime: '2026-05-27 18:05:40'
  },
  {
    id: 't2',
    placeName: '福建众诚汽车修配服务中心 - 烤漆业务区',
    placeType: '一类汽车维修厂',
    onDutyTime: '2026-05-26 07:58:10',
    offDutyTime: '2026-05-26 18:12:30'
  },
  {
    id: 't3',
    placeName: '福州市罗星街道外勤抢修大队临时点',
    placeType: '临时外勤点',
    onDutyTime: '2026-05-25 08:05:44',
    offDutyTime: '2026-05-25 18:15:22'
  },
  {
    id: 't4',
    placeName: '福州市鼓楼区安达汽车维修服务部 - 诊断中心',
    placeType: '二类汽车维修部',
    onDutyTime: '2026-04-10 08:15:00',
    offDutyTime: '2026-04-10 17:55:00'
  },
  {
    id: 't5',
    placeName: '福州市鼓楼区安达汽车维修服务部 - 装配间',
    placeType: '二类汽车维修部',
    onDutyTime: '2026-04-09 08:00:22',
    offDutyTime: '2026-04-09 18:02:11'
  },
  {
    id: 't6',
    placeName: '福建省中商交通智能检测技术中心 - 环保检测线',
    placeType: '综合检测站',
    onDutyTime: '2024-02-25 08:30:00',
    offDutyTime: '2024-02-25 17:30:00'
  },
  {
    id: 't7',
    placeName: '福建省中商交通智能检测技术中心 - 前台登记录入端',
    placeType: '综合检测站',
    onDutyTime: '2024-02-24 08:28:15',
    offDutyTime: '2024-02-24 17:45:10'
  }
];

export interface PersonnelDetailProps {
  id: string;
  onBack: () => void;
}

export default function PersonnelDetail({ id, onBack }: PersonnelDetailProps) {
  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [onDutyStart, setOnDutyStart] = useState('');
  const [onDutyEnd, setOnDutyEnd] = useState('');
  const [offDutyStart, setOffDutyStart] = useState('');
  const [offDutyEnd, setOffDutyEnd] = useState('');
  const [searchPlaceName, setSearchPlaceName] = useState('');
  const [searchPlaceType, setSearchPlaceType] = useState('all');
  const [clockInPage, setClockInPage] = useState(1);

  const filteredClockIns = MOCK_CLOCK_INS.filter(clk => {
    if (onDutyStart) {
      const clkOnDate = clk.onDutyTime.substring(0, 10);
      if (clkOnDate < onDutyStart) return false;
    }
    if (onDutyEnd) {
      const clkOnDate = clk.onDutyTime.substring(0, 10);
      if (clkOnDate > onDutyEnd) return false;
    }

    if (offDutyStart) {
      const clkOffDate = clk.offDutyTime.substring(0, 10);
      if (clkOffDate < offDutyStart) return false;
    }
    if (offDutyEnd) {
      const clkOffDate = clk.offDutyTime.substring(0, 10);
      if (clkOffDate > offDutyEnd) return false;
    }

    if (searchPlaceName && !clk.placeName.toLowerCase().includes(searchPlaceName.toLowerCase())) {
      return false;
    }

    if (searchPlaceType !== 'all' && clk.placeType !== searchPlaceType) {
      return false;
    }

    return true;
  });

  const clockInItemsPerPage = 5;
  const totalClockInItems = filteredClockIns.length;
  const totalClockInPages = Math.ceil(totalClockInItems / clockInItemsPerPage) || 1;
  const currentClockInPage = Math.max(1, Math.min(clockInPage, totalClockInPages));
  const startClkIndex = (currentClockInPage - 1) * clockInItemsPerPage;
  const paginatedClockIns = filteredClockIns.slice(startClkIndex, startClkIndex + clockInItemsPerPage);

  const handleResetClockIns = () => {
    setOnDutyStart('');
    setOnDutyEnd('');
    setOffDutyStart('');
    setOffDutyEnd('');
    setSearchPlaceName('');
    setSearchPlaceType('all');
    setClockInPage(1);
  };

  const handleOnDutyStartChange = (val: string) => {
    setOnDutyStart(val);
    setClockInPage(1);
  };

  const handleOnDutyEndChange = (val: string) => {
    setOnDutyEnd(val);
    setClockInPage(1);
  };

  const handleOffDutyStartChange = (val: string) => {
    setOffDutyStart(val);
    setClockInPage(1);
  };

  const handleOffDutyEndChange = (val: string) => {
    setOffDutyEnd(val);
    setClockInPage(1);
  };

  const handlePlaceNameChange = (val: string) => {
    setSearchPlaceName(val);
    setClockInPage(1);
  };

  const handlePlaceTypeChange = (val: string) => {
    setSearchPlaceType(val);
    setClockInPage(1);
  };

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const result = await api.personnel.getById(id);
        setPerson(result);
      } catch (error) {
        console.error('Failed to fetch personnel detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#419EFF] mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">详情加载中...</p>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F5]">
        <div className="text-center">
          <AlertTriangle size={48} className="text-[#fa5e45] mx-auto mb-4" />
          <p className="text-gray-500 text-sm">未找到人员信息</p>
          <button onClick={onBack} className="mt-4 text-[#419EFF] hover:underline text-sm transition-colors">返回列表</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative font-sans">
      {/* 顶部标题与操作栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
           <h2 className="text-xl font-bold text-gray-800">{person.name}</h2>
           <span className="px-2 py-0.5 bg-green-50 text-green-600 border border-green-100 rounded text-xs">{person.status}</span>
           <span className="px-2 py-0.5 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-xs">{person.personType || '国内人员'}</span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onBack}
            className="h-9 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-1.5" /> 返回列表
          </button>
        </div>
      </div>

      {/* 主体内容区 */}
      <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
        {/* 人员基本信息 (包含照片) */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              人员基本信息
            </h3>
          </div>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* 照片展示 */}
              <div className="shrink-0 flex flex-col items-center">
                 <div className="w-32 h-40 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shadow-inner font-sans">
                   {person.photo ? (
                     <img src={person.photo} alt={person.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                   ) : (
                     <User size={60} className="text-gray-200" />
                   )}
                 </div>
                 <p className="mt-3 text-xs text-gray-400">人员电子照片</p>
              </div>

              {/* 基本信息字段 */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                {/* 第1排: 所属企业、人员姓名、证件号码 */}
                <DetailItem label="所属企业" value={person.enterprise || "福州市鼓楼区安达汽车维修服务部"} required />
                <DetailItem label="人员姓名" value={person.name} required />
                <DetailItem label="证件号码" value={person.idCard} required />

                {/* 第2排: 性别、出生日期、民族 */}
                <DetailItem label="性别" value={person.gender || "男"} />
                <DetailItem label="出生日期" value={person.birthday} required />
                <DetailItem label="民族" value={person.nation || "汉族"} />

                {/* 第3排: 联系电话、工种、居住证号 */}
                <DetailItem label="联系电话" value={person.phone} required />
                <DetailItem label="工种" value={person.workType || person.position || "机修工"} />
                <DetailItem label="居住证号" value={person.residenceNo || "-"} />

                {/* 第4排: 户籍所在地、户籍地址、现住地址 */}
                <DetailItem label="户籍所在地" value={person.householdPlace || "福建省福州市"} required />
                <DetailItem label="户籍地址" value={person.householdAddress || person.householdAddressDetail || "-"} />
                <DetailItem label="现住地址" value={person.address || "-"} />

                {/* 第5排: 从业状态、入职时间、离职时间 */}
                <DetailItem label="从业状态" value={person.status || "在职"} />
                <DetailItem label="入职时间" value={person.entryDate || "2026-04-14"} required />
                <DetailItem label="离职时间" value={person.departureDate || "-"} />

                {/* 其他辅助审计字段 */}
                <DetailItem label="登记人" value={person.registrar || "系统管理员"} />
                <DetailItem label="登记时间" value={person.registerDate || "2026-03-15 14:22:10"} />
                <div className="hidden md:block"></div>

                <DetailItem label="修改人" value={person.updater || "系统管理员"} />
                <DetailItem label="变更时间" value={person.updateDate || "2026-05-24 09:59:00"} />
                <div className="hidden md:block"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 双卡片上下排列布局 */}
        <div className="space-y-4">
          {/* 从业记录卡片 */}
          <section className="bg-[#FFFFFF] rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex justify-between items-center text-[#333333]">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Briefcase size={16} className="text-[#419EFF]" />
                <span>从业记录</span>
              </h3>
              <span className="px-2 py-0.5 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-[10px] font-semibold">记录数: {MOCK_CAREERS.length}</span>
            </div>
            
            <div className="p-5 flex-1 space-y-4">
              <div className="space-y-4">
                {MOCK_CAREERS.map((cur, idx) => (
                  <div key={cur.id} className="relative pl-5 pb-4 border-l border-gray-200 last:border-0 last:pb-0">
                    {/* 时间轴标记 */}
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border border-[#419EFF] bg-white flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#419EFF]"></span>
                    </div>
                    
                    {/* 详情卡片 */}
                    <div className="bg-gray-50 border border-gray-200 rounded p-3 text-xs space-y-2 hover:border-blue-200 hover:bg-blue-50/10 transition-all text-left">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-bold text-gray-800 text-[13px] flex items-center gap-1">
                          <Building size={14} className="text-gray-400 shrink-0" />
                          <span>{cur.company}</span>
                        </h4>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap shrink-0 font-medium border ${
                          idx === 0 
                            ? 'bg-green-50 text-green-600 border-green-200' 
                            : 'bg-gray-100 text-gray-500 border-gray-200'
                        }`}>
                          {cur.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-1.5 gap-x-4 text-gray-500 font-sans">
                        <div>
                          <span className="font-semibold text-gray-650">担任职位: </span>
                          <span className="text-gray-800 font-medium">{cur.position}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-650">入职时间: </span>
                          <span className="text-gray-800 font-medium">{cur.entryDate}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-650">离职时间: </span>
                          <span className="text-gray-800 font-medium">{cur.exitDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 打卡记录卡片 */}
          <section className="bg-[#FFFFFF] rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex justify-between items-center text-[#333333]">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Clock size={16} className="text-orange-500" />
                <span>打卡记录</span>
              </h3>
              <span className="px-2 py-0.5 bg-orange-50 text-orange-600 border border-orange-100 rounded text-[10px] font-semibold font-mono">记录数: {totalClockInItems}</span>
            </div>

            {/* 打卡记录卡片查询栏位 */}
            <div className="bg-[#FAFBFD] border-b border-gray-150 p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-xs text-[#333333]">
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">场所名称</label>
                <input
                  type="text"
                  placeholder="搜索场所名称..."
                  value={searchPlaceName}
                  onChange={(e) => handlePlaceNameChange(e.target.value)}
                  className="w-full h-9 px-2.5 border border-gray-300 rounded text-xs bg-white focus:border-[#419EFF] outline-none"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">场所类型</label>
                <select
                  value={searchPlaceType}
                  onChange={(e) => handlePlaceTypeChange(e.target.value)}
                  className="w-full h-9 px-2 border border-gray-300 rounded text-xs bg-white focus:border-[#419EFF] outline-none cursor-pointer"
                >
                  <option value="all">全部类型</option>
                  <option value="一类汽车维修厂">一类汽车维修厂</option>
                  <option value="二类汽车维修部">二类汽车维修部</option>
                  <option value="临时外勤点">临时外勤点</option>
                  <option value="综合检测站">综合检测站</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">上岗时间范围</label>
                <div className="flex items-center gap-1">
                  <input
                    type="date"
                    value={onDutyStart}
                    onChange={(e) => handleOnDutyStartChange(e.target.value)}
                    className="w-full h-9 px-1 py-0.5 border border-gray-300 rounded text-[11px] bg-white focus:border-[#419EFF] outline-none"
                  />
                  <span className="text-gray-400 font-mono">~</span>
                  <input
                    type="date"
                    value={onDutyEnd}
                    onChange={(e) => handleOnDutyEndChange(e.target.value)}
                    className="w-full h-9 px-1 py-0.5 border border-gray-300 rounded text-[11px] bg-white focus:border-[#419EFF] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">下岗时间范围</label>
                <div className="flex items-center gap-1">
                  <input
                    type="date"
                    value={offDutyStart}
                    onChange={(e) => handleOffDutyStartChange(e.target.value)}
                    className="w-full h-9 px-1 py-0.5 border border-gray-300 rounded text-[11px] bg-white focus:border-[#419EFF] outline-none"
                  />
                  <span className="text-gray-400 font-mono">~</span>
                  <input
                    type="date"
                    value={offDutyEnd}
                    onChange={(e) => handleOffDutyEndChange(e.target.value)}
                    className="w-full h-9 px-1 py-0.5 border border-gray-300 rounded text-[11px] bg-white focus:border-[#419EFF] outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-4 flex justify-end gap-2 pt-1.5">
                <button
                  type="button"
                  onClick={handleResetClockIns}
                  className="px-4 h-8 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded text-xs font-semibold transition-colors cursor-pointer"
                >
                  重置查询
                </button>
              </div>
            </div>

            <div className="p-0 flex-1 overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs min-w-[550px]">
                <thead className="bg-[#fcfdfd] text-gray-500 font-bold border-b border-gray-200">
                  <tr>
                    <th className="px-5 py-3">场所名称</th>
                    <th className="px-5 py-3">场所类型</th>
                    <th className="px-5 py-3">上岗时间</th>
                    <th className="px-5 py-3">下岗时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600 bg-white">
                  {paginatedClockIns.length > 0 ? (
                    paginatedClockIns.map((clk) => (
                      <tr key={clk.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-5 py-3.5 font-bold text-gray-800 font-sans">{clk.placeName}</td>
                        <td className="px-5 py-3.5">
                          <span className="px-2 py-0.5 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-[11px] font-semibold">
                            {clk.placeType}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-mono text-gray-700 font-semibold">{clk.onDutyTime}</td>
                        <td className="px-5 py-3.5 font-mono text-gray-700 font-semibold">{clk.offDutyTime}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-gray-400 text-xs">
                        暂无符合筛选条件的打卡记录
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="p-3 border-t border-gray-100 text-center text-[10px] text-gray-400 font-sans">
                💡 本列表实时打通各汽修网点实名考勤终端及打卡采集核验比对库。
              </div>
            </div>

            {/* 页码与翻页 (Clock In Pagination) */}
            {totalClockInPages > 1 && (
              <div className="flex justify-between items-center bg-[#F9FBFC] border-t border-gray-200 px-5 py-3.5 text-xs">
                <div className="text-gray-500 font-medium">
                  共检索到 <span className="font-bold text-gray-800">{totalClockInItems}</span> 条打卡记录，每页显示 {clockInItemsPerPage} 条
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentClockInPage === 1}
                    onClick={() => setClockInPage(prev => Math.max(1, prev - 1))}
                    className="px-2.5 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center gap-1 cursor-pointer font-semibold shadow-sm text-gray-700"
                  >
                    <ChevronLeft size={13} />
                    <span>上一页</span>
                  </button>
                  
                  <span className="text-gray-500 font-mono px-1">
                    第 <span className="font-bold text-gray-800">{currentClockInPage}</span> / {totalClockInPages} 页
                  </span>
                  
                  <button
                    type="button"
                    disabled={currentClockInPage === totalClockInPages}
                    onClick={() => setClockInPage(prev => Math.min(totalClockInPages, prev + 1))}
                    className="px-2.5 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center gap-1 cursor-pointer font-semibold shadow-sm text-gray-700"
                  >
                    <span>下一页</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>

      </div>
    </div>
  );
}

function DetailItem({ label, value, required, className = "" }: { label: string, value: string | number, required?: boolean, className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700 flex items-center">
        <span className={`${required ? 'text-red-500 mr-1' : 'w-2'}`}>{required ? '*' : ''}</span>
        {label}
      </label>
      <div className="h-9 px-3 flex items-center bg-gray-50 border border-gray-300 rounded text-sm text-gray-600 truncate border-solid">
        {value || '-'}
      </div>
    </div>
  );
}
