import React, { useState } from 'react';
import RepairRecordList from './RepairRecordList';
import RepairRecordDetail from './RepairRecordDetail';

type ViewState = 'list' | 'detail';

export default function RepairRecordManagement() {
  const [viewState, setViewState] = useState<ViewState>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleView = (id: string) => {
    setSelectedId(id);
    setViewState('detail');
  };

  const handleBack = () => {
    setViewState('list');
    setSelectedId(null);
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#F5F5F5] overflow-hidden">
      <div className="flex-1 overflow-hidden">
        {viewState === 'list' && <RepairRecordList onView={handleView} />}
        {viewState === 'detail' && <RepairRecordDetail id={selectedId || ''} onBack={handleBack} />}
      </div>
    </div>
  );
}
