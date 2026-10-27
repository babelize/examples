# Static HTML

Two plain HTML pages ("Tasklane" home and pricing) localized into French, German and Japanese with `npx babelize translate`. No framework and no build step.

## What Babelize changed

[See the diff](https://github.com/babelize/examples/commit/e90e43b). In one run it:

- Added `data-i18n` attributes to every text element, plus `data-i18n-aria-label` and `data-i18n-content` for the meta description
- Wrote `locales/{en,fr,de,ja}.json`
- Added `i18n.js`, a dependency-free runtime (about 240 lines) that loads the right locale file and swaps the text, and included it on each page
- Wrote `.babelize/local/babelize-lock.json`, so the next run only translates new or changed strings

The hosted translator failed 38 of 111 translations on the first two runs (`missing_from_response`). Each re-run retried only those, and the third finished.

## What we fixed in review

[See the diff](https://github.com/babelize/examples/commit/425fd6c):

- **Brand name.** "Tasklane" was translated. Its `data-i18n` attribute is gone, so it stays as written.
- **Language switcher.** Added `<span data-babelize-switcher></span>` to the nav; the runtime fills it with a `<select>`.
- **Translations.** Corrected in all three languages; for example "Pricing | Tasklane" had become "Les prix sont élevés" ("prices are high").

## Run it

The runtime fetches `locales/*.json`, so serve the folder instead of opening the file directly:

```bash
npx serve .
```

Add `?lang=ja` to the URL or use the switcher. The choice is remembered in `localStorage`.
