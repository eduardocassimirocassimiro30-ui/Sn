
import React from 'react';
import { TRENDS, NEIGHBORHOODS } from '../constants';
import { TrendingUp, ShieldAlert } from 'lucide-react';

const TrendingSidebar: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <section className="bg-black border-2 border-yellow-400 p-3">
        <h3 className="text-yellow-400 font-tabloid text-xl flex items-center gap-2 mb-3">
          <TrendingUp size={20} /> Tendências
        </h3>
        <div className="flex flex-wrap gap-2">
          {TRENDS.map(tag => (
            <span key={tag} className="text-white bg-gray-800 px-2 py-1 text-[10px] font-bold hover:bg-yellow-400 hover:text-black cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-red-900/20 border-2 border-red-600 p-3">
        <h3 className="text-red-600 font-tabloid text-xl flex items-center gap-2 mb-3">
          <ShieldAlert size={20} /> Ranking de Perigo
        </h3>
        <div className="space-y-3">
          {NEIGHBORHOODS.sort((a,b) => b.dangerLevel - a.dangerLevel).map((n, idx) => (
            <div key={n.name} className="flex flex-col">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="uppercase">{idx + 1}. {n.name}</span>
                <span className="text-red-600">{n.dangerLevel}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-800 rounded-full mt-1">
                <div 
                  className="h-full bg-red-600" 
                  style={{ width: `${n.dangerLevel}%` }}
                />
              </div>
              <span className="text-[9px] text-gray-500 mt-0.5">Gangues: {n.activeGangs.join(', ')}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TrendingSidebar;
