import React, { useState } from 'react';
import { Search, RotateCcw, Plus, Download, Upload, Eye, CheckSquare, XCircle, FileText, X, ChevronDown } from 'lucide-react';

export default function LevelAssessmentManagement() {
  const [data] = useState([
    { id: '1', name: '某汽车维修有限公司', code: '91350100MA34567890', region: '某区', year: '2025', selfScore: 920, auditScore: 890, suggestLevel: 'AAA', finalLevel: 'AAA', status: '已公示' },
    { id: '2', name: '某快捷汽修店', code: '91350100MA12345678', region: '某区', year: '2025', selfScore: 850, auditScore: null, suggestLevel: '-', finalLevel: '-', status: '待审核' },
    { id: '3', name: '某汽车服务中心', code: '91350100MA98765432', region: '郊区', year: '2025', selfScore: 780, auditScore: 750, suggestLevel: 'A', finalLevel: 'A', status: '申诉中' },
    { id: '4', name: '某专业钣金喷漆', code: '91350100MA11223344', region: '其他区', year: '2025', selfScore: null, auditScore: null, suggestLevel: '-', finalLevel: '-', status: '待自评' },
  ]);

  const [isInitiateModalOpen, setIsInitiateModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '待自评': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case '待审核': return 'bg-blue-100 text-blue-700 border-blue-200';
      case '已公示': return 'bg-green-100 text-green-700 border-green-200';
      case '申诉中': return 'bg-red-100 text-red-700 border-red-200';
      case '已归档': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'AAA': return 'text-yellow-500 font-bold';
      case 'AA': return 'text-blue-500 font-bold';
      case 'A': return 'text-green-500 font-bold';
      case 'B': return 'text-red-500 font-bold';
      default: return 'text-gray-500';
    }
  };

  const openAuditModal = (record: any) => {
    setSelectedRecord(record);
    setIsAuditModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      <div className="flex-1 p-3 overflow-auto">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          {/* 查询区域 */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="w-64">
                <label className="block text-sm text-[#666666] mb-1.5">企业名称/信用代码</label>
                <input type="text" className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入" />
              </div>
              <div className="w-48">
                <label className="block text-sm text-[#666666] mb-1.5">所属辖区</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="某区">某区</option>
                  <option value="其他区">其他区</option>
                </select>
              </div>
              <div className="w-32">
                <label className="block text-sm text-[#666666] mb-1.5">评定状态</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="待自评">待自评</option>
                  <option value="待审核">待审核</option>
                  <option value="已公示">已公示</option>
                  <option value="申诉中">申诉中</option>
                </select>
              </div>
              <div className="w-32">
                <label className="block text-sm text-[#666666] mb-1.5">评定年份</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
              <div className="w-32">
                <label className="block text-sm text-[#666666] mb-1.5">当前等级</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="AAA">AAA</option>
                  <option value="AA">AA</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
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

          {/* 操作区域 */}
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">共找到 <span className="text-[#419EFF] font-medium">{data.length}</span> 条评定记录</div>
            <div className="flex space-x-2">
              <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <Upload size={14} className="mr-1.5" /> 批量导入
              </button>
              <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <Download size={14} className="mr-1.5" /> 导出结果
              </button>
              <button 
                className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium"
                onClick={() => setIsInitiateModalOpen(true)}
              >
                <Plus size={14} className="mr-1.5" /> 发起新评定
              </button>
            </div>
          </div>

          {/* 表格区域 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 font-medium w-16 text-center">序号</th>
                  <th className="px-4 py-3 font-medium">企业名称</th>
                  <th className="px-4 py-3 font-medium">统一社会信用代码</th>
                  <th className="px-4 py-3 font-medium">所属辖区</th>
                  <th className="px-4 py-3 font-medium">评定年度</th>
                  <th className="px-4 py-3 font-medium text-right">自评得分</th>
                  <th className="px-4 py-3 font-medium text-right">考核得分</th>
                  <th className="px-4 py-3 font-medium text-center">建议等级</th>
                  <th className="px-4 py-3 font-medium text-center">最终等级</th>
                  <th className="px-4 py-3 font-medium text-center">评定状态</th>
                  <th className="px-4 py-3 font-medium text-center w-48">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
                {data.map((row, index) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-3 text-center">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-[#419EFF] cursor-pointer hover:underline" onClick={() => openAuditModal(row)}>{row.name}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.code}</td>
                    <td className="px-4 py-3">{row.region}</td>
                    <td className="px-4 py-3">{row.year}</td>
                    <td className="px-4 py-3 text-right">{row.selfScore || '-'}</td>
                    <td className="px-4 py-3 text-right font-medium">{row.auditScore || '-'}</td>
                    <td className={`px-4 py-3 text-center ${getLevelColor(row.suggestLevel)}`}>{row.suggestLevel}</td>
                    <td className={`px-4 py-3 text-center ${getLevelColor(row.finalLevel)}`}>{row.finalLevel}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs border ${getStatusColor(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] group-hover:bg-blue-50/50 transition-colors ${openDropdown === row.id ? 'z-50' : 'z-10'}`}>
                      <div className="flex items-center justify-center space-x-2">
                        {row.status === '待审核' ? (
                          <button className="text-[#419EFF] hover:text-blue-700 font-medium" onClick={() => openAuditModal(row)}>
                            审核
                          </button>
                        ) : (
                          <button className="text-[#419EFF] hover:text-blue-700 font-medium" onClick={() => openAuditModal(row)}>
                            详情
                          </button>
                        )}
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
                                <button className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-blue-50 hover:text-[#419EFF]">
                                  历史
                                </button>
                                {row.status === '待审核' && (
                                  <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                                    撤销
                                  </button>
                                )}
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

          {/* 分页区域 */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-white">
            <div className="text-sm text-[#666666]">
              显示第 1 到第 {data.length} 条记录，总共 {data.length} 条记录
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-[#999999] bg-gray-50 cursor-not-allowed">上一页</button>
              <button className="px-3 py-1 border border-[#419EFF] rounded text-sm text-white bg-[#419EFF]">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-[#666666] hover:bg-gray-50">下一页</button>
            </div>
          </div>
        </div>
      </div>

      {/* 发起新评定模态框 */}
      {isInitiateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[600px] flex flex-col shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">发起新评定</h3>
              <button onClick={() => setIsInitiateModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">评定年度</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#419EFF]">
                  <option>2026</option>
                  <option>2025</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">选择评定企业</label>
                <div className="border border-gray-300 rounded-md p-2 h-32 overflow-y-auto">
                  <label className="flex items-center space-x-2 p-1 hover:bg-gray-50">
                    <input type="checkbox" className="rounded text-[#419EFF] focus:ring-[#419EFF]" />
                    <span className="text-sm">全选</span>
                  </label>
                  <label className="flex items-center space-x-2 p-1 hover:bg-gray-50">
                    <input type="checkbox" className="rounded text-[#419EFF] focus:ring-[#419EFF]" />
                    <span className="text-sm">某汽车维修有限公司</span>
                  </label>
                  <label className="flex items-center space-x-2 p-1 hover:bg-gray-50">
                    <input type="checkbox" className="rounded text-[#419EFF] focus:ring-[#419EFF]" />
                    <span className="text-sm">某快捷汽修店</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">评定标准模板</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#419EFF]">
                  <option>一二类汽车维修企业质量信誉考核标准 (V2.1)</option>
                  <option>三类汽车维修企业标准 (V1.0)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button onClick={() => setIsInitiateModalOpen(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-100">取消</button>
              <button onClick={() => setIsInitiateModalOpen(false)} className="px-4 py-2 bg-[#419EFF] text-white rounded-md text-sm hover:bg-blue-600">确认下发</button>
            </div>
          </div>
        </div>
      )}

      {/* 审核评定模态框 (简化版) */}
      {isAuditModalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[800px] h-[600px] flex flex-col shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">评定审核详情 - {selectedRecord.name}</h3>
              <button onClick={() => setIsAuditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 flex overflow-hidden">
              {/* 左侧树形列表 */}
              <div className="w-1/2 border-r border-gray-200 p-4 overflow-y-auto bg-gray-50">
                <h4 className="font-medium text-sm mb-3">评分标准细则</h4>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-gray-800">一、安全生产 (200分)</div>
                  <div className="pl-4 space-y-1">
                    <div className="text-gray-600 cursor-pointer hover:text-[#419EFF]">1.1 安全管理制度 (50分)</div>
                    <div className="pl-4 text-gray-500 text-xs">1.1.1 未建立安全生产责任制 (-20分)</div>
                    <div className="pl-4 text-gray-500 text-xs">1.1.2 安全培训记录不全 (-10分)</div>
                  </div>
                  <div className="font-medium text-gray-800 mt-4">二、维修质量 (300分)</div>
                </div>
              </div>
              {/* 右侧打分面板 */}
              <div className="w-1/2 p-4 overflow-y-auto flex flex-col">
                <div className="bg-blue-50 p-3 rounded-md mb-4 border border-blue-100">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">企业自评得分：</span>
                    <span className="font-bold text-gray-800">{selectedRecord.selfScore || '未提交'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">当前审核得分：</span>
                    <span className="font-bold text-[#419EFF]">{selectedRecord.auditScore || '890'}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">系统建议等级：</span>
                    <span className="font-bold text-yellow-500">AAA</span>
                  </div>
                </div>
                
                <h4 className="font-medium text-sm mb-3 border-b pb-2">当前项：1.1 安全管理制度</h4>
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">企业自评说明</label>
                    <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded border border-gray-200">已建立完善的安全生产责任制并定期培训。</div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">佐证材料</label>
                    <div className="flex gap-2">
                      <div className="w-16 h-16 bg-gray-200 rounded border border-gray-300 flex items-center justify-center text-xs text-gray-500">图片1</div>
                      <div className="w-16 h-16 bg-gray-200 rounded border border-gray-300 flex items-center justify-center text-xs text-gray-500">图片2</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">审核扣分</label>
                    <input type="number" placeholder="0" className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-[#419EFF]" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">审核意见</label>
                    <textarea rows={3} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-[#419EFF]" placeholder="请输入审核意见..."></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button onClick={() => setIsAuditModalOpen(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-100">取消</button>
              {selectedRecord.status === '待审核' && (
                <button onClick={() => setIsAuditModalOpen(false)} className="px-4 py-2 bg-[#419EFF] text-white rounded-md text-sm hover:bg-blue-600">提交审核结果</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
