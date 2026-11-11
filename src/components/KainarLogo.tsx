import React from 'react';

export function KainarLogo({ className = "w-12 h-12" }: { className?: string }) {
  // 15 sun rays
  const rays = Array.from({ length: 15 }).map((_, i) => {
    const angle = -77 + i * 11; // from -77 to 77 degrees
    return (
      <g key={i} transform={`rotate(${angle} 250 250)`}>
        <path 
          d="M 242 95 Q 250 30 250 30 Q 250 30 258 95 Q 250 105 242 95 Z" 
          fill="#ffde00" 
        />
      </g>
    );
  });

  return (
    <svg viewBox="0 0 500 500" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Outer yellow ring */}
      <circle cx="250" cy="250" r="240" fill="#f8f9fa" stroke="#ffde00" strokeWidth="6" />
      
      {/* Sun rays */}
      {rays}
      
      {/* Inner circle - Top half yellow */}
      <path d="M 100 250 A 150 150 0 0 1 400 250 Z" fill="#ffde00" />
      
      {/* Inner circle - Bottom half blue */}
      <path d="M 100 250 A 150 150 0 0 0 400 250 Z" fill="#009ee3" />
      
      {/* Globe lines on blue half */}
      <path d="M 100 250 L 400 250" stroke="white" strokeWidth="3" fill="none" />
      <path d="M 250 250 L 250 400" stroke="white" strokeWidth="3" fill="none" />
      <path d="M 115 325 A 135 45 0 0 0 385 325" stroke="white" strokeWidth="3" fill="none" />
      <path d="M 175 250 A 45 150 0 0 0 175 380" stroke="white" strokeWidth="3" fill="none" />
      <path d="M 325 250 A 45 150 0 0 1 325 380" stroke="white" strokeWidth="3" fill="none" />
      
      {/* Shanyrak (Top symbol) */}
      <ellipse cx="250" cy="140" rx="30" ry="15" fill="white" />
      <path d="M 225 140 L 275 140 M 235 132 L 265 148 M 235 148 L 265 132" stroke="#ffde00" strokeWidth="2" />
      
      {/* Text ҚАЙНАР */}
      <text x="250" y="235" fontFamily="Arial, sans-serif" fontSize="54" fontWeight="bold" fill="#e31e24" textAnchor="middle">
        ҚАЙНАР
      </text>
      
      {/* Blue dots */}
      <circle cx="58" cy="284" r="12" fill="#009ee3" />
      <circle cx="442" cy="284" r="12" fill="#009ee3" />
      
      {/* Bottom Text */}
      <path id="text-path" d="M 58 284 A 195 195 0 0 0 442 284" fill="none" />
      <text fontFamily="Arial, sans-serif" fontSize="34" fontWeight="bold" fill="#2b3583">
        <textPath href="#text-path" startOffset="50%" textAnchor="middle">
          «ҚАЙНАР» ЖОҒАРЫ КОЛЛЕДЖІ
        </textPath>
      </text>
    </svg>
  );
}
