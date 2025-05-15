
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BusinessAddressFieldProps {
  value: string;
  selectedDistrict: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BusinessAddressField: React.FC<BusinessAddressFieldProps> = ({
  value,
  selectedDistrict,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="businessAddress">Indirizzo</Label>
      <Input
        id="businessAddress"
        name="businessAddress"
        value={value}
        onChange={onChange}
        placeholder={`Inserisci l'indirizzo a ${selectedDistrict}`}
        className="w-full"
      />
      <p className="text-sm text-muted-foreground">
        L'analisi verrà eseguita per il distretto: <span className="font-medium">{selectedDistrict}</span>
      </p>
    </div>
  );
};

export default BusinessAddressField;
