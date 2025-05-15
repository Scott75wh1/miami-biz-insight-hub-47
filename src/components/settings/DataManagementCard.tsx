
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';
import { useApiKeys } from '@/hooks/useApiKeys';

export const DataManagementCard: React.FC = () => {
  const { isUsingRealData } = useApiKeys();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Gestione dati
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <div>
              <p className="font-medium">Dati attuali</p>
              <p className="text-sm text-muted-foreground">
                {isUsingRealData() ? "Utilizzo dati reali" : "Utilizzo dati demo"}
              </p>
            </div>
            <Button size="sm" variant="outline">Esporta dati</Button>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b">
            <div>
              <p className="font-medium">Sincronizzazione</p>
              <p className="text-sm text-muted-foreground">Ultimo aggiornamento: Maggio 2025</p>
            </div>
            <Button size="sm">Sincronizza ora</Button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Rimozione dati</p>
              <p className="text-sm text-muted-foreground">Rimuove tutti i dati locali</p>
            </div>
            <Button size="sm" variant="destructive">Elimina tutto</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
