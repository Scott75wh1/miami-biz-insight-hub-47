
import React from 'react';
import { Button } from '@/components/ui/button';
import { CloudSun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsHeaderProps {
  handleClearCache: () => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ handleClearCache }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Impostazioni</h1>
      <Button variant="outline" onClick={handleClearCache} className="flex items-center gap-2">
        <CloudSun className="h-4 w-4" />
        Cancella cache locale
      </Button>
    </div>
  );
};
