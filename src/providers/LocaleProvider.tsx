"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Locale = "en" | "tr";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const PREFERRED_LOCALE_KEY = "preferred_locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    // Check if locale is stored in localStorage
    const storedLocale = localStorage.getItem(
      PREFERRED_LOCALE_KEY
    ) as Locale | null;
    if (storedLocale) {
      setLocale(storedLocale);
    }
  }, []);

  useEffect(() => {
    // Update localStorage when locale changes
    localStorage.setItem(PREFERRED_LOCALE_KEY, locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
