import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Plus, Download, ChevronDown, Eye, Edit, ShieldAlert, User, Calendar, FileText, MapPin, Save, X, ArrowLeft } from 'lucide-react';
import { api } from '../api';
import { PersonnelPunishment } from '../services/personnelPunishmentService';

interface PunishmentListProps {
  onAdd: () => void;
  onView: (id: string) => void;
}

function PunishmentList({ onAdd, onView }: PunishmentListProps) {
  const [data, setData] = useState<PersonnelPunishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.personnelPunishment.getAll();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch personnel punishments:', error);
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
          <div className="p-5 border-b border-gray-100">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="w-48">
                <label className="block text-sm text-[#666666] mb-1.5">被处罚人姓名</label>
                <input type="text" className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入姓名" />
              </div>
              <div className="w-56">
                <label className="block text-sm text-[#666666] mb-1.5">工作单位</label>
                <input type="text" className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入单位名称" />
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

          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">共找到 <span className="text-[#419EFF] font-medium">{data.length}</span> 条记录</div>
            <button onClick={onAdd} className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
              <Plus size={14} className="mr-1.5" /> 处罚登记
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 font-medium">被处罚人</th>
                  <th className="px-4 py-3 font-medium">工作单位</th>
                  <th className="px-4 py-3 font-medium">处罚日期</th>
                  <th className="px-4 py-3 font-medium">案件名称</th>
                  <th className="px-4 py-3 font-medium">处罚种类</th>
                  <th className="px-4 py-3 font-medium">处罚金额</th>
                  <th className="px-4 py-3 font-medium">状态</th>
                  <th className="px-4 py-3 font-medium text-center w-24">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-gray-500">
                      加载中...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                ) : data.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-[#333333]">{row.name}</td>
                    <td className="px-4 py-3">{row.unit}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">{row.caseName}</td>
                    <td className="px-4 py-3">{row.type}</td>
                    <td className="px-4 py-3">¥{row.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${row.status === '已处理' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] group-hover:bg-blue-50/50 transition-colors ${openDropdown === row.id ? 'z-50' : 'z-10'}`}>
                      <div className="flex items-center justify-center space-x-2">
                        <button onClick={() => onView(row.id)} className="text-[#419EFF] hover:text-blue-700 font-medium">详情</button>
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
                                <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">
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
        </div>
      </div>
    </div>
  );
}

function PunishmentForm({ onCancel, onSave }: { onCancel: () => void, onSave: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <div className="flex-1 overflow-auto p-3 custom-scrollbar pb-20">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-[#F8FAFC] flex justify-between items-center">
            <h2 className="text-base font-bold text-[#333333] border-l-4 border-[#419EFF] pl-3">从业人员处罚登记</h2>
            <button onClick={onCancel} className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
              <ArrowLeft size={16} className="mr-1.5" /> 返回列表
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#333333] mb-1.5 flex items-center">
                  <span className="text-[#fa5e45] mr-1">*</span>被处罚人姓名
                  <button className="ml-auto text-[#419EFF] hover:underline flex items-center text-xs"><Search size={12} className="mr-1" />选择</button>
                </label>
                <input type="text" className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请选择被处罚人" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#333333] mb-1.5 flex items-center">
                  <span className="text-[#fa5e45] mr-1">*</span>工作单位
                  <button className="ml-auto text-[#419EFF] hover:underline flex items-center text-xs"><Search size={12} className="mr-1" />选择</button>
                </label>
                <input type="text" className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请选择工作单位" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5"><span className="text-[#fa5e45] mr-1">*</span>处罚日期</label>
                <input type="date" className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5">案件名称</label>
                <input type="text" className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入案件名称" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5"><span className="text-[#fa5e45] mr-1">*</span>案件开始日期</label>
                <input type="date" className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5"><span className="text-[#fa5e45] mr-1">*</span>案件编号</label>
                <input type="text" className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入案件编号" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5">处罚文号</label>
                <input type="text" className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入处罚文号" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5">性别</label>
                <div className="flex items-center space-x-6 h-9">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="gender" className="mr-2 text-[#419EFF]" />
                    <span className="text-sm text-[#333333]">男</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="gender" className="mr-2 text-[#419EFF]" />
                    <span className="text-sm text-[#333333]">女</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5">证件号码</label>
                <input type="text" className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入证件号码" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5"><span className="text-[#fa5e45] mr-1">*</span>出生日期</label>
                <input type="date" className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5">民族</label>
                <input type="text" className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入民族" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5">文化程度</label>
                <select className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-sm">
                  <option>研究生及以上</option>
                  <option>本科</option>
                  <option>大专</option>
                  <option>高中及以下</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#333333] mb-1.5">户籍地</label>
                <input type="text" className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入户籍地" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#333333] mb-1.5">现住地</label>
                <input type="text" className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入现住地" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5">案件类别</label>
                <select className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-sm">
                  <option>违反经营机动车维修业治安管理规定</option>
                  <option>其他</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5"><span className="text-[#fa5e45] mr-1">*</span>处罚种类</label>
                <select className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] bg-white text-sm">
                  <option>请选择</option>
                  <option>罚款</option>
                  <option>警告</option>
                  <option>停业整顿</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5">行处情况</label>
                <input type="text" className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入行处情况" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5">处罚金额</label>
                <input type="number" className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入处罚金额" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5"><span className="text-[#fa5e45] mr-1">*</span>办案单位</label>
                <input type="text" className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请选择办案单位" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1.5">办案人</label>
                <input type="text" className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入办案人" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#333333] mb-1.5"><span className="text-[#fa5e45] mr-1">*</span>简要案情描述</label>
                <textarea className="w-full p-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" rows={3} placeholder="请输入简要案情描述"></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#333333] mb-1.5"><span className="text-[#fa5e45] mr-1">*</span>案件处理结果</label>
                <textarea className="w-full p-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" rows={3} placeholder="请输入案件处理结果"></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#333333] mb-1.5">图片</label>
                <div className="flex items-center space-x-4">
                   <button className="h-8 px-4 bg-white border border-gray-300 text-xs text-[#333333] rounded hover:bg-gray-50 flex items-center">选择文件</button>
                   <span className="text-xs text-[#999999]">未选择任何文件</span>
                </div>
                <div className="mt-4 w-32 h-32 bg-gray-50 border border-gray-200 rounded flex items-center justify-center">
                   <FileText size={32} className="text-gray-300 opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-end shadow-[0_0_10px_0_rgba(0,0,0,0.1)] z-20">
        <div className="flex space-x-3">
          <button onClick={onCancel} className="px-6 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors text-sm font-medium">取消</button>
          <button onClick={onSave} className="px-6 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
            <Save size={16} className="mr-1.5" /> 保存
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PersonnelPunishmentManagement() {
  const [view, setView] = useState<'list' | 'form'>('list');

  return (
    <div className="h-full w-full">
      {view === 'list' ? (
        <PunishmentList onAdd={() => setView('form')} onView={(id) => setView('form')} />
      ) : (
        <PunishmentForm onCancel={() => setView('list')} onSave={() => setView('list')} />
      )}
    </div>
  );
}
