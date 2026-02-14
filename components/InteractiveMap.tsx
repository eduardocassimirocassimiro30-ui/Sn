
import React from 'react';
import { MapPin, Skull, Target, Crosshair } from 'lucide-react';
import { NewsItem } from '../types';

interface InteractiveMapProps {
  newsItems: NewsItem[];
  onMarkerClick: (news: NewsItem) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ newsItems, onMarkerClick }) => {
  return (
    <div className="relative w-full aspect-square bg-[#0c1a10] border-4 border-black overflow-hidden m-4 self-center max-w-[95%] shadow-[0_0_20px_rgba(0,255,0,0.2)]">
      {/* GTA San Andreas Real Map Image */}
      <img 
        src="https://images.squarespace-cdn.com/content/v1/530d9385e4b09e1e2efd974f/1441819777977-N388U0BCHYCH1QCHW51O/image-asset.jpeg" 
        alt="Mapa de San Andreas"
        className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[40%] contrast-125"
      />

      {/* Radar Scan Effect */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        {/* Sweep Animation */}
        <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,rgba(0,255,0,0.3)_0deg,transparent_90deg)] animate-[spin_4s_linear_infinite]" />
      </div>

      {/* Markers */}
      <div className="absolute inset-0 z-20">
        {newsItems.map((news) => (
          <button
            key={news.id}
            onClick={() => onMarkerClick(news)}
            style={{ top: `${news.location.lat}%`, left: `${news.location.lng}%` }}
            className="absolute group -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 focus:outline-none"
          >
            <div className="relative">
              <div className="absolute inset-0 animate-ping bg-red-600 rounded-full opacity-75" />
              <MapPin size={28} className="text-red-600 drop-shadow-[0_0_5px_rgba(255,0,0,1)] relative z-10" fill="currentColor" />
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black text-yellow-400 text-[10px] font-black px-2 py-1 whitespace-nowrap border-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                {news.location.name}
              </div>
            </div>
          </button>
        ))}

        {/* Static Radar Icons */}
        <div className="absolute top-[20%] left-[80%] opacity-40"><Target size={16} className="text-yellow-400" /></div>
        <div className="absolute bottom-[15%] left-[10%] opacity-40"><Crosshair size={16} className="text-white" /></div>
      </div>

      {/* HUD Info */}
      <div className="absolute bottom-4 left-4 z-30 flex flex-col gap-1">
        <div className="bg-black/90 text-[9px] p-2 border border-green-500/50 font-mono text-green-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            SISTEMA DE RASTREAMENTO ATIVO
          </div>
          <div>COORD: {Math.floor(Math.random()*1000)}, {Math.floor(Math.random()*1000)}</div>
          <div className="text-red-500 font-bold mt-1">EM ATUALIZAÇÃO: MAPA BETA v0.94</div>
        </div>
      </div>

      {/* Compass */}
      <div className="absolute top-4 right-4 z-30 bg-black/80 border-2 border-white/20 p-2 text-white font-black text-xl leading-none">
        N
      </div>
    </div>
  );
};

export default InteractiveMap;
