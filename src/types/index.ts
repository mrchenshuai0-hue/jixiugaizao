export interface Enterprise {
  id: string;
  name: string;
  uscc: string;
  category: string;
  region: string;
  recordStatus: string;
  status: string;
  lastCheck: string;
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
}
