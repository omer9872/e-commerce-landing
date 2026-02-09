"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { CheckCircleIcon } from "@/icons/CheckCircle";
import Button from "@/components/Button";

export default function SignUpCompleted() {
  const t = useTranslations("signup");

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 dark:bg-green-900 mb-6">
          <CheckCircleIcon className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>

        {/* Success Title */}
        <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
          {t("signupCompleted.title") || "Account Created Successfully!"}
        </h2>

        {/* Success Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm leading-relaxed">
          {t("signupCompleted.message") ||
            "Congratulations! Your account has been created successfully. You can now sign in to your account and start exploring our services."}
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/login" className="block">
            <Button variant="primary" className="w-full">
              {t("signupCompleted.signInButton") || "Sign In to Your Account"}
            </Button>
          </Link>

          <Link href="/" className="block">
            <Button variant="gray" className="w-full">
              {t("signupCompleted.backToHomeButton") || "Back to Home"}
            </Button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t("signupCompleted.additionalInfo") ||
              "If you have any questions, please don't hesitate to contact our support team."}
          </p>
        </div>
      </div>
    </div>
  );
}
