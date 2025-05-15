
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChartBar, MessageSquare, Map } from 'lucide-react';
import Layout from '@/components/Layout';
import { useNavigate } from 'react-router-dom';
import ModeSelector from '@/components/ModeSelector';

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Miami Business Insight Hub
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Analisi di mercato, dati demografici e intelligence competitiva per la tua attività a Miami
          </p>
          
          <div className="mx-auto max-w-lg mb-10">
            <ModeSelector />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Assistente AI
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/data-explorer')}
              className="flex items-center gap-2"
            >
              <ChartBar className="h-5 w-5" />
              Esplora Dati
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/my-business')}
              className="flex items-center gap-2"
            >
              <Map className="h-5 w-5" />
              Mappa del Mercato
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-muted/50 p-6 rounded-lg text-center">
            <MessageSquare className="h-10 w-10 mx-auto mb-3 text-primary" />
            <h3 className="text-xl font-bold mb-2">Assistente AI Strategico</h3>
            <p className="text-muted-foreground">
              Ottieni consigli personalizzati basati sui dati per la tua attività
            </p>
          </div>
          
          <div className="bg-muted/50 p-6 rounded-lg text-center">
            <ChartBar className="h-10 w-10 mx-auto mb-3 text-primary" />
            <h3 className="text-xl font-bold mb-2">Analisi di Mercato</h3>
            <p className="text-muted-foreground">
              Dati demografici, concorrenza e tendenze di mercato
            </p>
          </div>
          
          <div className="bg-muted/50 p-6 rounded-lg text-center">
            <Map className="h-10 w-10 mx-auto mb-3 text-primary" />
            <h3 className="text-xl font-bold mb-2">Mappatura Competitiva</h3>
            <p className="text-muted-foreground">
              Visualizza ed analizza la presenza dei competitor nel tuo settore
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
