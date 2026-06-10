import React, { useState } from 'react';
import { Search, RotateCcw, Download, User, ShieldAlert, RefreshCw } from 'lucide-react';

export default function KeyPersonnelSearch() {
  const [loading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [view, setView] = useState<'list' | 'detail'>('list');

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 1500);
  };
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [data] = useState([
    {
      id: '1',
      name: '张三',
      idCard: '350102199001011234',
      residence: '福建省福州市马尾区',
      phone: '13800138000',
      gender: '男',
      businessType: '维修技师',
      enterpriseName: '马尾顺风汽修有限公司',
      enterpriseCode: 'MW001234',
      division: '马尾分局',
      category: '涉稳人员',
      subCategory: '维权重点人',
      compareTime: '2026-04-20 10:30:15'
    },
    {
      id: '2',
      name: '李四',
      idCard: '350102198505204321',
      residence: '福建省福州市仓山区',
      phone: '13900139000',
      gender: '男',
      businessType: '前台接待',
      enterpriseName: '仓山大众维修服务中心',
      enterpriseCode: 'CS005678',
      division: '仓山分局',
      category: '前科人员',
      subCategory: '盗窃前科',
      compareTime: '2026-04-22 14:20:00'
    }
  ]);

  const handleViewDetail = (person: any) => {
    setSelectedPerson(person);
    setView('detail');
  };

  if (view === 'detail' && selectedPerson) {
    return (
      <div className="flex flex-col h-full bg-[#F5F5F5] p-3">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">重点人员比对详情</h2>
                <p className="text-xs text-gray-500">比对流水号: CMP-{selectedPerson.idCard.slice(-6)}-20260424</p>
              </div>
            </div>
            <button 
              onClick={() => setView('list')}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 text-sm font-medium transition-colors"
            >
              返回列表
            </button>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 基本信息 */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 border-l-4 border-blue-600 pl-3">人员基础信息</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400">姓名</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedPerson.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">性别</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedPerson.gender}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400">身份证号</p>
                    <p className="text-sm font-mono font-medium text-gray-800 mt-0.5">{selectedPerson.idCard}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">联系电话</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedPerson.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">重点人员类别</p>
                    <p className="text-sm font-medium text-red-600 mt-0.5">{selectedPerson.category}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400">户籍所在地</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedPerson.residence}</p>
                  </div>
                </div>
              </div>

              {/* 企业关联信息 */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 border-l-4 border-blue-600 pl-3">企业关联及比对信息</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400">关联企业名称</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedPerson.enterpriseName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">企业编码</p>
                    <p className="text-sm font-mono font-medium text-gray-800 mt-0.5">{selectedPerson.enterpriseCode}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">业务类型</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedPerson.businessType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">比对时间</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedPerson.compareTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">行政区划</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedPerson.division}</p>
                  </div>
                </div>
              </div>

              {/* 轨迹信息 */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-sm font-bold text-blue-600 border-l-4 border-blue-600 pl-3">近期比对预警轨迹</h3>
                <div className="overflow-hidden border border-gray-100 rounded-lg shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700 text-xs">
                      <tr>
                        <th className="px-4 py-3">序号</th>
                        <th className="px-4 py-3">轨迹地点</th>
                        <th className="px-4 py-3">轨迹详情</th>
                        <th className="px-4 py-3">比对类型</th>
                        <th className="px-4 py-3">采集时间</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs text-gray-600 divide-y divide-gray-50">
                      <tr>
                        <td className="px-4 py-3">1</td>
                        <td className="px-4 py-3">{selectedPerson.enterpriseName}</td>
                        <td className="px-4 py-3">人员入职报备信息采集</td>
                        <td className="px-4 py-3">实名登记系统比对</td>
                        <td className="px-4 py-3 font-mono">{selectedPerson.compareTime}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">2</td>
                        <td className="px-4 py-3">马尾区某网吧</td>
                        <td className="px-4 py-3">身份登记上机</td>
                        <td className="px-4 py-3">治安管理系统比对</td>
                        <td className="px-4 py-3 font-mono">2026-04-18 20:15:22</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [isExpanded, setIsExpanded] = useState(false);

  // ... (inside component)

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <div className="flex-1 p-3 overflow-auto">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          {/* 查询区 */}
          <div className="p-5 border-b border-gray-100 flex items-start justify-between">
            <div className="flex-1 grid grid-cols-3 gap-6 mr-6">
              <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 w-24 shrink-0 whitespace-nowrap">行政区划</label>
                <select className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white transition-colors">
                  <option value="">全部</option>
                  <option value="mw">马尾分局</option>
                  <option value="cs">仓山分局</option>
                  <option value="gl">鼓楼分局</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 w-24 shrink-0 whitespace-nowrap">身份证号</label>
                <input type="text" placeholder="请输入身份证号" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 w-24 shrink-0 whitespace-nowrap">姓名</label>
                <input type="text" placeholder="请输入姓名" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              
              {isExpanded && (
                <>
                  <div className="flex items-center">
                    <label className="text-sm font-medium text-gray-700 w-24 shrink-0 whitespace-nowrap">比对时间</label>
                    <input type="date" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                  </div>
                  <div className="flex items-center">
                    <label className="text-sm font-medium text-gray-700 w-24 shrink-0 whitespace-nowrap">企业编码</label>
                    <input type="text" placeholder="请输入企业编码" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                  </div>
                  <div className="flex items-center">
                    <label className="text-sm font-medium text-gray-700 w-24 shrink-0 whitespace-nowrap">关联企业名称</label>
                    <input type="text" placeholder="请输入企业名称" className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                  </div>
                  <div className="flex items-center">
                    <label className="text-sm font-medium text-gray-700 w-24 shrink-0 whitespace-nowrap">重点人员类别</label>
                    <select className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white transition-colors">
                      <option value="">全部</option>
                      <option value="1">涉恐人员</option>
                      <option value="2">涉稳人员</option>
                      <option value="3">重大刑事犯罪前科人员</option>
                      <option value="4">前科人员</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <label className="text-sm font-medium text-gray-700 w-24 shrink-0 whitespace-nowrap">人员业务类型</label>
                    <select className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white transition-colors">
                      <option value="">全部</option>
                      <option value="1">机修人员</option>
                      <option value="2">接待人员</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="flex space-x-2">
                <button className="h-9 px-5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium shadow-sm">
                  <Search size={14} className="mr-1.5" /> 查询
                </button>
                <button className="h-9 px-5 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium shadow-sm">
                  <RotateCcw size={14} className="mr-1.5" /> 重置
                </button>
                <button onClick={() => setIsExpanded(!isExpanded)} className="h-9 px-5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium flex items-center">
                  {isExpanded ? '收起' : '展开'}
                </button>
              </div>
            </div>
          </div>

          {/* 操作区 */}
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">
              共找到 <span className="text-red-500 font-medium">{data.length}</span> 条重点关注人员
            </div>
            <div className="flex space-x-2">
              <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <Download size={14} className="mr-1.5" />
                导出列表
              </button>
            </div>
          </div>

          {/* 表格区 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1500px]">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 font-medium">姓名</th>
                  <th className="px-4 py-3 font-medium">身份证号</th>
                  <th className="px-4 py-3 font-medium">性别</th>
                  <th className="px-4 py-3 font-medium">户籍所在地</th>
                  <th className="px-4 py-3 font-medium">电话</th>
                  <th className="px-4 py-3 font-medium">人员业务类型</th>
                  <th className="px-4 py-3 font-medium">关联企业名称</th>
                  <th className="px-4 py-3 font-medium">企业编码</th>
                  <th className="px-4 py-3 font-medium">行政区划</th>
                  <th className="px-4 py-3 font-medium">重点人员类别</th>
                  <th className="px-4 py-3 font-medium">重点人员细类</th>
                  <th className="px-4 py-3 font-medium text-center">比对时间</th>
                  <th className="px-4 py-3 font-medium text-center sticky right-0 bg-gray-50 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)]">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
                {loading ? (
                  <tr>
                    <td colSpan={13} className="px-4 py-10 text-center text-gray-500">
                      加载中...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="px-4 py-10 text-center text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                ) : data.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-red-50/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-[#333333]">{row.name}</td>
                    <td className="px-4 py-3 font-mono">{row.idCard}</td>
                    <td className="px-4 py-3">{row.gender}</td>
                    <td className="px-4 py-3">{row.residence}</td>
                    <td className="px-4 py-3">{row.phone}</td>
                    <td className="px-4 py-3">{row.businessType}</td>
                    <td className="px-4 py-3">{row.enterpriseName}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.enterpriseCode}</td>
                    <td className="px-4 py-3">{row.division}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs border border-red-200 uppercase font-medium">
                        {row.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.subCategory}</td>
                    <td className="px-4 py-3 text-center text-[#999999] text-xs">{row.compareTime}</td>
                    <td className="px-4 py-3 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] transition-colors">
                      <button 
                        onClick={() => handleViewDetail(row)}
                        className="text-[#419EFF] hover:underline font-medium"
                      >
                        比对详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页区 */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-white">
            <div className="text-sm text-[#666666]">
              显示第 1 到第 {data.length} 条记录，总共 {data.length} 条记录
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
