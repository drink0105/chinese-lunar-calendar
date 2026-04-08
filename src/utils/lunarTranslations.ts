export const lunarTerms: Record<string, Record<string, string>> = {
  "嫁娶": { en: "Wedding", th: "แต่งงาน", vi: "Kết hôn", ja: "結婚", ko: "결혼", "zh-CN": "嫁娶", "zh-TW": "嫁娶" },
  "移徙": { en: "Moving House", th: "ย้ายบ้าน", vi: "Chuyển nhà", ja: "引越し", ko: "이사", "zh-CN": "移徙", "zh-TW": "移徙" },
  "开市": { en: "Grand Opening", th: "เปิดกิจการ", vi: "Khai trương", ja: "開店", ko: "개업", "zh-CN": "开市", "zh-TW": "开市" },
  "出行": { en: "Travel", th: "เดินทาง", vi: "Du lịch", ja: "旅行", ko: "여행", "zh-CN": "出行", "zh-TW": "出行" },
  "祭祀": { en: "Worship", th: "บูชา", vi: "Cúng tế", ja: "祭祀", ko: "제사", "zh-CN": "祭祀", "zh-TW": "祭祀" },
  "祈福": { en: "Pray for Blessings", th: "อธิษฐานขอพร", vi: "Cầu phúc", ja: "祈福", ko: "기복", "zh-CN": "祈福", "zh-TW": "祈福" },
  "动土": { en: "Break Ground", th: "ฝังรากฐาน", vi: "Khởi công", ja: "地鎮祭", ko: "착공", "zh-CN": "动土", "zh-TW": "动土" },
  "安床": { en: "Install Bed", th: "ติดตั้งเตียง", vi: "Đặt giường", ja: "安床", ko: "안침", "zh-CN": "安床", "zh-TW": "安床" },
  "纳采": { en: "Engagement", th: "หมั้น", vi: "Đính hôn", ja: "結納", ko: "납채", "zh-CN": "纳采", "zh-TW": "纳采" },
  "入宅": { en: "Move Into New Home", th: "เข้าบ้านใหม่", vi: "Vào nhà mới", ja: "入宅", ko: "입택", "zh-CN": "入宅", "zh-TW": "入宅" },
  "安葬": { en: "Burial", th: "ฝังศพ", vi: "An táng", ja: "埋葬", ko: "매장", "zh-CN": "安葬", "zh-TW": "安葬" },
  "修造": { en: "Renovation", th: "ปรับปรุงบ้าน", vi: "Sửa chữa", ja: "修繕", ko: "수리", "zh-CN": "修造", "zh-TW": "修造" },
  "破土": { en: "Break Ground for Tomb", th: "ขุดดิน", vi: "Đào đất", ja: "破土", ko: "파토", "zh-CN": "破土", "zh-TW": "破土" },
  "栽种": { en: "Planting", th: "ปลูกต้นไม้", vi: "Trồng cây", ja: "植栽", ko: "재배", "zh-CN": "栽种", "zh-TW": "栽种" },
  "诸事不宜": { en: "Avoid All Activities", th: "ไม่เป็นมงคล", vi: "Tránh mọi việc", ja: "諸事不宜", ko: "만사불의", "zh-CN": "诸事不宜", "zh-TW": "诸事不宜" },
  "无": { en: "None", th: "ไม่มี", vi: "Không có", ja: "なし", ko: "없음", "zh-CN": "无", "zh-TW": "無" },
};

