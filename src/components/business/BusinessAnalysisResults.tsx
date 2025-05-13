
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { BusinessAnalysis } from '@/services/api/openai/types';
import { BusinessHeader } from './BusinessHeader';
import { AnalysisSummary } from './AnalysisSummary';
import { CensusStats } from './CensusStats';
import { RecommendationsTab } from './tabs/RecommendationsTab';
import { DemographicsTab } from './tabs/DemographicsTab';
import { CompetitionTab } from './tabs/CompetitionTab';
import { TrendsTab } from './tabs/TrendsTab';
import { ExtraDetailsTab } from './tabs/ExtraDetailsTab';

interface BusinessAnalysisResultsProps {
  data: {
    businessInfo: {
      name: string;
      address: string;
      district: string;
      type: string;
    };
    analysis: BusinessAnalysis;
    rawData?: any;
  };
}

const BusinessAnalysisResults: React.FC<BusinessAnalysisResultsProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <BusinessHeader 
            name={data.businessInfo.name}
            address={data.businessInfo.address}
            district={data.businessInfo.district}
            type={data.businessInfo.type}
          />
        </CardHeader>
        <CardContent>
          <AnalysisSummary summary={data.analysis.summary} />
          
          {data.rawData?.census && (
            <CensusStats censusData={data.rawData.census} />
          )}
          
          <Separator className="my-6" />
          
          <Tabs defaultValue="recommendations">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-2">
              <TabsTrigger value="recommendations">Raccomandazioni</TabsTrigger>
              <TabsTrigger value="demographics">Demografia</TabsTrigger>
              <TabsTrigger value="competition">Concorrenza</TabsTrigger>
              <TabsTrigger value="trends">Tendenze</TabsTrigger>
              <TabsTrigger value="extra">Dettagli Aggiuntivi</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommendations" className="pt-4">
              <RecommendationsTab recommendations={data.analysis.recommendations} />
            </TabsContent>
            
            <TabsContent value="demographics" className="pt-4">
              <DemographicsTab 
                demographicAnalysis={data.analysis.demographicAnalysis}
                consumerProfile={data.analysis.consumerProfile}
                district={data.businessInfo.district}
              />
            </TabsContent>
            
            <TabsContent value="competition" className="pt-4">
              <CompetitionTab 
                competitionAnalysis={data.analysis.competitionAnalysis}
                district={data.businessInfo.district}
                yelpBusinesses={data.rawData?.yelp?.businesses}
              />
            </TabsContent>
            
            <TabsContent value="trends" className="pt-4">
              <TrendsTab 
                trendsAnalysis={data.analysis.trendsAnalysis}
                recommendedKeywords={data.analysis.recommendedKeywords}
                businessType={data.businessInfo.type}
                district={data.businessInfo.district}
              />
            </TabsContent>
            
            <TabsContent value="extra" className="pt-4">
              <ExtraDetailsTab 
                marketOpportunities={data.analysis.marketOpportunities}
                localHighlights={data.analysis.localHighlights}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessAnalysisResults;
