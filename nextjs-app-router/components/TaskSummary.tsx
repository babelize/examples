import { useTranslations } from "next-intl";

export function TaskSummary({ dueToday }: { dueToday: number }) {
  const t = useTranslations();
  return (
    <p className="summary">
      <span className="summary-dot" aria-hidden="true" />
      {t("task-summary.tasksDueToday", { count: dueToday })}
    </p>
  );
}
