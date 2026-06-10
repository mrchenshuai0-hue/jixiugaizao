import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  Download, 
  Eye, 
  ArrowLeft,
  X,
  AlertCircle,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

interface InspectionStep {
  part: string;
  time: string;
  result: '合格' | '不合格' | '整改中';
  description: string;
}

interface InspectionHistory {
  id: string;
  businessDate: string;
  completionTime: string;
  inspector: string;
  resultSummary: string;
  startTime: string;
  endTime: string;
  steps: InspectionStep[];
}

interface SafetyEnterprise {
  id: string;
  name: string;
  signboard: string;
  category: string;
  jurisdiction: string;
  reportedBy: string;
  reportedTime: string;
  lastInspectionTime: string;
  lastInspectionResult: string;
  history: InspectionHistory[];
}

const MOCK_SAFETY_DATA: SafetyEnterprise[] = [
  {
    id: 'SEC001',
    name: '福州市鼓楼区顺风美发沙龙',
    signboard: '顺风美发造型',
    category: '美发美容',
    jurisdiction: '南街派出所',
    reportedBy: '王建国',
    reportedTime: '2024-01-15 10:00:00',
    lastInspectionTime: '2024-06-08 14:30:00',
    lastInspectionResult: '合格',
    history: [
      {
        id: 'H001',
        businessDate: '2024-06-08',
        completionTime: '2024-06-08 14:30:00',
        inspector: '张警官',
        startTime: '09:00',
        endTime: '22:00',
        resultSummary: '场所消防设施齐全，监控运行正常，未见违规明火。',
        steps: [
          { part: '消防栓/灭火器', time: '14:05', result: '合格', description: '压力正常，年检标示清晰' },
          { part: '疏散通道', time: '14:10', result: '合格', description: '通道畅通，无杂物堆放' },
          { part: '视频监控系统', time: '14:20', result: '合格', description: '画面清晰，存储时长达标' },
          { part: '从业人员证件', time: '14:25', result: '合格', description: '人员信息已录入系统' }
        ]
      },
      {
        id: 'H002',
        businessDate: '2024-06-01',
        completionTime: '2024-06-01 10:15:00',
        inspector: '李处长',
        startTime: '09:00',
        endTime: '22:00',
        resultSummary: '巡检通过，存在轻微卫生隐患已提醒。',
        steps: [
          { part: '后厨区域', time: '10:05', result: '合格', description: '卫生状况良好' }
        ]
      }
    ]
  },
  {
    id: 'SEC002',
    name: '台江区悦豪KTV娱乐会所',
    signboard: '悦豪至尊KTV',
    category: '大型歌舞娱乐',
    jurisdiction: '上海派出所',
    reportedBy: '赵大海',
    reportedTime: '2024-02-20 15:30:00',
    lastInspectionTime: '2024-06-05 21:00:00',
    lastInspectionResult: '合格',
    history: [
      {
        id: 'H003',
        businessDate: '2024-06-05',
        completionTime: '2024-06-05 21:00:00',
        inspector: '陈警官',
        startTime: '18:00',
        endTime: '04:00',
        resultSummary: '夜间营业高峰，安保配备充足，消防通道正常。',
        steps: [
          { part: '保安配员', time: '20:30', result: '合格', description: '15名保安在岗，亮证执勤' },
          { part: '禁毒标识', time: '20:45', result: '合格', description: '各包间张贴完整' }
        ]
      }
    ]
  }
];

