import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react';
import { PractitionerPunishmentRecord } from '../types';
import { practitionerPunishmentService } from '../services/practitionerPunishmentService';

interface PractitionerPunishmentDetailProps {
  id: string;
  onClose: () => void;
}

export default function PractitionerPunishmentDetail({ id, onClose }: PractitionerPunishmentDetailProps) {
  const [data, setData] = useState<PractitionerPunishmentRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      const res = await practitionerPunishmentService.getById(id);
      setData(res);
      setLoading(false);
    };
    fetchRecord();
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
              <h2 className="text-sm font-bold text-[#333333]">从业人员人员处罚档案详情</h2>
              <button 
                onClick={onClose} 
                className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
              >
                <ArrowLeft size={16} className="mr-1.5" /> 返回列表
              </button>
            </div>
            
            <div className="p-6">
              {/* 被处罚人基本信息 Section */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                  <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                  <h3 className="text-sm font-bold text-[#333333]">被处罚人基本信息</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                  <ReadOnlyField label="被处罚人姓名" value={data.punishedName} />
                  <ReadOnlyField label="性别" value={data.gender} />
                  <ReadOnlyField label="出生日期" value={data.birthDate} />
                  <ReadOnlyField label="证件号码" value={data.idCard} />
                  <ReadOnlyField label="民族" value={data.ethnic} />
                  <ReadOnlyField label="文化程度" value={data.education} />
                  <ReadOnlyField label="工作单位" value={data.workUnit} className="md:col-span-2" />
                  <ReadOnlyField label="户籍地" value={data.householdAddress} className="md:col-span-3" />
                  <ReadOnlyField label="现住地" value={data.currentAddress} className="md:col-span-3" />
                </div>
              </div>

              {/* 案件及处罚信息 Section */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                  <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                  <h3 className="text-sm font-bold text-[#333333]">关联案件及处罚信息</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                  <ReadOnlyField label="案件编号" value={data.caseNo} />
                  <ReadOnlyField label="处罚文号" value={data.punishmentNo} />
                  <ReadOnlyField label="案件名称" value={data.caseName} />
                  <ReadOnlyField label="案件类别" value={data.caseCategory} />
                  <ReadOnlyField label="案件开始日期" value={data.caseStartDate} />
                  <ReadOnlyField label="处罚日期" value={data.punishmentDate} />
                  <ReadOnlyField label="处罚种类" value={data.punishmentType} />
                  <ReadOnlyField label="罚款金额" value={data.punishmentAmount ? `¥${data.punishmentAmount}` : '-'} />
                  <ReadOnlyField label="办案人员" value={data.handlingOfficer} />
                  <ReadOnlyField label="办案单位" value={data.handlingUnit} className="md:col-span-3" />
                  
                  <ReadOnlyField 
                    label="简要案情描述" 
                    value={data.caseBrief} 
                    className="md:col-span-3" 
                    isDescription 
                  />

                  <ReadOnlyField 
                    label="案件处理结果" 
                    value={data.caseResult} 
                    className="md:col-span-3" 
                    isDescription 
                  />
                </div>
              </div>

              {/* 附件/图片 Section */}
              <div>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                  <div className="w-1 h-4 bg-[#419EFF] rounded-full"></div>
                  <h3 className="text-sm font-bold text-gray-800">相关附件</h3>
                </div>

                <div className="flex gap-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">处罚文书扫描件</label>
                    <div className="w-48 h-64 border border-gray-200 rounded bg-gray-50 flex items-center justify-center group overflow-hidden">
                       <div className="text-center text-gray-300 group-hover:scale-110 transition-transform duration-300">
                          <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                          <span className="text-sm font-bold opacity-30">预览图</span>
                       </div>
                    </div>
                  </div>
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
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-black uppercase tracking-widest border border-blue-200">
              {value || "-"}
            </span>
          ) : (
            value || '-'
          )}
        </div>
      )}
    </div>
  );
}
