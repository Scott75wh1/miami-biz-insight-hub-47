
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DistrictSelectionProvider } from "./hooks/useDistrictSelection";
import { DataCollectionProvider } from "./hooks/useDataCollection";
import ApiLogViewer from "./components/debug/ApiLogViewer";
import Index from "./pages/Index";
import CensusDetail from "./pages/CensusDetail";
import MyBusinessPage from "./pages/MyBusinessPage";
import DataExplorerPage from "./pages/DataExplorerPage";
import NotFound from "./pages/NotFound";
import MarketTrendsPage from "./pages/MarketTrendsPage";
import CompetitorAnalysisPage from "./pages/CompetitorAnalysisPage";
import AIAssistantPage from "./pages/AIAssistantPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DistrictSelectionProvider>
        <DataCollectionProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/census" element={<CensusDetail />} />
              <Route path="/my-business" element={<MyBusinessPage />} />
              <Route path="/explore" element={<DataExplorerPage />} />
              <Route path="/market-trends" element={<MarketTrendsPage />} />
              <Route path="/competitor-analysis" element={<CompetitorAnalysisPage />} />
              <Route path="/ai-assistant" element={<AIAssistantPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <ApiLogViewer />
          <Toaster />
          <Sonner />
        </DataCollectionProvider>
      </DistrictSelectionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
