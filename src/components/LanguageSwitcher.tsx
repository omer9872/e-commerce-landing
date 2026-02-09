"use client";

import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useLocale } from "@/providers/LocaleProvider";

import Select from "./Select";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const router = useRouter();

  const handleLocaleChange = (newLocale: string) => {
    // Set cookie
    setCookie("LOCALE", newLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });
    // Update locale in context
    setLocale(newLocale as "en" | "tr");
    // Refresh the page to apply new locale
    router.refresh();
  };

  return (
    <Select
      value={locale}
      onChange={handleLocaleChange}
      options={[
        { value: "en", label: "EN" },
        { value: "tr", label: "TR" },
      ]}
      containerClassName="w-[70px]"
      size="middle"
    />
  );
}
