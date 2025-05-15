
import React from 'react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { ApiKeysCard } from '@/components/settings/ApiKeysCard';
import { ApiVerificationStatus } from '@/components/settings/ApiVerificationStatus';
import { DataManagementCard } from '@/components/settings/DataManagementCard';
import { NotificationsCard } from '@/components/settings/NotificationsCard';
import { PrivacyCard } from '@/components/settings/PrivacyCard';
import { SettingsHeader } from '@/components/settings/SettingsHeader';

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  
  const handleClearCache = () => {
    toast({
      title: "Cache cancellata",
      description: "I dati locali sono stati cancellati con successo",
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <SettingsHeader handleClearCache={handleClearCache} />
        
        <div className="grid gap-6 md:grid-cols-2">
          <ApiKeysCard />
          <ApiVerificationStatus />
          <DataManagementCard />
          <NotificationsCard />
          <PrivacyCard />
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
