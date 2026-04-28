import { Enterprise } from '../types';

const mockEnterprises: Enterprise[] = [
  { id: '1', name: '福州市鼓楼区安达汽车维修服务部', uscc: '91350102MA34567890', enterpriseCode: 'E350102001', category: '二类维修', region: '福州市鼓楼区', jurisdiction: '福州市鼓楼区公安分局', riskCreditLevel: 'A级', recordStatus: '已备案', status: '正常营业', lastCheck: '合格 (2023-10-15)', legalRep: '张安达', legalRepPhone: '13811112222', registerDate: '2020-01-10', employeeCount: 15, inspectionCount: 8, address: '鼓楼区软件园F区' },
  { id: '2', name: '台江区顺风机动车修配厂', uscc: '91350103MA12345678', enterpriseCode: 'E350103002', category: '三类维修', region: '福州市台江区', jurisdiction: '福州市台江区公安分局', riskCreditLevel: 'B级', recordStatus: '未备案', status: '正常营业', lastCheck: '未检查', legalRep: '王顺风', legalRepPhone: '13933334444', registerDate: '2021-05-20', employeeCount: 8, inspectionCount: 2, address: '台江区鳌峰路12号' },
  { id: '3', name: '仓山区捷豹汽车服务有限公司', uscc: '91350104MA87654321', enterpriseCode: 'E350104003', category: '一类维修', region: '福州市仓山区', jurisdiction: '福州市仓山区公安分局', riskCreditLevel: 'AA级', recordStatus: '备案过期', status: '歇业', lastCheck: '不合格 (2023-09-20)', legalRep: '林捷豹', legalRepPhone: '13755556666', registerDate: '2019-11-01', employeeCount: 45, inspectionCount: 12, address: '仓山区首山路8号' },
  { id: '4', name: '晋安区通达汽修厂', uscc: '91350105MA23456789', enterpriseCode: 'E350105004', category: '二类维修', region: '福州市晋安区', jurisdiction: '福州市晋安区公安分局', riskCreditLevel: 'B级', recordStatus: '已备案', status: '正常营业', lastCheck: '合格 (2023-11-02)', legalRep: '陈通达', legalRepPhone: '13677778888', registerDate: '2022-03-15', employeeCount: 12, inspectionCount: 5, address: '晋安区福马路100号' },
  { id: '5', name: '马尾区远航汽车维修中心', uscc: '91350105MA23456789', enterpriseCode: 'E350105005', category: '摩托车维修', region: '福州市马尾区', jurisdiction: '福州市马尾区公安分局', riskCreditLevel: 'A级', recordStatus: '待审核', status: '正常营业', lastCheck: '合格 (2023-11-05)', legalRep: '郑远航', legalRepPhone: '13599990000', registerDate: '2023-01-20', employeeCount: 5, inspectionCount: 3, address: '马尾区江滨路' },
];

export const enterpriseService = {
  getAll: async (): Promise<Enterprise[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockEnterprises), 100);
    });
  },
  getById: async (id: string): Promise<any> => {
    return new Promise((resolve) => {
      const enterprise = {
        id,
        name: id === '1' ? '福州市鼓楼区安达汽车维修服务部' : '某某汽车维修服务部',
        uscc: '91350102MA34567890',
        category: '二类维修',
        recordNo: 'BA-2023-1001',
        recordStatus: '已备案',
        status: '正常营业',
        legalRep: '张三',
        contact: '13800138000',
        address: '福建省福州市鼓楼区软件大道89号',
        standardAddress: '福州市鼓楼区软件园F区8号楼',
        standardAddressCode: '3501020010010001',
        longitude: '119.273456',
        latitude: '26.104567',
        registeredCapital: '500',
        economicType: '内资',
        openingDate: '2020-05-12',
        companyPhone: '0591-88888888',
        legalRepId: '350102198001011234',
        legalRepPhone: '13800138000',
        legalRepAddress: '福州市鼓楼区某某街道某某小区',
        legalRepCode: 'L12345678',
        fax: '0591-88888889',
        postalCode: '350000',
        buildingArea: '1200',
        holidayClosed: '是',
        manager: '李四',
        managerId: '350102198505055678',
        managerPhone: '13900139000',
        managerAddress: '福州市鼓楼区某某路某某大厦',
        securityManager: '王五',
        protectionManager: '赵六',
        protectionPhone: '13700137000',
        protectionDeptPhone: '0591-77777777',
        protectionStaffCount: '5',
        specialRecordNo: 'TH-2023-001',
        specialRecordAgency: '鼓楼分局治安大队',
        industryLicenseNo: 'XK-2023-888',
        taxAgency: '鼓楼区税务局',
        securityAgency: '五凤派出所',
        dataCollection: '是',
        videoDevice: '是',
        fireDevice: '是',
        riskCreditLevel: 'A级',
        licenseAuthority: '福州市市场监督管理局',
        taxRegNo: '91350102MA34567890',
        taxRegAuthority: '福州市鼓楼区税务局',
        enterprisePoints: 100,
        industryLicenseAuthority: '福州市交通运输局',
        registrationDate: '2023-10-15',
        adminManager: '陈警官',
        adminManagerPhone: '13600136000',
        adminPolice: '林警官',
        adminPolicePhone: '13500135000',
        clientModules: ['维修', '配件', '美容'],
      };
      setTimeout(() => resolve(enterprise), 100);
    });
  },
  save: async (data: Partial<Enterprise>): Promise<Enterprise> => {
    return new Promise((resolve) => {
      const newEnterprise = { ...data, id: Math.random().toString(36).substr(2, 9) } as Enterprise;
      mockEnterprises.push(newEnterprise);
      setTimeout(() => resolve(newEnterprise), 300);
    });
  }
};
