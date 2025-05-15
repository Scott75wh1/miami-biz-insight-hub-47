
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useApiKeys } from '@/hooks/useApiKeys';
import { Loader2 } from 'lucide-react';
import { useBusinessAnalysisForm } from '@/hooks/useBusinessAnalysisForm';
import BusinessNameSearch from './BusinessNameSearch';
import BusinessTypeDropdown from './BusinessTypeDropdown';
import BusinessAddressField from './BusinessAddressField';

interface BusinessAnalysisFormProps {
  isAnalyzing: boolean;
  onSubmit: (values: {
    businessName?: string;
    businessAddress?: string;
    businessType?: string;
  }) => void;
}

// Business types options
const businessTypes = [
  { value: 'restaurant', label: 'Ristorante' },
  { value: 'coffee_shop', label: 'Caffetteria' },
  { value: 'retail', label: 'Negozio al dettaglio' },
  { value: 'tech', label: 'Tech Startup' },
  { value: 'fitness', label: 'Palestra/Centro fitness' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'salon', label: 'Salone di bellezza' },
  { value: 'market', label: 'Mercato' }
];

const BusinessAnalysisForm: React.FC<BusinessAnalysisFormProps> = ({ isAnalyzing, onSubmit }) => {
  const { selectedDistrict } = useDistrictSelection();
  const { areKeysSet } = useApiKeys();
  
  const {
    values,
    isSearching,
    foundPlaces,
    isFormValid,
    handleChange,
    handleBusinessTypeChange,
    handleSearchPlace,
    handleFormSubmit
  } = useBusinessAnalysisForm(onSubmit);

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {!areKeysSet() && (
        <Alert className="bg-yellow-50 text-yellow-800 border-yellow-300">
          <AlertDescription>
            Stai utilizzando dati simulati. Per risultati più accurati, configura le API key nelle impostazioni.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BusinessNameSearch
            businessName={values.businessName}
            isSearching={isSearching}
            foundPlaces={foundPlaces}
            onChange={handleChange}
            onSearch={handleSearchPlace}
          />
          
          <BusinessTypeDropdown
            value={values.businessType}
            onChange={handleBusinessTypeChange}
            businessTypes={businessTypes}
          />
        </div>
        
        <BusinessAddressField 
          value={values.businessAddress}
          selectedDistrict={selectedDistrict}
          onChange={handleChange}
        />
      </div>
      
      <Separator />
      
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isAnalyzing || !isFormValid}
          className="w-full md:w-auto"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analisi in corso...
            </>
          ) : (
            'Analizza Attività'
          )}
        </Button>
      </div>
    </form>
  );
};

export default BusinessAnalysisForm;
