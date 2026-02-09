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
import Container from "@/components/Container";

export default function Home() {
  const t = useTranslations("landing");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Hero */}
      <section className="h-[750px] relative overflow-hidden flex items-center justify-center shadow-lg">
        <Image src="/tiksatis-hero-bg-extended.png" alt="ShopSmart" fill objectFit="cover" className="hidden md:block" />
        <Image src="/tiksatis-hero-bg-mobile.png" alt="ShopSmart" fill objectFit="cover" className="block md:hidden" />
        <div className="w-full h-full flex items-center justify-between bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.9)] flex flex-col gap-4 relative text-center mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
          <div className="flex justify-center items-center">
            <Link
              href="/"
            >
              <div className="relative w-[300px] h-[60px]">
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
