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
  initialTab?: TabType;
}

export default function CaseManagement({ initialView = 'list', initialTab = 'violation' }: CaseManagementProps = {}) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [viewState, setViewState] = useState<ViewState>(initialView);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Update view and tab if props change
  useEffect(() => {
    if (initialView) setViewState(initialView);
    if (initialTab) setActiveTab(initialTab);
  }, [initialView, initialTab]);

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
        <div className="flex-1 overflow-hidden">
          {activeTab === 'violation' && (
            <>
              {viewState === 'list' && <ViolationList onAdd={handleAdd} onView={handleView} onEdit={handleEdit} />}
              {viewState === 'form' && <CaseViolationForm onCancel={handleBack} onSave={handleSave} id={selectedId || undefined} />}
              {viewState === 'detail' && <ViolationDetail id={selectedId || ''} onBack={handleBack} />}
            </>
          )}
          {activeTab === 'punishment' && (
            <>
              {viewState === 'list' && <PunishmentList onAdd={handleAdd} onView={handleView} onEdit={handleEdit} />}
              {viewState === 'form' && <CasePunishmentForm onCancel={handleBack} onSave={handleSave} id={selectedId || undefined} />}
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
