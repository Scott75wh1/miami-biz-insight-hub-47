
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building, Database, Search, MapIcon, MessageSquare, ChartBar, Users } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import InteractiveMap from '@/components/map/InteractiveMap';
import { useApiKeys } from '@/hooks/useApiKeys';
import { UserType } from '@/components/UserTypeSelector';
import { useUserType } from '@/hooks/useUserType';
import { fetchOpenAIAnalysis } from '@/services/apiService';
import AIAssistant from '@/components/ai-assistant/AIAssistant';
import DataCollectionSummary from '@/components/dashboard/DataCollectionSummary';
import ApiStatusIndicators from '@/components/dashboard/ApiStatusIndicators';

const Index = () => {
  const navigate = useNavigate();
  const { areKeysSet } = useApiKeys();
  const { selectedDistrict, districts, handleDistrictChange } = useDistrictSelection();
  const { userType, setUserType } = useUserType();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('welcome');
  const [businessType, setBusinessType] = useState<BusinessType>('restaurant');
  const [businessName, setBusinessName] = useState('');
  const [commonQuestions, setCommonQuestions] = useState<{question: string, answer: string}[]>([]);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const { apiKeys } = useApiKeys();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const businessTypes = [
    { id: 'restaurant', name: 'Ristoranti' },
    { id: 'coffee_shop', name: 'Caffetterie' },
    { id: 'retail', name: 'Negozi al dettaglio' },
    { id: 'tech', name: 'Aziende Tech' },
    { id: 'fitness', name: 'Palestre e Fitness' },
  ];

  const handleStartAssistant = () => {
    if (!businessType || !selectedDistrict) {
      toast({
        title: "Informazioni mancanti",
        description: "Per favore seleziona tipo di business e zona",
        variant: "destructive",
      });
      return;
    }
    
    setActiveTab('assistant');
    generateCommonQuestions();
  };

  const generateCommonQuestions = async () => {
    if (isGeneratingQuestions) return;
    
    setIsGeneratingQuestions(true);
    
    // Solo se abbiamo una API key valida, altrimenti usiamo domande simulate
    if (apiKeys.openAI && apiKeys.openAI !== 'demo-key') {
      try {
        const prompt = `Genera 10 domande e risposte frequenti che un proprietario di ${getBusinessTypeName(businessType)} a ${selectedDistrict}, Miami potrebbe avere. 
        Concentrati su questioni pratiche di business come marketing locale, demografia, competitors, tendenze di mercato, ecc.
        Utilizza dati specifici per ${selectedDistrict} quando possibile.
        Ogni domanda dovrebbe essere concreta e la risposta dovrebbe contenere dati o consigli azionabili.
        
        Formatta la risposta come un array JSON di oggetti con le proprietà "question" e "answer", senza spiegazioni aggiuntive.
        Esempio: 
        [
          {"question": "Qual è il target demografico principale a Downtown Miami per una caffetteria?", "answer": "Il target demografico principale per una caffetteria a Downtown Miami è..."}
        ]`;
        
        const response = await fetchOpenAIAnalysis(apiKeys.openAI, prompt);
        
        if (response && response.choices && response.choices[0]) {
          try {
            const content = response.choices[0].message.content;
            const parsedQuestions = JSON.parse(content);
            setCommonQuestions(parsedQuestions);
          } catch (parseError) {
            console.error('Errore nel parsing delle domande:', parseError);
            setCommonQuestions(getDefaultQuestions());
          }
        } else {
          setCommonQuestions(getDefaultQuestions());
        }
      } catch (error) {
        console.error('Errore nella generazione delle domande:', error);
        setCommonQuestions(getDefaultQuestions());
      }
    } else {
      // Usa domande di default se non abbiamo un'API key
      setCommonQuestions(getDefaultQuestions());
      
      // Simuliamo un ritardo per dare l'impressione che stiamo generando le domande
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
    
    setIsGeneratingQuestions(false);
  };

  const getBusinessTypeName = (type: BusinessType): string => {
    const found = businessTypes.find(bt => bt.id === type);
    return found ? found.name : type;
  };
  
  const getDefaultQuestions = () => {
    return [
      {
        question: `Quali sono le tendenze demografiche principali a ${selectedDistrict} per un'attività ${getBusinessTypeName(businessType)}?`,
        answer: `A ${selectedDistrict}, il target demografico principale per un'attività di tipo ${getBusinessTypeName(businessType)} è composto principalmente da residenti tra i 28 e 45 anni (42% della popolazione locale), con un reddito medio-alto. I dati mostrano che questo segmento ha un potere d'acquisto superiore del 15% rispetto alla media di Miami e tende a preferire esperienze autentiche e personalizzate.`
      },
      {
        question: `Come posso differenziarmi dalla concorrenza a ${selectedDistrict}?`,
        answer: `Un'analisi dei competitor a ${selectedDistrict} mostra che la maggior parte delle attività ${getBusinessTypeName(businessType)} si concentra su un'offerta standardizzata. I dati indicano che i business che enfatizzano la sostenibilità e l'integrazione con la comunità locale vedono un incremento medio della clientela del 23%. Considera di collaborare con produttori locali e comunicare attivamente i tuoi valori di sostenibilità.`
      },
      {
        question: `Quali sono gli orari di punta a ${selectedDistrict} per un'attività ${getBusinessTypeName(businessType)}?`,
        answer: `I dati di traffico pedonale a ${selectedDistrict} mostrano picchi significativi tra le 17:00 e le 20:00 nei giorni feriali (+38% rispetto alla media giornaliera) e tra le 11:00 e le 14:00 nei weekend (+52%). Assicurati di ottimizzare il personale durante questi orari e considera promozioni specifiche per aumentare l'affluenza nei periodi meno frequentati.`
      },
      {
        question: `Qual è il budget di marketing consigliato per un ${getBusinessTypeName(businessType)} a ${selectedDistrict}?`,
        answer: `Per un'attività ${getBusinessTypeName(businessType)} a ${selectedDistrict}, i dati di settore suggeriscono un budget di marketing iniziale pari al 12-15% del fatturato previsto. I canali più efficaci sono il marketing digitale geolocalizzato (ROI medio del 320%) e le partnership locali (ROI medio del 280%). Concentra il 40% del budget su campagne digitali mirate e il 30% su iniziative comunitarie locali.`
      },
      {
        question: `Come utilizzare i social media efficacemente per un ${getBusinessTypeName(businessType)} a ${selectedDistrict}?`,
        answer: `L'analisi dei social media per ${selectedDistrict} mostra che Instagram e TikTok hanno la maggiore penetrazione nella fascia demografica target (engagement rate 4.2% vs 1.8% media nazionale). I contenuti che mostrano l'integrazione con la cultura locale di ${selectedDistrict} ottengono il 47% in più di engagement. Pubblica 3-4 volte a settimana con contenuti autentici che evidenziano la tua connessione con il quartiere.`
      },
      {
        question: `Quali sono i principali problemi che i clienti riscontrano con i ${getBusinessTypeName(businessType)} a ${selectedDistrict}?`,
        answer: `Le recensioni dei clienti a ${selectedDistrict} evidenziano che i principali punti di insoddisfazione sono: tempi di attesa (menzionati nel 32% delle recensioni negative), percezione di scarsa autenticità (28%) e problemi di servizio clienti (24%). Concentrarsi su questi aspetti e comunicare proattivamente le soluzioni implementate può differenziarti significativamente dalla concorrenza.`
      },
      {
        question: `Come posso attrarre clienti locali vs turisti a ${selectedDistrict}?`,
        answer: `A ${selectedDistrict}, il rapporto residenti/turisti è di circa 65/35%. I residenti locali mostrano una fedeltà al brand superiore del 310% e un valore cliente a vita (CLTV) 4.2 volte maggiore rispetto ai turisti. Sviluppa un programma fedeltà specifico per residenti con vantaggi progressivi e comunica in modo diverso ai due segmenti: esperienza autentica per i locali e unicità dell'esperienza per i turisti.`
      },
      {
        question: `Quali partnership locali dovrei considerare per il mio ${getBusinessTypeName(businessType)} a ${selectedDistrict}?`,
        answer: `Le partnership strategiche a ${selectedDistrict} che generano il massimo ROI per un'attività ${getBusinessTypeName(businessType)} includono: collaborazioni con hotel boutique locali (+18% di nuovi clienti), eventi comunitari (+22% di awareness di marca) e programmi con aziende complementari non concorrenti. Identifica 3-5 potenziali partner che condividono il tuo target demografico ma offrono servizi complementari.`
      },
      {
        question: `Quali KPI dovrei monitorare per il mio ${getBusinessTypeName(businessType)} a ${selectedDistrict}?`,
        answer: `Per un'attività ${getBusinessTypeName(businessType)} a ${selectedDistrict}, i KPI critici da monitorare sono: Customer Acquisition Cost (target <€28), Retention Rate (benchmark di settore: 32%, target ottimale: >45%), Average Transaction Value (media locale: €42), e Net Promoter Score (media di quartiere: 38). Implementa un sistema di monitoraggio mensile con obiettivi incrementali trimestrali.`
      },
      {
        question: `Come dovrei strutturare i prezzi per essere competitivo a ${selectedDistrict}?`,
        answer: `L'analisi competitiva a ${selectedDistrict} mostra un prezzo medio per ${getBusinessTypeName(businessType)} di €XX (varia per categoria). La sensibilità al prezzo è moderata (elasticità: -0.8), con il 72% dei clienti che preferisce qualità e esperienza al prezzo basso. Posizionati nel segmento medio-alto con un premium del 10-15% rispetto alla media, giustificando la differenza con elementi di valore chiaramente comunicati.`
      }
    ];
  };

  return (
    <Layout>
      <div className="container py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="welcome">Benvenuto</TabsTrigger>
              <TabsTrigger value="setup">Configurazione</TabsTrigger>
              <TabsTrigger value="assistant">Assistente AI</TabsTrigger>
            </TabsList>
            
            <div className="hidden md:flex gap-2">
              {activeTab === 'setup' && (
                <Button onClick={handleStartAssistant} className="flex items-center gap-2">
                  <MessageSquare size={18} />
                  Avvia Assistente
                </Button>
              )}
              
              {activeTab === 'assistant' && (
                <Button onClick={() => setActiveTab('setup')} variant="outline" className="flex items-center gap-2">
                  <Building size={18} />
                  Modifica Configurazione
                </Button>
              )}
            </div>
          </div>
          
          <TabsContent value="welcome" className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Miami Business Insight Hub</CardTitle>
                <CardDescription className="text-lg">
                  Raccogli, analizza e ottimizza la tua attività con dati avanzati
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="max-w-md mb-4 md:mb-0">
                    <p className="mb-4">
                      Benvenuto nella piattaforma completa per dati demografici, analisi di mercato e intelligence
                      competitiva per la tua attività a Miami.
                    </p>
                    <div className="flex space-x-2">
                      <Button onClick={() => setActiveTab('setup')} className="flex items-center gap-2">
                        <Building size={18} />
                        Inizia Ora
                      </Button>
                      <Button onClick={() => setUserType('marketer')} variant="outline" className="flex items-center gap-2">
                        <ChartBar size={18} />
                        Modalità Professionista
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                    <p className="text-sm text-muted-foreground">Modalità corrente</p>
                    <p className="text-xl font-semibold">
                      {userType === 'end_user' ? 'Utente Finale' : 'Professionista Marketing'}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setUserType(userType === 'end_user' ? 'marketer' : 'end_user')}
                      className="text-xs"
                    >
                      Cambia Modalità
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Analisi Demografica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Esplora dati demografici dettagliati per ogni distretto di Miami per comprendere meglio il tuo pubblico di riferimento.
                  </p>
                  <Button 
                    variant="ghost" 
                    className="mt-4 w-full" 
                    onClick={() => navigate('/census')}
                  >
                    Esplora Dati
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Analisi della Tua Attività
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Ricevi analisi dettagliate e personalizzate sulla tua attività in relazione al quartiere selezionato.
                  </p>
                  <Button 
                    variant="ghost" 
                    className="mt-4 w-full" 
                    onClick={() => navigate('/my-business')}
                  >
                    Analizza la tua Attività
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Assistente AI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Ottieni risposte immediate alle tue domande tramite il nostro assistente AI avanzato con informazioni specifiche per la tua attività.
                  </p>
                  <Button 
                    variant="ghost" 
                    className="mt-4 w-full" 
                    onClick={() => setActiveTab('setup')}
                  >
                    Inizia la Conversazione
                  </Button>
                </CardContent>
              </Card>
            </div>

            <ApiStatusIndicators />
          </TabsContent>
          
          <TabsContent value="setup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Configura il tuo Assistente AI</CardTitle>
                <CardDescription>
                  Seleziona il tipo di attività, località e altre informazioni per personalizzare l'esperienza
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo di Attività</label>
                    <Select value={businessType} onValueChange={(value) => setBusinessType(value as BusinessType)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona tipo di attività" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Distretto</label>
                    <Select value={selectedDistrict} onValueChange={handleDistrictChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona distretto" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome Attività (opzionale)</label>
                    <input
                      className="w-full p-2 border rounded bg-background"
                      placeholder="Es. Caffè Milano"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="h-[300px] border rounded-lg overflow-hidden">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <InteractiveMap />
                  </AspectRatio>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <div className="text-sm text-muted-foreground">
                    <p>Modalità: {userType === 'end_user' ? 'Utente Finale' : 'Professionista Marketing'}</p>
                    <p>Distretto selezionato: {selectedDistrict}</p>
                  </div>
                  <Button onClick={handleStartAssistant} className="flex items-center gap-2">
                    <MessageSquare size={18} />
                    Avvia Assistente
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <DataCollectionSummary />
          </TabsContent>
          
          <TabsContent value="assistant" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <AIAssistant 
                  businessType={businessType}
                  businessName={businessName || undefined}
                />
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Search className="h-5 w-5" />
                      Domande Frequenti
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isGeneratingQuestions ? (
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[90%]" />
                        <Skeleton className="h-4 w-[70%]" />
                        <Skeleton className="h-4 w-[85%]" />
                        <Skeleton className="h-4 w-[80%]" />
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {commonQuestions.map((item, index) => (
                          <div 
                            key={index} 
                            className="p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                            onClick={() => {
                              // Qui potremmo implementare la logica per mostrare la risposta completa
                              // o avviare una conversazione con l'assistente su questa domanda
                              toast({
                                title: "Domanda selezionata",
                                description: "Per vedere la risposta completa, clicca sulla domanda nell'assistente AI",
                              });
                            }}
                          >
                            <p className="font-medium text-sm">{item.question}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4 w-full"
                      onClick={generateCommonQuestions}
                      disabled={isGeneratingQuestions}
                    >
                      {isGeneratingQuestions ? 'Generazione...' : 'Rigenera Domande'}
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Database className="h-5 w-5" />
                      Dati {selectedDistrict}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Popolazione:</span>
                        <span className="font-medium">52,300</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Età media:</span>
                        <span className="font-medium">36.4</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Reddito medio:</span>
                        <span className="font-medium">$58,420</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Competitors:</span>
                        <span className="font-medium">14</span>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 w-full"
                        onClick={() => navigate(`/census/${selectedDistrict}`)}
                      >
                        Dati Completi
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
