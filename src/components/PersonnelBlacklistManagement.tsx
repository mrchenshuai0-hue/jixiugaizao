import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Plus, Download, ChevronDown, Eye, Edit, ShieldAlert, User, Calendar, FileText, MapPin, Save, X, Trash2 } from 'lucide-react';
import { api } from '../api';
import { PersonnelBlacklist } from '../services/personnelBlacklistService';

interface BlacklistListProps {
  onAdd: () => void;
}

function BlacklistList({ onAdd }: BlacklistListProps) {
  const [data, setData] = useState<PersonnelBlacklist[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.personnelBlacklist.getAll();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch personnel blacklist:', error);
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
                <label className="block text-sm text-[#666666] mb-1.5">姓名</label>
                <input type="text" className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入姓名" />
              </div>
              <div className="w-56">
                <label className="block text-sm text-[#666666] mb-1.5">身份证号</label>
                <input type="text" className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入身份证号" />
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
            <button onClick={onAdd} className="h-8 px-4 bg-[#fa5e45] text-white rounded hover:bg-red-600 transition-colors flex items-center text-sm font-medium">
              <Plus size={14} className="mr-1.5" /> 黑名单登记
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 font-medium">姓名</th>
                  <th className="px-4 py-3 font-medium">身份证号</th>
                  <th className="px-4 py-3 font-medium">列入原因</th>
                  <th className="px-4 py-3 font-medium">列入日期</th>
                  <th className="px-4 py-3 font-medium">操作人</th>
                  <th className="px-4 py-3 font-medium text-center w-24">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
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
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-red-50/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-[#333333]">{row.name}</td>
                    <td className="px-4 py-3 font-mono">{row.idCard}</td>
                    <td className="px-4 py-3">{row.reason}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">{row.operator}</td>
                    <td className={`px-4 py-3 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] group-hover:bg-blue-50/50 transition-colors ${openDropdown === row.id ? 'z-50' : 'z-10'}`}>
                      <div className="flex items-center justify-center space-x-2">
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
                                  移出
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

function BlacklistForm({ onCancel, onSave }: { onCancel: () => void, onSave: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-[#419EFF] text-white flex justify-between items-center">
          <h2 className="text-lg font-bold">黑名单登记</h2>
          <button onClick={onCancel} className="text-white/80 hover:text-white"><X size={20} /></button>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              <span className="text-[#fa5e45] mr-1">*</span>姓名
            </label>
            <input type="text" className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入姓名" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              <span className="text-[#fa5e45] mr-1">*</span>身份证号
            </label>
            <input type="text" className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入身份证号" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">列入原因</label>
            <textarea className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" rows={3} placeholder="请输入列入原因"></textarea>
          </div>
          <div className="flex justify-center pt-4">
            <button onClick={onSave} className="px-10 py-2.5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center font-medium">
              <Edit size={18} className="mr-2" /> 保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PersonnelBlacklistManagement() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="h-full w-full relative">
      <BlacklistList onAdd={() => setShowForm(true)} />
      {showForm && (
        <BlacklistForm onCancel={() => setShowForm(false)} onSave={() => setShowForm(false)} />
      )}
    </div>
  );
}
