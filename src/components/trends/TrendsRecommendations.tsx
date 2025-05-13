
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Lightbulb } from '@/components/ui/icons/Lightbulb';

interface TrendsRecommendationsProps {
  summary: string;
  recommendations: string[];
  isLoading: boolean;
}

const TrendsRecommendations = ({ summary, recommendations, isLoading }: TrendsRecommendationsProps) => {
  if (isLoading) {
    return (
      <div className="mt-6 space-y-3">
        <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
        <div className="h-16 bg-muted rounded animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded animate-pulse"></div>
          <div className="h-3 bg-muted rounded animate-pulse"></div>
          <div className="h-3 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium mb-3 flex items-center">
        <Lightbulb className="h-4 w-4 mr-1" />
        Consigli Strategici
      </h4>
      
      <Card className="p-3 bg-primary/5 border-primary/20">
        <div className="text-sm mb-2 font-medium flex items-center">
          <TrendingUp className="h-4 w-4 mr-1 text-primary" />
          <span>{summary}</span>
        </div>
        
        <ul className="list-disc text-xs space-y-2 ml-5">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="text-muted-foreground">{recommendation}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default TrendsRecommendations;
