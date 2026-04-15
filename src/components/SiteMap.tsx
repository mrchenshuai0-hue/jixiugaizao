import React from 'react';
import { Folder, FileText, Link as LinkIcon, ChevronRight } from 'lucide-react';

const siteMapData = [
  {
    title: '1. 机修业管理',
    children: [
      {
        title: '备案信息',
        pages: ['备案信息展示页']
      },
      {
        title: '企业基础信息',
        pages: ['企业信息管理列表页', '企业信息登记页', '企业信息修改审核页']
      },
      {
        title: '从业人员信息',
        pages: ['从业人员信息管理列表页']
      },
      {
        title: '行政检查',
        pages: ['行政检查登记页', '行政检查管理列表页', '【快捷入口】“省涉企行政检查监管系统”跳转']
      },
      {
        title: '案事件信息',
        pages: ['违法违规登记页', '违法违规信息管理页', '企业/从业人员处罚登记与管理页', '报警信息处理工作台']
      }
    ]
  },
  {
    title: '2. 承修信息',
    children: [
      {
        title: '车辆信息管理',
        pages: ['车辆信息管理列表页']
      },
      {
        title: '车辆维修记录',
        pages: ['车辆维修综合查询页', '车辆维修记录详情页']
      }
    ]
  },
  {
    title: '3. 统计分析',
    children: [
      {
        title: '企业发展趋势',
        pages: []
      },
      {
        title: '承修情况统计分析',
        pages: ['企业/从业人员/车辆信息统计页', '上传情况多维统计页']
      },
      {
        title: '检查情况',
        pages: ['监督检查统计页', '企业季度考核统计页']
      },
      {
        title: '涉案情况',
        pages: ['报警/抓获统计页', '高频跟踪与重点分析页']
      },
      {
        title: '在逃人员抓获统计',
        pages: []
      }
    ]
  },
  {
    title: '4. 分级管理',
    children: [
      {
        title: '等级评定',
        pages: ['企业等级评定管理页', '等级评定详情页']
      },
      {
        title: '评定标准设置',
        pages: ['评定标准管理页']
      }
    ]
  },
  {
    title: '5. 系统与支撑',
    children: [
      { title: '公告与消息', pages: [] },
      { title: '权限管理', pages: [] },
      { title: '系统监控', pages: [] }
    ]
  }
];

export default function SiteMap() {
  return (
    <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border border-gray-200 p-6 h-full overflow-auto">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-[#333333]">信息架构站点地图</h2>
        <p className="text-[#999999] mt-2">机动车修理业治安管理信息系统（公安管理端）完整菜单结构与功能页清单</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {siteMapData.map((module, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-[#419EFF] mb-4 flex items-center border-b border-blue-100 pb-2">
              <Folder className="mr-2" size={20} />
              {module.title}
            </h3>
            
            <div className="space-y-4">
              {module.children.map((subModule, subIdx) => (
                <div key={subIdx} className="pl-2">
                  <h4 className="text-sm font-semibold text-[#333333] mb-2 flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#419EFF] mr-2"></div>
                    {subModule.title}
                  </h4>
                  
                  {subModule.pages && subModule.pages.length > 0 ? (
                    <ul className="pl-5 space-y-1.5 border-l-2 border-gray-200 ml-0.5">
                      {subModule.pages.map((page, pageIdx) => (
                        <li key={pageIdx} className="text-sm text-[#666666] flex items-start relative before:content-[''] before:absolute before:w-3 before:h-0.5 before:bg-gray-200 before:-left-5 before:top-2.5">
                          {page.includes('跳转') ? (
                            <LinkIcon size={14} className="mr-1.5 mt-0.5 text-[#ffc23e] shrink-0" />
                          ) : (
                            <FileText size={14} className="mr-1.5 mt-0.5 text-[#999999] shrink-0" />
                          )}
                          <span className={page.includes('跳转') ? 'text-[#ffc23e] font-medium' : ''}>{page}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="pl-5 ml-0.5 border-l-2 border-transparent">
                      <span className="text-xs text-[#999999] italic flex items-center">
                        <ChevronRight size={12} className="mr-1" /> 暂无子页面
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
