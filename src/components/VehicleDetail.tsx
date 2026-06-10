import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer, Download, Car, AlertTriangle, ShieldAlert, UserCheck, Settings, Camera, FileText } from 'lucide-react';
import { api } from '../api';

interface VehicleDetailProps {
  id: string;
  onBack: () => void;
}

export default function VehicleDetail({ id, onBack }: VehicleDetailProps) {
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const result = await api.vehicle.getById(id);
        setVehicle({
          basic: {
            company: '福州市鼓楼区安达汽车维修服务部',
            bizType: '一般维修',
            uploadDate: '2024-04-14',
            type: result.type,
            brand: result.brand,
            model: result.model,
            owner: result.owner,
            ownerId: '350102199001011234',
            ownerPhone: '13800138000',
            ownerCompany: '福州某某科技有限公司',
            licenseCoreNo: '350100001234',
            color: result.color,
            plateType: '小型汽车号牌',
            plateNo: result.plateNo,
            engineNo: result.engineNo,
            vin: result.vin,
            vehicleImage: 'https://picsum.photos/seed/car1/800/600'
          },
          handover: {
            deliveryName: '张三',
            idType: '身份证',
            idNo: '350102198505051234',
            birthDate: '1985-05-05',
            gender: '男',
            ethnicity: '汉族',
            address: '福建省福州市鼓楼区某某街道123号',
            phone: '13900139000',
            receiveTime: '2024-04-14 09:30:00',
            pickupName: '李四',
            pickupIdType: '身份证',
            pickupIdNo: '350102198610105678',
            pickupBirthDate: '1986-10-10',
            pickupGender: '女',
            pickupEthnicity: '汉族',
            pickupAddress: '福建省福州市马尾区罗星街道55号',
            pickupPhone: '13888889999',
            pickupTime: '2024-04-16 16:30:00',
            repairPrice: '1280.00'
          },
          repairs: [
            { id: 1, content: '更换机油、机滤', photo: 'https://picsum.photos/seed/rep1/400/300', reason: '常规保养', time: '2024-04-14 10:00:00' },
            { id: 2, content: '前保险杠喷漆', photo: 'https://picsum.photos/seed/rep2/400/300', reason: '刮擦修复', time: '2024-04-14 11:30:00' }
          ],
          suspicious: {
            category: '车架号被涂改',
            reporter: '李四（维修工）',
            reportTime: '2024-04-14 10:30:00',
            description: '车辆送修时发现发动机舱内的车架号有明显的打磨和重新刻印痕迹，且与行驶证登记信息字体不符。'
          },
          accident: {
            certNo: '交认字[2024]第00123号',
            certUnit: '福州市公安局交通警察支队鼓楼大队',
            damagePart1: '前保险杠',
            damagePart2: '左前翼子板',
            damagePart3: '左前大灯',
            reporter: '王五（业务员）',
            reportTime: '2024-04-14 09:15:00',
            damageImages: [
              'https://picsum.photos/seed/damage1/400/300',
              'https://picsum.photos/seed/damage2/400/300',
              'https://picsum.photos/seed/damage3/400/300'
            ]
          }
        });
      } catch (error) {
        console.error('Failed to fetch vehicle detail:', error);
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
          <p className="text-gray-500 text-xs">详情加载中...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F5]">
        <div className="text-center">
          <AlertTriangle size={48} className="text-[#fa5e45] mx-auto mb-4" />
          <p className="text-gray-500">未找到车辆信息</p>
          <button onClick={onBack} className="mt-4 text-[#419EFF] hover:underline">返回列表</button>
        </div>
      </div>
    );
  }

  const data = vehicle;

  return (
    <div className="h-full flex flex-col bg-[#F5F5F5] overflow-hidden">
      {/* 头部固定 */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between shrink-0 bg-white shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-[#333333]">车辆详情库信息查看</h2>
            <p className="text-xs text-gray-400 mt-0.5">业务单号: #{id} | 车牌号: {data.basic.plateNo}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-1.5 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
            <Printer size={16} className="mr-2" /> 打印
          </button>
          <button className="px-4 py-1.5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
            <Download size={16} className="mr-2" /> 导出
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
        {/* 1. 基本信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              基本信息
            </h3>
          </div>
          <div className="p-6 flex flex-col md:flex-row gap-8">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
              <ReadOnlyField label="所属企业" value={data.basic.company} className="md:col-span-3" />
              <ReadOnlyField label="业务类型" value={data.basic.bizType} />
              <ReadOnlyField label="上传日期" value={data.basic.uploadDate} />
              <ReadOnlyField label="车牌号" value={data.basic.plateNo} />
              <ReadOnlyField label="号牌种类" value={data.basic.plateType} />
              <ReadOnlyField label="车身颜色" value={data.basic.color} />
              <ReadOnlyField label="车辆类型" value={data.basic.type} />
              <ReadOnlyField label="车辆品牌" value={data.basic.brand} />
              <ReadOnlyField label="车辆型号" value={data.basic.model} />
              <ReadOnlyField label="发动机号" value={data.basic.engineNo} />
              <ReadOnlyField label="车架号" value={data.basic.vin} />
              <ReadOnlyField label="车主姓名" value={data.basic.owner} />
              <ReadOnlyField label="车主身份证号" value={data.basic.ownerId} />
              <ReadOnlyField label="车主联系方式" value={data.basic.ownerPhone} />
              <ReadOnlyField label="车主公司" value={data.basic.ownerCompany} className="md:col-span-3" />
            </div>
            <div className="w-64 shrink-0">
              <label className="text-sm font-medium text-gray-700 block mb-2">车辆图片</label>
              <div className="aspect-[4/3] rounded border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                <img src={data.basic.vehicleImage} alt="车牌照" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* 2. 交接信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              交接信息
            </h3>
          </div>
          <div className="p-6 space-y-8">
            {/* 送车人相关信息 */}
            <div>
              <h4 className="text-xs font-bold text-[#419EFF] mb-4 flex items-center gap-1.5 border-b border-gray-100 pb-2">
                <span className="w-1.5 h-3 bg-[#419EFF] rounded-full"></span>
                送车人相关信息
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                <ReadOnlyField label="送车人姓名" value={data.handover.deliveryName} />
                <ReadOnlyField label="证件类别" value={data.handover.idType} />
                <ReadOnlyField label="证件号" value={data.handover.idNo} />
                <ReadOnlyField label="出生日期" value={data.handover.birthDate} />
                <ReadOnlyField label="性别" value={data.handover.gender} />
                <ReadOnlyField label="民族" value={data.handover.ethnicity} />
                <ReadOnlyField label="户籍地址" value={data.handover.address} className="md:col-span-2" />
                <ReadOnlyField label="联系电话" value={data.handover.phone} />
                <ReadOnlyField label="收车时间" value={data.handover.receiveTime} />
              </div>
            </div>

            {/* 取车人相关信息 */}
            <div>
              <h4 className="text-xs font-bold text-green-600 mb-4 flex items-center gap-1.5 border-b border-gray-100 pb-2">
                <span className="w-1.5 h-3 bg-green-500 rounded-full"></span>
                取车人相关信息
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                <ReadOnlyField label="取车人姓名" value={data.handover.pickupName} />
                <ReadOnlyField label="证件类别" value={data.handover.pickupIdType} />
                <ReadOnlyField label="证件号" value={data.handover.pickupIdNo} />
                <ReadOnlyField label="出生日期" value={data.handover.pickupBirthDate} />
                <ReadOnlyField label="性别" value={data.handover.pickupGender} />
                <ReadOnlyField label="民族" value={data.handover.pickupEthnicity} />
                <ReadOnlyField label="户籍地址" value={data.handover.pickupAddress} className="md:col-span-2" />
                <ReadOnlyField label="联系电话" value={data.handover.pickupPhone} />
                <ReadOnlyField label="取车时间" value={data.handover.pickupTime} />
                <ReadOnlyField label="维修价格（元）" value={data.handover.repairPrice} />
              </div>
            </div>
          </div>
        </section>

        {/* 3. 维修信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              维修信息
            </h3>
          </div>
          <div className="p-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-xs border-b border-gray-200">
                  <th className="px-6 py-3 font-medium w-20">序号</th>
                  <th className="px-6 py-3 font-medium">维修内容</th>
                  <th className="px-6 py-3 font-medium w-48">照片</th>
                  <th className="px-6 py-3 font-medium">修理原因</th>
                  <th className="px-6 py-3 font-medium">创建时间</th>
                </tr>
              </thead>
              <tbody className="text-xs text-[#666666]">
                {data.repairs.map((rep: any) => (
                  <tr key={rep.id} className="border-b border-gray-100">
                    <td className="px-6 py-4">{rep.id}</td>
                    <td className="px-6 py-4 text-[#333333] font-medium">{rep.content}</td>
                    <td className="px-6 py-4">
                      <div className="w-32 h-20 rounded border border-gray-200 overflow-hidden bg-gray-50">
                        <img src={rep.photo} alt={rep.content} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4">{rep.reason}</td>
                    <td className="px-6 py-4 font-mono">{rep.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. 可疑及事故车辆 (合并显示) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
           {/* 可疑 */}
           <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
                <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-orange-400 rounded-full"></div>
                  可疑车辆记录
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <ReadOnlyField label="可疑类别" value={data.suspicious.category} />
                   <ReadOnlyField label="报告时间" value={data.suspicious.reportTime} />
                </div>
                <ReadOnlyField label="疑点描述" value={data.suspicious.description} className="h-auto" />
              </div>
           </section>

           {/* 事故 */}
           <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
                <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-red-400 rounded-full"></div>
                  事故车辆记录
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <ReadOnlyField label="证明单位" value={data.accident.certUnit} className="col-span-2" />
                   <ReadOnlyField label="证明编号" value={data.accident.certNo} className="col-span-2" />
                   <ReadOnlyField label="损毁部位" value={data.accident.damagePart1} />
                   <ReadOnlyField label="报告时间" value={data.accident.reportTime} />
                </div>
                <div className="flex gap-2">
                   {data.accident.damageImages.slice(0, 2).map((img: string, idx: number) => (
                     <div key={idx} className="w-24 h-18 rounded border border-gray-200 overflow-hidden shrink-0">
                       <img src={img} alt="损毁图" className="w-full h-full object-cover" />
                     </div>
                   ))}
                </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value, className = "" }: { label: string, value: string | number, className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-medium text-gray-500">{label}</label>
      <div className={`px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs text-gray-700 min-h-[34px] flex items-center ${className.includes('h-auto') ? 'items-start h-auto leading-relaxed' : ''}`}>
        {value || '-'}
      </div>
    </div>
  );
}

function PhotoBox({ label, src }: { label: string, src: string }) {
  return (
    <div className="w-40">
      <p className="text-[10px] text-gray-400 mb-1.5 text-center font-medium">{label}</p>
      <div className="aspect-[4/3] rounded border border-gray-100 overflow-hidden bg-white shadow-sm">
        <img src={src} alt={label} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
