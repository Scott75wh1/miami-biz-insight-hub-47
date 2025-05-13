import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiKeys } from '@/hooks/useApiKeys';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, Building, MapPin } from 'lucide-react';
import { fetchPlacesData, fetchYelpData, fetchGoogleTrendsData, fetchCensusData, fetchOpenAIAnalysis } from '@/services/apiService';
import BusinessAnalysisResults from '@/components/business/BusinessAnalysisResults';

const formSchema = z.object({
  businessName: z.string().min(3, {
    message: "Il nome dell'attività deve contenere almeno 3 caratteri",
  }),
  businessAddress: z.string().min(5, {
    message: "L'indirizzo deve essere completo",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const MyBusinessPage = () => {
  const { toast } = useToast();
  const { apiKeys } = useApiKeys();
  const { selectedDistrict } = useDistrictSelection();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessAddress: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    try {
      toast({
        title: "Analisi iniziata",
        description: "Stiamo raccogliendo i dati per la tua attività...",
      });
      
      // 1. Get location data using the Places API
      const placesResult = await fetchPlacesData(
        `${values.businessName} ${values.businessAddress}`, 
        apiKeys.googlePlaces
      );
      
      // 2. Get Yelp data for business name
      const yelpResult = await fetchYelpData(
        values.businessName,
        apiKeys.yelp,
        selectedDistrict
      );
      
      // 3. Get demographic data for the location
      const censusResult = await fetchCensusData(
        selectedDistrict,
        apiKeys.censusGov
      );
      
      // 4. Get Google Trends data for business type
      const businessType = detectBusinessType(values.businessName);
      const trendsResult = await fetchGoogleTrendsData(
        apiKeys.googleTrends,
        [businessType, values.businessName, `${businessType} ${selectedDistrict}`],
        "US-FL-528",
        selectedDistrict
      );
      
      // 5. Use OpenAI to analyze and interpret combined data
      const businessData = {
        name: values.businessName,
        address: values.businessAddress,
        district: selectedDistrict,
        places: placesResult,
        yelp: yelpResult,
        census: censusResult,
        trends: trendsResult
      };
      
      // Create a structured prompt for OpenAI to generate JSON
      const aiPrompt = `Analizza questi dati per l'attività "${values.businessName}" situata a ${values.businessAddress} nel quartiere ${selectedDistrict}:
        
        Dati demografici: ${JSON.stringify(censusResult)}
        
        Dati concorrenza: ${JSON.stringify(yelpResult)}
        
        Dati di tendenza: ${JSON.stringify(trendsResult)}
        
        Fornisci una analisi dettagliata ma concisa che includa:
        1. Potenziale demografico dell'area per questo tipo di attività
        2. Analisi della concorrenza (3-5 punti principali)
        3. Tendenze di mercato rilevanti
        4. Raccomandazioni specifiche (3-5)
        
        Formato richiesto: JSON con campi 'summary', 'demographicAnalysis', 'competitionAnalysis', 'trendsAnalysis', 'recommendations'.
      `;
      
      const aiAnalysis = await fetchOpenAIAnalysis(apiKeys.openAI, aiPrompt);
      
      // Process the OpenAI response
      let parsedAnalysis;
      if (aiAnalysis && aiAnalysis.choices && aiAnalysis.choices[0]) {
        try {
          // Attempt to parse as JSON if the response is formatted correctly
          const content = aiAnalysis.choices[0].message.content;
          // Try to extract JSON if it's embedded in text
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          const jsonString = jsonMatch ? jsonMatch[0] : content;
          parsedAnalysis = JSON.parse(jsonString);
          
          // Ensure all required fields exist
          parsedAnalysis = {
            summary: parsedAnalysis.summary || "Analisi non disponibile",
            demographicAnalysis: parsedAnalysis.demographicAnalysis || "Analisi demografica non disponibile",
            competitionAnalysis: parsedAnalysis.competitionAnalysis || "Analisi competitiva non disponibile",
            trendsAnalysis: parsedAnalysis.trendsAnalysis || "Analisi delle tendenze non disponibile",
            recommendations: Array.isArray(parsedAnalysis.recommendations) ? 
              parsedAnalysis.recommendations : 
              ["Raccomandazioni non disponibili"]
          };
        } catch (e) {
          console.error("Error parsing OpenAI response:", e);
          // If not proper JSON, use the raw text
          parsedAnalysis = {
            summary: aiAnalysis.choices[0].message.content,
            demographicAnalysis: "Analisi demografica non disponibile in formato strutturato",
            competitionAnalysis: "Analisi competitiva non disponibile in formato strutturato",
            trendsAnalysis: "Analisi delle tendenze non disponibile in formato strutturato",
            recommendations: ["Consultare il testo completo dell'analisi"]
          };
        }
      } else {
        parsedAnalysis = {
          summary: "Non è stato possibile generare un'analisi completa con i dati disponibili",
          demographicAnalysis: "Dati insufficienti",
          competitionAnalysis: "Dati insufficienti",
          trendsAnalysis: "Dati insufficienti",
          recommendations: ["Verificare le API key e riprovare l'analisi"]
        };
      }
      
      // Combine all data into a single object for the results component
      const combinedData = {
        businessInfo: {
          name: values.businessName,
          address: values.businessAddress,
          district: selectedDistrict,
          type: businessType
        },
        rawData: {
          places: placesResult,
          yelp: yelpResult,
          census: censusResult,
          trends: trendsResult
        },
        analysis: parsedAnalysis
      };
      
      setAnalysisData(combinedData);
      setAnalysisComplete(true);
      
      toast({
        title: "Analisi completata",
        description: "I risultati sono pronti per la consultazione",
      });
      
    } catch (error) {
      console.error("Error during business analysis:", error);
      toast({
        title: "Errore durante l'analisi",
        description: "Si è verificato un errore durante l'analisi. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Simple business type detector based on common keywords
  const detectBusinessType = (businessName: string): string => {
    const name = businessName.toLowerCase();
    if (name.includes("pizz") || name.includes("trattoria") || name.includes("ristorant") || 
        name.includes("osteria") || name.includes("cucina") || name.includes("sapori")) {
      return "restaurant";
    } else if (name.includes("caffè") || name.includes("caffe") || name.includes("espresso") || 
              name.includes("bar") || name.includes("coffee")) {
      return "coffee_shop";
    } else if (name.includes("negozi") || name.includes("boutique") || name.includes("store") || 
              name.includes("shop")) {
      return "retail";
    } else if (name.includes("tech") || name.includes("software") || name.includes("digital") || 
              name.includes("app")) {
      return "tech";
    } else if (name.includes("fitness") || name.includes("gym") || name.includes("palestra")) {
      return "fitness";
    } else {
      // Default to retail if we can't determine
      return "retail";
    }
  };

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Building className="mr-2 h-6 w-6" />
          La mia Attività
        </h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Analisi Personalizzata</CardTitle>
            <CardDescription>
              Inserisci i dati della tua attività per ottenere un'analisi completa basata sui dati raccolti.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome dell'Attività</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="es. Pizzeria Napoli, Tech Solutions, ecc." 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Inserisci il nome completo della tua attività
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="businessAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Indirizzo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="es. 123 Ocean Drive, Miami Beach, FL 33139" 
                            className="pl-8"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Inserisci l'indirizzo completo della tua attività
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" disabled={isAnalyzing} className="w-full">
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analisi in corso...
                    </>
                  ) : "Analizza la mia attività"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {analysisComplete && analysisData && (
          <BusinessAnalysisResults data={analysisData} />
        )}
      </div>
    </Layout>
  );
};

export default MyBusinessPage;
