
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import MapComponent from '@/components/MapComponent';
import DemographicsDashboard from '@/components/DemographicsDashboard';
import TrendsAnalysis from '@/components/TrendsAnalysis';
import CompetitorAnalysis from '@/components/CompetitorAnalysis';
import AIAssistant from '@/components/AIAssistant';
import BusinessTypeSelector, { BusinessType } from '@/components/BusinessTypeSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CuisineTypeSelector } from '@/components/restaurant/CuisineTypeSelector';
import { useCuisineSelection } from '@/hooks/useCuisineSelection';

const Index = () => {
  const [businessType, setBusinessType] = useState<BusinessType>('restaurant');
  const { selectedCuisine, handleCuisineChange } = useCuisineSelection();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <BusinessTypeSelector
              selectedType={businessType}
              onTypeChange={setBusinessType}
            />
            
            {businessType === 'restaurant' && (
              <CuisineTypeSelector
                selectedCuisine={selectedCuisine}
                onCuisineChange={handleCuisineChange}
              />
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <MapComponent businessType={businessType} cuisineType={businessType === 'restaurant' ? selectedCuisine : undefined} />
            </div>
            <div>
              <DemographicsDashboard />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <TrendsAnalysis businessType={businessType} />
            <CompetitorAnalysis businessType={businessType} cuisineType={businessType === 'restaurant' ? selectedCuisine : undefined} />
          </div>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            <AIAssistant businessType={businessType} />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { title: 'Nuove Attività', value: '1,247', change: '+12%' },
              { title: 'Chiusure', value: '483', change: '-4%' },
              { title: 'Fatturato Medio', value: '$1.2M', change: '+5.7%' },
              { title: 'Occupazione', value: '94.3%', change: '+2.1%' }
            ].map((stat, i) => (
              <Card key={i}>
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} ultimo anno
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <footer className="mt-8 text-center text-xs text-muted-foreground">
            <p>Miami Business Insight Hub - I dati visualizzati sono simulati a scopo dimostrativo</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
