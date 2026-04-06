import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import ConverterPage from "./pages/ConverterPage";
import LuckyDatesPage from "./pages/LuckyDatesPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";
import ConsentBanner from "./components/ConsentBanner";
import LanguageSelector from "./components/LanguageSelector";
import { useTranslation } from "react-i18next";
import { useTheme } from "./hooks/use-theme";
import "./i18n/config";

const queryClient = new QueryClient();

const App = () => {
  const { t } = useTranslation();
  useTheme(); // Initialize theme system

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10">
            <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-xl border-b border-border/50 px-4 h-14 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">
                  L
                </div>
                <span className="font-bold tracking-tight">{t('app.name')}</span>
              </div>
              <div className="flex items-center gap-2">
                <LanguageSelector />
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shadow-inner">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse shadow-[0_0_8px] shadow-secondary" />
                </div>
              </div>
            </header>

            <main className="relative">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/converter" element={<ConverterPage />} />
                <Route path="/lucky" element={<LuckyDatesPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <ConsentBanner />
            <BottomNav />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;