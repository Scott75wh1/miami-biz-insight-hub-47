
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { getCurrentDistrict } from '@/utils/districtUtils';

interface DataState {
  // Census data
  censusLoaded: boolean;
  censusLastUpdated: Date | null;
  
  // Places data
  placesLoaded: boolean;
  placesLastUpdated: Date | null;
  
  // Business analysis data
  businessAnalysisLoaded: boolean;
  businessAnalysisLastUpdated: Date | null;
  
  // Competitors data
  competitorsLoaded: boolean;
  competitorsLastUpdated: Date | null;

  // Trends data
  trendsLoaded: boolean;
  trendsLastUpdated: Date | null;
}

interface DataCollectionContextType {
  dataState: DataState;
  refreshData: (dataType: keyof DataState) => void;
  refreshAllData: () => void;
  isLoading: boolean;
  currentDistrict: string; // Added to ensure district is available
}

// Default context value
const defaultContext: DataCollectionContextType = {
  dataState: {
    censusLoaded: false,
    censusLastUpdated: null,
    placesLoaded: false,
    placesLastUpdated: null,
    businessAnalysisLoaded: false,
    businessAnalysisLastUpdated: null,
    competitorsLoaded: false,
    competitorsLastUpdated: null,
    trendsLoaded: false,
    trendsLastUpdated: null,
  },
  refreshData: () => console.log("Default refresh data called"),
  refreshAllData: () => console.log("Default refresh all data called"),
  isLoading: false,
  currentDistrict: "Miami Beach"
};

const DataCollectionContext = createContext<DataCollectionContextType>(defaultContext);

interface DataCollectionProviderProps {
  children: ReactNode;
}

export function DataCollectionProvider({ children }: DataCollectionProviderProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentDistrict, setCurrentDistrict] = useState(getCurrentDistrict());
  
  // Tentativo sicuro di accesso al context del distretto
  let selectedDistrict = currentDistrict;
  
  try {
    const districtContext = useDistrictSelection();
    if (districtContext) {
      selectedDistrict = districtContext.selectedDistrict;
      // Aggiorna lo stato locale se diverso
      if (selectedDistrict !== currentDistrict) {
        setCurrentDistrict(selectedDistrict);
      }
    }
  } catch (error) {
    console.warn("District selection not available in DataCollectionProvider, using local state");
  }
  
  const [dataState, setDataState] = useState<DataState>({
    censusLoaded: false,
    censusLastUpdated: null,
    
    placesLoaded: false,
    placesLastUpdated: null,
    
    businessAnalysisLoaded: false,
    businessAnalysisLastUpdated: null,
    
    competitorsLoaded: false,
    competitorsLastUpdated: null,
    
    trendsLoaded: false,
    trendsLastUpdated: null,
  });
  
  // Reset data states when district changes
  useEffect(() => {
    if (selectedDistrict !== currentDistrict) {
      console.log(`District changed from ${currentDistrict} to ${selectedDistrict}, resetting data state`);
      setCurrentDistrict(selectedDistrict);
      
      setDataState(prev => ({
        ...prev,
        censusLoaded: false,
        placesLoaded: false,
        businessAnalysisLoaded: false,
        competitorsLoaded: false,
        trendsLoaded: false,
      }));
    }
  }, [selectedDistrict, currentDistrict]);
  
  // Ascolta l'evento personalizzato per i cambi di distretto
  useEffect(() => {
    const handleDistrictChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newDistrict = customEvent.detail?.district;
      
      if (newDistrict && newDistrict !== currentDistrict) {
        console.log(`District event received in DataCollection: ${newDistrict}`);
        setCurrentDistrict(newDistrict);
      }
    };

    window.addEventListener('districtChanged', handleDistrictChange);
    
    return () => {
      window.removeEventListener('districtChanged', handleDistrictChange);
    };
  }, [currentDistrict]);
  
  // Simulated refresh data function
  const refreshData = async (dataType: keyof DataState) => {
    const baseKey = dataType.replace('Loaded', '').replace('LastUpdated', '');
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update the data state
    setDataState(prev => ({
      ...prev,
      [`${baseKey}Loaded`]: true,
      [`${baseKey}LastUpdated`]: new Date(),
    } as unknown as DataState));
    
    toast({
      title: "Dati aggiornati",
      description: `I dati ${baseKey} per ${currentDistrict} sono stati aggiornati con successo.`,
    });
    
    setIsLoading(false);
  };
  
  const refreshAllData = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Update all data states
    const now = new Date();
    setDataState({
      censusLoaded: true,
      censusLastUpdated: now,
      
      placesLoaded: true,
      placesLastUpdated: now,
      
      businessAnalysisLoaded: true,
      businessAnalysisLastUpdated: now,
      
      competitorsLoaded: true,
      competitorsLastUpdated: now,
      
      trendsLoaded: true,
      trendsLastUpdated: now,
    });
    
    toast({
      title: "Dati completi aggiornati",
      description: `Tutti i dati per ${currentDistrict} sono stati aggiornati con successo.`,
    });
    
    setIsLoading(false);
  };
  
  const contextValue: DataCollectionContextType = {
    dataState,
    refreshData,
    refreshAllData,
    isLoading,
    currentDistrict
  };
  
  return (
    <DataCollectionContext.Provider value={contextValue}>
      {children}
    </DataCollectionContext.Provider>
  );
}

export const useDataCollection = () => {
  const context = useContext(DataCollectionContext);
  if (!context) {
    console.error("useDataCollection must be used within a DataCollectionProvider");
    return defaultContext;
  }
  return context;
};
