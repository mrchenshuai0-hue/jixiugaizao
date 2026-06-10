import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  Download, 
  Eye,
  MessageSquare,
  ArrowLeft,
  Calendar,
  X,
  Plus,
  Upload,
  CheckCircle2,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

interface AlarmRecord {
  id: string;
  nameOrPlate: string;
  idOrVin: string;
  enterpriseName: string;
  region: string;
  address: string;
  alarmTime: string;
  comparisonCondition: string;
  alarmType: string;
  comparisonPlatform: string;
  comparisonType: string;
  uploadTime: string;
  handlingResult: string;
  suspicionDescription: string;
  confirmationStatus: '已确认' | '未确认';
  isFeedbacked: '已回执' | '未回执';
  
  // Extra fields for detail
  phone?: string;
  contact?: string;
  suspiciousType?: string;
  vehicleRegNo?: string;
  reporter?: string;
  
  // Handling details
  vehicleType?: string;
  brandModel?: string;
  ownerName?: string;
  bodyColor?: string;
  plateType?: string;
  plateNo?: string;
  vinNo?: string;
  engineNo?: string;
  theftNo?: string;
  caseNo?: string;
  caseCategory?: string;
  caseName?: string;
  caseStatus?: string;
  filingTime?: string;
  filingAgency?: string;
  caseDetail?: string;
  
  handlingAgency?: string;
  handlingTime?: string;
  handlingOfficer?: string;
  handlingSituation?: string;
  
  confirmationResult?: string;
  confirmationAgency?: string;
  confirmationTime?: string;
  confirmationRemark?: string;
}

const MOCK_ALARMS: AlarmRecord[] = [
  {
    id: 'ALM2026001',
    nameOrPlate: '京A88888',
    idOrVin: 'VIN1234567890ABCDE',
    enterpriseName: '测试华为公司（2店）',
    region: '北京市-北京市公安局',
    address: '北京市朝阳区某某路1号',
    alarmTime: '2026-01-16 09:46:49',
    comparisonCondition: '车辆报警',
    alarmType: '在逃人员',
    comparisonPlatform: '情报中心',
    comparisonType: '车架号比中',
    uploadTime: '2026-01-16 09:40:00',
    handlingResult: '无',
    suspicionDescription: '测试',
    confirmationStatus: '未确认',
    isFeedbacked: '未回执',
    phone: '15011122233',
    contact: '王奔',
    suspiciousType: '车辆报警',
    vehicleRegNo: '11000100100002320260116001',
    reporter: '1'
  },
  {
    id: 'ALM2026002',
    nameOrPlate: '李某某',
    idOrVin: '110101199001011234',
    enterpriseName: '测试华为公司（2店）',
    region: '北京市-北京市公安局',
    address: '北京市朝阳区某某路1号',
    alarmTime: '2024-11-26 13:59:08',
    comparisonCondition: '人员报警',
    alarmType: '在逃人员',
    comparisonPlatform: '情报中心',
    comparisonType: '证件号比中',
    uploadTime: '2024-11-26 13:50:00',
    handlingResult: '无',
    suspicionDescription: '好像是有问题的',
    confirmationStatus: '未确认',
    isFeedbacked: '未回执',
    phone: '13800000000',
    contact: '张三',
    suspiciousType: '人员报警',
    vehicleRegNo: '',
    reporter: '系统'
  },
  {
    id: 'ALM2026003',
    nameOrPlate: '京B12345',
    idOrVin: 'VIN9876543210FEDCB',
    enterpriseName: '测试新环境',
    region: '北京市-北京市公安局',
    address: '北京市海淀区某某路2号',
    alarmTime: '2022-08-02 19:49:58',
    comparisonCondition: '车辆报警',
    alarmType: '盗抢车辆',
    comparisonPlatform: '情报中心',
    comparisonType: '车牌号比中',
    uploadTime: '2022-08-02 19:40:00',
    handlingResult: '无',
    suspicionDescription: 'asfafa',
    confirmationStatus: '已确认',
    isFeedbacked: '已回执'
  },
  {
    id: 'ALM2026004',
    nameOrPlate: '中安汽车维修公司',
    idOrVin: 'VIN555555555555555',
    enterpriseName: '中安汽车维修公司',
    region: '北京市-北京市公安局',
    address: '上海市徐汇区光明楼车站',
    alarmTime: '2018-08-04 14:12:00',
    comparisonCondition: '车辆报警',
    alarmType: '在逃人员',
    comparisonPlatform: '情报中心',
    comparisonType: '车架号比中',
    uploadTime: '2018-08-04 14:05:00',
    handlingResult: '已抓获',
    suspicionDescription: '测试',
    confirmationStatus: '已确认',
    isFeedbacked: '已回执'
  }
];

