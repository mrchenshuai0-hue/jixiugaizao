import React, { useState, useEffect } from 'react';
import { ExternalLink, ClipboardList, ShieldCheck, LayoutGrid } from 'lucide-react';
import InspectionList from './InspectionList';
import InspectionForm from './InspectionForm';
import InspectionRectification from './InspectionRectification';

type TabType = 'records' | 'rectification';

interface InspectionManagementProps {
  initialView?: 'list' | 'form';
}

export default function InspectionManagement({ initialView = 'list' }: InspectionManagementProps = {}) {
  const [activeTab, setActiveTab] = useState<TabType>('records');
  const [view, setView] = useState<'list' | 'form'>(initialView);

  // Update view if initialView changes
  useEffect(() => {
    if (initialView) {
      setView(initialView);
    }
  }, [initialView]);

  const handleAdd = () => setView('form');
  const handleCancel = () => setView('list');
  const handleSave = () => setView('list');

  return (
    <div className="h-full w-full flex flex-col bg-[#F5F5F5] overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        {view === 'list' && (
          <div className="px-3 pt-3 shrink-0">
            <div className="bg-white rounded-t-lg border-x border-t border-gray-200 px-4 flex space-x-6">
              <button
                onClick={() => setActiveTab('records')}
                className={`h-10 px-1 text-sm font-medium border-b-2 transition-colors flex items-center ${
                  activeTab === 'records' ? 'border-[#419EFF] text-[#419EFF]' : 'border-transparent text-[#666666] hover:text-[#333333]'
                }`}
              >
                <ClipboardList size={16} className="mr-2" />
                检查记录查询
              </button>
              <button
                onClick={() => setActiveTab('rectification')}
                className={`h-10 px-1 text-sm font-medium border-b-2 transition-colors flex items-center ${
                  activeTab === 'rectification' ? 'border-[#419EFF] text-[#419EFF]' : 'border-transparent text-[#666666] hover:text-[#333333]'
                }`}
              >
                <ShieldCheck size={16} className="mr-2" />
                问题整改跟踪
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-hidden">
          {view === 'form' ? (
            <InspectionForm onCancel={handleCancel} onSave={handleSave} />
          ) : (
            <>
              {activeTab === 'records' && (
                <InspectionList onAdd={handleAdd} onView={(id) => setView('form')} />
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
