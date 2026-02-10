"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import {
  CheckCircleOutlined,
  RiseOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import PlatformFeaturesSection from "@/components/pages/landing/PlatformFeaturesSection";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import Container from "@/components/Container";
import {
  pricingData,
  formatPriceTRY,
  formatPriceRangeTRY,
} from "@/data/pricing";
import type { PricingPlan } from "@/data/pricing";

const productCarouselBreakpoints = {
  320: { slidesPerView: 1 },
  768: { slidesPerView: 1 },
  1024: { slidesPerView: 1 },
  1280: { slidesPerView: 1 },
};

const planAccent: Record<string, { border: string; bg: string; dot: string; text: string; check: string }> = {
  core: {
    border: "border-green-500/30",
    bg: "bg-green-500/5",
    dot: "bg-green-500",
    text: "text-green-700 dark:text-green-400",
    check: "text-green-500",
  },
  business: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    dot: "bg-blue-500",
    text: "text-blue-700 dark:text-blue-400",
    check: "text-blue-500",
  },
  platform: {
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    dot: "bg-violet-500",
    text: "text-violet-700 dark:text-violet-400",
    check: "text-violet-500",
  },
};

export default function Home() {
  const t = useTranslations("landing");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Hero */}
      <section className="h-[800px] relative overflow-hidden flex items-center justify-center shadow-lg">
        <Image src="/tiksatis-hero-bg-extended.png" alt="ShopSmart" fill objectFit="cover" className="hidden md:block" />
        <Image src="/tiksatis-hero-bg-mobile.png" alt="ShopSmart" fill objectFit="cover" className="block md:hidden" />
        <div className="w-full h-full flex items-center justify-between bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.9)] flex flex-col gap-4 relative text-center mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
          <div className="flex justify-center items-center">
            <Link
              href="/"
            >
              <div className="relative w-[300px] h-[80px]">
                <Image src="/tiksatis-text.png" alt="ShopSmart" fill objectFit="contain" />
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="m-0 text-2xl sm:text-2xl md:text-4xl font-bold text-white">
              {t("hero.title")}
            </h1>
            <p className="m-0 text-lg sm:text-xl text-violet-100 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <div className="my-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                >
                  {t("cta.primary")}
                </Button></Link>
              {/* <Button
              size="large"
              className="!bg-transparent !text-white !border-2 !border-white !h-12 !px-8 !font-semibold hover:!bg-white/10 hover:!border-white hover:!text-white"
            >
              {t("cta.secondary")}
            </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <Container>
          <header className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {t("benefits.title")}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t("benefits.subtitle")}
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="shadow-lg flex flex-col items-center text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center mb-4">
                <CheckCircleOutlined className="!text-violet-600 dark:!text-violet-400 !text-2xl" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                {t("benefits.unified")}
              </h3>
            </div>
            <div className="shadow-lg flex flex-col items-center text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mb-4">
                <RiseOutlined className="!text-indigo-600 dark:!text-indigo-400 !text-2xl" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                {t("benefits.scale")}
              </h3>
            </div>
            <div className="shadow-lg flex flex-col items-center text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center mb-4">
                <BarChartOutlined className="!text-violet-600 dark:!text-violet-400 !text-2xl" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                {t("benefits.insights")}
              </h3>
            </div>
          </div>
        </Container>
      </section>

      {/* Our products */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
        <Container>
          <header className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {t("products.title")}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t("products.subtitle")}
            </p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Admin panel */}
            <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="p-5 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {t("products.adminPanel.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t("products.adminPanel.description")}
                </p>
              </div>
              <div className="aspect-video bg-slate-100 dark:bg-slate-700/50 min-h-[200px]">
                <Carousel
                  items={[
                    <div key="1" className="w-full min-h-[200px] flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm p-4">
                      Admin panel screenshot (add image later)
                    </div>,
                    <div key="2" className="w-full min-h-[200px] flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm p-4">
                      Admin panel screenshot (add image later)
                    </div>,
                  ]}
                  slidesPerView={1}
                  pagination={true}
                  navigation={true}
                  autoplay={false}
                  breakpoints={productCarouselBreakpoints}
                />
              </div>
            </div>
            {/* Web app */}
            <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="p-5 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {t("products.webApp.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t("products.webApp.description")}
                </p>
              </div>
              <div className="aspect-video bg-slate-100 dark:bg-slate-700/50 min-h-[200px]">
                <Carousel
                  items={[
                    <div key="1" className="w-full min-h-[200px] flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm p-4">
                      Web app screenshot (add image later)
                    </div>,
                    <div key="2" className="w-full min-h-[200px] flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm p-4">
                      Web app screenshot (add image later)
                    </div>,
                  ]}
                  slidesPerView={1}
                  pagination={true}
                  navigation={true}
                  autoplay={false}
                  breakpoints={productCarouselBreakpoints}
                />
              </div>
            </div>
            {/* Mobile app */}
            <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="p-5 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {t("products.mobileApp.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t("products.mobileApp.description")}
                </p>
              </div>
              <div className="aspect-video bg-slate-100 dark:bg-slate-700/50 min-h-[200px]">
                <Carousel
                  items={[
                    <div key="1" className="w-full min-h-[200px] flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm p-4">
                      Mobile app screenshot (add image later)
                    </div>,
                    <div key="2" className="w-full min-h-[200px] flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm p-4">
                      Mobile app screenshot (add image later)
                    </div>,
                  ]}
                  slidesPerView={1}
                  pagination={true}
                  navigation={true}
                  autoplay={false}
                  breakpoints={productCarouselBreakpoints}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How we build your products */}
      <section className="py-16 md:py-24">
        <Container>
          <header className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {t("process.title")}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t("process.subtitle")}
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
            <div className="relative flex flex-col p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="absolute -top-3 -left-1 w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center font-bold text-lg shadow">
                1
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
                {t("process.step1.title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t("process.step1.description")}
              </p>
            </div>
            <div className="relative flex flex-col p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="absolute -top-3 -left-1 w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center font-bold text-lg shadow">
                2
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
                {t("process.step2.title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t("process.step2.description")}
              </p>
            </div>
            <div className="relative flex flex-col p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="absolute -top-3 -left-1 w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center font-bold text-lg shadow">
                3
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
                {t("process.step3.title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t("process.step3.description")}
              </p>
            </div>
            <div className="relative flex flex-col p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="absolute -top-3 -left-1 w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center font-bold text-lg shadow">
                4
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
                {t("process.step4.title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t("process.step4.description")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Subscription packages */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
        <Container>
          <header className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {t("pricing.title")}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t("pricing.subtitle")}
            </p>
          </header>

          {/* Main tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {pricingData.plans.map((plan: PricingPlan) => {
              const accent = planAccent[plan.id] ?? planAccent.core;
              return (
                <div
                  key={plan.id}
                  className={`rounded-xl border-2 ${accent.border} bg-white dark:bg-slate-800 shadow-lg overflow-hidden flex flex-col ${plan.recommended ? "ring-2 ring-blue-400 ring-offset-2 dark:ring-offset-slate-900" : ""}`}
                >
                  <div className={`p-5 border-b border-slate-200 dark:border-slate-700 ${accent.bg}`}>
                    <div className="mb-2">
                      <span className={`inline-block w-3 h-3 rounded-full ${accent.dot}`} aria-hidden />
                      {plan.recommended && (
                        <span className="ml-2 text-xs font-medium text-blue-600 dark:text-blue-400">
                          {t("pricing.recommended")}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {t(`pricing.plans.${plan.id}.name`)}
                    </h3>
                    <p className={`text-sm font-medium ${accent.text}`}>
                      {t(`pricing.plans.${plan.id}.tagline`)}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {t(`pricing.plans.${plan.id}.bestFor`)}
                    </p>
                    <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                      {formatPriceTRY(plan.price)}
                    </p>
                    <p className="text-xs text-slate-500">{t("pricing.monthly")}</p>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
                      {plan.featureKeys.map((key) => (
                        <li key={key} className="flex items-start gap-2">
                          <span className={`${accent.check} mt-0.5`}>✓</span>
                          {t(`pricing.plans.${plan.id}.features.${key}`)}
                        </li>
                      ))}
                    </ul>
                    {plan.limitationKeys.length > 0 && (
                      <ul className="mt-auto space-y-1 text-xs text-slate-500 dark:text-slate-400">
                        {plan.limitationKeys.map((key) => (
                          <li key={key}>🚫 {t(`pricing.plans.${plan.id}.limitations.${key}`)}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add-ons */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            {t("pricing.addOnsTitle")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Mobile app add-on */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                {t("pricing.addons.mobileApp.title")}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                {t("pricing.addons.mobileApp.description")}
              </p>
              {pricingData.addons.mobileApp.oneTimeFees.map((fee) => (
                <div key={fee.id} className="mb-2">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {formatPriceRangeTRY(fee.priceRange)}
                  </p>
                  <p className="text-xs text-slate-500">{t(`pricing.addons.mobileApp.oneTimeFees.${fee.id}`)}</p>
                </div>
              ))}
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 mb-2 font-medium">
                {t("pricing.addons.mobileApp.maintenanceTitle")}
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {formatPriceRangeTRY(pricingData.addons.mobileApp.maintenance.monthlyPriceRange)} / {t("pricing.monthly").toLowerCase()}
              </p>
              <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                {pricingData.addons.mobileApp.maintenance.includeKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    {t(`pricing.addons.mobileApp.maintenance.includes.${key}`)}
                  </li>
                ))}
                {pricingData.addons.mobileApp.maintenance.excludeKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-slate-500">
                    🚫 {t(`pricing.addons.mobileApp.maintenance.excludes.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
            {/* Custom web design */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                {t("pricing.addons.customWebDesign.title")}
              </h4>
              <p className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                {formatPriceRangeTRY(pricingData.addons.customWebDesign.oneTimePriceRange)}
              </p>
              <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                {pricingData.addons.customWebDesign.includeKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    {t(`pricing.addons.customWebDesign.includes.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
            {/* Extras */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                {t("pricing.addons.extrasTitle")}
              </h4>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {pricingData.addons.extras.map((extra) => (
                  <li key={extra.id} className="flex justify-between items-baseline gap-2">
                    <span>{t(`pricing.addons.extras.${extra.id}`)}</span>
                    <span className="font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                      {extra.price != null
                        ? formatPriceTRY(extra.price)
                        : extra.priceRange
                          ? formatPriceRangeTRY(extra.priceRange)
                          : ""}{" "}
                      / {t("pricing.monthly").toLowerCase()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Platform features grid */}
      <PlatformFeaturesSection />

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-slate-900 dark:bg-slate-950">
        <Container className="flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t("finalCta.title")}
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            {t("finalCta.subtitle")}
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
            >
              {t("finalCta.button")}
            </Button></Link>
        </Container>
      </section>
    </div>
  );
}
