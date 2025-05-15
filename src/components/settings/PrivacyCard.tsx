
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export const PrivacyCard: React.FC = () => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Accesso ai dati e privacy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm">
            Tutte le API keys sono salvate localmente nel browser e non vengono inviate a server esterni.
            I dati generati dall'applicazione sono memorizzati localmente.
          </p>
          
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              Criteri privacy
            </Button>
            <Button variant="outline" size="sm">
              Richiedi i miei dati
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
