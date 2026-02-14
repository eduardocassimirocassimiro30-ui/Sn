
import React, { useState } from 'react';
import { NewsItem } from '../types';
import { ThumbsUp, MessageSquare, Share2, MapPin, AlertTriangle } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onLike, onComment }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike(news.id);
  };

  return (
    <article className="bg-white text-black border-4 border-black m-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      {news.isFake && (
        <div className="bg-red-600 text-white py-1 px-4 flex items-center gap-2 font-bold text-xs">
          <AlertTriangle size={14} /> FAKE NEWS DETECTADA PELOS FEDERAIS
        </div>
      )}
      
      <img 
        src={news.imageUrl} 
        alt={news.title}
        className="w-full h-48 object-cover border-b-4 border-black grayscale-[50%] hover:grayscale-0 transition-all duration-300" 
      />
      
      <div className="p-4 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-red-600 text-white px-2 py-0.5 text-[10px] font-black uppercase">
            {news.category}
          </span>
          <span className="text-[10px] font-bold text-gray-600 flex items-center gap-1 uppercase">
            <MapPin size={10} /> {news.location.name}
          </span>
        </div>
        
        <h2 className="font-tabloid text-2xl mb-2 leading-none border-b border-black/10 pb-2">
          {news.title}
        </h2>
        
        <p className="font-bold text-sm mb-3 italic leading-tight">
          "{news.subtitle}"
        </p>
        
        <p className="text-sm line-clamp-3 mb-4 text-gray-800 font-serif">
          {news.content}
        </p>
        
        <div className="flex items-center justify-between border-t-2 border-black pt-3">
          <div className="flex gap-4">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs font-black ${liked ? 'text-red-600' : 'text-black'}`}
            >
              <ThumbsUp size={16} fill={liked ? "currentColor" : "none"} /> {news.likes + (liked ? 1 : 0)}
            </button>
            <button 
              onClick={() => onComment(news.id)}
              className="flex items-center gap-1 text-xs font-black"
            >
              <MessageSquare size={16} /> {news.comments.length}
            </button>
          </div>
          <button className="flex items-center gap-1 text-xs font-black">
            <Share2 size={16} />
          </button>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-[9px] font-bold text-gray-500 italic">Por {news.author}</span>
          <span className="text-[9px] font-bold text-gray-500 uppercase">{news.date}</span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
