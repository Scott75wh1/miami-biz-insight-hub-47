
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Analysis {
  name: string;
  date: Date;
  district: string;
}

interface PreviousAnalysesCardProps {
  previousAnalyses: Analysis[];
}

export const PreviousAnalysesCard: React.FC<PreviousAnalysesCardProps> = ({ 
  previousAnalyses 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Analisi Precedenti</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {previousAnalyses.length > 0 ? (
          previousAnalyses.map((analysis, index) => (
            <div 
              key={index} 
              className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <div className="font-medium text-sm">{analysis.name}</div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{analysis.district}</span>
                <span>{analysis.date.toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p className="text-sm">Nessuna analisi precedente</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
