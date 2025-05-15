
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
import CensusPage from './pages/CensusPage';
import CensusDetail from './pages/CensusDetail';
import NotFound from './pages/NotFound';
import { UserTypeProvider } from './hooks/useUserType';
import { DistrictSelectionProvider } from './hooks/useDistrictSelection';
import { DataCollectionProvider } from './hooks/useDataCollection';
import ApiLogViewer from './components/debug/ApiLogViewer';

function App() {
  return (
    <DistrictSelectionProvider>
      <Router>
        <UserTypeProvider>
          <DataCollectionProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/my-business" element={<MyBusinessPage />} />
              <Route path="/data-explorer" element={<DataExplorerPage />} />
              <Route path="/explore" element={<DataExplorerPage />} />
              <Route path="/competitor-analysis" element={<CompetitorAnalysisPage />} />
              <Route path="/traffic" element={<TrafficPage />} />
              <Route path="/ai-assistant" element={<AIAssistantPage />} />
              <Route path="/market-trends" element={<MarketTrendsPage />} />
              <Route path="/census" element={<CensusPage />} />
              <Route path="/census/:district" element={<CensusDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ApiLogViewer />
            <Toaster />
          </DataCollectionProvider>
        </UserTypeProvider>
      </Router>
    </DistrictSelectionProvider>
  );
}

export default App;
