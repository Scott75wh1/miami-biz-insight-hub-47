
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CUISINE_TYPES = [
  "Italiana",
  "Americana",
  "Messicana",
  "Giapponese",
  "Cinese",
  "Indiana",
  "Mediterranea",
  "Fast Food",
  "Steakhouse",
  "Pesce",
  "Pizza",
  "Vegetariana",
  "Vegana",
  "Fusion"
];

interface CuisineTypeSelectorProps {
  selectedCuisine: string;
  onCuisineChange: (cuisine: string) => void;
}

export const CuisineTypeSelector: React.FC<CuisineTypeSelectorProps> = ({
  selectedCuisine,
  onCuisineChange,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        Tipo di cucina
      </label>
      <Select value={selectedCuisine} onValueChange={onCuisineChange}>
        <SelectTrigger className="w-full md:w-64">
          <SelectValue placeholder="Seleziona tipo di cucina" />
        </SelectTrigger>
        <SelectContent>
          {CUISINE_TYPES.map((cuisine) => (
            <SelectItem key={cuisine} value={cuisine}>
              {cuisine}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
