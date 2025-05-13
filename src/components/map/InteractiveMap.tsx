
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { MapPin, Map as MapIcon } from 'lucide-react';

interface District {
  name: string;
  coordinates: { x: number; y: number };
}

const MIAMI_DISTRICT_COORDINATES: District[] = [
  { name: 'Miami Beach', coordinates: { x: 75, y: 45 } },
  { name: 'Wynwood', coordinates: { x: 40, y: 60 } },
  { name: 'Brickell', coordinates: { x: 55, y: 75 } },
];

const InteractiveMap = () => {
  const { selectedDistrict, handleDistrictChange } = useDistrictSelection();
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <MapIcon className="mr-2 h-5 w-5" />
          Seleziona Quartiere
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative bg-muted rounded-md overflow-hidden h-[250px]">
          {/* Simplified Miami map base */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            className="bg-sky-50"
          >
            {/* Water */}
            <path 
              d="M0,0 L100,0 L100,100 L0,100 Z" 
              fill="#cce5ff" 
            />
            
            {/* Main land */}
            <path 
              d="M0,30 L10,35 L20,45 L30,50 L50,55 L65,80 L80,95 L100,98 L100,100 L0,100 Z" 
              fill="#e2e8f0" 
              stroke="#cbd5e1" 
              strokeWidth="0.5"
            />
            
            {/* Miami Beach */}
            <path 
              d="M70,20 L75,40 L78,60 L85,80 L80,90 L70,70 L68,50 L65,30 Z" 
              fill="#d1d5db" 
              stroke="#cbd5e1" 
              strokeWidth="0.5"
            />

            {/* District markers */}
            {MIAMI_DISTRICT_COORDINATES.map((district) => (
              <g 
                key={district.name}
                onClick={() => handleDistrictChange(district.name)}
                onMouseEnter={() => setHoveredDistrict(district.name)}
                onMouseLeave={() => setHoveredDistrict(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={district.coordinates.x}
                  cy={district.coordinates.y}
                  r={selectedDistrict === district.name ? 4 : 3}
                  fill={selectedDistrict === district.name ? '#0284c7' : (hoveredDistrict === district.name ? '#38bdf8' : '#60a5fa')}
                  stroke={selectedDistrict === district.name ? '#0284c7' : '#3b82f6'}
                  strokeWidth="1"
                />
                
                <text
                  x={district.coordinates.x}
                  y={district.coordinates.y - 8}
                  textAnchor="middle"
                  fontSize="4"
                  fontWeight={selectedDistrict === district.name ? "bold" : "normal"}
                  fill={selectedDistrict === district.name ? '#0f172a' : '#475569'}
                  className="select-none pointer-events-none"
                >
                  {district.name}
                </text>
              </g>
            ))}
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-2 rounded-md text-xs">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1 text-blue-500" />
              <span>Quartiere selezionato: <strong>{selectedDistrict}</strong></span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;
