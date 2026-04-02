import { Solar, Lunar, HolidayUtil } from 'lunar-javascript';

export const getLunarData = (date: Date) => {
  const solar = Solar.fromYmd(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const lunar = solar.getLunar();
  
  const holiday = HolidayUtil.getHoliday(date.getFullYear(), date.getMonth() + 1, date.getDate());
  
  return {
    solarDate: solar.toFullString(),
    lunarDate: `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
    lunarYear: `${lunar.getYearInGanZhi()}(${lunar.getYearShengXiao()})年`,
    zodiac: lunar.getYearShengXiao(),
    solarTerm: lunar.getJieQi() || null,
    auspicious: lunar.getDayYi(),
    inauspicious: lunar.getDayJi(),
    clash: lunar.getDayChongDesc(),
    holiday: holiday ? holiday.getName() : null,
    isPublicHoliday: !!holiday && !holiday.isWork(),
    lunarMonth: lunar.getMonthInChinese(),
    lunarDay: lunar.getDayInChinese(),
    ganZhiYear: lunar.getYearInGanZhi(),
    ganZhiMonth: lunar.getMonthInGanZhi(),
    ganZhiDay: lunar.getDayInGanZhi(),
  };
};

export const getZodiacEmoji = (zodiac: string) => {
  const emojis: Record<string, string> = {
    '鼠': '🐭', '牛': '🐮', '虎': '🐯', '兔': '🐰', '龙': '🐲', '蛇': '🐍',
    '马': '🐴', '羊': '🐑', '猴': '🐵', '鸡': '🐔', '狗': '🐶', '猪': '🐷'
  };
  return emojis[zodiac] || '🧧';
};

export const getMonthDays = (year: number, month: number) => {
  const days = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Padding for start of month
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null);
  }
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      lunar: getLunarData(date)
    });
  }
  
  return days;
};

export const findLuckyDates = (occasion: string, year: number, month: number) => {
  const luckyDates = [];
  const lastDay = new Date(year, month + 1, 0).getDate();
  
  for (let i = 1; i <= lastDay; i++) {
    const date = new Date(year, month, i);
    const lunar = Lunar.fromDate(date);
    const yi = lunar.getDayYi();
    
    if (yi.some(item => item.includes(occasion) || occasion.includes(item))) {
      luckyDates.push(date);
    }
  }
  
  return luckyDates;
};