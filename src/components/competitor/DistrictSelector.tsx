
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
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {districts.map((district) => (
        <button
          key={district}
          type="button"
          className={`text-xs py-1.5 px-2.5 rounded-full transition-colors ${
            selectedDistrict === district
              ? 'bg-primary text-primary-foreground'
              : 'bg-accent text-accent-foreground hover:bg-accent/80'
          }`}
          onClick={() => onDistrictChange(district)}
        >
          {district}
        </button>
      ))}
    </div>
  );
};
