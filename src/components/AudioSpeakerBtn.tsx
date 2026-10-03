import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speakText, playClickSound } from '../utils/audio';
import { useApp } from '../context/AppContext';

interface AudioSpeakerBtnProps {
  text: string;
  lang?: 'uz' | 'ru' | 'en';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export const AudioSpeakerBtn: React.FC<AudioSpeakerBtnProps> = ({
  text,
  lang = 'uz',
  size = 'md',
  className = '',
  label = "Ovoz chiqarib o'qish"
}) => {
  const { muted } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound(muted);
    if (!muted) {
      setIsPlaying(true);
      speakText(text, lang);
      setTimeout(() => setIsPlaying(false), 1200);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={label}
      aria-label={`${label}: ${text}`}
      className={`inline-flex items-center justify-center rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/80 dark:hover:bg-amber-900 dark:text-amber-200 transition-all transform active:scale-95 shadow-sm border border-amber-300 dark:border-amber-700/60 ${sizeClasses[size]} ${isPlaying ? 'ring-2 ring-amber-400 scale-105' : ''} ${className}`}
    >
      <Volume2
        size={iconSizes[size]}
        className={isPlaying ? 'animate-pulse text-amber-600 dark:text-amber-400' : ''}
      />
    </button>
  );
};
