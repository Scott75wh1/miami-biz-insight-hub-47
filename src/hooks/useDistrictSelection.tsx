
import { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { MIAMI_DISTRICTS } from '@/components/competitor/constants';

interface DistrictSelectionContextType {
  districts: string[];
  selectedDistrict: string;
  handleDistrictChange: (district: string) => void;
}

interface DistrictSelectionProviderProps {
  children: ReactNode;
  defaultDistrict?: string;
}

// Create context with default values to avoid undefined errors
const defaultContextValue: DistrictSelectionContextType = {
  districts: ["Miami Beach", "Wynwood", "Brickell", "Little Havana", "Downtown"],
  selectedDistrict: "Miami Beach",
  handleDistrictChange: () => console.log("Default district handler called"),
};

// Create context
const DistrictSelectionContext = createContext<DistrictSelectionContextType>(defaultContextValue);

// Provider component
export function DistrictSelectionProvider({ 
  children, 
  defaultDistrict = "Miami Beach" 
}: DistrictSelectionProviderProps) {
  const [selectedDistrict, setSelectedDistrict] = useState<string>(defaultDistrict);
  
  const handleDistrictChange = (district: string) => {
    if (district !== selectedDistrict) {
      console.log(`District changed to: ${district}`);
      setSelectedDistrict(district);
      
      // Adding a custom event to notify the application of district change
      const event = new CustomEvent('districtChanged', { detail: { district } });
      window.dispatchEvent(event);
      
      // Store in localStorage for persistence
      try {
        localStorage.setItem('selectedDistrict', district);
      } catch (e) {
        console.warn("Could not store district in localStorage:", e);
      }
    }
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedDistrict = localStorage.getItem('selectedDistrict');
      if (storedDistrict) {
        setSelectedDistrict(storedDistrict);
      }
    } catch (e) {
      console.warn("Could not read from localStorage:", e);
    }
  }, []);

  // Ensure districts is always an array
  const districts = MIAMI_DISTRICTS || ["Miami Beach", "Wynwood", "Brickell", "Little Havana", "Downtown"];

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
  if (!context) {
    console.error("useDistrictSelection must be used within a DistrictSelectionProvider");
    // Return default context instead of throwing to prevent app crashes
    return defaultContextValue;
  }
  return context;
}
