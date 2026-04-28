import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Plus, Download, ChevronDown, Eye, Edit, User, ShieldCheck, AlertTriangle, Users, UserPlus, UserMinus, ShieldAlert } from 'lucide-react';
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

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const confirmDelete = () => {
    if (deleteId) {
      setData(prev => prev.filter(p => p.id !== deleteId));
      setDeleteId(null);
      setOpenDropdown(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      <div className="flex-1 p-3 overflow-auto custom-scrollbar">
        {/* 统计卡片区 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-blue-50 rounded-full text-[#419EFF] mr-4">
              <Users size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">从业人员总数</div>
              <div className="text-xl font-bold text-gray-800">5,642</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-green-50 rounded-full text-green-500 mr-4">
              <UserPlus size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">本月入职</div>
              <div className="text-xl font-bold text-gray-800">124</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-red-50 rounded-full text-red-500 mr-4">
              <ShieldAlert size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">预警人员</div>
              <div className="text-xl font-bold text-gray-800">3</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-gray-50 rounded-full text-gray-500 mr-4">
              <UserMinus size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">本月离职</div>
              <div className="text-xl font-bold text-gray-800">42</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          
          {/* 查询区 */}
          <div className="p-5 border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-3 items-end">
              <div>
                <label className="block text-xs text-[#666666] mb-1">行政区划</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white transition-colors">
                  <option value="">全部</option>
                  <option value="fz">福州市</option>
                  <option value="xm">厦门市</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">公司名称</label>
                <input type="text" placeholder="请输入公司名称" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">企业编码</label>
                <input type="text" placeholder="请输入企业编码" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">企业状态</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="正常">正常</option>
                  <option value="歇业">歇业</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">证件号码</label>
                <input type="text" placeholder="请输入证件号码" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">人员姓名</label>
                <input type="text" placeholder="请输入姓名" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">电话号码</label>
                <input type="text" placeholder="请输入电话" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">是否受过处罚</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="1">是</option>
                  <option value="0">否</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">工作工种</label>
                <input type="text" placeholder="请输入工种" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">人员类型</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="1">国内人员</option>
                  <option value="2">境外人员</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">人员状态</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white transition-colors">
                  <option value="">全部</option>
                  <option value="1">在职</option>
                  <option value="0">离职</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">性别</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">数据来源</label>
                <input type="text" placeholder="请输入来源" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">采集方式</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="1">手动采集</option>
                  <option value="2">系统导入</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">登记时间</label>
                <input type="date" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div className="flex space-x-2 pt-2 justify-end lg:col-span-1 xl:col-span-5">
                <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xs font-medium">
                  <Search size={14} className="mr-1.5" />
                  查询
                </button>
                <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 hover:text-[#333333] transition-colors flex items-center text-xs font-medium">
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
                            className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center p-1"
                            onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === row.id ? null : row.id); }}
                          >
                            <ChevronDown size={14} />
                          </button>
                          {openDropdown === row.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}></div>
                              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-20 py-1 overflow-hidden">
                                <button 
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setDeleteId(row.id);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center transition-colors"
                                >
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

      {/* 删除确认弹窗 */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">确认删除</h3>
                  <p className="text-sm text-gray-500 mt-1">您确定要删除该从业人员吗？此操作不可撤销。</p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