export default function AlarmManagement() {
  const [viewState, setViewState] = useState<{ type: 'list' | 'detail' | 'feedback', record: AlarmRecord | null }>({
    type: 'list',
    record: null
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Filters
  const [filters, setFilters] = useState({
    region: '',
    comparisonCondition: '',
    alarmType: '',
    comparisonPlatform: '',
    startTime: '',
    endTime: '',
    handlingResult: '',
    enterpriseName: '',
    confirmationStatus: '',
    isFeedbacked: '',
    handlingResultStatus: '',
    identity: '',
    idOrVin: '',
    comparisonType: '',
    ackTimeStart: '',
    ackTimeEnd: '',
    feedbackTimeStart: '',
    feedbackTimeEnd: ''
  });

  const handleReset = () => {
    setFilters({
      region: '', comparisonCondition: '', alarmType: '', comparisonPlatform: '', startTime: '', endTime: '', handlingResult: '', enterpriseName: '', confirmationStatus: '', isFeedbacked: '', handlingResultStatus: '', identity: '', idOrVin: '', comparisonType: '', ackTimeStart: '', ackTimeEnd: '', feedbackTimeStart: '', feedbackTimeEnd: ''
    });
  };

  const filteredData = MOCK_ALARMS.filter(item => {
    return (
      item.enterpriseName.includes(filters.enterpriseName) &&
      item.nameOrPlate.includes(filters.identity) &&
      item.idOrVin.includes(filters.idOrVin)
    );
  });

  const toggleAllRows = () => {};

  const renderList = () => (
    <div className="flex flex-col h-full bg-[#f0f2f5] p-4 font-sans text-left">
      <div className="bg-white rounded-lg border border-gray-200 mb-4 px-6 py-5 shrink-0 flex items-start justify-between">
        <div className="flex-1 grid grid-cols-3 gap-6 mr-6">
          <div className="flex items-center">
             <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">企业所属区域</label>
             <input type="text" value={filters.region} onChange={e => setFilters({...filters, region: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
          </div>
          <div className="flex items-center">
             <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">比对条件</label>
             <select value={filters.comparisonCondition} onChange={e => setFilters({...filters, comparisonCondition: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                <option value="">请选择</option>
                <option>车辆报警</option>
                <option>人员报警</option>
             </select>
          </div>
          <div className="flex items-center">
             <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">报警类型</label>
             <select value={filters.alarmType} onChange={e => setFilters({...filters, alarmType: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                <option value="">请选择</option>
                <option>在逃人员</option>
                <option>盗抢车辆</option>
             </select>
          </div>

          {isExpanded && (
            <>
              <div className="flex items-center">
                 <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">比中平台</label>
                 <select value={filters.comparisonPlatform} onChange={e => setFilters({...filters, comparisonPlatform: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                    <option value="">请选择</option>
                    <option>情报中心</option>
                 </select>
              </div>
              <div className="flex items-center">
                 <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">处理结果</label>
                 <select value={filters.handlingResult} onChange={e => setFilters({...filters, handlingResult: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                    <option value="">请选择</option>
                    <option>无</option>
                    <option>已解决</option>
                 </select>
              </div>
              <div className="flex items-center">
                 <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">报警企业名称</label>
                 <input type="text" value={filters.enterpriseName} onChange={e => setFilters({...filters, enterpriseName: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
               <div className="flex items-center">
                 <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">报警确认</label>
                 <select value={filters.confirmationStatus} onChange={e => setFilters({...filters, confirmationStatus: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                    <option value="">请选择</option>
                    <option>已确认</option>
                    <option>未确认</option>
                 </select>
              </div>
              <div className="flex items-center">
                 <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">回馈情况</label>
                 <select value={filters.isFeedbacked} onChange={e => setFilters({...filters, isFeedbacked: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                    <option value="">请选择</option>
                    <option>已回执</option>
                    <option>未回执</option>
                 </select>
              </div>
              <div className="flex items-center">
                 <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">姓名/车牌号</label>
                 <input type="text" value={filters.identity} onChange={e => setFilters({...filters, identity: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div className="flex items-center">
                 <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">证件/车架号</label>
                 <input type="text" value={filters.idOrVin} onChange={e => setFilters({...filters, idOrVin: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF]" />
              </div>
              <div className="flex items-center">
                 <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">比中类型</label>
                 <select value={filters.comparisonType} onChange={e => setFilters({...filters, comparisonType: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] bg-white">
                    <option value="">请选择</option>
                    <option>车架号比中</option>
                    <option>证件号比中</option>
                 </select>
              </div>
              <div className="flex items-center flex-1 space-x-2 w-full col-span-3 lg:col-span-1"></div>

              <div className="flex items-center flex-1 space-x-2 w-full col-span-3 lg:col-span-1">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">报警时间</label>
                <input type="date" value={filters.startTime} onChange={(e) => setFilters({...filters, startTime: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                <span className="text-gray-400">至</span>
                <input type="date" value={filters.endTime} onChange={(e) => setFilters({...filters, endTime: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              </div>
              
              <div className="flex items-center flex-1 space-x-2 w-full col-span-3 lg:col-span-1">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">确认时间</label>
                 <input type="date" value={filters.ackTimeStart} onChange={(e) => setFilters({...filters, ackTimeStart: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                <span className="text-gray-400">至</span>
                <input type="date" value={filters.ackTimeEnd} onChange={(e) => setFilters({...filters, ackTimeEnd: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              </div>

               <div className="flex items-center flex-1 space-x-2 w-full col-span-3 lg:col-span-1">
                <label className="text-sm text-gray-700 w-24 shrink-0 font-medium whitespace-nowrap">回执时间</label>
                 <input type="date" value={filters.feedbackTimeStart} onChange={(e) => setFilters({...filters, feedbackTimeStart: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                <span className="text-gray-400">至</span>
                <input type="date" value={filters.feedbackTimeEnd} onChange={(e) => setFilters({...filters, feedbackTimeEnd: e.target.value})} className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              </div>
            </>
          )}

        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium">查询</button>
          <button onClick={handleReset} className="h-9 px-5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium">重置</button>
          <button onClick={() => setIsExpanded(!isExpanded)} className="h-9 px-5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium flex items-center">
            {isExpanded ? '收起' : '展开'}
            <ChevronDown size={14} className={`ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
          <h3 className="text-base font-bold text-gray-800 tracking-wide">报警信息列表</h3>
          <div className="flex gap-2">
            <button className="h-8 px-4 bg-white text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">导出</button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1800px]">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="text-gray-600 text-[13px] font-semibold border-b border-gray-200">
                <th className="px-6 py-3 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#419EFF]" checked={selectedRows.length === filteredData.length && filteredData.length > 0} onChange={toggleAllRows} />
                </th>
                <th className="px-6 py-3 font-medium border-r border-gray-200">姓名(或车牌号)</th>
                <th className="px-6 py-3 font-medium border-r border-gray-200">证件号码(或车架号)</th>
                <th className="px-6 py-3 font-medium border-r border-gray-200">报警企业名称</th>
                <th className="px-6 py-3 font-medium border-r border-gray-200">企业所属区域</th>
                <th className="px-6 py-3 font-medium border-r border-gray-200">报警企业地址</th>
                <th className="px-6 py-3 font-medium border-r border-gray-200 text-orange-600 bg-orange-50/30">报警时间</th>
                <th className="px-6 py-3 font-medium border-r border-gray-200 bg-orange-50/30">比对条件</th>
                <th className="px-6 py-3 font-medium border-r border-gray-200 bg-orange-50/30">报警类型</th>
                <th className="px-6 py-3 font-medium border-r border-gray-200 bg-orange-50/30">比中平台</th>
                <th className="px-6 py-3 font-medium border-r border-gray-200 bg-orange-50/30">比中类型</th>
                <th className="px-6 py-3 font-medium border-r border-gray-200">上传时间</th>
                <th className="px-6 py-3 font-medium border-r border-gray-200">处警结果</th>
                <th className="px-6 py-3 font-medium border-r border-gray-200 bg-orange-50/30">疑点描述</th>
                <th className="px-6 py-3 font-medium border-r border-gray-200 font-bold bg-orange-50/30">确认状态</th>
                <th className="px-6 py-3 font-medium border-r border-gray-200 font-bold bg-orange-50/30">是否反馈</th>
                <th className="px-6 py-3 text-center sticky right-0 bg-gray-50 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.04)] font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
               {filteredData.map((item, idx) => (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-blue-50/20 transition-colors border-b border-gray-100 ${idx === 0 ? 'bg-orange-50/20' : ''}`}
                  >
                    <td className="px-6 py-3.5 text-center">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-6 py-3.5 border-r border-gray-100 whitespace-nowrap">{item.nameOrPlate}</td>
                    <td className="px-6 py-3.5 border-r border-gray-100 whitespace-nowrap">{item.idOrVin}</td>
                    <td className="px-6 py-3.5 border-r border-gray-100 text-[#419EFF] hover:underline whitespace-nowrap cursor-pointer">{item.enterpriseName}</td>
                    <td className="px-6 py-3.5 border-r border-gray-100 whitespace-nowrap">{item.region}</td>
                    <td className="px-6 py-3.5 border-r border-gray-100">{item.address}</td>
                    <td className="px-6 py-3.5 border-r border-gray-100 text-orange-700 bg-orange-50/30 whitespace-nowrap font-mono">{item.alarmTime}</td>
                    <td className="px-6 py-3.5 border-r border-gray-100 bg-orange-50/30 whitespace-nowrap">{item.comparisonCondition}</td>
                    <td className="px-6 py-3.5 border-r border-gray-100 bg-orange-50/30 whitespace-nowrap">{item.alarmType}</td>
                    <td className="px-6 py-3.5 border-r border-gray-100 bg-orange-50/30 whitespace-nowrap">{item.comparisonPlatform}</td>
                    <td className="px-6 py-3.5 border-r border-gray-100 bg-orange-50/30 whitespace-nowrap">{item.comparisonType}</td>
                    <td className="px-6 py-3.5 border-r border-gray-100 font-mono whitespace-nowrap">{item.uploadTime}</td>
                    <td className="px-6 py-3.5 border-r border-gray-100 whitespace-nowrap">{item.handlingResult}</td>
                    <td className="px-6 py-3.5 border-r border-gray-100 bg-orange-50/30 max-w-[200px] truncate">{item.suspicionDescription}</td>
                    <td className={`px-6 py-3.5 border-r border-gray-100 font-bold bg-orange-50/30 whitespace-nowrap ${item.confirmationStatus === '未确认' ? 'text-gray-800' : 'text-gray-400'}`}>
                      {item.confirmationStatus}
                    </td>
                    <td className={`px-6 py-3.5 border-r border-gray-100 font-bold bg-orange-50/30 whitespace-nowrap ${item.isFeedbacked === '未回执' ? 'text-orange-600' : 'text-gray-400'}`}>
                      {item.isFeedbacked}
                    </td>
                    <td className="px-6 py-3.5 text-center sticky right-0 bg-white transition-colors shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.04)]">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewState({ type: 'detail', record: item });
                          }}
                          className="text-[#419EFF] hover:text-blue-700 font-medium whitespace-nowrap"
                        >
                          详情
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewState({ type: 'feedback', record: item });
                          }}
                          className="text-orange-500 hover:text-orange-700 font-medium whitespace-nowrap"
                        >
                          处警反馈
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {filteredData.length === 0 && (
                <tr>
                   <td colSpan={17} className="px-6 py-10 text-center text-gray-500">暂无数据</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end shrink-0">
          <div className="flex items-center gap-4 text-[13px] text-gray-600">
            <span>共 {filteredData.length} 条</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailOrFeedback = (record: AlarmRecord, mode: 'detail' | 'feedback') => (
    <div className="flex flex-col h-full bg-[#f0f2f5] overflow-hidden font-sans text-left">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">{mode === 'detail' ? '报警信息详情' : '处警反馈'}</h2>
        </div>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={() => setViewState({ type: 'list', record: null })}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-1.5" /> 关闭
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Alarm Info */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc]">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                报警信息
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 text-sm">
            {[
              { label: '报警企业', value: record.enterpriseName },
              { label: '企业地址', value: record.address },
              { label: '联系电话', value: record.phone },
              { label: '联系人', value: record.contact },
              { label: '可疑类型', value: record.comparisonCondition },
              { label: '车辆登记编号', value: record.vehicleRegNo },
              { label: '报告人', value: record.reporter },
              { label: '报警时间', value: record.alarmTime },
              { label: '报警类型', value: record.alarmType, isSelect: true },
              { label: '比中平台', value: record.comparisonPlatform },
              { label: '疑点描述', value: record.suspicionDescription, isFull: true },
            ].map((f, i) => (
              <div key={i} className={`flex border-b border-gray-100 ${f.isFull ? 'col-span-full' : ''}`}>
                <div className="w-36 bg-gray-50 px-4 py-3 text-gray-600 font-medium border-r border-gray-100 flex items-center">{f.label}</div>
                <div className="flex-1 px-4 py-3 text-gray-800 flex items-center bg-white border-r border-gray-100">
                  {f.isSelect ? (
                    <select className="w-full h-8 px-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500" defaultValue={f.value}>
                       <option>{f.value}</option>
                       <option>盗抢车辆</option>
                    </select>
                  ) : f.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Info Card */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden text-sm">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc]">
            <h3 className="font-bold text-[#333333] flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                比中信息
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-gray-100">
            {[
              { label: '车辆类型', value: '' },
              { label: '厂牌型号', value: '' },
              { label: '车主姓名', value: '' },
              { label: '车身颜色', value: '' },
              { label: '号牌种类', value: '' },
              { label: '号牌号码', value: '' },
              { label: '识别代号(vin)/车架号', value: '' },
              { label: '发动机号', value: '' },
              { label: '盗抢编号', value: '' },
              { label: '案件编号', value: '' },
              { label: '案件类别', value: '' },
              { label: '案件名称', value: '' },
              { label: '案件状态', value: '' },
              { label: '立案时间', value: '' },
              { label: '立案公安机关名称', value: '' },
              { label: '案件详情', value: '', isFull: true },
            ].map((f, i) => (
              <div key={i} className={`flex border-b border-gray-100 ${f.isFull ? 'col-span-full' : ''}`}>
                <div className="w-36 bg-gray-50 px-4 py-3 text-gray-600 font-medium border-r border-gray-100">{f.label}</div>
                <div className="flex-1 px-4 py-3 text-gray-800 border-r border-gray-100">{f.value || '-'}</div>
              </div>
            ))}
            <div className="col-span-full flex border-b border-gray-100">
               <div className="w-36 bg-gray-50 px-4 py-3 text-gray-600 font-medium border-r border-gray-100 flex items-center">车辆照片</div>
               <div className="flex-1 p-4 flex items-center justify-start border-r border-gray-100">
                  <div className="w-32 h-32 border-2 border-dashed border-gray-200 rounded flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                     <Plus size={24} />
                     <span className="text-sm pt-2">图片内容</span>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Handling Info Card */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden text-sm">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc]">
            <h3 className="font-bold text-[#333333] flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                处警信息
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {[
                { label: '处警结果', value: '请选择', isSelect: true },
                { label: '查获车辆类型', value: '请选择', isSelect: true },
                { label: '车主姓名', value: '', isInput: true },
                { label: '车身颜色', value: '', isInput: true },
                { label: '号牌种类', value: '', isInput: true },
                { label: '号牌号码', value: '', isInput: true },
                { label: '识别代号(vin)/车架号', value: '', isInput: true },
                { label: '发动机号', value: '', isInput: true },
                { label: '厂牌型号', value: '', isInput: true },
                { label: '处警单位', value: '北京市-北京市公安局', isInput: true },
                { label: '处警时间', value: '', isDate: true },
                { label: '处警民警', value: '', isInput: true },
                { label: '处警情况', value: '', isTextarea: true, isFull: true },
              ].map((f, i) => (
                <div key={i} className={`flex border-b border-gray-100 ${f.isFull ? 'col-span-full' : ''}`}>
                  <div className="w-36 bg-gray-50 px-4 py-3 text-gray-600 font-medium border-r border-gray-100">{f.label}</div>
                  <div className="flex-1 px-4 py-2 text-gray-800 flex items-center border-r border-gray-100">
                    {f.isSelect ? (
                       <select className="w-full h-8 border border-gray-300 rounded px-2 outline-none focus:border-blue-500 text-sm">
                          <option>{f.value}</option>
                          <option>已抓获</option>
                          <option>无</option>
                       </select>
                    ) : f.isInput ? (
                       <input type="text" className="w-full h-8 border border-gray-300 rounded px-2 outline-none focus:border-blue-500 text-sm" defaultValue={f.value} />
                    ) : f.isDate ? (
                        <input type="date" className="w-full h-8 border border-gray-300 rounded px-2 outline-none focus:border-blue-500 text-sm" />
                    ) : f.isTextarea ? (
                       <textarea className="w-full h-20 border border-gray-300 rounded p-2 outline-none resize-none focus:border-blue-500 text-sm my-1"></textarea>
                    ) : f.value || '-'}
                  </div>
                </div>
              ))}
              <div className="col-span-full flex border-b border-gray-100">
                  <div className="w-36 bg-gray-50 px-4 py-3 text-gray-600 font-medium border-r border-gray-100 flex items-center">上传照片</div>
                  <div className="flex-1 p-4 flex items-center border-r border-gray-100">
                      <button className="px-4 py-1.5 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 flex items-center gap-2 shadow-sm font-medium"><Upload size={16}/> 选择文件</button>
                      <span className="ml-3 text-gray-400 text-sm">未选择任何文件</span>
                  </div>
              </div>
              <div className="col-span-full flex border-b border-gray-100">
                  <div className="w-36 bg-gray-50 px-4 py-3 text-gray-600 font-medium border-r border-gray-100 flex items-center">图片预览</div>
                  <div className="flex-1 p-4 flex justify-start items-center py-6 min-h-[160px] border-r border-gray-100">
                    <div className="w-32 h-32 border-2 border-dashed border-gray-200 rounded flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                        <Plus size={24} />
                        <span className="text-sm pt-2">图片内容</span>
                    </div>
                  </div>
              </div>
          </div>
          <div className="bg-gray-50 p-4 text-center flex justify-center">
             <button className="px-8 py-2 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium flex items-center gap-2 shadow-sm">保存</button>
          </div>
        </section>

        {/* Confirmation Info */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden text-sm">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc]">
            <h3 className="font-bold text-[#333333] flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                确认信息
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              { label: '报警确认与否', value: record.confirmationStatus },
              { label: '确认结果', value: '其他' },
              { label: '确认单位', value: record.confirmationAgency || '' },
              { label: '确认时间', value: record.confirmationTime || '' },
              { label: '确认备注', value: record.confirmationRemark || '', isFull: true },
            ].map((f, i) => (
              <div key={i} className={`flex border-b border-gray-100 ${f.isFull ? 'col-span-full' : ''}`}>
                <div className="w-36 bg-gray-50 px-4 py-3 text-gray-600 font-medium border-r border-gray-100">{f.label}</div>
                <div className="flex-1 px-4 py-3 text-gray-800 border-r border-gray-100">{f.value || '-'}</div>
              </div>
            ))}
          </div>
        </section>

         {/* Receipt Info */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden text-sm">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#e8f0fc]">
            <h3 className="font-bold text-[#333333] flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#419EFF] rounded-full"></div>
                回执信息
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <div className="col-span-full flex">
              <div className="w-36 bg-gray-50 px-4 py-3 text-gray-600 font-medium border-r border-gray-100">报警反馈</div>
              <div className="flex-1 px-4 py-3 text-gray-800 border-r border-gray-100">{record.isFeedbacked}</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col bg-[#F5F5F5] overflow-hidden antialiased text-left font-sans text-xs">
      {viewState.type === 'list' 
        ? renderList()
        : renderDetailOrFeedback(viewState.record!, viewState.type as 'detail' | 'feedback')
      }
    </div>
  );
}
