import React from 'react';
import { useTranslation } from 'react-i18next';
import { getLunarData, getZodiacEmoji } from '@/utils/lunarUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Info, Utensils } from 'lucide-react';
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

  // Extract animal from clash string to get emoji
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
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#C0392B] mb-2">{today.getDate()}</h1>
          <p className="text-gray-500 font-medium">{formattedDate}</p>
        </div>

        <Card className="mb-6 border-none shadow-lg bg-gradient-to-br from-white to-gray-50 overflow-hidden">
          <div className="h-2 bg-[#C0392B]" />
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">
                  {t('dashboard.lunar_date')}
                </p>
                <h2 className="text-2xl font-bold text-gray-800">
                  {data.lunarDate}
                </h2>
                <p className="text-sm text-[#F39C12] font-medium">
                  {data.ganZhiYear} {data.lunarYear}
                </p>
              </div>
              <div className="text-4xl bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                {getZodiacEmoji(data.rawZodiac)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">{t('dashboard.solar_term')}</p>
                <p className="font-bold text-[#C0392B]">{data.solarTerm || '-'}</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm relative group">
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{t('dashboard.clashZodiac')}</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={10} className="text-gray-300 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-800 text-white text-[10px] max-w-[150px] p-2 rounded-lg border-none">
                        {t('dashboard.clash_explanation')}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="font-bold text-gray-700 flex items-center gap-1">
                  {data.clash} {getClashEmoji(data.clash)}
                </p>
                <p className="text-[8px] text-gray-400 mt-1 leading-tight italic">
                  {t('dashboard.clash_explanation')}
                </p>
              </div>
            </div>

            {data.foodSuggestion && (
              <div className="mb-6 p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-3">
                <div className="bg-[#F39C12] text-white p-2 rounded-lg">
                  <Utensils size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-amber-600 font-bold uppercase">{t('dashboard.recommendation')}</p>
                  <p className="text-sm font-medium text-gray-800 leading-tight">{data.foodSuggestion}</p>
                </div>
              </div>
            )}

            {data.isHoliday && (
              <div className="mb-6 p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-3">
                <div className="bg-[#C0392B] text-white p-2 rounded-lg">
                  <CalendarIcon size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-red-400 font-bold uppercase">{t('dashboard.holiday')}</p>
                  <p className="font-bold text-[#C0392B]">{data.holidayNames.join(', ')}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-500 hover:bg-green-600 text-white border-none">
                    {t('dashboard.auspicious')}
                  </Badge>
                </div>
                <div className="bg-green-50/50 p-3 rounded-xl border border-green-100">
                  <p className="text-sm text-green-800 leading-relaxed">
                    {data.auspicious.join(', ')}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-red-500 hover:bg-red-600 text-white border-none">
                    {t('dashboard.inauspicious')}
                  </Badge>
                </div>
                <div className="bg-red-50/50 p-3 rounded-xl border border-red-100">
                  <p className="text-sm text-red-800 leading-relaxed">
                    {data.inauspicious.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <AdSlot type="banner" className="mb-6" />
      </motion.div>
    </div>
  );
};

export default Dashboard;