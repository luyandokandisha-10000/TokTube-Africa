/**
 * TokTube Africa - Consolidated All-in-One Application Bundle
 * Includes:
 * 1. African Multi-Language Translation Engine (9 Languages)
 * 2. Education-Promoting Algorithm ("EduBoost") & Learning Streak
 * 3. Friends Tab & WhatsApp/Telegram/SMS Invite Sharing
 * 4. Direct Messaging (DMs) Chat & User Safety Blocking
 * 5. Authentic TikTok-Style Creator Profile View with 3-Column Video Grid
 * 6. Feedback & Feature Requests System
 * 7. Hybrid YouTube + TikTok Video Engine & IndexedDB Persistence
 */

// ==========================================
// 1. AFRICAN MULTI-LANGUAGE TRANSLATION ENGINE
// ==========================================
const TRANSLATIONS = {
  en: {
    nav_home: "Home",
    nav_toks: "Toks",
    nav_learn: "Learn (EduBoost)",
    nav_friends: "Friends",
    nav_messages: "Messages",
    nav_you: "You & Support",
    nav_library: "Library",
    nav_feedback: "Feedback",
    btn_create: "Create",
    nav_tube: "Tube",
    title_notifications: "Notifications",
    btn_mark_read: "Mark all as read",
    subscribers: "subscribers",
    subscribe: "Subscribe",
    subscribed: "Subscribed ✓",
    comments: "Comments",
    translate_caption: "🌍 Translate into selected language",
    translated_by: "Translated into English",
    share: "Share",
    download: "Download",
    save: "Save",
    follow: "Follow",
    following: "Following ✓",
    block_user: "Block User",
    unblock_user: "Unblock User",
    send: "Send",
    online: "Online • TokTube Creator"
  },
  sw: { // Kiswahili (Swahili)
    nav_home: "Mwanzo",
    nav_toks: "Toks Fupi",
    nav_learn: "Elimu (EduBoost)",
    nav_friends: "Marafiki",
    nav_messages: "Ujumbe",
    nav_you: "Wewe na Msaada",
    nav_library: "Maktaba",
    nav_feedback: "Maoni",
    btn_create: "Unda",
    nav_tube: "Video",
    title_notifications: "Taarifa",
    btn_mark_read: "Weka zote zimesomwa",
    subscribers: "wateja",
    subscribe: "Jiunge",
    subscribed: "Umejiunga ✓",
    comments: "Maoni",
    translate_caption: "🌍 Tafsiri kwa Kiswahili",
    translated_by: "Imetafsiriwa kwa Kiswahili",
    share: "Shiriki",
    download: "Pakua",
    save: "Hifadhi",
    follow: "Fuata",
    following: "Unafuata ✓",
    block_user: "Zuia Mtumiaji",
    unblock_user: "Ondoa Kizuizi",
    send: "Tuma",
    online: "Yuko Mtandaoni • Muundaji"
  },
  yo: { // Yorùbá
    nav_home: "Ilé",
    nav_toks: "Toks",
    nav_learn: "Kọ́ Ẹ̀kọ́ (EduBoost)",
    nav_friends: "Àwọn Ọ̀rẹ́",
    nav_messages: "Àwọn Ìfiránṣẹ́",
    nav_you: "Ìwọ & Ìrànlọ́wọ́",
    nav_library: "Ilé-ìkàwé",
    nav_feedback: "Èsì & Èrò",
    btn_create: "Ṣẹ̀dá",
    nav_tube: "Fídíò",
    title_notifications: "Àwọn Ìfitonilétí",
    btn_mark_read: "Ṣe àmì sí pé a ti kà gbogbo rẹ̀",
    subscribers: "olùbásọ̀rọ̀",
    subscribe: "Tẹle",
    subscribed: "Ti tẹle ✓",
    comments: "Àwọn Àlàyé",
    translate_caption: "🌍 Túmọ̀ sí Yorùbá",
    translated_by: "A túmọ̀ sí Èdè Yorùbá",
    share: "Pín",
    download: "Gba wọlé",
    save: "Fi pamọ́",
    follow: "Tẹ̀lé",
    following: "Ò ń tẹ̀lé e ✓",
    block_user: "Dènà Oníṣe",
    unblock_user: "Ṣí Kúrò ní Ìdènà",
    send: "Firanṣẹ",
    online: "Lórí ayélujára • Olùṣẹ̀dá"
  },
  ha: { // Hausa
    nav_home: "Gida",
    nav_toks: "Toks",
    nav_learn: "Koyo (EduBoost)",
    nav_friends: "Abokai",
    nav_messages: "Saƙonni",
    nav_you: "Kai & Taimako",
    nav_library: "Laburare",
    nav_feedback: "Sharhi",
    btn_create: "Ƙirƙira",
    nav_tube: "Bidiyo",
    title_notifications: "Sanarwa",
    btn_mark_read: "Yi alama an karanta duka",
    subscribers: "masu biyo",
    subscribe: "Yi Rajista",
    subscribed: "An Yi Rajista ✓",
    comments: "Sharhi",
    translate_caption: "🌍 Fassara zuwa Hausa",
    translated_by: "An fassara zuwa Hausa",
    share: "Raba",
    download: "Sauke",
    save: "Ajiye",
    follow: "Bi",
    following: "Kuna Biye ✓",
    block_user: "Hana Mai Amfani",
    unblock_user: "Cire Hanawa",
    send: "Aika",
    online: "Yana Kan Yanar Gizo"
  },
  ig: { // Asụsụ Igbo
    nav_home: "Ụlọ",
    nav_toks: "Toks",
    nav_learn: "Mụta Ihe (EduBoost)",
    nav_friends: "Ndị Enyi",
    nav_messages: "Ozi",
    nav_you: "Gị & Enyemaka",
    nav_library: "Ọbá Akwụkwọ",
    nav_feedback: "Nzaghachi",
    btn_create: "Kewapụta",
    nav_tube: "Vidio",
    title_notifications: "Ọkwa",
    btn_mark_read: "Kaa ya dị ka agụchara",
    subscribers: "ndị debanyere",
    subscribe: "Denye aha",
    subscribed: "Edenyere aha ✓",
    comments: "Ihe ndị e kwuru",
    translate_caption: "🌍 Tụgharịa n'asụsụ Igbo",
    translated_by: "Atụgharịrị n'asụsụ Igbo",
    share: "Kekọrịta",
    download: "Budata",
    save: "Chekwaa",
    follow: "Soro",
    following: "Na-eso ✓",
    block_user: "Gbochie Onye Ọrụ",
    unblock_user: "Wepụ Mgbochi",
    send: "Zipu",
    online: "Nọ n'ịntanetị"
  },
  am: { // አማርኛ (Amharic)
    nav_home: "መነሻ",
    nav_toks: "ቶክስ",
    nav_learn: "ትምህርት (EduBoost)",
    nav_friends: "ጓደኞች",
    nav_messages: "መልዕክቶች",
    nav_you: "እርስዎ እና ድጋፍ",
    nav_library: "ቤተ-መጽሐፍት",
    nav_feedback: "አስተያየት",
    btn_create: "ፍጠር",
    nav_tube: "ቪዲዮ",
    title_notifications: "ማሳወቂያዎች",
    btn_mark_read: "ሁሉንም እንደተነበቡ ምልክት አድርግ",
    subscribers: "ተመዝጋቢዎች",
    subscribe: "ይከተሉ",
    subscribed: "ተከታትለዋል ✓",
    comments: "አስተያየቶች",
    translate_caption: "🌍 ወደ አማርኛ ተርጉም",
    translated_by: "ወደ አማርኛ ተተርጉሟል",
    share: "አጋራ",
    download: "አውርድ",
    save: "አስቀምጥ",
    follow: "ተከተል",
    following: "እየተከተሉ ነው ✓",
    block_user: "ተጠቃሚ አግድ",
    unblock_user: "እገዳ አንሳ",
    send: "ላክ",
    online: "በመስመር ላይ"
  },
  zu: { // isiZulu (Zulu)
    nav_home: "Ikhaya",
    nav_toks: "I-Toks",
    nav_learn: "Funda (EduBoost)",
    nav_friends: "Abangane",
    nav_messages: "Imilayezo",
    nav_you: "Wena Nosizo",
    nav_library: "Umtapo",
    nav_feedback: "Imibono",
    btn_create: "Dala",
    nav_tube: "Amavidiyo",
    title_notifications: "Izaziso",
    btn_mark_read: "Maka konke njengokufundiwe",
    subscribers: "ababhalisile",
    subscribe: "Bhalisa",
    subscribed: "Ubhalisile ✓",
    comments: "Amazwana",
    translate_caption: "🌍 Humushela esiZulwini",
    translated_by: "Kuhunyushelwe esiZulwini",
    share: "Yabelana",
    download: "Landa",
    save: "Londoloza",
    follow: "Landela",
    following: "Uyalandela ✓",
    block_user: "Vimba Umsebenzisi",
    unblock_user: "Vulela Umsebenzisi",
    send: "Thumela",
    online: "Uku-inthanethi"
  },
  fr: { // Français
    nav_home: "Accueil",
    nav_toks: "Toks",
    nav_learn: "Apprendre (EduBoost)",
    nav_friends: "Amis",
    nav_messages: "Messages",
    nav_you: "Vous & Aide",
    nav_library: "Bibliothèque",
    nav_feedback: "Avis",
    btn_create: "Créer",
    nav_tube: "Vidéos",
    title_notifications: "Notifications",
    btn_mark_read: "Tout marquer comme lu",
    subscribers: "abonnés",
    subscribe: "S'abonner",
    subscribed: "Abonné ✓",
    comments: "Commentaires",
    translate_caption: "🌍 Traduire dans la langue choisie",
    translated_by: "Traduit en Français",
    share: "Partager",
    download: "Télécharger",
    save: "Enregistrer",
    follow: "Suivre",
    following: "Abonné ✓",
    block_user: "Bloquer l'utilisateur",
    unblock_user: "Débloquer",
    send: "Envoyer",
    online: "En ligne • Créateur"
  },
  ar: { // العربية (Arabic)
    nav_home: "الرئيسية",
    nav_toks: "توكس",
    nav_learn: "تعلّم (EduBoost)",
    nav_friends: "الأصدقاء",
    nav_messages: "الرسائل",
    nav_you: "أنت والمساعدة",
    nav_library: "المكتبة",
    nav_feedback: "الآراء والملاحظات",
    btn_create: "إنشاء",
    nav_tube: "فيديو",
    title_notifications: "الإشعارات",
    btn_mark_read: "تحديد الكل كمقروء",
    subscribers: "مشترك",
    subscribe: "اشتراك",
    subscribed: "مشترك ✓",
    comments: "تعليقات",
    translate_caption: "🌍 ترجمة إلى اللغة المحددة",
    translated_by: "مترجم إلى العربية",
    share: "مشاركة",
    download: "تنزيل",
    save: "حفظ",
    follow: "متابعة",
    following: "تتابعه ✓",
    block_user: "حظر المستخدم",
    unblock_user: "إلغاء الحظر",
    send: "إرسال",
    online: "متصل الآن"
  }
};

