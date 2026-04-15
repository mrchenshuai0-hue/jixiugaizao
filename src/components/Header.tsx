import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, LogOut, ChevronRight, Palette, Check, X } from 'lucide-react';
import { ThemeType, Tab } from '../App';

interface HeaderProps {
  activeMenu: string;
  tabs: Tab[];
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  closeTab: (id: string, e: React.MouseEvent) => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export default function Header({ 
  activeMenu, 
  tabs, 
  activeTabId, 
  setActiveTabId, 
  closeTab, 
  theme, 
  setTheme 
}: HeaderProps) {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isLightSidebar = theme === 'light';
  const headerBg = isLightSidebar ? 'bg-[#419EFF]' : 'bg-white';
  const textColor = isLightSidebar ? 'text-white' : 'text-gray-500';
  const activeTextColor = isLightSidebar ? 'text-white' : 'text-gray-900';
  const iconColor = isLightSidebar ? 'text-white/80 hover:text-white' : 'text-gray-400 hover:text-[#419EFF]';
  const dividerColor = isLightSidebar ? 'border-white/20' : 'border-gray-200';

  return (
    <div className="flex flex-col shrink-0 z-50 relative">
      <header className={`h-16 ${headerBg} shadow-sm flex items-center justify-between px-6 transition-colors duration-300`}>
        <div className={`flex items-center text-sm ${textColor}`}>
          <span className="hover:opacity-80 cursor-pointer">首页</span>
          <ChevronRight size={16} className={`mx-2 ${isLightSidebar ? 'text-white/50' : 'text-gray-400'}`} />
          <span className={`font-medium ${activeTextColor}`}>{activeMenu}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* 主题切换 */}
          <div className="relative" ref={menuRef}>
            <button 
              className={`p-2 ${iconColor} transition-colors`}
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              title="切换主题"
            >
              <Palette size={20} />
            </button>
            
            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-100 py-1 z-50">
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-gray-50 flex items-center justify-between"
                  onClick={() => { setTheme('theme'); setShowThemeMenu(false); }}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#419EFF] mr-2"></div>
                    主题色
                  </div>
                  {theme === 'theme' && <Check size={14} className="text-[#419EFF]" />}
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-gray-50 flex items-center justify-between"
                  onClick={() => { setTheme('dark'); setShowThemeMenu(false); }}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#072143] mr-2"></div>
                    深色
                  </div>
                  {theme === 'dark' && <Check size={14} className="text-[#419EFF]" />}
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-gray-50 flex items-center justify-between"
                  onClick={() => { setTheme('light'); setShowThemeMenu(false); }}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-white border border-gray-300 mr-2"></div>
                    浅色
                  </div>
                  {theme === 'light' && <Check size={14} className="text-[#419EFF]" />}
                </button>
              </div>
            )}
          </div>

          <button className={`p-2 ${iconColor} relative transition-colors`}>
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className={`flex items-center space-x-2 border-l ${dividerColor} pl-4 ml-2`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isLightSidebar ? 'bg-white/20 text-white' : 'bg-blue-100 text-[#419EFF]'}`}>
              <User size={16} />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-medium ${isLightSidebar ? 'text-white' : 'text-[#333333]'}`}>张警官</span>
              <span className={`text-xs ${isLightSidebar ? 'text-white/70' : 'text-[#999999]'}`}>福建省公安厅</span>
            </div>
            <button className={`ml-2 p-1 ${iconColor} hover:text-red-500 transition-colors`} title="退出登录">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* 分页标签栏 */}
      <div className="bg-white border-b border-gray-200 h-10 flex items-end px-4 space-x-1 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`group flex items-center h-8 px-4 rounded-t-md cursor-pointer transition-all duration-200 border-t border-x ${
              activeTabId === tab.id 
                ? 'bg-[#F5F5F5] border-gray-200 text-[#419EFF] font-medium' 
                : 'bg-white border-transparent text-[#666666] hover:bg-gray-50'
            }`}
          >
            <span className="text-xs whitespace-nowrap">{tab.title}</span>
            <button 
              onClick={(e) => closeTab(tab.id, e)}
              className={`ml-2 p-0.5 rounded-full hover:bg-gray-200 transition-colors ${
                activeTabId === tab.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <X size={10} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
