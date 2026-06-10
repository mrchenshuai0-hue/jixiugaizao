import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Plus, Download, ChevronDown, Eye, ShieldCheck, Key, Settings, AlertCircle, Clock, ShieldAlert, XCircle, Building2, Star, AlertTriangle } from 'lucide-react';
import { api } from '../api';
import { Enterprise } from '../types';

interface EnterpriseListProps {
  onViewDetail: (id: string) => void;
  onAdd: () => void;
  onEdit: (id: string) => void;
  initialRegion?: string;
}

export default function EnterpriseList({ onViewDetail, onAdd, onEdit, initialRegion }: EnterpriseListProps) {
  const [data, setData] = useState<Enterprise[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Modal states
  const [activeModal, setActiveModal] = useState<'password' | 'change' | 'closure' | 'fault' | null>(null);
  const [selectedEnterprise, setSelectedEnterprise] = useState<Enterprise | null>(null);

  // Expansion state
  const [isExpanded, setIsExpanded] = useState(false);

  // Default query inputs
  const [region, setRegion] = useState(initialRegion || '');
  const [enterpriseName, setEnterpriseName] = useState('');
  const [usccInput, setUsccInput] = useState('');
  
  // Extra query inputs
  const [statusVal, setStatusVal] = useState('');
  const [registerDateStart, setRegisterDateStart] = useState('');
  const [registerDateEnd, setRegisterDateEnd] = useState('');
  const [categoryVal, setCategoryVal] = useState('');
  const [daysUnlogged, setDaysUnlogged] = useState('');
  const [daysUnuploaded, setDaysUnuploaded] = useState('');
  const [enterpriseCode, setEnterpriseCode] = useState('');
  const [levelVal, setLevelVal] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [registeredAddress, setRegisteredAddress] = useState('');
  const [legalRepPhone, setLegalRepPhone] = useState('');

  // Applied filter state
  const [appliedFilters, setAppliedFilters] = useState({
    region: initialRegion || '',
    enterpriseName: '',
    usccInput: '',
    statusVal: '',
    registerDateStart: '',
    registerDateEnd: '',
    categoryVal: '',
    daysUnlogged: '',
    daysUnuploaded: '',
    enterpriseCode: '',
    levelVal: '',
    postalCode: '',
    registeredAddress: '',
    legalRepPhone: '',
  });

  useEffect(() => {
    if (initialRegion !== undefined) {
      setRegion(initialRegion);
      setAppliedFilters(prev => ({
        ...prev,
        region: initialRegion
      }));
    }
  }, [initialRegion]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.enterprise.getAll();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch enterprises:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAction = (type: 'password' | 'change' | 'closure' | 'fault', enterprise: Enterprise) => {
    setSelectedEnterprise(enterprise);
    setActiveModal(type);
    setOpenDropdown(null);
  };

  const getRecordStatusStyle = (status: string) => {
    if (status === '已备案') return 'text-green-600';
    if (status === '未备案') return 'text-red-500';
    return 'text-gray-500';
  };

  const handleSearch = () => {
    setAppliedFilters({
      region, enterpriseName, usccInput, statusVal, registerDateStart, registerDateEnd,
      categoryVal, daysUnlogged, daysUnuploaded, enterpriseCode, levelVal, postalCode,
      registeredAddress, legalRepPhone,
    });
  };

  const handleReset = () => {
    setRegion(''); setEnterpriseName(''); setUsccInput(''); setStatusVal('');
    setRegisterDateStart(''); setRegisterDateEnd(''); setCategoryVal(''); setDaysUnlogged('');
    setDaysUnuploaded(''); setEnterpriseCode(''); setLevelVal(''); setPostalCode('');
    setRegisteredAddress(''); setLegalRepPhone('');
    setAppliedFilters({
      region: '', enterpriseName: '', usccInput: '', statusVal: '', registerDateStart: '',
      registerDateEnd: '', categoryVal: '', daysUnlogged: '', daysUnuploaded: '',
      enterpriseCode: '', levelVal: '', postalCode: '', registeredAddress: '', legalRepPhone: '',
    });
  };

  const filteredData = data.filter(row => {
    if (appliedFilters.region && !(row.region || row.jurisdiction || '').toLowerCase().includes(appliedFilters.region.toLowerCase())) return false;
    if (appliedFilters.enterpriseName) {
      const kw = appliedFilters.enterpriseName.toLowerCase();
      const matchesName = (row.name || '').toLowerCase().includes(kw);
      const matchesBrand = (row.brandName || '').toLowerCase().includes(kw);
      if (!matchesName && !matchesBrand) return false;
    }
    if (appliedFilters.usccInput && !(row.uscc || '').toLowerCase().includes(appliedFilters.usccInput.toLowerCase())) return false;
    if (appliedFilters.statusVal && (row.status || '正常营业') !== appliedFilters.statusVal) return false;
    if (appliedFilters.registerDateStart && (row.registerDate || '2020-01-01') < appliedFilters.registerDateStart) return false;
    if (appliedFilters.registerDateEnd && (row.registerDate || '2020-01-01') > appliedFilters.registerDateEnd) return false;
    if (appliedFilters.categoryVal && !(row.category || '').toLowerCase().includes(appliedFilters.categoryVal.toLowerCase())) return false;
    if (appliedFilters.enterpriseCode && !(row.enterpriseCode || '').toLowerCase().includes(appliedFilters.enterpriseCode.toLowerCase())) return false;
    if (appliedFilters.levelVal && !(row.level || '').toLowerCase().includes(appliedFilters.levelVal.toLowerCase())) return false;
    if (appliedFilters.postalCode && !(row.postalCode || '').toLowerCase().includes(appliedFilters.postalCode.toLowerCase())) return false;
    if (appliedFilters.registeredAddress && !(row.registeredAddress || '').toLowerCase().includes(appliedFilters.registeredAddress.toLowerCase())) return false;
    if (appliedFilters.legalRepPhone && !(row.legalRepPhone || '').toLowerCase().includes(appliedFilters.legalRepPhone.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] p-4 font-sans">
      
      {/* 顶部查询卡片 */}
      <div className="bg-white rounded-lg border border-gray-200 mb-4 px-6 py-5 shrink-0 flex items-start justify-between">
        <div className="flex-1 grid grid-cols-3 gap-6 mr-6">
          {/* 始终显示的3个字段 */}
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">所属辖区</label>
            <select 
              value={region} 
              onChange={(e) => setRegion(e.target.value)} 
              className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="">全部</option>
              <option value="鼓楼">福州市鼓楼区</option>
              <option value="台江">福州市台江区</option>
              <option value="仓山">福州市仓山区</option>
              <option value="晋安">福州市晋安区</option>
              <option value="马尾">福州市马尾区</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">企业名称</label>
            <input 
              type="text" value={enterpriseName} onChange={(e) => setEnterpriseName(e.target.value)} 
              placeholder="公司名或招牌" 
              className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors" 
            />
          </div>
          <div className="flex items-center">
            <label className="text-sm text-gray-700 w-32 shrink-0 font-medium whitespace-nowrap">社会统一信用代码</label>
            <input 
              type="text" value={usccInput} onChange={(e) => setUsccInput(e.target.value)} 
              placeholder="请输入社会信用代码" 
              className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors" 
            />
          </div>

          {/* 展开的字段 */}
          {isExpanded && (
            <>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">企业状态</label>
                <select value={statusVal} onChange={(e) => setStatusVal(e.target.value)} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500">
                  <option value="">全部</option><option value="正常营业">正常营业</option><option value="停业">停业</option>
                  <option value="注销">注销</option><option value="歇业">歇业</option>
                </select>
              </div>
              <div className="flex items-center col-span-2">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">登记时间</label>
                <div className="flex items-center flex-1 space-x-2">
                  <input type="date" value={registerDateStart} onChange={(e) => setRegisterDateStart(e.target.value)} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
                  <span className="text-gray-400">至</span>
                  <input type="date" value={registerDateEnd} onChange={(e) => setRegisterDateEnd(e.target.value)} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">企业类别</label>
                <select value={categoryVal} onChange={(e) => setCategoryVal(e.target.value)} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500">
                  <option value="">全部</option><option value="一类">一类维修</option><option value="二类">二类维修</option>
                  <option value="三类">三类维修</option><option value="摩托车">摩托车维修</option><option value="其他">其他</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">企业编码</label>
                <input type="text" value={enterpriseCode} onChange={(e) => setEnterpriseCode(e.target.value)} placeholder="请输入企业编码" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 w-32 shrink-0 font-medium whitespace-nowrap">企业等级</label>
                <select value={levelVal} onChange={(e) => setLevelVal(e.target.value)} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500">
                  <option value="">全部</option><option value="一类">一类</option><option value="二类">二类</option>
                  <option value="三类">三类</option><option value="无证">无证</option>
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
          <h3 className="text-base font-bold text-gray-800 tracking-wide">企业信息列表</h3>
          <div className="flex gap-2">
            <button onClick={onAdd} className="h-8 px-4 bg-blue-50 text-[#419EFF] border border-blue-200 rounded hover:bg-blue-100 transition-colors text-sm font-medium">
              新增
            </button>
            <button className="h-8 px-4 bg-white text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
              导出
            </button>
          </div>
        </div>

        {/* 表格区 */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1280px]">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="text-gray-600 text-[13px] font-semibold border-b border-gray-200">
                <th className="px-6 py-3 font-medium whitespace-nowrap w-1/5">公司名称</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap w-48">所属辖区</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap">统一社会信用代码</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap">对外招牌名</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap w-24">备案状态</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap w-24">经营状态</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap w-32">登记时间</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap w-32">变更时间</th>
                <th className="px-6 py-3 font-medium text-center w-32">操作</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              {loading ? (
                <tr><td colSpan={9} className="px-6 py-10 text-center text-gray-500">加载中...</td></tr>
              ) : filteredData.map((row, index) => (
                <tr 
                  key={row.id} 
                  className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors even:bg-gray-50 bg-white group ${openDropdown === row.id ? 'relative z-[60]' : ''}`}
                >
                  <td className="px-6 py-3.5 whitespace-nowrap">{row.name}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">{row.jurisdiction || row.region}</td>
                  <td className="px-6 py-3.5 font-mono">{row.uscc}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">{row.brandName || '--'}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    {row.recordStatus || '-'}
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                      row.status === '正常营业' || row.status === '正常' 
                        ? 'text-green-600 border-green-200 bg-green-50' 
                        : row.status === '停业'
                        ? 'text-orange-600 border-orange-200 bg-orange-50'
                        : 'text-gray-600 border-gray-200 bg-gray-50'
                    }`}>
                      {row.status || '正常营业'}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap font-mono">{row.registerDate || '2023-03-23'}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap font-mono">{row.updateDate || '-'}</td>
                  <td className="px-6 py-3.5 text-center transition-colors">
                    <div className="flex items-center justify-center gap-3">
                      <button className="text-[#419EFF] hover:text-blue-700 font-medium text-[13px]" onClick={() => onViewDetail(row.id)}>详情</button>
                      <button className="text-[#419EFF] hover:text-blue-700 font-medium text-[13px]" onClick={() => onEdit(row.id)}>修改</button>
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
            <span>共 {filteredData.length} 条</span>
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
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">33</button>
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

