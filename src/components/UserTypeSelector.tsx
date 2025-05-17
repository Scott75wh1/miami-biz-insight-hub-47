
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserRound, PieChart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type UserType = 'end_user' | 'marketer';

interface UserTypeSelectorProps {
  selectedType: UserType;
  onTypeChange: (type: UserType) => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <TooltipProvider>
      <div className="flex gap-2 w-full">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={selectedType === 'end_user' ? 'default' : 'outline'}
              className={`flex-1 flex items-center justify-center gap-2 py-2 ${selectedType === 'end_user' ? 'border-primary' : ''}`}
              onClick={() => onTypeChange('end_user')}
            >
              <UserRound className="h-4 w-4" />
              <span>Utente Finale</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Modalità semplificata con suggerimenti pratici</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={selectedType === 'marketer' ? 'default' : 'outline'}
              className={`flex-1 flex items-center justify-center gap-2 py-2 ${selectedType === 'marketer' ? 'border-primary' : ''}`}
              onClick={() => onTypeChange('marketer')}
            >
              <PieChart className="h-4 w-4" />
              <span>Modalità PRO</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Analisi dettagliate e dati avanzati</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default UserTypeSelector;
