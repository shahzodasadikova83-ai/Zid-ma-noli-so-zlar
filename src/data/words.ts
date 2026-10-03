import { AntonymPair, ProverbsItem } from '../types';

export const ANTONYM_WORDS: AntonymPair[] = [
  {
    id: 'w1',
    word1: 'katta',
    word2: 'kichik',
    partOfSpeech: 'sifat',
    category: 'size',
    emoji1: '🐘',
    emoji2: '🐭',
    translations: {
      ru: { word1: 'большой', word2: 'маленький', example: 'Слон большой, а мышка маленькая.' },
      en: { word1: 'big', word2: 'small', example: 'The elephant is big, but the mouse is small.' }
    },
    exampleUz: 'Fil juda katta, sichqon esa kichik.'
  },
  {
    id: 'w2',
    word1: 'uzun',
    word2: 'qisqa',
    partOfSpeech: 'sifat',
    category: 'size',
    emoji1: '🦒',
    emoji2: '🦔',
    translations: {
      ru: { word1: 'длинный', word2: 'короткий', example: 'У жирафа длинная шея, у ежа короткая.' },
      en: { word1: 'long', word2: 'short', example: 'The giraffe has a long neck, the hedgehog short.' }
    },
    exampleUz: 'Zirafaning bo‘yni uzun, tipratikan esa qisqa.'
  },
  {
    id: 'w3',
    word1: 'baland',
    word2: 'past',
    partOfSpeech: 'sifat',
    category: 'size',
    emoji1: '🏔️',
    emoji2: '🏡',
    translations: {
      ru: { word1: 'высокий', word2: 'низкий', example: 'Гора высокая, а домик низкий.' },
      en: { word1: 'high / tall', word2: 'low', example: 'The mountain is high, and the cottage is low.' }
    },
    exampleUz: 'Tog‘lar baland, qishloq uylari past bo‘ladi.'
  },
  {
    id: 'w4',
    word1: 'issiq',
    word2: 'sovuq',
    partOfSpeech: 'sifat',
    category: 'temperature',
    emoji1: '☀️',
    emoji2: '❄️',
    translations: {
      ru: { word1: 'горячий / тёплый', word2: 'холодный', example: 'Летом жарко, а зимой холодно.' },
      en: { word1: 'hot / warm', word2: 'cold', example: 'In summer it is hot, in winter cold.' }
    },
    exampleUz: 'Yoz faslida kun issiq, qishda esa sovuq bo‘ladi.'
  },
  {
    id: 'w5',
    word1: 'yangi',
    word2: 'eski',
    partOfSpeech: 'sifat',
    category: 'state',
    emoji1: '👟',
    emoji2: '👞',
    translations: {
      ru: { word1: 'новый', word2: 'старый', example: 'Новая обувь и старая обувь.' },
      en: { word1: 'new', word2: 'old', example: 'New shoes and old shoes.' }
    },
    exampleUz: 'Akam yangi kitob sotib oldi, eski kitobini javonga qo‘ydi.'
  },
  {
    id: 'w6',
    word1: 'yaxshi',
    word2: 'yomon',
    partOfSpeech: 'sifat',
    category: 'quality',
    emoji1: '😇',
    emoji2: '😈',
    translations: {
      ru: { word1: 'хороший', word2: 'плохой', example: 'Хороший поступок и плохой поступок.' },
      en: { word1: 'good', word2: 'bad', example: 'A good deed and a bad deed.' }
    },
    exampleUz: 'Yaxshi do‘st doim yordam beradi, yomon do‘st tashlab ketadi.'
  },
  {
    id: 'w7',
    word1: 'tez',
    word2: 'sekin',
    partOfSpeech: 'sifat',
    category: 'action',
    emoji1: '🐆',
    emoji2: '🐢',
    translations: {
      ru: { word1: 'быстро', word2: 'медленно', example: 'Гепард бегает быстро, а черепаха медленно.' },
      en: { word1: 'fast', word2: 'slow', example: 'The cheetah runs fast, the turtle slow.' }
    },
    exampleUz: 'Qoplon juda tez yuguradi, toshbaqa esa sekin yuradi.'
  },
  {
    id: 'w8',
    word1: 'kun',
    word2: 'tun',
    partOfSpeech: 'ot',
    category: 'time',
    emoji1: '🌞',
    emoji2: '🌙',
    translations: {
      ru: { word1: 'день', word2: 'ночь', example: 'Днём светит солнце, ночью видна луна.' },
      en: { word1: 'day', word2: 'night', example: 'In the day the sun shines, at night the moon appears.' }
    },
    exampleUz: 'Kun yorug‘ bo‘ladi, tun esa qorong‘i.'
  },
  {
    id: 'w9',
    word1: 'oq',
    word2: 'qora',
    partOfSpeech: 'sifat',
    category: 'state',
    emoji1: '⚪',
    emoji2: '⚫',
    translations: {
      ru: { word1: 'белый', word2: 'чёрный', example: 'Белый лебедь и чёрный ворон.' },
      en: { word1: 'white', word2: 'black', example: 'White swan and black raven.' }
    },
    exampleUz: 'Daftar varag‘i oq, siyoh esa qora.'
  },
  {
    id: 'w10',
    word1: 'to‘g‘ri',
    word2: 'noto‘g‘ri',
    partOfSpeech: 'sifat',
    category: 'quality',
    emoji1: '✅',
    emoji2: '❌',
    translations: {
      ru: { word1: 'правильный', word2: 'неправильный', example: 'Правильный ответ и ошибочный.' },
      en: { word1: 'right / correct', word2: 'wrong / incorrect', example: 'Correct answer and wrong answer.' }
    },
    exampleUz: 'Misolni to‘g‘ri yechsang, barakalla; noto‘g‘ri bo‘lsa, qayta urinib ko‘r.'
  },
  {
    id: 'w11',
    word1: 'shirin',
    word2: 'achchiq',
    partOfSpeech: 'sifat',
    category: 'quality',
    emoji1: '🍯',
    emoji2: '🌶️',
    translations: {
      ru: { word1: 'сладкий', word2: 'горький / острый', example: 'Мёд сладкий, а перец острый.' },
      en: { word1: 'sweet', word2: 'bitter / spicy', example: 'Honey is sweet, pepper is hot/bitter.' }
    },
    exampleUz: 'Asal juda shirin, qalampir esa achchiq.'
  },
  {
    id: 'w12',
    word1: 'ochiq',
    word2: 'yopiq',
    partOfSpeech: 'sifat',
    category: 'state',
    emoji1: '📖',
    emoji2: '📕',
    translations: {
      ru: { word1: 'открытый', word2: 'закрытый', example: 'Открытая дверь и закрытая дверь.' },
      en: { word1: 'open', word2: 'closed', example: 'Open door and closed door.' }
    },
    exampleUz: 'Deraza ochiq edi, shamol kuchaygach yopiq qildik.'
  },
  {
    id: 'w13',
    word1: 'yengil',
    word2: 'og‘ir',
    partOfSpeech: 'sifat',
    category: 'size',
    emoji1: '🪶',
    emoji2: '🪨',
    translations: {
      ru: { word1: 'лёгкий', word2: 'тяжёлый', example: 'Пёрышко лёгкое, а камень тяжёлый.' },
      en: { word1: 'light', word2: 'heavy', example: 'A feather is light, a rock is heavy.' }
    },
    exampleUz: 'Qush pati yengil, katta tosh esa og‘ir.'
  },
  {
    id: 'w14',
    word1: 'quvnoq',
    word2: 'xafa',
    partOfSpeech: 'sifat',
    category: 'state',
    emoji1: '😄',
    emoji2: '😢',
    translations: {
      ru: { word1: 'весёлый', word2: 'грустный', example: 'Весёлый праздник и грустный взгляд.' },
      en: { word1: 'happy / cheerful', word2: 'sad', example: 'A cheerful celebration and sad mood.' }
    },
    exampleUz: 'G‘olib bo‘lgan bola quvnoq, yutqazgan esa xafa bo‘lmadi.'
  },
  {
    id: 'w15',
    word1: 'kuchli',
    word2: 'zaif',
    partOfSpeech: 'sifat',
    category: 'quality',
    emoji1: '🦁',
    emoji2: '🐣',
    translations: {
      ru: { word1: 'сильный', word2: 'слабый', example: 'Сильный лев и слабый птенец.' },
      en: { word1: 'strong', word2: 'weak', example: 'A strong lion and a weak chick.' }
    },
    exampleUz: 'Sport bilan shug‘ullangan inson kuchli bo‘ladi, erinchoq esa zaif.'
  },
  {
    id: 'w16',
    word1: 'yosh',
    word2: 'qari',
    partOfSpeech: 'sifat',
    category: 'quality',
    emoji1: '🧒',
    emoji2: '👴',
    translations: {
      ru: { word1: 'молодой', word2: 'старый / пожилой', example: 'Молодой юноша и пожилой дедушка.' },
      en: { word1: 'young', word2: 'old / elderly', example: 'Young boy and elderly grandfather.' }
    },
    exampleUz: 'Yoshlar qariyalarga doimo joy berishi kerak.'
  },
  {
    id: 'w17',
    word1: 'semiz',
    word2: 'oriq',
    partOfSpeech: 'sifat',
    category: 'size',
    emoji1: '🐻',
    emoji2: '🦌',
    translations: {
      ru: { word1: 'толстый', word2: 'худой', example: 'Упитанный мишка и худой оленёнок.' },
      en: { word1: 'fat / plump', word2: 'thin / slim', example: 'A plump bear and a thin fawn.' }
    },
    exampleUz: 'Qish oldidan ayiq semiz bo‘ladi, bahorda esa oriq.'
  },
  {
    id: 'w18',
    word1: 'keng',
    word2: 'tor',
    partOfSpeech: 'sifat',
    category: 'size',
    emoji1: '🛣️',
    emoji2: '🛤️',
    translations: {
      ru: { word1: 'широкий', word2: 'узкий', example: 'Широкая улица и узкая тропинка.' },
      en: { word1: 'wide', word2: 'narrow', example: 'A wide highway and a narrow pathway.' }
    },
    exampleUz: 'Shahar ko‘chalari keng, tog‘ so‘qmoqlari esa tor.'
  },
  {
    id: 'w19',
    word1: 'chuqur',
    word2: 'sayoz',
    partOfSpeech: 'sifat',
    category: 'size',
    emoji1: '🌊',
    emoji2: '🦆',
    translations: {
      ru: { word1: 'глубокий', word2: 'мелкий', example: 'Глубокое море и мелкая речка.' },
      en: { word1: 'deep', word2: 'shallow', example: 'Deep ocean and shallow stream.' }
    },
    exampleUz: 'Daryoning o‘rtasi chuqur, qirg‘og‘i esa sayoz.'
  },
  {
    id: 'w20',
    word1: 'toza',
    word2: 'iflos',
    partOfSpeech: 'sifat',
    category: 'state',
    emoji1: '✨',
    emoji2: '🧼',
    translations: {
      ru: { word1: 'чистый', word2: 'грязный', example: 'Чистая тетрадь и грязная обувь.' },
      en: { word1: 'clean', word2: 'dirty', example: 'A clean notebook and dirty shoes.' }
    },
    exampleUz: 'Biz sinfxonamizni doimo toza tutamiz, iflos qilmaymiz.'
  }
];

