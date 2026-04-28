import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Edit, User, Phone, MapPin, Calendar, Briefcase, Award, ShieldAlert, Clock, AlertTriangle } from 'lucide-react';
import { api } from '../api';

interface PersonnelDetailProps {
  id: string;
  onBack: () => void;
}

export default function PersonnelDetail({ id, onBack }: PersonnelDetailProps) {
  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const result = await api.personnel.getById(id);
        setPerson(result);
      } catch (error) {
        console.error('Failed to fetch personnel detail:', error);
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
          <p className="text-gray-500 text-sm">详情加载中...</p>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F5]">
        <div className="text-center">
          <AlertTriangle size={48} className="text-[#fa5e45] mx-auto mb-4" />
          <p className="text-gray-500 text-sm">未找到人员信息</p>
          <button onClick={onBack} className="mt-4 text-[#419EFF] hover:underline text-sm transition-colors">返回列表</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative font-sans">
      {/* 顶部标题与操作栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
           <h2 className="text-xl font-bold text-gray-800">{person.name}</h2>
           <span className="px-2 py-0.5 bg-green-50 text-green-600 border border-green-100 rounded text-xs">{person.status}</span>
           <span className="px-2 py-0.5 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-xs">{person.personType || '国内人员'}</span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onBack}
            className="h-9 px-4 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-1.5" /> 返回列表
          </button>
        </div>
      </div>

      {/* 主体内容区 */}
      <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
        {/* 1. 人员基本信息 (包含照片) */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              人员基本信息
            </h3>
          </div>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* 照片展示 */}
              <div className="shrink-0 flex flex-col items-center">
                 <div className="w-32 h-40 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shadow-inner">
                   {person.photo ? (
                     <img src={person.photo} alt={person.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                   ) : (
                     <User size={60} className="text-gray-200" />
                   )}
                 </div>
                 <p className="mt-3 text-xs text-gray-400">人员电子照片</p>
              </div>

              {/* 基本信息字段 */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
                <DetailItem label="所属企业" value={person.enterprise} className="md:col-span-2 lg:col-span-3" required />
                <DetailItem label="人员姓名" value={person.name} required />
                <DetailItem label="性别" value={person.gender} />
                <DetailItem label="人员类型" value={person.personType || "国内人员"} />
                <DetailItem label="出生日期" value={person.birthday} required />
                <DetailItem label="证件号码" value={person.idCard} required />
                <DetailItem label="民族" value={person.nation || "汉族"} />
                <DetailItem label="联系电话" value={person.phone} required />
                <DetailItem label="工种" value={person.workType || "机修工"} />
                <DetailItem label="文化程度" value={person.education || "大专"} />
                <DetailItem label="居住证号" value={person.residenceNo || "-"} />
                <DetailItem label="暂住事由" value={person.tempReason || "-"} />
                <DetailItem label="到达暂住地日期" value={person.arrivalDate || "-"} />
                <DetailItem label="居住日期" value={person.residenceDate || "-"} />
                <DetailItem label="拟暂住期限" value={person.plannedPeriod || "-"} />
                <DetailItem label="户籍所在地" value={person.householdPlace} className="md:col-span-2" />
                <DetailItem label="户籍详址" value={person.householdAddress} className="md:col-span-2" />
                <DetailItem label="现住地址" value={person.address} className="md:col-span-2 lg:col-span-3" />
                <DetailItem label="许可证编号" value={person.licenseNo || "-"} />
                <DetailItem label="资格证类型名称" value={person.certTypeName || "-"} />
                <DetailItem label="资格证编号" value={person.certNo || "-"} />
                <DetailItem label="资格证有效期起始" value={person.certStart || "-"} />
                <DetailItem label="资格证有效期截止" value={person.certEnd || "-"} />
              </div>
            </div>
          </div>
        </section>

        {/* 2. 人员相关信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              人员相关信息
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
              <DetailItem label="紧急联系人姓名" value={person.emergencyContact} />
              <DetailItem label="紧急联系人电话" value={person.emergencyPhone} />
              <DetailItem label="紧急联系人地址" value={person.emergencyAddress} className="md:col-span-2 lg:col-span-3" />
              <DetailItem label="人事编号" value={person.personnelNo} />
              <DetailItem label="入职日期" value={person.entryDate} required />
              <DetailItem label="工资级别" value={person.salaryLevel} />
              <DetailItem label="备注" value={person.remarks} className="md:col-span-2 lg:col-span-3" />
            </div>
          </div>
        </section>

        {/* 3. 人员就业信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              人员就业信息
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
              <DetailItem label="就业单位名称" value={person.employmentUnit} className="md:col-span-2" />
              <DetailItem label="就业起始日期" value={person.employmentStart} />
              <DetailItem label="合同期限起始" value={person.contractStart} />
              <DetailItem label="合同期限截止" value={person.contractEnd} />
              <DetailItem label="岗位/职务" value={person.position} />
              <DetailItem label="当前状态" value={person.status} />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

function DetailItem({ label, value, required, className = "" }: { label: string, value: string | number, required?: boolean, className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700 flex items-center">
        <span className={`${required ? 'text-red-500 mr-1' : 'w-2'}`}>{required ? '*' : ''}</span>
        {label}
      </label>
      <div className="h-9 px-3 flex items-center bg-gray-50 border border-gray-300 rounded text-sm text-gray-600 truncate border-solid">
        {value || '-'}
      </div>
    </div>
  );
}
