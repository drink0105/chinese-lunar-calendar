import { Solar, Lunar, HolidayUtil } from 'lunar-javascript';
import { translateLunarTerm } from './lunarTranslations';
import i18n from 'i18next';

function parseAndTranslateChong(chongDesc: string, lang: string): string {
  if (!chongDesc) return '';
  // getDayChongDesc() returns format like "冲牛(辛丑)煞北"
  const match = chongDesc.match(/冲(.+?)[（(]/);
  if (!match) return chongDesc;
  
  const chineseAnimal = match[1];
  const translatedAnimal = translateLunarTerm(chineseAnimal, lang);
  
  if (lang === 'zh-CN' || lang === 'zh-TW') return chongDesc;
  
  const ganZhiMatch = chongDesc.match(/[（(](.+?)[）)]/);
  const ganZhi = ganZhiMatch ? ganZhiMatch[1] : '';
  return `${translatedAnimal} (${ganZhi})`;
}

export const getLunarData = (date: Date, lang: string = 'en') => {
  const solar = Solar.fromYmd(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const lunar = solar.getLunar();
  
  const holiday = HolidayUtil.getHoliday(date.getFullYear(), date.getMonth() + 1, date.getDate());
  
  const rawZodiac = lunar.getYearShengXiao();
  const rawSolarTerm = lunar.getJieQi();
  const rawAuspicious = lunar.getDayYi();
  const rawInauspicious = lunar.getDayJi();
  const rawFestivals = lunar.getFestivals();

  // Fix 1: Lunar date display
  let lunarDateStr = '';
  if (lang === 'zh-CN' || lang === 'zh-TW') {
    lunarDateStr = `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
  } else {
    const m = lunar.getMonth();
    const d = lunar.getDay();
    if (lang === 'th') {
      lunarDateStr = `เดือน ${m} วันที่ ${d}`;
    } else if (lang === 'vi') {
      lunarDateStr = `Tháng ${m}, Ngày ${d}`;
    } else {
      lunarDateStr = `Month ${m}, Day ${d}`;
    }
  }

  // Fix 2: Year display
  let lunarYearStr = '';
  const translatedZodiac = translateLunarTerm(rawZodiac, lang);
  if (lang === 'zh-CN' || lang === 'zh-TW') {
    lunarYearStr = `${lunar.getYearInGanZhi()}(${rawZodiac})年`;
  } else if (lang === 'en') {
    lunarYearStr = `${lunar.getYearInGanZhi()} — Year of the ${translatedZodiac}`;
  } else {
    lunarYearStr = translatedZodiac;
  }

  // Fix 3: Solar Term fallback
  const solarTermStr = rawSolarTerm 
    ? translateLunarTerm(rawSolarTerm, lang) 
    : i18n.t('dashboard.noSolarTerm', { lng: lang });

  return {
    solarDate: solar.toFullString(),
    lunarDate: lunarDateStr,
    lunarYear: lunarYearStr,
    zodiac: translatedZodiac,
    solarTerm: solarTermStr,
    auspicious: rawAuspicious.map(item => translateLunarTerm(item, lang)),
    inauspicious: rawInauspicious.map(item => translateLunarTerm(item, lang)),
    clash: parseAndTranslateChong(lunar.getDayChongDesc(), lang),
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
  vehicle: ["交易", "纳畜", "安机械"],
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