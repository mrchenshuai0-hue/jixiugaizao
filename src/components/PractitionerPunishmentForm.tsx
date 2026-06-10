import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Search, 
  Calendar,
  Save,
  Image as ImageIcon
} from 'lucide-react';
import { PractitionerPunishmentRecord } from '../types';
import { practitionerPunishmentService } from '../services/practitionerPunishmentService';

interface PractitionerPunishmentFormProps {
  id: string | null;
  mode: 'add' | 'edit';
  onClose: () => void;
}

export default function PractitionerPunishmentForm({ id, mode, onClose }: PractitionerPunishmentFormProps) {
  const [formData, setFormData] = useState<Partial<PractitionerPunishmentRecord>>({
    punishedName: '',
    workUnit: '',
    punishmentDate: '',
    caseName: '',
    caseStartDate: '',
    caseNo: '',
    punishmentNo: '',
    gender: '',
    idCard: '',
    birthDate: '',
    ethnic: '',
    education: '研究生及以上',
    householdAddress: '',
    currentAddress: '',
    caseCategory: '违反经营机动维修业治安管理规定',
    punishmentType: '',
    punishmentResult: '',
    punishmentAmount: '',
    handlingUnit: '',
    handlingOfficer: '',
    caseBrief: '',
    caseResult: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && mode === 'edit') {
      const fetchRecord = async () => {
        const data = await practitionerPunishmentService.getById(id);
        if (data) {
          setFormData(data);
        }
      };
      fetchRecord();
    }
  }, [id, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await practitionerPunishmentService.save(formData);
      onClose();
    } catch (err) {
      alert('保存失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      <div className="flex-1 overflow-auto p-3 custom-scrollbar pb-24">
        <div className="w-full space-y-4">
          
          {/* 表单卡片 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex justify-between items-center">
              <h2 className="text-sm font-bold text-[#333333]">从业人员处罚登记信息</h2>
              <button 
                onClick={onClose} 
                className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
              >
                <ArrowLeft size={16} className="mr-1.5" /> 返回列表
              </button>
            </div>
            
            <div className="p-8">
              {/* 基本属性 Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                  <div className="w-1 h-4 bg-[#419EFF] rounded-full"></div>
                  <h3 className="text-sm font-bold text-gray-800">处罚人基本信息</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <span className="text-red-500 mr-1">*</span>被处罚人姓名
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        value={formData.punishedName}
                        onChange={e => setFormData({...formData, punishedName: e.target.value})}
                        className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:border-[#419EFF] outline-none text-sm transition-all" 
                      />
                      <Search size={18} className="absolute right-3 top-2.5 text-[#419EFF]" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <span className="text-red-500 mr-1">*</span>工作单位
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        value={formData.workUnit}
                        onChange={e => setFormData({...formData, workUnit: e.target.value})}
                        className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:border-[#419EFF] outline-none text-sm transition-all" 
                      />
                      <Search size={18} className="absolute right-3 top-2.5 text-[#419EFF]" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">处罚日期</label>
                    <input 
                      type="date" 
                      value={formData.punishmentDate}
                      onChange={e => setFormData({...formData, punishmentDate: e.target.value})}
                      className="w-full h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">性别</label>
                    <input 
                      type="text" 
                      value={formData.gender}
                      onChange={e => setFormData({...formData, gender: e.target.value})}
                      className="w-full h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">证件号码</label>
                    <input 
                      type="text" 
                      value={formData.idCard}
                      onChange={e => setFormData({...formData, idCard: e.target.value})}
                      className="w-full h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none font-mono" 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">出生日期</label>
                    <input 
                      type="date" 
                      value={formData.birthDate}
                      onChange={e => setFormData({...formData, birthDate: e.target.value})}
                      className="w-full h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">民族</label>
                    <input 
                      type="text" 
                      value={formData.ethnic}
                      onChange={e => setFormData({...formData, ethnic: e.target.value})}
                      className="w-full h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">文化程度</label>
                    <select 
                      value={formData.education}
                      onChange={e => setFormData({...formData, education: e.target.value})}
                      className="w-full h-10 px-3 border border-gray-300 rounded text-sm outline-none bg-white"
                    >
                      <option value="研究生及以上">研究生及以上</option>
                      <option value="本科">本科</option>
                      <option value="大专">大专</option>
                      <option value="高中">高中</option>
                      <option value="初中">初中</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">户籍地</label>
                    <input 
                      type="text" 
                      value={formData.householdAddress}
                      onChange={e => setFormData({...formData, householdAddress: e.target.value})}
                      className="w-full h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" 
                    />
                  </div>
                </div>
              </div>

              {/* 案件详细信息 Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                  <div className="w-1 h-4 bg-[#419EFF] rounded-full"></div>
                  <h3 className="text-sm font-bold text-gray-800">处罚及案件详细信息</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">案件编号</label>
                    <input 
                      type="text" 
                      value={formData.caseNo}
                      onChange={e => setFormData({...formData, caseNo: e.target.value})}
                      className="w-full h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">处罚文号</label>
                    <input 
                      type="text" 
                      value={formData.punishmentNo}
                      onChange={e => setFormData({...formData, punishmentNo: e.target.value})}
                      className="w-full h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">案件开始日期</label>
                    <input 
                      type="date" 
                      value={formData.caseStartDate}
                      onChange={e => setFormData({...formData, caseStartDate: e.target.value})}
                      className="w-full h-10 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">案件类别</label>
                    <select 
                      value={formData.caseCategory}
                      onChange={e => setFormData({...formData, caseCategory: e.target.value})}
                      className="w-full h-10 px-3 border border-gray-300 rounded text-sm outline-none bg-white"
                    >
                      <option value="违反经营机动维修业治安管理规定">违反经营机动维修业治安管理规定</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <span className="text-red-500 mr-1">*</span>处罚种类
                    </label>
                    <select 
                      required
                      value={formData.punishmentType}
                      onChange={e => setFormData({...formData, punishmentType: e.target.value})}
                      className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded text-sm outline-none bg-white"
                    >
                      <option value="">请选择</option>
                      <option value="警告">警告</option>
                      <option value="罚款">罚款</option>
                      <option value="没收违法所得">没收违法所得</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <span className="text-red-500 mr-1">*</span>办案单位
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        value={formData.handlingUnit}
                        onChange={e => setFormData({...formData, handlingUnit: e.target.value})}
                        className="w-full h-10 px-3 border border-red-200 bg-red-50/30 rounded focus:border-[#419EFF] outline-none text-sm transition-all" 
                      />
                      <Search size={18} className="absolute right-3 top-2.5 text-[#419EFF]" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">处罚金额</label>
                    <input 
                      type="text" 
                      value={formData.punishmentAmount}
                      onChange={e => setFormData({...formData, punishmentAmount: e.target.value})}
                      className="w-full h-10 px-3 border border-gray-300 rounded text-sm outline-none" 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">办案人</label>
                    <input 
                      type="text" 
                      value={formData.handlingOfficer}
                      onChange={e => setFormData({...formData, handlingOfficer: e.target.value})}
                      className="w-full h-10 px-3 border border-gray-300 rounded text-sm outline-none" 
                    />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-3">
                    <label className="text-sm font-medium text-gray-700">情况描述</label>
                    <textarea 
                      value={formData.caseBrief}
                      onChange={e => setFormData({...formData, caseBrief: e.target.value})}
                      className="w-full h-24 p-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF] resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-3">
                    <label className="text-sm font-medium text-gray-700">案件处理结果</label>
                    <textarea 
                      value={formData.caseResult}
                      onChange={e => setFormData({...formData, caseResult: e.target.value})}
                      className="w-full h-24 p-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* 附件 Section */}
              <div>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                  <div className="w-1 h-4 bg-[#419EFF] rounded-full"></div>
                  <h3 className="text-sm font-bold text-gray-800">证明材料/图片</h3>
                </div>

                <div className="flex gap-12">
                   <div className="flex flex-col gap-4">
                      <button type="button" className="inline-flex items-center px-4 py-2 bg-blue-50 text-[#419EFF] border border-blue-200 hover:bg-blue-100 rounded text-sm font-medium transition-colors">
                        <ImageIcon size={16} className="mr-2" /> 选择上传文件
                      </button>
                      <p className="text-xs text-gray-400">支持 JPG, PNG, PDF 格式</p>
                   </div>
                   <div className="w-40 h-40 border-2 border-dashed border-gray-200 rounded flex items-center justify-center bg-gray-50">
                      <div className="text-center text-gray-300">
                        <ImageIcon size={32} className="mx-auto mb-1 opacity-40" />
                        <span className="text-xs font-bold">证 明 图 片</span>
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
          className="px-10 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-all font-medium active:scale-95"
        >
          取消
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`px-12 py-2.5 bg-[#419EFF] text-white rounded-md hover:bg-blue-600 transition-all font-medium shadow-md shadow-blue-200 active:scale-95 flex items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? '正在保存...' : (
            <>
              <Save size={18} className="mr-2" /> 确认保存
            </>
          )}
        </button>
      </div>
    </div>
  );
}