class TranslationEngine {
  constructor() {
    this.currentLang = localStorage.getItem('toktube_lang') || 'en';
  }

  setLanguage(langCode) {
    if (!TRANSLATIONS[langCode]) return;
    this.currentLang = langCode;
    localStorage.setItem('toktube_lang', langCode);
    this.applyTranslations();
  }

  t(key) {
    const langDict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const text = this.t(key);
      if (text) el.textContent = text;
    });

    const langNames = {
      en: "English",
      sw: "Kiswahili",
      yo: "Yorùbá",
      ha: "Hausa",
      ig: "Asụsụ Igbo",
      am: "አማርኛ",
      zu: "isiZulu",
      fr: "Français",
      ar: "العربية"
    };

    const label = document.getElementById('current-lang-label');
    if (label) label.textContent = langNames[this.currentLang] || "English";

    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === this.currentLang);
    });
  }

  // Realistic caption & text translation dictionary
  translateContent(text) {
    if (this.currentLang === 'en') return text;

    const phrases = {
      sw: {
        "Building the Next Generation Web App": "Kujenga Programu ya Wavuti ya Kizazi Kijacho",
        "Architecture & Speed": "Usanifu na Kasi",
        "Cinematic Drone Expedition": "Safari ya Sinema ya Ndege Isiyo na Rubani",
        "Untouched Wilds of Iceland": "Mbuga Asilia za Iceland",
        "Lo-Fi Beats to Code": "Muziki Tulivu wa Kuandika Kanuni",
        "I Built an AI Game Engine": "Nilitengeneza Injini ya Mchezo ya AI",
        "Master Chef Secret": "Siri ya Mpishi Mkuu",
        "Cybersecurity Breakdown": "Uchambuzi wa Usalama wa Mtandao",
        "Fastest way to center anything in modern CSS": "Njia ya haraka zaidi ya kuweka katikati kitu chochote katika CSS",
        "Wait till the drop!": "Subiri hadi muziki ubadilike!",
        "POV: You finally fixed the bug": "Mtazamo: Hatimaye umerekebisha hitilafu",
        "Satisfying 3D Physics simulation": "Uigaji wa Kuridhisha wa Fizikia ya 3D",
        "Listen to this CRUNCH!": "Sikiliza mlio huu mzuri!"
      },
      yo: {
        "Building the Next Generation Web App": "Kíkọ́ Ohun Èlò Wẹ́ẹ̀bù Ìran Tó Kàn",
        "Architecture & Speed": "Ètò & Ìyára",
        "Cinematic Drone Expedition": "Ìrìn Àjò Fídíò Drone",
        "Untouched Wilds of Iceland": "Àwọn Igbó Àbínibí ti Iceland",
        "Lo-Fi Beats to Code": "Orin Fífẹ́fẹ́ fún Ìkọ̀wé Kóòdù",
        "I Built an AI Game Engine": "Mo Kọ́ Èrọ Ere AI",
        "Master Chef Secret": "Àṣírí Olóúnjẹ Àgbà",
        "Cybersecurity Breakdown": "Àlàyé Ààbò Ayélujára",
        "Fastest way to center anything in modern CSS": "Ọ̀nà tó yára jùlọ láti fi nǹkan sí àárín nínú CSS",
        "POV: You finally fixed the bug": "Ojú-ìwòye: Níkẹyìn o ti tún àṣìṣe náà ṣe"
      },
      ha: {
        "Building the Next Generation Web App": "Gina Aikace-aikacen Yanar Gizo na Gaba",
        "Architecture & Speed": "Tsarin Gine-gine da Saurin Aiki",
        "Cinematic Drone Expedition": "Tafiyar Drone Mai Kayatarwa",
        "Untouched Wilds of Iceland": "Dajin Iceland na Halitta",
        "Lo-Fi Beats to Code": "Kiɗan Kwantar da Hankali don Rubuta Shirye-shirye",
        "I Built an AI Game Engine": "Na Gina Injin Wasan AI",
        "Master Chef Secret": "Sirrin Babban Mai Dafa Abinci",
        "Cybersecurity Breakdown": "Bayanin Tsaron Yanar Gizo"
      },
      ig: {
        "Building the Next Generation Web App": "Iwulite Ngwa Weebụ nke Ọgbọ Ọhụrụ",
        "Architecture & Speed": "Nhazi na Ọsọ",
        "Cinematic Drone Expedition": "Njem Vidio Drone",
        "Lo-Fi Beats to Code": "Egwu dị jụụ maka ide koodu",
        "I Built an AI Game Engine": "M wuru injin egwuregwu AI",
        "Master Chef Secret": "Ihe nzuzo nke Onye isi nri"
      },
      fr: {
        "Building the Next Generation Web App": "Construire l'application Web de nouvelle génération",
        "Architecture & Speed": "Architecture et Vitesse",
        "Cinematic Drone Expedition": "Expédition Cinématographique par Drone",
        "Untouched Wilds of Iceland": "Les Terres Sauvages d'Islande",
        "Lo-Fi Beats to Code": "Musique Lo-Fi pour Coder et se Détendre",
        "I Built an AI Game Engine": "J'ai créé un moteur de jeu IA de zéro",
        "Master Chef Secret": "Secret de Grand Chef",
        "Cybersecurity Breakdown": "Analyse de Cybersécurité",
        "Fastest way to center anything in modern CSS": "Le moyen le plus rapide de centrer n'importe quoi en CSS moderne",
        "Wait till the drop!": "Attendez la chute !",
        "POV: You finally fixed the bug": "POV: Vous avez enfin corrigé le bug",
        "Satisfying 3D Physics simulation": "Simulation physique 3D ultra satisfaisante",
        "Listen to this CRUNCH!": "Écoutez ce croustillant !"
      },
      ar: {
        "Building the Next Generation Web App": "بناء الجيل القادم من تطبيقات الويب",
        "Architecture & Speed": "الهيكلية والسرعة",
        "Cinematic Drone Expedition": "رحلة تصوير سينمائية بالدرون",
        "Untouched Wilds of Iceland": "طبيعة آيسلندا الخلابة",
        "Lo-Fi Beats to Code": "موسيقى هادئة للبرمجة والاسترخاء",
        "I Built an AI Game Engine": "أنشأت محرك ألعاب ذكاء اصطناعي من الصفر",
        "Master Chef Secret": "سر الشيف العالمي",
        "Cybersecurity Breakdown": "تحليل أمن المعلومات والهجمات السحابية",
        "Fastest way to center anything in modern CSS": "أسرع طريقة لمحاذاة العناصر في منتصف CSS الحديث"
      }
    };

    let result = text;
    const currentDict = phrases[this.currentLang] || {};
    Object.keys(currentDict).forEach(k => {
      result = result.replace(new RegExp(k, 'gi'), currentDict[k]);
    });

    if (result === text) {
      const prefix = {
        sw: "[Kiswahili] ",
        yo: "[Yorùbá] ",
        ha: "[Hausa] ",
        ig: "[Igbo] ",
        am: "[አማርኛ] ",
        zu: "[isiZulu] ",
        fr: "[Français] ",
        ar: "[العربية] "
      }[this.currentLang] || "";
      return prefix + text;
    }
    return result;
  }
}

const i18n = new TranslationEngine();

