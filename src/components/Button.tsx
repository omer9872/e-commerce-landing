import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import Loader from "./Loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
  | "primary"
  | "primary-outline"
  | "secondary"
  | "outline"
  | "ghost"
  | "gray"
  | "gray-outline"
  | "danger"
  | "danger-outline"
  | "danger-text"
  | "text";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shape?: "circle" | "default";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      shape = "default",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "active:opacity-75 cursor-pointer inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none ring-0 ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border-none";

    const variants = {
      primary: "bg-primary text-white hover:bg-primary/80",
      "primary-outline":
        "border-2 border-solid border-primary text-primary bg-primary/10",
      secondary: "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300",
      outline: "border-2 border-primary text-primary hover:bg-primary/10",
      ghost: "text-primary hover:bg-primary/10",
      gray: "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300",
      "gray-outline":
        "border-2 border-solid border-gray-200 text-gray-900 bg-gray-100",
      danger: "bg-red-600 text-white hover:bg-red-700",
      "danger-outline":
        "border-2 border-solid border-red-600 text-red-600 bg-red-100",
      text: "text-primary !p-0 bg-transparent rounded-none !outline-none !ring-0",
      "danger-text":
        "text-red-600 !p-0 bg-transparent rounded-none !outline-none !ring-0",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    const shapes = {
      circle: "rounded-full px-4 py-4",
      default: "rounded-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          baseStyles,
          variants[variant],
          sizes[size],
          shapes[shape],
          className
        )}
        {...props}
        type={props.type || "button"}
      >
        {isLoading && (
          <Loader size="small" mini />
        )}
        {!isLoading && leftIcon && <span className={children ? "mr-2" : ""}>{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className={children ? "ml-2" : ""}>{rightIcon}</span>}
      </button >
    );
  }
);

Button.displayName = "Button";

export default Button;
