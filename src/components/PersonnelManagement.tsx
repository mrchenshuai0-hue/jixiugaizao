import React, { useState } from 'react';
import PersonnelList from './PersonnelList';
import PersonnelDetail from './PersonnelDetail';
import PersonnelForm from './PersonnelForm';
import PersonnelPunishmentManagement from './PersonnelPunishmentManagement';
import PersonnelBlacklistManagement from './PersonnelBlacklistManagement';

type ViewState = 'list' | 'detail' | 'form';
type TabType = 'info' | 'punishment' | 'blacklist';

export default function PersonnelManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [view, setView] = useState<ViewState>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleViewDetail = (id: string) => {
    setSelectedId(id);
    setView('detail');
  };

  const handleAdd = () => {
    setSelectedId(null);
    setView('form');
  };

  const handleEdit = (id: string) => {
    setSelectedId(id);
    setView('form');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedId(null);
  };

  const handleSave = () => {
    if (selectedId) {
      setView('detail');
    } else {
      setView('list');
    }
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        {view === 'list' && (
          <div className="px-3 pt-3 shrink-0">
            <div className="bg-white rounded-t-lg border-x border-t border-gray-200 px-4 flex space-x-6">
              <button
                onClick={() => setActiveTab('info')}
                className={`h-10 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'info' ? 'border-[#419EFF] text-[#419EFF]' : 'border-transparent text-[#666666] hover:text-[#333333]'
                }`}
              >
                从业人员信息查询
              </button>
              <button
                onClick={() => setActiveTab('punishment')}
                className={`h-10 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'punishment' ? 'border-[#419EFF] text-[#419EFF]' : 'border-transparent text-[#666666] hover:text-[#333333]'
                }`}
              >
                从业人员处罚管理
              </button>
              <button
                onClick={() => setActiveTab('blacklist')}
                className={`h-10 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'blacklist' ? 'border-[#419EFF] text-[#419EFF]' : 'border-transparent text-[#666666] hover:text-[#333333]'
                }`}
              >
                从业人员黑名单
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-hidden">
          {activeTab === 'info' ? (
            <>
              {view === 'list' && (
                <PersonnelList 
                  onViewDetail={handleViewDetail} 
                  onAdd={handleAdd} 
                  onEdit={handleEdit} 
                />
              )}
              {view === 'detail' && selectedId && (
                <PersonnelDetail 
                  id={selectedId} 
                  onBack={handleBackToList} 
                  onEdit={handleEdit} 
                />
              )}
              {view === 'form' && (
                <PersonnelForm 
                  id={selectedId} 
                  onCancel={selectedId ? () => setView('detail') : handleBackToList} 
                  onSave={handleSave} 
                />
              )}
            </>
          ) : activeTab === 'punishment' ? (
            <PersonnelPunishmentManagement />
          ) : (
            <PersonnelBlacklistManagement />
          )}
        </div>
      </div>
    </div>
  );
}
