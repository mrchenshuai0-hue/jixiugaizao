export interface RecordEnterprise {
  id: string;
  name: string;
  uscc: string;
  legalRep: string;
  address: string;
  region: string;
  status: string;
  updateDate: string;
  category: string;
  attachmentsComplete: boolean;
  legalRepPhone?: string;
  legalRepId?: string;
  contactName?: string;
  contactPhone?: string;
  contactMobile?: string;
  postalCode?: string;
}

export const mockRecordEnterprises: RecordEnterprise[] = [
  {
    id: '1',
    name: '某汽车维修有限公司',
    uscc: '91350100MA34567890',
    legalRep: '张三',
    address: '福建省福州市马尾区罗星街道28号',
    region: '某区',
    status: '已备案',
    updateDate: '2026-04-10',
    category: '一类汽车维修',
    attachmentsComplete: true,
    legalRepPhone: '13811112222',
    legalRepId: '350102198001011234',
    contactName: '陈林',
    contactPhone: '0591-88888888',
    contactMobile: '13811112222',
    postalCode: '350001'
  },
  {
    id: '2',
    name: '众安机修服务部',
    uscc: '91350100MA11223344',
    legalRep: '赵六',
    address: '福建省福州市鼓楼区广达路108号',
    region: '某区',
    status: '已备案',
    updateDate: '2026-05-15',
    category: '三类专项维修',
    attachmentsComplete: false,
    legalRepPhone: '13922223333',
    legalRepId: '350102198501011211',
    contactName: '陆金森',
    contactPhone: '0591-87777777',
    contactMobile: '13922223333',
    postalCode: '350002'
  },
  {
    id: '3',
    name: '某汽车服务中心',
    uscc: '91350100MA98765432',
    legalRep: '王五',
    address: '福建省福州市晋安区新店镇12号',
    region: '郊区',
    status: '备案过期',
    updateDate: '2025-04-10',
    category: '二类汽车维修',
    attachmentsComplete: false,
    legalRepPhone: '13700137000',
    legalRepId: '350102198305052211',
    contactName: '王五',
    contactPhone: '0591-86666666',
    contactMobile: '13700137000',
    postalCode: '350012'
  },
  {
    id: '4',
    name: '福州速达汽车维修部',
    uscc: '91350122MA66778899',
    legalRep: '刘一',
    address: '福建省福州市仓山区建新镇金山大道50号',
    region: '郊区',
    status: '已备案',
    updateDate: '2026-05-18',
    category: '二类汽车维修',
    attachmentsComplete: true,
    legalRepPhone: '13566667777',
    legalRepId: '350102197708083321',
    contactName: '刘一',
    contactPhone: '0591-85555555',
    contactMobile: '13566667777',
    postalCode: '350008'
  },
  {
    id: '5',
    name: '兴隆摩托车修理厂',
    uscc: '91350103MA77889900',
    legalRep: '周九',
    address: '福建省福州市台江区鳌峰街道29号',
    region: '其他区',
    status: '已备案',
    updateDate: '2026-05-20',
    category: '三类专项维修',
    attachmentsComplete: false,
    legalRepPhone: '13699998888',
    legalRepId: '350103198912124567',
    contactName: '周九',
    contactPhone: '0591-84444444',
    contactMobile: '13699998888',
    postalCode: '350004'
  },
  {
    id: '6',
    name: '某精工汽修',
    uscc: '91350100MA11112222',
    legalRep: '钱八',
    address: '福建省福州市马尾区君竹路16号',
    region: '某区',
    status: '已备案',
    updateDate: '2026-04-12',
    category: '一类汽车维修',
    attachmentsComplete: true,
    legalRepPhone: '13388889999',
    legalRepId: '350102198001011215',
    contactName: '方敏',
    contactPhone: '0591-83333333',
    contactMobile: '13388889999',
    postalCode: '350015'
  },
];
