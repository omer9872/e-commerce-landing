"use client";

import { Input, ConfigProvider } from "antd";
import { TextAreaProps } from "antd/es/input";
import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";

import { useTheme } from "@/providers/ThemeProvider";
import { COLORS } from "@/styles/colors";

const { TextArea: AntTextArea } = Input;

export interface TextareaProps extends TextAreaProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  size?: "small" | "middle" | "large";
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      className = "",
      containerClassName,
      size = "middle",
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();

    return (
      <ConfigProvider
        theme={{
          components: {
            Input: {
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
              controlHeight: size === "small" ? 24 : size === "large" ? 40 : 32,
              fontSize: size === "small" ? 12 : size === "large" ? 16 : 14,
              padding: size === "small" ? 4 : size === "large" ? 12 : 8,
              lineWidth: 1,
              lineType: "solid",
            },
          },
        }}
      >
        <div className={twMerge("w-full", containerClassName)}>
          {label && (
            <label
              className={twMerge(
                "block text-sm font-medium mb-1",
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              )}
            >
              {label}
            </label>
          )}
          <AntTextArea
            ref={ref}
            className={twMerge(
              "w-full",
              theme === "dark" &&
                "hover:border-gray-500 focus:border-purple-500",
              error && "!border-red-500",
              className
            )}
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
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
