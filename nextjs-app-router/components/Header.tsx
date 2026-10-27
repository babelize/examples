import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoMark } from "./Logo";

export function Header() {
  const t = useTranslations();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="/" className="logo" aria-label={t("header.tasklaneHome")}>
          <LogoMark />
          Tasklane
        </a>
        <nav aria-label={t("header.main")}>
          <a href="#features">{t("header.features")}</a>
          <a href="#start">{t("header.pricing")}</a>
          <a href="/login">{t("header.logIn")}</a>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher />
          <a href="#start" className="button button-small">
            {t("page.startFree")}
          </a>
        </div>
      </div>
    </header>
  );
}
