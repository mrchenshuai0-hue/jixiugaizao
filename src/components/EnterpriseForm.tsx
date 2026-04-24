import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, MapPin, AlertCircle, Search, Image as ImageIcon, CheckCircle2, XCircle, ShieldCheck, Settings, Info, ChevronDown } from 'lucide-react';

const APPROVED_ENTERPRISES = [
  { 
    id: '1', 
    name: '福建众诚汽车修配服务中心', 
    uscc: '91350102MA34N8P76A', 
    legalRep: '李万山', 
    contactName: '陈晓东',
    contactPhone: '0591-88888888',
    contactMobile: '13905008899',
    contactAddress: '福建省福州市马尾区罗星街道28号',
    contactID: '350102198001011234',
    zipCode: '350001',
    region: '福州市马尾区', 
    jurisdiction: '福州市-马尾区公安分局',
    category: '一类维修',
    level: 'AA'
  },
  { 
    id: '2', 
    name: '厦门速捷机动车维修有限公司', 
    uscc: '91350200MA24K5R12B', 
    legalRep: '张一航', 
    contactName: '林大伟',
    contactPhone: '0592-7777777',
    contactMobile: '13812345678', 
    contactAddress: '厦门市思明区软件园二期12号',
    contactID: '350203198501015678',
    zipCode: '361000',
    region: '厦门市思明区', 
    jurisdiction: '厦门市-思明区公安分局',
    category: '二类维修',
    level: 'A'
  },
];

const JURISDICTIONS = [
  "福州市-福州市公安局",
  "福州市-马尾区公安分局",
  "福州市-鼓楼区公安分局",
  "福州市-台江区公安分局",
  "厦门市-厦门市公安局",
  "厦门市-思明区公安分局",
];

const ADDRESS_SUGGESTIONS = [
  "福州市马尾区罗星街道28号",
  "福州市鼓楼区软件园F区8号楼",
  "厦门市思明区软件园二期",
];

interface EnterpriseFormProps {
  id: string | null;
  onCancel: () => void;
  onSave: () => void;
}

