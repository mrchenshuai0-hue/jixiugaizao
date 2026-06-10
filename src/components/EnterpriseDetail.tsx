import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, AlertCircle, ShieldAlert, History, MapPin, Phone, User, X, Info, CheckCircle2, FileText, Settings, ShieldCheck, Edit, XCircle, CloudDownload } from 'lucide-react';
import { api } from '../api';

interface EnterpriseDetailProps {
  id: string;
  onBack: () => void;
  onNavigate?: (menu: string) => void;
}

export default function EnterpriseDetail({ id, onBack, onNavigate }: EnterpriseDetailProps) {
  const [enterprise, setEnterprise] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'detail' | 'contract'>('detail');

  const handleViewMaterial = (materialName: string, fileName: string | null) => {
    if (!fileName) {
      setToast(`暂无文件可查看：${materialName}`);
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setToast(`正在预览材料: ${fileName}`);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };
  
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

  if (viewMode === 'contract') {
    return (
      <div className="flex flex-col h-full bg-[#F5F5F5] overflow-hidden font-sans">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">保安服务合同 附件预览</h2>
          </div>
          <button 
            type="button"
            onClick={() => setViewMode('detail')}
            className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-1.5" /> 关闭预览
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6 flex justify-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full max-w-4xl flex flex-col h-fit">
               <div className="p-6 space-y-6 font-sans">
                  {/* 重要属性摘要 */}
                  <div className="grid grid-cols-2 gap-6 bg-blue-50/40 p-6 rounded-lg border border-blue-100 text-sm">
                    <div>
                      <span className="text-gray-500 block mb-1 font-medium">合同名称</span>
                      <span className="text-gray-800 font-semibold">{enterprise.securityContractName || "保安服务聘用合同_众诚.pdf"}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1 font-medium">合同编号</span>
                      <span className="text-gray-800 font-semibold font-mono">SEC-2026-FJZC-002</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1 font-medium">甲方（雇主单位）</span>
                      <span className="text-gray-800 font-semibold">{enterprise.name || "福建众诚汽车修配服务中心"}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1 font-medium">乙方（保安派遣单位）</span>
                      <span className="text-gray-800 font-semibold">{enterprise.securityAgency || "福建省中安保安服务有限公司"}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1 font-medium">有效期限</span>
                      <span className="text-gray-800 font-semibold">2026-01-01 至 2028-12-31</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1 font-medium">文件属性</span>
                      <span className="text-gray-800 font-semibold">2.4 MB / PDF / 三防系统联网数字存证</span>
                    </div>
                  </div>

                  {/* 纸张效果预览 */}
                  <div className="border border-gray-200 rounded-lg bg-gray-50 p-10 space-y-6 shadow-inner overflow-y-auto font-serif leading-loose text-base relative select-none">
                    {/* 浮水印 */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none rotate-12 text-center text-4xl font-sans font-bold text-blue-800">
                      <div>马尾区治安管理备案专用<br />保安合同备案存档件</div>
                    </div>
                    
                    <h4 className="text-center text-lg font-bold text-gray-900 mb-6 font-sans tracking-tight">保安服务及安全防卫派遣协议书</h4>
                    <p className="indent-8 text-gray-800">
                      为进一步落实重点列管单位治安防控自律要求，强化“人防、物防、技防”常态治理，雇主单位（以下简称甲方）与专业保安公司（以下简称乙方）本着自愿安全防范之宗旨，特订立本服务合同。
                    </p>
                    <p className="indent-8 text-gray-800">
                      一、一户一档防范落实：乙方派遣专业治安防卫和保安值守骨干。甲方配备安全保卫总人数共计 <span className="underline font-bold text-blue-600">{enterprise.protectionStaffCount || enterprise.securityStaffCount || "5"}</span> 名，持证保安人员 <span className="underline font-bold text-blue-600">{enterprise.certifiedGuardsCount || "3"}</span> 名，严格负责周界及机修车间的消防安全防盗巡视。
                    </p>
                    <p className="indent-8 text-gray-800">
                      二、核心成员代表：本合同备案申报材料通过全省网格化治安安全系统联网上报。合同各方对登记的治安负责人：<span className="font-semibold underline">{enterprise.securitySupervisor || "周伟"}</span>（联系电话: {enterprise.securitySupervisorPhone || "13905001122"}）信息真实性负连带法律责任。
                    </p>
                    <p className="indent-8 text-gray-800">
                      三、本合同有效期三年，自2026年01月01日起至2028年12月31日止。
                    </p>

                    <div className="pt-10 flex justify-between items-start text-sm text-gray-600 font-sans">
                      <div>
                        <p>甲方代表 (签章)：李万山</p>
                        <p className="mt-2">日期：2026-01-10</p>
                      </div>
                      <div className="relative">
                        {/* 印章 */}
                        <div className="absolute -top-6 -right-8 w-24 h-24 rounded-full border border-red-500/60 flex items-center justify-center text-center font-bold text-xs text-red-500/60 rotate-12 bg-red-50/10 pointer-events-none">
                          <div className="p-1 border border-dashed border-red-500/40 rounded-full w-20 h-20 flex items-center justify-center whitespace-pre leading-tight">
                            福建省中安<br />合同备案印
                          </div>
                        </div>
                        <p className="relative z-10">乙方代表 (签章)：林金水</p>
                        <p className="relative z-10 mt-2">日期：2026-01-10</p>
                      </div>
                    </div>
                  </div>
               </div>
               <div className="px-6 py-4 border-t border-gray-100 bg-[#f8fafc] flex justify-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setToast("开始保存/导出合同备存文件到本地...");
                      setTimeout(() => setToast(null), 3000);
                    }}
                    className="px-6 py-2 bg-[#419EFF] hover:bg-blue-600 text-white rounded text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-sm font-sans"
                  >
                    <CloudDownload size={16} /> 导出/下载PDF
                  </button>
               </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] overflow-hidden font-sans">
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
        {toast && (
          <div className="p-3.5 bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded-lg flex items-center gap-2 shadow-sm animate-pulse-once">
            <Info size={14} className="text-[#419EFF] shrink-0" />
            <span className="font-semibold">{toast}</span>
          </div>
        )}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
              <ReadOnlyField label="公司名称" value={enterprise.name} required />
              <ReadOnlyField label="社会统一信用代码" value={enterprise.uscc} required />
              <ReadOnlyField label="招牌名称" value={enterprise.brandName || "众诚汽修"} />
              
              <ReadOnlyField label="法定代表人" value={enterprise.legalRep} required />
              <ReadOnlyField label="法定代表人身份证号" value={enterprise.legalRepId || enterprise.legalRepID || "350102198001011234"} />
              <ReadOnlyField label="法定代表人联系方式" value={enterprise.legalRepPhone} required />
              
              <ReadOnlyField label="治安负责人" value={enterprise.securityPrincipal || enterprise.securityManager || "赵六"} />
              <ReadOnlyField label="治安负责人身份证号" value={enterprise.securityPrincipalID || enterprise.securityPrincipalId || enterprise.securityManagerId || "350102198501011211"} />
              <ReadOnlyField label="治安负责人联系方式" value={enterprise.securityPrincipalPhone || enterprise.securityManagerPhone || "13700137000"} />
              
              <ReadOnlyField label="注册地址" value={enterprise.registeredAddress || "福建省福州市马尾区罗星街道28号"} required />
              <ReadOnlyField label="企业等级" value={enterprise.level || "二类"} required />
              <ReadOnlyField label="企业类别" value={enterprise.category || "汽车修理"} />
              
              <ReadOnlyField label="经营地址" value={enterprise.standardAddress || enterprise.address} required />
              <ReadOnlyField label="单位电话" value={enterprise.bizPhone || enterprise.companyPhone || "0591-88888888"} />
              <ReadOnlyField label="经济类型" value={enterprise.economicTypeSpecific ? `${enterprise.economicType || '内资'} (${enterprise.economicTypeSpecific})` : (enterprise.economicType || "内资")} />
              
              <ReadOnlyField label="开业时间" value={enterprise.openingDate || "2026-04-15"} />
              <ReadOnlyField label="占地面积(平方米)" value={enterprise.area || enterprise.buildingArea || "1200"} />
              <ReadOnlyField label="注册资金(万元)" value={enterprise.registeredCapital || "500"} />
              
              <ReadOnlyField label="企业状态" value={enterprise.status || enterprise.enterpriseStatus || "正常营业"} />
              <ReadOnlyField label="经营范围" value={enterprise.bizScope || "机动车修理, 配件销售"} className="md:col-span-2" />
              
              <ReadOnlyField label="登记时间" value={enterprise.registrationDate || enterprise.registerDate || enterprise.recordDate ? (((enterprise.registrationDate || enterprise.registerDate || enterprise.recordDate || '').includes(' ') ? (enterprise.registrationDate || enterprise.registerDate || enterprise.recordDate || '') : `${enterprise.registrationDate || enterprise.registerDate || enterprise.recordDate} 10:15:30`)) : "2023-10-15 10:15:30"} />
              <ReadOnlyField label="变更时间" value={enterprise.updateDate || "2024-05-12 16:45:10"} />
              <ReadOnlyField label="登记人" value={enterprise.registrar || enterprise.adminPolice || "高警官"} />
              <ReadOnlyField label="修改人" value={enterprise.updater || "系统管理员"} />
            </div>

            {/* 备案附件已外置卡片存储 */}
          </div>
        </section>

        {/* 人防、物防、技防建设 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              人防、物防、技防建设
            </h3>
          </div>
          <div className="p-6 space-y-8">
            {/* 人防建设 */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-1">
                人防建设（安全保卫及从业人员人员配置）
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-sans">
                <ReadOnlyField label="从业人员总数" value={enterprise.employeeCount || "24"} />
                <ReadOnlyField label="安全保卫人数" value={enterprise.protectionStaffCount || enterprise.securityStaffCount || "5"} />
                <ReadOnlyField label="持证保安员人数" value={enterprise.certifiedGuardsCount || "3"} />
                <ReadOnlyField label="保安保卫部门电话" value={enterprise.protectionDeptPhone || enterprise.securityDeptPhone || "0591-77777777"} />
                <ReadOnlyField label="保安服务公司 / 派驻单位" value={enterprise.securityAgency || "福建省中安保安服务有限公司"} className="md:col-span-2" />
                <ReadOnlyField label="治安保卫负责人" value={enterprise.securitySupervisor || "周伟"} />
                <ReadOnlyField label="保卫负责人电话" value={enterprise.securitySupervisorPhone || "13905001122"} />
                <ReadOnlyField label="从业人员代表/工会联系人" value={enterprise.employeeRepresentative || "王铁锤"} />
                <ReadOnlyField label="从业人员代表电话" value={enterprise.employeeRepPhone || "13600136001"} />
                <div className="md:col-span-2 flex flex-col gap-2">
                  <span className="text-xs font-bold text-gray-500">保安服务合同 附件</span>
                  <div className="h-9 px-3 flex items-center justify-between bg-[#f8fafc] border border-gray-200 rounded text-xs text-gray-750 font-medium font-sans">
                    <span className="truncate flex items-center gap-1.5 text-gray-650 font-semibold">
                      <FileText size={13} className="text-[#419EFF]" />
                      {enterprise.securityContractName || "保安服务聘用合同_众诚.pdf"}
                    </span>
                    <button
                      onClick={() => setViewMode('contract')}
                      className="px-2.5 py-1 bg-white border border-blue-200 hover:border-[#419EFF] hover:bg-blue-50/50 text-[#419EFF] rounded transition-all text-[11px] font-bold flex items-center gap-1 cursor-pointer shadow-sm"
                    >
                      查看合同附件
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 物防建设 */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-1">
                物防建设（物理防范及消防配备）
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                <ReadOnlyField label="配备消防设施设备" value={enterprise.fireDevice || "是"} />
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="w-full border-collapse text-xs text-left">
                  <thead className="bg-[#f2fcf2] text-gray-600 font-semibold border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 w-12 text-center">#</th>
                      <th className="px-4 py-3">物防种类</th>
                      <th className="px-4 py-3">部署位置</th>
                      <th className="px-4 py-3 w-28 text-center">配置数量</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(enterprise.physicalDefenses || [
                      { id: '1', category: '防盗门窗', location: '出入口', quantity: '10' },
                      { id: '2', category: '隔离栏', location: '通道', quantity: '15' }
                    ]).map((p: any, idx: number) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3.5 text-center text-gray-400 font-mono">{idx + 1}</td>
                        <td className="px-4 py-3.5 text-gray-800 font-medium">{p.category}</td>
                        <td className="px-4 py-3.5 text-gray-600">{p.location}</td>
                        <td className="px-4 py-3.5 text-center text-gray-800 font-mono font-bold">{p.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 技防建设 */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-1">
                技防建设（视频/信息化管理）
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <ReadOnlyField label="安装视频监控设备" value={enterprise.videoDevice || "是"} />
                <ReadOnlyField label="安装从业人员信息采集登记系统" value={enterprise.dataCollection || "是"} />
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="w-full border-collapse text-xs text-left">
                  <thead className="bg-[#fcfaff] text-gray-600 font-semibold border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 w-12 text-center">#</th>
                      <th className="px-4 py-3">技防设备名称</th>
                      <th className="px-4 py-3">部署位置</th>
                      <th className="px-4 py-3 w-28 text-center">安装数量</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(enterprise.technicalDefenses || [
                      { id: '1', category: '视频监控', location: '出入口', quantity: '12' },
                      { id: '2', category: '一键报警', location: '机房', quantity: '2' }
                    ]).map((t: any, idx: number) => (
                      <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3.5 text-center text-gray-400 font-mono">{idx + 1}</td>
                        <td className="px-4 py-3.5 text-gray-800 font-medium">{t.category}</td>
                        <td className="px-4 py-3.5 text-gray-600">{t.location}</td>
                        <td className="px-4 py-3.5 text-center text-gray-800 font-mono font-bold">{t.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 特行及行业资格执照物证 */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-1">
                行业资质及特行行政资质备案核准
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ReadOnlyField label="特种行业备案编号" value={enterprise.specialRecordNo || enterprise.specialIndustryRecordNo || "BA2023001"} />
                <ReadOnlyField label="特种行业监督备案机关" value={enterprise.specialRecordAgency || enterprise.specialIndustryRecordAgency || "福州市公安局"} />
                <ReadOnlyField label="行业经营许可证编号" value={enterprise.industryLicenseNo || "XK-2023-888"} />
                <ReadOnlyField label="核发经营许可行政机关" value={enterprise.industryLicenseAuthority || "福州市运输管理局"} />
              </div>
            </div>
          </div>
        </section>

        {/* 2. 列管单位信息 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              列管单位信息
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ReadOnlyField label="企业所管辖区 (公安机关)" value={enterprise.jurisdiction || "福州市-马尾区公安分局"} required />
              <ReadOnlyField label="列管民警姓名" value={enterprise.unitOfficerName || enterprise.adminPolice || "高警官"} />
              <ReadOnlyField label="列管民警手机" value={enterprise.unitOfficerMobile || enterprise.adminPolicePhone || "13805002222"} />
              <ReadOnlyField label="列管民警警号 (警号)" value={enterprise.unitOfficerBadge || "FJ02145"} className="md:col-span-1" />
            </div>
          </div>
        </section>

        {/* 3. 备案信息附件 */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-[#419EFF]" />
              <h3 className="text-sm font-bold text-[#333333]">备案信息附件清单</h3>
            </div>
            <span className="text-xs text-[#666666]">材料归集管理与免提交联动</span>
          </div>
          
          <div className="p-6 space-y-8">
            {/* 自筹材料 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">自筹材料</span>
                <span className="text-xs text-gray-500">企业需主动准备并上传的电子材料</span>
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
                      <th className="px-4 py-3 text-center w-48 text-xs border-l border-gray-200">文件及操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      {
                        id: 'roster',
                        name: '从业人员花名册 (应注明场所管理人员、治安保卫人员配备情况)',
                        count: 1,
                        required: true,
                        method: '电子材料',
                        fileName: `从业人员花名册_${enterprise.brandName || enterprise.name || '众诚汽修'}.xlsx`,
                        fileSize: '1.4MB',
                        status: '已提交'
                      },
                      {
                        id: 'layout',
                        name: '经营场所平面图',
                        count: 1,
                        required: true,
                        method: '电子材料',
                        fileName: `经营场所平面布置图_已审_${enterprise.brandName || enterprise.name || '众诚汽修'}.png`,
                        fileSize: '2.5MB',
                        status: '已提交'
                      },
                      {
                        id: 'equipment',
                        name: '安装、配备与治安管理信息系统要求相适应的采集、上传设施设备的说明材料',
                        count: 1,
                        required: true,
                        method: '电子材料',
                        fileName: '采集设备说明及联网协议.pdf',
                        fileSize: '1.8MB',
                        status: '已提交'
                      }
                    ].map((material, idx) => (
                      <tr key={material.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3.5 text-gray-400">{idx + 1}</td>
                        <td className="px-4 py-3.5 text-gray-800 font-medium leading-relaxed max-w-sm break-words">
                          <div>{material.name}</div>
                          {material.fileName && (
                            <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-1.5 leading-none">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                              {material.fileName} ({material.fileSize})
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-center text-gray-600">{material.count}</td>
                        <td className="px-4 py-3.5 text-center">
                          <span className="text-red-500 text-xs font-bold">★ 必要</span>
                        </td>
                        <td className="px-4 py-3.5 text-center text-gray-600">{material.method}</td>
                        <td className="px-4 py-3.5 text-center">
                          <span className="text-green-600 text-xs font-medium bg-green-50/50 px-2 py-0.5 rounded border border-green-100">已提交</span>
                        </td>
                        <td className="px-4 py-3.5 text-center border-l border-gray-100">
                          <button 
                            onClick={() => handleViewMaterial(material.name, material.fileName)}
                            className="text-[#419EFF] hover:underline text-xs flex items-center justify-center w-full gap-0.5 font-medium"
                          >
                            下载/查看
                          </button>
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
                      <th className="px-4 py-3 text-center w-48 text-xs border-l border-gray-200">文件及操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      {
                        id: 'idcard',
                        name: '法定代表人、主要负责人或经营者的有效身份证件',
                        source: '政府核发',
                        fileName: `身份证电子证照_${enterprise.legalRep || '负责人'}.pdf`,
                        status: '免提交 (自动获取)'
                      },
                      {
                        id: 'biz_license',
                        name: '营业执照',
                        source: '政府核发',
                        fileName: `营业执照电子证照_${enterprise.brandName || enterprise.name || '众诚汽修'}.pdf`,
                        status: '免提交 (自动获取)'
                      }
                    ].map((material, idx) => (
                      <tr key={material.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3.5 text-gray-400">{idx + 1}</td>
                        <td className="px-4 py-3.5 text-gray-800 font-medium leading-relaxed">
                          <div>{material.name}</div>
                          {material.fileName && (
                            <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-1.5 leading-none">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              {material.fileName} (由系统自动补全)
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-[#666666] font-medium">{material.source}</td>
                        <td className="px-4 py-3.5 text-center border-l border-gray-100">
                          <button 
                            onClick={() => handleViewMaterial(material.name, material.fileName)}
                            className="text-[#419EFF] hover:underline text-xs flex items-center justify-center w-full gap-1 font-medium"
                          >
                            免提交 (自动获取)
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
