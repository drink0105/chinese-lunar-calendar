import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { findLuckyDates } from '@/utils/lunarUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Badge from '@/components/Badge';
import AdSlot from '@/components/AdSlot';
import { motion } from 'framer-motion';

const LuckyDatesPage = () => {
  const { t } = useTranslation();
  const [occasion, setOccasion] = useState('');
  const [month, setMonth] = useState(new Date().getMonth().toString());
  const [results, setResults] = useState<Date[]>([]);

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
    const lucky = findLuckyDates(occasion, new Date().getFullYear(), parseInt(month));
    setResults(lucky);
  };

  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-[#C0392B] mb-6 text-center">{t('lucky.title')}</h1>

        <Card className="mb-6 border-none shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">{t('lucky.select_occasion')}</label>
              <Select onValueChange={setOccasion}>
                <SelectTrigger className="rounded-xl border-gray-200">
                  <SelectValue placeholder={t('lucky.select_occasion')} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {occasions.map((o) => (
                    <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">{t('lucky.select_month')}</label>
              <Select onValueChange={setMonth} defaultValue={month}>
                <SelectTrigger className="rounded-xl border-gray-200">
                  <SelectValue placeholder={t('lucky.select_month')} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {new Date(2024, i, 1).toLocaleDateString(undefined, { month: 'long' })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleFind}
              className="w-full bg-[#C0392B] hover:bg-[#A93226] text-white rounded-xl h-12 font-bold"
            >
              {t('lucky.find')}
            </Button>
          </CardContent>
        </Card>

        <AdSlot type="interstitial" className="mb-6" />

        {results.length > 0 && (
          <div className="grid grid-cols-1 gap-3">
            {results.map((date, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-gray-800">
                    {date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                  </p>
                  <p className="text-xs text-gray-400">
                    {date.toLocaleDateString(undefined, { weekday: 'long' })}
                  </p>
                </div>
                <Badge variant="warning">
                  {t('lucky.occasions.' + occasion)}
                </Badge>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LuckyDatesPage;