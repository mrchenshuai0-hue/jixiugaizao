import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Save, Calendar } from 'lucide-react';
import { api } from '../api';
import { ViolationManagementRecord } from '../types';

interface ViolationManagementFormProps {
  id: string | null;
  mode: 'add' | 'edit' | 'audit';
  onClose: () => void;
}

export default function ViolationManagementForm({ id, mode, onClose }: ViolationManagementFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<ViolationManagementRecord>>({
    region: '北京市-北京市公安局',
    companyName: '',
    enterpriseId: '',
    registrar: 'admin',
    occurrenceTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
    violator: '',
    caseNo: '',
    isInvestigated: mode === 'audit' ? '是' : '否',
    description: '',
    caseType: '',
    caseName: '',
    caseTime: '',
    caseLocation: '',
    deaths: 0,
    injuries: 0,
    propertyValue: '0',
    perpetrators: 0,
    briefCase: '',
    filingTime: '',
    caseOfficers: '',
    filingUnit: '',
    processingResult: '',
    auditOfficer: 'admin北京市公安厅',
    auditTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.violationManagement.getById(id).then(record => {
        if (record) {
          setFormData(record);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.violationManagement.save({
        ...formData,
        isInvestigated: mode === 'audit' ? '是' : (formData.isInvestigated || '否')
      });
      onClose();
    } catch (error) {
      alert('保存失败');
    } finally {
      setLoading(false);
    }
  };

  const handleLookupCase = () => {
    alert('正在从警综平台检索案件信息...');
    // Mock lookup
    if (!formData.caseNo) {
      alert('请先输入案件编号');
      return;
    }
    setFormData(prev => ({
      ...prev,
      caseName: '自动匹配的案件名称',
      caseType: '刑事案件',
      caseTime: '2026-06-01 10:00:00',
      caseLocation: '北京市海淀区某路某号',
      briefCase: '自动填写的简要案情内容...'
    }));
  };

  if (loading && id) return <div className="flex items-center justify-center h-full text-gray-500">加载中...</div>;

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      <div className="flex-1 overflow-auto p-3 custom-scrollbar pb-24">
        <div className="w-full flex justify-between items-center bg-white px-5 py-3 border-b border-gray-200 rounded-t-lg shadow-sm shrink-0 z-10">
            <h2 className="text-xl font-bold text-gray-800">违法违规查处信息</h2>
            <button 
              onClick={onClose} 
              className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
            >
              <ArrowLeft size={16} className="mr-1.5" /> 返回列表
            </button>
        </div>

        <div className="w-full flex flex-col gap-6 p-6">
          {/* 基本信息 Section */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[150px]">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                违法违规基本信息
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">企业编码</label>
                  <div className="h-9 px-3 bg-gray-50 border border-gray-200 rounded flex items-center text-sm text-gray-600">
                    {formData.enterpriseId}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">违法违规单位/人员</label>
                  <div className="h-9 px-3 bg-gray-50 border border-gray-200 rounded flex items-center text-sm text-gray-600">
                    {formData.violator}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">发生时间</label>
                  <div className="h-9 px-3 bg-gray-50 border border-gray-200 rounded flex items-center text-sm text-gray-600">
                    {formData.occurrenceTime}
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:col-span-3">
                  <label className="text-sm font-medium text-gray-700">情况描述</label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600 leading-relaxed min-h-[60px]">
                    {formData.description}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 警综平台案件信息 Section */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[150px]">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center justify-between">
               <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                关联警综平台案件
              </h3>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span>案件编号
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formData.caseNo} 
                      onChange={e => setFormData({ ...formData, caseNo: e.target.value })}
                      placeholder="请输入或点图标检索"
                      className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:border-[#419EFF] outline-none text-sm transition-all" 
                    />
                    <Search 
                      size={18} 
                      className="absolute right-3 top-2 text-[#419EFF] cursor-pointer hover:scale-110 transition-transform" 
                      onClick={handleLookupCase} 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">案件名称</label>
                  <input 
                    type="text" 
                    value={formData.caseName} 
                    onChange={e => setFormData({ ...formData, caseName: e.target.value })}
                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">案件类型</label>
                  <input 
                    type="text" 
                    value={formData.caseType} 
                    onChange={e => setFormData({ ...formData, caseType: e.target.value })}
                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">案发时间</label>
                  <input 
                    type="text" 
                    value={formData.caseTime} 
                    onChange={e => setFormData({ ...formData, caseTime: e.target.value })}
                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">案发地点</label>
                  <input 
                    type="text" 
                    value={formData.caseLocation} 
                    onChange={e => setFormData({ ...formData, caseLocation: e.target.value })}
                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:border-[#419EFF] outline-none" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">受伤人数</label>
                  <input 
                    type="number" 
                    value={formData.injuries} 
                    onChange={e => setFormData({ ...formData, injuries: parseInt(e.target.value) || 0 })}
                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm outline-none" 
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">死亡人数</label>
                  <input 
                    type="number" 
                    value={formData.deaths} 
                    onChange={e => setFormData({ ...formData, deaths: parseInt(e.target.value) || 0 })}
                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm outline-none" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">涉案价值 (万元)</label>
                  <input 
                    type="text" 
                    value={formData.propertyValue} 
                    onChange={e => setFormData({ ...formData, propertyValue: e.target.value })}
                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm outline-none" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">主办单位</label>
                  <input 
                    type="text" 
                    value={formData.filingUnit} 
                    onChange={e => setFormData({ ...formData, filingUnit: e.target.value })}
                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm outline-none" 
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-3">
                  <label className="text-sm font-medium text-gray-700">简要案情</label>
                  <textarea 
                    value={formData.briefCase} 
                    onChange={e => setFormData({ ...formData, briefCase: e.target.value })}
                    className="w-full h-32 p-3 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF] resize-none" 
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-3">
                  <label className="text-sm font-medium text-gray-700">处理结果</label>
                  <textarea 
                    value={formData.processingResult} 
                    onChange={e => setFormData({ ...formData, processingResult: e.target.value })}
                    placeholder="请输入最终查处及处罚结果..."
                    className="w-full h-24 p-3 border border-red-100 bg-red-50/10 rounded text-sm outline-none focus:border-red-400 resize-none" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">查处人员</label>
                  <input 
                    type="text" 
                    value={formData.auditOfficer} 
                    onChange={e => setFormData({ ...formData, auditOfficer: e.target.value })}
                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm outline-none" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">查处时间</label>
                  <input 
                    type="text" 
                    value={formData.auditTime} 
                    onChange={e => setFormData({ ...formData, auditTime: e.target.value })}
                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm outline-none" 
                  />
                </div>
              </div>
            </div>
          </section>
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
