import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import ConverterPage from "./pages/ConverterPage";
import LuckyDatesPage from "./pages/LuckyDatesPage";
import Settings from "./pages/Settings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import BlogIndex from "./components/blog/BlogIndex";
import ArticlePage from "./components/blog/ArticlePage";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";
import ConsentBanner from "./components/ConsentBanner";
import LanguageSelector from "./components/LanguageSelector";
import BlogNav from "./components/blog/BlogNav";
import { useTranslation } from "react-i18next";
import { useTheme } from "./hooks/use-theme";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef } from "react";
import "./i18n/config";

const queryClient = new QueryClient();

const tabOrder = ["/", "/calendar", "/converter", "/lucky"];

const SwipeHandler = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY.current);

    // Thresholds: 30px horizontal, 60px vertical tolerance
    if (Math.abs(deltaX) < 30 || deltaY > 60) return;

    const currentIndex = tabOrder.indexOf(location.pathname);
    if (currentIndex === -1) return;

    if (deltaX < 0) {
      // Swiped left — go to next tab
      const nextIndex = (currentIndex + 1) % tabOrder.length;
      navigate(tabOrder[nextIndex]);
    } else {
      // Swiped right — go to previous tab
      const prevIndex = (currentIndex - 1 + tabOrder.length) % tabOrder.length;
      navigate(tabOrder[prevIndex]);
    }
  };

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden"
      style={{ touchAction: 'pan-y' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};

const AppContent = () => {
  const { t } = useTranslation();
  const location = useLocation();
  useTheme();

  const variants = {
    initial: {
      opacity: 0,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0,
      scale: 1.02
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10 flex flex-col">
      <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-xl border-b border-border/50 px-4 h-14 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">
            L
          </div>
          <span className="font-bold tracking-tight">{t('app.name')}</span>
          <BlogNav />
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shadow-inner">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse shadow-[0_0_8px] shadow-secondary" />
          </div>
        </div>
      </header>

      <SwipeHandler>
        <main className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.2,
                ease: "easeInOut"
              }}
              className="w-full h-full overflow-y-auto"
            >
              <Routes location={location}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/converter" element={<ConverterPage />} />
                <Route path="/lucky" element={<LuckyDatesPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:slug" element={<ArticlePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </SwipeHandler>

      <ConsentBanner />
      <BottomNav />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;