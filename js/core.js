/**
 * TokTube Africa - Universal Core Architecture & Shell Coordinator
 * Shared across all pages:
 * 1. Pan-African Data & Educational Catalog
 * 2. 9-Language African Translation Engine (i18n)
 * 3. Web Audio Synthesizer (SoundFX)
 * 4. LocalStorage & Offline Video Persistence
 * 5. Universal Navigation Shell Injector (Header, Sidebar, Mobile Bottom Bar, Modals)
 * 6. Responsive UI & Screen Size Adaptation Engine
 */

// ==========================================
// 0. DYNAMIC FIREBASE SDK LOADER
// ==========================================
(function() {
  const fbConfig = {
    apiKey: "AIzaSyDKjVraXVL5CmqvwAq5NAlIWzQ58mLlptI",
    authDomain: "toktube-africa.firebaseapp.com",
    projectId: "toktube-africa",
    storageBucket: "toktube-africa.firebasestorage.app",
    messagingSenderId: "801478450004",
    appId: "1:801478450004:web:00c228cacf96370e4986c1",
    measurementId: "G-H1VKWXBFC6"
  };

  function initFb() {
    try {
      if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
          firebase.initializeApp(fbConfig);
        }
        window.tokFirebase = {
          app: firebase.app(),
          auth: firebase.auth(),
          db: firebase.firestore(),
          googleProvider: new firebase.auth.GoogleAuthProvider(),
          isReady: () => true
        };
      }
    } catch (e) {
      console.warn('Firebase auto-init:', e);
    }
  }

  if (typeof firebase === 'undefined') {
    const sApp = document.createElement('script');
    sApp.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
    sApp.onload = () => {
      const sAuth = document.createElement('script');
      sAuth.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js';
      const sDb = document.createElement('script');
      sDb.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js';
      
      let loaded = 0;
      const onDepLoaded = () => {
        loaded++;
        if (loaded === 2) initFb();
      };
      sAuth.onload = onDepLoaded;
      sDb.onload = onDepLoaded;
      document.head.appendChild(sAuth);
      document.head.appendChild(sDb);
    };
    document.head.appendChild(sApp);
  } else {
    initFb();
  }
})();

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
    downloaded: "Downloaded ✓",
    tip_creator: "Tip Creator",
    save: "Save",
    follow: "Follow",
    following: "Following ✓",
    block_user: "Block User",
    unblock_user: "Unblock User",
    send: "Send",
    online: "Online • TokTube Creator",
    search_placeholder: "Search African creators, STEM, Afrobeats, tutorials..."
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
    downloaded: "Imepakuliwa ✓",
    tip_creator: "Tuma Zawadi (M-Pesa)",
    save: "Hifadhi",
    follow: "Fuata",
    following: "Unafuata ✓",
    block_user: "Zuia Mtumiaji",
    unblock_user: "Ondoa Kizuizi",
    send: "Tuma",
    online: "Yuko Mtandaoni • Muundaji",
    search_placeholder: "Tafuta waundaji, masomo ya STEM, nyimbo za Kiafrika..."
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
    downloaded: "Ti gba wọlé ✓",
    tip_creator: "Fi Ẹ̀bùn Ranṣẹ́",
    save: "Fi pamọ́",
    follow: "Tẹ̀lé",
    following: "Ò ń tẹ̀lé e ✓",
    block_user: "Dènà Oníṣe",
    unblock_user: "Ṣí Kúrò ní Ìdènà",
    send: "Firanṣẹ",
    online: "Lórí ayélujára • Olùṣẹ̀dá",
    search_placeholder: "Wa àwọn olùṣẹ̀dá, STEM, orin ilẹ̀ Áfíríkà..."
  },
  ha: { // Hausa
    nav_home: "Gida",
    nav_toks: "Toks",
    nav_learn: "Koyo (EduBoost)",
    nav_friends: "Abokai",
    nav_messages: "Saƙonni",
    nav_you: "Kai & Taimako",
    nav_library: "Laburare",
    nav_feedback: "Ra'ayoyi",
    btn_create: "Ƙirƙiri",
    nav_tube: "Bidiyo",
    title_notifications: "Sanarwa",
    btn_mark_read: "Alama duk a matsayin an karanta",
    subscribers: "masu biya",
    subscribe: "Yi rajista",
    subscribed: "An yi rajista ✓",
    comments: "Sharhi",
    translate_caption: "🌍 Fassara zuwa Hausa",
    translated_by: "An fassara zuwa Hausa",
    share: "Raba",
    download: "Saukar",
    downloaded: "An saukar ✓",
    tip_creator: "Aika Kyauta",
    save: "Ajiye",
    follow: "Bi",
    following: "Kuna bi ✓",
    block_user: "Toshe Mai Amfani",
    unblock_user: "Cire Toshewa",
    send: "Aika",
    online: "Yana kan layi • Mahalicci",
    search_placeholder: "Bincika masu ƙirƙira na Afirka, STEM, kiɗa..."
  },
  ig: { // Igbo
    nav_home: "Ụlọ",
    nav_toks: "Toks",
    nav_learn: "Mụta (EduBoost)",
    nav_friends: "Ndị Enyi",
    nav_messages: "Ozi",
    nav_you: "Gị & Enyemaka",
    nav_library: "Ọbá Akwụkwọ",
    nav_feedback: "Nzaghachi",
    btn_create: "Mepụta",
    nav_tube: "Vidio",
    title_notifications: "Ọkwa",
    btn_mark_read: "Kaa ihe niile ka agụchara",
    subscribers: "ndị debanyere aha",
    subscribe: "Debanye aha",
    subscribed: "Edebanyela aha ✓",
    comments: "Ihe ndị e kwuru",
    translate_caption: "🌍 Tụgharịa n'Igbo",
    translated_by: "Atụgharịrị n'asụsụ Igbo",
    share: "Kekọrịta",
    download: "Budata",
    downloaded: "Ebudatara ✓",
    tip_creator: "Ziga Onyinye",
    save: "Chekwaa",
    follow: "Soro",
    following: "Na-eso ✓",
    block_user: "Gbochie Onye Ọrụ",
    unblock_user: "Kpọghee Onye Ọrụ",
    send: "Ziga",
    online: "Nọ n'ịntanetị • Onye Okike",
    search_placeholder: "Chọọ ndị okike Africa, STEM, egwu..."
  },
  am: { // Amharic
    nav_home: "ዋና ገጽ",
    nav_toks: "አጫጭር ቪዲዮዎች",
    nav_learn: "ትምህርት (EduBoost)",
    nav_friends: "ጓደኞች",
    nav_messages: "መልዕክቶች",
    nav_you: "እርስዎ & ድጋፍ",
    nav_library: "ቤተ-መጽሐፍት",
    nav_feedback: "አስተያየት",
    btn_create: "ፍጠር",
    nav_tube: "ቪዲዮ",
    title_notifications: "ማሳወቂያዎች",
    btn_mark_read: "ሁሉንም እንደተነበበ ምልክት አድርግ",
    subscribers: "ተመዝጋቢዎች",
    subscribe: "ሰብስክራይብ",
    subscribed: "ተመዝግቧል ✓",
    comments: "አስተያየቶች",
    translate_caption: "🌍 ወደ አማርኛ ተርጉም",
    translated_by: "ወደ አማርኛ ተተርጉሟል",
    share: "አጋራ",
    download: "አውርድ",
    downloaded: "ተወርዷል ✓",
    tip_creator: "ስጦታ ይላኩ",
    save: "አስቀምጥ",
    follow: "ተከታተል",
    following: "እየተከታተሉ ነው ✓",
    block_user: "ተጠቃሚን አግድ",
    unblock_user: "እገዳ አንሳ",
    send: "ላክ",
    online: "በመስመር ላይ • ፈጣሪ",
    search_placeholder: "የአፍሪካ ፈጣሪዎችን፣ STEM፣ ሙዚቃዎችን ይፈልጉ..."
  },
  zu: { // isiZulu
    nav_home: "Ikhaya",
    nav_toks: "Ama-Toks",
    nav_learn: "Funda (EduBoost)",
    nav_friends: "Abangane",
    nav_messages: "Imilayezo",
    nav_you: "Wena & Usizo",
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
    downloaded: "Kulandiwe ✓",
    tip_creator: "Thumela Ithiphu",
    save: "Londoloza",
    follow: "Landela",
    following: "Uyalandela ✓",
    block_user: "Vimba Umsebenzisi",
    unblock_user: "Susa Ukuvimba",
    send: "Thumela",
    online: "Uku-inthanethi • Umdali",
    search_placeholder: "Sesha abadali base-Afrika, STEM, umculo..."
  },
  fr: { // French (African Francophone)
    nav_home: "Accueil",
    nav_toks: "Toks Courts",
    nav_learn: "Apprendre (EduBoost)",
    nav_friends: "Amis",
    nav_messages: "Messages",
    nav_you: "Vous & Support",
    nav_library: "Bibliothèque",
    nav_feedback: "Avis & Idées",
    btn_create: "Créer",
    nav_tube: "Vidéos",
    title_notifications: "Notifications",
    btn_mark_read: "Tout marquer comme lu",
    subscribers: "abonnés",
    subscribe: "S'abonner",
    subscribed: "Abonné ✓",
    comments: "Commentaires",
    translate_caption: "🌍 Traduire en Français",
    translated_by: "Traduit en Français",
    share: "Partager",
    download: "Télécharger",
    downloaded: "Téléchargé ✓",
    tip_creator: "Envoyer un Pourboire (MoMo)",
    save: "Enregistrer",
    follow: "Suivre",
    following: "Abonné ✓",
    block_user: "Bloquer",
    unblock_user: "Débloquer",
    send: "Envoyer",
    online: "En ligne • Créateur Africain",
    search_placeholder: "Rechercher créateurs africains, STEM, Afrobeats..."
  },
  ar: { // Arabic (North African Arabic)
    nav_home: "الرئيسية",
    nav_toks: "فيديوهات قصيرة",
    nav_learn: "تعليم (EduBoost)",
    nav_friends: "الأصدقاء",
    nav_messages: "الرسائل",
    nav_you: "أنت والدعم",
    nav_library: "المكتبة",
    nav_feedback: "الملاحظات",
    btn_create: "إنشاء",
    nav_tube: "فيديو",
    title_notifications: "الإشعارات",
    btn_mark_read: "تحديد الكل كمقروء",
    subscribers: "مشترك",
    subscribe: "اشتراك",
    subscribed: "مشترك بالفعل ✓",
    comments: "التعليقات",
    translate_caption: "🌍 الترجمة إلى العربية",
    translated_by: "تمت الترجمة إلى العربية",
    share: "مشاركة",
    download: "تحميل",
    downloaded: "تم التحميل ✓",
    tip_creator: "إرسال دعم مالي",
    save: "حفظ",
    follow: "متابعة",
    following: "تتابع ✓",
    block_user: "حظر المستخدم",
    unblock_user: "إلغاء الحظر",
    send: "إرسال",
    online: "متصل الآن • صانع محتوى أفريقي",
    search_placeholder: "ابحث عن المبدعين الأفارقة، العلوم، الموسيقى..."
  },
  bem: { // ChiBemba (Zambia)
    nav_home: "Pa Ng'anda",
    nav_toks: "Toks Zaipi",
    nav_learn: "Masambililo (EduBoost)",
    nav_friends: "Abanandi",
    nav_messages: "Amashiwi",
    nav_you: "Iwe & Ubwafwilisho",
    nav_library: "Mu Layibulale",
    nav_feedback: "Amatontonkanyo",
    btn_create: "Panga",
    nav_tube: "Amavidyo",
    title_notifications: "Ifyakwishiba",
    btn_mark_read: "Maka fyonse fya belengwa",
    subscribers: "abasambilila",
    subscribe: "Konka",
    subscribed: "Ulekonka ✓",
    comments: "Amashiwi",
    translate_caption: "🌍 Alula mu ChiBemba",
    translated_by: "Calyalulwa mu ChiBemba",
    share: "Salanganya",
    download: "Kopolola",
    downloaded: "Cakopololwa ✓",
    tip_creator: "Pela Ubupe (Airtel/MTN)",
    save: "Sungila",
    follow: "Konka",
    following: "Ulekonka ✓",
    block_user: "Kaka Umubomfi",
    unblock_user: "Kakula Umubomfi",
    send: "Tuma",
    online: "Ali pa Intaneti • Kalemba wa ku Zambia",
    search_placeholder: "Fwaya abapanga ifintu ku Zambia, STEM, inyimbo..."
  },
  nya: { // ChiNyanja / Chewa (Zambia)
    nav_home: "Panyumba",
    nav_toks: "Toks Zafupi",
    nav_learn: "Maphunziro (EduBoost)",
    nav_friends: "Amnzanga",
    nav_messages: "Mauthenga",
    nav_you: "Iwe & Thandizo",
    nav_library: "M'Laibulale",
    nav_feedback: "Maganizo",
    btn_create: "Panga",
    nav_tube: "Mavidiyo",
    title_notifications: "Zidziwitso",
    btn_mark_read: "Chonga zonse zawerengedwa",
    subscribers: "otsatira",
    subscribe: "Tsatirani",
    subscribed: "Mukutsatira ✓",
    comments: "Ndemanga",
    translate_caption: "🌍 Masulirani mu ChiNyanja",
    translated_by: "Zamasuliridwa mu ChiNyanja",
    share: "Gawani",
    download: "Koperani",
    downloaded: "Zakopedwa ✓",
    tip_creator: "Perekani Mphatso (Mobile Money)",
    save: "Sungani",
    follow: "Tsatirani",
    following: "Mukutsatira ✓",
    block_user: "Letsani Wosuta",
    unblock_user: "Lolani Wosuta",
    send: "Tumizani",
    online: "Ali pa Intaneti • Mlengi wa ku Zambia",
    search_placeholder: "Fufuzani opanga zinthu ku Zambia, maphunziro, nyimbo..."
  },
  toi: { // ChiTonga (Zambia)
    nav_home: "Aŋanda",
    nav_toks: "Toks Nsyonto",
    nav_learn: "Lwiiyo (EduBoost)",
    nav_friends: "Beenzuma",
    nav_messages: "Mulumbe",
    nav_you: "Nduwe & Lugwasyo",
    nav_library: "Mubbuku",
    nav_feedback: "Mizeezo",
    btn_create: "Bamba",
    nav_tube: "Mavidiyo",
    title_notifications: "Zyakubuzigwa",
    btn_mark_read: "Tondezya zyoonse zyabalwa",
    subscribers: "batobela",
    subscribe: "Tobela",
    subscribed: "Ulatobela ✓",
    comments: "Majwi",
    translate_caption: "🌍 Sandula mu ChiTonga",
    translated_by: "Zyasandulwa mu ChiTonga",
    share: "Abana",
    download: "Kopola",
    downloaded: "Zyakkopolwa ✓",
    tip_creator: "Pa Cipego (Mobile Money)",
    save: "Yobola",
    follow: "Tobela",
    following: "Ulatobela ✓",
    block_user: "Kasya Mubelesi",
    unblock_user: "Kashununa Mubelesi",
    send: "Tuma",
    online: "Uli kwiinda Intaneti • Mulengi wa ku Zambia",
    search_placeholder: "Yanda balengi bamu Zambia, zyakwiiya, nyimbo..."
  },
  loz: { // SiLozi (Zambia)
    nav_home: "Kwa Ndu",
    nav_toks: "Toks Ze Kuswani",
    nav_learn: "Luto la Tuto (EduBoost)",
    nav_friends: "Balikani",
    nav_messages: "Liñusa",
    nav_you: "Mina & Tuso",
    nav_library: "Buka ya Libuka",
    nav_feedback: "Maikuto",
    btn_create: "Eza",
    nav_tube: "Mavidiyo",
    title_notifications: "Zibiso",
    btn_mark_read: "Tshwaya kaufela li balilwe",
    subscribers: "balateleli",
    subscribe: "Latelela",
    subscribed: "Mwa latelela ✓",
    comments: "Maikuto",
    translate_caption: "🌍 Toloka mwa SiLozi",
    translated_by: "I tolokilwe mwa SiLozi",
    share: "Abana",
    download: "Kopa",
    downloaded: "I kopilwe ✓",
    tip_creator: "Fani Mpo (Mobile Money)",
    save: "Buluka",
    follow: "Latelela",
    following: "Mwa latelela ✓",
    block_user: "Kwala Mutusi",
    unblock_user: "Kwalula Mutusi",
    send: "Luma",
    online: "U teñi fa Intaneti • Muezi wa mwa Zambia",
    search_placeholder: "Bata baezi ba mwa Zambia, luto lwa tuto, lipina..."
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
    const label = document.getElementById('current-lang-label');
    if (label) {
      const names = {
        en: 'English', sw: 'Kiswahili', yo: 'Yorùbá', ha: 'Hausa',
        ig: 'Igbo', am: 'አማርኛ', zu: 'isiZulu', fr: 'Français', ar: 'العربية',
        bem: 'ChiBemba (Zambia)', nya: 'ChiNyanja (Zambia)', toi: 'ChiTonga (Zambia)', loz: 'SiLozi (Zambia)'
      };
      label.textContent = names[langCode] || langCode;
    }
  }

  t(key) {
    const langDict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });

    const searchInputs = document.querySelectorAll('.universal-search-input');
    searchInputs.forEach(input => {
      input.placeholder = this.t('search_placeholder');
    });
  }

  translateContent(text) {
    if (this.currentLang === 'en') return text;
    const prefix = {
      sw: "[Kiswahili] ", yo: "[Yorùbá] ", ha: "[Hausa] ", ig: "[Igbo] ",
      am: "[አማርኛ] ", zu: "[isiZulu] ", fr: "[Français] ", ar: "[العربية] ",
      bem: "[ChiBemba] ", nya: "[ChiNyanja] ", toi: "[ChiTonga] ", loz: "[SiLozi] "
    }[this.currentLang] || "";
    return prefix + text;
  }
}

