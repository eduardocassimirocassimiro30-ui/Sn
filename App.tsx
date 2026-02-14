
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import InteractiveMap from './components/InteractiveMap';
import TrendingSidebar from './components/TrendingSidebar';
import { INITIAL_NEWS } from './constants';
import { Category, NewsItem } from './types';
import { Radio, Map, Newspaper as NewsIcon, Settings, User, Mic2, Wand2, X, AlertCircle, Play, Pause, SkipForward, Volume2, Wifi } from 'lucide-react';
import { generateSensationalHeadline } from './services/geminiService';

const STATIONS = [
  { name: '104.5 WCTR', genre: 'Talk Radio', url: 'https://streaming.radio.co/s697072522/listen' },
  { name: 'Radio Los Santos', genre: 'West Coast Rap', url: 'https://node-14.zeno.fm/99m8qy4h4h8uv' },
  { name: 'K-DST', genre: 'Classic Rock', url: 'https://icecast.walmradio.com:8000/rock' }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'map' | 'radio' | 'profile'>('feed');
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [reputation, setReputation] = useState(45);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showAIGen, setShowAIGen] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [filter, setFilter] = useState<Category | 'Tudo'>('Tudo');

  // Radio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStationIdx, setCurrentStationIdx] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(STATIONS[currentStationIdx].url);
    }
    
    const audio = audioRef.current;
    audio.volume = volume;

    if (isPlaying) {
      audio.src = STATIONS[currentStationIdx].url;
      audio.play().catch(e => {
        console.error("Erro ao tocar áudio:", e);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying, currentStationIdx]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const filteredNews = useMemo(() => {
    if (filter === 'Tudo') return news;
    return news.filter(n => n.category === filter);
  }, [news, filter]);

  const handleLike = (id: string) => {
    setReputation(prev => Math.min(prev + 0.1, 100));
  };

  const handleCreateAIHeadline = async () => {
    if (!aiTopic) return;
    setIsGenerating(true);
    const result = await generateSensationalHeadline(aiTopic);
    
    const newArticle: NewsItem = {
      id: Math.random().toString(),
      title: result.headline,
      subtitle: result.subtitle,
      content: "Uma investigação profunda revela conexões obscuras entre os altos escalões e a vida noturna da cidade. Mais detalhes em breve.",
      category: Category.ULTIMAS,
      author: "AI Reporter-Bot 9000",
      date: "AGORA",
      imageUrl: `https://picsum.photos/seed/${Math.random()}/800/450`,
      likes: 0,
      comments: [],
      location: { lat: 50, lng: 50, name: "Área Restrita" }
    };

    setNews([newArticle, ...news]);
    setReputation(prev => prev + 5);
    setIsGenerating(false);
    setShowAIGen(false);
    setAiTopic('');
    setActiveTab('feed');
  };

  const nextStation = () => {
    setCurrentStationIdx((prev) => (prev + 1) % STATIONS.length);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-[#f0f0f0] text-black'} scanlines crt-flicker pb-20`}>
      <Header reputation={reputation} onSearchClick={() => {}} />

      <main className="max-w-md mx-auto">
        {/* Aviso Global de Atualização - Agora focado na estabilidade da rádio */}
        <div className="bg-yellow-400 text-black px-4 py-1 flex items-center justify-center gap-2 text-[10px] font-black border-b-2 border-black sticky top-[180px] z-40">
          <AlertCircle size={12} /> SISTEMA EM ATUALIZAÇÃO - SINAL DE RÁDIO POTENCIALIZADO (FIDELIDADE MÁXIMA)
        </div>

        {activeTab === 'feed' && (
          <div className="animate-in fade-in duration-500">
            <div className="bg-red-600 text-white overflow-hidden py-1 border-b-2 border-black">
              <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] font-black text-sm">
                URGENTE: TIROTEIO EM GANTON • POLÍTICO PRESO POR LAVAGEM • NOVO RAP DE CJ É DISCO DE OURO • CUIDADO COM O "CRACK" EM LOS DEMONIOS • 
              </div>
            </div>
            
            <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-b border-black/10 bg-black/50 backdrop-blur-md sticky top-[184px] z-30">
              <button 
                onClick={() => setFilter('Tudo')}
                className={`whitespace-nowrap px-3 py-1 border text-[10px] font-black uppercase transition-colors ${filter === 'Tudo' ? 'bg-yellow-400 text-black border-black' : 'bg-black text-yellow-400 border-yellow-400'}`}
              >
                Tudo
              </button>
              {Object.values(Category).map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`whitespace-nowrap px-3 py-1 border text-[10px] font-black uppercase transition-colors ${filter === cat ? 'bg-yellow-400 text-black border-black' : 'bg-black text-yellow-400 border-yellow-400'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredNews.map(item => (
                <NewsCard 
                  key={item.id} 
                  news={item} 
                  onLike={handleLike} 
                  onComment={() => setSelectedNews(item)}
                />
              ))}
            </div>
            
            <TrendingSidebar />
          </div>
        )}

        {activeTab === 'map' && (
          <div className="p-4 animate-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
            <h2 className="font-tabloid text-3xl mb-4 border-b-4 border-black inline-block text-center">RADAR DE CRIMES: SAN ANDREAS</h2>
            <InteractiveMap 
              newsItems={news.slice(0, 10)}
              onMarkerClick={(news) => {
                setSelectedNews(news);
                setActiveTab('feed');
              }} 
            />
          </div>
        )}

        {activeTab === 'radio' && (
          <div className="p-4 flex flex-col items-center animate-in zoom-in-95 duration-500">
            <div className="w-full bg-[#2a2a2a] border-8 border-[#1a1a1a] p-6 rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Background Glow - More stable green */}
              <div className={`absolute -inset-4 bg-green-400/20 blur-3xl transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
              
              <div className="bg-black border-4 border-gray-700 h-36 mb-6 flex flex-col justify-center items-center text-green-500 font-mono relative z-10 shadow-[inset_0_0_30px_rgba(0,0,0,1)]">
                <div className="absolute top-2 right-4 flex items-center gap-1 text-[8px] text-green-800 font-black uppercase">
                  <Wifi size={10} className="text-green-500" /> SINAL 100%
                </div>
                <div className="absolute top-2 left-4 text-[8px] text-green-800 font-black uppercase">
                  ESTÉREO HI-FI
                </div>

                <div className="text-3xl font-black tracking-widest mb-1 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                  {STATIONS[currentStationIdx].name}
                </div>
                <div className="text-[10px] uppercase text-green-600 font-bold tracking-[0.2em]">
                  {STATIONS[currentStationIdx].genre}
                </div>

                {isPlaying && (
                  <div className="flex gap-1.5 mt-4 items-end h-8">
                    {[1,2,3,4,5,6,7,8].map(i => (
                      <div 
                        key={i} 
                        className="w-1.5 bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)] animate-[bounce_0.8s_infinite]" 
                        style={{ 
                          animationDelay: `${i * 0.08}s`, 
                          height: `${Math.random() * 25 + 10}px` 
                        }} 
                      />
                    ))}
                  </div>
                )}
                {!isPlaying && <span className="text-[10px] text-yellow-500 font-black mt-4 animate-pulse">PRONTO PARA TRANSMISSÃO</span>}
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center px-4">
                  <button 
                    onClick={nextStation}
                    className="p-3 bg-gray-800 text-white rounded-full border-2 border-black hover:bg-gray-700 active:scale-95 transition-all shadow-md"
                  >
                    <SkipForward size={24} />
                  </button>
                  
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`w-20 h-20 rounded-full flex items-center justify-center border-4 border-black shadow-2xl active:scale-90 transition-all ${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
                  </button>

                  <div className="flex flex-col items-center gap-2">
                    <Volume2 size={20} className="text-gray-400" />
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                    />
                  </div>
                </div>

                <div className="bg-black/50 p-4 border border-white/10 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-yellow-400 font-black text-[9px] uppercase tracking-tighter">Sintonizador Digital Estável</h3>
                    <span className="text-[8px] text-green-500 font-bold uppercase">Conexão Blindada</span>
                  </div>
                  <div className="h-4 w-full bg-gray-900 border border-gray-800 rounded relative overflow-hidden">
                    <div 
                      className="absolute top-0 bottom-0 w-1.5 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)] transition-all duration-700"
                      style={{ left: `${(currentStationIdx / (STATIONS.length - 1)) * 100}%` }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.05)_50%,transparent_51%)] bg-[size:20px_100%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center bg-yellow-400 text-black p-4 border-4 border-black font-black uppercase text-xs w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              "A VOZ DAS RUAS COM CLAREZA CRISTALINA."
              <br />
              <span className="text-[10px] text-red-700 uppercase">- SISTEMA EM ATUALIZAÇÃO: PRIORIDADE ÁUDIO -</span>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 rounded-full border-8 border-yellow-400 bg-gray-800 flex items-center justify-center mb-4 overflow-hidden relative">
                <User size={64} className="text-gray-600" />
                <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center">
                  <span className="text-[8px] font-black bg-black text-white px-1 uppercase">Em Atualização</span>
                </div>
              </div>
              <h2 className="font-tabloid text-3xl">LANCE VANCE</h2>
              <span className="bg-red-600 text-white px-3 py-1 text-xs font-black rounded-full uppercase">Investigador Elite</span>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 p-4 border-2 border-white/10">
                <span className="text-[10px] uppercase font-bold text-gray-500">Furos Reportados</span>
                <div className="text-2xl font-black">{news.length}</div>
              </div>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-full bg-white text-black p-4 border-4 border-black font-black uppercase flex items-center justify-center gap-2"
              >
                <Settings size={20} /> Alternar Modo {isDarkMode ? 'Claro' : 'Escuro'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating AI Generator Button */}
      <button 
        onClick={() => setShowAIGen(true)}
        className="fixed bottom-24 right-6 w-16 h-16 bg-yellow-400 text-black rounded-full border-4 border-black shadow-xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-40 group"
      >
        <Wand2 size={28} />
      </button>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-yellow-400 border-t-4 border-black h-20 flex justify-around items-center px-4 z-50">
        <button onClick={() => setActiveTab('feed')} className={`flex flex-col items-center gap-1 ${activeTab === 'feed' ? 'text-red-700' : 'text-black opacity-60'}`}>
          <NewsIcon size={24} />
          <span className="text-[10px] font-black uppercase">Notícias</span>
        </button>
        <button onClick={() => setActiveTab('map')} className={`flex flex-col items-center gap-1 ${activeTab === 'map' ? 'text-red-700' : 'text-black opacity-60'}`}>
          <Map size={24} />
          <span className="text-[10px] font-black uppercase">Mapa</span>
        </button>
        <button onClick={() => setActiveTab('radio')} className={`flex flex-col items-center gap-1 ${activeTab === 'radio' ? 'text-red-700' : 'text-black opacity-60'}`}>
          <Radio size={24} />
          <span className="text-[10px] font-black uppercase">Rádio</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-red-700' : 'text-black opacity-60'}`}>
          <User size={24} />
          <span className="text-[10px] font-black uppercase">Perfil</span>
        </button>
      </nav>

      {/* AI Modal */}
      {showAIGen && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white text-black w-full max-w-sm border-8 border-black p-6 shadow-[15px_15px_0px_0px_rgba(204,0,0,1)]">
            <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
              <h3 className="font-tabloid text-2xl">REPORTER FANTASMA</h3>
              <button onClick={() => setShowAIGen(false)}><X size={24} /></button>
            </div>
            <input 
              type="text" 
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="Digite um escândalo..."
              className="w-full border-4 border-black p-3 mb-6 font-bold"
            />
            <button 
              onClick={handleCreateAIHeadline}
              disabled={isGenerating}
              className="w-full bg-black text-white p-4 font-black uppercase disabled:opacity-50"
            >
              {isGenerating ? 'ESCREVENDO...' : 'PUBLICAR!'}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes bounce {
          0%, 100% { height: 10px; }
          50% { height: 32px; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
