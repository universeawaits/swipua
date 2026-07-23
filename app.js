(function () {
  // ---- one-time key migration (swipua_* -> beeins_*) --------------------
  // The app was renamed from "swipua" to "beeins". Copy any existing saved
  // state to the new key names so returning users keep their progress. Safe
  // to run every load: it never overwrites a value already under the new key.
  try {
    var _migKeys = ["theme", "level", "titleLangs", "showLangs", "sessionSize"];
    for (var _i = 0; _i < _migKeys.length; _i++) {
      var _old = "swipua_" + _migKeys[_i], _new = "beeins_" + _migKeys[_i];
      var _v = window.localStorage.getItem(_old);
      if (_v != null && window.localStorage.getItem(_new) == null) {
        window.localStorage.setItem(_new, _v);
      }
    }
    // Sessions used to persist in localStorage (surviving browser exits). They
    // now live in sessionStorage so a closed browser starts fresh, while the
    // learning curve persists separately in localStorage. Drop the stale copy.
    window.localStorage.removeItem("beeins_progress");
    window.localStorage.removeItem("swipua_progress");
    // Per-target namespacing: the app now supports learning more than one
    // language, and each target keeps its own preferences + learning curve.
    // The original (German-only) keys become the German target's keys.
    var _perTarget = ["titleLangs", "showLangs", "showOrder", "learning"];
    for (var _j = 0; _j < _perTarget.length; _j++) {
      var _legacy = "beeins_" + _perTarget[_j], _deKey = "beeins_" + _perTarget[_j] + "_de";
      var _lv = window.localStorage.getItem(_legacy);
      if (_lv != null && window.localStorage.getItem(_deKey) == null) {
        window.localStorage.setItem(_deKey, _lv);
      }
    }
  } catch (e) {}

  var source = (typeof WORDS !== "undefined") ? WORDS : [];

  // ---- learning target (the language you are studying) -------------------
  // beeins started as a German-only trainer; it now teaches one of several
  // target languages. The corpus is shared — every card carries a translation
  // in each target — so switching target just changes which field is "the word
  // being learned" and which languages you may study it from. `allow` (when
  // present) restricts the learn-from languages for that target; the target
  // itself is always included. `tts` is the speech-synthesis locale, `level`
  // the per-word field holding that target's CEFR level. Grammar sheets exist
  // for German only (`grammar: true`).
  var TARGETS = [
    { key: "de",    flag: "🇩🇪", endo: "Deutsch",              tts: "de-DE", piper: "de_DE-thorsten-medium", level: "level", grammar: true },
    { key: "tr",    flag: "🇹🇷", endo: "Türkçe",               tts: "tr-TR", piper: "tr_TR-dfki-medium",     level: "level", grammar: true, allow: ["ru", "en", "de", "ar_sy", "uk", "fa", "fr", "zh", "ja"] },
    // Argentinian (Rioplatense) Spanish — voseo, sheísmo, ustedes. Studied from
    // Russian, English, German or Turkish. The es-AR speech locale and Piper's
    // Argentine voice give the accent; the corpus uses Argentine word choices.
    { key: "es_ar", flag: "🇦🇷", endo: "Español rioplatense",  tts: "es-AR", piper: "es_AR-daniela-high",    level: "level", grammar: true, allow: ["ru", "en", "de", "tr", "uk", "fa", "fr"] },
    // French (France) — studied from Russian, English, German, Turkish, Spanish,
    // Italian or Syrian Arabic.
    { key: "fr",    flag: "🇫🇷", endo: "Français",             tts: "fr-FR", piper: "fr_FR-siwis-medium",    level: "level", grammar: true, allow: ["ru", "en", "de", "tr", "es_ar", "it", "ar_sy"] },
    // Russian — studied from German, English, French, Persian, Ukrainian or
    // Syrian Arabic.
    { key: "ru",    flag: "🇷🇺", endo: "Русский",              tts: "ru-RU", piper: "ru_RU-irina-medium",    level: "level", grammar: true, allow: ["de", "en", "fr", "fa", "uk", "ar_sy"] },
    // Italian — studied from Russian, German, English, Ukrainian or Persian.
    { key: "it",    flag: "🇮🇹", endo: "Italiano",             tts: "it-IT", piper: "it_IT-riccardo-x_low",  level: "level", grammar: true, allow: ["ru", "de", "en", "uk", "fa"] },
    { key: "uk",    flag: "🇺🇦", endo: "Українська",           tts: "uk-UA", piper: "uk_UA-ukrainian_tts-medium", level: "level", grammar: true, allow: ["ru", "en", "de", "it", "es_ar", "fr"] },
    { key: "hr",    flag: "🇭🇷", endo: "Hrvatski",              tts: "hr-HR", piper: "hr_HR-mihael-medium",       level: "level", grammar: true, allow: ["de", "en", "ru", "fr", "tr", "es_ar"] },
    { key: "be",    flag: "🇧🇾", endo: "Беларуская",            tts: "be-BY", piper: "be_BY-nastya-medium",       level: "level", grammar: true, allow: ["de", "en", "ru", "fr", "tr", "es_ar"] },
    // English (British) — the Oxford 3000/5000 A1-B1 wordlist, studied from any
    // of 25 languages. No real Piper English voice ships here (they are espeak-
    // based); the pre-rendered clips use a British system voice.
    { key: "en",    flag: "🇬🇧", endo: "English",              tts: "en-GB", piper: "en_GB-alba-medium",         level: "level", grammar: true, allow: ["de", "ru", "vi", "fa", "uk", "pl", "tr", "th", "sw", "ar_eg", "zh", "ar_lb", "ms", "am", "ar_sy", "hi", "ur", "es_mx", "ca", "hr", "sr", "el", "sq", "ro", "fr"] },
    // Mandarin Chinese (Simplified) — HSK 1-4, which is where A1-B1 actually
    // ends; HSK 5-6 is already B2/C1, so the corpus stops there rather than
    // padding. Every headword and example carries pinyin in `reading`. The
    // level buttons show the HSK ladder instead of CEFR (see levelLabels).
    { key: "zh",    flag: "🇨🇳", endo: "中文",                  tts: "zh-CN", level: "level", grammar: true,
      allow: ["ru", "de", "en", "tr", "it", "es_ar"],
      levelLabels: { A1: "HSK 1-2", A2: "HSK 3", B1: "HSK 4" } },
    // Japanese — JLPT N5-N3, the authentic A1-B1 span. Every headword and
    // example carries Hepburn romaji in `reading`, since a beginner cannot yet
    // read the kanji-kana mix.
    { key: "ja",    flag: "🇯🇵", endo: "日本語",                tts: "ja-JP", level: "level", grammar: true,
      allow: ["ru", "de", "en", "tr", "it", "es_ar"],
      levelLabels: { A1: "N5", A2: "N4", B1: "N3" } },
    // Korean — TOPIK levels 1-3, the authentic A1-B1 span. Every headword and
    // example carries Revised Romanisation in `reading`.
    { key: "ko",    flag: "🇰🇷", endo: "한국어",                tts: "ko-KR", level: "level", grammar: true,
      allow: ["ru", "de", "en", "tr", "it", "es_ar"],
      levelLabels: { A1: "TOPIK 1", A2: "TOPIK 2", B1: "TOPIK 3" } },
    // Thai — plain CEFR A1-B1 (CU-TFL / CEFR-aligned). Thai script is unspaced
    // and tonal, so every headword and example carries a learner-phonetic
    // (Paiboon-style) `reading` with tone marks. Studied from English, German,
    // Russian, French and Persian.
    { key: "th",    flag: "🇹🇭", endo: "ไทย",                   tts: "th-TH", level: "level", grammar: true,
      allow: ["en", "de", "ru", "fr", "fa"] }
  ];
  var TARGET_BY_KEY = {};
  TARGETS.forEach(function (t) { TARGET_BY_KEY[t.key] = t; });

  function loadLearn() {
    try { var v = window.localStorage.getItem("beeins_learn"); if (TARGET_BY_KEY[v]) return v; } catch (e) {}
    return "de";
  }
  var LEARN = loadLearn();               // active target language key
  var TARGET = TARGET_BY_KEY[LEARN];
  var GRAMMAR_ON = !!TARGET.grammar;     // grammar cheat sheet available?
  var LEVEL_FIELD = TARGET.level;        // which per-word field holds the level

  // Per-target storage keys — each target keeps independent preferences and a
  // separate learning curve, so studying Turkish never disturbs German.
  var TL_KEY = "beeins_titleLangs_" + LEARN;
  var SL_KEY = "beeins_showLangs_" + LEARN;
  var SO_KEY = "beeins_showOrder_" + LEARN;

  // ---- level (CEFR) ------------------------------------------------------
  // Each word carries a level A1/A2/B1. The switch is cumulative: picking a
  // level shows that level AND everything below it (B1 = all words).
  var LEVEL_ORDER = { A1: 1, A2: 2, B1: 3 };
  var currentLevel = loadLevel();
  function loadLevel() {
    try { var v = window.localStorage.getItem("beeins_level"); if (LEVEL_ORDER[v]) return v; } catch (e) {}
    return "B1";
  }

  // ---- session size (how many cards make up one study run) ---------------
  // A persistent preference (localStorage): a number, or "all" for the whole
  // level. Changing it starts a fresh session.
  var SESSION_SIZES = [10, 25, 50, 100];
  var DEFAULT_SIZE = 25;
  var REVIEW_SHARE = 0.3; // ~30% of a sized session is already-mastered review
  var sessionSize = loadSessionSize();
  function loadSessionSize() {
    try {
      var v = window.localStorage.getItem("beeins_sessionSize");
      if (v === "all") return "all";
      var n = parseInt(v, 10);
      if (SESSION_SIZES.indexOf(n) !== -1) return n;
    } catch (e) {}
    return DEFAULT_SIZE;
  }
  function saveSessionSize() {
    try { window.localStorage.setItem("beeins_sessionSize", String(sessionSize)); } catch (e) {}
  }

  // ---- learning curve (persistent per-word mastery) ----------------------
  // Unlike the session (ephemeral — sessionStorage, see below), what the
  // learner knows is kept in localStorage so it survives a browser exit. A word
  // becomes "mastered" after MASTERY_STREAK correct "Know" answers in a row; a
  // single "Don't know" resets the streak. Keyed by the German word, which is
  // unique across the corpus, so it survives data updates that reorder arrays.
  var LEARN_KEY = "beeins_learning_" + LEARN;
  var MASTERY_STREAK = 3;
  var learning = loadLearning(); // { <germanWord>: { s:streak, k:knowTaps, u:dontTaps } }
  function loadLearning() {
    try {
      var d = JSON.parse(window.localStorage.getItem(LEARN_KEY));
      if (d && d.v === 1 && d.w && typeof d.w === "object") return d.w;
    } catch (e) {}
    return {};
  }
  function saveLearning() {
    try { window.localStorage.setItem(LEARN_KEY, JSON.stringify({ v: 1, w: learning })); } catch (e) {}
  }
  // Read-merge-write against the freshest stored copy: the learning curve is
  // shared across every tab on this origin (localStorage), so folding this
  // word's update into the latest snapshot keeps a concurrent write from
  // another tab from being clobbered by this tab's in-memory copy.
  function recordAnswer(word, isKnown) {
    var merged = loadLearning();
    var rec = merged[word] || learning[word] || { s: 0, k: 0, u: 0 };
    if (isKnown) { rec.k++; rec.s++; } else { rec.u++; rec.s = 0; }
    merged[word] = rec;
    learning = merged; // adopt the merged map (also picks up other tabs' words)
    saveLearning();
  }
  function isSeen(word) { return Object.prototype.hasOwnProperty.call(learning, word); }
  function isMastered(word) { var r = learning[word]; return !!(r && r.s >= MASTERY_STREAK); }

  // A word's CEFR level for the active target. German uses `level`; other
  // targets carry their own field (e.g. Turkish `tr_level`). Missing → B1.
  function wordLevel(w) { var lv = w[LEVEL_FIELD]; return LEVEL_ORDER[lv] ? lv : "B1"; }
  function inCurrentLevel(w) { return LEVEL_ORDER[wordLevel(w)] <= LEVEL_ORDER[currentLevel]; }

  // ---- topics ------------------------------------------------------------
  // Topic taxonomy comes from topics.js (TOPICS + TOPIC_ALL_LABEL). Every word
  // carries `topics: [ids]`. The chosen filter is stored globally (shared
  // across targets, since a topic like "food" means the same everywhere); an
  // empty selection means "all topics" and applies no filtering.
  var TOPIC_LIST = (typeof TOPICS !== "undefined" && TOPICS) ? TOPICS : [];
  var TOPIC_BY_ID = {};
  TOPIC_LIST.forEach(function (t) { TOPIC_BY_ID[t.id] = t; });
  var TOPIC_ALL = (typeof TOPIC_ALL_LABEL !== "undefined" && TOPIC_ALL_LABEL) ? TOPIC_ALL_LABEL : { en: "All topics" };

  function loadSelectedTopics() {
    try {
      var v = JSON.parse(window.localStorage.getItem("beeins_topics"));
      if (Array.isArray(v)) {
        var m = {};
        v.forEach(function (id) { if (TOPIC_BY_ID[id]) m[id] = true; });
        return m;
      }
    } catch (e) {}
    return {};
  }
  var selectedTopics = loadSelectedTopics();
  function saveSelectedTopics() {
    try { window.localStorage.setItem("beeins_topics", JSON.stringify(Object.keys(selectedTopics))); } catch (e) {}
  }
  function topicsAll() { return Object.keys(selectedTopics).length === 0; }
  function inSelectedTopics(w) {
    if (topicsAll()) return true;
    var ts = w.topics;
    if (!ts || !ts.length) return false;
    for (var i = 0; i < ts.length; i++) if (selectedTopics[ts[i]]) return true;
    return false;
  }
  function topicLabel(id) {
    var t = TOPIC_BY_ID[id];
    if (!t) return id;
    var k = uiLangKey();
    return (t.names && (t.names[k] || t.names.en)) || id;
  }
  // Paint the current word's topic emojis into the card's top-left corner.
  function renderCardTopics(w) {
    if (!elCardTopics) return;
    elCardTopics.innerHTML = "";
    var ts = (w && w.topics) || [];
    ts.forEach(function (id) {
      var t = TOPIC_BY_ID[id];
      if (!t) return;
      var sp = document.createElement("span");
      sp.className = "cardTopic";
      sp.textContent = t.emoji;
      var nm = topicLabel(id);
      sp.title = nm;
      sp.setAttribute("aria-label", nm);
      elCardTopics.appendChild(sp);
    });
  }


  // Build one session's deck from the words at the current level. Unless the
  // size is "All", it's a review mix: ~30% already-mastered words (kept fresh),
  // ~70% weak/new — previously-missed words prioritised over never-seen ones.
  // If one bucket falls short the other fills in, so the deck reaches its size.
  function buildDeck() {
    var pool = source.filter(function (w) { return inCurrentLevel(w) && inSelectedTopics(w); });
    if (sessionSize === "all" || pool.length === 0) return shuffle(pool.slice());

    var N = Math.min(sessionSize, pool.length);
    var weak = [], mastered = [];
    pool.forEach(function (w) { (isMastered(w.word) ? mastered : weak).push(w); });

    var missed = [], fresh = [];
    weak.forEach(function (w) { (isSeen(w.word) ? missed : fresh).push(w); });
    var weakOrdered = shuffle(missed).concat(shuffle(fresh));
    var reviewPool = shuffle(mastered);

    var reviewN = Math.min(Math.round(N * REVIEW_SHARE), reviewPool.length);
    var weakN = Math.min(N - reviewN, weakOrdered.length);
    reviewN = Math.min(reviewPool.length, N - weakN); // backfill if weak ran short

    return shuffle(weakOrdered.slice(0, weakN).concat(reviewPool.slice(0, reviewN)));
  }

  // ---- deck state --------------------------------------------------------
  // `deck` is a working queue. A card leaves the deck only when it is marked
  // as known; a "don't know" card is re-inserted at a random later position,
  // so it keeps coming back until it's remembered.
  var deck = buildDeck();
  var totalWords = deck.length;
  var knownCount = 0; // unique words marked as known
  var missCount = 0;  // total "don't know" taps (repeats included)

  var currentFrontKey = null; // which language is the title on the live card
  var revealed = false;       // has the live card's answer been revealed?

  // Back/forward "peek" navigation:
  // `seen` is a chronological log of resolved cards; `peekPos` is the index
  // currently being viewed (null = live current card, read/write; a number =
  // looking at a past card, read-only).
  var seen = [];
  var peekPos = null;

  // ---- language config ---------------------------------------------------
  // Master list of every language the app knows how to display. `key` is the
  // field name in each word/example object (German lives under `word`/`de`).
  // `flag`/`endo` (endonym) drive the dropdowns; `names` gives the language's
  // name in each possible interface language; `label` is the short chip tag.
  // A language only becomes selectable once its data actually exists in the
  // corpus (see AVAIL below), so new languages can be wired up here before
  // their translations land without showing blank cards.
  var LANGS = [
    { key: "de",    flag: "🇩🇪", label: "DE",    endo: "Deutsch",       names: { de: "Deutsch", en: "German", ru: "Немецкий", vi: "Tiếng Đức", fa: "آلمانی" } },
    { key: "en",    flag: "🇬🇧", label: "EN",    endo: "English",       names: { de: "Englisch", en: "English", ru: "Английский", vi: "Tiếng Anh", fa: "انگلیسی" } },
    { key: "ru",    flag: "🇷🇺", label: "RU",    endo: "Русский",       names: { de: "Russisch", en: "Russian", ru: "Русский", vi: "Tiếng Nga", fa: "روسی" } },
    { key: "vi",    flag: "🇻🇳", label: "VI",    endo: "Tiếng Việt",    names: { de: "Vietnamesisch", en: "Vietnamese", ru: "Вьетнамский", vi: "Tiếng Việt", fa: "ویتنامی" } },
    { key: "fa",    flag: "🇮🇷", label: "FA",    endo: "فارسی",         names: { de: "Persisch", en: "Persian", ru: "Персидский", vi: "Tiếng Ba Tư", fa: "فارسی" } },
    { key: "uk",    flag: "🇺🇦", label: "UK",    endo: "Українська",    names: { de: "Ukrainisch", en: "Ukrainian", ru: "Украинский", vi: "Tiếng Ukraina", fa: "اوکراینی" } },
    { key: "th",    flag: "🇹🇭", label: "TH",    endo: "ไทย",           names: { de: "Thailändisch", en: "Thai", ru: "Тайский", vi: "Tiếng Thái", fa: "تایلندی", fr: "Thaïlandais", tr: "Tayca", it: "Tailandese", es_ar: "Tailandés" } },
    { key: "zh",    flag: "🇨🇳", label: "ZH",    endo: "中文",           names: { de: "Chinesisch", en: "Chinese", ru: "Китайский", tr: "Çince", it: "Cinese", es_ar: "Chino", vi: "Tiếng Trung", fa: "چینی" } },
    { key: "ja",    flag: "🇯🇵", label: "JA",    endo: "日本語",         names: { de: "Japanisch", en: "Japanese", ru: "Японский", tr: "Japonca", it: "Giapponese", es_ar: "Japonés", vi: "Tiếng Nhật", fa: "ژاپنی" } },
    { key: "ko",    flag: "🇰🇷", label: "KO",    endo: "한국어",         names: { de: "Koreanisch", en: "Korean", ru: "Корейский", tr: "Korece", it: "Coreano", es_ar: "Coreano", vi: "Tiếng Hàn", fa: "کره‌ای" } },
    { key: "ms",    flag: "🇲🇾", label: "MS",    endo: "Bahasa Melayu", names: { de: "Malaiisch", en: "Malay", ru: "Малайский", vi: "Tiếng Mã Lai", fa: "مالایی" } },
    { key: "tr",    flag: "🇹🇷", label: "TR",    endo: "Türkçe",        names: { de: "Türkisch", en: "Turkish", ru: "Турецкий", vi: "Tiếng Thổ Nhĩ Kỳ", fa: "ترکی" } },
    { key: "pl",    flag: "🇵🇱", label: "PL",    endo: "Polski",        names: { de: "Polnisch", en: "Polish", ru: "Польский", vi: "Tiếng Ba Lan", fa: "لهستانی" } },
    { key: "sw",    flag: "🇹🇿", label: "SW",    endo: "Kiswahili",     names: { de: "Suaheli", en: "Swahili", ru: "Суахили", vi: "Tiếng Swahili", fa: "سواحیلی" } },
    { key: "am",    flag: "🇪🇹", label: "AM",    endo: "አማርኛ",          names: { de: "Amharisch", en: "Amharic", ru: "Амхарский", vi: "Tiếng Amhara", fa: "امهری" } },
    { key: "hi",    flag: "🇮🇳", label: "HI",    endo: "हिन्दी",          names: { de: "Hindi", en: "Hindi", ru: "Хинди", vi: "Tiếng Hindi", fa: "هندی" } },
    { key: "ur",    flag: "🇵🇰", label: "UR",    endo: "اردو",          names: { de: "Urdu", en: "Urdu", ru: "Урду", vi: "Tiếng Urdu", fa: "اردو" } },
    { key: "ar_eg", flag: "🇪🇬", label: "AR-EG", endo: "مصري",          names: { de: "Ägyptisch-Arabisch", en: "Egyptian Arabic", ru: "Египетский арабский", vi: "Tiếng Ả Rập Ai Cập", fa: "عربی مصری" } },
    { key: "ar_lb", flag: "🇱🇧", label: "AR-LB", endo: "لبناني",        names: { de: "Libanesisch-Arabisch", en: "Lebanese Arabic", ru: "Ливанский арабский", vi: "Tiếng Ả Rập Liban", fa: "عربی لبنانی" } },
    { key: "ar_sy", flag: "🇸🇾", label: "AR-SY", endo: "سوري",          names: { de: "Syrisch-Arabisch", en: "Syrian Arabic", ru: "Сирийский арабский", vi: "Tiếng Ả Rập Syria", fa: "عربی سوری" } },
    { key: "es_mx", flag: "🇲🇽", label: "ES-MX", endo: "Español (México)", names: { de: "Mexikanisches Spanisch", en: "Mexican Spanish", ru: "Мексиканский испанский", vi: "Tiếng Tây Ban Nha (Mexico)", fa: "اسپانیایی مکزیکی" } },
    { key: "es_ar", flag: "🇦🇷", label: "ES-AR", endo: "Español rioplatense", names: { de: "Argentinisches Spanisch", en: "Argentinian Spanish", ru: "Аргентинский испанский", tr: "Arjantin İspanyolcası", vi: "Tiếng Tây Ban Nha (Argentina)", fa: "اسپانیایی آرژانتینی" } },
    { key: "fr",    flag: "🇫🇷", label: "FR",    endo: "Français",      names: { de: "Französisch", en: "French", ru: "Французский", tr: "Fransızca", es_ar: "Francés", it: "Francese", uk: "Французька", fa: "فرانسوی", ar_sy: "فرنسي" } },
    { key: "it",    flag: "🇮🇹", label: "IT",    endo: "Italiano",      names: { de: "Italienisch", en: "Italian", ru: "Итальянский", tr: "İtalyanca", es_ar: "Italiano", fr: "Italien", uk: "Італійська", fa: "ایتالیایی", ar_sy: "إيطالي" } },
    { key: "ca",    flag: "🇦🇩", label: "CA",    endo: "Català",        names: { de: "Katalanisch", en: "Catalan", ru: "Каталанский", vi: "Tiếng Catalan", fa: "کاتالان" } },
    { key: "hr",    flag: "🇭🇷", label: "HR",    endo: "Hrvatski",      names: { de: "Kroatisch", en: "Croatian", ru: "Хорватский", vi: "Tiếng Croatia", fa: "کرواتی" } },
    { key: "be",    flag: "🇧🇾", label: "BE",    endo: "Беларуская",    names: { de: "Belarussisch", en: "Belarusian", ru: "Белорусский", vi: "Tiếng Belarus", fa: "بلاروسی" } },
    { key: "sr",    flag: "🇷🇸", label: "SR",    endo: "Српски",        names: { de: "Serbisch", en: "Serbian", ru: "Сербский", vi: "Tiếng Serbia", fa: "صربی" } },
    { key: "el",    flag: "🇬🇷", label: "EL",    endo: "Ελληνικά",      names: { de: "Griechisch", en: "Greek", ru: "Греческий", vi: "Tiếng Hy Lạp", fa: "یونانی" } },
    { key: "ro",    flag: "🇷🇴", label: "RO",    endo: "Română",        names: { de: "Rumänisch", en: "Romanian", ru: "Румынский", vi: "Tiếng Rumani", fa: "رومانیایی" } },
    { key: "sq",    flag: "🇦🇱", label: "SQ",    endo: "Shqip",         names: { de: "Albanisch", en: "Albanian", ru: "Албанский", vi: "Tiếng Albania", fa: "آلبانیایی" } }
  ];

  var LANG_BY_KEY = {};
  LANGS.forEach(function (l) { LANG_BY_KEY[l.key] = l; });

  // Read a language's value off a word / example object. Each corpus stores its
  // headword (the language being learned) under `word`; every other language is
  // a translation under its own key. So the target key resolves to `word`, and
  // example sentences always live under their language key.
  function wordVal(w, key) { return key === LEARN ? w.word : w[key]; }
  function exVal(ex, key) { return ex[key]; }

  // Which languages have real data in the corpus. German lives under `word`
  // (so it never trips the field check) and the active target is always
  // available; any other language needs at least one non-empty translation.
  var LANG_PRESENT = { de: true };
  LANG_PRESENT[LEARN] = true;
  source.forEach(function (w) {
    LANGS.forEach(function (l) {
      if (LANG_PRESENT[l.key]) return;
      var v = w[l.key];
      if (v != null && v !== "") LANG_PRESENT[l.key] = true;
    });
  });
  // Some targets restrict which languages you may study them FROM (TARGET.allow).
  // The target itself is always allowed. German (no `allow`) offers every
  // language with data.
  var ALLOW_SET = null;
  if (TARGET.allow) {
    ALLOW_SET = {};
    TARGET.allow.forEach(function (k) { ALLOW_SET[k] = true; });
    ALLOW_SET[LEARN] = true;
  }
  // AVAIL is the display list — the master config filtered to languages with
  // data and permitted for this target. Everything the UI enumerates
  // (dropdowns, translations, examples, grammar) walks AVAIL, so restricted or
  // unfinished languages simply don't appear.
  var AVAIL = LANGS.filter(function (l) {
    return LANG_PRESENT[l.key] && (!ALLOW_SET || ALLOW_SET[l.key]);
  });
  var AVAIL_SET = {};
  AVAIL.forEach(function (l) { AVAIL_SET[l.key] = true; });

  // Languages are grouped by language family, and alphabetically within each
  // family, everywhere they're listed (the learn selector, the languages
  // dropdown, the translation lines). Family order runs Germanic → Romance →
  // Slavic → Hellenic → Albanian → Indo-Iranian → Semitic → Turkic → the rest.
  var FAMILY_ORDER = ["germanic", "romance", "slavic", "hellenic", "albanian", "indo_iranian", "semitic", "turkic", "other"];
  var LANG_FAMILY = {
    de: "germanic", en: "germanic",
    fr: "romance", it: "romance", es_ar: "romance", es_mx: "romance", ca: "romance", ro: "romance",
    be: "slavic", ru: "slavic", uk: "slavic", hr: "slavic", sr: "slavic", pl: "slavic",
    el: "hellenic",
    sq: "albanian",
    fa: "indo_iranian", hi: "indo_iranian", ur: "indo_iranian",
    ar_eg: "semitic", ar_lb: "semitic", ar_sy: "semitic", am: "semitic", he: "semitic",
    tr: "turkic",
    vi: "other", zh: "other", th: "other", ms: "other", sw: "other"
  };
  function familyRank(key) {
    var i = FAMILY_ORDER.indexOf(LANG_FAMILY[key] || "other");
    return i < 0 ? FAMILY_ORDER.length : i;
  }
  // Sort a copy of a language list by family, then alphabetically by the name as
  // it reads in the current interface language (so the order matches what the
  // user sees). `nameOf` extracts the localized name for one entry.
  function sortByFamily(list, nameOf) {
    return list.slice().sort(function (a, b) {
      var d = familyRank(a.key) - familyRank(b.key);
      if (d) return d;
      return String(nameOf(a)).localeCompare(String(nameOf(b)));
    });
  }
  // Keep AVAIL itself in family order (by English name, a stable ordering
  // independent of the interface language) so every enumeration that walks it —
  // including the translation lines under a card — is grouped consistently.
  AVAIL = sortByFamily(AVAIL, function (l) { return (l.names && l.names.en) || l.endo; });
  AVAIL_SET = {};
  AVAIL.forEach(function (l) { AVAIL_SET[l.key] = true; });

  // Name of a language rendered in the current interface language, with an
  // English then endonym fallback.
  function localName(l, uiKey) {
    var n = l.names && (l.names[uiKey] || l.names.en);
    return n || l.endo;
  }

  // One unified language set. The languages you turn on are BOTH the ones that
  // can appear as the big prompt word (front of the card) AND the ones whose
  // translations + example lines appear after you reveal. `titleLangs` and
  // `showLangs` are kept as aliases of the same object so the rest of the code
  // (front-key picking vs. answer rendering) reads naturally.
  var showLangs = loadLangSet(SL_KEY);
  var titleLangs = showLangs;
  // The target is the language being learned, so it is always shown as the answer.
  showLangs[LEARN] = true;
  // The order in which "show" languages were turned on. The interface language
  // is the first still-enabled language in this order — the first one you
  // clicked — rather than whichever comes first in the master list.
  var showOrder = loadShowOrder();

  // ---- elements ----------------------------------------------------------
  var elDeck = document.getElementById("deck");
  var elControls = document.getElementById("controls");
  var elStats = document.getElementById("stats");
  var elCard = document.getElementById("card");
  var elWord = document.getElementById("word");
  var elWordReading = document.getElementById("wordReading");
  var elTranslations = document.getElementById("translations");
  var elExamples = document.getElementById("examples");
  var elProgress = document.getElementById("progress");
  var elStatNumbers = document.getElementById("statNumbers");
  var elUnknownList = document.getElementById("unknownList");
  var elBtnBack = document.getElementById("btnBack");
  var elBtnForward = document.getElementById("btnForward");
  var elBtnKnown = document.getElementById("btnKnown");
  var elBtnUnknown = document.getElementById("btnUnknown");
  var elSynonyms = document.getElementById("synonyms");
  var elNavCards = document.getElementById("navCards");
  var elNavGrammar = document.getElementById("navGrammar");
  var elModeNav = document.getElementById("modeNav");
  var elLevelNav = document.getElementById("levelNav");
  var elGrammar = document.getElementById("grammar");
  var elGrammarBody = document.getElementById("grammarBody");
  var elGrammarIndex = document.getElementById("grammarIndex");
  var elLblAsk = document.getElementById("lblAsk");
  var elLblShow = document.getElementById("lblShow");
  var elRevealHint = document.getElementById("revealHint");
  var elStatsTitle = document.getElementById("statsTitle");
  var elBtnReload = document.getElementById("btnReload");
  var elThemeToggle = document.getElementById("themeToggle");
  var elResetBtn = document.getElementById("resetBtn");
  var elSessionDrop = document.getElementById("sessionDrop");
  var elSessionBtn = document.getElementById("sessionDropBtn");
  var elSessionPanel = document.getElementById("sessionPanel");
  var elSessionFace = document.getElementById("sessionFace");
  var elThemeDrop = document.getElementById("themeDrop");
  var elThemeBtn = document.getElementById("themeDropBtn");
  var elThemePanel = document.getElementById("themePanel");
  var elThemeFace = document.getElementById("themeFace");
  var elAskPanel = document.getElementById("askPanel");
  var elShowPanel = document.getElementById("showPanel");
  var elAskBtn = document.getElementById("askDropBtn");
  var elShowBtn = document.getElementById("showDropBtn");
  var elAskFlags = document.getElementById("askFlags");
  var elShowFlags = document.getElementById("showFlags");
  var elAskDrop = document.querySelector('.langDrop[data-set="title"]');
  var elTopicDrop = document.getElementById("topicDrop");
  var elTopicBtn = document.getElementById("topicDropBtn");
  var elTopicPanel = document.getElementById("topicPanel");
  var elTopicFace = document.getElementById("topicFace");
  var elCardTopics = document.getElementById("cardTopics");
  var elLblTopics = document.getElementById("lblTopics");

  var GRAMMAR_DATA = (typeof GRAMMAR !== "undefined" && GRAMMAR) ? GRAMMAR : [];

  // CEFR level per grammar topic. Like the cards, the level switch is
  // cumulative: A1 shows A1 topics, A2 shows A1+A2, B1 shows everything.
  // Anything not listed falls back to B1.
  var GRAMMAR_LEVEL = {
    "genders-articles": "A1",
    "cases-overview": "A2",
    "pronouns": "A1",
    "possessives": "A1",
    "adjective-endings": "B1",
    "present-tense": "A1",
    "perfekt": "A1",
    "praeteritum": "A2",
    "plusquam-futur": "B1",
    "modal-verbs": "A1",
    "separable-verbs": "A1",
    "reflexive-verbs": "A2",
    "konjunktiv2": "B1",
    "passive": "B1",
    "prepositions": "A2",
    "verbs-prepositions": "B1",
    "comparative": "A2",
    "word-order": "A1",
    "subordinate-clauses": "A2",
    "relative-clauses": "B1"
  };
  function grammarTopicLevel(t) {
    // A topic may carry its own level (Turkish grammar does); otherwise fall
    // back to the German id→level map, then B1.
    if (LEVEL_ORDER[t.level]) return t.level;
    return LEVEL_ORDER[GRAMMAR_LEVEL[t.id]] ? GRAMMAR_LEVEL[t.id] : "B1";
  }
  // Topics at (and below) the current level, preserving source order.
  function grammarAtLevel() {
    var max = LEVEL_ORDER[currentLevel] || 3;
    return GRAMMAR_DATA.filter(function (t) {
      return LEVEL_ORDER[grammarTopicLevel(t)] <= max;
    });
  }

  // View state: "cards" flashcards vs "grammar" cheat sheet. The grammar view
  // reuses the two flag rows: the "ask"/title row picks the language grammar is
  // EXPLAINED in; the "show" row picks the languages examples & analogues appear in.
  var currentView = "cards";
  var sessionDone = false;

  // ---- study mode (the third toggle, only in the Study view) -------------
  // How a card prompts you before you reveal it:
  //   cards  — see one language's word, recall the rest (the classic behaviour)
  //   blanks — a real example sentence with the target word blanked, typed in
  //   listen — hear the target word's audio, type what you heard
  //   combi  — all three at once: audio + a fill-in sentence + a translation clue
  // Blanks/listen/combi accept a typed answer, graded on reveal. The deck,
  // levels and topics are identical across modes; only the prompt (and which
  // language leads the card) changes. Stored globally, not per target.
  var STUDY_MODES = { cards: 1, blanks: 1, listen: 1, combi: 1 };
  var TYPED_MODES = { blanks: 1, listen: 1, combi: 1 }; // modes with an input
  var studyMode = loadStudyMode();
  function loadStudyMode() {
    try { var v = window.localStorage.getItem("beeins_studyMode"); if (STUDY_MODES[v]) return v; } catch (e) {}
    return "cards";
  }

  // Small UI dictionary for the grammar view chrome, shown in the explain language.
  var GUI = {
    examples: { de: "Beispiele", en: "Examples", ru: "Примеры", vi: "Ví dụ", fa: "مثال‌ها", es_mx: "Ejemplos", ca: "Exemples", hr: "Primjeri", sr: "Примери", el: "Παραδείγματα", ro: "Exemple", sq: "Shembuj" },
    analogues: { de: "Sprachvergleich", en: "In your language", ru: "В вашем языке", vi: "Trong ngôn ngữ của bạn", fa: "در زبان شما", es_mx: "En tu idioma", ca: "En la teva llengua", hr: "Na tvom jeziku", sr: "На твом језику", el: "Στη γλώσσα σου", ro: "În limba ta", sq: "Në gjuhën tënde" },
    empty: { de: "Grammatikinhalt wird vorbereitet.", en: "Grammar content is being prepared.", ru: "Грамматический материал готовится.", vi: "Nội dung ngữ pháp đang được chuẩn bị.", fa: "محتوای گرامر در حال آماده‌سازی است.", es_mx: "El contenido de gramática se está preparando.", ca: "El contingut de gramàtica s'està preparant.", hr: "Sadržaj gramatike se priprema.", sr: "Садржај граматике се припрема.", el: "Το περιεχόμενο γραμματικής προετοιμάζεται.", ro: "Conținutul de gramatică este în pregătire.", sq: "Përmbajtja gramatikore po përgatitet." }
  };

  // Interface chrome (nav, buttons, progress, stats). Rendered in the first
  // enabled "show" language so the whole UI speaks the learner's language.
  var UISTR = {
    topics: {
      "de": "Themen",
      "en": "Topics",
      "ru": "Темы",
      "vi": "Chủ đề",
      "fa": "موضوع‌ها",
      "uk": "Теми",
      "th": "หัวข้อ",
      "zh": "主题",
      "ms": "Topik",
      "tr": "Konular",
      "pl": "Tematy",
      "sw": "Mada",
      "am": "ርዕሶች",
      "hi": "विषय",
      "ur": "موضوعات",
      "ar_eg": "مواضيع",
      "ar_lb": "مواضيع",
      "ar_sy": "مواضيع",
      "es_mx": "Temas",
      "es_ar": "Temas",
      "ca": "Temes",
      "it": "Argomenti",
      "fr": "Thèmes",
      "hr": "Teme",
      "be": "Тэмы",
      "sr": "Теме",
      "el": "Θέματα",
      "ro": "Subiecte",
      "sq": "Temat"
    },
    cards: {
      "de": "Karten",
      "en": "Cards",
      "fr": "Cartes",
      "it": "Carte",
      "be": "Карткі",
      "ru": "Карточки",
      "vi": "Thẻ",
      "fa": "کارت‌ها",
      "uk": "Картки",
      "th": "การ์ด",
      "zh": "卡片",
      "ms": "Kad",
      "tr": "Kartlar",
      "pl": "Karty",
      "sw": "Kadi",
      "am": "ካርዶች",
      "hi": "कार्ड",
      "ur": "کارڈز",
      "ar_eg": "كروت",
      "ar_lb": "بطاقات",
      "ar_sy": "كروت",
      "es_mx": "Tarjetas",
      "es_ar": "Tarjetas",
      "ca": "Targetes",
      "hr": "Kartice",
      "sr": "Картице",
      "el": "Κάρτες",
      "ro": "Carduri",
      "sq": "Kartat"
    },
    sessionTip: {
      "de": "Karten pro Sitzung",
      "en": "Cards per session",
      "fr": "Cartes par session",
      "it": "Carte per sessione",
      "be": "Картак за сесію",
      "ru": "Карточек за сессию",
      "vi": "Số thẻ mỗi phiên",
      "fa": "کارت در هر جلسه",
      "uk": "Карток за сесію",
      "th": "การ์ดต่อรอบ",
      "zh": "每轮学习卡片数",
      "ms": "Kad setiap sesi",
      "tr": "Oturum başına kart",
      "pl": "Kart na sesję",
      "sw": "Kadi kwa kila kipindi",
      "am": "በአንድ ክፍለ ጊዜ ካርዶች",
      "hi": "प्रति सत्र कार्ड",
      "ur": "فی سیشن کارڈز",
      "ar_eg": "كروت في الجلسة",
      "ar_lb": "بطاقات بالجلسة",
      "ar_sy": "كروت بالجلسة",
      "es_mx": "Tarjetas por sesión",
      "es_ar": "Tarjetas por sesión",
      "ca": "Targetes per sessió",
      "hr": "Kartice po sesiji",
      "sr": "Картице по сесији",
      "el": "Κάρτες ανά συνεδρία",
      "ro": "Carduri pe sesiune",
      "sq": "Karta për seancë"
    },
    sessionAll: {
      "de": "Alle",
      "en": "All",
      "fr": "Toutes",
      "it": "Tutte",
      "be": "Усе",
      "ru": "Все",
      "vi": "Tất cả",
      "fa": "همه",
      "uk": "Усі",
      "th": "ทั้งหมด",
      "zh": "全部",
      "ms": "Semua",
      "tr": "Tümü",
      "pl": "Wszystkie",
      "sw": "Zote",
      "am": "ሁሉም",
      "hi": "सभी",
      "ur": "تمام",
      "ar_eg": "الكل",
      "ar_lb": "الكل",
      "ar_sy": "الكل",
      "es_mx": "Todas",
      "es_ar": "Todas",
      "ca": "Totes",
      "hr": "Sve",
      "sr": "Све",
      "el": "Όλες",
      "ro": "Toate",
      "sq": "Të gjitha"
    },
    grammar: {
      "de": "Grammatik",
      "en": "Grammar",
      "fr": "Grammaire",
      "it": "Grammatica",
      "be": "Граматыка",
      "ru": "Грамматика",
      "vi": "Ngữ pháp",
      "fa": "گرامر",
      "uk": "Граматика",
      "th": "ไวยากรณ์",
      "zh": "语法",
      "ms": "Tatabahasa",
      "tr": "Dilbilgisi",
      "pl": "Gramatyka",
      "sw": "Sarufi",
      "am": "ሰዋስው",
      "hi": "व्याकरण",
      "ur": "گرامر",
      "ar_eg": "قواعد",
      "ar_lb": "قواعد",
      "ar_sy": "قواعد",
      "es_mx": "Gramática",
      "es_ar": "Gramática",
      "ca": "Gramàtica",
      "hr": "Gramatika",
      "sr": "Граматика",
      "el": "Γραμματική",
      "ro": "Gramatică",
      "sq": "Gramatikë"
    },
    // The two top view toggles. "Study" (was "Cards") is the flashcard practice
    // view; "Reference" (was "Grammar") is the grammar cheat-sheet.
    study: {
      "de": "Lernen", "en": "Study", "fr": "Réviser", "it": "Studia", "be": "Вучыцца",
      "ru": "Учить", "vi": "Học", "fa": "تمرین", "uk": "Вчити", "th": "ฝึก", "zh": "学习",
      "ms": "Belajar", "tr": "Çalış", "pl": "Nauka", "sw": "Jifunze", "am": "ተማር",
      "hi": "अभ्यास", "ur": "مشق", "ar_eg": "مذاكرة", "ar_lb": "دراسة", "ar_sy": "دراسة",
      "es_mx": "Estudiar", "es_ar": "Estudiar", "ca": "Estudiar", "hr": "Uči", "sr": "Учи",
      "el": "Μελέτη", "ro": "Studiu", "sq": "Mëso"
    },
    reference: {
      "de": "Referenz", "en": "Reference", "fr": "Référence", "it": "Riferimento", "be": "Даведнік",
      "ru": "Справочник", "vi": "Tra cứu", "fa": "مرجع", "uk": "Довідник", "th": "อ้างอิง", "zh": "参考",
      "ms": "Rujukan", "tr": "Başvuru", "pl": "Materiały", "sw": "Marejeleo", "am": "ማጣቀሻ",
      "hi": "संदर्भ", "ur": "حوالہ", "ar_eg": "مرجع", "ar_lb": "مرجع", "ar_sy": "مرجع",
      "es_mx": "Referencia", "es_ar": "Referencia", "ca": "Referència", "hr": "Priručnik", "sr": "Приручник",
      "el": "Αναφορά", "ro": "Referință", "sq": "Referencë"
    },
    // The two extra study modes (the third toggle, shown only in the Study view).
    // "Cards" reuses UISTR.cards. Blanks = cloze on a real example sentence;
    // Listen = audio-first recall (hear the word, then reveal it).
    blanks: {
      "de": "Lücken", "en": "Blanks", "fr": "Lacunes", "it": "Spazi", "be": "Прабелы",
      "ru": "Пропуски", "vi": "Điền từ", "fa": "جای خالی", "uk": "Пропуски", "th": "เติมคำ", "zh": "填空",
      "ms": "Isian", "tr": "Boşluk", "pl": "Luki", "sw": "Pengo", "am": "ክፍተት",
      "hi": "रिक्त", "ur": "خالی جگہ", "ar_eg": "فراغات", "ar_lb": "فراغات", "ar_sy": "فراغات",
      "es_mx": "Huecos", "es_ar": "Huecos", "ca": "Buits", "hr": "Praznine", "sr": "Празнине",
      "el": "Κενά", "ro": "Spații", "sq": "Zbrazëti"
    },
    listen: {
      "de": "Hören", "en": "Listen", "fr": "Écouter", "it": "Ascolto", "be": "Слухаць",
      "ru": "Слушать", "vi": "Nghe", "fa": "شنیدن", "uk": "Слухати", "th": "ฟัง", "zh": "听力",
      "ms": "Dengar", "tr": "Dinle", "pl": "Słuchanie", "sw": "Sikiliza", "am": "አዳምጥ",
      "hi": "सुनना", "ur": "سنیں", "ar_eg": "استماع", "ar_lb": "استماع", "ar_sy": "استماع",
      "es_mx": "Escuchar", "es_ar": "Escuchar", "ca": "Escoltar", "hr": "Slušaj", "sr": "Слушај",
      "el": "Ακρόαση", "ro": "Ascultare", "sq": "Dëgjo"
    },
    // Combi = all three prompts at once (audio + fill-in sentence + clue).
    combi: {
      "de": "Kombi", "en": "Combi", "fr": "Combi", "it": "Combo", "be": "Камбі",
      "ru": "Комби", "vi": "Kết hợp", "fa": "ترکیبی", "uk": "Комбі", "th": "รวม", "zh": "综合",
      "ms": "Gabungan", "tr": "Karma", "pl": "Combo", "sw": "Mchanganyiko", "am": "ቅይጥ",
      "hi": "मिश्रित", "ur": "مکس", "ar_eg": "مدمج", "ar_lb": "مدمج", "ar_sy": "مدمج",
      "es_mx": "Combi", "es_ar": "Combi", "ca": "Combi", "hr": "Kombo", "sr": "Комбо",
      "el": "Συνδυασμός", "ro": "Combo", "sq": "Kombi"
    },
    ask: {
      "de": "Frage",
      "en": "Ask",
      "fr": "Question",
      "it": "Domanda",
      "be": "Пытанне",
      "ru": "Вопрос",
      "vi": "Hỏi",
      "fa": "پرسش",
      "uk": "Питання",
      "th": "คำถาม",
      "zh": "问题",
      "ms": "Tanya",
      "tr": "Soru",
      "pl": "Pytanie",
      "sw": "Swali",
      "am": "ጥያቄ",
      "hi": "प्रश्न",
      "ur": "سوال",
      "ar_eg": "سؤال",
      "ar_lb": "سؤال",
      "ar_sy": "سؤال",
      "es_mx": "Pregunta",
      "es_ar": "Pregunta",
      "ca": "Pregunta",
      "hr": "Pitanje",
      "sr": "Питање",
      "el": "Ερώτηση",
      "ro": "Întrebare",
      "sq": "Pyetje"
    },
    show: {
      "de": "Antwort",
      "en": "Show",
      "fr": "Réponse",
      "it": "Risposta",
      "be": "Адказ",
      "ru": "Ответ",
      "vi": "Đáp",
      "fa": "پاسخ",
      "uk": "Відповідь",
      "th": "คำตอบ",
      "zh": "答案",
      "ms": "Jawab",
      "tr": "Cevap",
      "pl": "Odpowiedź",
      "sw": "Jibu",
      "am": "መልስ",
      "hi": "उत्तर",
      "ur": "جواب",
      "ar_eg": "إجابة",
      "ar_lb": "جواب",
      "ar_sy": "جواب",
      "es_mx": "Respuesta",
      "es_ar": "Respuesta",
      "ca": "Resposta",
      "hr": "Odgovor",
      "sr": "Одговор",
      "el": "Απάντηση",
      "ro": "Răspuns",
      "sq": "Përgjigje"
    },
    langs: {
      "de": "Aus",
      "en": "From",
      "ru": "С",
      "vi": "Từ",
      "fa": "از",
      "uk": "Від",
      "th": "จาก",
      "zh": "从",
      "ms": "Dari",
      "tr": "Kaynak",
      "pl": "Z",
      "sw": "Kutoka",
      "am": "ከ",
      "hi": "से",
      "ur": "سے",
      "ar_eg": "من",
      "ar_lb": "من",
      "ar_sy": "من",
      "es_mx": "De",
      "es_ar": "De",
      "ca": "De",
      "it": "Da",
      "fr": "De",
      "hr": "Iz",
      "be": "З",
      "sr": "Из",
      "el": "Από",
      "ro": "Din",
      "sq": "Nga"
    },
    reveal: {
      "de": "Tippe die Karte oder drücke eine beliebige Taste zum Aufdecken",
      "en": "Tap the card or press any key to reveal",
      "fr": "Touchez la carte ou appuyez sur une touche pour révéler",
      "it": "Tocca la carta o premi un tasto qualsiasi per rivelare",
      "be": "Націсніце на картку або любую клавішу, каб паказаць адказ",
      "ru": "Нажмите на карточку или любую клавишу, чтобы показать ответ",
      "vi": "Chạm vào thẻ hoặc nhấn phím bất kỳ để hiện",
      "fa": "روی کارت بزنید یا هر کلیدی را برای نمایش فشار دهید",
      "uk": "Торкніться картки або натисніть будь-яку клавішу, щоб побачити відповідь",
      "th": "แตะการ์ดหรือกดปุ่มใดก็ได้เพื่อเฉลย",
      "zh": "点击卡片或按任意键翻开",
      "ms": "Ketuk kad atau tekan sebarang kekunci untuk mendedahkan jawapan",
      "tr": "Açmak için karta dokun ya da herhangi bir tuşa bas",
      "pl": "Dotknij karty lub naciśnij dowolny klawisz, aby odsłonić",
      "sw": "Gusa kadi au bonyeza kitufe chochote ili kufunua",
      "am": "ካርዱን ይንኩ ወይም ለመግለጥ ማንኛውንም ቁልፍ ይጫኑ",
      "hi": "कार्ड पर टैप करें या दिखाने के लिए कोई भी कुंजी दबाएँ",
      "ur": "ظاہر کرنے کے لیے کارڈ پر ٹیپ کریں یا کوئی بھی کلید دبائیں",
      "ar_eg": "دوس على الكارت أو اضغط أي زرار علشان تكشف الإجابة",
      "ar_lb": "دوس عالبطاقة أو اكبس أي زرّ لتشوف الجواب",
      "ar_sy": "اضغط عالكرت أو اكبس أي زر لتشوف الجواب",
      "es_mx": "Toca la tarjeta o presiona cualquier tecla para revelar",
      "es_ar": "Toca la tarjeta o presiona cualquier tecla para revelar",
      "ca": "Toca la targeta o prem qualsevol tecla per revelar",
      "hr": "Dodirni karticu ili pritisni bilo koju tipku za prikaz",
      "sr": "Додирни картицу или притисни било који тастер да откријеш",
      "el": "Πάτησε την κάρτα ή οποιοδήποτε πλήκτρο για αποκάλυψη",
      "ro": "Atinge cardul sau apasă orice tastă pentru a dezvălui",
      "sq": "Prek kartën ose shtyp çdo tast për ta zbuluar"
    },
    back: {
      "de": "Zurück",
      "en": "Back",
      "fr": "Retour",
      "it": "Indietro",
      "be": "Назад",
      "ru": "Назад",
      "vi": "Quay lại",
      "fa": "بازگشت",
      "uk": "Назад",
      "th": "ย้อนกลับ",
      "zh": "返回",
      "ms": "Kembali",
      "tr": "Geri",
      "pl": "Wstecz",
      "sw": "Nyuma",
      "am": "ተመለስ",
      "hi": "वापस",
      "ur": "واپس",
      "ar_eg": "رجوع",
      "ar_lb": "رجوع",
      "ar_sy": "رجوع",
      "es_mx": "Atrás",
      "es_ar": "Atrás",
      "ca": "Enrere",
      "hr": "Natrag",
      "sr": "Назад",
      "el": "Πίσω",
      "ro": "Înapoi",
      "sq": "Prapa"
    },
    dontknow: {
      "de": "Weiß ich nicht",
      "en": "Don't know",
      "fr": "Je ne sais pas",
      "it": "Non lo so",
      "be": "Не ведаю",
      "ru": "Не знаю",
      "vi": "Chưa biết",
      "fa": "نمی‌دانم",
      "uk": "Не знаю",
      "th": "ไม่รู้",
      "zh": "不认识",
      "ms": "Tidak tahu",
      "tr": "Bilmiyorum",
      "pl": "Nie wiem",
      "sw": "Sijui",
      "am": "አላውቅም",
      "hi": "नहीं आता",
      "ur": "نہیں آتا",
      "ar_eg": "مش عارف",
      "ar_lb": "ما بعرف",
      "ar_sy": "ما بعرف",
      "es_mx": "No lo sé",
      "es_ar": "No lo sé",
      "ca": "No ho sé",
      "hr": "Ne znam",
      "sr": "Не знам",
      "el": "Δεν ξέρω",
      "ro": "Știu",
      "sq": "E di",
      "ro": "Nu știu",
      "sq": "Nuk e di"
    },
    know: {
      "de": "Weiß ich",
      "en": "Know",
      "fr": "Je sais",
      "it": "Lo so",
      "be": "Ведаю",
      "ru": "Знаю",
      "vi": "Đã biết",
      "fa": "می‌دانم",
      "uk": "Знаю",
      "th": "รู้",
      "zh": "认识",
      "ms": "Tahu",
      "tr": "Biliyorum",
      "pl": "Wiem",
      "sw": "Najua",
      "am": "አውቃለሁ",
      "hi": "आता है",
      "ur": "آتا ہے",
      "ar_eg": "عارف",
      "ar_lb": "بعرف",
      "ar_sy": "بعرف",
      "es_mx": "Lo sé",
      "es_ar": "Lo sé",
      "ca": "Ho sé",
      "hr": "Znam",
      "sr": "Знам",
      "el": "Ξέρω"
    },
    backcurrent: {
      "de": "Zur aktuellen Karte",
      "en": "Back to current",
      "fr": "Revenir à l'actuelle",
      "it": "Torna all'attuale",
      "be": "Да бягучай",
      "ru": "К текущей карточке",
      "vi": "Về thẻ hiện tại",
      "fa": "بازگشت به کارت فعلی",
      "uk": "До поточної",
      "th": "กลับไปยังการ์ดปัจจุบัน",
      "zh": "返回当前",
      "ms": "Kembali ke kad semasa",
      "tr": "Mevcut karta dön",
      "pl": "Do bieżącej karty",
      "sw": "Rudi kwenye kadi ya sasa",
      "am": "ወደ አሁኑ ካርድ ተመለስ",
      "hi": "मौजूदा कार्ड पर वापस",
      "ur": "موجودہ کارڈ پر واپس",
      "ar_eg": "ارجع للكارت الحالي",
      "ar_lb": "رجوع عالبطاقة الحالية",
      "ar_sy": "رجوع للكرت الحالي",
      "es_mx": "Volver a la actual",
      "es_ar": "Volver a la actual",
      "ca": "Torna a l'actual",
      "hr": "Natrag na trenutnu",
      "sr": "Назад на тренутну",
      "el": "Επιστροφή στην τρέχουσα",
      "ro": "Înapoi la cardul curent",
      "sq": "Kthehu te aktuali"
    },
    learned: {
      "de": "gelernt",
      "en": "learned",
      "fr": "apprises",
      "it": "imparate",
      "be": "вывучана",
      "ru": "выучено",
      "vi": "đã học",
      "fa": "آموخته",
      "uk": "вивчено",
      "th": "เรียนแล้ว",
      "zh": "已学",
      "ms": "dipelajari",
      "tr": "öğrenildi",
      "pl": "nauczonych",
      "sw": "zimejifunzwa",
      "am": "የተማሩ",
      "hi": "सीखे",
      "ur": "سیکھے",
      "ar_eg": "اتعلمت",
      "ar_lb": "متعلَّمة",
      "ar_sy": "متعلّمة",
      "es_mx": "aprendidas",
      "es_ar": "aprendidas",
      "ca": "apreses",
      "hr": "naučeno",
      "sr": "научено",
      "el": "μαθεμένες",
      "ro": "învățate",
      "sq": "të mësuara"
    },
    left: {
      "de": "übrig",
      "en": "left",
      "fr": "restantes",
      "it": "rimaste",
      "be": "засталося",
      "ru": "осталось",
      "vi": "còn lại",
      "fa": "باقی‌مانده",
      "uk": "залишилось",
      "th": "เหลือ",
      "zh": "剩余",
      "ms": "lagi",
      "tr": "kaldı",
      "pl": "pozostałych",
      "sw": "zimebaki",
      "am": "የቀሩ",
      "hi": "बाकी",
      "ur": "باقی",
      "ar_eg": "فاضلة",
      "ar_lb": "باقية",
      "ar_sy": "باقية",
      "es_mx": "restantes",
      "es_ar": "restantes",
      "ca": "restants",
      "hr": "preostalo",
      "sr": "преостало",
      "el": "απομένουν",
      "ro": "rămase",
      "sq": "të mbetura"
    },
    prevcard: {
      "de": "vorherige Karte",
      "en": "previous card",
      "fr": "carte précédente",
      "it": "carta precedente",
      "be": "папярэдняя картка",
      "ru": "предыдущая карточка",
      "vi": "thẻ trước",
      "fa": "کارت قبلی",
      "uk": "попередня картка",
      "th": "การ์ดก่อนหน้า",
      "zh": "上一张卡片",
      "ms": "kad sebelumnya",
      "tr": "önceki kart",
      "pl": "poprzednia karta",
      "sw": "kadi iliyopita",
      "am": "ቀዳሚ ካርድ",
      "hi": "पिछला कार्ड",
      "ur": "پچھلا کارڈ",
      "ar_eg": "الكارت اللي فات",
      "ar_lb": "البطاقة اللي قبل",
      "ar_sy": "الكرت السابق",
      "es_mx": "tarjeta anterior",
      "es_ar": "tarjeta anterior",
      "ca": "targeta anterior",
      "hr": "prethodna kartica",
      "sr": "претходна картица",
      "el": "προηγούμενη κάρτα",
      "ro": "cardul anterior",
      "sq": "karta e mëparshme"
    },
    done: {
      "de": "Fertig!",
      "en": "Done!",
      "fr": "Terminé !",
      "it": "Fatto!",
      "be": "Гатова!",
      "ru": "Готово!",
      "vi": "Xong!",
      "fa": "تمام شد!",
      "uk": "Готово!",
      "th": "เสร็จแล้ว!",
      "zh": "完成！",
      "ms": "Selesai!",
      "tr": "Bitti!",
      "pl": "Gotowe!",
      "sw": "Umemaliza!",
      "am": "ተጠናቀቀ!",
      "hi": "हो गया!",
      "ur": "ہو گیا!",
      "ar_eg": "خلصنا!",
      "ar_lb": "خلّصنا!",
      "ar_sy": "خلّصنا!",
      "es_mx": "¡Listo!",
      "es_ar": "¡Listo!",
      "ca": "Fet!",
      "hr": "Gotovo!",
      "sr": "Готово!",
      "el": "Έτοιμο!",
      "ro": "Gata!",
      "sq": "U krye!"
    },
    words: {
      "de": "Wörter",
      "en": "words",
      "fr": "mots",
      "it": "parole",
      "be": "слоў",
      "ru": "слов",
      "vi": "từ",
      "fa": "واژه",
      "uk": "слів",
      "th": "คำ",
      "zh": "个单词",
      "ms": "perkataan",
      "tr": "kelime",
      "pl": "słów",
      "sw": "maneno",
      "am": "ቃላት",
      "hi": "शब्द",
      "ur": "الفاظ",
      "ar_eg": "كلمة",
      "ar_lb": "كلمة",
      "ar_sy": "كلمة",
      "es_mx": "palabras",
      "es_ar": "palabras",
      "ca": "paraules",
      "hr": "riječi",
      "sr": "речи",
      "el": "λέξεις",
      "ro": "cuvinte",
      "sq": "fjalë"
    },
    slips: {
      "de": "Fehler",
      "en": "slips",
      "fr": "erreurs",
      "it": "errori",
      "be": "памылак",
      "ru": "ошибок",
      "vi": "lỗi",
      "fa": "خطا",
      "uk": "помилок",
      "th": "พลาด",
      "zh": "个错误",
      "ms": "silap",
      "tr": "hata",
      "pl": "błędów",
      "sw": "makosa",
      "am": "ስህተቶች",
      "hi": "गलतियाँ",
      "ur": "غلطیاں",
      "ar_eg": "غلطة",
      "ar_lb": "غلطة",
      "ar_sy": "غلطة",
      "es_mx": "errores",
      "es_ar": "errores",
      "ca": "errors",
      "hr": "pogreške",
      "sr": "грешке",
      "el": "λάθη",
      "ro": "greșeli",
      "sq": "gabime"
    },
    allremembered: {
      "de": "Alle Wörter behalten — super.",
      "en": "All words remembered — nice.",
      "fr": "Tous les mots retenus — bravo.",
      "it": "Tutte le parole ricordate — bene.",
      "be": "Усе словы запомнены — выдатна.",
      "ru": "Все слова запомнены — отлично.",
      "vi": "Đã nhớ hết các từ — tuyệt.",
      "fa": "همهٔ واژه‌ها را به یاد آوردید — عالی.",
      "uk": "Усі слова запам'яталися — чудово.",
      "th": "จำได้ครบทุกคำ — เยี่ยมมาก",
      "zh": "所有单词都记住了——太棒了。",
      "ms": "Semua perkataan diingati — bagus.",
      "tr": "Tüm kelimeler hatırlandı — harika.",
      "pl": "Wszystkie słowa zapamiętane — świetnie.",
      "sw": "Maneno yote yamekumbukwa — vizuri.",
      "am": "ሁሉም ቃላት ታውሰዋል — ጎበዝ።",
      "hi": "सभी शब्द याद रहे — बढ़िया।",
      "ur": "سارے الفاظ یاد رہے — بہت خوب۔",
      "ar_eg": "افتكرت كل الكلمات — حلو.",
      "ar_lb": "حفظت كل الكلمات — برافو.",
      "ar_sy": "حفظت كل الكلمات — حلو كتير.",
      "es_mx": "Recordaste todas las palabras — bien.",
      "es_ar": "Recordaste todas las palabras — bien.",
      "ca": "Has recordat totes les paraules — molt bé.",
      "hr": "Sve riječi zapamćene — odlično.",
      "sr": "Све речи запамћене — одлично.",
      "el": "Θυμήθηκες όλες τις λέξεις — τέλεια.",
      "ro": "Toate cuvintele reținute — bravo.",
      "sq": "I mbajte mend të gjitha fjalët — bukur."
    },
    reload: {
      "de": "Neu laden zum Neustart",
      "en": "Reload page to start over",
      "fr": "Recharger la page pour recommencer",
      "it": "Ricarica la pagina per ricominciare",
      "be": "Перазагрузіце старонку, каб пачаць спачатку",
      "ru": "Перезагрузить и начать заново",
      "vi": "Tải lại để bắt đầu lại",
      "fa": "برای شروع دوباره صفحه را بارگذاری کنید",
      "uk": "Перезавантажити сторінку, щоб почати спочатку",
      "th": "โหลดหน้าใหม่เพื่อเริ่มต้นใหม่",
      "zh": "刷新页面重新开始",
      "ms": "Muat semula halaman untuk mula semula",
      "tr": "Yeniden başlamak için sayfayı yenile",
      "pl": "Odśwież stronę, aby zacząć od nowa",
      "sw": "Pakia upya ukurasa ili kuanza tena",
      "am": "እንደገና ለመጀመር ገጹን ያድሱ",
      "hi": "फिर से शुरू करने के लिए पेज रीलोड करें",
      "ur": "نئے سرے سے شروع کرنے کے لیے صفحہ دوبارہ لوڈ کریں",
      "ar_eg": "حمّل الصفحة تاني علشان تبدأ من الأول",
      "ar_lb": "عيد تحميل الصفحة لتبلّش من الأول",
      "ar_sy": "عيد تحميل الصفحة لتبلّش من جديد",
      "es_mx": "Recarga la página para empezar de nuevo",
      "es_ar": "Recarga la página para empezar de nuevo",
      "ca": "Torna a carregar la pàgina per començar de nou",
      "hr": "Ponovno učitaj stranicu za početak iznova",
      "sr": "Поново учитај страницу за почетак испочетка",
      "el": "Φόρτωσε ξανά τη σελίδα για να ξεκινήσεις από την αρχή",
      "ro": "Reîncarcă pagina pentru a începe din nou",
      "sq": "Ringarko faqen për të filluar nga e para"
    },
    resetTip: {
      "de": "Fortschritt zurücksetzen und neu mischen",
      "en": "Reset progress and reshuffle",
      "fr": "Réinitialiser la progression et remélanger",
      "it": "Azzera i progressi e rimescola",
      "be": "Скінуць прагрэс і перамяшаць",
      "ru": "Сбросить прогресс и перемешать",
      "vi": "Đặt lại tiến độ và xáo lại",
      "fa": "بازنشانی پیشرفت و بر زدن دوباره",
      "uk": "Скинути прогрес і перемішати заново",
      "th": "รีเซ็ตความคืบหน้าและสับการ์ดใหม่",
      "zh": "重置进度并重新洗牌",
      "ms": "Tetapkan semula kemajuan dan kocok semula kad",
      "tr": "İlerlemeyi sıfırla ve yeniden karıştır",
      "pl": "Zresetuj postęp i przetasuj ponownie",
      "sw": "Weka upya maendeleo na uchanganye tena",
      "am": "እድገትን ዳግም ያስጀምሩ እና እንደገና ይቀላቅሉ",
      "hi": "प्रगति रीसेट करें और फिर से मिलाएँ",
      "ur": "پیش رفت ری سیٹ کریں اور نئے سرے سے ملائیں",
      "ar_eg": "صفّر التقدّم واخلط الكروت من جديد",
      "ar_lb": "صفّر التقدّم وخلّط البطاقات من جديد",
      "ar_sy": "صفّر التقدّم واخلط الكروت من جديد",
      "es_mx": "Reiniciar el progreso y volver a barajar",
      "es_ar": "Reiniciar el progreso y volver a barajar",
      "ca": "Reinicia el progrés i torna a barrejar",
      "hr": "Poništi napredak i ponovno promiješaj",
      "sr": "Поништи напредак и поново промешај",
      "el": "Επαναφορά προόδου και ανακάτεμα",
      "ro": "Resetează progresul și amestecă din nou",
      "sq": "Rivendos progresin dhe përziej sërish"
    },
    resetConfirm: {
      "de": "Deinen Lernfortschritt zurücksetzen? Alle in dieser Sitzung gelernten Karten gehen verloren.",
      "en": "Reset your progress? All cards learned in this session will be cleared.",
      "fr": "Réinitialiser votre progression ? Toutes les cartes apprises dans cette session seront effacées.",
      "it": "Azzerare i tuoi progressi? Tutte le carte imparate in questa sessione verranno cancellate.",
      "be": "Скінуць ваш прагрэс? Усе карткі, вывучаныя ў гэтай сесіі, будуць выдалены.",
      "ru": "Сбросить прогресс? Все выученные в этой сессии карточки будут удалены.",
      "vi": "Đặt lại tiến độ? Tất cả thẻ đã học trong phiên này sẽ bị xóa.",
      "fa": "پیشرفت خود را بازنشانی می‌کنید؟ همهٔ کارت‌های آموخته‌شدهٔ این جلسه پاک می‌شوند.",
      "uk": "Скинути ваш прогрес? Усі картки, вивчені в цьому сеансі, буде видалено.",
      "th": "รีเซ็ตความคืบหน้าของคุณหรือไม่? การ์ดทั้งหมดที่เรียนในรอบนี้จะถูกลบ",
      "zh": "要重置学习进度吗？本次学习中已学会的所有卡片都将被清除。",
      "ms": "Tetapkan semula kemajuan anda? Semua kad yang dipelajari dalam sesi ini akan dipadamkan.",
      "tr": "İlerlemen sıfırlansın mı? Bu oturumda öğrenilen tüm kartlar silinecek.",
      "pl": "Zresetować postęp? Wszystkie karty nauczone w tej sesji zostaną usunięte.",
      "sw": "Uweke upya maendeleo yako? Kadi zote ulizojifunza katika kikao hiki zitafutwa.",
      "am": "እድገትዎን ዳግም ያስጀምሩ? በዚህ ክፍለ-ጊዜ የተማሯቸው ካርዶች ሁሉ ይጠፋሉ።",
      "hi": "अपनी प्रगति रीसेट करें? इस सत्र में सीखे गए सभी कार्ड हटा दिए जाएँगे।",
      "ur": "اپنی پیش رفت ری سیٹ کریں؟ اس سیشن میں سیکھے گئے تمام کارڈز صاف ہو جائیں گے۔",
      "ar_eg": "تصفّر تقدّمك؟ كل الكروت اللي اتعلمتها في الجلسة دي هتتمسح.",
      "ar_lb": "بدّك تصفّر تقدّمك؟ كل البطاقات اللي تعلّمتها بهالجلسة رح تنمحي.",
      "ar_sy": "بدك تصفّر تقدّمك؟ كل الكروت يلي تعلمتها بهالجلسة رح تنمسح.",
      "es_mx": "¿Reiniciar tu progreso? Se borrarán todas las tarjetas aprendidas en esta sesión.",
      "es_ar": "¿Reiniciar tu progreso? Se borrarán todas las tarjetas aprendidas en esta sesión.",
      "ca": "Vols reiniciar el teu progrés? S'esborraran totes les targetes apreses en aquesta sessió.",
      "hr": "Poništiti napredak? Sve kartice naučene u ovoj sesiji bit će izbrisane.",
      "sr": "Поништити напредак? Све картице научене у овој сесији биће обрисане.",
      "el": "Επαναφορά της προόδου σου; Όλες οι κάρτες που έμαθες σε αυτή τη συνεδρία θα διαγραφούν.",
      "ro": "Resetezi progresul? Toate cardurile învățate în această sesiune vor fi șterse.",
      "sq": "Të rivendoset progresi? Të gjitha kartat e mësuara në këtë seancë do të fshihen."
    },
    askTip: {
      "de": "In welchen Sprachen die Frage erscheinen darf — das Aufforderungswort, das du vor dem Aufdecken siehst.",
      "en": "Which languages the question can appear in — the prompt word you see before revealing.",
      "fr": "Dans quelles langues la question peut apparaître — le mot indice que vous voyez avant de révéler.",
      "it": "In quali lingue può apparire la domanda — la parola-spunto che vedi prima di rivelare.",
      "be": "На якіх мовах можа з'яўляцца пытанне — слова-падказка, якое вы бачыце перад раскрыццём.",
      "ru": "На каких языках может появляться вопрос — слово-подсказка, которое вы видите до раскрытия.",
      "vi": "Những ngôn ngữ nào có thể xuất hiện làm câu hỏi — từ gợi ý bạn thấy trước khi lật thẻ.",
      "fa": "پرسش می‌تواند به کدام زبان‌ها نمایش داده شود — واژهٔ راهنما که پیش از آشکارسازی می‌بینید.",
      "uk": "Якими мовами може з'являтися питання — слово-підказка, яке ви бачите перед розкриттям.",
      "th": "ภาษาใดบ้างที่คำถามจะปรากฏได้ — คำโจทย์ที่คุณเห็นก่อนเฉลย",
      "zh": "问题可以用哪些语言显示——即你在翻开之前看到的提示词。",
      "ms": "Bahasa yang boleh dipaparkan untuk soalan — perkataan gesaan yang anda lihat sebelum mendedahkannya.",
      "tr": "Sorunun hangi dillerde görünebileceği — açmadan önce gördüğün ipucu kelimesi.",
      "pl": "W jakich językach może pojawić się pytanie — słowo-podpowiedź, które widzisz przed odsłonięciem.",
      "sw": "Lugha ambazo swali linaweza kuonekana — neno la kidokezo unaloliona kabla ya kufunua.",
      "am": "ጥያቄው ሊታይ የሚችልባቸው ቋንቋዎች — ከመግለጥዎ በፊት የሚያዩት የጥያቄ ቃል።",
      "hi": "प्रश्न किन भाषाओं में दिखाई दे सकता है — वह संकेत शब्द जो आप उत्तर दिखाने से पहले देखते हैं।",
      "ur": "سوال کن زبانوں میں دکھایا جا سکتا ہے — وہ اشارہ لفظ جو آپ جواب ظاہر کرنے سے پہلے دیکھتے ہیں۔",
      "ar_eg": "اللغات اللي ممكن يظهر بيها السؤال — الكلمة اللي بتشوفها قبل ما تكشف الإجابة.",
      "ar_lb": "بأي لغات فيها بيطلع السؤال — الكلمة اللي بتشوفها قبل ما تكشف الجواب.",
      "ar_sy": "بأي لغات ممكن يطلع السؤال — الكلمة يلي بتشوفها قبل ما تكشف الجواب.",
      "es_mx": "En qué idiomas puede aparecer la pregunta — la palabra que ves antes de revelar.",
      "es_ar": "En qué idiomas puede aparecer la pregunta — la palabra que ves antes de revelar.",
      "ca": "En quines llengües pot aparèixer la pregunta — la paraula que veus abans de revelar.",
      "hr": "Na kojim se jezicima može pojaviti pitanje — riječ-natuknica koju vidiš prije otkrivanja.",
      "sr": "На којим језицима може да се појави питање — реч-подсетник коју видиш пре откривања.",
      "el": "Σε ποιες γλώσσες μπορεί να εμφανιστεί η ερώτηση — η λέξη που βλέπεις πριν την αποκάλυψη.",
      "ro": "În ce limbi poate apărea întrebarea — cuvântul-indiciu pe care îl vezi înainte de a dezvălui.",
      "sq": "Në cilat gjuhë mund të shfaqet pyetja — fjala udhëzuese që sheh para se ta zbulosh."
    },
    showTip: {
      "de": "In welchen Sprachen die Antwort nach dem Aufdecken erscheint. {lang} wird immer gezeigt — das lernst du.",
      "en": "Which languages the answer appears in after you reveal. {lang} is always shown — it's what you're learning.",
      "fr": "Dans quelles langues la réponse apparaît après avoir révélé. {lang} est toujours affiché — c'est ce que vous apprenez.",
      "it": "In quali lingue appare la risposta dopo aver rivelato. {lang} è sempre mostrato — è ciò che stai imparando.",
      "be": "На якіх мовах з'яўляецца адказ пасля раскрыцця. {lang} паказваецца заўсёды — гэта тое, што вы вывучаеце.",
      "ru": "На каких языках показывается ответ после раскрытия. {lang} показывается всегда — его вы учите.",
      "vi": "Những ngôn ngữ nào xuất hiện làm đáp án sau khi lật thẻ. {lang} luôn hiển thị — đó là thứ bạn đang học.",
      "fa": "پاسخ پس از آشکارسازی به کدام زبان‌ها نمایش داده می‌شود. {lang} همیشه نمایش داده می‌شود — همان چیزی که می‌آموزید.",
      "uk": "Якими мовами з'являється відповідь після розкриття. {lang} показується завжди — саме її ви вивчаєте.",
      "th": "ภาษาใดบ้างที่คำตอบจะปรากฏหลังจากที่คุณเฉลย {lang} จะแสดงเสมอ — เป็นภาษาที่คุณกำลังเรียนอยู่",
      "zh": "翻开后答案可以用哪些语言显示。{lang}始终显示——那正是你要学的语言。",
      "ms": "Bahasa yang dipaparkan untuk jawapan selepas anda mendedahkannya. {lang} sentiasa dipaparkan — itulah yang anda pelajari.",
      "tr": "Açtıktan sonra cevabın hangi dillerde göründüğü. {lang} her zaman gösterilir — öğrendiğin dil o.",
      "pl": "W jakich językach pojawia się odpowiedź po odsłonięciu. {lang} jest zawsze pokazywany — to właśnie go się uczysz.",
      "sw": "Lugha ambazo jibu linaonekana baada ya kufunua. {lang} huonyeshwa kila wakati — ndicho unachojifunza.",
      "am": "መልሱ ከገለጡ በኋላ የሚታይባቸው ቋንቋዎች። {lang} ሁልጊዜ ይታያል — የሚማሩት ስለሆነ።",
      "hi": "उत्तर प्रकट करने के बाद किन भाषाओं में दिखाई देता है। {lang} हमेशा दिखाया जाता है — यही तो आप सीख रहे हैं।",
      "ur": "جواب ظاہر کرنے کے بعد کن زبانوں میں دکھایا جاتا ہے۔ {lang} ہمیشہ دکھائی جاتی ہے — یہی آپ سیکھ رہے ہیں۔",
      "ar_eg": "اللغات اللي بتظهر بيها الإجابة بعد ما تكشف. {lang} بيظهر دايمًا — لأنه اللي بتتعلمه.",
      "ar_lb": "بأي لغات بيطلع الجواب بعد ما تكشف. {lang} دايمًا بيبيّن — هوّي اللي عم تتعلّمه.",
      "ar_sy": "بأي لغات بيطلع الجواب بعد ما تكشف الكرت. {lang} دايماً بيظهر — هو يلي عم تتعلمو.",
      "es_mx": "En qué idiomas aparece la respuesta después de revelar. {lang} siempre se muestra — es lo que estás aprendiendo.",
      "es_ar": "En qué idiomas aparece la respuesta después de revelar. {lang} siempre se muestra — es lo que estás aprendiendo.",
      "ca": "En quines llengües apareix la resposta després de revelar. {lang} sempre es mostra — és el que estàs aprenent.",
      "hr": "Na kojim se jezicima pojavljuje odgovor nakon otkrivanja. {lang} se uvijek prikazuje — to je ono što učiš.",
      "sr": "На којим језицима се појављује одговор након откривања. {lang} се увек приказује — то је оно што учиш.",
      "el": "Σε ποιες γλώσσες εμφανίζεται η απάντηση μετά την αποκάλυψη. {lang} εμφανίζεται πάντα — αυτό μαθαίνεις.",
      "ro": "În ce limbi apare răspunsul după ce dezvălui. {lang} se afișează mereu — este limba pe care o înveți.",
      "sq": "Në cilat gjuhë shfaqet përgjigjja pasi e zbulon. {lang} shfaqet gjithmonë — është ajo që po mëson."
    },
    deLocked: {
      "de": "{lang} wird immer angezeigt — das ist die Sprache, die du lernst.",
      "en": "{lang} is always shown — it's the language you're learning.",
      "fr": "{lang} est toujours affiché — c'est la langue que vous apprenez.",
      "it": "{lang} è sempre mostrato — è la lingua che stai imparando.",
      "be": "{lang} паказваецца заўсёды — гэта мова, якую вы вывучаеце.",
      "ru": "{lang} показывается всегда — это язык, который вы учите.",
      "vi": "{lang} luôn được hiển thị — đó là ngôn ngữ bạn đang học.",
      "fa": "{lang} همیشه نمایش داده می‌شود — زبانی که در حال یادگیری آن هستید.",
      "uk": "{lang} показується завжди — це мова, яку ви вивчаєте.",
      "th": "{lang} จะแสดงเสมอ — เป็นภาษาที่คุณกำลังเรียนอยู่",
      "zh": "{lang}始终显示——它正是你正在学习的语言。",
      "ms": "{lang} sentiasa dipaparkan — itulah bahasa yang anda pelajari.",
      "tr": "{lang} her zaman gösterilir — öğrenmekte olduğun dil o.",
      "pl": "{lang} jest zawsze pokazywany — to język, którego się uczysz.",
      "sw": "{lang} huonyeshwa kila wakati — ndiyo lugha unayojifunza.",
      "am": "{lang} ሁልጊዜ ይታያል — የሚማሩት ቋንቋ ስለሆነ።",
      "hi": "{lang} हमेशा दिखाया जाता है — यही वह भाषा है जो आप सीख रहे हैं।",
      "ur": "{lang} ہمیشہ دکھائی جاتی ہے — یہی وہ زبان ہے جو آپ سیکھ رہے ہیں۔",
      "ar_eg": "{lang} بيظهر دايمًا — دي اللغة اللي بتتعلمها.",
      "ar_lb": "{lang} دايمًا بيبيّن — هوّي اللغة اللي عم تتعلّمها.",
      "ar_sy": "{lang} دايماً بيظهر — هو اللغة يلي عم تتعلمها.",
      "es_mx": "{lang} siempre se muestra — es el idioma que estás aprendiendo.",
      "es_ar": "{lang} siempre se muestra — es el idioma que estás aprendiendo.",
      "ca": "{lang} sempre es mostra — és la llengua que estàs aprenent.",
      "hr": "{lang} se uvijek prikazuje — to je jezik koji učiš.",
      "sr": "{lang} се увек приказује — то је језик који учиш.",
      "el": "{lang}: εμφανίζεται πάντα — είναι η γλώσσα που μαθαίνεις.",
      "ro": "{lang} se afișează mereu — este limba pe care o înveți.",
      "sq": "{lang} shfaqet gjithmonë — është gjuha që po mëson."
    },
    levelTip: {
      "de": "Lernstufe: zeigt Wörter bis A1, A2 oder B1 (kumulativ).",
      "en": "Study level: shows words up to A1, A2 or B1 (cumulative).",
      "fr": "Niveau d'étude : affiche les mots jusqu'à A1, A2 ou B1 (cumulatif).",
      "it": "Livello di studio: mostra le parole fino ad A1, A2 o B1 (cumulativo).",
      "be": "Узровень навучання: паказвае словы да A1, A2 ці B1 (накапляльна).",
      "ru": "Уровень: показывает слова до A1, A2 или B1 (накопительно).",
      "vi": "Cấp độ học: hiện các từ đến A1, A2 hoặc B1 (tích lũy).",
      "fa": "سطح یادگیری: واژه‌ها را تا A1، A2 یا B1 نشان می‌دهد (تجمعی).",
      "uk": "Рівень навчання: показує слова до A1, A2 або B1 (накопичувально).",
      "th": "ระดับการเรียน: แสดงคำศัพท์ถึง A1, A2 หรือ B1 (สะสม)",
      "zh": "学习级别：显示 A1、A2 或 B1 及以下的单词（累计）。",
      "ms": "Tahap pembelajaran: memaparkan perkataan sehingga A1, A2 atau B1 (terkumpul).",
      "tr": "Çalışma seviyesi: A1, A2 veya B1'e kadar olan kelimeleri gösterir (kümülatif).",
      "pl": "Poziom nauki: pokazuje słowa do A1, A2 lub B1 (kumulatywnie).",
      "sw": "Kiwango cha kujifunza: huonyesha maneno hadi A1, A2 au B1 (kwa mrundikano).",
      "am": "የመማሪያ ደረጃ፦ እስከ A1፣ A2 ወይም B1 ድረስ ያሉ ቃላትን ያሳያል (ድምር)።",
      "hi": "अध्ययन स्तर: A1, A2 या B1 तक के शब्द दिखाता है (संचयी)।",
      "ur": "سطحِ مطالعہ: A1، A2 یا B1 تک کے الفاظ دکھاتا ہے (مجموعی)۔",
      "ar_eg": "مستوى المذاكرة: بيوريّك الكلمات لحد A1 أو A2 أو B1 (تراكمي).",
      "ar_lb": "مستوى الدراسة: بيعرض الكلمات لحد A1، A2 أو B1 (تراكمي).",
      "ar_sy": "مستوى التعلّم: بيعرض الكلمات لحد A1 أو A2 أو B1 (تراكمي).",
      "es_mx": "Nivel de estudio: muestra palabras hasta A1, A2 o B1 (acumulativo).",
      "es_ar": "Nivel de estudio: muestra palabras hasta A1, A2 o B1 (acumulativo).",
      "ca": "Nivell d'estudi: mostra paraules fins a A1, A2 o B1 (acumulatiu).",
      "hr": "Razina učenja: prikazuje riječi do A1, A2 ili B1 (kumulativno).",
      "sr": "Ниво учења: приказује речи до A1, A2 или B1 (кумулативно).",
      "el": "Επίπεδο μελέτης: εμφανίζει λέξεις έως A1, A2 ή B1 (σωρευτικά).",
      "ro": "Nivel de studiu: afișează cuvinte până la A1, A2 sau B1 (cumulativ).",
      "sq": "Niveli i studimit: shfaq fjalë deri në A1, A2 ose B1 (kumulativ)."
    }
  };

  // ---- utilities ---------------------------------------------------------
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }

  function langByKey(key) { return LANG_BY_KEY[key] || LANGS[0]; }

  // ---- pronunciation (text-to-speech) ------------------------------------
  // Primary engine: Piper — an open-source neural TTS (VITS) that runs fully in
  // the browser via WebAssembly (vendored under vendor/piper/). The target's
  // voice model (~60 MB) downloads once from HuggingFace and is cached in the
  // browser (OPFS), so afterwards it works offline and sounds natural no matter
  // what voices the OS has. Until the model has finished downloading — and if
  // Piper is unsupported or errors — we fall back to the browser's built-in Web
  // Speech API in the target locale.
  var TTS_OK = typeof window !== "undefined" && "speechSynthesis" in window;
  var TTS_LANG = TARGET.tts || "de-DE";                  // BCP-47 locale to speak
  var TTS_PREFIX = TTS_LANG.split(/[-_]/)[0].toLowerCase(); // "de", "tr", …
  var PIPER_VOICE = TARGET.piper || null;                // Piper voice id, if any
  var SPEAK_OK = TTS_OK || !!PIPER_VOICE;                // is any engine available?

  // Inline speaker icon (inherits currentColor so it can be shown in a muted
  // tone next to the text and brighten on hover).
  var SPEAKER_SVG =
    '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M11 5 6 9H2v6h4l5 4z"></path>' +
    '<path d="M15.5 8.5a5 5 0 0 1 0 7"></path>' +
    '<path d="M19 5a9 9 0 0 1 0 14"></path></svg>';

  // --- Web Speech fallback: pick the best-sounding voice for the locale ---
  var learnVoice = null;
  var EXACT_LANG_RE = new RegExp(TTS_LANG.replace(/[-_]/g, "[-_]"), "i");
  var PREFIX_LANG_RE = new RegExp("^" + TTS_PREFIX + "([-_]|$)", "i");
  function voiceScore(v) {
    var s = 0, n = (v.name || "").toLowerCase();
    if (EXACT_LANG_RE.test(v.lang || "")) s += 4;
    else if (PREFIX_LANG_RE.test(v.lang || "")) s += 2;
    if (/(neural|premium|enhanced|natural|siri)/.test(n)) s += 3;
    if (v.localService) s += 1;
    return s;
  }
  function refreshVoice() {
    if (!TTS_OK) return;
    var voices = window.speechSynthesis.getVoices() || [];
    var match = voices.filter(function (v) { return PREFIX_LANG_RE.test(v.lang || ""); });
    match.sort(function (a, b) { return voiceScore(b) - voiceScore(a); });
    learnVoice = match[0] || null;
  }
  if (TTS_OK) {
    refreshVoice();
    window.speechSynthesis.addEventListener("voiceschanged", refreshVoice);
  }
  function webSpeak(text, btn) {
    if (!TTS_OK || !text) return;
    var synth = window.speechSynthesis;
    try {
      synth.cancel();
      var prev = document.querySelector(".speakBtn.speaking");
      if (prev) prev.classList.remove("speaking");
      var u = new SpeechSynthesisUtterance(String(text));
      u.lang = TTS_LANG;
      if (learnVoice) u.voice = learnVoice;
      u.rate = 0.95;
      if (btn) {
        btn.classList.add("speaking");
        u.onend = u.onerror = function () { btn.classList.remove("speaking"); };
      }
      synth.speak(u);
    } catch (e) {}
  }

  // --- Piper neural engine (primary) ---
  var piperMod = null, piperLoading = null;
  var piperState = "idle";   // idle | downloading | ready | dead
  var piperAudio = null;
  function loadPiper() {
    if (piperMod) return Promise.resolve(piperMod);
    if (piperLoading) return piperLoading;
    var url = new URL("vendor/piper/piper-tts-web.js", document.baseURI).href;
    piperLoading = import(url).then(function (m) { piperMod = m; return m; });
    return piperLoading;
  }
  function markSpeaking(btn) {
    if (!btn) return;
    var p = document.querySelector(".speakBtn.speaking");
    if (p) p.classList.remove("speaking");
    btn.classList.add("speaking");
  }
  function playWav(wav, btn) {
    if (TTS_OK) { try { window.speechSynthesis.cancel(); } catch (e) {} }
    try { if (piperAudio) piperAudio.pause(); } catch (e) {}
    var url = URL.createObjectURL(wav);
    piperAudio = new Audio(url);
    markSpeaking(btn);
    piperAudio.onended = piperAudio.onerror = function () {
      if (btn) btn.classList.remove("speaking");
      URL.revokeObjectURL(url);
    };
    var pr = piperAudio.play();
    if (pr && pr.catch) pr.catch(function () { if (btn) btn.classList.remove("speaking"); });
  }
  // Resolves true when Piper played the audio; false means "not ready yet, use
  // the fallback for this tap" (the model download is kicked off in background).
  function piperSpeak(text, btn) {
    return loadPiper().then(function (m) {
      return Promise.resolve(m.stored ? m.stored() : []).then(function (list) {
        var have = (list || []).indexOf(PIPER_VOICE) !== -1;
        if (!have) {
          if (piperState !== "downloading") {
            piperState = "downloading";
            m.download(PIPER_VOICE, function () {}).then(function () { piperState = "ready"; })
              .catch(function () { piperState = "dead"; });
          }
          return false;
        }
        piperState = "ready";
        if (btn) btn.classList.add("loading");
        return m.predict({ text: String(text), voiceId: PIPER_VOICE }).then(function (wav) {
          if (btn) btn.classList.remove("loading");
          playWav(wav, btn);
          return true;
        });
      });
    });
  }

  // Synthesize on the fly: Piper if ready; otherwise Web Speech while Piper's
  // model downloads (or permanently, if Piper can't run here). Used only as a
  // fallback when a pre-generated clip is missing.
  function speakSynth(text, btn) {
    if (!text) return;
    if (PIPER_VOICE && piperState !== "dead") {
      piperSpeak(text, btn).then(function (handled) {
        if (!handled) webSpeak(text, btn);
      }).catch(function () {
        piperState = "dead";
        if (btn) btn.classList.remove("loading");
        webSpeak(text, btn);
      });
      return;
    }
    webSpeak(text, btn);
  }

  // cyrb53 string hash — MUST stay byte-identical to the generator that named
  // the pre-rendered audio files (scratchpad/gen-audio.js).
  function cyrb53(str, seed) {
    seed = seed || 0;
    var h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (var i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }
  // Clips live in the separate beeins-audio repo, served via the jsDelivr CDN
  // (edge- and browser-cached; only clips actually played are fetched). Keeps
  // this repo small. If the CDN is unreachable, speak() falls back to synthesis.
  var AUDIO_BASE = "https://cdn.jsdelivr.net/gh/universeawaits/beeins-audio@main/audio/";
  function audioURL(text) {
    return AUDIO_BASE + LEARN + "/" + cyrb53(String(text)) + ".m4a";
  }

  // Speak a target-language string. Every corpus string is pre-rendered to a
  // small audio file, so we play that instantly (browser-cached after first
  // play, tiny traffic). If the clip is missing/unplayable, fall back to
  // on-the-fly synthesis.
  function speak(text, btn) {
    if (!text) return;
    if (TTS_OK) { try { window.speechSynthesis.cancel(); } catch (e) {} }
    try { if (piperAudio) piperAudio.pause(); } catch (e) {}
    var a = new Audio();
    piperAudio = a;
    var fell = false;
    var fallback = function () {
      if (fell) return; fell = true;
      if (btn) btn.classList.remove("speaking");
      speakSynth(text, btn);
    };
    markSpeaking(btn);
    a.onended = function () { if (btn) btn.classList.remove("speaking"); };
    a.onerror = fallback;
    a.src = audioURL(text);
    var pr = a.play();
    if (pr && pr.catch) pr.catch(fallback);
  }

  // Build a muted speaker button that plays `text` when clicked. Its pointer
  // events are stopped so a tap never starts a card swipe or reveals the card.
  function makeSpeakBtn(text) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "speakBtn";
    b.title = "Play pronunciation";
    b.setAttribute("aria-label", "Play pronunciation");
    b.innerHTML = SPEAKER_SVG;
    var stop = function (e) { e.stopPropagation(); };
    b.addEventListener("mousedown", stop);
    b.addEventListener("touchstart", stop, { passive: true });
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      speak(text, b);
    });
    return b;
  }

  function allowedTitleLangs() {
    var a = AVAIL.filter(function (l) { return titleLangs[l.key]; });
    return a.length ? a : AVAIL.slice();
  }

  // Best-effort map from the browser / OS locale to one of our language keys.
  // Returns null when nothing usable matches. Used only to seed the FIRST-run
  // default so a brand-new user starts with the target + their own language.
  // Only languages permitted for the active target (AVAIL) qualify.
  function osLangKey() {
    var locales = [];
    try {
      if (navigator.languages && navigator.languages.length) locales = navigator.languages.slice();
      else if (navigator.language) locales = [navigator.language];
    } catch (e) {}
    // A few locales don't map 1:1 onto the keys we ship.
    var alias = { es: "es_mx", ar: "ar_eg" };
    for (var i = 0; i < locales.length; i++) {
      var primary = String(locales[i] || "").toLowerCase().split(/[-_]/)[0];
      if (!primary) continue;
      var key = alias.hasOwnProperty(primary) ? alias[primary] : primary;
      // Prefer the exact/aliased key; but if it isn't available for this target
      // (e.g. Egyptian Arabic when learning Turkish, whose only Arabic is
      // Syrian), fall back to any available variant of the same base language.
      if (key === LEARN || !AVAIL_SET[key]) {
        key = null;
        for (var j = 0; j < AVAIL.length; j++) {
          var k = AVAIL[j].key;
          if (k !== LEARN && k.split("_")[0] === primary) { key = k; break; }
        }
      }
      if (key && key !== LEARN && AVAIL_SET[key]) return key;
    }
    return null;
  }

  function loadLangSet(storageKey) {
    try {
      var raw = window.localStorage.getItem(storageKey);
      if (raw) {
        var parsed = JSON.parse(raw);
        var out = {}, any = false;
        AVAIL.forEach(function (l) {
          // languages not present in a saved preference (e.g. newly added
          // ones) default to on rather than off
          out[l.key] = parsed.hasOwnProperty(l.key) ? !!parsed[l.key] : true;
          if (out[l.key]) any = true;
        });
        if (any) return out;
      }
    } catch (e) {}
    // First run (nothing saved): start with just the target + the OS language
    // selected, not every language at once.
    var def = {};
    AVAIL.forEach(function (l) { def[l.key] = false; });
    def[LEARN] = true;
    var os = osLangKey();
    if (os) def[os] = true;
    return def;
  }

  function setForName(name) { return name === "show" ? showLangs : titleLangs; }
  function storageKeyFor(name) { return name === "show" ? SL_KEY : TL_KEY; }

  function saveLangSet(name) {
    try { window.localStorage.setItem(storageKeyFor(name), JSON.stringify(setForName(name))); } catch (e) {}
  }

  // Selection order of the "show" languages (the order you clicked them on),
  // persisted so the chosen interface language survives a reload. The target is
  // never tracked here — it is always shown but never drives the interface.
  function loadShowOrder() {
    var order = [];
    try {
      var raw = window.localStorage.getItem(SO_KEY);
      var parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) {
        parsed.forEach(function (k) {
          if (LANG_BY_KEY[k] && k !== LEARN && order.indexOf(k) === -1) order.push(k);
        });
      }
    } catch (e) {}
    return order;
  }

  function saveShowOrder() {
    try { window.localStorage.setItem(SO_KEY, JSON.stringify(showOrder)); } catch (e) {}
  }

  // Enabled non-German "show" languages ordered by when they were turned on.
  // Any enabled language without a recorded position (defaults, or sets saved
  // before order tracking existed) falls back to master-list order after the
  // tracked ones.
  function orderedShowLangs() {
    var byOrder = [];
    showOrder.forEach(function (k) {
      if (showLangs[k] && LANG_BY_KEY[k]) byOrder.push(LANG_BY_KEY[k]);
    });
    AVAIL.forEach(function (l) {
      if (l.key !== LEARN && showLangs[l.key] && byOrder.indexOf(l) === -1) byOrder.push(l);
    });
    return byOrder;
  }

  // ---- session persistence (ephemeral) -----------------------------------
  // The live session (which cards are still queued, the history, and the live
  // card + its reveal state) is mirrored to sessionStorage. That survives a
  // page reload but is wiped when the browser/tab closes, so a closed browser
  // starts a brand-new session. The long-term learning curve lives separately
  // in localStorage (see above) and is NOT touched here. Cards are stored by
  // their German word, which is unique across the corpus, so the save survives
  // data updates that shuffle array positions.
  var SESSION_KEY = "beeins_session_" + LEARN;
  var byWord = {};
  source.forEach(function (w) { byWord[w.word] = w; });

  function saveProgress() {
    try {
      var data = {
        v: 1,
        level: currentLevel,
        done: sessionDone,
        known: knownCount,
        miss: missCount,
        deck: deck.map(function (w) { return w.word; }),
        seen: seen.map(function (s) { return [s.word.word, s.frontKey]; }),
        cur: { front: currentFrontKey, revealed: revealed, peek: peekPos }
      };
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function clearProgress() {
    try { window.sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  function loadProgress() {
    try {
      var raw = window.sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      var d = JSON.parse(raw);
      if (!d || d.v !== 1 || !LEVEL_ORDER[d.level]) return null;
      return d;
    } catch (e) { return null; }
  }

  // Rebuild live state from a saved snapshot. Returns false if there was
  // nothing usable to restore (so the caller starts a fresh session).
  function restoreSession(saved) {
    currentLevel = saved.level;
    knownCount = saved.known || 0;
    missCount = saved.miss || 0;
    deck = (saved.deck || []).map(function (id) { return byWord[id]; }).filter(Boolean);
    seen = (saved.seen || []).map(function (a) {
      var w = byWord[a[0]];
      return w ? { word: w, frontKey: a[1] } : null;
    }).filter(Boolean);
    // Nothing left to study and not marked done → treat as a fresh deck.
    if (deck.length === 0 && !saved.done) return false;
    totalWords = knownCount + deck.length;
    sessionDone = !!saved.done && deck.length === 0;
    peekPos = (saved.cur && saved.cur.peek != null) ? saved.cur.peek : null;
    if (peekPos !== null && (peekPos < 0 || peekPos >= seen.length)) peekPos = null;
    currentFrontKey = saved.cur && saved.cur.front;
    if (!currentFrontKey || !titleLangs[currentFrontKey]) currentFrontKey = allowedTitleLangs()[0].key;
    revealed = !!(saved.cur && saved.cur.revealed);
    return true;
  }

  // Wipe the saved session and start over on the current level.
  function resetSession() {
    clearProgress();
    deck = buildDeck();
    totalWords = deck.length;
    knownCount = 0;
    missCount = 0;
    seen = [];
    peekPos = null;
    revealed = false;
    sessionDone = false;
    elStats.classList.add("hidden");
    showView("cards");
    if (deck.length === 0) {
      elWord.textContent = "—"; if (elCardTopics) elCardTopics.innerHTML = "";
      elCard.classList.remove("answer-hidden");
      elTranslations.innerHTML = "";
      elSynonyms.innerHTML = "";
      elExamples.innerHTML = "";
      updateControls();
      updateProgress();
    } else {
      renderCard();
    }
    saveProgress();
  }

  // ---- rendering ---------------------------------------------------------
  // What the learner last typed into the input (kept so the revealed card can
  // show it and mark it right/wrong). Reset for each fresh card. Shared by the
  // typed modes (blanks, listen, combi). `typedGrade` is the auto-grade from
  // that answer (true=right, false=wrong, null=not a typed answer) — it drives
  // the score in the typed modes so a wrong answer counts as a mistake.
  var blankGuess = "";
  var typedGrade = null;

  // "combi" isn't a card format of its own — it's a mix: each card is randomly
  // one of cards / blanks / listen. `comboPick` holds this card's chosen format
  // (reset per card in renderCard); `curMode()` resolves the format to render.
  var comboPick = null;
  function curMode() {
    if (studyMode !== "combi") return studyMode;
    if (!comboPick) { var f = ["cards", "blanks", "listen"]; comboPick = f[Math.floor(Math.random() * f.length)]; }
    return comboPick;
  }

  // The first example whose target sentence actually contains the headword —
  // the sentence we turn into a fill-in-the-blank.
  function clozeExample(w) {
    var word = w.word, ex = w.examples || [];
    for (var i = 0; i < ex.length; i++) {
      var s = exVal(ex[i], LEARN);
      if (s && word && s.indexOf(word) !== -1) return { ex: ex[i], s: s, idx: s.indexOf(word) };
    }
    return null;
  }

  function clozeClueNode(hit, frontKey) {
    var clue = exVal(hit.ex, frontKey);
    if (!clue || frontKey === LEARN) return null;
    var c = document.createElement("div");
    c.className = "clozeClue";
    c.setAttribute("dir", "auto");
    c.textContent = clue;
    return c;
  }

  function normGuess(s) { return (s || "").trim().toLowerCase().replace(/\s+/g, " "); }

  // Is the typed answer correct for word `w`? Accepts the target headword or its
  // reading (pinyin/romaji/…). Empty answer counts as wrong.
  function guessIsCorrect(w) {
    var g = normGuess(blankGuess);
    return !!g && (g === normGuess(w.word) || (w.reading && g === normGuess(w.reading)));
  }

  // The text field the learner types the answer into (blanks/listen/combi).
  // Its pointer/key events are stopped so typing never reveals or swipes the
  // card; Enter submits.
  function makeClozeInput() {
    var inp = document.createElement("input");
    inp.type = "text";
    inp.className = "clozeInput";
    inp.setAttribute("autocomplete", "off");
    inp.setAttribute("autocapitalize", "off");
    inp.setAttribute("autocorrect", "off");
    inp.setAttribute("spellcheck", "false");
    inp.setAttribute("aria-label", "Type the word");
    var stop = function (e) { e.stopPropagation(); };
    inp.addEventListener("mousedown", stop);
    inp.addEventListener("touchstart", stop, { passive: true });
    inp.addEventListener("click", stop);
    inp.addEventListener("keydown", function (e) {
      e.stopPropagation();            // don't let the card's key handler reveal
      if (e.key === "Enter") { e.preventDefault(); submitBlank(inp.value); }
    });
    return inp;
  }

  function focusSoon(inp) {
    if (window.requestAnimationFrame) window.requestAnimationFrame(function () { try { inp.focus(); } catch (e) {} });
    else setTimeout(function () { try { inp.focus(); } catch (e) {} }, 0);
  }

  // The speaker that plays the target word; auto-plays once for the live card
  // (not when peeking back). Used by listen + combi prompts. Same icon and
  // states as the inline speakBtn next to a word, only bigger.
  function makeListenButton(w) {
    var text = wordVal(w, LEARN);
    if (!SPEAK_OK) { var s = document.createElement("div"); s.textContent = "🔊"; return s; }
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "speakBtn listenBtn";
    btn.title = "Play pronunciation";
    btn.setAttribute("aria-label", "Play pronunciation");
    btn.innerHTML = SPEAKER_SVG;
    var stop = function (e) { e.stopPropagation(); };
    btn.addEventListener("mousedown", stop);
    btn.addEventListener("touchstart", stop, { passive: true });
    btn.addEventListener("click", function (e) { e.stopPropagation(); e.preventDefault(); speak(text, btn); });
    if (peekPos === null) { try { speak(text, btn); } catch (e) {} }
    return btn;
  }

  // A small "you: X" line marking a wrong guess in red.
  function wrongGuessNode() {
    var you = document.createElement("div");
    you.className = "clozeYou";
    you.setAttribute("dir", "auto");
    you.textContent = "✗ " + blankGuess.trim();
    return you;
  }

  // Blanks/combi prompt state: the sentence with a text input where the word
  // goes, a translation clue underneath, and (combi) the target word's audio.
  // Falls back to a bare input prompted by the word's translation when no
  // example contains the exact form.
  function buildBlankPrompt(w, frontKey, withAudio) {
    var wrap = document.createElement("div");
    wrap.className = "clozePrompt";
    if (withAudio) wrap.appendChild(makeListenButton(w));
    var inp = makeClozeInput();
    var hit = clozeExample(w);
    if (!hit) {
      var clueKey = frontKey === LEARN ? (allowedTitleLangs()[0] || {}).key : frontKey;
      var lbl = document.createElement("div");
      lbl.className = "clozeClue";
      lbl.setAttribute("dir", "auto");
      lbl.textContent = wordVal(w, clueKey || "en") || "";
      wrap.appendChild(inp);
      wrap.appendChild(lbl);
    } else {
      var sent = document.createElement("div");
      sent.className = "clozeSentence";
      sent.setAttribute("dir", "auto");
      sent.appendChild(document.createTextNode(hit.s.slice(0, hit.idx)));
      sent.appendChild(inp);
      sent.appendChild(document.createTextNode(hit.s.slice(hit.idx + w.word.length)));
      wrap.appendChild(sent);
      var clue = clozeClueNode(hit, frontKey);
      if (clue) wrap.appendChild(clue);
    }
    focusSoon(inp);
    return wrap;
  }

  // Blanks/combi revealed state: the sentence completed with the answer in
  // place, marked right/wrong against what the learner typed.
  function buildBlankFilled(w, frontKey) {
    var wrap = document.createElement("div");
    wrap.className = "clozePrompt";
    var g = normGuess(blankGuess);
    var ok = !!g && (g === normGuess(w.word) || (w.reading && g === normGuess(w.reading)));
    var ans = document.createElement("span");
    ans.className = "clozeAnswer" + (g ? (ok ? " clozeOk" : " clozeBad") : "");
    ans.textContent = w.word;

    var hit = clozeExample(w);
    if (!hit) {
      wrap.appendChild(ans);
    } else {
      var sent = document.createElement("div");
      sent.className = "clozeSentence";
      sent.setAttribute("dir", "auto");
      sent.appendChild(document.createTextNode(hit.s.slice(0, hit.idx)));
      sent.appendChild(ans);
      sent.appendChild(document.createTextNode(hit.s.slice(hit.idx + w.word.length)));
      wrap.appendChild(sent);
    }
    if (g && !ok) wrap.appendChild(wrongGuessNode());
    if (hit) { var clue2 = clozeClueNode(hit, frontKey); if (clue2) wrap.appendChild(clue2); }
    return wrap;
  }

  // Listen prompt state: a big speaker (auto-played) and an input to type what
  // you heard — pure listening recall, no sentence or clue.
  function buildListenPrompt(w) {
    var wrap = document.createElement("div");
    wrap.className = "listenPrompt";
    wrap.appendChild(makeListenButton(w));
    var inp = makeClozeInput();
    inp.className += " clozeInputBlock";
    wrap.appendChild(inp);
    focusSoon(inp);
    return wrap;
  }

  // Listen revealed state: the target word (its reading shows under it) with a
  // replay speaker, marked right/wrong against what was typed.
  function buildListenFilled(w) {
    var wrap = document.createElement("div");
    wrap.className = "listenPrompt";
    var line = document.createElement("div");
    line.setAttribute("dir", "auto");
    var g = normGuess(blankGuess);
    var ok = !!g && (g === normGuess(w.word) || (w.reading && g === normGuess(w.reading)));
    var ans = document.createElement("span");
    ans.className = "clozeAnswer" + (g ? (ok ? " clozeOk" : " clozeBad") : "");
    ans.textContent = wordVal(w, LEARN);
    line.appendChild(ans);
    if (SPEAK_OK) line.appendChild(makeSpeakBtn(wordVal(w, LEARN)));
    wrap.appendChild(line);
    if (g && !ok) wrap.appendChild(wrongGuessNode());
    return wrap;
  }

  // Enter in any typed mode: remember the guess, grade it, and reveal (repaints
  // into the completed, graded state). The grade is what scores the card.
  function submitBlank(val) {
    if (revealed) return;
    blankGuess = val || "";
    if (deck.length) typedGrade = guessIsCorrect(deck[0]);
    reveal();
  }

  function paintCard(w, frontKey, isRevealed) {
    elWord.setAttribute("dir", "auto"); // render RTL (Persian/Arabic/Urdu) correctly
    renderCardTopics(w);

    // The headword area depends on the card's format (combi resolves to one of
    // cards/blanks/listen per card):
    //   cards  — show a language's word, recall the rest.
    //   blanks — a fill-in example sentence; on reveal it's completed and graded.
    //   listen — a speaker + input; on reveal the target word is shown.
    var mode = curMode();
    elWord.innerHTML = "";
    if (mode === "cards") {
      elWord.appendChild(document.createTextNode(wordVal(w, frontKey)));
      // Speak the title when it is the target word (the language being learned).
      if (SPEAK_OK && frontKey === LEARN) elWord.appendChild(makeSpeakBtn(wordVal(w, LEARN)));
    } else if (mode === "blanks") {
      elWord.appendChild(isRevealed ? buildBlankFilled(w, frontKey) : buildBlankPrompt(w, frontKey));
    } else { // listen
      elWord.appendChild(isRevealed ? buildListenFilled(w) : buildListenPrompt(w));
    }

    // Pronunciation aid (pinyin / romaji / romanization). Shown under the
    // headword only when that area is a single target word: a target-led card,
    // or a revealed Listen answer. Never under a translation prompt, a cloze
    // sentence, or the speaker. (In Blanks the reading rides along in the
    // answer row / examples instead.)
    if (elWordReading) {
      var showReading = false;
      if (w.reading) {
        if (mode === "cards") showReading = (frontKey === LEARN);
        else if (mode === "listen") showReading = isRevealed;
      }
      elWordReading.textContent = showReading ? w.reading : "";
      elWordReading.style.display = showReading ? "" : "none";
    }

    // The target (the word being learned) goes first on its own highlighted
    // row; every other translation wraps onto the row below it.
    elTranslations.innerHTML = "";
    var deRow = document.createElement("div");
    deRow.className = "trRow trRowDe";
    var otherRow = document.createElement("div");
    otherRow.className = "trRow trRowOther";
    AVAIL.forEach(function (l) {
      // show a translation only if it's not the title and its "show" flag is on
      if (l.key === frontKey || !showLangs[l.key]) return;
      var span = document.createElement("span");
      // <bdi> isolates the value's direction so mixing LTR labels with
      // RTL (Persian/Arabic) values stays readable. The target word carries no
      // language-code prefix — you already know which language you're learning.
      var prefix = l.key === LEARN ? "" : l.label + ": ";
      span.innerHTML = prefix + "<bdi>" + escapeHtml(wordVal(w, l.key)) + "</bdi>";
      if (l.key === LEARN) {
        span.className = "deBadge";
        // Attach the reading (pinyin/romaji/…) after the target word so it's
        // there when the prompt was a translation and the script is revealed.
        if (w.reading) span.innerHTML += ' <span class="deReading">' + escapeHtml(w.reading) + "</span>";
        // The target is the word being learned — let it be heard from here too.
        if (SPEAK_OK) span.appendChild(makeSpeakBtn(wordVal(w, LEARN)));
        deRow.appendChild(span);
      } else {
        otherRow.appendChild(span);
      }
    });
    if (deRow.childNodes.length) elTranslations.appendChild(deRow);
    if (otherRow.childNodes.length) elTranslations.appendChild(otherRow);

    // Synonyms — alternatives you can sometimes swap the word for, shown for any
    // target whose corpus provides them. Built regardless of reveal state (CSS
    // hides them until revealed).
    elSynonyms.innerHTML = "";
    var syn = w.syn || [];
    if (syn.length) {
      var lab = document.createElement("span");
      lab.className = "synLabel";
      lab.textContent = "≈";
      elSynonyms.appendChild(lab);
      syn.forEach(function (s) {
        var chip = document.createElement("span");
        chip.className = "syn";
        chip.setAttribute("dir", "auto");
        chip.textContent = s;
        elSynonyms.appendChild(chip);
      });
    }

    elExamples.innerHTML = "";
    // The target sentence (the language being learned) leads each example, bold;
    // the translations follow, muted. Order the target first regardless of its
    // position in the master list.
    var exLangs = AVAIL.filter(function (l) { return showLangs[l.key]; });
    exLangs = exLangs.filter(function (l) { return l.key === LEARN; })
      .concat(exLangs.filter(function (l) { return l.key !== LEARN; }));
    (w.examples || []).forEach(function (ex) {
      var div = document.createElement("div");
      div.className = "example";
      div.innerHTML = exLangs.map(function (l) {
        var cls = l.key + (l.key === LEARN ? " exLearn" : "");
        var val = escapeHtml(exVal(ex, l.key));
        // The target example line carries its own reading when the corpus supplies
        // one (per-sentence pinyin/romaji/Thai phonetics), shown muted beneath the
        // sentence. Sentence and reading are wrapped together so the speaker button
        // sits beside the pair instead of being pushed onto a third line.
        if (l.key === LEARN && ex.reading) {
          cls += " exStacked";
          val = '<div class="exText">' + val +
            '<div class="exReading">' + escapeHtml(ex.reading) + "</div></div>";
        }
        return '<div class="' + cls + '" dir="auto">' + val + "</div>";
      }).join("");
      // Speak the target-language example sentence.
      var learnLine = div.querySelector(".exLearn");
      var exWord = exVal(ex, LEARN);
      if (SPEAK_OK && learnLine && exWord) learnLine.appendChild(makeSpeakBtn(exWord));
      elExamples.appendChild(div);
    });

    elCard.classList.toggle("answer-hidden", !isRevealed);
    elCard.classList.remove("drag-know", "drag-unknown");
    elCard.style.transform = "";
  }

  // Render the live current card (top of deck), hidden, with a fresh random title.
  function renderCard() {
    peekPos = null;
    revealed = false;
    blankGuess = "";
    typedGrade = null;
    comboPick = null;                    // fresh combi format pick for this card
    var w = deck[0];
    var allowed = allowedTitleLangs();
    // In blanks/listen the answer is the target word, so the card should lead
    // with a different language (the cloze clue / the reveal's other translation)
    // — only fall back to the target if it's the sole allowed prompt language.
    if (curMode() !== "cards") {
      var nonTarget = allowed.filter(function (l) { return l.key !== LEARN; });
      if (nonTarget.length) allowed = nonTarget;
    }
    currentFrontKey = allowed[Math.floor(Math.random() * allowed.length)].key;
    paintCard(w, currentFrontKey, false);
    updateProgress();
    updateControls();
    saveProgress();
  }

  // Repaint the live current card in its existing state (used when returning
  // from a peek, or after changing the flags).
  function repaintLive() {
    paintCard(deck[0], currentFrontKey, revealed);
    updateProgress();
    updateControls();
    saveProgress();
  }

  function paintPeek() {
    var entry = seen[peekPos];
    paintCard(entry.word, entry.frontKey, true); // past cards are shown fully
    updateProgress();
    updateControls();
    saveProgress();
  }

  function updateProgress() {
    var k = uiLangKey();
    elProgress.setAttribute("dir", "auto");
    if (peekPos !== null) {
      var stepsBack = seen.length - peekPos;
      elProgress.textContent = "↩ " + tr(UISTR.prevcard, k) + " (−" + stepsBack + ")";
    } else {
      elProgress.textContent = knownCount + " " + tr(UISTR.learned, k) + " · " + deck.length + " " + tr(UISTR.left, k);
    }
  }

  function updateControls() {
    var peeking = peekPos !== null;
    // In peek mode the status is read-only: hide Know/Don't, show "Back to current".
    elBtnKnown.classList.toggle("hidden", peeking);
    elBtnUnknown.classList.toggle("hidden", peeking);
    elBtnForward.classList.toggle("hidden", !peeking);
    // Back is available whenever there's an earlier card to look at.
    var canGoBack = peeking ? (peekPos > 0) : (seen.length > 0);
    elBtnBack.disabled = !canGoBack;
  }

  function reveal() {
    if (revealed) return;
    revealed = true;
    elCard.classList.remove("answer-hidden");
    // Blanks/listen swap the prompt (cloze / speaker) for the target word on
    // reveal, so repaint the live card; cards mode just unhides the answer.
    if (curMode() !== "cards" && peekPos === null && deck.length) paintCard(deck[0], currentFrontKey, true);
    saveProgress();
  }

  // ---- actions -----------------------------------------------------------
  function advance(isKnown) {
    if (peekPos !== null) return;       // can't change status while looking back
    if (deck.length === 0) return;
    if (!revealed) { reveal(); return; } // first interaction reveals the answer

    // In the typed modes the answer you typed decides the grade — pressing
    // Know/Don't (or tapping) just moves on; a wrong answer is a real mistake.
    if (TYPED_MODES[curMode()] && typedGrade !== null) isKnown = typedGrade;

    var w = deck.shift();
    seen.push({ word: w, frontKey: currentFrontKey });
    recordAnswer(w.word, isKnown); // update the persistent learning curve

    if (isKnown) {
      knownCount++;
    } else {
      missCount++;
      // Re-insert at a random position later in the remaining deck so the
      // word shows up again this session until it's marked as known.
      var pos = 1 + Math.floor(Math.random() * (deck.length + 1));
      deck.splice(pos, 0, w);
    }

    if (deck.length === 0) {
      showStats();
    } else {
      renderCard();
    }
  }

  function goBack() {
    if (peekPos === null) {
      if (seen.length === 0) return;
      peekPos = seen.length - 1;
    } else if (peekPos > 0) {
      peekPos--;
    } else {
      return;
    }
    paintPeek();
  }

  function goForward() {
    if (peekPos === null) return;
    peekPos++;
    if (peekPos >= seen.length) {
      peekPos = null;   // caught up to the present
      repaintLive();
    } else {
      paintPeek();
    }
  }

  function showStats() {
    sessionDone = true;
    saveProgress();
    elDeck.classList.add("hidden");
    elControls.classList.add("hidden");
    elStats.classList.remove("hidden");

    var k = uiLangKey();
    // Three stat tiles: total, learned (accent), mistakes (turns red when any).
    var tile = function (cls, n, label) {
      return '<div class="statTile ' + cls + '"><b>' + n + '</b><span>' + escapeHtml(label) + '</span></div>';
    };
    elStatNumbers.innerHTML =
      tile("", totalWords, tr(UISTR.words, k)) +
      tile("statTile--good", knownCount, tr(UISTR.learned, k)) +
      tile("statTile--bad" + (missCount > 0 ? " on" : ""), missCount, tr(UISTR.slips, k));

    // The summary line reads as a win only when nothing was missed.
    var perfect = missCount === 0;
    elUnknownList.innerHTML =
      '<div class="row' + (perfect ? " good" : "") + '"><span class="w" dir="auto">' +
      escapeHtml(perfect ? tr(UISTR.allremembered, k) : (missCount + " " + tr(UISTR.slips, k))) +
      '</span></div>';
  }

  // ---- grammar cheat sheet ----------------------------------------------
  // Which languages the grammar is EXPLAINED in (title/"ask" row). The first
  // enabled one (in LANGS order) is the primary used for headers & labels.
  // Which languages examples & analogues appear in (the "show" set).
  function shownLangs() {
    var a = AVAIL.filter(function (l) { return showLangs[l.key]; });
    return a.length ? a : AVAIL.slice();
  }
  // Grammar is driven ENTIRELY by the "show" set — the rules, tables, examples
  // and analogues all appear in the shown languages. The primary language
  // (headers, captions, the bold intro) is the interface language (the first
  // non-German shown language), so it's ordered first.
  function explainLangs() {
    var shown = shownLangs();
    var pk = uiLangKey();
    var primary = shown.filter(function (l) { return l.key === pk; });
    var rest = shown.filter(function (l) { return l.key !== pk; });
    return primary.length ? primary.concat(rest) : shown;
  }
  function primaryExplainKey() { return explainLangs()[0].key; }
  // Pick a localized string, falling back to English then German.
  function tr(map, key) {
    if (!map) return "";
    if (map[key] != null && map[key] !== "") return map[key];
    return map.en || map.de || "";
  }
  // Like tr(), but substitutes {lang} with the target language's name in the
  // current interface language (e.g. "German" / "Turkish" / "Türkçe").
  function trTarget(map, key) {
    return tr(map, key).replace(/\{lang\}/g, localName(LANG_BY_KEY[LEARN] || TARGET, key));
  }

  // The interface language: the first "show" language you turned on that is NOT
  // German (German is always shown but you're learning it, so it never drives
  // the UI). Falls back to English if only German is selected.
  function uiLangKey() {
    var langs = orderedShowLangs();
    return langs.length ? langs[0].key : "en";
  }

  // Paint all static interface labels in the current UI language.
  function applyUiLang() {
    var k = uiLangKey();
    elNavCards.textContent = tr(UISTR.study, k);
    elNavGrammar.textContent = tr(UISTR.reference, k);
    if (elModeNav) {
      var modeLabel = { cards: UISTR.cards, blanks: UISTR.blanks, listen: UISTR.listen, combi: UISTR.combi };
      Array.prototype.forEach.call(elModeNav.querySelectorAll(".modeBtn"), function (b) {
        var m = b.getAttribute("data-mode");
        if (modeLabel[m]) b.textContent = tr(modeLabel[m], k);
      });
    }
    if (elLblAsk) { elLblAsk.textContent = tr(UISTR.ask, k); elLblAsk.setAttribute("title", tr(UISTR.askTip, k)); }
    if (elLblShow) { elLblShow.textContent = tr(UISTR.langs, k); elLblShow.setAttribute("title", trTarget(UISTR.showTip, k)); }
    if (elLblTopics) elLblTopics.textContent = tr(UISTR.topics, k);
    if (elLevelNav) elLevelNav.setAttribute("title", tr(UISTR.levelTip, k));
    if (elRevealHint) {
      elRevealHint.textContent = tr(UISTR.reveal, k);
      elRevealHint.setAttribute("dir", "auto");
    }
    elBtnBack.innerHTML = "‹ " + escapeHtml(tr(UISTR.back, k));
    elBtnUnknown.innerHTML = "✗ " + escapeHtml(tr(UISTR.dontknow, k)) + " <kbd>Space</kbd>";
    elBtnKnown.innerHTML = "✓ " + escapeHtml(tr(UISTR.know, k)) + " <kbd>Enter</kbd>";
    elBtnForward.innerHTML = escapeHtml(tr(UISTR.backcurrent, k)) + " ›";
    if (elStatsTitle) elStatsTitle.textContent = tr(UISTR.done, k);
    if (elBtnReload) elBtnReload.textContent = tr(UISTR.reload, k);
    if (elResetBtn) elResetBtn.setAttribute("title", tr(UISTR.resetTip, k));
    if (elSessionBtn) {
      var sTip = tr(UISTR.sessionTip, k);
      elSessionBtn.setAttribute("title", sTip);
      elSessionBtn.setAttribute("aria-label", sTip);
      renderSessionPanel();
    }
    // The dropdown option list carries names in the interface language, so
    // rebuild it whenever that language changes.
    renderPanel("show");
    renderTopicPanel();
    updateTopicFace();
    updateProgress();
  }

  function renderGrammar() {
    var pk = primaryExplainKey();
    var topics = grammarAtLevel();
    elGrammarIndex.innerHTML = "";
    topics.forEach(function (t) {
      var b = document.createElement("button");
      b.className = "gIndexBtn";
      b.type = "button";
      b.setAttribute("dir", "auto");
      b.textContent = (t.icon ? t.icon + " " : "") + tr(t.title, pk);
      b.addEventListener("click", function () {
        var el = document.getElementById("gTopic-" + t.id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      elGrammarIndex.appendChild(b);
    });

    elGrammarBody.innerHTML = "";
    if (!topics.length) {
      var p = document.createElement("p");
      p.style.cssText = "text-align:center;color:var(--muted);margin-top:40px";
      p.setAttribute("dir", "auto");
      p.textContent = tr(GUI.empty, pk);
      elGrammarBody.appendChild(p);
      return;
    }
    topics.forEach(function (t) { elGrammarBody.appendChild(renderTopic(t, pk)); });
  }

  function renderTopic(t, pk) {
    var sec = document.createElement("section");
    sec.className = "gTopic";
    sec.id = "gTopic-" + t.id;

    var h = document.createElement("h2");
    var learnName = tr(t.title, LEARN);
    var primName = tr(t.title, pk);
    var html = '<span class="gIcon">' + escapeHtml(t.icon || "") + "</span>" +
      '<span dir="auto">' + escapeHtml(primName) + "</span>";
    if (pk !== LEARN && learnName && learnName !== primName) {
      html += '<span class="gDe" dir="auto">' + escapeHtml(learnName) + "</span>";
    }
    h.innerHTML = html;
    sec.appendChild(h);

    // Intro in each shown language that ACTUALLY has grammar content for this
    // topic (primary first, rest muted). We check the key explicitly rather
    // than via tr(), so a language without its own grammar text is skipped
    // instead of repeating the English/German fallback.
    var introLangs = explainLangs().filter(function (l) { return t.intro && t.intro[l.key]; });
    introLangs.forEach(function (l, idx) {
      var p = document.createElement("p");
      p.className = "gIntro" + (idx > 0 ? " alt" : "");
      p.setAttribute("dir", "auto");
      p.textContent = t.intro[l.key];
      sec.appendChild(p);
    });

    (t.tables || []).forEach(function (tb) {
      var w = renderTable(tb, pk);
      if (w) sec.appendChild(w);
    });

    // examples: the German sentence always, plus each shown language's translation
    if ((t.examples || []).length) {
      var exSec = document.createElement("div");
      exSec.className = "gSection";
      var eh = document.createElement("h3");
      eh.setAttribute("dir", "auto");
      eh.textContent = tr(GUI.examples, pk);
      exSec.appendChild(eh);
      t.examples.forEach(function (ex) {
        var d = document.createElement("div");
        d.className = "gExample";
        var de = document.createElement("div");
        de.className = "gExDe";
        de.setAttribute("dir", "auto");
        de.textContent = ex[LEARN] || "";
        // Speak the target-language grammar example.
        if (SPEAK_OK && ex[LEARN]) de.appendChild(makeSpeakBtn(ex[LEARN]));
        d.appendChild(de);
        // Romanisation for CJK targets — shown under the target sentence, never spoken.
        if (ex.reading) {
          var rd = document.createElement("div");
          rd.className = "gExReading";
          rd.setAttribute("dir", "auto");
          rd.textContent = ex.reading;
          d.appendChild(rd);
        }
        shownLangs().forEach(function (l) {
          if (l.key === LEARN || !ex[l.key]) return;
          var line = document.createElement("div");
          line.className = "gExTr";
          line.setAttribute("dir", "auto");
          line.innerHTML = "<bdi>" + escapeHtml(ex[l.key]) + "</bdi>";
          d.appendChild(line);
        });
        exSec.appendChild(d);
      });
      sec.appendChild(exSec);
    }

    // analogues: one contrastive hint per shown language, labeled by language
    var hintLangs = shownLangs().filter(function (l) { return t.hints && t.hints[l.key]; });
    if (hintLangs.length) {
      var hs = document.createElement("div");
      hs.className = "gSection";
      var hh = document.createElement("h3");
      hh.setAttribute("dir", "auto");
      hh.textContent = tr(GUI.analogues, pk);
      hs.appendChild(hh);
      var box = document.createElement("div");
      box.className = "gHints";
      hintLangs.forEach(function (l) {
        var row = document.createElement("div");
        row.className = "gHint";
        var lang = document.createElement("span");
        lang.className = "gHintLang";
        lang.textContent = l.label;
        var txt = document.createElement("span");
        txt.setAttribute("dir", "auto");
        txt.innerHTML = "<bdi>" + escapeHtml(t.hints[l.key]) + "</bdi>";
        row.appendChild(lang);
        row.appendChild(txt);
        box.appendChild(row);
      });
      hs.appendChild(box);
      sec.appendChild(hs);
    }

    return sec;
  }

  function renderTable(tb, pk) {
    if (!tb || !(tb.rows || []).length) return null;
    var wrap = document.createElement("div");
    wrap.className = "gTableWrap";

    var cap = tr(tb.caption, pk);
    if (cap) {
      var c = document.createElement("div");
      c.className = "gCaption";
      c.setAttribute("dir", "auto");
      c.textContent = cap;
      wrap.appendChild(c);
    }

    var table = document.createElement("table");
    table.className = "gTable";

    var hasLabels = !!tr(tb.labelHeader, pk) || tb.rows.some(function (r) { return tr(r.label, pk); });
    var cols = tb.columns || [];

    if (cols.length || hasLabels) {
      var thead = document.createElement("thead");
      var htr = document.createElement("tr");
      if (hasLabels) {
        var th0 = document.createElement("th");
        th0.className = "gRowLabel";
        th0.setAttribute("dir", "auto");
        th0.textContent = tr(tb.labelHeader, pk);
        htr.appendChild(th0);
      }
      cols.forEach(function (col) {
        var th = document.createElement("th");
        th.setAttribute("dir", "auto");
        th.textContent = tr(col, pk);
        htr.appendChild(th);
      });
      thead.appendChild(htr);
      table.appendChild(thead);
    }

    var tbody = document.createElement("tbody");
    tb.rows.forEach(function (r) {
      var rtr = document.createElement("tr");
      if (hasLabels) {
        var tdl = document.createElement("td");
        tdl.className = "gRowLabel";
        tdl.setAttribute("dir", "auto");
        tdl.textContent = tr(r.label, pk);
        rtr.appendChild(tdl);
      }
      (r.cells || []).forEach(function (cell) {
        var td = document.createElement("td");
        td.setAttribute("dir", "auto");
        td.innerHTML = "<bdi>" + escapeHtml(cell) + "</bdi>";
        rtr.appendChild(td);
      });
      tbody.appendChild(rtr);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
  }

  function showView(view) {
    currentView = view;
    var grammar = view === "grammar";
    elGrammar.classList.toggle("hidden", !grammar);
    elGrammarIndex.classList.toggle("hidden", !grammar);
    // The level switch applies to both views: cards filter the deck, grammar
    // filters which topics are shown.
    elLevelNav.classList.remove("hidden");
    // In grammar there is a single language selector — the "show" set drives
    // the rules and the examples. The "ask" (prompt) selector only makes sense
    // for cards, so hide it here.
    if (elAskDrop) elAskDrop.classList.toggle("hidden", grammar);
    // Topics filter the card deck only, so hide it in the grammar view.
    if (elTopicDrop) elTopicDrop.classList.toggle("hidden", grammar);
    // The study-mode toggle (Cards/Blanks/Listen) only applies to the Study view.
    if (elModeNav) elModeNav.classList.toggle("hidden", grammar);
    elDeck.classList.toggle("hidden", grammar || sessionDone);
    elControls.classList.toggle("hidden", grammar || sessionDone);
    elStats.classList.toggle("hidden", grammar || !sessionDone);
    elNavCards.classList.toggle("active", !grammar);
    elNavGrammar.classList.toggle("active", grammar);
    elNavCards.setAttribute("aria-selected", (!grammar).toString());
    elNavGrammar.setAttribute("aria-selected", grammar.toString());
    // In grammar mode hide progress AND the reset button (reset only applies to
    // a card session); that leaves the theme toggle as the sole item on the
    // right, pinning it to the far edge.
    elProgress.classList.toggle("hidden", grammar);
    elResetBtn.classList.toggle("hidden", grammar);
    if (elSessionDrop) elSessionDrop.classList.toggle("hidden", grammar);
    if (grammar) renderGrammar();
  }

  // ---- study mode switch (Cards / Blanks / Listen) -----------------------
  function updateModeNav() {
    if (!elModeNav) return;
    Array.prototype.forEach.call(elModeNav.querySelectorAll(".modeBtn"), function (b) {
      var on = b.getAttribute("data-mode") === studyMode;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function setStudyMode(mode) {
    if (!STUDY_MODES[mode] || mode === studyMode) { updateModeNav(); return; }
    studyMode = mode;
    try { window.localStorage.setItem("beeins_studyMode", mode); } catch (e) {}
    updateModeNav();
    // Re-prompt the current card in the new mode (keeps the deck position; just
    // resets the reveal and picks a fitting leading language).
    if (currentView === "cards" && !sessionDone && deck.length) renderCard();
  }

  // ---- level switch ------------------------------------------------------
  function updateLevelNav() {
    Array.prototype.forEach.call(elLevelNav.querySelectorAll(".levelBtn"), function (b) {
      var on = b.getAttribute("data-level") === currentLevel;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  // Switching level starts a fresh session over the words at (and below) it —
  // or, in the grammar view, just re-filters which topics are shown.
  function setLevel(lvl) {
    if (!LEVEL_ORDER[lvl] || lvl === currentLevel) { updateLevelNav(); return; }
    currentLevel = lvl;
    try { window.localStorage.setItem("beeins_level", lvl); } catch (e) {}
    updateLevelNav();
    if (currentView === "grammar") { renderGrammar(); return; }
    deck = buildDeck();
    totalWords = deck.length;
    knownCount = 0;
    missCount = 0;
    seen = [];
    peekPos = null;
    sessionDone = false;
    elStats.classList.add("hidden");
    elGrammar.classList.add("hidden");
    elGrammarIndex.classList.add("hidden");
    currentView = "cards";
    elNavCards.classList.add("active");
    elNavGrammar.classList.remove("active");
    elDeck.classList.remove("hidden");
    elControls.classList.remove("hidden");
    if (deck.length === 0) {
      elWord.textContent = "—"; if (elCardTopics) elCardTopics.innerHTML = "";
      elCard.classList.remove("answer-hidden");
      elTranslations.innerHTML = "";
      elSynonyms.innerHTML = "";
      elExamples.innerHTML = "";
      updateControls();
      updateProgress();
      saveProgress();
    } else {
      renderCard();
    }
  }

  // ---- language dropdowns ------------------------------------------------
  // Two multi-select dropdowns replace the old flag rows. Each option shows a
  // flag, the language's endonym, and — when different — its name in the
  // current interface language. German in the "show" set is locked on.
  function panelFor(name) { return name === "show" ? elShowPanel : elAskPanel; }
  function btnFor(name) { return name === "show" ? elShowBtn : elAskBtn; }
  function flagsFor(name) { return name === "show" ? elShowFlags : elAskFlags; }

  function shake(el) {
    el.classList.remove("shake");
    void el.offsetWidth; // force reflow so the animation retriggers
    el.classList.add("shake");
  }

  function anyDropOpen() {
    return !elShowPanel.hidden;
  }

  // (Re)build a dropdown's option list in the current interface language.
  function renderPanel(name) {
    var panel = panelFor(name);
    var set = setForName(name);
    var uiK = uiLangKey();
    panel.innerHTML = "";
    var list = sortByFamily(AVAIL, function (l) { return localName(l, uiK); });
    // The target is always shown as the answer, so there's no point listing it
    // as a toggleable option — drop it from the "languages" dropdown.
    if (name === "show") list = list.filter(function (l) { return l.key !== LEARN; });
    list.forEach(function (l) {
      var on = !!set[l.key];
      var locked = name === "show" && l.key === LEARN;
      var opt = document.createElement("button");
      opt.type = "button";
      opt.className = "ldOpt" + (on ? "" : " off") + (locked ? " locked" : "");
      opt.setAttribute("role", "option");
      opt.setAttribute("data-lang", l.key);
      opt.setAttribute("aria-checked", on ? "true" : "false");
      if (locked) opt.setAttribute("title", trTarget(UISTR.deLocked, uiK));
      var local = localName(l, uiK);
      var showLocal = local && local !== l.endo;
      opt.innerHTML =
        '<span class="ldChk" aria-hidden="true">' + (on ? "✓" : "") + "</span>" +
        '<span class="ldFlag" aria-hidden="true">' + l.flag + "</span>" +
        '<span class="ldNames"><span class="ldEndo" dir="auto">' + escapeHtml(l.endo) + "</span>" +
        (showLocal ? '<span class="ldLocal" dir="auto">' + escapeHtml(local) + "</span>" : "") +
        "</span>";
      opt.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleLang(name, l.key, opt);
      });
      panel.appendChild(opt);
    });
  }

  function toggleLang(name, key, opt) {
    var set = setForName(name);
    // The target is always shown as the answer — it can't be turned off.
    if (name === "show" && key === LEARN) { shake(opt); return; }
    // Count only selectable languages — the target (LEARN) is force-on and
    // hidden from the "show" list, so it must not prop up the minimum.
    var enabled = AVAIL.filter(function (l) { return set[l.key] && !(name === "show" && l.key === LEARN); }).length;
    // Keep at least one language enabled in each set.
    if (set[key] && enabled === 1) { shake(opt); return; }
    set[key] = !set[key];
    // Record when a "show" language is turned on so the interface language can
    // follow the first one you clicked rather than master-list order.
    if (name === "show" && key !== LEARN) {
      var oi = showOrder.indexOf(key);
      if (set[key]) { if (oi === -1) showOrder.push(key); }
      else if (oi !== -1) showOrder.splice(oi, 1);
      saveShowOrder();
    }
    saveLangSet(name);
    renderPanel(name);
    updateDropFace(name);
    applyFlagChange(name);
  }

  // Refresh the flags shown on a dropdown's button face.
  function updateDropFace(name) {
    var set = setForName(name);
    var flags = AVAIL.filter(function (l) { return set[l.key] && !(name === "show" && l.key === LEARN); }).map(function (l) { return l.flag; });
    flagsFor(name).textContent = flags.join(" ");
  }

  function openPanel(name, open) {
    var panel = panelFor(name), btn = btnFor(name);
    panel.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.classList.toggle("open", open);
  }

  function closeAllPanels() {
    openPanel("show", false);
    var lp = document.getElementById("learnPanel"), lb = document.getElementById("learnDropBtn");
    if (lp) lp.hidden = true;
    if (lb) { lb.setAttribute("aria-expanded", "false"); lb.classList.remove("open"); }
    if (elTopicPanel) elTopicPanel.hidden = true;
    if (elTopicBtn) { elTopicBtn.setAttribute("aria-expanded", "false"); elTopicBtn.classList.remove("open"); }
    if (elSessionPanel) elSessionPanel.hidden = true;
    if (elSessionBtn) { elSessionBtn.setAttribute("aria-expanded", "false"); elSessionBtn.classList.remove("open"); }
    if (elThemePanel) elThemePanel.hidden = true;
    if (elThemeBtn) { elThemeBtn.setAttribute("aria-expanded", "false"); elThemeBtn.classList.remove("open"); }
  }

  // (Re)build the topics filter panel in the current interface language: an
  // "all topics" master row followed by every topic (emoji + localized name).
  function renderTopicPanel() {
    if (!elTopicPanel) return;
    var uiK = uiLangKey();
    elTopicPanel.innerHTML = "";
    var all = topicsAll();
    var allOpt = document.createElement("button");
    allOpt.type = "button";
    allOpt.className = "ldOpt" + (all ? "" : " off");
    allOpt.setAttribute("role", "option");
    allOpt.setAttribute("aria-checked", all ? "true" : "false");
    var allName = (TOPIC_ALL && (TOPIC_ALL[uiK] || TOPIC_ALL.en)) || "All topics";
    allOpt.innerHTML =
      '<span class="ldChk" aria-hidden="true">' + (all ? "✓" : "") + "</span>" +
      '<span class="ldTopicEmoji">🗂️</span>' +
      '<span class="ldNames"><span class="ldEndo">' + escapeHtml(allName) + "</span></span>";
    allOpt.addEventListener("click", function (e) {
      e.stopPropagation();
      if (topicsAll()) return;
      selectedTopics = {};
      saveSelectedTopics();
      renderTopicPanel();
      updateTopicFace();
      applyTopicChange();
    });
    elTopicPanel.appendChild(allOpt);
    TOPIC_LIST.forEach(function (t) {
      var on = !!selectedTopics[t.id];
      var opt = document.createElement("button");
      opt.type = "button";
      opt.className = "ldOpt" + (on ? "" : " off");
      opt.setAttribute("role", "option");
      opt.setAttribute("data-topic", t.id);
      opt.setAttribute("aria-checked", on ? "true" : "false");
      var nm = (t.names && (t.names[uiK] || t.names.en)) || t.id;
      opt.innerHTML =
        '<span class="ldChk" aria-hidden="true">' + (on ? "✓" : "") + "</span>" +
        '<span class="ldTopicEmoji">' + t.emoji + "</span>" +
        '<span class="ldNames"><span class="ldEndo" dir="auto">' + escapeHtml(nm) + "</span></span>";
      opt.addEventListener("click", function (e) { e.stopPropagation(); toggleTopic(t.id); });
      elTopicPanel.appendChild(opt);
    });
  }
  function toggleTopic(id) {
    if (selectedTopics[id]) delete selectedTopics[id]; else selectedTopics[id] = true;
    saveSelectedTopics();
    renderTopicPanel();
    updateTopicFace();
    applyTopicChange();
  }
  // The dropdown button face: 🗂️ when unfiltered, else the selected emojis.
  function updateTopicFace() {
    if (!elTopicFace) return;
    if (topicsAll()) { elTopicFace.textContent = "🗂️"; return; }
    elTopicFace.textContent = Object.keys(selectedTopics)
      .map(function (id) { return TOPIC_BY_ID[id] ? TOPIC_BY_ID[id].emoji : ""; }).join("");
  }
  // A topic change re-filters the deck and starts a fresh session, like the
  // level and session-size switches. Only meaningful in the cards view.
  function applyTopicChange() {
    if (currentView === "grammar") return;
    resetSession();
  }

  function initLangDrops() {
    ["show"].forEach(function (name) {
      renderPanel(name);
      updateDropFace(name);
      btnFor(name).addEventListener("click", function (e) {
        e.stopPropagation();
        var willOpen = panelFor(name).hidden;
        closeAllPanels();
        openPanel(name, willOpen);
      });
      panelFor(name).addEventListener("click", function (e) { e.stopPropagation(); });
    });
    if (elTopicBtn && elTopicPanel) {
      renderTopicPanel();
      updateTopicFace();
      elTopicBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        var willOpen = elTopicPanel.hidden;
        closeAllPanels();
        if (willOpen) {
          elTopicPanel.hidden = false;
          elTopicBtn.setAttribute("aria-expanded", "true");
          elTopicBtn.classList.add("open");
        }
      });
      elTopicPanel.addEventListener("click", function (e) { e.stopPropagation(); });
    }
    document.addEventListener("click", closeAllPanels);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAllPanels(); });
  }

  // Repaint the live card after a flag change. For the "ask" (title) row, also
  // re-pick the title if the current one was just switched off; the "show" row
  // just needs a repaint so translations/example lines update.
  function applyFlagChange(name) {
    // The interface language follows the first enabled language.
    if (name === "show") applyUiLang();
    // In grammar view the flags choose explanation / example languages.
    if (currentView === "grammar") { renderGrammar(); return; }
    if (peekPos !== null || deck.length === 0) return;
    // If the language currently on the front of the card was just turned off,
    // re-pick a front from those still enabled.
    if (!titleLangs[currentFrontKey]) {
      var allowed = allowedTitleLangs();
      currentFrontKey = allowed[Math.floor(Math.random() * allowed.length)].key;
    }
    paintCard(deck[0], currentFrontKey, revealed);
    saveProgress();
  }

  // ---- controls wiring ---------------------------------------------------
  elBtnKnown.addEventListener("click", function () { advance(true); });
  elBtnUnknown.addEventListener("click", function () { advance(false); });
  elBtnBack.addEventListener("click", goBack);
  elBtnForward.addEventListener("click", goForward);
  function setHash(h) {
    try { history.replaceState(null, "", h ? "#" + h : location.pathname + location.search); } catch (e) {}
  }
  elNavCards.addEventListener("click", function () { showView("cards"); setHash(""); });
  elNavGrammar.addEventListener("click", function () { showView("grammar"); setHash("grammar"); });
  if (elModeNav) {
    Array.prototype.forEach.call(elModeNav.querySelectorAll(".modeBtn"), function (b) {
      b.addEventListener("click", function () { setStudyMode(b.getAttribute("data-mode")); });
    });
  }
  updateModeNav();
  Array.prototype.forEach.call(elLevelNav.querySelectorAll(".levelBtn"), function (b) {
    b.addEventListener("click", function () { setLevel(b.getAttribute("data-level")); });
    // Some targets label the three CEFR bands with their own proficiency ladder
    // (JLPT N5-N3, HSK, TOPIK) — the internal ids stay A1/A2/B1, only captions
    // change. Keep the CEFR band as a tooltip so the equivalence is still there.
    if (TARGET.levelLabels) {
      var id = b.getAttribute("data-level");
      var lbl = TARGET.levelLabels[id];
      if (lbl) { b.textContent = lbl; b.title = id; }
    }
  });

  // Reset: clear saved progress and reshuffle immediately (no confirm prompt).
  function confirmReset() { resetSession(); }
  elResetBtn.addEventListener("click", confirmReset);
  elBtnReload.addEventListener("click", confirmReset);

  // Cards-per-session selector. Changing it saves the preference and starts a
  // fresh session (like switching level); the learning curve is left intact.
  function setSessionSize(v) {
    var nv = v === "all" ? "all" : parseInt(v, 10);
    if (nv !== "all" && SESSION_SIZES.indexOf(nv) === -1) nv = DEFAULT_SIZE;
    if (nv === sessionSize) return;
    sessionSize = nv;
    saveSessionSize();
    renderSessionPanel();
    resetSession();
  }
  // Cards-per-session is a custom single-select dropdown (styled like the other
  // dropdowns) offering 10/25/50/100/All.
  function renderSessionPanel() {
    if (!elSessionPanel) return;
    var k = uiLangKey();
    var opts = [{ v: "10", t: "10" }, { v: "25", t: "25" }, { v: "50", t: "50" }, { v: "100", t: "100" }, { v: "all", t: tr(UISTR.sessionAll, k) }];
    elSessionPanel.innerHTML = "";
    opts.forEach(function (o) {
      var on = String(sessionSize) === o.v;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "ldOpt ldSingle" + (on ? " current" : " off");
      b.setAttribute("role", "option");
      b.setAttribute("aria-checked", on ? "true" : "false");
      b.innerHTML = '<span class="ldEndo">' + escapeHtml(o.t) + "</span>" + (on ? '<span class="ldSel" aria-hidden="true">✓</span>' : "");
      b.addEventListener("click", function (e) { e.stopPropagation(); closeAllPanels(); setSessionSize(o.v); });
      elSessionPanel.appendChild(b);
    });
    if (elSessionFace) elSessionFace.textContent = sessionSize === "all" ? tr(UISTR.sessionAll, k) : String(sessionSize);
  }
  function initSessionSize() {
    if (!elSessionBtn || !elSessionPanel) return;
    renderSessionPanel();
    elSessionBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var willOpen = elSessionPanel.hidden;
      closeAllPanels();
      elSessionPanel.hidden = !willOpen;
      elSessionBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      elSessionBtn.classList.toggle("open", willOpen);
    });
    elSessionPanel.addEventListener("click", function (e) { e.stopPropagation(); });
  }

  // Skins: each is a whole look — not just an accent, but shape, surface,
  // typography and page backdrop (see the data-skin blocks in style.css).
  // "leaf" is the bare default (no attribute). The chosen skin sets
  // `data-skin` on <html>; the separate light/dark toggle sets `data-theme`.
  // Both persist independently, so any skin works in light or dark.
  var THEMES = [
    { key: "", emoji: "🌿" },            // leaf — default
    { key: "bubbles", emoji: "🫧" },     // glass
    { key: "ice", emoji: "🧊" },         // glass
    { key: "raindrop", emoji: "💧" },    // glass
    { key: "crystal", emoji: "🔮" },     // glass + glow
    { key: "aurora", emoji: "✨" },      // glow
    { key: "disco", emoji: "🪩" },       // glow
    { key: "daisy", emoji: "🌼" },
    { key: "wine", emoji: "🍷" },
    { key: "blooddrop", emoji: "🩸" },
    { key: "pizza", emoji: "🍕" },
    { key: "scroll", emoji: "📜" }
  ];
  function currentSkin() { try { return window.localStorage.getItem("beeins_skin") || ""; } catch (e) { return ""; } }
  function applySkin(key) {
    if (key) document.documentElement.setAttribute("data-skin", key);
    else document.documentElement.removeAttribute("data-skin");
    try { if (key) window.localStorage.setItem("beeins_skin", key); else window.localStorage.removeItem("beeins_skin"); } catch (e) {}
  }
  function renderThemePanel() {
    if (!elThemePanel) return;
    var cur = currentSkin();
    elThemePanel.innerHTML = "";
    THEMES.forEach(function (t) {
      var on = t.key === cur;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "ldOpt ldSingle ldEmoji" + (on ? " current" : " off");
      b.setAttribute("role", "option");
      b.setAttribute("aria-checked", on ? "true" : "false");
      b.innerHTML = '<span class="ldFlag" aria-hidden="true">' + t.emoji + "</span>" + (on ? '<span class="ldSel" aria-hidden="true">✓</span>' : "");
      b.addEventListener("click", function (e) { e.stopPropagation(); closeAllPanels(); applySkin(t.key); renderThemePanel(); });
      elThemePanel.appendChild(b);
    });
    var f = null; THEMES.forEach(function (x) { if (x.key === cur) f = x; });
    if (elThemeFace) elThemeFace.textContent = f ? f.emoji : "🌿";
  }
  function initThemePicker() {
    if (!elThemeBtn || !elThemePanel) return;
    renderThemePanel();
    elThemeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var willOpen = elThemePanel.hidden;
      closeAllPanels();
      elThemePanel.hidden = !willOpen;
      elThemeBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      elThemeBtn.classList.toggle("open", willOpen);
    });
    elThemePanel.addEventListener("click", function (e) { e.stopPropagation(); });
  }

  // Backstop saves for when a render endpoint didn't fire (tab hidden/closed).
  window.addEventListener("pagehide", saveProgress);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") saveProgress();
  });

  // Another tab on this origin writes the shared learning curve to localStorage;
  // adopt its update so our in-memory copy (which composes the next session)
  // stays current. The live session is per-tab (sessionStorage) and not shared.
  window.addEventListener("storage", function (e) {
    if (e.key === null || e.key === LEARN_KEY) learning = loadLearning();
  });

  // ---- theme (light = VS Code "Quiet Light", dark = default) -------------
  function systemPrefersDark() {
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function effectiveTheme() {
    return document.documentElement.getAttribute("data-theme") || (systemPrefersDark() ? "dark" : "light");
  }
  function paintThemeIcon() {
    // Show the theme you'd switch TO.
    elThemeToggle.textContent = effectiveTheme() === "dark" ? "☀️" : "🌙";
  }
  function initTheme() {
    var stored = null;
    try { stored = window.localStorage.getItem("beeins_theme"); } catch (e) {}
    if (stored === "dark" || stored === "light") document.documentElement.setAttribute("data-theme", stored);
    paintThemeIcon();
  }
  elThemeToggle.addEventListener("click", function () {
    var next = effectiveTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { window.localStorage.setItem("beeins_theme", next); } catch (e) {}
    paintThemeIcon();
  });

  // Keys that should never count as "reveal the card": bare modifiers and
  // focus traversal. Everything else, pressed on a hidden card, reveals it.
  var NON_REVEAL_KEYS = { Shift: 1, Control: 1, Alt: 1, Meta: 1, CapsLock: 1, NumLock: 1, ScrollLock: 1, Tab: 1, ContextMenu: 1, Escape: 1 };

  document.addEventListener("keydown", function (e) {
    if (currentView === "grammar") return;   // grammar view scrolls freely
    if (anyDropOpen()) return;                // a dropdown is handling its keys
    if (elStats.classList.contains("hidden") === false) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return; // leave browser shortcuts alone

    if (peekPos !== null) {
      // Read-only browsing of past cards.
      if (e.key === "ArrowLeft") { e.preventDefault(); goBack(); }
      else if (e.key === "ArrowRight" || e.key === "Escape") { e.preventDefault(); goForward(); }
      return;
    }

    if (deck.length === 0) return;

    if (!revealed) {
      // Hidden card: Left arrow still steps back in history; ANY other key
      // (letters, digits, Enter, Space, …) simply reveals the answer.
      if (e.key === "ArrowLeft") { e.preventDefault(); goBack(); return; }
      if (NON_REVEAL_KEYS[e.key]) return;
      e.preventDefault();
      reveal();
      return;
    }

    // Revealed card: the graded keys stay meaningful; other keys do nothing.
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goBack();
    } else if (e.code === "Space") {
      e.preventDefault();
      advance(false); // marks "don't know"
    } else if (e.key === "Enter") {
      e.preventDefault();
      advance(true);  // marks "know"
    }
  });

  // touch/mouse swipe: drag right = know, drag left = don't know.
  // A small movement (a tap) reveals the answer on the live card.
  (function enableSwipe() {
    var startX = null;
    var dragging = false;

    function onStart(x) {
      if (peekPos !== null) return; // no dragging while looking back
      startX = x;
      dragging = true;
    }

    function onMove(x) {
      if (!dragging || startX === null) return;
      var dx = x - startX;
      elCard.style.transform = "translateX(" + dx + "px) rotate(" + (dx / 20) + "deg)";
      if (revealed) {
        elCard.classList.toggle("drag-know", dx > 40);
        elCard.classList.toggle("drag-unknown", dx < -40);
      }
    }

    function onEnd(x) {
      if (!dragging || startX === null) return;
      var dx = x - startX;
      dragging = false;
      startX = null;

      if (!revealed) {
        // Any tap/drag on a hidden card just reveals it.
        elCard.style.transform = "";
        reveal();
        return;
      }
      if (dx > 100) {
        advance(true);
      } else if (dx < -100) {
        advance(false);
      } else {
        elCard.classList.remove("drag-know", "drag-unknown");
        elCard.style.transform = "";
      }
    }

    elCard.addEventListener("touchstart", function (e) { onStart(e.touches[0].clientX); }, { passive: true });
    elCard.addEventListener("touchmove", function (e) { onMove(e.touches[0].clientX); }, { passive: true });
    elCard.addEventListener("touchend", function (e) { onEnd(e.changedTouches[0].clientX); });

    elCard.addEventListener("mousedown", function (e) { onStart(e.clientX); });
    document.addEventListener("mousemove", function (e) { onMove(e.clientX); });
    document.addEventListener("mouseup", function (e) { onEnd(e.clientX); });
  })();

  // ---- learning-target selector -----------------------------------------
  // A single dropdown, top-left, picks which language you're studying. It
  // reshapes the whole app (available languages, learning curve, grammar), so
  // switching persists the choice and reloads — every downstream default is
  // then recomputed cleanly from the stored target at boot.
  function initLearnLang() {
    var btn = document.getElementById("learnDropBtn");
    var panel = document.getElementById("learnPanel");
    var face = document.getElementById("learnFace");
    var flag = document.getElementById("learnFlag");
    if (!btn || !panel) return;
    if (flag) flag.textContent = TARGET.flag;
    if (face) face.textContent = TARGET.endo;
    // One option per learnable target (single-select, so no checkboxes — the
    // active target is marked with a trailing check). Ordered by language
    // family, then alphabetically. Picking a different one persists the choice
    // and reloads, so all defaults recompute cleanly.
    panel.innerHTML = "";
    sortByFamily(TARGETS, function (t) { return t.endo; }).forEach(function (t) {
      var on = t.key === LEARN;
      var opt = document.createElement("button");
      opt.type = "button";
      opt.className = "ldOpt ldSingle" + (on ? " current" : " off");
      opt.setAttribute("role", "option");
      opt.setAttribute("aria-checked", on ? "true" : "false");
      opt.innerHTML =
        '<span class="ldFlag" aria-hidden="true">' + t.flag + "</span>" +
        '<span class="ldNames"><span class="ldEndo" dir="auto">' + escapeHtml(t.endo) + "</span></span>" +
        (on ? '<span class="ldSel" aria-hidden="true">✓</span>' : "");
      opt.addEventListener("click", function (e) {
        e.stopPropagation();
        if (t.key === LEARN) { closeAllPanels(); return; }
        try { window.localStorage.setItem("beeins_learn", t.key); } catch (e2) {}
        window.location.reload();
      });
      panel.appendChild(opt);
    });
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var willOpen = panel.hidden;
      closeAllPanels();
      panel.hidden = !willOpen;
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      btn.classList.toggle("open", willOpen);
    });
    panel.addEventListener("click", function (e) { e.stopPropagation(); });
  }

  // Grammar cheat sheets exist for German only. For other targets there is just
  // one view, so hide the whole Cards/Grammar switcher and pin to cards.
  function applyGrammarAvailability() {
    if (GRAMMAR_ON) return;
    var nav = document.getElementById("viewNav");
    if (nav) nav.classList.add("hidden");
    if (elNavGrammar) elNavGrammar.classList.add("hidden");
    currentView = "cards";
  }

  // ---- boot --------------------------------------------------------------
  initLearnLang();
  applyGrammarAvailability();
  initLangDrops();
  initTheme();
  initThemePicker();
  initSessionSize();

  // Restore a saved session if there is one; otherwise the fresh deck built at
  // the top stands.
  var saved = loadProgress();
  var restored = saved ? restoreSession(saved) : false;
  if (restored) { try { window.localStorage.setItem("beeins_level", currentLevel); } catch (e) {} }

  applyUiLang();
  updateLevelNav();

  if (restored) {
    if (sessionDone) {
      showStats();
    } else if (deck.length === 0) {
      elWord.textContent = "—"; if (elCardTopics) elCardTopics.innerHTML = "";
      elCard.classList.remove("answer-hidden");
      updateControls();
      updateProgress();
    } else if (peekPos !== null) {
      paintPeek();
    } else {
      paintCard(deck[0], currentFrontKey, revealed);
      updateProgress();
      updateControls();
    }
  } else if (deck.length === 0) {
    elWord.textContent = "No words loaded";
    elCard.classList.remove("answer-hidden");
    elTranslations.textContent = "Check data.js";
    updateControls();
  } else {
    renderCard();
  }
  if (GRAMMAR_ON && (location.hash || "").toLowerCase() === "#grammar") showView("grammar");

  // The UI is wired and the first card painted — drop the loading skeleton.
  try { document.documentElement.classList.remove("app-loading"); } catch (e) {}
})();
