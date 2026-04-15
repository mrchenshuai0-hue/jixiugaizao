import React, { useState } from 'react';
import { ArrowLeft, Save, Send, CheckCircle, XCircle, Printer, Edit, MapPin, Upload, FileText, Clock, AlertCircle } from 'lucide-react';

interface RecordInfoDetailProps {
  id: string | null;
  mode: 'view' | 'audit' | 'edit';
  onBack: () => void;
}

export default function RecordInfoDetail({ id, mode: initialMode, onBack }: RecordInfoDetailProps) {
  const [mode, setMode] = useState(initialMode);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'submit' | 'approve' | 'reject' | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const isEdit = mode === 'edit';
  const isAudit = mode === 'audit';

  const handleAction = (action: 'submit' | 'approve' | 'reject') => {
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  const confirmActionExecute = () => {
    // Execute action logic here
    setShowConfirmModal(false);
    onBack(); // Go back to list after action
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      {/* 头部信息区 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-500 hover:text-[#419EFF] transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-[#333333]">
                {id === 'new' ? '新增企业备案' : '某汽车维修有限公司'}
              </h1>
              {id !== 'new' && (
                <>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-200 rounded text-xs font-mono">
                    BA-20260415-001
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs border ${
                    isAudit ? 'bg-[#fff8e6] text-[#ffc23e] border-[#ffe8b3]' : 'bg-[#e8f8f7] text-[#1ebcaf] border-[#bcece8]'
                  }`}>
                    {isAudit ? '待审核' : '已备案'}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {mode === 'view' && (
            <>
              <button onClick={() => setMode('edit')} className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 flex items-center text-sm font-medium">
                <Edit size={14} className="mr-1.5" /> 编辑
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 flex items-center text-sm font-medium">
                <Printer size={14} className="mr-1.5" /> 打印备案证明
              </button>
            </>
          )}
          {mode === 'edit' && (
            <>
              <button className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 flex items-center text-sm font-medium">
                <Save size={14} className="mr-1.5" /> 保存草稿
              </button>
              <button onClick={() => handleAction('submit')} className="px-4 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 flex items-center text-sm font-medium">
                <Send size={14} className="mr-1.5" /> 提交审核
              </button>
            </>
          )}
          {mode === 'audit' && (
            <>
              <button onClick={() => handleAction('reject')} className="px-4 py-2 bg-white border border-[#fa5e45] text-[#fa5e45] rounded hover:bg-red-50 flex items-center text-sm font-medium">
                <XCircle size={14} className="mr-1.5" /> 驳回
              </button>
              <button onClick={() => handleAction('approve')} className="px-4 py-2 bg-[#1ebcaf] text-white rounded hover:bg-teal-600 flex items-center text-sm font-medium">
                <CheckCircle size={14} className="mr-1.5" /> 审核通过
              </button>
            </>
          )}
        </div>
      </div>

      {/* 主体内容区 */}
      <div className="flex-1 overflow-auto p-4 flex gap-4">
        {/* 左侧表单区 */}
        <div className="flex-1 space-y-4">
          
          {/* 卡片1：企业基本信息 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-base font-bold text-[#333333] flex items-center">
                <div className="w-1 h-4 bg-[#419EFF] mr-2 rounded-sm"></div>
                企业基本信息
              </h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  <span className="text-red-500 mr-1">*</span>企业名称
                </label>
                <input type="text" disabled={!isEdit} defaultValue={id !== 'new' ? '某汽车维修有限公司' : ''} className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" placeholder="请输入企业名称" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  <span className="text-red-500 mr-1">*</span>统一社会信用代码
                </label>
                <input type="text" disabled={!isEdit} defaultValue={id !== 'new' ? '91350100MA34567890' : ''} className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" placeholder="请输入18位信用代码" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  <span className="text-red-500 mr-1">*</span>经济类型
                </label>
                <select disabled={!isEdit} className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500">
                  <option>有限责任公司</option>
                  <option>个体工商户</option>
                  <option>股份有限公司</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  <span className="text-red-500 mr-1">*</span>法定代表人
                </label>
                <input type="text" disabled={!isEdit} defaultValue={id !== 'new' ? '张三' : ''} className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  <span className="text-red-500 mr-1">*</span>联系电话
                </label>
                <input type="text" disabled={!isEdit} defaultValue={id !== 'new' ? '13800138000' : ''} className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  <span className="text-red-500 mr-1">*</span>经营地址
                </label>
                <div className="flex gap-2">
                  <input type="text" disabled={!isEdit} defaultValue={id !== 'new' ? '某区某街道1号' : ''} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" placeholder="请输入详细地址" />
                  {isEdit && (
                    <button className="px-3 h-9 bg-gray-100 border border-gray-300 text-gray-600 rounded hover:bg-gray-200 flex items-center text-sm">
                      <MapPin size={14} className="mr-1" /> 地图选址
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">经纬度</label>
                <input type="text" disabled defaultValue={id !== 'new' ? '119.30, 26.08' : ''} className="w-full h-9 px-3 text-sm border border-gray-300 rounded bg-gray-50 text-gray-500" placeholder="自动获取" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">从业人数</label>
                <input type="number" disabled={!isEdit} defaultValue={id !== 'new' ? 15 : ''} className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
            </div>
          </div>

          {/* 卡片2：治安管理备案信息 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-base font-bold text-[#333333] flex items-center">
                <div className="w-1 h-4 bg-[#419EFF] mr-2 rounded-sm"></div>
                治安管理备案信息
              </h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  <span className="text-red-500 mr-1">*</span>安全负责人姓名
                </label>
                <input type="text" disabled={!isEdit} defaultValue={id !== 'new' ? '李四' : ''} className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  <span className="text-red-500 mr-1">*</span>安全负责人身份证号
                </label>
                <input type="text" disabled={!isEdit} defaultValue={id !== 'new' ? '350102199001011234' : ''} className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  <span className="text-red-500 mr-1">*</span>安全负责人联系电话
                </label>
                <input type="text" disabled={!isEdit} defaultValue={id !== 'new' ? '13900139000' : ''} className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">治安保卫组织情况</label>
                <div className="flex items-center gap-4 h-9">
                  <label className="flex items-center">
                    <input type="radio" name="securityOrg" disabled={!isEdit} defaultChecked className="mr-2" /> 有
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="securityOrg" disabled={!isEdit} className="mr-2" /> 无
                  </label>
                  <input type="number" disabled={!isEdit} defaultValue={3} placeholder="保卫人数" className="w-24 h-8 px-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#333333] mb-2">安全制度建立情况</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center text-sm text-gray-700">
                    <input type="checkbox" disabled={!isEdit} defaultChecked className="mr-2" /> 治安防范制度
                  </label>
                  <label className="flex items-center text-sm text-gray-700">
                    <input type="checkbox" disabled={!isEdit} defaultChecked className="mr-2" /> 可疑情况报告制度
                  </label>
                  <label className="flex items-center text-sm text-gray-700">
                    <input type="checkbox" disabled={!isEdit} defaultChecked className="mr-2" /> 登记查验制度
                  </label>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#333333] mb-2">安全设施情况</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" disabled={!isEdit} defaultChecked className="mt-1" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-700">视频监控</div>
                      <input type="number" disabled={!isEdit} defaultValue={8} placeholder="数量" className="w-full h-7 mt-1 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" disabled={!isEdit} defaultChecked className="mt-1" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-700">消防器材</div>
                      <input type="number" disabled={!isEdit} defaultValue={12} placeholder="数量" className="w-full h-7 mt-1 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" disabled={!isEdit} defaultChecked className="mt-1" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-700">保险柜</div>
                      <input type="number" disabled={!isEdit} defaultValue={1} placeholder="数量" className="w-full h-7 mt-1 px-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 卡片3：行业经营备案信息 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-base font-bold text-[#333333] flex items-center">
                <div className="w-1 h-4 bg-[#419EFF] mr-2 rounded-sm"></div>
                行业经营备案信息
              </h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#333333] mb-2">维修经营范围</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center text-sm text-gray-700">
                    <input type="checkbox" disabled={!isEdit} defaultChecked className="mr-2" /> 汽车大修
                  </label>
                  <label className="flex items-center text-sm text-gray-700">
                    <input type="checkbox" disabled={!isEdit} defaultChecked className="mr-2" /> 总成修理
                  </label>
                  <label className="flex items-center text-sm text-gray-700">
                    <input type="checkbox" disabled={!isEdit} defaultChecked className="mr-2" /> 汽车维护
                  </label>
                  <label className="flex items-center text-sm text-gray-700">
                    <input type="checkbox" disabled={!isEdit} defaultChecked className="mr-2" /> 汽车小修
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">场地面积(平方米)</label>
                <input type="number" disabled={!isEdit} defaultValue={id !== 'new' ? 500 : ''} className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">技术人员数</label>
                <input type="number" disabled={!isEdit} defaultValue={id !== 'new' ? 8 : ''} className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
            </div>
          </div>

          {/* 卡片4：附件上传区 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-base font-bold text-[#333333] flex items-center">
                <div className="w-1 h-4 bg-[#419EFF] mr-2 rounded-sm"></div>
                附件资料
              </h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* 附件项示例 */}
                <div className="border border-gray-200 rounded-md p-3 flex flex-col items-center justify-center text-center relative group">
                  <div className="w-12 h-12 bg-blue-50 text-[#419EFF] rounded-full flex items-center justify-center mb-2">
                    <FileText size={24} />
                  </div>
                  <div className="text-sm font-medium text-gray-700">营业执照扫描件</div>
                  <div className="text-xs text-gray-500 mt-1">已上传</div>
                  {isEdit && (
                    <div className="absolute inset-0 bg-black/50 rounded-md opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button className="px-3 py-1 bg-white text-[#419EFF] text-xs rounded">重新上传</button>
                    </div>
                  )}
                </div>
                
                {isEdit && (
                  <div className="border border-dashed border-gray-300 rounded-md p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#419EFF] hover:bg-blue-50/50 transition-colors">
                    <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-2">
                      <Upload size={24} />
                    </div>
                    <div className="text-sm font-medium text-gray-600">点击上传附件</div>
                    <div className="text-xs text-gray-400 mt-1">支持 jpg, png, pdf</div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* 右侧边栏：流程与历史 */}
        <div className="w-72 shrink-0 space-y-4">
          {/* 步骤条 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-[#333333] mb-4">备案进度</h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-[#1ebcaf] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <CheckCircle size={12} />
                </div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-2 rounded border border-gray-100 bg-gray-50 shadow-sm">
                  <div className="text-xs font-bold text-gray-800">填写信息</div>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-[#1ebcaf] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <CheckCircle size={12} />
                </div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-2 rounded border border-gray-100 bg-gray-50 shadow-sm">
                  <div className="text-xs font-bold text-gray-800">提交审核</div>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className={`flex items-center justify-center w-5 h-5 rounded-full border border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${isAudit ? 'bg-[#ffc23e] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {isAudit ? <Clock size={12} /> : <div className="w-1.5 h-1.5 bg-current rounded-full" />}
                </div>
                <div className={`w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-2 rounded border shadow-sm ${isAudit ? 'border-[#ffe8b3] bg-[#fff8e6]' : 'border-gray-100 bg-white'}`}>
                  <div className={`text-xs font-bold ${isAudit ? 'text-[#ffc23e]' : 'text-gray-500'}`}>审核中</div>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-gray-200 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <div className="w-1.5 h-1.5 bg-current rounded-full" />
                </div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-2 rounded border border-gray-100 bg-white shadow-sm">
                  <div className="text-xs font-bold text-gray-500">审核通过</div>
                </div>
              </div>
            </div>
          </div>

          {/* 操作历史 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-[#333333] mb-4">操作历史</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[#419EFF] mt-1.5"></div>
                  <div className="w-px h-full bg-gray-200 my-1"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-800">企业提交备案信息</div>
                  <div className="text-xs text-gray-500 mt-0.5">2026-04-14 10:30:00</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-300 mt-1.5"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-800">创建草稿</div>
                  <div className="text-xs text-gray-500 mt-0.5">2026-04-10 15:20:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 二次确认模态框 */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[400px] shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <AlertCircle className={confirmAction === 'reject' ? 'text-[#fa5e45]' : 'text-[#419EFF]'} size={20} />
              <h3 className="text-lg font-bold text-[#333333]">
                {confirmAction === 'submit' ? '确认提交审核？' : 
                 confirmAction === 'approve' ? '确认审核通过？' : '确认驳回备案？'}
              </h3>
            </div>
            <div className="p-6">
              {confirmAction === 'reject' ? (
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    <span className="text-red-500 mr-1">*</span>驳回理由
                  </label>
                  <textarea 
                    className="w-full h-24 p-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" 
                    placeholder="请填写驳回的具体理由..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  ></textarea>
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  {confirmAction === 'submit' ? '提交后信息将不可修改，请确认信息填写无误。' : 
                   '审核通过后，该企业将正式完成备案，系统将生成备案编号。'}
                </p>
              )}
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-gray-300 text-[#666666] rounded hover:bg-gray-100 text-sm font-medium"
              >
                取消
              </button>
              <button 
                onClick={confirmActionExecute}
                className={`px-4 py-2 text-white rounded text-sm font-medium ${
                  confirmAction === 'reject' ? 'bg-[#fa5e45] hover:bg-red-600' : 'bg-[#419EFF] hover:bg-blue-600'
                }`}
                disabled={confirmAction === 'reject' && !rejectReason.trim()}
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
