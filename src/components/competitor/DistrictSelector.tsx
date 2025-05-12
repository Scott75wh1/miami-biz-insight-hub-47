
import React from 'react';

interface DistrictSelectorProps {
  districts: string[];
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
}

export const DistrictSelector: React.FC<DistrictSelectorProps> = ({
  districts,
  selectedDistrict,
  onDistrictChange,
}) => {
  // Nota: Questo componente non verrà più utilizzato, ma manteniamo il file per evitare errori di importazione
  return (
    <div className="hidden">
      {districts.map((district) => (
        <button
          key={district}
          type="button"
          className="hidden"
          onClick={() => onDistrictChange(district)}
        >
          {district}
        </button>
      ))}
    </div>
  );
};
