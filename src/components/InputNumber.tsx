import type { InputNumberProps as AntInputNumberProps } from "antd";
import { InputNumber as AntInputNumber, ConfigProvider } from "antd";
import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";
import { COLORS } from "@/styles/colors";
import { useTheme } from "@/providers/ThemeProvider";

interface InputNumberProps extends Omit<AntInputNumberProps, "className"> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

const InputNumber = forwardRef<any, InputNumberProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    const { theme } = useTheme();
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <ConfigProvider
          theme={{
            components: {
              InputNumber: {
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
                colorTextPlaceholder:
                  theme === "dark" ? COLORS.senary : COLORS.septenary,
                colorBorder:
                  theme === "dark"
                    ? COLORS["dark-border"]
                    : COLORS["light-border"],
                borderRadius: 6,
                lineWidth: 1,
                lineType: "solid",
                handleHoverColor:
                  theme === "dark" ? COLORS["dark-text"] : COLORS["light-text"],
                handleBorderColor:
                  theme === "dark"
                    ? COLORS["dark-border"]
                    : COLORS["light-border"],
              },
            },
          }}
        >
          <AntInputNumber
            ref={ref}
            className={twMerge(
              "w-full",
              theme === "dark" &&
                "hover:border-gray-500 focus:border-purple-500",
              error && "!border-red-500",
              className
            )}
            status={error ? "error" : undefined}
            {...props}
          />
        </ConfigProvider>
        {(error || helperText) && (
          <p
            className={`mt-1 text-sm ${
              error ? "text-red-500" : "text-gray-500"
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

InputNumber.displayName = "InputNumber";

export default InputNumber;