// ==========================================
// 2. ENRICHED PAN-AFRICAN & EDUCATIONAL DATA
// ==========================================
const INITIAL_DATA = {
  // African Creators & Innovators
  creators: [
    {
      id: "ch-amina",
      name: "Amina Mwangi",
      handle: "@amina_tech",
      country: "🇰🇪 Kenya",
      city: "Nairobi",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
      bio: "Nairobi IoT & Robotics Engineer. Building smart solar microgrids & open-source African AgriTech 🌱⚡",
      followers: "340K",
      following: 142,
      likes: "2.8M",
      verified: true
    },
    {
      id: "ch-kwame",
      name: "Kwame Mensah",
      handle: "@kwame_dev",
      country: "🇬🇭 Ghana",
      city: "Accra",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
      bio: "Accra-based Software Architect & STEM Educator. Teaching AI & Web3 across West Africa 💻🇬🇭",
      followers: "198K",
      following: 89,
      likes: "1.4M",
      verified: true
    },
    {
      id: "ch-zola",
      name: "Zola Dlamini",
      handle: "@zola_agri",
      country: "🇿🇦 South Africa",
      city: "Cape Town",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80",
      bio: "Drone cinematography & AgriTech. Capturing African landscapes & automated drone farming 🚁🌾",
      followers: "520K",
      following: 210,
      likes: "4.9M",
      verified: true
    },
    {
      id: "ch-tunde",
      name: "Babatunde Adeleke",
      handle: "@tunde_ai",
      country: "🇳🇬 Nigeria",
      city: "Lagos",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
      bio: "Lagos AI Researcher. Natural Language Processing for African Languages (Yoruba, Hausa, Igbo) 🇳🇬🧠",
      followers: "410K",
      following: 95,
      likes: "3.1M",
      verified: true
    }
  ],

  // Direct Messages Initial Conversations
  conversations: [
    {
      id: "conv-1",
      creatorId: "ch-amina",
      lastMessage: "The new solar robotics tutorial is going live tomorrow! Check the preview.",
      time: "10m ago",
      unread: true,
      messages: [
        { id: "m1", sender: "ch-amina", text: "Habari! Welcome to TokTube Africa! Excited to connect.", time: "Yesterday 4:15 PM" },
        { id: "m2", sender: "me", text: "Great to connect Amina! Love your robotics & solar microgrid videos.", time: "Yesterday 4:20 PM" },
        { id: "m3", sender: "ch-amina", text: "Asante sana! The new solar robotics tutorial is going live tomorrow! Check the preview.", time: "10m ago" }
      ]
    },
    {
      id: "conv-2",
      creatorId: "ch-tunde",
      lastMessage: "Just pushed the dataset for Yoruba & Swahili NLP speech models on GitHub!",
      time: "2h ago",
      unread: false,
      messages: [
        { id: "m4", sender: "ch-tunde", text: "Hey! Let me know if you want to collaborate on the African AI models.", time: "2h ago" },
        { id: "m5", sender: "ch-tunde", text: "Just pushed the dataset for Yoruba & Swahili NLP speech models on GitHub!", time: "2h ago" }
      ]
    }
  ],

  // Educational YouTube Videos (Boosted by Education Algorithm)
  youtubeVideos: [
    {
      id: "yt-edu-1",
      title: "African Tech Revolution: Silicon Savannah & FinTech Innovations in Kenya & Nigeria",
      description: "How African tech hubs are pioneering mobile payments, solar energy distributed networks, and AI agriculture solutions for millions.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      duration: "14:15",
      category: "Education",
      views: "1.4M views",
      uploadDate: "2 days ago",
      isEducational: true,
      eduTags: ["#stem", "#tech", "#africa", "#fintech"],
      channel: {
        id: "ch-amina",
        name: "Amina Mwangi 🇰🇪",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        subscribers: "340K",
        verified: true
      },
      likes: 92400,
      dislikes: 80,
      comments: [
        {
          id: "c-edu-1",
          author: "NairobiTechie",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
          timestamp: "1 day ago",
          text: "The breakdown of how M-Pesa inspired global mobile money protocols is fascinating!",
          likes: 410,
          replies: []
        }
      ]
    },
    {
      id: "yt-edu-2",
      title: "Solar Irrigation & AgriTech: Modern Farming in Ghana & Rwanda",
      description: "Step-by-step masterclass on deploying low-cost automated IoT sensors and solar water pumps for smallholder farms.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80",
      duration: "18:40",
      category: "AgriTech",
      views: "890K views",
      uploadDate: "4 days ago",
      isEducational: true,
      eduTags: ["#agritech", "#stem", "#solarenergy", "#learn"],
      channel: {
        id: "ch-zola",
        name: "Zola Dlamini 🇿🇦",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
        subscribers: "520K",
        verified: true
      },
      likes: 64000,
      dislikes: 45,
      comments: []
    },
    {
      id: "yt-edu-3",
      title: "Great African Kingdoms: Ancient Architecture of Great Zimbabwe & Mali",
      description: "Exploring the sophisticated dry-stone masonry of Great Zimbabwe and the adobe earthen mosques of Timbuktu and Djenne.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
      duration: "21:10",
      category: "Education",
      views: "2.1M views",
      uploadDate: "1 week ago",
      isEducational: true,
      eduTags: ["#history", "#architecture", "#africa", "#education"],
      channel: {
        id: "ch-kwame",
        name: "Kwame Mensah 🇬🇭",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        subscribers: "198K",
        verified: true
      },
      likes: 180000,
      dislikes: 120,
      comments: []
    },
    {
      id: "yt-1",
      title: "Building the Next Generation Web App in 2026: Architecture & Speed",
      description: "Comprehensive guide to ultra-fast client architectures, offline caching, and responsive cross-platform media feeds.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
      duration: "15:24",
      category: "Tech",
      views: "1.2M views",
      uploadDate: "3 days ago",
      isEducational: true,
      eduTags: ["#coding", "#stem", "#webdev"],
      channel: {
        id: "ch-tunde",
        name: "Babatunde Adeleke 🇳🇬",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
        subscribers: "410K",
        verified: true
      },
      likes: 84200,
      dislikes: 120,
      comments: []
    },
    {
      id: "yt-5",
      title: "Master Chef Secret: Jollof Wars - The Authentic Cross-African Recipe",
      description: "Chef breakdown of smoky firewood party Jollof rice perfected across West Africa.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
      duration: "13:12",
      category: "Food",
      views: "1.9M views",
      uploadDate: "5 days ago",
      isEducational: false,
      channel: {
        id: "ch-culinary",
        name: "Artisan Kitchen",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80",
        subscribers: "1.1M",
        verified: true
      },
      likes: 98000,
      dislikes: 420,
      comments: []
    }
  ],

  // TikTok Vertical Reels (With Education Boost Tags)
  tiktokReels: [
    {
      id: "tok-edu-1",
      title: "How M-Pesa transformed mobile money across Africa 📱🇰🇪 #edutok #africa #fintech",
      caption: "Over 50 million people use M-Pesa every single day without needing a traditional bank account! Here is how the protocol works.",
      soundTitle: "Afrobeats Pulse - Nairobi Vibe 🎵",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
      isEducational: true,
      channel: {
        id: "ch-amina",
        name: "@amina_tech",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        verified: true
      },
      likes: 245000,
      commentsCount: 1840,
      sharesCount: 12000,
      bookmarksCount: 45000,
      ytEquivalentId: "yt-edu-1",
      comments: [
        {
          id: "tc-1",
          author: "KigaliDev",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
          timeAgo: "2h ago",
          text: "Mobile money in East Africa is literally 10 years ahead of anywhere else!",
          likes: 512,
          replies: []
        }
      ]
    },
    {
      id: "tok-edu-2",
      title: "Ancient African Mathematics: The Ishango Bone 🦴📐 #math #history #stem",
      caption: "Did you know the earliest prime number sequence was discovered on a 20,000-year-old tool in Central Africa? Mind blown! 🧠",
      soundTitle: "Original Sound - African Drums & Kalimba",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80",
      isEducational: true,
      channel: {
        id: "ch-kwame",
        name: "@kwame_dev",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        verified: true
      },
      likes: 412000,
      commentsCount: 3120,
      sharesCount: 28000,
      bookmarksCount: 88000,
      ytEquivalentId: "yt-edu-3",
      comments: []
    },
    {
      id: "tok-edu-3",
      title: "How vertical farming in Lagos feeds thousands 🌱🇳🇬 #agritech #innovation #stem",
      caption: "Using 90% less water with solar hydroponics on rooftop gardens in the heart of Lagos!",
      soundTitle: "Lagos Tech Beat - AfroTech",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
      isEducational: true,
      channel: {
        id: "ch-tunde",
        name: "@tunde_ai",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
        verified: true
      },
      likes: 310000,
      commentsCount: 2190,
      sharesCount: 16000,
      bookmarksCount: 62000,
      ytEquivalentId: "yt-1",
      comments: []
    },
    {
      id: "tok-1",
      title: "Fastest way to center anything in modern CSS ✨ #css #webdev #frontend #toktube",
      caption: "Stop using margins in 2026! Just use display: grid and place-content: center. Clean, bulletproof, and 100% responsive.",
      soundTitle: "Original Sound - DevHacks Beats 🎵",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
      isEducational: true,
      channel: {
        id: "ch-kwame",
        name: "@kwame_dev",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        verified: true
      },
      likes: 124500,
      commentsCount: 1420,
      sharesCount: 8900,
      bookmarksCount: 31200,
      comments: []
    }
  ],

  samplePresets: [
    {
      name: "African Tech & Innovation",
      type: "tube",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      category: "Tech",
      sound: "Afrobeats Pulse - Nairobi Vibe 🎵"
    },
    {
      name: "Smart Agriculture Drone",
      type: "tok",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      category: "AgriTech",
      sound: "Lagos Tech Beat - AfroTech"
    },
    {
      name: "African History & STEM",
      type: "tok",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      category: "Education",
      sound: "Original Sound - African Drums & Kalimba"
    }
  ],

  initialFeedback: [
    {
      id: "fb-1",
      author: "Kwesi from Ghana",
      rating: 5,
      category: "African Languages & Translation",
      text: "The translation support for Swahili and Yoruba makes this app so accessible across our universities!",
      date: "1 day ago"
    },
    {
      id: "fb-2",
      author: "Ngozi from Lagos",
      rating: 5,
      category: "Educational & STEM Content",
      text: "The EduBoost algorithm is revolutionary. Finally an app that rewards learning instead of mindless scrolling!",
      date: "2 days ago"
    }
  ]
};

// ==========================================
// 3. SOUND SYNTHESIZER
// ==========================================
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('toktube_sound_fx') !== 'false';
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    localStorage.setItem('toktube_sound_fx', this.enabled.toString());
    if (this.enabled) this.playNotificationSound();
    return this.enabled;
  }

  playLikeSound() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch(e) {}
  }

  playSubscribeSound() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [659.25, 830.61].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.2, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.35);
      });
    } catch(e) {}
  }

  playSwitchSound() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.1);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch(e) {}
  }

  playNotificationSound() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.1);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch(e) {}
  }
}
const soundFX = new SoundEffects();

