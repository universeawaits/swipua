(function () {
  var source = (typeof WORDS !== "undefined") ? WORDS : [];

  // ---- deck state --------------------------------------------------------
  // `deck` is a working queue. A card leaves the deck only when it is marked
  // as known; a "don't know" card is re-inserted at a random later position,
  // so it keeps coming back until it's remembered.
  var deck = shuffle(source.slice());
  var totalWords = deck.length;
  var knownCount = 0; // unique words marked as known
  var missCount = 0;  // total "don't know" taps (repeats included)

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

  // ---- rendering ---------------------------------------------------------
  function renderCard() {
    var w = deck[0];

    elProgress.textContent = knownCount + " learned · " + deck.length + " left";

    // Randomly choose which language is shown as the prompt (front) word.
    // The other two languages are shown below as translations.
    var faces = [
      { label: "DE", value: w.word },
      { label: "EN", value: w.en },
      { label: "RU", value: w.ru }
    ];
    var front = Math.floor(Math.random() * faces.length);

    elWord.textContent = faces[front].value;

    elTranslations.innerHTML = "";
    faces.forEach(function (f, i) {
      if (i === front) return;
      var span = document.createElement("span");
      span.textContent = f.label + ": " + f.value;
      elTranslations.appendChild(span);
    });

    elExamples.innerHTML = "";
    (w.examples || []).forEach(function (ex) {
      var div = document.createElement("div");
      div.className = "example";
      div.innerHTML =
        '<div class="de">' + escapeHtml(ex.de) + "</div>" +
        '<div class="en">' + escapeHtml(ex.en) + "</div>" +
        '<div class="ru">' + escapeHtml(ex.ru) + "</div>";
      elExamples.appendChild(div);
    });

    elCard.classList.remove("drag-know", "drag-unknown");
    elCard.style.transform = "";
  }

  function advance(isKnown) {
    if (deck.length === 0) return;
    var w = deck.shift();

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

  function showStats() {
    elDeck.classList.add("hidden");
    elControls.classList.add("hidden");
    elStats.classList.remove("hidden");

    elStatNumbers.innerHTML =
      '<div><b>' + totalWords + '</b>words</div>' +
      '<div><b>' + knownCount + '</b>learned</div>' +
      '<div><b>' + missCount + '</b>slips</div>';

    elUnknownList.innerHTML =
      '<div class="row"><span class="w">All words remembered — nice.</span></div>';
  }

  // ---- controls ----------------------------------------------------------
  document.getElementById("btnKnown").addEventListener("click", function () { advance(true); });
  document.getElementById("btnUnknown").addEventListener("click", function () { advance(false); });
  document.getElementById("btnReload").addEventListener("click", function () { location.reload(); });

  document.addEventListener("keydown", function (e) {
    if (elStats.classList.contains("hidden") === false) return;
    if (e.code === "Space") {
      e.preventDefault();
      advance(false);
    } else if (e.key === "Enter") {
      e.preventDefault();
      advance(true);
    }
  });

  // touch/mouse swipe: drag right = know, drag left = don't know
  (function enableSwipe() {
    var startX = null;
    var dragging = false;

    function onStart(x) {
      startX = x;
      dragging = true;
    }

    function onMove(x) {
      if (!dragging || startX === null) return;
      var dx = x - startX;
      elCard.style.transform = "translateX(" + dx + "px) rotate(" + (dx / 20) + "deg)";
      elCard.classList.toggle("drag-know", dx > 40);
      elCard.classList.toggle("drag-unknown", dx < -40);
    }

    function onEnd(x) {
      if (!dragging || startX === null) return;
      var dx = x - startX;
      dragging = false;
      startX = null;
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
  if (deck.length === 0) {
    elWord.textContent = "No words loaded";
    elTranslations.textContent = "Check data.js";
  } else {
    renderCard();
  }
})();
