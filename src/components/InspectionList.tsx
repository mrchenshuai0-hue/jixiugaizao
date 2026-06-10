import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Download, Eye, ChevronDown, RefreshCw, ClipboardList, CheckCircle2, AlertCircle, FileEdit } from 'lucide-react';
import { api } from '../api';
import { Inspection } from '../types';

interface InspectionListProps {
  onView: (id: string) => void;
  initialRegion?: string;
}

export default function InspectionList({ onView, initialRegion }: InspectionListProps) {
  const [data, setData] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [selectedRegion, setSelectedRegion] = useState('');
  const [appliedRegion, setAppliedRegion] = useState(initialRegion || '');

  useEffect(() => {
    if (initialRegion !== undefined) {
      setAppliedRegion(initialRegion);
      if (initialRegion.includes('福州')) {
        setSelectedRegion('fz');
      } else if (initialRegion.includes('厦门')) {
        setSelectedRegion('xm');
      } else {
        setSelectedRegion('');
      }
    }
  }, [initialRegion]);

  const displayData = data.filter(row => {
    if (appliedRegion) {
      const cleanRegion = appliedRegion.replace('福州市', '').replace('市', '').replace('区', '').replace('县', '').replace('公安分局', '').replace('-', '').trim();
      return (row.region || '').includes(cleanRegion) || (row.company || '').includes(cleanRegion);
    }
    return true;
  });

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 1500);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.inspection.getAll();
        // 补充/丰富 mock 数据
        const enhancedData = result.map((item, index) => ({
          ...item,
          inspectMethod: index % 2 === 0 ? '日常检查' : '专项检查',
          unitLevel: index % 3 === 0 ? '派出所' : '分局',
          enterpriseStatus: '正常营业',
          isNormal: item.situation === '正常' ? '是' : '否',
          unitCode: `UC${2024000 + index}`,
          region: index % 2 === 0 ? '福州市鼓楼区' : '福州市台江区',
          inspectionUnit: index % 3 === 0 ? '五凤派出所' : '鼓楼分局治安大队'
        }));
        setData(enhancedData);
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">行政区划</label>
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white transition-colors"
                >
                  <option value="">全部</option>
                  <option value="fz">福州市</option>
                  <option value="xm">厦门市</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">公司名称</label>
                <input type="text" className="w-full h-8 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入公司名称" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">检查方式</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="日常">日常检查</option>
                  <option value="专项">专项检查</option>
                  <option value="双随机">双随机检查</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">检查人员姓名</label>
                <input type="text" className="w-full h-8 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入姓名" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">检查日期</label>
                <input type="date" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">企业编码</label>
                <input type="text" className="w-full h-8 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入企业编码" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">是否正常</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="是">是</option>
                  <option value="否">否</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">检查单位级别</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="省级">省级</option>
                  <option value="市级">市级</option>
                  <option value="县级">县级</option>
                  <option value="派出所">派出所</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">企业状态</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white transition-colors">
                  <option value="">全部</option>
                  <option value="1">正常营业</option>
                  <option value="0">歇业</option>
                </select>
              </div>
              <div className="flex space-x-2 justify-end">
                <button 
                  onClick={() => setAppliedRegion(selectedRegion === 'fz' ? '福州市' : selectedRegion === 'xm' ? '厦门市' : '')}
                  className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xs font-medium"
                >
                  <Search size={14} className="mr-1.5" /> 查询
                </button>
                <button 
                  onClick={() => { setSelectedRegion(''); setAppliedRegion(''); }}
                  className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-xs font-medium"
                >
                  <RotateCcw size={14} className="mr-1.5" /> 重置
                </button>
              </div>
            </div>
          </div>

          {/* 操作区域 */}
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">共找到 <span className="text-[#419EFF] font-medium">{displayData.length}</span> 条检查记录</div>
            <div className="flex space-x-2">
              <button 
                onClick={() => window.open('https://www.example.gov.cn/inspection', '_blank')}
                className="h-8 px-4 bg-white border border-blue-200 text-[#419EFF] rounded hover:bg-blue-50 transition-colors flex items-center text-sm font-medium"
              >
                省涉企检查系统
              </button>
              <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <Download size={14} className="mr-1.5" /> 导出
              </button>
            </div>
          </div>

          {/* 表格区域 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 font-medium">检查编号</th>
                  <th className="px-4 py-3 font-medium">公司名称</th>
                  <th className="px-4 py-3 font-medium">单位编码</th>
                  <th className="px-4 py-3 font-medium">行政区划</th>
                  <th className="px-4 py-3 font-medium">检查日期</th>
                  <th className="px-4 py-3 font-medium">检查单位</th>
                  <th className="px-4 py-3 font-medium">检查人员</th>
                  <th className="px-4 py-3 font-medium">是否发现问题</th>
                  <th className="px-4 py-3 font-medium text-center w-32">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-gray-500">
                      加载中...
                    </td>
                  </tr>
                ) : displayData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                ) : displayData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-[#333333]">{row.id}</td>
                    <td className="px-4 py-3 font-medium text-[#333333]">{row.company}</td>
                    <td className="px-4 py-3">{row.unitCode || '-'}</td>
                    <td className="px-4 py-3">{row.region || '-'}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">{row.inspectionUnit || '-'}</td>
                    <td className="px-4 py-3">{row.inspectors}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${row.situation === '正常' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {row.situation === '正常' ? '否' : '是'}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] group-hover:bg-blue-50/50 transition-colors`}>
                      <div className="flex items-center justify-center">
                        <button onClick={() => onView(row.id)} className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center">
                          <Eye size={14} className="mr-1" /> 详情
                        </button>
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
    </div>
  );
}
