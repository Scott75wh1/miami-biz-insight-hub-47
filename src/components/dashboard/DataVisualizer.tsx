
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUpRight, ArrowDownRight, Users, Store, TrendingUp } from 'lucide-react';
import { BusinessType } from '@/components/BusinessTypeSelector';

interface DataVisualizerProps {
  district: string;
  businessType: BusinessType;
}

const DataVisualizer: React.FC<DataVisualizerProps> = ({ district, businessType }) => {
  // Dati simulati basati sul distretto e tipo di attività
  const getData = () => {
    const baseData = {
      demographics: {
        ageGroups: [
          { group: "18-24", percentage: 15 },
          { group: "25-34", percentage: 32 },
          { group: "35-44", percentage: 24 },
          { group: "45-54", percentage: 18 },
          { group: "55+", percentage: 11 },
        ],
        income: "€58,400",
        population: "52,300"
      },
      competitors: [
        { name: "Competitor A", rating: 4.5, distance: "0.4 km" },
        { name: "Competitor B", rating: 4.2, distance: "0.8 km" },
        { name: "Competitor C", rating: 3.9, distance: "1.2 km" },
      ],
      trends: [
        { keyword: `${businessType} ${district}`, growth: 24 },
        { keyword: `miglior ${businessType}`, growth: 18 },
        { keyword: `${businessType} vicino a me`, growth: 32 },
      ]
    };
    
    // Personalizza in base al distretto
    if (district === "Miami Beach") {
      baseData.demographics.ageGroups[1].percentage += 5;  // Più giovani adulti
      baseData.competitors.push({ name: "Competitor D", rating: 4.8, distance: "0.3 km" });
    } else if (district === "Brickell") {
      baseData.demographics.income = "€72,600";  // Reddito più alto
      baseData.trends[0].growth += 8;  // Più ricerche per questo settore
    }
    
    // Personalizza in base al tipo di attività
    if (businessType === "coffee_shop") {
      baseData.trends.push({ keyword: "caffè specialty", growth: 42 });
    } else if (businessType === "restaurant") {
      baseData.trends.push({ keyword: "ristoranti con dehors", growth: 28 });
    }
    
    return baseData;
  };
  
  const data = getData();
  
  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Users className="h-4 w-4 mr-1" /> Dati Demografici - {district}
        </h3>
        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs">Popolazione:</span>
            <span className="text-xs font-medium">{data.demographics.population}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs">Reddito medio:</span>
            <span className="text-xs font-medium">{data.demographics.income}</span>
          </div>
          
          <div className="space-y-2">
            {data.demographics.ageGroups.map((group) => (
              <div key={group.group} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{group.group}</span>
                  <span>{group.percentage}%</span>
                </div>
                <Progress value={group.percentage} className="h-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Store className="h-4 w-4 mr-1" /> Concorrenti - {district}
        </h3>
        <ScrollArea className="h-[120px]">
          <div className="space-y-2">
            {data.competitors.map((competitor, index) => (
              <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                <span className="text-xs font-medium">{competitor.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs">★ {competitor.rating}</span>
                  <span className="text-xs text-muted-foreground">{competitor.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <TrendingUp className="h-4 w-4 mr-1" /> Tendenze di Mercato
        </h3>
        <div className="space-y-2">
          {data.trends.map((trend, index) => (
            <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
              <span className="text-xs">{trend.keyword}</span>
              <div className="flex items-center">
                {trend.growth > 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={`text-xs ${trend.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {trend.growth}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataVisualizer;
