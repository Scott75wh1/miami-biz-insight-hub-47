
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserRound, PieChart } from 'lucide-react';

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
    <div className="flex gap-2 w-full">
      <Button
        variant={selectedType === 'end_user' ? 'default' : 'outline'}
        className="flex-1 flex items-center justify-center gap-2"
        onClick={() => onTypeChange('end_user')}
      >
        <UserRound className="h-4 w-4" />
        <span>Utente Finale</span>
      </Button>
      <Button
        variant={selectedType === 'marketer' ? 'default' : 'outline'}
        className="flex-1 flex items-center justify-center gap-2"
        onClick={() => onTypeChange('marketer')}
      >
        <PieChart className="h-4 w-4" />
        <span>Modalità PRO</span>
      </Button>
    </div>
  );
};

export default UserTypeSelector;
