import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./i18n/config";

const queryClient = new QueryClient();

const routes = ["/", "/calendar", "/converter", "/lucky", "/settings"];

const SwipeHandler = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('input') || 
      target.closest('textarea') || 
      target.closest('[role="dialog"]') ||
      target.closest('[data-vaul-drawer]')
    ) {
      touchStart.current = null;
      return;
    }
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;

    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      const currentIndex = routes.indexOf(location.pathname);
      if (currentIndex === -1) return;

      if (isLeftSwipe && currentIndex < routes.length - 1) {
        navigate(routes[currentIndex + 1]);
      } else if (isRightSwipe && currentIndex > 0) {
        navigate(routes[currentIndex - 1]);
      }
    }

    touchStart.current = null;
    touchEnd.current = null;
  };

  return (
    <div 
      className="min-h-screen flex flex-col overflow-x-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
};

const AppContent = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [direction, setDirection] = useState(0);
  const prevPathname = useRef(location.pathname);
  useTheme();

  useEffect(() => {
    const currentIndex = routes.indexOf(location.pathname);
    const prevIndex = routes.indexOf(prevPathname.current);
    
    if (currentIndex !== -1 && prevIndex !== -1 && currentIndex !== prevIndex) {
      setDirection(currentIndex > prevIndex ? 1 : -1);
    }
    prevPathname.current = location.pathname;
  }, [location.pathname]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10 flex flex-col">
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

      <SwipeHandler>
        <main className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={location.pathname}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full h-full"
            >
              <Routes location={location}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/converter" element={<ConverterPage />} />
                <Route path="/lucky" element={<LuckyDatesPage />} />
                <Route path="/settings" element={<Settings />} />
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