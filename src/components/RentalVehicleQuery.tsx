import React, { useState } from 'react';
import { Search, RotateCcw, Download, Car, Plus, Clock, AlertTriangle, RefreshCw } from 'lucide-react';

export default function RentalVehicleQuery() {
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  
  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 1500);
  };

  const data: any[] = [
    { 
      id: 1, 
      plateNo: '京A88888', 
      model: '宝马 X5',
      vin: 'LSV1234567890ABCD',
      engineNo: 'ENG987654321',
      ownerName: '张三',
      ownerId: '110101199001011234',
      ownerPhone: '13888888888',
      company: '神州租车', 
      companyCode: '91110000MA001ABC2X',
      status: '正常',
      area: '北京市朝阳区',
      image: 'https://picsum.photos/seed/car1/100/75'
    },
    { 
      id: 2, 
      plateNo: '京B66666', 
      model: '奥迪 A6L',
      vin: 'LSV5566778899EFGH',
      engineNo: 'ENG112233445',
      ownerName: '李四',
      ownerId: '110101198505055678',
      ownerPhone: '13999999999',
      company: '一鸣租车', 
      companyCode: '91110000MA002DEF4Y',
      status: '租赁中',
      area: '上海市浦东新区',
      image: 'https://picsum.photos/seed/car2/100/75'
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] overflow-hidden">
      <div className="flex-1 p-3 overflow-auto custom-scrollbar">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          
          {/* 查询区 */}
          <div className="p-5 border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 items-end">
              <div>
                <label className="block text-xs text-[#666666] mb-1">行政区域</label>
                <div className="relative">
                  <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="北极市-北极市公安局" defaultValue="北极市-北极市公安局" />
                  <Search size={12} className="absolute right-2 top-2.5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">车牌号码</label>
                <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入车牌号" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">品牌型号</label>
                <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入品牌型号" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">车架号</label>
                <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入车架号" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">发动机号</label>
                <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入发动机号" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">所属企业名称</label>
                <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入公司名称" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">企业编号</label>
                <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入企业编号" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">车辆状态</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="1">正常</option>
                  <option value="2">已注销</option>
                </select>
              </div>
              <div className="flex items-center space-x-2 pb-2">
                <input type="checkbox" id="showDeleted" className="w-3.5 h-3.5" />
                <label htmlFor="showDeleted" className="text-xs text-[#666666] cursor-pointer">只显示已删除车辆</label>
              </div>
              <div className="flex space-x-2 md:col-start-1 lg:col-start-auto xl:col-start-auto justify-end">
                <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xs font-medium shrink-0">
                  <Search size={14} className="mr-1.5" /> 查询
                </button>
                <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-xs font-medium shrink-0">
                  <RotateCcw size={14} className="mr-1.5" /> 重置
                </button>
              </div>
            </div>
          </div>

          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">
              共找到 <span className="text-[#419EFF] font-medium">{data.length}</span> 条租赁记录
            </div>
            <div className="flex space-x-2">
              <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <Download size={14} className="mr-1.5" /> 导出
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1500px]">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-xs border-b border-gray-200">
                  <th className="px-4 py-3 font-medium">车牌号</th>
                  <th className="px-4 py-3 font-medium">品牌型号</th>
                  <th className="px-4 py-3 font-medium">车架号</th>
                  <th className="px-4 py-3 font-medium">发动机号</th>
                  <th className="px-4 py-3 font-medium">车主姓名</th>
                  <th className="px-4 py-3 font-medium">车主证件号</th>
                  <th className="px-4 py-3 font-medium">车主联系方式</th>
                  <th className="px-4 py-3 font-medium">所属企业</th>
                  <th className="px-4 py-3 font-medium">企业编号</th>
                  <th className="px-4 py-3 font-medium">车辆状态</th>
                  <th className="px-4 py-3 font-medium">所属区域</th>
                  <th className="px-4 py-3 font-medium">车辆图片</th>
                </tr>
              </thead>
              <tbody className="text-xs text-[#666666]">
                {data.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-[#333333]">{row.plateNo}</td>
                    <td className="px-4 py-3">{row.model}</td>
                    <td className="px-4 py-3 font-mono">{row.vin}</td>
                    <td className="px-4 py-3 font-mono">{row.engineNo}</td>
                    <td className="px-4 py-3">{row.ownerName}</td>
                    <td className="px-4 py-3 font-mono">{row.ownerId}</td>
                    <td className="px-4 py-3">{row.ownerPhone}</td>
                    <td className="px-4 py-3">{row.company}</td>
                    <td className="px-4 py-3 font-mono">{row.companyCode}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${row.status === '正常' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.area}</td>
                    <td className="px-4 py-3">
                      <div className="w-16 h-12 rounded border border-gray-200 overflow-hidden bg-gray-50">
                        <img src={row.image} alt="车辆" className="w-full h-full object-cover" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
