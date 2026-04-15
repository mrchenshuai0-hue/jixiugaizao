import React, { useState } from 'react';
import VehicleList from './VehicleList';
import VehicleDetail from './VehicleDetail';

type ViewState = 'list' | 'detail';

export default function VehicleManagement() {
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
        {viewState === 'list' && <VehicleList onView={handleView} />}
        {viewState === 'detail' && <VehicleDetail id={selectedId || ''} onBack={handleBack} />}
      </div>
    </div>
  );
}
