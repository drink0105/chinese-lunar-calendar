import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getMonthDays } from '@/utils/lunarUtils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Utensils, X } from 'lucide-react';
import BannerAd from '../components/BannerAd';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from 'framer-motion';

const CalendarPage = () => {
  const { t, i18n } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<any>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getMonthDays(year, month, i18n.language);

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const isToday = (date: Date): boolean => {
    const now = new Date();
    return date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
  };

  const handleMonthChange = (val: string) => {
    setCurrentDate(new Date(year, parseInt(val), 1));
  };

  const handleYearChange = (val: string) => {
    setCurrentDate(new Date(parseInt(val), month, 1));
  };

  const formattedHeader = currentDate.toLocaleDateString(i18n.language, { 
    year: 'numeric', 
    month: 'long' 
  });

  const weekDays = [
    t('calendar.sun'), t('calendar.mon'), t('calendar.tue'), 
    t('calendar.wed'), t('calendar.thu'), t('calendar.fri'), t('calendar.sat')
  ];

  const years = Array.from({ length: 16 }, (_, i) => 2020 + i);
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i.toString(),
    label: new Date(2024, i, 1).toLocaleDateString(i18n.language, { month: 'long' })
  }));

  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto">
      <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-zinc-700/50">
        <div className="bg-gradient-to-br from-[#C0392B] to-[#A93226] p-6 flex flex-col gap-6 shadow-lg">
          <div className="flex justify-between items-center text-white">
            <Button variant="ghost" size="icon" onClick={prevMonth} className="text-white hover:bg-white/20 rounded-full">
              <ChevronLeft size={24} />
            </Button>
            <h2 className="font-black text-2xl tracking-tight">{formattedHeader}</h2>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="text-white hover:bg-white/20 rounded-full">
              <ChevronRight size={24} />
            </Button>
          </div>

          <div className="flex gap-3">
            <Select value={month.toString()} onValueChange={handleMonthChange}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-2xl h-11 focus:ring-0 backdrop-blur-md font-bold">
                <SelectValue placeholder={t('calendar.select_month')} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 rounded-2xl">
                {months.map((m) => (
                  <SelectItem key={m.value} value={m.value} className="font-medium">{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={year.toString()} onValueChange={handleYearChange}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-2xl h-11 focus:ring-0 backdrop-blur-md font-bold">
                <SelectValue placeholder={t('calendar.select_year')} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 rounded-2xl">
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()} className="font-medium">{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-7 text-center py-4 bg-gray-50/50 dark:bg-zinc-800/30 border-b border-gray-100 dark:border-zinc-800">
          {weekDays.map((day, i) => (
            <div key={i} className={`text-[10px] font-black uppercase tracking-widest ${i === 0 || i === 6 ? 'text-[#C0392B] dark:text-red-500' : 'text-gray-400 dark:text-zinc-500'}`}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-100 dark:bg-zinc-800/50">
          {days.map((day, i) => (
            <div
              key={i}
              onClick={() => day && setSelectedDay(day)}
              className={`min-h-[80px] bg-white dark:bg-zinc-900 p-2 flex flex-col items-center justify-start cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all ${
                !day ? 'bg-gray-50/50 dark:bg-zinc-900/50' : ''
              } ${day?.lunar.isHoliday ? 'bg-red-50/30 dark:bg-red-900/5' : ''}`}
            >
              {day && (
                <>
                  <div 
                    className={`text-base font-black ${!isToday(day.date) && (day.lunar.isPublicHoliday || day.lunar.isHoliday) ? 'text-[#C0392B] dark:text-red-500' : 'text-gray-700 dark:text-zinc-300'}`}
                    style={isToday(day.date) ? {
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: '2px solid #C0392B',
                      boxShadow: '0 0 6px rgba(192, 57, 43, 0.4)',
                      fontWeight: 'bold',
                      color: '#C0392B',
                    } : {}}
                  >
                    {day.date.getDate()}
                  </div>
                  <span className="text-[9px] text-gray-400 dark:text-zinc-500 font-bold truncate w-full text-center mt-0.5">
                    {day.lunar.lunarDay}
                  </span>
                  {day.lunar.solarTerm && (
                    <span className="text-[8px] bg-[#F39C12] dark:bg-amber-600 text-white px-1.5 py-0.5 rounded-full mt-1.5 font-black shadow-sm">
                      {day.lunar.solarTerm}
                    </span>
                  )}
                  {day.lunar.isHoliday && (
                    <div className="w-1.5 h-1.5 bg-[#C0392B] dark:bg-red-500 rounded-full mt-1.5 shadow-[0_0_5px] shadow-red-500" />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <BannerAd />

      <Drawer open={!!selectedDay} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DrawerContent className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl max-h-[90vh] rounded-t-[2.5rem] border-none shadow-2xl">
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

          {selectedDay && (
            <div className="overflow-y-auto px-6 pb-12 pt-2 h-full select-text">
              <DrawerHeader className="px-0 pt-4 pb-2">
                <DrawerTitle className="text-[#C0392B] dark:text-red-500 text-2xl font-black pr-12">
                  {selectedDay.date.toLocaleDateString(i18n.language, { month: 'long', day: 'numeric', year: 'numeric' })}
                </DrawerTitle>
              </DrawerHeader>

              <div className="space-y-6 mt-4">
                {selectedDay.lunar.isHoliday && selectedDay.lunar.holidayNames.length > 0 && (
                  <div className="p-4 bg-red-50/50 dark:bg-red-900/10 rounded-2xl border border-red-100/50 dark:border-red-900/30 shadow-sm">
                    <p className="text-[10px] text-red-400 dark:text-red-400 font-black uppercase tracking-widest mb-1">{t('dashboard.holiday')}</p>
                    <p className="font-black text-[#C0392B] dark:text-red-500 text-lg">{selectedDay.lunar.holidayNames.join(', ')}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50/50 dark:bg-zinc-800/50 rounded-2xl border border-gray-100 dark:border-zinc-700/30">
                    <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-black uppercase tracking-widest mb-1">{t('dashboard.lunar_date')}</p>
                    <p className="font-black text-gray-800 dark:text-zinc-100">{selectedDay.lunar.lunarDate}</p>
                  </div>
                  <div className="p-4 bg-gray-50/50 dark:bg-zinc-800/50 rounded-2xl border border-gray-100 dark:border-zinc-700/30">
                    <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-black uppercase tracking-widest mb-1">{t('dashboard.zodiac')}</p>
                    <p className="font-black text-[#F39C12] dark:text-amber-500">{selectedDay.lunar.lunarYear}</p>
                  </div>
                </div>

                {selectedDay.lunar.foodSuggestion && (
                  <div className="p-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl border border-amber-100/50 dark:border-amber-900/30 flex items-center gap-4 shadow-sm">
                    <div className="bg-[#F39C12] dark:bg-amber-600 text-white p-3 rounded-xl shadow-lg shadow-amber-500/20">
                      <Utensils size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-amber-600 dark:text-amber-400 font-black uppercase tracking-widest">{t('dashboard.food_tradition')}</p>
                      <p className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-tight">{selectedDay.lunar.foodSuggestion}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="p-4 border border-emerald-100/50 dark:border-emerald-900/20 bg-emerald-50/30 dark:bg-emerald-900/5 rounded-2xl">
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest mb-2">{t('dashboard.auspicious')}</p>
                    <p className="text-sm text-emerald-900 dark:text-emerald-400 font-medium leading-relaxed">
                      {selectedDay.lunar.auspicious.join(' • ')}
                    </p>
                  </div>
                  <div className="p-4 border border-rose-100/50 dark:border-rose-900/20 bg-rose-50/30 dark:bg-rose-900/5 rounded-2xl">
                    <p className="text-[10px] text-rose-600 dark:text-rose-400 font-black uppercase tracking-widest mb-2">{t('dashboard.inauspicious')}</p>
                    <p className="text-sm text-rose-900 dark:text-rose-400 font-medium leading-relaxed">
                      {selectedDay.lunar.inauspicious.join(' • ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CalendarPage;