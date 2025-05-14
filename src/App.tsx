
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from './pages/Index';
import MyBusinessPage from './pages/MyBusinessPage';
import DataExplorerPage from './pages/DataExplorerPage';
import CompetitorAnalysisPage from './pages/CompetitorAnalysisPage';
import TrafficPage from './pages/TrafficPage';
import AIAssistantPage from './pages/AIAssistantPage';
import MarketTrendsPage from './pages/MarketTrendsPage';
import CensusDetail from './pages/CensusDetail';
import NotFound from './pages/NotFound';
import { UserTypeProvider } from './hooks/useUserType';

function App() {
  return (
    <UserTypeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/my-business" element={<MyBusinessPage />} />
          <Route path="/data-explorer" element={<DataExplorerPage />} />
          <Route path="/competitor-analysis" element={<CompetitorAnalysisPage />} />
          <Route path="/traffic" element={<TrafficPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/market-trends" element={<MarketTrendsPage />} />
          <Route path="/census/:district" element={<CensusDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </UserTypeProvider>
  );
}

export default App;
