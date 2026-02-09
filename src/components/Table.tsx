"use client";

import { Table as AntTable, ConfigProvider } from "antd";
import type { TableProps as AntTableProps } from "antd";
import { twMerge } from "tailwind-merge";

import { useTheme } from "@/providers/ThemeProvider";
import { COLORS } from "@/styles/colors";

export interface TableProps<T> extends Omit<AntTableProps<T>, "className"> {
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
  rowClassName?: string | ((record: T, index: number) => string);
  cellClassName?: string;
  paginationClassName?: string;
  size?: "small" | "middle" | "large";
  loading?: boolean;
  bordered?: boolean;
  striped?: boolean;
  showPagination?: boolean;
}

function Table<T extends object>({
  className,
  containerClassName,
  headerClassName,
  rowClassName,
  cellClassName,
  paginationClassName,
  size = "middle",
  loading = false,
  bordered = false,
  striped = false,
  showPagination = true,
  pagination,
  ...props
}: TableProps<T>) {
  const { theme } = useTheme();

  const getRowClassName = (record: T, index: number): string => {
    const baseClassName =
      typeof rowClassName === "function"
        ? rowClassName(record, index)
        : rowClassName || "";

    if (!striped) return baseClassName;

    return twMerge(
      baseClassName,
      index % 2 === 1 ? (theme === "dark" ? "bg-gray-800" : "bg-gray-50") : ""
    );
  };

  const defaultPagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `Total ${total} items`,
    className: twMerge(
      "mt-4",
      theme === "dark" && "text-dark-text",
      paginationClassName
    ),
    ...pagination,
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            borderColor: theme === "dark" ? COLORS["dark-border"] : COLORS["light-border"],
            colorBgContainer: "transparent",
            colorPrimary: COLORS.primary,
            colorPrimaryHover: COLORS["light-primary"],
            colorText:
              theme === "dark" ? COLORS["dark-text"] : COLORS["light-text"],
            colorTextHeading:
              theme === "dark" ? COLORS["dark-text"] : COLORS["light-text"],
            colorBorder:
              theme === "dark" ? COLORS["dark-border"] : COLORS["light-border"],
            borderRadius: 6,
            fontSize: size === "small" ? 12 : size === "large" ? 16 : 14,
            padding: size === "small" ? 8 : size === "large" ? 16 : 12,
            lineWidth: 1,
            lineType: "solid",
            headerBg:
              theme === "dark"
                ? COLORS["dark-card-bg"]
                : COLORS["light-card-bg"],
            headerColor:
              theme === "dark" ? COLORS["dark-text"] : COLORS["light-text"],
            headerSplitColor:
              theme === "dark" ? COLORS["dark-border"] : COLORS["light-border"],
            rowHoverBg: theme === "dark" ? COLORS["dark-card-bg"] : COLORS["light-card-bg"],
            rowSelectedBg: theme === "dark" ? COLORS["dark-card-bg"] : COLORS["light-card-bg"],
            rowSelectedHoverBg:
              theme === "dark" ? COLORS["dark-card-bg"] : COLORS["light-card-bg"],
            rowExpandedBg:
              theme === "dark"
                ? COLORS["dark-card-bg"]
                : COLORS["light-card-bg"],
            cellPaddingBlock: size === "small" ? 4 : size === "large" ? 12 : 8,
            cellPaddingInline:
              size === "small" ? 8 : size === "large" ? 16 : 12,
          },
          Pagination: {
            colorPrimary: COLORS.primary,
            colorPrimaryHover: COLORS["light-primary"],
            colorBgContainer: theme === "dark" ? COLORS["dark-card-bg"] : COLORS["light-card-bg"],
            colorText: theme === "dark" ? COLORS["dark-text"] : COLORS["light-text"],
            colorTextDisabled: theme === "dark" ? COLORS["dark-text-disabled"] : COLORS["light-text-disabled"],
            colorBgTextHover: theme === "dark" ? COLORS["dark-bg-disabled"] : COLORS["light-bg-disabled"],
            colorBgTextActive: theme === "dark" ? COLORS["dark-bg-disabled"] : COLORS["light-bg-disabled"],
            colorBorder: theme === "dark" ? COLORS["dark-border"] : COLORS["light-border"],
            borderRadius: 6,
            fontSize: size === "small" ? 12 : size === "large" ? 16 : 14,
            padding: size === "small" ? 4 : size === "large" ? 12 : 8,
            lineWidth: 1,
            lineType: "solid",
            itemSize: size === "small" ? 24 : size === "large" ? 40 : 32,
            controlHeight: size === "small" ? 24 : size === "large" ? 40 : 32,
            controlHeightLG: size === "large" ? 40 : 32,
            controlHeightSM: size === "small" ? 24 : 32,
          },
        },
      }}
    >
      <div className={twMerge("w-full overflow-x-auto", containerClassName)}>
        <AntTable<T>
          className={twMerge(
            "w-full",
            theme === "dark" && "bg-dark-card-bg text-dark-text",
            striped && "striped-table",
            className
          )}
          size={size}
          loading={loading}
          bordered={bordered}
          rowClassName={getRowClassName}
          onRow={(record, index) => ({
            className: twMerge("transition-colors duration-200", cellClassName),
          })}
          components={{
            header: {
              cell: (props: any) => (
                <th
                  {...props}
                  className={twMerge(
                    "font-semibold",
                    theme === "dark" ? "bg-dark-card-bg" : "bg-light-card-bg",
                    headerClassName
                  )}
                />
              ),
            },
          }}
          pagination={showPagination ? defaultPagination : false}
          {...props}
        />
      </div>
    </ConfigProvider>
  );
}

export default Table;