const i18n = new TranslationEngine();

// ==========================================
// 2. ENRICHED PAN-AFRICAN & EDUCATIONAL DATA
// ==========================================
const INITIAL_DATA = {
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
    },
    {
      id: "ch-fatima",
      name: "Fatima Al-Hassan",
      handle: "@fatima_stem",
      country: "🇪🇬 Egypt",
      city: "Cairo",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&auto=format&fit=crop&q=80",
      bio: "Astrophysics & Renewable Energy in North Africa. Inspiring young African scientists 🔭⚡",
      followers: "285K",
      following: 76,
      likes: "2.1M",
      verified: true
    }
  ],

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
    },
    {
      id: "conv-3",
      creatorId: "ch-kwame",
      lastMessage: "We have our Accra Web3 & Flutter Dev meetup this Saturday at 2 PM GMT.",
      time: "1d ago",
      unread: false,
      messages: [
        { id: "m6", sender: "ch-kwame", text: "Akwaaba! Are you joining the Ghana developer hackathon?", time: "1d ago" },
        { id: "m7", sender: "me", text: "Yes Kwame, will be coding the frontend live!", time: "1d ago" }
      ]
    }
  ],

  youtubeVideos: [
    {
      id: "tube-1",
      title: "Building an Autonomous Solar Microgrid with Arduino in Rural Kenya",
      description: "Step-by-step engineering tutorial designing an off-grid solar microgrid using low-cost Arduino sensors and lithium iron phosphate cells in Nakuru, Kenya. Learn battery management, MPPT solar tracking, and remote telemetry over GSM.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80",
      duration: "18:42",
      views: 312000,
      likes: 24500,
      timestamp: "2 days ago",
      category: "STEM",
      isEducational: true,
      eduTopic: "Robotics & Clean Energy",
      channel: {
        id: "ch-amina",
        name: "Amina Mwangi",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        subscribers: "340K"
      },
      comments: [
        { id: "c1", author: "Kofi Annan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "Brilliant engineering Amina! This is exactly the kind of innovation Africa needs.", time: "1 day ago", likes: 142 },
        { id: "c2", author: "Sipho Khumalo", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", text: "Following this schematic for our community farm in Mpumalanga. Asante sana!", time: "18 hours ago", likes: 89 }
      ]
    },
    {
      id: "tube-2",
      title: "Full-Stack Web3 & AI Development in Lagos: Building for 500M African Youth",
      description: "Deep dive into building fault-tolerant mobile-first web applications using offline-first IndexedDB, progressive web apps, and low-latency API gateways tailored for varying African connectivity environments.",
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
      duration: "24:15",
      views: 489000,
      likes: 38200,
      timestamp: "4 days ago",
      category: "Coding",
      isEducational: true,
      eduTopic: "Software Architecture",
      channel: {
        id: "ch-tunde",
        name: "Babatunde Adeleke",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        subscribers: "410K"
      },
      comments: [
        { id: "c3", author: "Adaeze Okafor", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100", text: "The caching section was mind-blowing. Thank you Tunde!", time: "2 days ago", likes: 210 }
      ]
    },
    {
      id: "tube-3",
      title: "Drone Cinematography & Precision AI Agriculture Across South Africa",
      description: "Explore 4K drone imaging and multispectral crop analysis across the Western Cape. See how smart computer vision detects water stress and nutrient deficiencies before plants show visible distress.",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80",
      duration: "14:50",
      views: 275000,
      likes: 19800,
      timestamp: "1 week ago",
      category: "Agriculture",
      isEducational: true,
      eduTopic: "AgriTech & Drones",
      channel: {
        id: "ch-zola",
        name: "Zola Dlamini",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        subscribers: "520K"
      },
      comments: []
    },
    {
      id: "tube-4",
      title: "Afrobeats & Amapiano Masterclass: Producing Global Hits from Accra",
      description: "From log drums to vocal layering: Kwame Mensah breaks down the musical synthesis, swing timing, and polyrhythms that power modern African music on global charts.",
      videoUrl: "https://media.w3.org/2010/05/video/movie_300.mp4",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
      duration: "21:05",
      views: 620000,
      likes: 54100,
      timestamp: "3 days ago",
      category: "Music",
      isEducational: false,
      channel: {
        id: "ch-kwame",
        name: "Kwame Mensah",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        subscribers: "198K"
      },
      comments: []
    },
    {
      id: "tube-5",
      title: "Solar Energy in the Sahara: Egypt's Giant Benban Solar Park Explained",
      description: "An engineering inspection of Benban Solar Park in Aswan, Egypt — one of the largest solar installations on Earth generating 1.8 GW of clean electricity.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=80",
      duration: "16:30",
      views: 395000,
      likes: 31000,
      timestamp: "5 days ago",
      category: "STEM",
      isEducational: true,
      eduTopic: "Clean Energy Infrastructure",
      channel: {
        id: "ch-fatima",
        name: "Fatima Al-Hassan",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        subscribers: "285K"
      },
      comments: []
    }
  ],

  tiktokReels: [
    {
      id: "tok-1",
      title: "How to program a solar MPPT tracker in 40 lines of code! ⚡🌱 #EduBoost #STEM #KenyaTech",
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
      thumbnail: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80",
      likes: 84200,
      commentsCount: 1420,
      shares: 9400,
      musicTitle: "AfroTech Vibes (Original Sound) - Amina Mwangi",
      musicArtist: "Amina Mwangi",
      isEducational: true,
      creator: {
        id: "ch-amina",
        name: "Amina Mwangi",
        handle: "@amina_tech",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      comments: [
        { id: "tc1", author: "DevNairobi", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "This saved my final year engineering project! 🔥", likes: 310 },
        { id: "tc2", author: "LagosCoder", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", text: "EduBoost delivering high-value STEM directly to Toks 🎓", likes: 185 }
      ]
    },
    {
      id: "tok-2",
      title: "Training an AI chatbot that speaks fluent Swahili & Yoruba in 60 seconds! 🧠🇳🇬 #AfricanAI #Tech",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
      likes: 125000,
      commentsCount: 2310,
      shares: 18400,
      musicTitle: "Lagos Highlife Beats - Babatunde Adeleke",
      musicArtist: "Babatunde Adeleke",
      isEducational: true,
      creator: {
        id: "ch-tunde",
        name: "Babatunde Adeleke",
        handle: "@tunde_ai",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
      },
      comments: [
        { id: "tc3", author: "Kemi Adesina", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100", text: "Èdè Yorùbá lórí ayélujára! Proud of this work!", likes: 520 }
      ]
    },
    {
      id: "tok-3",
      title: "Flying our agricultural drone across the vineyard sunrise in Stellenbosch 🚁🇿🇦 #AgriTech",
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
      thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80",
      likes: 96400,
      commentsCount: 880,
      shares: 12100,
      musicTitle: "Cape Town Sunset Chill - Zola Dlamini",
      musicArtist: "Zola Dlamini",
      isEducational: true,
      creator: {
        id: "ch-zola",
        name: "Zola Dlamini",
        handle: "@zola_agri",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
      },
      comments: []
    },
    {
      id: "tok-4",
      title: "Building that classic Amapiano bassline in FL Studio under 30 seconds! 🎹🔥 #Afrobeats #Ghana",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
      likes: 184000,
      commentsCount: 3100,
      shares: 26000,
      musicTitle: "Amapiano Log Drums 2026 - Kwame Mensah",
      musicArtist: "Kwame Mensah",
      isEducational: false,
      creator: {
        id: "ch-kwame",
        name: "Kwame Mensah",
        handle: "@kwame_dev",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
      },
      comments: []
    }
  ],

  initialFeedback: [
    { id: "fb-1", author: "Farai Moyo", rating: 5, category: "African Languages", text: "Having full support for Shona, Zulu, and Swahili is game-changing for content creators!", date: "2 hours ago" },
    { id: "fb-2", author: "Abebe Bekele", rating: 5, category: "EduBoost STEM", text: "The EduBoost algorithm helps our students in Addis Ababa learn coding and robotics daily!", date: "1 day ago" },
    { id: "fb-3", author: "Nneka Eze", rating: 5, category: "Creator Monetization", text: "M-Pesa and MTN Mobile Money direct tipping enables immediate support for young creators.", date: "2 days ago" }
  ],

  liveStreams: [
    {
      id: "live-1",
      title: "Lagos Afrobeats Live Jam & Freestyle Cypher 🎧🇳🇬",
      format: "video",
      streamer: {
        id: "ch-kwame",
        name: "Kwame Mensah & Friends",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        location: "Lagos / Accra"
      },
      viewers: 14820,
      category: "Music & Culture",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800"
    },
    {
      id: "live-2",
      title: "Nairobi Solar Microgrid & Robotics Live Lab Q&A ⚡🌱",
      format: "video",
      streamer: {
        id: "ch-amina",
        name: "Amina Mwangi (IoT Lab)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        location: "Nairobi, Kenya"
      },
      viewers: 9410,
      category: "STEM & Robotics",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800"
    },
    {
      id: "live-3",
      title: "Accra AI Hackathon: Real-time Voice NLP for African Languages 💻🇬🇭",
      format: "video",
      streamer: {
        id: "ch-tunde",
        name: "Babatunde Adeleke",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        location: "Accra / Lagos"
      },
      viewers: 6850,
      category: "Coding & AI",
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800"
    },
    {
      id: "live-4",
      title: "📱 Johannesburg Amapiano Dance Challenge & Fan Meet! 🔥🇿🇦",
      format: "short",
      streamer: {
        id: "ch-zola",
        name: "Zola Dlamini",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        location: "Johannesburg, SA"
      },
      viewers: 22400,
      category: "Music & Culture",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600"
    },
    {
      id: "live-5",
      title: "📱 Kigali Creative Tech Live Q&A: Startup Funding in East Africa 🚀🇷🇼",
      format: "short",
      streamer: {
        id: "ch-fatima",
        name: "Fatima Al-Hassan",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
        location: "Kigali / Cairo"
      },
      viewers: 11200,
      category: "Coding & AI",
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
      thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600"
    }
  ],

  notifications: [
    {
      id: "notif-1",
      type: "live",
      title: "Kwame Mensah is LIVE NOW! 🔴",
      body: "Lagos Afrobeats Jam & Freestyle Cypher is streaming live right now.",
      time: "Just now",
      unread: true,
      link: "live.html?stream=live-1",
      icon: "🔴"
    },
    {
      id: "notif-2",
      type: "creator",
      title: "New STEM Video from Amina Mwangi",
      body: 'Uploaded: "Solar MPPT Tracking in Nakuru - Rural Engineering Breakthrough"',
      time: "10m ago",
      unread: true,
      link: "watch.html?v=tube-1",
      icon: "🎬"
    },
    {
      id: "notif-3",
      type: "message",
      title: "Direct Message from Babatunde",
      body: "Check out the new Amapiano drum stems and AI dataset I shared!",
      time: "2h ago",
      unread: true,
      link: "messages.html",
      icon: "💬"
    },
    {
      id: "notif-4",
      type: "eduboost",
      title: "EduBoost STEM Streak Milestone! 🎓",
      body: "You reached Day 4 of your STEM & Python Robotics learning challenge!",
      time: "5h ago",
      unread: false,
      link: "learn.html",
      icon: "🎓"
    },
    {
      id: "notif-5",
      type: "tip",
      title: "M-Pesa Tip Received! 💰",
      body: "Faraji Omondi sent you KES 500 for your AgriTech IoT tutorial!",
      time: "1d ago",
      unread: false,
      link: "library.html",
      icon: "💰"
    },
    {
      id: "notif-6",
      type: "live",
      title: "Nairobi Solar Tech Lab is LIVE! 🔴",
      body: "Amina Mwangi is answering IoT robotics questions live right now.",
      time: "2d ago",
      unread: false,
      link: "live.html?stream=live-2",
      icon: "🔴"
    }
  ]
};

// ==========================================
// 3. SOUND SYNTHESIZER (WEB AUDIO API)
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('toktube_sound_fx') !== 'false';
  }

  initContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    localStorage.setItem('toktube_sound_fx', this.enabled.toString());
    const btns = document.querySelectorAll('.btn-sound-fx');
    btns.forEach(b => {
      b.classList.toggle('active', this.enabled);
      const onIcon = b.querySelector('.sound-fx-on');
      const offIcon = b.querySelector('.sound-fx-off');
      if (onIcon) onIcon.style.display = this.enabled ? 'block' : 'none';
      if (offIcon) offIcon.style.display = this.enabled ? 'none' : 'block';
    });
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
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {}
  }

  playSwitchSound() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  playSubscribeSound() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.18);
      });
    } catch {}
  }

  playNotificationSound() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {}
  }
}

