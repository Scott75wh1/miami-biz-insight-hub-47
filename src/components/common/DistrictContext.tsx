
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { toast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';

export interface DistrictContextValue {
  district: string;
  setDistrict: (district: string) => void;
  isLoading: boolean;
}

const defaultContextValue: DistrictContextValue = {
  district: "Miami Beach",
  setDistrict: () => {},
  isLoading: false
};

const DistrictContext = createContext<DistrictContextValue>(defaultContextValue);

export const useDistrict = () => useContext(DistrictContext);

export const DistrictProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Access the district selection context safely
  let selectedDistrict = "Miami Beach";
  let handleDistrictChange = (district: string) => {
    console.log(`District changed to: ${district} (fallback handler)`);
  };
  
  try {
    const districtContext = useDistrictSelection();
    if (districtContext) {
      selectedDistrict = districtContext.selectedDistrict;
      handleDistrictChange = districtContext.handleDistrictChange;
    }
  } catch (error) {
    console.warn("District selection context not available in DistrictProvider");
  }
  
  const [district, setLocalDistrict] = useState(selectedDistrict);
  
  // Sync with global district state
  useEffect(() => {
    setLocalDistrict(selectedDistrict);
  }, [selectedDistrict]);
  
  // Handle district changes
  const setDistrict = (newDistrict: string) => {
    setIsLoading(true);
    
    // Update the global district state
    handleDistrictChange(newDistrict);
    
    // Update local state
    setLocalDistrict(newDistrict);
    
    // Show toast notification
    toast({
      title: "Zona cambiata",
      description: `Dati aggiornati per ${newDistrict}`,
    });
    
    // If on a census detail page, update the URL
    if (location.pathname.startsWith('/census/')) {
      navigate(`/census/${newDistrict}`);
    }
    
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 300);
  };
  
  const contextValue: DistrictContextValue = {
    district,
    setDistrict,
    isLoading
  };
  
  return (
    <DistrictContext.Provider value={contextValue}>
      {children}
    </DistrictContext.Provider>
  );
};
