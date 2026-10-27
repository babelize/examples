# Babelize examples

Small apps localized with [Babelize](https://www.babelize.co), each with the full history: the app before localization, the unedited Babelize run, and the fixes we made when reviewing it. Click through the commits to see exactly what the CLI changes.

| Example | Stack | i18n library it sets up | Babelize run | Review fixes |
|---|---|---|---|---|
| [nextjs-app-router](./nextjs-app-router) | Next.js 16 App Router | next-intl | [`d63ae53`](https://github.com/babelize/examples/commit/d63ae53) | [`348eb7d`](https://github.com/babelize/examples/commit/348eb7d) |
| [static-html](./static-html) | Plain HTML, no build step | Babelize's small `i18n.js` runtime | [`e90e43b`](https://github.com/babelize/examples/commit/e90e43b) | [`425fd6c`](https://github.com/babelize/examples/commit/425fd6c) |

Coming next: [React + Vite](https://github.com/babelize/examples/issues/1), [Django](https://github.com/babelize/examples/issues/2), [Vue](https://github.com/babelize/examples/issues/3), [Expo](https://github.com/babelize/examples/issues/4) and [the React SDK](https://github.com/babelize/examples/issues/5). Each issue describes how the examples are built, if you'd like to add one.

## Run Babelize on your own app

```bash
cd your-app
npx babelize translate --to fr,de,ja
git diff
```

It needs a git repo with a clean working tree, writes everything to your working tree, and leaves the review to you.

## About the translations

These runs used Babelize's hosted translation: signed in, with no LLM key of our own. That is an open-source machine-translation model we host, not an LLM, and the raw output shows its limits: it translated the brand name, read "Main" (a navigation label) as a word to translate literally, and dropped "Thanks!". The review commits fix all of that by hand.

For better first drafts, use your own LLM key. No account is needed:

```bash
export ANTHROPIC_API_KEY=...   # or OPENAI_API_KEY, GEMINI_API_KEY, GROQ_API_KEY, OPENROUTER_API_KEY
npx babelize translate --to fr,de,ja
```

Either way, review the diff before you merge. Later runs only translate new or changed strings.

These examples were generated with @babelize/cli 1.3.9. Since 1.3.10, a re-run keeps translations you corrected in the locale files. One known issue remains: a re-run wraps the brand name "Tasklane" again, so check `git diff` after a re-run and discard that change.

## Links

- [CLI docs](https://docs.babelize.co/cli/translate)
- [Blog: the best i18n libraries for every framework in 2027](https://www.babelize.co/blogs/best-i18n-libraries-2027/)
- [Elements: ready-made language switchers](https://elements.babelize.co)

Found a problem in an example? [Open an issue](https://github.com/babelize/examples/issues).
