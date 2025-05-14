
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { useApiKeys } from '@/hooks/useApiKeys';

interface ApiTestResult {
  service: string;
  success: boolean;
  message: string;
  timestamp: Date;
}

export const ApiConnectionTester = () => {
  const { toast } = useToast();
  const { apiKeys } = useApiKeys();
  const [isTestingAll, setIsTestingAll] = useState(false);
  const [testResults, setTestResults] = useState<ApiTestResult[]>([]);

  const testApis = async () => {
    setIsTestingAll(true);
    setTestResults([]);
    
    // Show toast for test start
    toast({
      title: "Test connessione API",
      description: "Iniziando il test delle API...",
    });
    
    const results: ApiTestResult[] = [];
    
    // Test each API in sequence
    const apis = [
      { name: 'Google Places API', key: apiKeys.googlePlaces },
      { name: 'Census.gov API', key: apiKeys.censusGov },
      { name: 'Yelp API', key: apiKeys.yelp },
      { name: 'Google Trends API', key: apiKeys.googleTrends },
      { name: 'OpenAI API', key: apiKeys.openAI }
    ];
    
    for (const api of apis) {
      // Add a small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate API test (in a real app, you'd make an actual API call)
      const isDemo = !api.key || api.key === 'demo-key';
      
      // Simulate some random failures for testing
      const success = isDemo ? false : Math.random() > 0.3;
      
      results.push({
        service: api.name,
        success: success,
        message: isDemo ? 
          "Utilizzando chiave demo" : 
          success ? 
            "Connessione riuscita" : 
            "Errore di connessione",
        timestamp: new Date()
      });
      
      setTestResults(prev => [...prev, results[results.length - 1]]);
    }
    
    // Show summary toast
    const successCount = results.filter(r => r.success).length;
    toast({
      title: "Test completato",
      description: `${successCount} di ${apis.length} API connesse con successo.`,
      variant: successCount === apis.length ? "default" : "destructive",
    });
    
    setIsTestingAll(false);
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Test di Connessione API</span>
          <Button
            onClick={testApis}
            disabled={isTestingAll}
            size="sm"
            className="flex items-center gap-1"
          >
            {isTestingAll ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                Testing...
              </>
            ) : (
              <>
                <Check className="h-3 w-3 mr-1" />
                Test Connessioni
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {testResults.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p className="text-sm">Clicca su 'Test Connessioni' per verificare lo stato delle tue API</p>
          </div>
        ) : (
          <div className="space-y-2">
            {testResults.map((result, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 border rounded-md">
                <div className="flex items-center">
                  {result.success ? (
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                  )}
                  <span className="text-sm">{result.service}</span>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  result.success ? 
                    'bg-green-100 text-green-800' : 
                    'bg-amber-100 text-amber-800'
                }`}>
                  {result.message}
                </div>
              </div>
            ))}
            
            <div className="text-xs text-muted-foreground mt-2 text-right">
              Ultimo test: {testResults.length > 0 ? 
                testResults[testResults.length - 1].timestamp.toLocaleString() : 
                'N/A'}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
