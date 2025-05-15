
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

const SwitchToggle = ({ defaultChecked }: { defaultChecked: boolean }) => {
  const [checked, setChecked] = React.useState(defaultChecked);
  
  return (
    <div 
      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
        checked ? 'bg-primary' : 'bg-gray-300'
      }`}
      onClick={() => setChecked(!checked)}
    >
      <div 
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`} 
      />
    </div>
  );
};

export const NotificationsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifiche
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p>Aggiornamenti dati demografici</p>
            <SwitchToggle defaultChecked={true} />
          </div>
          
          <div className="flex justify-between items-center">
            <p>Alert competitori</p>
            <SwitchToggle defaultChecked={true} />
          </div>
          
          <div className="flex justify-between items-center">
            <p>Notifiche di sistema</p>
            <SwitchToggle defaultChecked={true} />
          </div>
          
          <div className="flex justify-between items-center">
            <p>Email riassuntive</p>
            <SwitchToggle defaultChecked={false} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
