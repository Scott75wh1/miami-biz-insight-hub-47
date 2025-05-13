
import React from 'react';
import { Users, User } from 'lucide-react';

interface DemographicsTabProps {
  demographicAnalysis: string;
  consumerProfile?: string;
  district: string;
}

export const DemographicsTab: React.FC<DemographicsTabProps> = ({ 
  demographicAnalysis, 
  consumerProfile, 
  district 
}) => {
  return (
    <div>
      <div className="flex items-center mb-3">
        <Users className="mr-2 h-5 w-5 text-blue-500" />
        <h3 className="font-medium text-lg">Analisi Demografica</h3>
      </div>
      <div className="p-4 bg-muted rounded-md">
        <p>{demographicAnalysis}</p>
      </div>
      
      {consumerProfile && (
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <User className="mr-2 h-4 w-4 text-blue-500" />
            <h4 className="font-medium">Profilo del Consumatore</h4>
          </div>
          <div className="p-3 bg-blue-50 text-blue-800 rounded-md">
            <p>{consumerProfile}</p>
          </div>
        </div>
      )}
      
      <p className="text-sm text-muted-foreground mt-3">
        Dati demografici basati sul quartiere {district}
      </p>
    </div>
  );
};
