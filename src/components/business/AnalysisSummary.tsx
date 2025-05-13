
import React from 'react';
import { Info } from 'lucide-react';

interface AnalysisSummaryProps {
  summary: string;
}

export const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ summary }) => {
  return (
    <div className="mb-4 bg-primary/5 p-4 rounded-md border border-primary/10">
      <h3 className="text-lg font-medium mb-2 flex items-center">
        <Info className="mr-2 h-5 w-5 text-primary" />
        Sommario dell'Analisi
      </h3>
      <p className="text-muted-foreground">{summary}</p>
    </div>
  );
};
