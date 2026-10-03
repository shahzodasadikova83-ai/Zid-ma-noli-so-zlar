import React from 'react';

interface MascotProps {
  mood?: 'happy' | 'waving' | 'thinking' | 'celebrating' | 'detective';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speech?: string;
  className?: string;
}

export const MascotBilimdon: React.FC<MascotProps> = ({
  mood = 'happy',
  size = 'md',
  speech,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-40 sm:h-40',
    xl: 'w-44 h-44 sm:w-56 sm:h-56'
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Speech bubble if provided */}
      {speech && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 sm:left-full sm:top-2 sm:translate-x-3 z-20 whitespace-nowrap bg-white dark:bg-slate-800 text-slate-800 dark:text-amber-100 font-bold px-4 py-2 rounded-2xl shadow-lg border-2 border-amber-300 dark:border-amber-600 text-sm animate-pop-bounce">
          {speech}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 sm:-left-2 sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto w-3 h-3 bg-white dark:bg-slate-800 border-r-2 border-b-2 border-amber-300 dark:border-amber-600 rotate-45" />
        </div>
      )}

      {/* Animated SVG Owl */}
      <div className={`${sizeClasses[size]} relative animate-float-slow select-none`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Owl Ears */}
          <path d="M50 70 L35 30 L85 55 Z" fill="#935529" stroke="#5c3416" strokeWidth="4" />
          <path d="M150 70 L165 30 L115 55 Z" fill="#935529" stroke="#5c3416" strokeWidth="4" />
          <path d="M48 65 L40 40 L75 56 Z" fill="#f4a261" />
          <path d="M152 65 L160 40 L125 56 Z" fill="#f4a261" />

          {/* Owl Body */}
          <ellipse cx="100" cy="115" rx="68" ry="72" fill="#b06c39" stroke="#5c3416" strokeWidth="5" />

          {/* Belly */}
          <ellipse cx="100" cy="130" rx="46" ry="50" fill="#fefae0" />
          {/* Belly Feather Patterns */}
          <path d="M85 115 Q100 125 115 115" stroke="#d4a373" strokeWidth="4" strokeLinecap="round" />
          <path d="M78 135 Q100 148 122 135" stroke="#d4a373" strokeWidth="4" strokeLinecap="round" />
          <path d="M86 155 Q100 165 114 155" stroke="#d4a373" strokeWidth="4" strokeLinecap="round" />

          {/* Left Wing */}
          {mood === 'waving' ? (
            <path
              d="M36 100 Q15 65 20 40 Q45 65 42 105 Z"
              fill="#85481e"
              stroke="#5c3416"
              strokeWidth="4"
              className="origin-bottom-left transition-transform duration-300"
            />
          ) : (
            <ellipse cx="38" cy="120" rx="14" ry="36" fill="#85481e" stroke="#5c3416" strokeWidth="4" transform="rotate(15 38 120)" />
          )}

          {/* Right Wing */}
          {mood === 'celebrating' ? (
            <path
              d="M164 100 Q185 65 180 40 Q155 65 158 105 Z"
              fill="#85481e"
              stroke="#5c3416"
              strokeWidth="4"
            />
          ) : (
            <ellipse cx="162" cy="120" rx="14" ry="36" fill="#85481e" stroke="#5c3416" strokeWidth="4" transform="rotate(-15 162 120)" />
          )}

          {/* Owl Eye Sockets */}
          <circle cx="70" cy="85" r="28" fill="#ffffff" stroke="#5c3416" strokeWidth="4" />
          <circle cx="130" cy="85" r="28" fill="#ffffff" stroke="#5c3416" strokeWidth="4" />

          {/* Iris */}
          <circle cx="72" cy="85" r="16" fill="#2a9d8f" />
          <circle cx="128" cy="85" r="16" fill="#2a9d8f" />

          {/* Pupils */}
          <circle cx="73" cy="85" r="9" fill="#1d3557" />
          <circle cx="127" cy="85" r="9" fill="#1d3557" />

          {/* Eye Sparkles */}
          <circle cx="69" cy="81" r="4" fill="#ffffff" />
          <circle cx="76" cy="87" r="2" fill="#ffffff" />
          <circle cx="123" cy="81" r="4" fill="#ffffff" />
          <circle cx="130" cy="87" r="2" fill="#ffffff" />

          {/* Beak */}
          <polygon points="100,88 90,105 110,105" fill="#f39c12" stroke="#d35400" strokeWidth="3" />

          {/* Little Feet */}
          <ellipse cx="80" cy="184" rx="10" ry="6" fill="#f39c12" stroke="#d35400" strokeWidth="2" />
          <ellipse cx="120" cy="184" rx="10" ry="6" fill="#f39c12" stroke="#d35400" strokeWidth="2" />

          {/* Graduation Cap (Scholar Owl) or Detective Hat */}
          {mood === 'detective' ? (
            <g id="detective-hat">
              {/* Detective brown cap */}
              <ellipse cx="100" cy="42" rx="46" ry="12" fill="#6c584c" stroke="#43362a" strokeWidth="3" />
              <path d="M68 40 C68 20 132 20 132 40 Z" fill="#8d7461" stroke="#43362a" strokeWidth="3" />
              <line x1="60" y1="44" x2="140" y2="44" stroke="#43362a" strokeWidth="4" />
            </g>
          ) : (
            <g id="grad-cap">
              {/* Academic Square Cap */}
              <polygon points="100,12 155,30 100,45 45,30" fill="#1d3557" stroke="#0d1b2a" strokeWidth="3" />
              <path d="M72 38 L72 50 C72 58 128 58 128 50 L128 38 Z" fill="#1d3557" stroke="#0d1b2a" strokeWidth="2" />
              {/* Gold Tassel */}
              <circle cx="100" cy="28" r="4" fill="#f1c40f" />
              <path d="M100 28 Q140 32 146 54" stroke="#f1c40f" strokeWidth="3" fill="none" />
              <rect x="142" y="52" width="7" height="12" rx="2" fill="#f1c40f" />
            </g>
          )}

          {/* Cheerful Blush */}
          <circle cx="48" cy="100" r="8" fill="#e76f51" opacity="0.35" />
          <circle cx="152" cy="100" r="8" fill="#e76f51" opacity="0.35" />
        </svg>
      </div>
    </div>
  );
};
