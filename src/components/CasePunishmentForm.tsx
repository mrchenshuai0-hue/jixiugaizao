import React, { useState } from 'react';
import { ArrowLeft, Save, X, Search, Calendar, Upload, Image as ImageIcon } from 'lucide-react';

interface CasePunishmentFormProps {
  onCancel: () => void;
  onSave: () => void;
}

export default function CasePunishmentForm({ onCancel, onSave }: CasePunishmentFormProps) {
  const [formData, setFormData] = useState({
    punishedUnit: '',
    punishmentDate: '',
    legalRep: '',
    address: '',
    caseName: '',
    caseNo: '',
    punishmentNo: '',
    category: '违反经营机动车维修业治安管理规定',
    punishmentType: '警告',
    actionStatus: '',
    amount: '',
    handlingUnit: '北京市-北京市公安局',
    handler: '',
    approvalAuthority: '',
    approvalNo: '',
    reason: '',
    description: '',
    result: ''
  });

  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F5F5F5] overflow-hidden relative">
      {/* 表单内容 */}
      <div className="flex-1 overflow-auto p-3 custom-scrollbar pb-24">
        <div className="w-full">
          <div className="bg-white border border-gray-200 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] overflow-hidden mb-8">
            <div className="bg-[#F8FAFC] px-6 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-sm font-bold text-[#333333] flex items-center">
                <span className="w-1 h-4 bg-[#419EFF] mr-2 rounded-full"></span>
                处罚信息登记
              </h3>
              <button onClick={onCancel} className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <ArrowLeft size={16} className="mr-1.5" /> 返回列表
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                {/* 被处罚单位 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">
                    <span className="text-[#fa5e45] mr-1">*</span>被处罚单位
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      className="w-full h-10 pl-3 pr-10 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                      placeholder="请选择单位"
                      value={formData.punishedUnit}
                      onChange={(e) => setFormData({...formData, punishedUnit: e.target.value})}
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#419EFF]">
                      <Search size={18} />
                    </button>
                  </div>
                </div>

                {/* 处罚日期 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">
                    <span className="text-[#fa5e45] mr-1">*</span>处罚日期
                  </label>
                  <input 
                    type="date" 
                    className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                    value={formData.punishmentDate}
                    onChange={(e) => setFormData({...formData, punishmentDate: e.target.value})}
                  />
                </div>

                {/* 法定代表人 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">法定代表人</label>
                  <input 
                    type="text" 
                    className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                    value={formData.legalRep}
                    onChange={(e) => setFormData({...formData, legalRep: e.target.value})}
                  />
                </div>

                {/* 单位地址 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">单位地址</label>
                  <input 
                    type="text" 
                    className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                {/* 案件名称 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">案件名称</label>
                  <input 
                    type="text" 
                    className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                    value={formData.caseName}
                    onChange={(e) => setFormData({...formData, caseName: e.target.value})}
                  />
                </div>

                {/* 案件编号 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">案件编号</label>
                  <input 
                    type="text" 
                    className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                    value={formData.caseNo}
                    onChange={(e) => setFormData({...formData, caseNo: e.target.value})}
                  />
                </div>

                {/* 处罚文号 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">处罚文号</label>
                  <input 
                    type="text" 
                    className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                    value={formData.punishmentNo}
                    onChange={(e) => setFormData({...formData, punishmentNo: e.target.value})}
                  />
                </div>

                {/* 案件类别 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">案件类别</label>
                  <select 
                    className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] bg-white transition-all"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option>违反经营机动车维修业治安管理规定</option>
                    <option>未按规定如实登记承修车辆信息</option>
                    <option>发现可疑情况未及时报告</option>
                  </select>
                </div>

                {/* 处罚类别 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">处罚类别</label>
                  <select 
                    className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] bg-white transition-all"
                    value={formData.punishmentType}
                    onChange={(e) => setFormData({...formData, punishmentType: e.target.value})}
                  >
                    <option>警告</option>
                    <option>罚款</option>
                    <option>责令停业整顿</option>
                    <option>吊销许可证</option>
                  </select>
                </div>

                {/* 行处情况 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">行处情况</label>
                  <input 
                    type="text" 
                    className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                    value={formData.actionStatus}
                    onChange={(e) => setFormData({...formData, actionStatus: e.target.value})}
                  />
                </div>

                {/* 处罚金额 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">处罚金额(元)</label>
                  <input 
                    type="number" 
                    className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>

                {/* 办案单位 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">办案单位</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      className="w-full h-10 pl-3 pr-10 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                      value={formData.handlingUnit}
                      onChange={(e) => setFormData({...formData, handlingUnit: e.target.value})}
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#419EFF]">
                      <Search size={18} />
                    </button>
                  </div>
                </div>

                {/* 办案人 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">办案人</label>
                  <input 
                    type="text" 
                    className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                    value={formData.handler}
                    onChange={(e) => setFormData({...formData, handler: e.target.value})}
                  />
                </div>

                {/* 批准机关名称 */}
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2"><span className="text-[#fa5e45] mr-1">*</span>批准机关名称</label>
                  <input 
                    type="text" 
                    className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                    value={formData.approvalAuthority}
                    onChange={(e) => setFormData({...formData, approvalAuthority: e.target.value})}
                  />
                </div>

                {/* 场所处罚批准文号 */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#666666] mb-2"><span className="text-[#fa5e45] mr-1">*</span>场所处罚批准文号</label>
                  <input 
                    type="text" 
                    className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all"
                    value={formData.approvalNo}
                    onChange={(e) => setFormData({...formData, approvalNo: e.target.value})}
                  />
                </div>

                {/* 处罚原因简要情况 */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#666666] mb-2"><span className="text-[#fa5e45] mr-1">*</span>处罚原因简要情况</label>
                  <textarea 
                    className="w-full h-24 p-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all resize-none"
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  ></textarea>
                </div>

                {/* 简要案情描述 */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#666666] mb-2"><span className="text-[#fa5e45] mr-1">*</span>简要案情描述</label>
                  <textarea 
                    className="w-full h-24 p-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>

                {/* 处罚结果简要情况 */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#666666] mb-2">处罚结果简要情况</label>
                  <textarea 
                    className="w-full h-24 p-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] focus:ring-1 focus:ring-[#419EFF] transition-all resize-none"
                    value={formData.result}
                    onChange={(e) => setFormData({...formData, result: e.target.value})}
                  ></textarea>
                </div>

                {/* 处罚决定书上传 */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#666666] mb-2">处罚决定书上传</label>
                  <div className="flex items-start space-x-6">
                    <div className="flex-1">
                      <div className="relative group">
                        <input 
                          type="file" 
                          className="hidden" 
                          id="punishment-file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        <label 
                          htmlFor="punishment-file"
                          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-[#419EFF] transition-all"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-400 group-hover:text-[#419EFF]" />
                            <p className="mb-2 text-sm text-gray-500 group-hover:text-[#419EFF]">
                              <span className="font-semibold">点击上传</span> 或拖拽文件
                            </p>
                            <p className="text-xs text-gray-400">支持 JPG, PNG 格式 (最大 5MB)</p>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="w-40 h-40 border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                      {uploadPreview ? (
                        <img src={uploadPreview} alt="Preview" className="w-full h-full object-contain" />
                      ) : (
                        <div className="text-center">
                          <ImageIcon size={32} className="text-gray-300 mx-auto mb-2" />
                          <span className="text-xs text-gray-400">预览图</span>
                        </div>
                      )}
                    </div>
                  </div>
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
