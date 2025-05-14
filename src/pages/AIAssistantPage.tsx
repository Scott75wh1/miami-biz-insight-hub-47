
import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useApiKeys } from '@/hooks/useApiKeys';
import BusinessTypeSelector, { BusinessType } from '@/components/BusinessTypeSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, MessageSquare, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCuisineSelection } from '@/hooks/useCuisineSelection';
import { toast } from '@/hooks/use-toast';

// Tipo di messaggio
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Tipo di suggerimento predefinito
interface Suggestion {
  title: string;
  prompt: string;
}

const AIAssistantPage = () => {
  const { selectedDistrict } = useDistrictSelection();
  const [businessType, setBusinessType] = useState<BusinessType>('restaurant');
  const { selectedCuisine } = useCuisineSelection();
  const [activeTab, setActiveTab] = useState('chat');
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { apiKeys } = useApiKeys();
  
  // Effetto per scorrere agli ultimi messaggi
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Messaggio di benvenuto
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: `Ciao! Sono il tuo assistente AI per il business. Posso aiutarti con consigli specifici per la tua attività ${businessType} a ${selectedDistrict}. Come posso aiutarti oggi?`,
        timestamp: new Date()
      }
    ]);
  }, [selectedDistrict, businessType]);

  // Gestione dell'invio del messaggio
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    
    // Aggiungi il messaggio dell'utente
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);
    
    // Resetta il campo di input
    setUserMessage('');
    
    // Simula l'elaborazione dell'AI
    setIsLoading(true);
    
    try {
      // In un'app reale, qui verrebbe chiamata l'API di OpenAI
      const context = {
        district: selectedDistrict,
        businessType: businessType,
        cuisineType: selectedCuisine,
        businessName: businessName
      };
      
      // Simuliamo una risposta dopo un breve ritardo
      setTimeout(() => {
        const aiResponse = generateAIResponse(userMessage, context);
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        }]);
        
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Errore nella generazione della risposta:', error);
      toast({
        title: "Errore",
        description: "Non è stato possibile generare una risposta. Riprova più tardi.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Suggerimenti predefiniti basati sul tipo di business
  const getSuggestions = (): Suggestion[] => {
    switch (businessType) {
      case 'restaurant':
        return [
          { 
            title: "Strategie di marketing", 
            prompt: "Quali sono le migliori strategie di marketing per un ristorante a " + selectedDistrict + "?" 
          },
          { 
            title: "Tendenze culinarie", 
            prompt: "Quali sono le tendenze culinarie emergenti a " + selectedDistrict + " che potrei sfruttare?" 
          },
          { 
            title: "Gestione del personale", 
            prompt: "Come posso migliorare la gestione del personale nel mio ristorante?" 
          }
        ];
      case 'retail':
        return [
          { 
            title: "Visual merchandising", 
            prompt: "Quali sono le best practices di visual merchandising per un negozio al dettaglio a " + selectedDistrict + "?" 
          },
          { 
            title: "Vendite stagionali", 
            prompt: "Come posso massimizzare le vendite durante i periodi stagionali a " + selectedDistrict + "?" 
          },
          { 
            title: "Fidelizzazione clienti", 
            prompt: "Quali strategie di fidelizzazione clienti funzionano meglio per i negozi retail?" 
          }
        ];
      default:
        return [
          { 
            title: "Analisi di mercato", 
            prompt: "Puoi fornirmi un'analisi di mercato per un'attività di " + businessType + " a " + selectedDistrict + "?" 
          },
          { 
            title: "Strategie di crescita", 
            prompt: "Quali sono le migliori strategie di crescita per un'attività di " + businessType + " in questo momento?" 
          },
          { 
            title: "Analisi concorrenza", 
            prompt: "Chi sono i principali concorrenti per un'attività di " + businessType + " a " + selectedDistrict + " e come posso differenziarmi?" 
          }
        ];
    }
  };

  // Elabora una richiesta di suggerimento predefinito
  const handleSuggestionClick = (prompt: string) => {
    setUserMessage(prompt);
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Assistente AI</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardContent className="p-4 space-y-4">
                <h2 className="text-lg font-medium">Contestualizza le tue domande</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Tipo di attività</label>
                    <BusinessTypeSelector 
                      selectedType={businessType}
                      onTypeChange={setBusinessType}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Nome attività (opzionale)</label>
                    <Input
                      placeholder="Inserisci il nome della tua attività"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Domande suggerite</h3>
                  <div className="space-y-2">
                    {getSuggestions().map((suggestion, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        className="w-full justify-start text-left h-auto whitespace-normal py-2"
                        onClick={() => handleSuggestionClick(suggestion.prompt)}
                      >
                        <Lightbulb className="h-4 w-4 mr-2 shrink-0" />
                        <span>{suggestion.title}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="h-full flex flex-col">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <div className="border-b px-4">
                  <TabsList className="h-11">
                    <TabsTrigger value="chat" className="data-[state=active]:bg-primary/5">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ maxHeight: '500px' }}>
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          {message.role === 'assistant' && (
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="/placeholder.svg" alt="AI" />
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div 
                            className={`rounded-lg p-3 ${
                              message.role === 'user' 
                                ? 'bg-primary text-primary-foreground ml-2' 
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-start max-w-[80%]">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src="/placeholder.svg" alt="AI" />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                          <div className="bg-muted rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                              <div className="h-2 w-2 bg-primary/60 rounded-full animate-pulse"></div>
                              <div className="h-2 w-2 bg-primary/60 rounded-full animate-pulse delay-150"></div>
                              <div className="h-2 w-2 bg-primary/60 rounded-full animate-pulse delay-300"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  <div className="p-4 border-t">
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex items-end gap-2"
                    >
                      <div className="flex-1">
                        <Textarea
                          value={userMessage}
                          onChange={(e) => setUserMessage(e.target.value)}
                          placeholder="Scrivi la tua domanda..."
                          rows={3}
                          className="resize-none"
                        />
                      </div>
                      <Button 
                        type="submit"
                        disabled={isLoading || !userMessage.trim()}
                        className="h-10"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Funzione per generare risposte AI simulate in base al contesto
const generateAIResponse = (question: string, context: any): string => {
  const { district, businessType, cuisineType, businessName } = context;
  const businessNameStr = businessName ? businessName : `la tua attività di ${businessType}`;
  
  // Risposte per domande comuni
  if (question.toLowerCase().includes('strategi') && question.toLowerCase().includes('marketing')) {
    return `Per ${businessNameStr} a ${district}, consiglio queste strategie di marketing:
1. Investi nel marketing locale geolocalizzato, particolarmente efficace a ${district} dove la clientela è principalmente ${district === 'Miami Beach' ? 'turistica' : 'locale'}.
2. Sfrutta partnership con attività complementari nella zona per promozioni incrociate.
3. Utilizza i social media con contenuti geolocalizzati, ${district === 'Wynwood' ? 'puntando su contenuti artistici e creativi' : district === 'Brickell' ? 'orientati ad un pubblico professionale e sofisticato' : 'concentrandoti sullo stile di vita e l\'atmosfera locale'}.
4. Considera eventi speciali che richiamino le caratteristiche distintive di ${district}.`;
  }
  
  if (question.toLowerCase().includes('tendenz') && businessType === 'restaurant') {
    return `Le tendenze culinarie emergenti a ${district} che potresti sfruttare per ${businessNameStr} includono:
1. Menù con opzioni plant-based e sostenibili, particolarmente apprezzate a ${district}.
2. Esperienze dining immersive che raccontano una storia.
3. Fusion tra cucina ${cuisineType || 'locale'} e influenze internazionali.
4. Concept "farm-to-table" con ingredienti locali della Florida.
5. Cocktail artigianali con ingredienti locali esotici.
Queste tendenze si adattano bene al profilo demografico di ${district} dove c'è una crescente domanda di autenticità ed esperienze culinarie uniche.`;
  }
  
  if (question.toLowerCase().includes('concorrenti') || question.toLowerCase().includes('concorrenza')) {
    return `L'analisi della concorrenza per ${businessNameStr} a ${district} mostra che:
1. I principali competitor sono ${businessType === 'restaurant' ? 'ristoranti con offerte simili come [Competitor1] e [Competitor2]' : 'attività simili come [Competitor1] e [Competitor2]'}.
2. Puoi differenziarti puntando su ${businessType === 'restaurant' ? 'un\'esperienza culinaria unica' : 'un servizio personalizzato'} che molti competitor non offrono.
3. La maggior parte delle attività a ${district} compete su ${district === 'Miami Beach' ? 'location e vista' : district === 'Brickell' ? 'design moderno e servizio premium' : 'creatività e originalità'}.
4. Un'opportunità è posizionarti come ${businessType === 'restaurant' ? 'il ristorante più autentico/innovativo' : 'l\'attività più autentica/innovativa'} nella zona, dato che questa è una lacuna nel mercato locale.`;
  }
  
  // Risposta generica
  return `Basandomi sui dati di mercato per ${district} e sulle tendenze nel settore ${businessType}, posso dirti che ${businessNameStr} ha buone potenzialità di successo se si concentra su questi elementi chiave:

1. La clientela di ${district} tende ad apprezzare ${district === 'Miami Beach' ? 'esperienze uniche e di alta qualità, con una forte componente visiva ed estetica' : district === 'Wynwood' ? 'originalità, creatività e autenticità, con una forte componente artistica' : district === 'Brickell' ? 'efficienza, qualità premium e design contemporaneo' : 'servizi di qualità con un buon rapporto qualità-prezzo'}.

2. L'analisi dei dati demografici mostra che il cliente tipico in questa zona ha ${district === 'Miami Beach' ? 'un potere d\'acquisto medio-alto, spesso è un turista o un residente benestante' : district === 'Wynwood' ? 'un\'età media tra i 25-40 anni, orientato alle tendenze e all\'arte' : district === 'Brickell' ? 'un profilo professionale, spesso lavora nel settore finanziario o legale' : 'caratteristiche demografiche variegate'}.

3. Per distinguerti dalla concorrenza, considera di implementare ${businessType === 'restaurant' ? 'un concept culinario distintivo' : businessType === 'retail' ? 'un\'esperienza di shopping personalizzata' : 'un servizio altamente specializzato'} che risponda alle esigenze specifiche del quartiere.

Sarò felice di approfondire qualsiasi aspetto specifico ti interessi per ${businessNameStr}.`;
};

export default AIAssistantPage;