export const zodiac: Record<string, Record<string, string>> = {
  "鼠": { en: "Rat", th: "หนู", vi: "Chuột", ja: "子", ko: "쥐", "zh-CN": "鼠", "zh-TW": "鼠" },
  "牛": { en: "Ox", th: "วัว", vi: "Trâu", ja: "丑", ko: "소", "zh-CN": "牛", "zh-TW": "牛" },
  "虎": { en: "Tiger", th: "เสือ", vi: "Hổ", ja: "寅", ko: "호랑이", "zh-CN": "虎", "zh-TW": "虎" },
  "兔": { en: "Rabbit", th: "กระต่าย", vi: "Thỏ", ja: "卯", ko: "토끼", "zh-CN": "兔", "zh-TW": "兔" },
  "龙": { en: "Dragon", th: "มังกร", vi: "Rồng", ja: "辰", ko: "용", "zh-CN": "龙", "zh-TW": "龙" },
  "蛇": { en: "Snake", th: "งู", vi: "Rắn", ja: "巳", ko: "뱀", "zh-CN": "蛇", "zh-TW": "蛇" },
  "马": { en: "Horse", th: "ม้า", vi: "Ngựa", ja: "午", ko: "말", "zh-CN": "马", "zh-TW": "马" },
  "羊": { en: "Goat", th: "แพะ", vi: "Dê", ja: "未", ko: "양", "zh-CN": "羊", "zh-TW": "羊" },
  "猴": { en: "Monkey", th: "ลิง", vi: "Khỉ", ja: "申", ko: "원숭이", "zh-CN": "猴", "zh-TW": "猴" },
  "鸡": { en: "Rooster", th: "ไก่", vi: "Gà", ja: "酉", ko: "닭", "zh-CN": "鸡", "zh-TW": "鸡" },
  "狗": { en: "Dog", th: "หมา", vi: "Chó", ja: "戌", ko: "개", "zh-CN": "狗", "zh-TW": "狗" },
  "猪": { en: "Pig", th: "หมู", vi: "Lợn", ja: "亥", ko: "돼지", "zh-CN": "猪", "zh-TW": "猪" },
};

export const lunarMonthNames: Record<number, Record<string, string>> = {
  1: { en: "1st Month", th: "เดือน 1", vi: "Tháng 1", ja: "睦月", ko: "1월", "zh-CN": "正", "zh-TW": "正" },
  2: { en: "2nd Month", th: "เดือน 2", vi: "Tháng 2", ja: "如月", ko: "2월", "zh-CN": "二", "zh-TW": "二" },
  3: { en: "3rd Month", th: "เดือน 3", vi: "Tháng 3", ja: "弥生", ko: "3월", "zh-CN": "三", "zh-TW": "三" },
  4: { en: "4th Month", th: "เดือน 4", vi: "Tháng 4", ja: "卯月", ko: "4월", "zh-CN": "四", "zh-TW": "四" },
  5: { en: "5th Month", th: "เดือน 5", vi: "Tháng 5", ja: "皐月", ko: "5월", "zh-CN": "五", "zh-TW": "五" },
  6: { en: "6th Month", th: "เดือน 6", vi: "Tháng 6", ja: "水無月", ko: "6월", "zh-CN": "六", "zh-TW": "六" },
  7: { en: "7th Month", th: "เดือน 7", vi: "Tháng 7", ja: "文月", ko: "7월", "zh-CN": "七", "zh-TW": "七" },
  8: { en: "8th Month", th: "เดือน 8", vi: "Tháng 8", ja: "葉月", ko: "8월", "zh-CN": "八", "zh-TW": "八" },
  9: { en: "9th Month", th: "เดือน 9", vi: "Tháng 9", ja: "長月", ko: "9월", "zh-CN": "九", "zh-TW": "九" },
  10: { en: "10th Month", th: "เดือน 10", vi: "Tháng 10", ja: "神無月", ko: "10월", "zh-CN": "十", "zh-TW": "十" },
  11: { en: "11th Month", th: "เดือน 11", vi: "Tháng 11", ja: "霜月", ko: "11월", "zh-CN": "十一", "zh-TW": "十一" },
  12: { en: "12th Month", th: "เดือน 12", vi: "Tháng 12", ja: "師走", ko: "12월", "zh-CN": "腊", "zh-TW": "腊" },
};

export const lunarDayNames: Record<number, Record<string, string>> = {
  1: { en: "1st", th: "วันที่ 1", vi: "Ngày 1", ja: "初一", ko: "초하루", "zh-CN": "初一", "zh-TW": "初一" },
  15: { en: "15th", th: "วันที่ 15", vi: "Ngày 15", ja: "十五", ko: "보름", "zh-CN": "十五", "zh-TW": "十五" },
  30: { en: "30th", th: "วันที่ 30", vi: "Ngày 30", ja: "三十", ko: "그믐", "zh-CN": "三十", "zh-TW": "三十" },
};

