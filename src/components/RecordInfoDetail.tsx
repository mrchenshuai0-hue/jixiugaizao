import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, CloudDownload, X, Info, ArrowLeft, Eye } from 'lucide-react';
import { mockRecordEnterprises } from './recordData';
import FloatingFormNavigation from './FloatingFormNavigation';

interface RecordInfoDetailProps {
  id: string | null;
  onBack: () => void;
}

export default function RecordInfoDetail({ id, onBack }: RecordInfoDetailProps) {
  const item = mockRecordEnterprises.find(e => e.id === id) || mockRecordEnterprises[0];
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'detail-info', label: '业务办件信息' },
    { id: 'detail-declaration', label: '企业申报信息' },
    { id: 'detail-materials', label: '申报材料清单' }
  ];

  return (
    <div className="flex flex-col h-full bg-[#f5f5f5] overflow-hidden font-sans">
      {/* 顶部标题栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-800">备案详情</h2>
            <span className={`px-2 py-0.5 rounded text-xs border ${
              item.status === '已备案' ? 'bg-[#e8f8f7] text-[#1ebcaf] border-[#bcece8]' :
              item.status === '备案过期' ? 'bg-[#ffece9] text-[#fa5e45] border-[#ffd1ca]' :
              'bg-[#fff8e6] text-[#ffc23e] border-[#ffe8b3]'
            }`}>
              {item.status}
            </span>
            {!item.attachmentsComplete && (
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-xs">
                附件未上传完整
              </span>
            )}
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

      <div ref={scrollContainerRef} className="flex-1 overflow-auto p-4 space-y-4 shadow-inner relative">
        {/* 业务办件信息卡片 */}
        <div id="detail-info" className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h2 className="text-sm font-bold text-[#333333] border-l-4 border-[#419EFF] pl-3">业务办件信息</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
               <DetailRow label="办件编号" value={`BA2026540212000${item.id}`} />
               <DetailRow label="申报时间" value="2026-03-15 14:22:10" />
               <DetailRow label="办结时间" value={item.status === '已备案' ? item.updateDate + " 10:05:33" : "-"} />
               <DetailRow label="申办项目名称" value="机动车修理业备案登记" />
               <DetailRow label="办件类型" value="即办件" />
               <DetailRow label="申报来源" value="福建省网上办事大厅" />
               <DetailRow label="备注" value={item.attachmentsComplete ? "材料核验通过，准予备案。" : "材料附件不齐全，正在补充提交中。"} className="lg:col-span-3" />
            </div>
          </div>
        </div>

        {/* 申报信息卡片 */}
        <div id="detail-declaration" className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc]">
            <h2 className="text-sm font-bold text-[#333333] border-l-4 border-[#419EFF] pl-3">申报信息</h2>
          </div>
          <div className="p-6 space-y-8">
            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-4 bg-[#419EFF] mr-2 rounded-sm"></div>
                单位基本信息
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                <DetailRow label="申报单位" value={item.name} />
                <DetailRow label="证件类型" value="统一社会信用代码" />
                <DetailRow label="证件号码" value={item.uscc} />
                <DetailRow label="法人代表" value={item.legalRep} />
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-4 bg-[#419EFF] mr-2 rounded-sm"></div>
                联系人信息
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                <DetailRow label="姓名" value={item.contactName || "陈晓东"} />
                <DetailRow label="电话" value={item.contactPhone || "0591-88888888"} />
                <DetailRow label="手机" value={item.contactMobile || "13955551234"} />
                <DetailRow label="通讯地址" value={item.address} />
                <DetailRow label="身份证" value={item.legalRepId || "350102198001011234"} />
                <DetailRow label="邮政编码" value={item.postalCode || "350001"} />
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

        {/* 申报材料与共享材料复合展示 */}
        <div id="detail-materials" className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#333333] border-l-4 border-[#419EFF] pl-3">申报材料清单 (备案要求)</h2>
            <span className="text-xs text-[#666666]">材料归集管理与免提交联动</span>
          </div>
          <div className="p-6 space-y-8">
            
            {/* 自筹材料 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">自筹材料</span>
                <span className="text-xs text-gray-500">企业需主动准备并上传的材料</span>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#fafafa] font-medium text-gray-600 border-b border-gray-200">
                      <th className="px-4 py-3 text-left w-12 text-xs">#</th>
                      <th className="px-4 py-3 text-left text-xs">材料名称</th>
                      <th className="px-4 py-3 text-center w-24 text-xs">份数</th>
                      <th className="px-4 py-3 text-center w-24 text-xs">必要性</th>
                      <th className="px-4 py-3 text-center w-32 text-xs">收取方式</th>
                      <th className="px-4 py-3 text-center w-32 text-xs">收取状态</th>
                      <th className="px-4 py-3 text-center w-40 text-xs border-l border-gray-200">文件</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { name: '从业人员花名册 (应注明场所管理人员、治安保卫人员配备情况)', count: 1, required: true, method: '电子材料', status: '已提交' },
                      { name: '经营场所平面图', count: 1, required: true, method: '电子材料', status: item.attachmentsComplete ? '已提交' : '未提交' },
                      { name: '安装、配备与治安管理信息系统要求相适应的采集、上传设施设备的说明材料', count: 1, required: true, method: '电子材料', status: '已提交' },
                    ].map((material, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                        <td className="px-4 py-3 text-gray-800 font-medium leading-relaxed max-w-md break-words">{material.name}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{material.count}</td>
                        <td className="px-4 py-3 text-center">
                          {material.required ? <span className="text-red-500 text-xs">★ 必要</span> : <span className="text-gray-400 text-xs">非必要</span>}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">{material.method}</td>
                        <td className="px-4 py-3 text-center">
                          {material.status === '已提交' ? (
                            <span className="text-green-600 text-xs font-medium bg-green-50/50 px-2 py-0.5 rounded border border-green-100">已提交</span>
                          ) : (
                            <span className="text-red-600 text-xs font-semibold bg-red-50 px-2 py-0.5 rounded border border-red-100 animate-pulse">待提交 (缺失)</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center border-l border-gray-100">
                          {material.status === '已提交' ? (
                            <button className="text-[#419EFF] hover:underline text-xs flex items-center justify-center w-full">
                              <CloudDownload size={14} className="mr-1" /> 查看详情
                            </button>
                          ) : (
                            <span className="text-gray-400 text-[11px]">未上传</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 共享材料 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">共享材料</span>
                <span className="text-xs text-gray-500">通过一体化政务服务跨地域/跨层级免提交电子证照、共享数据</span>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#fafafa] font-medium text-gray-600 border-b border-gray-200">
                      <th className="px-4 py-3 text-left w-12 text-xs">#</th>
                      <th className="px-4 py-3 text-left text-xs">材料名称</th>
                      <th className="px-4 py-3 text-left text-xs">材料来源</th>
                      <th className="px-4 py-3 text-center w-40 text-xs border-l border-gray-200">文件</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { name: '法定代表人、主要负责人或经营者的有效身份证件', source: '政府核发' },
                      { name: '营业执照', source: '政府核发' },
                    ].map((material, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                        <td className="px-4 py-3 text-gray-800 font-medium leading-relaxed max-w-md break-words">{material.name}</td>
                        <td className="px-4 py-3 text-gray-600">{material.source}</td>
                        <td className="px-4 py-3 text-center border-l border-gray-100">
                          <button className="text-[#419EFF] hover:underline text-xs flex items-center justify-center w-full">
                            <Eye size={14} className="mr-1" /> 查看详情
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

      </div>

      <FloatingFormNavigation scrollContainerRef={scrollContainerRef} items={navItems} />
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
