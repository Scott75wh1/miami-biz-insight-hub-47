
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const DemographicsDashboard = () => {
  // Placeholder data
  const demographicData = [
    { label: 'Popolazione', value: '442,241' },
    { label: 'Età Media', value: '40.1' },
    { label: 'Reddito Medio', value: '$44,268' },
    { label: 'Famiglie', value: '186,860' }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Demografia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {demographicData.map((stat, index) => (
            <div key={index} className="text-center p-2 rounded-md bg-muted/30">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3">Distribuzione per Età</h4>
          <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
            <div className="flex h-full">
              <div className="h-full bg-miami-blue w-[15%]" title="0-18: 15%"></div>
              <div className="h-full bg-miami-coral w-[32%]" title="19-35: 32%"></div>
              <div className="h-full bg-miami-teal w-[28%]" title="36-55: 28%"></div>
              <div className="h-full bg-miami-navy w-[25%]" title="55+: 25%"></div>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>0-18</span>
            <span>19-35</span>
            <span>36-55</span>
            <span>55+</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemographicsDashboard;
