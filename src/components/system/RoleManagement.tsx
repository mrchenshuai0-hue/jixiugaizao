import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, ShieldCheck, Users, ChevronDown } from 'lucide-react';

export default function RoleManagement() {
  const [roles] = useState([
    { id: 1, name: '超级管理员', code: 'ROLE_ADMIN', desc: '系统最高权限，拥有所有功能菜单和数据权限', userCount: 2, status: '启用' },
    { id: 2, name: '治安民警', code: 'ROLE_POLICE', desc: '负责辖区内机修企业的日常监管、检查、备案审核', userCount: 156, status: '启用' },
    { id: 3, username: '审核专员', code: 'ROLE_AUDITOR', desc: '负责企业资质、备案信息的专职审核', userCount: 12, status: '启用' },
    { id: 4, name: '企业用户', code: 'ROLE_ENTERPRISE', desc: '机修企业端用户，仅能查看和操作本企业数据', userCount: 3420, status: '启用' },
  ]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <div className="p-4 h-full flex flex-col bg-[#F5F5F5]">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex gap-4 items-center">
            <input type="text" placeholder="角色名称/编码" className="h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
            <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 flex items-center text-sm">
              <Search size={14} className="mr-1" /> 查询
            </button>
          </div>
          <button className="h-8 px-4 bg-[#1ebcaf] text-white rounded hover:bg-teal-600 flex items-center text-sm">
            <Plus size={14} className="mr-1" /> 新增角色
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-sm border-b border-gray-200">
                <th className="px-4 py-3 font-medium">角色名称</th>
                <th className="px-4 py-3 font-medium">角色编码</th>
                <th className="px-4 py-3 font-medium">角色描述</th>
                <th className="px-4 py-3 font-medium text-center">关联用户数</th>
                <th className="px-4 py-3 font-medium text-center">状态</th>
                <th className="px-4 py-3 font-medium text-center">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {roles.map(role => (
                <tr key={role.id} className="border-b border-gray-100 hover:bg-blue-50/50">
                  <td className="px-4 py-3 font-medium text-gray-800">{role.name || role.username}</td>
                  <td className="px-4 py-3 font-mono text-xs">{role.code}</td>
                  <td className="px-4 py-3 text-gray-500">{role.desc}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center bg-blue-50 text-[#419EFF] px-2 py-1 rounded-full text-xs font-medium">
                      <Users size={12} className="mr-1" /> {role.userCount}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${role.status === '启用' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {role.status}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] group-hover:bg-blue-50/50 transition-colors ${openDropdown === role.id ? 'z-50' : 'z-10'}`}>
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-[#419EFF] hover:text-blue-700 font-medium">
                        修改
                      </button>
                      <div className="relative">
                        <button 
                          className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center"
                          onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === role.id ? null : role.id); }}
                        >
                          更多 <ChevronDown size={14} className="ml-0.5" />
                        </button>
                        {openDropdown === role.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}></div>
                            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-20 py-1">
                              <button className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-blue-50 hover:text-[#419EFF]">
                                权限配置
                              </button>
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
  );
}
