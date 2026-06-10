import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Plus, ChevronDown, Eye, Edit, Trash2, Landmark, Users, ShieldAlert, Calendar, FileText, Save, ArrowLeft, ArrowUpRight, BadgeAlert } from 'lucide-react';
import { api } from '../api';
import { PersonnelPunishment } from '../services/personnelPunishmentService';
import { Enterprise, Personnel } from '../types';

interface PunishmentListProps {
  onAdd: () => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  data: PersonnelPunishment[];
  loading: boolean;
  onDelete: (id: string) => void;
}

function PunishmentList({ onAdd, onView, onEdit, data, loading, onDelete }: PunishmentListProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Search parameters for "一行三列" default, others inside collapsed panel
  const [searchName, setSearchName] = useState('');
  const [searchUnit, setSearchUnit] = useState('');
  const [searchCaseNo, setSearchCaseNo] = useState('');
  const [searchCaseName, setSearchCaseName] = useState('');
  const [searchOrgUnit, setSearchOrgUnit] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchIdCard, setSearchIdCard] = useState('');
  const [searchPhone, setSearchPhone] = useState('');

  const handleReset = () => {
    setSearchName('');
    setSearchUnit('');
    setSearchCaseNo('');
    setSearchCaseName('');
    setSearchOrgUnit('');
    setSearchDate('');
    setSearchIdCard('');
    setSearchPhone('');
  };

  const filteredData = data.filter(item => {
    if (searchName && !item.name?.toLowerCase().includes(searchName.toLowerCase())) return false;
    if (searchUnit && !item.unit?.toLowerCase().includes(searchUnit.toLowerCase())) return false;
    if (searchCaseNo && !item.caseNo?.toLowerCase().includes(searchCaseNo.toLowerCase())) return false;
    if (searchCaseName && !item.caseName?.toLowerCase().includes(searchCaseName.toLowerCase())) return false;
    if (searchOrgUnit && !item.orgUnit?.toLowerCase().includes(searchOrgUnit.toLowerCase())) return false;
    if (searchDate && !item.date?.includes(searchDate)) return false;
    if (searchIdCard && !item.idCard?.toLowerCase().includes(searchIdCard.toLowerCase())) return false;
    if (searchPhone && !item.phone?.includes(searchPhone)) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#F5F5F3]">
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-white rounded-lg shadow-xs border border-gray-200 flex flex-col min-h-full">
          
          {/* 查询栏位：平均分布一行三列 */}
          <div className="p-5 border-b border-gray-150 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 align-left text-left">从业人员名称</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-gray-400">
                    <Users size={13} />
                  </span>
                  <input 
                    type="text" 
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                    className="w-full h-8.5 pl-8 pr-2.5 text-xs text-gray-800 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white shadow-xs" 
                    placeholder="搜寻被处罚人姓名" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 align-left text-left">所属场所名称</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-gray-400">
                    <Landmark size={13} />
                  </span>
                  <input 
                    type="text" 
                    value={searchUnit}
                    onChange={e => setSearchUnit(e.target.value)}
                    className="w-full h-8.5 pl-8 pr-2.5 text-xs text-gray-800 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white shadow-xs" 
                    placeholder="所属企业实体或场所" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 align-left text-left">案件编号</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-gray-400">
                    <FileText size={13} />
                  </span>
                  <input 
                    type="text" 
                    value={searchCaseNo}
                    onChange={e => setSearchCaseNo(e.target.value)}
                    className="w-full h-8.5 pl-8 pr-2.5 text-xs text-gray-800 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white shadow-xs" 
                    placeholder="关联案事件立案编号" 
                  />
                </div>
              </div>
            </div>

            {/* 可展开多余栏位 */}
            {isSearchExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 transition-all">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 text-left">案件名称</label>
                  <input 
                    type="text" 
                    value={searchCaseName}
                    onChange={e => setSearchCaseName(e.target.value)}
                    className="w-full h-8.5 px-3 text-xs text-gray-800 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white shadow-xs" 
                    placeholder="案由诉讼案名称" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 text-left">管辖单位</label>
                  <input 
                    type="text" 
                    value={searchOrgUnit}
                    onChange={e => setSearchOrgUnit(e.target.value)}
                    className="w-full h-8.5 px-3 text-xs text-gray-800 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white shadow-xs" 
                    placeholder="立案派出所或监管分局" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 text-left">案发时间</label>
                  <input 
                    type="date" 
                    value={searchDate}
                    onChange={e => setSearchDate(e.target.value)}
                    className="w-full h-8.5 px-3 text-xs text-gray-800 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white shadow-xs" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 text-left">身份证号码</label>
                  <input 
                    type="text" 
                    value={searchIdCard}
                    onChange={e => setSearchIdCard(e.target.value)}
                    className="w-full h-8.5 px-3 text-xs text-gray-800 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white font-mono shadow-xs" 
                    placeholder="18位被查当事人身份证" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 text-left">联系电话</label>
                  <input 
                    type="text" 
                    value={searchPhone}
                    onChange={e => setSearchPhone(e.target.value)}
                    className="w-full h-8.5 px-3 text-xs text-gray-800 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white font-mono shadow-xs" 
                    placeholder="被查当事人移动电话" 
                  />
                </div>
                <div className="hidden md:block"></div>
              </div>
            )}

            {/* 操作控制按钮 */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-150">
              <button 
                type="button"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="text-xs text-[#419EFF] hover:text-blue-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>{isSearchExpanded ? '折叠高级检索' : '展开多余栏位筛选'}</span>
                <ChevronDown size={14} className={`transform transition-transform ${isSearchExpanded ? 'rotate-180' : ''}`} />
              </button>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleReset}
                  className="h-8 px-4 bg-white border border-gray-300 text-gray-700 rounded hover:bg-slate-50 transition-colors flex items-center text-xs font-bold cursor-pointer"
                >
                  <RotateCcw size={13} className="mr-1.5" /> 重置条件
                </button>
                <button 
                  className="h-8 px-4 bg-[#419EFF] hover:bg-blue-600 text-white rounded transition-colors flex items-center text-xs font-bold cursor-pointer shadow-sm"
                >
                  <Search size={13} className="mr-1.5" /> 立即检索
                </button>
              </div>
            </div>
          </div>

          {/* 抬头与添加 */}
          <div className="px-5 py-3.5 flex justify-between items-center bg-gray-50 border-b border-gray-100 shrink-0">
            <h4 className="text-xs font-bold text-gray-700">
              在档惩戒记录 (总计 <span className="text-[#419EFF] font-mono">{filteredData.length}</span> 条处罚档案)
            </h4>
            <button 
              onClick={onAdd} 
              className="h-8 px-4 bg-[#419EFF] hover:bg-blue-600 text-white rounded transition-all flex items-center text-xs font-bold shadow-sm cursor-pointer"
            >
              <Plus size={14} className="mr-1.5" /> 从业员处罚极速登记
            </button>
          </div>

          {/* 列表表格：严格体现 列表表头：从业人员名称、身份证号码、性别、联系电话、所属场所名称、案件编号、案件名称、管辖单位、案发时间 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-[11px] text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-100 text-gray-700 font-bold border-b border-gray-200">
                  <th className="px-4 py-3">从业人员名称</th>
                  <th className="px-4 py-3">身份证号码</th>
                  <th className="px-4 py-3 text-center">性别</th>
                  <th className="px-4 py-3">联系电话</th>
                  <th className="px-4 py-3">所属场所名称</th>
                  <th className="px-4 py-3">案件编号</th>
                  <th className="px-4 py-3 font-semibold text-gray-800">案件名称</th>
                  <th className="px-4 py-3">管辖单位</th>
                  <th className="px-4 py-3">案发时间</th>
                  <th className="px-4 py-3 text-center">处罚类型</th>
                  <th className="px-4 py-3 text-center">状态</th>
                  <th className="px-4 py-3 text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {loading ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-12 text-center text-gray-400 font-sans font-medium">
                      正在加载系统在档罚惩处罚档案库...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-12 text-center text-gray-400 font-sans font-medium">
                      没有找到匹配该条件的在册从业人员被处罚档案记录。
                    </td>
                  </tr>
                ) : filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-blue-50/30 transition-colors font-sans">
                    <td className="px-4 py-2.5 font-bold text-gray-850 flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                        {row.name ? row.name.slice(0, 1) : '👤'}
                      </div>
                      <span>{row.name}</span>
                    </td>
                    <td className="px-4 py-2.5 font-mono">{row.idCard || '3501021990********'}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`px-1 py-0.2 rounded text-[10px] ${row.gender === '女' ? 'bg-pink-50 text-pink-700' : 'bg-slate-100 text-gray-700'}`}>
                        {row.gender || '男'}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-gray-500">{row.phone || '138****0001'}</td>
                    <td className="px-4 py-2.5 font-semibold text-gray-800 max-w-[150px] truncate" title={row.unit}>{row.unit}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-blue-800 bg-blue-50/50 rounded">{row.caseNo || 'AJ2026******'}</td>
                    <td className="px-4 py-2.5 font-medium max-w-[160px] truncate" title={row.caseName}>{row.caseName}</td>
                    <td className="px-4 py-2.5 text-gray-500">{row.orgUnit || '鼓楼派出所'}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{row.date}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className="px-1.5 py-0.5 bg-orange-50 text-orange-700 border border-orange-100 rounded text-[10px] font-bold">
                        {row.type || '治安罚款'}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                        row.status === '已处理' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className={`px-4 py-2 text-center sticky right-0 bg-white ${openDropdown === row.id ? 'z-50' : 'z-10'}`}>
                      <div className="flex items-center justify-center space-x-2 text-[#419EFF]">
                        <button 
                          onClick={() => onView(row.id)} 
                          className="hover:text-blue-800 font-bold cursor-pointer"
                        >
                          详情
                        </button>
                        <button 
                          onClick={() => onEdit(row.id)} 
                          className="hover:text-blue-800 font-bold cursor-pointer"
                        >
                          修改
                        </button>
                        
                        <div className="relative">
                          <button 
                            className="hover:text-gray-700 p-1 rounded hover:bg-slate-100 cursor-pointer"
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setOpenDropdown(openDropdown === row.id ? null : row.id); 
                            }}
                          >
                            <ChevronDown size={12} />
                          </button>
                          
                          {openDropdown === row.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}></div>
                              <div className="absolute right-0 mt-1 w-24 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 overflow-hidden text-left">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); onDelete(row.id); setOpenDropdown(null); }}
                                  className="w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 flex items-center transition-colors font-semibold"
                                >
                                  删除档案
                                </button>
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

        </div>
      </div>
    </div>
  );
}

// 详情视窗：对应补充设计
interface DetailViewProps {
  id: string;
  onBack: () => void;
}

function PunishmentDetail({ id, onBack }: DetailViewProps) {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<PersonnelPunishment | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const item = await api.personnelPunishment.getById(id);
        if (item) setDetail(item);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading || !detail) {
    return (
      <div className="p-8 text-center text-xs text-gray-500 bg-[#F5F5F3] h-full flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
        <span>正在读取从业人员被处罚案事件档案详情...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F5F3]">
      <div className="px-6 py-4.5 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-1.5 hover:bg-slate-100 rounded-full text-gray-500 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <span>从业人员违法处罚信息档案档案</span>
              <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded-full border border-red-100 font-bold font-mono">
                ID: {detail.id}
              </span>
            </h2>
            <p className="text-[10px] text-gray-400 mt-0.5">隶属于在册场所从业人员违规行为综合惩治库</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded text-xs font-semibold hover:bg-slate-50 transition-all cursor-pointer"
        >
          返回列表
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 左侧：当事人基本档案卡 */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5 shadow-xs">
            <div className="text-center pb-4 border-b border-gray-150">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold border border-blue-100 shadow-inner">
                {detail.name ? detail.name.slice(0, 1) : 'UI'}
              </div>
              <h3 className="text-sm font-bold text-gray-800 mt-2.5">{detail.name}</h3>
              <p className="text-[10px] bg-[#f4f7fc] border border-blue-50 text-blue-700 py-0.5 px-2 rounded-full inline-block mt-1.5 font-bold">
                {detail.gender || '男'} | 被惩个人档案
              </p>
            </div>

            <div className="space-y-3.5 text-xs text-left">
              <div className="border-b border-gray-100 pb-2">
                <span className="text-gray-400 block text-[10px]">当事人身份证</span>
                <span className="text-gray-800 font-mono font-bold text-xs mt-0.5 block">{detail.idCard || '350102199002158822'}</span>
              </div>
              <div className="border-b border-gray-100 pb-2">
                <span className="text-gray-400 block text-[10px]">联系手机</span>
                <span className="text-gray-800 font-mono font-semibold text-xs mt-0.5 block">{detail.phone || '13988889922'}</span>
              </div>
              <div className="pb-1">
                <span className="text-gray-400 block text-[10px]">关联执业机构</span>
                <span className="text-gray-800 font-bold block mt-0.5 leading-relaxed text-xs">{detail.unit}</span>
              </div>
            </div>
          </div>

          {/* 右侧：案事件以及惩戒详情 */}
          <div className="md:col-span-2 space-y-6 text-left">
            
            {/* 案事件基本指标 */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
              <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5 pb-3 border-b border-gray-150">
                <span className="w-1.5 h-3.5 bg-[#419EFF] rounded-full"></span>
                <span>案件以及监管归属关联指标</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 pt-4 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px]">立案治安编码</span>
                  <span className="text-gray-800 font-mono font-bold mt-1 block h-7 flex items-center bg-slate-50 px-2 rounded border border-gray-150">
                    {detail.caseNo || 'AJ20230515502'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">关联涉案由名称</span>
                  <span className="text-gray-800 font-bold mt-1 block h-7 flex items-center bg-slate-50 px-2 rounded border border-gray-150 truncate" title={detail.caseName}>
                    {detail.caseName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">立侦管辖机关</span>
                  <span className="text-gray-800 font-medium mt-1 block h-7 flex items-center bg-slate-50 px-2 rounded border border-gray-150">
                    {detail.orgUnit || '福州市公安局鼓楼分局'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">查处/通报时间</span>
                  <span className="text-gray-800 font-mono mt-1 block h-7 flex items-center bg-slate-50 px-2 rounded border border-gray-150">
                    {detail.date}
                  </span>
                </div>
              </div>
            </div>

            {/* 惩处详情决定 */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
              <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5 pb-3 border-b border-gray-150">
                <span className="w-1.5 h-3.5 bg-red-400 rounded-full"></span>
                <span>行政处罚行为裁量决定书及处理结果</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 pt-4 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px]">执行惩戒措施种类</span>
                  <span className="text-red-700 font-bold mt-1.5 block">
                    <span className="px-2.5 py-1 bg-red-50 border border-red-200 rounded text-xs">
                      {detail.type || '行政停业整顿'}
                    </span>
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">执行罚没金额</span>
                  <span className="text-gray-850 font-bold font-mono text-sm mt-1.5 block">
                    ¥{detail.amount || '0'} 元
                  </span>
                </div>
                
                <div className="sm:col-span-2">
                  <span className="text-gray-400 block text-[10px]">简要违规违法事实叙述</span>
                  <p className="text-gray-700 mt-2 p-3 bg-red-50/20 border border-red-50 rounded-lg text-xs leading-relaxed">
                    在执警联合日常消防及特种维修行业抽检中，发现从业人员 {detail.name} 存在违反特业实名登记上传规定的事实。属于日常高危督理行为。
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-gray-400 block text-[10px]">惩治整改决定与后续报告要求</span>
                  <p className="text-gray-700 mt-2 p-3 bg-emerald-50/10 border border-emerald-50 rounded-lg text-xs leading-relaxed">
                    责令其服务场所限期三日内完成制度补习培训，罚没对应罚款并将收据存档，并对从业员记录做出在案通报处罚。
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

// 增改表单
interface PunishmentFormProps {
  id?: string | null;
  onCancel: () => void;
  onSave: (data: Partial<PersonnelPunishment>) => void;
}

function PunishmentForm({ id, onCancel, onSave }: PunishmentFormProps) {
  const [formData, setFormData] = useState<Partial<PersonnelPunishment>>({
    name: '',
    unit: '',
    date: new Date().toISOString().substring(0, 10),
    caseName: '',
    type: '罚款',
    amount: '500',
    status: '处理中',
    idCard: '',
    gender: '男',
    phone: '',
    caseNo: '',
    orgUnit: ''
  });

  // Modal selector triggers
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [personnelList, setPersonnelList] = useState<Personnel[]>([]);
  const [showEntSel, setShowEntSel] = useState(false);
  const [showPerSel, setShowPerSel] = useState(false);
  const [qEnt, setQEnt] = useState('');
  const [qPer, setQPer] = useState('');

  // Auto load selector options
  useEffect(() => {
    const loadOpts = async () => {
      try {
        const ents = await api.enterprise.getAll();
        setEnterprises(ents || []);

        const pers = await api.personnel.getAll();
        setPersonnelList(pers || []);

        if (id) {
          const detail = await api.personnelPunishment.getById(id);
          if (detail) {
            setFormData(detail);
          }
        } else {
          // Generate an incident case number fallback
          const rand = Math.floor(1000 + Math.random() * 9000);
          const activeDate = new Date().toISOString().substring(0, 10).replace(/-/g, '');
          setFormData(prev => ({
            ...prev,
            caseNo: `AJ${activeDate}${rand}`
          }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadOpts();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert('请输入被处罚人姓名或通过上方弹窗检索引用');
      return;
    }
    if (!formData.unit) {
      alert('请指定其执业主场所');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F3]">
      <div className="px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center shrink-0">
        <h2 className="text-sm font-bold text-gray-800 border-l-4 border-[#419EFF] pl-2.5">
          {id ? '修改从业人员违规惩戒档案' : '从业人员违规处罚信息手工补登记'}
        </h2>
        <button 
          onClick={onCancel} 
          className="px-4 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
        >
          返回列表
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-left">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-5">
          
          <div className="border-b border-gray-150 pb-2 flex items-center gap-1">
            <span className="w-1 h-3 bg-[#419EFF] rounded-full"></span>
            <span className="font-bold text-gray-700">当事人执业背景参数</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 选择当事人 */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">
                <span className="text-red-500 mr-0.5 font-bold">*</span>
                被处罚人姓名
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={formData.name || ''}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                  placeholder="可人工输写或点击右侧弹窗按钮引用"
                />
                <button
                  type="button"
                  onClick={() => {
                    setQPer('');
                    setShowPerSel(true);
                  }}
                  className="px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded text-[11px] font-bold cursor-pointer shrink-0 transition-colors"
                >
                  弹窗检索
                </button>
              </div>
            </div>

            {/* 选择执业工作单位/场所 */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">
                <span className="text-red-500 mr-0.5 font-bold">*</span>
                执业工作场所企业
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={formData.unit || ''}
                  onChange={e => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                  placeholder="指定其违法的实体或场所"
                />
                <button
                  type="button"
                  onClick={() => {
                    setQEnt('');
                    setShowEntSel(true);
                  }}
                  className="px-3 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded text-[11px] font-bold cursor-pointer shrink-0 transition-colors"
                >
                  弹窗关联
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">性别</label>
              <select
                value={formData.gender || '男'}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                className="w-full h-8.5 px-2 border border-gray-300 rounded bg-white"
              >
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">当事人移动电话</label>
              <input 
                type="text" 
                value={formData.phone || ''}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-8.5 px-3 border border-gray-300 rounded font-mono"
                placeholder="移动电话手机号"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">18位身份证号</label>
              <input 
                type="text" 
                value={formData.idCard || ''}
                onChange={e => setFormData({ ...formData, idCard: e.target.value })}
                className="w-full h-8.5 px-3 border border-gray-300 rounded font-mono"
                placeholder="请输入身份证号/证件号"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">管辖/立卷治安派出所</label>
              <input 
                type="text" 
                value={formData.orgUnit || ''}
                onChange={e => setFormData({ ...formData, orgUnit: e.target.value })}
                className="w-full h-8.5 px-3 border border-gray-300 rounded"
                placeholder="例如: 鼓楼派出所"
              />
            </div>
          </div>

          <div className="border-b border-gray-150 pb-2 flex items-center gap-1 pt-3">
            <span className="w-1 h-3 bg-red-400 rounded-full"></span>
            <span className="font-bold text-gray-700">案事件及惩处裁量决定参数</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">关联案件编号</label>
              <input 
                type="text" 
                value={formData.caseNo || ''}
                onChange={e => setFormData({ ...formData, caseNo: e.target.value })}
                className="w-full h-8.5 px-3 border border-gray-300 rounded font-mono focus:border-red-400"
                placeholder="例如: AJ20230515502"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">违法/涉案由名称</label>
              <input 
                type="text" 
                value={formData.caseName || ''}
                onChange={e => setFormData({ ...formData, caseName: e.target.value })}
                className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-red-400"
                placeholder="如聚众斗殴、未按规定实名登记"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">惩处处罚裁量种类</label>
              <select
                value={formData.type || '罚款'}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full h-8.5 px-2 border border-gray-300 rounded bg-white font-semibold text-gray-700"
              >
                <option value="罚款">罚款</option>
                <option value="警告">警告</option>
                <option value="停业整顿">停业整顿</option>
                <option value="取消入场备案">取消入场备案</option>
                <option value="停发治安许可">停发治安许可</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">罚款金额 (元)</label>
              <input 
                type="number" 
                value={formData.amount || ''}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                className="w-full h-8.5 px-3 border border-gray-300 rounded font-mono"
                placeholder="违规执行扣缴金额"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">案发/查处时间</label>
              <input 
                type="date" 
                value={formData.date || ''}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full h-8.5 px-3 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">处罚执行情况状态</label>
              <select
                value={formData.status || '处理中'}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full h-8.5 px-2 border border-gray-300 rounded bg-white text-xs font-bold"
              >
                <option value="处理中">处理中</option>
                <option value="已处理">已处理</option>
                <option value="已结案解脱">已结案解脱</option>
              </select>
            </div>
          </div>

          {/* 补充栏位：简要案情事实 */}
          <div className="pt-3">
            <label className="block text-xs font-bold text-gray-600 mb-1.5">简要事实描述说明</label>
            <textarea
              className="w-full p-3 border border-gray-300 bg-white rounded-lg text-xs"
              rows={4}
              placeholder="请输入简述，例如：该从业员多次在未核验人员身份的前提下，擅自进行特定车辆配件更换组装，治安意识极其淡薄。"
            ></textarea>
          </div>

        </div>

        {/* 底部悬浮控制栏垫片 */}
        <div className="h-16 shrink-0"></div>

        {/* 弹窗一：选择从业人员在册数据库 */}
        {showPerSel && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white w-full max-w-md rounded-xl shadow-2xl flex flex-col max-h-[70vh] overflow-hidden">
              <div className="px-4 py-3 bg-blue-50 border-b border-gray-150 flex items-center justify-between">
                <span className="font-bold text-gray-800 text-xs">挑选在册在岗从业名录信息</span>
                <button type="button" onClick={() => setShowPerSel(false)} className="text-gray-400 hover:text-gray-600 font-bold text-base">×</button>
              </div>
              <div className="p-3 bg-slate-50 border-b border-gray-100 flex items-center gap-1.5">
                <Search size={12} className="text-gray-400" />
                <input 
                  type="text" 
                  value={qPer}
                  onChange={e => setQPer(e.target.value)}
                  placeholder="输入从业人员姓名/身份证/岗位过滤..."
                  className="w-full bg-transparent border-none outline-none text-xs"
                />
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {personnelList.filter(p => !qPer || p.name.includes(qPer) || p.idCard.includes(qPer)).map(p => (
                  <div 
                    key={p.id}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        name: p.name,
                        gender: p.gender || '男',
                        idCard: p.idCard,
                        phone: p.phone,
                        unit: p.enterpriseName || prev.unit
                      }));
                      setShowPerSel(false);
                    }}
                    className="p-2.5 rounded hover:bg-blue-50 cursor-pointer text-xs border border-transparent hover:border-blue-200 transition-all flex items-center justify-between"
                  >
                    <div className="text-left">
                      <p className="font-bold text-gray-800">{p.name} ({p.gender})</p>
                      <p className="text-[10px] text-gray-400 font-mono">证号: {p.idCard}</p>
                    </div>
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">引用此人</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 弹窗二：选择在档营业企业场所数据库 */}
        {showEntSel && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white w-full max-w-md rounded-xl shadow-2xl flex flex-col max-h-[70vh] overflow-hidden">
              <div className="px-4 py-3 bg-orange-50 border-b border-gray-150 flex items-center justify-between">
                <span className="font-bold text-gray-800 text-xs">引用选择在册企业营业部</span>
                <button type="button" onClick={() => setShowEntSel(false)} className="text-gray-400 hover:text-gray-600 font-bold text-base">×</button>
              </div>
              <div className="p-3 bg-slate-50 border-b border-gray-100 flex items-center gap-1.5">
                <Search size={12} className="text-gray-400" />
                <input 
                  type="text" 
                  value={qEnt}
                  onChange={e => setQEnt(e.target.value)}
                  placeholder="过滤企业网点场所名称..."
                  className="w-full bg-transparent border-none outline-none text-xs"
                />
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {enterprises.filter(e => !qEnt || e.name.includes(qEnt)).map(e => (
                  <div 
                    key={e.id}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        unit: e.name
                      }));
                      setShowEntSel(false);
                    }}
                    className="p-2.5 rounded hover:bg-orange-50/50 cursor-pointer text-xs border border-transparent hover:border-orange-100 transition-all flex items-center justify-between"
                  >
                    <div className="text-left truncate flex-1 pr-4">
                      <p className="font-bold text-gray-800 truncate">{e.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono truncate">社会代码: {e.uscc}</p>
                    </div>
                    <span className="text-[10px] bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded-full font-bold cursor-pointer shrink-0">点击绑定</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 底部固定动作栏 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4.5 flex items-center justify-end shadow-[0_-3px_8px_rgba(0,0,0,0.05)] z-20">
          <div className="flex space-x-2.5">
            <button 
              type="button" 
              onClick={onCancel} 
              className="px-5 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-slate-50 rounded text-xs font-bold transition-all cursor-pointer"
            >
              取消并作废
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-[#419EFF] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Save size={14} />
              <span>保存惩治处罚数据</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}

export default function PersonnelPunishmentManagement() {
  const [view, setView] = useState<'list' | 'add' | 'edit' | 'detail'>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [data, setData] = useState<PersonnelPunishment[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamic fetcher
  const loadData = async () => {
    setLoading(true);
    try {
      const records = await api.personnelPunishment.getAll();
      setData(records);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [view]);

  const handleDelete = async (id: string) => {
    if (window.confirm('您确定要永久退档并删除该从业人员处罚处罚记录吗？')) {
      try {
        const ok = await api.personnelPunishment.delete(id);
        if (ok) {
          setData(prev => prev.filter(p => p.id !== id));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSave = async (record: Partial<PersonnelPunishment>) => {
    try {
      await api.personnelPunishment.save(record);
      setView('list');
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-full w-full">
      {view === 'list' && (
        <PunishmentList 
          onAdd={() => setView('add')} 
          onView={(id) => { setSelectedId(id); setView('detail'); }} 
          onEdit={(id) => { setSelectedId(id); setView('edit'); }}
          data={data}
          loading={loading}
          onDelete={handleDelete}
        />
      )}
      {view === 'add' && (
        <PunishmentForm id={null} onCancel={() => setView('list')} onSave={handleSave} />
      )}
      {view === 'edit' && (
        <PunishmentForm id={selectedId} onCancel={() => setView('list')} onSave={handleSave} />
      )}
      {view === 'detail' && selectedId && (
        <PunishmentDetail id={selectedId} onBack={() => setView('list')} />
      )}
    </div>
  );
}
