import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer, Download, AlertTriangle, ShieldCheck } from 'lucide-react';
import { api } from '../api';
import DoubleCheckSupervision from './DoubleCheckSupervision';

interface ViolationDetailProps {
  id: string;
  onBack: () => void;
}

export default function ViolationDetail({ id, onBack }: ViolationDetailProps) {
  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const result = await api.case.getById(id);
        setCaseData({
          companyName: '福州市鼓楼区安达汽车维修服务部',
          violator: result.involvedParties[0].name,
          idCard: '350102199001011234',
          registrar: '王警官',
          occurrenceTime: result.date,
          caseNo: 'A20240410001',
          nature: '治安案件',
          category: result.type,
          isInvestigated: '是',
          description: result.description
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
          <p className="text-gray-500">未找到案件信息</p>
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
           <h2 className="text-xl font-bold text-gray-800">违法违规详情</h2>
           <span className="px-2 py-0.5 bg-red-50 text-[#fa5e45] border border-red-100 rounded text-xs">{data.nature}</span>
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
        {/* 1. 基本信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              违法违规基本信息
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
              <ReadOnlyField label="案件名称/立案编号" value={data.caseNo} />
              <ReadOnlyField label="企业名称" value={data.companyName} className="md:col-span-2" />
              <ReadOnlyField label="违法违规人员(单位)" value={data.violator} />
              <ReadOnlyField label="证件号码" value={data.idCard} />
              <ReadOnlyField label="登记人员" value={data.registrar} />
              <ReadOnlyField label="发生时间" value={data.occurrenceTime} />
              <ReadOnlyField label="案件性质" value={data.nature} />
              <ReadOnlyField label="案件类别" value={data.category} />
              <ReadOnlyField label="是否查处" value={data.isInvestigated} />
              
              <div className="md:col-span-3">
                <label className="text-sm font-medium text-gray-700 block mb-2">情况描述</label>
                <div className="text-sm text-[#666666] leading-relaxed bg-gray-50 p-4 rounded border border-gray-200 min-h-[100px]">
                  {data.description}
                </div>
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
