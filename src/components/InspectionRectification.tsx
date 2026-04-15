import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { api } from '../api';
import { Inspection } from '../types';

export default function InspectionRectification() {
  const [data, setData] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.inspection.getAll();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch inspections:', error);
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
          {/* 查询区域 */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="w-64">
                <label className="block text-sm text-[#666666] mb-1.5">公司名称</label>
                <input type="text" className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入公司名称" />
              </div>
              <div className="w-48">
                <label className="block text-sm text-[#666666] mb-1.5">整改状态</label>
                <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="待整改">待整改</option>
                  <option value="已整改">已整改</option>
                  <option value="逾期未整改">逾期未整改</option>
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

          {/* 统计卡片 */}
          <div className="px-5 py-4 grid grid-cols-3 gap-4 bg-gray-50/30 border-b border-gray-100">
            <div className="bg-white p-4 rounded border border-orange-100 flex items-center shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mr-3">
                <Clock size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-500">待整改问题</div>
                <div className="text-xl font-bold text-orange-600">5 <span className="text-xs font-normal text-gray-400 ml-1">项</span></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded border border-green-100 flex items-center shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 mr-3">
                <CheckCircle size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-500">本月已整改</div>
                <div className="text-xl font-bold text-green-600">12 <span className="text-xs font-normal text-gray-400 ml-1">项</span></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded border border-red-100 flex items-center shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 mr-3">
                <AlertCircle size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-500">逾期未整改</div>
                <div className="text-xl font-bold text-red-600">2 <span className="text-xs font-normal text-gray-400 ml-1">项</span></div>
              </div>
            </div>
          </div>

          {/* 表格区域 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 font-medium">受检单位</th>
                  <th className="px-4 py-3 font-medium">检查人员</th>
                  <th className="px-4 py-3 font-medium">检查日期</th>
                  <th className="px-4 py-3 font-medium">结果</th>
                  <th className="px-4 py-3 font-medium">状态</th>
                  <th className="px-4 py-3 font-medium text-center w-32">操作</th>
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
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-[#333333]">{row.enterprise}</td>
                    <td className="px-4 py-3">{row.inspector}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${row.result === '合格' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                        {row.result}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${row.status === '已完成' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button className="text-[#419EFF] hover:underline">详情</button>
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
    </div>
  );
}
