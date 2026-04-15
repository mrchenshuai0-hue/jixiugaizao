import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Plus, Download, Eye, Edit, ChevronDown } from 'lucide-react';
import { api } from '../api';
import { Case } from '../types';

interface ViolationListProps {
  onAdd: () => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function ViolationList({ onAdd, onView, onEdit }: ViolationListProps) {
  const [data, setData] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.case.getAll();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch cases:', error);
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
          {/* 查询区域 */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="w-64">
                <label className="block text-sm text-[#666666] mb-1.5">企业名称</label>
                <input type="text" className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入企业名称" />
              </div>
              <div className="w-48">
                <label className="block text-sm text-[#666666] mb-1.5">违法违规人员</label>
                <input type="text" className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入人员姓名" />
              </div>
              <div className="w-48">
                <label className="block text-sm text-[#666666] mb-1.5">案件性质</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="刑事案件">刑事案件</option>
                  <option value="治安案件">治安案件</option>
                </select>
              </div>
              <div className="flex space-x-2 ml-auto">
                <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
                  <Search size={14} className="mr-1.5" /> 查询
                </button>
                <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                  <RotateCcw size={14} className="mr-1.5" /> 重置
                </button>
              </div>
            </div>
          </div>

          {/* 操作区域 */}
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">共找到 <span className="text-[#419EFF] font-medium">{data.length}</span> 条违法违规记录</div>
            <div className="flex space-x-2">
              <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <Download size={14} className="mr-1.5" /> 导出
              </button>
              <button onClick={onAdd} className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
                <Plus size={14} className="mr-1.5" /> 违法违规登记
              </button>
            </div>
          </div>

          {/* 表格区域 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 font-medium">案件标题</th>
                  <th className="px-4 py-3 font-medium">案件类型</th>
                  <th className="px-4 py-3 font-medium">发生时间</th>
                  <th className="px-4 py-3 font-medium">状态</th>
                  <th className="px-4 py-3 font-medium text-center w-32">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-gray-500">
                      加载中...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                ) : data.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-[#333333]">{row.title}</td>
                    <td className="px-4 py-3">{row.type}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        row.status === '已结案' ? 'bg-gray-100 text-gray-600' : 
                        row.status === '已立案' ? 'bg-blue-100 text-blue-600' : 
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] group-hover:bg-blue-50/50 transition-colors ${openDropdown === row.id ? 'z-50' : 'z-10'}`}>
                      <div className="flex items-center justify-center space-x-2">
                        <button onClick={() => onView(row.id)} className="text-[#419EFF] hover:text-blue-700 font-medium">
                          详情
                        </button>
                        <button onClick={() => onEdit(row.id)} className="text-[#419EFF] hover:text-blue-700 font-medium">
                          修改
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
                                  删除
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
    </div>
  );
}
