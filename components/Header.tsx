
import React from 'react';
import { Newspaper, Bell, Search } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  reputation: number;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick, reputation }) => {
  return (
    <header className="bg-yellow-400 text-black border-b-4 border-black p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Newspaper size={32} />
          <span className="font-gothic text-3xl font-bold leading-none">SUN</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold uppercase tracking-tighter">Reputação do App</span>
            <div className="h-2 w-24 bg-black/20 rounded-full overflow-hidden border border-black">
              <div 
                className="h-full bg-red-600" 
                style={{ width: `${Math.min(reputation, 100)}%` }}
              />
            </div>
          </div>
          <button onClick={onSearchClick} className="p-1 hover:bg-black/10 rounded">
            <Search size={24} />
          </button>
          <div className="relative">
            <Bell size={24} />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1 rounded-full">3</span>
          </div>
        </div>
      </div>
      <h1 className="font-tabloid text-4xl text-center leading-none tracking-tighter border-y-2 border-black py-1">
        San Urban News
      </h1>
      <div className="flex justify-between items-center text-[10px] font-bold mt-1 uppercase italic">
        <span>Edição #4092</span>
        <span className="text-red-700 animate-pulse">● Notícias Urgentes 24h</span>
        <span>Vol. 94</span>
      </div>
    </header>
  );
};

export default Header;
