"use client";

import { Modal as AntModal, ConfigProvider } from "antd";
import type { ModalProps as AntModalProps } from "antd";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

import { useTheme } from "@/providers/ThemeProvider";
import { COLORS } from "@/styles/colors";

export interface ModalProps
  extends Omit<AntModalProps, "className" | "footer"> {
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  size?: "small" | "middle" | "large";
  showCloseIcon?: boolean;
  centered?: boolean;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  footer?: ReactNode;
}

function Modal({
  className,
  containerClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  size = "middle",
  showCloseIcon = true,
  centered = true,
  maskClosable = true,
  destroyOnClose = true,
  width,
  footer,
  ...props
}: ModalProps) {
  const { theme } = useTheme();

  const getModalWidth = () => {
    if (width) return width;
    switch (size) {
      case "small":
        return 480;
      case "large":
        return 800;
      default:
        return 640;
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            colorPrimary: COLORS.primary,
            colorPrimaryHover: COLORS["light-primary"],
            colorBgElevated:
              theme === "dark"
                ? COLORS["dark-card-bg"]
                : COLORS["light-card-bg"],
            colorText:
              theme === "dark" ? COLORS["dark-text"] : COLORS["light-text"],
            colorTextHeading:
              theme === "dark" ? COLORS["dark-text"] : COLORS["light-text"],
            colorTextSecondary:
              theme === "dark" ? COLORS.senary : COLORS.septenary,
            colorIcon:
              theme === "dark" ? COLORS["dark-text"] : COLORS["light-text"],
            colorIconHover: COLORS.primary,
            borderRadius: 8,
            borderRadiusLG: 12,
            padding: size === "small" ? 16 : size === "large" ? 24 : 20,
            paddingLG: size === "large" ? 24 : 20,
            fontSize: size === "small" ? 14 : size === "large" ? 16 : 15,
            lineWidth: 1,
            lineType: "solid",
            contentBg:
              theme === "dark"
                ? COLORS["dark-card-bg"]
                : COLORS["light-card-bg"],
            headerBg:
              theme === "dark"
                ? COLORS["dark-card-bg"]
                : COLORS["light-card-bg"],
            footerBg:
              theme === "dark"
                ? COLORS["dark-card-bg"]
                : COLORS["light-card-bg"],
          },
        },
      }}
    >
      <AntModal
        className={twMerge(
          "custom-modal",
          theme === "dark" && "dark-modal",
          className
        )}
        wrapClassName={twMerge(
          "custom-modal-wrapper",
          theme === "dark" && "dark-modal-wrapper",
          containerClassName
        )}
        title={
          props.title && (
            <div
              className={twMerge(
                "text-lg font-semibold",
                theme === "dark" ? "text-dark-text" : "text-light-text",
                headerClassName
              )}
            >
              {props.title}
            </div>
          )
        }
        width={getModalWidth()}
        centered={centered}
        maskClosable={maskClosable}
        destroyOnClose={destroyOnClose}
        closeIcon={showCloseIcon ? undefined : false}
        modalRender={(modal) => (
          <div
            className={twMerge(
              "rounded-lg overflow-hidden item-border",
              theme === "dark" ? "bg-dark-card-bg" : "bg-light-card-bg",
              bodyClassName
            )}
          >
            {modal}
          </div>
        )}
        footer={
          footer && (
            <div
              className={twMerge(
                "flex justify-end gap-2 border-t",
                theme === "dark"
                  ? "border-t-dark-border"
                  : "border-t-light-border",
                footerClassName
              )}
            >
              {footer}
            </div>
          )
        }
        maskStyle={{
          backgroundColor:
            theme === "dark" ? "rgba(0, 0, 0, 0.75)" : "rgba(0, 0, 0, 0.45)",
        }}
        {...props}
      />
    </ConfigProvider>
  );
}

export default Modal;
