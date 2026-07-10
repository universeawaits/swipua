(function () {
  var source = (typeof WORDS !== "undefined") ? WORDS : [];

  // ---- level (CEFR) ------------------------------------------------------
  // Each word carries a level A1/A2/B1. The switch is cumulative: picking a
  // level shows that level AND everything below it (B1 = all words).
  var LEVEL_ORDER = { A1: 1, A2: 2, B1: 3 };
  var currentLevel = loadLevel();
  function loadLevel() {
    try { var v = window.localStorage.getItem("swipua_level"); if (LEVEL_ORDER[v]) return v; } catch (e) {}
    return "B1";
  }
  function wordLevel(w) { return LEVEL_ORDER[w.level] ? w.level : "B1"; }
  function inCurrentLevel(w) { return LEVEL_ORDER[wordLevel(w)] <= LEVEL_ORDER[currentLevel]; }
  function buildDeck() { return shuffle(source.filter(inCurrentLevel)); }

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
    { key: "th",    flag: "🇹🇭", label: "TH",    endo: "ไทย",           names: { de: "Thailändisch", en: "Thai", ru: "Тайский", vi: "Tiếng Thái", fa: "تایلندی" } },
    { key: "zh",    flag: "🇨🇳", label: "ZH",    endo: "中文",           names: { de: "Chinesisch", en: "Chinese", ru: "Китайский", vi: "Tiếng Trung", fa: "چینی" } },
    { key: "ms",    flag: "🇲🇾", label: "MS",    endo: "Bahasa Melayu", names: { de: "Malaiisch", en: "Malay", ru: "Малайский", vi: "Tiếng Mã Lai", fa: "مالایی" } },
    { key: "tr",    flag: "🇹🇷", label: "TR",    endo: "Türkçe",        names: { de: "Türkisch", en: "Turkish", ru: "Турецкий", vi: "Tiếng Thổ Nhĩ Kỳ", fa: "ترکی" } },
    { key: "pl",    flag: "🇵🇱", label: "PL",    endo: "Polski",        names: { de: "Polnisch", en: "Polish", ru: "Польский", vi: "Tiếng Ba Lan", fa: "لهستانی" } },
    { key: "sw",    flag: "🇹🇿", label: "SW",    endo: "Kiswahili",     names: { de: "Suaheli", en: "Swahili", ru: "Суахили", vi: "Tiếng Swahili", fa: "سواحیلی" } },
    { key: "am",    flag: "🇪🇹", label: "AM",    endo: "አማርኛ",          names: { de: "Amharisch", en: "Amharic", ru: "Амхарский", vi: "Tiếng Amhara", fa: "امهری" } },
    { key: "hi",    flag: "🇮🇳", label: "HI",    endo: "हिन्दी",          names: { de: "Hindi", en: "Hindi", ru: "Хинди", vi: "Tiếng Hindi", fa: "هندی" } },
    { key: "ur",    flag: "🇵🇰", label: "UR",    endo: "اردو",          names: { de: "Urdu", en: "Urdu", ru: "Урду", vi: "Tiếng Urdu", fa: "اردو" } },
    { key: "ar_eg", flag: "🇪🇬", label: "AR-EG", endo: "مصري",          names: { de: "Ägyptisch-Arabisch", en: "Egyptian Arabic", ru: "Египетский арабский", vi: "Tiếng Ả Rập Ai Cập", fa: "عربی مصری" } },
    { key: "ar_lb", flag: "🇱🇧", label: "AR-LB", endo: "لبناني",        names: { de: "Libanesisch-Arabisch", en: "Lebanese Arabic", ru: "Ливанский арабский", vi: "Tiếng Ả Rập Liban", fa: "عربی لبنانی" } },
    { key: "ar_sy", flag: "🇸🇾", label: "AR-SY", endo: "سوري",          names: { de: "Syrisch-Arabisch", en: "Syrian Arabic", ru: "Сирийский арабский", vi: "Tiếng Ả Rập Syria", fa: "عربی سوری" } }
  ];

  var LANG_BY_KEY = {};
  LANGS.forEach(function (l) { LANG_BY_KEY[l.key] = l; });

  // Read a language's value off a word / example object. German is stored under
  // `word` on the card and `de` on examples; every other language uses its key.
  function wordVal(w, key) { return key === "de" ? w.word : w[key]; }
  function exVal(ex, key) { return key === "de" ? ex.de : ex[key]; }

  // Which languages have real data in the corpus. German is always available;
  // any other language needs at least one non-empty translation to show up.
  var LANG_PRESENT = { de: true };
  source.forEach(function (w) {
    LANGS.forEach(function (l) {
      if (LANG_PRESENT[l.key]) return;
      var v = w[l.key];
      if (v != null && v !== "") LANG_PRESENT[l.key] = true;
    });
  });
  // AVAIL is the display list — the master config filtered to languages with
  // data. Everything the UI enumerates (dropdowns, translations, examples,
  // grammar) walks AVAIL, so unfinished languages simply don't appear yet.
  var AVAIL = LANGS.filter(function (l) { return LANG_PRESENT[l.key]; });

  // Name of a language rendered in the current interface language, with an
  // English then endonym fallback.
  function localName(l, uiKey) {
    var n = l.names && (l.names[uiKey] || l.names.en);
    return n || l.endo;
  }

  // Two independent language sets:
  //  titleLangs — which languages may appear as the big prompt (title) word.
  //  showLangs  — which languages appear as translations / example lines after reveal.
  var titleLangs = loadLangSet("swipua_titleLangs");
  var showLangs = loadLangSet("swipua_showLangs");
  // German is the language being learned, so it is always shown as the answer.
  showLangs.de = true;

  // ---- elements ----------------------------------------------------------
  var elDeck = document.getElementById("deck");
  var elControls = document.getElementById("controls");
  var elStats = document.getElementById("stats");
  var elCard = document.getElementById("card");
  var elWord = document.getElementById("word");
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
  var elAskPanel = document.getElementById("askPanel");
  var elShowPanel = document.getElementById("showPanel");
  var elAskBtn = document.getElementById("askDropBtn");
  var elShowBtn = document.getElementById("showDropBtn");
  var elAskFlags = document.getElementById("askFlags");
  var elShowFlags = document.getElementById("showFlags");

  var GRAMMAR_DATA = (typeof GRAMMAR !== "undefined" && GRAMMAR) ? GRAMMAR : [];

  // View state: "cards" flashcards vs "grammar" cheat sheet. The grammar view
  // reuses the two flag rows: the "ask"/title row picks the language grammar is
  // EXPLAINED in; the "show" row picks the languages examples & analogues appear in.
  var currentView = "cards";
  var sessionDone = false;

  // Small UI dictionary for the grammar view chrome, shown in the explain language.
  var GUI = {
    examples: { de: "Beispiele", en: "Examples", ru: "Примеры", vi: "Ví dụ", fa: "مثال‌ها" },
    analogues: { de: "Sprachvergleich", en: "In your language", ru: "В вашем языке", vi: "Trong ngôn ngữ của bạn", fa: "در زبان شما" },
    empty: { de: "Grammatikinhalt wird vorbereitet.", en: "Grammar content is being prepared.", ru: "Грамматический материал готовится.", vi: "Nội dung ngữ pháp đang được chuẩn bị.", fa: "محتوای گرامر در حال آماده‌سازی است." }
  };

  // Interface chrome (nav, buttons, progress, stats). Rendered in the first
  // enabled "show" language so the whole UI speaks the learner's language.
  var UISTR = {
    cards:        { de: "Karten", en: "Cards", ru: "Карточки", vi: "Thẻ", fa: "کارت‌ها" },
    grammar:      { de: "Grammatik", en: "Grammar", ru: "Грамматика", vi: "Ngữ pháp", fa: "گرامر" },
    ask:          { de: "Frage", en: "Ask", ru: "Вопрос", vi: "Hỏi", fa: "پرسش" },
    show:         { de: "Antwort", en: "Show", ru: "Ответ", vi: "Đáp", fa: "پاسخ" },
    reveal:       { de: "Tippe die Karte oder drücke eine beliebige Taste zum Aufdecken", en: "Tap the card or press any key to reveal", ru: "Нажмите на карточку или любую клавишу, чтобы показать", vi: "Chạm vào thẻ hoặc nhấn phím bất kỳ để hiện", fa: "روی کارت بزنید یا هر کلیدی را برای نمایش فشار دهید" },
    back:         { de: "Zurück", en: "Back", ru: "Назад", vi: "Quay lại", fa: "بازگشت" },
    dontknow:     { de: "Weiß ich nicht", en: "Don't know", ru: "Не знаю", vi: "Chưa biết", fa: "نمی‌دانم" },
    know:         { de: "Weiß ich", en: "Know", ru: "Знаю", vi: "Đã biết", fa: "می‌دانم" },
    backcurrent:  { de: "Zur aktuellen Karte", en: "Back to current", ru: "К текущей", vi: "Về thẻ hiện tại", fa: "بازگشت به کارت فعلی" },
    learned:      { de: "gelernt", en: "learned", ru: "выучено", vi: "đã học", fa: "آموخته" },
    left:         { de: "übrig", en: "left", ru: "осталось", vi: "còn lại", fa: "باقی‌مانده" },
    prevcard:     { de: "vorherige Karte", en: "previous card", ru: "предыдущая карточка", vi: "thẻ trước", fa: "کارت قبلی" },
    done:         { de: "Fertig!", en: "Done!", ru: "Готово!", vi: "Xong!", fa: "تمام شد!" },
    words:        { de: "Wörter", en: "words", ru: "слов", vi: "từ", fa: "واژه" },
    slips:        { de: "Fehler", en: "slips", ru: "ошибок", vi: "lỗi", fa: "خطا" },
    allremembered:{ de: "Alle Wörter behalten — super.", en: "All words remembered — nice.", ru: "Все слова запомнены — отлично.", vi: "Đã nhớ hết các từ — tuyệt.", fa: "همه واژه‌ها را به یاد آوردید — عالی." },
    reload:       { de: "Neu laden zum Neustart", en: "Reload page to start over", ru: "Перезагрузить и начать заново", vi: "Tải lại để bắt đầu lại", fa: "برای شروع دوباره صفحه را بارگذاری کنید" },
    resetTip:     { de: "Fortschritt zurücksetzen und neu mischen", en: "Reset progress and reshuffle", ru: "Сбросить прогресс и перемешать", vi: "Đặt lại tiến độ và xáo lại", fa: "بازنشانی پیشرفت و بر زدن دوباره" },
    resetConfirm: { de: "Deinen Lernfortschritt zurücksetzen? Alle in dieser Sitzung gelernten Karten gehen verloren.", en: "Reset your progress? All cards learned in this session will be cleared.", ru: "Сбросить прогресс? Все выученные в этой сессии карточки будут удалены.", vi: "Đặt lại tiến độ? Tất cả thẻ đã học trong phiên này sẽ bị xóa.", fa: "پیشرفت خود را بازنشانی می‌کنید؟ همهٔ کارت‌های آموخته‌شدهٔ این جلسه پاک می‌شوند." },
    askTip: {
      de: "In welchen Sprachen die Frage erscheinen darf — das Aufforderungswort, das du vor dem Aufdecken siehst.",
      en: "Which languages the question can appear in — the prompt word you see before revealing.",
      ru: "На каких языках может появляться вопрос — слово-подсказка, которое вы видите до раскрытия.",
      vi: "Những ngôn ngữ nào có thể xuất hiện làm câu hỏi — từ gợi ý bạn thấy trước khi lật thẻ.",
      fa: "پرسش با کدام زبان‌ها می‌تواند نمایش داده شود — واژهٔ راهنما که پیش از آشکارسازی می‌بینید."
    },
    showTip: {
      de: "In welchen Sprachen die Antwort nach dem Aufdecken erscheint. Deutsch wird immer gezeigt — das lernst du.",
      en: "Which languages the answer appears in after you reveal. German is always shown — it's what you're learning.",
      ru: "На каких языках показывается ответ после раскрытия. Немецкий показывается всегда — его вы учите.",
      vi: "Những ngôn ngữ nào xuất hiện làm đáp án sau khi lật thẻ. Tiếng Đức luôn hiển thị — đó là thứ bạn đang học.",
      fa: "پاسخ پس از آشکارسازی با کدام زبان‌ها نمایش داده می‌شود. آلمانی همیشه نشان داده می‌شود — همان چیزی که می‌آموزید."
    },
    deLocked: {
      de: "Deutsch wird immer angezeigt — das ist die Sprache, die du lernst.",
      en: "German is always shown — it's the language you're learning.",
      ru: "Немецкий показывается всегда — это язык, который вы учите.",
      vi: "Tiếng Đức luôn được hiển thị — đó là ngôn ngữ bạn đang học.",
      fa: "آلمانی همیشه نمایش داده می‌شود — زبانی که در حال یادگیری آن هستید."
    },
    levelTip: {
      de: "Lernstufe: zeigt Wörter bis A1, A2 oder B1 (kumulativ).",
      en: "Study level: shows words up to A1, A2 or B1 (cumulative).",
      ru: "Уровень: показывает слова до A1, A2 или B1 (накопительно).",
      vi: "Cấp độ học: hiện từ đến A1, A2 hoặc B1 (tích lũy).",
      fa: "سطح یادگیری: واژه‌ها را تا A1، A2 یا B1 نشان می‌دهد (تجمعی)."
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

  function allowedTitleLangs() {
    var a = AVAIL.filter(function (l) { return titleLangs[l.key]; });
    return a.length ? a : AVAIL.slice();
  }

  function loadLangSet(storageKey) {
    var def = {};
    AVAIL.forEach(function (l) { def[l.key] = true; });
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
    return def;
  }

  function setForName(name) { return name === "show" ? showLangs : titleLangs; }
  function storageKeyFor(name) { return name === "show" ? "swipua_showLangs" : "swipua_titleLangs"; }

  function saveLangSet(name) {
    try { window.localStorage.setItem(storageKeyFor(name), JSON.stringify(setForName(name))); } catch (e) {}
  }

  // ---- session persistence ----------------------------------------------
  // The whole session (which cards are learned / still queued, the history,
  // and the live card + its reveal state) is mirrored to localStorage so a
  // learner who closes the tab picks up exactly where they left off. Cards are
  // stored by their German word, which is unique across the corpus, so the
  // save survives data updates that shuffle array positions.
  var PROG_KEY = "swipua_progress";
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
      window.localStorage.setItem(PROG_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function clearProgress() {
    try { window.localStorage.removeItem(PROG_KEY); } catch (e) {}
  }

  function loadProgress() {
    try {
      var raw = window.localStorage.getItem(PROG_KEY);
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
      elWord.textContent = "—";
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
  // Paint a word onto the card. `frontKey` = which language is the title;
  // `isRevealed` = whether translations/examples are shown.
  function paintCard(w, frontKey, isRevealed) {
    elWord.textContent = wordVal(w, frontKey);
    elWord.setAttribute("dir", "auto"); // render RTL (Persian/Arabic/Urdu) correctly

    elTranslations.innerHTML = "";
    AVAIL.forEach(function (l) {
      // show a translation only if it's not the title and its "show" flag is on
      if (l.key === frontKey || !showLangs[l.key]) return;
      var span = document.createElement("span");
      // <bdi> isolates the value's direction so mixing LTR labels with
      // RTL (Persian/Arabic) values stays readable
      span.innerHTML = l.label + ": <bdi>" + escapeHtml(wordVal(w, l.key)) + "</bdi>";
      elTranslations.appendChild(span);
    });

    // German synonyms — alternatives you can sometimes swap the word for.
    // Built regardless of reveal state (CSS hides them until revealed).
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
    (w.examples || []).forEach(function (ex) {
      var div = document.createElement("div");
      div.className = "example";
      div.innerHTML = AVAIL.filter(function (l) { return showLangs[l.key]; }).map(function (l) {
        return '<div class="' + l.key + '" dir="auto">' + escapeHtml(exVal(ex, l.key)) + "</div>";
      }).join("");
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
    var w = deck[0];
    var allowed = allowedTitleLangs();
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
    saveProgress();
  }

  // ---- actions -----------------------------------------------------------
  function advance(isKnown) {
    if (peekPos !== null) return;       // can't change status while looking back
    if (deck.length === 0) return;
    if (!revealed) { reveal(); return; } // first interaction reveals the answer

    var w = deck.shift();
    seen.push({ word: w, frontKey: currentFrontKey });

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
    elStatNumbers.innerHTML =
      '<div><b>' + totalWords + '</b>' + escapeHtml(tr(UISTR.words, k)) + '</div>' +
      '<div><b>' + knownCount + '</b>' + escapeHtml(tr(UISTR.learned, k)) + '</div>' +
      '<div><b>' + missCount + '</b>' + escapeHtml(tr(UISTR.slips, k)) + '</div>';

    elUnknownList.innerHTML =
      '<div class="row"><span class="w" dir="auto">' + escapeHtml(tr(UISTR.allremembered, k)) + '</span></div>';
  }

  // ---- grammar cheat sheet ----------------------------------------------
  // Which languages the grammar is EXPLAINED in (title/"ask" row). The first
  // enabled one (in LANGS order) is the primary used for headers & labels.
  function explainLangs() {
    var a = AVAIL.filter(function (l) { return titleLangs[l.key]; });
    return a.length ? a : AVAIL.slice();
  }
  function primaryExplainKey() { return explainLangs()[0].key; }
  // Which languages examples & analogues appear in (the "show" row).
  function shownLangs() {
    var a = AVAIL.filter(function (l) { return showLangs[l.key]; });
    return a.length ? a : AVAIL.slice();
  }
  // Pick a localized string, falling back to English then German.
  function tr(map, key) {
    if (!map) return "";
    if (map[key] != null && map[key] !== "") return map[key];
    return map.en || map.de || "";
  }

  // The interface language: the first enabled "show" language that is NOT
  // German (German is always shown but you're learning it, so it never drives
  // the UI). Falls back to English if only German is selected.
  function uiLangKey() {
    var langs = shownLangs().filter(function (l) { return l.key !== "de"; });
    return langs.length ? langs[0].key : "en";
  }

  // Paint all static interface labels in the current UI language.
  function applyUiLang() {
    var k = uiLangKey();
    elNavCards.textContent = tr(UISTR.cards, k);
    elNavGrammar.textContent = tr(UISTR.grammar, k);
    if (elLblAsk) { elLblAsk.textContent = tr(UISTR.ask, k); elLblAsk.setAttribute("title", tr(UISTR.askTip, k)); }
    if (elLblShow) { elLblShow.textContent = tr(UISTR.show, k); elLblShow.setAttribute("title", tr(UISTR.showTip, k)); }
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
    // The dropdown option lists carry names in the interface language, so
    // rebuild them whenever that language changes.
    renderPanel("title");
    renderPanel("show");
    updateProgress();
  }

  function renderGrammar() {
    var pk = primaryExplainKey();
    elGrammarIndex.innerHTML = "";
    GRAMMAR_DATA.forEach(function (t) {
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
    if (!GRAMMAR_DATA.length) {
      var p = document.createElement("p");
      p.style.cssText = "text-align:center;color:var(--muted);margin-top:40px";
      p.setAttribute("dir", "auto");
      p.textContent = tr(GUI.empty, pk);
      elGrammarBody.appendChild(p);
      return;
    }
    GRAMMAR_DATA.forEach(function (t) { elGrammarBody.appendChild(renderTopic(t, pk)); });
  }

  function renderTopic(t, pk) {
    var sec = document.createElement("section");
    sec.className = "gTopic";
    sec.id = "gTopic-" + t.id;

    var h = document.createElement("h2");
    var deName = tr(t.title, "de");
    var primName = tr(t.title, pk);
    var html = '<span class="gIcon">' + escapeHtml(t.icon || "") + "</span>" +
      '<span dir="auto">' + escapeHtml(primName) + "</span>";
    if (pk !== "de" && deName && deName !== primName) {
      html += '<span class="gDe" dir="auto">' + escapeHtml(deName) + "</span>";
    }
    h.innerHTML = html;
    sec.appendChild(h);

    // intro in each enabled explain language (primary first, rest muted)
    explainLangs().forEach(function (l, idx) {
      var txt = tr(t.intro, l.key);
      if (!txt) return;
      var p = document.createElement("p");
      p.className = "gIntro" + (idx > 0 ? " alt" : "");
      p.setAttribute("dir", "auto");
      p.textContent = txt;
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
        de.textContent = ex.de || "";
        d.appendChild(de);
        shownLangs().forEach(function (l) {
          if (l.key === "de" || !ex[l.key]) return;
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
    elLevelNav.classList.toggle("hidden", grammar); // levels only apply to cards
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
    if (grammar) renderGrammar();
  }

  // ---- level switch ------------------------------------------------------
  function updateLevelNav() {
    Array.prototype.forEach.call(elLevelNav.querySelectorAll(".levelBtn"), function (b) {
      var on = b.getAttribute("data-level") === currentLevel;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  // Switching level starts a fresh session over the words at (and below) it.
  function setLevel(lvl) {
    if (!LEVEL_ORDER[lvl] || lvl === currentLevel) { updateLevelNav(); return; }
    currentLevel = lvl;
    try { window.localStorage.setItem("swipua_level", lvl); } catch (e) {}
    deck = buildDeck();
    totalWords = deck.length;
    knownCount = 0;
    missCount = 0;
    seen = [];
    peekPos = null;
    sessionDone = false;
    updateLevelNav();
    elStats.classList.add("hidden");
    elGrammar.classList.add("hidden");
    elGrammarIndex.classList.add("hidden");
    currentView = "cards";
    elNavCards.classList.add("active");
    elNavGrammar.classList.remove("active");
    elDeck.classList.remove("hidden");
    elControls.classList.remove("hidden");
    if (deck.length === 0) {
      elWord.textContent = "—";
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
    return !elAskPanel.hidden || !elShowPanel.hidden;
  }

  // (Re)build a dropdown's option list in the current interface language.
  function renderPanel(name) {
    var panel = panelFor(name);
    var set = setForName(name);
    var uiK = uiLangKey();
    panel.innerHTML = "";
    AVAIL.forEach(function (l) {
      var on = !!set[l.key];
      var locked = name === "show" && l.key === "de";
      var opt = document.createElement("button");
      opt.type = "button";
      opt.className = "ldOpt" + (on ? "" : " off") + (locked ? " locked" : "");
      opt.setAttribute("role", "option");
      opt.setAttribute("data-lang", l.key);
      opt.setAttribute("aria-checked", on ? "true" : "false");
      if (locked) opt.setAttribute("title", tr(UISTR.deLocked, uiK));
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
    // German is always shown as the answer — it can't be turned off.
    if (name === "show" && key === "de") { shake(opt); return; }
    var enabled = AVAIL.filter(function (l) { return set[l.key]; }).length;
    // Keep at least one language enabled in each set.
    if (set[key] && enabled === 1) { shake(opt); return; }
    set[key] = !set[key];
    saveLangSet(name);
    renderPanel(name);
    updateDropFace(name);
    applyFlagChange(name);
  }

  // Refresh the flags shown on a dropdown's button face.
  function updateDropFace(name) {
    var set = setForName(name);
    var flags = AVAIL.filter(function (l) { return set[l.key]; }).map(function (l) { return l.flag; });
    flagsFor(name).textContent = flags.join(" ");
  }

  function openPanel(name, open) {
    var panel = panelFor(name), btn = btnFor(name);
    panel.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.classList.toggle("open", open);
  }

  function closeAllPanels() { openPanel("title", false); openPanel("show", false); }

  function initLangDrops() {
    ["title", "show"].forEach(function (name) {
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
    document.addEventListener("click", closeAllPanels);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAllPanels(); });
  }

  // Repaint the live card after a flag change. For the "ask" (title) row, also
  // re-pick the title if the current one was just switched off; the "show" row
  // just needs a repaint so translations/example lines update.
  function applyFlagChange(name) {
    // The interface language follows the first "show" language.
    if (name === "show") applyUiLang();
    // In grammar view the flags choose explanation / example languages.
    if (currentView === "grammar") { renderGrammar(); return; }
    if (peekPos !== null || deck.length === 0) return;
    if (name === "title" && !titleLangs[currentFrontKey]) {
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
  Array.prototype.forEach.call(elLevelNav.querySelectorAll(".levelBtn"), function (b) {
    b.addEventListener("click", function () { setLevel(b.getAttribute("data-level")); });
  });

  // Reset: clear saved progress and reshuffle. Guarded by a confirm so a stray
  // tap can't wipe a long session. The stats-screen button does the same.
  function confirmReset() {
    if (window.confirm(tr(UISTR.resetConfirm, uiLangKey()))) resetSession();
  }
  elResetBtn.addEventListener("click", confirmReset);
  elBtnReload.addEventListener("click", confirmReset);

  // Backstop saves for when a render endpoint didn't fire (tab hidden/closed).
  window.addEventListener("pagehide", saveProgress);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") saveProgress();
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
    try { stored = window.localStorage.getItem("swipua_theme"); } catch (e) {}
    if (stored === "dark" || stored === "light") document.documentElement.setAttribute("data-theme", stored);
    paintThemeIcon();
  }
  elThemeToggle.addEventListener("click", function () {
    var next = effectiveTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { window.localStorage.setItem("swipua_theme", next); } catch (e) {}
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

  // ---- boot --------------------------------------------------------------
  initLangDrops();
  initTheme();

  // Restore a saved session if there is one; otherwise the fresh deck built at
  // the top stands.
  var saved = loadProgress();
  var restored = saved ? restoreSession(saved) : false;
  if (restored) { try { window.localStorage.setItem("swipua_level", currentLevel); } catch (e) {} }

  applyUiLang();
  updateLevelNav();

  if (restored) {
    if (sessionDone) {
      showStats();
    } else if (deck.length === 0) {
      elWord.textContent = "—";
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
  if ((location.hash || "").toLowerCase() === "#grammar") showView("grammar");
})();
