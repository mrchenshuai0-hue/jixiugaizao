import { Case } from '../types';

const mockCases: Case[] = [
  { id: '1', title: '某某维修厂违规操作案', type: '违规经营', date: '2023-11-10', status: '处理中', caseNo: 'A20231110001', caseName: '某某维修厂违规操作案', occurrenceTime: '2023-11-10 14:30', caseType: '违规经营' },
  { id: '2', title: '盗抢车辆销赃嫌疑案', type: '刑事案件', date: '2023-12-05', status: '已结案', caseNo: 'C20231205002', caseName: '盗抢车辆销赃嫌疑案', occurrenceTime: '2023-12-05 09:15', caseType: '刑事案件' },
  { id: '3', title: '未按规定上传维修记录案', type: '行政违规', date: '2023-10-25', status: '已结案', caseNo: 'A20231025003', caseName: '未按规定上传维修记录案', occurrenceTime: '2023-10-25 10:00', caseType: '行政违规' },
];

export const caseService = {
  getAll: async (): Promise<Case[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCases), 100);
    });
  },
  getById: async (id: string): Promise<any> => {
    return new Promise((resolve) => {
      const caseData = {
        id,
        title: id === '1' ? '某某维修厂违规操作案' : '案事件详情',
        type: '违规经营',
        date: '2023-11-10',
        status: '处理中',
        description: '该维修厂在未核实车主身份的情况下，私自对车辆进行大修，且未按规定上传维修记录。',
        involvedParties: [
          { name: '王五', role: '企业负责人' },
          { name: '赵六', role: '经办人' }
        ],
        evidence: [
          'https://picsum.photos/seed/evidence1/400/300',
          'https://picsum.photos/seed/evidence2/400/300'
        ]
      };
      setTimeout(() => resolve(caseData), 100);
    });
  },
  save: async (data: Partial<Case>): Promise<Case> => {
    return new Promise((resolve) => {
      const newCase = { ...data, id: Math.random().toString(36).substr(2, 9) } as Case;
      mockCases.push(newCase);
      setTimeout(() => resolve(newCase), 300);
    });
  }
};
