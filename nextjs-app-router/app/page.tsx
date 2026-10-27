import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { AppPreview } from "@/components/AppPreview";
import { Header } from "@/components/Header";
import { LogoMark } from "@/components/Logo";
import { SignupForm } from "@/components/SignupForm";

const icon = (path: ReactNode) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {path}
  </svg>
);

const features = [
  {
    title: "page.oneListForTheWhole",
    body: "page.everyoneSeesTheSameTasks",
    icon: icon(
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 19c.7-3.2 3-5 5.5-5s4.8 1.8 5.5 5" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M15.5 14.2c2.4-.3 4.4 1.2 5 4.3" />
      </>,
    ),
  },
  {
    title: "page.dueDatesThatMakeSense",
    body: "page.tasklaneGroupsWorkIntoToday",
    icon: icon(
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="3" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
      </>,
    ),
  },
  {
    title: "page.worksOffline",
    body: "page.addTasksOnTheTrain",
    icon: icon(
      <>
        <path d="M4 12.5a11 11 0 0116 0M7.5 15.5a6 6 0 019 0" />
        <circle cx="12" cy="19" r="1.4" />
      </>,
    ),
  },
];

export default function Home() {
  const t = useTranslations();
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <h1>{t("page.theToDoListForSmall")}</h1>
              <p className="lead">{t("page.planTheWeekShareTasks")}</p>
              <div className="hero-actions">
                <a href="#start" className="button">
                  {t("page.startFree")}
                </a>
                <a href="/login" className="button button-ghost">
                  {t("header.logIn")}
                </a>
              </div>
              <p className="fineprint">{t("page.freeForUpTo5")}</p>
            </div>
            <AppPreview dueToday={3} />
          </div>
        </section>

        <section id="features" className="features">
          <div className="container">
            <p className="eyebrow">{t("page.features")}</p>
            <div className="feature-grid">
              {features.map((feature) => (
                <article key={feature.title} className="feature">
                  <div className="feature-icon">{feature.icon}</div>
                  <h2>{t(feature.title)}</h2>
                  <p>{t(feature.body)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="start" className="signup">
          <div className="container">
            <div className="signup-panel">
              <div>
                <h2>{t("page.startFree")}</h2>
                <p>{t("page.freeForUpTo5")}</p>
              </div>
              <SignupForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="logo">
            <LogoMark />
            Tasklane
          </span>
          <p>{t("page.madeForTeamsWhoWould")}</p>
        </div>
      </footer>
    </>
  );
}
