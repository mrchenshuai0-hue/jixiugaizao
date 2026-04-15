import React, { useState, useEffect } from 'react';
import { ClipboardList, ShieldAlert, FileWarning, BellRing } from 'lucide-react';
import ViolationList from './ViolationList';
import PunishmentList from './PunishmentList';
import CaseViolationForm from './CaseViolationForm';
import CasePunishmentForm from './CasePunishmentForm';
import ViolationDetail from './ViolationDetail';
import PunishmentDetail from './PunishmentDetail';

type TabType = 'violation' | 'punishment' | 'alarm';
type ViewState = 'list' | 'form' | 'detail';

interface CaseManagementProps {
  initialView?: ViewState;
}

export default function CaseManagement({ initialView = 'list' }: CaseManagementProps = {}) {
  const [activeTab, setActiveTab] = useState<TabType>('violation');
  const [viewState, setViewState] = useState<ViewState>(initialView);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Update view if initialView changes
  useEffect(() => {
    if (initialView) {
      setViewState(initialView);
    }
  }, [initialView]);

  const handleAdd = () => setViewState('form');
  const handleView = (id: string) => {
    setSelectedId(id);
    setViewState('detail');
  };
  const handleEdit = (id: string) => {
    setSelectedId(id);
    setViewState('form');
  };
  const handleBack = () => {
    setViewState('list');
    setSelectedId(null);
  };
  const handleSave = () => {
    setViewState('list');
    setSelectedId(null);
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#F5F5F5] overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        {viewState === 'list' && (
          <div className="px-3 pt-3 shrink-0">
            <div className="bg-white rounded-t-lg border-x border-t border-gray-200 px-4 flex space-x-6">
              <button
                onClick={() => setActiveTab('violation')}
                className={`h-10 px-1 text-sm font-medium border-b-2 transition-colors flex items-center ${
                  activeTab === 'violation' ? 'border-[#419EFF] text-[#419EFF]' : 'border-transparent text-[#666666] hover:text-[#333333]'
                }`}
              >
                <FileWarning size={16} className="mr-2" />
                违法违规信息
              </button>
              <button
                onClick={() => setActiveTab('punishment')}
                className={`h-10 px-1 text-sm font-medium border-b-2 transition-colors flex items-center ${
                  activeTab === 'punishment' ? 'border-[#419EFF] text-[#419EFF]' : 'border-transparent text-[#666666] hover:text-[#333333]'
                }`}
              >
                <ShieldAlert size={16} className="mr-2" />
                企业处罚信息
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-hidden">
          {activeTab === 'violation' && (
            <>
              {viewState === 'list' && <ViolationList onAdd={handleAdd} onView={handleView} onEdit={handleEdit} />}
              {viewState === 'form' && <CaseViolationForm onCancel={handleBack} onSave={handleSave} />}
              {viewState === 'detail' && <ViolationDetail id={selectedId || ''} onBack={handleBack} />}
            </>
          )}
          {activeTab === 'punishment' && (
            <>
              {viewState === 'list' && <PunishmentList onAdd={handleAdd} onView={handleView} onEdit={handleEdit} />}
              {viewState === 'form' && <CasePunishmentForm onCancel={handleBack} onSave={handleSave} />}
              {viewState === 'detail' && <PunishmentDetail id={selectedId || ''} onBack={handleBack} />}
            </>
          )}
          {activeTab === 'alarm' && (
            <div className="p-8 text-center text-gray-500">
              <BellRing size={48} className="mx-auto mb-4 text-gray-300" />
              <p>报警信息处理工作台正在开发中...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
