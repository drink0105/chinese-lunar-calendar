import { Solar, Lunar, HolidayUtil } from 'lunar-javascript';
import { translateLunarTerm } from './lunarTranslations';

export const getLunarData = (date: Date, lang: string) => {
  const solar = Solar.fromYmd(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const lunar = solar.getLunar();
  
  const holiday = HolidayUtil.getHoliday(date.getFullYear(), date.getMonth() + 1, date.getDate());
  
  const rawZodiac = lunar.getYearShengXiao();
  const rawSolarTerm = lunar.getJieQi();
  const rawAuspicious = lunar.getDayYi();
  const rawInauspicious = lunar.getDayJi();
  const rawFestivals = lunar.getFestivals();

  return {
    solarDate: solar.toFullString(),
    lunarDate: `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
    lunarYear: `${lunar.getYearInGanZhi()}(${translateLunarTerm(rawZodiac, lang)})年`,
    zodiac: translateLunarTerm(rawZodiac, lang),
    solarTerm: rawSolarTerm ? translateLunarTerm(rawSolarTerm, lang) : null,
    auspicious: rawAuspicious.map(item => translateLunarTerm(item, lang)),
    inauspicious: rawInauspicious.map(item => translateLunarTerm(item, lang)),
    clash: lunar.getDayChongDesc(), // This is a complex string, keeping as is for now
    holiday: holiday ? holiday.getName() : (rawFestivals.length > 0 ? translateLunarTerm(rawFestivals[0], lang) : null),
    isPublicHoliday: !!holiday && !holiday.isWork(),
    lunarMonth: lunar.getMonthInChinese(),
    lunarDay: lunar.getDayInChinese(),
    ganZhiYear: lunar.getYearInGanZhi(),
    ganZhiMonth: lunar.getMonthInGanZhi(),
    ganZhiDay: lunar.getDayInGanZhi(),
  };
};

export const getZodiacEmoji = (zodiac: string) => {
  // We need to match against the Chinese zodiac names since the zodiac prop might be translated
  const emojis: Record<string, string> = {
    '鼠': '🐭', '牛': '🐮', '虎': '🐯', '兔': '🐰', '龙': '🐲', '蛇': '🐍',
    '马': '🐴', '羊': '🐑', '猴': '🐵', '鸡': '🐔', '狗': '🐶', '猪': '🐷',
    'Rat': '🐭', 'Ox': '🐮', 'Tiger': '🐯', 'Rabbit': '🐰', 'Dragon': '🐲', 'Snake': '🐍',
    'Horse': '🐴', 'Goat': '🐑', 'Monkey': '🐵', 'Rooster': '🐔', 'Dog': '🐶', 'Pig': '🐷'
  };
  return emojis[zodiac] || '🧧';
};

export const getMonthDays = (year: number, month: number, lang: string) => {
  const days = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null);
  }
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      lunar: getLunarData(date, lang)
    });
  }
  
  return days;
};

const occasionToYiTerms: Record<string, string[]> = {
  wedding: ["嫁娶", "纳采"],
  moving: ["移徙", "入宅"],
  grandOpening: ["开市"],
  business: ["交易", "立券", "订盟"],
  travel: ["出行"],
  childBirth: ["祈福", "祭祀"],
  renovation: ["修造", "动土", "上梁"],
  vehiclePurchase: ["交易", "出行"],
  signContract: ["订盟", "立券", "交易"],
};

export const findLuckyDates = (occasionKey: string, year: number, month: number) => {
  const luckyDates = [];
  const lastDay = new Date(year, month + 1, 0).getDate();
  const targetTerms = occasionToYiTerms[occasionKey] || [];
  
  for (let i = 1; i <= lastDay; i++) {
    const date = new Date(year, month, i);
    const lunar = Lunar.fromDate(date);
    const yi = lunar.getDayYi();
    
    if (yi.some(item => targetTerms.includes(item))) {
      luckyDates.push(date);
    }
  }
  
  return luckyDates;
};