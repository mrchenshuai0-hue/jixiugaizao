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
  Home,
  ClipboardCheck,
  LayoutGrid,
  GripVertical
} from 'lucide-react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ThemeType } from '../App';

const initialMenuData = [
  {
    id: '首页',
    title: '首页',
    icon: <Home size={20} />,
    children: []
  },
  {
    id: '机修业管理',
    title: '机修业管理',
    icon: <Wrench size={20} />,
    expanded: true,
    children: [
      { title: '备案信息' },
      { title: '企业基础信息' },
      { 
        title: '从业人员信息',
        children: [
          { title: '从业人员信息查询' },
          { title: '从业人员黑名单' },
          { title: '重点人员查询' }
        ]
      },
      { 
        title: '行政检查',
        children: [
          { title: '检查记录查询' },
          { title: '问题整改跟踪' }
        ]
      },
      { 
        title: '案事件信息',
        children: [
          { title: '场所内发生案事件情况' },
          { title: '场所被查处情况' },
          { title: '从业人员被处罚信息' }
        ]
      }
    ]
  },
  {
    id: '承修信息',
    title: '承修信息',
    icon: <Car size={20} />,
    children: [
      { title: '车辆信息管理' }
    ]
  },
  {
    id: '经营情况',
    title: '经营情况',
    icon: <ClipboardCheck size={20} />,
    children: [
      { title: '场所营业日志' },
      { title: '企业安全巡检' },
      { title: '从业人员考勤管理' }
    ]
  },
  {
    id: '统计分析',
    title: '统计分析',
    icon: <BarChart2 size={20} />,
    children: [
      { title: '企业发展趋势' },
      { 
        title: '承修情况统计分析',
        children: [
          { title: '高频维修车辆统计分析' },
          { title: '送取车人员统计分析' },
          { title: '车辆维修轨迹分析' }
        ]
      },
      { title: '检查情况' },
      { 
        title: '涉案情况',
        children: [
          { title: '重点地区分析' },
          { title: '重点企业分析' },
          { title: '重点案件分析' },
          { title: '重点人员分析' }
        ]
      },
      { title: '在逃人员抓获统计' }
    ]
  },
  {
    id: '分级管理',
    title: '分级管理',
    icon: <Layers size={20} />,
    children: [
      { title: '等级评定管理' },
      { 
        title: '评价标准设置',
        children: [
          { title: '考核项目配置' },
          { title: '等级阈值设置' },
          { title: '版本历史' }
        ]
      }
    ]
  },
  {
    id: '其余适配功能',
    title: '其余适配功能',
    icon: <LayoutGrid size={20} />,
    children: [
      { title: '场所举报奖励' },
      { title: '违法违规管理' },
      { title: '报警信息管理' },
      { title: '可疑人员管理' },
      { title: '抓获在逃人员补登' },
      { title: '报警信息推送' },
      { title: '预警信息查看' },
      { title: '高频人群跟踪分析' },
      { title: '重点人员管控' },
      { title: '问题反馈' },
      { title: '自定义布控' },
      { title: '从业人员处罚管理' },
      { title: '企业平均上传数量统计' },
      { title: '企业上传率统计' },
      { title: '报警信息统计' },
      { title: '大屏展示' }
    ]
  },
  {
    id: '系统与支撑',
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

function SortableMenuItem({ menu, expandedMenus, toggleMenu, activeMenu, setActiveMenu, current }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: menu.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  const isTopLevelActive = activeMenu === menu.title && menu.children.length === 0;

  return (
    <div ref={setNodeRef} style={style}>
      <div className="group relative">
        {/* Drag Handle */}
        <div 
          {...attributes} 
          {...listeners}
          className={`absolute left-1 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing p-1 opacity-0 group-hover:opacity-100 transition-opacity ${current.icon}`}
        >
          <GripVertical size={14} />
        </div>

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
      </div>
      
      {menu.children.length > 0 && expandedMenus[menu.title] && (
        <div className={`space-y-0 py-1 ${current.expandedBg}`}>
          {menu.children.map((child: any) => {
            const hasSubChildren = child.children && child.children.length > 0;
            const isChildActive = activeMenu === child.title && !hasSubChildren;
            const isSubExpanded = expandedMenus[child.title];

            return (
              <div key={child.title}>
                <button
                  onClick={() => {
                    if (hasSubChildren) {
                      toggleMenu(child.title);
                    } else {
                      setActiveMenu(child.title);
                    }
                  }}
                  className={`w-full text-left pl-14 pr-6 py-2.5 text-sm transition-colors flex items-center justify-between ${
                    isChildActive 
                      ? current.subMenuActive 
                      : `${current.subMenuText} ${current.subMenuHover}`
                  }`}
                >
                  <span>{child.title}</span>
                  {hasSubChildren && (
                    <span className="opacity-60">
                      {isSubExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                  )}
                </button>
                
                {hasSubChildren && isSubExpanded && (
                  <div className="bg-black/5 py-1">
                    {child.children.map((subChild: any) => {
                      const isSubChildActive = activeMenu === subChild.title;
                      return (
                        <button
                          key={subChild.title}
                          onClick={() => setActiveMenu(subChild.title)}
                          className={`w-full text-left pl-20 pr-6 py-2 text-[13px] transition-colors ${
                            isSubChildActive
                              ? current.subMenuActive
                              : `${current.subMenuText} opacity-80 hover:opacity-100`
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`w-1 h-1 rounded-full mr-2 ${isSubChildActive ? 'bg-[#419EFF]' : 'bg-current opacity-30'}`}></div>
                            {subChild.title}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ activeMenu, setActiveMenu, theme }: SidebarProps) {
  const [menus, setMenus] = useState(initialMenuData);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    '机修业管理': true
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const toggleMenu = (title: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setMenus((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
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
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <nav className="space-y-0">
            <SortableContext 
              items={menus.map(m => m.id)}
              strategy={verticalListSortingStrategy}
            >
              {menus.map((menu) => (
                <SortableMenuItem 
                  key={menu.id}
                  menu={menu}
                  expandedMenus={expandedMenus}
                  toggleMenu={toggleMenu}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  current={current}
                />
              ))}
            </SortableContext>
          </nav>
        </DndContext>
      </div>
      
      <div className={`p-4 border-t ${current.footerBorder} text-xs text-center shrink-0 ${current.footerText}`}>
        公安管理端 v2.0 重构版
      </div>
    </div>
  );
}
