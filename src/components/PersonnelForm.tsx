import React, { useState } from 'react';
import { ArrowLeft, Save, Upload, User, Camera, Search, X } from 'lucide-react';
import FloatingFormNavigation from './FloatingFormNavigation';

interface PersonnelFormProps {
  id: string | null;
  onCancel: () => void;
  onSave: () => void;
}

export default function PersonnelForm({ id, onCancel, onSave }: PersonnelFormProps) {
  const isEdit = !!id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const personType = 'domestic';

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'personnel-basic', label: '人员基本信息' }
  ];

  const handleSave = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSave();
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      {/* 主体内容区 */}
      <div ref={scrollContainerRef} className="flex-1 overflow-auto p-3 custom-scrollbar pb-24">
        <div className="w-full space-y-6">
          
          {/* 分组1：人员基本信息 */}
          <div id="personnel-basic" className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-[#F8FAFC] flex justify-between items-center">
              <h2 className="text-base font-bold text-[#333333] border-l-4 border-[#419EFF] pl-3">人员基本信息</h2>
              <button onClick={onCancel} className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <ArrowLeft size={16} className="mr-1.5" /> 返回列表
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* 左侧表单字段 */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
                    {/* Row 1: 所属企业、姓名、证件 */}
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1.5 flex items-center">
                        <span className="text-[#fa5e45] mr-1">*</span>所属企业
                        <div className="ml-auto flex space-x-2">
                           <button className="text-[#419EFF] hover:underline flex items-center text-xs"><Search size={12} className="mr-1" />选择</button>
                           <button className="text-gray-400 hover:text-red-500 flex items-center text-xs"><X size={12} className="mr-1" />清除</button>
                        </div>
                      </label>
                      <input type="text" className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] transition-colors" placeholder="请选择所属企业" defaultValue={isEdit ? '福州市鼓楼区安达汽车维修服务部' : ''} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1.5 flex items-center">
                        <span className="text-[#fa5e45] mr-1">*</span>人员姓名
                      </label>
                      <input type="text" className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] transition-colors" placeholder="请输入姓名" defaultValue={isEdit ? '张三' : ''} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1.5 flex items-center">
                        <span className="text-[#fa5e45] mr-1">*</span>证件号码
                      </label>
                      <input type="text" className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] transition-colors font-mono" placeholder="请输入证件号码" defaultValue={isEdit ? '350102199001011234' : ''} />
                    </div>

                    {/* Row 2: 性别、出生日期、民族 */}
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1.5">性别</label>
                      <div className="flex items-center space-x-6 h-9">
                        <label className="flex items-center cursor-pointer">
                          <input type="radio" name="gender" className="mr-2 text-[#419EFF] focus:ring-[#419EFF]" defaultChecked={isEdit} />
                          <span className="text-sm text-[#333333]">男</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input type="radio" name="gender" className="mr-2 text-[#419EFF] focus:ring-[#419EFF]" />
                          <span className="text-sm text-[#333333]">女</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1.5 flex items-center">
                        <span className="text-[#fa5e45] mr-1">*</span>出生日期
                      </label>
                      <input type="date" className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] transition-colors" defaultValue={isEdit ? '1990-01-01' : ''} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1.5">民族</label>
                      <select className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-sm">
                        <option>汉族</option>
                        <option>回族</option>
                        <option>满族</option>
                      </select>
                    </div>

                    {/* Row 3: 联系电话、工种、居住证号 */}
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1.5 flex items-center">
                        <span className="text-[#fa5e45] mr-1">*</span>联系电话
                      </label>
                      <input type="text" className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] transition-colors" placeholder="请输入手机号" defaultValue={isEdit ? '13800138000' : ''} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1.5">工种</label>
                      <select className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-sm">
                        <option>机修工</option>
                        <option>电工</option>
                        <option>钣金工</option>
                        <option>漆工</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1.5">居住证号</label>
                      <input type="text" className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] transition-colors" placeholder="请输入居住证号" />
                    </div>

                    {/* Row 4: 户籍所在地、户籍详址、现住地址放一排 */}
                    {personType === 'domestic' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-[#333333] mb-1.5 flex items-center">
                            <span className="text-[#fa5e45] mr-1">*</span>户籍所在地
                            <button className="ml-auto text-[#419EFF] hover:underline flex items-center text-xs"><Search size={12} className="mr-1" />选择</button>
                          </label>
                          <input type="text" className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] transition-colors" placeholder="请选择户籍所在地" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#333333] mb-1.5">户籍地址</label>
                          <input type="text" className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] transition-colors" placeholder="请输入户籍详细地址" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#333333] mb-1.5">现住地址</label>
                          <input type="text" className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] transition-colors" placeholder="请输入现住地址" />
                        </div>
                      </>
                    ) : (
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-[#333333] mb-1.5">现住地址</label>
                        <input type="text" className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] transition-colors" placeholder="请输入现住地址" />
                      </div>
                    )}

                    {/* Row 5: 从业状态、入职时间放一排（与离职时间一起） */}
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1.5">从业状态</label>
                      <select className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white text-sm" defaultValue={isEdit ? '在职' : '在职'}>
                        <option>在职</option>
                        <option>离职</option>
                        <option>休假</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1.5 flex items-center">
                        <span className="text-[#fa5e45] mr-1">*</span>入职时间
                      </label>
                      <input type="date" className="w-full h-9 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] transition-colors" defaultValue="2026-04-14" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1.5">离职时间</label>
                      <input type="date" className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] transition-colors" />
                    </div>

                    {isEdit && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-[#333333] mb-1.5">登记人</label>
                          <input type="text" disabled className="w-full h-9 px-3 border border-gray-200 bg-gray-50 rounded text-gray-400 text-sm font-medium cursor-not-allowed" defaultValue="系统管理员" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#333333] mb-1.5">登记时间</label>
                          <input type="text" disabled className="w-full h-9 px-3 border border-gray-200 bg-gray-50 rounded text-gray-400 text-sm font-medium cursor-not-allowed" defaultValue="2026-03-15 14:22:10" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#333333] mb-1.5">修改人</label>
                          <input type="text" disabled className="w-full h-9 px-3 border border-gray-200 bg-gray-50 rounded text-gray-400 text-sm font-medium cursor-not-allowed" defaultValue="系统管理员" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#333333] mb-1.5">变更时间</label>
                          <input type="text" disabled className="w-full h-9 px-3 border border-gray-200 bg-gray-50 rounded text-gray-400 text-sm font-medium cursor-not-allowed" defaultValue="2026-05-24 09:59:00" />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 右侧照片上传 */}
                <div className="shrink-0 flex flex-col items-center lg:w-48">
                  <div className="w-36 h-48 bg-gray-50 border border-gray-300 rounded flex flex-col items-center justify-center text-gray-400 hover:border-[#419EFF] hover:bg-blue-50 transition-colors cursor-pointer group relative overflow-hidden">
                    <User size={48} className="mb-2 group-hover:text-[#419EFF] opacity-20" />
                    <span className="text-xs group-hover:text-[#419EFF]">人员照片</span>
                  </div>
                  <div className="mt-4 flex space-x-2 w-full">
                    <button className="flex-1 h-8 bg-white border border-gray-300 text-xs text-[#333333] rounded hover:bg-gray-50">选择文件</button>
                    <button className="flex-1 h-8 bg-white border border-gray-300 text-xs text-[#333333] rounded hover:bg-gray-50">清除</button>
                  </div>
                  <p className="mt-2 text-[10px] text-[#999999] text-center">未选择任何文件</p>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>

      <FloatingFormNavigation scrollContainerRef={scrollContainerRef} items={navItems} />

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
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-sm font-medium disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                保存中...
              </span>
            ) : (
              <>
                <Save size={16} className="mr-1.5" />
                保存
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

