"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CloseOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import TextSlide from "./TextSlide";
import Container from "./Container";
import Button from "./Button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("");

  return (
    <header className="bg-light-bg dark:bg-dark-bg border-0 border-b border-solid border-light-border dark:border-dark-border sticky top-0 z-50">
      <TextSlide
        texts={[]}
        pauseOnHover
        className="text-white text-2xl font-bold border-0 border-b border-solid border-light-border dark:border-dark-border"
      />
      <Container>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-row gap-2 items-center group decoration-purple-600"
          >
            <div className="relative w-14 h-14">
              <Image src="/tiksatis-transparent.png" alt="ShopSmart" fill objectFit="contain" />
            </div>
          </Link>

          {/* Auth Buttons */}
          <div className="hidden md:flex gap-4 items-center">
            <Link
              href="/contact"
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {t("header.navigation.contact")}
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            variant="secondary"
            aria-label={
              isMenuOpen ? t("header.menu.close") : t("header.menu.open")
            }
          >
            {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/contact"
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {t("header.navigation.contact")}
              </Link>
              <div className="px-4 py-2 flex items-center gap-4">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};
