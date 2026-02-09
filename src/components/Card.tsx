import { useTheme } from "@/providers/ThemeProvider";
import { twMerge } from "tailwind-merge";

interface CardProps {
  image?: {
    src: string;
    alt: string;
  };
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
}

export default function Card({
  image,
  title,
  subtitle,
  description,
  className,
  imageClassName,
  contentClassName,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
}: CardProps) {
  const { theme } = useTheme();

  return (
    <div
      className={twMerge(
        "item-border overflow-hidden",
        theme === "dark" ? "bg-dark-card-bg" : "bg-light-card-bg",
        className
      )}
    >
      {image && (
        <div className="aspect-w-1 aspect-h-1">
          <div
            className={twMerge(
              "w-full h-64",
              theme === "dark" ? "bg-gray-700" : "bg-gray-200",
              imageClassName
            )}
          >
            {/* TODO: Add proper image component */}
            {/* <Image src={image.src} alt={image.alt} className="object-cover" /> */}
          </div>
        </div>
      )}
      <div className={twMerge("p-6", contentClassName)}>
        <h3
          className={twMerge(
            "text-xl font-semibold",
            theme === "dark" ? "text-dark-text" : "text-light-text",
            titleClassName
          )}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            className={twMerge(
              "text-purple-600 mb-2",
              theme === "dark" ? "text-purple-400" : "text-purple-600",
              subtitleClassName
            )}
          >
            {subtitle}
          </p>
        )}
        {description && (
          <p
            className={twMerge(
              theme === "dark" ? "text-gray-300" : "text-gray-600",
              descriptionClassName
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
