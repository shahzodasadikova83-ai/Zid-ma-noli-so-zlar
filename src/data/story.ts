import { StoryChapter } from '../types';

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 1,
    titleUz: "1-Qulf: Baland tog' dovoni",
    titleRu: "Замок 1: Высокий горный перевал",
    titleEn: "Lock 1: High Mountain Pass",
    storyUz: "Bilimdon bilan birga qadimiy qishloqqa yetib keldik. Birinchi qulf ulkan tog' darvozasida turibdi. Qulfda 'Baland' so'zi yozilgan. Darvoza ochilishi uchun uning aksini tanlash kerak!",
    storyRu: "Мы прибыли в древнее село вместе с Билимдоном. Первый замок висит на горных воротах со словом 'Baland' (Высокий). Найдите его противоположность!",
    storyEn: "We arrived at the ancient village with Bilimdon. The first lock hangs on the mountain gate inscribed with 'Baland' (High). Find its opposite!",
    clueUz: "Tog'lar baland, ammo vodiylar ... bo'ladi.",
    clueRu: "Горы высокие, а долины ...",
    clueEn: "Mountains are high, but valleys are ...",
    type: 'mcq',
    taskData: {
      targetWord: 'baland',
      options: ['uzun', 'past', 'keng', 'katta'],
      correctAnswer: 'past',
      explanationUz: "'Baland' so'zining zid ma'nolisi — 'past'!"
    },
    hintUz: "Balandning aksi yerga yaqin bo'lgan narsa, ya'ni 'past'!",
    hintRu: "Противоположность высокого — низкий ('past')!",
    hintEn: "The opposite of high is low ('past')!"
  },
  {
    id: 2,
    titleUz: "2-Qulf: Sirli daryo kechuvi",
    titleRu: "Замок 2: Переправа через тайную реку",
    titleEn: "Lock 2: The Secret River Crossing",
    storyUz: "Daryo bo'yiga keldik. Qayiq zanjiri 'Chuqur' degan yozuvli suv qulfi bilan bog'langan. Qayiq qirg'oqdagi sayoz joyga o'tishi uchun to'g'ri kalitni qulflangan joyga qo'ying!",
    storyRu: "Мы подошли к реке. Цепь лодки заперта замком 'Chuqur' (Глубокий). Перетяните нужный ключ-антоним на замок!",
    storyEn: "We arrived at the river. The boat chain is locked with 'Chuqur' (Deep). Drag or tap the matching antonym key onto the lock!",
    clueUz: "Daryoning o'rtasi chuqur, qirg'og'i esa ...",
    clueRu: "Посреди реки глубоко, а у берега ...",
    clueEn: "The middle of the river is deep, while the bank is ...",
    type: 'lock_key',
    taskData: {
      targetWord: 'chuqur',
      keys: ['og‘ir', 'sayoz', 'tor', 'yengil'],
      correctKey: 'sayoz',
      explanationUz: "'Chuqur' so'zining zidi — 'sayoz'!"
    },
    hintUz: "Suv kam bo'lgan joy 'sayoz' deyiladi!",
    hintRu: "Мелкое место по-узбекски — 'sayoz'!",
    hintEn: "A shallow place in Uzbek is 'sayoz'!"
  },
  {
    id: 3,
    titleUz: "3-Qulf: Adashgan sehrgarning jumlasi",
    titleRu: "Замок 3: Предложение заблудившегося волшебника",
    titleEn: "Lock 3: The Confused Wizard's Sentence",
    storyUz: "Sehrgar doskada g'alati jumla yozib qoldirgan: 'Qishda qor yog'adi va havo juda ISSIQ bo'ladi'. Bu jumlada bitta so'z teskari bo'lib qolgan! Uni to'g'ri zid so'zga almashtiring.",
    storyRu: "Волшебник написал странную фразу: 'Зимой идёт снег и воздух очень ISSIQ (горячий)'. Замените подчеркнутое слово на его антоним!",
    storyEn: "The wizard left a strange sentence: 'In winter it snows and the air is very ISSIQ (hot)'. Replace the wrong word with its correct opposite!",
    clueUz: "Issiq so'zining o'rniga qishga mos zid so'zni qo'ying.",
    clueRu: "Замените слово 'issiq' на подходящий для зимы антоним.",
    clueEn: "Replace 'issiq' with the winter antonym.",
    type: 'fix_sentence',
    taskData: {
      sentenceTemplate: "Qishda qor yog'adi va havo juda [WORD] bo'ladi.",
      wrongWord: 'issiq',
      choices: ['sovuq', 'iliq', 'qorong‘i', 'oq'],
      correctAnswer: 'sovuq',
      explanationUz: "'Issiq' so'zining to'g'ri zidi — 'sovuq'!"
    },
    hintUz: "Qor yoqqanda havo nima bo'ladi? Albatta, 'sovuq'!",
    hintRu: "Когда идёт снег, холодно — 'sovuq'!",
    hintEn: "When it snows, it is cold — 'sovuq'!"
  },
  {
    id: 4,
    titleUz: "4-Qulf: Dono boboning maqoli",
    titleRu: "Замок 4: Пословица мудрого старца",
    titleEn: "Lock 4: The Wise Elder's Proverb",
    storyUz: "To'rtinchi eshikda qadimiy tosh lavha bor. Unda dono maqol o'yib yozilgan. Maqol ichidagi bir-biriga zid bo'lgan ikkita so'zni topib bosing!",
    storyRu: "На четвёртой двери высечена старинная пословица. Найдите и нажмите на пару противоположных слов!",
    storyEn: "On the fourth door is an ancient stone carving. Find and tap the pair of opposite words inside the proverb!",
    clueUz: "Yaxshi bilan yursang yetarsan murodga, yomon bilan yursang qolarsan uyatga.",
    clueRu: "С хорошим пойдёшь — цели достигнешь, с плохим пойдёшь — стыд найдёшь.",
    clueEn: "Walk with the good, achieve your goal; walk with the bad, face disgrace.",
    type: 'find_pair',
    taskData: {
      words: ['Yaxshi', 'bilan', 'yursang', 'yomon', 'bilan', 'qolarsan'],
      pair: ['Yaxshi', 'yomon'],
      explanationUz: "Maqoldagi zid so'zlar: 'Yaxshi' va 'yomon'!"
    },
    hintUz: "Biri yaxshilikni, ikkinchisi yomonlikni bildiradi: 'Yaxshi' va 'Yomon'!",
    hintRu: "Одно означает хорошее, другое дурное: 'Yaxshi' и 'Yomon'!",
    hintEn: "One means good, the other bad: 'Yaxshi' and 'Yomon'!"
  },
  {
    id: 5,
    titleUz: "5-Qulf: Sehrli qo'shimcha xazinasi",
    titleRu: "Замок 5: Сокровище магического суффикса",
    titleEn: "Lock 5: The Magic Suffix Treasure",
    storyUz: "Mana, Sandiqning eng oxirgi oltin qulfi! Qulf ustida 'Kuchli' so'zi va sehrli tayoqcha turibdi. -siz qo'shimchasini qo'shib, sandiqni abadiy ochadigan so'zni yasang!",
    storyRu: "Вот и последний золотой замок сундука! На замке написано 'Kuchli' (Сильный). Соберите его противоположность с помощью суффикса '-siz'!",
    storyEn: "The final golden lock of the Chest! It shows 'Kuchli' (Strong). Craft its opposite using the '-siz' suffix to open the chest!",
    clueUz: "Kuch + siz = ?",
    clueRu: "Сила + без = бессильный / слабый?",
    clueEn: "Strength + without = powerless / weak?",
    type: 'suffix_craft',
    taskData: {
      baseWord: 'kuch',
      target: 'kuchsiz',
      choices: ['kuchsiz', 'kuchliroq', 'kuchdor', 'kuchsizcha'],
      correctAnswer: 'kuchsiz',
      explanationUz: "'Kuch' o'zagiga '-siz' qo'shilganda 'kuchsiz' (kuchlining zidi) hosil bo'ladi!"
    },
    hintUz: "'Kuch' so'ziga '-siz' qo'shimchasini ulang: 'kuchsiz'!",
    hintRu: "Добавьте суффикс '-siz': 'kuchsiz'!",
    hintEn: "Attach '-siz': 'kuchsiz'!"
  }
];
