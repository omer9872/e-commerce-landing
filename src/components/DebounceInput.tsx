"use client";

import { useEffect, useImperativeHandle, useRef, useState } from "react";
import debounce from "lodash/debounce";
import Input from "@/components/Input";
import React from "react";

interface DebounceInputProps extends React.ComponentProps<typeof Input> {
  onDebounceChange?: (value: string) => void;
  debounceTime?: number;
  initialValue?: string;
}

export interface DebounceInputRef {
  clearInput: () => void;
  setValue: (value: string) => void;
}

export const DebounceInput = React.forwardRef(
  (
    {
      onDebounceChange,
      debounceTime = 500,
      initialValue = "",
      value: controlledValue,
      onChange: controlledOnChange,
      ...props
    }: DebounceInputProps,
    ref: React.Ref<DebounceInputRef>
  ) => {
    const [inputValue, setInputValue] = useState(initialValue);

    // Create a memoized debounced function using useRef to maintain the same function instance
    const debouncedFn = useRef(
      debounce((value: string) => {
        onDebounceChange?.(value);
      }, debounceTime)
    ).current;

    // Handle controlled and uncontrolled value
    const value = controlledValue !== undefined ? controlledValue : inputValue;

    // Cleanup debounced function on unmount
    useEffect(() => {
      return () => {
        debouncedFn.cancel();
      };
    }, [debouncedFn]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      controlledOnChange?.(e);
      debouncedFn(newValue);
    };

    useImperativeHandle(ref, () => ({
      clearInput: () => {
        setInputValue("");
      },
      setValue: (value: string) => {
        setInputValue(value);
      },
    }));

    return (
      <Input
        {...props}
        value={value}
        onChange={handleChange}
        className={`${props.className || ""}`}
      />
    );
  }
);
