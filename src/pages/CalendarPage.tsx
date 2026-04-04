import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getMonthDays } from '@/utils/lunarUtils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

  const monthName = currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  const weekDays = [
    t('calendar.sun'), t('calendar.mon'), t('calendar.tue'), 
    t('calendar.wed'), t('calendar.thu'), t('calendar.fri'), t('calendar.sat')
  ];

  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
      >
        <div className="bg-[#C0392B] p-4 flex justify-between items-center text-white">
          <Button variant="ghost" size="icon" onClick={prevMonth} className="text-white hover:bg-white/20">
            <ChevronLeft size={20} />
          </Button>
          <h2 className="font-bold text-lg">{monthName}</h2>
          <Button variant="ghost" size="icon" onClick={nextMonth} className="text-white hover:bg-white/20">
            <ChevronRight size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-7 text-center py-2 bg-gray-50 border-b border-gray-100">
          {weekDays.map((day, i) => (
            <div key={i} className={`text-[10px] font-bold uppercase ${i === 0 || i === 6 ? 'text-[#C0392B]' : 'text-gray-400'}`}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-100">
          {days.map((day, i) => (
            <div
              key={i}
              onClick={() => day && setSelectedDay(day)}
              className={`min-h-[70px] bg-white p-1 flex flex-col items-center justify-start cursor-pointer hover:bg-gray-50 transition-colors ${
                !day ? 'bg-gray-50/50' : ''
              } ${day?.lunar.isHoliday ? 'bg-red-50/50' : ''}`}
            >
              {day && (
                <>
                  <span className={`text-sm font-bold ${day.lunar.isPublicHoliday || day.lunar.isHoliday ? 'text-[#C0392B]' : 'text-gray-700'}`}>
                    {day.date.getDate()}
                  </span>
                  <span className="text-[9px] text-gray-400 truncate w-full text-center">
                    {day.lunar.lunarDay}
                  </span>
                  {day.lunar.solarTerm && (
                    <span className="text-[8px] bg-[#F39C12] text-white px-1 rounded mt-1">
                      {day.lunar.solarTerm}
                    </span>
                  )}
                  {day.lunar.isHoliday && (
                    <div className="w-1.5 h-1.5 bg-[#C0392B] rounded-full mt-1" />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="bg-white max-w-[90vw] rounded-2xl">
          {selectedDay && (
            <>
              <DialogHeader>
                <DialogTitle className="text-[#C0392B] text-xl">
                  {selectedDay.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {selectedDay.lunar.isHoliday && selectedDay.lunar.holidayNames.length > 0 && (
                  <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                    <p className="text-[10px] text-red-400 font-bold uppercase mb-1">{t('dashboard.holiday')}</p>
                    <p className="font-bold text-[#C0392B]">{selectedDay.lunar.holidayNames.join(', ')}</p>
                  </div>
                )}

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">{t('dashboard.lunar_date')}</p>
                    <p className="font-bold text-gray-800">{selectedDay.lunar.lunarDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-bold uppercase">{t('dashboard.zodiac')}</p>
                    <p className="font-bold text-[#F39C12]">{selectedDay.lunar.lunarYear}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 border border-green-100 bg-green-50/50 rounded-xl">
                    <p className="text-[10px] text-green-600 font-bold uppercase mb-1">{t('dashboard.auspicious')}</p>
                    <p className="text-sm text-green-800 leading-relaxed">
                      {selectedDay.lunar.auspicious.join(', ')}
                    </p>
                  </div>
                  <div className="p-3 border border-red-100 bg-red-50/50 rounded-xl">
                    <p className="text-[10px] text-red-600 font-bold uppercase mb-1">{t('dashboard.inauspicious')}</p>
                    <p className="text-sm text-red-800 leading-relaxed">
                      {selectedDay.lunar.inauspicious.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;