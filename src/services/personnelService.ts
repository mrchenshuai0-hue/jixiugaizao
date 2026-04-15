import { Personnel } from '../types';

const mockPersonnel: Personnel[] = [
  { id: '1', name: '张三', gender: '男', idCard: '350102199001011234', position: '维修工', enterprise: '福州市鼓楼区安达汽车维修服务部', status: '在职', phone: '13800138001' },
  { id: '2', name: '李四', gender: '男', idCard: '350102198505055678', position: '技术负责人', enterprise: '福州市鼓楼区安达汽车维修服务部', status: '在职', phone: '13800138002' },
  { id: '3', name: '王五', gender: '男', idCard: '350102199208089012', position: '治安负责人', enterprise: '台江区顺风机动车修配厂', status: '在职', phone: '13800138003' },
  { id: '4', name: '赵六', gender: '女', idCard: '350102199512123456', position: '前台接待', enterprise: '晋安区通达汽修厂', status: '离职', phone: '13800138004' },
  { id: '5', name: '陈七', gender: '男', idCard: '350102198806067890', position: '钣金工', enterprise: '马尾区远航汽车维修中心', status: '在职', phone: '13800138005' },
];

export const personnelService = {
  getAll: async (): Promise<Personnel[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPersonnel), 100);
    });
  },
  getById: async (id: string): Promise<any> => {
    return new Promise((resolve) => {
      const person = {
        id,
        name: '张三',
        gender: '男',
        idCard: '350102199001011234',
        phone: '13800138000',
        address: '福建省福州市鼓楼区某某街道某某小区',
        birthday: '1990-01-01',
        nation: '汉族',
        education: '大专',
        enterprise: '福州市鼓楼区安达汽车维修服务部',
        position: '维修工',
        entryDate: '2023-05-10',
        status: '在职',
        photo: null,
        personType: '国内人员',
        householdPlace: '福建省福州市',
        householdAddress: '福州市鼓楼区软件大道89号',
        workType: '机修工',
        residenceNo: 'R350102001',
        tempReason: '务工',
        arrivalDate: '2023-05-01',
        residenceDate: '2023-05-05',
        plannedPeriod: '2025-05-05',
        licenseNo: 'L350102001',
        certTypeName: '汽车维修高级工',
        certNo: 'C350102001',
        certStart: '2023-01-01',
        certEnd: '2028-01-01',
        emergencyContact: '张大三',
        emergencyPhone: '13900139000',
        emergencyAddress: '福州市鼓楼区某某街道',
        personnelNo: 'EMP001',
        salaryLevel: 'P2',
        remarks: '表现良好，技术扎实。',
        employmentUnit: '福州市鼓楼区安达汽车维修服务部',
        employmentStart: '2023-05-10',
        contractStart: '2023-05-10',
        contractEnd: '2026-05-10'
      };
      setTimeout(() => resolve(person), 100);
    });
  },
  save: async (data: Partial<Personnel>): Promise<Personnel> => {
    return new Promise((resolve) => {
      const newPerson = { ...data, id: Math.random().toString(36).substr(2, 9) } as Personnel;
      mockPersonnel.push(newPerson);
      setTimeout(() => resolve(newPerson), 300);
    });
  }
};
