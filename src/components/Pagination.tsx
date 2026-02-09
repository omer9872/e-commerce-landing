import { Pagination as AntPagination, ConfigProvider } from "antd";
import { useTheme } from "@/providers/ThemeProvider";

interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  showTotal?: (total: number, range: [number, number]) => string;
  className?: string;
}

export default function Pagination({
  current,
  pageSize,
  total,
  onChange,
  showSizeChanger = false,
  showTotal,
  className,
}: PaginationProps) {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            colorPrimary: theme === "dark" ? "#8B5CF6" : "#8B5CF6", // purple-500
            colorPrimaryHover: theme === "dark" ? "#A78BFA" : "#A78BFA", // purple-400
            colorBgContainer: theme === "dark" ? "#1F2937" : "#FFFFFF", // gray-800 : white
            colorText: theme === "dark" ? "#F3F4F6" : "#1F2937", // gray-100 : gray-800
            colorTextDisabled: theme === "dark" ? "#6B7280" : "#9CA3AF", // gray-500 : gray-400
            colorBgTextHover: theme === "dark" ? "#374151" : "#F3F4F6", // gray-700 : gray-100
            colorBgTextActive: theme === "dark" ? "#4B5563" : "#E5E7EB", // gray-600 : gray-200
            borderRadius: 6,
            controlHeight: 32,
            fontSize: 14,
            itemSize: 32,
            lineWidth: 1,
            lineType: "solid",
            margin: 8,
            padding: 4,
          },
        },
      }}
    >
      <AntPagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={showSizeChanger}
        showTotal={showTotal}
        className={className}
      />
    </ConfigProvider>
  );
} 