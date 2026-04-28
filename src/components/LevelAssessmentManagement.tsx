import React, { useState } from 'react';
import { Search, RotateCcw, Plus, Download, Upload, Eye, CheckSquare, XCircle, FileText, X, ChevronDown, BarChart3, PieChart } from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const ReadOnlyField = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm text-[#666666]">{label}</label>
    <div className="bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-[#333333] h-[40px] flex items-center">
      {value}
    </div>
  </div>
);

export default function LevelAssessmentManagement() {
  const [data] = useState([
    { id: '1', name: '某汽车维修有限公司', code: '91350100MA34567890', region: '鼓楼区', year: '2025', selfScore: 920, auditScore: 890, suggestLevel: 'AAA', finalLevel: 'AAA', status: '已公示' },
    { id: '2', name: '某快捷汽修店', code: '91350100MA12345678', region: '台江区', year: '2025', selfScore: 850, auditScore: null, suggestLevel: '-', finalLevel: '-', status: '待审核' },
    { id: '3', name: '某汽车服务中心', code: '91350100MA98765432', region: '仓山区', year: '2025', selfScore: 780, auditScore: 750, suggestLevel: 'A', finalLevel: 'A', status: '申诉中' },
    { id: '4', name: '某专业钣金喷漆', code: '91350100MA11223344', region: '晋安区', year: '2025', selfScore: null, auditScore: null, suggestLevel: '-', finalLevel: '-', status: '待自评' },
    { id: '5', name: '远航汽车中心', code: '91350100MA22334455', region: '鼓楼区', year: '2025', selfScore: 950, auditScore: 940, suggestLevel: 'AAA', finalLevel: 'AAA', status: '已公示' },
  ]);

  const statsData = [
    { name: 'AAA级', value: 12 },
    { name: 'AA级', value: 25 },
    { name: 'A级', value: 45 },
    { name: 'B级', value: 8 },
  ];

  const regionStats = [
    { name: '鼓楼区', count: 20 },
    { name: '台江区', count: 15 },
    { name: '仓山区', count: 25 },
    { name: '晋安区', count: 18 },
    { name: '马尾区', count: 12 },
  ];

  const COLORS = ['#FF9F43', '#419EFF', '#28C76F', '#EA5455'];

  const [view, setView] = useState<'list' | 'detail' | 'audit'>('list');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const [isInitiateModalOpen, setIsInitiateModalOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '待自评': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case '待审核': return 'bg-blue-100 text-blue-700 border-blue-200';
      case '已公示': return 'bg-green-100 text-green-700 border-green-200';
      case '申诉中': return 'bg-red-100 text-red-700 border-red-200';
      case '已归档': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'AAA': return 'text-yellow-500 font-bold';
      case 'AA': return 'text-blue-500 font-bold';
      case 'A': return 'text-green-500 font-bold';
      case 'B': return 'text-red-500 font-bold';
      default: return 'text-gray-500';
    }
  };

  const openAdjustModal = (record: any) => {
    setSelectedRecord(record);
    setIsAdjustModalOpen(true);
  };

  const handleAutoAssess = () => {
    alert("系统正在根据场所近一年违法、投诉、检查结果进行自动评定...");
  };

  const openAuditOrDetail = (record: any) => {
    setSelectedRecord(record);
    if (record.status === '待审核') {
      setView('audit');
    } else {
      setView('detail');
    }
  };

  if (view === 'detail' || view === 'audit') {
    return (
      <div className="flex flex-col h-full bg-[#F5F5F5] overflow-hidden font-sans">
        {/* 顶部标题与操作栏 */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-bold text-gray-800">{selectedRecord.name} - 治安等级评定{view === 'audit' ? '审核' : '详情'}</h2>
             <span className={`px-2 py-0.5 rounded text-xs border ${getStatusColor(selectedRecord.status)}`}>{selectedRecord.status}</span>
             <span className={`px-2 py-0.5 rounded text-xs border border-yellow-200 bg-yellow-50 ${getLevelColor(selectedRecord.finalLevel)}`}>{selectedRecord.year}年度评定</span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setView('list')}
              className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
            >
              <Plus size={16} className="mr-1.5 rotate-45" /> 返回列表
            </button>
            {view === 'audit' && (
              <button className="px-6 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
                <FileText size={16} className="mr-1.5" /> 确认发布
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
          {/* 1. 评定概览 */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
              <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                评定概览
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ReadOnlyField label="单位名称" value={selectedRecord.name} />
                <ReadOnlyField label="所属辖区" value={selectedRecord.region} />
                <ReadOnlyField label="信用代码" value={selectedRecord.code} />
                <ReadOnlyField label="评定年度" value={selectedRecord.year} />
                <ReadOnlyField label="自评分数" value={selectedRecord.selfScore || '-'} />
                <ReadOnlyField label="建议等级" value={selectedRecord.suggestLevel} />
                <ReadOnlyField label="最终评分" value={selectedRecord.auditScore || '待核定'} />
                <ReadOnlyField label="最终等级" value={selectedRecord.finalLevel} />
              </div>
            </div>
          </section>

          {/* 2. 评定项目清单 */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
              <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                评定项目清单
              </h3>
            </div>
            <div className="p-0 overflow-hidden">
              <div className="flex h-[500px]">
                {/* 左侧指标树 */}
                <div className="w-1/3 border-r border-gray-100 overflow-auto p-4 bg-gray-50/30">
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded border border-gray-200 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-gray-800">一、安全管理情况</span>
                        <span className="text-xs text-blue-600">300分</span>
                      </div>
                      <div className="space-y-2 mt-2">
                        <div className="p-2 bg-blue-50 text-[#419EFF] rounded text-xs border border-blue-100 font-medium cursor-pointer">1.1 内部保卫组织 (100分)</div>
                        <div className="p-2 hover:bg-gray-50 rounded text-xs text-gray-600 cursor-pointer pl-4 flex justify-between">
                          <span>1.1.1 专职人员配备</span>
                          <span className="text-gray-400">核定: -20分</span>
                        </div>
                        <div className="p-2 hover:bg-gray-50 rounded text-xs text-gray-600 cursor-pointer">1.2 物防技防设施 (200分)</div>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-600">二、日常经营行为</span>
                        <span className="text-xs text-gray-400">400分</span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-600">三、配合管理情况</span>
                        <span className="text-xs text-gray-400">300分</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 右侧审核详情 */}
                <div className="flex-1 p-6 overflow-auto bg-white">
                  <div className="max-w-3xl border border-gray-200 rounded-lg overflow-hidden shrink-0">
                    <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                      <h4 className="text-sm font-bold text-gray-800">指标详情: 1.1.1 未按要求配备专职保卫人员</h4>
                      <span className="text-xs text-red-500">-20分 / 人</span>
                    </div>
                    <div className="p-5 space-y-6">
                      <div className="bg-blue-50/30 p-4 rounded-md border border-blue-50 leading-relaxed text-xs text-gray-600">
                        <p className="font-bold text-gray-700 mb-1">考核标准：</p>
                        员工人数超过50人的娱乐场所应当配备不少于3名专职安保人员。
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div className="space-y-4">
                           <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                             <div className="w-1 h-3 bg-[#419EFF] rounded-full"></div>
                             企业端自评
                           </label>
                           <div className="p-4 bg-gray-50 border border-gray-100 rounded text-xs text-gray-600 italic">
                             我们目前配备了2名专业保安，均持有上岗证。本年度场所平均在岗人数48人，符合标准。
                           </div>
                           <div className="flex gap-2">
                             <div className="w-16 h-16 bg-gray-100 rounded border border-dashed border-gray-300 flex items-center justify-center text-[10px] text-gray-400">保卫证1.jpg</div>
                             <div className="w-16 h-16 bg-gray-100 rounded border border-dashed border-gray-300 flex items-center justify-center text-[10px] text-gray-400">保卫证2.jpg</div>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                             <div className="w-1 h-3 bg-red-500 rounded-full"></div>
                             公安端核定 {view === 'audit' && <span className="text-red-500 font-normal ml-1">(审核中)</span>}
                           </label>
                           {view === 'audit' ? (
                             <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-gray-500">扣分值:</span>
                                  <input type="number" defaultValue="20" className="w-20 h-8 border border-gray-300 rounded px-2 text-sm focus:border-[#419EFF] outline-none" />
                                </div>
                                <textarea rows={3} className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#419EFF] outline-none" placeholder="填写审核理由..."></textarea>
                             </div>
                           ) : (
                             <div className="space-y-3">
                               <div className="p-4 bg-red-50 border border-red-100 rounded text-xs text-red-700">
                                 <p className="font-bold mb-1">经核查：</p>
                                 该场所在重大节点（2025年春节期间）员工人数最高达到65人，由于期间只配备了2名保安，未达到部颁标准对高平峰时期的安保要求，扣除20分。
                               </div>
                               <div className="flex justify-between items-center text-[10px] text-gray-400">
                                 <span>审核人: 张警官</span>
                                 <span>时间: 2025-03-25 10:20</span>
                               </div>
                             </div>
                           )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. 附件材料 (如果需要) */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
              <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                评定附件材料
              </h3>
            </div>
            <div className="p-6">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { name: '治安等级自评报告.docx', size: '156KB' },
                    { name: '年度治安总结.pdf', size: '2.1MB' },
                  ].map((file, i) => (
                    <div key={i} className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-[#419EFF] mr-3 shadow-xs">
                        <FileText size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-gray-700 truncate">{file.name}</p>
                        <p className="text-[9px] text-gray-400">{file.size}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      <div className="flex-1 p-3 overflow-auto">
        <div className="flex flex-col gap-3 min-h-full">
          {/* 统计概览 */}
          {showStats && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col">
                <h3 className="text-sm font-semibold mb-4 text-gray-700 border-l-4 border-[#419EFF] pl-2 flex justify-between">
                  辖区场所治安等级占比统计
                  <PieChart size={16} className="text-gray-400" />
                </h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={statsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ReTooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {statsData.map((s, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                      <span className="text-xs text-gray-500">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col">
                <h3 className="text-sm font-semibold mb-4 text-gray-700 border-l-4 border-[#FF9F43] pl-2 flex justify-between">
                  各辖区参评场所数量分布
                  <BarChart3 size={16} className="text-gray-400" />
                </h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={regionStats}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <ReTooltip />
                      <Bar dataKey="count" fill="#FF9F43" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
                <h3 className="text-sm font-semibold mb-2 text-gray-700 border-l-4 border-[#28C76F] pl-2">评定工作进度</h3>
                <div className="space-y-4 py-2">
                  {[
                    { label: '参评总数', value: '120', color: 'text-gray-800' },
                    { label: '已完成评定', value: '85', color: 'text-green-600' },
                    { label: '待审核场所', value: '12', color: 'text-blue-600' },
                    { label: '待自评场所', value: '23', color: 'text-yellow-600' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">{item.label}</span>
                      <span className={`font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#28C76F] h-full w-[70%]"></div>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">当前完成进度: 70.8%</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col flex-1">
            {/* 查询区域 */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="w-64">
                  <label className="block text-sm text-[#666666] mb-1.5">企业名称/信用代码</label>
                  <input type="text" className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入" />
                </div>
                <div className="w-48">
                  <label className="block text-sm text-[#666666] mb-1.5">所属辖区</label>
                  <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                    <option value="">全部</option>
                    <option value="鼓楼区">鼓楼区</option>
                    <option value="台江区">台江区</option>
                    <option value="仓山区">仓山区</option>
                    <option value="晋安区">晋安区</option>
                  </select>
                </div>
                <div className="w-32">
                  <label className="block text-sm text-[#666666] mb-1.5">评定状态</label>
                  <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                    <option value="">全部</option>
                    <option value="待自评">待自评</option>
                    <option value="待审核">待审核</option>
                    <option value="已公示">已公示</option>
                    <option value="申诉中">申诉中</option>
                  </select>
                </div>
                <div className="w-32">
                  <label className="block text-sm text-[#666666] mb-1.5">评定年份</label>
                  <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
                <div className="flex space-x-2 ml-auto">
                  <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
                    <Search size={14} className="mr-1.5" /> 查询
                  </button>
                  <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                    <RotateCcw size={14} className="mr-1.5" /> 重置
                  </button>
                  <button 
                    onClick={() => setShowStats(!showStats)}
                    className="h-8 px-3 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors flex items-center text-sm font-medium"
                  >
                    {showStats ? "收起统计" : "展开统计"}
                  </button>
                </div>
              </div>
            </div>

            {/* 操作区域 */}
            <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
              <div className="text-sm text-[#666666]">共找到 <span className="text-[#419EFF] font-medium">{data.length}</span> 条评定记录</div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleAutoAssess}
                  className="h-8 px-4 bg-white border border-orange-300 text-orange-600 rounded hover:bg-orange-50 transition-colors flex items-center text-sm font-medium font-bold italic"
                >
                  <RotateCcw size={14} className="mr-1.5" /> 系统自动评定
                </button>
                <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                  <Download size={14} className="mr-1.5" /> 导出结果
                </button>
                <button 
                  className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium"
                  onClick={() => setIsInitiateModalOpen(true)}
                >
                  <Plus size={14} className="mr-1.5" /> 发起新评定
                </button>
              </div>
            </div>

            {/* 表格区域 */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                    <th className="px-4 py-3 font-medium w-16 text-center">序号</th>
                    <th className="px-4 py-3 font-medium">场所名称</th>
                    <th className="px-4 py-3 font-medium">所属辖区</th>
                    <th className="px-4 py-3 font-medium">年度</th>
                    <th className="px-4 py-3 font-medium text-right">自评分</th>
                    <th className="px-4 py-3 font-medium text-right">考核分</th>
                    <th className="px-4 py-3 font-medium text-center">建议等级</th>
                    <th className="px-4 py-3 font-medium text-center">最终等级</th>
                    <th className="px-4 py-3 font-medium text-center">状态</th>
                    <th className="px-4 py-3 font-medium text-center w-56 sticky right-0 bg-gray-50">操作</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-[#666666]">
                  {data.map((row, index) => (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors group">
                      <td className="px-4 py-3 text-center">{index + 1}</td>
                      <td className="px-4 py-3 font-medium text-[#419EFF] cursor-pointer hover:underline" onClick={() => openAuditOrDetail(row)}>{row.name}</td>
                      <td className="px-4 py-3">{row.region}</td>
                      <td className="px-4 py-3">{row.year}</td>
                      <td className="px-4 py-3 text-right">{row.selfScore || '-'}</td>
                      <td className="px-4 py-3 text-right font-medium">{row.auditScore || '-'}</td>
                      <td className={`px-4 py-3 text-center ${getLevelColor(row.suggestLevel)}`}>{row.suggestLevel}</td>
                      <td className={`px-4 py-3 text-center ${getLevelColor(row.finalLevel)}`}>{row.finalLevel}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getStatusColor(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className={`px-4 py-3 text-center sticky right-0 bg-white group-hover:bg-blue-50/50 transition-colors ${openDropdown === row.id ? 'z-50' : 'z-10'}`}>
                        <div className="flex items-center justify-center space-x-3">
                          <button className="text-[#419EFF] hover:text-blue-700 font-medium" onClick={() => openAuditOrDetail(row)}>
                            {row.status === '待审核' ? '审核' : '详情'}
                          </button>
                          <button 
                            className="text-orange-600 hover:text-orange-700 font-medium whitespace-nowrap"
                            onClick={() => openAdjustModal(row)}
                          >
                            手动调级
                          </button>
                          <div className="relative">
                            <button 
                              className="text-gray-400 hover:text-gray-600 p-1"
                              onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === row.id ? null : row.id); }}
                            >
                              <ChevronDown size={14} />
                            </button>
                            {openDropdown === row.id && (
                              <>
                                <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}></div>
                                <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-20 py-1">
                                  <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">删除</button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 分页区域 */}
            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-white">
              <div className="text-sm text-[#666666]">
                共 {data.length * 10} 条结果，每页显示 10 条
              </div>
              <div className="flex space-x-1">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-[#999999] bg-gray-50 cursor-not-allowed">上一页</button>
                <button className="px-3 py-1 border border-[#419EFF] rounded text-sm text-white bg-[#419EFF]">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-[#666666] hover:bg-gray-50">下一页</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 手动调整等级模态框 */}
      {isAdjustModalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[500px] flex flex-col shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">场所治安等级调整</h3>
              <button onClick={() => setIsAdjustModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-orange-50 p-3 rounded-md text-orange-700 text-xs mb-2">
                <strong>说明：</strong> 手动调整将覆盖系统自动评定结果，请谨慎操作并填写充分理由。
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">场所名称</label>
                <input type="text" disabled value={selectedRecord.name} className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">当前等级</label>
                  <div className={`p-2 border border-gray-200 rounded-md text-sm font-bold text-center ${getLevelColor(selectedRecord.finalLevel)}`}>{selectedRecord.finalLevel}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">调整为</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[#419EFF] outline-none bg-white">
                    <option value="AAA">AAA 级</option>
                    <option value="AA">AA 级</option>
                    <option value="A">A 级</option>
                    <option value="B">B 级</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">调整理由/备注 (必填)</label>
                <textarea rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#419EFF]" placeholder="请输入调整依据，如：发生重大立功表现、由于XX事故限期整改中等..."></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button onClick={() => setIsAdjustModalOpen(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-100">取消</button>
              <button onClick={() => setIsAdjustModalOpen(false)} className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700">确认调整</button>
            </div>
          </div>
        </div>
      )}

      {/* 发起新评定模态框 */}
      {isInitiateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[600px] flex flex-col shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">发起新评定</h3>
              <button onClick={() => setIsInitiateModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">评定年度</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#419EFF]">
                  <option>2026</option>
                  <option>2025</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">选择评定范围</label>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="scope" defaultChecked /> 全部场所</label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="scope" /> 指定辖区</label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="scope" /> 指定企业</label>
                </div>
                <div className="border border-gray-300 rounded-md p-2 h-32 overflow-y-auto bg-gray-50">
                  <label className="flex items-center space-x-2 p-1 hover:bg-white rounded">
                    <input type="checkbox" className="rounded text-[#419EFF] focus:ring-[#419EFF]" />
                    <span className="text-sm">福州市鼓楼区 (45家)</span>
                  </label>
                  <label className="flex items-center space-x-2 p-1 hover:bg-white rounded">
                    <input type="checkbox" className="rounded text-[#419EFF] focus:ring-[#419EFF]" />
                    <span className="text-sm">福州市台江区 (32家)</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">评定标准模板</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#419EFF]">
                  <option>娱乐服务场所治安管理等级考核标准 (2025版)</option>
                  <option>特种行业治安评估标准 (V1.2)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button onClick={() => setIsInitiateModalOpen(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-100">取消</button>
              <button onClick={() => setIsInitiateModalOpen(false)} className="px-4 py-2 bg-[#419EFF] text-white rounded-md text-sm hover:bg-blue-600">确认下发评定任务</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
