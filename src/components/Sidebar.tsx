import React, { useState } from 'react';
import { 
  Wrench, 
  Car, 
  BarChart2, 
  Layers, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  ShieldAlert,
  Home
} from 'lucide-react';
import { ThemeType } from '../App';

const menuData = [
  {
    title: '首页',
    icon: <Home size={20} />,
    children: []
  },
  {
    title: '机修业管理',
    icon: <Wrench size={20} />,
    expanded: true,
    children: [
      { title: '备案信息' },
      { title: '企业基础信息' },
      { title: '从业人员信息' },
      { title: '行政检查' },
      { title: '案事件信息' }
    ]
  },
  {
    title: '承修信息',
    icon: <Car size={20} />,
    children: [
      { title: '车辆信息管理' },
      { title: '车辆维修记录' }
    ]
  },
  {
    title: '统计分析',
    icon: <BarChart2 size={20} />,
    children: [
      { title: '企业发展趋势' },
      { title: '承修情况统计分析' },
      { title: '检查情况' },
      { title: '涉案情况' },
      { title: '在逃人员抓获统计' }
    ]
  },
  {
    title: '分级管理',
    icon: <Layers size={20} />,
    children: [
      { title: '等级评定' },
      { title: '评定标准设置' }
    ]
  },
  {
    title: '系统与支撑',
    icon: <Settings size={20} />,
    children: [
      { title: '公告与消息' },
      { title: '用户管理' },
      { title: '角色管理' },
      { title: '权限管理' },
      { title: '系统监控' }
    ]
  }
];

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  theme: ThemeType;
}

export default function Sidebar({ activeMenu, setActiveMenu, theme }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    '机修业管理': true
  });

  const toggleMenu = (title: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const themeStyles = {
    light: {
      bg: 'bg-[#FFFFFF]',
      text: 'text-[#333333]',
      headerBorder: 'border-gray-200',
      icon: 'text-[#666666]',
      menuHover: 'hover:bg-[#F3F7FF]',
      menuActive: 'bg-[#F3F7FF]',
      menuActiveText: 'text-[#419EFF]',
      expandedBg: 'bg-[#F3F7FF]',
      subMenuHover: 'hover:bg-white hover:text-[#419EFF]',
      subMenuActive: 'bg-white text-[#419EFF] font-medium',
      subMenuText: 'text-[#666666]',
      footerBorder: 'border-gray-200',
      footerText: 'text-[#999999]'
    },
    dark: {
      bg: 'bg-[#072143]',
      text: 'text-white',
      headerBorder: 'border-[#002350]',
      icon: 'text-white/80',
      menuHover: 'hover:bg-[#002350]',
      menuActive: 'bg-[#002350]',
      menuActiveText: 'text-[#419EFF]',
      expandedBg: 'bg-[#002350]',
      subMenuHover: 'hover:bg-white/5 hover:text-white',
      subMenuActive: 'bg-white/10 text-[#419EFF] font-medium',
      subMenuText: 'text-white/70',
      footerBorder: 'border-[#002350]',
      footerText: 'text-white/50'
    },
    theme: {
      bg: 'bg-[#419EFF]',
      text: 'text-white',
      headerBorder: 'border-blue-400/30',
      icon: 'text-white/90',
      menuHover: 'hover:bg-[#337FCC]',
      menuActive: 'bg-[#337FCC]',
      menuActiveText: 'text-white',
      expandedBg: 'bg-[#337FCC]',
      subMenuHover: 'hover:bg-white/5 hover:text-white',
      subMenuActive: 'bg-white/10 text-white font-medium',
      subMenuText: 'text-white/80',
      footerBorder: 'border-blue-400/30',
      footerText: 'text-blue-200'
    }
  };

  const current = themeStyles[theme];

  return (
    <div className={`w-64 h-full flex flex-col shadow-[0_0_10px_0_rgba(0,0,0,0.1)] z-10 shrink-0 transition-colors duration-300 ${current.bg} ${current.text}`}>
      <div className={`h-16 flex items-center justify-center border-b ${current.headerBorder} px-4 shrink-0`}>
        <ShieldAlert className="mr-2" size={24} />
        <h1 className="text-lg font-bold truncate">机修业治安管理系统</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <nav className="space-y-0">
          {menuData.map((menu) => {
            const isTopLevelActive = activeMenu === menu.title && menu.children.length === 0;
            return (
              <div key={menu.title}>
                <button
                  onClick={() => {
                    if (menu.children.length > 0) {
                      toggleMenu(menu.title);
                    } else {
                      setActiveMenu(menu.title);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-6 py-3 transition-colors ${
                    isTopLevelActive ? current.menuActive : current.menuHover
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`mr-3 ${isTopLevelActive ? current.menuActiveText : current.icon}`}>{menu.icon}</span>
                    <span className={`font-medium text-sm ${isTopLevelActive ? current.menuActiveText : ''}`}>{menu.title}</span>
                  </div>
                  {menu.children.length > 0 && (
                    <span className={current.icon}>
                      {expandedMenus[menu.title] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                  )}
                </button>
                
                {menu.children.length > 0 && expandedMenus[menu.title] && (
                  <div className={`space-y-0 py-1 ${current.expandedBg}`}>
                    {menu.children.map((child) => {
                      const isChildActive = activeMenu === child.title;
                      return (
                        <button
                          key={child.title}
                          onClick={() => setActiveMenu(child.title)}
                          className={`w-full text-left pl-14 pr-6 py-2.5 text-sm transition-colors ${
                            isChildActive 
                              ? current.subMenuActive 
                              : `${current.subMenuText} ${current.subMenuHover}`
                          }`}
                        >
                          {child.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
      
      <div className={`p-4 border-t ${current.footerBorder} text-xs text-center shrink-0 ${current.footerText}`}>
        公安管理端 v2.0 重构版
      </div>
    </div>
  );
}
