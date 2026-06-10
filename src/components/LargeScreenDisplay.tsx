import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ShieldCheck, Users, Car, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

// Fix leafet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// 福建省各市坐标及模拟数据
const fujianCities = [
  { name: '福州市', coords: [26.0745, 119.2965], count: 1250, alerts: 12 },
  { name: '厦门市', coords: [24.4798, 118.0894], count: 890, alerts: 8 },
  { name: '泉州市', coords: [24.8739, 118.6757], count: 1540, alerts: 15 },
  { name: '漳州市', coords: [24.5128, 117.6475], count: 620, alerts: 5 },
  { name: '莆田市', coords: [25.4541, 119.0078], count: 480, alerts: 3 },
  { name: '龙岩市', coords: [25.0752, 117.0179], count: 320, alerts: 2 },
  { name: '三明市', coords: [26.2634, 117.6271], count: 290, alerts: 1 },
  { name: '南平市', coords: [26.6436, 118.1777], count: 310, alerts: 4 },
  { name: '宁德市', coords: [26.6656, 119.5271], count: 410, alerts: 6 },
];

export default function LargeScreenDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0b1021] text-white overflow-hidden font-sans">
      {/* 科技感头部 */}
      <div className="relative h-20 flex-shrink-0 flex items-center justify-between px-8 bg-[#0b1021] border-b border-blue-900/50 shadow-[0_0_20px_rgba(30,58,138,0.2)]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        
        <div className="flex items-center gap-4 z-10 w-1/3">
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 font-mono tracking-wider">
              DATA VISUALIZATION
            </span>
            <span className="text-xs text-blue-400/80 tracking-widest uppercase">Security Command Center</span>
          </div>
        </div>

        <div className="z-10 text-center flex-1">
          <h1 className="text-3xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
            福建省机修业治安态势大屏
          </h1>
        </div>

        <div className="flex items-center justify-end gap-6 z-10 w-1/3 text-right">
          <div className="flex flex-col text-right">
            <span className="text-xl font-mono font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
              {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
            </span>
            <span className="text-xs text-blue-300/80 font-mono tracking-wider">
              {currentTime.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 grid grid-cols-12 gap-4 h-[calc(100%-5rem)] relative overflow-hidden">
        
        {/* 左侧面板 */}
        <div className="col-span-3 flex flex-col gap-4 z-10">
          <div className="bg-[#0f172a]/80 border border-blue-900/50 rounded-xl p-4 flex-1 shadow-[inset_0_0_20px_rgba(30,58,138,0.2)] backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl opacity-70"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl opacity-70"></div>
            
            <h2 className="text-base font-bold text-cyan-300 flex items-center gap-2 mb-4">
              <Activity size={18} /> 全省整体态势
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '企业总数', value: '12,506', unit: '家', color: 'text-blue-400' },
                { label: '从业人员', value: '45,892', unit: '人', color: 'text-cyan-400' },
                { label: '今日修车', value: '8,420', unit: '辆', color: 'text-green-400' },
                { label: '异常预警', value: '156', unit: '起', color: 'text-red-400' }
              ].map((stat, i) => (
                <div key={i} className="bg-[#1e293b]/50 border border-blue-800/30 p-4 rounded-lg flex flex-col justify-center items-center group hover:bg-[#1e293b] transition-colors">
                  <span className="text-xs text-gray-400 mb-1 font-medium">{stat.label}</span>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-black font-mono ${stat.color} drop-shadow-[0_0_8px_currentColor]`}>{stat.value}</span>
                    <span className="text-[10px] text-gray-500">{stat.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-base font-bold text-cyan-300 flex items-center gap-2 mt-6 mb-4">
              <TrendingUp size={18} /> 案件高发类型
            </h2>
            <div className="space-y-4">
              {[
                { name: '涉嫌销赃', percent: 45, width: '45%' },
                { name: '非法改装', percent: 30, width: '30%' },
                { name: '使用假牌', percent: 15, width: '15%' },
                { name: '其他违法', percent: 10, width: '10%' }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-cyan-400 font-mono">{item.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" style={{ width: item.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 中心地图区 */}
        <div className="col-span-6 relative rounded-xl overflow-hidden border border-blue-900/40 bg-[#070b19] shadow-[0_0_30px_rgba(0,0,0,0.5)] group z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#070b19]/80 to-[#070b19] pointer-events-none z-10"></div>
          
          <MapContainer 
            center={[25.9, 118.0]} 
            zoom={7} 
            scrollWheelZoom={false}
            className="w-full h-full custom-leaflet-map !bg-[#070b19]"
            attributionControl={false}
          >
            {/* 使用一个深色/科技风格的底图。这里使用CartoDB Dark Matter */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {fujianCities.map((city, idx) => (
              <CircleMarker
                key={idx}
                center={city.coords as [number, number]}
                radius={Math.max(10, Math.sqrt(city.count) / 1.5)}
                fillColor={city.alerts > 10 ? "#ef4444" : "#06b6d4"}
                color={city.alerts > 10 ? "#f87171" : "#22d3ee"}
                weight={2}
                opacity={0.8}
                fillOpacity={0.4}
                className="pulse-circle"
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.9} className="custom-map-tooltip">
                  <div className="bg-[#0f172a]/90 backdrop-blur border border-blue-500/50 p-3 rounded-lg shadow-xl text-white font-sans">
                    <div className="font-bold text-sm mb-2 pb-1 border-b border-gray-600/50 flex items-center justify-between">
                      <span className="text-cyan-300">{city.name}</span>
                    </div>
                    <div className="space-y-1 text-xs">
                       <div className="flex justify-between gap-4">
                         <span className="text-gray-400">核验企业:</span>
                         <span className="font-mono text-cyan-400 font-bold">{city.count.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between gap-4">
                         <span className="text-gray-400">今日告警:</span>
                         <span className="font-mono text-red-400 font-bold">{city.alerts}</span>
                       </div>
                    </div>
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
          
          {/* 地图悬浮信息 */}
          <div className="absolute bottom-4 left-4 z-20 flex gap-2">
             <div className="bg-black/60 backdrop-blur-sm border border-blue-500/30 px-3 py-1.5 rounded flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400/50 border border-cyan-400 flex items-center justify-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                </div>
                <span className="text-xs text-gray-300">正常管控</span>
             </div>
             <div className="bg-black/60 backdrop-blur-sm border border-blue-500/30 px-3 py-1.5 rounded flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/50 border border-red-400 flex items-center justify-center animate-pulse">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                </div>
                <span className="text-xs text-gray-300">防范预警</span>
             </div>
          </div>
        </div>

        {/* 右侧面板 */}
        <div className="col-span-3 flex flex-col gap-4 z-10">
          <div className="bg-[#0f172a]/80 border border-blue-900/50 rounded-xl p-4 flex-1 shadow-[inset_0_0_20px_rgba(30,58,138,0.2)] backdrop-blur-sm relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-xl opacity-70"></div>

            <h2 className="text-base font-bold text-cyan-300 flex items-center gap-2 mb-4">
              <ShieldCheck size={18} /> 实时预警滚动
            </h2>
            
            <div className="flex-1 overflow-hidden relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="space-y-3 animate-scroll">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-gradient-to-r from-red-900/20 to-transparent border-l-2 border-red-500 p-3 rounded-r-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-red-400">一级告警 • {['黑名单人员入住', '涉案车辆入场', '无证经营发现', '屡次未传数据'][i % 4]}</span>
                        <span className="text-[10px] text-gray-500 font-mono">10:{59 - i}:{Math.floor(Math.random()*60)}</span>
                      </div>
                      <p className="text-xs text-gray-300 truncate">
                        {['福州市仓山区某网吧发现前科人员记录', '厦门市思明区某汽修厂未实名登记', '泉州市丰泽区重点区域发现涉案车辆轨迹', '漳州市芗城区维修疑似被盗车辆'][i % 4]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h2 className="text-base font-bold text-cyan-300 flex items-center gap-2 mt-6 mb-4">
              <Users size={18} /> 重点管控人员流向
            </h2>
            <div className="space-y-3">
               {[
                 { route: '福州 → 厦门', count: 12 },
                 { route: '泉州 → 福州', count: 8 },
                 { route: '莆田 → 泉州', count: 5 }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between bg-blue-900/20 px-4 py-2.5 rounded border border-blue-800/30">
                    <span className="text-xs text-blue-200">{item.route}</span>
                    <span className="text-sm font-mono font-bold text-cyan-400">{item.count} <span className="text-[10px] text-gray-500 font-sans font-normal">人次</span></span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .animate-scroll {
          animation: scrollUp 20s linear infinite;
        }
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .custom-map-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        .custom-leaflet-map .leaflet-container {
          background-color: #070b19 !important;
        }
      `}} />
    </div>
  );
}
