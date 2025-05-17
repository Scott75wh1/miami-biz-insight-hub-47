
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserRound, PieChart, Check } from 'lucide-react';
import { useUserType } from '@/hooks/useUserType';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ModeSelector: React.FC = () => {
  const { userType, setUserType } = useUserType();

  return (
    <div className="flex flex-col space-y-4 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-center">Scegli la Modalità</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${userType === 'end_user' ? 'border-primary border-2 shadow-md' : ''}`}
          onClick={() => setUserType('end_user')}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`p-3 rounded-full mb-2 ${userType === 'end_user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <UserRound className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium">Modalità Semplificata</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Suggerimenti pratici pronti all'uso e piano d'azione immediato
            </p>
            <ul className="text-xs text-left mt-4 space-y-2 w-full">
              <li className="flex items-center">
                <Check className="text-primary h-3.5 w-3.5 mr-1.5 flex-shrink-0" /> 
                Soluzioni immediate pronte all'uso
              </li>
              <li className="flex items-center">
                <Check className="text-primary h-3.5 w-3.5 mr-1.5 flex-shrink-0" /> 
                Consigli personalizzati per la tua attività
              </li>
              <li className="flex items-center">
                <Check className="text-primary h-3.5 w-3.5 mr-1.5 flex-shrink-0" /> 
                Interfaccia semplificata focalizzata sull'azione
              </li>
            </ul>
            
            {userType === 'end_user' && (
              <Badge className="mt-4 bg-primary">Attualmente attiva</Badge>
            )}
          </div>
        </Card>
        
        <Card 
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${userType === 'marketer' ? 'border-primary border-2 shadow-md' : ''}`}
          onClick={() => setUserType('marketer')}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`p-3 rounded-full mb-2 ${userType === 'marketer' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <PieChart className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium">Modalità PRO</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Analisi approfondite e dati dettagliati per decisioni strategiche
            </p>
            <ul className="text-xs text-left mt-4 space-y-2 w-full">
              <li className="flex items-center">
                <Check className="text-primary h-3.5 w-3.5 mr-1.5 flex-shrink-0" /> 
                Dati demografici e analisi di mercato
              </li>
              <li className="flex items-center">
                <Check className="text-primary h-3.5 w-3.5 mr-1.5 flex-shrink-0" /> 
                Analisi competitiva dettagliata
              </li>
              <li className="flex items-center">
                <Check className="text-primary h-3.5 w-3.5 mr-1.5 flex-shrink-0" /> 
                Trend di mercato e indicatori avanzati
              </li>
            </ul>
            
            {userType === 'marketer' && (
              <Badge className="mt-4 bg-primary">Attualmente attiva</Badge>
            )}
          </div>
        </Card>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-md">
        <h4 className="font-medium text-center">
          Modalità attiva: {userType === 'end_user' ? 'Semplificata' : 'PRO'}
        </h4>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {userType === 'end_user' 
            ? "Visualizzerai consigli pratici e azioni concrete da implementare subito per la tua attività" 
            : "Accederai a dati analitici dettagliati e insights strategici per decisioni di business informate"}
        </p>
      </div>
    </div>
  );
};

export default ModeSelector;
