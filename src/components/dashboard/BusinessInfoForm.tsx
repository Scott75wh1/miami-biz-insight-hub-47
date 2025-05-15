
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import BusinessTypeSelector, { BusinessType } from '@/components/BusinessTypeSelector';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { MapPin } from 'lucide-react';

interface BusinessInfoFormProps {
  onSubmit: (businessInfo: {
    name: string;
    type: string;
    description: string;
  }) => void;
}

const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({ onSubmit }) => {
  const { selectedDistrict, districts, handleDistrictChange } = useDistrictSelection();
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState<BusinessType>('restaurant');
  const [businessDescription, setBusinessDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName) return;
    
    setIsSubmitting(true);
    
    onSubmit({
      name: businessName,
      type: businessType,
      description: businessDescription
    });
    
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="business-name">Nome Attività</Label>
          <Input
            id="business-name"
            placeholder="Es. Caffè Milano"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
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
