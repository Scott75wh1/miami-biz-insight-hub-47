
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface MarketTrendsCardProps {
  isAnalyzing: boolean;
  selectedDistrict: string | undefined;
}

export const MarketTrendsCard: React.FC<MarketTrendsCardProps> = ({
  isAnalyzing,
  selectedDistrict,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Tendenze di Mercato</CardTitle>
      </CardHeader>
      <CardContent>
        {isAnalyzing ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            <p>• Crescita del settore ristorazione: <span className="text-green-600">+12%</span></p>
            <p>• Nuove aperture in {selectedDistrict}: <span>28</span></p>
            <p>• Chiusure nell'ultimo trimestre: <span className="text-red-600">14</span></p>
            <p>• Clientela media giornaliera: <span>86</span></p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
