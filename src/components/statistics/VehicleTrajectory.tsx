import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map as MapIcon, AlertCircle } from 'lucide-react';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom numbered icons
const createNumberedIcon = (number: number) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #419EFF; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">${number}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

export default function VehicleTrajectory() {
  const [selectedVehicle, setSelectedVehicle] = useState('闽A88888');

  // Mock trajectory points (lat, lng)
  const path: [number, number][] = [
    [39.913423, 116.368904],
    [39.901176, 116.382122],
    [39.912501, 116.387271],
    [39.904600, 116.398258]
  ];

  return (
    <div className="flex h-[600px] gap-4 p-4">
      {/* 左侧地图区域 */}
      <div className="flex-1 rounded-lg border border-gray-200 overflow-hidden relative bg-[#f0f3f6] z-0">
        <MapContainer center={[39.9079, 116.3835]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <Polyline positions={path} pathOptions={{ color: '#419EFF', weight: 5, opacity: 0.8 }} />
          {path.map((pos, index) => (
            <Marker key={index} position={pos} icon={createNumberedIcon(index + 1)}>
              <Popup>
                维修点 {index + 1} <br /> 车辆: {selectedVehicle}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      {/* 右侧车辆列表 */}
      <div className="w-96 bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col z-10 shrink-0">
        <div className="flex flex-col gap-3 mb-6">
          <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-1">
            <div className="w-1 h-4 bg-[#419EFF]"></div> 轨迹分析查询
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="车辆品牌" className="border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-[#419EFF] outline-none" />
            <select className="border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-[#419EFF] outline-none bg-white">
              <option value="">归属地</option>
              <option value="本地">本地</option>
              <option value="外地">外地</option>
            </select>
          </div>
          <input type="text" placeholder="车牌号关键字" className="border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-[#419EFF] outline-none" />
          <div className="flex items-center gap-2">
            <input type="date" className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs" />
            <span className="text-gray-400">-</span>
            <input type="date" className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs" />
          </div>
          <button className="bg-[#419EFF] text-white px-3 py-1.5 rounded text-xs hover:bg-[#337FCC] font-medium">查询轨迹</button>
        </div>
        
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50 sticky top-0">
              <tr>
                <th className="px-2 py-2 font-medium">车牌号</th>
                <th className="px-2 py-2 font-medium">品牌</th>
                <th className="px-2 py-2 font-medium">归属</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {[
                { lp: '京A88888', brand: '大众', origin: '本地', active: true },
                { lp: '沪B66666', brand: '丰田', origin: '外地', active: false },
                { lp: '浙C12345', brand: '别克', origin: '外地', active: false },
                { lp: '苏D99999', brand: '本田', origin: '本地', active: false },
              ].map((v, i) => (
                <tr key={i} className={`${v.active ? 'bg-blue-50' : 'bg-white'} border-b border-gray-100 cursor-pointer hover:bg-gray-50`} onClick={() => setSelectedVehicle(v.lp)}>
                  <td className="px-2 py-3 font-medium">{v.lp}</td>
                  <td className="px-2 py-3 text-gray-600">{v.brand}</td>
                  <td className="px-2 py-3">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${v.origin === '本地' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                      {v.origin}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
