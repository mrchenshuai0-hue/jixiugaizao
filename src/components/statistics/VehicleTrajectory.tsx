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
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
      <div className="w-96 bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col z-10">
        <div className="flex flex-col gap-2 mb-4">
          <input type="text" placeholder="管辖单位" className="border border-gray-300 rounded px-2 py-1.5 text-sm" />
          <input type="text" placeholder="车牌号" className="border border-gray-300 rounded px-2 py-1.5 text-sm" />
          <input type="date" placeholder="送修时间" className="border border-gray-300 rounded px-2 py-1.5 text-sm" />
          <button className="bg-[#419EFF] text-white px-3 py-1.5 rounded text-sm hover:bg-[#337FCC]">查询</button>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-2 py-2">管辖单位</th>
              <th className="px-2 py-2">车牌号</th>
              <th className="px-2 py-2">送修时间</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-50 border-b border-gray-200 cursor-pointer">
              <td className="px-2 py-2">某区</td>
              <td className="px-2 py-2">闽A88888</td>
              <td className="px-2 py-2">2026-04-10</td>
            </tr>
            <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
              <td className="px-2 py-2">某区</td>
              <td className="px-2 py-2">闽A88888</td>
              <td className="px-2 py-2">2026-03-15</td>
            </tr>
            <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
              <td className="px-2 py-2">某区</td>
              <td className="px-2 py-2">闽A88888</td>
              <td className="px-2 py-2">2026-02-20</td>
            </tr>
            <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
              <td className="px-2 py-2">某区</td>
              <td className="px-2 py-2">闽A88888</td>
              <td className="px-2 py-2">2026-01-05</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
