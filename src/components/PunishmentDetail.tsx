import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer, Download, FileText, AlertTriangle } from 'lucide-react';
import { api } from '../api';

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
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between shrink-0 bg-gray-50/50">
        <div className="flex items-center">
          <h2 className="text-lg font-bold text-[#333333]">企业处罚详情 <span className="text-sm font-normal text-gray-400 ml-2">#{id}</span></h2>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
            <Printer size={16} className="mr-2" /> 打印
          </button>
          <button className="px-4 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
            <Download size={16} className="mr-2" /> 导出
          </button>
          <button onClick={onBack} className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
            <ArrowLeft size={16} className="mr-1.5" /> 返回列表
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 custom-scrollbar bg-[#F8FAFC]">
        <div className="w-full space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="bg-[#F8FAFC] px-6 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-sm font-bold text-[#333333]">处罚决定书信息</h3>
              <span className="text-xs text-[#419EFF] font-medium bg-blue-50 px-2 py-1 rounded">{data.punishmentNo}</span>
            </div>
            <div className="p-6 grid grid-cols-3 gap-y-6 gap-x-8">
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">被处罚单位</span>
                <span className="text-sm text-[#333333] font-medium">{data.punishedUnit}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">处罚日期</span>
                <span className="text-sm text-[#333333] font-medium">{data.punishmentDate}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">法定代表人</span>
                <span className="text-sm text-[#333333] font-medium">{data.legalRep}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-[#999999] block mb-1">单位地址</span>
                <span className="text-sm text-[#333333] font-medium">{data.address}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">案件名称</span>
                <span className="text-sm text-[#333333] font-medium">{data.caseName}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">案件编号</span>
                <span className="text-sm text-[#333333] font-medium">{data.caseNo}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">处罚类别</span>
                <span className="px-2 py-0.5 rounded text-xs bg-yellow-100 text-yellow-600">{data.punishmentType}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">处罚金额</span>
                <span className="text-sm text-red-500 font-bold">¥ {data.amount}</span>
              </div>
              <div className="col-span-3">
                <span className="text-sm text-[#999999] block mb-1">案件类别</span>
                <span className="text-sm text-[#333333] font-medium">{data.category}</span>
              </div>
              <div className="col-span-3 h-px bg-gray-100"></div>
              <div className="col-span-3">
                <span className="text-sm text-[#999999] block mb-1">处罚原因简要情况</span>
                <p className="text-sm text-[#666666] leading-relaxed">{data.reason}</p>
              </div>
              <div className="col-span-3">
                <span className="text-sm text-[#999999] block mb-1">简要案情描述</span>
                <p className="text-sm text-[#666666] leading-relaxed">{data.description}</p>
              </div>
              <div className="col-span-3">
                <span className="text-sm text-[#999999] block mb-1">处罚结果简要情况</span>
                <p className="text-sm text-[#666666] leading-relaxed">{data.result}</p>
              </div>
              <div className="col-span-3 h-px bg-gray-100"></div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">办案单位</span>
                <span className="text-sm text-[#333333] font-medium">{data.handlingUnit}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">办案人</span>
                <span className="text-sm text-[#333333] font-medium">{data.handler}</span>
              </div>
              <div>
                <span className="text-sm text-[#999999] block mb-1">批准机关</span>
                <span className="text-sm text-[#333333] font-medium">{data.approvalAuthority}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="bg-[#F8FAFC] px-6 py-3 border-b border-gray-200">
              <h3 className="text-sm font-bold text-[#333333]">附件材料</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors w-64">
                <FileText className="text-red-500 mr-3" size={32} />
                <div>
                  <div className="text-sm font-medium text-[#333333]">处罚决定书.pdf</div>
                  <div className="text-xs text-[#999999]">2.4 MB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
