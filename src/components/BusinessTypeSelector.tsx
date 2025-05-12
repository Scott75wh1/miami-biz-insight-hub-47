
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Store } from 'lucide-react';

export type BusinessType = 'restaurant' | 'coffee_shop' | 'retail' | 'tech' | 'fitness';

interface BusinessTypeSelectorProps {
  selectedType: BusinessType;
  onTypeChange: (type: BusinessType) => void;
}

const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({ selectedType, onTypeChange }) => {
  const businessTypes = [
    { id: 'restaurant', name: 'Ristoranti' },
    { id: 'coffee_shop', name: 'Caffetterie' },
    { id: 'retail', name: 'Negozi al dettaglio' },
    { id: 'tech', name: 'Aziende Tech' },
    { id: 'fitness', name: 'Palestre e Fitness' },
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Store className="mr-2 h-5 w-5" />
          Seleziona Tipo di Business
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedType} onValueChange={(value) => onTypeChange(value as BusinessType)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleziona tipo di business" />
          </SelectTrigger>
          <SelectContent>
            {businessTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default BusinessTypeSelector;
