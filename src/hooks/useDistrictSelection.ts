
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

  return {
    districts: MIAMI_DISTRICTS,
    selectedDistrict,
    handleDistrictChange
  };
}
