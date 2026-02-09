import { Rate as AntRate, ConfigProvider } from "antd";

import { useTheme } from "@/providers/ThemeProvider";

interface RateProps {
  value?: number;
  disabled?: boolean;
  allowHalf?: boolean;
  className?: string;
  onChange?: (value: number) => void;
}

export default function Rate({
  value,
  disabled = false,
  allowHalf = false,
  className,
  onChange,
}: RateProps) {
  const { theme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        components: {
          Rate: {
            starBg: theme === "dark" ? "#e6e6e6" : "#e6e6e6",
            starColor: theme === "dark" ? "#FFD700" : "#FFD700",
          },
        },
      }}
    >
      <AntRate
        value={value}
        disabled={disabled}
        allowHalf={allowHalf}
        onChange={onChange}
        className={className}
      />
    </ConfigProvider>
  );
}
