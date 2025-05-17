
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserRound, PieChart } from 'lucide-react';
import { useUserType } from '@/hooks/useUserType';
import { Card } from '@/components/ui/card';

const ModeSelector: React.FC = () => {
  const { userType, setUserType } = useUserType();

  return (
    <div className="flex flex-col space-y-4 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-center">Seleziona Modalità</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${userType === 'end_user' ? 'border-primary border-2' : ''}`}
          onClick={() => setUserType('end_user')}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`p-3 rounded-full mb-2 ${userType === 'end_user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <UserRound className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium">Modalità Utente Finale</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Interfaccia semplificata con suggerimenti pratici pronti all'uso
            </p>
            <ul className="text-xs text-left mt-4 space-y-1">
              <li className="flex items-center">
                <span className="text-primary mr-1">✓</span> Soluzioni immediate
              </li>
              <li className="flex items-center">
                <span className="text-primary mr-1">✓</span> Consigli personalizzati
              </li>
              <li className="flex items-center">
                <span className="text-primary mr-1">✓</span> Interfaccia semplificata
              </li>
            </ul>
          </div>
        </Card>
        
        <Card 
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${userType === 'marketer' ? 'border-primary border-2' : ''}`}
          onClick={() => setUserType('marketer')}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`p-3 rounded-full mb-2 ${userType === 'marketer' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <PieChart className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium">Modalità PRO</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Analisi approfondite e dati dettagliati per professionisti
            </p>
            <ul className="text-xs text-left mt-4 space-y-1">
              <li className="flex items-center">
                <span className="text-primary mr-1">✓</span> Dati demografici dettagliati
              </li>
              <li className="flex items-center">
                <span className="text-primary mr-1">✓</span> Analisi competitiva
              </li>
              <li className="flex items-center">
                <span className="text-primary mr-1">✓</span> Trend di mercato
              </li>
            </ul>
          </div>
        </Card>
      </div>
      
      <div className="text-center bg-muted/30 p-3 rounded-md">
        <p className="text-sm font-medium">Modalità attiva: {userType === 'end_user' ? 'Utente Finale' : 'PRO'}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {userType === 'end_user' 
            ? "Visualizzerai consigli pratici e suggerimenti immediati" 
            : "Accederai a dati analitici dettagliati e insights di mercato"}
        </p>
      </div>
    </div>
  );
};

export default ModeSelector;
