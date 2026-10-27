import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { SignupForm } from "@/components/SignupForm";
import { TaskSummary } from "@/components/TaskSummary";

const features = [
  {
    title: "page.oneListForTheWhole",
    body: "page.everyoneSeesTheSameTasks",
  },
  {
    title: "page.dueDatesThatMakeSense",
    body: "page.tasklaneGroupsWorkIntoToday",
  },
  {
    title: "page.worksOffline",
    body: "page.addTasksOnTheTrain",
  },
];

export default function Home() {
  const t = useTranslations();
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <h1>{t("page.theToDoListForSmall")}</h1>
          <p>{t("page.planTheWeekShareTasks")}</p>
          <TaskSummary dueToday={3} />
        </section>

        <section className="features" aria-label={t("page.features")}>
          {features.map((feature) => (
            <article key={feature.title}>
              <h2>{t(feature.title)}</h2>
              <p>{t(feature.body)}</p>
            </article>
          ))}
        </section>

        <section className="signup">
          <h2>{t("page.startFree")}</h2>
          <p>{t("page.freeForUpTo5")}</p>
          <SignupForm />
        </section>
      </main>
      <footer>
        <p>{t("page.madeForTeamsWhoWould")}</p>
      </footer>
    </>
  );
}
