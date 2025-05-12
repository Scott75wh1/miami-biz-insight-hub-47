
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Star } from 'lucide-react';

const CompetitorAnalysis = () => {
  const competitors = [
    { 
      name: 'Café Lirica', 
      type: 'Caffetteria', 
      location: 'Wynwood', 
      rating: 4.7, 
      reviews: 236, 
      priceLevel: '$$'
    },
    { 
      name: 'Tech Hub Co-working', 
      type: 'Spazio Co-working', 
      location: 'Brickell', 
      rating: 4.5, 
      reviews: 187, 
      priceLevel: '$$$'
    },
    { 
      name: 'Ocean View Restaurant', 
      type: 'Ristorante', 
      location: 'Miami Beach', 
      rating: 4.4, 
      reviews: 452, 
      priceLevel: '$$$'
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Analisi Competitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {competitors.map((competitor, index) => (
            <div key={index} className="p-3 border rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{competitor.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {competitor.type} · {competitor.location} · {competitor.priceLevel}
                  </div>
                </div>
                <div className="flex items-center bg-muted/30 px-2 py-1 rounded-md text-sm">
                  <Star className="h-3.5 w-3.5 text-yellow-500 mr-1 fill-yellow-500" />
                  <span className="font-medium">{competitor.rating}</span>
                  <span className="text-muted-foreground text-xs ml-1">({competitor.reviews})</span>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="text-xs font-medium mt-2 mb-1">Sentimento Recensioni</div>
                <div className="flex h-1.5 w-full rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: '75%' }}></div>
                  <div className="bg-yellow-500 h-full" style={{ width: '20%' }}></div>
                  <div className="bg-red-500 h-full" style={{ width: '5%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Positivo</span>
                  <span>Neutro</span>
                  <span>Negativo</span>
                </div>
              </div>
            </div>
          ))}

          <div className="text-center mt-4">
            <button className="text-primary text-sm hover:underline">
              Visualizza tutti i competitor in questa zona
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorAnalysis;
