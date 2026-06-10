import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Plus, Trash2, Camera, HelpCircle, FileText, Search, Link, Users, Landmark, ShieldAlert, CheckCircle } from 'lucide-react';
import { api } from '../api';
import { Case, Enterprise, Personnel } from '../types';

interface CasePunishmentFormProps {
  onCancel: () => void;
  onSave: () => void;
  id?: string;
}

export default function CasePunishmentForm({ onCancel, onSave, id }: CasePunishmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [personnelList, setPersonnelList] = useState<Personnel[]>([]);
  const [formData, setFormData] = useState<Partial<Case>>({
    caseNo: '',
    caseName: '',
    caseCategory: '行政违规',
    caseType: '行政案件',
    caseStartTime: '',
    caseEndTime: '',
    caseStatus: '处理中',
    dispatchPoliceStation: '五凤派出所',
    alarmNo: '',
    alarmTime: '',
    crimeSceneDistrict: '福州市鼓楼区',
    crimeSceneAddress: '',
    briefCase: '',
    punishmentMeasures: '',
    caseImages: [],
    
    filingTime: '',
    filingUnit: '鼓楼分局治安大队',
    filingOfficer: '林警官',
    transferTime: '',
    transferUnit: '',
    transferOfficer: '',
    acceptanceTime: '',
    acceptanceUnit: '',
    acceptor: '',
    solutionTime: '',
    solutionUnit: '',
    solutionOfficer: '',
    closingTime: '',
    cancellationTime: '',

    associatedEnterpriseIds: [],
    suspects: [],
    victims: [],

    // 案事件查处信息新加字段 (Requirement 4)
    specificIllegalBehavior: '',
    punishmentResult: '',
    isInvestigated: '未查处',
    investigationTime: '',
    investigationDate: '',
    credentialsUrl: []
  });

  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false);
  const [showPersonnelModal, setShowPersonnelModal] = useState(false);
  const [searchEntQuery, setSearchEntQuery] = useState('');
  const [searchPerQuery, setSearchPerQuery] = useState('');
  const [activeRelationTab, setActiveRelationTab] = useState<'places' | 'suspects' | 'victims'>('places');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCredentialUrl, setNewCredentialUrl] = useState('');

  // 样机推荐照片
  const sampleImages = [
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?w=500&auto=format&fit=crop&q=60'
  ];

  // 样机的查处凭证(处罚意见决定书样张)
  const sampleCredentials = [
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=500&auto=format&fit=crop&q=60'
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const entList = await api.enterprise.getAll();
        setEnterprises(entList);

        const perList = await api.personnel.getAll();
        setPersonnelList(perList || []);

        if (id) {
          // 查看是否存在本地一案双查缓存
          const localVal = localStorage.getItem('case_supervisions');
          let foundDetail = null;
          if (localVal) {
            const list = JSON.parse(localVal);
            foundDetail = list.find((item: any) => item.id === id);
          }
          
          if (foundDetail) {
            setFormData(foundDetail);
          } else {
            const detail = await api.case.getById(id);
            if (detail) {
              setFormData({
                ...detail,
                specificIllegalBehavior: detail.specificIllegalBehavior || '',
                punishmentResult: detail.punishmentResult || '',
                isInvestigated: detail.isInvestigated || '未查处',
                investigationTime: detail.investigationTime || '',
                investigationDate: detail.investigationDate || '',
                credentialsUrl: detail.credentialsUrl || []
              });
            }
          }
        } else {
          // 自动生一个案事件立案编号
          const randomSuffix = Math.floor(1000 + Math.random() * 9000);
          const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
          setFormData(prev => ({
            ...prev,
            caseNo: `AJ${dateStr}${randomSuffix}`
          }));
        }
      } catch (error) {
        console.error('Failed to prepare form variables:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.caseNo || !formData.caseName) {
      alert('请核准必填项，确保已填入[案件编号]与[案件名称]！');
      return;
    }

    try {
      // 组装要发给服务层的结构
      const savePayload: Case = {
        ...formData,
        title: formData.caseName,
        type: formData.caseCategory || '行政违规',
        date: formData.caseStartTime ? formData.caseStartTime.substring(0, 10) : new Date().toISOString().substring(0, 10),
        status: formData.caseStatus || '处理中',
        violator: formData.suspects && formData.suspects.length > 0 
          ? formData.suspects.map(s => s.name).join(', ') 
          : '未设定对象',
        company: formData.associatedEnterpriseIds && formData.associatedEnterpriseIds.length > 0 && enterprises.length > 0
          ? enterprises.filter(ent => formData.associatedEnterpriseIds?.includes(ent.id)).map(e => e.name).join(', ')
          : '未关联企业'
      } as any;

      // 保存到 api (模拟内存)
      await api.case.save(savePayload);

      // 同时保存/更新至本地 localstorage 以便在 PunishmentList 的督办列表中完美呈现
      const localVal = localStorage.getItem('case_supervisions');
      let list = [];
      if (localVal) {
        list = JSON.parse(localVal);
      }

      const existingIndex = list.findIndex((x: any) => x.id === (id || savePayload.id));
      if (existingIndex > -1) {
        // 如果是编辑更新，保持原有的督办状态和日志
        list[existingIndex] = {
          ...list[existingIndex],
          ...savePayload,
          isInvestigated: formData.isInvestigated || '未查处',
          // 如果这次改成了「已查处」，则自动带上当前查处时间
          investigationTime: formData.isInvestigated === '已查处' && !formData.investigationTime
            ? new Date().toISOString().replace('T', ' ').substring(0, 19)
            : formData.investigationTime,
          investigationDate: formData.isInvestigated === '已查处' && !formData.investigationDate
            ? new Date().toISOString().substring(0, 10)
            : formData.investigationDate
        };
      } else {
        // 如果是全新录入督办件补录，初始化流转状态和步骤
        const newRecord = {
          ...savePayload,
          id: id || Math.random().toString(36).substring(2, 9),
          supervisionStatus: '待下发', // 初始默认状态
          isInvestigated: formData.isInvestigated || '未查处',
          investigationTime: formData.isInvestigated === '已查处' 
            ? new Date().toISOString().replace('T', ' ').substring(0, 19)
            : '',
          investigationDate: formData.isInvestigated === '已查处' 
            ? new Date().toISOString().substring(0, 10)
            : '',
          supervisionLogs: [
            {
              id: 'log_' + Math.random().toString(36).substring(2, 9),
              time: new Date().toISOString().slice(0, 19).replace('T', ' '),
              unit: '公安政务办事端',
              operator: '录入警员',
              action: '督办件补录登记',
              remark: `录入了基本挂账督办文书，涉案场所有限公司，进入待下发派库状态。`
            }
          ]
        };
        list.push(newRecord);
      }

      localStorage.setItem('case_supervisions', JSON.stringify(list));
      onSave();
    } catch (err) {
      console.error(err);
      alert('保存失败，请检查各字段完整性');
    }
  };

  // 添加案件图片
  const addImageUrl = () => {
    if (newImageUrl.trim() && !formData.caseImages?.includes(newImageUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        caseImages: [...(prev.caseImages || []), newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const removeImageUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      caseImages: (prev.caseImages || []).filter((_, i) => i !== index)
    }));
  };

  // 嫌疑人增删改 (对齐大表单逻辑)
  const handleAddManualSuspect = () => {
    const defaultSuspect = {
      id: 'sus_' + Math.random().toString(36).substring(2, 9),
      name: '',
      gender: '男',
      idCard: '',
      phone: '',
      status: '审查中',
      birthdate: '',
      householdAddress: '',
      occupation: '',
      roomEntryMethod: ''
    };
    setFormData(prev => ({
      ...prev,
      suspects: [...(prev.suspects || []), defaultSuspect]
    }));
  };

  const handleSelectSuspectFromList = (person: any) => {
    const alreadyConnected = formData.suspects?.some(s => s.idCard === person.idCard);
    if (alreadyConnected) {
      alert('该人员已在嫌疑人名单中！');
      return;
    }
    const selectedSuspect = {
      id: person.id || 'sus_' + Math.random().toString(36).substring(2, 9),
      name: person.name || '',
      gender: person.gender || '男',
      idCard: person.idCard || '',
      phone: person.phone || '',
      status: '审查中',
      birthdate: '',
      householdAddress: '',
      occupation: person.position || '',
      roomEntryMethod: ''
    };
    setFormData(prev => ({
      ...prev,
      suspects: [...(prev.suspects || []), selectedSuspect]
    }));
  };

  const updateSuspectField = (idx: number, field: string, value: any) => {
    setFormData(prev => {
      const list = [...(prev.suspects || [])];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, suspects: list };
    });
  };

  const removeSuspectItem = (idx: number) => {
    setFormData(prev => {
      const list = [...(prev.suspects || [])];
      list.splice(idx, 1);
      return { ...prev, suspects: list };
    });
  };

  // 受害人增删改
  const handleAddManualVictim = () => {
    const defaultVictim = {
      id: 'vic_' + Math.random().toString(36).substring(2, 9),
      name: '',
      gender: '男',
      idCard: '',
      phone: '',
      details: '',
      birthdate: '',
      householdAddress: '',
      identity: '',
      roomEntryMethod: '',
      relationWithSuspect: ''
    };
    setFormData(prev => ({
      ...prev,
      victims: [...(prev.victims || []), defaultVictim]
    }));
  };

  const updateVictimField = (idx: number, field: string, value: any) => {
    setFormData(prev => {
      const list = [...(prev.victims || [])];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, victims: list };
    });
  };

  const removeVictimItem = (idx: number) => {
    setFormData(prev => {
      const list = [...(prev.victims || [])];
      list.splice(idx, 1);
      return { ...prev, victims: list };
    });
  };

  // 添加上传凭证
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const base64Url = reader.result;
          setFormData(prev => ({
            ...prev,
            credentialsUrl: [...(prev.credentialsUrl || []), base64Url]
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addCredentialUrl = () => {
    if (newCredentialUrl.trim() && !formData.credentialsUrl?.includes(newCredentialUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        credentialsUrl: [...(prev.credentialsUrl || []), newCredentialUrl.trim()]
      }));
      setNewCredentialUrl('');
    }
  };

  const removeCredentialUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      credentialsUrl: (prev.credentialsUrl || []).filter((_, i) => i !== index)
    }));
  };

  const addSampleCredential = (url: string) => {
    if (!formData.credentialsUrl?.includes(url)) {
      setFormData(prev => ({
        ...prev,
        credentialsUrl: [...(prev.credentialsUrl || []), url]
      }));
    }
  };

  const handleToggleEnterpriseLink = (entId: string) => {
    setFormData(prev => {
      const currentIds = prev.associatedEnterpriseIds || [];
      let newIds = [];
      if (currentIds.includes(entId)) {
        newIds = currentIds.filter(id => id !== entId);
      } else {
        newIds = [...currentIds, entId];
      }
      return {
        ...prev,
        associatedEnterpriseIds: newIds
      };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F3]">
        <div className="text-center font-sans p-6 bg-white rounded border border-gray-150">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#419EFF] mx-auto mb-2.5"></div>
          <p className="text-xs text-gray-500 font-medium">配置大表单项与企业档库同步中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F5F3] overflow-hidden font-sans text-left relative">
      
      {/* 顶部固定标题与操作栏 (Requirement 4: 命名改为 督办件补录) */}
      <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex justify-between items-center shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#419EFF] rounded-full"></span>
          <h2 className="text-sm font-bold text-gray-800">
            {id ? '督办督查与查处信息修改' : '督办件补录 (场所处罚挂账)'}
          </h2>
          <span className="text-[10px] text-gray-400 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200 font-mono">
            {formData.caseNo || '督办编号生成中'}
          </span>
        </div>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={onCancel}
            className="px-4 py-1.5 border border-gray-300 text-gray-600 rounded bg-white hover:bg-gray-50 text-xs font-bold transition-all cursor-pointer"
          >
            返回列表
          </button>
        </div>
      </div>

      {/* 主流表单内容展示区 */}
      <form onSubmit={handleSave} className="flex-1 overflow-auto p-5 space-y-6 pb-24">
        
        {/* SECTION 1: 案件基本信息 (同案事件详情表) */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#EBF3FE] flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-blue-500 rounded-full"></span>
            <span className="text-xs font-bold text-gray-800">一、挂账案件基本信息</span>
          </div>
          
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <FormField label="案件编号" required>
                <input 
                  type="text" 
                  value={formData.caseNo || ''} 
                  onChange={e => setFormData({ ...formData, caseNo: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none bg-amber-50/10 font-bold font-mono"
                  placeholder="文书编号" 
                />
              </FormField>

              <FormField label="案件名称" required>
                <input 
                  type="text" 
                  value={formData.caseName || ''} 
                  onChange={e => setFormData({ ...formData, caseName: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none font-semibold text-gray-800"
                  placeholder="挂账立案名称" 
                />
              </FormField>

              <FormField label="案件类别" required>
                <select 
                  value={formData.caseCategory || '行政违规'} 
                  onChange={e => setFormData({ ...formData, caseCategory: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded bg-white focus:border-[#419EFF] outline-none font-medium"
                >
                  <option value="治安事件">治安事件</option>
                  <option value="刑事案件">刑事案件</option>
                  <option value="行政违规">行政违规</option>
                  <option value="消防警情">消防警情</option>
                  <option value="交通管理">交通管理</option>
                </select>
              </FormField>

              <FormField label="案件类型">
                <input 
                  type="text" 
                  value={formData.caseType || ''} 
                  onChange={e => setFormData({ ...formData, caseType: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] outline-none"
                  placeholder="如：行政处罚案件" 
                />
              </FormField>

              <FormField label="案发开始时间">
                <input 
                  type="datetime-local" 
                  value={formData.caseStartTime || ''} 
                  onChange={e => setFormData({ ...formData, caseStartTime: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] outline-none"
                />
              </FormField>

              <FormField label="案发结束时间">
                <input 
                  type="datetime-local" 
                  value={formData.caseEndTime || ''} 
                  onChange={e => setFormData({ ...formData, caseEndTime: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                />
              </FormField>

              <FormField label="立案处理状态">
                <select
                  value={formData.caseStatus || '处理中'}
                  onChange={e => setFormData({ ...formData, caseStatus: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded bg-white focus:border-[#419EFF] outline-none font-medium text-gray-700"
                >
                  <option value="处理中">处理中</option>
                  <option value="待复核">待复核</option>
                  <option value="已结案">已结案</option>
                  <option value="不予立案">不予立案</option>
                </select>
              </FormField>

              <FormField label="指派派出所">
                <input 
                  type="text" 
                  value={formData.dispatchPoliceStation || ''} 
                  onChange={e => setFormData({ ...formData, dispatchPoliceStation: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                  placeholder="负责现场核查的派出所" 
                />
              </FormField>

              <FormField label="报警时间">
                <input 
                  type="datetime-local" 
                  value={formData.alarmTime || ''} 
                  onChange={e => setFormData({ ...formData, alarmTime: e.target.value })}
                  className="w-full h-8.5 px-2 border border-gray-300 rounded text-xs outline-none focus:border-[#419EFF]"
                />
              </FormField>

              <FormField label="发案地行政区划">
                <input 
                  type="text" 
                  value={formData.crimeSceneDistrict || ''} 
                  onChange={e => setFormData({ ...formData, crimeSceneDistrict: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] outline-none"
                  placeholder="如：福州市鼓楼区" 
                />
              </FormField>

              <FormField label="发案地详细地址">
                <input 
                  type="text" 
                  value={formData.crimeSceneAddress || ''} 
                  onChange={e => setFormData({ ...formData, crimeSceneAddress: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] outline-none"
                  placeholder="街道、门牌、场所细节" 
                />
              </FormField>
            </div>

            <div className="space-y-1 text-xs text-left">
              <label className="block font-bold text-gray-600">简要案情描述</label>
              <textarea 
                value={formData.briefCase || ''} 
                onChange={e => setFormData({ ...formData, briefCase: e.target.value })}
                className="w-full h-20 p-2.5 border border-gray-300 rounded focus:border-[#419EFF] outline-none resize-none text-xs"
                placeholder="此处记录省厅立案治安情况、涉事场所发现的原始事件因果..."
              />
            </div>

            <div className="space-y-1 text-xs text-left">
              <label className="block font-bold text-gray-600">针对性处罚措施/行政强制指令</label>
              <textarea 
                value={formData.punishmentMeasures || ''} 
                onChange={e => setFormData({ ...formData, punishmentMeasures: e.target.value })}
                className="w-full h-20 p-2.5 border border-gray-300 rounded focus:border-[#419EFF] outline-none resize-none text-xs text-blue-800 bg-blue-50/10"
                placeholder="此处记录拟实施的停业整顿、警告、罚款、限期整改指令等..."
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: 案件办理信息 (Requirement 2: 完全对齐内页字段) */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#E8F8F5] flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-emerald-500 rounded-full"></span>
            <span className="text-xs font-bold text-gray-800">二、案件办理信息</span>
          </div>
          <div className="p-5 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="立案时间">
                <input 
                  type="datetime-local" 
                  value={formData.filingTime || ''} 
                  onChange={e => setFormData({ ...formData, filingTime: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] outline-none"
                />
              </FormField>
              <FormField label="立案单位">
                <input 
                  type="text" 
                  value={formData.filingUnit || ''} 
                  onChange={e => setFormData({ ...formData, filingUnit: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                  placeholder="入档立案分局科室" 
                />
              </FormField>
              <FormField label="立案人">
                <input 
                  type="text" 
                  value={formData.filingOfficer || ''} 
                  onChange={e => setFormData({ ...formData, filingOfficer: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                  placeholder="主承办民警" 
                />
              </FormField>

              <FormField label="移送时间">
                <input 
                  type="datetime-local" 
                  value={formData.transferTime || ''} 
                  onChange={e => setFormData({ ...formData, transferTime: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                />
              </FormField>
              <FormField label="移送单位">
                <input 
                  type="text" 
                  value={formData.transferUnit || ''} 
                  onChange={e => setFormData({ ...formData, transferUnit: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                  placeholder="接收单位名称" 
                />
              </FormField>
              <FormField label="移送人">
                <input 
                  type="text" 
                  value={formData.transferOfficer || ''} 
                  onChange={e => setFormData({ ...formData, transferOfficer: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                />
              </FormField>

              <FormField label="受理/接收时间">
                <input 
                  type="datetime-local" 
                  value={formData.acceptanceTime || ''} 
                  onChange={e => setFormData({ ...formData, acceptanceTime: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                />
              </FormField>
              <FormField label="受理/接收单位">
                <input 
                  type="text" 
                  value={formData.acceptanceUnit || ''} 
                  onChange={e => setFormData({ ...formData, acceptanceUnit: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                />
              </FormField>
              <FormField label="受理人">
                <input 
                  type="text" 
                  value={formData.acceptor || ''} 
                  onChange={e => setFormData({ ...formData, acceptor: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                />
              </FormField>

              <FormField label="破案时间">
                <input 
                  type="datetime-local" 
                  value={formData.solutionTime || ''} 
                  onChange={e => setFormData({ ...formData, solutionTime: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                />
              </FormField>
              <FormField label="破案单位">
                <input 
                  type="text" 
                  value={formData.solutionUnit || ''} 
                  onChange={e => setFormData({ ...formData, solutionUnit: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                />
              </FormField>
              <FormField label="破案人">
                <input 
                  type="text" 
                  value={formData.solutionOfficer || ''} 
                  onChange={e => setFormData({ ...formData, solutionOfficer: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                />
              </FormField>

              <FormField label="结案时间">
                <input 
                  type="datetime-local" 
                  value={formData.closingTime || ''} 
                  onChange={e => setFormData({ ...formData, closingTime: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                />
              </FormField>
              <FormField label="销案时间">
                <input 
                  type="datetime-local" 
                  value={formData.cancellationTime || ''} 
                  onChange={e => setFormData({ ...formData, cancellationTime: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* SECTION 3: 案件关联信息 (TAB形式) */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#FCF3EA] flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5 text-left">
              <span className="w-1.5 h-3 bg-orange-500 rounded-full"></span>
              <span>三、案件关联信息 (多方参与要素)</span>
            </h3>
          </div>
          
          {/* 页签 Tab 头部 */}
          <div className="bg-[#FAFBFD] border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-1 shrink-0 gap-3 text-left">
            <div className="flex space-x-6 animate-fade-in">
              <button 
                type="button"
                onClick={() => setActiveRelationTab('places')}
                className={`py-3.5 text-xs font-bold transition-all border-b-2 relative shrink-0 cursor-pointer ${
                  activeRelationTab === 'places' ? 'text-[#419EFF] border-[#419EFF]' : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                关联企业网点 ({formData.associatedEnterpriseIds?.length || 0})
              </button>
              <button 
                type="button"
                onClick={() => setActiveRelationTab('suspects')}
                className={`py-3.5 text-xs font-bold transition-all border-b-2 relative shrink-0 cursor-pointer ${
                  activeRelationTab === 'suspects' ? 'text-[#419EFF] border-[#419EFF]' : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                嫌疑对象 ({formData.suspects?.length || 0})
              </button>
              <button 
                type="button"
                onClick={() => setActiveRelationTab('victims')}
                className={`py-3.5 text-xs font-bold transition-all border-b-2 relative shrink-0 cursor-pointer ${
                  activeRelationTab === 'victims' ? 'text-[#419EFF] border-[#419EFF]' : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                受害者 ({formData.victims?.length || 0})
              </button>
            </div>

            {/* 操作按钮 */}
            <div className="py-2 sm:py-0 flex items-center gap-2">
              {activeRelationTab === 'places' && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchEntQuery('');
                    setShowEnterpriseModal(true);
                  }}
                  className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-xs font-semibold rounded flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Search size={12} /> 关联在档网点
                </button>
              )}
              {activeRelationTab === 'suspects' && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchPerQuery('');
                      setShowPersonnelModal(true);
                    }}
                    className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100 rounded text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Search size={11} /> 人员库导入
                  </button>
                  <button
                    type="button"
                    onClick={handleAddManualSuspect}
                    className="px-2.5 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 border border-green-100 rounded text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus size={11} /> 手动极速建报
                  </button>
                </div>
              )}
              {activeRelationTab === 'victims' && (
                <button
                  type="button"
                  onClick={handleAddManualVictim}
                  className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100 rounded text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus size={11} /> 手动录入受害者
                </button>
              )}
            </div>
          </div>

          <div className="p-5 space-y-6 text-xs bg-white min-h-[200px]">
            {activeRelationTab === 'places' && (
              <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm">
                <table className="w-full border-collapse text-[11px] text-left">
                  <thead className="bg-[#fdfaf7] text-gray-600 font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2.5 w-12 text-center">#</th>
                      <th className="px-4 py-2.5">场所/企业名</th>
                      <th className="px-4 py-2.5">社会信用码</th>
                      <th className="px-4 py-2.5">所属辖区</th>
                      <th className="px-4 py-2.5 w-20 text-center">解绑</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(!formData.associatedEnterpriseIds || formData.associatedEnterpriseIds.length === 0) ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-10 text-center text-gray-400 font-medium">
                          尚未通过数据库关联任何受处罚网点信息
                        </td>
                      </tr>
                    ) : (
                      enterprises
                        .filter(ent => formData.associatedEnterpriseIds?.includes(ent.id))
                        .map((ent, idx) => (
                          <tr key={ent.id} className="hover:bg-orange-50/20 group text-left">
                            <td className="px-4 py-2 text-center text-gray-400 font-bold">{idx + 1}</td>
                            <td className="px-4 py-2 font-bold text-gray-800">{ent.name}</td>
                            <td className="px-4 py-2 font-mono text-gray-400">{ent.uscc}</td>
                            <td className="px-4 py-2 text-gray-600">{ent.region}</td>
                            <td className="px-4 py-2 text-center">
                              <button type="button" onClick={() => handleToggleEnterpriseLink(ent.id)} className="text-gray-300 hover:text-red-500 p-1 cursor-pointer transition-colors">
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeRelationTab === 'suspects' && (
              <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm">
                <table className="w-full border-collapse text-[11px] text-left">
                  <thead className="bg-[#f4f7fc] text-gray-600 font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2.5 w-10 text-center font-mono">#</th>
                      <th className="px-3 py-2.5 min-w-[90px]">姓名</th>
                      <th className="px-3 py-2.5 min-w-[60px] text-center">性别</th>
                      <th className="px-3 py-2.5 min-w-[125px]">出生日期</th>
                      <th className="px-3 py-2.5 min-w-[170px]">证件号码</th>
                      <th className="px-3 py-2.5 min-w-[170px]">户籍地址</th>
                      <th className="px-3 py-2.5 min-w-[120px]">联系电话</th>
                      <th className="px-3 py-2.5 min-w-[110px]">身份/职业</th>
                      <th className="px-3 py-2.5 min-w-[110px]">进房方式</th>
                      <th className="px-3 py-2.5 w-14 text-center">删除</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(!formData.suspects || formData.suspects.length === 0) ? (
                      <tr>
                        <td colSpan={10} className="px-3 py-10 text-center text-gray-400 font-medium italic">尚未采集到嫌疑对象数据</td>
                      </tr>
                    ) : (
                      formData.suspects.map((s, idx) => (
                        <tr key={s.id || idx} className="hover:bg-blue-50/10 text-left">
                          <td className="px-3 py-2 text-center text-gray-300 font-bold">{idx + 1}</td>
                          <td className="px-3 py-2">
                            <input type="text" value={s.name || ''} onChange={e => updateSuspectField(idx, 'name', e.target.value)} className="w-full h-8 px-2 border border-gray-200 rounded focus:border-[#419EFF] outline-none text-xs" />
                          </td>
                          <td className="px-3 py-2 text-center text-gray-800">
                            <select value={s.gender || '男'} onChange={e => updateSuspectField(idx, 'gender', e.target.value)} className="h-8 px-1 border border-gray-200 rounded focus:border-[#419EFF] outline-none text-xs">
                              <option value="男">男</option>
                              <option value="女">女</option>
                            </select>
                          </td>
                          <td className="px-3 py-2">
                            <input type="date" value={s.birthdate || ''} onChange={e => updateSuspectField(idx, 'birthdate', e.target.value)} className="w-full h-8 px-1 border border-gray-200 rounded focus:border-[#419EFF] outline-none text-xs" />
                          </td>
                          <td className="px-3 py-2">
                            <input type="text" value={s.idCard || ''} onChange={e => updateSuspectField(idx, 'idCard', e.target.value)} className="w-full h-8 px-2 border border-gray-200 rounded font-mono text-xs" />
                          </td>
                          <td className="px-3 py-2">
                            <input type="text" value={s.householdAddress || ''} onChange={e => updateSuspectField(idx, 'householdAddress', e.target.value)} className="w-full h-8 px-2 border border-gray-200 rounded text-xs" />
                          </td>
                          <td className="px-3 py-2">
                            <input type="text" value={s.phone || ''} onChange={e => updateSuspectField(idx, 'phone', e.target.value)} className="w-full h-8 px-2 border border-gray-200 rounded font-mono text-xs" />
                          </td>
                          <td className="px-3 py-2">
                            <input type="text" value={s.occupation || ''} onChange={e => updateSuspectField(idx, 'occupation', e.target.value)} className="w-full h-8 px-2 border border-gray-200 rounded text-xs" />
                          </td>
                          <td className="px-3 py-2">
                            <input type="text" value={s.roomEntryMethod || ''} onChange={e => updateSuspectField(idx, 'roomEntryMethod', e.target.value)} className="w-full h-8 px-2 border border-gray-200 rounded text-xs" />
                          </td>
                          <td className="px-3 py-2 text-center">
                            <button type="button" onClick={() => removeSuspectItem(idx)} className="text-red-400 hover:text-red-600 p-1 cursor-pointer transition-colors">
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeRelationTab === 'victims' && (
              <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm">
                <table className="w-full border-collapse text-[11px] text-left">
                  <thead className="bg-[#f0faf5] text-gray-600 font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2.5 w-10 text-center font-mono">#</th>
                      <th className="px-3 py-2.5 min-w-[90px]">姓名</th>
                      <th className="px-3 py-2.5 min-w-[60px] text-center">性别</th>
                      <th className="px-3 py-2.5 min-w-[125px]">出生日期</th>
                      <th className="px-3 py-2.5 min-w-[180px]">证件号码</th>
                      <th className="px-3 py-2.5 min-w-[180px]">户籍地址</th>
                      <th className="px-3 py-2.5 min-w-[120px]">联系电话</th>
                      <th className="px-3 py-2.5 min-w-[90px]">身份</th>
                      <th className="px-3 py-2.5 min-w-[90px]">进房方式</th>
                      <th className="px-3 py-2.5 min-w-[115px]">关嫌关系</th>
                      <th className="px-3 py-2.5 w-14 text-center">删除</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(!formData.victims || formData.victims.length === 0) ? (
                      <tr>
                        <td colSpan={11} className="px-3 py-10 text-center text-gray-400 font-medium italic">未登记受害者涉及人员数据</td>
                      </tr>
                    ) : (
                      formData.victims.map((v, idx) => (
                        <tr key={v.id || idx} className="hover:bg-emerald-50/10 text-left">
                          <td className="px-3 py-2 text-center text-gray-300 font-bold">{idx + 1}</td>
                          <td className="px-3 py-2">
                            <input type="text" value={v.name || ''} onChange={e => updateVictimField(idx, 'name', e.target.value)} className="w-full h-8 px-2 border border-gray-200 rounded focus:border-[#419EFF] outline-none text-xs" />
                          </td>
                          <td className="px-3 py-2 text-center text-gray-800">
                            <select value={v.gender || '男'} onChange={e => updateVictimField(idx, 'gender', e.target.value)} className="h-8 px-1 border border-gray-200 rounded focus:border-[#419EFF] outline-none text-xs">
                              <option value="男">男</option>
                              <option value="女">女</option>
                            </select>
                          </td>
                          <td className="px-3 py-2">
                            <input type="date" value={v.birthdate || ''} onChange={e => updateVictimField(idx, 'birthdate', e.target.value)} className="w-full h-8 px-1 border border-gray-200 rounded focus:border-[#419EFF] outline-none text-xs" />
                          </td>
                          <td className="px-3 py-2">
                            <input type="text" value={v.idCard || ''} onChange={e => updateVictimField(idx, 'idCard', e.target.value)} className="w-full h-8 px-2 border border-gray-200 rounded font-mono text-xs" />
                          </td>
                          <td className="px-3 py-2">
                            <input type="text" value={v.householdAddress || ''} onChange={e => updateVictimField(idx, 'householdAddress', e.target.value)} className="w-full h-8 px-2 border border-gray-200 rounded text-xs" />
                          </td>
                          <td className="px-3 py-2">
                            <input type="text" value={v.phone || ''} onChange={e => updateVictimField(idx, 'phone', e.target.value)} className="w-full h-8 px-2 border border-gray-200 rounded font-mono text-xs" />
                          </td>
                          <td className="px-3 py-2">
                            <input type="text" value={v.identity || ''} onChange={e => updateVictimField(idx, 'identity', e.target.value)} className="w-full h-8 px-2 border border-gray-200 rounded text-xs" />
                          </td>
                          <td className="px-3 py-2">
                            <input type="text" value={v.roomEntryMethod || ''} onChange={e => updateVictimField(idx, 'roomEntryMethod', e.target.value)} className="w-full h-8 px-2 border border-gray-200 rounded text-xs" />
                          </td>
                          <td className="px-3 py-2">
                            <input type="text" value={v.relationWithSuspect || ''} onChange={e => updateVictimField(idx, 'relationWithSuspect', e.target.value)} className="w-full h-8 px-2 border border-gray-200 rounded text-xs" />
                          </td>
                          <td className="px-3 py-2 text-center">
                            <button type="button" onClick={() => removeVictimItem(idx)} className="text-red-400 hover:text-red-600 p-1 cursor-pointer transition-colors">
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 4: 场所查处信息 (Requirement 2 & 4: 场所查处记录) */}
        <div className="bg-white rounded-lg border border-[#419EFF] shadow-sm overflow-hidden ring-1 ring-[#419EFF]/20">
          <div className="px-5 py-3 border-b border-[#419EFF]/20 bg-[#E8F3FF] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 bg-[#419EFF] rounded-full"></span>
              <span className="text-xs font-bold text-[#1e40af]">四、场所查处信息</span>
            </div>
            {id && (
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border uppercase tracking-wider ${
                formData.isInvestigated === '已查处' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'
              }`}>
                记录状态：{formData.isInvestigated || '未查处'}
              </span>
            )}
          </div>
          
          <div className="p-5 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField label="是否已现场查处">
                <select 
                  value={formData.isInvestigated || '未查处'} 
                  onChange={e => setFormData({ ...formData, isInvestigated: e.target.value })}
                  className="w-full h-9 px-3 border border-gray-300 rounded bg-white focus:border-[#419EFF] outline-none font-bold text-xs"
                >
                  <option value="未查处">未查处 (挂账中)</option>
                  <option value="已查处">已查处 (提交记录)</option>
                </select>
              </FormField>

              <FormField label="最终查办完成时间">
                <input 
                  type="datetime-local" 
                  value={formData.investigationTime || ''}
                  onChange={e => setFormData({ ...formData, investigationTime: e.target.value })}
                  className="w-full h-9 px-3 border border-gray-300 rounded text-xs outline-none focus:border-[#419EFF]"
                />
              </FormField>

              <FormField label="查案流水日期 (存档用)">
                <input 
                  type="date" 
                  value={formData.investigationDate || ''}
                  onChange={e => setFormData({ ...formData, investigationDate: e.target.value })}
                  className="w-full h-9 px-3 border border-gray-300 rounded text-xs font-mono outline-none focus:border-[#419EFF]"
                />
              </FormField>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700">核定具体违法违规行为描述</label>
                <textarea 
                  value={formData.specificIllegalBehavior || ''}
                  onChange={e => setFormData({ ...formData, specificIllegalBehavior: e.target.value })}
                  className="w-full h-24 p-3 border border-gray-200 rounded focus:border-[#419EFF] outline-none text-xs leading-relaxed shadow-inner bg-slate-50/20 resize-none"
                  placeholder="详细描述核查出的具体违规事实..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700">行政/治安处罚意见决定书摘要</label>
                <textarea 
                  value={formData.punishmentResult || ''}
                  onChange={e => setFormData({ ...formData, punishmentResult: e.target.value })}
                  className="w-full h-24 p-3 border border-gray-200 rounded focus:border-[#419EFF] outline-none text-xs leading-relaxed shadow-inner bg-amber-50/5 resize-none"
                  placeholder="录入公文最终处罚决定、处罚决定书号、整改期限等..."
                />
              </div>
            </div>

            {/* 查处凭证 (Requirement 4) */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <Camera size={14} className="text-[#419EFF]" />
                  查获文书/处罚决定书凭证附件 (一案双查支撑材料)：
                </label>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <label className="cursor-pointer group shrink-0">
                  <div className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 group-hover:border-[#419EFF] group-hover:text-[#419EFF] transition-all bg-slate-50 shadow-sm hover:shadow-md">
                    <Plus size={20} />
                    <span className="text-[10px] font-bold mt-1">本地上传</span>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </label>

                {formData.credentialsUrl?.map((url, index) => (
                  <div key={index} className="relative w-24 h-24 rounded-lg border border-gray-200 overflow-hidden bg-white group shadow-sm ring-1 ring-black/5">
                    <img src={url} alt="Credential" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <button type="button" onClick={() => removeCredentialUrl(index)} className="p-1 px-3 bg-red-600 text-white rounded text-[10px] font-black hover:bg-red-700 shadow-lg">移除</button>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-2 h-24">
                  <span className="text-[10px] text-gray-400">快速示例:</span>
                  {sampleCredentials.map((c, i) => (
                    <button key={i} type="button" onClick={() => addSampleCredential(c)} className="text-[10px] text-[#419EFF] hover:underline font-bold">样张-{i+1}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

            {/* 督办记录轨迹 (Requirement 2 & 4: 详情页需保留一案双查记录) */}
            {id && formData.supervisionLogs && formData.supervisionLogs.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-6 text-left">
                  <Landmark size={15} className="text-[#419EFF]" />
                  <span className="text-xs font-black text-gray-800 tracking-tight">「一案双查」督办流转生命周期轨迹：</span>
                </div>
                
                <div className="relative border-l border-blue-100 ml-3 pl-6 space-y-6 text-xs text-left pb-4">
                  {formData.supervisionLogs.map((log, index) => {
                    const isFirst = index === 0;
                    return (
                      <div key={log.id || index} className="relative">
                        {/* 圆点指示 */}
                        <span className={`absolute -left-[30px] top-0.5 rounded-full w-4 h-4 flex items-center justify-center border-2 ${
                          isFirst ? 'bg-[#419EFF] border-[#419EFF]/30 scale-110 shadow-sm shadow-[#419EFF]/20' : 'bg-white border-slate-300'
                        }`}>
                          {isFirst && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
                        </span>

                        <div className={`p-4 rounded-lg border transition-all ${
                          isFirst 
                            ? 'bg-blue-50/20 border-blue-200 shadow-sm' 
                            : 'bg-[#FCFCFD]/90 border-slate-200'
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-1.5 border-b border-gray-100 pb-1.5 mb-2">
                            <span className="font-bold text-gray-800 flex items-center gap-1">
                              <span>办理单位：{log.unit}</span>
                              <span className="px-2 py-0.2 bg-gray-100 text-gray-500 border border-gray-200 rounded text-[9px] font-bold">
                                {log.action}
                              </span>
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono font-bold">{log.time}</span>
                          </div>

                          <p className="text-xs text-gray-700 leading-relaxed font-sans mt-1">
                            <span className="font-semibold text-gray-500 mr-2">承办处理意见：</span>
                            {log.remark}
                          </p>

                          <div className="mt-2 text-[10px] text-gray-400 flex items-center justify-between pt-1 border-t border-dashed border-gray-100">
                            <span>处理柜面管理员：{log.operator}</span>
                            <span>序号：#{formData.supervisionLogs!.length - index}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

      </form>

      {/* 企业选择弹窗 */}
      {showEnterpriseModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[85vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-sm font-bold text-gray-800">关联在档企业网点</h3>
              <button onClick={() => setShowEnterpriseModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <Trash2 size={16} className="rotate-45" /> 
              </button>
            </div>
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="输入企业名称或社会信用代码搜索..."
                  value={searchEntQuery}
                  onChange={e => setSearchEntQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded focus:border-[#419EFF] outline-none text-xs"
                />
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-2">
              {enterprises
                .filter(ent => 
                  ent.name.includes(searchEntQuery) || 
                  ent.uscc.includes(searchEntQuery)
                )
                .map(ent => {
                  const isChecked = formData.associatedEnterpriseIds?.includes(ent.id);
                  return (
                    <div 
                      key={ent.id}
                      onClick={() => handleToggleEnterpriseLink(ent.id)}
                      className={`p-3 rounded border text-xs cursor-pointer transition-all flex items-center justify-between ${
                        isChecked ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-100 hover:border-gray-300'
                      }`}
                    >
                      <div>
                        <p className="font-bold">{ent.name}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{ent.uscc} | {ent.region}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isChecked ? 'bg-[#419EFF] border-[#419EFF]' : 'border-gray-300'}`}>
                        {isChecked && <CheckCircle size={10} className="text-white" />}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setShowEnterpriseModal(false)}
                className="px-6 py-2 bg-[#419EFF] text-white rounded text-xs font-bold shadow-md hover:bg-blue-600 transition-all"
              >
                确定关联
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 人员选择弹窗 (嫌疑人库导入) */}
      {showPersonnelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[85vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-sm font-bold text-gray-800">从从业人员库/重点人员库中导入</h3>
              <button onClick={() => setShowPersonnelModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <Trash2 size={16} className="rotate-45" />
              </button>
            </div>
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="搜索姓名或证件号码..."
                  value={searchPerQuery}
                  onChange={e => setSearchPerQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded focus:border-[#419EFF] outline-none text-xs"
                />
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-2 text-left">
              {personnelList
                .filter(p => 
                  p.name.includes(searchPerQuery) || 
                  p.idCard.includes(searchPerQuery)
                )
                .map(p => {
                  const isExisting = formData.suspects?.some(s => s.idCard === p.idCard);
                  return (
                    <div 
                      key={p.id}
                      onClick={() => !isExisting && handleSelectSuspectFromList(p)}
                      className={`p-3 rounded border text-xs flex items-center justify-between transition-all ${
                        isExisting ? 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed' : 'bg-white border-gray-100 hover:border-blue-200 cursor-pointer hover:bg-blue-50/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-gray-400">
                          <Users size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{p.name} <span className="font-normal text-gray-400 ml-1">({p.gender})</span></p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{p.idCard} | {p.phone}</p>
                        </div>
                      </div>
                      <button 
                        disabled={isExisting}
                        className={`px-3 py-1 rounded text-[10px] font-bold ${isExisting ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-100'}`}
                      >
                        {isExisting ? '已加入' : '导入'}
                      </button>
                    </div>
                  );
                })}
              {personnelList.filter(p => p.name.includes(searchPerQuery) || p.idCard.includes(searchPerQuery)).length === 0 && (
                <div className="py-10 text-center text-gray-400">未找到符合条件的人员数据</div>
              )}
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setShowPersonnelModal(false)}
                className="px-6 py-2 bg-gray-100 text-gray-600 rounded text-xs font-bold hover:bg-gray-200 transition-all"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 底部固定操作栏 */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-end shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 font-sans">
        <div className="flex space-x-3">
          <button 
            type="button"
            onClick={onCancel}
            className="px-6 py-1.5 bg-white border border-gray-300 text-[#666666] rounded hover:bg-gray-50 transition-colors text-xs font-bold"
          >
            取消返回
          </button>
          <button 
            type="button"
            onClick={handleSave}
            className="px-6 py-1.5 bg-[#419EFF] text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xs font-bold shadow-sm"
          >
            <Save size={14} className="mr-1.5" /> 保存督办件处罚档案
          </button>
        </div>
      </div>

    </div>
  );
}

// 辅助 Form 字段容器
function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5 text-left font-sans flex flex-col justify-start">
      <label className="block text-xs font-bold text-gray-600">
        {required && <span className="text-red-500 mr-1 font-bold">*</span>}
        {label}
      </label>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
