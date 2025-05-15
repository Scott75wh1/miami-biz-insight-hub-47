
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from '@/hooks/use-toast';
import Dashboard from '@/pages/Dashboard';
import AIAssistantPage from '@/pages/AIAssistantPage';
import { UserTypeProvider } from '@/hooks/useUserType';
import { DistrictSelectionProvider } from '@/hooks/useDistrictSelection';
import { DataCollectionProvider } from '@/hooks/useDataCollection';
import MyBusinessPageContainer from '@/pages/business/MyBusinessPageContainer';
import SettingsPage from '@/pages/SettingsPage';
import DataExplorerPage from '@/pages/DataExplorerPage';
import CensusPage from '@/pages/CensusPage';
import MarketTrendsPage from '@/pages/MarketTrendsPage';
import CompetitorAnalysisPage from '@/pages/CompetitorAnalysisPage';
import TrafficPage from '@/pages/TrafficPage';
import HomePage from '@/pages/Index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/my-business',
    element: <MyBusinessPageContainer />,
  },
  {
    path: '/ai-assistant',
    element: <AIAssistantPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/data-explorer',
    element: <DataExplorerPage />,
  },
  {
    path: '/census',
    element: <CensusPage />,
  },
  {
    path: '/market-trends',
    element: <MarketTrendsPage />,
  },
  {
    path: '/competitor-analysis',
    element: <CompetitorAnalysisPage />,
  },
  {
    path: '/traffic',
    element: <TrafficPage />,
  },
]);

function App() {
  return (
    <UserTypeProvider>
      <DistrictSelectionProvider>
        <DataCollectionProvider>
          <RouterProvider router={router} />
          <Toaster />
        </DataCollectionProvider>
      </DistrictSelectionProvider>
    </UserTypeProvider>
  );
}

export default App;
