import { TaskSummary } from "./TaskSummary";

// A picture of the product: the rows are placeholders, not text, so there is
// nothing here to translate except the summary.
const rows = [
  { done: true, width: "72%", tag: "today" },
  { done: true, width: "54%", tag: "today" },
  { done: false, width: "66%", tag: "today" },
  { done: false, width: "48%", tag: "week" },
  { done: false, width: "60%", tag: "later" },
];

export function AppPreview({ dueToday }: { dueToday: number }) {
  return (
    <div className="preview">
      <div className="preview-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="preview-body">
        <TaskSummary dueToday={dueToday} />
        <ul className="preview-list" aria-hidden="true">
          {rows.map((row, i) => (
            <li key={i} className={row.done ? "done" : undefined}>
              <span className="check" />
              <span className="line" style={{ width: row.width }} />
              <span className={`tag tag-${row.tag}`} />
              <span className="avatar" data-variant={i % 3} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
