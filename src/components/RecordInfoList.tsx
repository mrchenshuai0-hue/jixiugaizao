import React, { useState } from 'react';
import { Search, RotateCcw, Plus, Download, Bell, Eye, CheckSquare, ShieldAlert, ChevronDown } from 'lucide-react';

interface RecordInfoListProps {
  onViewDetail: (id: string, mode?: 'view' | 'audit' | 'edit') => void;
}

export default function RecordInfoList({ onViewDetail }: RecordInfoListProps) {
  const [data] = useState([
    { id: '1', name: '某汽车维修有限公司', uscc: '91350100MA34567890', legalRep: '张三', address: '某区某街道1号', region: '某区', status: '已备案', updateDate: '2026-04-10' },
    { id: '2', name: '某快捷汽修店', uscc: '91350100MA12345678', legalRep: '李四', address: '某区某路2号', region: '某区', status: '待审核', updateDate: '2026-04-14' },
    { id: '3', name: '某汽车服务中心', uscc: '91350100MA98765432', legalRep: '王五', address: '郊区某镇3号', region: '郊区', status: '备案过期', updateDate: '2025-04-10' },
    { id: '4', name: '某专业钣金喷漆', uscc: '91350100MA11223344', legalRep: '赵六', address: '其他区某街4号', region: '其他区', status: '未备案', updateDate: '-' },
    { id: '5', name: '某综合汽修厂', uscc: '91350100MA55667788', legalRep: '钱七', address: '某区某道5号', region: '某区', status: '信息变更待审', updateDate: '2026-04-15' },
  ]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '未备案': return 'bg-gray-100 text-gray-700 border-gray-200';
      case '待审核': 
      case '信息变更待审': return 'bg-[#fff8e6] text-[#ffc23e] border-[#ffe8b3]';
      case '已备案': return 'bg-[#e8f8f7] text-[#1ebcaf] border-[#bcece8]';
      case '备案过期': return 'bg-[#ffece9] text-[#fa5e45] border-[#ffd1ca]';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <div className="flex-1 p-3 overflow-auto">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          {/* 顶部查询筛选区 */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="w-64">
                <label className="block text-sm text-[#666666] mb-1.5">企业名称/统一社会信用代码</label>
                <input type="text" className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入关键词" />
              </div>
              <div className="w-48">
                <label className="block text-sm text-[#666666] mb-1.5">所属辖区</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="某区">某区</option>
                  <option value="郊区">郊区</option>
                  <option value="其他区">其他区</option>
                </select>
              </div>
              <div className="w-40">
                <label className="block text-sm text-[#666666] mb-1.5">备案状态</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="未备案">未备案</option>
                  <option value="待审核">待审核</option>
                  <option value="已备案">已备案</option>
                  <option value="备案过期">备案过期</option>
                  <option value="信息变更待审">信息变更待审</option>
                </select>
              </div>
              <div className="w-40">
                <label className="block text-sm text-[#666666] mb-1.5">企业类别</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="一类汽车维修">一类汽车维修</option>
                  <option value="二类汽车维修">二类汽车维修</option>
                  <option value="三类专项维修">三类专项维修</option>
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

          {/* 全局操作区 */}
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">共找到 <span className="text-[#419EFF] font-medium">{data.length}</span> 条备案记录</div>
            <div className="flex space-x-2">
              <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <Download size={14} className="mr-1.5" /> 批量导出
              </button>
              <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <Bell size={14} className="mr-1.5" /> 发送备案提醒
              </button>
              <button 
                className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium"
                onClick={() => onViewDetail('new', 'edit')}
              >
                <Plus size={14} className="mr-1.5" /> 新增备案
              </button>
            </div>
          </div>

          {/* 核心数据展示区 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 font-medium w-16 text-center">序号</th>
                  <th className="px-4 py-3 font-medium">企业名称</th>
                  <th className="px-4 py-3 font-medium">统一社会信用代码</th>
                  <th className="px-4 py-3 font-medium">法定代表人</th>
                  <th className="px-4 py-3 font-medium">经营地址</th>
                  <th className="px-4 py-3 font-medium">所属辖区</th>
                  <th className="px-4 py-3 font-medium text-center">备案状态</th>
                  <th className="px-4 py-3 font-medium">最新更新日期</th>
                  <th className="px-4 py-3 font-medium text-center w-48">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
                {data.map((row, index) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-3 text-center">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-[#419EFF] cursor-pointer hover:underline" onClick={() => onViewDetail(row.id, 'view')}>{row.name}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.uscc}</td>
                    <td className="px-4 py-3">{row.legalRep}</td>
                    <td className="px-4 py-3 truncate max-w-[150px]" title={row.address}>{row.address}</td>
                    <td className="px-4 py-3">{row.region}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs border ${getStatusColor(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.updateDate}</td>
                    <td className={`px-4 py-3 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] group-hover:bg-blue-50/50 transition-colors ${openDropdown === row.id ? 'z-50' : 'z-10'}`}>
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          className="text-[#419EFF] hover:text-blue-700 font-medium"
                          onClick={(e) => { e.stopPropagation(); onViewDetail(row.id, 'view'); }}
                        >
                          详情
                        </button>
                        {(row.status === '待审核' || row.status === '信息变更待审') && (
                          <button 
                            className="text-[#ffc23e] hover:text-yellow-600 font-medium"
                            onClick={(e) => { e.stopPropagation(); onViewDetail(row.id, 'audit'); }}
                          >
                            审核
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
                                  检查
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

          {/* 底部控制区 */}
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
    </div>
  );
}