const soundFX = new SoundFX();

// ==========================================
// 4. PERSISTENT STORAGE LAYER
// ==========================================
class StorageManager {
  getYoutubeVideos() {
    try {
      return JSON.parse(localStorage.getItem('toktube_videos')) || INITIAL_DATA.youtubeVideos;
    } catch {
      return INITIAL_DATA.youtubeVideos;
    }
  }

  getYoutubeVideoById(id) {
    return this.getYoutubeVideos().find(v => v.id === id) || null;
  }

  getVideoComments(videoId) {
    try {
      const stored = localStorage.getItem(`toktube_tube_comments_${videoId}`);
      if (stored) return JSON.parse(stored);
    } catch {}
    const v = this.getYoutubeVideoById(videoId);
    return (v && v.comments) ? v.comments : [];
  }

  addVideoComment(videoId, comment) {
    const comments = this.getVideoComments(videoId);
    comments.unshift(comment);
    try {
      localStorage.setItem(`toktube_tube_comments_${videoId}`, JSON.stringify(comments));
    } catch {}
    return comments;
  }

  getTiktokReels() {
    try {
      return JSON.parse(localStorage.getItem('toktube_reels')) || INITIAL_DATA.tiktokReels;
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
    const creator = this.getCreators().find(c => c.id === id);
    if (creator) return creator;

    // Fallback search across YouTube and TikTok videos if not in main list
    const yt = this.getYoutubeVideos().find(v => v.channel && v.channel.id === id);
    if (yt && yt.channel) {
      return {
        id: yt.channel.id,
        name: yt.channel.name,
        handle: '@' + yt.channel.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
        avatar: yt.channel.avatar,
        banner: yt.thumbnail,
        bio: 'African video creator sharing inspiring content on TokTube.',
        followers: yt.channel.subscribers || '150K',
        following: 48,
        likes: '1.2M',
        verified: !!yt.channel.verified
      };
    }

    const reel = this.getTiktokReels().find(r => (r.channel && r.channel.id === id) || (r.creator && r.creator.id === id));
    if (reel) {
      const c = reel.creator || reel.channel;
      return {
        id: c.id,
        name: c.name,
        handle: c.handle || ('@' + c.name.toLowerCase().replace(/[^a-z0-9]/g, '')),
        avatar: c.avatar,
        banner: reel.thumbnail,
        bio: 'African creative voice on TokTube Toks.',
        followers: '210K',
        following: 82,
        likes: '3.4M',
        verified: !!c.verified
      };
    }

    return null;
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
    let conv = convs.find(c => c.id === convId);
    if (!conv) {
      conv = {
        id: convId,
        creatorId: "ch-amina",
        lastMessage: text,
        time: "Just now",
        messages: []
      };
      convs.unshift(conv);
    }

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

  isUserBlocked(userId) {
    try {
      const list = JSON.parse(localStorage.getItem('toktube_blocked_users')) || [];
      return list.includes(userId);
    } catch {
      return false;
    }
  }

  toggleBlockUser(userId) {
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem('toktube_blocked_users')) || [];
    } catch {}
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

  getLikedIds() {
    try { return JSON.parse(localStorage.getItem('toktube_liked_ids')) || []; } catch { return []; }
  }

  isLiked(id) {
    return this.getLikedIds().includes(id);
  }

  toggleLike(id) {
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
    localStorage.setItem('toktube_liked_ids', JSON.stringify(liked));
    return nowLiked;
  }

  getSubscribedCreatorIds() {
    try { return JSON.parse(localStorage.getItem('toktube_subscriptions')) || ['ch-amina']; } catch { return ['ch-amina']; }
  }

  isSubscribed(creatorId) {
    return this.getSubscribedCreatorIds().includes(creatorId);
  }

  toggleSubscribe(creatorId) {
    const subs = this.getSubscribedCreatorIds();
    const idx = subs.indexOf(creatorId);
    let nowSub = false;
    if (idx > -1) {
      subs.splice(idx, 1);
      nowSub = false;
    } else {
      subs.push(creatorId);
      nowSub = true;
    }
    localStorage.setItem('toktube_subscriptions', JSON.stringify(subs));
    return nowSub;
  }

  getHistoryIds() {
    try { return JSON.parse(localStorage.getItem('toktube_history')) || ['tube-1', 'tube-2']; } catch { return ['tube-1', 'tube-2']; }
  }

  addToHistory(id) {
    const hist = this.getHistoryIds().filter(x => x !== id);
    hist.unshift(id);
    localStorage.setItem('toktube_history', JSON.stringify(hist.slice(0, 50)));
  }

  clearHistory() {
    localStorage.setItem('toktube_history', JSON.stringify([]));
  }

  getOfflineDownloads() {
    try { return JSON.parse(localStorage.getItem('toktube_offline_downloads')) || ['tube-1']; } catch { return ['tube-1']; }
  }

  isDownloaded(id) {
    return this.getOfflineDownloads().includes(id);
  }

  toggleOfflineDownload(id) {
    const list = this.getOfflineDownloads();
    const idx = list.indexOf(id);
    let nowDownloaded = false;
    if (idx > -1) {
      list.splice(idx, 1);
      nowDownloaded = false;
    } else {
      list.push(id);
      nowDownloaded = true;
    }
    localStorage.setItem('toktube_offline_downloads', JSON.stringify(list));
    return nowDownloaded;
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

  incrementEduStreak() {
    const current = this.getEduStreak();
    const next = current + 1;
    localStorage.setItem('toktube_edu_streak', next.toString());
    return next;
  }

  getFeedbackList() {
    try {
      return JSON.parse(localStorage.getItem('toktube_feedback')) || INITIAL_DATA.initialFeedback;
    } catch {
      return INITIAL_DATA.initialFeedback;
    }
  }

  addFeedback(item) {
    const list = this.getFeedbackList();
    list.unshift(item);
    localStorage.setItem('toktube_feedback', JSON.stringify(list));
  }

  getUserProfile() {
    try {
      const sessionUser = JSON.parse(localStorage.getItem('toktube_session') || 'null');
      const savedProfile = JSON.parse(localStorage.getItem('toktube_user_profile') || 'null');
      if (sessionUser && (sessionUser.email || sessionUser.displayName)) {
        const name = sessionUser.displayName || sessionUser.username || (savedProfile && savedProfile.name) || "PulseCreator";
        const email = sessionUser.email || (savedProfile && savedProfile.email) || "";
        const letter = (sessionUser.avatarLetter || name[0] || "P").toUpperCase();
        return {
          name: name,
          email: email,
          handle: sessionUser.handle || (savedProfile && savedProfile.handle) || ("@" + name.toLowerCase().replace(/[^a-z0-9]/g, '')),
          bio: sessionUser.bio !== undefined ? sessionUser.bio : (savedProfile && savedProfile.bio !== undefined ? savedProfile.bio : "Pan-African creator on TokTube!"),
          avatarLetter: letter,
          avatarUrl: sessionUser.avatarUrl || (savedProfile && savedProfile.avatarUrl) || ""
        };
      }
      return savedProfile || {
        name: "PulseCreator",
        email: "pulse@toktube.africa",
        handle: "@pulsecreator",
        bio: "Full-stack creator combining TikTok shorts & YouTube deep dives in Africa!",
        avatarLetter: "P",
        avatarUrl: ""
      };
    } catch {
      return {
        name: "PulseCreator",
        email: "pulse@toktube.africa",
        handle: "@pulsecreator",
        bio: "Full-stack creator combining TikTok shorts & YouTube deep dives in Africa!",
        avatarLetter: "P",
        avatarUrl: ""
      };
    }
  }

  // Local video blob storage using IndexedDB so uploaded user videos persist across reloads
  saveVideoBlob(id, file) {
    return new Promise((resolve) => {
      try {
        const req = indexedDB.open('toktube_media_db', 1);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('videos')) {
            db.createObjectStore('videos', { keyPath: 'id' });
          }
        };
        req.onsuccess = (e) => {
          const db = e.target.result;
          const tx = db.transaction('videos', 'readwrite');
          const store = tx.objectStore('videos');
          store.put({ id: id, blob: file });
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        };
        req.onerror = () => resolve(false);
      } catch (err) {
        resolve(false);
      }
    });
  }

