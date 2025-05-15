
import { useState } from 'react';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/hooks/use-toast';
import { fetchPlacesData } from '@/services/apiService';

interface BusinessFormValues {
  businessName: string;
  businessAddress: string;
  businessType: string;
}

export function useBusinessAnalysisForm(onSubmit: (values: BusinessFormValues) => void) {
  const { selectedDistrict } = useDistrictSelection();
  const { apiKeys } = useApiKeys();
  const { toast } = useToast();
  
  const [values, setValues] = useState<BusinessFormValues>({
    businessName: '',
    businessAddress: '',
    businessType: 'restaurant'
  });
  
  const [isSearching, setIsSearching] = useState(false);
  const [foundPlaces, setFoundPlaces] = useState<any[]>([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Reset found places when business name changes
    if (name === 'businessName') {
      setFoundPlaces([]);
    }
  };
  
  const handleBusinessTypeChange = (value: string) => {
    setValues(prev => ({ ...prev, businessType: value }));
  };
  
  const handleSearchPlace = async () => {
    if (!values.businessName.trim()) {
      toast({
        title: "Nome attività richiesto",
        description: "Inserisci il nome dell'attività per effettuare la ricerca",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    
    try {
      const searchQuery = `${values.businessName} ${selectedDistrict}`;
      const data = await fetchPlacesData(searchQuery, apiKeys.googlePlaces, selectedDistrict);
      
      if (data && data.results && data.results.length > 0) {
        setFoundPlaces(data.results);
        
        // Seleziona automaticamente il primo risultato
        const firstResult = data.results[0];
        setValues(prev => ({
          ...prev,
          businessAddress: firstResult.formatted_address || firstResult.vicinity || `${selectedDistrict}`,
        }));
        
        toast({
          title: "Attività trovata",
          description: `Indirizzo trovato per ${values.businessName}`,
        });
      } else {
        toast({
          title: "Nessun risultato trovato",
          description: "Nessuna attività trovata con questo nome. Prova a inserire l'indirizzo manualmente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error searching place:', error);
      toast({
        title: "Errore nella ricerca",
        description: "Si è verificato un errore durante la ricerca dell'attività",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const isFormValid = values.businessName.trim() !== '';
  
  return {
    values,
    isSearching,
    foundPlaces,
    isFormValid,
    handleChange,
    handleBusinessTypeChange,
    handleSearchPlace,
    handleFormSubmit
  };
}
