"use client";

import { useState } from "react";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p role="status">Thanks! We sent a link to {email}.</p>;
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <label htmlFor="email">Work email</label>
      <input
        id="email"
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="submit">Create my list</button>
    </form>
  );
}