// ==========================================
// 4. STORAGE & DATA ACCESS LAYER
// ==========================================
class TokStorage {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem('toktube_yt_videos')) {
      localStorage.setItem('toktube_yt_videos', JSON.stringify(INITIAL_DATA.youtubeVideos));
    }
    if (!localStorage.getItem('toktube_tok_reels')) {
      localStorage.setItem('toktube_tok_reels', JSON.stringify(INITIAL_DATA.tiktokReels));
    }
    if (!localStorage.getItem('toktube_creators')) {
      localStorage.setItem('toktube_creators', JSON.stringify(INITIAL_DATA.creators));
    }
    if (!localStorage.getItem('toktube_conversations')) {
      localStorage.setItem('toktube_conversations', JSON.stringify(INITIAL_DATA.conversations));
    }
    if (!localStorage.getItem('toktube_blocked_users')) {
      localStorage.setItem('toktube_blocked_users', JSON.stringify([]));
    }
    if (!localStorage.getItem('toktube_feedback')) {
      localStorage.setItem('toktube_feedback', JSON.stringify(INITIAL_DATA.initialFeedback));
    }
    if (!localStorage.getItem('toktube_edu_streak')) {
      localStorage.setItem('toktube_edu_streak', '4');
    }
    if (!localStorage.getItem('toktube_eduboost_active')) {
      localStorage.setItem('toktube_eduboost_active', 'true');
    }
  }

  getYoutubeVideos() {
    try {
      const vids = JSON.parse(localStorage.getItem('toktube_yt_videos')) || INITIAL_DATA.youtubeVideos;
      const blocked = this.getBlockedUserIds();
      return vids.filter(v => !blocked.includes(v.channel.id));
    } catch {
      return INITIAL_DATA.youtubeVideos;
    }
  }

  getYoutubeVideoById(id) {
    return this.getYoutubeVideos().find(v => v.id === id) || null;
  }

  getTiktokReels() {
    try {
      const reels = JSON.parse(localStorage.getItem('toktube_tok_reels')) || INITIAL_DATA.tiktokReels;
      const blocked = this.getBlockedUserIds();
      return reels.filter(r => !blocked.includes(r.channel.id));
    } catch {
      return INITIAL_DATA.tiktokReels;
    }
  }

  getTiktokReelById(id) {
    return this.getTiktokReels().find(r => r.id === id) || null;
  }

  getCreators() {
    try {
      return JSON.parse(localStorage.getItem('toktube_creators')) || INITIAL_DATA.creators;
    } catch {
      return INITIAL_DATA.creators;
    }
  }

  getCreatorById(id) {
    return this.getCreators().find(c => c.id === id) || null;
  }

  getBlockedUserIds() {
    try {
      return JSON.parse(localStorage.getItem('toktube_blocked_users')) || [];
    } catch {
      return [];
    }
  }

  isUserBlocked(userId) {
    return this.getBlockedUserIds().includes(userId);
  }

  toggleBlockUser(userId) {
    const list = this.getBlockedUserIds();
    const idx = list.indexOf(userId);
    let nowBlocked = false;
    if (idx > -1) {
      list.splice(idx, 1);
      nowBlocked = false;
    } else {
      list.push(userId);
      nowBlocked = true;
    }
    localStorage.setItem('toktube_blocked_users', JSON.stringify(list));
    return nowBlocked;
  }

  getConversations() {
    try {
      return JSON.parse(localStorage.getItem('toktube_conversations')) || INITIAL_DATA.conversations;
    } catch {
      return INITIAL_DATA.conversations;
    }
  }

  addMessageToConversation(convId, text) {
    const convs = this.getConversations();
    const conv = convs.find(c => c.id === convId);
    if (!conv) return null;

    const newMsg = {
      id: "msg-" + Date.now(),
      sender: "me",
      text: text,
      time: "Just now"
    };

    conv.messages.push(newMsg);
    conv.lastMessage = text;
    conv.time = "Just now";
    localStorage.setItem('toktube_conversations', JSON.stringify(convs));
    return newMsg;
  }

  getFeedbackList() {
    try {
      return JSON.parse(localStorage.getItem('toktube_feedback')) || INITIAL_DATA.initialFeedback;
    } catch {
      return INITIAL_DATA.initialFeedback;
    }
  }

  addFeedback(feedbackObj) {
    const list = this.getFeedbackList();
    list.unshift(feedbackObj);
    localStorage.setItem('toktube_feedback', JSON.stringify(list));
  }

  isEduBoostActive() {
    return localStorage.getItem('toktube_eduboost_active') !== 'false';
  }

  toggleEduBoost() {
    const active = !this.isEduBoostActive();
    localStorage.setItem('toktube_eduboost_active', active.toString());
    return active;
  }

  getEduStreak() {
    return parseInt(localStorage.getItem('toktube_edu_streak') || '4', 10);
  }

  // Like & Bookmark operations
  getLikedIds() {
    try { return JSON.parse(localStorage.getItem('toktube_liked_video_ids')) || []; } catch { return []; }
  }

  isLiked(id) {
    return this.getLikedIds().includes(id);
  }

  toggleLike(id, isTok = false) {
    const liked = this.getLikedIds();
    const idx = liked.indexOf(id);
    let nowLiked = false;
    if (idx > -1) {
      liked.splice(idx, 1);
      nowLiked = false;
    } else {
      liked.push(id);
      nowLiked = true;
    }
    localStorage.setItem('toktube_liked_video_ids', JSON.stringify(liked));
    return nowLiked;
  }

  getBookmarkedIds() {
    try { return JSON.parse(localStorage.getItem('toktube_bookmarked_ids')) || []; } catch { return []; }
  }

  isBookmarked(id) {
    return this.getBookmarkedIds().includes(id);
  }

  toggleBookmark(id) {
    const list = this.getBookmarkedIds();
    const idx = list.indexOf(id);
    let nowSaved = false;
    if (idx > -1) {
      list.splice(idx, 1);
      nowSaved = false;
    } else {
      list.push(id);
      nowSaved = true;
    }
    localStorage.setItem('toktube_bookmarked_ids', JSON.stringify(list));
    return nowSaved;
  }

  getSubscribedChannelIds() {
    try { return JSON.parse(localStorage.getItem('toktube_subscribed_channel_ids')) || ["ch-amina"]; } catch { return ["ch-amina"]; }
  }

  isSubscribed(chId) {
    return this.getSubscribedChannelIds().includes(chId);
  }

  toggleSubscribe(chId) {
    const subs = this.getSubscribedChannelIds();
    const idx = subs.indexOf(chId);
    let nowSubbed = false;
    if (idx > -1) {
      subs.splice(idx, 1);
      nowSubbed = false;
    } else {
      subs.push(chId);
      nowSubbed = true;
    }
    localStorage.setItem('toktube_subscribed_channel_ids', JSON.stringify(subs));
    return nowSubbed;
  }

  addVideo(videoData) {
    if (videoData.type === 'tok') {
      const reels = this.getTiktokReels();
      reels.unshift(videoData);
      localStorage.setItem('toktube_tok_reels', JSON.stringify(reels));
    } else {
      const videos = this.getYoutubeVideos();
      videos.unshift(videoData);
      localStorage.setItem('toktube_yt_videos', JSON.stringify(videos));
    }
  }

  addToHistory(videoId) {
    try {
      let history = JSON.parse(localStorage.getItem('toktube_history_video_ids')) || [];
      history = history.filter(id => id !== videoId);
      history.unshift(videoId);
      localStorage.setItem('toktube_history_video_ids', JSON.stringify(history));
    } catch {}
  }

  getHistoryIds() {
    try { return JSON.parse(localStorage.getItem('toktube_history_video_ids')) || []; } catch { return []; }
  }

  clearHistory() {
    localStorage.setItem('toktube_history_video_ids', JSON.stringify([]));
  }
}
const storage = new TokStorage();

// ==========================================
// 5. CREATOR STUDIO UPLOAD
// ==========================================
class CreatorStudio {
  constructor(modalBackdrop, onUploadSuccess) {
    this.modal = modalBackdrop;
    this.onUploadSuccess = onUploadSuccess;
    this.selectedType = 'tok';
    this.selectedVideoUrl = '';

    this.initElements();
    this.bindEvents();
  }

  initElements() {
    if (!this.modal) return;
    this.typeCards = this.modal.querySelectorAll('.type-choice-card');
    this.dropzone = this.modal.querySelector('#upload-dropzone');
    this.fileInput = this.modal.querySelector('#file-upload-input');
    this.previewContainer = this.modal.querySelector('#upload-preview-container');
    this.previewVideo = this.modal.querySelector('#upload-preview-video');
    this.presetsContainer = this.modal.querySelector('#presets-chips-container');
    this.titleInput = this.modal.querySelector('#upload-title-input');
    this.descInput = this.modal.querySelector('#upload-desc-input');
    this.categorySelect = this.modal.querySelector('#upload-category-select');
    this.soundInput = this.modal.querySelector('#upload-sound-input');
    this.publishBtn = this.modal.querySelector('#btn-publish-video');
  }

