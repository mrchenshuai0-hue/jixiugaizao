import React, { useState, useEffect } from 'react';

interface NavigationItem {
  id: string;
  label: string;
}

interface FloatingFormNavigationProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  items: NavigationItem[];
}

export default function FloatingFormNavigation({
  scrollContainerRef,
  items,
}: FloatingFormNavigationProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length > 0) {
      setActiveId(items[0].id);
    }
  }, [items]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || items.length === 0) return;

    let timeoutId: number;

    const handleScroll = () => {
      cancelAnimationFrame(timeoutId);
      timeoutId = requestAnimationFrame(() => {
        const containerRect = container.getBoundingClientRect();
        
        // Find which item is closest to the top offset
        let currentActiveId = items[0]?.id;

        for (const item of items) {
          const el = document.getElementById(item.id);
          if (el) {
            const elRect = el.getBoundingClientRect();
            const offset = elRect.top - containerRect.top;
            
            if (offset <= 120 && offset > -elRect.height + 60) {
              currentActiveId = item.id;
            }
          }
        }

        // Handle bottom of screen case where last section is active
        const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 80;
        if (isAtBottom) {
          currentActiveId = items[items.length - 1].id;
        }

        setActiveId(currentActiveId);
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(timeoutId);
    };
  }, [scrollContainerRef, items]);

  const handleNavigate = (id: string) => {
    const container = scrollContainerRef.current;
    const element = document.getElementById(id);
    if (container && element) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const relativeTop = elementRect.top - containerRect.top;
      
      container.scrollTo({
        top: container.scrollTop + relativeTop - 12,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  if (items.length <= 1) return null;

  return (
    <div className="absolute right-8 top-12 bottom-28 z-30 hidden xl:flex flex-col select-none pointer-events-none">
      <div className="relative pl-6 flex-1 flex flex-col justify-between py-3">
        {/* 连接各个节点的垂直虚线 - 精准对齐第一个节点和最后一个节点 */}
        <div className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-slate-200/80 border-l border-dashed border-slate-300" />

        {items.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className="relative flex items-center text-left cursor-pointer group outline-none focus:outline-none pointer-events-auto"
              id={`form-nav-item-${item.id}`}
            >
              {/* 序号或点状节点 (当前激活时显示炫丽的光晕) */}
              <div
                className={`absolute -left-[24px] z-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-4 h-4 -left-[26px] bg-[#419EFF] ring-4 ring-blue-100 shadow-sm'
                    : 'w-2 h-2 bg-slate-300 group-hover:bg-[#419EFF]/60 group-hover:scale-125'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white block animate-pulse" />
                )}
              </div>
              
              {/* 文本标签 */}
              <div className="flex flex-col pl-4">
                <span
                  className={`text-xs transition-all duration-200 tracking-wide font-medium ${
                    isActive
                      ? 'text-[#419EFF] font-bold scale-[1.03] translate-x-1'
                      : 'text-slate-400 group-hover:text-slate-700'
                  }`}
                >
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-300 group-hover:text-slate-400 -mt-0.5 scale-90 origin-left">
                  {`0${index + 1}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

