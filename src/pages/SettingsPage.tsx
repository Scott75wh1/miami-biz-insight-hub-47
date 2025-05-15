
import React from 'react';
import Layout from '@/components/Layout';
import { SettingsDialog } from '@/components/SettingsDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Key } from 'lucide-react';
import { ApiVerificationStatus } from '@/components/settings/ApiVerificationStatus';

const SettingsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Impostazioni</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Configurazione API
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Configura le API key per utilizzare dati reali anziché demo.
              </p>
              <SettingsDialog />
            </CardContent>
          </Card>
          
          <ApiVerificationStatus />
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
