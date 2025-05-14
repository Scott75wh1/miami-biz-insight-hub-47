
import React from 'react';
import MyBusinessPageContainer from './business/MyBusinessPageContainer';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { TrendsProvider } from '@/components/trends/TrendsContext';

const MyBusinessPage = () => {
  return (
    <TrendsProvider>
      <MyBusinessPageContainer />
    </TrendsProvider>
  );
};

export default MyBusinessPage;
