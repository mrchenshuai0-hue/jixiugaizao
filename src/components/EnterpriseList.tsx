import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Plus, Download, ChevronDown, Eye, Edit, Key, ShieldCheck } from 'lucide-react';
import { api } from '../api';
import { Enterprise } from '../types';

interface EnterpriseListProps {
  onViewDetail: (id: string) => void;
  onAdd: () => void;
  onEdit: (id: string) => void;
}

export default function EnterpriseList({ onViewDetail, onAdd, onEdit }: EnterpriseListProps) {
  const [data, setData] = useState<Enterprise[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Modal states
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [closureAuditModalOpen, setClosureAuditModalOpen] = useState(false);
  const [currentAuditEnterprise, setCurrentAuditEnterprise] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.enterprise.getAll();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch enterprises:', error);
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

  const getRecordStatusStyle = (status: string) => {
    switch (status) {
      case '已备案': return 'bg-[#1ebcaf]/10 text-[#1ebcaf] border-[#1ebcaf]/20';
      case '未备案': return 'bg-[#fa5e45]/10 text-[#fa5e45] border-[#fa5e45]/20';
      case '备案过期': return 'bg-[#ffc23e]/10 text-[#ffc23e] border-[#ffc23e]/20';
      case '待审核': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      <div className="flex-1 p-3 overflow-auto custom-scrollbar">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          
          {/* 查询区（紧凑布局） */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="w-56">
                <label className="block text-sm text-[#666666] mb-1.5">企业名称/编码</label>
                <input 
                  type="text" 
                  placeholder="支持模糊查询" 
                  className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-colors"
                />
              </div>
              <div className="w-36">
                <label className="block text-sm text-[#666666] mb-1.5">企业类别</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] bg-white transition-colors">
                  <option value="">全部</option>
                  <option value="1">一类维修</option>
                  <option value="2">二类维修</option>
                  <option value="3">三类维修</option>
                  <option value="4">摩托车维修</option>
                </select>
              </div>
              <div className="w-36">
                <label className="block text-sm text-[#666666] mb-1.5">所在地区</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] bg-white transition-colors">
                  <option value="">请选择地区</option>
                  <option value="fz">福州市</option>
                  <option value="xm">厦门市</option>
                </select>
              </div>
              <div className="w-32">
                <label className="block text-sm text-[#666666] mb-1.5">备案状态</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] bg-white transition-colors">
                  <option value="">全部</option>
                  <option value="1">已备案</option>
                  <option value="0">未备案</option>
                  <option value="2">备案过期</option>
                  <option value="3">待审核</option>
                </select>
              </div>
              <div className="w-32">
                <label className="block text-sm text-[#666666] mb-1.5">企业状态</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] bg-white transition-colors">
                  <option value="">全部</option>
                  <option value="1">正常营业</option>
                  <option value="0">歇业</option>
                </select>
              </div>
              <div className="w-36">
                <label className="block text-sm text-[#666666] mb-1.5">变更项目</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] bg-white transition-colors">
                  <option value="">全部</option>
                  <option value="phone">联系电话</option>
                  <option value="address">经营地址</option>
                  <option value="manager">负责人</option>
                </select>
              </div>
              <div className="w-48">
                <label className="block text-sm text-[#666666] mb-1.5">故障原因</label>
                <input 
                  type="text" 
                  placeholder="请输入故障原因" 
                  className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-colors"
                />
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
                新增企业
              </button>
              <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 hover:text-[#333333] transition-colors flex items-center text-sm font-medium">
                <Download size={14} className="mr-1.5" />
                导出
              </button>
              <div className="relative group">
                <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 hover:text-[#333333] transition-colors flex items-center text-sm font-medium">
                  批量操作
                  <ChevronDown size={14} className="ml-1.5" />
                </button>
                <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg hidden group-hover:block z-20">
                  <button className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-blue-50 hover:text-[#419EFF]">批量导出</button>
                  <button className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-blue-50 hover:text-[#419EFF]">批量打印备案简表</button>
                </div>
              </div>
            </div>
          </div>

          {/* 表格区 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1100px]">
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
                  <th className="px-4 py-3 font-medium">企业名称</th>
                  <th className="px-4 py-3 font-medium">统一社会信用代码</th>
                  <th className="px-4 py-3 font-medium">企业类别</th>
                  <th className="px-4 py-3 font-medium">所属地区</th>
                  <th className="px-4 py-3 font-medium">备案状态</th>
                  <th className="px-4 py-3 font-medium">企业状态</th>
                  <th className="px-4 py-3 font-medium">最新检查结果</th>
                  <th className="px-4 py-3 font-medium text-center w-32 sticky right-0 bg-gray-50 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)]">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-gray-500">
                      加载中...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                ) : data.map((row) => (
                  <tr 
                    key={row.id} 
                    className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors cursor-pointer"
                    onClick={(e) => {
                      // Prevent navigation if clicking on checkbox or buttons
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
                    <td className="px-4 py-3 font-medium text-[#333333]">{row.name}</td>
                    <td className="px-4 py-3 font-mono">{row.uscc}</td>
                    <td className="px-4 py-3">{row.category}</td>
                    <td className="px-4 py-3">{row.region}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${getRecordStatusStyle(row.recordStatus)}`}>
                        {row.recordStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.status}</td>
                    <td className="px-4 py-3">{row.lastCheck}</td>
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
                                {row.recordStatus === '待审核' && (
                                  <button className="w-full text-left px-4 py-2 text-sm text-[#ffc23e] hover:bg-blue-50 font-medium">
                                    审核办理
                                  </button>
                                )}
                                <button className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-blue-50 hover:text-[#419EFF]">
                                  密码重置
                                </button>
                                <button 
                                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-blue-50 hover:text-[#419EFF]"
                                  onClick={(e) => { 
                                    e.stopPropagation();
                                    setCurrentAuditEnterprise(row.name);
                                    setAuditModalOpen(true); 
                                    setOpenDropdown(null); 
                                  }}
                                >
                                  修改审核
                                </button>
                                <button 
                                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-blue-50 hover:text-[#419EFF]"
                                  onClick={(e) => { 
                                    e.stopPropagation();
                                    setCurrentAuditEnterprise(row.name);
                                    setClosureAuditModalOpen(true); 
                                    setOpenDropdown(null); 
                                  }}
                                >
                                  歇业申报审核
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

      {/* 修改审核弹窗 */}
      {auditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[600px] shadow-xl">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#333333]">修改审核 - {currentAuditEnterprise}</h3>
              <button onClick={() => setAuditModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 font-medium text-sm text-[#666666] bg-gray-50 p-2 rounded">
                  <div>修改项</div>
                  <div>修改前</div>
                  <div>修改后</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm items-center border-b border-gray-100 pb-3">
                  <div className="font-medium">联系电话</div>
                  <div className="text-red-500 line-through">13800138000</div>
                  <div className="text-green-600">13900139000</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm items-center border-b border-gray-100 pb-3">
                  <div className="font-medium">法定代表人</div>
                  <div className="text-red-500 line-through">张三</div>
                  <div className="text-green-600">李四</div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#333333] mb-2">审核意见</label>
                  <textarea 
                    className="w-full h-24 p-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm resize-none"
                    placeholder="请输入审核意见（选填）"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-lg">
              <button 
                onClick={() => setAuditModalOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                驳回
              </button>
              <button 
                onClick={() => {
                  alert('审核通过');
                  setAuditModalOpen(false);
                }}
                className="px-4 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                通过
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 歇业申报审核弹窗 */}
      {closureAuditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[600px] shadow-xl">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#333333]">歇业申报审核 - {currentAuditEnterprise}</h3>
              <button onClick={() => setClosureAuditModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6">
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-gray-500">申报原因：</span>内部装修</div>
                  <div><span className="text-gray-500">登记日期：</span>2023-08-01</div>
                  <div><span className="text-gray-500">开始日期：</span>2023-08-05</div>
                  <div><span className="text-gray-500">结束日期：</span>2023-09-05</div>
                  <div className="col-span-2"><span className="text-gray-500">歇业说明：</span>店面升级改造，预计需要一个月时间。</div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <label className="block text-sm font-medium text-[#333333] mb-2">审核意见</label>
                  <textarea 
                    className="w-full h-24 p-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm resize-none"
                    placeholder="请输入审核意见（选填）"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-lg">
              <button 
                onClick={() => setClosureAuditModalOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                不同意
              </button>
              <button 
                onClick={() => {
                  alert('审核已同意');
                  setClosureAuditModalOpen(false);
                }}
                className="px-4 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                同意
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