export const jieqiMap: Record<string, Record<string, string>> = {
  "立春": { en: "Start of Spring", th: "เริ่มต้นฤดูใบไม้ผลิ", vi: "Lập Xuân", ja: "立春", ko: "입춘", "zh-CN": "立春", "zh-TW": "立春" },
  "春分": { en: "Spring Equinox", th: "วสันตวิษุวัต", vi: "Xuân Phân", ja: "春分", ko: "춘분", "zh-CN": "春分", "zh-TW": "春分" },
  "立夏": { en: "Start of Summer", th: "เริ่มต้นฤดูร้อน", vi: "Lập Hạ", ja: "立夏", ko: "입하", "zh-CN": "立夏", "zh-TW": "立夏" },
  "夏至": { en: "Summer Solstice", th: "อายันครีษมา", vi: "Hạ Chí", ja: "夏至", ko: "하지", "zh-CN": "夏至", "zh-TW": "夏至" },
  "立秋": { en: "Start of Autumn", th: "เริ่มต้นฤดูใบไม้ร่วง", vi: "Lập Thu", ja: "立秋", ko: "입추", "zh-CN": "立秋", "zh-TW": "立秋" },
  "秋分": { en: "Autumn Equinox", th: "วสันตวิษุวัตฤดูใบไม้ร่วง", vi: "Thu Phân", ja: "秋分", ko: "추분", "zh-CN": "秋分", "zh-TW": "秋分" },
  "立冬": { en: "Start of Winter", th: "เริ่มต้นฤดูหนาว", vi: "Lập Đông", ja: "立冬", ko: "입동", "zh-CN": "立冬", "zh-TW": "立冬" },
  "冬至": { en: "Winter Solstice", th: "อายันเหมา", vi: "Đông Chí", ja: "冬至", ko: "동지", "zh-CN": "冬至", "zh-TW": "冬至" },
};

export const festivalsMap: Record<string, Record<string, string>> = {
  "春节": { en: "Spring Festival", th: "ตรุษจีน", vi: "Tết Nguyên Đán", ja: "春節", ko: "설날", "zh-CN": "春节", "zh-TW": "春节" },
  "端午节": { en: "Dragon Boat Festival", th: "เทศกาลเรือมังกร", vi: "Tết Đoan Ngọ", ja: "端午節", ko: "단오", "zh-CN": "端午节", "zh-TW": "端午节" },
  "中秋节": { en: "Mid-Autumn Festival", th: "เทศกาลไหว้พระจันทร์", vi: "Tết Trung Thu", ja: "中秋節", ko: "추석", "zh-CN": "中秋节", "zh-TW": "中秋节" },
};

export const foodSuggestions: Record<string, Record<string, string>> = {
  "春节": { 
    en: "Eat dumplings (饺子) for wealth", 
    ja: "富を願って餃子を食べましょう", 
    ko: "재물을 기원하며 만두를 드세요",
    "zh-CN": "吃饺子，寓意招财进宝",
    "zh-TW": "吃餃子，寓意招財進寶"
  },
  "中秋节": { 
    en: "Eat mooncakes for reunion", 
    ja: "団らんを願って月餅を食べましょう", 
    ko: "화합을 기원하며 월병을 드세요",
    "zh-CN": "吃月饼，寓意团圆",
    "zh-TW": "吃月餅，寓意團圓"
  },
};

export const translateLunarTerm = (term: string, lang: string): string => {
  const allMaps = [lunarTerms, zodiac, jieqiMap, festivalsMap];
  for (const map of allMaps) {
    if (map[term]) {
      const translated = map[term][lang] || map[term]['en'];
      if (translated) return translated;
    }
  }
  return term;
};

export const translateLunarTermForFood = (term: string, lang: string): string => {
  if (foodSuggestions[term]) {
    return foodSuggestions[term][lang] || foodSuggestions[term]['en'] || "";
  }
  return "";
};