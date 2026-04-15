import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Plus, Download, ChevronDown, Eye, Edit, User, ShieldCheck } from 'lucide-react';
import { api } from '../api';
import { Personnel } from '../types';

interface PersonnelListProps {
  onViewDetail: (id: string) => void;
  onAdd: () => void;
  onEdit: (id: string) => void;
}

export default function PersonnelList({ onViewDetail, onAdd, onEdit }: PersonnelListProps) {
  const [data, setData] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.personnel.getAll();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch personnel:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
  };

  const toggleAllRows = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map(d => d.id));
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '在职': return 'bg-green-100 text-green-600 border-green-200';
      case '离职': return 'bg-gray-100 text-gray-600 border-gray-200';
      case '待审核': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      <div className="flex-1 p-3 overflow-auto custom-scrollbar">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          
          {/* 查询区 */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="w-48">
                <label className="block text-sm text-[#666666] mb-1.5">姓名</label>
                <input 
                  type="text" 
                  placeholder="请输入姓名" 
                  className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-colors"
                />
              </div>
              <div className="w-56">
                <label className="block text-sm text-[#666666] mb-1.5">身份证号</label>
                <input 
                  type="text" 
                  placeholder="请输入身份证号" 
                  className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-colors"
                />
              </div>
              <div className="w-56">
                <label className="block text-sm text-[#666666] mb-1.5">所属企业</label>
                <input 
                  type="text" 
                  placeholder="支持模糊查询" 
                  className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-colors"
                />
              </div>
              <div className="w-36">
                <label className="block text-sm text-[#666666] mb-1.5">人员状态</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] bg-white transition-colors">
                  <option value="">全部</option>
                  <option value="1">在职</option>
                  <option value="0">离职</option>
                  <option value="2">待审核</option>
                </select>
              </div>
              <div className="flex space-x-2 ml-auto">
                <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
                  <Search size={14} className="mr-1.5" />
                  查询
                </button>
                <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 hover:text-[#333333] transition-colors flex items-center text-sm font-medium">
                  <RotateCcw size={14} className="mr-1.5" />
                  重置
                </button>
              </div>
            </div>
          </div>

          {/* 操作区 */}
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">
              共找到 <span className="text-[#419EFF] font-medium">{data.length}</span> 条记录
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={onAdd}
                className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium"
              >
                <Plus size={14} className="mr-1.5" />
                新增人员
              </button>
              <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 hover:text-[#333333] transition-colors flex items-center text-sm font-medium">
                <Download size={14} className="mr-1.5" />
                导出
              </button>
            </div>
          </div>

          {/* 表格区 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 w-12 text-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-[#419EFF] focus:ring-[#419EFF]"
                      checked={selectedRows.length === data.length && data.length > 0}
                      onChange={toggleAllRows}
                    />
                  </th>
                  <th className="px-4 py-3 font-medium w-20 text-center">照片</th>
                  <th className="px-4 py-3 font-medium">姓名</th>
                  <th className="px-4 py-3 font-medium">身份证号</th>
                  <th className="px-4 py-3 font-medium">性别</th>
                  <th className="px-4 py-3 font-medium">岗位/职务</th>
                  <th className="px-4 py-3 font-medium">所属企业</th>
                  <th className="px-4 py-3 font-medium">入职日期</th>
                  <th className="px-4 py-3 font-medium">状态</th>
                  <th className="px-4 py-3 font-medium text-center w-32 sticky right-0 bg-gray-50 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)]">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-10 text-center text-gray-500">
                      加载中...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-10 text-center text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                ) : data.map((row) => (
                  <tr 
                    key={row.id} 
                    className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors cursor-pointer"
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input')) return;
                      onViewDetail(row.id);
                    }}
                  >
                    <td className="px-4 py-3 text-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-[#419EFF] focus:ring-[#419EFF]"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="w-10 h-12 bg-gray-100 rounded flex items-center justify-center mx-auto border border-gray-200 overflow-hidden">
                        <User size={20} className="text-gray-400" />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-[#333333]">{row.name}</td>
                    <td className="px-4 py-3 font-mono">{row.idCard}</td>
                    <td className="px-4 py-3">{row.gender}</td>
                    <td className="px-4 py-3">{row.position}</td>
                    <td className="px-4 py-3">{row.enterprise}</td>
                    <td className="px-4 py-3">{row.entryDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${getStatusStyle(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] group-hover:bg-blue-50/50 transition-colors ${openDropdown === row.id ? 'z-50' : 'z-10'}`}>
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          className="text-[#419EFF] hover:text-blue-700 font-medium"
                          onClick={(e) => { e.stopPropagation(); onViewDetail(row.id); }}
                        >
                          详情
                        </button>
                        <button 
                          className="text-[#419EFF] hover:text-blue-700 font-medium"
                          onClick={(e) => { e.stopPropagation(); onEdit(row.id); }}
                        >
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
                                  资格核验
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

          {/* 分页区 */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-white">
            <div className="text-sm text-[#666666]">
              显示第 1 到第 5 条记录，总共 5 条记录
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
