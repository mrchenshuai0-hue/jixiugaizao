import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Send, Eye, ChevronDown } from 'lucide-react';

export default function Announcements() {
  const [messages] = useState([
    { id: 1, title: '关于开展2026年度机修企业质量信誉考核的通知', type: '系统公告', sender: '市局治安支队', date: '2026-04-10', status: '已发布' },
    { id: 2, title: '系统升级维护通知', type: '系统公告', sender: '信息中心', date: '2026-04-05', status: '已发布' },
    { id: 3, title: '某汽车维修有限公司备案审核通过', type: '业务提醒', sender: '系统自动', date: '2026-04-14', status: '未读' },
  ]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <div className="p-4 h-full flex flex-col bg-[#F5F5F5]">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex gap-4 items-center">
            <input type="text" placeholder="标题关键词" className="h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
            <select className="h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
              <option value="">全部类型</option>
              <option value="系统公告">系统公告</option>
              <option value="业务提醒">业务提醒</option>
            </select>
            <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 flex items-center text-sm">
              <Search size={14} className="mr-1" /> 查询
            </button>
          </div>
          <button className="h-8 px-4 bg-[#1ebcaf] text-white rounded hover:bg-teal-600 flex items-center text-sm">
            <Plus size={14} className="mr-1" /> 发布公告
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-sm border-b border-gray-200">
                <th className="px-4 py-3 font-medium">标题</th>
                <th className="px-4 py-3 font-medium">类型</th>
                <th className="px-4 py-3 font-medium">发送方</th>
                <th className="px-4 py-3 font-medium">发布时间</th>
                <th className="px-4 py-3 font-medium text-center">状态</th>
                <th className="px-4 py-3 font-medium text-center">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {messages.map(msg => (
                <tr key={msg.id} className="border-b border-gray-100 hover:bg-blue-50/50">
                  <td className="px-4 py-3 font-medium text-[#419EFF] cursor-pointer hover:underline">{msg.title}</td>
                  <td className="px-4 py-3">{msg.type}</td>
                  <td className="px-4 py-3">{msg.sender}</td>
                  <td className="px-4 py-3 text-gray-500">{msg.date}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${msg.status === '已发布' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] group-hover:bg-blue-50/50 transition-colors ${openDropdown === msg.id ? 'z-50' : 'z-10'}`}>
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-[#419EFF] hover:text-blue-700 font-medium">查看</button>
                      <div className="relative">
                        <button 
                          className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center"
                          onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === msg.id ? null : msg.id); }}
                        >
                          更多 <ChevronDown size={14} className="ml-0.5" />
                        </button>
                        {openDropdown === msg.id && (
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
  );
}
