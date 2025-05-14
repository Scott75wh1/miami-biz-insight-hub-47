
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DistrictSelectionProvider } from "./hooks/useDistrictSelection";
import Index from "./pages/Index";
import CensusDetail from "./pages/CensusDetail";
// import TrafficPage from "./pages/TrafficPage";
import MyBusinessPage from "./pages/MyBusinessPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DistrictSelectionProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/census" element={<CensusDetail />} />
            {/* Temporarily removed traffic page due to Google Maps API issues */}
            {/* <Route path="/traffic" element={<TrafficPage />} /> */}
            <Route path="/my-business" element={<MyBusinessPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DistrictSelectionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
