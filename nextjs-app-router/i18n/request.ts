// @babelize-generated next-intl request config
// Babelize regenerates this file (to update the locale list) while the line
// above is present. Remove that line to take it over.
import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export const sourceLocale = "en";
export const locales = ["en","fr","de","ja"];

function pickLocale(candidates: Array<string | undefined>): string {
  for (const candidate of candidates) {
    if (!candidate) continue;
    const wanted = candidate.toLowerCase();
    const exact = locales.find((l) => l.toLowerCase() === wanted);
    if (exact) return exact;
    const base = locales.find((l) => l.split('-')[0].toLowerCase() === wanted.split('-')[0]);
    if (base) return base;
  }
  return sourceLocale;
}

export default getRequestConfig(async () => {
  // Locale preference: the NEXT_LOCALE cookie, then the browser's Accept-Language.
  const cookieLocale = (await cookies()).get('NEXT_LOCALE')?.value;
  const acceptLanguage = ((await headers()).get('accept-language') ?? '')
    .split(',')
    .map((part) => part.split(';')[0].trim());
  const locale = pickLocale([cookieLocale, ...acceptLanguage]);
  return {
    locale,
    messages: (await import(`../public/locales/${locale}.json`)).default,
  };
});
