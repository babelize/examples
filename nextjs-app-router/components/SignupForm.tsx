"use client";
import { useTranslations } from "next-intl";

import { useState } from "react";

export function SignupForm() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p role="status" className="sent">
        {t("signup-form.thanksWeSentALink", { email })}
      </p>
    );
  }

  return (
    <form
      className="signup-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <label htmlFor="email" className="visually-hidden">{t("signup-form.workEmail")}</label>
      <input
        id="email"
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="submit">{t("signup-form.createMyList")}</button>
    </form>
  );
}
