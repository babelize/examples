import { Header } from "@/components/Header";
import { SignupForm } from "@/components/SignupForm";
import { TaskSummary } from "@/components/TaskSummary";

const features = [
  {
    title: "One list for the whole team",
    body: "Everyone sees the same tasks, so nothing gets lost in chat.",
  },
  {
    title: "Due dates that make sense",
    body: "Tasklane groups work into today, this week and later.",
  },
  {
    title: "Works offline",
    body: "Add tasks on the train. They sync when you are back online.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <h1>The to-do list for small teams</h1>
          <p>Plan the week, share tasks and see what is due, in one simple list.</p>
          <TaskSummary dueToday={3} />
        </section>

        <section className="features" aria-label="Features">
          {features.map((feature) => (
            <article key={feature.title}>
              <h2>{feature.title}</h2>
              <p>{feature.body}</p>
            </article>
          ))}
        </section>

        <section className="signup">
          <h2>Start free</h2>
          <p>Free for up to 5 people. No credit card needed.</p>
          <SignupForm />
        </section>
      </main>
      <footer>
        <p>Made for teams who would rather get things done.</p>
      </footer>
    </>
  );
}
