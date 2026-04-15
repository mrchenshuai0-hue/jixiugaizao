import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer, Download, AlertTriangle } from 'lucide-react';
import { api } from '../api';

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
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between shrink-0 bg-gray-50/50">
        <div className="flex items-center">
          <h2 className="text-lg font-bold text-[#333333]">违法违规详情 <span className="text-sm font-normal text-gray-400 ml-2">#{id}</span></h2>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
            <Printer size={16} className="mr-2" /> 打印
          </button>
          <button className="px-4 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
            <Download size={16} className="mr-2" /> 导出PDF
          </button>
          <button onClick={onBack} className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
            <ArrowLeft size={16} className="mr-1.5" /> 返回列表
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 custom-scrollbar">
        <div className="w-full space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="bg-[#F8FAFC] px-6 py-3 border-b border-gray-200">
              <h3 className="text-sm font-bold text-[#333333]">基本信息</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-y-4 gap-x-12">
              <div>
                <span className="text-sm text-[#999999] block mb-1">企业名称</span>
                <span className="text-sm text-[#333333] font-medium">{data.companyName}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">违法违规人员(单位)</span>
                <span className="text-sm text-[#333333] font-medium">{data.violator}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">证件号码</span>
                <span className="text-sm text-[#333333] font-medium">{data.idCard}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">登记人员</span>
                <span className="text-sm text-[#333333] font-medium">{data.registrar}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">发生时间</span>
                <span className="text-sm text-[#333333] font-medium">{data.occurrenceTime}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">立案编号</span>
                <span className="text-sm text-[#333333] font-medium">{data.caseNo}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">案件性质</span>
                <span className="px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-600">{data.nature}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">案件类别</span>
                <span className="text-sm text-[#333333] font-medium">{data.category}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">情况描述</span>
                <div className="text-sm text-[#666666] leading-relaxed bg-gray-50 p-4 rounded border border-gray-100 italic">
                  {data.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
