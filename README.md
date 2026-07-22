# beeins

A swipe-to-learn app for building vocabulary and brushing up on grammar — with everything translated into your own language. It runs in any browser, works on phone and desktop, and needs no account or install.

**Play online: [universeawaits.github.io/beeins](https://universeawaits.github.io/beeins/)**

Or run it locally: open `index.html`, or serve the folder and visit it in a browser.

## Choose what to learn

A dropdown in the very top-left picks the language you're studying:

- **🇩🇪 German** — 4,600+ words, a 20-topic grammar reference, and translations into any of 25+ languages.
- **🇹🇷 Turkish** — 3,700+ words and a 23-topic Turkish grammar reference, studied from Russian, English, German, Syrian Arabic, Ukrainian, Persian, or French.
- **🇦🇷 Argentinian Spanish** — 4,000+ words and a 24-topic **Rioplatense** grammar reference, studied from Russian, English, German, Turkish, Ukrainian, Persian, or French.
- **🇫🇷 French** — 4,000+ words and a 24-topic grammar reference, studied from Russian, English, German, Turkish, Spanish, Italian, or Syrian Arabic. Levels and grammar follow the CEFR / DELF A1–B1 and the *Niveau A1/A2/B1 pour le français* référentiels.
- **🇷🇺 Russian** — 3,300+ words and a 24-topic grammar reference (the six cases, verbal aspect, verbs of motion…), studied from German, English, French, Persian, Ukrainian, or Syrian Arabic.
- **🇮🇹 Italian** — 3,300+ words and a 24-topic grammar reference (articles, the passato prossimo/imperfetto contrast, the subjunctive, object and relative pronouns…), studied from Russian, German, English, Ukrainian, or Persian.
- **🇺🇦 Ukrainian** — 4,000+ words and a 24-topic grammar reference (the alphabet, noun gender, the full seven-case system including the distinctly Ukrainian **vocative**, verb aspect, verbs of motion, the conditional, and more), studied from Russian, English, German, Italian, Argentine Spanish, or French.
- **🇭🇷 Croatian** — 4,000+ words and a 24-topic grammar reference (the seven cases including the **vocative**, three genders, verb aspect, the *perfekt* and *futur*, the conditional, and the Croatian **clitic (enclitic) word-order** rules), studied from German, English, Russian, French, Turkish, or Argentine Spanish.
- **🇧🇾 Belarusian** — 4,000+ words and a 24-topic grammar reference (the alphabet with its distinctive *і*, *ў* and the apostrophe, *akanne*, noun gender, the full case system including the **vocative**, verb aspect and tenses, verbs of motion, the conditional, and word order), studied from German, English, Russian, French, Turkish, or Argentine Spanish. Throughout, the vocabulary is authentically Belarusian rather than Russian.

Each language is built from its own materials — vocabulary, CEFR levels, and grammar all drawn from that language's official curricula, not translated across — and keeps its own progress, level, and preferences, so switching between them never disturbs the other.

## What it does

Each language has a vocabulary trainer and a grammar reference, switchable from the top-left tabs:

### 📇 Cards — vocabulary flashcards

- **Real vocabulary with example sentences** — 4,600+ words for German, 4,000+ each for Spanish, French, Ukrainian, Croatian and Belarusian, 3,700+ for Turkish, 3,300+ each for Russian and Italian.
- **Filter by topic** — a topics dropdown next to the level switch lets you narrow the deck to any of 48 themes (food, travel, work, health, law, politics, physics, biology, astronomy, programming, dance, music, sustainability, architecture…). Pick one or several, or leave it on **all topics**. Every word is tagged, and each card shows its topics as emojis in the top-left corner — hover one to see the topic name in your own language.
- **Study by level** — A1, A2, or B1. Levels are cumulative, so B1 includes everything below it. Each word is graded on its own language's framework: German on the standard German CEFR levels, Turkish against the official Turkish-for-foreigners curricula (Yedi İklim Türkçe, İstanbul Yabancılar İçin Türkçe, TÖMER) — Turkish vocabulary and levels are drawn from those materials, not from a translated German list.
- **Flip and grade**: tap a card (or press any key) to reveal the answer, then mark **✓ Know** or **✗ Don't know**.
- **Swipe or keyboard** — swipe right / left on a phone, or use Enter (know), Space (don't know), and the arrow keys on a desktop.
- **Words stick until you know them** — anything you mark "don't know" comes back later in the same session; words you know leave the deck.
- **Look back** — step back through cards you've already seen without losing your place.
- **Automatic progress saving** — close the tab and pick up exactly where you left off. A reset button reshuffles and starts fresh.
- **See synonyms** (where they exist) and the word's example sentence translated into every language you've turned on.
- **Hear it spoken** — a speaker button next to the word you're learning and each example plays its pronunciation in the target language. Every clip is **pre-rendered with [Piper](https://github.com/rhasspy/piper)**, an open-source neural voice, so playback is **instant and natural** — no synthesis lag, no dependence on the voices your device happens to have. The clips live in a separate [`beeins-audio`](https://github.com/universeawaits/beeins-audio) repo and load from the jsDelivr CDN (edge- and browser-cached; only the tiny clips you actually play are fetched), which keeps this repo small. If a clip is ever unavailable it falls back to synthesizing in the browser (Piper via WebAssembly), then to the OS text-to-speech.

### 📖 Grammar — a plain-language reference

A built-in cheat sheet — **20 core topics for German**, **23 for Turkish** — explained in your language with tables, example sentences, and side-by-side comparisons to how your own language handles the same thing. The same **A1 / A2 / B1** switcher applies here too, so you only see the topics for your level (cumulative — B1 shows everything). Turkish topics cover vowel harmony, consonant softening, the noun cases, izafet (noun compounds), possessive and personal suffixes, the tense system (-yor, aorist, -dı, -mış, -ecek), postpositions, participles, the verb voices, and more. Each explanation is contrastive — it flags the mistakes that speakers of *your* language typically make (the Russian explanations are additionally grounded in a Russian-language Turkish workbook). German topics include:

articles & genders · the four cases · pronouns · possessives · adjective endings · present tense · Perfekt · Präteritum · Plusquamperfekt & future · modal verbs · separable verbs · reflexive verbs · Konjunktiv II · passive · prepositions · verbs with prepositions · comparatives · word order · subordinate clauses · relative clauses

## Speak your language

Everything around the word you're learning — translations, example sentences, grammar explanations, and the app's own buttons and labels — appears in a language you choose. When learning **German**, you can study from and see any of these:

English · Russian · Ukrainian · Vietnamese · Persian · Thai · Chinese · Malay · Turkish · Polish · Swahili · Amharic · Hindi · Urdu · Mexican Spanish · Catalan · Croatian · Serbian · Greek · Romanian · Albanian · and Egyptian, Lebanese & Syrian Arabic

When learning **Turkish**, the study-from languages are currently English, Russian, German, Syrian Arabic, Ukrainian, Persian, and French.

When learning **Argentinian Spanish**, the study-from languages are currently Russian, English, German, Turkish, Ukrainian, Persian, and French. Every grammar explanation flags the mistakes speakers of those languages typically make, and the Rioplatense features (voseo, ustedes, sheísmo, the preterite preference) are called out in each relevant topic. The certification landscape is Argentina's own **CELU** (a usage-based, oral-plus-written proficiency exam) alongside the pan-Hispanic **DELE** and **SIELE**; the vocabulary and per-level grammar follow the Instituto Cervantes' Plan Curricular (PCIC) A1–B1 inventories, systematically overridden with Argentine usage.

One **languages** selector tunes this: pick the languages you care about and each one serves both roles — it can appear as the prompt word *before* you flip the card (testing recognition in more than one direction) and its translation and example line appear *after* you flip. The first language you turn on also becomes the language of the whole interface. The list is grouped by language family and ordered alphabetically within each family.

On your very first visit only the language you're learning and your device's own language are turned on, so you start with a clean two-language view instead of every language at once — add more whenever you like.

Right-to-left languages (Persian, Arabic, Urdu) display correctly.

## Who it's for

- **Newcomers and immigrants** learning German (or Turkish) who want explanations in their first language, not only in English.
- **A1–A2–B1 students** who want to drill vocabulary in short, self-paced sessions and check grammar on the spot.
- **Anyone revising** — pick a level, swipe through a stack on your commute, and let the words you keep missing resurface until they stick.

## Extras

- **Light and dark themes**, with a one-tap toggle.
- **Nothing to sign up for** — your progress lives on your own device.
