const terms: Record<string, Record<string, string>> = {
  "嫁娶": { en: "Wedding", th: "แต่งงาน", vi: "Kết hôn" },
  "移徙": { en: "Moving House", th: "ย้ายบ้าน", vi: "Chuyển nhà" },
  "开市": { en: "Grand Opening", th: "เปิดกิจการ", vi: "Khai trương" },
  "出行": { en: "Travel", th: "เดินทาง", vi: "Du lịch" },
  "祭祀": { en: "Worship/Sacrifice", th: "บูชา", vi: "Cúng tế" },
  "祈福": { en: "Pray for Blessings", th: "อธิษฐาน", vi: "Cầu phúc" },
  "动土": { en: "Break Ground", th: "ฝังรากฐาน", vi: "Khởi công" },
  "安床": { en: "Install Bed", th: "ติดตั้งเตียง", vi: "Đặt giường" },
  "纳采": { en: "Marriage Engagement", th: "หมั้น", vi: "Đính hôn" },
  "入宅": { en: "Move Into New Home", th: "เข้าบ้านใหม่", vi: "Vào nhà mới" },
  "安葬": { en: "Burial", th: "ฝังศพ", vi: "Chôn cất" },
  "修造": { en: "Renovation", th: "ปรับปรุงบ้าน", vi: "Sửa chữa" },
  "破土": { en: "Break Ground for Tomb", th: "ขุดดิน", vi: "Đào đất" },
  "栽种": { en: "Planting", th: "ปลูกต้นไม้", vi: "Trồng cây" },
  "伐木": { en: "Lumbering", th: "ตัดไม้", vi: "Chặt gỗ" },
  "捕鱼": { en: "Fishing", th: "ตกปลา", vi: "Đánh cá" },
  "畜牧": { en: "Livestock Farming", th: "เลี้ยงสัตว์", vi: "Chăn nuôi" },
  "纳畜": { en: "Buy Livestock", th: "ซื้อสัตว์เลี้ยง", vi: "Mua gia súc" },
  "经络": { en: "Medical Treatment", th: "รักษาโรค", vi: "Chữa bệnh" },
  "解除": { en: "Cleansing Ritual", th: "พิธีชำระล้าง", vi: "Giải trừ" },
  "沐浴": { en: "Bathing Ritual", th: "อาบน้ำชำระร่างกาย", vi: "Tắm rửa" },
  "整容": { en: "Haircut/Beauty", th: "ตัดผม", vi: "Cắt tóc" },
  "冠笄": { en: "Coming of Age Ceremony", th: "พิธีบรรลุนิติภาวะ", vi: "Lễ trưởng thành" },
  "订盟": { en: "Sign Contract", th: "ทำสัญญา", vi: "Ký hợp đồng" },
  "立券": { en: "Make Agreement", th: "ทำข้อตกลง", vi: "Lập giao kèo" },
  "交易": { en: "Business Trade", th: "ธุรกรรม", vi: "Giao dịch" },
  "求财": { en: "Seek Wealth", th: "แสวงหาโชคลาภ", vi: "Cầu tài lộc" },
  "开仓": { en: "Open Warehouse", th: "เปิดคลังสินค้า", vi: "Mở kho" },
  "出货财": { en: "Ship Goods", th: "ส่งสินค้า", vi: "Xuất hàng" },
  "安机械": { en: "Install Machinery", th: "ติดตั้งเครื่องจักร", vi: "Lắp máy móc" },
  "词讼": { en: "Lawsuit/Legal Matters", th: "คดีความ", vi: "Kiện tụng" },
  "诸事不宜": { en: "Inauspicious — Avoid All Activities", th: "ไม่เป็นมงคล", vi: "Tránh mọi việc" },
  "上梁": { en: "Roof Installation", th: "ติดตั้งหลังคา", vi: "Đặt đòn nóc" },
  "开光": { en: "Consecration Ceremony", th: "พิธีเปิด", vi: "Khai quang" },
  "塑绘": { en: "Sculpting/Painting", th: "ปั้น/วาด", vi: "Điêu khắc" },
  "针灸": { en: "Acupuncture", th: "การฝังเข็ม", vi: "Châm cứu" },
  "拆卸": { en: "Demolition", th: "รื้อถอน", vi: "Phá dỡ" },
  "置产": { en: "Buy Property", th: "ซื้ออสังหาริมทรัพย์", vi: "Mua bất động sản" },
  "造车器": { en: "Make Vehicles/Tools", th: "ทำยานพาหนะ", vi: "Chế tạo xe cộ" },
  "理发": { en: "Haircut", th: "ตัดผม", vi: "Cắt tóc" },
  "合寿木": { en: "Make Coffin", th: "ทำโลงศพ", vi: "Làm áo quan" },
  "破屋": { en: "Demolish House", th: "รื้อถอนบ้าน", vi: "Phá nhà" },
  "坏垣": { en: "Break Down Walls", th: "รื้อกำแพง", vi: "Phá tường" },
  "余事勿取": { en: "Avoid Other Activities", th: "หลีกเลี่ยงกิจกรรมอื่น", vi: "Tránh việc khác" },
  "行丧": { en: "Funeral Procession", th: "ขบวนศพ", vi: "Đưa tang" },
  "出师": { en: "Deploy Troops", th: "ส่งทหาร", vi: "Xuất quân" },
  "起基": { en: "Lay Foundation", th: "วางรากฐาน", vi: "Đặt móng" },
  "定磉": { en: "Set Foundation Stones", th: "วางหินรากฐาน", vi: "Đặt đá nền" },
  "竖柱": { en: "Erect Pillars", th: "ตั้งเสา", vi: "Dựng cột" },
  "开池": { en: "Dig Pool/Pond", th: "ขุดสระ", vi: "Đào ao" },
  "放水": { en: "Release Water", th: "ปล่อยน้ำ", vi: "Xả nước" },
  "乘船": { en: "Boat Travel", th: "เดินทางทางเรือ", vi: "Đi thuyền" },
  "渡水": { en: "Cross Water", th: "ข้ามน้ำ", vi: "Vượt sông" },
  "求医": { en: "Seek Medical Help", th: "ขอความช่วยเหลือทางการแพทย์", vi: "Khám bệnh" },
  "治病": { en: "Medical Treatment", th: "รักษาโรค", vi: "Điều trị bệnh" },
  "开渠": { en: "Dig Canal", th: "ขุดคลอง", vi: "Đào kênh" },
  "安门": { en: "Install Door", th: "ติดตั้งประตู", vi: "Lắp cửa" },
  "修仓": { en: "Repair Warehouse", th: "ซ่อมคลัง", vi: "Sửa kho" },
  "纳婿": { en: "Welcome Son-in-law", th: "ต้อนรับลูกเขย", vi: "Đón rể" },
  "归宁": { en: "Visit Parents After Marriage", th: "เยี่ยมพ่อแม่หลังแต่งงาน", vi: "Thăm nhà mẹ" },
  "问名": { en: "Inquire Name (Betrothal)", th: "สอบถามชื่อ", vi: "Hỏi tên" },
};

