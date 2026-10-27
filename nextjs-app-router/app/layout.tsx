import type { Metadata } from "next";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return { title: t("title"), description: t("description") };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {/* The locale comes from a cookie or Accept-Language, which is request
            data: with cacheComponents it has to be read inside <Suspense>. */}
        <Suspense>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
