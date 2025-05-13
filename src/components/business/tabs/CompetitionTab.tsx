
import React from 'react';
import { Building, Award } from 'lucide-react';

interface CompetitionTabProps {
  competitionAnalysis: string;
  district: string;
  yelpBusinesses?: any[];
}

export const CompetitionTab: React.FC<CompetitionTabProps> = ({
  competitionAnalysis,
  district,
  yelpBusinesses
}) => {
  return (
    <div>
      <div className="flex items-center mb-3">
        <Building className="mr-2 h-5 w-5 text-orange-500" />
        <h3 className="font-medium text-lg">Analisi della Concorrenza</h3>
      </div>
      <div className="p-4 bg-muted rounded-md">
        <p>{competitionAnalysis}</p>
      </div>
      
      {yelpBusinesses && yelpBusinesses.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {yelpBusinesses.slice(0, 2).map((business: any, index: number) => (
            <div key={index} className="border rounded-md p-3">
              <div className="font-medium flex justify-between">
                <span>{business.name}</span>
                <span className="text-amber-500 flex items-center">
                  {business.rating} <Award className="h-3 w-3 ml-1" />
                </span>
              </div>
              <div className="text-sm text-muted-foreground">{business.location?.address1}</div>
            </div>
          ))}
        </div>
      )}
      
      <p className="text-sm text-muted-foreground mt-3">
        Basato sui dati di competitor simili nell'area {district}
      </p>
    </div>
  );
};
