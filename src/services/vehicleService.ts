import { Vehicle } from '../types';

const mockVehicles: Vehicle[] = [
  { id: '1', plateNo: '闽A88888', vin: 'LSV12345678901234', owner: '张三', type: '小型轿车', status: '正常', brand: '丰田', model: '凯美瑞', color: '黑色', engineNo: 'ENG123456', registerDate: '2021-01-15' },
  { id: '2', plateNo: '闽A66666', vin: 'LSV98765432109876', owner: '李四', type: '中型客车', status: '维修中', brand: '本田', model: '雅阁', color: '白色', engineNo: 'ENG987654', registerDate: '2020-05-20' },
  { id: '3', plateNo: '闽A12345', vin: 'LSV55555555555555', owner: '王五', type: '大型货车', status: '正常', brand: '大众', model: '迈腾', color: '银色', engineNo: 'ENG555555', registerDate: '2022-08-10' },
];

export const vehicleService = {
  getAll: async (): Promise<Vehicle[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockVehicles), 100);
    });
  },
  getById: async (id: string): Promise<any> => {
    return new Promise((resolve) => {
      const vehicle = {
        id,
        plateNo: id === '1' ? '闽A88888' : '闽AXXXXX',
        vin: 'LSV12345678901234',
        owner: '张三',
        type: '小型轿车',
        status: '正常',
        brand: '丰田',
        model: '凯美瑞',
        color: '黑色',
        engineNo: 'ENG123456',
        registerDate: '2021-01-15',
        lastRepairDate: '2023-10-20',
        mileage: '45000',
        insuranceDate: '2024-01-15'
      };
      setTimeout(() => resolve(vehicle), 100);
    });
  },
  save: async (data: Partial<Vehicle>): Promise<Vehicle> => {
    return new Promise((resolve) => {
      const newVehicle = { ...data, id: Math.random().toString(36).substr(2, 9) } as Vehicle;
      mockVehicles.push(newVehicle);
      setTimeout(() => resolve(newVehicle), 300);
    });
  }
};
