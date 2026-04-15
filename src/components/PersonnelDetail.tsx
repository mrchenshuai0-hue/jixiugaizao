import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Edit, User, Phone, MapPin, Calendar, Briefcase, Award, ShieldAlert, Clock, AlertTriangle } from 'lucide-react';
import { api } from '../api';

interface PersonnelDetailProps {
  id: string;
  onBack: () => void;
  onEdit: (id: string) => void;
}

const TABS = [
  { id: 'basic', label: '基本信息', icon: User },
  { id: 'employment', label: '执业信息', icon: Briefcase },
  { id: 'rewards', label: '奖惩记录', icon: ShieldAlert },
  { id: 'logs', label: '变更日志', icon: Clock },
];

export default function PersonnelDetail({ id, onBack, onEdit }: PersonnelDetailProps) {
  const [activeTab, setActiveTab] = useState('basic');
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
          <p className="text-gray-500">详情加载中...</p>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F5]">
        <div className="text-center">
          <AlertTriangle size={48} className="text-[#fa5e45] mx-auto mb-4" />
          <p className="text-gray-500">未找到人员信息</p>
          <button onClick={onBack} className="mt-4 text-[#419EFF] hover:underline">返回列表</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      {/* 头部概览区 */}
      <div className="bg-white px-6 py-5 border-b border-gray-200 shrink-0 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] z-10">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="w-20 h-24 bg-gray-100 rounded border border-gray-200 flex items-center justify-center mr-6 overflow-hidden shrink-0">
              <User size={40} className="text-gray-300" />
            </div>
            <div>
              <div className="flex items-center mb-2">
                <h1 className="text-2xl font-bold text-[#333333] mr-4">{person.name}</h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  {person.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center text-sm text-[#666666] gap-x-6 gap-y-2">
                <span className="flex items-center"><FileText size={14} className="mr-1.5 text-[#999999]" /> 身份证号：<span className="font-mono text-[#333333] ml-1">{person.idCard}</span></span>
                <span className="flex items-center"><Briefcase size={14} className="mr-1.5 text-[#999999]" /> 所属企业：<span className="text-[#333333] ml-1">{person.enterprise}</span></span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => onEdit(id)}
              className="px-4 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium"
            >
              <Edit size={16} className="mr-1.5" /> 修改信息
            </button>
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
            >
              <ArrowLeft size={16} className="mr-1.5" /> 返回列表
            </button>
          </div>
        </div>
      </div>

      {/* 主体内容区 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧导航 */}
        <div className="w-48 bg-white border-r border-gray-200 shrink-0 overflow-y-auto">
          <div className="py-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-6 py-3.5 text-sm transition-colors border-l-4 ${
                  activeTab === tab.id 
                    ? 'border-[#419EFF] bg-[#F3F7FF] text-[#419EFF] font-medium' 
                    : 'border-transparent text-[#666666] hover:bg-gray-50 hover:text-[#333333]'
                }`}
              >
                <tab.icon size={18} className={`mr-3 ${activeTab === tab.id ? 'text-[#419EFF]' : 'text-[#999999]'}`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 右侧内容 */}
        <div className="flex-1 overflow-auto p-3 custom-scrollbar">
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-[#F8FAFC]">
                  <h2 className="text-base font-bold text-[#333333]">人员基本信息</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                    <DetailItem label="人员姓名" value={person.name} />
                    <DetailItem label="性别" value={person.gender} />
                    <DetailItem label="人员类型" value={person.personType} />
                    <DetailItem label="出生日期" value={person.birthday} icon={Calendar} />
                    <DetailItem label="身份证号" value={person.idCard} icon={FileText} />
                    <DetailItem label="民族" value={person.nation} />
                    <DetailItem label="联系电话" value={person.phone} icon={Phone} />
                    <DetailItem label="工种" value={person.workType} />
                    <DetailItem label="文化程度" value={person.education} />
                    <DetailItem label="户籍所在地" value={person.householdPlace} icon={MapPin} className="md:col-span-2" />
                    <DetailItem label="户籍详址" value={person.householdAddress} icon={MapPin} className="md:col-span-2" />
                    <DetailItem label="居住证号" value={person.residenceNo} />
                    <DetailItem label="暂住事由" value={person.tempReason} />
                    <DetailItem label="到达暂住地日期" value={person.arrivalDate} icon={Calendar} />
                    <DetailItem label="居住日期" value={person.residenceDate} icon={Calendar} />
                    <DetailItem label="拟暂住期限" value={person.plannedPeriod} icon={Calendar} />
                    <DetailItem label="现住地址" value={person.address} icon={MapPin} className="md:col-span-2" />
                    <DetailItem label="许可证编号" value={person.licenseNo} />
                    <DetailItem label="资格证类型名称" value={person.certTypeName} />
                    <DetailItem label="资格证编号" value={person.certNo} />
                    <DetailItem label="资格证有效期起始" value={person.certStart} icon={Calendar} />
                    <DetailItem label="资格证有效期截止" value={person.certEnd} icon={Calendar} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-[#F8FAFC]">
                  <h2 className="text-base font-bold text-[#333333]">人员相关信息</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                    <DetailItem label="紧急联系人姓名" value={person.emergencyContact} />
                    <DetailItem label="紧急联系人电话" value={person.emergencyPhone} icon={Phone} />
                    <DetailItem label="紧急联系人地址" value={person.emergencyAddress} icon={MapPin} className="md:col-span-2" />
                    <DetailItem label="人事编号" value={person.personnelNo} />
                    <DetailItem label="入职日期" value={person.entryDate} icon={Calendar} />
                    <DetailItem label="工资级别" value={person.salaryLevel} />
                    <DetailItem label="备注" value={person.remarks} className="md:col-span-3" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'employment' && (
            <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-[#F8FAFC]">
                <h2 className="text-base font-bold text-[#333333]">人员就业信息</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                  <DetailItem label="就业单位名称" value={person.employmentUnit} icon={Briefcase} className="md:col-span-2" />
                  <DetailItem label="就业起始日期" value={person.employmentStart} icon={Calendar} />
                  <DetailItem label="合同期限起始" value={person.contractStart} icon={Calendar} />
                  <DetailItem label="合同期限截止" value={person.contractEnd} icon={Calendar} />
                  <DetailItem label="岗位/职务" value={person.position} />
                  <DetailItem label="当前状态" value={person.status} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-[#F8FAFC]">
                <h2 className="text-base font-bold text-[#333333]">奖惩记录</h2>
              </div>
              <div className="p-0">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200">日期</th>
                      <th className="px-6 py-3 border-b border-gray-200">类型</th>
                      <th className="px-6 py-3 border-b border-gray-200">奖惩名称</th>
                      <th className="px-6 py-3 border-b border-gray-200">原因</th>
                      <th className="px-6 py-3 border-b border-gray-200">执行单位</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">2026-03-15</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">奖励</span>
                      </td>
                      <td className="px-6 py-4">优秀员工</td>
                      <td className="px-6 py-4">工作表现突出</td>
                      <td className="px-6 py-4">某区运输管理处</td>
                    </tr>
                    <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">2025-12-01</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">处罚</span>
                      </td>
                      <td className="px-6 py-4">违规操作警告</td>
                      <td className="px-6 py-4">未按规定佩戴安全装备</td>
                      <td className="px-6 py-4">某区运输管理处</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-[#333333]">变更日志</h2>
              </div>
              <div className="p-6">
                <div className="relative border-l-2 border-gray-200 ml-3 space-y-8">
                  <div className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-[#419EFF] rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                    <div className="text-sm text-[#999999] mb-1">2023-11-20 14:30:00</div>
                    <div className="text-base text-[#333333] font-medium">人员信息修改</div>
                    <div className="text-sm text-[#666666] mt-1">操作人：陈警官。修改了联系电话。</div>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                    <div className="text-sm text-[#999999] mb-1">2023-05-10 09:00:00</div>
                    <div className="text-base text-[#333333] font-medium">人员入职登记</div>
                    <div className="text-sm text-[#666666] mt-1">操作人：系统自动。</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, icon: Icon, className = "" }: { label: string, value: string | number, icon?: any, className?: string }) {
  return (
    <div className={`flex items-start ${className}`}>
      {Icon && <Icon className="text-[#999999] mr-3 mt-0.5 shrink-0" size={18} />}
      {!Icon && <div className="w-[30px] shrink-0"></div>}
      <div>
        <div className="text-xs text-[#999999] mb-1">{label}</div>
        <div className="text-sm text-[#333333] font-medium break-all">{value || '-'}</div>
      </div>
    </div>
  );
}
