
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import BusinessTypeSelector, { BusinessType } from '@/components/BusinessTypeSelector';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { useApiKeys } from '@/hooks/useApiKeys';
import { fetchPlacesData } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

interface BusinessInfoFormProps {
  onSubmit: (businessInfo: {
    name: string;
    type: string;
    description: string;
    address: string;
  }) => void;
}

const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({ onSubmit }) => {
  const { selectedDistrict, districts, handleDistrictChange } = useDistrictSelection();
  const { apiKeys } = useApiKeys();
  const { toast } = useToast();
  
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState<BusinessType>('restaurant');
  const [businessDescription, setBusinessDescription] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName) return;
    
    setIsSubmitting(true);
    
    onSubmit({
      name: businessName,
      type: businessType,
      description: businessDescription,
      address: businessAddress
    });
    
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  const searchBusinessAddress = async () => {
    if (!businessName.trim()) {
      toast({
        title: "Nome attività richiesto",
        description: "Inserisci il nome dell'attività per cercare l'indirizzo",
      });
      return;
    }

    setIsSearching(true);
    
    try {
      // Construct query with business name and district
      const searchQuery = `${businessName} ${selectedDistrict}`;
      
      // Use the Places API to search for the business
      const data = await fetchPlacesData(searchQuery, apiKeys.googlePlaces, selectedDistrict);
      
      if (data && data.results && data.results.length > 0) {
        // Get the first result's address
        const firstResult = data.results[0];
        const address = firstResult.formatted_address || firstResult.vicinity || '';
        
        // Update the address field
        setBusinessAddress(address);
        
        toast({
          title: "Indirizzo trovato",
          description: `Indirizzo per "${businessName}" trovato automaticamente.`,
        });
      } else {
        toast({
          title: "Indirizzo non trovato",
          description: "Nessun indirizzo trovato. Inserisci l'indirizzo manualmente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error searching for business address:', error);
      toast({
        title: "Errore di ricerca",
        description: "Si è verificato un errore durante la ricerca dell'indirizzo.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  // When business name changes, reset address field
  useEffect(() => {
    if (!businessName) {
      setBusinessAddress('');
    }
  }, [businessName]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="business-name">Nome Attività</Label>
          <div className="flex items-center gap-2">
            <Input
              id="business-name"
              placeholder="Es. Caffè Milano"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="flex-1"
              required
            />
            <Button 
              type="button" 
              size="icon" 
              variant="outline" 
              onClick={searchBusinessAddress}
              disabled={isSearching || !businessName.trim()}
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="district">Zona</Label>
          <div className="flex items-center space-x-2">
            <Select value={selectedDistrict} onValueChange={handleDistrictChange}>
              <SelectTrigger id="district">
                <SelectValue placeholder="Seleziona zona" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
              <MapPin className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="business-address">Indirizzo</Label>
        <Input
          id="business-address"
          placeholder="Indirizzo dell'attività"
          value={businessAddress}
          onChange={(e) => setBusinessAddress(e.target.value)}
          className="w-full"
        />
        {businessAddress && (
          <p className="text-xs text-muted-foreground">
            Indirizzo trovato tramite ricerca automatica. Puoi modificarlo se necessario.
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label>Tipo di Attività</Label>
        <BusinessTypeSelector
          selectedType={businessType}
          onTypeChange={setBusinessType}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="business-description">Descrizione (opzionale)</Label>
        <Textarea
          id="business-description"
          placeholder="Descrivi brevemente la tua attività..."
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
          rows={3}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting || !businessName}>
        {isSubmitting ? "Analisi in corso..." : "Inizia l'Analisi"}
      </Button>
    </form>
  );
};

export default BusinessInfoForm;
