
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search, Loader2 } from 'lucide-react';

interface BusinessNameSearchProps {
  businessName: string;
  isSearching: boolean;
  foundPlaces: any[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => Promise<void>;
}

const BusinessNameSearch: React.FC<BusinessNameSearchProps> = ({
  businessName,
  isSearching,
  foundPlaces,
  onChange,
  onSearch
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="businessName">Nome dell'attività</Label>
      <div className="flex items-center gap-2">
        <Input
          id="businessName"
          name="businessName"
          value={businessName}
          onChange={onChange}
          placeholder="Inserisci il nome della tua attività"
          className="w-full"
          required
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isSearching || !businessName.trim()}
          onClick={onSearch}
          className="shrink-0"
        >
          {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>
      {foundPlaces.length > 0 && (
        <p className="text-xs text-green-600">
          Trovato: {foundPlaces[0].name} ({foundPlaces.length} risultati)
        </p>
      )}
    </div>
  );
};

export default BusinessNameSearch;