const zodiac: Record<string, Record<string, string>> = {
  "鼠": { en: "Rat", th: "หนู", vi: "Chuột" },
  "牛": { en: "Ox", th: "วัว", vi: "Trâu" },
  "虎": { en: "Tiger", th: "เสือ", vi: "Hổ" },
  "兔": { en: "Rabbit", th: "กระต่าย", vi: "Mèo" },
  "龙": { en: "Dragon", th: "มังกร", vi: "Rồng" },
  "蛇": { en: "Snake", th: "งู", vi: "Rắn" },
  "马": { en: "Horse", th: "ม้า", vi: "Ngựa" },
  "羊": { en: "Goat", th: "แพะ", vi: "Dê" },
  "猴": { en: "Monkey", th: "ลิง", vi: "Khỉ" },
  "鸡": { en: "Rooster", th: "ไก่", vi: "Gà" },
  "狗": { en: "Dog", th: "หมา", vi: "Chó" },
  "猪": { en: "Pig", th: "หมู", vi: "Lợn" },
};

const jieqi: Record<string, Record<string, string>> = {
  "小寒": { en: "Minor Cold", th: "ลมหนาวเล็กน้อย", vi: "Tiểu Hàn" },
  "大寒": { en: "Major Cold", th: "ลมหนาวรุนแรง", vi: "Đại Hàn" },
  "立春": { en: "Start of Spring", th: "เริ่มต้นฤดูใบไม้ผลิ", vi: "Lập Xuân" },
  "雨水": { en: "Rain Water", th: "ฝนตก", vi: "Vũ Thủy" },
  "惊蛰": { en: "Awakening of Insects", th: "แมลงตื่นจากจำศีล", vi: "Kinh Trập" },
  "春分": { en: "Spring Equinox", th: "วสันตวิษุวัต", vi: "Xuân Phân" },
  "清明": { en: "Clear and Bright", th: "เช็งเม้ง", vi: "Thanh Minh" },
  "谷雨": { en: "Grain Rain", th: "ฝนธัญพืช", vi: "Cốc Vũ" },
  "立夏": { en: "Start of Summer", th: "เริ่มต้นฤดูร้อน", vi: "Lập Hạ" },
  "小满": { en: "Grain Buds", th: "ข้าวเต็มเมล็ด", vi: "Tiểu Mãn" },
  "芒种": { en: "Grain in Ear", th: "ข้าวออกรวง", vi: "Mang Chủng" },
  "夏至": { en: "Summer Solstice", th: "อายันครีษมา", vi: "Hา Chí" },
  "小暑": { en: "Minor Heat", th: "ร้อนเล็กน้อย", vi: "Tiểu Thử" },
  "大暑": { en: "Major Heat", th: "ร้อนมาก", vi: "Đại Thử" },
  "立秋": { en: "Start of Autumn", th: "เริ่มต้นฤดูใบไม้ร่วง", vi: "Lập Thu" },
  "处暑": { en: "End of Heat", th: "สิ้นสุดความร้อน", vi: "Xử Thử" },
  "白露": { en: "White Dew", th: "น้ำค้างขาว", vi: "Bạch Lộ" },
  "秋分": { en: "Autumn Equinox", th: "วสันตวิษุวัตฤดูใบไม้ร่วง", vi: "Thu Phân" },
  "寒露": { en: "Cold Dew", th: "น้ำค้างเย็น", vi: "Hàn Lộ" },
  "霜降": { en: "Frost's Descent", th: "Frost's Descent", vi: "Sương Giáng" },
  "立冬": { en: "Start of Winter", th: "เริ่มต้นฤดูหนาว", vi: "Lập Đông" },
  "小雪": { en: "Minor Snow", th: "หิมะเล็กน้อย", vi: "Tiểu Tuyết" },
  "大雪": { en: "Major Snow", th: "หิมะมาก", vi: "Đại Tuyết" },
  "冬至": { en: "Winter Solstice", th: "อายันเหมา", vi: "Đông Chí" },
};

