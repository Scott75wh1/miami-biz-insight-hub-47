
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BusinessTypeOption {
  value: string;
  label: string;
}

interface BusinessTypeDropdownProps {
  value: string;
  onChange: (value: string) => void;
  businessTypes: BusinessTypeOption[];
}

const BusinessTypeDropdown: React.FC<BusinessTypeDropdownProps> = ({
  value,
  onChange,
  businessTypes
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="businessType">Tipologia</Label>
      <Select 
        value={value}
        onValueChange={onChange}
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
  );
};

export default BusinessTypeDropdown;
