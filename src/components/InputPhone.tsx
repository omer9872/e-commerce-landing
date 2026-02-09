import type { InputProps as AntInputPhoneProps } from "antd";
import { Input as AntInputPhone } from "antd";
import { twMerge } from "tailwind-merge";
import { forwardRef, useState, useEffect } from "react";

interface InputPhoneProps
  extends Omit<AntInputPhoneProps, "className" | "onChange" | "value"> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");

  // Start with +90 prefix
  let formatted = "+90 ";

  // Add the remaining digits with formatting
  const remaining = digits.slice(2); // Skip the '90' part if it exists

  if (remaining.length > 0) {
    formatted += "(";
    formatted += remaining.slice(0, 3);
    if (remaining.length > 3) {
      formatted += ") ";
      formatted += remaining.slice(3, 6);
      if (remaining.length > 6) {
        formatted += " ";
        formatted += remaining.slice(6, 10);
      }
    } else if (remaining.length === 3) {
      formatted += ")";
    }
  }

  return formatted;
};

const cleanPhoneNumber = (value: string): string => {
  // Extract only digits
  const digits = value.replace(/\D/g, "");

  // Remove the country code (90) and add local prefix (0)
  if (digits.startsWith("90")) {
    return "0" + digits.slice(2); // Replace "90" with "0"
  }
  // If it doesn't start with 90, ensure it starts with 0
  if (digits && !digits.startsWith("0")) {
    return "0" + digits;
  }
  return digits;
};

const InputPhone = forwardRef<any, InputPhoneProps>(
  ({ className, label, error, helperText, value, onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState("");

    useEffect(() => {
      if (value !== undefined) {
        // Convert local format (0XXXXXXXXX) to international format (90XXXXXXXXX) for display
        let valueWithCountryCode = "";
        if (value) {
          if (value.startsWith("0")) {
            valueWithCountryCode = "90" + value.slice(1); // Replace "0" with "90"
          } else {
            valueWithCountryCode = "90" + value; // Add "90" prefix
          }
        }
        setDisplayValue(formatPhoneNumber(valueWithCountryCode));
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Allow deletion of the prefix
      if (inputValue.length < 4) {
        setDisplayValue("+90 ");
        onChange?.("");
        return;
      }

      // Format the input
      const formatted = formatPhoneNumber(inputValue);
      setDisplayValue(formatted);

      // Send clean value to parent
      const cleanValue = cleanPhoneNumber(inputValue);
      onChange?.(cleanValue);
    };

    const handleFocus = () => {
      if (!displayValue || displayValue === "+90 ") {
        setDisplayValue("+90 ");
      }
    };

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
        <AntInputPhone
          ref={ref}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="+90 (123) 456 7890"
          maxLength={18}
          className={twMerge(
            "w-full rounded-lg border border-solid border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          status={error ? "error" : undefined}
          {...props}
        />
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

InputPhone.displayName = "InputPhone";

export default InputPhone;
