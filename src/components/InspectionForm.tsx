import React, { useState } from 'react';
import { Search, X, Save, FileText, Camera, ArrowLeft } from 'lucide-react';

interface InspectionFormProps {
  onCancel: () => void;
  onSave: () => void;
}

export default function InspectionForm({ onCancel, onSave }: InspectionFormProps) {
  const [inspectionDate, setInspectionDate] = useState(new Date().toISOString().split('T')[0]);
  const [inspectionMethod, setInspectionMethod] = useState('例查');
  const [inspectionSituation, setInspectionSituation] = useState('正常');
  const [isDeduction, setIsDeduction] = useState(false);
  
  const inspectionItems = [
    { id: 1, title: '一、企业备案信息', desc: '经营资质不合法，证、照不齐全' },
    { id: 2, title: '二、从业人员信息', desc: '未如实登记从业人员信息' },
    { id: 3, title: '三、企业在修车辆列表', desc: '未如实登记承修机动车车辆号牌、车型、发动机号码、车架号码、厂牌型号、车身颜色、修理部位，未及时录入机动车修理业治安管理信息系统并上传' },
    { id: 4, title: '四、企业本月上传情况', desc: '未严格查验送修人、取车人证件，如实登记姓名、身份证号码和联系电话，未及时录入机动车修理业治安管理信息系统并上传' },
    { id: 5, title: '五、企业本月上传情况', desc: '未如实登记承修机动车修理项目，未及时录入机动车修理业治安管理信息系统并上传' },
    { id: 6, title: '六、企业本月上传情况', desc: '未及时提取承修事故车辆照片，未及时录入机动车修理业治安管理信息系统并上传' },
    { id: 7, title: '七、未建立保管制度和可疑情况的报告制度', desc: '' },
    { id: 8, title: '八、存在其他违规违法行为', desc: '' },
  ];

  const [violations, setViolations] = useState<number[]>([]);

  const toggleViolation = (id: number) => {
    if (violations.includes(id)) {
      setViolations(violations.filter(v => v !== id));
    } else {
      setViolations([...violations, id]);
      setInspectionSituation('发现问题');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <div className="flex-1 overflow-auto p-3 custom-scrollbar pb-20">
        <div className="w-full bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-[#F8FAFC] flex justify-between items-center">
            <h2 className="text-base font-bold text-[#333333] border-l-4 border-[#419EFF] pl-3">行政检查登记</h2>
            <button onClick={onCancel} className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
              <ArrowLeft size={16} className="mr-1.5" /> 返回列表
            </button>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {/* 基本信息 */}
              <div className="grid grid-cols-1 gap-y-3">
                <div className="flex items-center">
                  <label className="w-24 text-sm text-[#333333]"><span className="text-[#fa5e45] mr-1">*</span>公司名称：</label>
                  <div className="flex-1 flex items-center">
                    <div className="relative flex-1">
                      <input type="text" className="w-full h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" placeholder="请选择公司" />
                      <div className="absolute right-2 top-1.5 flex space-x-1">
                        <X size={14} className="text-red-400 cursor-pointer" />
                        <Search size={14} className="text-[#419EFF] cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-24 text-sm text-[#333333]"><span className="text-[#fa5e45] mr-1">*</span>检查人员：</label>
                  <div className="flex-1 relative">
                    <input type="text" className="w-full h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" placeholder="请选择检查人员" />
                    <Search size={14} className="absolute right-2 top-2 text-[#419EFF] cursor-pointer" />
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-24 text-sm text-[#333333]"><span className="text-[#fa5e45] mr-1">*</span>检查日期：</label>
                  <input 
                    type="date" 
                    value={inspectionDate}
                    onChange={(e) => setInspectionDate(e.target.value)}
                    className="flex-1 h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" 
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-24 text-sm text-[#333333]"><span className="text-[#fa5e45] mr-1">*</span>检查单位：</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" defaultValue="福州市公安局鼓楼分局" />
                </div>

                <div className="flex items-center">
                  <label className="w-24 text-sm text-[#333333]"><span className="text-[#fa5e45] mr-1">*</span>检查方式：</label>
                  <div className="flex items-center space-x-4 text-sm">
                    {['例查', '暗访', '联查', '双随机检查'].map(method => (
                      <label key={method} className="flex items-center cursor-pointer">
                        <input 
                          type="radio" 
                          name="method" 
                          checked={inspectionMethod === method}
                          onChange={() => setInspectionMethod(method)}
                          className="mr-1.5 text-[#419EFF]" 
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-24 text-sm text-[#333333]"><span className="text-[#fa5e45] mr-1">*</span>检查情况：</label>
                  <div className="flex items-center space-x-4 text-sm">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="situation" 
                        checked={inspectionSituation === '发现问题'}
                        onChange={() => setInspectionSituation('发现问题')}
                        className="mr-1.5 text-[#419EFF]" 
                      />
                      <span>发现问题</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="situation" 
                        checked={inspectionSituation === '正常'}
                        onChange={() => setInspectionSituation('正常')}
                        className="mr-1.5 text-[#419EFF]" 
                      />
                      <span>正常</span>
                    </label>
                    {inspectionSituation === '发现问题' && (
                      <span className="text-[#fa5e45] text-xs">*如果检查情况为发现问题，请至少选择一项违反项目。</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-24 text-sm text-[#333333]">是否扣分：</label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isDeduction}
                      onChange={(e) => setIsDeduction(e.target.checked)}
                      className="mr-1.5 text-[#419EFF]" 
                    />
                    <span className="text-sm text-[#fa5e45]">*按发现问题扣除相应分数。</span>
                  </label>
                </div>

                <div className="flex items-start">
                  <label className="w-24 text-sm text-[#333333] pt-1">检查照片：</label>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <button className="h-8 px-4 bg-white border border-gray-300 text-xs text-[#333333] rounded hover:bg-gray-50 flex items-center">选择文件</button>
                      <span className="text-xs text-[#999999]">未选择任何文件</span>
                    </div>
                    <div className="w-40 h-40 bg-gray-50 border border-gray-200 rounded flex flex-col items-center justify-center text-[#999999]">
                      <Camera size={48} className="mb-2 opacity-20" />
                      <span className="text-2xl font-bold opacity-20">图 片</span>
                    </div>
                    <div className="mt-2 text-xs text-[#999999]">图片预览:</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <label className="w-24 text-sm text-[#333333] pt-1">备注描述：</label>
                  <textarea className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" rows={3}></textarea>
                </div>
              </div>

              {/* 检查项目表格 */}
              <div className="mt-8">
                <div className="text-center text-sm font-bold text-[#fa5e45] mb-2">检查项目</div>
                <table className="w-full border-collapse border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left font-medium text-[#333333]">项目描述</th>
                      <th className="border border-gray-200 px-4 py-2 text-center font-medium text-[#333333] w-24">是否违反</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspectionItems.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="border border-gray-200 px-4 py-2">
                          <div className="font-medium text-[#333333]">{item.title}</div>
                          {item.desc && <div className="text-[#666666] mt-0.5">{item.desc}</div>}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-center">
                          <input 
                            type="checkbox" 
                            checked={violations.includes(item.id)}
                            onChange={() => toggleViolation(item.id)}
                            className="w-4 h-4 text-[#419EFF] rounded border-gray-300 focus:ring-[#419EFF]" 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-end shadow-sm z-20">
        <div className="flex space-x-3">
          <button onClick={onCancel} className="px-6 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors text-sm font-medium">取消</button>
          <button onClick={onSave} className="px-6 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium">
            <Save size={16} className="mr-1.5" /> 保存
          </button>
        </div>
      </div>
    </div>
  );
}
