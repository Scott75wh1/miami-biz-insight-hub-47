
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface TrafficControlsProps {
  onAnalyzeTraffic: (destination: string, transportType: string) => void;
  isLoading: boolean;
}

export const TrafficControls: React.FC<TrafficControlsProps> = ({ onAnalyzeTraffic, isLoading }) => {
  const [destination, setDestination] = useState('');
  const [transportType, setTransportType] = useState('driving');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destination.trim()) {
      toast({
        title: "Indirizzo richiesto",
        description: "Per favore inserisci un indirizzo di destinazione",
        variant: "destructive",
      });
      return;
    }
    
    onAnalyzeTraffic(destination, transportType);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <label className="block text-sm font-medium mb-2">
            Destinazione
          </label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Inserisci indirizzo di destinazione (es. Key Biscayne, FL)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10"
            />
            <MapPin className="absolute left-2 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <div className="md:w-48">
          <label className="block text-sm font-medium mb-2">
            Tipo di trasporto
          </label>
          <Select value={transportType} onValueChange={setTransportType}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo di trasporto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="driving">Auto</SelectItem>
              <SelectItem value="walking">A piedi</SelectItem>
              <SelectItem value="bicycling">Bicicletta</SelectItem>
              <SelectItem value="transit">Trasporto pubblico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
        {isLoading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
            <span>Analizzando...</span>
          </>
        ) : (
          <>
            <Search className="h-4 w-4 mr-2" />
            <span>Analizza traffico</span>
          </>
        )}
      </Button>
    </form>
  );
};
