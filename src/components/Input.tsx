"use client";

import type { InputProps as AntInputProps } from "antd";
import { Input as AntInput, ConfigProvider } from "antd";
import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";

import { useTheme } from "@/providers/ThemeProvider";
import { COLORS } from "@/styles/colors";

interface InputProps extends Omit<AntInputProps, "className"> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  containerClassName?: string;
  size?: "small" | "middle" | "large";
}

const Input = forwardRef<any, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
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
              htmlFor={props.id}
              className={twMerge(
                "block text-sm font-medium mb-1",
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              )}
            >
              {label}
            </label>
          )}
          <AntInput
            ref={ref}
            className={twMerge(
              "w-full",
              theme === "dark" &&
                "hover:border-gray-500 focus:border-purple-500",
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
  }
);

Input.displayName = "Input";

export default Input;
