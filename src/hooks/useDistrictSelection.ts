
import { useState } from 'react';
import { MIAMI_DISTRICTS } from '@/components/competitor/constants';

interface UseDistrictSelectionOptions {
  defaultDistrict?: string;
}

export function useDistrictSelection({ defaultDistrict = "Miami Beach" }: UseDistrictSelectionOptions = {}) {
  const [selectedDistrict, setSelectedDistrict] = useState<string>(defaultDistrict);
  
  const handleDistrictChange = (district: string) => {
    if (district !== selectedDistrict) {
      setSelectedDistrict(district);
    }
  };

  // Ensure districts is always an array, even if MIAMI_DISTRICTS is undefined for some reason
  const districts = MIAMI_DISTRICTS || ["Miami Beach", "Wynwood", "Brickell"];

  return {
    districts,
    selectedDistrict,
    handleDistrictChange
  };
}