// Proverbs containing antonyms
export const PROVERBS: ProverbsItem[] = [
  {
    id: 'p1',
    text: "Yaxshi bilan yursang, yetarsan murodga, yomon bilan yursang, qolarsan uyatga.",
    antonymPair: ['yaxshi', 'yomon'],
    meaningUz: "Yaxshi do'st odamni yutuqlarga yetaklaydi, yomon do'st esa xijolat qiladi.",
    meaningRu: "С хорошим другом добьёшься цели, с дурным попадёшь в беду.",
    meaningEn: "Walk with the good and you will reach your goals; walk with the bad and you will face disgrace."
  },
  {
    id: 'p2',
    text: "Ilm – nur, jaholat – zulmat.",
    antonymPair: ['nur', 'zulmat'],
    meaningUz: "Bilim inson hayotini yoritadi, bilimsizlik esa qorong'ilikka yetaklaydi.",
    meaningRu: "Знание — свет, а невежество — тьма.",
    meaningEn: "Knowledge is light, ignorance is darkness."
  },
  {
    id: 'p3',
    text: "Oz so'zla – soz so'zla, ko'p so'zla – bekor so'zla.",
    antonymPair: ['oz', 'ko‘p'],
    meaningUz: "Kam gapirib, ma'noli gapirgan yaxshi, ortiqcha gap befoyda.",
    meaningRu: "Меньше говори — лучше говори, много слов — пустые слова.",
    meaningEn: "Speak less and speak well; speak too much and speak in vain."
  },
  {
    id: 'p4',
    text: "Kattaga hurmatda bo'l, kichikka izzatda.",
    antonymPair: ['katta', 'kichik'],
    meaningUz: "Kattalarni hurmat qilish, kichiklarni esa erkalab mehr berish kerak.",
    meaningRu: "Старших уважай, младших оберегай.",
    meaningEn: "Show respect to elders, show care to the young."
  },
  {
    id: 'p5',
    text: "Mehnatning tagi – rohat, erinchoqlikning tagi – mehnat.",
    antonymPair: ['rohat', 'mehnat'],
    meaningUz: "Harakat qilgan rohat ko'radi, eringan esa keyin qiynaladi.",
    meaningRu: "Конец труда — покой, конец лени — тягость.",
    meaningEn: "After labor comes comfort; after laziness comes burden."
  }
];

