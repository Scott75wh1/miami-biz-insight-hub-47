
import { useState, useEffect, createContext, useContext } from 'react';
import { MIAMI_DISTRICTS } from '@/components/competitor/constants';

interface DistrictSelectionContextType {
  districts: string[];
  selectedDistrict: string;
  handleDistrictChange: (district: string) => void;
}

// Create context
const DistrictSelectionContext = createContext<DistrictSelectionContextType | undefined>(undefined);

// Provider component
export function DistrictSelectionProvider({ children, defaultDistrict = "Miami Beach" }) {
  const [selectedDistrict, setSelectedDistrict] = useState<string>(defaultDistrict);
  
  const handleDistrictChange = (district: string) => {
    if (district !== selectedDistrict) {
      console.log(`District changed to: ${district}`);
      setSelectedDistrict(district);
    }
  };

  // Ensure districts is always an array, even if MIAMI_DISTRICTS is undefined
  const districts = MIAMI_DISTRICTS || ["Miami Beach", "Wynwood", "Brickell"];

  const value = {
    districts,
    selectedDistrict,
    handleDistrictChange
  };

  return (
    <DistrictSelectionContext.Provider value={value}>
      {children}
    </DistrictSelectionContext.Provider>
  );
}

// Hook to use the district selection context
export function useDistrictSelection() {
  const context = useContext(DistrictSelectionContext);
  if (context === undefined) {
    throw new Error('useDistrictSelection must be used within a DistrictSelectionProvider');
  }
  return context;
}
