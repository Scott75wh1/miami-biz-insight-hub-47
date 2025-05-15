
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/pages/Dashboard';
import AIAssistantPage from '@/pages/AIAssistantPage';
import { UserTypeProvider } from '@/hooks/useUserType';
import { DistrictSelectionProvider } from '@/hooks/useDistrictSelection';
import { DataCollectionProvider } from '@/hooks/useDataCollection';
import MyBusinessPageContainer from '@/pages/business/MyBusinessPageContainer';
import SettingsPage from '@/pages/SettingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
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
