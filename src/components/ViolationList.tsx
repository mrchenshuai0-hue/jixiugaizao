import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Plus, Download, Eye, Edit, ChevronDown, X, ShieldAlert, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { api } from '../api';
import { Case } from '../types';
import DoubleCheckSupervision from './DoubleCheckSupervision';

interface ViolationListProps {
  onAdd: () => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function ViolationList({ onAdd, onView, onEdit }: ViolationListProps) {
  const [data, setData] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [showInvestigation, setShowInvestigation] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const [showSupervision, setShowSupervision] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.case.getAll();
        // 补充 mock 查处状态
        const enhanced = result.map((item, index) => ({
          ...item,
          caseNo: `A2024${(index + 1).toString().padStart(5, '0')}`,
          registrar: '张警官',
          violator: item.involvedParties?.[0]?.name || '某人',
          isInvestigated: index % 2 === 0 ? '已查处' : '未查处',
          company: '福州市鼓楼区安达汽车维修服务部'
        }));
        setData(enhanced);
      } catch (error) {
        console.error('Failed to fetch cases:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openInvestigation = (row: Case) => {
    if (row.isInvestigated === '已查处') {
      setSelectedCase(row);
      setShowInvestigation(true);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <div className="flex-1 p-3 overflow-auto">
        {/* 统计卡片区 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-red-50 rounded-full text-red-500 mr-4">
              <ShieldAlert size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">违法违规总数</div>
              <div className="text-xl font-bold text-gray-800">1,245</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-green-50 rounded-full text-green-500 mr-4">
              <CheckCircle size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">已查处案件</div>
              <div className="text-xl font-bold text-gray-800">1,012</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-orange-50 rounded-full text-orange-500 mr-4">
               <AlertTriangle size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">本月新增违规</div>
              <div className="text-xl font-bold text-gray-800">28</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-blue-50 rounded-full text-[#419EFF] mr-4">
              <FileText size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">查处率</div>
              <div className="text-xl font-bold text-gray-800">81.3%</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          {/* 查询区域 */}
          <div className="p-5 border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">行政区域</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white transition-colors">
                  <option value="">全部</option>
                  <option value="fz">福州市</option>
                  <option value="xm">厦门市</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">公司名称</label>
                <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入公司名称" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">企业编码</label>
                <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入企业编码" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">登记人员</label>
                <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入姓名" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">发生时间</label>
                <input type="date" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">违法违规人员(单位)</label>
                <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="人员姓名或单位" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">案件编号</label>
                <input type="text" className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入案件编号" />
              </div>
              <div>
                <label className="block text-xs text-[#666666] mb-1.5">是否查处</label>
                <select className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                  <option value="">全部</option>
                  <option value="已查处">已查处</option>
                  <option value="未查处">未查处</option>
                </select>
              </div>
              <div className="flex space-x-2 justify-end xl:col-start-5">
                <button className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xs font-medium">
                  <Search size={14} className="mr-1.5" /> 查询
                </button>
                <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-xs font-medium">
                  <RotateCcw size={14} className="mr-1.5" /> 重置
                </button>
              </div>
            </div>
          </div>

          {/* 操作区域 */}
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">共找到 <span className="text-[#419EFF] font-medium">{data.length}</span> 条违法违规记录</div>
            <div className="flex space-x-2">
              <button className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <Download size={14} className="mr-1.5" /> 导出
              </button>
              <button onClick={onAdd} className="h-8 px-4 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
                <Plus size={14} className="mr-1.5" /> 违法违规登记
              </button>
            </div>
          </div>

          {/* 表格区域 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-sm border-b border-gray-200">
                  <th className="px-4 py-3 font-medium">公司名称</th>
                  <th className="px-4 py-3 font-medium">案件编号</th>
                  <th className="px-4 py-3 font-medium">发生时间</th>
                  <th className="px-4 py-3 font-medium">登记人员</th>
                  <th className="px-4 py-3 font-medium">违法违规人员(单位)</th>
                  <th className="px-4 py-3 font-medium">是否查处</th>
                  <th className="px-4 py-3 font-medium text-center w-32 sticky right-0 bg-gray-50 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)]">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666]">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                      加载中...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                ) : data.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors group">
                    <td className="px-4 py-3 font-medium text-[#333333]">{row.company}</td>
                    <td className="px-4 py-3 font-mono">{row.caseNo}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">{row.registrar}</td>
                    <td className="px-4 py-3">{row.violator}</td>
                    <td className="px-4 py-3">
                      <button 
                        disabled={row.isInvestigated === '未查处'}
                        onClick={() => openInvestigation(row)}
                        className={`px-2 py-0.5 rounded text-xs border ${
                        row.isInvestigated === '已查处' ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100 cursor-pointer' : 'bg-gray-100 text-gray-400 border-gray-200'
                      }`}>
                        {row.isInvestigated}
                      </button>
                    </td>
                    <td className={`px-4 py-3 text-center sticky right-0 bg-white group-hover:bg-[#f3f7ff] transition-colors ${openDropdown === row.id ? 'z-50' : 'z-10'}`}>
                      <div className="flex items-center justify-center space-x-2">
                        <button onClick={() => onView(row.id)} className="text-[#419EFF] hover:text-blue-700 font-medium">
                          详情
                        </button>
                        <button onClick={() => onEdit(row.id)} className="text-[#419EFF] hover:text-blue-700 font-medium">
                          修改
                        </button>
                        <div className="relative">
                          <button 
                            className="text-[#419EFF] hover:text-blue-700 font-medium flex items-center p-1"
                            onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === row.id ? null : row.id); }}
                          >
                            <ChevronDown size={14} />
                          </button>
                          {openDropdown === row.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}></div>
                              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-20 py-1">
                                <button 
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setOpenDropdown(null); 
                                    setShowSupervision(true); 
                                    setSelectedRowId(row.id);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                                >
                                  {row.id === '2' ? '督办记录' : '发起督办'}
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
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
      {/* 查处信息弹窗 */}
      {showInvestigation && selectedCase && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">查处信息详情</h3>
                  <p className="text-xs text-gray-500 mt-0.5">该查处信息由三方信源提供接入</p>
                </div>
              </div>
              <button 
                onClick={() => setShowInvestigation(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InvestigationItem label="企业编码" value="ENT-2024-8892" />
                <InvestigationItem label="违法违规人员(单位)" value={selectedCase.violator} />
                <InvestigationItem label="登记人员" value={selectedCase.registrar} />
                <InvestigationItem label="发生时间" value={selectedCase.date} />
                <InvestigationItem label="案件编号" value={selectedCase.caseNo} />
                <InvestigationItem label="案件类型" value={selectedCase.type} />
                <InvestigationItem label="案发时间" value="2024-03-20 14:30" />
                <InvestigationItem label="案件名称" value="店面未按规定登记人员信息案" />
                <InvestigationItem label="案发地点" value="福州市鼓楼区安达路15号" />
                <InvestigationItem label="死亡人数" value="0" />
                <InvestigationItem label="受伤人数" value="0" />
                <InvestigationItem label="涉案价值" value="2000.00 元" />
                <InvestigationItem label="作案人数" value="1" />
                <InvestigationItem label="立案时间" value="2024-03-21 09:00" />
                <InvestigationItem label="主办单位" value="鼓楼分局治安大队" />
                <InvestigationItem label="查处人员" value="王建国、李志强" />
                <InvestigationItem label="查处时间" value="2024-04-10 16:20" />
                
                <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4">
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                    <h4 className="text-xs font-bold text-blue-800 mb-2">处理结果</h4>
                    <p className="text-sm text-blue-900 leading-relaxed">
                      责令该企业限期整改，并处以罚款人民币 2000 元。相关责任人已进行批评教育并记录至重点人员诚信档案。
                    </p>
                  </div>
                  <div>
                     <h4 className="text-xs font-bold text-gray-700 mb-2">情况描述</h4>
                     <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100 italic">
                       {selectedCase.description || '暂无描述'}
                     </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-700 mb-2">简要案情</h4>
                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                      2024年3月20日巡查中发现，安达汽车维修服务部在承接闽A88888报修业务时，未核验驾驶员及其身份证件，违反《机动车修理业治安管理条例》相关规定。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setShowInvestigation(false)}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 一案双查督办弹窗 */}
      {showSupervision && (
        <DoubleCheckSupervision 
          isModal 
          onClose={() => setShowSupervision(false)} 
          defaultStarted={selectedRowId === '2'} 
          initMode={selectedRowId !== '2'}
        />
      )}
    </div>
  );
}

function InvestigationItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{label}</label>
      <p className="text-sm text-gray-800 font-medium truncate border-b border-gray-50 pb-1">{value || '-'}</p>
    </div>
  );
}
