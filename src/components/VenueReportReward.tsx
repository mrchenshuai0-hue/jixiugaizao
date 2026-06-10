import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  Download, 
  Trash2,
  AlertCircle,
  ArrowLeft,
  X
} from 'lucide-react';

interface RewardRecord {
  id: string;
  venueName: string;
  jurisdiction: string;
  rewardItem: string;
  rewardScore: number;
  rewardDate: string;
  approver: string;
  approvingAgency: string;
  description: string;
  remarks: string;
}

const MOCK_REWARDS: RewardRecord[] = [
  {
    id: 'RWD2024001',
    venueName: '盛世华庭KTV',
    jurisdiction: '某某派出所',
    rewardItem: '平安建设先进集体',
    rewardScore: 10,
    rewardDate: '2024-06-01',
    approver: '张局长',
    approvingAgency: '市公安局',
    description: '该场所在平安建设工作中表现突出，制度健全，治安良好。',
    remarks: '年度奖励'
  },
  {
    id: 'RWD2024002',
    venueName: '极速网咖',
    jurisdiction: '城中派出所',
    rewardItem: '违规线索提供奖励',
    rewardScore: 5,
    rewardDate: '2024-06-03',
    approver: '刘警官',
    approvingAgency: '县公安局',
    description: '协助公安机关发现并查处周边违规经营行为。',
    remarks: '一次性奖励'
  },
  {
    id: 'RWD2024003',
    venueName: '大富豪沐足',
    jurisdiction: '河东派出所',
    rewardItem: '文明经营示范店',
    rewardScore: 8,
    rewardDate: '2024-06-05',
    approver: '王主任',
    approvingAgency: '区商务局',
    description: '严格执行行业标准，服务规范，无投诉记录。',
    remarks: '季度评定'
  }
];

