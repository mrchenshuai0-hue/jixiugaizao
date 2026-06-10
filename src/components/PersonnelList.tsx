import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Plus, Download, ChevronDown, User, AlertTriangle } from 'lucide-react';
import { api } from '../api';
import { Personnel } from '../types';

interface PersonnelListProps {
  onViewDetail: (id: string) => void;
  onAdd: () => void;
  onEdit: (id: string) => void;
  initialRegion?: string;
}

export default function PersonnelList({ onViewDetail, onAdd, onEdit, initialRegion }: PersonnelListProps) {
  const [data, setData] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Expansion state
  const [isExpanded, setIsExpanded] = useState(false);

  // Default query inputs
  const [selectedRegion, setSelectedRegion] = useState(initialRegion || '');
  const [enterpriseName, setEnterpriseName] = useState('');
  const [entryDateStart, setEntryDateStart] = useState('');
  const [entryDateEnd, setEntryDateEnd] = useState('');
  
  // Extra query inputs
  const [personnelName, setPersonnelName] = useState('');
  const [venueCode, setVenueCode] = useState('');
  const [idCard, setIdCard] = useState('');
  const [phone, setPhone] = useState('');
  const [venueStatus, setVenueStatus] = useState('');
  const [hasPunishment, setHasPunishment] = useState('');

  // Applied filter state
  const [appliedFilters, setAppliedFilters] = useState({
    selectedRegion: initialRegion || '',
    enterpriseName: '',
    entryDateStart: '',
    entryDateEnd: '',
    personnelName: '',
    venueCode: '',
    idCard: '',
    phone: '',
    venueStatus: '',
    hasPunishment: '',
  });

  useEffect(() => {
    if (initialRegion !== undefined) {
      setSelectedRegion(initialRegion);
      setAppliedFilters(prev => ({
        ...prev,
        selectedRegion: initialRegion
      }));
    }
  }, [initialRegion]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.personnel.getAll();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch personnel:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    setAppliedFilters({
      selectedRegion,
      enterpriseName,
      entryDateStart,
      entryDateEnd,
      personnelName,
      venueCode,
      idCard,
      phone,
      venueStatus,
      hasPunishment,
    });
  };

  const handleReset = () => {
    setSelectedRegion(''); setEnterpriseName(''); setEntryDateStart(''); setEntryDateEnd('');
    setPersonnelName(''); setVenueCode(''); setIdCard(''); setPhone(''); setVenueStatus(''); setHasPunishment('');
    
    setAppliedFilters({
      selectedRegion: '', enterpriseName: '', entryDateStart: '', entryDateEnd: '',
      personnelName: '', venueCode: '', idCard: '', phone: '', venueStatus: '', hasPunishment: '',
    });
  };

  const displayData = data.filter(row => {
    if (appliedFilters.selectedRegion) {
      const cleanRegion = appliedFilters.selectedRegion.replace('福州市', '').replace('市', '').replace('区', '').replace('县', '').replace('公安分局', '').replace('-', '').trim();
      if (!row.enterprise.includes(cleanRegion)) return false;
    }
    if (appliedFilters.enterpriseName && !row.enterprise.includes(appliedFilters.enterpriseName)) return false;
    if (appliedFilters.personnelName && !row.name.includes(appliedFilters.personnelName)) return false;
    if (appliedFilters.idCard && !row.idCard.includes(appliedFilters.idCard)) return false;
    if (appliedFilters.entryDateStart && row.entryDate < appliedFilters.entryDateStart) return false;
    if (appliedFilters.entryDateEnd && row.entryDate > appliedFilters.entryDateEnd) return false;
    // other filters can be added here
    return true;
  });

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
  };

  const toggleAllRows = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map(d => d.id));
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '在职': return 'bg-green-50 text-green-700 border-green-200';
      case '离职': return 'bg-gray-50 text-gray-700 border-gray-200';
      case '待审核': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const confirmDelete = (id: string) => {
    if (window.confirm("您确定要删除该从业人员吗？此操作不可撤销。")) {
      setData(prev => prev.filter(p => p.id !== id));
    }
    setOpenDropdown(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] p-4 font-sans">
      
      {/* 顶部查询卡片 */}
      <div className="bg-white rounded-lg border border-gray-200 mb-4 px-6 py-5 shrink-0 flex items-start justify-between">
        <div className="flex-1 grid grid-cols-3 gap-6 mr-6">
          {/* 始终显示的3个字段 */}
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">所属辖区</label>
            <select 
              value={selectedRegion} 
              onChange={(e) => setSelectedRegion(e.target.value)} 
              className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors bg-white text-gray-700"
            >
              <option value="">全部</option>
              <option value="福州市-马尾区公安分局">福州市-马尾区公安分局</option>
              <option value="福州市-鼓楼区公安分局">福州市-鼓楼区公安分局</option>
              <option value="福州市-台江区公安分局">福州市-台江区公安分局</option>
              <option value="厦门市-厦门市公安局">厦门市-厦门市公安局</option>
              <option value="厦门市-思明区公安分局">厦门市-思明区公安分局</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">所属企业</label>
            <input 
              type="text" value={enterpriseName} onChange={(e) => setEnterpriseName(e.target.value)} 
              placeholder="请输入所属企业" 
              className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors" 
            />
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">入职时间</label>
            <div className="flex items-center flex-1 space-x-2">
              <input type="date" value={entryDateStart} onChange={(e) => setEntryDateStart(e.target.value)} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
              <span className="text-gray-400">至</span>
              <input type="date" value={entryDateEnd} onChange={(e) => setEntryDateEnd(e.target.value)} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          {/* 展开的字段 */}
          {isExpanded && (
            <>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">姓名</label>
                <input type="text" value={personnelName} onChange={(e) => setPersonnelName(e.target.value)} placeholder="请输入姓名" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">场所编码</label>
                <input type="text" value={venueCode} onChange={(e) => setVenueCode(e.target.value)} placeholder="请输入场所编码" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">身份证</label>
                <input type="text" value={idCard} onChange={(e) => setIdCard(e.target.value)} placeholder="请输入身份证号" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">联系电话</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="请输入联系电话" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">场所状态</label>
                <select value={venueStatus} onChange={(e) => setVenueStatus(e.target.value)} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500">
                  <option value="">全部</option><option value="正常">正常</option><option value="歇业">歇业</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-32 shrink-0 font-medium whitespace-nowrap">是否受过处罚</label>
                <select value={hasPunishment} onChange={(e) => setHasPunishment(e.target.value)} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500">
                  <option value="">全部</option><option value="1">是</option><option value="0">否</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleSearch} className="h-9 px-5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium">
            查询
          </button>
          <button onClick={handleReset} className="h-9 px-5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
            重置
          </button>
          <button onClick={() => setIsExpanded(!isExpanded)} className="h-9 px-5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium flex items-center">
            {isExpanded ? '收起' : '展开'}
            <ChevronDown size={14} className={`ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* 底部列表内容卡片 */}
      <div className="bg-white rounded-lg border border-gray-200 flex-1 flex flex-col overflow-hidden">
        {/* 卡片头部 */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
          <h3 className="text-base font-bold text-gray-800 tracking-wide">人员信息列表</h3>
          <div className="flex gap-2">
            <button onClick={onAdd} className="h-8 px-4 bg-blue-50 text-[#419EFF] border border-blue-200 rounded hover:bg-blue-100 transition-colors text-sm font-medium">
              新增人员
            </button>
            <button className="h-8 px-4 bg-white text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
              导出
            </button>
          </div>
        </div>

        {/* 表格区 */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="text-gray-600 text-[13px] font-semibold border-b border-gray-200">
                <th className="px-6 py-3 w-12 text-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-[#419EFF] focus:ring-[#419EFF]"
                    checked={selectedRows.length === displayData.length && displayData.length > 0}
                    onChange={toggleAllRows}
                  />
                </th>
                <th className="px-6 py-3 font-medium w-20 text-center">照片</th>
                <th className="px-6 py-3 font-medium">姓名</th>
                <th className="px-6 py-3 font-medium">身份证号</th>
                <th className="px-6 py-3 font-medium">岗位/职务</th>
                <th className="px-6 py-3 font-medium">所属企业</th>
                <th className="px-6 py-3 font-medium">入职日期</th>
                <th className="px-6 py-3 font-medium">状态</th>
                <th className="px-6 py-3 font-medium text-center w-32">操作</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-6 py-10 text-center text-gray-500">
                    加载中...
                  </td>
                </tr>
              ) : displayData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-10 text-center text-gray-500">
                    暂无数据
                  </td>
                </tr>
              ) : displayData.map((row) => (
                <tr 
                  key={row.id} 
                  className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors even:bg-gray-50 bg-white group ${openDropdown === row.id ? 'relative z-[60]' : ''}`}
                >
                  <td className="px-6 py-3.5 text-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-[#419EFF] focus:ring-[#419EFF]"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleRowSelection(row.id)}
                    />
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto border border-gray-200 overflow-hidden">
                      <User size={18} className="text-gray-400" />
                    </div>
                  </td>
                  <td className="px-6 py-3.5 font-medium text-[#333333] whitespace-nowrap">{row.name}</td>
                  <td className="px-6 py-3.5 font-mono whitespace-nowrap">{row.idCard}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">{row.position}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">{row.enterprise}</td>
                  <td className="px-6 py-3.5 font-mono whitespace-nowrap">{row.entryDate}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${getStatusStyle(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-center transition-colors">
                    <div className="flex items-center justify-center gap-3">
                      <button className="text-[#419EFF] hover:text-blue-700 font-medium text-[13px]" onClick={() => onViewDetail(row.id)}>详情</button>
                      <button className="text-[#419EFF] hover:text-blue-700 font-medium text-[13px]" onClick={() => onEdit(row.id)}>修改</button>
                      <button className="text-red-500 hover:text-red-700 font-medium text-[13px]" onClick={() => confirmDelete(row.id)}>删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页区 */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end shrink-0">
          <div className="flex items-center gap-4 text-[13px] text-gray-600">
            <span>共 {displayData.length} 条</span>
            <select className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-blue-400">
              <option>10条/页</option>
              <option>20条/页</option>
              <option>50条/页</option>
            </select>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:bg-gray-100">&lt;</button>
              <button className="w-8 h-8 flex items-center justify-center border border-transparent bg-[#419EFF] text-white rounded">1</button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">2</button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">3</button>
              <span className="w-8 h-8 flex items-center justify-center">...</span>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">10</button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">&gt;</button>
            </div>
            <div className="flex items-center gap-1">
              前往 <input type="text" className="w-10 h-8 border border-gray-300 rounded text-center focus:outline-none focus:border-blue-400" defaultValue="1" /> 页
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
