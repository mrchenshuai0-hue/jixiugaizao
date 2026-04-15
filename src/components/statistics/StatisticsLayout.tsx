import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';

interface StatisticsLayoutProps {
  filters: React.ReactNode;
  chart: React.ReactNode;
  table: React.ReactNode;
}

export default function StatisticsLayout({ filters, chart, table }: StatisticsLayoutProps) {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 查询筛选区 */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex-1">{filters}</div>
        <div className="ml-4 flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => setViewMode('chart')}
            className={`p-2 transition-colors ${viewMode === 'chart' ? 'bg-[#F3F7FF] text-[#419EFF]' : 'text-gray-600 hover:text-[#419EFF]'}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 transition-colors ${viewMode === 'table' ? 'bg-[#F3F7FF] text-[#419EFF]' : 'text-gray-600 hover:text-[#419EFF]'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* 数据展示区 */}
      <div className="flex-1 p-4 overflow-auto">
        {viewMode === 'chart' ? chart : table}
      </div>
    </div>
  );
}
