import React from "react";

interface CheckCircleIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const CheckCircleIcon = React.forwardRef<SVGSVGElement, CheckCircleIconProps>(
  ({ size = 24, className = "", ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`size-${size} ${className}`}
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    );
  }
);

CheckCircleIcon.displayName = "CheckCircleIcon";
