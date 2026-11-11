import React from 'react';

interface FloorPlanProps {
  floorId: number;
}

export function FloorPlanSVG({ floorId }: FloorPlanProps) {
  // Common style variables to match the authentic uploaded fire evacuation boards:
  // Light off-white background, black room outlines, bright green paths, bold text labels in Kazakh
  const wallStroke = "#1e293b";
  const wallWidth = "2.5";
  const greenRoute = "#10b981"; // high-visibility bright green
  const greenRouteSecondary = "#34d399";
  const fireExtinguisherColor = "#ef4444"; // fire danger red

  // Each SVG represents a highly detailed, professional replica of the building floor plan in the photos.
  // The building has a very long, low-profile horizontal layout, matching the 800x240 widescreen viewbox.
  const renderFloor = () => {
    switch (floorId) {
      case 1:
        return (
          <>
            {/* --- FLOOR 1 (1-ші қабат) --- */}
            {/* Main Title Inside Map */}
            <text x="400" y="25" fill="#1e293b" fontSize="14" fontWeight="900" letterSpacing="4" textAnchor="middle">
              БІРІНШІ ҚАБАТ / 1-Й ЭТАЖ
            </text>

            {/* Main Outer Building Envelope */}
            <rect x="20" y="45" width="760" height="150" fill="none" stroke={wallStroke} strokeWidth="3" />

            {/* Central Main Corridor */}
            <rect x="25" y="110" width="750" height="25" fill="#f8fafc" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
            <text x="130" y="126" fill="#94a3b8" fontSize="8" fontWeight="bold" letterSpacing="1">КОРИДОР</text>

            {/* Upper Classrooms & Offices */}
            {/* Left side rooms */}
            <rect x="25" y="45" width="80" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="65" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">101-сынып</text>

            <rect x="105" y="45" width="70" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="140" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">102-кеңсе</text>

            <rect x="175" y="45" width="70" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="210" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Гардероб</text>

            {/* Staircase Left */}
            <g transform="translate(245, 45)">
              <rect x="0" y="0" width="35" height="65" fill="#f1f5f9" stroke={wallStroke} strokeWidth={wallWidth} />
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={i} x1="5" y1={10 + i * 8} x2="30" y2={10 + i * 8} stroke="#64748b" strokeWidth="1.5" />
              ))}
              <text x="17" y="40" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90 17 40)">САТЫ</text>
            </g>

            {/* Main Central Entrance / Lobby Hall */}
            <rect x="280" y="45" width="130" height="65" fill="#fdfbf7" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="345" y="75" fill="#0f172a" fontSize="11" fontWeight="extrabold" textAnchor="middle">ВЕСТИБЮЛЬ / ХОЛЛ</text>
            <text x="345" y="90" fill="#475569" fontSize="8" textAnchor="middle">БАСТЫ КІРУ ЕСІГІ</text>

            {/* Middle and Right side rooms */}
            <rect x="410" y="45" width="70" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="445" y="80" fill="#475569" fontSize="9" fontWeight="bold" textAnchor="middle">Күзетші</text>

            <rect x="480" y="45" width="90" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="525" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Буфет</text>

            {/* Staircase Right */}
            <g transform="translate(570, 45)">
              <rect x="0" y="0" width="35" height="65" fill="#f1f5f9" stroke={wallStroke} strokeWidth={wallWidth} />
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={i} x1="5" y1={10 + i * 8} x2="30" y2={10 + i * 8} stroke="#64748b" strokeWidth="1.5" />
              ))}
              <text x="17" y="40" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90 17 40)">САТЫ</text>
            </g>

            <rect x="605" y="45" width="90" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="650" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Медпункт</text>

            <rect x="695" y="45" width="85" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="737" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">103-сынып</text>

            {/* Lower Classrooms row */}
            <rect x="25" y="135" width="90" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="70" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Асхана</text>

            <rect x="115" y="135" width="90" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="160" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Қойма</text>

            <rect x="205" y="135" width="100" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="255" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Кабинет</text>

            <rect x="305" y="135" width="130" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="370" y="170" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">Ресепшн / Кіру</text>

            <rect x="435" y="135" width="110" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="490" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Оқу бөлмесі</text>

            <rect x="545" y="135" width="110" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="600" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Зертхана</text>

            <rect x="655" y="135" width="125" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="717" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Шаруашылық</text>

            {/* --- EVACUATION GREEN PATHS (As seen on photo 1) --- */}
            {/* Paths run horizontally through corridor to exit points */}
            {/* Double top Exit in the middle lobby */}
            <path d="M 330 122 L 330 35" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />
            <path d="M 360 122 L 360 35" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />
            
            {/* Right-Center Exit straight up next to right stairs */}
            <path d="M 535 122 L 535 35" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />

            {/* Leftmost exit through corridor */}
            <path d="M 150 122 L 15 122" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />

            {/* Path lines moving horizontally to the central exits */}
            <path d="M 750 122 L 535 122" stroke={greenRoute} strokeWidth="5" fill="none" />
            <path d="M 535 122 L 360 122" stroke={greenRoute} strokeWidth="5" fill="none" />
            <path d="M 150 122 L 330 122" stroke={greenRoute} strokeWidth="5" fill="none" />

            {/* Directional small arrows on paths to guide people */}
            <path d="M 700 122 L 685 122" stroke={greenRoute} strokeWidth="4" markerEnd="url(#garrow)" fill="none" />
            <path d="M 620 122 L 605 122" stroke={greenRoute} strokeWidth="4" markerEnd="url(#garrow)" fill="none" />
            <path d="M 460 122 L 445 122" stroke={greenRoute} strokeWidth="4" markerEnd="url(#garrow)" fill="none" />
            <path d="M 200 122 L 215 122" stroke={greenRoute} strokeWidth="4" markerEnd="url(#garrow)" fill="none" />
            <path d="M 100 122 L 85 122" stroke={greenRoute} strokeWidth="4" markerEnd="url(#garrow)" fill="none" />

            {/* Green Exit signs (Running Man E) */}
            <g transform="translate(320, 20)">
              <rect width="20" height="13" fill="#10b981" rx="2" />
              <text x="10" y="10" fill="white" fontSize="8" fontWeight="black" textAnchor="middle">EXIT</text>
            </g>
            <g transform="translate(350, 20)">
              <rect width="20" height="13" fill="#10b981" rx="2" />
              <text x="10" y="10" fill="white" fontSize="8" fontWeight="black" textAnchor="middle">EXIT</text>
            </g>
            <g transform="translate(525, 20)">
              <rect width="20" height="13" fill="#10b981" rx="2" />
              <text x="10" y="10" fill="white" fontSize="8" fontWeight="black" textAnchor="middle">EXIT</text>
            </g>
            <g transform="translate(0, 115)">
              <rect width="20" height="13" fill="#10b981" rx="2" />
              <text x="10" y="10" fill="white" fontSize="8" fontWeight="black" textAnchor="middle">EXIT</text>
            </g>

            {/* Fire extinguishers (F) */}
            <circle cx="270" cy="122" r="7" fill={fireExtinguisherColor} />
            <text x="270" y="125" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">F</text>

            <circle cx="490" cy="122" r="7" fill={fireExtinguisherColor} />
            <text x="490" y="125" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">F</text>

            <circle cx="140" cy="80" r="7" fill={fireExtinguisherColor} />
            <text x="140" y="83" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">F</text>
          </>
        );
      case 3:
        return (
          <>
            {/* --- FLOOR 3 (3-ші қабат) --- */}
            {/* Title */}
            <text x="400" y="25" fill="#1e293b" fontSize="14" fontWeight="900" letterSpacing="4" textAnchor="middle">
              ҮШІНШІ ҚАБАТ / 3-Й ЭТАЖ
            </text>

            {/* Building envelope */}
            <rect x="20" y="45" width="760" height="150" fill="none" stroke={wallStroke} strokeWidth="3" />

            {/* Corridor */}
            <rect x="25" y="110" width="750" height="25" fill="#f8fafc" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />

            {/* Classrooms Top Row */}
            <rect x="25" y="45" width="110" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="80" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">301-дәрісхана</text>

            <rect x="135" y="45" width="110" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="190" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">302-дәрісхана</text>

            {/* Staircase Left */}
            <g transform="translate(245, 45)">
              <rect x="0" y="0" width="35" height="150" fill="#f1f5f9" stroke={wallStroke} strokeWidth={wallWidth} />
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={i} x1="5" y1={10 + i * 10} x2="30" y2={10 + i * 10} stroke="#64748b" strokeWidth="1.5" />
              ))}
              <text x="17" y="75" fill="#1e293b" fontSize="10" fontWeight="extrabold" textAnchor="middle" transform="rotate(-90 17 75)">САТЫ / ЛЕСТНИЦА</text>
            </g>

            <rect x="280" y="45" width="130" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="345" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Мұғалімдер бөлмесі</text>

            <rect x="410" y="45" width="160" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="490" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Әкімшілік / Деканат</text>

            {/* Staircase Right */}
            <g transform="translate(570, 45)">
              <rect x="0" y="0" width="35" height="150" fill="#f1f5f9" stroke={wallStroke} strokeWidth={wallWidth} />
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={i} x1="5" y1={10 + i * 10} x2="30" y2={10 + i * 10} stroke="#64748b" strokeWidth="1.5" />
              ))}
              <text x="17" y="75" fill="#1e293b" fontSize="10" fontWeight="extrabold" textAnchor="middle" transform="rotate(-90 17 75)">САТЫ / ЛЕСТНИЦА</text>
            </g>

            <rect x="605" y="45" width="170" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="690" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">303-компьютерлік класс</text>

            {/* Classrooms Bottom Row */}
            <rect x="25" y="135" width="110" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="80" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">304-дәрісхана</text>

            <rect x="135" y="135" width="110" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="190" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">305-дәрісхана</text>

            {/* Central bottom corridor spaces */}
            <rect x="280" y="135" width="140" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="350" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Кітапхана</text>

            <rect x="420" y="135" width="150" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="495" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Оқу залы</text>

            <rect x="605" y="135" width="170" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="690" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">306-зертхана</text>

            {/* --- EVACUATION PATHS (Leading into the two staircases, as seen on photo 2) --- */}
            {/* Path from left side towards left stairs */}
            <path d="M 25 122 L 245 122" stroke={greenRoute} strokeWidth="5" fill="none" />
            <path d="M 180 122 L 200 122" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />

            {/* Path from center lobby towards left and right stairs */}
            <path d="M 340 122 L 280 122" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />
            <path d="M 440 122 L 570 122" stroke={greenRoute} strokeWidth="5" fill="none" />
            <path d="M 470 122 L 490 122" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />

            {/* Path from right side towards right stairs */}
            <path d="M 775 122 L 605 122" stroke={greenRoute} strokeWidth="5" fill="none" />
            <path d="M 700 122 L 680 122" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />

            {/* Running man indicators outside stair exits */}
            <g transform="translate(252, 122)">
              <rect x="-8" y="-12" width="16" height="12" fill="#10b981" rx="1.5" />
              <text x="0" y="-3" fill="white" fontSize="8" fontWeight="black" textAnchor="middle">S</text>
            </g>
            <g transform="translate(578, 122)">
              <rect x="-8" y="-12" width="16" height="12" fill="#10b981" rx="1.5" />
              <text x="0" y="-3" fill="white" fontSize="8" fontWeight="black" textAnchor="middle">S</text>
            </g>

            {/* Fire Extinguishers */}
            <circle cx="120" cy="122" r="7" fill={fireExtinguisherColor} />
            <text x="120" y="125" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">F</text>

            <circle cx="430" cy="122" r="7" fill={fireExtinguisherColor} />
            <text x="430" y="125" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">F</text>

            <circle cx="670" cy="122" r="7" fill={fireExtinguisherColor} />
            <text x="670" y="125" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">F</text>
          </>
        );
      case 4:
        return (
          <>
            {/* --- FLOOR 4 (4-ші қабат) --- */}
            {/* Title */}
            <text x="400" y="25" fill="#1e293b" fontSize="14" fontWeight="900" letterSpacing="4" textAnchor="middle">
              ТӨРТІНШІ ҚАБАТ / 4-Й ЭТАЖ
            </text>

            {/* Building envelope */}
            <rect x="20" y="45" width="760" height="150" fill="none" stroke={wallStroke} strokeWidth="3" />

            {/* Corridor */}
            <rect x="25" y="110" width="750" height="25" fill="#f8fafc" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />

            {/* Classrooms Top Row */}
            <rect x="25" y="45" width="115" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="82" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">401-дәрісхана</text>

            <rect x="140" y="45" width="105" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="192" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">402-дәрісхана</text>

            {/* Staircase Left */}
            <g transform="translate(245, 45)">
              <rect x="0" y="0" width="35" height="150" fill="#f1f5f9" stroke={wallStroke} strokeWidth={wallWidth} />
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={i} x1="5" y1={10 + i * 10} x2="30" y2={10 + i * 10} stroke="#64748b" strokeWidth="1.5" />
              ))}
              <text x="17" y="75" fill="#1e293b" fontSize="10" fontWeight="extrabold" textAnchor="middle" transform="rotate(-90 17 75)">САТЫ / ЛЕСТНИЦА</text>
            </g>

            <rect x="280" y="45" width="140" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="350" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Әдістемелік кабинет</text>

            <rect x="420" y="45" width="150" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="495" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Тәжірибе бөлмесі</text>

            {/* Staircase Right */}
            <g transform="translate(570, 45)">
              <rect x="0" y="0" width="35" height="150" fill="#f1f5f9" stroke={wallStroke} strokeWidth={wallWidth} />
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={i} x1="5" y1={10 + i * 10} x2="30" y2={10 + i * 10} stroke="#64748b" strokeWidth="1.5" />
              ))}
              <text x="17" y="75" fill="#1e293b" fontSize="10" fontWeight="extrabold" textAnchor="middle" transform="rotate(-90 17 75)">САТЫ / ЛЕСТНИЦА</text>
            </g>

            <rect x="605" y="45" width="170" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="690" y="80" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">403-физика зертханасы</text>

            {/* Classrooms Bottom Row */}
            <rect x="25" y="135" width="115" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="82" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">404-дәрісхана</text>

            <rect x="140" y="135" width="105" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="192" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">405-дәрісхана</text>

            <rect x="280" y="135" width="140" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="350" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Мультимедиа залы</text>

            <rect x="420" y="135" width="150" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="495" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Конференция залы</text>

            <rect x="605" y="135" width="170" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="690" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">406-химия зертханасы</text>

            {/* --- EVACUATION PATHS --- */}
            <path d="M 25 122 L 245 122" stroke={greenRoute} strokeWidth="5" fill="none" />
            <path d="M 180 122 L 200 122" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />

            <path d="M 340 122 L 280 122" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />
            <path d="M 440 122 L 570 122" stroke={greenRoute} strokeWidth="5" fill="none" />
            <path d="M 470 122 L 490 122" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />

            <path d="M 775 122 L 605 122" stroke={greenRoute} strokeWidth="5" fill="none" />
            <path d="M 700 122 L 680 122" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />

            {/* Safety Signs */}
            <g transform="translate(252, 122)">
              <rect x="-8" y="-12" width="16" height="12" fill="#10b981" rx="1.5" />
              <text x="0" y="-3" fill="white" fontSize="8" fontWeight="black" textAnchor="middle">S</text>
            </g>
            <g transform="translate(578, 122)">
              <rect x="-8" y="-12" width="16" height="12" fill="#10b981" rx="1.5" />
              <text x="0" y="-3" fill="white" fontSize="8" fontWeight="black" textAnchor="middle">S</text>
            </g>

            {/* Fire Icons */}
            <circle cx="100" cy="122" r="7" fill={fireExtinguisherColor} />
            <text x="100" y="125" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">F</text>
            <circle cx="530" cy="122" r="7" fill={fireExtinguisherColor} />
            <text x="530" y="125" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">F</text>
          </>
        );
      case 5:
        return (
          <>
            {/* --- FLOOR 5 (5-ші қабат) --- */}
            {/* Title */}
            <text x="400" y="25" fill="#1e293b" fontSize="14" fontWeight="900" letterSpacing="4" textAnchor="middle">
              БЕСІНШІ ҚАБАТ / 5-Й ЭТАЖ
            </text>

            {/* Building envelope - highly divided density as seen on Photo 4 */}
            <rect x="20" y="45" width="760" height="150" fill="none" stroke={wallStroke} strokeWidth="3" />

            {/* Corridor */}
            <rect x="25" y="110" width="750" height="25" fill="#f8fafc" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />

            {/* Highly Divided Office/Classroom Row Top (similar to photo 4 layout) */}
            {Array.from({ length: 11 }).map((_, i) => {
              const startX = 25 + i * 20;
              if (startX >= 245 && startX <= 280) return null; // stairs block
              if (startX >= 570 && startX <= 605) return null; // stairs block
              const roomWidth = 18;
              const isFirstOrLast = i === 0 || i === 10;
              return (
                <rect 
                  key={`top-${i}`}
                  x={startX} 
                  y="45" 
                  width={isFirstOrLast ? 45 : roomWidth} 
                  height="65" 
                  fill="#ffffff" 
                  stroke={wallStroke} 
                  strokeWidth="1.5" 
                />
              );
            })}
            {/* Captions for larger top rooms */}
            <text x="48" y="80" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">Мәжіліс</text>
            <text x="492" y="80" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">502</text>
            <text x="525" y="80" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">503</text>
            <text x="555" y="80" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">504</text>
            <text x="635" y="80" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">АКТ ЗАЛЫ (МӘЖІЛІС СЕНІМІ)</text>

            {/* Staircase Left */}
            <g transform="translate(245, 45)">
              <rect x="0" y="0" width="35" height="150" fill="#f1f5f9" stroke={wallStroke} strokeWidth={wallWidth} />
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={i} x1="5" y1={10 + i * 10} x2="30" y2={10 + i * 10} stroke="#64748b" strokeWidth="1.5" />
              ))}
              <text x="17" y="75" fill="#1e293b" fontSize="10" fontWeight="extrabold" textAnchor="middle" transform="rotate(-90 17 75)">САТЫ / ЛЕСТНИЦА</text>
            </g>

            {/* Central big class spaces */}
            <rect x="280" y="45" width="290" height="65" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="425" y="80" fill="#1e293b" fontSize="12" fontWeight="900" letterSpacing="2" textAnchor="middle">
              МӘЖІЛІС ЗАЛЫ (АКТОВЫЙ ЗАЛ)
            </text>

            {/* Staircase Right */}
            <g transform="translate(570, 45)">
              <rect x="0" y="0" width="35" height="150" fill="#f1f5f9" stroke={wallStroke} strokeWidth={wallWidth} />
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={i} x1="5" y1={10 + i * 10} x2="30" y2={10 + i * 10} stroke="#64748b" strokeWidth="1.5" />
              ))}
              <text x="17" y="75" fill="#1e293b" fontSize="10" fontWeight="extrabold" textAnchor="middle" transform="rotate(-90 17 75)">САТЫ / ЛЕСТНИЦА</text>
            </g>

            {/* Bottom Row high division */}
            {Array.from({ length: 11 }).map((_, i) => {
              const startX = 25 + i * 20;
              if (startX >= 245 && startX <= 280) return null; // stairs
              if (startX >= 570 && startX <= 605) return null; // stairs
              const roomWidth = 18;
              const isFirstOrLast = i === 0 || i === 10;
              return (
                <rect 
                  key={`bot-${i}`}
                  x={startX} 
                  y="135" 
                  width={isFirstOrLast ? 45 : roomWidth} 
                  height="60" 
                  fill="#ffffff" 
                  stroke={wallStroke} 
                  strokeWidth="1.5" 
                />
              );
            })}
            <text x="48" y="170" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">Архив</text>
            <text x="735" y="170" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">Копир</text>

            <rect x="280" y="135" width="140" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="350" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">505-дәрісхана</text>

            <rect x="420" y="135" width="150" height="60" fill="#ffffff" stroke={wallStroke} strokeWidth={wallWidth} />
            <text x="495" y="170" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">506-компьютерлік класс</text>

            {/* --- EVACUATION GREEN PATHS (As seen on photo 4) --- */}
            {/* Horizontal flow lines leading into stairs */}
            <path d="M 25 122 L 245 122" stroke={greenRoute} strokeWidth="5" fill="none" />
            <path d="M 180 122 L 200 122" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />

            <path d="M 350 122 L 280 122" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />
            <path d="M 440 122 L 570 122" stroke={greenRoute} strokeWidth="5" fill="none" />
            <path d="M 470 122 L 490 122" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />

            <path d="M 775 122 L 605 122" stroke={greenRoute} strokeWidth="5" fill="none" />
            <path d="M 700 122 L 680 122" stroke={greenRoute} strokeWidth="5" markerEnd="url(#garrow)" fill="none" />

            {/* Signs */}
            <g transform="translate(252, 122)">
              <rect x="-8" y="-12" width="16" height="12" fill="#10b981" rx="1.5" />
              <text x="0" y="-3" fill="white" fontSize="8" fontWeight="black" textAnchor="middle">S</text>
            </g>
            <g transform="translate(578, 122)">
              <rect x="-8" y="-12" width="16" height="12" fill="#10b981" rx="1.5" />
              <text x="0" y="-3" fill="white" fontSize="8" fontWeight="black" textAnchor="middle">S</text>
            </g>

            {/* Fire safety points */}
            <circle cx="150" cy="122" r="7" fill={fireExtinguisherColor} />
            <text x="150" y="125" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">F</text>
            <circle cx="360" cy="122" r="7" fill={fireExtinguisherColor} />
            <text x="360" y="125" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">F</text>
            <circle cx="650" cy="122" r="7" fill={fireExtinguisherColor} />
            <text x="650" y="125" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">F</text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg 
      viewBox="0 0 800 240" 
      className="w-full h-full bg-[#fcfdfd] border-2 border-slate-300 rounded-2xl p-4 shadow-md"
      style={{ minHeight: "180px" }}
    >
      <defs>
        {/* Custom Green Arrow point marker */}
        <marker 
          id="garrow" 
          viewBox="0 0 10 10" 
          refX="5" 
          refY="5" 
          markerWidth="5" 
          markerHeight="5" 
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill={greenRoute} />
        </marker>
      </defs>

      {/* Grid Pattern Background simulating planning draft paper */}
      <rect width="100%" height="100%" fill="#fafbfa" />
      <g stroke="#e2e8f0" strokeWidth="0.5">
        {Array.from({ length: 40 }).map((_, i) => (
          <line key={i} x1={i * 20} y1="0" x2={i * 20} y2="240" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 20} x2="800" y2={i * 20} />
        ))}
      </g>

      {/* Draw actual floor layouts */}
      {renderFloor()}

      {/* Legends overlay footer */}
      <g transform="translate(30, 215)" fontSize="9" fontWeight="bold" fill="#334155">
        <line x1="0" y1="5" x2="30" y2="5" stroke={greenRoute} strokeWidth="3" markerEnd="url(#garrow)" />
        <text x="38" y="8">Эвакуация бағыты (Путь эвакуации)</text>

        <circle cx="280" cy="5" r="7" fill={fireExtinguisherColor} />
        <text x="280" y="8" fill="white" fontSize="8" fontWeight="extrabold" textAnchor="middle">F</text>
        <text x="292" y="8">Өрт сөндіргіш (Огнетушитель)</text>

        <rect x="495" y="-1" width="14" height="11" fill="#10b981" rx="1.5" />
        <text x="502" y="7" fill="white" fontSize="7" textAnchor="middle" fontWeight="black">EXIT</text>
        <text x="515" y="8">Қауіпсіз шығу (Безопасный выход)</text>

        <rect x="695" y="-1" width="14" height="11" fill="#f1f5f9" stroke={wallStroke} strokeWidth="1" rx="1.5" />
        <line x1="699" y1="2" x2="705" y2="2" stroke="#64748b" strokeWidth="1" />
        <line x1="699" y1="5" x2="705" y2="5" stroke="#64748b" strokeWidth="1" />
        <line x1="699" y1="8" x2="705" y2="8" stroke="#64748b" strokeWidth="1" />
        <text x="715" y="8">Саты (Лестница)</text>
      </g>
    </svg>
  );
}