  getVideoBlob(id) {
    return new Promise((resolve) => {
      try {
        const req = indexedDB.open('toktube_media_db', 1);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('videos')) {
            db.createObjectStore('videos', { keyPath: 'id' });
          }
        };
        req.onsuccess = (e) => {
          const db = e.target.result;
          const tx = db.transaction('videos', 'readonly');
          const store = tx.objectStore('videos');
          const getReq = store.get(id);
          getReq.onsuccess = () => {
            if (getReq.result && getReq.result.blob) {
              resolve(URL.createObjectURL(getReq.result.blob));
            } else {
              resolve(null);
            }
          };
          getReq.onerror = () => resolve(null);
        };
        req.onerror = () => resolve(null);
      } catch (err) {
        resolve(null);
      }
    });
  }

  saveUserProfile(profile) {
    localStorage.setItem('toktube_user_profile', JSON.stringify(profile));
  }

  addNewVideo(video) {
    const videos = this.getYoutubeVideos();
    videos.unshift(video);
    localStorage.setItem('toktube_videos', JSON.stringify(videos));
  }

  addNewReel(reel) {
    const reels = this.getTiktokReels();
    reels.unshift(reel);
    localStorage.setItem('toktube_reels', JSON.stringify(reels));
  }

  getAccountMode() {
    return localStorage.getItem('toktube_account_mode') || 'standard';
  }

  setAccountMode(mode) {
    localStorage.setItem('toktube_account_mode', mode);
  }

  isKidMode() {
    return this.getAccountMode() === 'kid';
  }

  addNewLiveStream(stream) {
    const streams = this.getLiveStreams();
    streams.unshift(stream);
    localStorage.setItem('toktube_live_streams', JSON.stringify(streams));
    return stream;
  }

  getLiveStreams() {
    try {
      return JSON.parse(localStorage.getItem('toktube_live_streams')) || INITIAL_DATA.liveStreams;
    } catch {
      return INITIAL_DATA.liveStreams;
    }
  }

  getLiveStreamById(id) {
    return this.getLiveStreams().find(l => l.id === id) || this.getLiveStreams()[0];
  }

  getNotifications() {
    try {
      return JSON.parse(localStorage.getItem('toktube_notifications')) || INITIAL_DATA.notifications;
    } catch {
      return INITIAL_DATA.notifications;
    }
  }

  markAllNotificationsRead() {
    const list = this.getNotifications().map(n => ({ ...n, unread: false }));
    localStorage.setItem('toktube_notifications', JSON.stringify(list));
    return list;
  }

  clearNotifications() {
    localStorage.setItem('toktube_notifications', JSON.stringify([]));
  }

  getUnreadNotifCount() {
    return this.getNotifications().filter(n => n.unread).length;
  }

  // ---- Friend-Request helpers (stored in localStorage) ----
  _getFriendRequests() {
    try { return JSON.parse(localStorage.getItem('toktube_friend_requests')) || []; } catch { return []; }
  }
  _getFriendsList() {
    try { return JSON.parse(localStorage.getItem('toktube_friends')) || []; } catch { return []; }
  }
  areFriends(userA, userB) {
    return this._getFriendsList().some(f =>
      (f.userId === userA && f.friendId === userB) ||
      (f.userId === userB && f.friendId === userA)
    );
  }
  addFriendRequest(senderId, targetId) {
    const requests = this._getFriendRequests();
    if (requests.find(r => r.senderId === senderId && r.targetId === targetId && r.status === 'pending')) return false;
    requests.push({ id: 'req-' + Date.now(), senderId, targetId, timestamp: Date.now(), status: 'pending' });
    if (!localStorage.getItem('toktube_friend_requests')) localStorage.setItem('toktube_friend_requests', JSON.stringify([]));
    if (!localStorage.getItem('toktube_friends')) localStorage.setItem('toktube_friends', JSON.stringify([]));
    localStorage.setItem('toktube_friend_requests', JSON.stringify(requests));
    return true;
  }
  getPendingRequestsFor(userId) {
    return this._getFriendRequests().filter(r => r.targetId === userId && r.status === 'pending');
  }
  getOutgoingRequestsFor(userId) {
    return this._getFriendRequests().filter(r => r.senderId === userId && r.status === 'pending');
  }
  acceptFriendRequest(requestId) {
    const requests = this._getFriendRequests();
    const idx = requests.findIndex(r => r.id === requestId);
    if (idx === -1) return false;
    const req = requests[idx];
    const friends = this._getFriendsList();
    friends.push({ userId: req.senderId, friendId: req.targetId });
    friends.push({ userId: req.targetId, friendId: req.senderId });
    localStorage.setItem('toktube_friends', JSON.stringify(friends));
    requests.splice(idx, 1);
    localStorage.setItem('toktube_friend_requests', JSON.stringify(requests));
    return true;
  }
  declineFriendRequest(requestId) {
    const requests = this._getFriendRequests().filter(r => r.id !== requestId);
    localStorage.setItem('toktube_friend_requests', JSON.stringify(requests));
    return true;
  }

  // ---- Videos by creator ----
  getVideosByCreatorId(creatorId) {
    const ytVideos = this.getYoutubeVideos().filter(v => v.channel && v.channel.id === creatorId);
    const tkReels  = this.getTiktokReels().filter(r => (r.creator && r.creator.id === creatorId) || (r.channel && r.channel.id === creatorId));
    return [...ytVideos, ...tkReels];
  }

  // ---- Current user (for channel page) ----
  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('toktube_current_user')) || { id: 'usr-me', name: 'You', handle: '@you', avatar: '' };
    } catch {
      return { id: 'usr-me', name: 'You', handle: '@you', avatar: '' };
    }
  }
}

const storage = new StorageManager();

