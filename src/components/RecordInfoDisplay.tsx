import React, { useState } from 'react';
import RecordInfoList from './RecordInfoList';
import RecordInfoDetail from './RecordInfoDetail';

export default function RecordInfoDisplay() {
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailMode, setDetailMode] = useState<'view' | 'audit' | 'edit'>('view');

  const handleViewDetail = (id: string, mode: 'view' | 'audit' | 'edit' = 'view') => {
    setSelectedId(id);
    setDetailMode(mode);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setSelectedId(null);
    setCurrentView('list');
  };

  return (
    <div className="h-full">
      {currentView === 'list' ? (
        <RecordInfoList onViewDetail={handleViewDetail} />
      ) : (
        <RecordInfoDetail id={selectedId} mode={detailMode} onBack={handleBackToList} />
      )}
    </div>
  );
}
