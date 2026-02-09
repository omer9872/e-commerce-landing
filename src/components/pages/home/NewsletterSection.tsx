import { useTranslations } from "next-intl";

import Button from "@/components/Button";
import Input from "@/components/Input";

export default function NewsletterSection() {
  const t = useTranslations("home.newsletter");

  return (
    <div
      className={
        "py-16 bg-light-card-bg text-gray-900 dark:bg-black dark:text-white"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {t("title")}
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            {t("description")}
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <div className="flex-1">
              <Input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <Button type="submit">{t("subscribe")}</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
