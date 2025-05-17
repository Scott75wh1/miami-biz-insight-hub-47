
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Lightbulb } from '@/components/ui/icons/Lightbulb';
import { useUserType } from '@/hooks/useUserType';

interface TrendsRecommendationsProps {
  summary: string;
  recommendations: string[];
  isLoading: boolean;
}

const TrendsRecommendations = ({ summary, recommendations, isLoading }: TrendsRecommendationsProps) => {
  const { userType } = useUserType();
  const isPro = userType === 'marketer';
  
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
        {isPro ? "Consigli Strategici" : "Azioni Consigliate"}
      </h4>
      
      <Card className={`p-3 ${isPro ? 'bg-primary/5 border-primary/20' : 'bg-green-50 border-green-200'}`}>
        <div className="text-sm mb-2 font-medium flex items-center">
          <TrendingUp className="h-4 w-4 mr-1 text-primary" />
          <span>{summary}</span>
        </div>
        
        {isPro ? (
          <ul className="list-disc text-xs space-y-2 ml-5">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="text-muted-foreground">{recommendation}</li>
            ))}
          </ul>
        ) : (
          <div className="space-y-2">
            {recommendations.slice(0, 3).map((recommendation, index) => (
              <div key={index} className="bg-white p-2 rounded-md shadow-sm border border-green-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-2 mt-0.5">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-xs">{recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <Button size="sm" variant="default" className="w-full mt-2 text-xs">
              <span>Scopri come implementare questi consigli</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TrendsRecommendations;
