import { ReactNode } from "react";

interface CategoryCardProps {
  name: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export default function CategoryCard({
  name,
  description,
  icon,
  className = "",
}: CategoryCardProps) {
  return (
    <div
      className={`item-border p-6 text-center hover:scale-105 transition-all duration-300 ${className}`}
    >
      <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {name}
      </h3>
      <p>{description}</p>
    </div>
  );
}
