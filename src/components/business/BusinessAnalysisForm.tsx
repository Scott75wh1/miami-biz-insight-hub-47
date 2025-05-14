
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useApiKeys } from '@/hooks/useApiKeys';

interface BusinessAnalysisFormProps {
  isAnalyzing: boolean;
  onSubmit: (values: {
    businessName?: string;
    businessAddress?: string;
    businessType?: string;
  }) => void;
}

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
  
  const [values, setValues] = useState({
    businessName: '',
    businessAddress: '',
    businessType: 'restaurant'
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBusinessTypeChange = (value: string) => {
    setValues(prev => ({ ...prev, businessType: value }));
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const isFormValid = values.businessName.trim() !== '' && values.businessAddress.trim() !== '';

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {!areKeysSet() && (
        <Alert variant="warning" className="bg-yellow-50 text-yellow-800 border-yellow-300">
          <AlertDescription>
            Stai utilizzando dati simulati. Per risultati più accurati, configura le API key nelle impostazioni.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Nome dell'attività</Label>
            <Input
              id="businessName"
              name="businessName"
              value={values.businessName}
              onChange={handleChange}
              placeholder="Inserisci il nome della tua attività"
              className="w-full"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="businessType">Tipologia</Label>
            <Select 
              value={values.businessType}
              onValueChange={handleBusinessTypeChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleziona tipo attività" />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="businessAddress">Indirizzo</Label>
          <Input
            id="businessAddress"
            name="businessAddress"
            value={values.businessAddress}
            onChange={handleChange}
            placeholder={`Inserisci l'indirizzo a ${selectedDistrict}`}
            className="w-full"
            required
          />
          <p className="text-sm text-muted-foreground">
            L'analisi verrà eseguita per il distretto: <span className="font-medium">{selectedDistrict}</span>
          </p>
        </div>
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
