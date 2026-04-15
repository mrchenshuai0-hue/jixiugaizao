import { Inspection } from '../types';

const mockInspections: Inspection[] = [
  { id: '1', enterprise: '福州市鼓楼区安达汽车维修服务部', company: '福州市鼓楼区安达汽车维修服务部', inspector: '张警官', inspectors: '张警官, 李警官', date: '2023-10-15', result: '合格', status: '已完成', method: '日常检查', situation: '正常' },
  { id: '2', enterprise: '台江区顺风机动车修配厂', company: '台江区顺风机动车修配厂', inspector: '李警官', inspectors: '李警官', date: '2023-11-02', result: '限期整改', status: '待整改', method: '专项检查', situation: '发现问题' },
  { id: '3', enterprise: '仓山区捷豹汽车服务有限公司', company: '仓山区捷豹汽车服务有限公司', inspector: '王警官', inspectors: '王警官, 赵警官', date: '2023-09-20', result: '不合格', status: '已完成', method: '双随机检查', situation: '发现问题' },
];

export const inspectionService = {
  getAll: async (): Promise<Inspection[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockInspections), 100);
    });
  },
  getById: async (id: string): Promise<any> => {
    return new Promise((resolve) => {
      const inspection = {
        id,
        enterprise: id === '1' ? '福州市鼓楼区安达汽车维修服务部' : '某某企业',
        inspector: '张警官',
        date: '2023-10-15',
        result: '合格',
        status: '已完成',
        type: '日常检查',
        content: '检查了消防设施、监控运行情况、从业人员登记情况。',
        items: [
          { name: '消防设施', status: '合格' },
          { name: '监控运行', status: '合格' },
          { name: '人员登记', status: '合格' },
          { name: '实名登记', status: '合格' }
        ],
        images: [
          'https://picsum.photos/seed/check1/400/300',
          'https://picsum.photos/seed/check2/400/300'
        ]
      };
      setTimeout(() => resolve(inspection), 100);
    });
  },
  save: async (data: Partial<Inspection>): Promise<Inspection> => {
    return new Promise((resolve) => {
      const newInspection = { ...data, id: Math.random().toString(36).substr(2, 9) } as Inspection;
      mockInspections.push(newInspection);
      setTimeout(() => resolve(newInspection), 300);
    });
  }
};
