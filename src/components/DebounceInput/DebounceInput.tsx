"use client";

import React, { useCallback, useRef, useState } from "react";
import { Input } from "antd";
import debounce from "lodash/debounce";

interface DebounceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

const DebounceInput: React.FC<DebounceInputProps> = ({
  value,
  onChange,
  placeholder,
  className,
  style,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedOnChange = useRef(
    debounce((value: string) => {
      onChange(value);
    }, 500)
  ).current;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      debouncedOnChange(newValue);
    },
    [debouncedOnChange]
  );

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  React.useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <Input
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      style={style}
    />
  );
};

export default DebounceInput;
