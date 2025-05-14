
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Search } from 'lucide-react';

const DataExplorerPage = () => {
  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <Database className="mr-2 h-6 w-6" />
          Esplora Dati
        </h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Esplora i dati demografici e commerciali
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Questa sezione ti permette di esplorare i dati demografici e commerciali di Miami.
              Seleziona un distretto e una categoria di dati per iniziare.
            </p>
            
            <div className="rounded-md bg-blue-50 p-4 text-blue-800 border border-blue-100">
              <p>
                Benvenuto nell'esploratore dati. Da qui puoi accedere ai dettagli 
                demografici, economici e commerciali specifici per ogni distretto.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Dati Demografici</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Esplora i dati demografici di ogni distretto, inclusi età, reddito, e composizione familiare.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Dati Economici</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Analizza i dati economici come occupazione, settori in crescita e reddito medio per distretto.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Dati Commerciali</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Esplora i dati sulle attività commerciali, inclusi i tipi di attività, la loro distribuzione e concentrazione.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DataExplorerPage;
