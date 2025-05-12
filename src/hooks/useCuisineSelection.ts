
import { useState } from 'react';
import { CUISINE_TYPES } from '@/components/restaurant/CuisineTypeSelector';

interface UseCuisineSelectionOptions {
  defaultCuisine?: string;
}

export function useCuisineSelection({ defaultCuisine = "Italiana" }: UseCuisineSelectionOptions = {}) {
  const [selectedCuisine, setSelectedCuisine] = useState<string>(defaultCuisine);
  
  const handleCuisineChange = (cuisine: string) => {
    if (cuisine !== selectedCuisine) {
      setSelectedCuisine(cuisine);
    }
  };

  return {
    cuisineTypes: CUISINE_TYPES,
    selectedCuisine,
    handleCuisineChange
  };
}
