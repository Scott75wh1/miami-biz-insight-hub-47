import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface TrafficControlsProps {
  onRefresh: () => void;
  isLoading: boolean;
}

const TrafficControls: React.FC<TrafficControlsProps> = ({ onRefresh, isLoading }) => {
  const [trafficMode, setTrafficMode] = useState<'driving' | 'walking' | 'bicycling'>('driving');
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [sensitivity, setSensitivity] = useState(50);
  const [realTime, setRealTime] = useState(true);
  const { toast } = useToast();

  const handleRefresh = () => {
    toast({
      title: "Aggiornamento dati traffico",
      description: "Richiesta di nuovi dati traffico...",
    });
    onRefresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Controlli Traffico</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="traffic-mode">Modalità Traffico</Label>
          <Select value={trafficMode} onValueChange={setTrafficMode}>
            <SelectTrigger id="traffic-mode">
              <SelectValue placeholder="Seleziona modalità" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="driving">Guida</SelectItem>
              <SelectItem value="walking">A piedi</SelectItem>
              <SelectItem value="bicycling">In bici</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="time-of-day">Ora del Giorno</Label>
          <Select value={timeOfDay} onValueChange={setTimeOfDay}>
            <SelectTrigger id="time-of-day">
              <SelectValue placeholder="Seleziona ora" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Mattina</SelectItem>
              <SelectItem value="afternoon">Pomeriggio</SelectItem>
              <SelectItem value="evening">Sera</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sensitivity">Sensibilità</Label>
          <Slider
            id="sensitivity"
            defaultValue={[50]}
            max={100}
            step={1}
            onValueChange={(value) => setSensitivity(value[0])}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="real-time">Tempo Reale</Label>
          <Switch id="real-time" checked={realTime} onCheckedChange={setRealTime} />
        </div>
        <Button onClick={handleRefresh} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Aggiornamento...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Aggiorna Dati
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrafficControls;
