import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldAlert, FileText, CheckCircle, Edit, ShieldCheck, AlertTriangle, Clock, Users, Car, MapPin, Phone, User, BookOpen, Bell, AlertCircle } from 'lucide-react';
import RecordInfoDisplay from './RecordInfoDisplay';
import { api } from '../api';

interface EnterpriseDetailProps {
  id: string;
  onBack: () => void;
  onEdit: (id: string) => void;
  onNavigate?: (menu: string) => void;
}

const TABS = [
  { id: 'basic', label: '基本信息', icon: FileText },
  { id: 'record', label: '备案与证照', icon: ShieldCheck },
  { id: 'security', label: '安全设施', icon: ShieldAlert },
  { id: 'systems', label: '管理制度', icon: BookOpen },
  { id: 'personnel', label: '从业人员', icon: Users },
  { id: 'vehicles', label: '维修车辆', icon: Car },
  { id: 'checks', label: '检查记录', icon: ShieldAlert },
  { id: 'incidents', label: '案事件记录', icon: AlertTriangle },
  { id: 'changes', label: '变更记录', icon: Edit },
  { id: 'failures', label: '故障申报记录', icon: AlertCircle },
  { id: 'closures', label: '歇业申报记录', icon: Clock },
  { id: 'logs', label: '系统日志', icon: FileText },
];

