import React, { useState } from 'react';
import { Send, Reply, Upload, CheckCircle2, AlertCircle, FileText, X } from 'lucide-react';

interface SupervisionStep {
  title: string;
  time?: string;
  operator?: string;
  content?: string;
  status: 'completed' | 'current' | 'pending';
  attachments?: string[];
}

interface DoubleCheckSupervisionProps {
  onClose?: () => void;
  isModal?: boolean;
  defaultStarted?: boolean;
  readOnly?: boolean;
  initMode?: boolean;
}

export default function DoubleCheckSupervision({ 
  onClose, 
  isModal, 
  defaultStarted = false,
  readOnly = false,
  initMode = false
}: DoubleCheckSupervisionProps) {
  const [isSupervisionStarted, setIsSupervisionStarted] = useState(defaultStarted);
  const [currentStep, setCurrentStep] = useState(defaultStarted ? 1 : 0); // 0: 发起/下发, 1: 反馈, 2: 确认
  const [showModal, setShowModal] = useState<string | null>(initMode && !defaultStarted ? 'init' : null);

  const steps: SupervisionStep[] = [
    {
      title: '督办发起与下发',
      time: isSupervisionStarted ? '2024-04-27 10:00' : undefined,
      operator: isSupervisionStarted ? '张警官' : undefined,
      content: isSupervisionStarted ? '对此案启动一案双查程序，下发至城南派出所督办落实。' : '尚未发起',
      status: isSupervisionStarted ? (currentStep > 0 ? 'completed' : 'current') : 'pending'
    },
    {
      title: '督办反馈',
      time: currentStep >= 1 ? '2024-04-27 15:30' : undefined,
      operator: currentStep >= 1 ? '王所长' : undefined,
      content: currentStep >= 1 ? '已收悉，已对相关责任人进行谈话提醒，并落实整改措施。' : '等待接收单位反馈',
      status: currentStep >= 1 ? (currentStep > 1 ? 'completed' : 'current') : 'pending',
      attachments: currentStep >= 1 ? ['整改报告.pdf'] : []
    },
    {
      title: '督办确认',
      time: currentStep >= 2 ? '2024-04-27 16:45' : undefined,
      operator: currentStep >= 2 ? '刘大队长' : undefined,
      content: currentStep >= 2 ? '核实整改到位，同意结案。' : '等待监督单位确认',
      status: currentStep >= 2 ? 'completed' : 'pending'
    }
  ];

  const handleStart = () => {
    setIsSupervisionStarted(true);
    setCurrentStep(0);
    setShowModal(null);
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 2));
    setShowModal(null);
  };

  if (initMode && !isSupervisionStarted) {
    const initForm = (
      <div className={`bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col ${isModal ? '' : 'border border-gray-200'}`}>
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h4 className="font-bold text-gray-800">发起一案双查督办</h4>
          {onClose && <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>}
        </div>
        <div className="p-6 space-y-4 text-left">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">督办目标单位</label>
            <select className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]">
              <option>城南派出所</option>
              <option>城北派出所</option>
              <option>马尾派出所</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">督办说明</label>
            <textarea 
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF] h-24 resize-none"
              placeholder="请输入督办要求和重点..."
            />
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 text-left">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">取消</button>
          <button onClick={handleStart} className="px-4 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors">确认下发</button>
        </div>
      </div>
    );

    if (isModal) {
      return (
        <div className="fixed inset-0 z-[105] bg-black/50 flex items-center justify-center p-4">
          {initForm}
        </div>
      );
    }
    return initForm;
  }

  const content = (
    <div className={`bg-white ${isModal ? 'rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative' : 'rounded-lg shadow-sm border border-gray-200 overflow-hidden relative'}`}>
      <div className={`px-6 py-4 border-b border-gray-100 flex justify-between items-center ${isSupervisionStarted ? 'bg-[#e8f0fc]' : 'bg-orange-50'}`}>
        <h3 className={`text-sm font-bold flex items-center gap-2 ${isSupervisionStarted ? 'text-[#333333]' : 'text-orange-800'}`}>
          {isSupervisionStarted ? (
            <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
          ) : (
            <AlertCircle size={16} />
          )}
          一案双查督办 {isSupervisionStarted && '流转记录'}
        </h3>
        <div className="flex gap-2">
          {!isSupervisionStarted ? (
            !readOnly && (
              <button 
                onClick={() => setShowModal('init')}
                className="px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition-colors"
              >
                发起督办
              </button>
            )
          ) : (
            <>
              {!readOnly && (
                <>
                  {currentStep === 0 && (
                    <button 
                      onClick={() => setShowModal('feedback')}
                      className="px-3 py-1 bg-[#419EFF] text-white text-xs rounded hover:bg-blue-600 flex items-center"
                    >
                      <Reply size={14} className="mr-1" /> 反馈回复
                    </button>
                  )}
                  {currentStep === 1 && (
                    <button 
                      onClick={() => setShowModal('confirm')}
                      className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 flex items-center"
                    >
                      <CheckCircle2 size={14} className="mr-1" /> 督办确认
                    </button>
                  )}
                </>
              )}
              <span className={`px-2 py-1 text-[10px] font-bold rounded ${currentStep === 2 ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                {currentStep === 2 ? '督办完成' : '督办进行中'}
              </span>
            </>
          )}
          {isModal && onClose && (
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400 ml-2">
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="p-6 flex-1 overflow-auto custom-scrollbar">
        {!isSupervisionStarted ? (
          <div className="p-8 text-center text-gray-400 text-sm italic">
            该案件尚未开启“一案双查”督办程序
          </div>
        ) : (
          <div className="relative pl-8 border-l-2 border-gray-100 space-y-8 ml-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`absolute -left-[41px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-green-500 text-white' : 
                  step.status === 'current' ? 'bg-[#419EFF] text-white animate-pulse' : 
                  'bg-gray-200 text-gray-400'
                }`}>
                  {step.status === 'completed' ? <CheckCircle2 size={12} /> : (index + 1)}
                </div>
                
                <div className={`p-4 rounded-lg border ${
                  step.status === 'current' ? 'bg-blue-50/50 border-blue-100' : 'bg-gray-50/30 border-transparent'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className={`text-sm font-bold ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-800'}`}>{step.title}</h4>
                    {step.time && <span className="text-[10px] text-gray-400 font-mono">{step.time}</span>}
                  </div>
                  <p className={`text-xs ${step.status === 'pending' ? 'text-gray-300 italic' : 'text-gray-600'}`}>
                    {step.content}
                  </p>
                  {step.operator && (
                    <div className="mt-3 flex items-center text-[10px] text-gray-500">
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded mr-2">操作人: {step.operator}</span>
                    </div>
                  )}
                  {step.attachments && step.attachments.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.attachments.map((file, i) => (
                        <div key={i} className="flex items-center px-2 py-1 bg-white border border-gray-200 rounded text-[10px] text-[#419EFF] cursor-pointer hover:bg-blue-50">
                          <FileText size={12} className="mr-1" />
                          {file}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal === 'init' && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-[50] p-4 text-left">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h4 className="font-bold text-gray-800">发起一案双查督办</h4>
              <button onClick={() => setShowModal(null)}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
            </div>
            <div className="p-6 space-y-4 text-left">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">督办目标单位</label>
                <select className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF]">
                  <option>城南派出所</option>
                  <option>城北派出所</option>
                  <option>马尾派出所</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">督办说明</label>
                <textarea 
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF] h-24 resize-none"
                  placeholder="请输入督办要求和重点..."
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 text-left">
              <button onClick={() => setShowModal(null)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">取消</button>
              <button onClick={handleStart} className="px-4 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors">确认下发</button>
            </div>
          </div>
        </div>
      )}

      {showModal === 'feedback' && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-[50] p-4 text-left">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h4 className="font-bold text-gray-800">反馈督办结果</h4>
              <button onClick={() => setShowModal(null)}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
            </div>
            <div className="p-6 space-y-4 text-left">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">反馈内容</label>
                <textarea 
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF] h-24 resize-none"
                  placeholder="请输入核实及整改情况回馈..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">附件上传</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-gray-400">
                  <Upload size={24} className="mb-2" />
                  <span className="text-xs">点击或拖拽文件上传</span>
                  <span className="text-[10px] mt-1">支持 PDF, JPG, PNG (Max 10MB)</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 text-left">
              <button onClick={() => setShowModal(null)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">取消</button>
              <button onClick={handleNext} className="px-4 py-2 bg-[#419EFF] text-white text-sm rounded hover:bg-blue-600 transition-colors">提交回复</button>
            </div>
          </div>
        </div>
      )}

      {showModal === 'confirm' && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-[50] p-4 text-left">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h4 className="font-bold text-gray-800">督办结案确认</h4>
              <button onClick={() => setShowModal(null)}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
            </div>
            <div className="p-6 text-left">
              <p className="text-sm text-gray-600 mb-6">您是否已经核实该案例的整改反馈？确认后督办流程将正式结案并归档。</p>
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700 block mb-1">确认说明</label>
                <textarea 
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded text-sm outline-none focus:border-[#419EFF] h-20 resize-none"
                  placeholder="请输入结案核实意见..."
                  defaultValue="情况属实，整改到位，准予结案。"
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 text-left">
              <button onClick={() => setShowModal(null)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">取消</button>
              <button onClick={handleNext} className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">确认结案</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-[105] bg-black/50 flex items-center justify-center p-4">
        {content}
      </div>
    );
  }

  return <section className="mt-4">{content}</section>;
}
