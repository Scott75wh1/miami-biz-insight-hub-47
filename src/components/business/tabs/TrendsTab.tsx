
import React from 'react';
import { TrendingUp, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TrendsTabProps {
  trendsAnalysis: string;
  recommendedKeywords?: string[];
  businessType: string;
  district: string;
}

export const TrendsTab: React.FC<TrendsTabProps> = ({ 
  trendsAnalysis, 
  recommendedKeywords, 
  businessType, 
  district 
}) => {
  return (
    <div>
      <div className="flex items-center mb-3">
        <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
        <h3 className="font-medium text-lg">Analisi delle Tendenze</h3>
      </div>
      <div className="p-4 bg-muted rounded-md">
        <p>{trendsAnalysis}</p>
      </div>
      
      {recommendedKeywords && recommendedKeywords.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <Tag className="mr-2 h-4 w-4 text-green-500" />
            <h4 className="font-medium">Parole Chiave Raccomandate</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendedKeywords.map((keyword, index) => (
              <Badge key={index} variant="secondary">{keyword}</Badge>
            ))}
          </div>
        </div>
      )}
      
      <p className="text-sm text-muted-foreground mt-3">
        Basato sui dati di Google Trends per il settore {businessType} a {district}
      </p>
    </div>
  );
};
