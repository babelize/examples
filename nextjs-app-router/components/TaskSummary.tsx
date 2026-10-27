export function TaskSummary({ dueToday }: { dueToday: number }) {
  return (
    <p className="summary">
      {dueToday === 1 ? "1 task is due today" : `${dueToday} tasks are due today`}
    </p>
  );
}
