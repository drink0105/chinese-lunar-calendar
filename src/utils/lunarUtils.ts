import { Solar, Lunar, HolidayUtil } from 'lunar-javascript';
import { translateLunarTerm, lunarMonthNames, lunarDayNames, zodiac } from './lunarTranslations';
import i18n from 'i18next';

const getTranslatedLunarDate = (lunar: any, lang: string): string => {
  const monthNum = Math.abs(lunar.getMonth());
  const isLeap = lunar.getMonth() < 0;
  const dayNum = lunar.getDay();

  if (lang === 'zh-CN' || lang === 'zh-TW') {
    const leapStr = isLeap ? '闰' : '';
    return `${leapStr}${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
  }

  // Automatic for en/th/vi
  let monthStr = lunarMonthNames[monthNum]?.[lang] || `${monthNum}th Month`;
  if (isLeap) monthStr = `Leap ${monthStr}`;

  const ordinal = (n: number) => n + (['th','st','nd','rd'][((n%100)-20)%10] || ['th','st','nd','rd'][n%10] || 'th');
  const dayStr = lang === 'en' ? ordinal(dayNum) : (lunarDayNames[dayNum]?.[lang] || `${dayNum}`);

  if (lang === 'vi') return `${dayStr}, ${monthStr}`;
  if (lang === 'th') return `${monthStr}, ${dayStr}`;
  return `${monthStr}, ${dayStr}`;
};

const getTranslatedZodiac = (shengxiao: string, lang: string) => {
  return zodiac[shengxiao]?.[lang] || shengxiao;
};

const getTranslatedClash = (chongDesc: string, lang: string): string => {
  if (!chongDesc) return '';
  if (lang === 'zh-CN' || lang === 'zh-TW') return chongDesc;

  // Extract the animal part (the last Chinese character)
  const animalMatch = chongDesc.match(/([鼠牛虎兔龙蛇马羊猴鸡狗猪])/);
  if (animalMatch && animalMatch[1]) {
    const animal = animalMatch[1];
    const translatedAnimal = zodiac[animal]?.[lang] || animal;

    // Replace only the animal part, keep the (GanZhi) prefix as-is
    return chongDesc.replace(animal, translatedAnimal);
  }

  // Fallback: try to translate the whole thing if it's just an animal
  return zodiac[chongDesc]?.[lang] || chongDesc;
};

export const getLunarData = (date: Date, lang: string = 'en') => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();
  
  const holiday = HolidayUtil.getHoliday(year, month, day);
  
  let holidayNames: string[] = [
    ...(solar.getFestivals() || []),
    ...(lunar.getFestivals() || []),
    ...(lunar.getOtherFestivals() || [])
  ];
  
  if (holiday) holidayNames.push(holiday.getName());

  // === ENHANCED DETECTION FOR MAJOR HOLIDAYS ===
  // 1. Explicit solar term check (fixes Qingming and similar)
  const jieqi = lunar.getJieQi();
  if (jieqi === "清明") holidayNames.push("清明节");

  // 2. Major holiday override map (safety net for future years)
  const majorHolidaysOverride: Record<string, string> = {
    "0101": "元旦节",     // New Year's Day
    "0501": "劳动节",     // Labor Day
    "1001": "国庆节",     // National Day
    "0308": "妇女节",     // Women's Day
    "0504": "青年节",     // Youth Day
    "0601": "儿童节",     // Children's Day
    "0619": "父亲节",     // Father's Day fallback
    "0620": "父亲节",     // Father's Day fallback
    "1225": "圣诞节",     // Christmas
    "1224": "平安夜",     // Christmas Eve
  };

  const dateKey = `${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
  if (majorHolidaysOverride[dateKey]) {
    holidayNames.push(majorHolidaysOverride[dateKey]);
  }

  // Unique and translate
  const translatedHolidays = Array.from(new Set(holidayNames))
    .map(h => translateLunarTerm(h, lang))
    .filter(Boolean);

  const rawZodiac = lunar.getYearShengXiao();
  const rawSolarTerm = lunar.getJieQi();
  const rawAuspicious = lunar.getDayYi();
  const rawInauspicious = lunar.getDayJi();

  const translatedZodiac = getTranslatedZodiac(rawZodiac, lang);
  const solarTermStr = rawSolarTerm 
    ? translateLunarTerm(rawSolarTerm, lang) 
    : i18n.t('dashboard.noSolarTerm', { lng: lang });

  return {
    solarDate: solar.toFullString(),
    lunarDate: getTranslatedLunarDate(lunar, lang),
    lunarYear: `${lunar.getYearInGanZhi()} (${translatedZodiac})`,
    zodiac: translatedZodiac,
    solarTerm: solarTermStr,
    auspicious: rawAuspicious.map(item => translateLunarTerm(item, lang)),
    inauspicious: rawInauspicious.map(item => translateLunarTerm(item, lang)),
    clash: getTranslatedClash(lunar.getDayChongDesc(), lang),
    isHoliday: translatedHolidays.length > 0,
    holidayNames: translatedHolidays,
    isPublicHoliday: !!holiday && !holiday.isWork(),
    lunarMonth: lunar.getMonthInChinese(),
    lunarDay: lunar.getDayInChinese(),
    ganZhiYear: lunar.getYearInGanZhi(),
    ganZhiMonth: lunar.getMonthInGanZhi(),
    ganZhiDay: lunar.getDayInGanZhi(),
    rawZodiac: rawZodiac
  };
};

export const getZodiacEmoji = (zodiac: string) => {
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
  wedding: ["嫁娶", "纳采", "问名", "纳婿"],
  moving: ["移徙", "入宅", "安床"],
  opening: ["开市", "开光", "挂匾"],
  business: ["交易", "立券", "订盟", "开市", "求财"],
  travel: ["出行", "乘船", "渡水"],
  birth: ["祈福", "祭祀", "祈嗣"],
  renovation: ["修造", "动土", "上梁", "起基", "定磉", "竖柱"],
  vehicle: ["出行", "交易", "纳财"],
  contract: ["订盟", "立券", "交易", "纳采"],
};

export const findLuckyDates = (occasionKey: string, year: number, month: number, lang: string = 'en') => {
  const luckyDates = [];
  const lastDay = new Date(year, month + 1, 0).getDate();
  const targetTerms = occasionToYiTerms[occasionKey] || [];
  
  for (let i = 1; i <= lastDay; i++) {
    const date = new Date(year, month, i);
    const lunar = Lunar.fromDate(date);
    const yi = lunar.getDayYi();
    
    if (yi.some(item => targetTerms.includes(item))) {
      const translatedYi = yi
        .filter(item => targetTerms.includes(item))
        .map(item => translateLunarTerm(item, lang));
        
      luckyDates.push({
        date,
        terms: translatedYi
      });
    }
  }
  
  return luckyDates;
};