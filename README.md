# swipua

A tiny swipe-to-learn German vocabulary flashcard app (German ↔ English/Russian, with example sentences).

- **Swipe right / ✓ / Enter** — you know the word (it leaves the deck).
- **Swipe left / ✗ / Space** — you don't know it (it comes back later in the session, at random, until you mark it as known).
- Card order is shuffled every session, and each card shows one of DE / EN / RU as the prompt (chosen at random), with the other two as translations.

## Run locally

It's plain static HTML/CSS/JS — just open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Data

Vocabulary lives in `words.json`; `data.js` is the same list wrapped as `const WORDS = [...]` and is what the app loads at runtime. Keep the two in sync when editing.

## Deployment

Pushing to `main` automatically builds and publishes the site to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.
