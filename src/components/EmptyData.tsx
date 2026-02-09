import { useTranslations } from "next-intl";
import { Empty } from "antd";

import { useTheme } from "@/providers/ThemeProvider";
import { FolderIcon } from "@/icons/Folder";

interface EmptyDataProps {
  message?: string;
  className?: string;
}

export default function EmptyData({ message, className }: EmptyDataProps) {
  const t = useTranslations("");
  const { theme } = useTheme();
  return (
    <div
      className={`w-full py-8 item-border ${className}`}
    >
      <Empty
        description={
          <span className="text-light-text dark:text-dark-text">
            {message || t("common.noData")}
          </span>
        }
        image={<FolderIcon theme={theme} className="w-20 h-8" />}
      />
    </div>
  );
}
