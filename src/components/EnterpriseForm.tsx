import React, { useState } from 'react';
import { ArrowLeft, Save, Upload, MapPin, AlertCircle, Search, Image as ImageIcon } from 'lucide-react';

interface EnterpriseFormProps {
  id: string | null; // null means Add, string means Edit
  onCancel: () => void;
  onSave: () => void;
}

export default function EnterpriseForm({ id, onCancel, onSave }: EnterpriseFormProps) {
  const isEdit = !!id;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSave();
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      <div className="flex-1 overflow-auto p-3 custom-scrollbar pb-24">
        <div className="w-full space-y-6">
          
          {isEdit && (
            <div className="bg-[#ffc23e]/10 border border-[#ffc23e]/30 rounded-lg p-4 flex items-start">
              <AlertCircle className="text-[#ffc23e] mr-3 shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-sm font-bold text-[#ffc23e]">修改信息提示</h3>
                <p className="text-sm text-[#666666] mt-1">
                  您正在修改已备案的企业信息。点击保存后，不会直接修改原数据，而是生成一条修改申请，进入“企业信息修改审核”流程，等待上级审核。
                </p>
              </div>
            </div>
          )}

          {!isEdit && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
              <AlertCircle className="text-blue-500 mr-3 shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-sm font-bold text-blue-700">新增登记提示</h3>
                <p className="text-sm text-[#666666] mt-1">
                  新增的企业初始状态为<span className="font-bold text-[#fa5e45] mx-1">歇业</span>。企业需使用初始账号登录企业端，将信息填写完整并提交备案后，方可激活为正常营业状态。
                </p>
              </div>
            </div>
          )}

          {/* 企业基本信息 */}
          <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-[#e8f0fc] flex justify-between items-center">
              <h2 className="text-sm font-bold text-[#333333]">企业基本信息</h2>
              <button onClick={onCancel} className="px-4 py-2 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <ArrowLeft size={16} className="mr-1.5" /> 返回列表
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {/* 企业所管辖区 */}
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">
                    <span className="text-[#fa5e45] mr-1">*</span>企业所管辖区
                  </label>
                  <div className="flex-1 relative">
                    <input type="text" className="w-full h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" defaultValue="北京市-北京市公安局" />
                    <Search size={14} className="absolute right-2 top-2 text-gray-400 cursor-pointer hover:text-[#419EFF]" />
                  </div>
                </div>

                {/* 公司名称 */}
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">
                    <span className="text-[#fa5e45] mr-1">*</span>公司名称
                  </label>
                  <input type="text" className="flex-1 h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>

                {/* 招牌名称 */}
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">
                    <span className="text-[#fa5e45] mr-1">*</span>招牌名称
                  </label>
                  <input type="text" className="flex-1 h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>

                {/* 注册地址 */}
                <div className="flex items-center md:col-span-2">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">
                    <span className="text-[#fa5e45] mr-1">*</span>注册地址
                  </label>
                  <input type="text" className="w-1/2 h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>

                {/* 标准地址名称 */}
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">
                    <span className="text-[#fa5e45] mr-1">*</span>标准地址名称
                  </label>
                  <div className="flex-1 relative">
                    <input type="text" className="w-full h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                    <Search size={14} className="absolute right-2 top-2 text-gray-400 cursor-pointer hover:text-[#419EFF]" />
                  </div>
                </div>
                <div className="hidden md:block"></div>

                {/* 标准地址编码 */}
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">
                    <span className="text-[#fa5e45] mr-1">*</span>标准地址编码
                  </label>
                  <input type="text" className="flex-1 h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="hidden md:block"></div>

                {/* 企业类别 & 企业等级 */}
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">企业类别</label>
                  <select className="flex-1 h-8 px-2 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm bg-white">
                    <option value="">请选择</option>
                    <option value="一类维修">一类维修</option>
                    <option value="二类维修">二类维修</option>
                    <option value="三类维修">三类维修</option>
                    <option value="摩托车维修">摩托车维修</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">企业等级</label>
                  <select className="flex-1 h-8 px-2 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm bg-white">
                    <option value="">请选择</option>
                    <option value="AAA">AAA</option>
                    <option value="AA">AA</option>
                    <option value="A">A</option>
                  </select>
                </div>

                {/* 坐标经度 & 坐标纬度 */}
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">坐标经度</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">坐标纬度</label>
                  <div className="flex-1 flex space-x-2">
                    <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                    <button className="px-3 h-8 border border-gray-300 rounded text-sm text-[#666666] hover:bg-gray-50 whitespace-nowrap">查看地图位置</button>
                  </div>
                </div>

                {/* 经济类型 */}
                <div className="flex items-center md:col-span-2">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">经济类型</label>
                  <div className="flex space-x-2 w-full md:w-1/2">
                    <select className="flex-1 h-8 px-2 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm bg-white">
                      <option value="内资">内资</option>
                      <option value="国有全资">国有全资</option>
                      <option value="集体全资">集体全资</option>
                      <option value="股份合作">股份合作</option>
                    </select>
                    <select className="flex-1 h-8 px-2 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm bg-white">
                      <option value="">请选择</option>
                    </select>
                  </div>
                </div>

                {/* 社会统一信用代码 */}
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">
                    <span className="text-[#fa5e45] mr-1">*</span>社会统一信用代码
                  </label>
                  <input type="text" className="flex-1 h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="hidden md:block"></div>

                {/* 法人代表 & 法人证件号码 */}
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">
                    <span className="text-[#fa5e45] mr-1">*</span>法人代表
                  </label>
                  <input type="text" className="flex-1 h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">
                    <span className="text-[#fa5e45] mr-1">*</span>法人证件号码
                  </label>
                  <div className="flex-1 flex items-center space-x-2">
                    <input type="text" className="flex-1 h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                    <label className="flex items-center text-sm text-[#333333] whitespace-nowrap cursor-pointer">
                      <input type="checkbox" className="mr-1" /> 非大陆证件
                    </label>
                  </div>
                </div>

                {/* 法人代表电话 & 单位电话 */}
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">
                    <span className="text-[#fa5e45] mr-1">*</span>法人代表电话
                  </label>
                  <input type="text" className="flex-1 h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">单位电话</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>

                {/* 负责人 & 负责人证件号码 */}
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">
                    <span className="text-[#fa5e45] mr-1">*</span>负责人
                  </label>
                  <input type="text" className="flex-1 h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">
                    <span className="text-[#fa5e45] mr-1">*</span>负责人证件号码
                  </label>
                  <div className="flex-1 flex items-center space-x-2">
                    <input type="text" className="flex-1 h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                    <label className="flex items-center text-sm text-[#333333] whitespace-nowrap cursor-pointer">
                      <input type="checkbox" className="mr-1" /> 非大陆证件
                    </label>
                  </div>
                </div>

                {/* 负责人电话 & 经营范围 */}
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">
                    <span className="text-[#fa5e45] mr-1">*</span>负责人电话
                  </label>
                  <input type="text" className="flex-1 h-8 px-3 border border-red-200 bg-red-50/30 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">经营范围</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>

                {/* 法人现住地址 & 负责人现住地址 */}
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">法人现住地址</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">负责人现住地址</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>

                {/* 照片上传 */}
                <div className="flex items-start mt-4">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0 mt-1">法人照片</label>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm bg-gray-50 hover:bg-gray-100">选择文件</button>
                      <span className="text-sm text-gray-500">未选择任何文件</span>
                    </div>
                    <div className="w-40 h-48 border border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-gray-300">
                      <ImageIcon size={48} className="mb-2" />
                      <span className="text-xl font-bold tracking-widest">图片</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">法人预览</div>
                  </div>
                </div>
                <div className="flex items-start mt-4">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0 mt-1">负责人照片</label>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm bg-gray-50 hover:bg-gray-100">选择文件</button>
                      <span className="text-sm text-gray-500">未选择任何文件</span>
                    </div>
                    <div className="w-40 h-48 border border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-gray-300">
                      <ImageIcon size={48} className="mb-2" />
                      <span className="text-xl font-bold tracking-widest">图片</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">负责人预览</div>
                  </div>
                </div>

                {/* 其他信息 */}
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">注册资金(万元)</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">占地面积(平方米)</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>

                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">邮政编码</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">传真</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>

                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">法人代码</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">治安负责人</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>

                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">保卫负责人姓名</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">保卫负责人电话</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>

                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">特行备案编号</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">特行备案机构</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>

                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">行业许可证编号</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="hidden md:block"></div>

                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">保卫部电话</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">治安管理机构</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>

                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">保卫人员数量</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">视频设备指示符</label>
                  <select className="flex-1 h-8 px-2 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm bg-white">
                    <option>是</option>
                    <option>否</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">信息采集指示符</label>
                  <select className="flex-1 h-8 px-2 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm bg-white">
                    <option>是</option>
                    <option>否</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">消防设备指示符</label>
                  <select className="flex-1 h-8 px-2 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm bg-white">
                    <option>是</option>
                    <option>否</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">税务登记证发证机构</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">开业日期</label>
                  <input type="date" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" defaultValue="2026-04-15" />
                </div>

                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">登记日期</label>
                  <input type="date" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" defaultValue="2026-04-15" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">是否法定假日不营业</label>
                  <div className="flex-1 flex items-center space-x-4">
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="holidayClosed" className="mr-1" defaultChecked /> <span className="text-sm">是</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="holidayClosed" className="mr-1" /> <span className="text-sm">否</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 列管信息 */}
            <div className="px-6 py-3 border-t border-gray-100 bg-[#e8f0fc]">
              <h3 className="text-sm font-bold text-[#333333]">列管信息</h3>
            </div>
            <div className="p-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">列管单位负责人姓名</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">列管单位负责人手机</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">列管民警姓名</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0">列管民警手机</label>
                  <input type="text" className="flex-1 h-8 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-sm" />
                </div>
              </div>
            </div>

            {/* 客户端信息 */}
            <div className="px-6 py-3 border-t border-gray-100 bg-[#e8f0fc]">
              <h3 className="text-sm font-bold text-[#333333]">客户端信息</h3>
            </div>
            <div className="p-6 pt-4">
              <div className="flex items-start">
                <label className="w-32 text-right text-sm text-[#333333] mr-4 shrink-0 mt-1">列客户端功能模块</label>
                <div className="flex-1 flex flex-wrap gap-4">
                  {['配件', '美容', '停放', '交易', '回收', '汽车租赁', '维修', '其他'].map((module) => (
                    <label key={module} className="flex items-center cursor-pointer">
                      <input type="checkbox" className="mr-1.5" />
                      <span className="text-sm text-[#333333]">{module}</span>
                    </label>
                  ))}
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