// ==========================================
// AUTH MODULE (Firebase Cloud + Local fallback)
// ==========================================
const auth = (() => {
  const USERS_KEY = 'toktube_users';
  const SESSION_KEY = 'toktube_session';

  async function hashPassword(pw) {
    try {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
    } catch { return pw; }
  }

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
  }

  function emailToName(email) {
    const local = email.split('@')[0] || email;
    return local.charAt(0).toUpperCase() + local.slice(1);
  }

  function syncLocalUserSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    localStorage.setItem('toktube_user_profile', JSON.stringify({
      id: user.uid || user.id || ('usr-' + Date.now()),
      name: user.displayName || 'User',
      email: user.email || '',
      handle: user.handle || ('@' + (user.displayName || 'user').toLowerCase().replace(/[^a-z0-9]/g, '')),
      bio: user.bio || 'Pan-African creator on TokTube! 🌍',
      avatarLetter: (user.avatarLetter || (user.displayName || 'U')[0]).toUpperCase(),
      avatarUrl: user.avatarUrl || user.photoURL || ''
    }));
  }

  // Save or update public profile in Firestore cloud collection
  async function saveFirestoreUserProfile(uid, data) {
    try {
      if (window.tokFirebase && window.tokFirebase.db) {
        await window.tokFirebase.db.collection('users').doc(uid).set(data, { merge: true });
      }
    } catch (err) {
      console.warn('Firestore profile sync error:', err);
    }
  }

  async function signup(email, password, displayName) {
    if (!email || !password) throw new Error('Email and password are required');
    if (!email.includes('@')) throw new Error('Please enter a valid email address');
    if (password.length < 6) throw new Error('Password must be at least 6 characters');

    const name = displayName || emailToName(email);
    const cleanEmail = email.toLowerCase().trim();

    // Firebase Cloud Auth Sign Up
    if (window.tokFirebase && window.tokFirebase.auth) {
      try {
        const userCred = await window.tokFirebase.auth.createUserWithEmailAndPassword(cleanEmail, password);
        const fbUser = userCred.user;
        if (displayName) {
          await fbUser.updateProfile({ displayName: name });
        }
        const userObj = {
          uid: fbUser.uid,
          id: fbUser.uid,
          email: cleanEmail,
          displayName: name,
          avatarLetter: name[0].toUpperCase(),
          avatarUrl: '',
          handle: '@' + name.toLowerCase().replace(/[^a-z0-9]/g, ''),
          bio: 'Pan-African creator on TokTube! 🌍',
          createdAt: new Date().toISOString()
        };

        await saveFirestoreUserProfile(fbUser.uid, userObj);
        syncLocalUserSession(userObj);
        return userObj;
      } catch (fbErr) {
        if (fbErr.code === 'auth/email-already-in-use') {
          throw new Error('An account with this email already exists.');
        } else if (fbErr.code === 'auth/weak-password') {
          throw new Error('Password must be at least 6 characters.');
        } else if (fbErr.code === 'auth/invalid-email') {
          throw new Error('Please enter a valid email address.');
        }
        throw new Error(fbErr.message);
      }
    }

    // Local fallback
    const users = getUsers();
    if (users.find(u => u.email === cleanEmail)) throw new Error('An account with this email already exists');
    const user = {
      id: 'usr-' + Date.now(),
      email: cleanEmail,
      displayName: name,
      avatarLetter: name[0].toUpperCase(),
      passwordHash: await hashPassword(password),
      createdAt: new Date().toISOString()
    };
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    syncLocalUserSession(user);
    return user;
  }

  async function login(email, password) {
    if (!email || !password) throw new Error('Email and password are required');
    const cleanEmail = email.toLowerCase().trim();

    // Firebase Cloud Auth Sign In
    if (window.tokFirebase && window.tokFirebase.auth) {
      try {
        const userCred = await window.tokFirebase.auth.signInWithEmailAndPassword(cleanEmail, password);
        const fbUser = userCred.user;
        let profile = null;

        // Fetch from Firestore
        if (window.tokFirebase.db) {
          try {
            const doc = await window.tokFirebase.db.collection('users').doc(fbUser.uid).get();
            if (doc.exists) profile = doc.data();
          } catch (e) {}
        }

        const name = (profile && profile.displayName) || fbUser.displayName || emailToName(cleanEmail);
        const userObj = {
          uid: fbUser.uid,
          id: fbUser.uid,
          email: cleanEmail,
          displayName: name,
          avatarLetter: name[0].toUpperCase(),
          avatarUrl: (profile && profile.avatarUrl) || fbUser.photoURL || '',
          handle: (profile && profile.handle) || ('@' + name.toLowerCase().replace(/[^a-z0-9]/g, '')),
          bio: (profile && profile.bio) || 'Pan-African creator on TokTube! 🌍'
        };

        syncLocalUserSession(userObj);
        return userObj;
      } catch (fbErr) {
        if (fbErr.code === 'auth/user-not-found' || fbErr.code === 'auth/wrong-password' || fbErr.code === 'auth/invalid-credential') {
          throw new Error('Incorrect email or password.');
        }
        throw new Error(fbErr.message);
      }
    }

    // Local fallback
    const users = getUsers();
    const user = users.find(u => u.email === cleanEmail);
    if (!user) throw new Error('No account found with this email');
    if (user.passwordHash !== await hashPassword(password)) throw new Error('Incorrect password');
    syncLocalUserSession(user);
    return user;
  }

  async function signInWithGoogle() {
    if (!window.tokFirebase || !window.tokFirebase.auth || !window.tokFirebase.googleProvider) {
      throw new Error('Firebase Auth is not connected yet.');
    }

    try {
      const result = await window.tokFirebase.auth.signInWithPopup(window.tokFirebase.googleProvider);
      const fbUser = result.user;
      let profile = null;

      if (window.tokFirebase.db) {
        try {
          const doc = await window.tokFirebase.db.collection('users').doc(fbUser.uid).get();
          if (doc.exists) profile = doc.data();
        } catch (e) {}
      }

      const name = fbUser.displayName || emailToName(fbUser.email || 'User');
      const userObj = {
        uid: fbUser.uid,
        id: fbUser.uid,
        email: fbUser.email,
        displayName: name,
        avatarLetter: name[0].toUpperCase(),
        avatarUrl: fbUser.photoURL || (profile && profile.avatarUrl) || '',
        handle: (profile && profile.handle) || ('@' + name.toLowerCase().replace(/[^a-z0-9]/g, '')),
        bio: (profile && profile.bio) || 'Pan-African creator on TokTube! 🌍',
        createdAt: (profile && profile.createdAt) || new Date().toISOString()
      };

      await saveFirestoreUserProfile(fbUser.uid, userObj);
      syncLocalUserSession(userObj);
      return userObj;
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in popup was closed.');
      }
      throw new Error(err.message || 'Google Sign-In failed.');
    }
  }

  function logout() {
    if (window.tokFirebase && window.tokFirebase.auth) {
      window.tokFirebase.auth.signOut().catch(() => {});
    }
    localStorage.removeItem(SESSION_KEY);
  }

  function isAuthenticated() {
    try { return !!JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return false; }
  }

  function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; }
  }

  // Automatic listener to keep local session synced with Firebase state
  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
      if (window.tokFirebase && window.tokFirebase.auth) {
        window.tokFirebase.auth.onAuthStateChanged(async (fbUser) => {
          if (fbUser) {
            let profile = null;
            if (window.tokFirebase.db) {
              try {
                const doc = await window.tokFirebase.db.collection('users').doc(fbUser.uid).get();
                if (doc.exists) profile = doc.data();
              } catch (e) {}
            }
            const name = (profile && profile.displayName) || fbUser.displayName || emailToName(fbUser.email || 'User');
            const userObj = {
              uid: fbUser.uid,
              id: fbUser.uid,
              email: fbUser.email,
              displayName: name,
              avatarLetter: name[0].toUpperCase(),
              avatarUrl: (profile && profile.avatarUrl) || fbUser.photoURL || '',
              handle: (profile && profile.handle) || ('@' + name.toLowerCase().replace(/[^a-z0-9]/g, '')),
              bio: (profile && profile.bio) || 'Pan-African creator on TokTube! 🌍'
            };
            syncLocalUserSession(userObj);
          }
        });
      }
    });
  }

  return { signup, login, signInWithGoogle, logout, isAuthenticated, getCurrentUser };
})();

// ==========================================
// 5. UNIVERSAL SHELL & NAVIGATION INJECTOR
// ==========================================
class TokTubeShell {
  constructor() {
    this.currentPage = document.body.dataset.page || 'home';
  }

  init() {
    this.renderHeader();
    this.renderSidebar();
    this.renderMobileNav();
    this.renderGlobalModals();
    this.bindGlobalEvents();
    i18n.setLanguage(i18n.currentLang);
  }