  bindEvents() {
    if (!this.modal) return;

    this.typeCards.forEach(card => {
      card.addEventListener('click', () => {
        this.typeCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedType = card.dataset.type;
        soundFX.playSwitchSound();
      });
    });

    if (this.dropzone && this.fileInput) {
      this.dropzone.addEventListener('click', () => this.fileInput.click());
      this.fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const objectUrl = URL.createObjectURL(file);
          this.setVideoSource(objectUrl, file.name);
          soundFX.playNotificationSound();
        }
      });
    }

    if (this.publishBtn) {
      this.publishBtn.addEventListener('click', () => this.handlePublish());
    }

    this.renderPresets();
  }

  renderPresets() {
    if (!this.presetsContainer) return;
    this.presetsContainer.innerHTML = '';
    INITIAL_DATA.samplePresets.forEach(preset => {
      const chip = document.createElement('button');
      chip.className = 'preset-chip';
      chip.textContent = `${preset.name} (${preset.type.toUpperCase()})`;
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        this.presetsContainer.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.selectedType = preset.type;
        this.updateTypeCardSelection(preset.type);
        if (this.categorySelect) this.categorySelect.value = preset.category;
        if (this.soundInput) this.soundInput.value = preset.sound;
        this.setVideoSource(preset.url, preset.name);
        soundFX.playSwitchSound();
      });
      this.presetsContainer.appendChild(chip);
    });
  }

  updateTypeCardSelection(type) {
    if (!this.typeCards) return;
    this.typeCards.forEach(card => {
      card.classList.toggle('selected', card.dataset.type === type);
    });
  }

  setVideoSource(url, label) {
    this.selectedVideoUrl = url;
    if (this.previewContainer && this.previewVideo) {
      this.previewContainer.style.display = 'block';
      this.previewVideo.src = url;
      this.previewVideo.play().catch(() => {});
    }
  }

  open(preferredType = 'tok') {
    if (!this.modal) return;
    this.selectedType = preferredType;
    this.updateTypeCardSelection(preferredType);
    this.renderPresets();
    this.modal.classList.add('open');
    soundFX.playNotificationSound();

    if (!this.selectedVideoUrl && INITIAL_DATA.samplePresets.length > 0) {
      const first = INITIAL_DATA.samplePresets[0];
      this.setVideoSource(first.url, first.name);
    }
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    if (this.previewVideo) this.previewVideo.pause();
  }

  handlePublish() {
    const title = (this.titleInput ? this.titleInput.value.trim() : '') || 'African Innovation Showcase';
    const desc = (this.descInput ? this.descInput.value.trim() : '') || 'Published on TokTube Africa! #africa #learn';
    const category = (this.categorySelect ? this.categorySelect.value : 'Education') || 'Education';
    const sound = (this.soundInput ? this.soundInput.value.trim() : '') || 'Original Sound - TokTube Africa';

    const videoUrl = this.selectedVideoUrl || INITIAL_DATA.samplePresets[0].url;
    const thumbnail = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80";
    const isTok = (this.selectedType === 'tok');
    const newId = (isTok ? 'tok-u-' : 'yt-u-') + Date.now();

    const videoPayload = isTok ? {
      id: newId,
      type: 'tok',
      title: title,
      caption: `${title} - ${desc}`,
      soundTitle: sound,
      videoUrl: videoUrl,
      thumbnail: thumbnail,
      channel: {
        id: "usr-me",
        name: "@pulsecreator",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        verified: true
      },
      likes: 1,
      commentsCount: 0,
      sharesCount: 0,
      bookmarksCount: 0,
      comments: []
    } : {
      id: newId,
      type: 'tube',
      title: title,
      description: desc,
      videoUrl: videoUrl,
      thumbnail: thumbnail,
      duration: "4:20",
      category: category,
      views: "1 view",
      uploadDate: "Just now",
      isEducational: (category === 'Education' || category === 'Tech' || category === 'AgriTech'),
      channel: {
        id: "usr-me",
        name: "PulseCreator 🌍",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        subscribers: "1",
        verified: true
      },
      likes: 1,
      dislikes: 0,
      comments: []
    };

    storage.addVideo(videoPayload);
    if (this.titleInput) this.titleInput.value = '';
    if (this.descInput) this.descInput.value = '';
    this.close();

    soundFX.playSubscribeSound();
    if (window.tokApp) window.tokApp.showToast(`Published to ${isTok ? 'Toks Feed' : 'YouTube Grid'}! 🚀`);
    if (this.onUploadSuccess) this.onUploadSuccess(isTok ? 'tok' : 'tube', newId);
  }
}

// ==========================================
// 6. TIKTOK VERTICAL FEED
// ==========================================
class TikTokFeed {
  constructor(container, onNavigateToWatch) {
    this.container = container;
    this.onNavigateToWatch = onNavigateToWatch;
    this.activeReelIndex = 0;
    this.reels = [];
    this.observer = null;
    this.isMutedGlobal = false;
  }

  render() {
    this.reels = storage.getTiktokReels();
    this.container.innerHTML = '';

    if (this.reels.length === 0) {
      this.container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--text-secondary);">
          <p style="font-size: 18px; margin-bottom: 12px;">No Toks available right now!</p>
          <button class="btn-primary" onclick="window.tokApp.openUploadModal('tok')">Upload First Tok</button>
        </div>
      `;
      return;
    }

    this.reels.forEach((reel, index) => {
      const reelEl = document.createElement('div');
      reelEl.className = 'tok-reel';
      reelEl.dataset.index = index;
      reelEl.dataset.id = reel.id;

      const isLiked = storage.isLiked(reel.id);
      const isBookmarked = storage.isBookmarked(reel.id);
      const isSubbed = storage.isSubscribed(reel.channel.id);

      reelEl.innerHTML = `
        <div class="tok-ambient-glow" style="background-image: url('${reel.thumbnail}');"></div>
        <div class="tok-stage">
          <video class="tok-video" src="${reel.videoUrl}" loop playsinline preload="metadata"></video>
          <div class="tok-play-pause-badge">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>

          <button class="tok-sound-toggle-btn" title="Toggle Mute">
            <svg class="icon-unmuted" viewBox="0 0 24 24" style="${this.isMutedGlobal ? 'display:none;' : ''}"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
            <svg class="icon-muted" viewBox="0 0 24 24" style="${this.isMutedGlobal ? '' : 'display:none;'}"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63z"/></svg>
          </button>

          <div class="tok-timeline-container" title="Seek video">
            <div class="tok-timeline-bar"><div class="tok-timeline-progress"></div></div>
          </div>

          <div class="tok-meta-overlay">
            <div class="tok-author-row" style="cursor: pointer;" onclick="if(window.tokApp) window.tokApp.openCreatorProfileModal('${reel.channel.id}')">
              <span class="tok-author-name">${reel.channel.name}</span>
              ${reel.isEducational ? '<span class="badge badge-edu" style="font-size: 9px;">🎓 EDU</span>' : ''}
            </div>
            <div class="tok-caption">${reel.caption || ''}</div>
            <button class="btn-translate-caption" data-text="${encodeURIComponent(reel.caption || '')}">
              <span>🌍 Translate into selected language</span>
            </button>

            ${reel.ytEquivalentId ? `
              <button class="tok-yt-teaser-btn" data-yt-id="${reel.ytEquivalentId}">
                <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: #fff;"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 21c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 3c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
                Watch Long Version on YouTube
              </button>
            ` : ''}

            <div class="tok-sound-marquee" onclick="if(window.tokApp) window.tokApp.openSoundModal('${reel.soundTitle || 'Original Audio'}')">
              <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
              <span>${reel.soundTitle || 'Original Audio'}</span>
            </div>
          </div>

          <div class="tok-action-rail">
            <div class="tok-creator-bubble" onclick="if(window.tokApp) window.tokApp.openCreatorProfileModal('${reel.channel.id}')">
              <img class="tok-creator-avatar" src="${reel.channel.avatar}" alt="${reel.channel.name}">
              <div class="tok-follow-plus ${isSubbed ? 'followed' : ''}">${isSubbed ? '✓' : '+'}</div>
            </div>

            <div class="tok-action-btn btn-like-tok ${isLiked ? 'liked' : ''}" data-id="${reel.id}">
              <div class="tok-action-icon"><svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
              <span class="tok-action-count">${(reel.likes || 0).toLocaleString()}</span>
            </div>

            <div class="tok-action-btn btn-comment-tok" data-id="${reel.id}">
              <div class="tok-action-icon"><svg viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg></div>
              <span class="tok-action-count">${(reel.commentsCount || 0).toLocaleString()}</span>
            </div>

            <div class="tok-action-btn btn-bookmark-tok ${isBookmarked ? 'bookmarked' : ''}" data-id="${reel.id}">
              <div class="tok-action-icon"><svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg></div>
              <span class="tok-action-count">${(reel.bookmarksCount || 420).toLocaleString()}</span>
            </div>

            <div class="tok-action-btn btn-share-tok" data-id="${reel.id}" onclick="if(window.tokApp) window.tokApp.openShareModal('${reel.id}', '${reel.title}')">
              <div class="tok-action-icon"><svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/></svg></div>
              <span class="tok-action-count">${(reel.sharesCount || 150).toLocaleString()}</span>
            </div>

            <div class="tok-vinyl-container" onclick="if(window.tokApp) window.tokApp.openSoundModal('${reel.soundTitle || 'Original Audio'}')">
              <div class="tok-vinyl-disc"><div class="tok-vinyl-art" style="background-image: url('${reel.thumbnail}'); background-size: cover;"></div></div>
              <span class="floating-note">🎵</span><span class="floating-note">🎶</span>
            </div>
          </div>
        </div>
      `;

      this.bindReelInteractions(reelEl, reel);
      this.container.appendChild(reelEl);
    });

    this.setupIntersectionObserver();
  }

  bindReelInteractions(reelEl, reel) {
    const video = reelEl.querySelector('.tok-video');
    const playBadge = reelEl.querySelector('.tok-play-pause-badge');
    const stage = reelEl.querySelector('.tok-stage');
    const soundToggle = reelEl.querySelector('.tok-sound-toggle-btn');
    const translateBtn = reelEl.querySelector('.btn-translate-caption');
    const captionEl = reelEl.querySelector('.tok-caption');

    video.muted = this.isMutedGlobal;

    if (translateBtn && captionEl) {
      translateBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const original = decodeURIComponent(translateBtn.dataset.text);
        const translated = i18n.translateContent(original);
        captionEl.textContent = translated;
        soundFX.playNotificationSound();
        if (window.tokApp) window.tokApp.showToast(i18n.t('translated_by'));
      });
    }

    if (soundToggle) {
      soundToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.isMutedGlobal = !this.isMutedGlobal;
        this.container.querySelectorAll('.tok-video').forEach(v => v.muted = this.isMutedGlobal);
        if (window.tokApp) window.tokApp.showToast(this.isMutedGlobal ? 'Audio muted 🔇' : 'Audio unmuted 🔊');
      });
    }

    stage.addEventListener('click', (e) => {
      if (e.target.closest('.tok-action-rail') || e.target.closest('.tok-yt-teaser-btn') || 
          e.target.closest('.tok-sound-toggle-btn') || e.target.closest('.btn-translate-caption')) {
        return;
      }
      if (video.paused) {
        video.play();
        playBadge.classList.remove('visible');
      } else {
        video.pause();
        playBadge.classList.add('visible');
      }
    });

    const likeBtn = reelEl.querySelector('.btn-like-tok');
    if (likeBtn) {
      likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundFX.playLikeSound();
        const nowLiked = storage.toggleLike(reel.id, true);
        likeBtn.classList.toggle('liked', nowLiked);
      });
    }

    const ytBtn = reelEl.querySelector('.tok-yt-teaser-btn');
    if (ytBtn) {
      ytBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.pauseAll();
        if (this.onNavigateToWatch) this.onNavigateToWatch(ytBtn.dataset.ytId);
      });
    }
  }

  setupIntersectionObserver() {
    if (this.observer) this.observer.disconnect();
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target.querySelector('.tok-video');
        if (entry.isIntersecting) {
          this.activeReelIndex = parseInt(entry.target.dataset.index, 10);
          if (video) {
            video.currentTime = 0;
            video.muted = this.isMutedGlobal;
            video.play().catch(() => {});
          }
        } else {
          if (video) video.pause();
        }
      });
    }, { root: this.container, threshold: 0.7 });

    this.container.querySelectorAll('.tok-reel').forEach(el => this.observer.observe(el));
  }

  pauseAll() {
    this.container.querySelectorAll('.tok-video').forEach(v => v.pause());
  }

  resumeActive() {
    const activeReel = this.container.querySelectorAll('.tok-reel')[this.activeReelIndex];
    if (activeReel) {
      const video = activeReel.querySelector('.tok-video');
      if (video) video.play().catch(() => {});
    }
  }
}

// ==========================================
// 7. YOUTUBE FEED
// ==========================================
class YouTubeFeed {
  constructor(container, onNavigateToWatch, onNavigateToTok) {
    this.container = container;
    this.onNavigateToWatch = onNavigateToWatch;
    this.onNavigateToTok = onNavigateToTok;
    this.currentCategory = 'All';
    this.categories = ['All', 'Education', 'Tech', 'AgriTech', 'Music', 'Food', 'Gaming'];
  }

  render(searchQuery = '') {
    let allVideos = storage.getYoutubeVideos();
    const reels = storage.getTiktokReels();

    // Apply Education Algorithm Boost if active
    if (storage.isEduBoostActive()) {
      allVideos = [...allVideos].sort((a, b) => (b.isEducational ? 1 : 0) - (a.isEducational ? 1 : 0));
    }

    const filtered = allVideos.filter(v => {
      const matchesCat = (this.currentCategory === 'All') || (v.category === this.currentCategory);
      const matchesQ = !searchQuery || v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.channel.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQ;
    });

    this.container.innerHTML = `
      <div class="category-chips-bar">
        ${this.categories.map(cat => `
          <button class="category-chip ${this.currentCategory === cat ? 'active' : ''}" data-category="${cat}">
            ${cat === 'Education' ? '🎓 Education (EduBoost)' : cat}
          </button>
        `).join('')}
      </div>

      <div class="video-grid">
        ${filtered.length === 0 ? `
          <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
            <p style="font-size: 18px;">No videos found.</p>
          </div>
        ` : `
          ${filtered.slice(0, 2).map(v => this.createCardHTML(v)).join('')}
          ${reels.length > 0 && !searchQuery ? this.createShortsShelf(reels) : ''}
          ${filtered.slice(2).map(v => this.createCardHTML(v)).join('')}
        `}
      </div>
    `;

    this.bindEvents();
  }

  createCardHTML(video) {
    return `
      <div class="video-card" data-video-id="${video.id}">
        <div class="video-thumbnail-wrapper">
          <img class="video-thumbnail" src="${video.thumbnail}" alt="${video.title}">
          <span class="badge-duration">${video.duration}</span>
          ${video.isEducational ? '<span class="badge badge-edu" style="position: absolute; top: 8px; left: 8px;">🎓 EDU</span>' : ''}
        </div>
        <div class="video-info-row">
          <img class="channel-avatar" src="${video.channel.avatar}" alt="${video.channel.name}" onclick="event.stopPropagation(); if(window.tokApp) window.tokApp.openCreatorProfileModal('${video.channel.id}')">
          <div class="video-meta">
            <h3 class="video-title">${video.title}</h3>
            <div class="channel-name-row" onclick="event.stopPropagation(); if(window.tokApp) window.tokApp.openCreatorProfileModal('${video.channel.id}')">
              <span>${video.channel.name}</span>
            </div>
            <div class="video-stats">
              <span>${video.views}</span> • <span>${video.uploadDate}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  createShortsShelf(reels) {
    return `
      <div class="shorts-shelf-container">
        <div class="shorts-shelf-header">
          <div class="shorts-shelf-title">
            <svg viewBox="0 0 24 24"><path d="M17.77 10.32l-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zM10 14.5v-5l4.5 2.5-4.5 2.5z"/></svg>
            <span>Trending African Toks</span>
          </div>
          <button class="btn-secondary" onclick="window.tokApp.showView('tok')">Open Tok Feed →</button>
        </div>
        <div class="shorts-shelf-grid">
          ${reels.slice(0, 5).map(r => `
            <div class="short-card" onclick="window.tokApp.showView('tok')">
              <div class="short-thumbnail-wrapper">
                <img class="short-thumbnail" src="${r.thumbnail}">
                <span class="badge badge-tok short-badge">TOK</span>
              </div>
              <div class="short-meta">
                <h4 class="short-title">${r.title}</h4>
                <div class="short-views">${(r.likes || 0).toLocaleString()} likes</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.container.querySelectorAll('.category-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        soundFX.playSwitchSound();
        this.currentCategory = chip.dataset.category;
        this.render();
      });
    });

    this.container.querySelectorAll('.video-card').forEach(card => {
      card.addEventListener('click', () => {
        if (this.onNavigateToWatch) this.onNavigateToWatch(card.dataset.videoId);
      });
    });
  }
}

