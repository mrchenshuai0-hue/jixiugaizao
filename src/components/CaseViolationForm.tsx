import React, { useState } from 'react';
import { ArrowLeft, Save, X, Search, Calendar, Upload } from 'lucide-react';

interface CaseViolationFormProps {
  onCancel: () => void;
  onSave: () => void;
}

export default function CaseViolationForm({ onCancel, onSave }: CaseViolationFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    violator: '',
    idCard: '',
    registrar: '当前用户',
    occurrenceTime: '',
    caseNo: '',
    nature: '刑事案件',
    category: '',
    description: ''
  });

  return (
    <div className="h-full flex flex-col bg-[#F5F5F5] overflow-hidden relative">
      {/* 表单内容 */}
      <div className="flex-1 overflow-auto p-3 custom-scrollbar pb-24">
        <div className="w-full">
          <div className="bg-white border border-gray-200 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="bg-[#F8FAFC] px-6 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-sm font-bold text-[#333333] flex items-center">
                <span className="w-1 h-4 bg-[#419EFF] mr-2 rounded-full"></span>
                基本信息登记
              </h3>
              <button onClick={onCancel} className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <ArrowLeft size={16} className="mr-1.5" /> 返回列表
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                {/* 企业名称 */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#666666] mb-2">
                    <span className="text-[#fa5e45] mr-1">*</span>企业名称
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      className="w-full h-10 pl-3 pr-10 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                      placeholder="请选择或输入企业名称"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#419EFF]">
                      <Search size={18} />
                    </button>
                  </div>
                </div>

                {/* 违法违规人员 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">
                    <span className="text-[#fa5e45] mr-1">*</span>违法违规人员(单位)
                  </label>
                  <input 
                    type="text" 
                    className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                    placeholder="请输入人员姓名或单位名称"
                    value={formData.violator}
                    onChange={(e) => setFormData({...formData, violator: e.target.value})}
                  />
                </div>

                {/* 证件号码 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">
                    涉案事件人员证件号码
                  </label>
                  <input 
                    type="text" 
                    className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                    placeholder="请输入证件号码"
                    value={formData.idCard}
                    onChange={(e) => setFormData({...formData, idCard: e.target.value})}
                  />
                </div>

                {/* 登记人员 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">
                    登记人员
                  </label>
                  <input 
                    type="text" 
                    className="w-full h-10 px-3 border border-gray-200 rounded bg-gray-50 text-gray-500"
                    value={formData.registrar}
                    readOnly
                  />
                </div>

                {/* 发生时间 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">
                    <span className="text-[#fa5e45] mr-1">*</span>发生时间
                  </label>
                  <div className="relative">
                    <input 
                      type="datetime-local" 
                      className="w-full h-10 pl-3 pr-10 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                      value={formData.occurrenceTime}
                      onChange={(e) => setFormData({...formData, occurrenceTime: e.target.value})}
                    />
                  </div>
                </div>

                {/* 立案编号 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">
                    立案编号
                  </label>
                  <input 
                    type="text" 
                    className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                    placeholder="请输入立案编号"
                    value={formData.caseNo}
                    onChange={(e) => setFormData({...formData, caseNo: e.target.value})}
                  />
                </div>

                {/* 案件性质 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">
                    <span className="text-[#fa5e45] mr-1">*</span>案件性质
                  </label>
                  <div className="flex space-x-6 h-10 items-center">
                    <label className="flex items-center cursor-pointer group">
                      <input 
                        type="radio" 
                        name="nature" 
                        className="w-4 h-4 text-[#419EFF] border-gray-300 focus:ring-[#419EFF]"
                        checked={formData.nature === '刑事案件'}
                        onChange={() => setFormData({...formData, nature: '刑事案件'})}
                      />
                      <span className="ml-2 text-sm text-[#333333] group-hover:text-[#419EFF]">刑事案件</span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input 
                        type="radio" 
                        name="nature" 
                        className="w-4 h-4 text-[#419EFF] border-gray-300 focus:ring-[#419EFF]"
                        checked={formData.nature === '治安案件'}
                        onChange={() => setFormData({...formData, nature: '治安案件'})}
                      />
                      <span className="ml-2 text-sm text-[#333333] group-hover:text-[#419EFF]">治安案件</span>
                    </label>
                  </div>
                </div>

                {/* 案件类别 */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#666666] mb-2">
                    <span className="text-[#fa5e45] mr-1">*</span>案件类别
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      className="w-full h-10 pl-3 pr-10 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                      placeholder="请选择案件类别"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#419EFF]">
                      <Search size={18} />
                    </button>
                  </div>
                </div>

                {/* 情况描述 */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#666666] mb-2">
                    情况描述
                  </label>
                  <textarea 
                    className="w-full h-32 p-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all resize-none"
                    placeholder="请输入详细情况描述..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部固定操作栏 */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-end shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <div className="flex space-x-3">
          <button 
            onClick={onCancel}
            className="px-6 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            取消
          </button>
          <button 
            onClick={onSave}
            className="px-6 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium shadow-sm"
          >
            <Save size={16} className="mr-1.5" /> 登记
          </button>
        </div>
      </div>
    </div>
  );
}
