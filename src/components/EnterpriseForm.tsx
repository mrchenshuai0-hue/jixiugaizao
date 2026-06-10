import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { ArrowLeft, Save, MapPin, AlertCircle, Search, Image as ImageIcon, CheckCircle2, XCircle, ShieldCheck, Settings, Info, ChevronDown, Plus, Trash2, FileText, Eye, Upload, CloudDownload, History, ChevronLeft, ChevronRight } from 'lucide-react';
import FloatingFormNavigation from './FloatingFormNavigation';

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
    level: 'AA',
    attachments: [
      { name: '法定代表人、主要负责人或经营者的有效身份证件（李万山）.jpg', type: 'JPG', size: '1.2MB' },
      { name: '营业执照（福建众诚）.pdf', type: 'PDF', size: '3.1MB' }
    ]
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
    level: 'A',
    attachments: [
      { name: '法定代表人、主要负责人或经营者的有效身份证件（张一航）.jpg', type: 'JPG', size: '1.5MB' },
      { name: '营业执照（厦门速捷）.pdf', type: 'PDF', size: '2.8MB' }
    ]
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

const ALL_HISTORY_LOGS = [
  {
    id: 'h1',
    time: '2026-05-15 14:30:22',
    operator: '高警官 (警号 35010214)',
    source: '民警修改',
    changes: [
      { field: '治安保卫负责人', before: '陈维', after: '周伟' },
      { field: '负责人联系电话', before: '13812345678', after: '13905001122' },
      { field: '保安服务合同本级附件', before: '未填报合同附件', after: '已上传并关联 “保安服务聘用合同_众诚.pdf”' }
    ]
  },
  {
    id: 'h2',
    time: '2025-11-02 11:15:40',
    operator: '系统管理员 (SYSTEM)',
    source: '其他',
    changes: [
      { field: '企业地理坐标 (GPS)', before: '经度: 119.27, 纬度: 25.98', after: '经度: 119.273188, 纬度: 26.104277' },
      { field: '一标三实标准网格匹配地址', before: '福建省福州市马尾区', after: '福建省福州市马尾区罗星街道28号' }
    ]
  },
  {
    id: 'h3',
    time: '2025-04-10 09:20:15',
    operator: '李万山 (企业主要负责人)',
    source: '企业端上报',
    changes: [
      { field: '从业人员代表', before: '张林', after: '王铁锤' },
      { field: '从业人员代表电话', before: '13500135002', after: '13600136001' },
      { field: '经营范围业务', before: '一类机动车修理', after: '机动车修理, 配件销售' }
    ]
  },
  {
    id: 'h4',
    time: '2026-03-22 10:05:00',
    operator: '高警官 (警号 35010214)',
    source: '民警修改',
    changes: [
      { field: '特种设备配备类型', before: '双录行车记录仪', after: '警用联网巡逻仪' },
      { field: '视频安全监督等级', before: '三级', after: '二级' }
    ]
  },
  {
    id: 'h5',
    time: '2026-01-18 16:40:12',
    operator: '李万山 (企业主要负责人)',
    source: '企业端上报',
    changes: [
      { field: '消防自审等级分值', before: '85分', after: '92分' }
    ]
  },
  {
    id: 'h6',
    time: '2025-08-05 09:00:00',
    operator: '治安自动级联匹配机制',
    source: '其他',
    changes: [
      { field: '企业物防设施数量', before: '8处', after: '12处' }
    ]
  }
];

interface EnterpriseFormProps {
  id: string | null;
  onCancel: () => void;
  onSave: () => void;
}

