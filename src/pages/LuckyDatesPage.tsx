import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { findLuckyDates } from '@/utils/lunarUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Badge from '@/components/Badge';
import AdSlot from '@/components/AdSlot';
import { motion } from 'framer-motion';
import { Utensils, Search, Sparkles } from 'lucide-react';

const LuckyDatesPage = () => {
  const { t, i18n } = useTranslation();
  const [occasion, setOccasion] = useState('');
  const [month, setMonth] = useState(new Date().getMonth().toString());
  const [results, setResults] = useState<{date: Date, terms: string[], foodSuggestion?: string}[]>([]);

  const occasions = [
    { id: 'wedding', label: t('lucky.occasions.wedding') },
    { id: 'moving', label: t('lucky.occasions.moving') },
    { id: 'opening', label: t('lucky.occasions.opening') },
    { id: 'business', label: t('lucky.occasions.business') },
    { id: 'travel', label: t('lucky.occasions.travel') },
    { id: 'birth', label: t('lucky.occasions.birth') },
    { id: 'renovation', label: t('lucky.occasions.renovation') },
    { id: 'vehicle', label: t('lucky.occasions.vehicle') },
    { id: 'contract', label: t('lucky.occasions.contract') },
  ];

  const handleFind = () => {
    if (!occasion) return;
    const lucky = findLuckyDates(occasion, new Date().getFullYear(), parseInt(month), i18n.language);
    setResults(lucky);
  };

  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black text-[#C0392B] dark:text-red-500 mb-8 text-center tracking-tight">
          {t('lucky.title')}
        </h1>

        <Card className="mb-10 border-none shadow-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 rounded-[2rem] overflow-hidden">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-2 block px-1">
                {t('lucky.select_occasion')}
              </label>
              <Select onValueChange={setOccasion}>
                <SelectTrigger className="rounded-2xl border-gray-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 h-14 font-bold focus:ring-[#C0392B] dark:focus:ring-red-500">
                  <SelectValue placeholder={t('lucky.select_occasion')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 rounded-2xl">
                  {occasions.map((o) => (
                    <SelectItem key={o.id} value={o.id} className="font-medium">{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-2 block px-1">
                {t('lucky.select_month')}
              </label>
              <Select onValueChange={setMonth} defaultValue={month}>
                <SelectTrigger className="rounded-2xl border-gray-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 h-14 font-bold focus:ring-[#C0392B] dark:focus:ring-red-500">
                  <SelectValue placeholder={t('lucky.select_month')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 rounded-2xl">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SelectItem key={i} value={i.toString()} className="font-medium">
                      {new Date(2024, i, 1).toLocaleDateString(i18n.language, { month: 'long' })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleFind}
              className="w-full bg-gradient-to-r from-[#C0392B] to-[#A93226] hover:from-[#A93226] hover:to-[#C0392B] text-white rounded-2xl h-14 font-black text-lg shadow-xl shadow-red-900/20 hover:shadow-red-500/40 transition-all duration-500 flex items-center gap-3"
            >
              <Search size={20} /> {t('lucky.find')}
            </Button>
          </CardContent>
        </Card>

        <AdSlot type="interstitial" className="mb-10 opacity-80 hover:opacity-100 transition-opacity" />

        {results.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {results.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl p-6 rounded-[1.5rem] shadow-xl border border-white/20 dark:border-zinc-700/50 flex flex-col gap-4 group hover:shadow-amber-500/10 transition-all duration-500"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="font-black text-2xl text-gray-800 dark:text-zinc-100">
                      {item.date.toLocaleDateString(i18n.language, { day: 'numeric', month: 'short' })}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 font-bold uppercase tracking-widest">
                      {item.date.toLocaleDateString(i18n.language, { weekday: 'long' })}
                    </p>
                  </div>
                  <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-none px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest shadow-sm">
                    <Sparkles size={10} className="mr-1" /> {t('lucky.occasions.' + occasion)}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.terms.map((term, idx) => (
                    <span key={idx} className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/10 px-2 py-1 rounded-lg border border-emerald-100/30 dark:border-emerald-900/20">
                      {term}
                    </span>
                  ))}
                </div>

                {item.foodSuggestion && (
                  <div className="p-3 bg-amber-50/50 dark:bg-amber-900/10 rounded-xl border border-amber-100/30 dark:border-amber-900/20 flex items-center gap-3">
                    <Utensils size={14} className="text-[#F39C12] dark:text-amber-500" />
                    <p className="text-[10px] font-bold text-gray-700 dark:text-zinc-300 leading-tight">
                      <span className="font-black text-amber-600 dark:text-amber-500 mr-1">{t('dashboard.food_tradition')}:</span>
                      {item.foodSuggestion}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LuckyDatesPage;