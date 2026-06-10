import { ViolationManagementRecord } from '../types';

const mockRecords: ViolationManagementRecord[] = [
  {
    id: 'V001',
    region: '北京市-北京市公安局',
    companyName: '测试华为公司（2店）',
    enterpriseId: 'HUAWEI-002',
    registrar: 'admin',
    occurrenceTime: '2019-11-15 00:00:00',
    violator: '测试华为公司（2店）',
    caseNo: 'AJ-20191115-01',
    isInvestigated: '否',
    description: '现场检查时发现以下违法违规：',
    caseType: '行政案件',
    caseName: '未按规定如实登记传真信息案',
    caseTime: '2019-11-15 00:00:00',
    caseLocation: '北京市海淀区华为北路',
    deaths: 0,
    injuries: 0,
    propertyValue: '0',
    perpetrators: 1,
    briefCase: '该单位在进行日常经营活动中，未按照相关治安管理条例对部分业务信息进行如实登记。',
    filingTime: '2019-11-15 10:00:00',
    caseOfficers: '张警官',
    filingUnit: '北京市公安局',
    processingResult: '责令限期整改，并处以警告。',
  }
];

export const violationManagementService = {
  getAll: async (): Promise<ViolationManagementRecord[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockRecords), 100);
    });
  },
  getById: async (id: string): Promise<ViolationManagementRecord | null> => {
    return new Promise((resolve) => {
      const record = mockRecords.find(item => item.id === id) || null;
      setTimeout(() => resolve(record), 100);
    });
  },
  save: async (data: Partial<ViolationManagementRecord>): Promise<ViolationManagementRecord> => {
    return new Promise((resolve) => {
      const idx = mockRecords.findIndex(item => item.id === data.id);
      let record: ViolationManagementRecord;
      if (idx > -1) {
        mockRecords[idx] = { ...mockRecords[idx], ...data } as ViolationManagementRecord;
        record = mockRecords[idx];
      } else {
        const newRecord = {
          ...data,
          id: data.id || `V${Math.random().toString(36).substr(2, 9)}`,
          region: data.region || '北京市-北京市公安局',
          isInvestigated: data.isInvestigated || '否',
          occurrenceTime: data.occurrenceTime || new Date().toISOString().replace('T', ' ').substr(0, 19),
        } as ViolationManagementRecord;
        mockRecords.unshift(newRecord);
        record = newRecord;
      }
      setTimeout(() => resolve(record), 300);
    });
  },
  delete: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const idx = mockRecords.findIndex(item => item.id === id);
      if (idx > -1) {
        mockRecords.splice(idx, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
};
