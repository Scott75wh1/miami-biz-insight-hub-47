
import React from 'react';
import Layout from '@/components/Layout';
import { UserTypeProvider } from '@/hooks/useUserType';
import AIAssistantContent from '@/components/ai-assistant/AIAssistantContent';

const AIAssistantPage: React.FC = () => (
  <UserTypeProvider>
    <Layout>
      <AIAssistantContent />
    </Layout>
  </UserTypeProvider>
);

export default AIAssistantPage;
