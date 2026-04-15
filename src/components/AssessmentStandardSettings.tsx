import React, { useState } from 'react';
import { Plus, Edit, Copy, Ban, Save, ChevronRight, ChevronDown, FileText, Settings, History, X } from 'lucide-react';

export default function AssessmentStandardSettings() {
  const [activeTab, setActiveTab] = useState('items');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    '1': true,
    '1-1': true,
  });

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [itemModalType, setItemModalType] = useState<'category' | 'subitem' | 'point'>('category');
  const [isAddVetoModalOpen, setIsAddVetoModalOpen] = useState(false);

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openAddItemModal = (type: 'category' | 'subitem' | 'point') => {
    setItemModalType(type);
    setIsAddItemModalOpen(true);
  };

  return (
    <div className="flex h-full bg-[#F5F5F5] p-3 gap-3 relative">
      {/* 左侧导航区 */}
      <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden shrink-0">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">标准模板库</h2>
          <button className="text-[#419EFF] hover:text-blue-700">
            <Plus size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-2">
          {/* 树形结构 */}
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-500 px-2 py-1">汽车维修企业通用</div>
            <div className="bg-blue-50 text-[#419EFF] rounded px-2 py-2 text-sm cursor-pointer border-l-2 border-[#419EFF] flex justify-between items-center">
              <span className="truncate">一二类汽车维修企业标准</span>
              <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded">V2.1</span>
            </div>
            <div className="hover:bg-gray-50 text-gray-700 rounded px-2 py-2 text-sm cursor-pointer flex justify-between items-center">
              <span className="truncate">三类汽车维修企业标准</span>
              <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">V1.0</span>
            </div>
            
            <div className="text-sm font-medium text-gray-500 px-2 py-1 mt-4">摩托车维修</div>
            <div className="hover:bg-gray-50 text-gray-700 rounded px-2 py-2 text-sm cursor-pointer flex justify-between items-center">
              <span className="truncate">摩托车维修企业标准</span>
              <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">V1.2</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        {/* 上部：模板基本信息 */}
        <div className="p-5 border-b border-gray-200 bg-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl font-bold text-gray-800">一二类汽车维修企业质量信誉考核标准</h1>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded border border-green-200">已启用</span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded border border-blue-200">当前版本: V2.1</span>
              </div>
              <p className="text-sm text-gray-500">适用企业类型：一类汽车维修、二类汽车维修</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded text-sm hover:bg-gray-50 flex items-center">
                <Edit size={14} className="mr-1" /> 编辑基本信息
              </button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded text-sm hover:bg-gray-50 flex items-center">
                <Copy size={14} className="mr-1" /> 复制模板
              </button>
              <button className="px-3 py-1.5 border border-red-200 text-red-600 bg-red-50 rounded text-sm hover:bg-red-100 flex items-center">
                <Ban size={14} className="mr-1" /> 禁用
              </button>
              <button className="px-3 py-1.5 bg-[#419EFF] text-white rounded text-sm hover:bg-blue-600 flex items-center">
                <Save size={14} className="mr-1" /> 发布新版本
              </button>
            </div>
          </div>
        </div>

        {/* 下部：标签页布局 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex border-b border-gray-200 px-5 bg-gray-50">
            <button 
              className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center ${activeTab === 'items' ? 'border-[#419EFF] text-[#419EFF] bg-white' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('items')}
            >
              <FileText size={16} className="mr-2" /> 考核项目配置
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center ${activeTab === 'thresholds' ? 'border-[#419EFF] text-[#419EFF] bg-white' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('thresholds')}
            >
              <Settings size={16} className="mr-2" /> 等级阈值设置
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center ${activeTab === 'history' ? 'border-[#419EFF] text-[#419EFF] bg-white' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('history')}
            >
              <History size={16} className="mr-2" /> 版本历史
            </button>
          </div>

          <div className="flex-1 overflow-auto p-5">
            {activeTab === 'items' && (
              <div className="space-y-4">
                <div className="flex justify-end mb-2">
                  <button 
                    className="px-3 py-1.5 bg-[#419EFF] text-white rounded text-sm hover:bg-blue-600 flex items-center"
                    onClick={() => openAddItemModal('category')}
                  >
                    <Plus size={14} className="mr-1" /> 添加考核大类
                  </button>
                </div>
                <table className="w-full text-left border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 text-sm">
                      <th className="px-4 py-2 border-b border-gray-200 w-1/3">项目名称</th>
                      <th className="px-4 py-2 border-b border-gray-200">项目说明</th>
                      <th className="px-4 py-2 border-b border-gray-200 w-32 text-center">分值/扣分标准</th>
                      <th className="px-4 py-2 border-b border-gray-200 w-48 text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {/* 大类 1 */}
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-2 font-medium flex items-center cursor-pointer" onClick={() => toggleNode('1')}>
                        {expandedNodes['1'] ? <ChevronDown size={16} className="mr-1 text-gray-500" /> : <ChevronRight size={16} className="mr-1 text-gray-500" />}
                        一、安全生产 (总分: 200)
                      </td>
                      <td className="px-4 py-2 text-gray-500">企业安全生产管理情况</td>
                      <td className="px-4 py-2 text-center">-</td>
                      <td className="px-4 py-2 text-center">
                        <button className="text-[#419EFF] hover:underline mr-2" onClick={() => openAddItemModal('subitem')}>添加子项</button>
                        <button className="text-[#419EFF] hover:underline">编辑</button>
                      </td>
                    </tr>
                    {/* 子项 1-1 */}
                    {expandedNodes['1'] && (
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 pl-10 flex items-center cursor-pointer" onClick={() => toggleNode('1-1')}>
                          {expandedNodes['1-1'] ? <ChevronDown size={16} className="mr-1 text-gray-400" /> : <ChevronRight size={16} className="mr-1 text-gray-400" />}
                          1.1 安全管理制度 (50分)
                        </td>
                        <td className="px-4 py-2 text-gray-500">各项安全管理制度的建立与执行</td>
                        <td className="px-4 py-2 text-center">-</td>
                        <td className="px-4 py-2 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button className="text-[#419EFF] hover:text-blue-700 font-medium" onClick={() => openAddItemModal('point')}>添加评分点</button>
                            <button className="text-[#419EFF] hover:text-blue-700 font-medium">编辑</button>
                            <div className="relative">
                              <button 
                                className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center"
                                onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'sub1-1' ? null : 'sub1-1'); }}
                              >
                                更多 <ChevronDown size={14} className="ml-0.5" />
                              </button>
                              {openDropdown === 'sub1-1' && (
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
                    {/* 评分点 1-1-1 */}
                    {expandedNodes['1'] && expandedNodes['1-1'] && (
                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-50">
                        <td className="px-4 py-2 pl-16 text-gray-600">
                          1.1.1 未建立安全生产责任制
                        </td>
                        <td className="px-4 py-2 text-gray-500">检查企业是否建立全员安全生产责任制</td>
                        <td className="px-4 py-2 text-center text-red-500 font-medium">-20分/次</td>
                        <td className="px-4 py-2 text-center">
                          <button className="text-[#419EFF] hover:underline mr-2">编辑</button>
                          <button className="text-red-500 hover:underline">删除</button>
                        </td>
                      </tr>
                    )}
                    {/* 评分点 1-1-2 */}
                    {expandedNodes['1'] && expandedNodes['1-1'] && (
                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-50">
                        <td className="px-4 py-2 pl-16 text-gray-600">
                          1.1.2 安全培训记录不全
                        </td>
                        <td className="px-4 py-2 text-gray-500">检查年度安全培训计划及实施记录</td>
                        <td className="px-4 py-2 text-center text-red-500 font-medium">-10分/人次</td>
                        <td className="px-4 py-2 text-center">
                          <button className="text-[#419EFF] hover:underline mr-2">编辑</button>
                          <button className="text-red-500 hover:underline">删除</button>
                        </td>
                      </tr>
                    )}
                    {/* 大类 2 */}
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-2 font-medium flex items-center cursor-pointer" onClick={() => toggleNode('2')}>
                        {expandedNodes['2'] ? <ChevronDown size={16} className="mr-1 text-gray-500" /> : <ChevronRight size={16} className="mr-1 text-gray-500" />}
                        二、维修质量 (总分: 300)
                      </td>
                      <td className="px-4 py-2 text-gray-500">维修作业规范及质量控制</td>
                      <td className="px-4 py-2 text-center">-</td>
                      <td className="px-4 py-2 text-center">
                        <button className="text-[#419EFF] hover:underline mr-2" onClick={() => openAddItemModal('subitem')}>添加子项</button>
                        <button className="text-[#419EFF] hover:underline">编辑</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'thresholds' && (
              <div className="max-w-3xl space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">等级分数线设置 (总分: 1000)</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24 font-bold text-yellow-500 text-xl">AAA 级</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">总分 ≥</span>
                        <input type="number" defaultValue={850} className="w-24 border border-gray-300 rounded px-2 py-1 text-sm focus:border-[#419EFF] outline-none" />
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="text-sm text-gray-600">且 安全生产单项得分率 ≥</span>
                        <input type="number" defaultValue={85} className="w-16 border border-gray-300 rounded px-2 py-1 text-sm focus:border-[#419EFF] outline-none" />
                        <span className="text-sm text-gray-600">%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 font-bold text-blue-500 text-xl">AA 级</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">总分 ≥</span>
                        <input type="number" defaultValue={750} className="w-24 border border-gray-300 rounded px-2 py-1 text-sm focus:border-[#419EFF] outline-none" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 font-bold text-green-500 text-xl">A 级</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">总分 ≥</span>
                        <input type="number" defaultValue={600} className="w-24 border border-gray-300 rounded px-2 py-1 text-sm focus:border-[#419EFF] outline-none" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 font-bold text-red-500 text-xl">B 级</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">总分 &lt;</span>
                        <span className="w-24 px-2 py-1 text-sm text-gray-500">600 (自动计算)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                  <h3 className="text-lg font-medium text-red-800 mb-4 border-b border-red-200 pb-2">一票否决条件 (直接定为B级)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white p-3 rounded border border-red-100">
                      <span className="text-sm text-gray-700">发生较大及以上安全生产责任事故的</span>
                      <button className="text-red-500 hover:text-red-700 text-sm">删除</button>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded border border-red-100">
                      <span className="text-sm text-gray-700">存在重大涉黑涉恶违法犯罪行为被查处的</span>
                      <button className="text-red-500 hover:text-red-700 text-sm">删除</button>
                    </div>
                    <button 
                      className="text-[#419EFF] hover:underline text-sm flex items-center mt-2"
                      onClick={() => setIsAddVetoModalOpen(true)}
                    >
                      <Plus size={14} className="mr-1" /> 添加一票否决条件
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="px-6 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600">保存设置</button>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 text-sm border-b border-gray-200">
                    <th className="px-4 py-3 font-medium">版本号</th>
                    <th className="px-4 py-3 font-medium">发布时间</th>
                    <th className="px-4 py-3 font-medium">发布人</th>
                    <th className="px-4 py-3 font-medium">状态</th>
                    <th className="px-4 py-3 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">V2.1</td>
                    <td className="px-4 py-3">2025-12-01 10:00:00</td>
                    <td className="px-4 py-3">系统管理员</td>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">当前生效</span></td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="text-[#419EFF] hover:text-blue-700 font-medium">查看</button>
                        <div className="relative">
                          <button 
                            className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center"
                            onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'V2.1' ? null : 'V2.1'); }}
                          >
                            更多 <ChevronDown size={14} className="ml-0.5" />
                          </button>
                          {openDropdown === 'V2.1' && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}></div>
                              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-20 py-1">
                                <button className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-blue-50 hover:text-[#419EFF]">
                                  回滚
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3">V2.0</td>
                    <td className="px-4 py-3">2024-12-01 09:30:00</td>
                    <td className="px-4 py-3">系统管理员</td>
                    <td className="px-4 py-3"><span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">已归档</span></td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="text-[#419EFF] hover:text-blue-700 font-medium">查看</button>
                        <div className="relative">
                          <button 
                            className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center"
                            onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'V2.0' ? null : 'V2.0'); }}
                          >
                            更多 <ChevronDown size={14} className="ml-0.5" />
                          </button>
                          {openDropdown === 'V2.0' && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}></div>
                              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-20 py-1">
                                <button className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-blue-50 hover:text-[#419EFF]">
                                  回滚
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3">V1.0</td>
                    <td className="px-4 py-3">2023-11-15 14:20:00</td>
                    <td className="px-4 py-3">系统管理员</td>
                    <td className="px-4 py-3"><span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">已归档</span></td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="text-[#419EFF] hover:text-blue-700 font-medium">查看</button>
                        <div className="relative">
                          <button 
                            className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center"
                            onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'V1.0' ? null : 'V1.0'); }}
                          >
                            更多 <ChevronDown size={14} className="ml-0.5" />
                          </button>
                          {openDropdown === 'V1.0' && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}></div>
                              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-20 py-1">
                                <button className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-blue-50 hover:text-[#419EFF]">
                                  回滚
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* 添加考核项目模态框 */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[500px] flex flex-col shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                {itemModalType === 'category' ? '添加考核大类' : itemModalType === 'subitem' ? '添加子项' : '添加评分点'}
              </h3>
              <button onClick={() => setIsAddItemModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">项目名称</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#419EFF]" placeholder="请输入名称" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">项目说明</label>
                <textarea rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#419EFF]" placeholder="请输入说明"></textarea>
              </div>
              {itemModalType === 'point' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">扣分标准</label>
                  <div className="flex items-center gap-2">
                    <input type="number" className="w-24 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#419EFF]" placeholder="例如: -10" />
                    <span className="text-sm text-gray-500">分 / 次 (或人次)</span>
                  </div>
                </div>
              )}
              {(itemModalType === 'category' || itemModalType === 'subitem') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">总分值</label>
                  <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#419EFF]" placeholder="请输入分值" />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button onClick={() => setIsAddItemModalOpen(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-100">取消</button>
              <button onClick={() => setIsAddItemModalOpen(false)} className="px-4 py-2 bg-[#419EFF] text-white rounded-md text-sm hover:bg-blue-600">确定</button>
            </div>
          </div>
        </div>
      )}

      {/* 添加一票否决条件模态框 */}
      {isAddVetoModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[500px] flex flex-col shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">添加一票否决条件</h3>
              <button onClick={() => setIsAddVetoModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">条件描述</label>
              <textarea rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#419EFF]" placeholder="请输入一票否决的具体条件..."></textarea>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button onClick={() => setIsAddVetoModalOpen(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-100">取消</button>
              <button onClick={() => setIsAddVetoModalOpen(false)} className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">确定添加</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
