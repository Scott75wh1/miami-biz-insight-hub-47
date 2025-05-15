
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Search, Database, BarChart4 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DataExplorerPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Esplora Dati</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Dati Demografici
              </CardTitle>
              <CardDescription>
                Esplora i dati demografici di Miami per distretto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Accedi a informazioni dettagliate sulla popolazione, età media, reddito, livello di istruzione e altre statistiche demografiche.
              </p>
              <Button onClick={() => navigate('/census')} className="w-full">
                Esplora Dati Demografici
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart4 className="h-5 w-5" />
                Analisi Competitiva
              </CardTitle>
              <CardDescription>
                Analizza la concorrenza nei distretti di Miami
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Visualizza dati sui competitor, recensioni, prezzi medi e altri indicatori di mercato per la tua tipologia di business.
              </p>
              <Button onClick={() => navigate('/competitor-analysis')} className="w-full">
                Analizza Concorrenza
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Assistente AI
              </CardTitle>
              <CardDescription>
                Ottieni risposte personalizzate tramite l'assistente AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Utilizza l'intelligenza artificiale per ricevere analisi dettagliate, consigli pratici e risposte alle tue domande specifiche.
              </p>
              <Button onClick={() => navigate('/')} className="w-full">
                Consulta Assistente AI
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DataExplorerPage;
