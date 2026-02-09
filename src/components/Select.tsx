import { Select as AntSelect, ConfigProvider } from "antd";
import type { SelectProps as AntSelectProps } from "antd";
import { twMerge } from "tailwind-merge";

import { useTheme } from "@/providers/ThemeProvider";
import { COLORS } from "@/styles/colors";

interface SelectProps extends Omit<AntSelectProps, "onChange" | "options"> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
  containerClassName?: string;
  onChange?: (value: string) => void;
}

const Select = ({
  className,
  label,
  error,
  helperText,
  options,
  onChange,
  value,
  containerClassName,
  size = "middle",
  ...props
}: SelectProps) => {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorPrimary: COLORS.primary,
            colorPrimaryHover: COLORS["light-primary"],
            colorBgContainer:
              theme === "dark"
                ? COLORS["dark-card-bg"]
                : COLORS["light-card-bg"],
            colorText:
              theme === "dark" ? COLORS["dark-text"] : COLORS["light-text"],
            colorTextDisabled:
              theme === "dark" ? COLORS.senary : COLORS.septenary,
            colorBgTextHover:
              theme === "dark" ? COLORS.quaternary : COLORS.nonary,
            colorBgTextActive:
              theme === "dark" ? COLORS.quinary : COLORS.octonary,
            colorBorder:
              theme === "dark" ? COLORS["dark-border"] : COLORS["light-border"],
            borderRadius: 6,
            controlHeight: size === "small" ? 24 : size === "large" ? 40 : 32,
            fontSize: size === "small" ? 12 : size === "large" ? 16 : 14,
            padding: size === "small" ? 4 : size === "large" ? 12 : 8,
            lineWidth: 1,
            lineType: "solid",
            colorIcon: theme === "dark" ? COLORS.nonary : COLORS["light-text"],
            colorIconHover: theme === "dark" ? COLORS.primary : COLORS.primary,
            colorTextPlaceholder:
              theme === "dark" ? COLORS["dark-text"] : COLORS["light-text"],
          },
        },
        token: {
          colorBgElevated:
            theme === "dark" ? COLORS["dark-card-bg"] : COLORS["light-card-bg"],
          colorText:
            theme === "dark" ? COLORS["dark-text"] : COLORS["light-text"],
          colorBgTextHover:
            theme === "dark" ? COLORS.quaternary : COLORS.nonary,
          colorBgTextActive:
            theme === "dark" ? COLORS.quinary : COLORS.octonary,
          colorPrimaryBg: theme === "dark" ? COLORS.quaternary : COLORS.nonary,
          colorPrimaryBgHover:
            theme === "dark" ? COLORS.quinary : COLORS.octonary,
        },
      }}
    >
      <div className={twMerge("w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={props.id}
            className={twMerge(
              "block text-sm font-medium mb-1",
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            )}
          >
            {label}
          </label>
        )}
        <AntSelect
          value={value as string}
          onChange={onChange}
          options={options}
          className={twMerge(
            "w-full [&_.ant-select-arrow]:text-light-text dark:[&_.ant-select-arrow]:text-dark-text",
            theme === "dark" && "hover:border-gray-500 focus:border-purple-500",
            error && "!border-red-500",
            className
          )}
          status={error ? "error" : undefined}
          size={size}
          {...props}
        />
        {(error || helperText) && (
          <p
            className={twMerge(
              "mt-1 text-sm",
              error
                ? "text-red-500"
                : theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    </ConfigProvider>
  );
};

Select.displayName = "Select";

export default Select;
