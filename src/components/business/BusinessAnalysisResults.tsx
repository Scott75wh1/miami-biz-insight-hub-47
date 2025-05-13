
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Building, TrendingUp, Users, Search, MessageSquare } from 'lucide-react';

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
              <CardDescription className="mt-1">{data.businessInfo.address}</CardDescription>
            </div>
            <Badge variant="outline" className="ml-2">
              {formatBusinessType(data.businessInfo.type)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Sommario</h3>
            <p className="text-muted-foreground">{data.analysis.summary}</p>
          </div>
          
          <Separator className="my-4" />
          
          <Tabs defaultValue="recommendations">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="recommendations">Raccomandazioni</TabsTrigger>
              <TabsTrigger value="demographics">Demografia</TabsTrigger>
              <TabsTrigger value="competition">Concorrenza</TabsTrigger>
              <TabsTrigger value="trends">Tendenze</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommendations" className="pt-4">
              <div className="flex items-center mb-3">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                <h3 className="font-medium text-lg">Raccomandazioni</h3>
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
              <p className="text-sm text-muted-foreground mt-2">
                Basato sui dati demografici del quartiere {data.businessInfo.district}
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
              <p className="text-sm text-muted-foreground mt-2">
                Basato sui dati di competitor simili nell'area selezionata
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
              <p className="text-sm text-muted-foreground mt-2">
                Basato sui dati di Google Trends per il settore {formatBusinessType(data.businessInfo.type)}
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessAnalysisResults;
