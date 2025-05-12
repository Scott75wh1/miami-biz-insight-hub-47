
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { apiLogger } from '@/services/logService';
import { useToast } from '@/components/ui/use-toast';

const APILogDownloader: React.FC = () => {
  const { toast } = useToast();

  const handleDownloadLogs = () => {
    try {
      apiLogger.downloadLogs();
      toast({
        title: 'Log scaricati',
        description: 'Il file dei log è stato scaricato con successo',
      });
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile scaricare i log',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-1" 
      onClick={handleDownloadLogs}
    >
      <Download className="h-4 w-4" />
      <span>Scarica Log API</span>
    </Button>
  );
};

export default APILogDownloader;
