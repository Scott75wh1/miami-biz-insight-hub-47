
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Building, TrendingUp, Users, Search, MessageSquare, MapPin, Info, Award, User, Map, Tag, Lightbulb } from 'lucide-react';
import { formatNumber } from '@/components/census/utils/CensusUtils';

interface BusinessAnalysisResultsProps {
  data: {
    businessInfo: {
      name: string;
      address: string;
      district: string;
      type: string;
    };
    analysis: {
      summary: string;
      demographicAnalysis: string;
      competitionAnalysis: string;
      trendsAnalysis: string;
      recommendedKeywords?: string[];
      marketOpportunities?: string;
      consumerProfile?: string;
      localHighlights?: string;
      recommendations: string[];
    };
    rawData?: any;
  };
}

const BusinessAnalysisResults: React.FC<BusinessAnalysisResultsProps> = ({ data }) => {
  // Format business type for display
  const formatBusinessType = (type: string) => {
    return type.replace('_', ' ').split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{data.businessInfo.name}</CardTitle>
              <CardDescription className="mt-1 flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {data.businessInfo.address}
              </CardDescription>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant="outline" className="ml-2">
                {formatBusinessType(data.businessInfo.type)}
              </Badge>
              <Badge variant="secondary" className="ml-2">
                {data.businessInfo.district}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 bg-primary/5 p-4 rounded-md border border-primary/10">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Info className="mr-2 h-5 w-5 text-primary" />
              Sommario dell'Analisi
            </h3>
            <p className="text-muted-foreground">{data.analysis.summary}</p>
          </div>
          
          {data.rawData?.census && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-muted/30 p-3 rounded-md text-center">
                <div className="text-muted-foreground text-sm">Popolazione</div>
                <div className="text-lg font-semibold">
                  {formatNumber(data.rawData.census.population || 0)}
                </div>
              </div>
              <div className="bg-muted/30 p-3 rounded-md text-center">
                <div className="text-muted-foreground text-sm">Età Media</div>
                <div className="text-lg font-semibold">
                  {data.rawData.census.median_age || "N/A"}
                </div>
              </div>
              <div className="bg-muted/30 p-3 rounded-md text-center">
                <div className="text-muted-foreground text-sm">Reddito Medio</div>
                <div className="text-lg font-semibold">
                  ${formatNumber(data.rawData.census.median_income || 0)}
                </div>
              </div>
              <div className="bg-muted/30 p-3 rounded-md text-center">
                <div className="text-muted-foreground text-sm">Famiglie</div>
                <div className="text-lg font-semibold">
                  {formatNumber(data.rawData.census.households || 0)}
                </div>
              </div>
            </div>
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
              <div className="flex items-center mb-3">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                <h3 className="font-medium text-lg">Raccomandazioni Strategiche</h3>
              </div>
              <ul className="space-y-3">
                {data.analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex">
                    <span className="bg-primary/10 text-primary flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                      {index + 1}
                    </span>
                    <p>{recommendation}</p>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="demographics" className="pt-4">
              <div className="flex items-center mb-3">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                <h3 className="font-medium text-lg">Analisi Demografica</h3>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p>{data.analysis.demographicAnalysis}</p>
              </div>
              
              {data.analysis.consumerProfile && (
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <User className="mr-2 h-4 w-4 text-blue-500" />
                    <h4 className="font-medium">Profilo del Consumatore</h4>
                  </div>
                  <div className="p-3 bg-blue-50 text-blue-800 rounded-md">
                    <p>{data.analysis.consumerProfile}</p>
                  </div>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground mt-3">
                Dati demografici basati sul quartiere {data.businessInfo.district}
              </p>
            </TabsContent>
            
            <TabsContent value="competition" className="pt-4">
              <div className="flex items-center mb-3">
                <Building className="mr-2 h-5 w-5 text-orange-500" />
                <h3 className="font-medium text-lg">Analisi della Concorrenza</h3>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p>{data.analysis.competitionAnalysis}</p>
              </div>
              
              {data.rawData?.yelp?.businesses && data.rawData.yelp.businesses.length > 0 && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.rawData.yelp.businesses.slice(0, 2).map((business: any, index: number) => (
                    <div key={index} className="border rounded-md p-3">
                      <div className="font-medium flex justify-between">
                        <span>{business.name}</span>
                        <span className="text-amber-500 flex items-center">
                          {business.rating} <Award className="h-3 w-3 ml-1" />
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">{business.location?.address1}</div>
                    </div>
                  ))}
                </div>
              )}
              
              <p className="text-sm text-muted-foreground mt-3">
                Basato sui dati di competitor simili nell'area {data.businessInfo.district}
              </p>
            </TabsContent>
            
            <TabsContent value="trends" className="pt-4">
              <div className="flex items-center mb-3">
                <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                <h3 className="font-medium text-lg">Analisi delle Tendenze</h3>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p>{data.analysis.trendsAnalysis}</p>
              </div>
              
              {data.analysis.recommendedKeywords && data.analysis.recommendedKeywords.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <Tag className="mr-2 h-4 w-4 text-green-500" />
                    <h4 className="font-medium">Parole Chiave Raccomandate</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.analysis.recommendedKeywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">{keyword}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground mt-3">
                Basato sui dati di Google Trends per il settore {formatBusinessType(data.businessInfo.type)} a {data.businessInfo.district}
              </p>
            </TabsContent>
            
            <TabsContent value="extra" className="pt-4">
              <div className="space-y-4">
                {data.analysis.marketOpportunities && (
                  <div>
                    <div className="flex items-center mb-2">
                      <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                      <h4 className="font-medium text-lg">Opportunità di Mercato</h4>
                    </div>
                    <div className="p-4 bg-amber-50 text-amber-800 rounded-md">
                      <p>{data.analysis.marketOpportunities}</p>
                    </div>
                  </div>
                )}
                
                {data.analysis.localHighlights && (
                  <div>
                    <div className="flex items-center mb-2">
                      <Map className="mr-2 h-5 w-5 text-indigo-500" />
                      <h4 className="font-medium text-lg">Attrazioni Locali</h4>
                    </div>
                    <div className="p-4 bg-indigo-50 text-indigo-800 rounded-md">
                      <p>{data.analysis.localHighlights}</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessAnalysisResults;
