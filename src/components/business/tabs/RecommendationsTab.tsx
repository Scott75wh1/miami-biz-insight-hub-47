
import React from 'react';
import { MessageSquare, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RecommendationsTabProps {
  recommendations: string[];
}

// Helper function to generate tooltip content based on the recommendation
const getTooltipContent = (recommendation: string): string => {
  if (recommendation.includes('marketing')) {
    return 'Il marketing locale dovrebbe concentrarsi sulla geolocalizzazione e sul targeting di un raggio di 5-8 km attorno all\'attività.';
  } else if (recommendation.includes('social')) {
    return 'I social media più efficaci per questa tipologia di business sono Instagram e Facebook, con 3-4 post settimanali.';
  } else if (recommendation.includes('partnership') || recommendation.includes('collaborazione')) {
    return 'Le partnership locali possono aumentare la visibilità del 35% a fronte di investimenti contenuti.';
  } else if (recommendation.includes('fidelizzazione')) {
    return 'Un programma di fidelizzazione può aumentare il tasso di ritorno dei clienti del 24% nel primo anno.';
  } else if (recommendation.includes('eventi')) {
    return 'Gli eventi tematici possono incrementare il fatturato del 40% nelle serate designate e migliorare la reputazione online.';
  } else {
    return 'Implementare questa strategia può portare a un aumento significativo della redditività e della visibilità dell\'attività.';
  }
};

export const RecommendationsTab: React.FC<RecommendationsTabProps> = ({ recommendations }) => {
  return (
    <TooltipProvider>
      <div>
        <div className="flex items-center mb-3">
          <MessageSquare className="mr-2 h-5 w-5 text-primary" />
          <h3 className="font-medium text-lg">Raccomandazioni Strategiche</h3>
        </div>
        <ul className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex group relative transition-all duration-200 hover:bg-muted/50 p-2 rounded-md">
              <span className="bg-primary/10 text-primary flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-0.5">
                {index + 1}
              </span>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <p className="pr-8">{recommendation}</p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="ml-2 p-1 rounded-full bg-muted/80 hover:bg-muted flex-shrink-0">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs bg-primary/5 border-primary/20">
                      <p className="text-sm">{getTooltipContent(recommendation)}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="mt-2 text-xs text-muted-foreground italic">
                  {index === 0 && "Priorità alta ⭐⭐⭐"}
                  {index === 1 && "Priorità alta ⭐⭐⭐"}
                  {index === 2 && "Priorità media ⭐⭐"}
                  {index === 3 && "Priorità media ⭐⭐"}
                  {index > 3 && "Priorità standard ⭐"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </TooltipProvider>
  );
};
