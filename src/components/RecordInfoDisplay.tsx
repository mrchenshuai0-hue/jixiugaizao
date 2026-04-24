import React, { useState } from 'react';
import RecordInfoList from './RecordInfoList';
import RecordInfoDetail from './RecordInfoDetail';

export default function RecordInfoDisplay() {
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleViewDetail = (id: string) => {
    setSelectedId(id);
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
        <RecordInfoDetail id={selectedId} onBack={handleBackToList} />
      )}
    </div>
  );
}
