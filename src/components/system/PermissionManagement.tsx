import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, ChevronRight, ChevronDown, ShieldAlert } from 'lucide-react';

export default function PermissionManagement() {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    '1': true,
    '1-1': true,
  });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-4 h-full flex flex-col bg-[#F5F5F5]">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex gap-4 items-center">
            <input type="text" placeholder="菜单名称/权限标识" className="h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
            <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 flex items-center text-sm">
              <Search size={14} className="mr-1" /> 查询
            </button>
          </div>
          <button className="h-8 px-4 bg-[#1ebcaf] text-white rounded hover:bg-teal-600 flex items-center text-sm">
            <Plus size={14} className="mr-1" /> 新增菜单/权限
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <table className="w-full text-left border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="px-4 py-2 border-b border-gray-200 w-1/3">菜单名称</th>
                <th className="px-4 py-2 border-b border-gray-200">权限标识</th>
                <th className="px-4 py-2 border-b border-gray-200 text-center">类型</th>
                <th className="px-4 py-2 border-b border-gray-200 text-center">排序</th>
                <th className="px-4 py-2 border-b border-gray-200 text-center w-48">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* 节点 1 */}
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="px-4 py-2 font-medium flex items-center cursor-pointer" onClick={() => toggleNode('1')}>
                  {expandedNodes['1'] ? <ChevronDown size={16} className="mr-1 text-gray-500" /> : <ChevronRight size={16} className="mr-1 text-gray-500" />}
                  机修业管理
                </td>
                <td className="px-4 py-2 text-gray-500 font-mono text-xs">sys:manage</td>
                <td className="px-4 py-2 text-center"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">目录</span></td>
                <td className="px-4 py-2 text-center">1</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="text-[#419EFF] hover:text-blue-700 font-medium">新增</button>
                    <button className="text-[#419EFF] hover:text-blue-700 font-medium">编辑</button>
                    <div className="relative">
                      <button 
                        className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center"
                        onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === '1' ? null : '1'); }}
                      >
                        更多 <ChevronDown size={14} className="ml-0.5" />
                      </button>
                      {openDropdown === '1' && (
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
              {/* 节点 1-1 */}
              {expandedNodes['1'] && (
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-2 pl-10 flex items-center cursor-pointer" onClick={() => toggleNode('1-1')}>
                    {expandedNodes['1-1'] ? <ChevronDown size={16} className="mr-1 text-gray-400" /> : <ChevronRight size={16} className="mr-1 text-gray-400" />}
                    备案信息
                  </td>
                  <td className="px-4 py-2 text-gray-500 font-mono text-xs">sys:manage:record</td>
                  <td className="px-4 py-2 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">菜单</span></td>
                  <td className="px-4 py-2 text-center">1</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-[#419EFF] hover:text-blue-700 font-medium">新增</button>
                      <button className="text-[#419EFF] hover:text-blue-700 font-medium">编辑</button>
                      <div className="relative">
                        <button 
                          className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center"
                          onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === '1-1' ? null : '1-1'); }}
                        >
                          更多 <ChevronDown size={14} className="ml-0.5" />
                        </button>
                        {openDropdown === '1-1' && (
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
              )}
              {/* 节点 1-1-1 */}
              {expandedNodes['1'] && expandedNodes['1-1'] && (
                <tr className="border-b border-gray-200 bg-white hover:bg-gray-50">
                  <td className="px-4 py-2 pl-16 text-gray-600 flex items-center">
                    <ShieldAlert size={14} className="mr-1 text-gray-400" />
                    备案审核
                  </td>
                  <td className="px-4 py-2 text-gray-500 font-mono text-xs">sys:manage:record:audit</td>
                  <td className="px-4 py-2 text-center"><span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs">按钮</span></td>
                  <td className="px-4 py-2 text-center">1</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-[#419EFF] hover:text-blue-700 font-medium">编辑</button>
                      <div className="relative">
                        <button 
                          className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center"
                          onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === '1-1-1' ? null : '1-1-1'); }}
                        >
                          更多 <ChevronDown size={14} className="ml-0.5" />
                        </button>
                        {openDropdown === '1-1-1' && (
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
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
