export interface Enterprise {
  id: string;
  name: string;
  uscc: string;
  category: string;
  region: string;
  recordStatus: string;
  status: string;
  lastCheck: string;
  legalRep?: string;
  legalRepPhone?: string;
  level?: string;
  brandName?: string;
  jurisdiction?: string;
  registeredAddress?: string;
  address?: string; // Standard address
  standardAddressCode?: string;
  longitude?: string;
  latitude?: string;
  economicType?: string;
  economicTypeSpecific?: string;
  bizPhone?: string;
  principal?: string;
  principalPhone?: string;
  bizScope?: string;
  registeredCapital?: string;
  area?: string;
  postalCode?: string;
  enterpriseCode?: string;
  riskCreditLevel?: string;
  policeStation?: string;
  registerDate?: string;
  lastLoginTime?: string;
  lastUploadTime?: string;
  employeeCount?: number;
  inspectionCount?: number;
  licenseAuthority?: string;
  taxRegNo?: string;
  taxRegAuthority?: string;
  enterprisePoints?: number;
  industryLicenseAuthority?: string;
}

export interface Personnel {
  id: string;
  name: string;
  gender: string;
  idCard: string;
  phone: string;
  enterprise: string;
  position: string;
  status: string;
  entryDate?: string;
}

export interface Vehicle {
  id: string;
  plateNo: string;
  vin: string;
  owner: string;
  type: string;
  status: string;
  enterprise?: string;
  brand?: string;
  model?: string;
  color?: string;
  engineNo?: string;
  registerDate?: string;
}

export interface RepairRecord {
  id: string;
  plateNo: string;
  enterprise: string;
  repairDate: string;
  amount: number;
  status: string;
}

export interface Inspection {
  id: string;
  enterprise: string;
  company?: string;
  inspector: string;
  inspectors?: string;
  date: string;
  result: string;
  status: string;
  method?: string;
  situation?: string;
  inspectMethod?: string;
  unitLevel?: string;
  enterpriseStatus?: string;
  isNormal?: string;
  rectificationStatus?: string;
  rectificationDeadline?: string;
  rectificationPlan?: string;
  unitCode?: string;
  region?: string;
  inspectionUnit?: string;
}

export interface ViolationManagementRecord {
  id: string;
  region: string; // 行政区域
  companyName: string; // 公司名称
  enterpriseId: string; // 企业编码
  registrar: string; // 登记人员
  occurrenceTime: string; // 发生时间
  violator: string; // 违法违规人员(单位)
  caseNo: string; // 案件编号
  isInvestigated: string; // 是否查处 (是/否)
  description?: string; // 情况描述
  
  // 警综平台案件信息
  caseType?: string; // 案件类型
  caseName?: string; // 案件名称
  caseTime?: string; // 案发时间
  caseLocation?: string; // 案发地点
  deaths?: number; // 死亡人数
  injuries?: number; // 受伤人数
  propertyValue?: string; // 涉案价值
  perpetrators?: number; // 作案人数
  briefCase?: string; // 简要案情
  filingTime?: string; // 立案时间
  caseOfficers?: string; // 办案人员
  filingUnit?: string; // 主办单位
  
  processingResult?: string; // 处理结果
  
  // 查处信息
  auditOfficer?: string; // 查处人员
  auditTime?: string; // 查处时间
}

export interface Case {
  id: string;
  title: string;
  type: string;
  date: string;
  status: string;
  caseNo?: string;
  caseName?: string;
  caseCategory?: string;
  caseType?: string;
  caseStartTime?: string;
  caseEndTime?: string;
  caseStatus?: string;
  dispatchPoliceStation?: string;
  alarmNo?: string;
  alarmTime?: string;
  crimeSceneDistrict?: string;
  caseRegion?: string; // 发案所属区划
  crimeSceneAddress?: string;
  caseSource?: string; // 案件来源 (执法办案系统、民警补登)
  registrationOfficer?: string; // 补登民警
  briefCase?: string;
  punishmentMeasures?: string;
  caseImages?: string[];
  
  filingTime?: string;
  filingUnit?: string;
  filingOfficer?: string;
  transferTime?: string;
  transferUnit?: string;
  transferOfficer?: string;
  acceptanceTime?: string;
  acceptanceUnit?: string;
  acceptor?: string;
  solutionTime?: string;
  solutionUnit?: string;
  solutionOfficer?: string;
  closingTime?: string;
  cancellationTime?: string;
  
  occurrenceTime?: string;
  registrar?: string;
  violator?: string;
  isInvestigated?: string;
  company?: string;
  involvedParties?: any[];
  description?: string;
  isProblemPlaceAssociated?: '已关联' | '未关联' | '不关联';
  associatedPlaceName?: string;
  associatedEnterpriseIds?: string[];
  
  // 场所被查处/督办新加字段 (Requirement 4 & 6)
  specificIllegalBehavior?: string; // 具体违法行为
  punishmentResult?: string;       // 案件处罚结果
  investigationTime?: string;      // 查处时间
  investigationDate?: string;      // 查处日期
  credentialsUrl?: string[];        // 上传凭证 (图片 url 数组)
  supervisionStatus?: string;       // 督办状态
  supervisionLogs?: {
    id: string;
    time: string;
    unit: string;
    operator: string;
    action: string;
    remark: string;
  }[];

  problemPlaceRecords?: {
    id: string;
    unit: string;
    operator: string;
    time: string;
    status: string;
    placeName: string;
  }[];
  suspects?: {
    id: string;
    name: string;
    gender: string;
    idCard: string;
    phone: string;
    status: string;
    birthdate?: string;
    householdAddress?: string;
    occupation?: string;
    roomEntryMethod?: string;
  }[];
  victims?: {
    id: string;
    name: string;
    gender: string;
    idCard: string;
    phone: string;
    details: string;
    birthdate?: string;
    householdAddress?: string;
    identity?: string;
    roomEntryMethod?: string;
    relationWithSuspect?: string;
  }[];
}

export interface PractitionerPunishmentRecord {
  id: string;
  punishedName: string; // 被处罚人姓名
  workUnit: string; // 工作单位/公司名称
  punishmentDate: string; // 处罚日期
  caseName?: string; // 案件名称
  caseStartDate: string; // 案件开始日期
  caseNo: string; // 案件编号
  punishmentNo?: string; // 处罚文号
  gender?: string; // 性别
  idCard?: string; // 证件号码
  birthDate: string; // 出生日期
  ethnic?: string; // 民族
  education?: string; // 文化程度
  householdAddress?: string; // 户籍地
  currentAddress?: string; // 现住地
  caseCategory?: string; // 案件类别
  punishmentType: string; // 处罚种类
  punishmentResult?: string; // 行处情况
  punishmentAmount?: string; // 处罚金额
  handlingUnit: string; // 办案单位
  handlingOfficer?: string; // 办案人
  caseBrief?: string; // 简要案情描述
  caseResult?: string; // 案件处理结果
  imageUrl?: string; // 图片
  
  // Fields for list/search
  region?: string; // 行政区划
  companyAddress?: string; // 公司地址
}
