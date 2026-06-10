import React, { useState, useEffect } from 'react';
import { 
  Search, 
  RotateCcw, 
  Plus, 
  Download, 
  Eye, 
  Edit, 
  ChevronDown, 
  ChevronUp,
  Send, 
  Undo2, 
  CheckSquare, 
  Activity, 
  ClipboardCheck, 
  UserCheck, 
  AlertCircle,
  FileCheck,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { api } from '../api';
import { Case, Enterprise } from '../types';

interface PunishmentListProps {
  onAdd: () => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function PunishmentList({ onAdd, onView, onEdit }: PunishmentListProps) {
  const [data, setData] = useState<Case[]>([]);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // 10个搜索条件控件 state (Requirement 2)
  const [placeNameFilter, setPlaceNameFilter] = useState('');
  const [placeCodeFilter, setPlaceCodeFilter] = useState('');
  const [jurisdictionFilter, setJurisdictionFilter] = useState('');
  const [isInvestigatedFilter, setIsInvestigatedFilter] = useState('');
  const [investigationTimeFilter, setInvestigationTimeFilter] = useState('');
  const [supervisionStatusFilter, setSupervisionStatusFilter] = useState('');
  const [caseNoFilter, setCaseNoFilter] = useState('');
  const [caseNameFilter, setCaseNameFilter] = useState('');
  const [occurrenceTimeFilter, setOccurrenceTimeFilter] = useState('');
  const [investigationDateFilter, setInvestigationDateFilter] = useState('');

  // 展开与折叠筛选
  const [expandSearch, setExpandSearch] = useState(false);

  // 流程处理模态框 state
  const [workflowCase, setWorkflowCase] = useState<Case | null>(null);
  const [workflowAction, setWorkflowAction] = useState<'下发' | '审核' | '退回' | '签收' | '上报' | null>(null);
  const [workflowRemarks, setWorkflowRemarks] = useState('');
  const [nextTargetUnit, setNextTargetUnit] = useState('');
  const [auditDecision, setAuditDecision] = useState<'agree' | 'reject'>('agree');

  // 反馈提示 Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // 载入企业库，辅助场所编码查询展示
      const entList = await api.enterprise.getAll();
      setEnterprises(entList);

      const localVal = localStorage.getItem('case_supervisions');
      if (localVal) {
        setData(JSON.parse(localVal));
      } else {
        const originalCases = await api.case.getAll();
        
        // 创建更丰富的模拟数据体现不同督办状态
        const mockData: Case[] = [
          {
            ...originalCases[0],
            id: 'p1',
            supervisionStatus: '督办完成',
            isInvestigated: '已查处',
            investigationTime: '2026-04-15 14:00:00',
            investigationDate: '2026-04-15',
            specificIllegalBehavior: '该汽修厂在夜间未登记驾驶员和车辆VIN信息承修可疑事故二手车辆。',
            punishmentResult: '市局网网点通报警告，暂扣机修备案证明单5天，处罚金2000元。',
            credentialsUrl: ['https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=500&auto=format&fit=crop&q=60'],
            supervisionLogs: [
              { id: 'l1', time: '2026-04-03 16:00:00', unit: '福建省公安厅(省级)', operator: '王处长', action: '督办发起', remark: '启动省级督办一案双查一案双查程序' },
              { id: 'l8', time: '2026-04-15 14:00:00', unit: '福建省公安厅(省级)', operator: '王处长', action: '省厅归档', remark: '督办结束，结案件销档！' }
            ]
          },
          {
            ...originalCases[1],
            id: 'p2',
            supervisionStatus: '待下发',
            isInvestigated: '未查处',
            supervisionLogs: []
          },
          {
            ...originalCases[0],
            id: 'p3',
            caseName: '非法承修散装汽油运载车辆专项督办',
            supervisionStatus: '已签收 (查处中)',
            isInvestigated: '未查处',
            dispatchPoliceStation: '东街派出所',
            supervisionLogs: [
              { id: 'l10', time: '2026-06-01 10:00:00', unit: '鼓楼分局治安大队', operator: '分局管理员', action: '下发任务', remark: '请东街所立即对该网点进行现场勘查' },
              { id: 'l11', time: '2026-06-02 09:00:00', unit: '东街派出所', operator: '张警员', action: '单位签收', remark: '已收到督办指示，正在组织人员查处' }
            ]
          },
          {
            ...originalCases[1],
            id: 'p4',
            caseName: '网点违规二次排摸督办件',
            supervisionStatus: '区级审核通过 (待市级审核)',
            isInvestigated: '已查处',
            investigationTime: '2026-06-05 16:30:00',
            supervisionLogs: [
              { id: 'l20', time: '2026-06-05 17:00:00', unit: '鼓楼分局治安大队', operator: '林警官', action: '区级审核完毕', remark: '查处程序合法，证据确凿，同意上报市局' }
            ]
          },
          {
            ...originalCases[0],
            id: 'p5',
            caseName: '省厅挂牌督办：机修网点消防安全隐患',
            supervisionStatus: '派出所已上报 (待区级审核)',
            isInvestigated: '已查处',
            supervisionLogs: [
              { id: 'l30', time: '2026-06-07 11:20:00', unit: '五凤派出所', operator: '李所长', action: '查处上报', remark: '已责令停业整顿3日，罚没违规所得并处最高罚金。' }
            ]
          }
        ];
        setData(mockData);
        localStorage.setItem('case_supervisions', JSON.stringify(mockData));
      }
    } catch (error) {

      console.error('Failed to load supervisions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 重置搜索条件
  const handleReset = () => {
    setPlaceNameFilter('');
    setPlaceCodeFilter('');
    setJurisdictionFilter('');
    setIsInvestigatedFilter('');
    setInvestigationTimeFilter('');
    setSupervisionStatusFilter('');
    setCaseNoFilter('');
    setCaseNameFilter('');
    setOccurrenceTimeFilter('');
    setInvestigationDateFilter('');
    showToast('搜索条件已重置', 'info');
  };

  // 10维度精确查询过滤逻辑 (Requirement 2)
  const filteredData = data.filter(row => {
    // 1. 场所名称
    const placeName = (row.associatedPlaceName || row.company || '').toLowerCase();
    if (placeNameFilter && !placeName.includes(placeNameFilter.toLowerCase())) return false;

    // 2. 场所编码 (对应USCC或者Enterprise ID)
    const ent = enterprises.find(e => e.id === row.associatedEnterpriseIds?.[0]);
    const uscc = (ent?.uscc || '').toLowerCase();
    const entCode = (ent?.enterpriseCode || row.id || '').toLowerCase();
    if (placeCodeFilter && !uscc.includes(placeCodeFilter.toLowerCase()) && !entCode.includes(placeCodeFilter.toLowerCase())) return false;

    // 3. 管辖单位
    const dispatchPolice = (row.dispatchPoliceStation || '').toLowerCase();
    const filingUnit = (row.filingUnit || '').toLowerCase();
    const jurs = (ent?.jurisdiction || '').toLowerCase();
    if (jurisdictionFilter && 
        !dispatchPolice.includes(jurisdictionFilter.toLowerCase()) && 
        !filingUnit.includes(jurisdictionFilter.toLowerCase()) &&
        !jurs.includes(jurisdictionFilter.toLowerCase())) return false;

    // 4. 是否已查处
    const isInvestigated = (row.isInvestigated || '未查处');
    if (isInvestigatedFilter && isInvestigated !== isInvestigatedFilter) return false;

    // 5. 查处时间
    const investTime = row.investigationTime || '';
    if (investigationTimeFilter && !investTime.includes(investigationTimeFilter)) return false;

    // 6. 督办状态
    const superStatus = row.supervisionStatus || '待下发';
    if (supervisionStatusFilter && !superStatus.includes(supervisionStatusFilter)) return false;

    // 7. 案件编号
    const caseNo = (row.caseNo || '').toLowerCase();
    if (caseNoFilter && !caseNo.includes(caseNoFilter.toLowerCase())) return false;

    // 8. 案件名称
    const caseName = (row.caseName || row.title || '').toLowerCase();
    if (caseNameFilter && !caseName.includes(caseNameFilter.toLowerCase())) return false;

    // 9. 案发时间
    const date = row.date || row.occurrenceTime || '';
    if (occurrenceTimeFilter && !date.includes(occurrenceTimeFilter)) return false;

    // 10. 查处日期
    const investDate = row.investigationDate || '';
    if (investigationDateFilter && !investDate.includes(investigationDateFilter)) return false;

    return true;
  });

  // 获取督办指示的可用下一节点及选项
  const getNextDispatchDefaults = (status: string) => {
    switch (status) {
      case '待下发':
        return { unit: '福州市公安局(市局)', units: ['福州市公安局(市局)', '厦门市公安局(市局)', '泉州市公安局(市局)'] };
      case '省级下发 (待市级接收)':
        return { unit: '鼓楼分局治安大队', units: ['鼓楼分局治安大队', '台江分局治安大队', '晋安分局治安大队'] };
      case '市级下发 (待区级接收)':
        return { unit: '鼓楼派出所(属地)', units: ['鼓楼派出所(属地)', '五凤派出所(属地)', '东街派出所(属地)'] };
      default:
        return { unit: '基层查处派出所', units: ['属地公安派出所'] };
    }
  };

  // 打开流程处理模态框
  const openWorkflowModal = (row: Case, action: '下发' | '审核' | '退回' | '签收' | '上报') => {
    setWorkflowCase(row);
    setWorkflowAction(action);
    setWorkflowRemarks('');
    setAuditDecision('agree');

    const defaults = getNextDispatchDefaults(row.supervisionStatus || '待下发');
    setNextTargetUnit(defaults.unit);
    setOpenDropdown(null);
  };

  // 提交流转业务逻辑 (Requirement 6)
  const handleWorkflowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workflowCase || !workflowAction) return;

    let newStatus = workflowCase.supervisionStatus || '待下发';
    let logAction = '';
    let logRemark = workflowRemarks || '（无）';
    let operator = '公安政务勤务端';
    let targetUnit = '治安勤务窗口';

    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

    if (workflowAction === '下发') {
      if (newStatus === '待下发') {
        newStatus = '省级下发 (待市级接收)';
        logAction = '督办发起';
        operator = '省级督办员王处';
        targetUnit = '福建省公安厅(省级)';
        logRemark = `对此案场所启动省级治安一案双查案件。下发市级分拨中心：${nextTargetUnit}。通知说明: ` + logRemark;
      } else if (newStatus === '省级下发 (待市级接收)') {
        newStatus = '市级下发 (待区级接收)';
        logAction = '市局下派批次';
        operator = '市局流转警官员陈警官';
        targetUnit = '福州市公安局(市级)';
        logRemark = `市局治安专班研判完毕，向下划拔至区县局：${nextTargetUnit}。指引说明: ` + logRemark;
      } else if (newStatus === '市级下发 (待区级接收)') {
        newStatus = '区级下发 (待派出所签收)';
        logAction = '分局划归执行';
        operator = '分局治安大队林警长';
        targetUnit = '鼓楼分局治安大队';
        logRemark = `分局治安大队下管指定到涉事网点对口派出所：${nextTargetUnit}。限期查处说明: ` + logRemark;
      }
      showToast(`下发成功，已派发至: ${nextTargetUnit}`, 'success');
    } 
    
    else if (workflowAction === '退回') {
      // 业务回滚机制
      if (newStatus === '省级下发 (待市级接收)') {
        newStatus = '待下发';
        operator = '市局流转警官员';
        targetUnit = '福州市公安局';
        logAction = '退回至省厅';
      } else if (newStatus === '市级下发 (待区级接收)') {
        newStatus = '省级下发 (待市级接收)';
        operator = '区局治安管理员';
        targetUnit = '鼓楼分局治安大队';
        logAction = '退回到市局';
      } else if (newStatus === '区级下发 (待派出所签收)') {
        newStatus = '市级下发 (待区级接收)';
        operator = '派出所值班所长';
        targetUnit = '鼓楼派出所';
        logAction = '拒签退回';
      } else if (newStatus === '已签收 (查处中)') {
        newStatus = '区级下发 (待派出所签收)';
        operator = '派出所经办民警';
        targetUnit = '五凤派出所';
        logAction = '取消签收滚回';
      } else if (newStatus === '派出所已上报 (待区级审核)') {
        newStatus = '已签收 (查处中)';
        operator = '区局大队研判员';
        targetUnit = '鼓楼分局治安大队';
        logAction = '打回重办';
        logRemark = '退回要求原因：查处凭证图片模糊/证据材料不足。详细原因: ' + logRemark;
      } else if (newStatus === '区级审核通过 (待市级审核)') {
        newStatus = '派出所已上报 (待区级审核)';
        operator = '市局终审治安警';
        targetUnit = '福州市公安局';
        logAction = '打回区局';
      } else if (newStatus === '市级审核通过 (待省级审核)') {
        newStatus = '区级审核通过 (待市级审核)';
        operator = '省厅终审负责人';
        targetUnit = '福建省公安厅';
        logAction = '打市局重核';
      }
      showToast(`已执行操作退回，业务回滚至前置环节`, 'info');
    } 
    
    else if (workflowAction === '签收') {
      newStatus = '已签收 (查处中)';
      logAction = '任务签收';
      operator = '派出所责任警长';
      targetUnit = workflowCase.dispatchPoliceStation || '派出所属地单位';
      logRemark = '基层单位已响应签收，查处工作和限期整改填制中。';
      showToast('属地单位已签收，进入查处状态', 'success');
    } 
    
    else if (workflowAction === '上报') {
      newStatus = '派出所已上报 (待区级审核)';
      logAction = '查处上报';
      operator = '辖区警员/责任警长';
      targetUnit = workflowCase.dispatchPoliceStation || '五凤派出所';
      logRemark = `辖区派出所已对该场所完成就地查处核定：违规事实及惩处决定书均已完成，已在此挂账案件卷宗中登记，现提交至分局大队审核备案。批示批注: ` + logRemark;
      showToast('查处报告已成功上报分局审查', 'success');
    }
    
    else if (workflowAction === '审核') {
      const isAgree = auditDecision === 'agree';
      if (!isAgree) {
        // 退回
        if (newStatus === '派出所已上报 (待区级审核)') {
          newStatus = '已签收 (查处中)';
          logAction = '区级审核退回';
          operator = '分局治安大队林警官';
          targetUnit = '区公安分局治安大队';
        } else if (newStatus === '区级审核通过 (待市级审核)') {
          newStatus = '派出所已上报 (待区级审核)';
          logAction = '市级考核退回';
          operator = '市公安局陈专员';
          targetUnit = '市公安局治安大队';
        } else if (newStatus === '市级审核通过 (待省级审核)') {
          newStatus = '区级审核通过 (待市级审核)';
          logAction = '省级考核退回';
          operator = '省治安总队王处长';
          targetUnit = '福建省公安厅';
        }
        showToast('审核不通过，退回下级重办', 'error');
      } else {
        // 同意逐级往上提交
        if (newStatus === '派出所已上报 (待区级审核)') {
          newStatus = '区级审核通过 (待市级审核)';
          logAction = '区级审核完毕';
          operator = '分局治安大队林警官';
          targetUnit = '区公安分局治安大队';
        } else if (newStatus === '区级审核通过 (待市级审核)') {
          newStatus = '市级审核通过 (待省级审核)';
          logAction = '市级审核闭环';
          operator = '市公安局陈专员';
          targetUnit = '市公安局治安专班';
        } else if (newStatus === '市级审核通过 (待省级审核)') {
          newStatus = '督办完成';
          logAction = '终审通过闭环';
          operator = '省治安总队王处长';
          targetUnit = '福建省公安厅';
        }
        showToast('审核合格，顺利提交至上一级复核', 'success');
      }
    }

    // 组装新Log
    const newLogId = 'log_' + Math.random().toString(36).substring(2, 9);
    const newLog = {
      id: newLogId,
      time: timestamp,
      unit: targetUnit,
      operator: operator,
      action: logAction || `${workflowAction}操作`,
      remark: logRemark
    };

    // 保存更改
    const updated = data.map(row => {
      if (row.id === workflowCase.id) {
        const logs = row.supervisionLogs || [];
        return {
          ...row,
          supervisionStatus: newStatus,
          supervisionLogs: [newLog, ...logs]
        };
      }
      return row;
    });

    setData(updated);
    localStorage.setItem('case_supervisions', JSON.stringify(updated));

    setWorkflowCase(null);
    setWorkflowAction(null);
  };

  // 渲染流转状态标签
  const renderStatusBadge = (status: string) => {
    let classes = '';
    switch (status) {
      case '待下发':
        classes = 'bg-orange-50 text-orange-600 border-orange-200';
        break;
      case '省级下发 (待市级接收)':
        classes = 'bg-blue-50 text-blue-600 border-blue-200';
        break;
      case '市级下发 (待区级接收)':
        classes = 'bg-cyan-50 text-cyan-600 border-cyan-200';
        break;
      case '区级下发 (待派出所签收)':
        classes = 'bg-indigo-50 text-indigo-600 border-indigo-200';
        break;
      case '已签收 (查处中)':
        classes = 'bg-purple-50 text-purple-600 border-purple-200 animate-pulse';
        break;
      case '派出所已上报 (待区级审核)':
        classes = 'bg-yellow-50 text-yellow-700 border-yellow-200';
        break;
      case '区级审核通过 (待市级审核)':
        classes = 'bg-teal-50 text-teal-700 border-teal-200';
        break;
      case '市级审核通过 (待省级审核)':
        classes = 'bg-amber-50 text-amber-700 border-amber-200';
        break;
      case '督办完成':
        classes = 'bg-green-50 text-green-700 border-green-200';
        break;
      default:
        classes = 'bg-gray-100 text-gray-600 border-gray-200';
    }
    return (
      <span className={`px-2 py-1 rounded text-xs border font-medium ${classes}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative">
      
      {/* Toast 提示 */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg flex items-center gap-2 text-xs transition-opacity duration-300 ${
          toastMessage.type === 'success' ? 'bg-green-600 text-white' : 
          toastMessage.type === 'error' ? 'bg-red-600 text-white' : 
          'bg-blue-600 text-white'
        }`}>
          <CheckCircle2 size={16} />
          <span className="font-semibold">{toastMessage.text}</span>
        </div>
      )}

      <div className="flex-1 p-3 overflow-auto">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.05)] border border-gray-200 flex flex-col min-h-full">
          
          {/* 筛选区域 - 可展开/折叠 (Requirement 2) */}
          <div className="p-5 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {/* 第一排必显三柱主要栏位 */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">场所名称</label>
                <input 
                  type="text" 
                  value={placeNameFilter}
                  onChange={e => setPlaceNameFilter(e.target.value)}
                  className="w-full h-8.5 px-3 text-xs border border-gray-300 rounded focus:border-[#419EFF] outline-none bg-white font-sans" 
                  placeholder="检索单位场所名称" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">场所编码（信用代码/编码）</label>
                <input 
                  type="text" 
                  value={placeCodeFilter}
                  onChange={e => setPlaceCodeFilter(e.target.value)}
                  className="w-full h-8.5 px-3 text-xs border border-gray-300 rounded focus:border-[#419EFF] outline-none bg-white font-sans" 
                  placeholder="检索社会统一信用代码/场所编码" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">管辖单位</label>
                <input 
                  type="text" 
                  value={jurisdictionFilter}
                  onChange={e => setJurisdictionFilter(e.target.value)}
                  className="w-full h-8.5 px-3 text-xs border border-gray-300 rounded focus:border-[#419EFF] outline-none bg-white font-sans" 
                  placeholder="如：分局辖院、指定派出所" 
                />
              </div>
            </div>

            {/* 可展开的其余7大筛选栏位 (Requirement 2, 共计10个) 同样是一行三列 */}
            {expandSearch && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 text-left transition-all duration-300 animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">是否已查处</label>
                  <select 
                    value={isInvestigatedFilter}
                    onChange={e => setIsInvestigatedFilter(e.target.value)}
                    className="w-full h-8.5 px-3 text-xs border border-gray-300 rounded bg-white focus:border-[#419EFF] outline-none"
                  >
                    <option value="">全部</option>
                    <option value="已查处">已查处</option>
                    <option value="未查处">未查处</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">查处时间</label>
                  <input 
                    type="date" 
                    value={investigationTimeFilter}
                    onChange={e => setInvestigationTimeFilter(e.target.value)}
                    className="w-full h-8.5 px-3 text-xs border border-gray-300 rounded focus:border-[#419EFF] outline-none bg-white" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">督办状态</label>
                  <select 
                    value={supervisionStatusFilter}
                    onChange={e => setSupervisionStatusFilter(e.target.value)}
                    className="w-full h-8.5 px-3 text-xs border border-gray-300 rounded bg-white focus:border-[#419EFF] outline-none"
                  >
                    <option value="">全部</option>
                    <option value="待下发">待下发</option>
                    <option value="省级下发">省级已下发 (待市级接收)</option>
                    <option value="市级下发">市级已下发 (待区级接收)</option>
                    <option value="区级下发">区级已下发 (待派出所签收)</option>
                    <option value="已签收 (查处中)">已签收 (查处中)</option>
                    <option value="派出所已上报">属地已上报 (待区级审核)</option>
                    <option value="区级审核通过">区级审核过 (待市级审核)</option>
                    <option value="市级审核通过">市级审核过 (待省级审核)</option>
                    <option value="督办完成">督办结案完成</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">案件编号</label>
                  <input 
                    type="text" 
                    value={caseNoFilter}
                    onChange={e => setCaseNoFilter(e.target.value)}
                    className="w-full h-8.5 px-3 text-xs border border-gray-300 rounded focus:border-[#419EFF] outline-none bg-white font-mono" 
                    placeholder="请输入案件编号" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">案件名称</label>
                  <input 
                    type="text" 
                    value={caseNameFilter}
                    onChange={e => setCaseNameFilter(e.target.value)}
                    className="w-full h-8.5 px-3 text-xs border border-gray-300 rounded focus:border-[#419EFF] outline-none bg-white" 
                    placeholder="如：未按规定实名登记" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">案发时间</label>
                  <input 
                    type="date" 
                    value={occurrenceTimeFilter}
                    onChange={e => setOccurrenceTimeFilter(e.target.value)}
                    className="w-full h-8.5 px-3 text-xs border border-gray-300 rounded focus:border-[#419EFF] outline-none bg-white" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">查处日期 (手动查处填注期)</label>
                  <input 
                    type="date" 
                    value={investigationDateFilter}
                    onChange={e => setInvestigationDateFilter(e.target.value)}
                    className="w-full h-8.5 px-3 text-xs border border-gray-300 rounded focus:border-[#419EFF] outline-none bg-white" 
                  />
                </div>
                <div></div>
                <div></div>
              </div>
            )}

            {/* 功能控制行 */}
            <div className="flex items-center justify-between mt-4 pt-3">
              <button 
                type="button"
                onClick={() => setExpandSearch(!expandSearch)}
                className="text-xs text-[#419EFF] hover:text-blue-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>{expandSearch ? '折叠收起高级检索' : '显示多余检索栏位'}</span>
                <ChevronDown size={14} className={`transform transition-transform ${expandSearch ? 'rotate-180' : ''}`} />
              </button>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleReset}
                  className="h-8 px-4 bg-white border border-gray-300 text-gray-700 rounded text-xs hover:bg-slate-50 flex items-center font-bold cursor-pointer"
                >
                  <RotateCcw size={13} className="mr-1.5" /> 重置
                </button>
                <button 
                  className="h-8 px-5 bg-[#419EFF] text-white rounded text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm flex items-center cursor-pointer"
                >
                  <Search size={13} className="mr-1.5" /> 立即查询
                </button>
              </div>
            </div>
          </div>

          {/* 操作表头行 (Requirement 4: 命名改为 督办件补录) */}
          <div className="px-5 py-3 flex justify-between items-center bg-[#FAFCFF] border-b border-gray-200">
            <div className="text-xs text-gray-500 font-sans">
              经过检索过滤，共有 <span className="text-[#419EFF] font-bold">{filteredData.length}</span> 个场所督办及查处记录
            </div>
            <div className="flex space-x-2">
              <button className="h-8 px-3.5 bg-white border border-gray-300 text-gray-600 rounded text-xs font-bold hover:bg-gray-50 transition-colors flex items-center">
                <Download size={13} className="mr-1.5" /> 导出数据表
              </button>
              <button 
                onClick={onAdd} 
                className="h-8 px-4 bg-[#419EFF] text-white rounded text-xs font-bold hover:bg-blue-600 transition-colors shadow-xs flex items-center cursor-pointer"
              >
                <Plus size={13} className="mr-1.5" /> 督办件补录
              </button>
            </div>
          </div>

          {/* 表格区域 (Requirement 3: 完美对齐9大列表头) */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1300px]">
              <thead>
                <tr className="bg-[#FAFBFD] text-gray-700 text-xs border-b border-gray-200 font-semibold h-11">
                  <th className="px-4 py-2 font-bold text-gray-800">场所名称</th>
                  <th className="px-4 py-2 font-bold text-gray-800">场所编码</th>
                  <th className="px-4 py-2 font-bold text-gray-800">管辖单位</th>
                  <th className="px-4 py-2 font-bold text-gray-800">是否查处</th>
                  <th className="px-4 py-2 font-bold text-gray-800">查处时间</th>
                  <th className="px-4 py-2 font-bold text-gray-800">督办状态</th>
                  <th className="px-4 py-2 font-bold text-gray-800">案件编号</th>
                  <th className="px-4 py-2 font-bold text-gray-800">案件名称</th>
                  <th className="px-4 py-2 font-bold text-gray-800">案发时间</th>
                  <th className="px-4 py-2 font-bold text-gray-800 text-center w-40 sticky right-0 bg-[#FAFBFD] z-30">操作</th>
                </tr>
              </thead>
              <tbody className="text-xs text-gray-600">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-16 text-center text-gray-400">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#419EFF] mx-auto mb-2"></div>
                      正在加载最新场所排摸进度...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-16 text-center text-gray-400 font-sans">
                      <AlertCircle size={24} className="mx-auto text-gray-300 mb-2" />
                      对不起，根据当前10维查询条件，未检索到相关关联督办记录，请重新过滤。
                    </td>
                  </tr>
                ) : filteredData.map((row) => {
                  // 获取场所USCC
                  const targetEnt = enterprises.find(e => e.id === row.associatedEnterpriseIds?.[0]);
                  const rowUSCC = targetEnt?.uscc || '91350102MA345' + row.id + '789';
                  const rowJurisdiction = targetEnt?.jurisdiction || row.dispatchPoliceStation || '福州市分局对口执勤';

                  // 是否已查处
                  const isInvestigated = row.isInvestigated || '未查处';
                  const isInvestigatedBadge = isInvestigated === '已查处' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] border border-green-200 bg-green-50 text-green-700 font-semibold">已查处</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] border border-gray-200 bg-gray-50 text-gray-500 font-semibold">未查处</span>
                  );

                  // 督办逻辑状态
                  const currentStatus = row.supervisionStatus || '待下发';

                  return (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-slate-50/50 transition-colors h-12">
                      {/* 1. 场所名称 */}
                      <td className="px-4 py-2 font-semibold text-gray-800 truncate max-w-[200px]" title={row.associatedPlaceName || row.company}>
                        {row.associatedPlaceName || row.company || '未指定涉案场所'}
                      </td>
                      {/* 2. 场所编码 */}
                      <td className="px-4 py-2 font-mono text-gray-500 font-bold">{rowUSCC}</td>
                      {/* 3. 管辖单位 */}
                      <td className="px-4 py-2 truncate max-w-[150px]" title={rowJurisdiction}>{rowJurisdiction}</td>
                      {/* 4. 是否查处 */}
                      <td className="px-4 py-2">{isInvestigatedBadge}</td>
                      {/* 5. 查处时间 */}
                      <td className="px-4 py-2 font-mono text-gray-500">{row.investigationTime || '-'}</td>
                      {/* 6. 督办状态 */}
                      <td className="px-4 py-2">{renderStatusBadge(currentStatus)}</td>
                      {/* 7. 案件编号 */}
                      <td className="px-4 py-2 font-mono text-gray-500 font-bold">{row.caseNo || '-'}</td>
                      {/* 8. 案件名称 */}
                      <td className="px-4 py-2 font-medium text-gray-800 truncate max-w-[180px]" title={row.caseName || row.title}>
                        {row.caseName || row.title}
                      </td>
                      {/* 9. 案发时间 */}
                      <td className="px-4 py-2 font-mono text-gray-500">{row.occurrenceTime || row.date || '-'}</td>
                      
                      {/* 10. 操作区域 (Requirement 5: 详情、修改、下拉（下发、审核、退回、签收）) */}
                      <td className={`px-4 py-2 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] overflow-visible ${openDropdown === row.id ? 'z-[60]' : 'z-20'}`}>
                        <div className="flex items-center justify-center space-x-1.5">
                          <button 
                            onClick={() => onView(row.id)} 
                            className="p-1 text-[#419EFF] hover:bg-blue-50 hover:text-blue-700 rounded transition-colors font-semibold flex items-center gap-0.5"
                            title="查看详情记录"
                          >
                            <Eye size={13} /> <span>详情</span>
                          </button>
                          
                          <button 
                            onClick={() => onEdit(row.id)} 
                            className="p-1 text-[#419EFF] hover:bg-blue-50 hover:text-blue-700 rounded transition-colors font-semibold flex items-center gap-0.5"
                            title="查处及补全修改"
                          >
                            <Edit size={13} /> <span>修改</span>
                          </button>

                            <div className="relative" data-dropdown-trigger={row.id}>
                              <button 
                                className={`p-1 border border-gray-200 rounded hover:bg-gray-100 flex items-center justify-center text-gray-500 min-w-[28px] ${openDropdown === row.id ? 'bg-gray-100' : ''}`}
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  setOpenDropdown(openDropdown === row.id ? null : row.id); 
                                }}
                              >
                                <ChevronDown size={14} className={`text-gray-400 transition-transform ${openDropdown === row.id ? 'rotate-180' : ''}`} />
                              </button>
                              
                              {openDropdown === row.id && (
                                <div className="fixed inset-0 z-[2000]" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}>
                                  <div 
                                    className="absolute bg-white border border-gray-200 rounded-md shadow-2xl z-[2001] py-1 font-sans text-left animate-fadeIn ring-1 ring-black/5"
                                    style={{ 
                                      top: `${(document.querySelector(`[data-dropdown-trigger="${row.id}"]`)?.getBoundingClientRect().bottom || 0) + 4}px`,
                                      right: `${window.innerWidth - (document.querySelector(`[data-dropdown-trigger="${row.id}"]`)?.getBoundingClientRect().right || 0)}px`,
                                      width: '160px'
                                    }}
                                    onClick={e => e.stopPropagation()}
                                  >
                                    {/* 下发: 待下发或前面几个待逐级往下发节点 */}
                                  {(currentStatus === '待下发' || 
                                    currentStatus === '省级下发 (待市级接收)' || 
                                    currentStatus === '市级下发 (待区级接收)') ? (
                                    <button 
                                      onClick={() => openWorkflowModal(row, '下发')}
                                      className="w-full text-left px-3.5 py-2 hover:bg-blue-50 hover:text-[#419EFF] flex items-center gap-2 transition-colors font-medium text-gray-700"
                                    >
                                      <Send size={12} className="text-blue-500" />
                                      <span>下发督办件</span>
                                    </button>
                                  ) : (
                                    <div className="px-3.5 py-1.5 text-gray-300 text-[10px] italic flex items-center gap-1.5 select-none lines-through-none border-b border-gray-50">
                                      <Lock size={10} /> 暂无可下发极
                                    </div>
                                  )}

                                  {/* 上报: 已签收后，上报至区分局大队审核 */}
                                  {currentStatus === '已签收 (查处中)' ? (
                                    <button 
                                      onClick={() => openWorkflowModal(row, '上报')}
                                      className="w-full text-left px-3.5 py-2 hover:bg-[#FFF9E6] hover:text-[#B27B00] flex items-center gap-2 transition-colors font-medium text-gray-700"
                                    >
                                      <ClipboardCheck size={12} className="text-amber-600 font-bold" />
                                      <span className="font-semibold">上报备案件</span>
                                    </button>
                                  ) : null}

                                  {/* 签收: 区级下发后，属地派出所签收 */}
                                  {currentStatus === '区级下发 (待派出所签收)' ? (
                                    <button 
                                      onClick={() => openWorkflowModal(row, '签收')}
                                      className="w-full text-left px-3.5 py-2 hover:bg-green-50 hover:text-green-700 flex items-center gap-2 transition-colors font-medium text-gray-700"
                                    >
                                      <UserCheck size={12} className="text-green-600" />
                                      <span>单位签收</span>
                                    </button>
                                  ) : null}

                                  {/* 审核: 查处上报之后，逐局往上审查 */}
                                  {(currentStatus === '派出所已上报 (待区级审核)' || 
                                    currentStatus === '区级审核通过 (待市级审核)' || 
                                    currentStatus === '市级审核通过 (待省级审核)') ? (
                                    <button 
                                      onClick={() => openWorkflowModal(row, '审核')}
                                      className="w-full text-left px-3.5 py-2 hover:bg-amber-50 hover:text-amber-700 flex items-center gap-2 transition-colors font-medium text-gray-700"
                                    >
                                      <FileCheck size={12} className="text-amber-500" />
                                      <span>逐级审核</span>
                                    </button>
                                  ) : null}

                                  {/* 重置流程以支持全权限循环演练 */}
                                  {currentStatus === '督办完成' ? (
                                    <button 
                                      onClick={() => {
                                        const updated = data.map(r => {
                                          if (r.id === row.id) {
                                            return {
                                              ...r,
                                              supervisionStatus: '待下发',
                                              isInvestigated: '未查处',
                                              specificIllegalBehavior: '',
                                              punishmentResult: '',
                                              credentialsUrl: [],
                                              supervisionLogs: [
                                                {
                                                  id: 'log_' + Math.random().toString(36).substring(2, 9),
                                                  time: new Date().toISOString().slice(0, 19).replace('T', ' '),
                                                  unit: '全权限演示沙箱',
                                                  operator: '超级业务管理员',
                                                  action: '重置演练',
                                                  remark: '已将此督办件置回为"待下发"初始挂账状态，可重新进行[下发、签慢、上报、审核、退回]全流程操作演练。'
                                                }
                                              ]
                                            };
                                          }
                                          return r;
                                        });
                                        setData(updated);
                                        localStorage.setItem('case_supervisions', JSON.stringify(updated));
                                        showToast('案卷已重置为待下发状态，可开始全新流程演示！', 'info');
                                        setOpenDropdown(null);
                                      }}
                                      className="w-full text-left px-3.5 py-2 hover:bg-orange-50 hover:text-orange-700 flex items-center gap-2 transition-colors font-semibold text-gray-700 border-t border-gray-150 text-[11px]"
                                    >
                                      <RotateCcw size={12} className="text-orange-600" />
                                      <span>重置此单重新演示</span>
                                    </button>
                                  ) : null}

                                  {/* 退回 / 回滚: 只要不是待下发且不是督办结案，都可以点退回操作来进行回滚 */}
                                  {(currentStatus !== '待下发' && currentStatus !== '督办完成') ? (
                                    <button 
                                      onClick={() => openWorkflowModal(row, '退回')}
                                      className="w-full text-left px-3.5 py-2 hover:bg-red-50 hover:text-red-700 flex items-center gap-2 transition-colors font-medium text-gray-700 border-t border-gray-100"
                                    >
                                      <Undo2 size={12} className="text-red-500" />
                                      <span>退回报备 / 回滚</span>
                                    </button>
                                  ) : null}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 分页区域 */}
          <div className="px-5 py-3 border-t border-gray-200 flex items-center justify-between bg-[#FAFCFF] shrink-0 font-sans">
            <div className="text-xs text-gray-500">
              显示第 1 到第 {filteredData.length} 条记录，总共 <span className="font-bold text-[#419EFF]">{filteredData.length}</span> 条记录
            </div>
            <div className="flex space-x-1">
              <button className="px-2.5 py-1 border border-gray-300 rounded text-xs text-gray-400 bg-gray-50 cursor-not-allowed font-medium">上一页</button>
              <button className="px-2.5 py-1 border border-[#419EFF] rounded text-xs text-white bg-[#419EFF] font-bold">1</button>
              <button className="px-2.5 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50 font-medium">下一页</button>
            </div>
          </div>
        </div>
      </div>

      {/* 流程审批流转模态框 (Requirement 6 - 省级向下逐级下发，指定单位签收，向上逐级审核，各级回退) */}
      {workflowCase && workflowAction && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-lg overflow-hidden font-sans animate-scaleIn text-left">
            <div className="px-5 py-4 border-b border-gray-100 bg-[#FAFAFC] flex justify-between items-center">
              <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                <Activity size={16} className="text-[#419EFF]" />
                一案双查督办流转：执行【{workflowAction}】操作
              </h4>
              <button onClick={() => { setWorkflowCase(null); setWorkflowAction(null); }}>
                <span className="text-gray-400 hover:text-gray-600 text-lg">&times;</span>
              </button>
            </div>

            <form onSubmit={handleWorkflowSubmit} className="p-5 space-y-4">
              
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded text-xs space-y-1.5 text-blue-900 leading-relaxed">
                <div><span className="font-bold">被查处场所：</span>{workflowCase.associatedPlaceName || workflowCase.company || '（待补入）'}</div>
                <div><span className="font-bold">案件编号：</span>{workflowCase.caseNo}</div>
                <div><span className="font-bold">当前环节值：</span>{renderStatusBadge(workflowCase.supervisionStatus || '待下发')}</div>
              </div>

              {/* 针对不同动作显示表头/控件 */}
              {workflowAction === '下发' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      指派下达目标层级单位 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={nextTargetUnit}
                      onChange={e => setNextTargetUnit(e.target.value)}
                      className="w-full h-9 px-3 border border-gray-300 rounded text-xs outline-none focus:border-[#419EFF] bg-white font-semibold text-gray-700"
                    >
                      {getNextDispatchDefaults(workflowCase.supervisionStatus || '待下发').units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">下发工作督办意见</label>
                    <textarea
                      value={workflowRemarks}
                      onChange={e => setWorkflowRemarks(e.target.value)}
                      className="w-full h-20 p-2.5 border border-gray-300 rounded text-xs outline-none focus:border-[#419EFF] resize-none"
                      placeholder="请明晰下派排摸重点、时限要求，督促限期整改并反馈查处和处罚文号..."
                    />
                  </div>
                </div>
              )}

              {workflowAction === '签收' && (
                <div className="space-y-2 py-2">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    您将以属地派出所 <span className="font-semibold text-red-600">"{workflowCase.dispatchPoliceStation || '五凤派出所'}"</span> 的名义签收此督办件。
                  </p>
                  <p className="text-xs text-gray-500 font-bold bg-amber-50 p-2.5 border border-amber-200 rounded">
                    ⚠️ 签收后，请立即开展核实调查，并在本系统该项数据条中【修改（登记查处信息）】填报具体违法行为、处罚结果和上传纸质处罚书扫描件！
                  </p>
                </div>
              )}

              {workflowAction === '上报' && (
                <div className="space-y-3">
                  <div className="bg-amber-50 text-[#B27B00] border border-amber-200 p-3 rounded text-xs space-y-1">
                    <p className="font-bold">📋 场所查处上报前核验提示：</p>
                    <p>请确保您已在本条数据的「修改」中完成以下登记：</p>
                    <ul className="list-disc list-inside text-[11px] font-semibold space-y-0.5">
                      <li>场所是否已查处（标记为：已查处）</li>
                      <li>具体违法违规行为说明</li>
                      <li>案件处罚结果及罚单文号</li>
                      <li>上传并补齐纸质处罚决定凭证件</li>
                    </ul>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">上报工作情况及备注</label>
                    <textarea
                      value={workflowRemarks}
                      onChange={e => setWorkflowRemarks(e.target.value)}
                      className="w-full h-20 p-2.5 border border-gray-300 rounded text-xs outline-none focus:border-[#419EFF] resize-none"
                      placeholder="请详细叙述本次查处及处罚执行过程、责令限期整改详情、取缔查封实施情况等..."
                    />
                  </div>
                </div>
              )}

              {workflowAction === '审核' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">审核判定结论 <span className="text-red-500">*</span></label>
                    <div className="flex space-x-6">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 cursor-pointer">
                        <input
                          type="radio"
                          name="audit"
                          checked={auditDecision === 'agree'}
                          onChange={() => setAuditDecision('agree')}
                          className="accent-green-600"
                        />
                        <span className="text-green-700">同意通过 (合格，流转提呈上级)</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 cursor-pointer">
                        <input
                          type="radio"
                          name="audit"
                          checked={auditDecision === 'reject'}
                          onChange={() => setAuditDecision('reject')}
                          className="accent-red-600"
                        />
                        <span className="text-red-700">不同意退回 (材料不符，退回下级)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">审核批示意见说明</label>
                    <textarea
                      value={workflowRemarks}
                      onChange={e => setWorkflowRemarks(e.target.value)}
                      className="w-full h-20 p-2.5 border border-gray-300 rounded text-xs outline-none focus:border-[#419EFF] resize-none"
                      placeholder="请填写详细的工作批示说明或退回重办原因细节说明..."
                    />
                  </div>
                </div>
              )}

              {workflowAction === '退回' && (
                <div className="space-y-3">
                  <div className="bg-red-50 text-red-900 border border-red-200 p-3 rounded text-[11px] leading-relaxed">
                    <span className="font-bold flex items-center gap-1 mb-1"><AlertCircle size={12} /> 操作回退说明：</span>
                    对于指派分配不当、涉事管辖有误的督办，可以对该案进行回退。本状态回滚将把环节回退至前置派发点，方便重新下达。
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">请填写退回/回退驳回理由：</label>
                    <textarea
                      value={workflowRemarks}
                      onChange={e => setWorkflowRemarks(e.target.value)}
                      className="w-full h-20 p-2.5 border border-gray-300 rounded text-xs outline-none focus:border-[#419EFF] resize-none"
                      placeholder="请在此写明回退因由，以便上游部门核查重下达..."
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => { setWorkflowCase(null); setWorkflowAction(null); }}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded text-xs font-bold hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 text-white rounded text-xs font-bold transition-colors ${
                    workflowAction === '下发' ? 'bg-[#419EFF] hover:bg-blue-600' :
                    workflowAction === '退回' ? 'bg-red-600 hover:bg-red-700' :
                    workflowAction === '签收' ? 'bg-green-600 hover:bg-green-700' :
                    workflowAction === '上报' ? 'bg-amber-600 hover:bg-amber-700' :
                    auditDecision === 'agree' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  确认流转提交
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
