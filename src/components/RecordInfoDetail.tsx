import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, CloudDownload, X, Info, ArrowLeft } from 'lucide-react';

interface RecordInfoDetailProps {
  id: string | null;
  onBack: () => void;
}

export default function RecordInfoDetail({ id, onBack }: RecordInfoDetailProps) {
  return (
    <div className="flex flex-col h-full bg-[#f5f5f5] overflow-hidden font-sans">
      {/* 顶部标题栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-800">备案详情</h2>
            <span className="px-2 py-0.5 bg-[#e8f8f7] text-[#1ebcaf] border border-[#bcece8] rounded text-xs">已办结</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-1.5" /> 返回列表
          </button>
          <button onClick={onBack} className="text-gray-400 hover:text-gray-600 transition-colors ml-2">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4 shadow-inner">
        {/* 业务办件信息卡片 (增加办结时间、备注，修改办理结果来源) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h2 className="text-sm font-bold text-[#333333] border-l-4 border-[#419EFF] pl-3">业务办件信息</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
               <DetailRow label="办件编号" value="BA2026540212000X" />
               <DetailRow label="申报时间" value="2026-03-15 14:22:10" />
               <DetailRow label="办结时间" value="2026-03-16 10:05:33" />
               <DetailRow label="申办项目名称" value="机动车修理业备案登记" />
               <DetailRow label="办件类型" value="即办件" />
               <DetailRow label="申报来源" value="福建省网上办事大厅" />
               <DetailRow label="备注" value="材料核验通过，准予备案。" className="lg:col-span-3" />
            </div>
          </div>
        </div>

        {/* 申报信息卡片 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc]">
            <h2 className="text-sm font-bold text-[#333333] border-l-4 border-[#419EFF] pl-3">申报信息</h2>
          </div>
          <div className="p-6 space-y-8">
            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-4 bg-[#419EFF] mr-2 rounded-sm"></div>
                单位基本信息
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
                <DetailRow label="申报单位" value="福建众诚汽车修配服务中心" />
                <DetailRow label="证件类型" value="统一社会信用代码" />
                <DetailRow label="证件号码" value="91350102MA34N8P76A" />
                <DetailRow label="法人代表" value="李万山" />
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-4 bg-[#419EFF] mr-2 rounded-sm"></div>
                联系人信息
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
                <DetailRow label="姓名" value="陈晓东" />
                <DetailRow label="电话" value="0591-88888888" />
                <DetailRow label="手机" value="139****8899" />
                <DetailRow label="通讯地址" value="福建省福州市鼓楼区广达路108号" />
                <DetailRow label="身份证" value="350102198001011234" />
                <DetailRow label="邮政编码" value="350001" />
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-4 bg-[#419EFF] mr-2 rounded-sm"></div>
                申报情形
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-700 leading-relaxed">
                本申报单位提交材料承诺：所提供的所有证明文件及资料均真实、合法、有效。申报单位将严格遵守相关法律法规，按照机动车修理业备案要求进行日常经营活动，自觉接受行业监督管理。
              </div>
            </section>
          </div>
        </div>

        {/* 申报材料卡片 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc]">
            <h2 className="text-sm font-bold text-[#333333] border-l-4 border-[#419EFF] pl-3">申报材料</h2>
          </div>
          <div className="p-6">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-[#fafafa] font-medium text-gray-600 border-b border-gray-200">
                  <th className="px-4 py-3 text-left w-12 text-xs">#</th>
                  <th className="px-4 py-3 text-left text-xs">材料名称</th>
                  <th className="px-4 py-3 text-center w-24 text-xs">份数</th>
                  <th className="px-4 py-3 text-center w-24 text-xs">必要性</th>
                  <th className="px-4 py-3 text-center w-32 text-xs">收取方式</th>
                  <th className="px-4 py-3 text-center w-32 text-xs">收取状态</th>
                  <th className="px-4 py-3 text-center w-40 text-xs text-center border-l border-gray-200">文件</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: '修理业备案申请表', count: 1, required: true, method: '原件', status: '已提交' },
                  { name: '场所权属证明', count: 1, required: true, method: '复印件', status: '已提交' },
                  { name: '维修设备清单', count: 1, required: false, method: '原件', status: '已提交' },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                    <td className="px-4 py-3 text-gray-800">{item.name}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{item.count}</td>
                    <td className="px-4 py-3 text-center">
                      {item.required ? <span className="text-red-500 text-xs">★ 必要</span> : <span className="text-gray-400 text-xs">非必要</span>}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">{item.method}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-green-600 text-xs font-medium">{item.status}</span>
                    </td>
                    <td className="px-4 py-3 text-center border-l border-gray-100">
                      <button className="text-[#419EFF] hover:underline text-xs flex items-center justify-center w-full">
                        <CloudDownload size={14} className="mr-1" /> 查看详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 共享材料卡片 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc]">
            <h2 className="text-sm font-bold text-[#333333] border-l-4 border-[#419EFF] pl-3">共享材料</h2>
          </div>
          <div className="p-6">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-[#fafafa] font-medium text-gray-600 border-b border-gray-200">
                  <th className="px-4 py-3 text-left w-12 text-xs">#</th>
                  <th className="px-4 py-3 text-left text-xs">材料名称</th>
                  <th className="px-4 py-3 text-left text-xs">材料来源</th>
                  <th className="px-4 py-3 text-center w-40 text-xs text-center border-l border-gray-200">文件</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: '负责人身份证明', source: '身份证人证识别平台' },
                  { name: '工商营业执照', source: '市场监督管理总局' },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                    <td className="px-4 py-3 text-gray-800">{item.name}</td>
                    <td className="px-4 py-3 text-gray-600">{item.source}</td>
                    <td className="px-4 py-3 text-center border-l border-gray-100">
                      <button className="text-[#419EFF] hover:underline text-xs flex items-center justify-center w-full">
                        <CloudDownload size={14} className="mr-1" /> 查看详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

function DetailRow({ label, value, className = "" }: { label: string, value: string | number, className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium text-gray-500 flex items-center">
        {label}
      </label>
      <div className="h-9 px-3 flex items-center bg-gray-50 border border-gray-300 rounded text-sm text-gray-700 truncate border-solid">
        {value || '-'}
      </div>
    </div>
  );
}
