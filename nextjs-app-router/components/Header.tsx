import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations();
  return (
    <header>
      <a href="/" className="logo" aria-label={t("header.tasklaneHome")}>
        {t("header.tasklane")}
      </a>
      <nav aria-label={t("header.main")}>
        <a href="#features">{t("header.features")}</a>
        <a href="#pricing">{t("header.pricing")}</a>
        <a href="/login">{t("header.logIn")}</a>
      </nav>
    </header>
  );
}
