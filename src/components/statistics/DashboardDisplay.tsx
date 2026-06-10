import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const areaData = [
  { name: '福州市', value: 4500000 },
  { name: '厦门市', value: 6500000 },
  { name: '莆田市', value: 1200000 },
  { name: '三明市', value: 500000 },
  { name: '泉州市', value: 2000000 },
  { name: '漳州市', value: 1500000 },
  { name: '南平市', value: 800000 },
  { name: '龙岩市', value: 600000 },
  { name: '宁德市', value: 1000000 },
  { name: '平潭综合实验区', value: 300000 }
];

const barData = [
  { name: '三明市公安局', CRV: 1500, 卡罗拉: 2000, 大众: 4000, 本田: 3000, 速腾: 1000, 丰田: 2500, 宝马: 800, 五菱: 1500, 未知: 1000, 凯美瑞: 800 },
  { name: '龙岩市公安局', CRV: 1200, 卡罗拉: 1800, 大众: 3500, 本田: 2800, 速腾: 900, 丰田: 2000, 宝马: 700, 五菱: 1200, 未知: 800, 凯美瑞: 700 },
  { name: '宁德市公安局', CRV: 1800, 卡罗拉: 2200, 大众: 4500, 本田: 3500, 速腾: 1200, 丰田: 3000, 宝马: 1000, 五菱: 1800, 未知: 1200, 凯美瑞: 1000 },
  { name: '福州市公安局', CRV: 8000, 卡罗拉: 12000, 大众: 25000, 本田: 18000, 速腾: 6000, 丰田: 15000, 宝马: 5000, 五菱: 8000, 未知: 5000, 凯美瑞: 4000 },
  { name: '漳州市公安局', CRV: 2500, 卡罗拉: 3500, 大众: 7000, 本田: 5000, 速腾: 1800, 丰田: 4000, 宝马: 1500, 五菱: 2500, 未知: 1500, 凯美瑞: 1200 },
  { name: '南平市公安局', CRV: 1000, 卡罗拉: 1500, 大众: 3000, 本田: 2000, 速腾: 800, 丰田: 1800, 宝马: 600, 五菱: 1000, 未知: 800, 凯美瑞: 600 },
  { name: '厦门市公安局', CRV: 10000, 卡罗拉: 15000, 大众: 35000, 本田: 25000, 速腾: 8000, 丰田: 20000, 宝马: 8000, 五菱: 10000, 未知: 8000, 凯美瑞: 6000 },
  { name: '莆田市公安局', CRV: 2000, 卡罗拉: 2800, 大众: 6000, 本田: 4500, 速腾: 1500, 丰田: 3500, 宝马: 1200, 五菱: 2000, 未知: 1500, 凯美瑞: 1000 },
  { name: '泉州市公安局', CRV: 5000, 卡罗拉: 7000, 大众: 15000, 本田: 12000, 速腾: 4000, 丰田: 10000, 宝马: 3500, 五菱: 5000, 未知: 3000, 凯美瑞: 2500 },
  { name: '平潭综合实验区', CRV: 500, 卡罗拉: 800, 大众: 1500, 本田: 1000, 速腾: 400, 丰田: 800, 宝马: 300, 五菱: 500, 未知: 400, 凯美瑞: 300 },
];

const funnelData = [
  { value: 17.27, name: '大众', fill: '#419EFF' },
  { value: 14.07, name: '未知', fill: '#A3A2DB' },
  { value: 10.87, name: '本田', fill: '#73C0DE' },
  { value: 10.40, name: '丰田', fill: '#FAC858' },
  { value: 10.21, name: '卡罗拉', fill: '#EE6666' },
  { value: 9.41, name: '五菱', fill: '#91CC75' },
  { value: 8.25, name: '宝马', fill: '#73E3B6' },
  { value: 6.58, name: 'CR-V', fill: '#9A60B4' },
  { value: 6.57, name: '速腾', fill: '#AA8877' },
  { value: 6.37, name: '凯美瑞', fill: '#3BA272' },
];

const mapData = [
  { name: '福州市', coords: [26.0745, 119.2965], value: 694 },
  { name: '厦门市', coords: [24.4798, 118.0894], value: 313 },
  { name: '莆田市', coords: [25.4541, 119.0078], value: 98 },
  { name: '三明市', coords: [26.2634, 117.6273], value: 78 },
  { name: '泉州市', coords: [24.8739, 118.6757], value: 633 },
  { name: '漳州市', coords: [24.5128, 117.6474], value: 165 },
  { name: '南平市', coords: [26.6436, 118.1777], value: 87 },
  { name: '龙岩市', coords: [25.0753, 117.0179], value: 84 },
  { name: '宁德市', coords: [26.6656, 119.5271], value: 85 },
  { name: '平潭', coords: [25.5036, 119.7891], value: 5 } // Shortened for display
] as { name: string; coords: [number, number]; value: number }[];

const createCustomIcon = (value: number) => new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div class="relative flex flex-col items-center">
            <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-xs border-2 border-red-300 shadow-[0_0_15px_rgba(239,68,68,0.9)] z-10 font-bold text-white">${value}</div>
            <div class="w-10 h-10 border-[3px] border-yellow-400 rounded-full absolute -top-1 animate-ping opacity-75"></div>
         </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

