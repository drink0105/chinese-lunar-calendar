import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLunarData } from '@/utils/lunarUtils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Utensils, RefreshCw } from 'lucide-react';

const ConverterPage = () => {
  const { t, i18n } = useTranslation();
  const [dateStr, setDateStr] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (selectedDate) {
      setResult(getLunarData(selectedDate, i18n.language));
    }
  }, [selectedDate, i18n.language]);

  const handleConvert = () => {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto">
      <h1 className="text-3xl font-black text-[#C0392B] dark:text-red-500 mb-8 text-center tracking-tight">
        {t('converter.title')}
      </h1>
      
      <Card className="mb-10 border-none shadow-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 rounded-[2rem] overflow-hidden">
        <CardContent className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-2 block px-1">
              {t('converter.select_date')}
            </label>
            <Input 
              type="date" 
              value={dateStr} 
              onChange={(e) => setDateStr(e.target.value)}
              className="rounded-2xl border-gray-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 h-14 text-lg font-bold focus:ring-[#C0392B] dark:focus:ring-red-500 focus:border-[#C0392B] dark:focus:border-red-500 transition-all"
            />
          </div>
          <Button 
            onClick={handleConvert}
            className="w-full bg-gradient-to-r from-[#C0392B] to-[#A93226] hover:from-[#A93226] hover:to-[#C0392B] text-white rounded-2xl h-14 font-black text-lg shadow-xl shadow-red-900/20 hover:shadow-red-500/40 transition-all duration-500 flex items-center gap-3"
          >
            <RefreshCw size={20} /> {t('converter.convert')}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em] px-4">{t('converter.lunarResult')}</h2>
          <Card className="border-none shadow-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 rounded-[2rem] overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-4">
                <span className="text-gray-500 dark:text-zinc-400 font-bold">{t('converter.lunarDate')}</span>
                <span className="font-black text-xl text-gray-800 dark:text-zinc-100">{result.lunarDate}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-4">
                <span className="text-gray-500 dark:text-zinc-400 font-bold">{t('converter.zodiacYear')}</span>
                <span className="font-black text-xl text-[#F39C12] dark:text-amber-500">{result.zodiac}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-4">
                <span className="text-gray-500 dark:text-zinc-400 font-bold">{t('converter.solarTerm')}</span>
                <span className="font-black text-xl text-[#C0392B] dark:text-red-500">{result.solarTerm || '-'}</span>
              </div>

              {result.foodSuggestion && (
                <div className="p-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl border border-amber-100/50 dark:border-amber-900/30 flex items-center gap-4 shadow-sm">
                  <div className="bg-[#F39C12] dark:bg-amber-600 text-white p-3 rounded-xl shadow-lg shadow-amber-500/20">
                    <Utensils size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-amber-600 dark:text-amber-400 font-black uppercase tracking-widest">{t('converter.foodTradition')}</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-tight">{result.foodSuggestion}</p>
                  </div>
                </div>
              )}

              <div className="pt-2 space-y-6">
                <div>
                  <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">{t('converter.auspicious')}</p>
                  <p className="text-sm text-gray-700 dark:text-zinc-300 font-medium leading-relaxed">{result.auspicious.join(' • ')}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-2">{t('converter.inauspicious')}</p>
                  <p className="text-sm text-gray-700 dark:text-zinc-300 font-medium leading-relaxed">{result.inauspicious.join(' • ')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ConverterPage;