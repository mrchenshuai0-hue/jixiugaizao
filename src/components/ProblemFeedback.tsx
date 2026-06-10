import React from 'react';
import { Save, ArrowLeft } from 'lucide-react';

export default function ProblemFeedback() {
  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] overflow-hidden font-sans">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">
              问题反馈
            </h2>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6 flex justify-center">
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full max-w-[800px] flex flex-col h-fit">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc] flex items-center">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
              内容填写
            </h3>
          </div>
          <div className="p-8 pb-4">
              <div className="flex flex-col gap-2 text-left">
                <span className="text-sm font-medium text-gray-700">问题反馈描述<span className="text-red-500 ml-1">*</span></span>
                <textarea 
                  className="w-full h-[300px] bg-white border border-gray-300 rounded p-3 text-sm outline-none focus:border-blue-500 resize-none text-gray-700 shadow-sm placeholder-gray-400"
                  placeholder="请输入您要反馈的问题，我们将有客服人员进行对接！"
                ></textarea>
              </div>
          </div>
          <div className="p-6 flex justify-center border-t border-gray-100 bg-gray-50/50 mt-4 rounded-b">
              <button className="px-8 py-2.5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium flex items-center gap-2 shadow-sm">
                <Save size={16} /> 保存反馈信息
              </button>
          </div>
        </section>
      </div>
    </div>
  );
}
