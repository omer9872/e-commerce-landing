import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";

import "./globals.scss";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { HelpButton } from "@/components/HelpButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "tr" }];
}

export const metadata: Metadata = {
  title: "TıkSatış.com",
  description: "TıkSatış.com - Online Satış Platformu",
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon-32x32.png",
    apple: "/favicon-32x32.png",
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) { }

  return (
    <html lang={locale} className="h-full">
      <body className="h-full bg-light-bg dark:bg-dark-bg">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LocaleProvider>
            <ThemeProvider>
              <div className="min-h-full flex flex-col">
                <Header
                />
                <main className="flex-1 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
                  {children}
                </main>
                <Footer
                />
                <Toaster />
                {/* <HelpButton /> */}
              </div>
            </ThemeProvider>
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
