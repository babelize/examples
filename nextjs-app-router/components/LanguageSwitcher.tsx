"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Each language in its own name, so it's recognizable whatever the page language.
const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ja", name: "日本語" },
];

export function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  // The root layout renders before the locale is known, so set <html lang> here.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <select
      className="language"
      aria-label={t("header.language")}
      value={locale}
      onChange={(event) => {
        // i18n/request.ts reads this cookie first.
        document.cookie = `NEXT_LOCALE=${event.target.value}; path=/; max-age=31536000; samesite=lax`;
        router.refresh();
      }}
    >
      {languages.map((language) => (
        <option key={language.code} value={language.code}>
          {language.name}
        </option>
      ))}
    </select>
  );
}
