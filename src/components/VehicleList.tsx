import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Download, Eye, Car, ChevronDown, Filter, LayoutGrid, Plus, RefreshCw } from 'lucide-react';
import { api } from '../api';
import { Vehicle } from '../types';

interface VehicleListProps {
  onView: (id: string) => void;
}

export default function VehicleList({ onView }: VehicleListProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<'simple' | 'complex'>('simple');
  const [showPartSelector, setShowPartSelector] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 1500);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mocking more fields for the new columns
        const result = await api.vehicle.getAll();
        const enhancedData = result.map((v, index) => ({
          ...v,
          regNo: `REG20240427${(index + 1).toString().padStart(3, '0')}`,
          companyName: '安达汽车维修服务中心',
          deliveryPerson: '张三',
          deliveryTime: '2024-04-20 09:30',
          pickupPerson: '李四',
          pickupTime: '2024-04-22 15:00',
          bizCategory: '大修',
          entLevel: 'A级',
          vin: v.vin || 'VIN1234567890ABCDE'
        }));
        setData(enhancedData);
      } catch (error) {
        console.error('Failed to fetch vehicles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <div className="flex-1 p-3 overflow-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col min-h-full">
          {/* 查询区域 */}
          <div className="p-5 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSearchMode('simple')}
                  className={`h-8 px-4 rounded text-xs font-medium transition-colors flex items-center ${searchMode === 'simple' ? 'bg-[#419EFF] text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                >
                  <Search size={14} className="mr-1.5" /> 简单查询
                </button>
                <button 
                  onClick={() => setSearchMode('complex')}
                  className={`h-8 px-4 rounded text-xs font-medium transition-colors flex items-center ${searchMode === 'complex' ? 'bg-[#419EFF] text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                >
                  <Filter size={14} className="mr-1.5" /> 复杂查询
                </button>
              </div>
              {searchMode === 'complex' && (
                <div className="flex items-center space-x-4 text-[10px] text-gray-500">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-1" /> 保存查询状态
                    <span className="text-orange-500 ml-1 font-normal">* 选中后可保存当前的查询条件</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-1" defaultChecked /> 跨区域查询
                  </label>
                </div>
              )}
            </div>

            {searchMode === 'simple' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 items-end">
                <div>
                  <label className="block text-xs text-[#666666] mb-1">所属管辖</label>
                  <div className="relative">
                    <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white transition-colors" placeholder="北极市-北极市公安局" defaultValue="北极市-北极市公安局" />
                    <Search size={12} className="absolute right-2 top-2.5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#666666] mb-1">车牌号码</label>
                  <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入车牌号" />
                </div>
                <div>
                  <label className="block text-xs text-[#666666] mb-1">姓名</label>
                  <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入姓名" />
                </div>
                <div>
                  <label className="block text-xs text-[#666666] mb-1">公司名称</label>
                  <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入公司名称" />
                </div>
                <div className="flex space-x-2 md:col-start-1 lg:col-start-auto xl:col-start-auto justify-end">
                  <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xs font-medium">
                    <Search size={14} className="mr-1.5" /> 查询
                  </button>
                  <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-xs font-medium">
                    <RotateCcw size={14} className="mr-1.5" /> 重置
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3 items-end">
                  <div>
                    <label className="block text-xs text-[#666666] mb-1">所属管辖</label>
                    <div className="relative">
                      <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" defaultValue="北极市-北极市公安局" />
                      <Search size={12} className="absolute right-2 top-2.5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#666666] mb-1">车牌号码</label>
                    <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs text-[#666666] mb-1 flex justify-between">
                      <span>姓名</span>
                      <div className="flex items-center space-x-1 font-normal scale-90 origin-right">
                        <input type="checkbox" defaultChecked /><span className="text-[10px]">车主</span>
                        <input type="checkbox" defaultChecked /><span className="text-[10px]">送修</span>
                        <input type="checkbox" defaultChecked /><span className="text-[10px]">取车</span>
                      </div>
                    </label>
                    <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#666666] mb-1">公司名称</label>
                    <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" defaultValue="安达汽修" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#666666] mb-1">企业编码</label>
                    <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3 items-end">
                  <div>
                    <label className="block text-xs text-[#666666] mb-1 flex justify-between">
                      <span>联系电话</span>
                      <div className="flex items-center space-x-1 font-normal scale-90 origin-right">
                        <input type="checkbox" defaultChecked /><span className="text-[10px]">送修</span>
                        <input type="checkbox" defaultChecked /><span className="text-[10px]">取车</span>
                      </div>
                    </label>
                    <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                  </div>
                  <div className="col-span-1 lg:col-span-2">
                    <label className="block text-xs text-[#666666] mb-1">上传时间区间</label>
                    <div className="flex items-center space-x-1">
                      <input type="date" className="flex-1 h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                      <span className="text-gray-400">-</span>
                      <input type="date" className="flex-1 h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#666666] mb-1">发动机号</label>
                    <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#666666] mb-1 flex justify-between">
                      <span>证件号码</span>
                      <div className="flex items-center space-x-1 font-normal scale-90 origin-right">
                        <input type="checkbox" /><span className="text-[10px]">送修</span>
                        <input type="checkbox" /><span className="text-[10px]">取车</span>
                      </div>
                    </label>
                    <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3 items-end">
                  <div className="col-span-1 lg:col-span-2">
                    <label className="block text-xs text-[#666666] mb-1">取车时间区间</label>
                    <div className="flex items-center space-x-1">
                      <input type="date" className="flex-1 h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                      <span className="text-gray-400">-</span>
                      <input type="date" className="flex-1 h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#666666] mb-1">号牌种类</label>
                    <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white font-sans">
                      <option>全部</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#666666] mb-1">车辆类型</label>
                    <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white font-sans">
                      <option>全部</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#666666] mb-1">识别代号车架号</label>
                    <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3 items-end">
                  <div>
                    <label className="block text-xs text-[#666666] mb-1">维修部位</label>
                    <button 
                      onClick={() => setShowPartSelector(true)}
                      className="w-full h-8 px-2 text-[10px] border border-gray-300 rounded bg-white text-left text-gray-500 hover:bg-gray-50 flex items-center overflow-hidden"
                    >
                      <Search size={14} className="mr-1 text-blue-500 flex-shrink-0" /> 选择受损部位
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs text-[#666666] mb-1">维修项目</label>
                    <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white font-sans">
                      <option>全部</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#666666] mb-1">维修原因</label>
                    <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white font-sans">
                      <option>全部</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#666666] mb-1">受理业务员姓名</label>
                    <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xs font-medium">
                      <Search size={14} className="mr-1.5" /> 查询
                    </button>
                    <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-xs font-medium">
                      <RotateCcw size={14} className="mr-1.5" /> 重置
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 操作区域 */}
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">共找到 <span className="text-[#419EFF] font-medium">{data.length}</span> 辆车辆信息</div>
            <div className="flex space-x-2">
              <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <Download size={14} className="mr-1.5" /> 导出
              </button>
            </div>
          </div>

          {/* 表格区域 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[2000px]">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 font-medium">登记序号</th>
                  <th className="px-4 py-3 font-medium">公司名称</th>
                  <th className="px-4 py-3 font-medium">车牌号</th>
                  <th className="px-4 py-3 font-medium">车主姓名</th>
                  <th className="px-4 py-3 font-medium">送修人</th>
                  <th className="px-4 py-3 font-medium">送修时间</th>
                  <th className="px-4 py-3 font-medium">取车人</th>
                  <th className="px-4 py-3 font-medium">取车时间</th>
                  <th className="px-4 py-3 font-medium">业务类别</th>
                  <th className="px-4 py-3 font-medium">企业等级</th>
                  <th className="px-4 py-3 font-medium">车辆类型</th>
                  <th className="px-4 py-3 font-medium">车辆品牌</th>
                  <th className="px-4 py-3 font-medium">车辆型号</th>
                  <th className="px-4 py-3 font-medium">车辆车架号</th>
                  <th className="px-4 py-3 font-medium">状态</th>
                  <th className="px-4 py-3 font-medium text-center w-24 sticky right-0 bg-gray-50">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
                {loading ? (
                  <tr>
                    <td colSpan={16} className="px-4 py-10 text-center text-gray-500">
                      加载中...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={16} className="px-4 py-10 text-center text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                ) : data.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors group">
                    <td className="px-4 py-3">{row.regNo}</td>
                    <td className="px-4 py-3 text-blue-600 cursor-pointer hover:underline">{row.companyName}</td>
                    <td className="px-4 py-3 font-medium text-[#333333]">{row.plateNo}</td>
                    <td className="px-4 py-3">{row.owner}</td>
                    <td className="px-4 py-3">{row.deliveryPerson}</td>
                    <td className="px-4 py-3 text-xs">{row.deliveryTime}</td>
                    <td className="px-4 py-3">{row.pickupPerson}</td>
                    <td className="px-4 py-3 text-xs">{row.pickupTime}</td>
                    <td className="px-4 py-3">{row.bizCategory}</td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-100 text-[#419EFF] px-2 py-0.5 rounded text-xs">{row.entLevel}</span>
                    </td>
                    <td className="px-4 py-3">{row.type}</td>
                    <td className="px-4 py-3">{row.brand}</td>
                    <td className="px-4 py-3">{row.model}</td>
                    <td className="px-4 py-3 text-xs font-mono">{row.vin}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${row.status === '正常' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-center sticky right-0 bg-white group-hover:bg-blue-50 transition-colors shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)]`}>
                      <div className="flex items-center justify-center">
                        <button onClick={() => onView(row.id)} className="text-[#419EFF] hover:text-blue-700 font-medium text-xs">
                          详情
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页区域 */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-white">
            <div className="text-sm text-[#666666]">
              显示第 1 到第 {data.length} 条记录，总共 {data.length} 条记录
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-[#999999] bg-gray-50 cursor-not-allowed">上一页</button>
              <button className="px-3 py-1 border border-[#419EFF] rounded text-sm text-white bg-[#419EFF]">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-[#666666] hover:bg-gray-50">下一页</button>
            </div>
          </div>
        </div>
      </div>

      {/* 受损部位选择弹窗 (模拟) */}
      {showPartSelector && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-[800px] border border-gray-300 overflow-hidden">
            <div className="bg-[#419EFF] px-4 py-2 flex justify-between items-center text-white">
              <span className="text-sm font-bold">选择受损部位</span>
              <button onClick={() => setShowPartSelector(false)} className="hover:bg-white/20 p-1 rounded">
                <RotateCcw size={16} />
              </button>
            </div>
            <div className="p-10 relative">
              <div className="border border-gray-200 p-4 bg-white flex justify-center">
                <img 
                  src="https://ais-file-v2.s3.amazonaws.com/projects/hfy7bbrocfm23qux4vkcfc/artifacts/damage_parts_schematic.png" 
                  alt="受损部位图" 
                  className="max-w-full h-auto"
                />
              </div>
              <div className="mt-6 flex justify-center space-x-4 text-xs">
                <button className="text-blue-500 hover:underline">图像查询</button>
                <button className="text-blue-500 hover:underline">重点部位</button>
                <button className="text-blue-500 hover:underline">高级查询</button>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button 
                onClick={() => setShowPartSelector(false)}
                className="px-6 py-2 border border-gray-300 bg-white text-gray-600 rounded text-sm hover:bg-gray-100"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
