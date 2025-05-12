
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        Seleziona zona
      </label>
      <Select value={selectedDistrict} onValueChange={onDistrictChange}>
        <SelectTrigger className="w-full md:w-64">
          <SelectValue placeholder="Seleziona zona" />
        </SelectTrigger>
        <SelectContent>
          {districts.map((district) => (
            <SelectItem key={district} value={district}>
              {district}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