  renderHeader() {
    const headerContainer = document.getElementById('navbar-container');
    if (!headerContainer) return;

    const profile = storage.getUserProfile();
    const streak = storage.getEduStreak();
    const isEduActive = storage.isEduBoostActive();
    const soundEnabled = soundFX.enabled;
    const notifsList = storage.getNotifications();
    const unreadNotifs = storage.getUnreadNotifCount();

    headerContainer.innerHTML = `
      <header id="navbar">
        <div class="nav-left">
          <button id="menu-toggle" class="menu-toggle" aria-label="Toggle Navigation Sidebar">
            <svg viewBox="0 0 24 24" style="width: 22px; height: 22px; fill: currentColor;"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
          </button>
          <a href="index.html" class="brand-logo" title="TokTube Africa - Home">
            <div class="brand-icon">
              <svg viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 21c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 3c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
            </div>
            <span class="brand-name">
              <span class="tok">Tok</span><span class="tube">Tube</span>
              <span class="brand-tag-africa">AFRICA</span>
            </span>
          </a>
        </div>

        <div class="nav-center">
          <div class="search-container">
            <div class="search-box">
              <input type="text" id="global-search-input" class="universal-search-input" placeholder="Search African creators, STEM, Afrobeats, tutorials...">
            </div>
            <button id="btn-global-search" class="btn-search" aria-label="Search">
              <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor;"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            </button>
          </div>
          <button id="btn-voice-search" class="btn-voice-search" title="Voice Search" onclick="tokShell.openVoiceModal()">
            <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor;"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>
          </button>
        </div>

        <div class="nav-right">
          <!-- Multi-Language Dropdown -->
          <div class="lang-selector-wrapper">
            <button id="btn-lang-selector" class="lang-select-btn" title="Choose African Language">
              <span>🌍</span>
              <span id="current-lang-label">English</span>
              <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: currentColor;"><path d="M7 10l5 5 5-5z"/></svg>
            </button>
            <div id="lang-dropdown-menu" class="lang-dropdown-menu">
              <div class="lang-option" data-lang="en">🇬🇧 English</div>
              <div class="lang-option" data-lang="sw">🇰🇪 Kiswahili (Swahili)</div>
              <div class="lang-option" data-lang="yo">🇳🇬 Yorùbá</div>
              <div class="lang-option" data-lang="ha">🇳🇬 Hausa</div>
              <div class="lang-option" data-lang="ig">🇳🇬 Igbo</div>
              <div class="lang-option" data-lang="am">🇪🇹 አማርኛ (Amharic)</div>
              <div class="lang-option" data-lang="zu">🇿🇦 isiZulu</div>
              <div class="lang-option" data-lang="fr">🇨🇮 Français (Afrique)</div>
              <div class="lang-option" data-lang="ar">🇪🇬 العربية (Arabic)</div>
              <div class="lang-option" data-lang="bem">🇿🇲 ChiBemba (Zambia)</div>
              <div class="lang-option" data-lang="nya">🇿🇲 ChiNyanja / Chewa (Zambia)</div>
              <div class="lang-option" data-lang="toi">🇿🇲 ChiTonga (Zambia)</div>
              <div class="lang-option" data-lang="loz">🇿🇲 SiLozi (Zambia)</div>
            </div>
          </div>

          <!-- Live Stream Button -->
          <a href="live.html" class="nav-live-btn" title="Watch Pan-African Live Streams">
            <span class="live-pulse-dot"></span>
            <span>LIVE</span>
          </a>

          <!-- Go Live Button (auth-gated) -->
          <a href="live.html?action=golive" id="btn-nav-golive" class="nav-golive-btn" title="Start Live Broadcast"
            onclick="if(!auth.isAuthenticated()){event.preventDefault();openAuthModal('signin');tokShell.showToast('Sign in to go live 🔴');}">
            <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: currentColor;"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
            <span>Go Live</span>
          </a>

          <!-- Audio Synthesizer Toggle -->
          <button id="btn-sound-fx" class="btn-sound-fx ${soundEnabled ? 'active' : ''}" title="Toggle Sound Effects">
            <svg class="sound-fx-on" viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor; display: ${soundEnabled ? 'block' : 'none'};"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
            <svg class="sound-fx-off" viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor; display: ${soundEnabled ? 'none' : 'block'};"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
          </button>

          <!-- Create Video Button -->
          <a href="upload.html" id="btn-upload" class="btn-primary" title="Create Video">
            <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            <span data-i18n="btn_create">Create</span>
          </a>

          <!-- Direct Messages Quick Link -->
          <a href="messages.html" id="btn-nav-messages" class="btn-icon" title="Messages">
            <svg viewBox="0 0 24 24" style="width: 22px; height: 22px; fill: currentColor;"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
            <span class="unread-msg-badge" style="position: absolute; top: 4px; right: 4px; font-size: 9px; padding: 1px 4px;">2</span>
          </a>

          <!-- Notifications Dropdown -->
          <div class="notif-wrapper">
            <button id="btn-notif" class="btn-icon btn-notif" title="Notifications">
              <svg viewBox="0 0 24 24" style="width: 22px; height: 22px; fill: currentColor;"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>
              ${unreadNotifs > 0 ? `<span id="notif-badge" class="notif-badge">${unreadNotifs}</span>` : `<span id="notif-badge" class="notif-badge" style="display:none">0</span>`}
            </button>
            <div id="notif-dropdown" class="notif-dropdown">
              <div class="notif-header">
                <span class="notif-title" data-i18n="title_notifications">Notifications</span>
                <button id="btn-mark-all-read" class="btn-mark-read" data-i18n="btn_mark_read">Mark all as read</button>
              </div>
              <div id="notif-list" class="notif-list">
                ${notifsList.length === 0 ? '<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 13px;">No notifications yet.</div>' : notifsList.slice(0, 4).map(n => `
                  <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="window.location.href='${n.link}'">
                    <div class="notif-text">${n.icon} <strong>${n.title}</strong><br><span style="font-size: 11px; color: var(--text-secondary);">${n.body}</span></div>
                    <div class="notif-time">${n.time}</div>
                  </div>
                `).join('')}
              </div>
              <a href="notifications.html" class="notif-footer-link" style="display: block; padding: 10px; text-align: center; font-size: 12px; color: var(--tt-cyan); border-top: 1px solid var(--border-subtle); text-decoration: none; font-weight: 700;">View All Notifications ➔</a>
            </div>
          </div>

          <!-- User Avatar / Profile -->
          <div id="header-user-avatar" class="user-avatar" title="Profile / Sign In" onclick="tokShell.openProfileModal()" style="cursor:pointer; overflow:hidden;">
            ${auth.isAuthenticated() && auth.getCurrentUser()
              ? (auth.getCurrentUser().avatarUrl
                  ? `<img src="${auth.getCurrentUser().avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
                  : `<span style="font-weight:700;font-size:13px;">${auth.getCurrentUser().avatarLetter || (auth.getCurrentUser().displayName || auth.getCurrentUser().username || 'U')[0].toUpperCase()}</span>`)
              : `<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:currentColor;"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>`
            }
          </div></div>
        </div>
      </header>
    `;
  }

  renderSidebar() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) return;

    const page = this.currentPage;
    const unreadNotifs = storage.getUnreadNotifCount();

    sidebarContainer.innerHTML = `
      <aside id="sidebar">
        <div class="sidebar-section">
          <a href="index.html" class="sidebar-item ${page === 'home' ? 'active' : ''}">
            <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span data-i18n="nav_home">Home</span>
          </a>
          <a href="toks.html" class="sidebar-item ${page === 'toks' ? 'active' : ''}">
            <svg viewBox="0 0 24 24"><path d="M17.77 10.32l-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zM10 14.5v-5l4.5 2.5-4.5 2.5z"/></svg>
            <span data-i18n="nav_toks">Toks (Shorts)</span>
          </a>
          <a href="live.html" class="sidebar-item ${page === 'live' ? 'active' : ''}">
            <svg viewBox="0 0 24 24" style="fill: var(--yt-red);"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
            <span>Live Streams</span>
            <span class="badge badge-live" style="margin-left: auto; font-size: 9px;">LIVE</span>
          </a>
          <a href="learn.html" class="sidebar-item ${page === 'learn' ? 'active' : ''}">
            <svg viewBox="0 0 24 24" style="fill: var(--africa-gold);"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
            <span data-i18n="nav_learn" style="color: var(--africa-gold); font-weight: 700;">Learn (EduBoost)</span>
          </a>
          <a href="friends.html" class="sidebar-item ${page === 'friends' ? 'active' : ''}">
            <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            <span data-i18n="nav_friends">Friends & Creators</span>
          </a>
          <a href="messages.html" class="sidebar-item ${page === 'messages' ? 'active' : ''}">
            <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
            <span data-i18n="nav_messages">Chats & Groups</span>
            <span class="unread-msg-badge">3</span>
          </a>
          <a href="status.html" class="sidebar-item ${page === 'status' ? 'active' : ''}">
            <svg viewBox="0 0 24 24" style="fill: var(--africa-green);"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <span>Status Updates</span>
            <span class="badge" style="background:var(--africa-green);color:#000;font-size:9px;font-weight:800;padding:2px 5px;border-radius:4px;margin-left:auto;">NEW</span>
          </a>
          <a href="notifications.html" class="sidebar-item ${page === 'notifications' ? 'active' : ''}">
            <svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>
            <span data-i18n="title_notifications">Notifications</span>
            ${unreadNotifs > 0 ? `<span class="unread-msg-badge notif-sidebar-count">${unreadNotifs}</span>` : ''}
          </a>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-section-title" data-i18n="nav_you">You & Studio</div>
          <a href="library.html" class="sidebar-item ${page === 'library' ? 'active' : ''}">
            <svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/></svg>
            <span data-i18n="nav_library">Library & Downloads</span>
          </a>
          <a href="upload.html" class="sidebar-item ${page === 'upload' ? 'active' : ''}">
            <svg viewBox="0 0 24 24" style="fill: var(--tt-pink);"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>
            <span>Creator Studio</span>
          </a>
          <a href="feedback.html" class="sidebar-item ${page === 'feedback' ? 'active' : ''}">
            <svg viewBox="0 0 24 24" style="fill: var(--tt-cyan);"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/></svg>
            <span data-i18n="nav_feedback" style="color: var(--tt-cyan); font-weight: 700;">Feedback & Ideas</span>
          </a>
        </div>
      </aside>
    `;
  }

  renderMobileNav() {
    const navEl = document.getElementById('mobile-bottom-nav-container');
    if (!navEl) return;

    const page = this.currentPage;

    navEl.innerHTML = `
      <!-- Slide-in drawer overlay (opened by hamburger) -->
      <div id="mobile-drawer-overlay" onclick="tokShell.closeMobileDrawer()"></div>
      <div id="mobile-drawer">
        <div class="mobile-drawer-header">
          <span style="font-weight:800;font-size:16px;">More</span>
          <button onclick="tokShell.closeMobileDrawer()" class="mobile-drawer-close">&#x2715;</button>
        </div>
        <a href="status.html" class="mobile-drawer-item ${page === 'status' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:var(--africa-green);"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          <span style="color:var(--africa-green);font-weight:700;">Status Updates</span>
          <span class="badge" style="background:var(--africa-green);color:#000;font-size:9px;font-weight:800;padding:2px 5px;border-radius:4px;margin-left:auto;">NEW</span>
        </a>
        <a href="messages.html" class="mobile-drawer-item ${page === 'messages' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:currentColor;"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
          <span>Messages</span>
        </a>
        <a href="notifications.html" class="mobile-drawer-item ${page === 'notifications' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:currentColor;"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
          <span>Notifications</span>
        </a>
        <a href="live.html" class="mobile-drawer-item ${page === 'live' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:currentColor;"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
          <span>Live</span>
        </a>
        <a href="feedback.html" class="mobile-drawer-item ${page === 'feedback' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:currentColor;"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/></svg>
          <span style="color:var(--tt-cyan);font-weight:700;">Feedback &amp; Ideas</span>
        </a>
      </div>

      <!-- Always-visible bottom navigation bar -->
      <nav id="mobile-bottom-nav">
        <a href="index.html" class="mobile-nav-btn ${page === 'home' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" style="width:22px;height:22px;"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span>Home</span>
        </a>
        <a href="toks.html" class="mobile-nav-btn ${page === 'toks' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" style="width:22px;height:22px;"><path d="M17.77 10.32l-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zM10 14.5v-5l4.5 2.5-4.5 2.5z"/></svg>
          <span>Toks</span>
        </a>
        <a href="upload.html" class="mobile-nav-btn mobile-nav-create" title="Upload">
          <div class="mobile-create-icon">+</div>
        </a>
        <a href="learn.html" class="mobile-nav-btn ${page === 'learn' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" style="width:22px;height:22px;"><path d="M12 3L1 9l4 2.18V15c0 3 3 6 7 6s7-3 7-6v-3.82L21 9 12 3zm0 2.18L18.36 9 12 12.36 5.64 9 12 5.18zM17 13.82V15c0 2.21-2.24 4-5 4s-5-1.79-5-4v-1.18l5 2.73 5-2.73z"/></svg>
          <span>Learn</span>
        </a>
        <a href="friends.html" class="mobile-nav-btn ${page === 'friends' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" style="width:22px;height:22px;"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          <span>Friends</span>
        </a>
        <a href="library.html" class="mobile-nav-btn ${page === 'library' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" style="width:22px;height:22px;"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/></svg>
          <span>Library</span>
        </a>
      </nav>
    `;
  }

  renderGlobalModals() {
    let modalHost = document.getElementById('global-modals-host');
    if (!modalHost) {
      modalHost = document.createElement('div');
      modalHost.id = 'global-modals-host';
      document.body.appendChild(modalHost);
    }

    // Build profile modal body using real auth data
    let profileModalBody = '';
    if (!auth.isAuthenticated()) {
      profileModalBody = `
        <div style="text-align:center;padding:24px 0;">
          <div style="font-size:60px;margin-bottom:14px;">👤</div>
          <h3 style="font-size:16px;font-weight:800;margin-bottom:8px;">Sign in to TokTube Africa</h3>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:20px;line-height:1.5;">Watch videos freely. Sign in to post, comment, go live, or tip creators.</p>
          <div style="display:flex;gap:10px;justify-content:center;">
            <button class="btn-primary" style="min-width:110px;" onclick="tokShell.closeModals();openAuthModal('signin')">Sign In</button>
            <button class="btn-secondary" style="min-width:110px;" onclick="tokShell.closeModals();openAuthModal('signup')">Create Account</button>
          </div>
        </div>`;
    } else {
      const u = auth.getCurrentUser() || {};
      const name = u.displayName || u.username || 'User';
      const email = u.email || '';
      const letter = (u.avatarLetter || name[0] || 'U').toUpperCase();
      const avatarUrl = u.avatarUrl || '';
      const bio = (u.bio || '').replace(/'/g, "&#39;");
      const avatarHtml = avatarUrl
        ? `<img id="modal-user-avatar-img" src="${avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
        : `<span id="modal-user-avatar-text" style="font-size:26px;font-weight:800;">${letter}</span>`;

      profileModalBody = `
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:18px;padding:16px;background:var(--bg-card);border-radius:var(--radius-md);border:1px solid var(--border-subtle);">
          <div id="modal-user-avatar" class="user-avatar" style="width:72px;height:72px;flex-shrink:0;position:relative;overflow:hidden;cursor:pointer;" onclick="document.getElementById('input-avatar-file').click()" title="Click to change photo">
            ${avatarHtml}
            <div style="position:absolute;inset:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;border-radius:50%;opacity:0;transition:opacity 0.2s;" onmouseenter="this.style.opacity=1" onmouseleave="this.style.opacity=0"><span style="font-size:18px;">📷</span></div>
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:17px;font-weight:800;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${name}</div>
            <div style="font-size:12px;color:var(--text-muted);">${email}</div>
            <div style="display:flex;gap:6px;margin-top:8px;">
              <input type="file" id="input-avatar-file" accept="image/*" style="display:none;">
              <button type="button" class="btn-secondary" style="font-size:11px;padding:4px 10px;" onclick="document.getElementById('input-avatar-file').click()">📷 Change Photo</button>
              <button type="button" class="btn-secondary" id="btn-remove-avatar" style="font-size:11px;padding:4px 10px;">Remove</button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Display Name</label>
          <input type="text" id="input-profile-name" class="form-input" value="${name}" placeholder="Your display name">
        </div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" id="input-profile-email" class="form-input" value="${email}" readonly style="opacity:0.6;cursor:not-allowed;" title="Email cannot be changed">
        </div>
        <div class="form-group">
          <label class="form-label">Bio</label>
          <textarea id="input-profile-bio" class="form-textarea" rows="2" placeholder="Tell the world about yourself...">${bio}</textarea>
        </div>
        <button id="btn-save-profile" class="btn-primary" style="width:100%;justify-content:center;margin-top:8px;" onclick="window.saveProfileChanges()">Save Changes</button>
        <button class="btn-secondary" style="width:100%;margin-top:8px;color:#ff6b6b;border-color:rgba(255,107,107,0.3);" onclick="if(confirm('Log out of TokTube?')){auth.logout();tokShell.closeModals();location.reload();}">Log Out</button>
        <div class="form-group" style="margin-top:14px;padding:14px;background:var(--bg-card);border-radius:var(--radius-md);border:1px solid var(--border-subtle);">
          <label class="form-label" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <span>Account Mode &amp; Algorithm</span>
            <span id="account-mode-current-badge" class="badge badge-tok">Standard</span>
          </label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <button type="button" class="btn-secondary account-mode-choice-btn active" id="mode-opt-standard" data-mode="standard" style="text-align:left;padding:8px 10px;font-size:12px;">
              <strong>Standard Mode</strong><div style="font-size:10px;color:var(--text-muted);margin-top:2px;">Entertainment, Afrobeats &amp; Culture</div>
            </button>
            <button type="button" class="btn-secondary account-mode-choice-btn" id="mode-opt-kid" data-mode="kid" style="text-align:left;padding:8px 10px;font-size:12px;">
              <strong>Kid / Student Mode</strong><div style="font-size:10px;color:var(--text-muted);margin-top:2px;">EduBoost STEM &amp; Safe Learning</div>
            </button>
          </div>
        </div>`;
    }

    modalHost.innerHTML = `
      <!-- User Profile Modal -->
      <div id="profile-modal" class="modal-backdrop">
        <div class="modal-window" style="max-width: 500px;">
          <div class="modal-header">
            <div class="modal-title">Your TokTube Profile</div>
            <button class="modal-close-btn" onclick="tokShell.closeModals()">✕</button>
          </div>
          <div class="modal-body">
            ${profileModalBody}
          </div>
        </div>
      </div>

      <!-- Auth Modal (Sign In / Sign Up) -->
      <div id="auth-modal" class="modal-backdrop">
        <div class="modal-window" style="max-width:440px;">
          <div class="modal-header">
            <div style="display:flex;align-items:center;gap:10px;">
              <svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:var(--yt-red);"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 21c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 3c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
              <div class="modal-title" id="auth-modal-title">Sign In to TokTube</div>
            </div>
            <button class="modal-close-btn" onclick="tokShell.closeModals()">✕</button>
          </div>
          <div class="modal-body" style="gap:14px;">
            <!-- Google Sign-In Button -->
            <button id="btn-google-auth" type="button" class="btn-google-signin" onclick="signInWithGoogle()" style="width:100%;display:flex;align-items:center;justify-content:center;gap:12px;padding:11px 16px;background:#fff;color:#3c4043;font-size:14px;font-weight:600;border:1px solid #dadce0;border-radius:var(--radius-md);cursor:pointer;transition:background-color .2s,box-shadow .2s;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
              <svg viewBox="0 0 24 24" style="width:18px;height:18px;min-width:18px;">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span id="google-btn-text">Continue with Google</span>
            </button>

            <!-- Divider -->
            <div style="display:flex;align-items:center;gap:12px;margin:2px 0;">
              <div style="flex:1;height:1px;background:var(--border-subtle);"></div>
              <span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:700;letter-spacing:0.5px;">or with email</span>
              <div style="flex:1;height:1px;background:var(--border-subtle);"></div>
            </div>

            <!-- Tab switcher -->
            <div style="display:flex;border:1px solid var(--border-subtle);border-radius:var(--radius-md);overflow:hidden;">
              <button id="auth-tab-signin" onclick="switchAuthTab('signin')" style="flex:1;padding:11px;background:var(--yt-red);color:#fff;font-weight:700;font-size:13px;border:none;cursor:pointer;transition:background 0.2s;">Sign In</button>
              <button id="auth-tab-signup" onclick="switchAuthTab('signup')" style="flex:1;padding:11px;background:var(--bg-elevated);color:var(--text-secondary);font-weight:700;font-size:13px;border:none;cursor:pointer;transition:background 0.2s;">Create Account</button>
            </div>

            <!-- Name field (sign up only) -->
            <div class="form-group" id="auth-name-group" style="display:none;">
              <label class="form-label">Display Name</label>
              <input type="text" id="auth-displayname" class="form-input" placeholder="Your name (e.g. Kwame Mensah)">
            </div>

            <!-- Email -->
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="auth-email" class="form-input" placeholder="you@example.com" autocomplete="email">
            </div>

            <!-- Password -->
            <div class="form-group">
              <label class="form-label">Password</label>
              <div style="position:relative;">
                <input type="password" id="auth-password" class="form-input" placeholder="Password (min. 6 characters)" autocomplete="current-password" style="padding-right:44px;">
                <button type="button" onclick="const i=document.getElementById('auth-password');i.type=i.type==='password'?'text':'password';this.textContent=i.type==='password'?'👁️':'🙈';" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:16px;" title="Show/hide password">👁️</button>
              </div>
            </div>

            <!-- Error message -->
            <div id="auth-error" style="color:#ff6b6b;font-size:13px;background:rgba(255,107,107,0.08);border:1px solid rgba(255,107,107,0.25);border-radius:6px;padding:8px 12px;display:none;"></div>

            <!-- Submit -->
            <button id="btn-auth-submit" class="btn-primary" style="width:100%;justify-content:center;padding:12px;font-size:14px;font-weight:800;" onclick="submitAuth()">Sign In</button>

            <p style="font-size:12px;color:var(--text-muted);text-align:center;line-height:1.5;">You can <strong>watch videos without an account</strong>.<br>Sign in to comment, post, go live, or send tips.</p>
          </div>
        </div>
      </div>

      <!-- Voice Search Modal -->

      <div id="voice-search-modal" class="modal-backdrop">
        <div class="modal-window" style="max-width: 440px; text-align: center;">
          <div class="modal-header">
            <div class="modal-title">Voice Search TokTube</div>
            <button class="modal-close-btn" onclick="tokShell.closeModals()">✕</button>
          </div>
          <div class="modal-body" style="align-items: center; gap: 16px;">
            <div class="voice-pulse-ring">
              <svg viewBox="0 0 24 24" style="width: 32px; height: 32px; fill: #fff;"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>
            </div>
            <p style="font-size: 14px; color: var(--text-secondary);">Listening for African STEM, creators or songs...</p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 12px;">
              <button class="btn-secondary voice-preset-btn" data-query="Solar Microgrid Nakuru">"Solar Microgrid"</button>
              <button class="btn-secondary voice-preset-btn" data-query="Yoruba AI NLP">"Yoruba AI Models"</button>
              <button class="btn-secondary voice-preset-btn" data-query="Amapiano Log Drums">"Amapiano Masterclass"</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Share Modal -->
      <div id="share-modal" class="modal-backdrop">
        <div class="modal-window" style="max-width: 500px;">
          <div class="modal-header">
            <div class="modal-title">Share with Friends</div>
            <button class="modal-close-btn" onclick="tokShell.closeModals()">✕</button>
          </div>
          <div class="modal-body" style="gap: 16px;">
            <div class="share-links-row" style="display: flex; gap: 10px; justify-content: space-between;">
              <button id="btn-share-whatsapp" class="btn-secondary" style="flex: 1; justify-content: center;">
                <span>💬 WhatsApp</span>
              </button>
              <button id="btn-share-telegram" class="btn-secondary" style="flex: 1; justify-content: center;">
                <span>✈️ Telegram</span>
              </button>
              <button id="btn-share-twitter" class="btn-secondary" style="flex: 1; justify-content: center;">
                <span>𝕏 Post</span>
              </button>
            </div>
            <div style="display: flex; gap: 8px;">
              <input type="text" id="share-link-input" class="form-input" readonly value="https://toktube.africa">
              <button id="btn-copy-share-link" class="btn-primary" style="white-space: nowrap;">Copy Link</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pan-African Mobile Money Tipping Modal -->
      <div id="tipping-modal" class="modal-backdrop">
        <div class="modal-window" style="max-width: 480px;">
          <div class="modal-header">
            <div class="modal-title">🌟 Tip & Support African Creator</div>
            <button class="modal-close-btn" onclick="tokShell.closeModals()">✕</button>
          </div>
          <div class="modal-body" style="gap: 14px;">
            <div style="display: flex; align-items: center; gap: 12px; background: var(--bg-card); padding: 12px; border-radius: var(--radius-md);">
              <img id="tip-creator-avatar" src="" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;">
              <div>
                <h4 id="tip-creator-name" style="font-size: 15px; font-weight: 700;">Creator</h4>
                <span id="tip-creator-handle" style="font-size: 12px; color: var(--africa-gold);">@handle</span>
              </div>
            </div>

            <div>
              <label class="form-label">Select Mobile Money / Payment Provider</label>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                <button class="btn-secondary tip-provider-btn active" data-provider="M-Pesa">🟢 Safaricom M-Pesa</button>
                <button class="btn-secondary tip-provider-btn" data-provider="MTN MoMo">🟡 MTN Mobile Money</button>
                <button class="btn-secondary tip-provider-btn" data-provider="Airtel Money">🔴 Airtel Money</button>
                <button class="btn-secondary tip-provider-btn" data-provider="Bank/Card">💳 Debit Card / Chipper</button>
              </div>
            </div>

            <div>
              <label class="form-label">Choose Tip Amount</label>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                <button class="btn-secondary tip-amount-btn active" data-amount="K25 ZMW / KES 150">🇿🇲 ZMW 25 (~$1)</button>
                <button class="btn-secondary tip-amount-btn" data-amount="K50 ZMW / KES 300">🇿🇲 ZMW 50 (~$2)</button>
                <button class="btn-secondary tip-amount-btn" data-amount="K100 ZMW / KES 600">🇿🇲 ZMW 100 (~$4)</button>
                <button class="btn-secondary tip-amount-btn" data-amount="Custom $5">$5 USD</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Support Message</label>
              <input type="text" id="tip-message-input" class="form-input" placeholder="Great STEM work, keep innovating! 🚀">
            </div>

            <button id="btn-send-tip-confirm" class="btn-primary" style="width: 100%; justify-content: center; padding: 12px; font-size: 15px;">
              Send Tip to Creator ✨
            </button>
          </div>
        </div>
      </div>

      <!-- Toast Container -->
      <div id="toast-container"></div>
    `;
  }

  openMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  bindGlobalEvents() {
    // Sidebar collapse toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        if (sidebar && sidebar.offsetParent !== null) {
          // Desktop: collapse/expand sidebar
          sidebar.classList.toggle('collapsed');
        } else {
          // Mobile: open the slide-in drawer
          tokShell.openMobileDrawer();
        }
      });
    }

    // Global search submission
    const searchBtn = document.getElementById('btn-global-search');
    const searchInput = document.getElementById('global-search-input');
    const execSearch = () => {
      const q = searchInput.value.trim();
      if (!q) return;
      if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        if (window.tokFeed) {
          window.tokFeed.render(q);
        } else {
          window.location.href = `index.html?search=${encodeURIComponent(q)}`;
        }
      } else {
        window.location.href = `index.html?search=${encodeURIComponent(q)}`;
      }
    };

    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', execSearch);
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') execSearch();
      });
    }

    // Language selector dropdown
    const btnLang = document.getElementById('btn-lang-selector');
    const langDropdown = document.getElementById('lang-dropdown-menu');
    if (btnLang && langDropdown) {
      btnLang.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('open');
      });

      langDropdown.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const lang = opt.dataset.lang;
          i18n.setLanguage(lang);
          langDropdown.classList.remove('open');
          soundFX.playNotificationSound();
          this.showToast(`Language set to ${opt.textContent} 🌍`);
        });
      });

      window.addEventListener('click', () => langDropdown.classList.remove('open'));
    }

    // Notifications dropdown
    const btnNotif = document.getElementById('btn-notif');
    const notifDropdown = document.getElementById('notif-dropdown');
    const notifBadge = document.getElementById('notif-badge');
    const markReadBtn = document.getElementById('btn-mark-all-read');

    if (btnNotif && notifDropdown) {
      btnNotif.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = notifDropdown.classList.contains('open');
        document.querySelectorAll('.notif-dropdown, #lang-dropdown-menu').forEach(el => el.classList.remove('open'));
        if (!isOpen) notifDropdown.classList.add('open');
      });
      notifDropdown.addEventListener('click', (e) => e.stopPropagation());
      window.addEventListener('click', () => notifDropdown.classList.remove('open'));
    }

    if (markReadBtn && notifBadge) {
      markReadBtn.addEventListener('click', () => {
        notifBadge.style.display = 'none';
        document.querySelectorAll('.notif-item.unread').forEach(item => item.classList.remove('unread'));
        this.showToast('All notifications marked as read ✓');
      });
    }

    // Sound FX button toggle
    const btnSound = document.getElementById('btn-sound-fx');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const active = soundFX.toggleSound();
        this.showToast(active ? 'Sound FX enabled 🔔' : 'Sound FX muted 🔕');
      });
    }

    // Account mode selector within profile modal
    document.querySelectorAll('.account-mode-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.account-mode-choice-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.mode;
        const badge = document.getElementById('account-mode-current-badge');
        if (badge) {
          badge.textContent = mode === 'kid' ? '🎓 Kid / Student' : 'Standard';
          badge.className = mode === 'kid' ? 'badge badge-green' : 'badge badge-tok';
        }
        soundFX.playSwitchSound();
      });
    });

    // Avatar & profile saving are handled via saveProfileChanges & global listeners below

    // Share modal actions
    const btnCopy = document.getElementById('btn-copy-share-link');
    const shareInput = document.getElementById('share-link-input');
    if (btnCopy && shareInput) {
      btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(shareInput.value).then(() => {
          soundFX.playNotificationSound();
          this.showToast('Link copied to clipboard! 📋');
        });
      });
    }

    const shareWa = document.getElementById('btn-share-whatsapp');
    if (shareWa && shareInput) {
      shareWa.addEventListener('click', () => {
        const text = encodeURIComponent(`Check out this video on TokTube Africa: ${shareInput.value}`);
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
      });
    }

    const shareTg = document.getElementById('btn-share-telegram');
    if (shareTg && shareInput) {
      shareTg.addEventListener('click', () => {
        const text = encodeURIComponent('Check out this video on TokTube Africa:');
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareInput.value)}&text=${text}`, '_blank');
      });
    }

    const shareTw = document.getElementById('btn-share-twitter');
    if (shareTw && shareInput) {
      shareTw.addEventListener('click', () => {
        const text = encodeURIComponent(`Watch on @TokTubeAfrica: ${shareInput.value}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
      });
    }

    // Tipping modal interactions
    document.querySelectorAll('.tip-provider-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tip-provider-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        soundFX.playSwitchSound();
      });
    });

    document.querySelectorAll('.tip-amount-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tip-amount-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        soundFX.playSwitchSound();
      });
    });

    const confirmTipBtn = document.getElementById('btn-send-tip-confirm');
    if (confirmTipBtn) {
      confirmTipBtn.addEventListener('click', async () => {
        const activeProvider = document.querySelector('.tip-provider-btn.active')?.dataset.provider || 'M-Pesa';
        const activeAmount = document.querySelector('.tip-amount-btn.active')?.dataset.amount || 'KES 500';
        const creatorName = document.getElementById('tip-creator-name')?.textContent || 'Creator';
        const message = document.getElementById('tip-message-input')?.value || '';

        // UI feedback
        confirmTipBtn.disabled = true;
        const originalText = confirmTipBtn.textContent;
        confirmTipBtn.textContent = 'Sending...';
        soundFX.playSubscribeSound();
        this.closeModals();

        try {
          const resp = await fetch('/api/tip', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ provider: activeProvider, amount: activeAmount, creator: creatorName, message })
          });
          const data = await resp.json();
          if (data.status === 'success') {
            this.showToast(`Tip of ${activeAmount} sent to ${creatorName} via ${activeProvider}! 🎉 Transaction ID: ${data.transactionId}`);
          } else {
            this.showToast(`Tip failed: ${data.message || 'Unknown error'}`, 'error');
          }
        } catch (e) {
          console.error('Tip error', e);
          this.showToast(`Tip failed: ${e.message}`, 'error');
        } finally {
          confirmTipBtn.disabled = false;
          confirmTipBtn.textContent = originalText;
        }
      });
    }

    // Close modals on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(b => {
      b.addEventListener('click', (e) => {
        if (e.target === b) this.closeModals();
      });
    });
  }

  openProfileModal() {
    this.renderGlobalModals();
    const profile = storage.getUserProfile();
    const nameInp = document.getElementById('input-profile-name');
    const handleInp = document.getElementById('input-profile-handle');
    const bioInp = document.getElementById('input-profile-bio');
    const modalName = document.getElementById('modal-user-name');
    const modalHandle = document.getElementById('modal-user-handle');
    const modalAvatar = document.getElementById('modal-user-avatar');

    if (nameInp) nameInp.value = profile.name;
    if (handleInp) handleInp.value = profile.handle;
    if (bioInp) bioInp.value = profile.bio;
    if (modalName) modalName.textContent = profile.name;
    if (modalHandle) modalHandle.textContent = profile.handle;
    
    const avatarImgEl = document.getElementById('modal-user-avatar-img');
    const avatarTextEl = document.getElementById('modal-user-avatar-text');
    if (profile.avatarUrl && avatarImgEl && avatarTextEl) {
      avatarImgEl.src = profile.avatarUrl;
      avatarImgEl.style.display = 'block';
      avatarTextEl.style.display = 'none';
    } else if (avatarImgEl && avatarTextEl) {
      avatarImgEl.style.display = 'none';
      avatarTextEl.style.display = 'block';
      avatarTextEl.textContent = profile.avatarLetter || 'P';
    }

    const currentMode = storage.getAccountMode();
    const badge = document.getElementById('account-mode-current-badge');
    if (badge) {
      badge.textContent = currentMode === 'kid' ? '🎓 Kid / Student' : 'Standard';
      badge.className = currentMode === 'kid' ? 'badge badge-green' : 'badge badge-tok';
    }
    document.querySelectorAll('.account-mode-choice-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === currentMode);
    });

    const modal = document.getElementById('profile-modal');
    if (modal) modal.classList.add('open');
  }

  openVoiceModal() {
    const modal = document.getElementById('voice-search-modal');
    if (modal) {
      modal.classList.add('open');
      soundFX.playNotificationSound();

      modal.querySelectorAll('.voice-preset-btn').forEach(btn => {
        btn.onclick = () => {
          const q = btn.dataset.query;
          this.closeModals();
          window.location.href = `index.html?search=${encodeURIComponent(q)}`;
        };
      });
    }
  }

  openShareModal(videoUrl, title) {
    const modal = document.getElementById('share-modal');
    const input = document.getElementById('share-link-input');
    if (input) input.value = videoUrl || window.location.href;
    if (modal) modal.classList.add('open');
  }

  openTippingModal(creatorId) {
    const creator = storage.getCreatorById(creatorId) || {
      name: "African Creator",
      handle: "@creator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    };

    const modal = document.getElementById('tipping-modal');
    const avatar = document.getElementById('tip-creator-avatar');
    const name = document.getElementById('tip-creator-name');
    const handle = document.getElementById('tip-creator-handle');

    if (avatar) avatar.src = creator.avatar;
    if (name) name.textContent = creator.name;
    if (handle) handle.textContent = creator.handle;

    if (modal) {
      modal.classList.add('open');
      soundFX.playNotificationSound();
    }
  }

  closeModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
  }

  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }
}

