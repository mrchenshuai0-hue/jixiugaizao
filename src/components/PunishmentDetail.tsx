import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer, Download, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';
import { api } from '../api';
import DoubleCheckSupervision from './DoubleCheckSupervision';

interface PunishmentDetailProps {
  id: string;
  onBack: () => void;
}

export default function PunishmentDetail({ id, onBack }: PunishmentDetailProps) {
  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const result = await api.case.getById(id);
        setCaseData({
          punishedUnit: '福州市鼓楼区安达汽车维修服务部',
          punishmentDate: result.date,
          legalRep: '张安达',
          address: '福州市鼓楼区某某路123号',
          caseName: result.title,
          caseNo: 'A20240410001',
          punishmentNo: '京公(鼓)罚决字〔2024〕001号',
          category: '违反经营机动车维修业治安管理规定',
          punishmentType: '警告',
          actionStatus: '已下达处罚决定书',
          amount: '0',
          handlingUnit: '福州市公安局鼓楼分局',
          handler: '李警官',
          approvalAuthority: '鼓楼分局治安大队',
          approvalNo: '鼓公治准〔2024〕001号',
          reason: result.description,
          description: result.description,
          result: '给予警告处分，并记入企业诚信档案。'
        });
      } catch (error) {
        console.error('Failed to fetch case detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#419EFF] mx-auto mb-4"></div>
          <p className="text-gray-500">详情加载中...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F5]">
        <div className="text-center">
          <AlertTriangle size={48} className="text-[#fa5e45] mx-auto mb-4" />
          <p className="text-gray-500">未找到处罚信息</p>
          <button onClick={onBack} className="mt-4 text-[#419EFF] hover:underline">返回列表</button>
        </div>
      </div>
    );
  }

  const data = caseData;

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] overflow-hidden font-sans">
      {/* 顶部标题与操作栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
           <h2 className="text-xl font-bold text-gray-800">企业处罚详情</h2>
           <span className="px-2 py-0.5 bg-yellow-50 text-yellow-600 border border-yellow-100 rounded text-xs">{data.punishmentType}</span>
           <span className="text-sm font-normal text-gray-400">#{id}</span>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
            <Printer size={16} className="mr-2" /> 打印
          </button>
          <button className="px-4 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
            <Download size={16} className="mr-2" /> 导出PDF
          </button>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-1.5" /> 返回列表
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
        {/* 1. 处罚决定书信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex justify-between items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              处罚决定书信息
            </h3>
            <span className="text-xs text-[#419EFF] font-medium bg-blue-50 px-2 py-1 rounded">{data.punishmentNo}</span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
              <ReadOnlyField label="被处罚单位" value={data.punishedUnit} className="md:col-span-2" />
              <ReadOnlyField label="处罚日期" value={data.punishmentDate} />
              <ReadOnlyField label="法定代表人" value={data.legalRep} />
              <ReadOnlyField label="单位地址" value={data.address} className="md:col-span-2" />
              <ReadOnlyField label="案件名称" value={data.caseName} />
              <ReadOnlyField label="案件编号" value={data.caseNo} />
              <ReadOnlyField label="处罚类别" value={data.punishmentType} />
              <ReadOnlyField label="处罚金额" value={`¥ ${data.amount}`} />
              <ReadOnlyField label="案件类别" value={data.category} className="md:col-span-3" />
              
              <div className="md:col-span-3">
                <label className="text-sm font-medium text-gray-700 block mb-2">处罚原因简要情况</label>
                <div className="text-sm text-[#666666] leading-relaxed bg-gray-50 p-4 rounded border border-gray-200">
                  {data.reason}
                </div>
              </div>
              
              <div className="md:col-span-3">
                <label className="text-sm font-medium text-gray-700 block mb-2">简要案情描述</label>
                <div className="text-sm text-[#666666] leading-relaxed bg-gray-50 p-4 rounded border border-gray-200">
                  {data.description}
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="text-sm font-medium text-gray-700 block mb-2">处罚结果简要情况</label>
                <div className="text-sm text-[#666666] leading-relaxed bg-gray-50 p-4 rounded border border-gray-200">
                  {data.result}
                </div>
              </div>

              <ReadOnlyField label="办案单位" value={data.handlingUnit} />
              <ReadOnlyField label="办案人" value={data.handler} />
              <ReadOnlyField label="批准机关" value={data.approvalAuthority} />
            </div>
          </div>
        </section>

        {/* 2. 附件材料 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              附件材料
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="w-10 h-10 bg-white border border-gray-100 rounded flex items-center justify-center text-red-500 mr-3 shadow-sm">
                  <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-700 truncate">处罚决定书.pdf</p>
                  <p className="text-[10px] text-gray-400 mt-1">PDF • 2.4MB</p>
                </div>
                <button className="text-[10px] text-[#419EFF] font-medium hover:underline">下载</button>
              </div>
            </div>
          </div>
        </section>

        {/* 一案双查督办 - ReadOnly */}
        <DoubleCheckSupervision defaultStarted={true} readOnly={true} />
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value, required, className = "" }: { label: string, value: string | number, required?: boolean, className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700 flex items-center">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </label>
      <div className="h-9 px-3 flex items-center bg-gray-50 border border-gray-300 rounded text-sm text-gray-600 truncate border-solid">
        {value || '-'}
      </div>
    </div>
  );
}