export default function DashboardDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#03112E] overflow-hidden font-sans text-white relative">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #0B2559 0%, #03112E 70%)' }}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      {/* Header */}
      <div className="h-24 flex items-center justify-center relative z-10 shrink-0">
        <h1 className="text-4xl font-black tracking-widest text-[#00E5FF] shadow-sm drop-shadow-[0_0_15px_rgba(0,229,255,0.8)] relative font-sans">
          福建省机动车修理业治安管理信息系统
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_10px_#00E5FF]"></div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[40%] h-[4px] bg-[#00E5FF] blur-[2px]"></div>
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex px-6 pb-6 gap-6 z-10 overflow-hidden">
        
        {/* Left Panel */}
        <div className="w-[30%] flex flex-col gap-6 h-full">
          {/* Top Left Chart */}
          <div className="flex-1 bg-[#051A3B]/90 rounded-xl p-4 border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.1)] flex flex-col backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00E5FF]"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00E5FF]"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00E5FF]"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00E5FF]"></div>
            
            <h2 className="text-[#00E5FF] text-lg font-bold mb-4 font-mono flex items-center before:content-[''] before:block before:w-1 before:h-4 before:bg-[#00E5FF] before:mr-2">维修车辆总数分析</h2>
            <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 10, left: 20, bottom: 40 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0F386E" vertical={false} />
                  <XAxis dataKey="name" stroke="#6893c5" tick={{fill: '#88B3E0', fontSize: 11}} angle={45} textAnchor="start" dx={5} dy={5} interval={0} axisLine={{stroke: '#0F386E'}} tickLine={false} />
                  <YAxis stroke="#6893c5" tick={{fill: '#88B3E0', fontSize: 11}} tickFormatter={(val) => val.toLocaleString()} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(5, 26, 59, 0.95)', border: '1px solid #00E5FF', borderRadius: '4px', boxShadow: '0 0 10px rgba(0,229,255,0.2)', color: '#fff' }}
                    itemStyle={{ color: '#00E5FF', fontWeight: 'bold' }}
                    labelStyle={{ color: '#88B3E0', marginBottom: '8px' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#00E5FF" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Left Chart */}
          <div className="flex-1 bg-[#051A3B]/90 rounded-xl p-4 border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.1)] flex flex-col backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00E5FF]"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00E5FF]"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00E5FF]"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00E5FF]"></div>

            <h2 className="text-[#00E5FF] text-lg font-bold mb-4 font-mono flex items-center before:content-[''] before:block before:w-1 before:h-4 before:bg-[#00E5FF] before:mr-2">维修车辆品牌占比</h2>
            <div className="flex-1 w-full relative flex items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center pt-4">
                    {funnelData.map((item, index) => {
                      const width = 100 - (index * 8);
                      return (
                        <div key={item.name} className="flex flex-col items-center justify-center mb-1 relative" style={{ width: `${width}%`, height: `${100/funnelData.length}%`, backgroundColor: item.fill, border: '1px solid rgba(255,255,255,0.3)', boxShadow: `0 0 10px ${item.fill}80` }}>
                           <span className="text-white text-[11px] font-bold mix-blend-difference px-2 truncate leading-tight flex items-center h-full drop-shadow-md">
                              {item.name} ({item.value}%)
                           </span>
                        </div>
                      )
                    })}
                </div>
            </div>
          </div>
        </div>

        {/* Center Panel (Map) */}
        <div className="w-[40%] h-full rounded-xl overflow-hidden border-2 border-[#00E5FF]/40 shadow-[0_0_30px_rgba(0,229,255,0.15)] relative">
           <MapContainer 
             center={[25.75, 118.4]} 
             zoom={7.5} 
             zoomControl={false}
             style={{ height: '100%', width: '100%', background: '#020C24' }}
           >
             <TileLayer
               url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             />
             {mapData.map((city, idx) => (
                <Marker 
                  key={idx} 
                  position={city.coords} 
                  icon={createCustomIcon(city.value)}
                >
                  <Tooltip direction="bottom" offset={[0, 15]} opacity={1} className="custom-leaflet-tooltip" permanent>
                    <span className="font-bold text-[#00E5FF] text-sm tracking-wide">{city.name}</span>
                  </Tooltip>
                </Marker>
             ))}
           </MapContainer>
           
           {/* Add a global style override for the leaflet tooltip to match the high-tech theme */}
           <style>{`
             .custom-leaflet-tooltip {
               background-color: rgba(5, 26, 59, 0.85) !important;
               border: 1px solid rgba(0, 229, 255, 0.5) !important;
               border-radius: 4px !important;
               box-shadow: 0 0 10px rgba(0,229,255,0.3) !important;
               color: #00E5FF !important;
               font-family: inherit !important;
             }
             .leaflet-tooltip-bottom.custom-leaflet-tooltip:before {
               border-bottom-color: rgba(0, 229, 255, 0.5) !important;
             }
           `}</style>
        </div>

        {/* Right Panel */}
        <div className="w-[30%] flex flex-col gap-6 h-full">
           {/* Top Right Stats */}
           <div className="flex flex-col gap-5">
              <div className="bg-[#051A3B]/90 rounded-xl p-5 border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.1)] relative overflow-hidden backdrop-blur-sm">
                 <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00E5FF]"></div>
                 <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00E5FF]"></div>
                 <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00E5FF]"></div>
                 <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00E5FF]"></div>
                 
                 <div className="absolute right-0 top-0 w-32 h-32 bg-[#00E5FF]/10 rounded-bl-full shadow-inner blur-xl"></div>
                 <h3 className="text-[#88B3E0] text-sm font-bold mb-2 flex items-center"><div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full mr-2"></div>维修车辆总数</h3>
                 <div className="text-5xl font-black text-[#00E5FF] tracking-wider font-mono drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">31946668</div>
              </div>
              <div className="bg-[#051A3B]/90 rounded-xl p-5 border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.1)] relative overflow-hidden backdrop-blur-sm">
                 <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00E5FF]"></div>
                 <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00E5FF]"></div>
                 <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00E5FF]"></div>
                 <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00E5FF]"></div>

                 <div className="absolute right-0 top-0 w-32 h-32 bg-[#00E5FF]/10 rounded-bl-full shadow-inner blur-xl"></div>
                 <h3 className="text-[#88B3E0] text-sm font-bold mb-2 flex items-center"><div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full mr-2"></div>车修企业总数</h3>
                 <div className="text-4xl font-black text-[#00E5FF] tracking-wider font-mono drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">2417</div>
              </div>
              <div className="bg-[#051A3B]/90 rounded-xl p-5 border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.1)] relative overflow-hidden backdrop-blur-sm">
                 <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00E5FF]"></div>
                 <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00E5FF]"></div>
                 <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00E5FF]"></div>
                 <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00E5FF]"></div>

                 <div className="absolute right-0 top-0 w-32 h-32 bg-[#00E5FF]/10 rounded-bl-full shadow-inner blur-xl"></div>
                 <h3 className="text-[#88B3E0] text-sm font-bold mb-2 flex items-center"><div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full mr-2"></div>从业人员总数</h3>
                 <div className="text-4xl font-black text-[#00E5FF] tracking-wider font-mono drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">22361</div>
              </div>
           </div>

           {/* Bottom Right Chart */}
           <div className="flex-1 bg-[#051A3B]/90 rounded-xl p-4 border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.1)] flex flex-col min-h-0 backdrop-blur-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00E5FF]"></div>
             <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00E5FF]"></div>
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00E5FF]"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00E5FF]"></div>

             <h2 className="text-[#00E5FF] text-lg font-bold mb-2 text-left font-mono flex items-center z-10 before:content-[''] before:block before:w-1 before:h-4 before:bg-[#00E5FF] before:mr-2">维修车辆品牌及数量分析</h2>
             <div className="flex-1 w-full relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={barData} margin={{ top: 20, right: 10, left: 10, bottom: 40 }}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#0F386E" vertical={false} />
                   <XAxis dataKey="name" stroke="#6893c5" tick={{fill: '#88B3E0', fontSize: 11}} angle={45} textAnchor="start" dx={5} dy={5} interval={0} axisLine={{stroke: '#0F386E'}} tickLine={false}/>
                   <YAxis stroke="#6893c5" tick={{fill: '#88B3E0', fontSize: 11}} tickFormatter={(val) => val.toLocaleString()} axisLine={false} tickLine={false} />
                   <RechartsTooltip 
                     contentStyle={{ backgroundColor: 'rgba(5, 26, 59, 0.95)', border: '1px solid #00E5FF', borderRadius: '4px', boxShadow: '0 0 10px rgba(0,229,255,0.2)', color: '#fff' }}
                     itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                     labelStyle={{ color: '#88B3E0', marginBottom: '8px' }}
                     cursor={{fill: 'rgba(0,229,255,0.1)'}}
                   />
                   <Legend wrapperStyle={{ fontSize: '11px', color: '#88B3E0', paddingTop: '10px' }} iconSize={10} iconType="circle" />
                   <Bar dataKey="CRV" stackId="a" fill="#E65540" />
                   <Bar dataKey="卡罗拉" stackId="a" fill="#FAC858" />
                   <Bar dataKey="大众" stackId="a" fill="#419EFF" />
                   <Bar dataKey="本田" stackId="a" fill="#73C0DE" />
                   <Bar dataKey="速腾" stackId="a" fill="#91CC75" />
                   <Bar dataKey="丰田" stackId="a" fill="#EE6666" />
                   <Bar dataKey="宝马" stackId="a" fill="#A3A2DB" />
                   <Bar dataKey="五菱" stackId="a" fill="#73E3B6" />
                   <Bar dataKey="未知" stackId="a" fill="#9A60B4" />
                   <Bar dataKey="凯美瑞" stackId="a" fill="#AA8877" />
                 </BarChart>
               </ResponsiveContainer>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
