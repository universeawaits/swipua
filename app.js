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
  var LANGS = [
    { key: "de", label: "DE", get: function (w) { return w.word; } },
    { key: "en", label: "EN", get: function (w) { return w.en; } },
    { key: "ru", label: "RU", get: function (w) { return w.ru; } },
    { key: "vi", label: "VI", get: function (w) { return w.vi; } },
    { key: "fa", label: "FA", get: function (w) { return w.fa; } }
  ];
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
    revealA:      { de: "Tippe die Karte oder drücke", en: "Tap the card or press", ru: "Нажмите на карточку или клавишу", vi: "Chạm vào thẻ hoặc nhấn", fa: "روی کارت بزنید یا کلید" },
    revealB:      { de: "zum Aufdecken", en: "to reveal", ru: "чтобы показать", vi: "để hiện", fa: "را برای نمایش بزنید" },
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

  function langByKey(key) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].key === key) return LANGS[i];
    return LANGS[0];
  }

  function allowedTitleLangs() {
    var a = LANGS.filter(function (l) { return titleLangs[l.key]; });
    return a.length ? a : LANGS.slice();
  }

  function loadLangSet(storageKey) {
    var def = {};
    LANGS.forEach(function (l) { def[l.key] = true; });
    try {
      var raw = window.localStorage.getItem(storageKey);
      if (raw) {
        var parsed = JSON.parse(raw);
        var out = {}, any = false;
        LANGS.forEach(function (l) {
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

  // ---- rendering ---------------------------------------------------------
  // Paint a word onto the card. `frontKey` = which language is the title;
  // `isRevealed` = whether translations/examples are shown.
  function paintCard(w, frontKey, isRevealed) {
    var frontLang = langByKey(frontKey);
    elWord.textContent = frontLang.get(w);
    elWord.setAttribute("dir", "auto"); // render RTL (Persian) correctly

    elTranslations.innerHTML = "";
    LANGS.forEach(function (l) {
      // show a translation only if it's not the title and its "show" flag is on
      if (l.key === frontKey || !showLangs[l.key]) return;
      var span = document.createElement("span");
      // <bdi> isolates the value's direction so mixing LTR labels with
      // RTL (Persian) values stays readable
      span.innerHTML = l.label + ": <bdi>" + escapeHtml(l.get(w)) + "</bdi>";
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
      div.innerHTML = LANGS.filter(function (l) { return showLangs[l.key]; }).map(function (l) {
        var v = l.key === "de" ? ex.de : ex[l.key];
        return '<div class="' + l.key + '" dir="auto">' + escapeHtml(v) + "</div>";
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
  }

  // Repaint the live current card in its existing state (used when returning
  // from a peek, or after changing the flags).
  function repaintLive() {
    paintCard(deck[0], currentFrontKey, revealed);
    updateProgress();
    updateControls();
  }

  function paintPeek() {
    var entry = seen[peekPos];
    paintCard(entry.word, entry.frontKey, true); // past cards are shown fully
    updateProgress();
    updateControls();
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
    var a = LANGS.filter(function (l) { return titleLangs[l.key]; });
    return a.length ? a : LANGS.slice();
  }
  function primaryExplainKey() { return explainLangs()[0].key; }
  // Which languages examples & analogues appear in (the "show" row).
  function shownLangs() {
    var a = LANGS.filter(function (l) { return showLangs[l.key]; });
    return a.length ? a : LANGS.slice();
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
    var deShow = document.querySelector('.flag[data-set="show"][data-lang="de"]');
    if (deShow) deShow.setAttribute("title", tr(UISTR.deLocked, k));
    if (elLevelNav) elLevelNav.setAttribute("title", tr(UISTR.levelTip, k));
    if (elRevealHint) {
      elRevealHint.innerHTML = escapeHtml(tr(UISTR.revealA, k)) + " <kbd>Enter</kbd> " + escapeHtml(tr(UISTR.revealB, k));
      elRevealHint.setAttribute("dir", "auto");
    }
    elBtnBack.innerHTML = "‹ " + escapeHtml(tr(UISTR.back, k));
    elBtnUnknown.innerHTML = "✗ " + escapeHtml(tr(UISTR.dontknow, k)) + " <kbd>Space</kbd>";
    elBtnKnown.innerHTML = "✓ " + escapeHtml(tr(UISTR.know, k)) + " <kbd>Enter</kbd>";
    elBtnForward.innerHTML = escapeHtml(tr(UISTR.backcurrent, k)) + " ›";
    if (elStatsTitle) elStatsTitle.textContent = tr(UISTR.done, k);
    if (elBtnReload) elBtnReload.textContent = tr(UISTR.reload, k);
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
    elProgress.style.visibility = grammar ? "hidden" : "";
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
    } else {
      renderCard();
    }
  }

  // ---- flag toggles ------------------------------------------------------
  function initFlags() {
    var buttons = document.querySelectorAll(".flag");
    Array.prototype.forEach.call(buttons, function (btn) {
      var name = btn.getAttribute("data-set"); // "title" | "show"
      var key = btn.getAttribute("data-lang");
      syncFlag(btn);
      if (name === "show" && key === "de") btn.classList.add("locked");
      btn.addEventListener("click", function () {
        var set = setForName(name);
        // German is always shown as the answer — it can't be turned off.
        if (name === "show" && key === "de") {
          btn.classList.remove("shake");
          void btn.offsetWidth;
          btn.classList.add("shake");
          return;
        }
        var enabledCount = LANGS.filter(function (l) { return set[l.key]; }).length;
        // Keep at least one language enabled in each row.
        if (set[key] && enabledCount === 1) {
          btn.classList.remove("shake");
          // force reflow so the animation can retrigger
          void btn.offsetWidth;
          btn.classList.add("shake");
          return;
        }
        set[key] = !set[key];
        syncFlag(btn);
        saveLangSet(name);
        applyFlagChange(name);
      });
    });
  }

  function syncFlag(btn) {
    var set = setForName(btn.getAttribute("data-set"));
    var key = btn.getAttribute("data-lang");
    btn.classList.toggle("off", !set[key]);
    btn.setAttribute("aria-pressed", set[key] ? "true" : "false");
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
  elBtnReload.addEventListener("click", function () { location.reload(); });

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

  document.addEventListener("keydown", function (e) {
    if (currentView === "grammar") return;   // grammar view scrolls freely
    if (elStats.classList.contains("hidden") === false) return;

    if (peekPos !== null) {
      // Read-only browsing of past cards.
      if (e.key === "ArrowLeft") { e.preventDefault(); goBack(); }
      else if (e.key === "ArrowRight" || e.key === "Escape") { e.preventDefault(); goForward(); }
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goBack();
    } else if (e.code === "Space") {
      e.preventDefault();
      advance(false); // reveals first, then marks "don't know"
    } else if (e.key === "Enter") {
      e.preventDefault();
      advance(true);  // reveals first, then marks "know"
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
  initFlags();
  initTheme();
  applyUiLang();
  updateLevelNav();
  if (deck.length === 0) {
    elWord.textContent = "No words loaded";
    elCard.classList.remove("answer-hidden");
    elTranslations.textContent = "Check data.js";
    updateControls();
  } else {
    renderCard();
  }
  if ((location.hash || "").toLowerCase() === "#grammar") showView("grammar");
})();