const tokShell = new TokTubeShell();

document.addEventListener('DOMContentLoaded', () => {
  tokShell.init();
});

// ==========================================
// GLOBAL AUTH HELPERS
// ==========================================
let _authMode = 'signin';

window.openAuthModal = function(mode) {
  _authMode = mode || 'signin';
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.add('open');
  switchAuthTab(_authMode);
};

window.switchAuthTab = function(mode) {
  _authMode = mode;
  const signinTab = document.getElementById('auth-tab-signin');
  const signupTab = document.getElementById('auth-tab-signup');
  const title = document.getElementById('auth-modal-title');
  const submitBtn = document.getElementById('btn-auth-submit');
  const nameGroup = document.getElementById('auth-name-group');
  const err = document.getElementById('auth-error');
  const pwdInput = document.getElementById('auth-password');
  if (err) { err.style.display = 'none'; err.textContent = ''; }
  if (mode === 'signin') {
    if (signinTab) { signinTab.style.background = 'var(--yt-red)'; signinTab.style.color = '#fff'; }
    if (signupTab) { signupTab.style.background = 'var(--bg-elevated)'; signupTab.style.color = 'var(--text-secondary)'; }
    if (title) title.textContent = 'Sign In to TokTube';
    if (submitBtn) submitBtn.textContent = 'Sign In';
    if (nameGroup) nameGroup.style.display = 'none';
    if (pwdInput) pwdInput.placeholder = 'Your password';
  } else {
    if (signupTab) { signupTab.style.background = 'var(--yt-red)'; signupTab.style.color = '#fff'; }
    if (signinTab) { signinTab.style.background = 'var(--bg-elevated)'; signinTab.style.color = 'var(--text-secondary)'; }
    if (title) title.textContent = 'Create Account';
    if (submitBtn) submitBtn.textContent = 'Create Account';
    if (nameGroup) nameGroup.style.display = 'block';
    if (pwdInput) pwdInput.placeholder = 'Password (min. 6 characters)';
  }
};

