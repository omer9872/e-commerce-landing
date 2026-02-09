"use client";

import { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string
}
const Container = ({
  size = "lg",
  className,
  children
}: ContainerProps) => {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-9xl",
    full: "w-full",
  };
  return (
    <div className={`${sizes[size]} mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
Container.displayName = "Container";