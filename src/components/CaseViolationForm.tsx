import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Plus, Trash2, ShieldAlert, CheckCircle, Camera, Search, Link, Users, Landmark } from 'lucide-react';
import { api } from '../api';
import { Case, Enterprise, Personnel } from '../types';

interface CaseViolationFormProps {
  onCancel: () => void;
  onSave: () => void;
  id?: string;
}

export default function CaseViolationForm({ onCancel, onSave, id }: CaseViolationFormProps) {
  const [loading, setLoading] = useState(false);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [personnelList, setPersonnelList] = useState<Personnel[]>([]);
  const [formData, setFormData] = useState<Partial<Case>>({
    caseNo: '',
    caseName: '',
    caseCategory: '治安事件',
    caseType: '行政案件',
    caseStartTime: '',
    caseEndTime: '',
    caseStatus: '处理中',
    dispatchPoliceStation: '',
    alarmNo: '',
    alarmTime: '',
    crimeSceneDistrict: '福州市鼓楼区',
    caseRegion: '',
    crimeSceneAddress: '',
    caseSource: '执法办案系统',
    registrationOfficer: '',
    briefCase: '',
    punishmentMeasures: '',
    caseImages: [],
    
    filingTime: '',
    filingUnit: '',
    filingOfficer: '',
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
    victims: []
  });

  // Modal display control and custom text searches state
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false);
  const [showPersonnelModal, setShowPersonnelModal] = useState(false);
  const [searchEntQuery, setSearchEntQuery] = useState('');
  const [searchPerQuery, setSearchPerQuery] = useState('');
  const [activeRelationTab, setActiveRelationTab] = useState<'places' | 'suspects' | 'victims'>('places');

  // 临时添加用 States
  const [newImageUrl, setNewImageUrl] = useState('');

  // 预置一些默认的现场照片推荐
  const sampleImages = [
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
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
          const detail = await api.case.getById(id);
          if (detail) {
            setFormData(detail);
          }
        } else {
          // 自动生成一个默认的案事件立案编号
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
      alert('请确保已填入[案件编号]与[案件名称]！');
      return;
    }

    try {
      // 兼容老数据格式中的 violator 和 title 字段以确保列表流畅展示
      const savePayload = {
        ...formData,
        title: formData.caseName,
        type: formData.caseCategory,
        date: formData.caseStartTime ? formData.caseStartTime.substring(0, 10) : new Date().toISOString().substring(0, 10),
        status: formData.caseStatus || '处理中',
        violator: formData.suspects && formData.suspects.length > 0 
          ? formData.suspects.map(s => s.name).join(', ') 
          : '未设定对象',
        company: formData.associatedEnterpriseIds && formData.associatedEnterpriseIds.length > 0 && enterprises.length > 0
          ? enterprises.filter(ent => formData.associatedEnterpriseIds?.includes(ent.id)).map(e => e.name).join(', ')
          : '未关联企业'
      };

      await api.case.save(savePayload);
      onSave();
    } catch (error) {
      console.error('Error saving case補登:', error);
      alert('保存失败，请检查数据完整性');
    }
  };

  const addImageUrl = () => {
    if (newImageUrl.trim() && !formData.caseImages?.includes(newImageUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        caseImages: [...(prev.caseImages || []), newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const addSampleImage = (url: string) => {
    if (!formData.caseImages?.includes(url)) {
      setFormData(prev => ({
        ...prev,
        caseImages: [...(prev.caseImages || []), url]
      }));
    }
  };

  const removeImageUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      caseImages: (prev.caseImages || []).filter((_, i) => i !== index)
    }));
  };

  // 嫌疑人增删改 
  const handleAddManualSuspect = () => {
    const defaultSuspect = {
      id: 'sus_' + Math.random().toString(36).substring(2, 9),
      name: '',
      gender: '男',
      idCard: '',
      phone: '',
      status: '审查中'
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
      status: '审查中'
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

  // 受害人增删改 (手动添加, 交互同物防设施)
  const handleAddManualVictim = () => {
    const defaultVictim = {
      id: 'vic_' + Math.random().toString(36).substring(2, 9),
      name: '',
      gender: '男',
      idCard: '',
      phone: '',
      details: ''
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

  const handleToggleEnterpriseLink = (entId: string) => {
    setFormData(prev => {
      const currentIds = prev.associatedEnterpriseIds || [];
      let newIds = [];
      if (currentIds.includes(entId)) {
        newIds = currentIds.filter(id => id !== entId);
      } else {
        newIds = [...currentIds, entId];
      }
      
      const matchedNames = enterprises
        .filter(ent => newIds.includes(ent.id))
        .map(ent => ent.name)
        .join(', ');

      return {
        ...prev,
        associatedEnterpriseIds: newIds,
        associatedPlaceName: matchedNames,
        isProblemPlaceAssociated: newIds.length > 0 ? '已关联' : '未关联'
      };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F5F3]">
        <div className="text-center font-sans p-6 bg-white rounded border border-gray-150">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#419EFF] mx-auto mb-2.5"></div>
          <p className="text-xs text-gray-500 font-medium">配置大表单项与企业档案库中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F5F3] overflow-hidden font-sans text-left">
      
      {/* 顶部固定标题与操作栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex justify-between items-center shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-orange-500 rounded-full"></span>
          <h2 className="text-sm font-bold text-gray-800">
            {id ? '案事件修改补全' : '案事件补登'}
          </h2>
          <span className="text-[10px] text-gray-400 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            {formData.caseNo || '系统预制生成编号'}
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

      {/* 主流表单区块 */}
      <form onSubmit={handleSave} className="flex-1 overflow-auto p-5 space-y-6">
        
        {/* SECTION 1: 案件基本信息 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#EBF3FE] flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-blue-500 rounded-full"></span>
            <span className="text-xs font-bold text-gray-800">一、案件基本信息</span>
          </div>
          <div className="p-5 space-y-4">
            
            {/* 每行3列排布 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <FormField label="发案所属区划">
                <input 
                  type="text" 
                  value={formData.caseRegion || ''} 
                  onChange={e => setFormData({ ...formData, caseRegion: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none"
                  placeholder="如：福州市鼓楼区" 
                />
              </FormField>

              <FormField label="案件编号" required>
                <input 
                  type="text" 
                  value={formData.caseNo || ''} 
                  onChange={e => setFormData({ ...formData, caseNo: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none focus:ring-1 focus:ring-[#419EFF] transition-all bg-amber-50/10 font-bold"
                  placeholder="手动输入或保留自动码" 
                />
              </FormField>

              <FormField label="案件名称" required>
                <input 
                  type="text" 
                  value={formData.caseName || ''} 
                  onChange={e => setFormData({ ...formData, caseName: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none focus:ring-1 focus:ring-[#419EFF] transition-all font-semibold"
                  placeholder="如：某某聚众赌博案" 
                />
              </FormField>

              <FormField label="案件类别" required>
                <select 
                  value={formData.caseCategory || '治安事件'} 
                  onChange={e => setFormData({ ...formData, caseCategory: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded bg-white focus:border-[#419EFF] focus:outline-none font-medium"
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
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none"
                  placeholder="如：行政处罚、拘留惩处" 
                />
              </FormField>

              <FormField label="案件开始时间">
                <input 
                  type="datetime-local" 
                  value={formData.caseStartTime || ''} 
                  onChange={e => setFormData({ ...formData, caseStartTime: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none"
                />
              </FormField>

              <FormField label="案件结束时间">
                <input 
                  type="datetime-local" 
                  value={formData.caseEndTime || ''} 
                  onChange={e => setFormData({ ...formData, caseEndTime: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none"
                />
              </FormField>

              <FormField label="案件状态">
                <select
                  value={formData.caseStatus || '处理中'}
                  onChange={e => setFormData({ ...formData, caseStatus: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded bg-white focus:border-[#419EFF] focus:outline-none font-medium"
                >
                  <option value="处理中">处理中</option>
                  <option value="待复核">待复核</option>
                  <option value="已结案">已结案</option>
                  <option value="不予立案">不予立案</option>
                  <option value="销案">已销案</option>
                </select>
              </FormField>

              <FormField label="发案派出所">
                <input 
                  type="text" 
                  value={formData.dispatchPoliceStation || ''} 
                  onChange={e => setFormData({ ...formData, dispatchPoliceStation: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none"
                  placeholder="例如：武昌分局珞瑜路派出所" 
                />
              </FormField>

              <FormField label="警情号">
                <input 
                  type="text" 
                  value={formData.alarmNo || ''} 
                  onChange={e => setFormData({ ...formData, alarmNo: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none font-mono"
                  placeholder="JQ开头20位警情号" 
                />
              </FormField>

              <FormField label="报警时间">
                <input 
                  type="datetime-local" 
                  value={formData.alarmTime || ''} 
                  onChange={e => setFormData({ ...formData, alarmTime: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none"
                />
              </FormField>

              <FormField label="案件来源">
                <select 
                  value={formData.caseSource || '执法办案系统'} 
                  onChange={e => setFormData({ ...formData, caseSource: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded bg-white focus:border-[#419EFF] focus:outline-none"
                >
                  <option value="执法办案系统">执法办案系统</option>
                  <option value="民警补登">民警补登</option>
                </select>
              </FormField>

              {formData.caseSource === '民警补登' && (
                <FormField label="补登民警">
                  <input 
                    type="text" 
                    value={formData.registrationOfficer || ''} 
                    onChange={e => setFormData({ ...formData, registrationOfficer: e.target.value })}
                    className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none"
                    placeholder="请输入补登民警姓名" 
                  />
                </FormField>
              )}

              <FormField label="发案地行政区划">
                <input 
                  type="text" 
                  value={formData.crimeSceneDistrict || ''} 
                  onChange={e => setFormData({ ...formData, crimeSceneDistrict: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none"
                  placeholder="如：武汉市武昌区 / 福州市鼓楼区" 
                />
              </FormField>

              <FormField label="发案地详细地址">
                <input 
                  type="text" 
                  value={formData.crimeSceneAddress || ''} 
                  onChange={e => setFormData({ ...formData, crimeSceneAddress: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none"
                  placeholder="街道、楼牌、场所网点细节" 
                />
              </FormField>
            </div>

            {/* 简要案情 */}
            <div className="space-y-1 text-xs">
              <label className="block font-bold text-gray-600">简要案情描述</label>
              <textarea 
                value={formData.briefCase || ''} 
                onChange={e => setFormData({ ...formData, briefCase: e.target.value })}
                className="w-full h-24 p-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none transition-all resize-none animate-fade-in"
                placeholder="详细记录办案民警发案地点、发生过程、人员数量、造成的损害情况描述..."
              />
            </div>

            {/* 针对性处罚措施 */}
            <div className="space-y-1 text-xs">
              <label className="block font-bold text-gray-600">针对性处罚措施/行政强制指令</label>
              <textarea 
                value={formData.punishmentMeasures || ''} 
                onChange={e => setFormData({ ...formData, punishmentMeasures: e.target.value })}
                className="w-full h-20 p-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none transition-all resize-none"
                placeholder="此处记录拟实施的停业整顿、警告、罚款、暂扣备案、限期整改指令或行政裁决..."
              />
            </div>

          </div>
        </div>

        {/* SECTION 2: 案件办理进度 */}
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
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none"
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
                  placeholder="接收此案的上级或检察院名称" 
                />
              </FormField>
              <FormField label="移送人">
                <input 
                  type="text" 
                  value={formData.transferOfficer || ''} 
                  onChange={e => setFormData({ ...formData, transferOfficer: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                  placeholder="移交执行人" 
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
                  placeholder="如：治安分警局大队" 
                />
              </FormField>
              <FormField label="受理人">
                <input 
                  type="text" 
                  value={formData.acceptor || ''} 
                  onChange={e => setFormData({ ...formData, acceptor: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                  placeholder="值班承办警员" 
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
                  placeholder="实施侦办、查办逮捕的大队派出所" 
                />
              </FormField>
              <FormField label="破案人">
                <input 
                  type="text" 
                  value={formData.solutionOfficer || ''} 
                  onChange={e => setFormData({ ...formData, solutionOfficer: e.target.value })}
                  className="w-full h-8.5 px-3 border border-gray-300 rounded focus:border-[#419EFF]"
                  placeholder="破案主提请人" 
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
              <div className="hidden md:block"></div>
            </div>
          </div>
        </div>

        {/* SECTION 3: 案件关联信息 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#FCF3EA] flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-orange-500 rounded-full"></span>
              <span>三、案件关联信息</span>
            </h3>
          </div>
          
          {/* 页签 Tab 头部 & 操作按钮在右上角 */}
          <div className="bg-[#FAFBFD] border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-1 shrink-0 gap-3">
            <div className="flex space-x-6 animate-fade-in">
              <button 
                type="button"
                onClick={() => setActiveRelationTab('places')}
                className={`py-3.5 text-xs font-bold transition-all border-b-2 relative shrink-0 cursor-pointer ${
                  activeRelationTab === 'places' ? 'text-[#419EFF] border-[#419EFF]' : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                涉案场所 ({formData.associatedEnterpriseIds?.length || 0})
              </button>
              <button 
                type="button"
                onClick={() => setActiveRelationTab('suspects')}
                className={`py-3.5 text-xs font-bold transition-all border-b-2 relative shrink-0 cursor-pointer ${
                  activeRelationTab === 'suspects' ? 'text-[#419EFF] border-[#419EFF]' : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                嫌疑人 ({formData.suspects?.length || 0})
              </button>
              <button 
                type="button"
                onClick={() => setActiveRelationTab('victims')}
                className={`py-3.5 text-xs font-bold transition-all border-b-2 relative shrink-0 cursor-pointer ${
                  activeRelationTab === 'victims' ? 'text-[#419EFF] border-[#419EFF]' : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                受害人 ({formData.victims?.length || 0})
              </button>
            </div>

            {/* 当对应选中 Tab 时的右上角对应的操作按钮 */}
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
                  <Search size={12} /> 弹出检索并引用企业
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
                    <Search size={11} /> 弹窗引用在岗从业人员
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
                  <Plus size={11} /> 添加受害/受侵害对象
                </button>
              )}
            </div>
          </div>

          <div className="p-5 space-y-6 text-xs bg-white">
            {/* 1. 涉案场所页签内容 */}
            {activeRelationTab === 'places' && (
              <div className="space-y-3 animate-fade-in">
                <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
                  <table className="w-full border-collapse text-[11px] text-left">
                    <thead className="bg-[#fdfaf7] text-gray-600 font-bold border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-2.5 w-12 text-center">#</th>
                        <th className="px-4 py-2.5">场所/企业名称</th>
                        <th className="px-4 py-2.5">统一社会信用代码</th>
                        <th className="px-4 py-2.5">监管属地</th>
                        <th className="px-4 py-2.5">企业类别</th>
                        <th className="px-4 py-2.5 w-20 text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(!formData.associatedEnterpriseIds || formData.associatedEnterpriseIds.length === 0) ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-12 text-center text-gray-400 font-medium">
                            暂未关联问题场所，请点击右上角“弹出检索并引用企业”进行配置
                          </td>
                        </tr>
                      ) : (
                        enterprises
                          .filter(ent => formData.associatedEnterpriseIds?.includes(ent.id))
                          .map((ent, idx) => (
                            <tr key={ent.id} className="hover:bg-orange-50/20 transition-colors">
                              <td className="px-4 py-2 text-center text-gray-400 font-mono font-bold">{idx + 1}</td>
                              <td className="px-4 py-2 font-bold text-gray-800">{ent.name}</td>
                              <td className="px-4 py-2 font-mono text-gray-500">{ent.uscc}</td>
                              <td className="px-4 py-2">{ent.region}</td>
                              <td className="px-4 py-2">
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[10px] font-semibold">
                                  {ent.category || '机维修业'}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleToggleEnterpriseLink(ent.id)}
                                  className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded cursor-pointer"
                                  title="移除"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. 嫌疑人页签内容 */}
            {activeRelationTab === 'suspects' && (
              <div className="space-y-3 animate-fade-in">
                <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
                  <table className="w-full border-collapse text-[11px] text-left border-slate-200">
                    <thead className="bg-[#f4f7fc] text-gray-600 font-bold border-b border-gray-200">
                      <tr>
                        <th className="px-3 py-2 w-10 text-center">#</th>
                        <th className="px-3 py-2 min-w-[90px]">姓名</th>
                        <th className="px-3 py-2 min-w-[70px] text-center">性别</th>
                        <th className="px-3 py-2 min-w-[125px]">出生日期</th>
                        <th className="px-3 py-2 min-w-[160px]">证件号码</th>
                        <th className="px-3 py-2 min-w-[160px]">户籍地址</th>
                        <th className="px-3 py-2 min-w-[120px]">联系电话</th>
                        <th className="px-3 py-2 min-w-[110px]">身份/职业</th>
                        <th className="px-3 py-2 min-w-[110px]">进入客房方式</th>
                        <th className="px-3 py-2 w-16 text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(!formData.suspects || formData.suspects.length === 0) ? (
                        <tr>
                          <td colSpan={10} className="px-3 py-12 text-center text-gray-400 font-medium font-sans">
                            暂无添加的嫌疑人，请点击右上角“弹窗引用在岗从业人员”选定或“手动极速建报”
                          </td>
                        </tr>
                      ) : (
                        formData.suspects.map((s, idx) => (
                          <tr key={s.id || idx} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-3 py-2 text-center text-gray-400 font-sans font-bold">{idx + 1}</td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={s.name || ''}
                                onChange={(e) => updateSuspectField(idx, 'name', e.target.value)}
                                placeholder="姓名"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none bg-white text-xs font-semibold"
                              />
                            </td>
                            <td className="px-3 py-2 text-center">
                              <select
                                value={s.gender || '男'}
                                onChange={(e) => updateSuspectField(idx, 'gender', e.target.value)}
                                className="h-8 px-1 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-xs text-center"
                              >
                                <option value="男">男</option>
                                <option value="女">女</option>
                              </select>
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="date"
                                value={s.birthdate || ''}
                                onChange={(e) => updateSuspectField(idx, 'birthdate', e.target.value)}
                                className="w-full h-8 px-1.5 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={s.idCard || ''}
                                onChange={(e) => updateSuspectField(idx, 'idCard', e.target.value)}
                                placeholder="证件号码"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none font-mono text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={s.householdAddress || ''}
                                onChange={(e) => updateSuspectField(idx, 'householdAddress', e.target.value)}
                                placeholder="户籍地址"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={s.phone || ''}
                                onChange={(e) => updateSuspectField(idx, 'phone', e.target.value)}
                                placeholder="联系电话"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none font-mono text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={s.occupation || ''}
                                onChange={(e) => updateSuspectField(idx, 'occupation', e.target.value)}
                                placeholder="身份/职业"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={s.roomEntryMethod || ''}
                                onChange={(e) => updateSuspectField(idx, 'roomEntryMethod', e.target.value)}
                                placeholder="进入客房方式"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none text-xs"
                              />
                            </td>
                            <td className="px-3 py-2 text-center">
                              <button
                                type="button"
                                onClick={() => removeSuspectItem(idx)}
                                className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded cursor-pointer"
                                title="移除该行"
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. 受害人页签内容 */}
            {activeRelationTab === 'victims' && (
              <div className="space-y-3 animate-fade-in">
                <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
                  <table className="w-full border-collapse text-[11px] text-left border-slate-200">
                    <thead className="bg-[#f0faf5] text-gray-600 font-bold border-b border-gray-200 text-xs">
                      <tr>
                        <th className="px-3 py-2 w-10 text-center">#</th>
                        <th className="px-3 py-2 min-w-[90px]">姓名</th>
                        <th className="px-3 py-2 min-w-[70px] text-center">性别</th>
                        <th className="px-3 py-2 min-w-[125px]">出生日期</th>
                        <th className="px-3 py-2 min-w-[160px]">证件号码</th>
                        <th className="px-3 py-2 min-w-[160px]">户籍地址</th>
                        <th className="px-3 py-2 min-w-[120px]">联系电话</th>
                        <th className="px-3 py-2 min-w-[110px]">身份</th>
                        <th className="px-3 py-2 min-w-[115px]">进入客房方式</th>
                        <th className="px-3 py-2 min-w-[115px]">与嫌疑人关系</th>
                        <th className="px-3 py-2 w-16 text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(!formData.victims || formData.victims.length === 0) ? (
                        <tr>
                          <td colSpan={11} className="px-3 py-12 text-center text-gray-400 font-medium">
                            暂无添加的受损/被害对象，请点击右上角“添加受害/受侵害对象”按钮
                          </td>
                        </tr>
                      ) : (
                        formData.victims.map((v, idx) => (
                          <tr key={v.id || idx} className="hover:bg-[#fcfdfd] transition-colors">
                            <td className="px-3 py-2 text-center text-gray-400 font-sans font-bold">{idx + 1}</td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={v.name || ''}
                                onChange={(e) => updateVictimField(idx, 'name', e.target.value)}
                                placeholder="姓名"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none bg-white text-xs font-semibold"
                              />
                            </td>
                            <td className="px-3 py-2 text-center">
                              <select
                                value={v.gender || '男'}
                                onChange={(e) => updateVictimField(idx, 'gender', e.target.value)}
                                className="h-8 px-1 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#419EFF] text-xs text-center"
                              >
                                <option value="男">男</option>
                                <option value="女">女</option>
                              </select>
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="date"
                                value={v.birthdate || ''}
                                onChange={(e) => updateVictimField(idx, 'birthdate', e.target.value)}
                                className="w-full h-8 px-1.5 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={v.idCard || ''}
                                onChange={(e) => updateVictimField(idx, 'idCard', e.target.value)}
                                placeholder="证件号码"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none font-mono text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={v.householdAddress || ''}
                                onChange={(e) => updateVictimField(idx, 'householdAddress', e.target.value)}
                                placeholder="户籍地址"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={v.phone || ''}
                                onChange={(e) => updateVictimField(idx, 'phone', e.target.value)}
                                placeholder="联系电话"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none font-mono text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={v.identity || ''}
                                onChange={(e) => updateVictimField(idx, 'identity', e.target.value)}
                                placeholder="身份"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={v.roomEntryMethod || ''}
                                onChange={(e) => updateVictimField(idx, 'roomEntryMethod', e.target.value)}
                                placeholder="进入客房方式"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={v.relationWithSuspect || ''}
                                onChange={(e) => updateVictimField(idx, 'relationWithSuspect', e.target.value)}
                                placeholder="与嫌疑人关系"
                                className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#419EFF] focus:outline-none text-xs"
                              />
                            </td>
                            <td className="px-3 py-2 text-center">
                              <button
                                type="button"
                                onClick={() => removeVictimItem(idx)}
                                className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded cursor-pointer"
                                title="删除该条目"
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 底部按钮占位垫片 */}
        <div className="h-16 shrink-0"></div>
      </form>

      {/* 底部固定操作行 */}
      <div className="shrink-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-end shadow-[0_-3px_8px_rgba(0,0,0,0.05)] z-20">
        <div className="flex space-x-2.5">
          <button 
            type="button"
            onClick={onCancel}
            className="px-5 py-2 border border-gray-300 text-gray-750 bg-white hover:bg-slate-50 rounded text-xs font-bold transition-colors cursor-pointer"
          >
            取消
          </button>
          <button 
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-[#419EFF] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Save size={14} />
            <span>提交补登大表档案</span>
          </button>
        </div>
      </div>

      {/* 3.1 关联场所/企业弹窗选择器 */}
      {showEnterpriseModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-150 flex items-center justify-between bg-orange-50/50">
              <span className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                <Landmark size={16} className="text-orange-500" />
                系统在档场所企业引用与关联
              </span>
              <button 
                type="button" 
                onClick={() => setShowEnterpriseModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-base cursor-pointer"
              >
                ×
              </button>
            </div>
            
            {/* 搜素条 */}
            <div className="p-3 border-b border-gray-100 bg-slate-50 flex items-center gap-2">
              <Search size={14} className="text-gray-400 shrink-0 ml-1" />
              <input 
                type="text" 
                value={searchEntQuery}
                onChange={e => setSearchEntQuery(e.target.value)}
                placeholder="键入场所企业名称、信用代码、法人或负责人拼音进行快速检索..." 
                className="w-full bg-transparent border-0 outline-none text-xs text-gray-700 h-6 focus:ring-0"
              />
            </div>

            {/* 选择列表 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {enterprises.filter(ent => 
                !searchEntQuery || 
                ent.name.toLowerCase().includes(searchEntQuery.toLowerCase()) ||
                ent.uscc.toLowerCase().includes(searchEntQuery.toLowerCase()) ||
                (ent.legalPerson || '').toLowerCase().includes(searchEntQuery.toLowerCase())
              ).length === 0 ? (
                <div className="py-12 text-center text-gray-400 text-xs">
                  未匹配到对应条件的在档企业。您可以输入不同关键字重试。
                </div>
              ) : (
                enterprises.filter(ent => 
                  !searchEntQuery || 
                  ent.name.toLowerCase().includes(searchEntQuery.toLowerCase()) ||
                  ent.uscc.toLowerCase().includes(searchEntQuery.toLowerCase()) ||
                  (ent.legalPerson || '').toLowerCase().includes(searchEntQuery.toLowerCase())
                ).map(ent => {
                  const isChecked = formData.associatedEnterpriseIds?.includes(ent.id);
                  return (
                    <div 
                      key={ent.id}
                      className={`p-3 rounded-lg border flex items-center justify-between text-xs transition-all ${
                        isChecked 
                          ? 'bg-blue-50/60 border-blue-300' 
                          : 'bg-white border-gray-150 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-left space-y-0.5">
                        <div className="font-bold text-gray-800 text-xs">{ent.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono">代码: {ent.uscc} | 法人: {ent.legalPerson || '未载明'}</div>
                        <div className="text-[10px] text-gray-500">属地: {ent.region} | 行业: {ent.category || '机维修业'}</div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handleToggleEnterpriseLink(ent.id)}
                        className={`h-7 px-3 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white shadow-xs'
                        }`}
                      >
                        {isChecked ? (
                          <>
                            <CheckCircle size={11} />
                            <span>已关联</span>
                          </>
                        ) : (
                          <>
                            <Plus size={11} />
                            <span>引用关联</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* 底部功能区 */}
            <div className="bg-slate-50 border-t border-gray-150 px-5 py-3 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-gray-500 font-medium">
                已选中项目: <span className="text-blue-600 font-bold font-mono">{formData.associatedEnterpriseIds?.length || 0}</span> 个企业
              </span>
              <button
                type="button"
                onClick={() => setShowEnterpriseModal(false)}
                className="px-4 py-1.5 bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                确认并结束选中
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3.2 关联嫌疑人(自从业人员数据库检索导入) 弹窗选择器 */}
      {showPersonnelModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-150 flex items-center justify-between bg-blue-50/50">
              <span className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                <Users size={16} className="text-blue-500" />
                从业人员电子信息库检索引用
              </span>
              <button 
                type="button" 
                onClick={() => setShowPersonnelModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-base cursor-pointer"
              >
                ×
              </button>
            </div>
            
            {/* 搜素条 */}
            <div className="p-3 border-b border-gray-100 bg-slate-50 flex items-center gap-2">
              <Search size={14} className="text-gray-400 shrink-0 ml-1" />
              <input 
                type="text" 
                value={searchPerQuery}
                onChange={e => setSearchPerQuery(e.target.value)}
                placeholder="键入人员姓名、身份证号、联系手机或所属场所名称进行检索..." 
                className="w-full bg-transparent border-0 outline-none text-xs text-gray-700 h-6 focus:ring-0"
              />
            </div>

            {/* 从业人员库列表 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {personnelList.filter(p => 
                !searchPerQuery || 
                p.name.toLowerCase().includes(searchPerQuery.toLowerCase()) ||
                p.idCard.toLowerCase().includes(searchPerQuery.toLowerCase()) ||
                (p.phone || '').toLowerCase().includes(searchPerQuery.toLowerCase()) ||
                (p.enterpriseName || '').toLowerCase().includes(searchPerQuery.toLowerCase())
              ).length === 0 ? (
                <div className="py-12 text-center text-gray-400 text-xs">
                  未匹配到对应条件的在档从业人员库信息。您可在表单页点击“手动极速建报”添加全新嫌疑人。
                </div>
              ) : (
                personnelList.filter(p => 
                  !searchPerQuery || 
                  p.name.toLowerCase().includes(searchPerQuery.toLowerCase()) ||
                  p.idCard.toLowerCase().includes(searchPerQuery.toLowerCase()) ||
                  (p.phone || '').toLowerCase().includes(searchPerQuery.toLowerCase()) ||
                  (p.enterpriseName || '').toLowerCase().includes(searchPerQuery.toLowerCase())
                ).map(p => {
                  const isChecked = formData.suspects?.some(s => s.idCard === p.idCard);
                  return (
                    <div 
                      key={p.id}
                      className={`p-3 rounded-lg border flex items-center justify-between text-xs transition-all ${
                        isChecked 
                          ? 'bg-green-50/60 border-green-300' 
                          : 'bg-white border-gray-150 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-left space-y-0.5">
                        <div className="font-bold text-gray-800 text-xs flex items-center gap-1.5">
                          <span>{p.name}</span>
                          <span className="px-1 py-0.2 bg-slate-100 text-gray-600 rounded text-[9px] scale-90">{p.gender}</span>
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono">证号: {p.idCard} | 联系: {p.phone || '未录入'}</div>
                        <div className="text-[10px] text-blue-800 font-semibold">服务企业场所: {p.enterpriseName || '安达网点'} | 岗职: {p.role || '从业员'}</div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          if (isChecked) {
                            // 从 suspects 去除
                            setFormData(prev => ({
                              ...prev,
                              suspects: (prev.suspects || []).filter(s => s.idCard !== p.idCard)
                            }));
                          } else {
                            handleSelectSuspectFromList(p);
                          }
                        }}
                        className={`h-7 px-3 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-slate-400 text-white cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white shadow-xs'
                        }`}
                        disabled={isChecked}
                      >
                        {isChecked ? (
                          <>
                            <CheckCircle size={11} />
                            <span>已导入成嫌疑人</span>
                          </>
                        ) : (
                          <>
                            <Plus size={11} />
                            <span>选定导入</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* 底部操作区 */}
            <div className="bg-slate-50 border-t border-gray-150 px-5 py-3 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-gray-500">
                支持直接穿透将从业人员无缝归入案事件嫌疑对象大表。
              </span>
              <button
                type="button"
                onClick={() => setShowPersonnelModal(false)}
                className="px-4 py-1.5 bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

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
