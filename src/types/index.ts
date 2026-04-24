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

export interface Case {
  id: string;
  title: string;
  type: string;
  date: string;
  status: string;
  caseNo?: string;
  caseName?: string;
  occurrenceTime?: string;
  caseType?: string;
  registrar?: string;
  violator?: string;
  isInvestigated?: string;
  company?: string;
  involvedParties?: any[];
  description?: string;
}
