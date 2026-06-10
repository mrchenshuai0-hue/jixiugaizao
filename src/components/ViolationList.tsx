import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Plus, Download, Eye, Edit, ChevronDown, ChevronUp, X, Check, Trash2, Key, Link, ShieldAlert } from 'lucide-react';
import { api } from '../api';
import { Case, Enterprise } from '../types';

interface ViolationListProps {
  onAdd: () => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function ViolationList({ onAdd, onView, onEdit }: ViolationListProps) {
  const [data, setData] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // ---- 查询栏位 States (同列表表头) ----
  const [filterCaseRegion, setFilterCaseRegion] = useState('');
  const [filterCaseNo, setFilterCaseNo] = useState('');
  const [filterCaseName, setFilterCaseName] = useState('');
  const [filterCaseTime, setFilterCaseTime] = useState('');
  const [filterCaseLocation, setFilterCaseLocation] = useState('');
  const [filterCaseCategory, setFilterCaseCategory] = useState('all');
  const [filterCaseSource, setFilterCaseSource] = useState('all');
  const [filterCaseAssoc, setFilterCaseAssoc] = useState('all');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); // 查询展示展开/收起

  // ---- 关联功能 States 与多选配置 ----
  const [showAssociateModal, setShowAssociateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{
    title: string;
    message: string;
    confirmText: string;
    type: 'danger' | 'warning' | 'info';
    onConfirm: () => Promise<void>;
  } | null>(null);

  const [selectedCaseForAssoc, setSelectedCaseForAssoc] = useState<Case | null>(null);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [loadingEnterprises, setLoadingEnterprises] = useState(false);

  // 关联弹窗中的企业检索
  const [searchEntName, setSearchEntName] = useState('');
  const [searchEntCategory, setSearchEntCategory] = useState('all');
  const [searchEntStatus, setSearchEntStatus] = useState('all');

  // 当前案事件选定中的企业多选 IDs List
  const [chosenEntIds, setChosenEntIds] = useState<string[]>([]);
  
  // 保留操作凭单历史存档 (审核单位、警员)
  const [operatorUnit, setOperatorUnit] = useState('福州市鼓楼区公安分局治安大队');
  const [operatorName, setOperatorName] = useState('高警官 (警号 35010214)');

  // 弹框中企业列表的内部分页参数 (1页5行)
  const [entPage, setEntPage] = useState(1);
  const entItemsPerPage = 5;

  // 刷新与拉取列表数据
  const fetchData = async () => {
    setLoading(true);
    try {
      const [caseList, enterpriseList] = await Promise.all([
        api.case.getAll(),
        api.enterprise.getAll()
      ]);
      setEnterprises(enterpriseList);
      setData(caseList);
    } catch (error) {
      console.error('Failed to load violation cases:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 重置主查询条件
  const handleResetFilters = () => {
    setFilterCaseRegion('');
    setFilterCaseNo('');
    setFilterCaseName('');
    setFilterCaseTime('');
    setFilterCaseLocation('');
    setFilterCaseCategory('all');
    setFilterCaseSource('all');
    setFilterCaseAssoc('all');
  };

  // 过滤案件数据 (按列表表头查询条件)
  const filteredCases = data.filter(item => {
    // 0. 发案所属区划
    const caseRegionText = item.caseRegion || '';
    if (filterCaseRegion && !caseRegionText.toLowerCase().includes(filterCaseRegion.toLowerCase())) {
      return false;
    }
    // 1. 案件编号
    const caseNoText = item.caseNo || item.id || '';
    if (filterCaseNo && !caseNoText.toLowerCase().includes(filterCaseNo.toLowerCase())) {
      return false;
    }
    // 2. 案件名称
    const caseNameText = item.caseName || item.title || '';
    if (filterCaseName && !caseNameText.toLowerCase().includes(filterCaseName.toLowerCase())) {
      return false;
    }
    // 3. 案发时间
    const caseTimeText = item.caseStartTime || item.date || '';
    if (filterCaseTime && !caseTimeText.includes(filterCaseTime)) {
      return false;
    }
    // 4. 发案地详细地址
    const caseLocText = item.crimeSceneAddress || item.company || '';
    if (filterCaseLocation && !caseLocText.toLowerCase().includes(filterCaseLocation.toLowerCase())) {
      return false;
    }
    // 5. 案件类别
    const catVal = item.caseCategory || item.type || '';
    if (filterCaseCategory !== 'all' && catVal !== filterCaseCategory) {
      return false;
    }
    // 6. 案件来源
    const sourceVal = item.caseSource || '执法办案系统';
    if (filterCaseSource !== 'all' && sourceVal !== filterCaseSource) {
      return false;
    }
    // 7. 是否关联问题场所
    const assocVal = item.isProblemPlaceAssociated || '未关联';
    if (filterCaseAssoc !== 'all' && assocVal !== filterCaseAssoc) {
      return false;
    }
    return true;
  });

  // 标记为不关联问题场所
  const handleSetUnassociatedAction = async (caseId: string) => {
    const caseItem = data.find(c => c.id === caseId);
    if (!caseItem) return;

    try {
      setLoading(true);
      await api.case.save({
        ...caseItem,
        isProblemPlaceAssociated: '不关联',
        associatedPlaceName: '',
        associatedEnterpriseIds: [],
        // 增加一条操作日志
        problemPlaceRecords: [
          {
            id: Math.random().toString(36).substring(2, 9),
            unit: operatorUnit,
            operator: operatorName,
            time: new Date().toISOString().replace('T', ' ').substring(0, 19),
            status: '不关联',
            placeName: '（执行不关联操作）'
          },
          ...(caseItem.problemPlaceRecords || [])
        ]
      });
      await fetchData();
    } catch (err) {
      console.error('Failed to set unassociated:', err);
      alert('操作失败');
    } finally {
      setLoading(false);
    }
  };

  // 删除案件
  const handleDeleteCaseAction = async (caseId: string) => {
    try {
      const success = await api.case.delete(caseId);
      if (success) {
        fetchData();
      } else {
        alert('删除失败，未发现该记录。');
      }
    } catch (err) {
      console.error('Failed to delete case:', err);
    }
  };

  // ---- 弹框内企业筛选 ----
  const filteredEnterprises = enterprises.filter(ent => {
    if (searchEntName && !ent.name.toLowerCase().includes(searchEntName.toLowerCase())) {
      return false;
    }
    if (searchEntCategory !== 'all' && ent.category !== searchEntCategory) {
      return false;
    }
    if (searchEntStatus !== 'all' && ent.status !== searchEntStatus) {
      return false;
    }
    return true;
  });

  // 弹窗分页计算
  const totalEntItems = filteredEnterprises.length;
  const totalEntPages = Math.ceil(totalEntItems / entItemsPerPage) || 1;
  const currentEntPage = Math.max(1, Math.min(entPage, totalEntPages));
  const startEntIndex = (currentEntPage - 1) * entItemsPerPage;
  const paginatedEnterprises = filteredEnterprises.slice(startEntIndex, startEntIndex + entItemsPerPage);

  const handleResetEntFilters = () => {
    setSearchEntName('');
    setSearchEntCategory('all');
    setSearchEntStatus('all');
    setEntPage(1);
  };

  const handleToggleEnterpriseSelect = (entId: string) => {
    if (chosenEntIds.includes(entId)) {
      setChosenEntIds(prev => prev.filter(id => id !== entId));
    } else {
      setChosenEntIds(prev => [...prev, entId]);
    }
  };

  // 保存和提交网点场所关联操作 (多选存证)
  const handleSaveAssociation = async () => {
    if (!selectedCaseForAssoc) return;

    const linkedEnts = enterprises.filter(e => chosenEntIds.includes(e.id));
    const multiplePlaceNames = linkedEnts.map(e => e.name).join(', ');

    // 构建新的一条操作记录流水
    const isUnlinking = chosenEntIds.length === 0;
    const newRecord = {
      id: Math.random().toString(36).substring(2, 9),
      unit: operatorUnit || '福州市鼓楼区公安分局治安大队',
      operator: operatorName || '高警官 (警号 35010214)',
      time: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: (isUnlinking ? '未关联' : '已关联') as any,
      placeName: isUnlinking ? '（清空关联）' : multiplePlaceNames
    };

    try {
      setLoading(true);
      await api.case.save({
        ...selectedCaseForAssoc,
        isProblemPlaceAssociated: isUnlinking ? '未关联' : '已关联',
        associatedPlaceName: isUnlinking ? '' : multiplePlaceNames,
        associatedEnterpriseIds: chosenEntIds,
        // 并把流水信息压入头部
        problemPlaceRecords: [newRecord, ...(selectedCaseForAssoc.problemPlaceRecords || [])]
      });
      
      setShowAssociateModal(false);
      setSelectedCaseForAssoc(null);
      await fetchData();
    } catch (error) {
      console.error('Failed to link association:', error);
      alert('保存关联存证失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <div className="flex-1 p-3 overflow-auto">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          
          {/* 查询检索过滤栏位 ( Requirement 3: 默认展示前3个，点击展开展示所有6个 ) */}
          <div className="p-5 border-b border-gray-100 bg-[#FCFCFD] text-left">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* 1. 发案所属区划 */}
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">发案所属区划</label>
                <input 
                  type="text" 
                  value={filterCaseRegion}
                  onChange={e => setFilterCaseRegion(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                  placeholder="请输入所属区划" 
                />
              </div>

              {/* 2. 案件编号 */}
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">案件编号</label>
                <input 
                  type="text" 
                  value={filterCaseNo}
                  onChange={e => setFilterCaseNo(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                  placeholder="请输入案件编号" 
                />
              </div>

              {/* 3. 案件名称 */}
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">案件名称</label>
                <input 
                  type="text" 
                  value={filterCaseName}
                  onChange={e => setFilterCaseName(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                  placeholder="请输入案件名称" 
                />
              </div>

              {/* 4. 案发时间 */}
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">案发时间</label>
                <input 
                  type="date" 
                  value={filterCaseTime}
                  onChange={e => setFilterCaseTime(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                />
              </div>

              {/* 当展开状态被激活时：展示剩下的高级查询栏位 */}
              {isSearchExpanded && (
                <>
                  {/* 5. 发案地详细地址 */}
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">发案地详细地址</label>
                    <input 
                      type="text" 
                      value={filterCaseLocation}
                      onChange={e => setFilterCaseLocation(e.target.value)}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                      placeholder="模糊匹配商铺街面" 
                    />
                  </div>

                  {/* 6. 案件类别 */}
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">案件类别</label>
                    <select 
                      value={filterCaseCategory}
                      onChange={e => setFilterCaseCategory(e.target.value)}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-gray-700"
                    >
                      <option value="all">全部案件类别</option>
                      <option value="治安事件">治安事件</option>
                      <option value="刑事案件">刑事案件</option>
                      <option value="行政违规">行政违规</option>
                      <option value="消防警情">消防警情</option>
                      <option value="交通管理">交通管理</option>
                    </select>
                  </div>

                  {/* 7. 案件来源 */}
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">案件来源</label>
                    <select 
                      value={filterCaseSource}
                      onChange={e => setFilterCaseSource(e.target.value)}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-gray-700"
                    >
                      <option value="all">全部来源</option>
                      <option value="执法办案系统">执法办案系统</option>
                      <option value="民警补登">民警补登</option>
                    </select>
                  </div>

                  {/* 8. 是否关联问题场所 */}
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1.5">是否关联问题场所</label>
                    <select 
                      value={filterCaseAssoc}
                      onChange={e => setFilterCaseAssoc(e.target.value)}
                      className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-gray-700 font-medium"
                    >
                      <option value="all">不限</option>
                      <option value="已关联">已关联</option>
                      <option value="未关联">未关联</option>
                      <option value="不关联">不关联</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            {/* 操作控制 (重置右侧有展开按钮) */}
            <div className="flex justify-end items-center gap-3 mt-4 pt-3 border-t border-gray-100">
              <button 
                onClick={fetchData}
                className="h-8 px-5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-all flex items-center text-xs font-semibold shadow-sm border border-[#419EFF] cursor-pointer"
              >
                <Search size={14} className="mr-1.5" /> 查询
              </button>
              <button 
                onClick={handleResetFilters}
                className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-xs font-semibold shadow-sm active:scale-95 duration-100 cursor-pointer"
              >
                <RotateCcw size={14} className="mr-1.5" /> 重置
              </button>
              <button 
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="h-8 px-3 bg-blue-50 text-[#419EFF] hover:bg-blue-100 rounded transition-colors flex items-center text-xs font-semibold hover:border-blue-200 border border-transparent shadow-sm cursor-pointer"
              >
                <span>{isSearchExpanded ? '收起' : '展开'}</span>
                <ChevronDown size={14} className={`ml-1 transition-transform duration-200 ${isSearchExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">
              共找到 <span className="text-[#419EFF] font-semibold">{filteredCases.length}</span> 条记录
            </div>
            <div className="flex space-x-2">
              <button 
                type="button"
                onClick={onAdd} 
                className="h-8 px-4 bg-[#419EFF] hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus size={14} />
                <span>案事件补登</span>
              </button>
            </div>
          </div>

          {/* 表格容器区 (Requirement 2: 精准呈现指定的 6 个主列) */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1400px] text-xs font-sans">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-[13px] border-b border-gray-200 font-medium h-10">
                  <th className="px-5 py-3 w-40 font-medium">案件编号</th>
                  <th className="px-5 py-3 font-medium">案件名称</th>
                  <th className="px-5 py-3 w-40 font-medium">案发时间</th>
                  <th className="px-5 py-3 w-32 font-medium">发案所属区划</th>
                  <th className="px-5 py-3 font-medium">发案地详细地址</th>
                  <th className="px-5 py-3 w-36 font-medium">案件类别</th>
                  <th className="px-5 py-3 w-32 font-medium">案件来源</th>
                  <th className="px-5 py-3 w-40 font-medium">是否关联问题场所</th>
                  <th className="px-5 py-3 max-w-[250px] font-medium">已关联网点场所名称</th>
                  <th className="px-5 py-3 text-center w-36 sticky right-0 bg-gray-50 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.04)] font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666] divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-gray-400 font-medium">
                      正在从网端多维筛取涉案信息大帐本中...
                    </td>
                  </tr>
                ) : filteredCases.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-gray-400 font-medium">
                      未检索到匹配的案事件历史底册数据。
                    </td>
                  </tr>
                ) : (
                  filteredCases.map((row) => (
                    <tr 
                      key={row.id} 
                      onClick={() => onView(row.id)}
                      className="border-b border-gray-100 hover:bg-blue-50/10 transition-colors cursor-pointer group text-xs text-gray-650"
                    >
                      {/* 1. 案件编号 */}
                      <td className="px-5 py-3 w-40 font-mono text-gray-700">{row.caseNo || row.id}</td>
                      
                      {/* 2. 案件名称 */}
                      <td className="px-5 py-3 font-medium text-gray-900 group-hover:text-[#419EFF] transition-colors">
                        {row.caseName || row.title}
                      </td>
                      
                      {/* 3. 案发时间 */}
                      <td className="px-5 py-3 w-40 font-mono text-gray-500 whitespace-nowrap">{row.caseStartTime || row.date || '--'}</td>
                      
                      {/* 3.1 发案所属区划 */}
                      <td className="px-5 py-3 w-32 text-gray-600">{row.caseRegion || '--'}</td>

                      {/* 4. 发案地详细地址 */}
                      <td className="px-5 py-3 text-gray-600 truncate max-w-[220px]" title={row.crimeSceneAddress || row.company}>
                        {row.crimeSceneAddress || row.company || '--'}
                      </td>
                      
                      {/* 5. 案件类别 */}
                      <td className="px-5 py-3 w-36">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded font-medium text-[11px]">
                          {row.caseCategory || row.type}
                        </span>
                      </td>

                      {/* 5.1 案件来源 */}
                      <td className="px-5 py-3 w-32">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                          row.caseSource === '民警补登' 
                            ? 'bg-purple-50 text-purple-700 border-purple-200' 
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {row.caseSource || '执法办案系统'}
                        </span>
                      </td>

                      {/* 6. 是否关联问题场所 (已关联、未关联、不关联) */}
                      <td className="px-5 py-3 w-40">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                          row.isProblemPlaceAssociated === '已关联' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : row.isProblemPlaceAssociated === '未关联' 
                            ? 'bg-orange-50 text-orange-700 border-orange-200' 
                            : 'bg-gray-50 text-gray-500 border-gray-200'
                        }`}>
                          {row.isProblemPlaceAssociated || '未关联'}
                        </span>
                      </td>

                      {/* 关联的具体问题场所名称列表 */}
                      <td className="px-5 py-3 max-w-[250px] truncate">
                        {row.isProblemPlaceAssociated === '已关联' && row.associatedPlaceName ? (
                          <div className="flex items-center gap-1.5" title={row.associatedPlaceName}>
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                            <span className="font-semibold text-gray-800 text-xs truncate">
                              {row.associatedPlaceName}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 font-normal">--</span>
                        )}
                      </td>

                      {/* 行操作按钮区 */}
                      <td className={`px-5 py-3 text-center sticky right-0 bg-white group-hover:bg-[#F9FAFC] transition-colors shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.04)] ${openDropdownId === row.id ? 'z-50' : 'z-10'}`}>
                        <div className="flex items-center justify-center gap-3 relative" onClick={e => e.stopPropagation()}>
                          <button 
                            type="button"
                            onClick={() => onView(row.id)}
                            className="text-[#419EFF] hover:text-blue-700 font-medium whitespace-nowrap text-xs cursor-pointer"
                          >
                            详情
                          </button>
                          
                          <button 
                            type="button"
                            onClick={() => onEdit(row.id)}
                            className="text-[#419EFF] hover:text-blue-700 font-medium whitespace-nowrap text-xs cursor-pointer"
                          >
                            修改
                          </button>

                          {/* 下拉行扩展选项 (Requirement 4: 仅保留 关联问题场所多选 / 删除) */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdownId(openDropdownId === row.id ? null : row.id);
                              }}
                              className="p-1 text-gray-400 hover:text-gray-700 border border-gray-200 rounded hover:bg-slate-50 transition-all cursor-pointer"
                            >
                              <ChevronDown size={11} />
                            </button>
                            
                            {openDropdownId === row.id && (
                              <>
                                <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)}></div>
                                <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded shadow-lg py-1 z-20 text-left animate-in fade-in duration-100">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedCaseForAssoc(row);
                                      setChosenEntIds(row.associatedEnterpriseIds || []);
                                      setShowAssociateModal(true);
                                      setOpenDropdownId(null);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-[11px] text-gray-700 font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <Link size={12} />
                                    <span>关联问题场所</span>
                                  </button>
                                  {row.isProblemPlaceAssociated !== '不关联' && (
                                    <>
                                      <div className="border-t border-gray-100 my-1"></div>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setConfirmConfig({
                                            title: '不关联确认',
                                            message: '您确定要将该案事件标记为“不关联问题场所”吗？此操作将清除该案件已有的所有场所关联记录。',
                                            confirmText: '确认不关联',
                                            type: 'warning',
                                            onConfirm: () => handleSetUnassociatedAction(row.id)
                                          });
                                          setShowConfirmModal(true);
                                          setOpenDropdownId(null);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-orange-50 text-[11px] text-orange-600 font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                                      >
                                        <ShieldAlert size={12} />
                                        <span>不关联问题场所</span>
                                      </button>
                                    </>
                                  )}
                                  <div className="border-t border-gray-100 my-1"></div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setConfirmConfig({
                                        title: '删除确认',
                                        message: '您确定要将该宗案事件登记记录从公安工作台底册中移除吗？此操作不可逆。',
                                        confirmText: '确认删除',
                                        type: 'danger',
                                        onConfirm: () => handleDeleteCaseAction(row.id)
                                      });
                                      setShowConfirmModal(true);
                                      setOpenDropdownId(null);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-[11px] text-red-500 hover:text-red-700 font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <Trash2 size={12} />
                                    <span>删除案卷</span>
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div className="text-xs text-gray-500 font-medium">
              显示 1 到 {filteredCases.length} 条，共 {filteredCases.length} 条记录
            </div>
            <div className="flex gap-1">
              <button className="px-2.5 py-1.5 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40 transition-colors text-[10px] font-bold" disabled>
                上一页
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-[#419EFF] rounded bg-[#419EFF] text-white text-xs font-bold shadow-sm">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 text-xs font-medium transition-colors">
                2
              </button>
              <button className="px-2.5 py-1.5 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 transition-colors text-[10px] font-bold">
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 通用二次确认弹窗 */}
      {showConfirmModal && confirmConfig && (
        <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  confirmConfig.type === 'danger' ? 'bg-red-50 text-red-500' : 
                  confirmConfig.type === 'warning' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'
                }`}>
                  {confirmConfig.type === 'danger' ? <Trash2 size={20} /> : 
                   confirmConfig.type === 'warning' ? <ShieldAlert size={20} /> : <Eye size={20} />}
                </div>
                <h3 className="text-base font-bold text-gray-800">{confirmConfig.title}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {confirmConfig.message}
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setConfirmConfig(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={async () => {
                  await confirmConfig.onConfirm();
                  setShowConfirmModal(false);
                  setConfirmConfig(null);
                }}
                className={`px-4 py-2 text-xs font-semibold text-white rounded shadow-sm transition-all active:scale-95 cursor-pointer ${
                  confirmConfig.type === 'danger' ? 'bg-red-500 hover:bg-red-600' : 
                  confirmConfig.type === 'warning' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {confirmConfig.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. 关联问题场所多选模态层 (Requirement 4: 支持场所企业复选多选配置) */}
      {showAssociateModal && selectedCaseForAssoc && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150 text-left">
            
            {/* 顶栏 */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-gray-150 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-[#419EFF] rounded-full flex items-center justify-center border border-blue-100 shadow-sm">
                  <Link size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">匹配关联问题场所网点（可多选）</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">选择并勾选将该宗违法违规案事件链接到系统在档的问题汽车维修点、服务网点进行穿透式关联。</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowAssociateModal(false);
                  setSelectedCaseForAssoc(null);
                }}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* 过滤和展示内容主体 */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              
              {/* 企业微型查询输入面板 */}
              <div className="p-3 bg-[#FAFBFD] border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 font-bold block">场所/企业名称</span>
                    <input 
                      type="text" 
                      value={searchEntName}
                      onChange={e => { setSearchEntName(e.target.value); setEntPage(1); }}
                      className="w-full h-8 px-2.5 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:border-[#419EFF] transition-all"
                      placeholder="搜名称关键词" 
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 font-bold block">行业细分类型</span>
                    <select
                      value={searchEntCategory}
                      onChange={e => { setSearchEntCategory(e.target.value); setEntPage(1); }}
                      className="w-full h-8 px-2 border border-gray-300 rounded text-xs bg-white cursor-pointer outline-none focus:border-[#419EFF] transition-colors"
                    >
                      <option value="all">全类别</option>
                      <option value="一类维修">一类汽修大厂</option>
                      <option value="二类维修">二类修配厂</option>
                      <option value="三类专项">三类专项铺</option>
                      <option value="摩托维修">摩托维修铺</option>
                      <option value="汽车美容">汽车美容装饰</option>
                      <option value="娱乐服务">娱乐服务</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 font-bold block">正常在档状态</span>
                    <select
                      value={searchEntStatus}
                      onChange={e => { setSearchEntStatus(e.target.value); setEntPage(1); }}
                      className="w-full h-8 px-2 border border-gray-300 rounded text-xs bg-white cursor-pointer outline-none focus:border-[#419EFF] transition-colors"
                    >
                      <option value="all">不限经营状态</option>
                      <option value="正常营业">正常营业</option>
                      <option value="歇业">歇业已搬迁</option>
                    </select>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleResetEntFilters}
                      className="w-full h-8 bg-white border border-gray-300 hover:bg-slate-50 text-gray-700 rounded text-xs font-bold transition-all cursor-pointer"
                    >
                      重置检索企业
                    </button>
                  </div>
                </div>
              </div>

              {/* 企业网格复选多选卡片或微表 (可多选关联场所) */}
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <table className="w-full text-left text-xs text-gray-600 border-collapse">
                  <thead className="bg-[#FAFBFD] font-bold text-gray-700 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2.5 text-center w-12">多选</th>
                      <th className="px-4 py-2.5">场所企业名称</th>
                      <th className="px-4 py-2.5 w-32">企业类型</th>
                      <th className="px-4 py-2.5 w-24">当前状态</th>
                      <th className="px-4 py-2.5 w-32">行政区域</th>
                      <th className="px-4 py-2.5 w-24">法人代表</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150">
                    {paginatedEnterprises.length > 0 ? (
                      paginatedEnterprises.map(ent => {
                        const isChecked = chosenEntIds.includes(ent.id);
                        return (
                          <tr 
                            key={ent.id}
                            onClick={() => handleToggleEnterpriseSelect(ent.id)}
                            className={`hover:bg-blue-50/20 cursor-pointer transition-colors ${isChecked ? 'bg-blue-50/30' : ''}`}
                          >
                            <td className="px-4 py-2.5 text-center" onClick={e => e.stopPropagation()}>
                              <input 
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleEnterpriseSelect(ent.id)}
                                className="accent-[#419EFF] cursor-pointer" 
                              />
                            </td>
                            <td className="px-4 py-2.5 font-bold text-gray-800">{ent.name}</td>
                            <td className="px-4 py-2.5">
                              <span className="px-1.5 py-0.5 bg-slate-100 text-gray-600 text-[10px] rounded border border-slate-200">
                                {ent.category}
                              </span>
                            </td>
                            <td className="px-4 py-2.5">
                              <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                                ent.status === '正常营业' ? 'bg-green-50 text-green-600 border border-green-150' : 'bg-red-50 text-red-500 border border-red-150'
                              }`}>
                                {ent.status}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-gray-500">{ent.region}</td>
                            <td className="px-4 py-2.5 text-gray-700 font-semibold">{ent.legalRep || '-'}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-400">目前未筛选到任何系统匹配企业。</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* 翻页栏 */}
                {totalEntPages > 1 && (
                  <div className="bg-[#FAFBFD] border-t border-gray-200 px-4 py-2.5 flex items-center justify-between text-[11px] text-gray-500">
                    <div>
                      系统共检索到 <span className="font-bold text-slate-700">{totalEntItems}</span> 家网点，当前第 <span className="font-bold text-slate-800">{currentEntPage}</span> / {totalEntPages} 页
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={currentEntPage === 1}
                        onClick={(e) => { e.stopPropagation(); setEntPage(p => Math.max(1, p - 1)); }}
                        className="px-2.5 py-0.5 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 select-none transition-all cursor-pointer font-bold text-gray-650"
                      >
                        上一页
                      </button>
                      <button
                        type="button"
                        disabled={currentEntPage === totalEntPages}
                        onClick={(e) => { e.stopPropagation(); setEntPage(p => Math.min(totalEntPages, p + 1)); }}
                        className="px-2.5 py-0.5 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 select-none transition-all cursor-pointer font-bold text-gray-650"
                      >
                        下一页
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 审核及存证操作凭凭 */}
              <div className="border border-dashed border-gray-200 rounded-lg p-4 bg-slate-50/50 space-y-3">
                <h4 className="text-xs font-bold text-gray-700 flex items-center gap-1.5 text-left">
                  <span className="w-1.5 h-3 bg-blue-500 rounded-full"></span>
                  关联存证记录配置 (公安执法审核留痕)：
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-gray-600">
                  <div className="space-y-1">
                    <span className="text-gray-500 font-bold block text-left">操作执行单位</span>
                    <input
                      type="text"
                      value={operatorUnit}
                      onChange={(e) => setOperatorUnit(e.target.value)}
                      className="w-full h-8 px-2.5 border border-gray-300 rounded focus:border-[#419EFF] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 font-bold block text-left">操作执行警员</span>
                    <input
                      type="text"
                      value={operatorName}
                      onChange={(e) => setOperatorName(e.target.value)}
                      className="w-full h-8 px-2.5 border border-gray-300 rounded focus:border-[#419EFF] outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* 顶框底部操作条 */}
            <div className="px-6 py-4 border-t border-gray-200 bg-[#FAFBFD] flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowAssociateModal(false);
                  setSelectedCaseForAssoc(null);
                }}
                className="px-5 py-1.5 bg-white border border-gray-300 rounded hover:bg-slate-50 text-gray-650 text-xs font-bold transition-all cursor-pointer"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleSaveAssociation}
                className="px-5 py-1.5 bg-[#419EFF] text-white rounded hover:bg-blue-600 text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                保存关联关系并存证
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
