
import React from 'react';
import { Lightbulb, Map } from 'lucide-react';

interface ExtraDetailsTabProps {
  marketOpportunities?: string;
  localHighlights?: string;
}

export const ExtraDetailsTab: React.FC<ExtraDetailsTabProps> = ({ 
  marketOpportunities, 
  localHighlights 
}) => {
  return (
    <div className="space-y-4">
      {marketOpportunities && (
        <div>
          <div className="flex items-center mb-2">
            <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
            <h4 className="font-medium text-lg">Opportunità di Mercato</h4>
          </div>
          <div className="p-4 bg-amber-50 text-amber-800 rounded-md">
            <p>{marketOpportunities}</p>
          </div>
        </div>
      )}
      
      {localHighlights && (
        <div>
          <div className="flex items-center mb-2">
            <Map className="mr-2 h-5 w-5 text-indigo-500" />
            <h4 className="font-medium text-lg">Attrazioni Locali</h4>
          </div>
          <div className="p-4 bg-indigo-50 text-indigo-800 rounded-md">
            <p>{localHighlights}</p>
          </div>
        </div>
      )}
    </div>
  );
};