// ==========================================
// 8. MASTER TOKTUBE APP
// ==========================================
class TokTubeApp {
  constructor() {
    this.currentView = 'tube';
    this.activeWatchVideoId = null;
    this.activeConversationId = "conv-1";

    this.initDOM();
    this.initModules();
    this.bindEvents();
    this.showView('tube');
    i18n.applyTranslations();
  }

  initDOM() {
    this.views = {
      tube: document.getElementById('view-tube'),
      tok: document.getElementById('view-tok'),
      watch: document.getElementById('view-watch'),
      learn: document.getElementById('view-learn'),
      friends: document.getElementById('view-friends'),
      messages: document.getElementById('view-messages'),
      library: document.getElementById('view-library'),
      feedback: document.getElementById('view-feedback')
    };

    this.sidebar = document.getElementById('sidebar');
    this.menuToggle = document.getElementById('menu-toggle');
    this.searchInput = document.getElementById('search-input');
    this.searchBtn = document.getElementById('btn-search');
    this.voiceSearchBtn = document.getElementById('btn-voice-search');
    this.btnUpload = document.getElementById('btn-upload');
    this.btnSoundFx = document.getElementById('btn-sound-fx');
    this.btnNotif = document.getElementById('btn-notif');
    this.notifDropdown = document.getElementById('notif-dropdown');
    this.notifBadge = document.getElementById('notif-badge');

    // Language Dropdown
    this.btnLangSelector = document.getElementById('btn-lang-selector');
    this.langDropdown = document.getElementById('lang-dropdown-menu');

    // EduBoost Streak Pill
    this.eduBoostBtn = document.getElementById('eduboost-toggle-btn');

    // Modals
    this.creatorProfileModal = document.getElementById('creator-profile-modal');
    this.uploadModal = document.getElementById('upload-modal');
    this.voiceModal = document.getElementById('voice-search-modal');
    this.profileModal = document.getElementById('profile-modal');
    this.soundDetailsModal = document.getElementById('sound-details-modal');
    this.shareModal = document.getElementById('share-modal');
    this.toastContainer = document.getElementById('toast-container');
  }

  initModules() {
    this.youtubeFeed = new YouTubeFeed(
      this.views.tube,
      (id) => this.navigateToWatch(id),
      () => this.showView('tok')
    );

    this.tiktokFeed = new TikTokFeed(
      this.views.tok,
      (id) => this.navigateToWatch(id)
    );

    this.creatorStudio = new CreatorStudio(
      this.uploadModal,
      (type, id) => {
        this.youtubeFeed.render();
        this.tiktokFeed.render();
        if (type === 'tok') this.showView('tok');
        else this.navigateToWatch(id);
      }
    );
  }

