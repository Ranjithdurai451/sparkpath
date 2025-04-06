
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import InitialLoader from "./components/InitialLoader";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import RoadmapResult from "./pages/RoadmapResult";
import ChecklistItemDetail from "./pages/ChecklistItemDetail";
import LegalChecklistItemDetail from "./pages/LegalChecklistItemDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Suspense fallback={<InitialLoader />}>
          <InitialLoader />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/roadmap-result" element={<RoadmapResult />} />
                <Route path="/checklist-item/:itemTitle" element={<ChecklistItemDetail />} />
                <Route path="/legal-checklist-item/:itemTitle" element={<LegalChecklistItemDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </Suspense>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
