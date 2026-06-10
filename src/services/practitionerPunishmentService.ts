import { PractitionerPunishmentRecord } from '../types';

const mockRecords: PractitionerPunishmentRecord[] = [
  {
    id: '1',
    punishedName: '王铭',
    workUnit: '中安修理公司',
    punishmentDate: '2026-05-12',
    caseName: '违反经营机动维修修业治安管理规定',
    caseStartDate: '2026-05-12',
    caseNo: '1',
    punishmentType: '罚款',
    birthDate: '1988-07-12',
    gender: '男',
    idCard: '110101198807124818',
    ethnic: '汉族',
    education: '研究生及以上',
    caseCategory: '违反经营机动维修',
    punishmentResult: '',
    punishmentAmount: '',
    handlingUnit: '测试缓存',
    handlingOfficer: '办案人员',
    region: '朝阳门派出所',
    companyAddress: '中安科技'
  },
  {
    id: '2',
    punishedName: '王铭',
    workUnit: '中安修理公司',
    punishmentDate: '2026-04-22',
    caseName: '违反经营机动维修修业治安管理规定',
    caseStartDate: '2026-04-22',
    caseNo: '441531',
    punishmentType: '罚款',
    birthDate: '1988-07-12',
    gender: '男',
    idCard: '110101198807124818',
    ethnic: '汉族',
    education: '研究生及以上',
    caseCategory: '违反经营机动维修',
    punishmentResult: '',
    punishmentAmount: '',
    handlingUnit: '测试缓存公安分局',
    handlingOfficer: '办案人员',
    region: '朝阳门派出所',
    companyAddress: '中安科技'
  },
  {
    id: '3',
    punishedName: '王铭',
    workUnit: '中安修理公司',
    punishmentDate: '2026-04-08',
    caseName: '违反经营机动维修修业治安管理规定',
    caseStartDate: '2026-04-08',
    caseNo: '123',
    punishmentType: '罚款',
    birthDate: '1988-07-12',
    gender: '男',
    idCard: '110101198807124818',
    ethnic: '汉族',
    education: '研究生及以上',
    caseCategory: '违反经营机动维修',
    punishmentResult: '',
    punishmentAmount: '',
    handlingUnit: '测试缓存公安分局',
    handlingOfficer: '办案人员',
    region: '朝阳门派出所',
    companyAddress: '中安科技'
  },
  {
    id: '4',
    punishedName: '冯秋1',
    workUnit: '中安企业',
    punishmentDate: '2024-11-14',
    caseName: '违反经营机动维修修业治安管理规定',
    caseStartDate: '2024-11-14',
    caseNo: 'QQ11',
    punishmentType: '罚款',
    birthDate: '1989-06-08',
    gender: '男',
    idCard: '350122198906081717',
    ethnic: '汉族',
    education: '研究生及以上',
    caseCategory: '违反经营机动维修',
    punishmentResult: '',
    punishmentAmount: '',
    handlingUnit: '天华路派出所',
    handlingOfficer: '办案人员',
    region: '天华路派出所',
    companyAddress: '人工智能'
  }
];

export const practitionerPunishmentService = {
  getAll: async (): Promise<PractitionerPunishmentRecord[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockRecords]), 500);
    });
  },

  getById: async (id: string): Promise<PractitionerPunishmentRecord | null> => {
    return new Promise((resolve) => {
      const record = mockRecords.find(r => r.id === id);
      setTimeout(() => resolve(record ? { ...record } : null), 300);
    });
  },

  save: async (data: Partial<PractitionerPunishmentRecord>): Promise<PractitionerPunishmentRecord> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.id) {
          const idx = mockRecords.findIndex(r => r.id === data.id);
          if (idx !== -1) {
            mockRecords[idx] = { ...mockRecords[idx], ...data } as PractitionerPunishmentRecord;
            resolve(mockRecords[idx]);
          }
        } else {
          const newRecord = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
          } as PractitionerPunishmentRecord;
          mockRecords.unshift(newRecord);
          resolve(newRecord);
        }
      }, 500);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const idx = mockRecords.findIndex(r => r.id === id);
        if (idx !== -1) {
          mockRecords.splice(idx, 1);
        }
        resolve();
      }, 300);
    });
  }
};