  bindEvents() {
    // Sidebar Toggle
    if (this.menuToggle && this.sidebar) {
      this.menuToggle.addEventListener('click', () => this.sidebar.classList.toggle('collapsed'));
    }

    // Navigation Items
    document.querySelectorAll('[data-view-nav]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        soundFX.playSwitchSound();
        this.showView(item.dataset.viewNav);
      });
    });

    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        soundFX.playSwitchSound();
        if (btn.dataset.view) this.showView(btn.dataset.view);
      });
    });

    // Language Selector Toggle
    if (this.btnLangSelector && this.langDropdown) {
      this.btnLangSelector.addEventListener('click', (e) => {
        e.stopPropagation();
        this.langDropdown.classList.toggle('open');
      });

      this.langDropdown.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const lang = opt.dataset.lang;
          i18n.setLanguage(lang);
          this.langDropdown.classList.remove('open');
          soundFX.playNotificationSound();
          this.showToast(`Language set to ${opt.textContent} 🌍`);
        });
      });

      window.addEventListener('click', () => this.langDropdown.classList.remove('open'));
    }

    // EduBoost Algorithm Switch
    if (this.eduBoostBtn) {
      this.eduBoostBtn.addEventListener('click', () => {
        const active = storage.toggleEduBoost();
        soundFX.playNotificationSound();
        this.eduBoostBtn.style.borderColor = active ? 'var(--africa-gold)' : 'var(--border-subtle)';
        this.eduBoostBtn.style.color = active ? 'var(--africa-gold)' : 'var(--text-muted)';
        this.showToast(active ? "EduBoost ON: Prioritizing STEM & African Education 🎓" : "EduBoost OFF");
        this.youtubeFeed.render();
      });
    }

    // Sound FX Toggle
    if (this.btnSoundFx) {
      this.btnSoundFx.addEventListener('click', () => {
        const isEnabled = soundFX.toggleSound();
        this.showToast(isEnabled ? 'Sound FX enabled 🔔' : 'Sound FX muted 🔕');
      });
    }

    // Notifications Dropdown
    if (this.btnNotif && this.notifDropdown) {
      this.btnNotif.addEventListener('click', (e) => {
        e.stopPropagation();
        this.notifDropdown.classList.toggle('open');
      });
      window.addEventListener('click', () => this.notifDropdown.classList.remove('open'));
    }

    // Search
    if (this.searchBtn && this.searchInput) {
      const exec = () => {
        const q = this.searchInput.value.trim();
        this.showView('tube');
        soundFX.playSwitchSound();
        this.youtubeFeed.render(q);
      };
      this.searchBtn.addEventListener('click', exec);
      this.searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') exec(); });
    }

    // Friends Tab Invites
    const whatsappBtn = document.getElementById('btn-invite-whatsapp');
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', () => {
        const text = encodeURIComponent("Join me on TokTube Africa! Watch African toks, learn STEM & chat: https://toktube.africa");
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
      });
    }

    const telegramBtn = document.getElementById('btn-invite-telegram');
    if (telegramBtn) {
      telegramBtn.addEventListener('click', () => {
        const text = encodeURIComponent("Join TokTube Africa! The Pan-African video & learning community.");
        window.open(`https://t.me/share/url?url=https://toktube.africa&text=${text}`, '_blank');
      });
    }

    const smsBtn = document.getElementById('btn-invite-sms');
    if (smsBtn) {
      smsBtn.addEventListener('click', () => {
        window.open(`sms:?body=Join%20me%20on%20TokTube%20Africa!%20https://toktube.africa`, '_blank');
      });
    }

    const copyInviteBtn = document.getElementById('btn-invite-copy-link');
    if (copyInviteBtn) {
      copyInviteBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('https://toktube.africa/join?ref=user').then(() => {
          soundFX.playNotificationSound();
          this.showToast('Invite link copied to clipboard! 📋');
        });
      });
    }

    // Messaging UI Bindings
    const sendMsgBtn = document.getElementById('btn-send-chat-msg');
    const msgInput = document.getElementById('chat-message-input');
    if (sendMsgBtn && msgInput) {
      const send = () => {
        const text = msgInput.value.trim();
        if (!text) return;
        const newMsg = storage.addMessageToConversation(this.activeConversationId, text);
        msgInput.value = '';
        soundFX.playNotificationSound();
        this.renderChatMessages();
      };
      sendMsgBtn.addEventListener('click', send);
      msgInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
    }

    const blockUserBtn = document.getElementById('btn-chat-toggle-block');
    if (blockUserBtn) {
      blockUserBtn.addEventListener('click', () => {
        const convs = storage.getConversations();
        const conv = convs.find(c => c.id === this.activeConversationId);
        if (conv) {
          const nowBlocked = storage.toggleBlockUser(conv.creatorId);
          soundFX.playNotificationSound();
          blockUserBtn.textContent = nowBlocked ? i18n.t('unblock_user') : i18n.t('block_user');
          blockUserBtn.classList.toggle('blocked', nowBlocked);
          this.showToast(nowBlocked ? "User blocked 🚫" : "User unblocked ✓");
        }
      });
    }

    // Feedback Page Bindings
    this.initFeedbackPage();

    // Close modals on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.remove('open');
      });
    });
  }

  showView(viewName) {
    this.currentView = viewName;
    if (viewName !== 'tok') this.tiktokFeed.pauseAll();
    else this.tiktokFeed.resumeActive();

    const watchVid = document.getElementById('main-watch-video');
    if (viewName !== 'watch' && watchVid) watchVid.pause();

    Object.keys(this.views).forEach(k => {
      if (this.views[k]) this.views[k].classList.toggle('active', k === viewName);
    });

    document.querySelectorAll('[data-view-nav]').forEach(item => {
      item.classList.toggle('active', item.dataset.viewNav === viewName);
    });
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    if (viewName === 'tube') this.youtubeFeed.render();
    else if (viewName === 'tok') this.tiktokFeed.render();
    else if (viewName === 'learn') this.renderLearnView();
    else if (viewName === 'friends') this.renderFriendsView();
    else if (viewName === 'messages') this.renderMessagesView();
    else if (viewName === 'library') this.renderLibraryView();
    else if (viewName === 'feedback') this.renderFeedbackList();
  }

  navigateToWatch(videoId) {
    this.activeWatchVideoId = videoId;
    const video = storage.getYoutubeVideoById(videoId);
    if (!video) return;

    storage.addToHistory(videoId);
    this.showView('watch');

    const videoEl = document.getElementById('main-watch-video');
    if (videoEl) {
      videoEl.src = video.videoUrl;
      videoEl.play().catch(() => {});
    }

    const titleEl = document.getElementById('watch-video-title');
    const avatarEl = document.getElementById('watch-channel-avatar');
    const nameEl = document.getElementById('watch-channel-name');
    const descEl = document.getElementById('watch-desc-text');
    const transBtn = document.getElementById('btn-translate-watch-desc');

    if (titleEl) titleEl.textContent = video.title;
    if (avatarEl) {
      avatarEl.src = video.channel.avatar;
      avatarEl.onclick = () => window.location.href='channel.html?id=' + video.channel.id;
    }
    if (nameEl) nameEl.textContent = video.channel.name;
    if (descEl) descEl.textContent = video.description;

    if (transBtn && descEl) {
      transBtn.onclick = () => {
        descEl.textContent = i18n.translateContent(video.description);
        soundFX.playNotificationSound();
        this.showToast(i18n.t('translated_by'));
      };
    }

    const likeBtn = document.getElementById('btn-watch-like');
    const likeCount = document.getElementById('watch-like-count');
    if (likeBtn && likeCount) {
      likeCount.textContent = (video.likes || 0).toLocaleString();
      likeBtn.onclick = () => {
        soundFX.playLikeSound();
        const nowLiked = storage.toggleLike(video.id);
        likeBtn.classList.toggle('active', nowLiked);
      };
    }

    const subBtn = document.getElementById('btn-watch-subscribe');
    if (subBtn) {
      const isSub = storage.isSubscribed(video.channel.id);
      subBtn.textContent = isSub ? i18n.t('subscribed') : i18n.t('subscribe');
      subBtn.classList.toggle('subscribed', isSub);
      subBtn.onclick = () => {
        soundFX.playSubscribeSound();
        const nowSub = storage.toggleSubscribe(video.channel.id);
        subBtn.textContent = nowSub ? i18n.t('subscribed') : i18n.t('subscribe');
        subBtn.classList.toggle('subscribed', nowSub);
      };
    }
  }

  // LEARN VIEW (EduBoost Educational Algorithm Feed)
  renderLearnView() {
    const container = document.getElementById('learn-video-grid');
    if (!container) return;

    const eduVideos = storage.getYoutubeVideos().filter(v => v.isEducational);
    container.innerHTML = eduVideos.map(v => this.youtubeFeed.createCardHTML(v)).join('');

    container.querySelectorAll('.video-card').forEach(c => {
      c.addEventListener('click', () => this.navigateToWatch(c.dataset.videoId));
    });
  }

  // FRIENDS & INVITES VIEW
  renderFriendsView() {
    const grid = document.getElementById('friends-creators-grid');
    if (!grid) return;
    const creators = storage.getCreators();

    grid.innerHTML = creators.map(c => `
      <div class="creator-card" onclick="if(window.tokApp) window.tokApp.openCreatorProfileModal('${c.id}')">
        <img class="creator-card-avatar" src="${c.avatar}" alt="${c.name}">
        <div class="creator-card-name">
          <span>${c.name}</span>
          ${c.verified ? '<svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: var(--tt-cyan);"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' : ''}
        </div>
        <div style="font-size: 11px; color: var(--africa-gold); font-weight: 700;">${c.country}</div>
        <p class="creator-card-bio">${c.bio}</p>
        <div class="creator-card-actions" onclick="event.stopPropagation();">
          <button class="btn-primary btn-follow-c" data-id="${c.id}">${storage.isSubscribed(c.id) ? i18n.t('following') : i18n.t('follow')}</button>
          <button class="btn-secondary" onclick="window.tokApp.openChatWithCreator('${c.id}')">💬 Message</button>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.btn-follow-c').forEach(btn => {
      btn.addEventListener('click', () => {
        soundFX.playSubscribeSound();
        const nowSub = storage.toggleSubscribe(btn.dataset.id);
        btn.textContent = nowSub ? i18n.t('following') : i18n.t('follow');
      });
    });
  }

  // DIRECT MESSAGES (DMs) VIEW
  renderMessagesView() {
    const listEl = document.getElementById('messages-conversations-list');
    if (!listEl) return;
    const convs = storage.getConversations();

    listEl.innerHTML = convs.map(c => {
      const creator = storage.getCreatorById(c.creatorId) || { name: "Creator", avatar: "" };
      return `
        <div class="conversation-item ${c.id === this.activeConversationId ? 'active' : ''}" data-id="${c.id}">
          <img class="conversation-avatar" src="${creator.avatar}">
          <div class="conversation-info">
            <div class="conversation-top-row">
              <span class="conversation-name">${creator.name}</span>
              <span class="conversation-time">${c.time}</span>
            </div>
            <span class="conversation-snippet">${c.lastMessage}</span>
          </div>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.conversation-item').forEach(item => {
      item.addEventListener('click', () => {
        this.activeConversationId = item.dataset.id;
        this.renderMessagesView();
      });
    });

    this.renderChatMessages();
  }

  renderChatMessages() {
    const convs = storage.getConversations();
    const conv = convs.find(c => c.id === this.activeConversationId);
    if (!conv) return;

    const creator = storage.getCreatorById(conv.creatorId) || { name: "Creator", avatar: "" };
    const nameEl = document.getElementById('chat-header-name');
    const avatarEl = document.getElementById('chat-header-avatar');
    const blockBtn = document.getElementById('btn-chat-toggle-block');
    const profileBtn = document.getElementById('btn-chat-view-profile');
    const container = document.getElementById('chat-messages-container');

    if (nameEl) nameEl.textContent = creator.name;
    if (avatarEl) avatarEl.src = creator.avatar;

    const isBlocked = storage.isUserBlocked(conv.creatorId);
    if (blockBtn) {
      blockBtn.textContent = isBlocked ? i18n.t('unblock_user') : i18n.t('block_user');
      blockBtn.classList.toggle('blocked', isBlocked);
    }

    if (profileBtn) {
      profileBtn.onclick = () => this.openCreatorProfileModal(conv.creatorId);
    }

    if (container) {
      container.innerHTML = conv.messages.map(m => `
        <div class="chat-bubble ${m.sender === 'me' ? 'sent' : 'received'}">
          <div>${m.text}</div>
          <div class="chat-bubble-time">${m.time}</div>
        </div>
      `).join('');
      container.scrollTop = container.scrollHeight;
    }
  }

  openChatWithCreator(creatorId) {
    let convs = storage.getConversations();
    let conv = convs.find(c => c.creatorId === creatorId);
    if (!conv) {
      conv = {
        id: "conv-" + Date.now(),
        creatorId: creatorId,
        lastMessage: "Started new conversation",
        time: "Just now",
        messages: [{ id: "m-" + Date.now(), sender: "me", text: "Habari! Nice to connect on TokTube Africa.", time: "Just now" }]
      };
      convs.unshift(conv);
      localStorage.setItem('toktube_conversations', JSON.stringify(convs));
    }
    this.activeConversationId = conv.id;
    this.closeCreatorProfileModal();
    this.showView('messages');
  }

  // TIKTOK-STYLE CREATOR PROFILE VIEW
  openCreatorProfileModal(creatorId) {
    if (!this.creatorProfileModal) return;
    const creator = storage.getCreatorById(creatorId) || {
      id: creatorId,
      name: "African Creator",
      handle: "@creator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
      bio: "Creator on TokTube Africa! Inspiring youth across the continent 🌍✨",
      followers: "120K",
      following: 54,
      likes: "1.2M",
      verified: true
    };

    const nameEl = document.getElementById('tt-profile-name');
    const handleEl = document.getElementById('tt-profile-handle');
    const avatarEl = document.getElementById('tt-profile-avatar');
    const bannerEl = document.getElementById('tt-profile-hero-banner');
    const bioEl = document.getElementById('tt-profile-bio');
    const folEl = document.getElementById('tt-stat-followers');
    const ingEl = document.getElementById('tt-stat-following');
    const likesEl = document.getElementById('tt-stat-likes');
    const followBtn = document.getElementById('btn-tt-follow');
    const msgBtn = document.getElementById('btn-tt-message');
    const blockBtn = document.getElementById('btn-tt-block');
    const gridEl = document.getElementById('tt-profile-videos-grid');

    if (nameEl) nameEl.textContent = creator.name;
    if (handleEl) handleEl.textContent = creator.handle;
    if (avatarEl) avatarEl.src = creator.avatar;
    if (bannerEl && creator.banner) bannerEl.style.backgroundImage = `url('${creator.banner}')`;
    if (bioEl) bioEl.textContent = creator.bio;
    if (folEl) folEl.textContent = creator.followers;
    if (ingEl) ingEl.textContent = creator.following;
    if (likesEl) likesEl.textContent = creator.likes;

    const isSub = storage.isSubscribed(creator.id);
    if (followBtn) {
      followBtn.textContent = isSub ? i18n.t('following') : i18n.t('follow');
      followBtn.onclick = () => {
        soundFX.playSubscribeSound();
        const nowSub = storage.toggleSubscribe(creator.id);
        followBtn.textContent = nowSub ? i18n.t('following') : i18n.t('follow');
      };
    }

    if (msgBtn) {
      msgBtn.onclick = () => this.openChatWithCreator(creator.id);
    }

    const isBlocked = storage.isUserBlocked(creator.id);
    if (blockBtn) {
      blockBtn.textContent = isBlocked ? i18n.t('unblock_user') : i18n.t('block_user');
      blockBtn.classList.toggle('blocked', isBlocked);
      blockBtn.onclick = () => {
        const nowBlocked = storage.toggleBlockUser(creator.id);
        soundFX.playNotificationSound();
        blockBtn.textContent = nowBlocked ? i18n.t('unblock_user') : i18n.t('block_user');
        blockBtn.classList.toggle('blocked', nowBlocked);
        this.showToast(nowBlocked ? "Creator blocked 🚫" : "Creator unblocked ✓");
      };
    }

    // 3-Column Vertical Video Grid
    const allReels = storage.getTiktokReels();
    const creatorVideos = allReels.slice(0, 6);

    if (gridEl) {
      gridEl.innerHTML = creatorVideos.map(v => `
        <div class="profile-video-card" onclick="window.tokApp.closeCreatorProfileModal(); window.tokApp.showView('tok');">
          <img src="${v.thumbnail}" alt="${v.title}">
          <div class="profile-video-views-badge">
            <svg viewBox="0 0 24 24" style="width: 12px; height: 12px; fill: currentColor;"><path d="M8 5v14l11-7z"/></svg>
            <span>${(v.likes || 0).toLocaleString()}</span>
          </div>
        </div>
      `).join('');
    }

    soundFX.playNotificationSound();
    this.creatorProfileModal.classList.add('open');
  }

  closeCreatorProfileModal() {
    if (this.creatorProfileModal) this.creatorProfileModal.classList.remove('open');
  }

  // FEEDBACK PAGE
  initFeedbackPage() {
    let currentRating = 5;
    let currentCat = "General Suggestion";

    const starIcons = document.querySelectorAll('.star-icon');
    const ratingLabel = document.getElementById('feedback-rating-label');
    const labels = {
      1: "1 - Needs Improvement",
      2: "2 - Fair",
      3: "3 - Good",
      4: "4 - Very Good",
      5: "5 - Excellent!"
    };

    starIcons.forEach(star => {
      star.addEventListener('click', () => {
        currentRating = parseInt(star.dataset.rating, 10);
        starIcons.forEach((s, idx) => {
          s.classList.toggle('active', idx < currentRating);
        });
        if (ratingLabel) ratingLabel.textContent = labels[currentRating];
        soundFX.playLikeSound();
      });
    });

    document.querySelectorAll('.feedback-cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.feedback-cat-pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        currentCat = pill.dataset.cat;
        soundFX.playSwitchSound();
      });
    });

    const submitBtn = document.getElementById('btn-submit-feedback');
    const textInput = document.getElementById('feedback-text-input');

    if (submitBtn && textInput) {
      submitBtn.addEventListener('click', () => {
        const text = textInput.value.trim();
        if (!text) {
          this.showToast("Please enter your suggestions or ideas!");
          return;
        }

        const newFeedback = {
          id: "fb-" + Date.now(),
          author: "You (TokTube Creator)",
          rating: currentRating,
          category: currentCat,
          text: text,
          date: "Just now"
        };

        storage.addFeedback(newFeedback);
        textInput.value = '';
        soundFX.playSubscribeSound();
        this.renderFeedbackList();
        this.showToast("Feedback submitted! Asante sana (Thank you) 🚀");
      });
    }
  }

  renderFeedbackList() {
    const listEl = document.getElementById('recent-feedback-list');
    if (!listEl) return;
    const items = storage.getFeedbackList();

    listEl.innerHTML = items.map(fb => `
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px 18px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-weight: 700; font-size: 14px;">${fb.author}</span>
          <span style="color: var(--africa-gold); font-size: 14px;">${"★".repeat(fb.rating)}</span>
        </div>
        <div style="font-size: 11px; color: var(--tt-pink); font-weight: 700; margin-bottom: 4px;">${fb.category}</div>
        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.4;">${fb.text}</p>
        <span style="font-size: 11px; color: var(--text-muted); margin-top: 6px; display: block;">${fb.date}</span>
      </div>
    `).join('');
  }

  renderLibraryView() {
    const container = this.views.library;
    if (!container) return;
    const historyIds = storage.getHistoryIds();
    const likedIds = storage.getLikedIds();
    const allVideos = storage.getYoutubeVideos();

    const historyVids = allVideos.filter(v => historyIds.includes(v.id));
    const likedVids = allVideos.filter(v => likedIds.includes(v.id));

    container.innerHTML = `
      <div style="padding: 24px 32px; max-width: 1400px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px; margin-bottom: 24px;">
          <h2 style="font-size: 24px; font-weight: 800;">📚 Your TokTube Library</h2>
          <button id="btn-clear-history" class="btn-secondary" style="font-size: 13px;">Clear History</button>
        </div>
        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">🕒 Watch History (${historyVids.length})</h3>
        <div class="video-grid" style="margin-top: 0; margin-bottom: 32px;">
          ${historyVids.map(v => this.youtubeFeed.createCardHTML(v)).join('')}
        </div>
        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">❤️ Liked Videos (${likedVids.length})</h3>
        <div class="video-grid" style="margin-top: 0;">
          ${likedVids.map(v => this.youtubeFeed.createCardHTML(v)).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.video-card').forEach(c => {
      c.addEventListener('click', () => this.navigateToWatch(c.dataset.videoId));
    });

    const clearBtn = document.getElementById('btn-clear-history');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        storage.clearHistory();
        soundFX.playNotificationSound();
        this.renderLibraryView();
        this.showToast('Watch history cleared! 🗑️');
      });
    }
  }

  openUploadModal(type = 'tok') {
    if (this.creatorStudio) this.creatorStudio.open(type);
  }

  openVoiceSearchModal() {
    if (!this.voiceModal) return;
    this.voiceModal.classList.add('open');
    soundFX.playNotificationSound();

    this.voiceModal.querySelectorAll('.voice-preset-btn').forEach(b => {
      b.onclick = () => {
        const q = b.dataset.query;
        this.voiceModal.classList.remove('open');
        if (this.searchInput) this.searchInput.value = q;
        this.showView('tube');
        this.youtubeFeed.render(q);
        this.showToast(`Search results for "${q}" 🎙️`);
      };
    });
  }

  openProfileModal() {
    if (this.profileModal) this.profileModal.classList.add('open');
  }

  openSoundModal(title) {
    if (this.soundDetailsModal) {
      const titleEl = document.getElementById('sound-modal-title');
      if (titleEl) titleEl.textContent = title;
      this.soundDetailsModal.classList.add('open');
    }
  }

  openShareModal(id, title) {
    if (!this.shareModal) return;
    const linkInput = document.getElementById('share-link-input');
    if (linkInput) linkInput.value = `https://toktube.africa/v/${id}`;
    this.shareModal.classList.add('open');
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    if (this.toastContainer) this.toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }
}

// Global initialization
function startTokTubeApp() {
  window.tokApp = new TokTubeApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startTokTubeApp);
} else {
  startTokTubeApp();
}
