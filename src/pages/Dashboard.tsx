import React from 'react';
import { useTranslation } from 'react-i18next';
import { getLunarData, getZodiacEmoji } from '@/utils/lunarUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Info, Utensils, Sparkles } from 'lucide-react';
import AdSlot from '@/components/AdSlot';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const today = new Date();
  const data = getLunarData(today, i18n.language);

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

  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-10 relative">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#C0392B]/10 dark:bg-red-500/10 blur-3xl rounded-full -z-10"
          />
          <h1 className="text-6xl font-black text-[#C0392B] dark:text-red-500 mb-2 drop-shadow-sm">
            {today.getDate()}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 font-bold tracking-widest uppercase text-xs">
            {formattedDate}
          </p>
        </div>

        <Card className="mb-8 border-none shadow-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 overflow-hidden group">
          <div className="h-1.5 bg-gradient-to-r from-[#C0392B] via-[#F39C12] to-[#C0392B] bg-[length:200%_100%] animate-[gradient_3s_linear_infinite]" />
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500 font-black">
                  {t('dashboard.lunar_date')}
                </p>
                <h2 className="text-3xl font-black text-gray-800 dark:text-zinc-100 leading-tight">
                  {data.lunarDate}
                </h2>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-[#F39C12] dark:text-amber-500 font-bold flex items-center gap-1">
                    <Sparkles size={14} /> {data.ganZhiYear} {data.lunarYear}
                  </p>
                </div>
              </div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-7xl drop-shadow-[0_0_25px_rgba(243,156,18,0.4)] filter transition-all duration-500"
              >
                {getZodiacEmoji(data.rawZodiac)}
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-white/20 dark:border-zinc-700/30 shadow-sm group-hover:shadow-md transition-all">
                <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-black uppercase tracking-wider mb-1">{t('dashboard.solar_term')}</p>
                <p className="font-black text-xl text-[#C0392B] dark:text-red-500">{data.solarTerm || '-'}</p>
              </div>
              <div className="bg-white/50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-white/20 dark:border-zinc-700/30 shadow-sm group-hover:shadow-md transition-all relative">
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-black uppercase tracking-wider">{t('dashboard.clashZodiac')}</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={12} className="text-gray-300 dark:text-zinc-600 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-zinc-900 text-white text-[10px] max-w-[180px] p-3 rounded-xl border-none shadow-2xl">
                        {t('dashboard.clash_explanation')}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-black text-lg text-gray-700 dark:text-zinc-200">
                    {data.clash}
                  </p>
                  <span className="text-2xl drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]">{getClashEmoji(data.clash)}</span>
                </div>
              </div>
            </div>

            {data.foodSuggestion && (
              <motion.div 
                whileHover={{ y: -2 }}
                className="mb-8 p-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl border border-amber-100/50 dark:border-amber-900/30 flex items-center gap-4 shadow-sm"
              >
                <div className="bg-[#F39C12] dark:bg-amber-600 text-white p-3 rounded-xl shadow-lg shadow-amber-500/20">
                  <Utensils size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 font-black uppercase tracking-widest">{t('dashboard.recommendation')}</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-tight">{data.foodSuggestion}</p>
                </div>
              </motion.div>
            )}

            {data.isHoliday && (
              <div className="mb-8 p-4 bg-red-50/50 dark:bg-red-900/10 rounded-2xl border border-red-100/50 dark:border-red-900/30 flex items-center gap-4 shadow-sm">
                <div className="bg-[#C0392B] dark:bg-red-600 text-white p-3 rounded-xl shadow-lg shadow-red-500/20">
                  <CalendarIcon size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-red-400 dark:text-red-400 font-black uppercase tracking-widest">{t('dashboard.holiday')}</p>
                  <p className="font-black text-[#C0392B] dark:text-red-500">{data.holidayNames.join(', ')}</p>
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
                <div className="bg-emerald-50/30 dark:bg-emerald-900/5 p-4 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/20">
                  <p className="text-sm text-emerald-900 dark:text-emerald-400 font-medium leading-relaxed">
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
                <div className="bg-rose-50/30 dark:bg-rose-900/5 p-4 rounded-2xl border border-rose-100/50 dark:border-rose-900/20">
                  <p className="text-sm text-rose-900 dark:text-rose-400 font-medium leading-relaxed">
                    {data.inauspicious.join(' • ')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <AdSlot type="banner" className="mb-8 opacity-80 hover:opacity-100 transition-opacity" />
      </motion.div>
      
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