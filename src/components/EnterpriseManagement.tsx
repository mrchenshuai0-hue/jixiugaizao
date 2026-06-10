import React, { useState } from 'react';
import EnterpriseList from './EnterpriseList';
import EnterpriseDetail from './EnterpriseDetail';
import EnterpriseForm from './EnterpriseForm';

type ViewState = 'list' | 'detail' | 'form';

interface EnterpriseManagementProps {
  onNavigate?: (menu: string) => void;
  initialRegion?: string;
}

export default function EnterpriseManagement({ onNavigate, initialRegion }: EnterpriseManagementProps = {}) {
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
    setView('list');
    setSelectedId(null);
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        {view === 'list' && (
          <EnterpriseList 
            initialRegion={initialRegion}
            onViewDetail={handleViewDetail} 
            onAdd={handleAdd} 
            onEdit={handleEdit} 
          />
        )}
        {view === 'detail' && selectedId && (
          <EnterpriseDetail 
            id={selectedId} 
            onBack={handleBackToList} 
            onNavigate={onNavigate}
          />
        )}
        {view === 'form' && (
          <EnterpriseForm 
            id={selectedId} 
            onCancel={handleBackToList} 
            onSave={handleSave} 
          />
        )}
      </div>
    </div>
  );
}