const festivals: Record<string, Record<string, string>> = {
  "春节": { en: "Chinese New Year", th: "ตรุษจีน", vi: "Tết Nguyên Đán" },
  "元宵节": { en: "Lantern Festival", th: "เทศกาลโคมไฟ", vi: "Tết Nguyên Tiêu" },
  "清明节": { en: "Qingming Festival", th: "เช็งเม้ง", vi: "Tết Thanh Minh" },
  "端午节": { en: "Dragon Boat Festival", th: "เทศกาลเรือมังกร", vi: "Tết Đoan Ngọ" },
  "七夕节": { en: "Qixi (Valentine's) Festival", th: "วันวาเลนไทน์จีน", vi: "Lễ Thất Tịch" },
  "中元节": { en: "Ghost Festival", th: "เทศกาลผีหิว", vi: "Lễ Vu Lan" },
  "中秋节": { en: "Mid-Autumn Festival", th: "เทศกาลไหว้พระจันทร์", vi: "Tết Trung Thu" },
  "重阳节": { en: "Double Ninth Festival", th: "เทศกาลเก้าซ้อน", vi: "Tết Trùng Cửu" },
  "冬至": { en: "Winter Solstice Festival", th: "เทศกาลวันเหมายัน", vi: "Lễ Đông Chí" },
  "除夕": { en: "Chinese New Year's Eve", th: "คืนส่งท้ายปีจีน", vi: "Giao Thừa" },
};

export const translateLunarTerm = (term: string, lang: string): string => {
  if (lang === 'zh-CN' || lang === 'zh-TW') return term;
  
  // Normalize language code (e.g., 'en-US' -> 'en')
  const baseLang = lang.split('-')[0];
  
  const maps = [terms, zodiac, jieqi, festivals];
  for (const map of maps) {
    if (map[term] && map[term][baseLang]) {
      return map[term][baseLang];
    }
  }
  
  return term;
};