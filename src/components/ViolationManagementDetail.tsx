import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, FileText, ShieldCheck, Gavel } from 'lucide-react';
import { api } from '../api';
import { ViolationManagementRecord } from '../types';

interface ViolationManagementDetailProps {
  id: string;
  onClose: () => void;
}

export default function ViolationManagementDetail({ id, onClose }: ViolationManagementDetailProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ViolationManagementRecord | null>(null);

  useEffect(() => {
    setLoading(true);
    api.violationManagement.getById(id).then(record => {
      setData(record);
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div className="fixed inset-0 bg-[#f5f5f5] z-[100] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-blue-500">
        <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
        <div className="text-gray-500 font-bold text-sm tracking-widest mt-2 uppercase">Fetching Details...</div>
      </div>
    </div>
  );
  
  if (!data) return null;

  return (
    <div className="flex flex-col h-full bg-[#f5f5f5] relative overflow-hidden">
      <div className="flex-1 overflow-auto p-3 custom-scrollbar pb-24">
        <div className="w-full space-y-4">
          
          {/* 详情卡片 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex justify-between items-center">
              <h2 className="text-sm font-bold text-[#333333]">违法违规档案详情</h2>
              <button 
                onClick={onClose} 
                className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
              >
                <ArrowLeft size={16} className="mr-1.5" /> 返回列表
              </button>
            </div>
            
            <div className="p-6">
              {/* 基本属性 Section */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                  <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                  <h3 className="text-sm font-bold text-[#333333]">基本登记信息</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                  <ReadOnlyField label="企业编码" value={data.enterpriseId} />
                  <ReadOnlyField label="公司名称" value={data.companyName} />
                  <ReadOnlyField label="登记人员" value={data.registrar} />
                  <ReadOnlyField label="被查人员/单位" value={data.violator} />
                  <ReadOnlyField label="查处状态" value={data.isInvestigated} isStatus />
                  <ReadOnlyField label="发生时间" value={data.occurrenceTime} />
                  <ReadOnlyField 
                    label="违规情况描述" 
                    value={data.description} 
                    className="md:col-span-3" 
                    isDescription 
                  />
                </div>
              </div>

              {/* 警综关联信息 Section */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                  <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                  <h3 className="text-sm font-bold text-[#333333]">关联警综案件信息</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                  <ReadOnlyField label="案件编号" value={data.caseNo} />
                  <ReadOnlyField label="案件名称" value={data.caseName} />
                  <ReadOnlyField label="案件类型" value={data.caseType} />
                  <ReadOnlyField label="案发时间" value={data.caseTime} />
                  <ReadOnlyField label="案发地点" value={data.caseLocation} />
                  <ReadOnlyField label="办案人员" value={data.caseOfficers} />
                  <ReadOnlyField label="立案时间" value={data.filingTime} />
                  <ReadOnlyField label="主办单位" value={data.filingUnit} />
                  
                  <div className="md:col-span-3 grid grid-cols-4 gap-4 py-3 bg-gray-50/50 rounded-lg px-6 border border-gray-100">
                    <StatItem label="死亡人数" value={data.deaths} unit="人" color="text-red-500" />
                    <StatItem label="受伤人数" value={data.injuries} unit="人" color="text-orange-500" />
                    <StatItem label="涉案价值" value={data.propertyValue} unit="万元" color="text-blue-500" />
                    <StatItem label="案犯人数" value={data.perpetrators} unit="人" color="text-gray-700" />
                  </div>

                  <ReadOnlyField 
                    label="简要案情" 
                    value={data.briefCase} 
                    className="md:col-span-3" 
                    isDescription 
                  />
                </div>
              </div>

              {/* 处理结果 Section */}
              <div>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                  <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                  <h3 className="text-sm font-bold text-[#333333]">查处及处罚结果</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                  <div className="md:col-span-3">
                    <div className="p-5 bg-red-50/20 border border-red-100 rounded-lg">
                      <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-3 flex items-center">
                        <Gavel size={14} className="mr-2" /> 最终处理意见
                      </div>
                      <div className="text-sm text-gray-700 leading-relaxed min-h-[100px]">
                        {data.processingResult || "暂未查处或正在处理中..."}
                      </div>
                    </div>
                  </div>
                  <ReadOnlyField label="查处人员" value={data.auditOfficer} />
                  <ReadOnlyField label="查处时间" value={data.auditTime} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部按钮栏 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex justify-center items-center gap-4 shadow-[0_-4px_10px_0_rgba(0,0,0,0.05)] z-20">
        <button
          type="button"
          onClick={onClose}
          className="px-12 py-2.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-all font-medium active:scale-95"
        >
          关闭详情
        </button>
      </div>
    </div>
  );
}

// 辅助组件：详情字段
function ReadOnlyField({ label, value, required, className = "", isStatus = false, isDescription = false }: { 
  label: string, 
  value: any, 
  required?: boolean, 
  className?: string,
  isStatus?: boolean,
  isDescription?: boolean
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700 flex items-center">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </label>
      {isDescription ? (
        <div className="p-3 bg-gray-50 border border-gray-300 rounded text-sm text-gray-600 leading-relaxed min-h-[80px]">
          {value || '-'}
        </div>
      ) : (
        <div className="h-9 px-3 flex items-center bg-gray-50 border border-gray-300 rounded text-sm text-gray-600 truncate border-solid">
          {isStatus ? (
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              value === '是' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-orange-100 text-orange-700 border border-orange-200'
            }`}>
              {value || '否'}
            </span>
          ) : (
            value || '-'
          )}
        </div>
      )}
    </div>
  );
}

// 辅助组件：数值项
const StatItem = ({ label, value, unit, color }: { label: string; value: number | string; unit: string; color: string }) => (
  <div className="flex flex-col items-center justify-center py-2">
    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mb-1">{label}</span>
    <div className="flex items-baseline gap-0.5">
      <span className={`text-xl font-black ${color}`}>{value || 0}</span>
      <span className="text-[10px] text-gray-500 font-medium">{unit}</span>
    </div>
  </div>
);

