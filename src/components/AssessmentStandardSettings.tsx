import React, { useState, useEffect } from 'react';
import { Plus, Edit, Copy, Ban, Save, ChevronRight, ChevronDown, FileText, Settings, History, X, Globe, MapPin, Building2 } from 'lucide-react';

interface AssessmentStandardSettingsProps {
  initialTab?: string;
}

export default function AssessmentStandardSettings({ initialTab = 'items' }: AssessmentStandardSettingsProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [configLevel, setConfigLevel] = useState<'province' | 'city' | 'county'>('province');
  
  // Sync tab if prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    '1': true,
    '1-1': true,
  });

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [itemModalType, setItemModalType] = useState<'category' | 'subitem' | 'point'>('category');
  const [isAddVetoModalOpen, setIsAddVetoModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openAddItemModal = (type: 'category' | 'subitem' | 'point') => {
    setItemModalType(type);
    setIsAddItemModalOpen(true);
  };

  const levels = [
    { id: 'province', name: '省级标准', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'city', name: '市级优化', icon: Building2, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'county', name: '县级自定义', icon: MapPin, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="flex h-full bg-[#F5F5F5] p-3 gap-3 relative font-sans">
      {/* 左侧导航区 */}
      <div className="w-72 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden shrink-0">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
           <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800 text-sm flex items-center gap-2">
              <div className="w-1 h-3 bg-[#419EFF] rounded-full"></div>
              评定标准体系
            </h2>
            <button className="text-[#419EFF] hover:text-blue-700 bg-white p-1 rounded border border-gray-200 shadow-sm transition-all">
              <Plus size={16} />
            </button>
          </div>
          
          <div className="flex flex-col gap-1.5">
            {levels.map((lvl) => {
              const Icon = lvl.icon;
              const isActive = configLevel === lvl.id;
              const accentColor = lvl.id === 'province' ? 'blue' : lvl.id === 'city' ? 'orange' : 'green';
              return (
                <button 
                  key={lvl.id}
                  onClick={() => setConfigLevel(lvl.id as any)}
                  className={`flex items-center justify-between p-2.5 rounded text-xs transition-all border ${isActive ? `bg-${accentColor}-50 ${lvl.color} border-${accentColor}-200 font-bold shadow-sm` : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={14} />
                    <span>{lvl.name}</span>
                  </div>
                  {isActive && <div className={`w-1.5 h-1.5 rounded-full ${lvl.id === 'province' ? 'bg-blue-500' : lvl.id === 'city' ? 'bg-orange-500' : 'bg-green-500'}`}></div>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-3 space-y-4">
          <div>
            <div className="text-[10px] font-bold text-gray-400 px-2 mb-2 uppercase tracking-widest">标准模板库</div>
            <div className="bg-blue-50 text-[#419EFF] rounded px-3 py-2.5 text-sm cursor-pointer border-l-2 border-[#419EFF] flex justify-between items-center shadow-sm">
              <span className="truncate font-medium">娱乐场所治安等级标准</span>
              <span className="text-[9px] bg-white/80 px-1.5 py-0.5 rounded border border-blue-100">V2025</span>
            </div>
            <div className="hover:bg-gray-50 text-gray-600 rounded px-3 py-2.5 text-sm cursor-pointer flex justify-between items-center group transition-colors">
              <span className="truncate group-hover:text-[#419EFF]">特种行业治安评估标准</span>
              <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">V1.2</span>
            </div>
          </div>
          
          <div>
            <div className="text-[10px] font-bold text-gray-400 px-2 mb-2 uppercase tracking-widest">历史归档</div>
            <div className="hover:bg-gray-50 text-gray-500 rounded px-3 py-2 text-xs cursor-pointer flex justify-between items-center transition-colors">
              <span className="truncate">2024年度旧版标准</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        {/* 模板基本信息 */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shadow-sm border ${configLevel === 'province' ? 'bg-blue-100 text-blue-700' : configLevel === 'city' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                  {configLevel === 'province' ? '省级统发' : configLevel === 'city' ? '地市细化' : '县区自定义'}
                </span>
                <h1 className="text-xl font-bold text-gray-800">娱乐服务场所治安管理等级考核评定标准</h1>
                <span className="bg-green-50 text-green-600 text-[10px] px-2 py-0.5 rounded-full border border-green-200 font-bold">运行中</span>
              </div>
              <div className="flex gap-6 items-center">
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center"><Settings size={10} /></div>
                  分值权重： 安全管理(30%) / 经营行为(40%) / 配合执法(30%)
                </div>
                <p className="text-[11px] text-gray-400 italic">最后修订：2025-03-20 14:00 (系统管理员)</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded bg-white hover:bg-gray-50 transition-all flex items-center text-xs font-medium shadow-sm">
                <Copy size={14} className="mr-2" /> 复用省级
              </button>
              <button className="px-4 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-all flex items-center text-xs font-bold shadow-md shadow-blue-100">
                <Save size={14} className="mr-2" /> 保存当前配置
              </button>
            </div>
          </div>
        </div>

        {/* 下部：内容区域 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-6 custom-scrollbar">
            {activeTab === 'items' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                     <span className="text-sm font-bold text-gray-700">评分项设置</span>
                     <span className="text-[10px] text-gray-400">总分值: 1000分</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <button 
                      className="px-3 py-1.5 border border-[#419EFF] text-[#419EFF] rounded hover:bg-blue-50 flex items-center"
                      onClick={() => openAddItemModal('category')}
                    >
                      <Plus size={14} className="mr-1" /> 增加一级指标
                    </button>
                    <button className="px-3 py-1.5 border border-gray-200 text-gray-500 rounded hover:bg-gray-50">展开全部</button>
                  </div>
                </div>
                
                <table className="w-full text-left border-collapse rounded-lg overflow-hidden border border-gray-200">
                  <thead className="bg-[#F8FAFC]">
                    <tr className="text-gray-600 text-xs">
                      <th className="px-5 py-3 font-semibold w-1/3">指标层级与名称</th>
                      <th className="px-5 py-3 font-semibold">评分标准与逻辑</th>
                      <th className="px-5 py-3 font-semibold w-32 text-center">赋值/系数</th>
                      <th className="px-5 py-3 font-semibold w-40 text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-gray-700">
                    {/* 一级 */}
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <td className="px-5 py-3 font-bold flex items-center cursor-pointer hover:text-[#419EFF]" onClick={() => toggleNode('1')}>
                        {expandedNodes['1'] ? <ChevronDown size={16} className="mr-2 text-gray-400" /> : <ChevronRight size={16} className="mr-2 text-gray-400" />}
                        一、安全管理情况
                      </td>
                      <td className="px-5 py-3 text-gray-500 italic">考核内部保卫组织、物防技防建设等核心指标</td>
                      <td className="px-5 py-3 text-center font-bold">300分</td>
                      <td className="px-5 py-3 text-center">
                        <button className="text-[#419EFF] hover:underline mr-3" onClick={() => openAddItemModal('subitem')}>新增细项</button>
                        <button className="text-gray-400 hover:text-gray-600"><Settings size={14} /></button>
                      </td>
                    </tr>
                    
                    {/* 二级 1-1 */}
                    {expandedNodes['1'] && (
                      <tr className="border-b border-gray-50">
                        <td className="px-5 py-3 pl-12 flex items-center cursor-pointer hover:bg-gray-50" onClick={() => toggleNode('1-1')}>
                          {expandedNodes['1-1'] ? <ChevronDown size={14} className="mr-2 text-gray-300" /> : <ChevronRight size={14} className="mr-2 text-gray-300" />}
                          <span className="font-medium">1.1 内部保卫组织</span>
                        </td>
                        <td className="px-5 py-3 text-gray-500">专职保卫人员配备、责任书签订等</td>
                        <td className="px-5 py-3 text-center">100分</td>
                        <td className="px-5 py-3 text-center">
                          <button className="text-[#419EFF] hover:underline text-xs" onClick={() => openAddItemModal('point')}>新增评分点</button>
                        </td>
                      </tr>
                    )}
                    
                    {/* 三级 1-1-1 */}
                    {expandedNodes['1'] && expandedNodes['1-1'] && (
                      <tr className="border-b border-gray-50 bg-white hover:bg-blue-50/30">
                        <td className="px-5 py-3 pl-20 text-gray-600 text-xs">
                          1.1.1 未按要求配备专职保卫人员
                        </td>
                        <td className="px-5 py-3 text-[11px] text-gray-400 leading-relaxed">
                          重点核查: 场所从业人员数量与安保人员比例。标准为50人以上场所不少于3人。
                        </td>
                        <td className="px-5 py-3 text-center text-red-500 font-bold">-20分/人</td>
                        <td className="px-5 py-3 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button className="text-gray-400 hover:text-[#419EFF]"><Edit size={12} /></button>
                            <button className="text-gray-300 hover:text-red-500"><Ban size={12} /></button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg flex items-start gap-3 mt-8">
                  <div className="p-2 bg-orange-100 rounded-full text-orange-600"><History size={16} /></div>
                  <div>
                    <h4 className="text-sm font-bold text-orange-800 mb-1">层级冲突提示</h4>
                    <p className="text-xs text-orange-700 leading-relaxed">
                      当前检测到您在 [市级] 标准中修改了 "1.1.1 评分标准"。此修改将覆盖 [省级] 的原始设定。
                      下属县区在查看标准时，将以您的市级细化标准为准。
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'thresholds' && (
              <div className="max-w-4xl space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gray-700">评定等级阈值配置</h3>
                    <span className="text-[10px] text-gray-400 italic">当前参考: 2025年部颁指导标准</span>
                  </div>
                  <div className="p-6 space-y-6">
                    {[
                      { l: 'AAA级', c: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200', score: 900, rate: 90 },
                      { l: 'AA级', c: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', score: 800, rate: 80 },
                      { l: 'A级', c: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200', score: 650, rate: 70 },
                      { l: 'B级', c: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', score: 0, rate: 0, auto: true },
                    ].map((row, idx) => (
                      <div key={idx} className={`flex items-center gap-6 p-4 rounded-lg border ${row.border} ${row.bg}`}>
                        <div className={`w-20 font-black text-xl ${row.c}`}>{row.l}</div>
                        {!row.auto ? (
                          <>
                             <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-600">综合总分 ≥</span>
                              <input type="number" defaultValue={row.score} className="w-20 border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-[#419EFF] outline-none" />
                            </div>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-600">且 核心项评分率 ≥</span>
                              <input type="number" defaultValue={row.rate} className="w-16 border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-[#419EFF] outline-none" />
                              <span className="text-[10px] text-gray-400">%</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-xs text-gray-500 italic">低于以上所有等级标准，或触发"一票否决"条件时自动生成。</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-red-100 flex items-center gap-2">
                    <Ban size={16} className="text-red-500" />
                    <h3 className="text-sm font-bold text-red-700">一票否决项设置 (直接定级为B)</h3>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="group flex items-center justify-between bg-white p-3 rounded-lg border border-red-50 hover:border-red-200 transition-all">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-800 font-medium">1. 发生较大及以上安全生产责任事故的</span>
                        <span className="text-[10px] text-gray-400">设定层级: [省级强制] 禁止地市级覆盖</span>
                      </div>
                      <X size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-red-500" />
                    </div>
                    <div className="group flex items-center justify-between bg-white p-3 rounded-lg border border-red-50 hover:border-red-200 transition-all">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-800 font-medium">2. 存在重大涉黑涉恶违法犯罪行为被查处的</span>
                        <span className="text-[10px] text-gray-400">设定层级: [省级强制]</span>
                      </div>
                      <X size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-red-500" />
                    </div>
                    <div className="mt-2 pl-1">
                      <button 
                        className="text-[#419EFF] hover:underline text-xs flex items-center"
                        onClick={() => setIsAddVetoModalOpen(true)}
                      >
                        <Plus size={14} className="mr-1" /> 新增自定义一票否决逻辑
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider border-b border-gray-200">
                      <th className="px-6 py-4">发布版本</th>
                      <th className="px-6 py-4">操作层级</th>
                      <th className="px-6 py-4">应用范围</th>
                      <th className="px-6 py-4">生效日期</th>
                      <th className="px-6 py-4">变动内容</th>
                      <th className="px-6 py-4 text-center">状态</th>
                      <th className="px-6 py-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-gray-600">
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-bold text-gray-800">V2025-03-A</td>
                      <td className="px-6 py-4"><span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px]">省级</span></td>
                      <td className="px-6 py-4">全省娱乐场所</td>
                      <td className="px-6 py-4 font-mono">2025-01-01</td>
                      <td className="px-6 py-4 text-gray-400 truncate max-w-[150px]">年度常规调整分值权重</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-50 text-green-700 text-[10px] font-bold ring-1 ring-inset ring-green-600/20">
                          <div className="w-1 h-1 rounded-full bg-green-600"></div>
                          当前执行
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[#419EFF] font-bold hover:underline">对比</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 添加考核项目模态框 */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-xl w-[550px] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/80">
              <div className="flex items-center gap-2">
                 <div className="p-1.5 bg-[#419EFF] text-white rounded-lg"><Plus size={18} /></div>
                 <h3 className="text-base font-bold text-gray-800">
                    {itemModalType === 'category' ? '配置一级指标' : itemModalType === 'subitem' ? '配置二级细项' : '配置三级评分点'}
                 </h3>
              </div>
              <button onClick={() => setIsAddItemModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">项目名称</label>
                <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#419EFF] focus:border-[#419EFF] transition-all" placeholder="请输入明确的指标名称" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">考评要求与依据说明</label>
                <textarea rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#419EFF] focus:border-[#419EFF] transition-all resize-none" placeholder="请详细描述此项指标的评估方式、所需佐证材料、扣分逻辑等..."></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">评分权重/分值</label>
                    <div className="relative">
                       <input type="number" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#419EFF]" placeholder="0" />
                       <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300">POINTS</span>
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">强制合规项</label>
                    <div className="flex h-11 items-center px-4 border border-gray-200 rounded-lg gap-3">
                       <input type="checkbox" className="rounded text-[#419EFF]" />
                       <span className="text-xs text-gray-600">如果不合规直接触发B级</span>
                    </div>
                 </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50/80">
              <button onClick={() => setIsAddItemModalOpen(false)} className="px-6 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors">取消</button>
              <button onClick={() => setIsAddItemModalOpen(false)} className="px-8 py-2.5 bg-[#419EFF] text-white rounded-lg text-xs font-bold hover:bg-blue-600 shadow-md shadow-blue-200 transition-all">保存配置</button>
            </div>
          </div>
        </div>
      )}

      {/* 添加一票否决条件视图器 (逻辑同上) */}
      {isAddVetoModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
           <div className="bg-white rounded-xl w-[500px] flex flex-col shadow-2xl animate-in zoom-in duration-200">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-red-50/30">
                 <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-red-500 text-white rounded-lg"><Ban size={18} /></div>
                    <h3 className="text-base font-bold text-red-800">定义一票否决红线</h3>
                 </div>
                 <button onClick={() => setIsAddVetoModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="p-6">
                 <label className="block text-[11px] font-black text-gray-400 mb-2 uppercase tracking-widest">红线情况描述</label>
                 <textarea rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all resize-none shadow-inner" placeholder="请描述触发直接降级的关键违规行为..."></textarea>
                 <p className="mt-3 text-[10px] text-red-400 bg-red-50 p-2 rounded leading-relaxed border border-red-100">
                    * 触发此条件的场所一旦经系统或核查核实，其治安评级将无法获得A级及以上，并直接降为B级(不合格)。
                 </p>
              </div>
              <div className="flex justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50/50">
                <button onClick={() => setIsAddVetoModalOpen(false)} className="px-6 py-2.5 text-xs font-bold text-gray-400">取消</button>
                <button onClick={() => setIsAddVetoModalOpen(false)} className="px-8 py-2.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 shadow-lg shadow-red-200">确认并写入标准</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
