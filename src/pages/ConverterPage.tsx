import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLunarData } from '@/utils/lunarUtils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

const ConverterPage = () => {
  const { t, i18n } = useTranslation();
  const [dateStr, setDateStr] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [result, setResult] = useState<any>(null);

  // Automatically update result when language or selected date changes
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h1 className="text-2xl font-bold text-[#C0392B] mb-6 text-center">{t('converter.title')}</h1>
        
        <Card className="mb-8 border-none shadow-md">
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">
                {t('converter.select_date')}
              </label>
              <Input 
                type="date" 
                value={dateStr} 
                onChange={(e) => setDateStr(e.target.value)}
                className="rounded-xl border-gray-200 focus:ring-[#C0392B] focus:border-[#C0392B]"
              />
            </div>
            <Button 
              onClick={handleConvert}
              className="w-full bg-[#C0392B] hover:bg-[#A93226] text-white rounded-xl h-12 font-bold"
            >
              {t('converter.convert')}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xs font-bold text-gray-400 uppercase mb-3 px-2">{t('converter.lunarResult')}</h2>
            <Card className="border-none shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-500 text-sm">{t('converter.lunarDate')}</span>
                  <span className="font-bold text-gray-800">{result.lunarDate}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-500 text-sm">{t('converter.zodiacYear')}</span>
                  <span className="font-bold text-[#F39C12]">{result.zodiac}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-500 text-sm">{t('converter.solarTerm')}</span>
                  <span className="font-bold text-[#C0392B]">{result.solarTerm || '-'}</span>
                </div>

                {result.foodSuggestion && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-3">
                    <div className="bg-[#F39C12] text-white p-2 rounded-lg">
                      <Utensils size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] text-amber-600 font-bold uppercase">{t('converter.foodTradition')}</p>
                      <p className="text-sm font-medium text-gray-800 leading-tight">{result.foodSuggestion}</p>
                    </div>
                  </div>
                )}

                <div className="pt-2 space-y-4">
                  <div>
                    <p className="text-xs font-bold text-green-600 uppercase mb-1">{t('converter.auspicious')}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{result.auspicious.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-red-600 uppercase mb-1">{t('converter.inauspicious')}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{result.inauspicious.join(', ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ConverterPage;