
import React from 'react';
import Layout from '@/components/Layout';
import { UserTypeProvider } from '@/hooks/useUserType';
import { DistrictSelectionProvider } from '@/hooks/useDistrictSelection';
import { DataCollectionProvider } from '@/hooks/useDataCollection';
import AIAssistantContent from '@/components/ai-assistant/AIAssistantContent';

const AIAssistantPage: React.FC = () => (
  <Layout>
    <AIAssistantContent />
  </Layout>
);

export default AIAssistantPage;
