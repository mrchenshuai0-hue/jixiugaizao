import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Download, Eye, Filter, History, LayoutGrid, ChevronDown } from 'lucide-react';
import { api } from '../api';
import { RepairRecord } from '../types';

interface RepairRecordListProps {
  onView: (id: string) => void;
}

export default function RepairRecordList({ onView }: RepairRecordListProps) {
  const [data, setData] = useState<RepairRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.repairRecord.getAll();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch repair records:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <div className="flex-1 p-3 overflow-auto">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          {/* 查询表单区域 */}
          <div className="p-4 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4 text-xs text-[#666666]">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-1" /> 保存查询状态
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-1" defaultChecked /> 跨区域查询
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <button className="h-7 px-4 bg-white border border-gray-300 text-sm text-[#666666] rounded flex items-center hover:bg-gray-50 transition-colors">
                  <RotateCcw size={14} className="mr-1" /> 重置
                </button>
                <button className="h-7 px-4 bg-[#419EFF] text-white text-sm rounded flex items-center hover:bg-blue-600 transition-colors">
                  <Search size={14} className="mr-1" /> 查询
                </button>
                <button className="h-7 px-4 bg-white border border-gray-300 text-sm text-[#666666] rounded flex items-center hover:bg-gray-50 transition-colors">
                  <Download size={14} className="mr-1 text-green-600" /> 导出
                </button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-y-3 gap-x-4">
              {/* 第一行 */}
              <div className="col-span-4 flex items-center">
                <span className="w-20 text-xs text-[#333333] shrink-0">所属管辖</span>
                <div className="flex-1 relative">
                  <input type="text" className="w-full h-7 px-2 text-xs border border-gray-300 rounded" defaultValue="福建省-福州市公安局" />
                  <Search size={14} className="absolute right-2 top-1.5 text-gray-400" />
                </div>
              </div>
              <div className="col-span-3 flex items-center">
                <span className="w-20 text-xs text-[#333333] shrink-0">车牌号码</span>
                <input type="text" className="flex-1 h-7 px-2 text-xs border border-gray-300 rounded" />
              </div>
              <div className="col-span-5 flex items-center space-x-2">
                <span className="w-12 text-xs text-[#333333] shrink-0">姓名</span>
                <input type="text" className="w-32 h-7 px-2 text-xs border border-gray-300 rounded" />
                <div className="flex items-center space-x-2 text-xs text-[#419EFF]">
                  <label className="flex items-center"><input type="checkbox" className="mr-1" defaultChecked /> 车主姓名</label>
                  <label className="flex items-center"><input type="checkbox" className="mr-1" defaultChecked /> 送修人姓名</label>
                  <label className="flex items-center"><input type="checkbox" className="mr-1" defaultChecked /> 取车人姓名</label>
                </div>
              </div>

              {/* 第二行 */}
              <div className="col-span-4 flex items-center">
                <span className="w-20 text-xs text-[#333333] shrink-0">公司名称</span>
                <input type="text" className="flex-1 h-7 px-2 text-xs border border-gray-300 rounded" />
              </div>
              <div className="col-span-3 flex items-center">
                <span className="w-20 text-xs text-[#333333] shrink-0">企业编码</span>
                <input type="text" className="flex-1 h-7 px-2 text-xs border border-gray-300 rounded" />
              </div>
              <div className="col-span-5 flex items-center space-x-2">
                <span className="w-12 text-xs text-[#333333] shrink-0">联系电话</span>
                <input type="text" className="w-32 h-7 px-2 text-xs border border-gray-300 rounded" />
                <div className="flex items-center space-x-2 text-xs text-[#419EFF]">
                  <label className="flex items-center"><input type="checkbox" className="mr-1" defaultChecked /> 送修人联系电话</label>
                  <label className="flex items-center"><input type="checkbox" className="mr-1" defaultChecked /> 取车人联系电话</label>
                </div>
              </div>
            </div>
          </div>

          {/* 表格区域 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-xs border-b border-gray-200">
                  <th className="px-3 py-2 font-medium">车牌号</th>
                  <th className="px-3 py-2 font-medium">公司名称</th>
                  <th className="px-3 py-2 font-medium">维修日期</th>
                  <th className="px-3 py-2 font-medium">金额</th>
                  <th className="px-3 py-2 font-medium">状态</th>
                  <th className="px-3 py-2 font-medium text-center w-20 sticky right-0 bg-gray-50 shadow-[-2px_0_5px_rgba(0,0,0,0.05)]">操作</th>
                </tr>
              </thead>
              <tbody className="text-xs text-[#666666]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                      加载中...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                ) : data.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                    <td className="px-3 py-2 font-medium text-[#333333]">{row.plateNo}</td>
                    <td className="px-3 py-2 truncate max-w-[200px]" title={row.enterprise}>{row.enterprise}</td>
                    <td className="px-3 py-2">{row.repairDate}</td>
                    <td className="px-3 py-2">¥{row.amount}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        row.status === '已完成' ? 'bg-blue-100 text-blue-600' : 
                        row.status === '进行中' ? 'bg-orange-100 text-orange-600' : 
                        'bg-green-100 text-green-600'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className={`px-3 py-2 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] group-hover:bg-blue-50/50 transition-colors ${openDropdown === row.id ? 'z-50' : 'z-10'}`}>
                      <div className="flex items-center justify-center space-x-2">
                        <button onClick={() => onView(row.id)} className="text-[#419EFF] hover:text-blue-700 font-medium">
                          详情
                        </button>
                        <div className="relative">
                          <button 
                            className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center"
                            onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === row.id ? null : row.id); }}
                          >
                            更多 <ChevronDown size={14} className="ml-0.5" />
                          </button>
                          {openDropdown === row.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}></div>
                              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-20 py-1">
                                <button className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-blue-50 hover:text-[#419EFF]">
                                  打印
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页区域 */}
          <div className="px-5 py-2 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
            <div className="text-xs text-[#666666]">
              显示第 1 到第 {data.length} 条记录，总共 {data.length} 条记录
            </div>
            <div className="flex space-x-1">
              <button className="px-2 py-0.5 border border-gray-300 rounded text-xs text-[#999999] bg-gray-50 cursor-not-allowed">上一页</button>
              <button className="px-2 py-0.5 border border-[#419EFF] rounded text-xs text-white bg-[#419EFF]">1</button>
              <button className="px-2 py-0.5 border border-gray-300 rounded text-xs text-[#666666] hover:bg-gray-50">下一页</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
