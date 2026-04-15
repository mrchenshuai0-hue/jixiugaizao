export interface PersonnelPunishment {
  id: string;
  name: string;
  unit: string;
  date: string;
  caseName: string;
  type: string;
  amount: string;
  status: string;
}

const mockPunishments: PersonnelPunishment[] = [
  { id: '1', name: '张三', unit: '福州市鼓楼区安达汽车维修服务部', date: '2023-11-15', caseName: '未按规定上传维修记录', type: '罚款', amount: '500', status: '已处理' },
  { id: '2', name: '李四', unit: '福州市鼓楼区安达汽车维修服务部', date: '2023-10-20', caseName: '非法改装车辆', type: '停业整顿', amount: '0', status: '处理中' },
];

export const personnelPunishmentService = {
  getAll: async (): Promise<PersonnelPunishment[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPunishments), 100);
    });
  },
  getById: async (id: string): Promise<PersonnelPunishment | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPunishments.find(p => p.id === id)), 100);
    });
  },
  save: async (data: Partial<PersonnelPunishment>): Promise<PersonnelPunishment> => {
    return new Promise((resolve) => {
      const newPunishment = { ...data, id: Math.random().toString(36).substr(2, 9) } as PersonnelPunishment;
      mockPunishments.push(newPunishment);
      setTimeout(() => resolve(newPunishment), 300);
    });
  }
};
