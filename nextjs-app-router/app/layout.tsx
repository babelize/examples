import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tasklane: the to-do list for small teams",
  description: "Plan the week, share tasks and see what is due, in one simple list.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
