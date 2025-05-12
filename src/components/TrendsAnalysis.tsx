
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartBar } from 'lucide-react';

const TrendsAnalysis = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <ChartBar className="mr-2 h-5 w-5" />
          Trend di Mercato
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3">Crescita delle Ricerche su Google</h4>
            <div className="space-y-2">
              {[
                { label: 'Ristoranti Miami Beach', value: 78 },
                { label: 'Coffee shop Wynwood', value: 65 },
                { label: 'Juice bar Miami', value: 42 },
                { label: 'Co-working Brickell', value: 38 },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Categorie in Crescita</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                { name: 'Healthy Food', growth: '+24%', color: 'bg-miami-teal text-white' },
                { name: 'Tech Startups', growth: '+18%', color: 'bg-miami-blue text-white' },
                { name: 'Fitness', growth: '+15%', color: 'bg-miami-coral text-white' },
                { name: 'Arte & Design', growth: '+12%', color: 'bg-miami-navy text-white' },
              ].map((category, i) => (
                <div 
                  key={i} 
                  className={`px-2 py-1 rounded-md text-xs flex items-center ${category.color}`}
                >
                  <span>{category.name}</span>
                  <span className="ml-1 font-medium">{category.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendsAnalysis;
