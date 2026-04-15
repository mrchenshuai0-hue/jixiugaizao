import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer, Download, Car, AlertTriangle, ShieldAlert } from 'lucide-react';
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
        // Map service data to the structure expected by the component
        // In a real app, the service would return the correct structure
        setVehicle({
          basic: {
            company: '福州市鼓楼区安达汽车维修服务部',
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
            vin: result.vin
          },
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
              'https://picsum.photos/seed/damage2/400/300'
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
          <p className="text-gray-500">详情加载中...</p>
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
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between shrink-0 bg-gray-50/50">
        <div className="flex items-center">
          <h2 className="text-lg font-bold text-[#333333]">车辆信息详情 <span className="text-sm font-normal text-gray-400 ml-2">#{id}</span></h2>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
            <Printer size={16} className="mr-2" /> 打印
          </button>
          <button className="px-4 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
            <Download size={16} className="mr-2" /> 导出
          </button>
          <button onClick={onBack} className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
            <ArrowLeft size={16} className="mr-1.5" /> 返回列表
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 custom-scrollbar bg-[#F8FAFC]">
        <div className="w-full space-y-6">
          {/* 基本信息 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center">
              <Car size={18} className="text-[#419EFF] mr-2" />
              <h3 className="text-sm font-bold text-[#333333]">基本信息</h3>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
              <div className="col-span-2 md:col-span-3">
                <span className="text-sm text-[#999999] block mb-1">所属企业</span>
                <span className="text-sm text-[#333333] font-medium">{data.basic.company}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">车牌号码</span>
                <span className="text-sm text-[#333333] font-medium">{data.basic.plateNo}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">号牌种类</span>
                <span className="text-sm text-[#333333] font-medium">{data.basic.plateType}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">车身颜色</span>
                <span className="text-sm text-[#333333] font-medium">{data.basic.color}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">车辆类型</span>
                <span className="text-sm text-[#333333] font-medium">{data.basic.type}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">车辆品牌</span>
                <span className="text-sm text-[#333333] font-medium">{data.basic.brand}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">车辆型号</span>
                <span className="text-sm text-[#333333] font-medium">{data.basic.model}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">车架号(VIN)</span>
                <span className="text-sm text-[#333333] font-medium">{data.basic.vin}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">发动机号</span>
                <span className="text-sm text-[#333333] font-medium">{data.basic.engineNo}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">行驶证芯编号</span>
                <span className="text-sm text-[#333333] font-medium">{data.basic.licenseCoreNo}</span>
              </div>
              <div className="col-span-2 md:col-span-3 border-t border-gray-100 pt-4 mt-2 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
                <div>
                  <span className="text-sm text-[#999999] block mb-1">车主姓名</span>
                  <span className="text-sm text-[#333333] font-medium">{data.basic.owner}</span>
                </div>
                <div>
                  <span className="text-sm text-[#999999] block mb-1">车主身份证号</span>
                  <span className="text-sm text-[#333333] font-medium">{data.basic.ownerId}</span>
                </div>
                <div>
                  <span className="text-sm text-[#999999] block mb-1">车主联系方式</span>
                  <span className="text-sm text-[#333333] font-medium">{data.basic.ownerPhone}</span>
                </div>
                <div className="col-span-2 md:col-span-3">
                  <span className="text-sm text-[#999999] block mb-1">车主公司</span>
                  <span className="text-sm text-[#333333] font-medium">{data.basic.ownerCompany}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 可疑车辆信息 */}
          <div className="bg-white border border-orange-200 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="bg-orange-50 px-6 py-3 border-b border-orange-100 flex items-center">
              <AlertTriangle size={18} className="text-orange-500 mr-2" />
              <h3 className="text-sm font-bold text-orange-700">可疑车辆信息</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
              <div>
                <span className="text-sm text-[#999999] block mb-1">可疑情况类别</span>
                <span className="text-sm text-[#333333] font-medium">{data.suspicious.category}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">报告人</span>
                <span className="text-sm text-[#333333] font-medium">{data.suspicious.reporter}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">报告时间</span>
                <span className="text-sm text-[#333333] font-medium">{data.suspicious.reportTime}</span>
              </div>
              <div className="md:col-span-3">
                <span className="text-sm text-[#999999] block mb-1">疑点描述</span>
                <div className="text-sm text-[#333333] leading-relaxed bg-gray-50 p-4 rounded border border-gray-100">
                  {data.suspicious.description}
                </div>
              </div>
            </div>
          </div>

          {/* 事故车辆信息 */}
          <div className="bg-white border border-red-200 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="bg-red-50 px-6 py-3 border-b border-red-100 flex items-center">
              <ShieldAlert size={18} className="text-red-500 mr-2" />
              <h3 className="text-sm font-bold text-red-700">事故车辆信息</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
              <div>
                <span className="text-sm text-[#999999] block mb-1">事故证明编号</span>
                <span className="text-sm text-[#333333] font-medium">{data.accident.certNo}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-sm text-[#999999] block mb-1">事故证明单位</span>
                <span className="text-sm text-[#333333] font-medium">{data.accident.certUnit}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">损毁部位1</span>
                <span className="text-sm text-[#333333] font-medium">{data.accident.damagePart1}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">损毁部位2</span>
                <span className="text-sm text-[#333333] font-medium">{data.accident.damagePart2}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">损毁部位3</span>
                <span className="text-sm text-[#333333] font-medium">{data.accident.damagePart3}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">报告人</span>
                <span className="text-sm text-[#333333] font-medium">{data.accident.reporter}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-sm text-[#999999] block mb-1">报告时间</span>
                <span className="text-sm text-[#333333] font-medium">{data.accident.reportTime}</span>
              </div>
              <div className="md:col-span-3">
                <span className="text-sm text-[#999999] block mb-1">损毁部位图像</span>
                <div className="flex space-x-4 mt-2">
                  {data.accident.damageImages.map((img, idx) => (
                    <div key={idx} className="w-40 h-30 rounded border border-gray-200 overflow-hidden">
                      <img src={img} alt={`损毁部位${idx + 1}`} className="w-full h-full object-cover" />
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
