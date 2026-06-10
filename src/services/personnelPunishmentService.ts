import { caseService } from './caseService';

export interface PersonnelPunishment {
  id: string;
  name: string;
  unit: string;
  date: string;
  caseName: string;
  type: string;
  amount: string;
  status: string;
  idCard?: string;
  gender?: string;
  phone?: string;
  caseNo?: string;
  orgUnit?: string;
}

const mockPunishments: PersonnelPunishment[] = [
  { 
    id: 'pp_1', 
    name: '张三', 
    unit: '福州市鼓楼区安达汽车维修服务部', 
    date: '2026-04-03', 
    caseName: '未按规定上传维修记录', 
    type: '罚款', 
    amount: '500', 
    status: '已处理',
    idCard: '350102199003154421',
    gender: '男',
    phone: '13955667788',
    caseNo: 'AJ20260403001',
    orgUnit: '鼓楼分局治安大队'
  },
  { 
    id: 'pp_2', 
    name: '李四', 
    unit: '福州市鼓楼区安达汽车维修服务部', 
    date: '2026-05-15', 
    caseName: '非法改装车辆', 
    type: '停业整顿', 
    amount: '0', 
    status: '处理中',
    idCard: '350102199201201122',
    gender: '男',
    phone: '13588990022',
    caseNo: 'AJ20260515502',
    orgUnit: '鼓楼派出所'
  },
];

export const personnelPunishmentService = {
  getAll: async (): Promise<PersonnelPunishment[]> => {
    return new Promise(async (resolve) => {
      // Create a copy of mockPunishments
      const list = [...mockPunishments];

      try {
        // Dynamic scan case suspect list to build flow relations
        const cases = await caseService.getAll();
        cases.forEach(c => {
          if (c.suspects && Array.isArray(c.suspects)) {
            c.suspects.forEach(s => {
              // Avoid duplicates mapping
              const hasDup = list.some(p => p.idCard === s.idCard || (p.name === s.name && p.caseName === c.caseName));
              if (!hasDup && s.name) {
                let mappedType = '治安处罚';
                if (c.caseType === '刑事案件') {
                  mappedType = '刑事查办';
                } else if (s.status === '已捕/已拘留') {
                  mappedType = '行政拘留';
                } else {
                  mappedType = '治安罚款';
                }

                list.push({
                  id: `sus_dyn_${c.id}_${s.id || s.idCard || Math.random()}`,
                  name: s.name,
                  unit: c.associatedPlaceName || c.company || '福州市鼓楼区安达汽车维修服务部',
                  date: c.date || (c.occurrenceTime ? c.occurrenceTime.substring(0, 10) : '2026-06-08'),
                  caseName: c.caseName || c.title || '案事件调查记录',
                  type: mappedType,
                  amount: s.status === '已移送起诉' || s.status === '已捕/已拘留' ? '2000' : '500',
                  status: s.status === '已移送起诉' ? '已处理' : '处理中',
                  idCard: s.idCard,
                  gender: s.gender,
                  phone: s.phone,
                  caseNo: c.caseNo,
                  orgUnit: c.filingUnit || c.dispatchPoliceStation || '鼓楼分局'
                });
              }
            });
          }
        });
      } catch (err) {
        console.error('Failed to sync case suspects dynamically:', err);
      }

      resolve(list);
    });
  },
  getById: async (id: string): Promise<PersonnelPunishment | undefined> => {
    return new Promise(async (resolve) => {
      const allList = await personnelPunishmentService.getAll();
      resolve(allList.find(p => p.id === id));
    });
  },
  save: async (data: Partial<PersonnelPunishment>): Promise<PersonnelPunishment> => {
    return new Promise((resolve) => {
      const newPunishment = { 
        ...data, 
        id: data.id || 'pp_manual_' + Math.random().toString(36).substring(2, 9),
        status: data.status || '处理中',
        amount: data.amount || '0'
      } as PersonnelPunishment;
      mockPunishments.push(newPunishment);
      resolve(newPunishment);
    });
  },
  delete: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const idx = mockPunishments.findIndex(p => p.id === id);
      if (idx > -1) {
        mockPunishments.splice(idx, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
};
