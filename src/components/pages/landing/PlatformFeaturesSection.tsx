"use client";

import { useTranslations } from "next-intl";
import { Card } from "antd";

import Container from "@/components/Container";

const SYSTEM_FEATURE_KEYS = [
  "Auth",
  "Account",
  "Permission",
  "Role",
  "User",
  "Logger",
] as const;

const CUSTOMER_FEATURE_KEYS = [
  "Merchant",
  "MerchantEmployee",
] as const;
const SHIPPING_FEATURE_KEYS = [
  "Carrier",
  "Shipping",
] as const;
const MARKETPLACE_FEATURE_KEYS = [
  "ProductCategory",
  "ProductBrand",
  "Product",
  "ProductReview",
  "Cart",
  "Payment",
  "Refund",
  "Feedback",
  "Favorites",
  "Campaign",
  "Blog",
  "Story",
  "Report",
  "WebsiteSettings",
] as const;

export default function PlatformFeaturesSection() {
  const t = useTranslations("landing.features");

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/40">
      <Container className="flex flex-col gap-4">
        <header className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {SYSTEM_FEATURE_KEYS.map((key) => (
            <div key={key}>
              <Card
                className="shadow h-full text-center w-full border-0 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-800/80 dark:border-slate-700"
              >
                <div className="font-semibold text-slate-900 dark:text-white mb-1">
                  {t(`items.${key}.title`)}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                  {t(`items.${key}.description`)}
                </p>
              </Card>
            </div>
          ))}
        </div>
        <div className="border-0 border-t w-full border-solid border-light-border dark:border-dark-border"></div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {CUSTOMER_FEATURE_KEYS.map((key) => (
            <div key={key}>
              <Card
                className="shadow h-full text-center w-full border-0 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-800/80 dark:border-slate-700"
              >
                <div className="font-semibold text-slate-900 dark:text-white mb-1">
                  {t(`items.${key}.title`)}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                  {t(`items.${key}.description`)}
                </p>
              </Card>
            </div>
          ))}
        </div>
        <div className="border-0 border-t w-full border-solid border-light-border dark:border-dark-border"></div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {SHIPPING_FEATURE_KEYS.map((key) => (
            <div key={key}>
              <Card
                className="shadow h-full text-center w-full border-0 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-800/80 dark:border-slate-700"
              >
                <div className="font-semibold text-slate-900 dark:text-white mb-1">
                  {t(`items.${key}.title`)}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                  {t(`items.${key}.description`)}
                </p>
              </Card>
            </div>
          ))}
        </div>
        <div className="border-0 border-t w-full border-solid border-light-border dark:border-dark-border"></div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {MARKETPLACE_FEATURE_KEYS.map((key) => (
            <div key={key}>
              <Card
                className="shadow h-full text-center w-full border-0 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-800/80 dark:border-slate-700"
              >
                <div className="font-semibold text-slate-900 dark:text-white mb-1">
                  {t(`items.${key}.title`)}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                  {t(`items.${key}.description`)}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section >
  );
}
