
import React, { useState, useEffect, useRef } from 'react';
import { apiLogger } from '@/services/logService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, RefreshCw, Download, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const ApiLogViewer: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  const refreshLogs = () => {
    setLogs(apiLogger.getLogs());
  };
  
  const clearLogs = () => {
    apiLogger.clearLogs();
    refreshLogs();
  };
  
  useEffect(() => {
    // Aggiorna i log ogni secondo quando il visualizzatore è aperto
    if (isOpen) {
      refreshLogs();
      intervalRef.current = window.setInterval(refreshLogs, 1000);
      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [isOpen]);
  
  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="fixed bottom-4 right-4 z-50 opacity-70 hover:opacity-100"
        onClick={() => setIsOpen(true)}
      >
        Visualizza Log API
      </Button>
    );
  }
  
  return (
    <Card className="fixed bottom-4 right-4 w-[400px] max-h-[500px] z-50 shadow-lg">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm">Log API ({logs.length})</CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refreshLogs}
            title="Aggiorna log"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => apiLogger.downloadLogs()}
            title="Scarica log"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearLogs}
            title="Pulisci log"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsOpen(false)}
            title="Chiudi"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {logs.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-8">
              Nessun log API disponibile
            </p>
          ) : (
            <div className="space-y-4">
              {logs.map((log, idx) => (
                <div key={idx} className="text-xs border rounded-md p-2">
                  <div className="flex justify-between items-center mb-1">
                    <Badge variant={log.error ? "destructive" : "outline"}>
                      {log.service}:{log.endpoint}
                    </Badge>
                    <span className="text-muted-foreground">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <Separator className="my-1" />
                  <details>
                    <summary className="cursor-pointer hover:text-primary">Parametri</summary>
                    <pre className="text-xs mt-1 p-1 bg-muted rounded max-h-20 overflow-auto">
                      {JSON.stringify(log.parameters, null, 2)}
                    </pre>
                  </details>
                  {log.response && (
                    <details>
                      <summary className="cursor-pointer hover:text-primary mt-1">Risposta</summary>
                      <pre className="text-xs mt-1 p-1 bg-muted rounded max-h-20 overflow-auto">
                        {JSON.stringify(log.response, null, 2)}
                      </pre>
                    </details>
                  )}
                  {log.error && (
                    <details>
                      <summary className="cursor-pointer hover:text-destructive mt-1">Errore</summary>
                      <pre className="text-xs mt-1 p-1 bg-red-50 rounded max-h-20 overflow-auto">
                        {JSON.stringify(log.error, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ApiLogViewer;
