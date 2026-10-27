import { useTranslations } from "next-intl";

export function TaskSummary({ dueToday }: { dueToday: number }) {
  const t = useTranslations();
  return <p className="summary">{t("task-summary.tasksDueToday", { count: dueToday })}</p>;
}
