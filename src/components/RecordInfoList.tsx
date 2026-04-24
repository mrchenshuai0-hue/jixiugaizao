import React, { useState } from 'react';
import { Search, RotateCcw, Download, Bell } from 'lucide-react';

interface RecordInfoListProps {
  onViewDetail: (id: string) => void;
}

export default function RecordInfoList({ onViewDetail }: RecordInfoListProps) {
  const [data] = useState([
    { id: '1', name: '某汽车维修有限公司', uscc: '91350100MA34567890', legalRep: '张三', address: '某区某街道1号', region: '某区', status: '已备案', updateDate: '2026-04-10' },
    { id: '3', name: '某汽车服务中心', uscc: '91350100MA98765432', legalRep: '王五', address: '郊区某镇3号', region: '郊区', status: '备案过期', updateDate: '2025-04-10' },
    { id: '6', name: '某精工汽修', uscc: '91350100MA11112222', legalRep: '钱八', address: '某区某路16号', region: '某区', status: '已备案', updateDate: '2026-04-12' },
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
                  <option value="已备案">已备案</option>
                  <option value="备案过期">备案过期</option>
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
            </div>
          </div>

          {/* 核心数据展示区 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse text-[#333333]">
              <thead>
                <tr className="bg-[#f2f6fc] text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 font-medium w-16 text-center">序号</th>
                  <th className="px-4 py-3 font-medium">企业名称</th>
                  <th className="px-4 py-3 font-medium">统一社会信用代码</th>
                  <th className="px-4 py-3 font-medium">法定代表人</th>
                  <th className="px-4 py-3 font-medium">经营地址</th>
                  <th className="px-4 py-3 font-medium text-center">备案状态</th>
                  <th className="px-4 py-3 font-medium">最新更新日期</th>
                  <th className="px-4 py-3 font-medium text-center w-24">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {data.map((row, index) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-[#f5f9ff] transition-colors">
                    <td className="px-4 py-3 text-center">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-[#419EFF] cursor-pointer hover:underline" onClick={() => onViewDetail(row.id)}>{row.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#666666]">{row.uscc}</td>
                    <td className="px-4 py-3 text-[#666666]">{row.legalRep}</td>
                    <td className="px-4 py-3 truncate max-w-[200px] text-[#666666]" title={row.address}>{row.address}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs border ${getStatusColor(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#666666]">{row.updateDate}</td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        className="text-[#419EFF] hover:text-blue-700 font-medium"
                        onClick={(e) => { e.stopPropagation(); onViewDetail(row.id); }}
                      >
                        详情
                      </button>
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
