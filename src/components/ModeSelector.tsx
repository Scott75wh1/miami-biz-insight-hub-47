
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserRound, PieChart } from 'lucide-react';
import { useUserType } from '@/hooks/useUserType';

const ModeSelector: React.FC = () => {
  const { userType, setUserType } = useUserType();

  return (
    <div className="flex flex-col space-y-4 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-center">Seleziona Modalità</h2>
      <div className="flex gap-4 w-full">
        <Button
          variant={userType === 'end_user' ? 'default' : 'outline'}
          className="flex-1 flex items-center justify-center gap-2 py-8"
          onClick={() => setUserType('end_user')}
        >
          <UserRound className="h-6 w-6" />
          <div className="flex flex-col items-center">
            <span className="text-lg">Modalità Utente Finale</span>
            <span className="text-xs text-muted-foreground mt-1">Semplice ed intuitiva</span>
          </div>
        </Button>
        <Button
          variant={userType === 'marketer' ? 'default' : 'outline'}
          className="flex-1 flex items-center justify-center gap-2 py-8"
          onClick={() => setUserType('marketer')}
        >
          <PieChart className="h-6 w-6" />
          <div className="flex flex-col items-center">
            <span className="text-lg">Modalità PRO</span>
            <span className="text-xs text-muted-foreground mt-1">Dati e analisi avanzate</span>
          </div>
        </Button>
      </div>
      <p className="text-sm text-center text-muted-foreground pt-2">
        {userType === 'end_user' 
          ? "Modalità semplificata con suggerimenti pratici per la tua attività" 
          : "Accesso completo a dati di mercato e analisi dettagliate"}
      </p>
    </div>
  );
};

export default ModeSelector;