export default function EnterpriseForm({ id, onCancel, onSave }: EnterpriseFormProps) {
  const isEdit = !!id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form values
  const [enterpriseName, setEnterpriseName] = useState("");
  const [creditCode, setCreditCode] = useState("");
  const [brandName, setBrandName] = useState("");
  const [jurisdiction, setJurisdiction] = useState(JURISDICTIONS[0]);
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [standardAddress, setStandardAddress] = useState("");
  const [standardAddressCode, setStandardAddressCode] = useState("");
  const [category, setCategory] = useState("一类维修");
  const [level, setLevel] = useState("AA");
  const [longitude, setLongitude] = useState("116.38");
  const [latitude, setLatitude] = useState("39.90");
  const [economicType, setEconomicType] = useState("内资");
  const [economicTypeSpecific, setEconomicTypeSpecific] = useState("国有全资");
  const [legalRep, setLegalRep] = useState("");
  const [legalRepID, setLegalRepID] = useState("");
  const [isNonMainlandLegal, setIsNonMainlandLegal] = useState(false);
  const [legalRepPhone, setLegalRepPhone] = useState("");
  const [bizPhone, setBizPhone] = useState("");
  const [principal, setPrincipal] = useState("");
  const [principalID, setPrincipalID] = useState("");
  const [isNonMainlandPrincipal, setIsNonMainlandPrincipal] = useState(false);
  const [principalPhone, setPrincipalPhone] = useState("");
  const [bizScope, setBizScope] = useState("");
  const [region, setRegion] = useState("");
  const [legalRepHomeAddr, setLegalRepHomeAddr] = useState("");
  const [principalHomeAddr, setPrincipalHomeAddr] = useState("");
  const [registeredCapital, setRegisteredCapital] = useState("");
  const [area, setArea] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [fax, setFax] = useState("");
  const [legalPersonCode, setLegalPersonCode] = useState("");
  const [securityPrincipal, setSecurityPrincipal] = useState("");
  const [managedUnit, setManagedUnit] = useState("马尾区公安局"); // 列管单位
  const [safetyFacilities, setSafetyFacilities] = useState([
    { id: '1', hasMonitor: '是', layoutMap: null, testReport: null, channels: '16', points: '12', guardRoom: 'A座302' }
  ]);
  const [safetyPolicies, setSafetyPolicies] = useState([
    { id: '1', title: '机修理业治安管理制度', desc: '规范企业日常经营及治安上报流程', uploadTime: '2026-04-20', attachment: 'policy_v1.pdf' }
  ]);
  const [recordAttachments, setRecordAttachments] = useState([
    { name: '修理业备案申请表', type: 'PDF', size: '2.4MB' },
    { name: '负责人身份证明', type: 'JPG', size: '1.2MB' },
    { name: '场所权属证明', type: 'PDF', size: '3.1MB' }
  ]);

  const [securitySupervisor, setSecuritySupervisor] = useState("");
  const [securitySupervisorPhone, setSecuritySupervisorPhone] = useState("");
  const [specialIndustryRecordNo, setSpecialIndustryRecordNo] = useState("");
  const [specialIndustryRecordAgency, setSpecialIndustryRecordAgency] = useState("");
  const [industryLicenseNo, setIndustryLicenseNo] = useState("");
  const [securityDeptPhone, setSecurityDeptPhone] = useState("");
  const [securityAgency, setSecurityAgency] = useState("");
  const [securityStaffCount, setSecurityStaffCount] = useState("");
  const [hasVideo, setHasVideo] = useState("是");
  const [hasInfoCapture, setHasInfoCapture] = useState("是");
  const [hasFireEquipment, setHasFireEquipment] = useState("是");
  const [taxAgency, setTaxAgency] = useState("");
  const [openingDate, setOpeningDate] = useState("2026-04-15");
  const [recordDate, setRecordDate] = useState("2026-04-15");
  const [notOpenOnHolidays, setNotOpenOnHolidays] = useState(true);

  const [unitLeaderName, setUnitLeaderName] = useState("");
  const [unitLeaderMobile, setUnitLeaderMobile] = useState("");
  const [unitOfficerName, setUnitOfficerName] = useState("");
  const [unitOfficerMobile, setUnitOfficerMobile] = useState("");
  const [clientModules, setClientModules] = useState<string[]>([]);
  
  // UI states
  const [showRefSearch, setShowRefSearch] = useState(false);
  const [refSearchKey, setRefSearchKey] = useState("");
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [creditCodeError, setCreditCodeError] = useState("");

  useEffect(() => {
    if (id) {
      // Simulate fetching data for the given id
      setEnterpriseName("福建众诚汽车修配服务中心");
      setCreditCode("91350102MA34N8P76A");
      setBrandName("众诚名车汽修");
      setJurisdiction("福州市-马尾区公安分局");
      setRegisteredAddress("福州市马尾区罗星街道28号");
      setStandardAddress("福州市马尾区罗星街道28号");
      setCategory("一类维修");
      setLevel("AA");
      setLegalRep("李万山");
      setLegalRepPhone("13905008899");
      setPrincipal("陈晓东");
      setPrincipalID("350102198001011234");
      setPrincipalPhone("13905008899");
      setBizPhone("0591-88888888");
      setRegion("福州市马尾区");
      setPostalCode("350001");
      setManagedUnit("福州市公安局马尾分局");
      setOpeningDate("2020-05-12");
      setRecordDate("2023-10-15");
      setTaxAgency("鼓楼区税务局");
      setSecurityAgency("五凤派出所");
      setEconomicType("内资");
      setEconomicTypeSpecific("有限责任公司");
      setLongitude("119.45");
      setLatitude("25.98");
      setArea("2500");
      setSecurityStaffCount("5");
      setHasVideo("是");
      setHasInfoCapture("是");
      setHasFireEquipment("是");
      setNotOpenOnHolidays(true);
      setSecuritySupervisor("周伟");
      setSecuritySupervisorPhone("13905001122");
      setSpecialIndustryRecordNo("BA2023001");
      setSpecialIndustryRecordAgency("马尾区公安局");
      setIndustryLicenseNo("XK-2023-888");
      setSecurityDeptPhone("0591-77777777");
      
      setSafetyFacilities([
        { id: '1', hasMonitor: '是', layoutMap: null, testReport: null, channels: '16', points: '12', guardRoom: 'A座302' },
        { id: '2', hasMonitor: '是', layoutMap: null, testReport: null, channels: '8', points: '6', guardRoom: 'B座101' }
      ]);
      
      setSafetyPolicies([
        { id: '1', title: '机修理业治安管理制度', desc: '规范企业日常经营及治安上报流程，确保维修业务实名登记及异常情况及时上报，保障公共安全。', uploadTime: '2026-04-20', attachment: 'policy_v1.pdf' }
      ]);
    }
  }, [id]);

  const handleCreditCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setCreditCode(value);
    if (value.length > 0 && value.length !== 18) {
      setCreditCodeError("社会统一信用代码必须为18位");
    } else {
      setCreditCodeError("");
    }
  };

  const fillFromApproved = (ent: any) => {
    setEnterpriseName(ent.name || "");
    setCreditCode(ent.uscc || "");
    setLegalRep(ent.legalRep || "");
    setRegion(ent.region || "");
    setRegisteredAddress(ent.contactAddress || "");
    setStandardAddress(ent.contactAddress || "");
    setJurisdiction(ent.jurisdiction || JURISDICTIONS[0]);
    setCategory(ent.category || "一类维修");
    setLevel(ent.level || "AA");
    
    // Sync contact/principal fields
    setPrincipal(ent.contactName || "");
    setPrincipalID(ent.contactID || "");
    setPrincipalPhone(ent.contactMobile || "");
    setBizPhone(ent.contactPhone || "");
    setPostalCode(ent.zipCode || "");
    
    setShowRefSearch(false);
  };

  const handleSave = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSave();
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      <div className="flex-1 overflow-auto p-3 custom-scrollbar pb-24">
        <div className="w-full space-y-4">
          
          {/* 提示信息 */}
          {!isEdit && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 shadow-sm">
              <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-sm font-bold text-blue-700">新注册向导</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  输入企业全称时可选择已备案名录进行数据回填，简化流程。
                </p>
              </div>
            </div>
          )}

          {/* 表单卡片 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex justify-between items-center">
              <h2 className="text-sm font-bold text-[#333333]">企业基本信息</h2>
              <button 
                onClick={onCancel} 
                className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
              >
                <ArrowLeft size={16} className="mr-1.5" /> 返回列表
              </button>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                
                {/* 企业名称 & 回填逻辑 */}
                <div className="flex flex-col gap-2 relative">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>公司名称 (工商全称)
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={enterpriseName}
                      onChange={(e) => setEnterpriseName(e.target.value)}
                      onFocus={() => !isEdit && setShowRefSearch(true)}
                      placeholder="请输入工商登记全称"
                      className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm transition-all" 
                    />
                    {!isEdit && (
                       <button 
                         onClick={() => setShowRefSearch(!showRefSearch)}
                         className="absolute right-3 top-2.5 text-gray-400"
                       >
                         <ChevronDown size={14} />
                       </button>
                    )}
                    {showRefSearch && !isEdit && (
                       <div className="absolute top-11 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-[60] overflow-hidden max-h-64 flex flex-col">
                          <div className="p-2 border-b border-gray-100 bg-gray-50">
                             <div className="relative">
                               <input 
                                 type="text" 
                                 autoFocus
                                 placeholder="搜索已备案企业..." 
                                 className="w-full h-8 pl-8 pr-2 text-xs border border-gray-200 rounded outline-none focus:border-[#419EFF]"
                                 value={refSearchKey}
                                 onChange={(e) => setRefSearchKey(e.target.value)}
                               />
                               <Search size={12} className="absolute left-2.5 top-2.5 text-gray-300" />
                             </div>
                          </div>
                          <div className="overflow-y-auto">
                             {APPROVED_ENTERPRISES.filter(e => e.name.includes(refSearchKey)).map(ent => (
                               <div 
                                 key={ent.id}
                                 onClick={() => fillFromApproved(ent)}
                                 className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0"
                               >
                                  <p className="text-sm font-medium text-gray-800">{ent.name}</p>
                                  <p className="text-[10px] text-gray-400 mt-1">代码：{ent.uscc} | 法人：{ent.legalRep}</p>
                               </div>
                             ))}
                          </div>
                       </div>
                    )}
                  </div>
                </div>

                {/* USCC */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>社会统一信用代码
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={creditCode}
                      onChange={handleCreditCodeChange}
                      maxLength={18}
                      placeholder="18位社会统一信用代码"
                      className={`w-full h-10 px-3 border ${creditCodeError ? 'border-red-500' : 'border-red-200'} bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm font-mono`} 
                    />
                    <div className="absolute right-3 top-3">
                       {creditCode.length === 18 && <CheckCircle2 size={16} className="text-green-500" />}
                    </div>
                  </div>
                  {creditCodeError && <p className="text-[10px] text-red-500 mt-0">{creditCodeError}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>招牌名称
                  </label>
                  <input 
                    type="text" 
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="请输入门头招牌文字"
                    className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>企业所管辖区 (公安机关)
                  </label>
                  <select 
                    value={jurisdiction}
                    onChange={(e) => setJurisdiction(e.target.value)}
                    className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded outline-none focus:border-[#419EFF] text-sm bg-white"
                  >
                    {JURISDICTIONS.map(j => <option key={j} value={j}>{j}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>注册地址
                  </label>
                  <input 
                    type="text" 
                    value={registeredAddress}
                    onChange={(e) => setRegisteredAddress(e.target.value)}
                    placeholder="请输入营业执照上的详细地址"
                    className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" 
                  />
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>标准地址名称
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={standardAddress}
                      onChange={(e) => {
                        setStandardAddress(e.target.value);
                        setShowAddressSuggestions(e.target.value.length > 2);
                      }}
                      onBlur={() => setTimeout(() => setShowAddressSuggestions(false), 200)}
                      placeholder="输入关键词自动联想标准地址"
                      className="w-full h-10 pl-3 pr-10 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" 
                    />
                    <Search size={16} className="absolute right-3 top-3 text-gray-300" />
                    
                    {showAddressSuggestions && (
                      <div className="absolute top-11 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                        {ADDRESS_SUGGESTIONS.map((addr, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => { setStandardAddress(addr); setShowAddressSuggestions(false); }}
                            className="px-4 py-2.5 text-sm hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 flex items-center gap-2"
                          >
                             <MapPin size={12} className="text-gray-400" /> {addr}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>标准地址编码
                  </label>
                  <input 
                    type="text" 
                    value={standardAddressCode}
                    onChange={(e) => setStandardAddressCode(e.target.value)}
                    placeholder="选择地址后自动填充"
                    className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm bg-gray-50 text-gray-500" 
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">企业类别</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded outline-none focus:border-[#419EFF] text-sm bg-white"
                  >
                    <option>请选择</option>
                    <option>一类维修</option>
                    <option>二类维修</option>
                    <option>三类维修</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">企业等级</label>
                  <select 
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded outline-none focus:border-[#419EFF] text-sm bg-white"
                  >
                    <option>请选择</option>
                    <option>AAA</option>
                    <option>AA</option>
                    <option>A</option>
                    <option>B</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">坐标经度</label>
                  <input 
                    type="text" 
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">坐标纬度</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      className="w-full h-10 pl-3 pr-24 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" 
                    />
                    <button className="absolute right-1 top-1 bottom-1 px-3 bg-white border border-gray-200 rounded text-xs text-gray-500 hover:bg-gray-50 flex items-center gap-1 transition-colors">
                       <MapPin size={12} /> 地图标注
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">经济类型</label>
                  <div className="flex gap-2">
                    <select 
                      value={economicType}
                      onChange={(e) => setEconomicType(e.target.value)}
                      className="flex-1 h-10 px-3 border border-gray-300 rounded outline-none focus:border-[#419EFF] text-sm bg-white"
                    >
                      <option>内资</option>
                      <option>外资</option>
                    </select>
                    <select 
                      value={economicTypeSpecific}
                      onChange={(e) => setEconomicTypeSpecific(e.target.value)}
                      className="flex-1 h-10 px-3 border border-gray-300 rounded outline-none focus:border-[#419EFF] text-sm bg-white"
                    >
                      <option>国有全资</option>
                      <option>集体全资</option>
                      <option>股份合作</option>
                      <option>联营</option>
                      <option>有限责任公司</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-12">
                   <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <span className="text-red-500 mr-1">*</span>法人代表
                    </label>
                    <input value={legalRep} onChange={(e) => setLegalRep(e.target.value)} placeholder="请输入法人代表姓名" className="h-10 px-3 border border-red-200 bg-red-50/30 rounded text-sm focus:border-[#419EFF] outline-none" />
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <span className="text-red-500 mr-1">*</span>法人证件号码
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={legalRepID}
                        onChange={(e) => setLegalRepID(e.target.value)}
                        placeholder="请输入证件号码"
                        className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" 
                      />
                      <label className="absolute right-0 -bottom-6 flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={isNonMainlandLegal} 
                          onChange={(e) => setIsNonMainlandLegal(e.target.checked)} 
                          className="rounded border-gray-300"
                        /> 非大陆证件
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>法人代表电话
                  </label>
                  <input value={legalRepPhone} onChange={(e) => setLegalRepPhone(e.target.value)} placeholder="请输入法人手机号" className="h-10 px-3 border border-red-200 bg-red-50/30 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <label className="text-sm font-medium text-gray-700 flex items-center">单位电话</label>
                  <input value={bizPhone} onChange={(e) => setBizPhone(e.target.value)} placeholder="请输入办公电话" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>负责人
                  </label>
                  <input value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="请输入负责人姓名" className="h-10 px-3 border border-red-200 bg-red-50/30 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>负责人证件号码
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={principalID}
                      onChange={(e) => setPrincipalID(e.target.value)}
                      placeholder="请输入负责人证件号码"
                      className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" 
                    />
                    <label className="absolute right-0 -bottom-6 flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isNonMainlandPrincipal} 
                        onChange={(e) => setIsNonMainlandPrincipal(e.target.checked)} 
                        className="rounded border-gray-300"
                      /> 非大陆证件
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>负责人电话
                  </label>
                  <input value={principalPhone} onChange={(e) => setPrincipalPhone(e.target.value)} placeholder="请输入负责人手机号" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <label className="text-sm font-medium text-gray-700 flex items-center">经营范围</label>
                  <input value={bizScope} onChange={(e) => setBizScope(e.target.value)} placeholder="如：二类汽车维修（含烤漆、钣金）" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">法人现住地址</label>
                  <input value={legalRepHomeAddr} onChange={(e) => setLegalRepHomeAddr(e.target.value)} placeholder="请输入法人目前居住地址" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">负责人现住地址</label>
                  <input value={principalHomeAddr} onChange={(e) => setPrincipalHomeAddr(e.target.value)} placeholder="请输入负责人目前居住地址" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                <div className="flex flex-col gap-4">
                   <label className="text-sm font-medium text-gray-700">法人照片</label>
                   <div className="w-32 h-40 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-[#419EFF] transition-colors cursor-pointer bg-gray-50/50">
                      <ImageIcon size={32} />
                      <span className="text-[10px] mt-2">点击上传或拖拽</span>
                   </div>
                </div>

                <div className="flex flex-col gap-4">
                   <label className="text-sm font-medium text-gray-700">负责人照片</label>
                   <div className="w-32 h-40 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-[#419EFF] transition-colors cursor-pointer bg-gray-50/50">
                      <ImageIcon size={32} />
                      <span className="text-[10px] mt-2">点击上传或拖拽</span>
                   </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">注册资金(万元)</label>
                  <input value={registeredCapital} onChange={(e) => setRegisteredCapital(e.target.value)} placeholder="请输入注册资金" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">占地面积(平方米)</label>
                  <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="请输入企业营业面积" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">邮政编码</label>
                  <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="请输入邮政编码" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">传真</label>
                  <input value={fax} onChange={(e) => setFax(e.target.value)} placeholder="请输入企业传真" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">法人代码</label>
                  <input value={legalPersonCode} onChange={(e) => setLegalPersonCode(e.target.value)} placeholder="请输入法人代码" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">治安负责人</label>
                  <input value={securityPrincipal} onChange={(e) => setSecurityPrincipal(e.target.value)} placeholder="请输入治安负责人姓名" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>
              </div>

              {/* 备案信息板块 (只展示) */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-1 h-4 bg-[#419EFF] mr-2 rounded-sm"></div>
                  备案信息附件
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recordAttachments.map((file, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-lg group hover:border-[#419EFF] transition-colors">
                      <div className="w-10 h-10 bg-white border border-gray-100 rounded flex items-center justify-center text-[#419EFF] mr-3 shadow-sm">
                        <ImageIcon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-700 truncate">{file.name}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{file.type} • {file.size}</p>
                      </div>
                      <button className="text-[10px] text-[#419EFF] font-medium opacity-0 group-hover:opacity-100 transition-opacity">查看</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 保卫负责人及特行管理 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc]">
              <h2 className="text-sm font-bold text-[#333333]">保卫负责人及特行管理</h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">保卫负责人姓名</label>
                  <input value={securitySupervisor} onChange={(e) => setSecuritySupervisor(e.target.value)} placeholder="请输入姓名" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">保卫负责人电话</label>
                  <input value={securitySupervisorPhone} onChange={(e) => setSecuritySupervisorPhone(e.target.value)} placeholder="请输入联系电话" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">特行备案编号</label>
                  <input value={specialIndustryRecordNo} onChange={(e) => setSpecialIndustryRecordNo(e.target.value)} placeholder="请输入备案编号" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">特行备案机构</label>
                  <input value={specialIndustryRecordAgency} onChange={(e) => setSpecialIndustryRecordAgency(e.target.value)} placeholder="请输入办件备案机构" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">行业许可证编号</label>
                  <input value={industryLicenseNo} onChange={(e) => setIndustryLicenseNo(e.target.value)} placeholder="请输入行业许可证号" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">保卫部电话</label>
                  <input value={securityDeptPhone} onChange={(e) => setSecurityDeptPhone(e.target.value)} placeholder="请输入保卫部门电话" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">治安管理机构</label>
                  <input value={securityAgency} onChange={(e) => setSecurityAgency(e.target.value)} placeholder="辖区派出所等" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">保卫人员数量</label>
                  <input type="number" value={securityStaffCount} onChange={(e) => setSecurityStaffCount(e.target.value)} placeholder="请输入数量" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>

                <div className="flex flex-col md:col-span-2 py-4 bg-gray-50/50 rounded-lg border border-dashed border-gray-200 p-4">
                   <div className="flex flex-wrap gap-8 items-center">
                      <div className="flex items-center gap-2">
                         <span className="text-sm text-gray-600">视频设备</span>
                         <select value={hasVideo} onChange={e => setHasVideo(e.target.value)} className="h-8 border border-gray-300 rounded bg-white text-xs px-1">
                            <option>是</option>
                            <option>否</option>
                         </select>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="text-sm text-gray-600">信息采集</span>
                         <select value={hasInfoCapture} onChange={e => setHasInfoCapture(e.target.value)} className="h-8 border border-gray-300 rounded bg-white text-xs px-1">
                            <option>是</option>
                            <option>否</option>
                         </select>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="text-sm text-gray-600">消防设备</span>
                         <select value={hasFireEquipment} onChange={e => setHasFireEquipment(e.target.value)} className="h-8 border border-gray-300 rounded bg-white text-xs px-1">
                            <option>是</option>
                            <option>否</option>
                         </select>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">税务登记证发证机构</label>
                  <input value={taxAgency} onChange={(e) => setTaxAgency(e.target.value)} placeholder="请输入登记机构全称" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">开业日期</label>
                  <div className="relative">
                     <input type="date" value={openingDate} onChange={(e) => setOpeningDate(e.target.value)} className="w-full h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">登记日期</label>
                  <div className="relative md:col-span-1">
                     <input type="date" value={recordDate} onChange={(e) => setRecordDate(e.target.value)} className="w-full h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-1">
                   <label className="text-sm font-medium text-gray-700">是否法定假日不营业</label>
                   <div className="flex items-center gap-6 h-10">
                      <label className="flex items-center gap-2 cursor-pointer">
                         <input type="radio" checked={notOpenOnHolidays} onChange={() => setNotOpenOnHolidays(true)} className="w-4 h-4 text-[#419EFF]" />
                         <span className="text-sm">是</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                         <input type="radio" checked={!notOpenOnHolidays} onChange={() => setNotOpenOnHolidays(false)} className="w-4 h-4 text-[#419EFF]" />
                         <span className="text-sm">否</span>
                      </label>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* 安全设施信息 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#333333]">安全设施信息</h2>
              <button 
                onClick={() => setSafetyFacilities([...safetyFacilities, { id: Date.now().toString(), hasMonitor: '是', layoutMap: null, testReport: null, channels: '', points: '', guardRoom: '' }])}
                type="button"
                className="text-xs text-[#419EFF] hover:underline px-2 py-1 bg-white border border-blue-100 rounded"
              >
                + 添加设施
              </button>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {safetyFacilities.map((facility, idx) => (
                  <div key={facility.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50/30 relative group">
                    {safetyFacilities.length > 1 && (
                      <button 
                        onClick={() => setSafetyFacilities(safetyFacilities.filter(f => f.id !== facility.id))}
                        type="button"
                        className="absolute -right-2 -top-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                      >
                        <XCircle size={14} />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-500">是否监控设备</label>
                        <select value={facility.hasMonitor} onChange={(e) => {
                          const newFacs = [...safetyFacilities];
                          newFacs[idx].hasMonitor = e.target.value;
                          setSafetyFacilities(newFacs);
                        }} className="h-9 border border-gray-300 rounded text-xs bg-white">
                          <option>是</option>
                          <option>否</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-500">安检设备安装部位平面图</label>
                        <div className="h-9 px-3 border border-gray-300 rounded bg-white flex items-center justify-between cursor-pointer hover:border-[#419EFF]">
                          <span className="text-xs text-gray-400">点击上传文件</span>
                          <ImageIcon size={14} className="text-gray-300" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-500">检测验收报告</label>
                        <div className="h-9 px-3 border border-gray-300 rounded bg-white flex items-center justify-between cursor-pointer hover:border-[#419EFF]">
                          <span className="text-xs text-gray-400">点击上传文件</span>
                          <ImageIcon size={14} className="text-gray-300" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-500">视频监控路数</label>
                        <input type="text" value={facility.channels} onChange={(e) => {
                          const newFacs = [...safetyFacilities];
                          newFacs[idx].channels = e.target.value;
                          setSafetyFacilities(newFacs);
                        }} className="h-9 px-3 border border-gray-300 rounded text-xs" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-500">点位</label>
                        <input type="text" value={facility.points} onChange={(e) => {
                          const newFacs = [...safetyFacilities];
                          newFacs[idx].points = e.target.value;
                          setSafetyFacilities(newFacs);
                        }} className="h-9 px-3 border border-gray-300 rounded text-xs" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-500">监控室</label>
                        <input type="text" value={facility.guardRoom} onChange={(e) => {
                          const newFacs = [...safetyFacilities];
                          newFacs[idx].guardRoom = e.target.value;
                          setSafetyFacilities(newFacs);
                        }} className="h-9 px-3 border border-gray-300 rounded text-xs" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 安全制度信息 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#333333]">安全制度信息</h2>
              <button 
                onClick={() => setSafetyPolicies([...safetyPolicies, { id: Date.now().toString(), title: '', desc: '', uploadTime: new Date().toISOString().split('T')[0], attachment: null }])}
                type="button"
                className="text-xs text-[#419EFF] hover:underline px-2 py-1 bg-white border border-blue-100 rounded"
              >
                + 添加制度
              </button>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {safetyPolicies.map((policy, idx) => (
                  <div key={policy.id} className="p-5 border border-gray-200 rounded-lg bg-white relative group shadow-sm">
                    {safetyPolicies.length > 1 && (
                      <button 
                        onClick={() => setSafetyPolicies(safetyPolicies.filter(p => p.id !== policy.id))}
                        type="button"
                        className="absolute -right-2 -top-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                      >
                        <XCircle size={14} />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-500">制度标题</label>
                        <input type="text" value={policy.title} onChange={(e) => {
                          const newPols = [...safetyPolicies];
                          newPols[idx].title = e.target.value;
                          setSafetyPolicies(newPols);
                        }} className="h-9 px-3 border border-gray-300 rounded text-xs" placeholder="请输入制度名称" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-500">上传附件</label>
                        <div className="h-9 px-3 border border-gray-300 rounded flex items-center justify-between cursor-pointer hover:border-[#419EFF]">
                          <span className="text-xs text-gray-400">{policy.attachment || '选择文件上传'}</span>
                          <ImageIcon size={14} className="text-gray-300" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-medium text-gray-500">制度描述说明</label>
                        <textarea 
                          value={policy.desc} 
                          onChange={(e) => {
                            const newPols = [...safetyPolicies];
                            newPols[idx].desc = e.target.value;
                            setSafetyPolicies(newPols);
                          }}
                          className="p-3 border border-gray-300 rounded text-xs h-20 resize-none outline-none focus:border-[#419EFF]" 
                          placeholder="请简要描述该管理制度的内容..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 列管单位信息 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center gap-2">
              <ShieldCheck size={16} className="text-gray-500" />
              <h2 className="text-sm font-bold text-[#333333]">列管单位信息</h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">列管单位</label>
                  <input value={managedUnit} onChange={(e) => setManagedUnit(e.target.value)} placeholder="请输入列管单位" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">列管单位负责人姓名</label>
                  <input value={unitLeaderName} onChange={(e) => setUnitLeaderName(e.target.value)} placeholder="请输入负责人姓名" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">列管单位负责人手机</label>
                  <input value={unitLeaderMobile} onChange={(e) => setUnitLeaderMobile(e.target.value)} placeholder="请输入联系方式" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">列管民警姓名</label>
                  <input value={unitOfficerName} onChange={(e) => setUnitOfficerName(e.target.value)} placeholder="请输入民警姓名" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">列管民警手机</label>
                  <input value={unitOfficerMobile} onChange={(e) => setUnitOfficerMobile(e.target.value)} placeholder="请输入联系方式" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
              </div>
            </div>
          </div>

          {/* 安装及运行信息 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center gap-2">
              <Settings size={16} className="text-gray-500" />
              <h2 className="text-sm font-bold text-[#333333]">安装及运行信息</h2>
            </div>
            <div className="p-8">
              <div className="flex flex-col gap-4">
                <label className="text-sm font-medium text-gray-700">客户端已开通功能模块</label>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-wrap gap-x-8 gap-y-4">
                  {['配件', '美容', '停放', '交易', '回收', '汽车租赁', '维修', '其他'].map(mod => (
                    <label key={mod} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={clientModules.includes(mod)}
                        onChange={(e) => {
                          if (e.target.checked) setClientModules([...clientModules, mod]);
                          else setClientModules(clientModules.filter(m => m !== mod));
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-[#419EFF] focus:ring-[#419EFF]" 
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{mod}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部按钮栏 */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-end shadow-md z-20">
        <div className="flex gap-4">
          <button onClick={onCancel} className="px-6 py-2 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 text-sm font-medium transition-colors">取消退出</button>
          <button 
             onClick={handleSave}
             disabled={isSubmitting}
             className="px-8 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 text-sm font-medium shadow-sm transition-all flex items-center gap-2"
          >
             {isSubmitting ? '正在处理...' : <><Save size={16}/> 保存企业资料</>}
          </button>
        </div>
      </div>
      
      {/* 蒙层处理回填展示时可能的关闭 */}
      {showRefSearch && <div className="fixed inset-0 z-50" onClick={() => setShowRefSearch(false)}></div>}
    </div>
  );
}
