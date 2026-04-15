import { RepairRecord } from '../types';

const mockRepairRecords: RepairRecord[] = [
  { id: '1', plateNo: '闽A88888', enterprise: '福州市鼓楼区安达汽车维修服务部', repairDate: '2023-10-20', amount: 1500, status: '已完成' },
  { id: '2', plateNo: '闽A66666', enterprise: '台江区顺风机动车修配厂', repairDate: '2023-11-05', amount: 3200, status: '进行中' },
  { id: '3', plateNo: '闽A12345', enterprise: '仓山区捷豹汽车服务有限公司', repairDate: '2023-09-15', amount: 800, status: '已完成' },
];

export const repairRecordService = {
  getAll: async (): Promise<RepairRecord[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockRepairRecords), 100);
    });
  },
  getById: async (id: string): Promise<any> => {
    return new Promise((resolve) => {
      const record = {
        id,
        plateNo: '闽A88888',
        enterprise: '福州市鼓楼区安达汽车维修服务部',
        repairDate: '2023-10-20',
        amount: 1500,
        status: '已完成',
        items: [
          { name: '更换机油', price: 500 },
          { name: '更换滤芯', price: 200 },
          { name: '工时费', price: 800 }
        ],
        vin: 'LSV12345678901234',
        owner: '张三'
      };
      setTimeout(() => resolve(record), 100);
    });
  },
  save: async (data: Partial<RepairRecord>): Promise<RepairRecord> => {
    return new Promise((resolve) => {
      const newRecord = { ...data, id: Math.random().toString(36).substr(2, 9) } as RepairRecord;
      mockRepairRecords.push(newRecord);
      setTimeout(() => resolve(newRecord), 300);
    });
  }
};
