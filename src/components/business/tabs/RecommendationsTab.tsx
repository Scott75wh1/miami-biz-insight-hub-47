
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface RecommendationsTabProps {
  recommendations: string[];
}

export const RecommendationsTab: React.FC<RecommendationsTabProps> = ({ recommendations }) => {
  return (
    <div>
      <div className="flex items-center mb-3">
        <MessageSquare className="mr-2 h-5 w-5 text-primary" />
        <h3 className="font-medium text-lg">Raccomandazioni Strategiche</h3>
      </div>
      <ul className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="flex">
            <span className="bg-primary/10 text-primary flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-2">
              {index + 1}
            </span>
            <p>{recommendation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
