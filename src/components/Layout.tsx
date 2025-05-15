import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { ApiSummary } from '@/components/api/ApiSummary';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1">
          <div className="px-4 md:px-0">
            {/* API Status indicator */}
            <div className="container mx-auto my-2">
              <ApiSummary />
            </div>
            {/* Main content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
