
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartBar, Users, GraduationCap, Home, Briefcase } from 'lucide-react';
import { CensusDataResponse } from '@/services/api/censusService';
import DemographicsTab from './tabs/DemographicsTab';
import EducationTab from './tabs/EducationTab';
import HousingTab from './tabs/HousingTab';
import EconomyTab from './tabs/EconomyTab';
import OverviewTab from './tabs/OverviewTab';

interface CensusTabsContainerProps {
  censusData: CensusDataResponse;
  selectedDistrict: string;
}

const CensusTabsContainer: React.FC<CensusTabsContainerProps> = ({ 
  censusData,
  selectedDistrict
}) => {
  return (
    <Tabs defaultValue="demographics" className="w-full">
      <TabsList className="grid grid-cols-5 w-full">
        <TabsTrigger value="demographics">
          <Users className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Demografia</span>
        </TabsTrigger>
        <TabsTrigger value="education">
          <GraduationCap className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Istruzione</span>
        </TabsTrigger>
        <TabsTrigger value="housing">
          <Home className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Abitazioni</span>
        </TabsTrigger>
        <TabsTrigger value="economy">
          <Briefcase className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Economia</span>
        </TabsTrigger>
        <TabsTrigger value="overview">
          <ChartBar className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Sintesi</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="demographics">
        <DemographicsTab censusData={censusData} />
      </TabsContent>
      
      <TabsContent value="education">
        <EducationTab censusData={censusData} />
      </TabsContent>
      
      <TabsContent value="housing">
        <HousingTab censusData={censusData} />
      </TabsContent>
      
      <TabsContent value="economy">
        <EconomyTab censusData={censusData} />
      </TabsContent>
      
      <TabsContent value="overview">
        <OverviewTab censusData={censusData} selectedDistrict={selectedDistrict} />
      </TabsContent>
    </Tabs>
  );
};

export default CensusTabsContainer;
