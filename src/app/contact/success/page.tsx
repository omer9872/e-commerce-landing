"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { CheckCircleIcon } from "@/icons/CheckCircle";
import Button from "@/components/Button";

export default function ContactSuccessPage() {
  const t = useTranslations("contact");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-4">
          <CheckCircleIcon className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("success.title")}
        </h2>
        <p className="text-gray-600 mb-8">{t("success.message")}</p>
        <div className="space-y-4">
          <Link href="/" className="block">
            <Button variant="primary" className="w-full">
              {t("success.homeButton")}
            </Button>
          </Link>
          <Link href="/contact" className="block">
            <Button variant="gray" className="w-full">
              {t("success.backButton")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
