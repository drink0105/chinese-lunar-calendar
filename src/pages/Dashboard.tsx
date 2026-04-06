import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLunarData, getZodiacEmoji } from '@/utils/lunarUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Info, Utensils, Sparkles, X } from 'lucide-react';
import AdSlot from '@/components/AdSlot';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const [data, setData] = useState<any>(null);
  const [isClashInfoOpen, setIsClashInfoOpen] = useState(false);
  const today = new Date();

  useEffect(() => {
    const loadData = () => {
      const lunarData = getLunarData(today, i18n.language || 'en');
      setData(lunarData);
    };

    // Run immediately and also listen for language changes
    loadData();

    const handleLanguageChange = () => loadData();
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  if (!data) {
    return (
      <div className="pb-32 pt-10 px-4 max-w-md mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const formattedDate = today.toLocaleDateString(i18n.language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getClashEmoji = (clashStr: string) => {
    const animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪', 
                    'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    const found = animals.find(a => clashStr.includes(a));
    return found ? getZodiacEmoji(found) : '';
  };

  const getFestivalSymbol = () => {
    switch(theme) {
      case 'spring': return '🏮';
      case 'dragonboat': return '🛶';
      case 'midautumn': return '🌕';
      default: return null;
    }
  };

  const symbol = getFestivalSymbol();
  const isFestiveTheme = theme === 'spring' || theme === 'dragonboat' || theme === 'midautumn';
  const showWhiteSection = !isDarkMode && isFestiveTheme;

  return (
    <div className="pb-32 pt-10 px-4 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-10 relative">
          {symbol && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-4 left-0 text-4xl drop-shadow-lg z-10"
            >
              {symbol}
            </motion.div>
          )}
          {symbol && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-4 right-0 text-4xl drop-shadow-lg z-10"
            >
              {symbol}
            </motion.div>
          )}
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary/20 blur-3xl rounded-full -z-10"
          />
          <h1 className="text-6xl font-black text-primary mb-2 drop-shadow-sm">
            {today.getDate()}
          </h1>
          <p className="text-muted-foreground font-bold tracking-widest uppercase text-xs">
            {formattedDate}
          </p>
        </div>

        <Card className="mb-8 border-none shadow-2xl bg-card/80 dark:bg-card/40 backdrop-blur-xl border border-white/20 dark:border-white/10 overflow-hidden group rounded-[2.5rem] festive-glow">
          <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-[gradient_3s_linear_infinite]" />
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black">
                  {t('dashboard.lunar_date')}
                </p>
                <h2 className="text-3xl font-black text-foreground leading-tight">
                  {data.lunarDate}
                </h2>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-secondary font-bold flex items-center gap-1">
                    <Sparkles size={14} /> {data.ganZhiYear} {data.lunarYear}
                  </p>
                </div>
              </div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-7xl drop-shadow-[0_0_25px_rgba(var(--secondary),0.4)] filter transition-all duration-500"
              >
                {getZodiacEmoji(data.rawZodiac)}
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-muted/30 p-4 rounded-2xl border border-border/30 shadow-sm group-hover:shadow-md transition-all">
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider mb-1">{t('dashboard.solar_term')}</p>
                <p className="font-black text-xl text-primary">{data.solarTerm || '-'}</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-2xl border border-border/30 shadow-sm group-hover:shadow-md transition-all relative flex flex-col">
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">{t('dashboard.clashZodiac')}</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          onClick={() => setIsClashInfoOpen(true)}
                          className="p-1 -m-1 hover:text-primary transition-colors"
                        >
                          <Info size={12} className="text-muted-foreground/50 cursor-help" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="hidden md:block bg-foreground text-background text-[10px] max-w-[180px] p-3 rounded-xl border-none shadow-2xl">
                        {t('dashboard.clash_explanation')}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex flex-col items-center justify-center flex-1 pt-1">
                  <p className="font-black text-sm text-foreground/80 text-center leading-tight mb-1">
                    {data.clash}
                  </p>
                  <span className="text-3xl drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]">{getClashEmoji(data.clash)}</span>
                </div>
              </div>
            </div>

            {data.foodSuggestion && (
              <motion.div 
                whileHover={{ y: -2 }}
                className="mb-8 p-4 bg-secondary/10 rounded-2xl border border-secondary/20 flex items-center gap-4 shadow-sm"
              >
                <div className="bg-secondary text-secondary-foreground p-3 rounded-xl shadow-lg shadow-secondary/20">
                  <Utensils size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-secondary font-black uppercase tracking-widest">{t('dashboard.recommendation')}</p>
                  <p className="text-sm font-bold text-foreground/90 leading-tight">{data.foodSuggestion}</p>
                </div>
              </motion.div>
            )}

            {data.isHoliday && (
              <div className="mb-8 p-4 bg-primary/10 rounded-2xl border border-primary/20 flex items-center gap-4 shadow-sm">
                <div className="bg-primary text-primary-foreground p-3 rounded-xl shadow-lg shadow-primary/20">
                  <CalendarIcon size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest">{t('dashboard.holiday')}</p>
                  <p className="font-black text-primary">{data.holidayNames.join(', ')}</p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                    {t('dashboard.auspicious')}
                  </Badge>
                </div>
                <div className={cn(
                  "p-4 rounded-2xl border transition-all duration-300",
                  showWhiteSection 
                    ? "bg-white border-gray-200 shadow-sm" 
                    : "bg-emerald-500/5 border-emerald-500/20"
                )}>
                  <p className={cn(
                    "text-sm font-medium leading-relaxed",
                    showWhiteSection ? "text-emerald-800" : "text-emerald-700 dark:text-emerald-400"
                  )}>
                    {data.auspicious.join(' • ')}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-rose-500/20">
                    {t('dashboard.inauspicious')}
                  </Badge>
                </div>
                <div className={cn(
                  "p-4 rounded-2xl border transition-all duration-300",
                  showWhiteSection 
                    ? "bg-white border-gray-200 shadow-sm" 
                    : "bg-rose-500/5 border-rose-500/20"
                )}>
                  <p className={cn(
                    "text-sm font-medium leading-relaxed",
                    showWhiteSection ? "text-rose-800" : "text-rose-700 dark:text-rose-400"
                  )}>
                    {data.inauspicious.join(' • ')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <AdSlot type="banner" className="mb-8 opacity-80 hover:opacity-100 transition-opacity" />
      </motion.div>

      <Drawer open={isClashInfoOpen} onOpenChange={setIsClashInfoOpen}>
        <DrawerContent className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl rounded-t-[2.5rem] border-none shadow-2xl">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 dark:bg-zinc-700 mt-4 mb-2" />
          
          <div className="absolute top-6 right-6 z-50">
            <DrawerClose asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full border border-gray-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all"
              >
                <X size={20} />
              </Button>
            </DrawerClose>
          </div>

          <div className="px-8 pb-12 pt-6">
            <DrawerHeader className="px-0 pb-4">
              <DrawerTitle className="text-primary text-2xl font-black flex items-center gap-3">
                <Info className="text-primary" /> {t('dashboard.clashZodiac')}
              </DrawerTitle>
            </DrawerHeader>
            <div className="space-y-6">
              <div className="p-6 bg-muted/30 rounded-3xl border border-border/50">
                <p className="text-lg font-bold text-foreground leading-relaxed">
                  {t('dashboard.clash_explanation')}
                </p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="text-4xl">{getClashEmoji(data.clash)}</div>
                <div>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">{t('dashboard.clashZodiac')}</p>
                  <p className="text-xl font-black text-primary">{data.clash}</p>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;