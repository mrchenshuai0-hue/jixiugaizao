import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Plus, Download, ChevronDown, Eye, Edit, ShieldAlert, User, Calendar, FileText, MapPin, Save, X, Trash2, AlertTriangle } from 'lucide-react';
import { api } from '../api';
import { PersonnelBlacklist } from '../services/personnelBlacklistService';

interface BlacklistListProps {
  onAdd: () => void;
}

function BlacklistList({ onAdd, onEdit, onRemove }: { onAdd: () => void, onEdit: (item: PersonnelBlacklist) => void, onRemove: (id: string) => void }) {
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
          {/* 统计卡片区 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
              <div className="p-3 bg-red-50 rounded-full text-red-500 mr-4">
                <ShieldAlert size={24} />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">黑名单人员总数</div>
                <div className="text-xl font-bold text-gray-800">128</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
              <div className="p-3 bg-orange-50 rounded-full text-orange-500 mr-4">
                <AlertTriangle size={24} />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">本月新增人数</div>
                <div className="text-xl font-bold text-gray-800">4</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
              <div className="p-3 bg-blue-50 rounded-full text-[#419EFF] mr-4">
                <User size={24} />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">涉及企业数量</div>
                <div className="text-xl font-bold text-gray-800">86</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
              <div className="p-3 bg-gray-50 rounded-full text-gray-500 mr-4">
                <Trash2 size={24} />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">已移出人数</div>
                <div className="text-xl font-bold text-gray-800">15</div>
              </div>
            </div>
          </div>

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
                    <td className={`px-4 py-3 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] transition-colors ${openDropdown === row.id ? 'z-[60]' : 'z-10'}`}>
                      <div className="flex items-center justify-center space-x-3">
                        <button 
                          onClick={() => onEdit(row)}
                          className="text-[#419EFF] hover:text-blue-700 font-medium text-sm flex items-center"
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
                              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-20 py-1 overflow-hidden text-left">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); onRemove(row.id); setOpenDropdown(null); }}
                                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center"
                                >
                                  <Trash2 size={14} className="mr-2" /> 移出
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

function BlacklistForm({ item, onCancel, onSave }: { item?: PersonnelBlacklist | null, onCancel: () => void, onSave: () => void }) {
  const isEdit = !!item;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-[#fa5e45] text-white flex justify-between items-center">
          <h2 className="text-lg font-bold">{isEdit ? '修改黑名单信息' : '黑名单登记'}</h2>
          <button onClick={onCancel} className="text-white/80 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2 flex items-center">
              <span className="text-[#fa5e45] mr-1">*</span>姓名
            </label>
            <input type="text" className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#fa5e45]" placeholder="请输入姓名" defaultValue={item?.name} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2 flex items-center">
              <span className="text-[#fa5e45] mr-1">*</span>身份证号
            </label>
            <input type="text" className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#fa5e45]" placeholder="请输入身份证号" defaultValue={item?.idCard} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">列入原因</label>
            <textarea className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#fa5e45] text-sm" rows={3} placeholder="请输入列入原因" defaultValue={item?.reason}></textarea>
          </div>
          <div className="flex justify-center pt-4">
            <button onClick={onSave} className="px-10 py-2.5 bg-[#fa5e45] text-white rounded hover:bg-red-600 transition-colors flex items-center font-medium">
              <Save size={18} className="mr-2" /> 保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PersonnelBlacklistManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PersonnelBlacklist | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: PersonnelBlacklist) => {
    setEditingItem(item);
    setShowForm(true);
  };

  return (
    <div className="h-full w-full relative">
      <BlacklistList 
        onAdd={handleAdd} 
        onEdit={handleEdit}
        onRemove={(id) => setRemovingId(id)}
      />
      
      {showForm && (
        <BlacklistForm 
          item={editingItem}
          onCancel={() => setShowForm(false)} 
          onSave={() => setShowForm(false)} 
        />
      )}

      {/* 移出确认弹窗 */}
      {removingId && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">确认移出</h3>
              <p className="text-sm text-gray-500 mt-2">您确定要将该人员从黑名单中移出吗？</p>
              <div className="flex justify-center gap-3 mt-8">
                <button 
                  onClick={() => setRemovingId(null)}
                  className="px-6 py-2 bg-white border border-gray-300 text-gray-600 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={() => {
                    // Actual remove logic would be here
                    setRemovingId(null);
                    alert('已成功移出黑名单');
                  }}
                  className="px-6 py-2 bg-[#fa5e45] text-white rounded text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  确认移出
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
