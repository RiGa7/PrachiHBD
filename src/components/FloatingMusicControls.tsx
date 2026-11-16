import React, { useState } from 'react';
import { Music } from 'lucide-react';
import { sound } from '../utils/sound';

export const FloatingMusicControls: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayTune = () => {
    setIsPlaying(true);
    sound.playBirthdayTune();
    setTimeout(() => {
      setIsPlaying(false);
    }, 4500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={handlePlayTune}
        className={`px-3.5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-md border transition-all ${
          isPlaying
            ? 'bg-rose-400 text-white border-rose-300 shadow-rose-200'
            : 'bg-white/90 text-stone-700 hover:bg-white border-stone-200 shadow-stone-200/50 backdrop-blur-xs'
        }`}
      >
        <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : 'text-rose-400'}`} />
        <span>{isPlaying ? 'Playing Jingle... 🎵' : 'Birthday Jingle 🎶'}</span>
      </button>
    </div>
  );
};