window.submitAuth = async function() {
  const email = (document.getElementById('auth-email') || {}).value || '';
  const password = (document.getElementById('auth-password') || {}).value || '';
  const displayName = (document.getElementById('auth-displayname') || {}).value || '';
  const err = document.getElementById('auth-error');
  const submitBtn = document.getElementById('btn-auth-submit');

  const showErr = (msg) => {
    if (err) { err.textContent = msg; err.style.display = 'block'; }
  };

  if (!email || !password) { showErr('Please enter your email and password.'); return; }

  // Disable button while processing
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Please wait...'; }

  try {
    if (_authMode === 'signup') {
      await auth.signup(email, password, displayName);
    } else {
      await auth.login(email, password);
    }
    tokShell.closeModals();
    location.reload();
  } catch (e) {
    showErr(e.message);
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = _authMode === 'signup' ? 'Create Account' : 'Sign In';
    }
  }
};

window.signInWithGoogle = async function() {
  const err = document.getElementById('auth-error');
  const googleBtn = document.getElementById('btn-google-auth');
  const btnText = document.getElementById('google-btn-text');

  const showErr = (msg) => {
    if (err) { err.textContent = msg; err.style.display = 'block'; }
  };
  if (err) { err.style.display = 'none'; err.textContent = ''; }

  if (typeof auth.signInWithGoogle !== 'function') {
    showErr('Google Sign-In requires connecting Firebase. Please add your firebaseConfig!');
    return;
  }

  if (googleBtn) googleBtn.style.opacity = '0.7';
  if (btnText) btnText.textContent = 'Signing in with Google...';

  try {
    await auth.signInWithGoogle();
    tokShell.closeModals();
    location.reload();
  } catch (e) {
    showErr(e.message || 'Google Sign-In failed.');
    if (googleBtn) googleBtn.style.opacity = '1';
    if (btnText) btnText.textContent = 'Continue with Google';
  }
};



window.saveProfileChanges = function() {
  if (!auth.isAuthenticated()) return;
  const nameEl = document.getElementById('input-profile-name');
  const bioEl  = document.getElementById('input-profile-bio');
  const name = nameEl ? nameEl.value.trim() : '';
  const bio  = bioEl  ? bioEl.value.trim()  : '';
  const SESSION_KEY = 'toktube_session';
  try {
    const user = JSON.parse(localStorage.getItem(SESSION_KEY)) || {};
    if (name) {
      user.displayName = name;
      user.avatarLetter = name[0].toUpperCase();
    }
    if (bio !== undefined) user.bio = bio;
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));

    // Also persist to storage user profile
    storage.saveUserProfile({
      name: user.displayName || name || 'User',
      email: user.email || '',
      handle: '@' + (user.displayName || name || 'user').toLowerCase().replace(/[^a-z0-9]/g, ''),
      bio: user.bio || bio,
      avatarLetter: user.avatarLetter || 'U',
      avatarUrl: user.avatarUrl || ''
    });

    // Account mode selection sync
    const activeModeBtn = document.querySelector('.account-mode-choice-btn.active');
    if (activeModeBtn && activeModeBtn.dataset.mode) {
      storage.setAccountMode(activeModeBtn.dataset.mode);
    }

    tokShell.showToast('Profile updated successfully! ✨');
    soundFX.playSubscribeSound();

    // Update header avatar display immediately
    const headerAvatar = document.getElementById('header-user-avatar');
    if (headerAvatar) {
      if (user.avatarUrl) {
        headerAvatar.innerHTML = `<img src="${user.avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
      } else {
        headerAvatar.innerHTML = `<span style="font-weight:700;font-size:13px;">${user.avatarLetter || name[0].toUpperCase()}</span>`;
      }
    }
    tokShell.closeModals();
  } catch(e) { tokShell.showToast('Could not save profile'); }
};

// Avatar upload
document.addEventListener('change', function(e) {
  if (e.target.id !== 'input-avatar-file') return;
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    const dataUrl = ev.target.result;
    const avatarDiv = document.getElementById('modal-user-avatar');
    if (avatarDiv) {
      avatarDiv.innerHTML = '<img src="' + dataUrl + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
    }
    const SESSION_KEY = 'toktube_session';
    try {
      const user = JSON.parse(localStorage.getItem(SESSION_KEY)) || {};
      user.avatarUrl = dataUrl;
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      const headerAvatar = document.getElementById('header-user-avatar');
      if (headerAvatar) headerAvatar.innerHTML = '<img src="' + dataUrl + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
    } catch(err) {}
    tokShell.showToast('Profile photo updated!');
  };
  reader.readAsDataURL(file);
});

// Remove avatar
document.addEventListener('click', function(e) {
  if (e.target.id !== 'btn-remove-avatar') return;
  const SESSION_KEY = 'toktube_session';
  try {
    const user = JSON.parse(localStorage.getItem(SESSION_KEY)) || {};
    delete user.avatarUrl;
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    const letter = (user.avatarLetter || (user.displayName || 'U')[0]).toUpperCase();
    const avatarDiv = document.getElementById('modal-user-avatar');
    if (avatarDiv) avatarDiv.innerHTML = '<span style="font-size:26px;font-weight:800;">' + letter + '</span>';
    const headerAvatar = document.getElementById('header-user-avatar');
    if (headerAvatar) headerAvatar.innerHTML = '<span style="font-weight:700;font-size:13px;">' + letter + '</span>';
  } catch(err) {}
  tokShell.showToast('Profile photo removed');
});
