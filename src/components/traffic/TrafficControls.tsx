
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MIAMI_DISTRICTS } from '../competitor/constants';
import { RefreshCw } from 'lucide-react';

interface TrafficControlsProps {
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const TrafficControls: React.FC<TrafficControlsProps> = ({
  selectedDistrict,
  onDistrictChange,
  onRefresh,
  isLoading
}) => {
  type TransportMode = 'driving' | 'walking' | 'bicycling';
  type TimeOfDay = 'morning' | 'afternoon' | 'evening';
  
  const [transportMode, setTransportMode] = useState<TransportMode>('driving');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');

  const handleTransportModeChange = (value: string) => {
    setTransportMode(value as TransportMode);
  };

  const handleTimeOfDayChange = (value: string) => {
    setTimeOfDay(value as TimeOfDay);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Quartiere</label>
          <Select value={selectedDistrict} onValueChange={onDistrictChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleziona un quartiere" />
            </SelectTrigger>
            <SelectContent>
              {MIAMI_DISTRICTS.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Mezzo di trasporto</label>
          <Select value={transportMode} onValueChange={handleTransportModeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Mezzo di trasporto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="driving">Auto</SelectItem>
              <SelectItem value="walking">A piedi</SelectItem>
              <SelectItem value="bicycling">Bicicletta</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Orario</label>
          <Select value={timeOfDay} onValueChange={handleTimeOfDayChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleziona orario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Mattina (8:00-10:00)</SelectItem>
              <SelectItem value="afternoon">Pomeriggio (14:00-16:00)</SelectItem>
              <SelectItem value="evening">Sera (18:00-20:00)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        onClick={onRefresh} 
        disabled={isLoading}
        className="w-full flex items-center justify-center"
      >
        <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? "Aggiornamento dati..." : "Aggiorna dati di traffico"}
      </Button>
    </div>
  );
};

export default TrafficControls;
