import React, { useState, useEffect } from 'react';
import { ExternalLink, ClipboardList, ShieldCheck, LayoutGrid } from 'lucide-react';
import InspectionList from './InspectionList';
import InspectionForm from './InspectionForm';
import InspectionRectification from './InspectionRectification';

type TabType = 'records' | 'rectification';

interface InspectionManagementProps {
  initialView?: 'list' | 'form';
  initialTab?: TabType;
  initialRegion?: string;
}

export default function InspectionManagement({ initialView = 'list', initialTab = 'records', initialRegion }: InspectionManagementProps = {}) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [view, setView] = useState<'list' | 'form'>(initialView);

  // Update view and tab if props change
  useEffect(() => {
    if (initialView) setView(initialView);
    if (initialTab) setActiveTab(initialTab);
  }, [initialView, initialTab]);

  const handleCancel = () => setView('list');

  return (
    <div className="h-full w-full flex flex-col bg-[#F5F5F5] overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {view === 'form' ? (
            <InspectionForm onCancel={handleCancel} isReadOnly />
          ) : (
            <>
              {activeTab === 'records' && (
                <InspectionList initialRegion={initialRegion} onView={(id) => setView('form')} />
              )}
              {activeTab === 'rectification' && (
                <InspectionRectification />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
