
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { Tabs, TabsContent } from "@/components/ui/tabs";

// Import the components
import TrendsHeader from '@/components/trends/TrendsHeader';
import TrendsTabSelector from '@/components/trends/TrendsTabSelector';
import TrendsTabContent from '@/components/trends/TrendsTabContent';
import DistrictTrendsSelector from '@/components/trends/DistrictTrendsSelector';
import { TrendsProvider, useTrendsData } from '@/components/trends/TrendsContext';

interface TrendsAnalysisProps {
  businessType: BusinessType;
}

const TrendsAnalysis = ({ businessType }: TrendsAnalysisProps) => {
  // Use district selection from global context
  const { selectedDistrict } = useDistrictSelection();
  const [selectedTab, setSelectedTab] = useState<string>("general");
  const [districtUpdateTime, setDistrictUpdateTime] = useState<number>(Date.now());

  // Listen for district changes more effectively
  useEffect(() => {
    setDistrictUpdateTime(Date.now());

    const handleDistrictChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setDistrictUpdateTime(Date.now());
    };

    window.addEventListener('districtChanged', handleDistrictChange);
    
    return () => {
      window.removeEventListener('districtChanged', handleDistrictChange);
    };
  }, [selectedDistrict]);

  return (
    <TrendsProvider>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle>
            <div className="flex flex-col space-y-3">
              <TrendsHeaderWrapper businessType={businessType} />
              
              <div className="flex justify-between items-center mt-2">
                <TrendsTabSelector 
                  selectedTab={selectedTab}
                  onTabChange={setSelectedTab}
                />
                
                {selectedTab === "district" && (
                  <DistrictTrendsSelector />
                )}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TrendsTabsContent 
            selectedTab={selectedTab} 
            selectedDistrict={selectedDistrict} 
            businessType={businessType}
            districtUpdateTime={districtUpdateTime}
          />
        </CardContent>
      </Card>
    </TrendsProvider>
  );
};

// Wrapper component for TrendsHeader that gets data from context
const TrendsHeaderWrapper: React.FC<{ businessType: BusinessType }> = ({ businessType }) => {
  const { isLoading, isUsingDemoKey } = useTrendsData();
  
  return (
    <TrendsHeader 
      businessType={businessType}
      isLoading={isLoading}
      isUsingDemoKey={isUsingDemoKey}
    />
  );
};

// Component that handles tab content and data loading
const TrendsTabsContent: React.FC<{ 
  selectedTab: string; 
  selectedDistrict: string;
  businessType: BusinessType;
  districtUpdateTime: number;
}> = ({ 
  selectedTab, 
  selectedDistrict,
  businessType,
  districtUpdateTime,
}) => {
  const { fetchTrendsData } = useTrendsData();
  
  // Update data when business type or selected district changes
  useEffect(() => {
    fetchTrendsData(businessType, selectedDistrict);
  }, [businessType, selectedDistrict, districtUpdateTime, fetchTrendsData]);
  
  return (
    <Tabs value={selectedTab} className="w-full">
      <TabsContent value="general" className="mt-0">
        <TrendsTabContent
          activeTab="general"
          selectedDistrict={selectedDistrict}
        />
      </TabsContent>
      
      <TabsContent value="district" className="mt-0">
        <TrendsTabContent
          activeTab="district"
          selectedDistrict={selectedDistrict}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TrendsAnalysis;
