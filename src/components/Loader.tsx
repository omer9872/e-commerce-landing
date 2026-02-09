import { useTranslations } from "next-intl";

interface LoaderProps {
  mini?: boolean;
  message?: string;
  minHeight?: string;
  size?: "small" | "medium" | "large";
}

export default function Loader({
  mini = false,
  message,
  minHeight = "min-h-[200px]",
  size = "medium",
}: LoaderProps) {
  const sizeMap = mini ? {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  } : {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  const t = useTranslations("common");

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div
          className={`${sizeMap[size]} rounded-full border-4 border-gray-200`}
        ></div>
        <div
          className={`${sizeMap[size]} rounded-full border-4 border-solid border-purple-600 border-t-transparent animate-spin absolute top-0`}
        ></div>
      </div>
      {!mini && <p className="text-light-text dark:text-dark-text">{message || t("loading")}</p>}
    </div>
  );

  return (
    <div
      className={`${mini ? "" : minHeight} flex items-center justify-center`}
    >
      {content}
    </div>
  );
}