export default function SafetyInspectionManagement() {
  const [showDetailId, setShowDetailId] = useState<string | null>(null);
  const [selectedHistory, setSelectedHistory] = useState<InspectionHistory | null>(null);

  // Filters for Main List
  const [listVenueName, setListVenueName] = useState('');
  const [listDate, setListDate] = useState('');
  const [listInspector, setListInspector] = useState('');

  // Filters for History List in Detail Page
  const [historyDate, setHistoryDate] = useState('');
  const [historyInspector, setHistoryInspector] = useState('');

  const handleResetListFilters = () => {
    setListVenueName('');
    setListDate('');
    setListInspector('');
  };

  const currentEnterprise = MOCK_SAFETY_DATA.find(e => e.id === showDetailId);

  const filteredMainList = MOCK_SAFETY_DATA.filter(ent => {
    const matchesName = ent.name.includes(listVenueName);
    const matchesDate = listDate === '' || ent.lastInspectionTime.startsWith(listDate);
    // In mock data, we check last history inspector if possible, but for simplicity:
    const matchesInspector = listInspector === '' || ent.history.some(h => h.inspector.includes(listInspector));
    return matchesName && matchesDate && matchesInspector;
  });

  const renderMainList = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F5F5F5] font-sans text-left">
      <div className="flex-1 p-3 overflow-auto">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          {/* 查询栏位 */}
          <div className="p-5 border-b border-gray-100 bg-[#FCFCFD]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">场所名称</label>
                <input 
                  type="text" 
                  value={listVenueName}
                  onChange={e => setListVenueName(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                  placeholder="请输入场所名称" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">巡检日期</label>
                <input 
                  type="date" 
                  value={listDate}
                  onChange={e => setListDate(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">巡检人员</label>
                <input 
                  type="text" 
                  value={listInspector}
                  onChange={e => setListInspector(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                  placeholder="请输入巡检人员" 
                />
              </div>
            </div>
            <div className="flex justify-end items-center gap-3 mt-4 pt-3 border-t border-gray-100">
              <button className="h-8 px-5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xs font-semibold shadow-sm border border-[#419EFF]">
                <Search size={14} className="mr-1.5" /> 查询
              </button>
              <button 
                onClick={handleResetListFilters}
                className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-xs font-semibold shadow-sm"
              >
                <RotateCcw size={14} className="mr-1.5" /> 重置
              </button>
            </div>
          </div>

          {/* 列表头部 */}
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">
              企业安全巡检记录 <span className="text-[#419EFF] font-semibold">{filteredMainList.length}</span> 家场所
            </div>
            <button className="h-8 px-4 bg-[#419EFF] hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors flex items-center gap-1.5 shadow-sm">
              <Download size={14} />
              <span>导出巡查清单</span>
            </button>
          </div>

          {/* 列表内容 */}
          <div className="flex-1 overflow-auto bg-white">
            <table className="w-full border-collapse text-left min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-[13px] border-b border-gray-200 font-medium h-10">
                  <th className="px-5 py-3 font-medium">场所名称</th>
                  <th className="px-5 py-3 font-medium">对外招牌名</th>
                  <th className="px-5 py-3 font-medium">场所类别</th>
                  <th className="px-5 py-3 font-medium">管辖单位</th>
                  <th className="px-5 py-3 font-medium">最近一次巡查时间</th>
                  <th className="px-5 py-3 font-medium">最近一次巡查结果</th>
                  <th className="px-5 py-3 text-center sticky right-0 bg-gray-50 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.04)] font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666] divide-y divide-gray-100">
                {filteredMainList.map((ent) => (
                  <tr key={ent.id} className="hover:bg-blue-50/10 transition-colors cursor-pointer group text-xs">
                    <td className="px-5 py-4 font-bold text-gray-800">{ent.name}</td>
                    <td className="px-5 py-4 font-medium text-gray-500">{ent.signboard}</td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-[10px] font-bold">
                        {ent.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">{ent.jurisdiction}</td>
                    <td className="px-5 py-4 font-mono text-gray-400">{ent.lastInspectionTime}</td>
                    <td className="px-5 py-4">
                      <span className={`flex items-center gap-1 font-bold ${ent.lastInspectionResult === '合格' ? 'text-green-600' : 'text-red-500'}`}>
                        <CheckCircle2 size={14} /> {ent.lastInspectionResult}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center sticky right-0 bg-white group-hover:bg-[#F9FAFC] transition-colors shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.04)]">
                      <button 
                        onClick={() => setShowDetailId(ent.id)}
                        className="text-[#419EFF] hover:text-blue-700 font-bold whitespace-nowrap text-xs underline underline-offset-4 decoration-blue-200"
                      >
                        详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredMainList.length === 0 && (
              <div className="p-20 text-center text-gray-300">
                <AlertCircle className="mx-auto mb-2 opacity-10" size={48} />
                <p className="text-xs font-bold italic">暂无巡查记录</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              显示 1 到 {filteredMainList.length} 条，共 {filteredMainList.length} 条记录
            </div>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-50 transition-colors" disabled>
                &lt;
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-[#419EFF] rounded bg-[#419EFF] text-white text-xs font-bold shadow-sm">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 text-xs font-medium transition-colors">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetail = (ent: SafetyEnterprise) => (
    <div className="flex-1 flex flex-col bg-[#F5F5F5] overflow-hidden animate-fadeIn text-left font-sans">
      {/* 详情页页头 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">{ent.name}</h2>
          <span className="px-2 py-0.5 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-xs">安全巡查档案</span>
        </div>
        <button 
          onClick={() => setShowDetailId(null)}
          className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
        >
          <ArrowLeft size={16} className="mr-1.5" /> 返回列表
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
        {/* 企业基本信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              巡查档案基本信息
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: '场所名称', value: ent.name },
                { label: '对外招牌名', value: ent.signboard },
                { label: '场所类别', value: ent.category },
                { label: '管辖单位', value: ent.jurisdiction },
                { label: '上报人', value: ent.reportedBy },
                { label: '上报时间', value: ent.reportedTime },
              ].map((field, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{field.label}</label>
                  <div className="h-9 px-3 flex items-center bg-[#FAFCFF] border border-gray-200 rounded text-xs text-gray-700 font-medium italic truncate">
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 巡查历史记录 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              巡查历史记录
            </h3>
          </div>

          {/* 查询栏位 (History) */}
          <div className="p-4 border-b border-gray-100 bg-[#FCFCFD]">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="w-48">
                <label className="block text-[10px] font-bold text-gray-400 mb-1">巡检日期</label>
                <input 
                  type="date" 
                  value={historyDate}
                  onChange={e => setHistoryDate(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white" 
                />
              </div>
              <div className="w-48">
                <label className="block text-[10px] font-bold text-gray-400 mb-1">巡检人员</label>
                <input 
                  type="text" 
                  value={historyInspector}
                  onChange={e => setHistoryInspector(e.target.value)}
                  placeholder="输入巡检人"
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white" 
                />
              </div>
              <button 
                onClick={() => {setHistoryDate(''); setHistoryInspector('');}}
                className="h-8 px-4 bg-gray-100 text-gray-500 rounded text-xs font-bold hover:bg-gray-200 transition-colors"
              >
                重置
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider border-b border-gray-200 h-10">
                  <th className="px-6 py-3">营业日期</th>
                  <th className="px-6 py-3">巡检完成时间</th>
                  <th className="px-6 py-3">巡检人员</th>
                  <th className="px-6 py-3">巡查结果</th>
                  <th className="px-6 py-3 text-center">操作</th>
                </tr>
              </thead>
              <tbody className="text-xs text-gray-600 divide-y divide-gray-100">
                {ent.history
                  .filter(h => (historyDate === '' || h.businessDate === historyDate) && (historyInspector === '' || h.inspector.includes(historyInspector)))
                  .map((h) => (
                  <tr key={h.id} className="hover:bg-blue-50/10 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold">{h.businessDate}</td>
                    <td className="px-6 py-4 font-mono text-gray-400">{h.completionTime}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{h.inspector}</td>
                    <td className="px-6 py-4 max-w-xs truncate italic">{h.resultSummary}</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedHistory(h)}
                        className="text-[#419EFF] font-bold hover:underline"
                      >
                        详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 巡查历史页码 */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-[11px] bg-slate-50/30">
            <div className="text-gray-400 font-bold uppercase tracking-wider">
              显示 1 到 {ent.history.filter(h => (historyDate === '' || h.businessDate === historyDate) && (historyInspector === '' || h.inspector.includes(historyInspector))).length} 条，共 {ent.history.filter(h => (historyDate === '' || h.businessDate === historyDate) && (historyInspector === '' || h.inspector.includes(historyInspector))).length} 条记录
            </div>
            <div className="flex gap-1.5 mt-2 lg:mt-0">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40 select-none transition-all cursor-pointer font-bold text-gray-650" disabled>
                上一页
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-[#419EFF] rounded bg-[#419EFF] text-white select-none transition-all cursor-pointer font-bold animate-in fade-in zoom-in duration-300">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40 select-none transition-all cursor-pointer font-bold text-gray-650" disabled>
                下一页
              </button>
            </div>
          </div>

          {/* History Pagination */}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              历史记录总数: {ent.history.length}
            </div>
            <div className="flex gap-1">
              <button className="px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-tighter border border-gray-200 rounded bg-white" disabled>上一页</button>
              <button className="px-3 py-1 text-[10px] font-black text-[#419EFF] border border-[#419EFF] rounded bg-blue-50">1</button>
              <button className="px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-tighter border border-gray-200 rounded bg-white">下一页</button>
            </div>
          </div>
        </section>
      </div>

      {/* 巡查历史记录详情弹窗 */}
      {selectedHistory && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 bg-blue-50 text-[#419EFF] rounded-full flex items-center justify-center border border-blue-100">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">安全检查存证详情</h3>
                  <p className="text-[11px] text-gray-500 font-medium">巡检单号：{selectedHistory.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedHistory(null)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6 text-left">
              {/* 弹窗摘要信息 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#FAFCFF] p-5 rounded-lg border border-blue-50">
                <div>
                  <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">营业时间</label>
                  <div className="text-sm font-bold text-gray-800">{selectedHistory.startTime} ~ {selectedHistory.endTime}</div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">巡检人员</label>
                  <div className="text-sm font-bold text-gray-800">{selectedHistory.inspector}</div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">整体评价</label>
                  <div className="text-sm font-black text-green-600 italic">合格</div>
                </div>
              </div>

              {/* 巡检结果总结 */}
              <div className="bg-slate-50 p-4 rounded-lg border border-gray-200 shadow-inner">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">当日巡检结果总结</label>
                <p className="text-xs text-gray-700 leading-relaxed font-medium italic">"{selectedHistory.resultSummary}"</p>
              </div>

              {/* 部位列表 */}
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">分项巡查记录</label>
                <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                        <th className="px-4 py-3">巡查部位</th>
                        <th className="px-4 py-3">巡查时间</th>
                        <th className="px-4 py-3">巡查结果</th>
                        <th className="px-4 py-3">处理情况说明</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs text-gray-600 divide-y divide-gray-50">
                      {selectedHistory.steps.map((step, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-4 font-bold text-gray-800">{step.part}</td>
                          <td className="px-4 py-4 font-mono text-gray-400">{step.time}</td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              step.result === '合格' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                            }`}>
                              {step.result}
                            </span>
                          </td>
                          <td className="px-4 py-4 italic text-gray-500">{step.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setSelectedHistory(null)}
                className="px-6 py-2 bg-slate-800 text-white rounded text-xs font-bold hover:bg-black transition-colors"
              >
                确定并关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col bg-[#F5F5F5] overflow-hidden antialiased">
      <div className="flex-1 overflow-hidden relative">
        {showDetailId 
          ? (currentEnterprise ? renderDetail(currentEnterprise) : null)
          : renderMainList()
        }
      </div>
    </div>
  );
}

// Sub-icons for modal
function ShieldCheck({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