export default function EnterpriseDetail({ id, onBack, onEdit, onNavigate }: EnterpriseDetailProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [enterprise, setEnterprise] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Tab data states
  const [tabData, setTabData] = useState<any>({
    personnel: [],
    vehicles: [],
    checks: [],
    incidents: []
  });
  const [tabLoading, setTabLoading] = useState(false);
  
  // Modal states
  const [faultModalOpen, setFaultModalOpen] = useState(false);

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

  useEffect(() => {
    const fetchTabData = async () => {
      if (!['personnel', 'vehicles', 'checks', 'incidents'].includes(activeTab)) return;
      
      setTabLoading(true);
      try {
        let data = [];
        if (activeTab === 'personnel') {
          data = await api.personnel.getAll();
        } else if (activeTab === 'vehicles') {
          data = await api.repairRecord.getAll();
        } else if (activeTab === 'checks') {
          data = await api.inspection.getAll();
        } else if (activeTab === 'incidents') {
          data = await api.case.getAll();
        }
        setTabData((prev: any) => ({ ...prev, [activeTab]: data }));
      } catch (error) {
        console.error(`Failed to fetch data for ${activeTab}:`, error);
      } finally {
        setTabLoading(false);
      }
    };
    
    fetchTabData();
  }, [activeTab]);

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
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      {/* 头部概览区 */}
      <div className="bg-white px-6 py-5 border-b border-gray-200 shrink-0 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] z-10">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-2">
              <h1 className="text-2xl font-bold text-[#333333] mr-4">{enterprise.name}</h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 mr-2">
                {enterprise.category}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#1ebcaf]/10 text-[#1ebcaf] border border-[#1ebcaf]/20 mr-2">
                {enterprise.recordStatus}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                {enterprise.status}
              </span>
            </div>
            <div className="flex items-center text-sm text-[#666666] space-x-6">
              <span className="flex items-center"><FileText size={14} className="mr-1.5 text-[#999999]" /> 统一社会信用代码：<span className="font-mono text-[#333333] ml-1">{enterprise.uscc}</span></span>
              <span className="flex items-center"><ShieldCheck size={14} className="mr-1.5 text-[#999999]" /> 备案编号：<span className="font-mono text-[#333333] ml-1 font-bold">{enterprise.recordNo}</span></span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => onNavigate && onNavigate('行政检查')}
              className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
            >
              <ShieldAlert size={16} className="mr-1.5" /> 发起行政检查
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('案事件信息')}
              className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
            >
              <AlertTriangle size={16} className="mr-1.5" /> 登记案事件
            </button>
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

      {/* 主体内容区：左右结构 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧导航区 */}
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

        {/* 右侧内容区 */}
        <div className="flex-1 overflow-auto p-3 custom-scrollbar">
          {activeTab === 'basic' && (
            <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#333333]">基本信息</h2>
                <button 
                  onClick={() => onEdit(id)}
                  className="text-sm text-[#419EFF] hover:text-blue-700 flex items-center transition-colors"
                >
                  <AlertTriangle size={14} className="mr-1" />
                  信息有误？申请修改
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-8">
                  {/* 分组1：工商与主体信息 */}
                  <section>
                    <h3 className="text-sm font-bold text-[#419EFF] mb-4 flex items-center">
                      <span className="w-1 h-4 bg-[#419EFF] mr-2 rounded-full"></span>
                      工商与主体信息
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8">
                      <DetailItem label="法定代表人" value={enterprise.legalRep} icon={User} />
                      <DetailItem label="法人证件号码" value={enterprise.legalRepId} />
                      <DetailItem label="法人代表电话" value={enterprise.legalRepPhone} icon={Phone} />
                      <DetailItem label="法人现住地址" value={enterprise.legalRepAddress} className="md:col-span-2" />
                      <DetailItem label="法人代码" value={enterprise.legalRepCode} />
                      <DetailItem label="注册资本" value={`${enterprise.registeredCapital} 万元`} />
                      <DetailItem label="经济类型" value={enterprise.economicType} />
                      <DetailItem label="开业日期" value={enterprise.openingDate} />
                      <DetailItem label="单位电话" value={enterprise.companyPhone} />
                      <DetailItem label="企业等级" value="A级" />
                    </div>
                  </section>

                  {/* 分组2：经营与地址信息 */}
                  <section>
                    <h3 className="text-sm font-bold text-[#419EFF] mb-4 flex items-center">
                      <span className="w-1 h-4 bg-[#419EFF] mr-2 rounded-full"></span>
                      经营与地址信息
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8">
                      <DetailItem label="经营场所地址" value={enterprise.address} icon={MapPin} className="md:col-span-3" />
                      <DetailItem label="标准地址名称" value={enterprise.standardAddress} className="md:col-span-2" />
                      <DetailItem label="标准地址编码" value={enterprise.standardAddressCode} />
                      <DetailItem label="坐标经度" value={enterprise.longitude} />
                      <DetailItem label="坐标纬度" value={enterprise.latitude} />
                      <DetailItem label="邮政编码" value={enterprise.postalCode} />
                      <DetailItem label="传真" value={enterprise.fax} />
                      <DetailItem label="营业面积" value="800 平方米" />
                      <DetailItem label="占地面积" value={`${enterprise.buildingArea} 平方米`} />
                      <DetailItem label="法定假日不营业" value={enterprise.holidayClosed} />
                    </div>
                  </section>

                  {/* 分组3：治安与备案信息 */}
                  <section>
                    <h3 className="text-sm font-bold text-[#419EFF] mb-4 flex items-center">
                      <span className="w-1 h-4 bg-[#419EFF] mr-2 rounded-full"></span>
                      治安与备案信息
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8">
                      <DetailItem label="重点经营负责人" value={enterprise.manager} />
                      <DetailItem label="负责人证件号" value={enterprise.managerId} />
                      <DetailItem label="负责人电话" value={enterprise.managerPhone} />
                      <DetailItem label="负责人现住地址" value={enterprise.managerAddress} className="md:col-span-2" />
                      <DetailItem label="治安负责人" value={enterprise.securityManager} />
                      <DetailItem label="保卫负责人" value={enterprise.protectionManager} />
                      <DetailItem label="保卫负责人电话" value={enterprise.protectionPhone} />
                      <DetailItem label="保卫部电话" value={enterprise.protectionDeptPhone} />
                      <DetailItem label="保卫人员数量" value={enterprise.protectionStaffCount} />
                      <DetailItem label="特行备案编号" value={enterprise.specialRecordNo} />
                      <DetailItem label="特行备案机构" value={enterprise.specialRecordAgency} />
                      <DetailItem label="行业许可证号" value={enterprise.industryLicenseNo} />
                      <DetailItem label="税务登记机构" value={enterprise.taxAgency} />
                      <DetailItem label="治安管理机构" value={enterprise.securityAgency} />
                      <DetailItem label="信息采集" value={enterprise.dataCollection} />
                      <DetailItem label="视频设备" value={enterprise.videoDevice} />
                      <DetailItem label="消防设备" value={enterprise.fireDevice} />
                      <DetailItem label="登记日期" value={enterprise.registrationDate} />
                    </div>
                  </section>

                  {/* 分组4：列管与系统信息 */}
                  <section>
                    <h3 className="text-sm font-bold text-[#419EFF] mb-4 flex items-center">
                      <span className="w-1 h-4 bg-[#419EFF] mr-2 rounded-full"></span>
                      列管与系统信息
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8">
                      <DetailItem label="列管负责人" value={enterprise.adminManager} />
                      <DetailItem label="负责人手机" value={enterprise.adminManagerPhone} />
                      <DetailItem label="列管民警" value={enterprise.adminPolice} />
                      <DetailItem label="民警手机" value={enterprise.adminPolicePhone} />
                      <DetailItem label="管辖单位" value="福州市公安局鼓楼分局" className="md:col-span-2" />
                      <div className="md:col-span-3">
                        <div className="text-sm text-[#999999] mb-2">客户端功能模块</div>
                        <div className="flex flex-wrap gap-2">
                          {enterprise.clientModules.map(m => (
                            <span key={m} className="px-2 py-1 bg-gray-100 text-[#666666] text-xs rounded border border-gray-200">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'record' && (
            <div className="-m-6 h-[calc(100%+3rem)]">
              {/* Reuse RecordInfoDisplay but hide its own breadcrumbs/footer if possible, 
                  for now we just render it. In a real app we'd pass a prop to hide the shell. */}
              <RecordInfoDisplay />
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#333333]">安全设施情况</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                        <ShieldCheck className="text-[#419EFF]" size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#333333]">视频监控设备</h3>
                        <p className="text-xs text-gray-500">覆盖主要出入口及维修区域</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                      <span className="text-sm text-gray-600">设备数量：</span>
                      <span className="text-lg font-bold text-[#333333]">12 台</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">运行状态：</span>
                      <span className="text-sm text-green-600 font-medium">正常运行</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mr-3">
                        <AlertTriangle className="text-red-500" size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#333333]">消防灭火器材</h3>
                        <p className="text-xs text-gray-500">符合消防安全标准配备</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                      <span className="text-sm text-gray-600">设备数量：</span>
                      <span className="text-lg font-bold text-[#333333]">8 具</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">运行状态：</span>
                      <span className="text-sm text-green-600 font-medium">正常/未过期</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mr-3">
                        <ShieldAlert className="text-orange-500" size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#333333]">防盗报警装置</h3>
                        <p className="text-xs text-gray-500">与公安联网报警系统</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                      <span className="text-sm text-gray-600">设备数量：</span>
                      <span className="text-lg font-bold text-[#333333]">1 套</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">运行状态：</span>
                      <span className="text-sm text-green-600 font-medium">正常联网</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'systems' && (
            <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-[#333333]">企业管理制度</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-[#419EFF] transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <FileText className="text-[#419EFF] mr-3" size={24} />
                      <div>
                        <div className="text-[#333333] font-medium">治安保卫工作制度.pdf</div>
                        <div className="text-xs text-[#999999] mt-1">上传于 2023-01-15</div>
                      </div>
                    </div>
                    <button className="text-[#419EFF] hover:text-blue-700 text-sm">查看</button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-[#419EFF] transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <FileText className="text-[#419EFF] mr-3" size={24} />
                      <div>
                        <div className="text-[#333333] font-medium">消防安全工作制度.pdf</div>
                        <div className="text-xs text-[#999999] mt-1">上传于 2023-01-15</div>
                      </div>
                    </div>
                    <button className="text-[#419EFF] hover:text-blue-700 text-sm">查看</button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-[#419EFF] transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <FileText className="text-[#419EFF] mr-3" size={24} />
                      <div>
                        <div className="text-[#333333] font-medium">岗位责任制.pdf</div>
                        <div className="text-xs text-[#999999] mt-1">上传于 2023-01-15</div>
                      </div>
                    </div>
                    <button className="text-[#419EFF] hover:text-blue-700 text-sm">查看</button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-[#419EFF] transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <FileText className="text-[#419EFF] mr-3" size={24} />
                      <div>
                        <div className="text-[#333333] font-medium">紧急情况处置预案.pdf</div>
                        <div className="text-xs text-[#999999] mt-1">上传于 2023-01-15</div>
                      </div>
                    </div>
                    <button className="text-[#419EFF] hover:text-blue-700 text-sm">查看</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {['personnel', 'vehicles', 'checks', 'incidents'].includes(activeTab) && (
            <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden h-full flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-[#333333]">
                  {TABS.find(t => t.id === activeTab)?.label}列表
                </h2>
              </div>
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <div className="flex space-x-4">
                  <input type="text" placeholder="关键字搜索..." className="h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                  <button className="h-8 px-4 bg-[#419EFF] text-white rounded text-sm">查询</button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                {tabLoading ? (
                  <div className="flex items-center justify-center h-full text-gray-500">加载中...</div>
                ) : tabData[activeTab]?.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-[#666666] text-sm border-b border-gray-200">
                        {activeTab === 'personnel' && (
                          <>
                            <th className="px-6 py-3 font-medium">姓名</th>
                            <th className="px-6 py-3 font-medium">性别</th>
                            <th className="px-6 py-3 font-medium">身份证号</th>
                            <th className="px-6 py-3 font-medium">岗位</th>
                            <th className="px-6 py-3 font-medium">状态</th>
                          </>
                        )}
                        {activeTab === 'vehicles' && (
                          <>
                            <th className="px-6 py-3 font-medium">车牌号</th>
                            <th className="px-6 py-3 font-medium">维修日期</th>
                            <th className="px-6 py-3 font-medium">金额</th>
                            <th className="px-6 py-3 font-medium">状态</th>
                          </>
                        )}
                        {activeTab === 'checks' && (
                          <>
                            <th className="px-6 py-3 font-medium">检查人员</th>
                            <th className="px-6 py-3 font-medium">检查日期</th>
                            <th className="px-6 py-3 font-medium">检查方式</th>
                            <th className="px-6 py-3 font-medium">检查情况</th>
                            <th className="px-6 py-3 font-medium">状态</th>
                          </>
                        )}
                        {activeTab === 'incidents' && (
                          <>
                            <th className="px-6 py-3 font-medium">案事件编号</th>
                            <th className="px-6 py-3 font-medium">案事件名称</th>
                            <th className="px-6 py-3 font-medium">发生时间</th>
                            <th className="px-6 py-3 font-medium">类型</th>
                            <th className="px-6 py-3 font-medium">状态</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="text-sm text-[#333333]">
                      {tabData[activeTab].map((item: any, index: number) => (
                        <tr key={item.id || index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          {activeTab === 'personnel' && (
                            <>
                              <td className="px-6 py-4">{item.name}</td>
                              <td className="px-6 py-4">{item.gender}</td>
                              <td className="px-6 py-4">{item.idCard}</td>
                              <td className="px-6 py-4">{item.position}</td>
                              <td className="px-6 py-4">{item.status}</td>
                            </>
                          )}
                          {activeTab === 'vehicles' && (
                            <>
                              <td className="px-6 py-4">{item.plateNo}</td>
                              <td className="px-6 py-4">{item.repairDate}</td>
                              <td className="px-6 py-4">¥{item.amount}</td>
                              <td className="px-6 py-4">{item.status}</td>
                            </>
                          )}
                          {activeTab === 'checks' && (
                            <>
                              <td className="px-6 py-4">{item.inspectors}</td>
                              <td className="px-6 py-4">{item.date}</td>
                              <td className="px-6 py-4">{item.method}</td>
                              <td className="px-6 py-4">{item.situation}</td>
                              <td className="px-6 py-4">{item.status}</td>
                            </>
                          )}
                          {activeTab === 'incidents' && (
                            <>
                              <td className="px-6 py-4 font-mono">{item.caseNo}</td>
                              <td className="px-6 py-4">{item.caseName}</td>
                              <td className="px-6 py-4">{item.occurrenceTime}</td>
                              <td className="px-6 py-4">{item.caseType}</td>
                              <td className="px-6 py-4">{item.status}</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex items-center justify-center h-full text-[#999999]">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FileText size={24} className="text-gray-400" />
                      </div>
                      <p>暂无{TABS.find(t => t.id === activeTab)?.label}数据</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'changes' && (
            <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-[#333333]">变更记录</h2>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-[#666666] text-sm border-b border-gray-200">
                      <th className="px-6 py-3 font-medium">变更时间</th>
                      <th className="px-6 py-3 font-medium">变更类型</th>
                      <th className="px-6 py-3 font-medium">变更项目</th>
                      <th className="px-6 py-3 font-medium">变更前内容</th>
                      <th className="px-6 py-3 font-medium">变更后内容</th>
                      <th className="px-6 py-3 font-medium">变更原因</th>
                      <th className="px-6 py-3 font-medium">变更人员</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-[#333333]">
                    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-[#999999]">2023-11-20 14:30:00</td>
                      <td className="px-6 py-4">信息修改</td>
                      <td className="px-6 py-4">联系电话</td>
                      <td className="px-6 py-4 text-red-500 line-through">13800138000</td>
                      <td className="px-6 py-4 text-green-600">13900139000</td>
                      <td className="px-6 py-4">更换负责人号码</td>
                      <td className="px-6 py-4">张建国</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'failures' && (
            <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#333333]">故障申报记录</h2>
                <button 
                  onClick={() => setFaultModalOpen(true)}
                  className="px-4 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  新增故障申报
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                    <div className="font-bold text-[#333333]">申报内容</div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">已解决</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div><span className="text-gray-500">故障时间：</span>2023-10-10 09:00</div>
                    <div><span className="text-gray-500">故障原因：</span>网络异常</div>
                    <div><span className="text-gray-500">登记人员：</span>李志强</div>
                    <div><span className="text-gray-500">核实人员：</span>王警官</div>
                    <div><span className="text-gray-500">联系人：</span>李志强</div>
                    <div><span className="text-gray-500">联系方式：</span>13800138000</div>
                    <div className="col-span-2"><span className="text-gray-500">故障描述：</span>无法连接到省厅服务器，数据上传失败。</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-bold text-[#333333] mb-2 text-sm">回复内容</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-500">是否解决：</span>是</div>
                      <div><span className="text-gray-500">维护方式：</span>远程协助</div>
                      <div className="col-span-2"><span className="text-gray-500">回复内容：</span>已重置网络配置，恢复正常。</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'closures' && (
            <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-[#333333]">歇业申报记录</h2>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1200px]">
                  <thead>
                    <tr className="bg-gray-50 text-[#666666] text-sm border-b border-gray-200">
                      <th className="px-4 py-3 font-medium">申报原因</th>
                      <th className="px-4 py-3 font-medium">登记日期</th>
                      <th className="px-4 py-3 font-medium">开始日期</th>
                      <th className="px-4 py-3 font-medium">结束日期</th>
                      <th className="px-4 py-3 font-medium">歇业说明</th>
                      <th className="px-4 py-3 font-medium">派出所审核</th>
                      <th className="px-4 py-3 font-medium">分局审核</th>
                      <th className="px-4 py-3 font-medium">市局审核</th>
                      <th className="px-4 py-3 font-medium">省厅审核</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-[#333333]">
                    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4">内部装修</td>
                      <td className="px-4 py-4">2023-08-01</td>
                      <td className="px-4 py-4">2023-08-05</td>
                      <td className="px-4 py-4">2023-09-05</td>
                      <td className="px-4 py-4">店面升级改造</td>
                      <td className="px-4 py-4">
                        <div className="text-green-600">同意</div>
                        <div className="text-xs text-gray-400">2023-08-02</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-green-600">同意</div>
                        <div className="text-xs text-gray-400">2023-08-03</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-green-600">同意</div>
                        <div className="text-xs text-gray-400">2023-08-04</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-gray-400">无需审核</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-[#333333]">系统日志</h2>
              </div>
              <div className="p-6">
                <div className="relative border-l-2 border-gray-200 ml-3 space-y-8">
                  <div className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-[#419EFF] rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                    <div className="text-sm text-[#999999] mb-1">2023-11-20 14:30:00</div>
                    <div className="text-base text-[#333333] font-medium">信息修改申请</div>
                    <div className="text-sm text-[#666666] mt-1">操作人：张警官。修改了联系电话。</div>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                    <div className="text-sm text-[#999999] mb-1">2023-10-15 09:00:00</div>
                    <div className="text-base text-[#333333] font-medium">企业备案通过</div>
                    <div className="text-sm text-[#666666] mt-1">操作人：系统自动。</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 新增故障申报弹窗 */}
      {faultModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[600px] shadow-xl">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#333333]">新增故障申报</h3>
              <button onClick={() => setFaultModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#666666] mb-1.5">故障时间 <span className="text-red-500">*</span></label>
                    <input type="datetime-local" className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#666666] mb-1.5">故障原因 <span className="text-red-500">*</span></label>
                    <select className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                      <option value="">请选择故障原因</option>
                      <option value="network">网络异常</option>
                      <option value="hardware">硬件损坏</option>
                      <option value="software">软件报错</option>
                      <option value="other">其他</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#666666] mb-1.5">联系人 <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入联系人姓名" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#666666] mb-1.5">联系方式 <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" placeholder="请输入联系电话" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-[#666666] mb-1.5">故障描述 <span className="text-red-500">*</span></label>
                    <textarea 
                      className="w-full h-24 p-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm resize-none"
                      placeholder="请详细描述故障现象..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-lg">
              <button 
                onClick={() => setFaultModalOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  alert('提交成功');
                  setFaultModalOpen(false);
                }}
                className="px-4 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                提交申报
              </button>
            </div>
          </div>
        </div>
      )}
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
