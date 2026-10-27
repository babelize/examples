import { useTranslations } from "next-intl";

export function TaskSummary({ dueToday }: { dueToday: number }) {
  const t = useTranslations();
  return (
    <p className="summary">
      {dueToday === 1 ? t("task-summary.1TaskIsDueToday") : t("task-summary.duetodayTasksAreDueToday", { dueToday })}
    </p>
  );
}
