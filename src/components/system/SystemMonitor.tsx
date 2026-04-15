import React from 'react';
import { Activity, Server, Database, HardDrive, Cpu } from 'lucide-react';

export default function SystemMonitor() {
  return (
    <div className="p-4 h-full flex flex-col bg-[#F5F5F5] space-y-4 overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-[#419EFF] rounded-full flex items-center justify-center">
            <Activity size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500">系统运行状态</div>
            <div className="text-xl font-bold text-green-500">正常运行</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center">
            <Cpu size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500">CPU 使用率</div>
            <div className="text-xl font-bold text-gray-800">32%</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center">
            <Server size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500">内存使用率</div>
            <div className="text-xl font-bold text-gray-800">45%</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center">
            <HardDrive size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500">磁盘使用率</div>
            <div className="text-xl font-bold text-gray-800">68%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-100 font-medium text-gray-800 flex items-center">
            <Database size={18} className="mr-2 text-[#419EFF]" /> 数据库状态
          </div>
          <div className="p-4 flex-1">
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-sm text-gray-600">连接状态</span>
                <span className="text-sm font-medium text-green-500">已连接</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-sm text-gray-600">当前连接数</span>
                <span className="text-sm font-medium text-gray-800">128</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-sm text-gray-600">慢查询数 (24h)</span>
                <span className="text-sm font-medium text-yellow-500">3</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm text-gray-600">数据总量</span>
                <span className="text-sm font-medium text-gray-800">45.2 GB</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-100 font-medium text-gray-800 flex items-center">
            <Activity size={18} className="mr-2 text-[#419EFF]" /> 系统日志 (最新)
          </div>
          <div className="p-4 flex-1 overflow-auto">
            <div className="space-y-3">
              <div className="text-xs font-mono text-gray-600 bg-gray-50 p-2 rounded">
                <span className="text-gray-400">[2026-04-15 09:20:11]</span> <span className="text-blue-500">INFO</span> User 'admin' logged in successfully.
              </div>
              <div className="text-xs font-mono text-gray-600 bg-gray-50 p-2 rounded">
                <span className="text-gray-400">[2026-04-15 09:15:02]</span> <span className="text-blue-500">INFO</span> Scheduled backup completed.
              </div>
              <div className="text-xs font-mono text-gray-600 bg-gray-50 p-2 rounded">
                <span className="text-gray-400">[2026-04-15 08:45:33]</span> <span className="text-yellow-500">WARN</span> High memory usage detected (85%).
              </div>
              <div className="text-xs font-mono text-gray-600 bg-gray-50 p-2 rounded">
                <span className="text-gray-400">[2026-04-15 08:30:00]</span> <span className="text-blue-500">INFO</span> System started.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
