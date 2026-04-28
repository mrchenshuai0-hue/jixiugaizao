import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, AlertCircle, ShieldAlert, History, MapPin, Phone, User, X, Info, CheckCircle2, FileText, Settings, ShieldCheck, Edit } from 'lucide-react';
import { api } from '../api';

interface EnterpriseDetailProps {
  id: string;
  onBack: () => void;
  onNavigate?: (menu: string) => void;
}

export default function EnterpriseDetail({ id, onBack, onNavigate }: EnterpriseDetailProps) {
  const [enterprise, setEnterprise] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.enterprise.getById(id);
        setEnterprise(result);
      } catch (error) {
        console.error('Failed to fetch enterprise detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F5]">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (!enterprise) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F5]">
        <div className="text-gray-500">未找到企业信息</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] overflow-hidden font-sans">
      {/* 顶部标题与操作栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
           <h2 className="text-xl font-bold text-gray-800">{enterprise.name}</h2>
           <span className="px-2 py-0.5 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-xs">{enterprise.category}</span>
           <span className="px-2 py-0.5 bg-[#e8f8f7] text-[#1ebcaf] border border-[#bcece8] rounded text-xs">{enterprise.recordStatus}</span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-1.5" /> 返回列表
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
        {/* 只保留 基本信息、安全设施、安全制度、列管信息；表单样式同新增企业样式 */}
        
        {/* 1. 基本信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              基本信息
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
              <ReadOnlyField label="单位全称" value={enterprise.name} required />
              <ReadOnlyField label="公司招牌名" value={enterprise.brandName || "众诚汽修"} />
              <ReadOnlyField label="社会统一信用代码" value={enterprise.uscc} required />
              <ReadOnlyField label="企业类别" value={enterprise.category || "一类维修"} />
              <ReadOnlyField label="企业等级" value={enterprise.level || "A级"} />
              <ReadOnlyField label="法定代表人" value={enterprise.legalRep} required />
              <ReadOnlyField label="法人证件号码" value={enterprise.legalRepId || "350102198001011234"} />
              <ReadOnlyField label="法人代表电话" value={enterprise.legalRepPhone} required />
              <ReadOnlyField label="单位电话" value={enterprise.companyPhone || "0591-88888888"} />
              <ReadOnlyField label="负责人" value={enterprise.manager || "李四"} />
              <ReadOnlyField label="负责人证件号码" value={enterprise.managerId || "350102198505055678"} />
              <ReadOnlyField label="负责人电话" value={enterprise.managerPhone || "13900139000"} />
              <ReadOnlyField label="经营范围" value={enterprise.bizScope || "机动车修理, 配件销售"} className="md:col-span-2" />
              <ReadOnlyField label="法人现住地址" value={enterprise.legalRepAddress || "福州市鼓楼区某某街道某某小区"} className="md:col-span-2" />
              <ReadOnlyField label="负责人现住地址" value={enterprise.managerAddress || "福州市鼓楼区某某路某某大厦"} className="md:col-span-2" />
              <ReadOnlyField label="注册资金(万元)" value={enterprise.registeredCapital || "500"} />
              <ReadOnlyField label="占地面积(平方米)" value={enterprise.buildingArea || "1200"} />
              <ReadOnlyField label="邮政编码" value={enterprise.postalCode || "350000"} />
              <ReadOnlyField label="传真" value={enterprise.fax || "0591-88888889"} />
              <ReadOnlyField label="法人代码" value={enterprise.legalRepCode || "L12345678"} />
              <ReadOnlyField label="治安负责人" value={enterprise.securityManager || "王五"} />
              <ReadOnlyField label="风险加信用等级" value={enterprise.riskCreditLevel || "B级"} />
              <ReadOnlyField label="营业执照发证机构" value={enterprise.licenseAuthority || "某某工商局"} />
              <ReadOnlyField label="税务登记证编号" value={enterprise.taxRegNo || "91350100XXXXXXX"} />
              <ReadOnlyField label="税务登记证发证机构" value={enterprise.taxRegAuthority || "某某税务局"} />
              <ReadOnlyField label="企业积分" value={enterprise.enterprisePoints || 0} />
              <ReadOnlyField label="经济类型" value={`${enterprise.economicType || '内资'}`} />
              <ReadOnlyField label="坐标经度" value={enterprise.longitude || "119.273456"} />
              <ReadOnlyField label="坐标纬度" value={enterprise.latitude || "26.104567"} />
              <ReadOnlyField label="企业状态" value={enterprise.status} />
              <ReadOnlyField label="营业执照注册地址" value="福建省福州市马尾区罗星街道28号" className="md:col-span-2" />
              <ReadOnlyField label="标准地址名称" value={enterprise.address} className="md:col-span-2" required />
              <ReadOnlyField label="标准地址编码" value={enterprise.standardAddressCode || "3501020010010001"} />
            </div>

            {/* 备案信息附件 */}
            <div className="mt-10 pt-8 border-t border-gray-100">
               <h4 className="text-sm font-bold text-gray-800 mb-6 flex items-center">
                 <ShieldCheck size={16} className="text-[#419EFF] mr-2" />
                 备案信息附件
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: '修理业备案申请表', type: 'PDF', size: '2.4MB' },
                    { name: '负责人身份证明', type: 'JPG', size: '1.2MB' },
                    { name: '场所权属证明', type: 'PDF', size: '3.1MB' }
                  ].map((file, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="w-10 h-10 bg-white border border-gray-100 rounded flex items-center justify-center text-[#419EFF] mr-3 shadow-sm">
                        <FileText size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-700 truncate">{file.name}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{file.type} • {file.size}</p>
                      </div>
                      <button className="text-[10px] text-[#419EFF] font-medium hover:underline">预览</button>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* 2. 保卫负责人及特行管理 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              保卫负责人及特行管理
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
              <ReadOnlyField label="保卫负责人姓名" value={enterprise.protectionManager || "赵六"} />
              <ReadOnlyField label="保卫负责人电话" value={enterprise.protectionPhone || "13700137000"} />
              <ReadOnlyField label="特行备案编号" value={enterprise.specialRecordNo || "TH-2023-001"} />
              <ReadOnlyField label="特行备案机构" value={enterprise.specialRecordAgency || "鼓楼分局治安大队"} />
              <ReadOnlyField label="行业许可证编号" value={enterprise.industryLicenseNo || "XK-2023-888"} />
              <ReadOnlyField label="行业许可证发证机构" value={enterprise.industryLicenseAuthority || "某某交通局"} />
              <ReadOnlyField label="保卫部电话" value={enterprise.protectionDeptPhone || "0591-77777777"} />
              <ReadOnlyField label="治安管理机构" value={enterprise.securityAgency || "五凤派出所"} />
              <ReadOnlyField label="保卫人员数量" value={enterprise.protectionStaffCount || "5"} />
              <ReadOnlyField label="视频设备" value={enterprise.videoDevice || "是"} />
              <ReadOnlyField label="信息采集" value={enterprise.dataCollection || "是"} />
              <ReadOnlyField label="消防设备" value={enterprise.fireDevice || "是"} />
              <ReadOnlyField label="税务登记证发证机构" value={enterprise.taxAgency || "鼓楼区税务局"} />
              <ReadOnlyField label="开业日期" value={enterprise.openingDate || "2020-05-12"} />
              <ReadOnlyField label="登记日期" value={enterprise.registrationDate || "2023-10-15"} />
              <ReadOnlyField label="是否法定假日不营业" value={enterprise.holidayClosed || "是"} />
            </div>
          </div>
        </section>

        {/* 3. 安全设施信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              安全设施信息
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {(enterprise.safetyFacilities || [
                { hasMonitor: '是', channels: '16', points: '12', guardRoom: 'A座302' }
              ]).map((facility: any, idx: number) => (
                <div key={idx} className="p-5 bg-gray-50/50 border border-gray-100 rounded-lg">
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <ReadOnlyField label="是否监控设备" value={facility.hasMonitor} />
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">安装部位平面图</label>
                        <div className="h-9 px-3 flex items-center justify-between bg-white border border-gray-200 rounded text-xs text-[#1890ff] cursor-pointer shadow-sm">
                           <span>layout_map_0{idx + 1}.jpg</span>
                           <CheckCircle2 size={14} className="text-green-500" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">检测验收报告</label>
                        <div className="h-9 px-3 flex items-center justify-between bg-white border border-gray-200 rounded text-xs text-[#1890ff] cursor-pointer shadow-sm">
                           <span>report_2024_{idx + 1}.pdf</span>
                           <CheckCircle2 size={14} className="text-green-500" />
                        </div>
                      </div>
                      <ReadOnlyField label="视频监控路数" value={facility.channels} />
                      <ReadOnlyField label="点位" value={facility.points} />
                      <ReadOnlyField label="监控室" value={facility.guardRoom} />
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. 安全制度信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              安全制度信息
            </h3>
          </div>
          <div className="p-6">
             <div className="space-y-4">
               {(enterprise.safetyPolicies || [
                 { title: '机修理业治安管理制度', desc: '规范企业日常经营及治安上报流程，确保维修业务实名登记及异常情况及时上报，保障公共安全。', uploadTime: '2026-04-20', attachment: 'policy_v1.pdf' }
               ]).map((policy: any, idx: number) => (
                 <div key={idx} className="p-5 border border-gray-200 rounded-lg bg-white shadow-sm flex flex-col gap-4 group hover:border-[#419EFF] transition-colors">
                    <div className="flex justify-between items-start">
                       <div className="flex gap-3">
                          <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center text-[#419EFF]">
                             <FileText size={20} />
                          </div>
                          <div>
                             <h4 className="text-sm font-bold text-gray-800">{policy.title}</h4>
                             <p className="text-[10px] text-gray-400 mt-1">上传时间：{policy.uploadTime} • 附件：{policy.attachment || '暂无附件'}</p>
                          </div>
                       </div>
                       <button className="px-4 py-1.5 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-xs hover:bg-blue-100 transition-colors flex items-center gap-1.5 font-medium">
                          <Info size={12} /> 查看详情
                       </button>
                    </div>
                    <div className="text-xs text-gray-600 bg-gray-50 p-4 rounded-md leading-relaxed border border-gray-100">
                       {policy.desc}
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* 5. 列管与系统信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              列管信息
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
              <ReadOnlyField label="管辖单位" value="福州市公安局马尾分局" />
              <ReadOnlyField label="列管单位" value={enterprise.managedUnit || "福州市公安局"} />
              <ReadOnlyField label="责任民警" value={enterprise.adminPolice || "林警官"} />
              <ReadOnlyField label="民警电话" value={enterprise.adminPolicePhone || "13500135000"} />
              <ReadOnlyField label="企业安保负责人" value={enterprise.adminManager || "陈警官"} />
              <ReadOnlyField label="安保负责人电话" value={enterprise.adminManagerPhone || "13600136000"} />
              <ReadOnlyField label="列管单位负责人姓名" value="李成名" />
              <ReadOnlyField label="列管单位负责人手机" value="13905005678" />
            </div>
          </div>
        </section>

        {/* 6. 安装及运行信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              安装及运行信息
            </h3>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">客户端已开通功能模块</label>
              <div className="flex flex-wrap gap-3">
                {(enterprise.clientModules || ['维修', '配件', '美容']).map((mod: string) => (
                  <span key={mod} className="px-3 py-1 bg-blue-50 text-[#419EFF] border border-blue-100 rounded text-xs font-medium">
                    {mod}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
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