// Suffix pairs for magic suffix lesson (-li / -siz)
export const SUFFIX_PAIRS = [
  { root: 'bilim', withLi: 'bilimli', withSiz: 'bilimsiz', emoji: '🧠', ru: 'знающий – незнающий', en: 'knowledgeable – ignorant' },
  { root: 'mehr', withLi: 'mehribon', withSiz: 'mehrsiz', emoji: '❤️', ru: 'добрый – бессердечный', en: 'kind – unkind' },
  { root: 'rang', withLi: 'rangli', withSiz: 'rangsiz', emoji: '🎨', ru: 'цветной – бесцветный', en: 'colorful – colorless' },
  { root: 'shovqin', withLi: 'shovqinli', withSiz: 'shovqinsiz', emoji: '📢', ru: 'шумный – тихий/бесшумный', en: 'noisy – quiet' },
  { root: 'kuch', withLi: 'kuchli', withSiz: 'kuchsiz', emoji: '💪', ru: 'сильный – бессильный', en: 'strong – powerless' },
  { root: 'mazza', withLi: 'mazzali', withSiz: 'mazzasiz', emoji: '🍰', ru: 'вкусный – безвкусный', en: 'tasty – tasteless' }
];

// Parts of speech examples for Step 3
export const PARTS_OF_SPEECH_EXAMPLES = [
  {
    typeUz: "Sifat – Sifat (Qanday?)",
    typeRu: "Прилагательное – Прилагательное (Какой?)",
    typeEn: "Adjective – Adjective (What kind?)",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300",
    pairs: [
      { w1: 'baland', w2: 'past', q: 'qanday?' },
      { w1: 'issiq', w2: 'sovuq', q: 'qanday?' },
      { w1: 'shirin', w2: 'achchiq', q: 'qanday?' },
      { w1: 'toza', w2: 'iflos', q: 'qanday?' }
    ]
  },
  {
    typeUz: "Ot – Ot (Kim? Nima?)",
    typeRu: "Существительное – Существительное (Кто? Что?)",
    typeEn: "Noun – Noun (Who? What?)",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300",
    pairs: [
      { w1: 'kun', w2: 'tun', q: 'nima?' },
      { w1: 'do‘st', w2: 'dushman', q: 'kim?' },
      { w1: 'yoz', w2: 'qish', q: 'nima?' },
      { w1: 'nur', w2: 'zulmat', q: 'nima?' }
    ]
  },
  {
    typeUz: "Fe'l – Fe'l (Nima qildi?)",
    typeRu: "Глагол – Глагол (Что делал?)",
    typeEn: "Verb – Verb (What action?)",
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300",
    pairs: [
      { w1: 'kelmoq', w2: 'ketmoq', q: 'nima qilmoq?' },
      { w1: 'kulmoq', w2: 'yig‘lamoq', q: 'nima qilmoq?' },
      { w1: 'ochmoq', w2: 'yopmoq', q: 'nima qilmoq?' },
      { w1: 'olmoq', w2: 'bermoq', q: 'nima qilmoq?' }
    ]
  }
];

// Fun tongue-twisters and riddles for Home
export const TONGUE_TWISTERS = [
  {
    id: 'tt1',
    textUz: "Oq choynakka oq qopqoq, qora choynakka qora qopqoq.",
    textRu: "Белому чайнику белая крышка, чёрному чайнику чёрная крышка.",
    textEn: "White lid for white teapot, black lid for black teapot.",
    pair: "oq ↔ qora",
    type: "Tez aytish (Tongue twister)"
  },
  {
    id: 'tt2',
    textUz: "Kunduzi yo'q, kechasi ko'p. Ertalab qochadi, oqshomda ochiladi. Bu nima?",
    answerUz: "Yulduzlar (Stars) ✨ [Kun ↔ Tun]",
    pair: "kun ↔ tun",
    type: "Topishmoq (Riddle)"
  },
  {
    id: 'tt3',
    textUz: "Tog'dan baland, sichqondan past. Bu nima?",
    answerUz: "Tog'dagi so'qmoq yo'l! 🏔️ [Baland ↔ Past]",
    pair: "baland ↔ past",
    type: "Topishmoq (Riddle)"
  }
];
