"use client";

import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "@/providers/ThemeProvider";
import Button from "@/components/Button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 bg-transparent hover:bg-transparent item-border"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {theme === "dark" ? (
        <SunOutlined className="text-light-text dark:text-dark-text" />
      ) : (
        <MoonOutlined className="text-light-text dark:text-dark-text" />
      )}
    </Button>
  );
}
