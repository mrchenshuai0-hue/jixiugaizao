export interface PersonnelBlacklist {
  id: string;
  name: string;
  idCard: string;
  reason: string;
  date: string;
  operator: string;
}

const mockBlacklist: PersonnelBlacklist[] = [
  { id: '1', name: '王五', idCard: '350102199208089012', reason: '严重违规操作', date: '2023-08-20', operator: '张警官' },
  { id: '2', name: '赵六', idCard: '350102199512123456', reason: '提供虚假证明材料', date: '2023-09-15', operator: '李警官' },
];

export const personnelBlacklistService = {
  getAll: async (): Promise<PersonnelBlacklist[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBlacklist), 100);
    });
  },
  getById: async (id: string): Promise<PersonnelBlacklist | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBlacklist.find(p => p.id === id)), 100);
    });
  },
  save: async (data: Partial<PersonnelBlacklist>): Promise<PersonnelBlacklist> => {
    return new Promise((resolve) => {
      const newBlacklist = { ...data, id: Math.random().toString(36).substr(2, 9) } as PersonnelBlacklist;
      mockBlacklist.push(newBlacklist);
      setTimeout(() => resolve(newBlacklist), 300);
    });
  }
};