export default function EnterpriseForm({ id, onCancel, onSave }: EnterpriseFormProps) {
  const isEdit = !!id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'enterprise-basics', label: '企业基本信息' },
    { id: 'enterprise-security', label: '人防物防技防建设' },
    { id: 'enterprise-supervision', label: '列管单位信息' },
    { id: 'enterprise-attachments', label: '备案信息附件' }
  ];
  
  // Form values
  const [enterpriseName, setEnterpriseName] = useState("");
  const [creditCode, setCreditCode] = useState("");
  const [brandName, setBrandName] = useState("");
  const [jurisdiction, setJurisdiction] = useState(JURISDICTIONS[0]);
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [standardAddress, setStandardAddress] = useState("");
  const [standardAddressCode, setStandardAddressCode] = useState("");
  const [category, setCategory] = useState("一类维修");
  const [level, setLevel] = useState("一类");
  const [longitude, setLongitude] = useState("116.38");
  const [latitude, setLatitude] = useState("39.90");
  const [isEditingCoords, setIsEditingCoords] = useState(false);
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
  const [securityPrincipalID, setSecurityPrincipalID] = useState("");
  const [securityPrincipalPhone, setSecurityPrincipalPhone] = useState("");
  const [isNonMainlandSecurity, setIsNonMainlandSecurity] = useState(false);
  const [riskCreditLevel, setRiskCreditLevel] = useState("A级");
  const [licenseAuthority, setLicenseAuthority] = useState("");
  const [taxRegNo, setTaxRegNo] = useState("");
  const [taxRegAuthority, setTaxRegAuthority] = useState("");
  const [enterprisePoints, setEnterprisePoints] = useState(0);
  const [enterpriseStatus, setEnterpriseStatus] = useState("正常营业");
  const [managedUnit, setManagedUnit] = useState("马尾区公安局"); // 列管单位
  const [safetyFacilities, setSafetyFacilities] = useState([
    { id: '1', hasMonitor: '是', layoutMap: null, testReport: null, channels: '16', points: '12', guardRoom: 'A座302' }
  ]);
  const [safetyPolicies, setSafetyPolicies] = useState([
    { id: '1', title: '机修理业治安管理制度', desc: '规范企业日常经营及治安上报流程', uploadTime: '2026-04-20', attachment: 'policy_v1.pdf' }
  ]);
  const [selfProvidedMaterials, setSelfProvidedMaterials] = useState([
    {
      id: 'roster',
      name: '从业人员花名册 (应注明场所管理人员、治安保卫人员配备情况)',
      count: 1,
      required: true,
      method: '电子材料',
      fileName: isEdit ? '从业人员花名册_众诚汽修.xlsx' : null,
      fileSize: '1.4MB',
      status: isEdit ? '已提交' : '未提交'
    },
    {
      id: 'layout',
      name: '经营场所平面图',
      count: 1,
      required: true,
      method: '电子材料',
      fileName: isEdit ? '经营场所平面布置图_已审.png' : null,
      fileSize: '2.5MB',
      status: isEdit ? '已提交' : '未提交'
    },
    {
      id: 'equipment',
      name: '安装、配备与治安管理信息系统要求相适应的采集、上传设施设备的说明材料',
      count: 1,
      required: true,
      method: '电子材料',
      fileName: isEdit ? '采集设备说明及联网协议.pdf' : null,
      fileSize: '1.8MB',
      status: isEdit ? '已提交' : '未提交'
    }
  ]);

  const [sharedMaterials, setSharedMaterials] = useState([
    {
      id: 'idcard',
      name: '法定代表人、主要负责人或经营者的有效身份证件',
      source: '政府核发',
      fileName: isEdit ? '身份证电子证照_李万山.pdf' : null,
      status: '免提交 (自动获取)'
    },
    {
      id: 'biz_license',
      name: '营业执照',
      source: '政府核发',
      fileName: isEdit ? '营业执照电子证照_众诚.pdf' : null,
      status: '免提交 (自动获取)'
    }
  ]);

  const [securitySupervisor, setSecuritySupervisor] = useState("");
  const [securitySupervisorPhone, setSecuritySupervisorPhone] = useState("");
  const [specialIndustryRecordNo, setSpecialIndustryRecordNo] = useState("");
  const [specialIndustryRecordAgency, setSpecialIndustryRecordAgency] = useState("");
  const [industryLicenseNo, setIndustryLicenseNo] = useState("");
  const [industryLicenseAuthority, setIndustryLicenseAuthority] = useState("");
  const [securityDeptPhone, setSecurityDeptPhone] = useState("");
  const [securityAgency, setSecurityAgency] = useState("");
  const [securityStaffCount, setSecurityStaffCount] = useState("");
  
  // 新增的人防、物防、技防字段状态
  const [certifiedGuardsCount, setCertifiedGuardsCount] = useState("");
  const [employeeRepresentative, setEmployeeRepresentative] = useState("");
  const [employeeRepPhone, setEmployeeRepPhone] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");

  const [physicalDefenses, setPhysicalDefenses] = useState([
    { id: '1', category: '防盗门窗', location: '出入口', quantity: '10' },
    { id: '2', category: '隔离栏', location: '通道', quantity: '15' }
  ]);

  const [technicalDefenses, setTechnicalDefenses] = useState([
    { id: '1', category: '视频监控', location: '出入口', quantity: '12' },
    { id: '2', category: '一键报警', location: '机房', quantity: '2' }
  ]);

  const [hasVideo, setHasVideo] = useState("是");
  const [hasInfoCapture, setHasInfoCapture] = useState("是");
  const [hasFireEquipment, setHasFireEquipment] = useState("是");
  const [taxAgency, setTaxAgency] = useState("");
  const [openingDate, setOpeningDate] = useState("2026-04-15");
  const [recordDate, setRecordDate] = useState("2026-04-15");
  const [notOpenOnHolidays, setNotOpenOnHolidays] = useState(true);

  const [unitLeaderName, setUnitLeaderName] = useState("");
  const [unitLeaderMobile, setUnitLeaderMobile] = useState("");
  const [unitLeaderBadge, setUnitLeaderBadge] = useState("");
  const [unitOfficerName, setUnitOfficerName] = useState("");
  const [unitOfficerMobile, setUnitOfficerMobile] = useState("");
  const [unitOfficerBadge, setUnitOfficerBadge] = useState("");
  const [clientModules, setClientModules] = useState<string[]>([]);

  // States for Security Service Contract and Modification Log
  const [securityContractName, setSecurityContractName] = useState<string | null>(isEdit ? "保安服务聘用合同_众诚.pdf" : null);
  const [showContractModal, setShowContractModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyStartDate, setHistoryStartDate] = useState('');
  const [historyEndDate, setHistoryEndDate] = useState('');
  const [historySource, setHistorySource] = useState('all');
  const [historyPage, setHistoryPage] = useState(1);
  const historyItemsPerPage = 2;

  // 一标三实回填信息数据库 (按管辖单位分)
  const STANDARDIZED_POLICE_DATA: Record<string, {
    managedUnit: string;
    unitLeaderName: string;
    unitLeaderMobile: string;
    unitLeaderBadge: string;
    unitOfficerName: string;
    unitOfficerMobile: string;
    unitOfficerBadge: string;
  }> = {
    "福州市-福州市公安局": {
      managedUnit: "福州市公安局直属治安支队",
      unitLeaderName: "王治安",
      unitLeaderMobile: "13905001111",
      unitLeaderBadge: "FJ00101",
      unitOfficerName: "林警官",
      unitOfficerMobile: "13500135000",
      unitOfficerBadge: "FJ00123"
    },
    "福州市-马尾区公安分局": {
      managedUnit: "马尾区公安分局治安大队",
      unitLeaderName: "李成名",
      unitLeaderMobile: "13905005678",
      unitLeaderBadge: "FJ02002",
      unitOfficerName: "高警官",
      unitOfficerMobile: "13805002222",
      unitOfficerBadge: "FJ02145"
    },
    "福州市-鼓楼区公安分局": {
      managedUnit: "鼓楼区公安分局特行科",
      unitLeaderName: "张治安",
      unitLeaderMobile: "13705003333",
      unitLeaderBadge: "FJ03003",
      unitOfficerName: "刘警官",
      unitOfficerMobile: "13605004444",
      unitOfficerBadge: "FJ03521"
    },
    "福州市-台江区公安分局": {
      managedUnit: "台江区公安分局治安大队",
      unitLeaderName: "赵治安",
      unitLeaderMobile: "13505005555",
      unitLeaderBadge: "FJ04004",
      unitOfficerName: "陈警官",
      unitOfficerMobile: "13405006666",
      unitOfficerBadge: "FJ04478"
    },
    "厦门市-厦门市公安局": {
      managedUnit: "厦门市局内保特行支队",
      unitLeaderName: "许建国",
      unitLeaderMobile: "13905921111",
      unitLeaderBadge: "XM00101",
      unitOfficerName: "张警官",
      unitOfficerMobile: "13805922222",
      unitOfficerBadge: "XM00541"
    },
    "厦门市-思明区公安分局": {
      managedUnit: "思明区公安分局治安科",
      unitLeaderName: "黄思明",
      unitLeaderMobile: "13705923333",
      unitLeaderBadge: "XM01001",
      unitOfficerName: "叶警官",
      unitOfficerMobile: "13605924444",
      unitOfficerBadge: "XM01258"
    }
  };

  // 根据管辖单位的变化，按一标三实自动回填信息，无需手动添加但仍可编辑
  useEffect(() => {
    if (jurisdiction) {
      const data = STANDARDIZED_POLICE_DATA[jurisdiction];
      if (data) {
        setManagedUnit(data.managedUnit);
        setUnitLeaderName(data.unitLeaderName);
        setUnitLeaderMobile(data.unitLeaderMobile);
        setUnitLeaderBadge(data.unitLeaderBadge);
        setUnitOfficerName(data.unitOfficerName);
        setUnitOfficerMobile(data.unitOfficerMobile);
        setUnitOfficerBadge(data.unitOfficerBadge);
      }
    }
  }, [jurisdiction]);

  // 当经营地址输入后，自动回填辖区及民警等列管信息
  useEffect(() => {
    const addr = (standardAddress || "").trim();
    if (!addr) return;
    
    let detectedJurisdiction = "";
    if (addr.includes("马尾")) {
      detectedJurisdiction = "福州市-马尾区公安分局";
    } else if (addr.includes("鼓楼")) {
      detectedJurisdiction = "福州市-鼓楼区公安分局";
    } else if (addr.includes("台江")) {
      detectedJurisdiction = "福州市-台江区公安分局";
    } else if (addr.includes("思明")) {
      detectedJurisdiction = "厦门市-思明区公安分局";
    } else if (addr.includes("福州")) {
      detectedJurisdiction = "福州市-福州市公安局";
    } else if (addr.includes("厦门")) {
      detectedJurisdiction = "厦门市-厦门市公安局";
    } else {
      detectedJurisdiction = "福州市-马尾区公安分局";
    }
    
    if (detectedJurisdiction) {
      setJurisdiction(detectedJurisdiction);
      const data = STANDARDIZED_POLICE_DATA[detectedJurisdiction];
      if (data) {
        setManagedUnit(data.managedUnit);
        setUnitLeaderName(data.unitLeaderName);
        setUnitLeaderMobile(data.unitLeaderMobile);
        setUnitLeaderBadge(data.unitLeaderBadge);
        setUnitOfficerName(data.unitOfficerName);
        setUnitOfficerMobile(data.unitOfficerMobile);
        setUnitOfficerBadge(data.unitOfficerBadge);
        setAddressToast(`经营地址已自动关联管辖及辖区民警信息：【${data.managedUnit}】民警：${data.unitOfficerName} (警号:${data.unitOfficerBadge})`);
        setTimeout(() => setAddressToast(null), 5000);
      }
    }
  }, [standardAddress]);
  
  // UI states
  const [showRefSearch, setShowRefSearch] = useState(false);
  const [refSearchKey, setRefSearchKey] = useState("");
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [creditCodeError, setCreditCodeError] = useState("");

  // 新增：引用备案信息弹窗和地址民警获取关联状态
  const [showImportModal, setShowImportModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState<string | null>(null);
  const [addressToast, setAddressToast] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const ent = await api.enterprise.getById(id);
          if (ent) {
            setEnterpriseName(ent.name || "");
            setCreditCode(ent.uscc || "");
            setBrandName(ent.brandName || "众诚名车汽修");
            setJurisdiction(ent.jurisdiction || JURISDICTIONS[0]);
            setRegisteredAddress(ent.registeredAddress || ent.address || "");
            setStandardAddress(ent.standardAddress || ent.address || "");
            setCategory(ent.category || "一类维修");
            setLevel(ent.level || "一类");
            setLegalRep(ent.legalRep || "");
            setLegalRepPhone(ent.legalRepPhone || "");
            setLegalRepID(ent.legalRepId || ent.legalRepID || "350102198001011234");
            setSecurityPrincipal(ent.securityPrincipal || ent.securityManager || "赵六");
            setSecurityPrincipalID(ent.securityPrincipalID || ent.securityPrincipalId || ent.securityManagerId || "350102198501011211");
            setSecurityPrincipalPhone(ent.securityPrincipalPhone || ent.securityManagerPhone || "13700137000");
            setPrincipal(ent.principal || ent.securityPrincipal || "陈晓东");
            setPrincipalID(ent.principalID || ent.securityPrincipalID || "350102198001011234");
            setPrincipalPhone(ent.principalPhone || ent.securityPrincipalPhone || "13905008899");
            setBizPhone(ent.bizPhone || ent.companyPhone || "0591-88888888");
            setRegion(ent.region || "福州市马尾区");
            setPostalCode(ent.postalCode || "350001");
            setManagedUnit(ent.managedUnit || "福州市局治安支队");
            setOpeningDate(ent.openingDate || "2020-05-12");
            setRecordDate(ent.registerDate || ent.registrationDate || "2023-10-15");
            setTaxAgency(ent.taxAgency || "鼓楼区税务局");
            setSecurityAgency(ent.securityAgency || "五凤派出所");
            setEconomicType(ent.economicType || "内资");
            setEconomicTypeSpecific(ent.economicTypeSpecific || "有限责任公司");
            setLongitude(ent.longitude || "119.45");
            setLatitude(ent.latitude || "25.98");
            setArea(ent.area || ent.buildingArea || "2500");
            setRegisteredCapital(ent.registeredCapital || "500");
            setEnterpriseStatus(ent.status || ent.enterpriseStatus || "正常营业");
            setBizScope(ent.bizScope || "机动车修理, 配件销售");
            setSecurityStaffCount(ent.protectionStaffCount || ent.securityStaffCount || "5");
            setCertifiedGuardsCount(ent.certifiedGuardsCount || "3");
            setHasVideo(ent.videoDevice || ent.hasVideo || "是");
            setHasInfoCapture(ent.dataCollection || ent.hasInfoCapture || "是");
            setHasFireEquipment(ent.fireDevice || ent.hasFireEquipment || "是");
            setNotOpenOnHolidays(ent.holidayClosed === '是' || true);
            setSecuritySupervisor(ent.securitySupervisor || "周伟");
            setSecuritySupervisorPhone(ent.securitySupervisorPhone || "13905001122");
            setSpecialIndustryRecordNo(ent.specialRecordNo || ent.specialIndustryRecordNo || "BA2023001");
            setSpecialIndustryRecordAgency(ent.specialRecordAgency || ent.specialIndustryRecordAgency || "马尾区公安局");
            setIndustryLicenseNo(ent.industryLicenseNo || "XK-2023-888");
            setSecurityDeptPhone(ent.protectionDeptPhone || ent.securityDeptPhone || "0591-77777777");
            setEmployeeCount(ent.employeeCount ? ent.employeeCount.toString() : "24");
            setEmployeeRepresentative(ent.employeeRepresentative || "王铁锤");
            setEmployeeRepPhone(ent.employeeRepPhone || "13600136001");
            setSecurityAgency(ent.securityAgency || "福建省中安保安服务有限公司");
            setSecurityContractName(ent.securityContractName || "保安服务聘用合同_众诚.pdf");
            if (ent.physicalDefenses) setPhysicalDefenses(ent.physicalDefenses);
            if (ent.technicalDefenses) setTechnicalDefenses(ent.technicalDefenses);
            setUnitLeaderName(ent.unitLeaderName || "李成名");
            setUnitLeaderMobile(ent.unitLeaderMobile || "13905005678");
            setUnitLeaderBadge(ent.unitLeaderBadge || "FJ02002");
            setUnitOfficerName(ent.adminPolice || "高警官");
            setUnitOfficerMobile(ent.adminPolicePhone || "13805002222");
            setUnitOfficerBadge("FJ02145");
          }
        } catch (error) {
          console.error("Failed to fetch enterprise for form filling:", error);
        }
      };
      
      fetchData();
      
      setPhysicalDefenses([
        { id: '1', category: '防盗门窗', location: '出入口', quantity: '10' },
        { id: '2', category: '隔离栏', location: '通道', quantity: '15' }
      ]);
      setTechnicalDefenses([
        { id: '1', category: '视频监控', location: '出入口', quantity: '12' },
        { id: '2', category: '一键报警', location: '机房', quantity: '2' }
      ]);
      
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
    setLevel(ent.level || "一类");
    
    // Sync contact/principal fields
    setPrincipal(ent.contactName || "");
    setPrincipalID(ent.contactID || "");
    setPrincipalPhone(ent.contactMobile || "");
    setBizPhone(ent.contactPhone || "");
    setPostalCode(ent.zipCode || "");
    
    // Fill in materials and set submitted state
    setSelfProvidedMaterials([
      {
        id: 'roster',
        name: '从业人员花名册 (应注明场所管理人员、治安保卫人员配备情况)',
        count: 1,
        required: true,
        method: '电子材料',
        fileName: `从业人员花名册_${ent.name || '已填'}.xlsx`,
        fileSize: '1.4MB',
        status: '已提交'
      },
      {
        id: 'layout',
        name: '经营场所平面图',
        count: 1,
        required: true,
        method: '电子材料',
        fileName: `经营场所平面布置图_${ent.name || '已填'}.png`,
        fileSize: '2.5MB',
        status: '已提交'
      },
      {
        id: 'equipment',
        name: '安装、配备与治安管理信息系统要求相适应的采集、上传设施设备的说明材料',
        count: 1,
        required: true,
        method: '电子材料',
        fileName: `采集设备说明及联网协议_${ent.name || '已填'}.pdf`,
        fileSize: '1.8MB',
        status: '已提交'
      }
    ]);

    setSharedMaterials([
      {
        id: 'idcard',
        name: '法定代表人、主要负责人或经营者的有效身份证件',
        source: '政府核发',
        fileName: `身份证电子证照_${ent.legalRep || '已拉取'}.pdf`,
        status: '免提交 (自动获取)'
      },
      {
        id: 'biz_license',
        name: '营业执照',
        source: '政府核发',
        fileName: `营业执照电子证照_${ent.name || '已拉取'}.pdf`,
        status: '免提交 (自动获取)'
      }
    ]);
    
    setShowRefSearch(false);
  };

  const handleImportConfirm = () => {
    if (selectedEnterpriseId) {
      const selected = APPROVED_ENTERPRISES.find(e => e.id === selectedEnterpriseId);
      if (selected) {
        fillFromApproved(selected);
        setShowImportModal(false);
        setSelectedEnterpriseId(null);
      }
    }
  };



  const filteredEnterprises = APPROVED_ENTERPRISES.filter(ent => 
    ent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ent.uscc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 物防、技防动态增删改助手函数
  const addPhysicalDefense = () => {
    setPhysicalDefenses([...physicalDefenses, { id: Date.now().toString(), category: '围墙围挡', location: '楼栋', quantity: '1' }]);
  };
  const removePhysicalDefense = (id: string) => {
    setPhysicalDefenses(physicalDefenses.filter(p => p.id !== id));
  };
  const updatePhysicalDefense = (id: string, field: string, value: string) => {
    setPhysicalDefenses(physicalDefenses.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addTechnicalDefense = () => {
    setTechnicalDefenses([...technicalDefenses, { id: Date.now().toString(), category: '视频监控', location: '出入口', quantity: '1' }]);
  };
  const removeTechnicalDefense = (id: string) => {
    setTechnicalDefenses(technicalDefenses.filter(t => t.id !== id));
  };
  const updateTechnicalDefense = (id: string, field: string, value: string) => {
    setTechnicalDefenses(technicalDefenses.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleMaterialUpload = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + 'MB';
    setSelfProvidedMaterials(prev => prev.map(m => {
      if (m.id === itemId) {
        return {
          ...m,
          fileName: file.name,
          fileSize: sizeStr,
          status: '已提交'
        };
      }
      return m;
    }));
    
    setAddressToast(`成功上传材料: ${file.name}`);
    setTimeout(() => {
      setAddressToast(null);
    }, 3000);
  };

  const handleViewMaterial = (materialName: string, fileName: string | null) => {
    if (!fileName) {
      setAddressToast(`请先上传：${materialName}`);
      setTimeout(() => setAddressToast(null), 3000);
      return;
    }
    setAddressToast(`正在预览材料: ${fileName}`);
    setTimeout(() => {
      setAddressToast(null);
    }, 3000);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const payload: any = {
        name: enterpriseName,
        uscc: creditCode,
        brandName: brandName,
        jurisdiction: jurisdiction,
        registeredAddress: registeredAddress,
        address: standardAddress,
        category: category,
        level: level,
        legalRep: legalRep,
        legalRepPhone: legalRepPhone,
        legalRepId: legalRepID,
        securityPrincipal: securityPrincipal,
        securityPrincipalID: securityPrincipalID,
        securityPrincipalPhone: securityPrincipalPhone,
        securityManager: securityPrincipal,
        securityManagerId: securityPrincipalID,
        securityManagerPhone: securityPrincipalPhone,
        bizPhone: bizPhone,
        companyPhone: bizPhone,
        economicType: economicType,
        economicTypeSpecific: economicTypeSpecific,
        openingDate: openingDate,
        area: area,
        buildingArea: area,
        registeredCapital: registeredCapital,
        status: enterpriseStatus,
        bizScope: bizScope,
        longitude: longitude,
        latitude: latitude,
        
        // 人防、物防、技防安全建设
        employeeCount: employeeCount ? parseInt(employeeCount, 10) : undefined,
        securityStaffCount: securityStaffCount,
        certifiedGuardsCount: certifiedGuardsCount,
        securityDeptPhone: securityDeptPhone,
        securityAgency: securityAgency,
        securitySupervisor: securitySupervisor,
        securitySupervisorPhone: securitySupervisorPhone,
        employeeRepresentative: employeeRepresentative,
        employeeRepPhone: employeeRepPhone,
        physicalDefenses: physicalDefenses,
        securityContractName: securityContractName,
        technicalDefenses: technicalDefenses,
        videoDevice: hasVideo,
        dataCollection: hasInfoCapture,
        fireDevice: hasFireEquipment,
        specialRecordNo: specialIndustryRecordNo,
        specialRecordAgency: specialIndustryRecordAgency,
        industryLicenseNo: industryLicenseNo,
        industryLicenseAuthority: industryLicenseAuthority,

        // 列管单位信息
        managedUnit: managedUnit,
        adminPolice: unitOfficerName,
        adminPolicePhone: unitOfficerMobile,
        unitOfficerName: unitOfficerName,
        unitOfficerMobile: unitOfficerMobile,
        unitOfficerBadge: unitOfficerBadge,
      };
      
      if (id) {
        payload.id = id;
        payload.updateDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
      } else {
        payload.registerDate = new Date().toISOString().substring(0, 10);
        payload.registrationDate = new Date().toISOString().substring(0, 10);
        payload.updateDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
      }
      
      await api.enterprise.save(payload);
    } catch (e) {
      console.error("Failed to save enterprise:", e);
    } finally {
      setIsSubmitting(false);
      onSave();
    }
  };

  // Filter history logs based on search inputs
  const filteredLogs = ALL_HISTORY_LOGS.filter(log => {
    const logDate = log.time.substring(0, 10);
    if (historyStartDate && logDate < historyStartDate) return false;
    if (historyEndDate && logDate > historyEndDate) return false;
    if (historySource !== 'all' && log.source !== historySource) return false;
    return true;
  });

  const totalItems = filteredLogs.length;
  const totalPages = Math.ceil(totalItems / historyItemsPerPage) || 1;
  const currentPage = Math.max(1, Math.min(historyPage, totalPages));
  const startIndex = (currentPage - 1) * historyItemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + historyItemsPerPage);

  const handleSourceChange = (val: string) => {
    setHistorySource(val);
    setHistoryPage(1);
  };

  const handleStartDateChange = (val: string) => {
    setHistoryStartDate(val);
    setHistoryPage(1);
  };

  const handleEndDateChange = (val: string) => {
    setHistoryEndDate(val);
    setHistoryPage(1);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      <div ref={scrollContainerRef} className="flex-1 overflow-auto p-3 custom-scrollbar pb-24">
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
          <div id="enterprise-basics" className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex justify-between items-center">
              <h2 className="text-sm font-bold text-[#333333]">企业基本信息</h2>
              <div className="flex items-center gap-2">
                {isEdit && (
                  <button
                    type="button"
                    onClick={() => setShowHistoryModal(true)}
                    className="px-4 py-2 bg-blue-50 text-[#419EFF] border border-blue-200 hover:bg-blue-100/70 rounded transition-colors flex items-center text-sm font-medium cursor-pointer"
                  >
                    <History size={16} className="mr-1.5" /> 修改记录
                  </button>
                )}
                <button 
                  onClick={onCancel} 
                  className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
                >
                  <ArrowLeft size={16} className="mr-1.5" /> 返回列表
                </button>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                
                {/* 1. 公司名称 & 引用历史备案企业 (放一行) */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <span className="text-red-500 mr-1">*</span>公司名称 (工商全称)
                    </label>
                    {!isEdit && (
                      <button
                        type="button"
                        onClick={() => setShowImportModal(true)}
                        className="text-xs text-[#419EFF] hover:text-blue-700 font-semibold flex items-center gap-1 active:scale-95 transition-transform"
                      >
                        <Search size={12} /> 引用备案信息
                      </button>
                    )}
                  </div>
                  <input 
                    type="text" 
                    value={enterpriseName}
                    onChange={(e) => setEnterpriseName(e.target.value)}
                    placeholder="请输入工商登记全称"
                    className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm transition-all" 
                  />
                </div>

                {/* 2. Unified Social Credit Code */}
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

                {/* 3. Brand Name */}
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

                {/* 13. 法定代表人 (置顶重要字段) */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>法定代表人
                  </label>
                  <input value={legalRep} onChange={(e) => setLegalRep(e.target.value)} placeholder="请输入法定代表人姓名" className="h-10 px-3 border border-red-200 bg-red-50/30 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                <div className="flex flex-col gap-2 relative">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <span className="text-red-500 mr-1">*</span>法定代表人身份证号
                    </label>
                    <label className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={isNonMainlandLegal} 
                        onChange={(e) => setIsNonMainlandLegal(e.target.checked)} 
                        className="rounded border-gray-300 focus:ring-[#419EFF] text-[#419EFF]"
                      /> 非大陆证件
                    </label>
                  </div>
                  <input 
                    type="text" 
                    value={legalRepID}
                    onChange={(e) => setLegalRepID(e.target.value)}
                    placeholder="请输入证件号码"
                    className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>法定代表人联系方式
                  </label>
                  <input value={legalRepPhone} onChange={(e) => setLegalRepPhone(e.target.value)} placeholder="请输入法定代表人联系电话" className="h-10 px-3 border border-red-200 bg-red-50/30 rounded text-sm focus:border-[#419EFF] outline-none font-mono" />
                </div>

                {/* 14. 治安负责人 (置顶重要字段) */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>治安负责人
                  </label>
                  <input value={securityPrincipal} onChange={(e) => setSecurityPrincipal(e.target.value)} placeholder="请输入治安负责人姓名" className="h-10 px-3 border border-red-200 bg-red-50/30 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                <div className="flex flex-col gap-2 relative">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <span className="text-red-500 mr-1">*</span>治安负责人身份证号
                    </label>
                    <label className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={isNonMainlandSecurity} 
                        onChange={(e) => setIsNonMainlandSecurity(e.target.checked)} 
                        className="rounded border-gray-300 focus:ring-[#419EFF] text-[#419EFF]"
                      /> 非大陆证件
                    </label>
                  </div>
                  <input 
                    type="text" 
                    value={securityPrincipalID}
                    onChange={(e) => setSecurityPrincipalID(e.target.value)}
                    placeholder="请输入治安负责人身份证号"
                    className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>治安负责人联系方式
                  </label>
                  <input value={securityPrincipalPhone} onChange={(e) => setSecurityPrincipalPhone(e.target.value)} placeholder="请输入治安负责人联系电话" className="h-10 px-3 border border-red-200 bg-red-50/30 rounded text-sm focus:border-[#419EFF] outline-none font-mono" />
                </div>

                {/* 4-5. Registered Address */}
                <div className="flex flex-col gap-2">
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

                {/* Enterprise Level */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>企业等级
                  </label>
                  <select 
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded outline-none focus:border-[#419EFF] text-sm bg-white font-medium"
                  >
                    <option value="一类">一类</option>
                    <option value="二类">二类</option>
                    <option value="三类">三类</option>
                    <option value="无证">无证</option>
                  </select>
                </div>

                {/* 7. Category */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">企业类别</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded outline-none focus:border-[#419EFF] text-sm bg-white"
                  >
                    <option>请选择</option>
                    <option>汽车修理</option>
                    <option>摩托车修理</option>
                    <option>其他</option>
                  </select>
                </div>

                {/* 6. Standardized/Business Address */}
                <div className="flex flex-col gap-2 relative">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <span className="text-red-500 mr-1">*</span>经营地址
                    </label>
                    <div className="text-[10px] text-gray-500 flex items-center gap-1 font-mono">
                      <span>经纬度:</span>
                      {isEditingCoords ? (
                        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded border border-gray-200 shadow-sm">
                          <input
                            type="text"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            placeholder="经度"
                            className="w-12 h-5 px-1 text-[9px] border border-gray-300 rounded focus:outline-none"
                            title="修改经度"
                          />
                          <span className="text-gray-400">,</span>
                          <input
                            type="text"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            placeholder="纬度"
                            className="w-12 h-5 px-1 text-[9px] border border-gray-300 rounded focus:outline-none"
                            title="修改纬度"
                          />
                          <button
                            type="button"
                            onClick={() => setIsEditingCoords(false)}
                            className="text-[9px] bg-green-500 text-white px-1 py-0.5 rounded font-bold cursor-pointer hover:bg-green-600 transition-colors"
                          >
                            确定
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsEditingCoords(true)}
                          className="bg-blue-50 hover:bg-blue-100 text-[#419EFF] font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5 cursor-pointer transition-colors"
                          title="点击修改经纬度"
                        >
                          <span>{longitude || "119.45"}, {latitude || "25.98"}</span>
                          <Settings size={9} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={standardAddress}
                      onChange={(e) => {
                        setStandardAddress(e.target.value);
                        setShowAddressSuggestions(e.target.value.length > 2);
                      }}
                      onBlur={() => setTimeout(() => setShowAddressSuggestions(false), 200)}
                      placeholder="输入关键词自动联想经营地址"
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

                {/* 单位电话 */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">单位电话</label>
                  <input value={bizPhone} onChange={(e) => setBizPhone(e.target.value)} placeholder="请输入办公电话" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                {/* 8. Economic Type */}
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

                {/* 9. Opening Date (开业时间) */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">开业时间</label>
                  <input 
                    type="date"
                    value={openingDate}
                    onChange={(e) => setOpeningDate(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" 
                  />
                </div>

                {/* 10. Occupied Area */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">占地面积(平方米)</label>
                  <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="请输入企业营业面积" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                {/* 11. Registered Capital */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">注册资金(万元)</label>
                  <input value={registeredCapital} onChange={(e) => setRegisteredCapital(e.target.value)} placeholder="请输入注册资金" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                {/* 12. Enterprise Status */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">企业状态</label>
                  <select 
                    value={enterpriseStatus}
                    onChange={(e) => setEnterpriseStatus(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded outline-none focus:border-[#419EFF] text-sm bg-white"
                  >
                    <option value="正常营业">正常营业</option>
                    <option value="停业">停业</option>
                    <option value="注销">注销</option>
                    <option value="歇业">歇业</option>
                  </select>
                </div>

                {/* 经营范围 (与企业状态放同一排，占2列) */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">经营范围</label>
                  <input value={bizScope} onChange={(e) => setBizScope(e.target.value)} placeholder="如：二类汽车维修（含烤漆、钣金）" className="h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" />
                </div>

                {/* 登记时间与变更时间 (仅修改表单体现) 和布局占位符 */}
                {isEdit && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#333333]">登记时间</label>
                      <div className="h-10 px-3 flex items-center bg-gray-50 border border-gray-300 rounded text-sm text-gray-500 font-medium">
                        {recordDate ? `${recordDate} 10:15:30` : "2023-10-15 10:15:30"}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#333333]">变更时间</label>
                      <div className="h-10 px-3 flex items-center bg-gray-50 border border-gray-300 rounded text-sm text-gray-500 font-medium">
                        2024-05-12 16:45:10
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#333333]">登记人</label>
                      <div className="h-10 px-3 flex items-center bg-gray-50 border border-gray-300 rounded text-sm text-gray-500 font-medium">
                        高警官
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#333333]">修改人</label>
                      <div className="h-10 px-3 flex items-center bg-gray-50 border border-gray-300 rounded text-sm text-gray-500 font-medium">
                        系统管理员
                      </div>
                    </div>
                  </>
                )}

              </div>

              {/* 备案附件已外置卡片存储 */}
            </div>
          </div>

          {/* 人防、物防、技防安全建设 */}
          <div id="enterprise-security" className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#419EFF]" />
                <h2 className="text-sm font-bold text-[#333333]">人防、物防、技防安全建设</h2>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              {/* 人防建设 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4 pb-1 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-blue-500 rounded-full"></span>
                  人防建设（安全保卫及从业人员人员配置）
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">从业人员总数</label>
                    <input 
                      type="number"
                      value={employeeCount} 
                      onChange={(e) => setEmployeeCount(e.target.value)} 
                      placeholder="请输入从业人员人数" 
                      className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">安全保卫人数</label>
                    <input 
                      type="number"
                      value={securityStaffCount} 
                      onChange={(e) => setSecurityStaffCount(e.target.value)} 
                      placeholder="如: 5" 
                      className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">持证保安员人数</label>
                    <input 
                      type="number"
                      value={certifiedGuardsCount} 
                      onChange={(e) => setCertifiedGuardsCount(e.target.value)} 
                      placeholder="如: 3" 
                      className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">保安保卫部门电话</label>
                    <input 
                      type="text"
                      value={securityDeptPhone} 
                      onChange={(e) => setSecurityDeptPhone(e.target.value)} 
                      placeholder="如: 0591-77777777" 
                      className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" 
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">保安服务提供公司 / 派驻单位</label>
                    <input 
                      type="text"
                      value={securityAgency} 
                      onChange={(e) => setSecurityAgency(e.target.value)} 
                      placeholder="请输入外部保安服务派出公司名称" 
                      className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">治安保卫负责人</label>
                    <input 
                      type="text"
                      value={securitySupervisor} 
                      onChange={(e) => setSecuritySupervisor(e.target.value)} 
                      placeholder="请输入负责人姓名" 
                      className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">保卫负责人电话</label>
                    <input 
                      type="text"
                      value={securitySupervisorPhone} 
                      onChange={(e) => setSecuritySupervisorPhone(e.target.value)} 
                      placeholder="保卫负责人手机号" 
                      className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">从业人员代表/工会联系人</label>
                    <input 
                      type="text"
                      value={employeeRepresentative} 
                      onChange={(e) => setEmployeeRepresentative(e.target.value)} 
                      placeholder="代表姓名" 
                      className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">从业人员代表电话</label>
                    <input 
                      type="text"
                      value={employeeRepPhone} 
                      onChange={(e) => setEmployeeRepPhone(e.target.value)} 
                      placeholder="代表联系方式" 
                      className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" 
                    />
                  </div>
                  
                  {/* 保安服务合同 选项 */}
                  <div className="flex flex-col gap-3 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
                      <span>保安服务合同本级附件</span>
                      {securityContractName && (
                        <span className="text-xs text-green-600 flex items-center gap-1 font-semibold">
                          <CheckCircle2 size={12} className="inline text-green-600" /> 已签定附件
                        </span>
                      )}
                    </label>
                    <div className="flex gap-2 items-center">
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          readOnly
                          value={securityContractName || "暂未签署，点击右侧上传/关联标准派遣合同"} 
                          className="h-10 px-3 pr-8 border border-gray-300 rounded text-xs outline-none w-full bg-gray-50 text-gray-500 font-medium"
                        />
                        {securityContractName && (
                          <button 
                            type="button"
                            onClick={() => setSecurityContractName(null)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                            title="移除合同"
                          >
                            <XCircle size={14} />
                          </button>
                        )}
                      </div>
                      {securityContractName ? (
                        <button
                          type="button"
                          onClick={() => setShowContractModal(true)}
                          className="h-10 px-4 bg-[#e8f0fc] hover:bg-blue-100 text-[#419EFF] border border-blue-200 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <FileText size={15} /> 查看合同附件
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setSecurityContractName("保安服务聘用合同_众诚.pdf");
                            setAddressToast("已自动关联预设「保安服务聘用合同_众诚.pdf」");
                            setTimeout(() => setAddressToast(null), 3000);
                          }}
                          className="h-10 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Upload size={14} className="text-gray-400" /> 上传/关联合同
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 物防建设 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4 pb-1 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-green-500 rounded-full"></span>
                    <span>物防建设（物理防范设施）</span>
                  </div>
                  <button
                    type="button"
                    onClick={addPhysicalDefense}
                    className="px-3 py-1 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 text-xs font-semibold rounded flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus size={12} /> 添加物防设施
                  </button>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                  <div className="flex flex-col gap-2 md:col-span-1">
                    <label className="text-sm font-medium text-gray-700">配备消防设施设备</label>
                    <select 
                      value={hasFireEquipment}
                      onChange={(e) => setHasFireEquipment(e.target.value)}
                      className="h-10 px-3 border border-gray-300 rounded text-sm bg-white focus:border-[#419EFF] outline-none"
                    >
                      <option value="是">是 (已配备充足消防器材)</option>
                      <option value="否">否 (缺失/未配备齐全)</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full border-collapse text-xs text-left">
                    <thead className="bg-[#f2fcf2] text-gray-600 font-semibold border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 w-12 text-center">#</th>
                        <th className="px-4 py-3">物防种类</th>
                        <th className="px-4 py-3">部署位置</th>
                        <th className="px-4 py-3 w-28 text-center">配置数量</th>
                        <th className="px-4 py-3 w-20 text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {physicalDefenses.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                            暂无添加的物防设施，请点击“添加物防设施”按钮自主创建
                          </td>
                        </tr>
                      ) : (
                        physicalDefenses.map((p, idx) => (
                          <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-3 text-center text-gray-400 font-mono">{idx + 1}</td>
                            <td className="px-4 py-3">
                              <input 
                                type="text"
                                value={p.category}
                                onChange={(e) => updatePhysicalDefense(p.id, 'category', e.target.value)}
                                placeholder="例: 防盗门窗、保险锁、防护门"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-xs bg-white animate-fade-in"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input 
                                type="text"
                                value={p.location}
                                onChange={(e) => updatePhysicalDefense(p.id, 'location', e.target.value)}
                                placeholder="例: 主展厅、配件库、办公财务室"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-xs bg-white"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input 
                                type="number"
                                value={p.quantity}
                                onChange={(e) => updatePhysicalDefense(p.id, 'quantity', e.target.value)}
                                placeholder="例: 5"
                                className="w-20 h-8 px-2 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-xs text-center bg-white mx-auto font-mono"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                type="button"
                                onClick={() => removePhysicalDefense(p.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-all cursor-pointer"
                                title="删除该条目"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 技防建设 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4 pb-1 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-purple-500 rounded-full"></span>
                    <span>技防建设（技防设施/信息化监控）</span>
                  </div>
                  <button
                    type="button"
                    onClick={addTechnicalDefense}
                    className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold rounded flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus size={12} /> 添加技防监控
                  </button>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">安装视频监控设备</label>
                    <select 
                      value={hasVideo}
                      onChange={(e) => setHasVideo(e.target.value)}
                      className="h-10 px-3 border border-gray-300 rounded text-sm bg-white focus:border-[#419EFF] outline-none"
                    >
                      <option value="是">是 (已安装并保持全天录像)</option>
                      <option value="否">否 (未安排安装)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">安装从业人员实名采集登记系统</label>
                    <select 
                      value={hasInfoCapture}
                      onChange={(e) => setHasInfoCapture(e.target.value)}
                      className="h-10 px-3 border border-gray-300 rounded text-sm bg-white focus:border-[#419EFF] outline-none"
                    >
                      <option value="是">是 (已与全省机修治安信息网实时联网上报)</option>
                      <option value="否">否 (暂未实施联网)</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full border-collapse text-xs text-left">
                    <thead className="bg-[#fcfaff] text-gray-600 font-semibold border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 w-12 text-center">#</th>
                        <th className="px-4 py-3">技防设备名称</th>
                        <th className="px-4 py-3">部署位置</th>
                        <th className="px-4 py-3 w-28 text-center">安装数量</th>
                        <th className="px-4 py-3 w-20 text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {technicalDefenses.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                            暂无添加的技防设施，请点击“添加技防监控”按钮自主创建
                          </td>
                        </tr>
                      ) : (
                        technicalDefenses.map((t, idx) => (
                          <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-3 text-center text-gray-400 font-mono">{idx + 1}</td>
                            <td className="px-4 py-3">
                              <input 
                                type="text"
                                value={t.category}
                                onChange={(e) => updateTechnicalDefense(t.id, 'category', e.target.value)}
                                placeholder="例: 高清数字摄像机、一键联网报警盒、周界红外探测器"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-xs bg-white"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input 
                                type="text"
                                value={t.location}
                                onChange={(e) => updateTechnicalDefense(t.id, 'location', e.target.value)}
                                placeholder="例: 门前街道、送修区、财务铁保险柜旁、重要库房"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-xs bg-white"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input 
                                type="number"
                                value={t.quantity}
                                onChange={(e) => updateTechnicalDefense(t.id, 'quantity', e.target.value)}
                                placeholder="例: 10"
                                className="w-20 h-8 px-2 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-xs text-center bg-white mx-auto font-mono"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                type="button"
                                onClick={() => removeTechnicalDefense(t.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-all cursor-pointer"
                                title="删除该条目"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 特种行业及交通运输许可信息 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4 pb-1 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-indigo-500 rounded-full"></span>
                  行业资质及特行行政备案资格物证 (交通核发许可、公安特行监督)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-sans">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">特种行业备案编号</label>
                    <input 
                      type="text"
                      value={specialIndustryRecordNo} 
                      onChange={(e) => setSpecialIndustryRecordNo(e.target.value)} 
                      placeholder="例: BA2023001" 
                      className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">特种行业特备机关</label>
                    <input 
                      type="text"
                      value={specialIndustryRecordAgency} 
                      onChange={(e) => setSpecialIndustryRecordAgency(e.target.value)} 
                      placeholder="例: 福州市公安局" 
                      className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">行业许可证号</label>
                    <input 
                      type="text"
                      value={industryLicenseNo} 
                      onChange={(e) => setIndustryLicenseNo(e.target.value)} 
                      placeholder="机修经营备案通知字号" 
                      className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">行业核发许可机关</label>
                    <input 
                      type="text"
                      value={industryLicenseAuthority} 
                      onChange={(e) => setIndustryLicenseAuthority(e.target.value)} 
                      placeholder="例: 福州市运输管理局" 
                      className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 列管单位信息 */}
          <div id="enterprise-supervision" className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#419EFF]" />
                <h2 className="text-sm font-bold text-[#333333]">列管单位信息</h2>
              </div>
            </div>
            <div className="p-8">
              {addressToast && (
                <div className="mb-6 p-3.5 bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded-lg flex items-center gap-2 shadow-sm animate-pulse-once">
                  <Info size={14} className="text-[#419EFF] shrink-0" />
                  <span className="font-semibold">{addressToast}</span>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>企业所管辖区 (公安机关)
                  </label>
                  <select 
                    value={jurisdiction}
                    onChange={(e) => setJurisdiction(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded outline-none focus:border-[#419EFF] text-sm bg-white"
                  >
                    {JURISDICTIONS.map(j => <option key={j} value={j}>{j}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">列管民警姓名</label>
                  <input value={unitOfficerName} onChange={(e) => setUnitOfficerName(e.target.value)} placeholder="请输入民警姓名" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">列管民警手机</label>
                  <input value={unitOfficerMobile} onChange={(e) => setUnitOfficerMobile(e.target.value)} placeholder="请输入联系方式" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">列管民警警号 (警号)</label>
                  <input value={unitOfficerBadge} onChange={(e) => setUnitOfficerBadge(e.target.value)} placeholder="请输入民警警号信息" className="h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]" />
                </div>
              </div>
            </div>
          </div>

          {/* 备案信息附件单独卡片 (按备案信息模块一致的材料进行列表展示) */}
          <div id="enterprise-attachments" className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-[#419EFF]" />
                <h2 className="text-sm font-bold text-[#333333]">备案信息附件清单</h2>
              </div>
              <span className="text-xs text-[#666666]">材料归集管理与免提交联动</span>
            </div>
            
            <div className="p-6 space-y-8">
              {/* 自筹材料 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">自筹材料</span>
                  <span className="text-xs text-gray-500">企业需主动准备并上传的电子材料</span>
                </div>
                
                <div className="overflow-x-auto border border-gray-200 rounded">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#fafafa] font-medium text-gray-600 border-b border-gray-200">
                        <th className="px-4 py-3 text-left w-12 text-xs">#</th>
                        <th className="px-4 py-3 text-left text-xs">材料名称</th>
                        <th className="px-4 py-3 text-center w-24 text-xs">份数</th>
                        <th className="px-4 py-3 text-center w-24 text-xs">必要性</th>
                        <th className="px-4 py-3 text-center w-32 text-xs">收取方式</th>
                        <th className="px-4 py-3 text-center w-32 text-xs">收取状态</th>
                        <th className="px-4 py-3 text-center w-48 text-xs border-l border-gray-200">文件及操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selfProvidedMaterials.map((material, idx) => (
                        <tr key={material.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3.5 text-gray-400">{idx + 1}</td>
                          <td className="px-4 py-3.5 text-gray-800 font-medium leading-relaxed max-w-sm break-words">
                            <div>{material.name}</div>
                            {material.fileName && (
                              <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-1.5 leading-none">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                {material.fileName} ({material.fileSize})
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-center text-gray-600">{material.count}</td>
                          <td className="px-4 py-3.5 text-center">
                            <span className="text-red-500 text-xs font-bold">★ 必要</span>
                          </td>
                          <td className="px-4 py-3.5 text-center text-gray-600">{material.method}</td>
                          <td className="px-4 py-3.5 text-center">
                            {material.status === '已提交' ? (
                              <span className="text-green-600 text-xs font-medium bg-green-50/50 px-2 py-0.5 rounded border border-green-100">已提交</span>
                            ) : (
                              <span className="text-red-600 text-xs font-semibold bg-red-50 px-2 py-0.5 rounded border border-red-100">待提交 (缺失)</span>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-center border-l border-gray-100">
                            <div className="flex items-center justify-center gap-2">
                              {/* 隐藏的文件上传input */}
                              <input 
                                type="file"
                                id={`file-input-${material.id}`}
                                className="hidden"
                                onChange={(e) => handleMaterialUpload(e, material.id)}
                              />
                              
                              {material.status === '已提交' ? (
                                <>
                                  <button 
                                    onClick={() => handleViewMaterial(material.name, material.fileName)}
                                    className="text-[#419EFF] hover:underline text-xs flex items-center gap-0.5"
                                  >
                                    <CloudDownload size={13} /> 下载/查看
                                  </button>
                                  <span className="text-gray-200">|</span>
                                  <label 
                                    htmlFor={`file-input-${material.id}`}
                                    className="text-gray-500 hover:text-[#419EFF] hover:underline text-xs flex items-center gap-0.5 cursor-pointer"
                                  >
                                    <Upload size={13} /> 重新上传
                                  </label>
                                </>
                              ) : (
                                <label 
                                  htmlFor={`file-input-${material.id}`}
                                  className="text-[#419EFF] hover:text-blue-700 hover:underline text-xs flex items-center gap-1 cursor-pointer font-medium bg-blue-50/50 hover:bg-blue-100/50 px-3 py-1 rounded border border-blue-200 transition-all font-semibold"
                                >
                                  <Upload size={13} /> 点击上传
                                </label>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 共享材料 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">共享材料</span>
                  <span className="text-xs text-gray-500">通过一体化政务服务跨地域/跨层级免提交电子证照、共享数据</span>
                </div>
                
                <div className="overflow-x-auto border border-gray-200 rounded">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#fafafa] font-medium text-gray-600 border-b border-gray-200">
                        <th className="px-4 py-3 text-left w-12 text-xs">#</th>
                        <th className="px-4 py-3 text-left text-xs">材料名称</th>
                        <th className="px-4 py-3 text-left text-xs">材料来源</th>
                        <th className="px-4 py-3 text-center w-48 text-xs border-l border-gray-200">文件及操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {sharedMaterials.map((material, idx) => (
                        <tr key={material.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3.5 text-gray-400">{idx + 1}</td>
                          <td className="px-4 py-3.5 text-gray-800 font-medium leading-relaxed">
                            <div>{material.name}</div>
                            {material.fileName && (
                              <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-1.5 leading-none">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                {material.fileName} (由系统自动补全)
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-[#666666] font-medium">{material.source}</td>
                          <td className="px-4 py-3.5 text-center border-l border-gray-100">
                            <button 
                              onClick={() => handleViewMaterial(material.name, material.fileName || `${material.name}.pdf`)}
                              className="text-[#419EFF] hover:underline text-xs flex items-center justify-center w-full gap-1 font-medium"
                            >
                              <Eye size={13} /> {material.status}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingFormNavigation scrollContainerRef={scrollContainerRef} items={navItems} />

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

      {/* 引用备案数据展示弹窗 */}
      {showImportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden transform scale-100 transition-all">
            {/* Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <FileText className="text-[#419EFF]" size={16} />
                引用已备案企业信息 (数据回填)
              </h3>
              <button 
                type="button"
                onClick={() => {
                  setShowImportModal(false);
                  setSelectedEnterpriseId(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <XCircle size={18} />
              </button>
            </div>

            {/* Filter Controls */}
            <div className="p-4 bg-gray-50 border-b flex items-center gap-3">
              <div className="relative flex-1">
                <input 
                  type="text"
                  placeholder="输入企业名称、统一社会信用代码进行过滤查询..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#419EFF] bg-white transition-all shadow-inner"
                  autoFocus
                />
                <Search size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
              </div>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="px-4 h-10 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded shrink-0 transition-colors"
              >
                重置
              </button>
            </div>

            {/* Entity List */}
            <div className="flex-1 overflow-auto p-6 bg-gray-50/50 custom-scrollbar">
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <table className="w-full border-collapse text-left text-xs">
                  <thead className="bg-[#e8f0fc] text-gray-700 uppercase font-semibold border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-center w-12">选择</th>
                      <th className="px-4 py-3">企业名称</th>
                      <th className="px-4 py-3 w-1/3">统一社会信用代码</th>
                      <th className="px-4 py-3 w-28 text-center">法定代表人</th>
                      <th className="px-4 py-3 w-32">所属区域</th>
                      <th className="px-4 py-3 w-28">企业类别</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {filteredEnterprises.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                          <p className="text-sm">暂无匹配的已备案企业</p>
                          <p className="text-xs mt-1 text-gray-400">请尝试输入其他关键词进行查询</p>
                        </td>
                      </tr>
                    ) : (
                      filteredEnterprises.map(ent => (
                        <tr 
                          key={ent.id}
                          onClick={() => setSelectedEnterpriseId(ent.id)}
                          onDoubleClick={() => {
                            fillFromApproved(ent);
                            setShowImportModal(false);
                            setSelectedEnterpriseId(null);
                          }}
                          className={`hover:bg-[#419EFF]/5 cursor-pointer transition-colors ${selectedEnterpriseId === ent.id ? 'bg-blue-50/80 font-medium' : ''}`}
                        >
                          <td className="px-4 py-3 text-center">
                            <input 
                              type="radio" 
                              name="selectedEnterprise"
                              checked={selectedEnterpriseId === ent.id}
                              onChange={() => setSelectedEnterpriseId(ent.id)}
                              className="w-4 h-4 text-[#419EFF] border-gray-300 focus:ring-[#419EFF]"
                            />
                          </td>
                          <td className="px-4 py-3 text-gray-900 font-semibold">{ent.name}</td>
                          <td className="px-4 py-3 font-mono text-gray-600">{ent.uscc}</td>
                          <td className="px-4 py-3 text-center text-gray-800">{ent.legalRep}</td>
                          <td className="px-4 py-3 text-gray-500">{ent.region}</td>
                          <td className="px-4 py-3 text-gray-500">{ent.category}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3 flex items-center gap-1 leading-normal">
                <Info size={12} className="text-gray-400" /> 温馨提示：勾选需要引用的企业或双击该行，即可安全地将备案数据回填至当前表单中。
              </p>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3 shrink-0">
              <button 
                type="button"
                onClick={() => {
                  setShowImportModal(false);
                  setSelectedEnterpriseId(null);
                }}
                className="px-4 py-2 bg-white border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded transition-colors"
              >
                取消
              </button>
              <button 
                type="button"
                onClick={handleImportConfirm}
                disabled={!selectedEnterpriseId}
                className="px-6 py-2 bg-[#419EFF] hover:bg-blue-600 font-bold text-white text-xs rounded shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                确认导入并回填
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 保安服务合同 预览弹窗 */}
      {showContractModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in text-[#333333]">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-150 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-up">
            {/* 头部 */}
            <div className="px-6 py-4 border-b border-gray-100 bg-[#f8fafc] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="text-[#419EFF]" size={20} />
                <h3 className="text-base font-bold text-gray-800">保安服务合同 附件预览</h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowContractModal(false)}
                className="text-gray-400 hover:text-gray-650 transition-all p-1 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            {/* 内容区 */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 font-sans">
              {/* 重要属性摘要 */}
              <div className="grid grid-cols-2 gap-4 bg-blue-50/40 p-4 rounded-lg border border-blue-100 text-xs">
                <div>
                  <span className="text-gray-500 block mb-0.5 font-medium">合同名称</span>
                  <span className="text-gray-800 font-semibold">{securityContractName || "保安服务聘用合同_众诚.pdf"}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5 font-medium">合同编号</span>
                  <span className="text-gray-800 font-semibold font-mono">SEC-2026-FJZC-002</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5 font-medium">甲方（雇主单位）</span>
                  <span className="text-gray-800 font-semibold">{enterpriseName || "福建众诚汽车修配服务中心"}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5 font-medium">乙方（保安派遣单位）</span>
                  <span className="text-gray-800 font-semibold">{securityAgency || "福建省中安保安服务有限公司"}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5 font-medium">有效期限</span>
                  <span className="text-gray-800 font-semibold">2026-01-01 至 2028-12-31</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5 font-medium">文件属性</span>
                  <span className="text-gray-800 font-semibold">2.4 MB / PDF / 三防系统联网数字存证</span>
                </div>
              </div>

              {/* 纸张效果预览 */}
              <div className="border border-gray-200 rounded-lg bg-gray-50 p-6 space-y-4 shadow-inner max-h-[35vh] overflow-y-auto font-serif leading-relaxed text-xs relative select-none">
                {/* 浮水印 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none rotate-12 text-center text-xl font-sans font-bold text-blue-800">
                  <div>马尾区治安管理备案专用<br />保安合同备案存档件</div>
                </div>
                
                <h4 className="text-center text-sm font-bold text-gray-900 mb-4 font-sans tracking-tight">保安服务及安全防卫派遣协议书</h4>
                <p className="indent-6">
                  为进一步落实重点列管单位治安防控自律要求，强化“人防、物防、技防”常态治理，雇主单位（以下简称甲方）与专业保安公司（以下简称乙方）本着自愿安全防范之宗旨，特订立本服务合同。
                </p>
                <p className="indent-6">
                  一、乙方派遣专业治安防卫和保安值守骨干。甲方配备安全保卫总人数共计 <span className="underline font-bold text-blue-600">{securityStaffCount || "5"}</span> 名，持证保安人员 <span className="underline font-bold text-blue-600">{certifiedGuardsCount || "3"}</span> 名，严格负责周界及机修车间的消防安全防盗巡视。
                </p>
                <p className="indent-6">
                  二、本合同备案申报材料通过全省网格化治安安全系统联网上报。合同各方对登记的治安负责人：<span className="font-semibold underline">{securitySupervisor || "周伟"}</span>（联系电话: {securitySupervisorPhone || "13905001122"}）信息真实性负连带法律责任。
                </p>
                <p className="indent-6">
                  三、本合同有效期三年，自2026年01月01日起至2028年12月31日止。
                </p>

                <div className="pt-6 flex justify-between items-start text-[10px] text-gray-500 font-sans">
                  <div>
                    <p>甲方代表 (签章)：李万山</p>
                    <p>日期：2026-01-10</p>
                  </div>
                  <div className="relative">
                    {/* 印章 */}
                    <div className="absolute -top-3 -right-4 w-14 h-14 rounded-full border border-red-500/60 flex items-center justify-center text-center font-bold text-[6px] text-red-500/60 rotate-12 bg-red-50/10 pointer-events-none">
                      <div className="p-0.5 border border-dashed border-red-500/40 rounded-full w-12 h-12 flex items-center justify-center whitespace-pre">
                        福建省中安<br />合同备案印
                      </div>
                    </div>
                    <p className="relative z-10">乙方代表 (签章)：林金水</p>
                    <p className="relative z-10">日期：2026-01-10</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 底部 */}
            <div className="px-6 py-3 border-t border-gray-100 bg-[#f8fafc] flex justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setAddressToast("开始保存/导出合同备存文件到本地...");
                  setTimeout(() => setAddressToast(null), 3000);
                }}
                className="px-4 py-1.5 bg-[#419EFF] hover:bg-blue-600 text-white rounded text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm"
              >
                <CloudDownload size={14} /> 导出/下载PDF
              </button>
              <button
                type="button"
                onClick={() => setShowContractModal(false)}
                className="px-4 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium cursor-pointer transition-colors"
              >
                关闭预览
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 修改记录 弹窗 */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in text-[#333333]">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-150 w-full max-w-4xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-up">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-150 bg-[#f8fafc] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <History className="text-[#419EFF]" size={20} />
                <h3 className="text-base font-bold text-gray-800">企业备案信息 变更与修改历史记录</h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-400 hover:text-gray-650 transition-all p-1 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Content List & Controls */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5">
              {/* 查询条件栏 (Time Period and Change Source Filters) */}
              <div className="bg-gray-55/40 border border-gray-200 rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-xs">
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold">变更来源</label>
                  <select
                    value={historySource}
                    onChange={(e) => handleSourceChange(e.target.value)}
                    className="w-full h-9 px-2 border border-gray-300 rounded text-xs bg-white focus:border-[#419EFF] outline-none cursor-pointer"
                  >
                    <option value="all">全部来源</option>
                    <option value="企业端上报">企业端上报</option>
                    <option value="民警修改">民警修改</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold">开始时间</label>
                  <input
                    type="date"
                    value={historyStartDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    className="w-full h-9 px-2.5 border border-gray-300 rounded text-xs bg-white focus:border-[#419EFF] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold">结束时间</label>
                  <input
                    type="date"
                    value={historyEndDate}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                    className="w-full h-9 px-2.5 border border-gray-300 rounded text-xs bg-white focus:border-[#419EFF] outline-none"
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setHistoryStartDate('');
                      setHistoryEndDate('');
                      setHistorySource('all');
                      setHistoryPage(1);
                    }}
                    className="w-full h-9 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded text-xs font-semibold transition-colors cursor-pointer"
                  >
                    重置查询筛选
                  </button>
                </div>
              </div>

              {/* 变更记录卡片与迷你表格列表 */}
              <div className="space-y-4">
                {paginatedLogs.length > 0 ? (
                  paginatedLogs.map((log) => (
                    <div key={log.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-sm transition-all text-left">
                      {/* Card Sub-Header */}
                      <div className="px-4 py-3 bg-[#f8fafc] border-b border-gray-200 flex flex-wrap justify-between items-center gap-2 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-800 text-sm">{log.time}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            log.source === '企业端上报' 
                              ? 'bg-blue-50 text-[#419EFF] border-blue-200' 
                              : log.source === '民警修改' 
                              ? 'bg-green-50 text-green-600 border-green-200' 
                              : 'bg-gray-50 text-gray-500 border-gray-200'
                          }`}>
                            {log.source}
                          </span>
                        </div>
                        <div className="text-gray-500 font-medium">
                          操作人：<span className="font-semibold text-gray-700">{log.operator}</span>
                        </div>
                      </div>

                      {/* Modification list in a clear table form */}
                      <div className="p-4 overflow-x-auto">
                        <table className="w-full text-left text-xs min-w-[500px]">
                          <thead>
                            <tr className="border-b border-gray-150 text-gray-400 font-bold">
                              <th className="pb-2 w-[180px]">变更项 (修改字段)</th>
                              <th className="pb-2 px-2">修改前内容</th>
                              <th className="pb-2 text-center w-6">-</th>
                              <th className="pb-2 pl-4 text-green-600">修改后新内容</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {log.changes.map((ch, cidx) => (
                              <tr key={cidx} className="hover:bg-slate-50/55 transition-colors">
                                <td className="py-2.5 font-bold text-gray-700">{ch.field}</td>
                                <td className="py-2.5 px-2 text-red-500 line-through bg-red-50/20 rounded text-[11px] font-mono break-all max-w-[220px]">
                                  {ch.before || '空'}
                                </td>
                                <td className="py-2.5 text-gray-400 text-center font-mono">→</td>
                                <td className="py-2.5 pl-4 text-green-600 font-bold bg-green-50/15 rounded text-[11px] font-mono break-all max-w-[220px]">
                                  {ch.after}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 border border-dashed border-gray-200 rounded-lg bg-gray-50 text-center text-gray-400 space-y-2">
                    <History size={36} className="mx-auto text-gray-300 animate-pulse" />
                    <p className="text-sm font-medium text-gray-500">暂无符合筛选条件的变更记录</p>
                    <p className="text-xs text-gray-400">请您尝试调整筛选时间段或变更来源重试</p>
                  </div>
                )}
              </div>

              {/* 页码与翻页 (Pagination Controls) */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs">
                  <div className="text-gray-500 font-medium">
                    共检索到 <span className="font-bold text-gray-800">{totalItems}</span> 条变更流水，每页显示 {historyItemsPerPage} 条
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setHistoryPage(prev => Math.max(1, prev - 1))}
                      className="px-2.5 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center gap-1 cursor-pointer font-semibold shadow-sm text-gray-700"
                    >
                      <ChevronLeft size={13} />
                      <span>上一页</span>
                    </button>
                    
                    <span className="text-gray-500 font-mono px-1">
                      第 <span className="font-bold text-gray-800">{currentPage}</span> / {totalPages} 页
                    </span>
                    
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setHistoryPage(prev => Math.min(totalPages, prev + 1))}
                      className="px-2.5 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center gap-1 cursor-pointer font-semibold shadow-sm text-gray-700"
                    >
                      <span>下一页</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Button */}
            <div className="px-6 py-3.5 border-t border-gray-150 bg-[#f8fafc] flex justify-end">
              <button 
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="px-6 py-1.5 bg-white border border-gray-300 text-xs font-semibold text-gray-750 hover:bg-gray-105 rounded transition-all cursor-pointer shadow-sm"
              >
                关闭窗口
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
