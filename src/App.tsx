import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import CreateEvent from "./pages/CreateEvent";
import EventView from "./pages/EventView";

const queryClient = new QueryClient();

function App() {
  // Function to handle case-insensitive routing
  const handleCreateEventRedirect = () => {
    const path = window.location.pathname.toLowerCase();
    if (path === '/create-event' || path === '/create-event/') {
      return <CreateEvent />;
    }
    return <Navigate to="/create-event" replace />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/create-event" replace />} />
            <Route path="/home" element={<Index />} />
            <Route path="/create-event" element={handleCreateEventRedirect()} />
            <Route path="/CreaTE-EVENT" element={handleCreateEventRedirect()} />
            <Route path="/event/:slug" element={<EventView />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;