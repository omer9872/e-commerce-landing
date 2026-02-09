"use client";

import { twMerge } from "tailwind-merge";
import { useTheme } from "@/providers/ThemeProvider";
import { COLORS } from "@/styles/colors";

interface DescriptionsItem {
  label: string;
  content: React.ReactNode;
}

interface DescriptionsProps {
  items: DescriptionsItem[];
  className?: string;
  containerClassName?: string;
  bordered?: boolean;
  column?: number;
  size?: "small" | "default" | "large";
  title?: React.ReactNode;
}

const Descriptions = ({
  items,
  className,
  containerClassName,
  bordered = true,
  column = 1,
  size = "default",
  title,
}: DescriptionsProps) => {
  const { theme } = useTheme();

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "text-sm p-2";
      case "large":
        return "text-base p-4";
      default:
        return "text-sm p-3";
    }
  };

  const getBorderClasses = () => {
    if (!bordered) return "";

    return `border border-solid border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden`;
  };

  const getBackgroundClasses = () => {
    return theme === "dark" ? "bg-dark-card-bg" : "bg-light-card-bg";
  };

  const getTextClasses = () => {
    return theme === "dark" ? "text-dark-text" : "text-light-text";
  };

  const getLabelBackgroundClasses = () => {
    return theme === "dark" ? "bg-dark-card-bg" : "bg-light-card-bg";
  };

  const getBorderRightClasses = () => {
    if (!bordered) return "";
    const borderColor =
      theme === "dark" ? COLORS["dark-border"] : COLORS["light-border"];
    return `border-r-2 border-[${borderColor}]`;
  };

  const getBorderBottomClasses = () => {
    if (!bordered) return "";
    const borderColor =
      theme === "dark" ? COLORS["dark-border"] : COLORS["light-border"];
    return `border-b border-[${borderColor}]`;
  };

  return (
    <div className={twMerge("w-full", containerClassName)}>
      {title && (
        <div className={twMerge("mb-3 font-medium", getTextClasses())}>
          {title}
        </div>
      )}

      <div
        className={twMerge(
          "w-full",
          getBorderClasses(),
          getBackgroundClasses(),
          className
        )}
      >
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${column}, 1fr)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={twMerge(
                "flex",
                bordered && getBorderRightClasses(),
                bordered && getBorderBottomClasses(),
                index % column === column - 1 && bordered && "border-r-0",
                Math.floor(index / column) ===
                Math.floor((items.length - 1) / column) &&
                bordered &&
                "border-b-0"
              )}
            >
              <div
                className={twMerge(
                  "min-w-[175px] flex flex-shrink-0 font-medium items-center",
                  getSizeClasses(),
                  getLabelBackgroundClasses(),
                  getTextClasses(),
                  bordered && "border-b-0 border-t border-l-0 border-r border-solid border-gray-200 dark:border-gray-600",
                  index === 0 && bordered && "border-t-0"
                )}
              >
                {item.label}
              </div>
              <div
                className={twMerge(
                  "flex-1",
                  getSizeClasses(),
                  getTextClasses(),
                  bordered && "border-b-0 border-t border-l-0 border-r border-solid border-gray-200 dark:border-gray-600",
                  index === 0 && bordered && "border-t-0"
                )}
              >
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Descriptions;
