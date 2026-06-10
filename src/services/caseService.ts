import { Case } from '../types';

const mockCases: Case[] = [
  {
    id: '1',
    title: '聚众斗殴事件',
    type: '治安事件',
    date: '2026-04-03',
    status: '已结案',
    caseNo: 'AJ202604001',
    caseName: '聚众斗殴事件',
    caseCategory: '治安事件',
    caseType: '行政案件',
    caseStartTime: '2026-04-03 14:30:00',
    caseEndTime: '2026-04-03 16:00:00',
    caseStatus: '已结案',
    dispatchPoliceStation: '武昌分局珞瑜路派出所',
    alarmNo: 'JQ20260403001',
    alarmTime: '2026-04-03 15:00:00',
    crimeSceneDistrict: '武汉市武昌区',
    caseRegion: '武汉市武昌区',
    crimeSceneAddress: '武汉市武昌区星火路123号',
    caseSource: '执法办案系统',
    briefCase: '2026年4月3日14时许，在武汉市武昌区星火路123号星河娱乐管理有限公司内，因琐事发生口角后聚众斗殴，造成一人轻伤。',
    punishmentMeasures: '对主要责任人处以行政拘留15日，罚款500元。',
    caseImages: [
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ],
    
    filingTime: '2026-04-03 18:00:00',
    filingUnit: '武昌分局',
    filingOfficer: '张三',
    transferTime: '2026-04-10 09:00:00',
    transferUnit: '武昌分局治安大队',
    transferOfficer: '李四',
    acceptanceTime: '2026-04-10 10:00:00',
    acceptanceUnit: '武昌分局治安大队',
    acceptor: '王五',
    solutionTime: '2026-04-15 14:00:00',
    solutionUnit: '武昌分局',
    solutionOfficer: '赵六',
    closingTime: '2026-04-20 16:00:00',
    cancellationTime: '',
    
    occurrenceTime: '2026-04-03 14:30:00',
    registrar: '张警官',
    violator: '李雷, 韩梅梅等',
    isInvestigated: '已查处',
    company: '武汉市武昌区星河娱乐管理有限公司',
    isProblemPlaceAssociated: '已关联',
    associatedPlaceName: '福州市鼓楼区安达汽车维修服务部',
    associatedEnterpriseIds: ['1'],
    
    suspects: [
      { id: 's1', name: '王大锤', gender: '男', idCard: '420106199208111122', phone: '13988889999', status: '已拘留' },
      { id: 's2', name: '李阿狗', gender: '男', idCard: '420106199403058844', phone: '13577776666', status: '取保候审' }
    ],
    victims: [
      { id: 'v1', name: '赵铁柱', gender: '男', idCard: '420106199001015522', phone: '13611112222', details: '头部软组织挫伤，轻微伤。' }
    ]
  },
  {
    id: '2',
    title: '未按规定登记人员信息案',
    type: '治安事件',
    date: '2026-05-15',
    status: '处理中',
    caseNo: 'AJ202605152',
    caseName: '未按规定登记人员信息案',
    caseCategory: '治安事件',
    caseType: '行政案件',
    caseStartTime: '2026-05-15 10:00:00',
    caseEndTime: '2026-05-15 11:30:00',
    caseStatus: '处理中',
    dispatchPoliceStation: '鼓楼派出所',
    alarmNo: 'JQ20260515502',
    alarmTime: '2026-05-15 10:15:00',
    crimeSceneDistrict: '福州市鼓楼区',
    caseRegion: '福州市鼓楼区',
    crimeSceneAddress: '鼓楼区安达路15号',
    caseSource: '民警补登',
    registrationOfficer: '高警官',
    briefCase: '巡查中发现，安达汽车维修服务部在承接业务时，未核验驾驶员及其身份证件，违反《机动车修理业治安管理条例》相关规定。',
    punishmentMeasures: '拟对该汽车维修服务部责令限期整改，并处以罚款人民币 2000 元。',
    caseImages: [
      'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ],
    
    filingTime: '2026-05-15 14:00:00',
    filingUnit: '鼓楼分局治安大队',
    filingOfficer: '王本善',
    transferTime: '',
    transferUnit: '',
    transferOfficer: '',
    acceptanceTime: '2026-05-15 11:00:00',
    acceptanceUnit: '鼓楼派出所',
    acceptor: '林警官',
    solutionTime: '',
    solutionUnit: '',
    solutionOfficer: '',
    closingTime: '',
    cancellationTime: '',

    occurrenceTime: '2026-05-15 10:00:00',
    registrar: '高警官',
    violator: '安达汽车维修服务部',
    isInvestigated: '未查处',
    company: '福州市鼓楼区安达汽车维修服务部',
    isProblemPlaceAssociated: '未关联',
    associatedPlaceName: '晋安区通达汽修厂',
    associatedEnterpriseIds: ['2'],
    
    suspects: [
      { id: 's3', name: '安达汽修部负责人', gender: '男', idCard: '350102198001013322', phone: '13800138000', status: '接受调查中' }
    ],
    victims: []
  },
  {
    id: '3',
    title: '盗抢二手车辆销赃案',
    type: '刑事案件',
    date: '2026-03-24',
    status: '已结案',
    caseNo: 'AJ202603024',
    caseName: '盗抢二手车辆销赃案',
    caseCategory: '刑事案件',
    caseType: '刑事案件',
    caseStartTime: '2026-03-24 02:00:00',
    caseEndTime: '2026-03-24 04:00:00',
    caseStatus: '已结案',
    dispatchPoliceStation: '台江分局刑侦大队',
    alarmNo: 'JQ20260324101',
    alarmTime: '2026-03-24 08:30:00',
    crimeSceneDistrict: '福州市台江区',
    caseRegion: '福州市台江区',
    crimeSceneAddress: '台江区六一中路450号',
    caseSource: '执法办案系统',
    briefCase: '某违法团伙多次在夜间实施摩托车及小货车盗窃，并运往城郊非正规维修网点进行拆解、改喷漆并低价销赃。',
    punishmentMeasures: '拘留犯罪嫌疑人4名，查获被盗摩托车6部。相关网点已被依法查封。',
    caseImages: [],
    
    filingTime: '2026-03-24 10:00:00',
    filingUnit: '台江分局',
    filingOfficer: '陈队长',
    transferTime: '2026-04-02 11:00:00',
    transferUnit: '台江区人民检察院',
    transferOfficer: '朱警官',
    acceptanceTime: '2026-03-24 08:45:00',
    acceptanceUnit: '台江分局',
    acceptor: '李警官',
    solutionTime: '2026-03-29 17:00:00',
    solutionUnit: '台江分局刑侦大队',
    solutionOfficer: '李警官',
    closingTime: '2026-04-15 16:00:00',
    cancellationTime: '',

    occurrenceTime: '2026-03-24 02:00:00',
    registrar: '李警官',
    violator: '摩托拆解修配网点',
    isInvestigated: '已查处',
    company: '台江区顺风机动车修配厂',
    isProblemPlaceAssociated: '不关联',
    associatedPlaceName: '',
    associatedEnterpriseIds: [],
    
    suspects: [
      { id: 's4', name: '张阿牛', gender: '男', idCard: '350103198811124455', phone: '13022223333', status: '已逮捕' },
      { id: 's5', name: '陈阿马', gender: '男', idCard: '350103198905201122', phone: '13144445555', status: '已逮捕' }
    ],
    victims: [
      { id: 'v2', name: '廖先生', gender: '男', idCard: '350102198006061122', phone: '18912345678', details: '被盗雅马哈摩托车1部，价值 1.5 万元。' }
    ]
  }
];

export const caseService = {
  getAll: async (): Promise<Case[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCases), 100);
    });
  },
  getById: async (id: string): Promise<Case | null> => {
    return new Promise((resolve) => {
      const caseItem = mockCases.find(item => item.id === id) || null;
      setTimeout(() => resolve(caseItem), 100);
    });
  },
  save: async (data: Partial<Case>): Promise<Case> => {
    return new Promise((resolve) => {
      const idx = mockCases.findIndex(item => item.id === data.id);
      let caseResult: Case;
      if (idx > -1) {
        mockCases[idx] = { ...mockCases[idx], ...data } as Case;
        caseResult = mockCases[idx];
      } else {
        const newCase = {
          ...data,
          id: data.id || Math.random().toString(36).substr(2, 9),
          title: data.caseName || data.title || '新增案事件',
          type: data.caseCategory || data.type || '治安事件',
          date: data.occurrenceTime ? data.occurrenceTime.substr(0, 10) : new Date().toISOString().substr(0, 10),
          status: data.caseStatus || data.status || '处理中',
        } as Case;
        mockCases.push(newCase);
        caseResult = newCase;
      }
      setTimeout(() => resolve(caseResult), 300);
    });
  },
  delete: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const idx = mockCases.findIndex(item => item.id === id);
      if (idx > -1) {
        mockCases.splice(idx, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
};
