import React, { useState } from 'react';
import { Search, RotateCcw, Download, Info, AlertTriangle, ShieldAlert, Eye, User } from 'lucide-react';

export default function WarningInformationCenter() {
  const [loading] = useState(false);
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedWarning, setSelectedWarning] = useState<any>(null);
  const [data] = useState([
    {
      id: 'WARN-20260420-001',
      level: '红色预警',
      releaseTime: '2026-04-20 10:30:15',
      releaseUnit: '省公安厅情报中心',
      personName: '张三',
      idCard: '350102199001011234',
      subCategory: '维权重点人',
      categoryTag: '涉稳',
      dynamicType: '旅馆住宿',
      location: '福州市马尾区君临大酒店 802房',
      details: '该员于2026-04-20 10:25在福州市马尾区君临大酒店办理入住手续，触发涉稳重点人员预警。'
    },
    {
      id: 'WARN-20260422-045',
      level: '橙色预警',
      releaseTime: '2026-04-22 14:20:00',
      releaseUnit: '福州市公安局',
      personName: '李四',
      idCard: '350102198505204321',
      subCategory: '盗窃前科',
      categoryTag: '前科',
      dynamicType: '网吧上网',
      location: '福州市仓山区飞腾网吧 22号机',
      details: '该员于2026-04-22 14:15在福州市仓山区飞腾网吧登记上网，触发盗窃前科重点人员预警。'
    }
  ]);

  const handleViewDetail = (warning: any) => {
    setSelectedWarning(warning);
    setView('detail');
  };

  const getLevelStyle = (level: string) => {
    switch (level) {
      case '红色预警': return 'bg-red-100 text-red-600 border-red-200';
      case '橙色预警': return 'bg-orange-100 text-orange-600 border-orange-200';
      case '黄色预警': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case '蓝色预警': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  if (view === 'detail' && selectedWarning) {
    return (
      <div className="flex flex-col h-full bg-[#F5F5F5] p-3">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${getLevelStyle(selectedWarning.level)}`}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">预警信息详情</h2>
                <p className="text-xs text-gray-500">预警编号: {selectedWarning.id}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setView('list')}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 text-sm font-medium transition-colors"
              >
                返回列表
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 人员信息 */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-sm font-bold text-blue-600 border-l-4 border-blue-600 pl-3">预警对象信息</h3>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      <User size={48} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-xs text-gray-400">姓名</p>
                      <p className="text-sm font-bold text-gray-800">{selectedWarning.personName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">类别标记</p>
                      <span className="text-[10px] bg-white border px-1.5 py-0.5 rounded uppercase text-gray-500 font-medium">
                        {selectedWarning.categoryTag}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-400">身份证号</p>
                      <p className="text-sm font-mono text-gray-800">{selectedWarning.idCard}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-400">人员细类</p>
                      <p className="text-sm text-gray-800">{selectedWarning.subCategory}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 预警详情 */}
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-blue-600 border-l-4 border-blue-600 pl-3">预警详情记录</h3>
                  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-inner space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-400">预警级别</p>
                        <p className={`text-sm font-bold ${selectedWarning.level.includes('红') ? 'text-red-600' : 'text-orange-600'}`}>{selectedWarning.level}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">信息类别</p>
                        <p className="text-sm font-medium text-gray-800">{selectedWarning.dynamicType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">发布时间</p>
                        <p className="text-sm font-medium text-gray-800">{selectedWarning.releaseTime}</p>
                      </div>
                      <div className="col-span-2 md:col-span-3">
                        <p className="text-xs text-gray-400">发现地点</p>
                        <p className="text-sm font-medium text-gray-800">{selectedWarning.location}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-dashed border-gray-200">
                      <p className="text-xs text-gray-400 mb-2">预警描述</p>
                      <div className="bg-blue-50 p-3 rounded text-sm text-blue-800 leading-relaxed italic">
                        "{selectedWarning.details}"
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-blue-600 border-l-4 border-blue-600 pl-3">处置记录</h3>
                  <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                    <div className="relative">
                      <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm ring-4 ring-blue-50"></div>
                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-gray-700">预警信息生成</span>
                          <span className="text-[10px] text-gray-400 font-mono">{selectedWarning.releaseTime}</span>
                        </div>
                        <p className="text-xs text-gray-500">重点人员库自动触发预警并分发至相关单位。</p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
                      <div className="text-xs text-gray-400 italic py-1">暂无后续处置记录...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <div className="flex-1 p-3 overflow-auto">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          {/* 查询区 */}
          <div className="p-5 border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-xs text-[#666666] mb-1">预警信息编号</label>
                <input type="text" placeholder="请输入编号" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">预警级别</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white transition-colors">
                  <option value="">全部</option>
                  <option value="red">红色预警</option>
                  <option value="orange">橙色预警</option>
                  <option value="yellow">黄色预警</option>
                  <option value="blue">蓝色预警</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">重点人员细类</label>
                <input type="text" placeholder="请输入细类" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">重点人员姓名</label>
                <input type="text" placeholder="请输入姓名" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">身份证号</label>
                <input type="text" placeholder="请输入身份证号" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">动态信息类别</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white transition-colors">
                  <option value="">全部</option>
                  <option value="1">旅馆住宿</option>
                  <option value="2">网吧上网</option>
                  <option value="3">乘车信息</option>
                  <option value="4">民航信息</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1">预警发布时间</label>
                <input type="date" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div className="flex space-x-2 pt-2 md:col-span-1 lg:col-span-3 justify-end">
                <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xs font-medium">
                  <Search size={14} className="mr-1.5" />
                  查询
                </button>
                <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 hover:text-[#333333] transition-colors flex items-center text-xs font-medium">
                  <RotateCcw size={14} className="mr-1.5" />
                  重置
                </button>
              </div>
            </div>
          </div>

          {/* 操作区 */}
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm font-medium text-red-600 flex items-center">
              <ShieldAlert size={16} className="mr-2" />
              当前共有 <span className="mx-1 text-lg font-bold">12</span> 条未处置高等级预警
            </div>
            <div className="flex space-x-2">
              <button className="h-8 px-4 border border-gray-300 rounded bg-white text-xs font-medium hover:bg-gray-50 flex items-center transition-colors">
                <Download size={14} className="mr-1.5" />
                导出预警清单
              </button>
            </div>
          </div>

          {/* 表格区 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 font-medium">预警信息编号</th>
                  <th className="px-4 py-3 font-medium">预警级别</th>
                  <th className="px-4 py-3 font-medium text-center">预警发布时间</th>
                  <th className="px-4 py-3 font-medium">发布单位</th>
                  <th className="px-4 py-3 font-medium">重点人员姓名</th>
                  <th className="px-4 py-3 font-medium">身份证号</th>
                  <th className="px-4 py-3 font-medium">重点人员细类</th>
                  <th className="px-4 py-3 font-medium text-center">重点人员类别标记</th>
                  <th className="px-4 py-3 font-medium text-center">动态信息类别</th>
                  <th className="px-4 py-3 font-medium text-center w-32 sticky right-0 bg-gray-50 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)]">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-10 text-center text-gray-500">
                      加载中...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-10 text-center text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                ) : data.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">{row.id}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border font-medium ${getLevelStyle(row.level)}`}>
                        {row.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-[#999999]">{row.releaseTime}</td>
                    <td className="px-4 py-3 text-xs">{row.releaseUnit}</td>
                    <td className="px-4 py-3 font-medium text-[#333333]">{row.personName}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.idCard}</td>
                    <td className="px-4 py-3">{row.subCategory}</td>
                    <td className="px-4 py-3 text-center">
                       <span className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] text-gray-500 uppercase">
                         {row.categoryTag}
                       </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="flex items-center justify-center gap-1.5 text-xs">
                        <Info size={12} className="text-[#419EFF]" />
                        {row.dynamicType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] transition-colors">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => handleViewDetail(row)}
                          className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center"
                        >
                          <Eye size={14} className="mr-1" />
                          详情
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页区 */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-white">
            <div className="text-sm text-[#666666]">
              显示第 1 到第 {data.length} 条预警信息，总共 {data.length} 条记录
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-[#999999] bg-gray-50 cursor-not-allowed">上一页</button>
              <button className="px-3 py-1 border border-[#419EFF] rounded text-sm text-white bg-[#419EFF]">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-[#666666] hover:bg-gray-50 transition-colors">下一页</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
