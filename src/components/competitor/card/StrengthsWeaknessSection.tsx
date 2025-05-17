
import React from 'react';
import { ThumbsUp, AlertCircle } from 'lucide-react';

interface StrengthsWeaknessSectionProps {
  strengths?: string[];
  weaknesses?: string[];
  showAll?: boolean;
  className?: string;
}

export const StrengthsWeaknessSection: React.FC<StrengthsWeaknessSectionProps> = ({
  strengths,
  weaknesses,
  showAll = false,
  className = '',
}) => {
  // Limit the items shown if not showing all
  const displayStrengths = showAll ? strengths : strengths?.slice(0, 2);
  const displayWeaknesses = showAll ? weaknesses : weaknesses?.slice(0, 2);
  
  return (
    <div className={`grid ${showAll ? 'grid-cols-2' : 'grid-cols-1'} gap-4 ${className}`}>
      {displayStrengths && displayStrengths.length > 0 && (
        <div>
          <h5 className="text-sm font-medium mb-1 flex items-center">
            <ThumbsUp className={`${showAll ? 'h-3.5 w-3.5' : 'h-3 w-3'} mr-1 text-green-600`} />
            Punti di forza
          </h5>
          <ul className={`${showAll ? 'text-sm' : 'text-xs'} text-muted-foreground ml-4 list-disc`}>
            {displayStrengths.map((strength, idx) => (
              <li key={idx} className={`my-${showAll ? '1' : '0.5'}`}>{strength}</li>
            ))}
          </ul>
        </div>
      )}
      
      {displayWeaknesses && displayWeaknesses.length > 0 && (
        <div>
          <h5 className="text-sm font-medium mb-1 flex items-center">
            <AlertCircle className={`${showAll ? 'h-3.5 w-3.5' : 'h-3 w-3'} mr-1 text-amber-600`} />
            Aree di miglioramento
          </h5>
          <ul className={`${showAll ? 'text-sm' : 'text-xs'} text-muted-foreground ml-4 list-disc`}>
            {displayWeaknesses.map((weakness, idx) => (
              <li key={idx} className={`my-${showAll ? '1' : '0.5'}`}>{weakness}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