export default function VenueReportReward() {
  const [showDetail, setShowDetail] = useState<string | null>(null);

  // Filters
  const [filterJurisdiction, setFilterJurisdiction] = useState('');
  const [filterVenueName, setFilterVenueName] = useState('');
  const [filterRewardItem, setFilterRewardItem] = useState('');
  const [filterRewardDate, setFilterRewardDate] = useState('');

  const handleResetFilters = () => {
    setFilterJurisdiction('');
    setFilterVenueName('');
    setFilterRewardItem('');
    setFilterRewardDate('');
  };

  const filteredRewards = MOCK_REWARDS.filter(reward => {
    return (
      reward.venueName.includes(filterVenueName) &&
      reward.jurisdiction.includes(filterJurisdiction) &&
      reward.rewardItem.includes(filterRewardItem) &&
      (filterRewardDate === '' || reward.rewardDate === filterRewardDate)
    );
  });

  const selectedReward = MOCK_REWARDS.find(r => r.id === showDetail);

  const renderList = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F5F5F5]">
      <div className="flex-1 p-3 overflow-auto">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col min-h-full">
          
          {/* Search Filters */}
          <div className="p-5 border-b border-gray-100 bg-[#FCFCFD] text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">管辖单位</label>
                <input 
                  type="text" 
                  value={filterJurisdiction}
                  onChange={e => setFilterJurisdiction(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                  placeholder="请输入管辖单位" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">场所名称</label>
                <input 
                  type="text" 
                  value={filterVenueName}
                  onChange={e => setFilterVenueName(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                  placeholder="请输入场所名称" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">奖励项目</label>
                <input 
                  type="text" 
                  value={filterRewardItem}
                  onChange={e => setFilterRewardItem(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                  placeholder="请输入奖励项目" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5">奖励日期</label>
                <input 
                  type="date" 
                  value={filterRewardDate}
                  onChange={e => setFilterRewardDate(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-gray-700 bg-white" 
                />
              </div>
            </div>

            <div className="flex justify-end items-center gap-3 mt-4 pt-3 border-t border-gray-100">
              <button 
                className="h-8 px-5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xs font-semibold shadow-sm border border-[#419EFF]"
              >
                <Search size={14} className="mr-1.5" /> 查询
              </button>
              <button 
                onClick={handleResetFilters}
                className="h-8 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-xs font-semibold shadow-sm"
              >
                <RotateCcw size={14} className="mr-1.5" /> 重置
              </button>
            </div>
          </div>

          {/* Table Header/Actions */}
          <div className="px-5 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
            <div className="text-sm text-[#666666]">
              共找到 <span className="text-[#419EFF] font-semibold">{filteredRewards.length}</span> 条奖励记录
            </div>
            <div className="flex space-x-2">
              <button className="h-8 px-4 bg-[#419EFF] hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors flex items-center gap-1.5 shadow-sm">
                <Download size={14} />
                <span>导出报表</span>
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="flex-1 overflow-auto bg-white">
            <table className="w-full border-collapse text-left min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 text-[#333333] text-[13px] border-b border-gray-200 font-medium h-10">
                  <th className="px-5 py-3 font-medium text-center">序号</th>
                  <th className="px-5 py-3 font-medium">公司名称</th>
                  <th className="px-5 py-3 font-medium">奖励项目</th>
                  <th className="px-5 py-3 font-medium">奖励分数(分)</th>
                  <th className="px-5 py-3 font-medium">奖励日期</th>
                  <th className="px-5 py-3 font-medium">批准人</th>
                  <th className="px-5 py-3 font-medium">批准机构</th>
                  <th className="px-5 py-3 font-medium">详细信息</th>
                  <th className="px-5 py-3 text-center sticky right-0 bg-gray-50 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.04)] font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#666666] divide-y divide-gray-100">
                {filteredRewards.map((reward, idx) => (
                  <tr key={reward.id} className="hover:bg-blue-50/10 transition-colors cursor-pointer group text-xs">
                    <td className="px-5 py-3 text-center text-gray-400 font-mono">{idx + 1}</td>
                    <td className="px-5 py-3 font-bold text-gray-800">{reward.venueName}</td>
                    <td className="px-5 py-3 text-gray-500 font-bold">{reward.rewardItem}</td>
                    <td className="px-5 py-3 text-[#419EFF] font-bold">{reward.rewardScore}</td>
                    <td className="px-5 py-3">{reward.rewardDate}</td>
                    <td className="px-5 py-3 font-black text-gray-700">{reward.approver}</td>
                    <td className="px-5 py-3 text-slate-400">{reward.approvingAgency}</td>
                    <td className="px-5 py-3 truncate max-w-[200px]">{reward.description}</td>
                    <td className="px-5 py-3 text-center sticky right-0 bg-white group-hover:bg-[#F9FAFC] transition-colors shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.04)]">
                      <div className="flex items-center justify-center gap-4">
                        <button 
                          onClick={() => setShowDetail(reward.id)}
                          className="text-[#419EFF] hover:text-blue-700 font-medium whitespace-nowrap text-xs underline underline-offset-4 decoration-blue-200"
                        >
                          详情
                        </button>
                        <button className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div className="text-xs text-gray-500 font-medium">
              显示 1 到 {filteredRewards.length} 条，共 {filteredRewards.length} 条记录
            </div>
            <div className="flex gap-1">
              <button className="px-2.5 py-1.5 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40 transition-colors text-[10px] font-bold" disabled>
                上一页
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-[#419EFF] rounded bg-[#419EFF] text-white text-xs font-bold shadow-sm">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 text-xs font-medium transition-colors">
                2
              </button>
              <button className="px-2.5 py-1.5 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 transition-colors text-[10px] font-bold">
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetail = (reward: RewardRecord) => (
    <div className="flex-1 flex flex-col bg-[#F5F5F5] overflow-hidden animate-fadeIn text-left font-sans">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">{reward.venueName}</h2>
          <span className="px-2 py-0.5 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-xs">奖励详情</span>
        </div>
        <div className="flex gap-3">
          <button 
            type="button"
            onClick={() => setShowDetail(null)}
            className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-1.5" /> 返回列表
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              举报奖励详细信息
            </h3>
          </div>
          <div className="p-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                { label: '公司名称', value: reward.venueName, required: true },
                { label: '奖励日期', value: reward.rewardDate, required: true },
                { label: '奖励批准人', value: reward.approver },
                { label: '奖励批准机构', value: reward.approvingAgency },
                { label: '举报奖励项目', value: reward.rewardItem, required: true, span: true },
                { label: '奖励描述', value: reward.description, span: true },
                { label: '奖励备注', value: reward.remarks, span: true },
              ].map((field, i) => (
                <div key={i} className={`flex flex-col gap-2 ${field.span ? 'md:col-span-2' : ''}`}>
                  <label className="text-xs font-semibold text-gray-700 block">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <div className={`min-h-9 px-3 flex items-center bg-[#FAFCFF] border border-gray-200 rounded text-xs text-gray-700 font-medium ${!field.span ? 'truncate' : 'py-2 leading-relaxed'}`}>
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col bg-[#F5F5F5] overflow-hidden antialiased text-left">
      <div className="flex-1 overflow-hidden relative">
        {showDetail && selectedReward 
          ? renderDetail(selectedReward)
          : renderList()
        }
      </div>
    </div>
  );
}
