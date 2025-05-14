
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { apiLogger } from '@/services/logService';
import { useToast } from '@/hooks/use-toast';

const APILogDownloader: React.FC = () => {
  const { toast } = useToast();
  // Aggiungiamo uno stato per evitare clic multipli
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownloadLogs = () => {
    // Evita clic multipli
    if (isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      apiLogger.downloadLogs();
      toast({
        title: 'Log scaricati',
        description: 'Il file dei log è stato scaricato con successo',
      });
    } catch (error) {
      console.error('Errore durante il download dei log:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile scaricare i log',
        variant: 'destructive',
      });
    } finally {
      // Reimposta lo stato dopo un breve ritardo
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-1" 
      onClick={handleDownloadLogs}
      disabled={isDownloading}
    >
      <Download className="h-4 w-4" />
      <span>Scarica Log API</span>
    </Button>
  );
};

export default APILogDownloader;
