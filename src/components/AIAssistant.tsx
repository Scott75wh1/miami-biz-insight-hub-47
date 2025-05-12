
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Loader2 } from 'lucide-react';
import { fetchOpenAIAnalysis } from '@/services/apiService';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/components/ui/use-toast';
import { BusinessType } from '@/components/BusinessTypeSelector';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  businessType: BusinessType;
}

const AIAssistant = ({ businessType }: AIAssistantProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Ciao! Sono il tuo Assistente AI per l'analisi dei dati di business a Miami. Come posso aiutarti con la tua attività di ${businessType.replace('_', ' ')}?` 
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { apiKeys, isLoaded, areKeysSet } = useApiKeys();
  const { toast } = useToast();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    
    if (!isLoaded || !areKeysSet()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          role: 'assistant', 
          content: 'Per favore configura prima le API keys nelle impostazioni per utilizzare l\'assistente AI.' 
        }
      ]);
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Pass the API key as the first argument and the prompt as second
      // Include businessType in the prompt for more relevant responses
      const enhancedPrompt = `[Contesto: Analisi business type: ${businessType.replace('_', ' ')}] ${input}`;
      const response = await fetchOpenAIAnalysis(apiKeys.openAI, enhancedPrompt);
      
      if (response && response.choices && response.choices[0]) {
        const aiResponse: Message = { 
          role: 'assistant', 
          content: response.choices[0].message.content 
        };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          role: 'assistant', 
          content: 'Mi dispiace, non sono riuscito a elaborare la tua richiesta. Verifica che la tua API key di OpenAI sia valida.' 
        }
      ]);
      
      toast({
        title: "Errore AI",
        description: "Impossibile ottenere una risposta dall'assistente AI. Verifica la tua API key.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          Assistente AI {businessType && `- ${businessType.replace('_', ' ').charAt(0).toUpperCase() + businessType.replace('_', ' ').slice(1)}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-60px)]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-foreground'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground max-w-[80%] rounded-lg px-4 py-2 flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>L'assistente sta elaborando...</span>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Chiedi informazioni sui dati per ${businessType.replace('_', ' ')}...`}
            className="flex-1"
            disabled={isProcessing}
          />
          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Invia'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
