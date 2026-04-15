import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer, Download, FileText, User, Car, Wrench, UserCheck, AlertTriangle } from 'lucide-react';
import { api } from '../api';

interface RepairRecordDetailProps {
  id: string;
  onBack: () => void;
}

export default function RepairRecordDetail({ id, onBack }: RepairRecordDetailProps) {
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const result = await api.repairRecord.getById(id);
        // Map service data to the structure expected by the component
        setRecord({
          regNo: 'DJ202404140001',
          company: result.enterprise,
          status: result.status,
          dropOff: {
            name: result.owner,
            idType: '居民身份证',
            idCard: '350102199001011234',
            driverLicense: '350102199001011234',
            birthDate: '1990-01-01',
            gender: '男',
            ethnicity: '汉族',
            address: '福建省福州市鼓楼区某某路1号',
            issueAuthority: '福州市公安局鼓楼分局',
            validPeriod: '2015.01.01-2035.01.01',
            phone: '13800138000',
            workplace: '福州某某科技有限公司',
            receiveTime: result.repairDate + ' 09:00:00',
            receiverName: '王五',
            machineImage: 'https://picsum.photos/seed/machine/400/300',
            personImage: 'https://picsum.photos/seed/person1/400/300'
          },
          pickUp: {
            name: result.owner,
            type: '车主本人',
            idType: '居民身份证',
            idCard: '350102199001011234',
            phone: '13800138000',
            price: result.amount.toFixed(2),
            workplace: '福州某某科技有限公司',
            personImage: 'https://picsum.photos/seed/person2/400/300'
          },
          repair: {
            type: '普通维修',
            createTime: result.repairDate + ' 09:15:00',
            content: result.items.map((i: any) => i.name).join('、'),
            reason: '达到保养里程',
            items: result.items.map((i: any) => i.name).join('、'),
            description: '车辆常规保养，检查刹车片磨损情况，补充防冻液。',
            vehicleImages: [
              'https://picsum.photos/seed/car1/400/300',
              'https://picsum.photos/seed/car2/400/300'
            ],
            damageParts: '无明显受损',
            damageImages: [
              'https://picsum.photos/seed/damage/400/300'
            ]
          }
        });
      } catch (error) {
        console.error('Failed to fetch repair record detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#419EFF] mx-auto mb-4"></div>
          <p className="text-gray-500">详情加载中...</p>
        </div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F5]">
        <div className="text-center">
          <AlertTriangle size={48} className="text-[#fa5e45] mx-auto mb-4" />
          <p className="text-gray-500">未找到维修记录</p>
          <button onClick={onBack} className="mt-4 text-[#419EFF] hover:underline">返回列表</button>
        </div>
      </div>
    );
  }

  const data = record;

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between shrink-0 bg-gray-50/50">
        <div className="flex items-center">
          <h2 className="text-lg font-bold text-[#333333]">维修记录详情 <span className="text-sm font-normal text-gray-400 ml-2">#{data.regNo}</span></h2>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
            <Printer size={16} className="mr-2" /> 打印维修单
          </button>
          <button className="px-4 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
            <Download size={16} className="mr-2" /> 导出数据
          </button>
          <button onClick={onBack} className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
            <ArrowLeft size={16} className="mr-1.5" /> 返回列表
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 custom-scrollbar bg-[#F8FAFC]">
        <div className="w-full space-y-6">
          {/* 状态概览 */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div>
                <span className="text-xs text-gray-400 block mb-1">登记序号</span>
                <span className="text-base font-bold text-[#333333]">{data.regNo}</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div>
                <span className="text-xs text-gray-400 block mb-1">维修企业</span>
                <span className="text-base font-medium text-[#333333]">{data.company}</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-3">当前状态：</span>
              <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                {data.status}
              </span>
            </div>
          </div>

          {/* 送车信息 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center">
              <User size={18} className="text-[#419EFF] mr-2" />
              <h3 className="text-sm font-bold text-[#333333]">送车信息</h3>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8">
              <div>
                <span className="text-sm text-[#999999] block mb-1">送车人姓名</span>
                <span className="text-sm text-[#333333] font-medium">{data.dropOff.name}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">证件类别</span>
                <span className="text-sm text-[#333333] font-medium">{data.dropOff.idType}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">证件号</span>
                <span className="text-sm text-[#333333] font-medium">{data.dropOff.idCard}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">机动车驾驶证号</span>
                <span className="text-sm text-[#333333] font-medium">{data.dropOff.driverLicense}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">出生日期</span>
                <span className="text-sm text-[#333333] font-medium">{data.dropOff.birthDate}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">性别</span>
                <span className="text-sm text-[#333333] font-medium">{data.dropOff.gender}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">民族</span>
                <span className="text-sm text-[#333333] font-medium">{data.dropOff.ethnicity}</span>
              </div>
              <div className="col-span-3">
                <span className="text-sm text-[#999999] block mb-1">户籍地址</span>
                <span className="text-sm text-[#333333] font-medium">{data.dropOff.address}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">签发机关</span>
                <span className="text-sm text-[#333333] font-medium">{data.dropOff.issueAuthority}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">有效期限</span>
                <span className="text-sm text-[#333333] font-medium">{data.dropOff.validPeriod}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">联系电话</span>
                <span className="text-sm text-[#333333] font-medium">{data.dropOff.phone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">工作单位</span>
                <span className="text-sm text-[#333333] font-medium">{data.dropOff.workplace}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">收车时间</span>
                <span className="text-sm text-[#333333] font-medium">{data.dropOff.receiveTime}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">接车业务员姓名</span>
                <span className="text-sm text-[#333333] font-medium">{data.dropOff.receiverName}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">一体机拍摄图片</span>
                <div className="mt-2 w-40 h-30 rounded border border-gray-200 overflow-hidden">
                  <img src={data.dropOff.machineImage} alt="一体机拍摄" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">送车人照片</span>
                <div className="mt-2 w-40 h-30 rounded border border-gray-200 overflow-hidden">
                  <img src={data.dropOff.personImage} alt="送车人照片" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* 取车信息 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center">
              <UserCheck size={18} className="text-[#419EFF] mr-2" />
              <h3 className="text-sm font-bold text-[#333333]">取车信息</h3>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8">
              <div>
                <span className="text-sm text-[#999999] block mb-1">取车人姓名</span>
                <span className="text-sm text-[#333333] font-medium">{data.pickUp.name}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">取车人类型</span>
                <span className="text-sm text-[#333333] font-medium">{data.pickUp.type}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">取车时间</span>
                <span className="text-sm text-[#333333] font-medium">2026-04-16 10:00:00</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">证件类别</span>
                <span className="text-sm text-[#333333] font-medium">{data.pickUp.idType}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">证件号</span>
                <span className="text-sm text-[#333333] font-medium">{data.pickUp.idCard}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">联系电话</span>
                <span className="text-sm text-[#333333] font-medium">{data.pickUp.phone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">维护价格(元)</span>
                <span className="text-sm text-[#333333] font-medium text-orange-500">¥{data.pickUp.price}</span>
              </div>
              <div className="col-span-4">
                <span className="text-sm text-[#999999] block mb-1">工作单位</span>
                <span className="text-sm text-[#333333] font-medium">{data.pickUp.workplace}</span>
              </div>
              <div className="col-span-4">
                <span className="text-sm text-[#999999] block mb-1">取车人照片</span>
                <div className="mt-2 w-40 h-30 rounded border border-gray-200 overflow-hidden">
                  <img src={data.pickUp.personImage} alt="取车人照片" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* 维修信息 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center">
              <Wrench size={18} className="text-[#419EFF] mr-2" />
              <h3 className="text-sm font-bold text-[#333333]">维修信息</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <span className="text-sm text-[#999999] block mb-1">维修类型</span>
                <span className="text-sm text-[#333333] font-medium">{data.repair.type}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">创建时间</span>
                <span className="text-sm text-[#333333] font-medium">{data.repair.createTime}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">维修内容</span>
                <span className="text-sm text-[#333333] font-medium">{data.repair.content}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">修理原因</span>
                <span className="text-sm text-[#333333] font-medium">{data.repair.reason}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">维修项目</span>
                <span className="text-sm text-[#333333] font-medium">{data.repair.items}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">车辆维修内容描述</span>
                <div className="text-sm text-[#333333] leading-relaxed bg-gray-50 p-4 rounded border border-gray-100">
                  {data.repair.description}
                </div>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">车辆受损部位</span>
                <span className="text-sm text-[#333333] font-medium">{data.repair.damageParts}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">车辆照片</span>
                <div className="flex space-x-4 mt-2">
                  {data.repair.vehicleImages.map((img, idx) => (
                    <div key={idx} className="w-40 h-30 rounded border border-gray-200 overflow-hidden">
                      <img src={img} alt={`车辆照片${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">车辆部位图像</span>
                <div className="flex space-x-4 mt-2">
                  {data.repair.damageImages.map((img, idx) => (
                    <div key={idx} className="w-40 h-30 rounded border border-gray-200 overflow-hidden">
                      <img src={img} alt={`部位图像${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
