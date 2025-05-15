
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';

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
}

const DataCollectionContext = createContext<DataCollectionContextType | undefined>(undefined);

interface DataCollectionProviderProps {
  children: ReactNode;
}

export function DataCollectionProvider({ children }: DataCollectionProviderProps) {
  const { toast } = useToast();
  let selectedDistrict = "Miami Beach"; // Default value
  
  try {
    // Try to use the district selection hook, but don't crash if it's not available
    const districtSelection = useDistrictSelection();
    selectedDistrict = districtSelection.selectedDistrict;
  } catch (error) {
    console.warn("District selection not available, using default district");
  }
  
  const [isLoading, setIsLoading] = useState(false);
  
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
    setDataState(prev => ({
      ...prev,
      censusLoaded: false,
      placesLoaded: false,
      businessAnalysisLoaded: false,
      competitorsLoaded: false,
      trendsLoaded: false,
    }));
  }, [selectedDistrict]);
  
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
      description: `I dati ${baseKey} sono stati aggiornati con successo.`,
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
      description: `Tutti i dati per ${selectedDistrict} sono stati aggiornati con successo.`,
    });
    
    setIsLoading(false);
  };
  
  return (
    <DataCollectionContext.Provider value={{
      dataState,
      refreshData,
      refreshAllData,
      isLoading
    }}>
      {children}
    </DataCollectionContext.Provider>
  );
}

export const useDataCollection = () => {
  const context = useContext(DataCollectionContext);
  if (context === undefined) {
    throw new Error('useDataCollection must be used within a DataCollectionProvider');
  }
  return context;
};
