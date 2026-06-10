import React, { useState } from 'react';
import { Download, Calendar } from 'lucide-react';

const mockData = [
  { region: '清河分局', total: 120, dailyAvg: 4.5, range1_3: 45, range4_6: 30, range7_10: 25, over10: 20 },
  { region: '测试删除判断', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '测试删除用户', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '测试公安单位代码', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '测试12位', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '测试缓存', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '福州仓山分局', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '福州鼓楼分局', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '合计', total: 120, dailyAvg: 4.5, range1_3: 45, range4_6: 30, range7_10: 25, over10: 20 },
  { region: '东城分局', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '西城分局', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '崇文分局', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '宣武分局', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '朝阳分局', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '丰台分局', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '石景山分局', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '海淀分局', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
  { region: '门头沟分局', total: 0, dailyAvg: 0, range1_3: 0, range4_6: 0, range7_10: 0, over10: 0 },
];

export default function EnterpriseAverageUploadStatistics() {
  const [timeType, setTimeType] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState('2026-06');

  const filters = (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 mb-3 flex items-start justify-between">
      <div className="flex-1 grid grid-cols-3 gap-6 mr-6">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 w-24 shrink-0 whitespace-nowrap">管辖单位</span>
          <select className="flex-1 border border-gray-300 rounded px-3 py-1.5 h-9 text-sm focus:border-[#419EFF] outline-none bg-white">
            <option>北京市-北京市公安局</option>
          </select>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 w-28 shrink-0 whitespace-nowrap">统计时间类别</span>
          <div className="flex-1 flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="timeType" 
                checked={timeType === 'monthly'} 
                onChange={() => setTimeType('monthly')}
                className="w-4 h-4 text-[#419EFF]"
              />
              <span className="text-sm text-gray-600 group-hover:text-[#419EFF]">按月份</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="timeType" 
                checked={timeType === 'custom'} 
                onChange={() => setTimeType('custom')}
                className="w-4 h-4 text-[#419EFF]"
              />
              <span className="text-sm text-gray-600 group-hover:text-[#419EFF]">自定义</span>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          {timeType === 'monthly' ? (
            <div className="relative flex-1">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1.5 h-9 text-sm focus:border-[#419EFF] outline-none appearance-none pr-8 bg-white"
              >
                <option value="2026-06">2026-06</option>
                <option value="2026-05">2026-05</option>
              </select>
              <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          ) : (
            <div className="flex flex-1 items-center border border-gray-300 rounded bg-white overflow-hidden h-9">
              <div className="flex items-center px-2 bg-gray-50 border-r border-gray-300">
                <Calendar size={14} className="text-gray-400" />
              </div>
              <input type="date" className="px-2 py-1 flex-1 text-sm outline-none" />
              <span className="px-1 text-gray-400">-</span>
              <input type="date" className="px-2 py-1 flex-1 text-sm outline-none" />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <div className="flex gap-2">
          <button className="bg-[#1890ff] text-white px-5 py-2 rounded flex items-center text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm">
            查询
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded flex items-center text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            重置
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-[#f0f2f5] p-3 overflow-auto custom-scrollbar">
      {filters}
      
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <div className="w-1 h-4 bg-[#1890ff] rounded-full"></div>
            企业平均上传数量统计列表
          </h2>
          <button className="bg-[#e6f7ff] border border-[#91d5ff] text-[#1890ff] px-5 py-1.5 rounded text-sm hover:bg-[#bae7ff] flex items-center gap-2 font-medium transition-colors shadow-sm">
            <Download size={14} /> 批量导出
          </button>
        </div>

        <div className="border border-gray-200 rounded overflow-hidden">
          <table className="w-full text-sm text-center border-collapse bg-white min-w-[1000px]">
            <thead>
              <tr className="bg-[#f8f9fc] text-gray-700 font-bold border-b border-gray-200">
                <th className="px-2 py-4 border-r border-gray-200 w-12 text-center">序号</th>
                <th className="px-4 py-4 border-r border-gray-200 text-left pl-6">行政区划</th>
                <th className="px-4 py-4 border-r border-gray-200">企业总数</th>
                <th className="px-4 py-4 border-r border-gray-200">日平均上传车辆</th>
                <th className="px-4 py-4 border-r border-gray-200">平均1~3辆企业数</th>
                <th className="px-4 py-4 border-r border-gray-200">平均4~6辆企业数</th>
                <th className="px-4 py-4 border-r border-gray-200">平均7~10辆企业数</th>
                <th className="px-4 py-4">平均10辆以上企业数</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((d, i) => (
                <tr 
                  key={i} 
                  className={`border-b border-gray-100 last:border-b-0 hover:bg-blue-50/50 transition-colors ${
                    i % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'
                  } ${d.region === '合计' ? 'font-bold bg-[#f0f7ff]' : ''}`}
                >
                  <td className="px-2 py-4 border-r border-gray-100 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-4 border-r border-gray-100 text-left pl-6">{d.region}</td>
                  <td className="px-4 py-4 border-r border-gray-100">{d.total}</td>
                  <td className="px-4 py-4 border-r border-gray-100 text-[#1890ff] font-medium">{d.dailyAvg}</td>
                  <td className="px-4 py-4 border-r border-gray-100">{d.range1_3}</td>
                  <td className="px-4 py-4 border-r border-gray-100">{d.range4_6}</td>
                  <td className="px-4 py-4 border-r border-gray-100">{d.range7_10}</td>
                  <td className="px-4 py-4">{d.over10}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
