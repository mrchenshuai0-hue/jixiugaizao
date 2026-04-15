import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Shield, Key, ChevronDown } from 'lucide-react';

export default function UserManagement() {
  const [users] = useState([
    { id: 1, username: 'admin', name: '系统管理员', role: '超级管理员', department: '信息中心', status: '正常', lastLogin: '2026-04-15 09:00:00' },
    { id: 2, username: 'police01', name: '张警官', role: '治安民警', department: '鼓楼分局治安大队', status: '正常', lastLogin: '2026-04-14 15:30:00' },
    { id: 3, username: 'police02', name: '李警官', role: '治安民警', department: '台江分局治安大队', status: '正常', lastLogin: '2026-04-12 10:15:00' },
    { id: 4, username: 'auditor', name: '王审核', role: '审核专员', department: '市局治安支队', status: '停用', lastLogin: '2026-03-20 14:00:00' },
  ]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <div className="p-4 h-full flex flex-col bg-[#F5F5F5]">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex gap-4 items-center">
            <input type="text" placeholder="用户名/姓名" className="h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
            <select className="h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
              <option value="">全部部门</option>
              <option value="信息中心">信息中心</option>
              <option value="治安大队">治安大队</option>
            </select>
            <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 flex items-center text-sm">
              <Search size={14} className="mr-1" /> 查询
            </button>
          </div>
          <button className="h-8 px-4 bg-[#1ebcaf] text-white rounded hover:bg-teal-600 flex items-center text-sm">
            <Plus size={14} className="mr-1" /> 新增用户
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-sm border-b border-gray-200">
                <th className="px-4 py-3 font-medium">用户名</th>
                <th className="px-4 py-3 font-medium">姓名</th>
                <th className="px-4 py-3 font-medium">角色</th>
                <th className="px-4 py-3 font-medium">所属部门</th>
                <th className="px-4 py-3 font-medium text-center">状态</th>
                <th className="px-4 py-3 font-medium">最后登录</th>
                <th className="px-4 py-3 font-medium text-center">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {users.map(user => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-blue-50/50">
                  <td className="px-4 py-3 font-medium text-gray-800">{user.username}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3"><span className="bg-blue-50 text-[#419EFF] px-2 py-1 rounded text-xs">{user.role}</span></td>
                  <td className="px-4 py-3">{user.department}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${user.status === '正常' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{user.lastLogin}</td>
                  <td className={`px-4 py-3 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] group-hover:bg-blue-50/50 transition-colors ${openDropdown === user.id ? 'z-50' : 'z-10'}`}>
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-[#419EFF] hover:text-blue-700 font-medium">
                        修改
                      </button>
                      <div className="relative">
                        <button 
                          className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center"
                          onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === user.id ? null : user.id); }}
                        >
                          更多 <ChevronDown size={14} className="ml-0.5" />
                        </button>
                        {openDropdown === user.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}></div>
                            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-20 py-1">
                              <button className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-blue-50 hover:text-[#419EFF]">
                                重置密码
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
