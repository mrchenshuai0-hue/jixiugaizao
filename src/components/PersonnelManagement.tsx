import React, { useState, useEffect } from 'react';
import PersonnelList from './PersonnelList';
import PersonnelDetail from './PersonnelDetail';
import PersonnelForm from './PersonnelForm';
import PersonnelPunishmentManagement from './PersonnelPunishmentManagement';
import PersonnelBlacklistManagement from './PersonnelBlacklistManagement';
import KeyPersonnelSearch from './KeyPersonnelSearch';
import WarningInformationCenter from './WarningInformationCenter';

type ViewState = 'list' | 'detail' | 'form';
type TabType = 'info' | 'punishment' | 'blacklist' | 'key_personnel' | 'warning';

interface PersonnelManagementProps {
  initialTab?: TabType;
  initialRegion?: string;
}

export default function PersonnelManagement({ initialTab = 'info', initialRegion }: PersonnelManagementProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [view, setView] = useState<ViewState>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Update tab if initialTab changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

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
    setView('list');
    setSelectedId(null);
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {activeTab === 'info' ? (
            <>
              {view === 'list' && (
                <PersonnelList 
                  initialRegion={initialRegion}
                  onViewDetail={handleViewDetail} 
                  onAdd={handleAdd} 
                  onEdit={handleEdit} 
                />
              )}
              {view === 'detail' && selectedId && (
                <PersonnelDetail 
                  id={selectedId} 
                  onBack={handleBackToList} 
                />
              )}
              {view === 'form' && (
                <PersonnelForm 
                  id={selectedId} 
                  onCancel={handleBackToList} 
                  onSave={handleSave} 
                />
              )}
            </>
          ) : activeTab === 'punishment' ? (
            <PersonnelPunishmentManagement />
          ) : activeTab === 'blacklist' ? (
            <PersonnelBlacklistManagement />
          ) : activeTab === 'key_personnel' ? (
            <KeyPersonnelSearch />
          ) : (
            <WarningInformationCenter />
          )}
        </div>
      </div>
    </div>
  );
}
