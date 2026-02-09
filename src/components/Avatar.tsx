import { IUser } from "@/types/user";
import { useState } from "react";
import Image from "next/image";

interface AvatarProps {
  user?: IUser | null;
  size?: "sm" | "md" | "lg";
  className?: string;
  rounded?: boolean;
}

const sizeClasses = {
  sm: "h-8 w-8 text-sm",
  md: "h-12 w-12 text-lg",
  lg: "h-20 w-20 text-2xl",
};

export function Avatar({
  user,
  size = "md",
  className = "",
  rounded = true,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const sizeClass = sizeClasses[size];

  if (user?.image && !imageError) {
    return (
      <div
        className={`${sizeClass} ${
          rounded ? "rounded-full" : "rounded-sm"
        } overflow-hidden relative ${className}`}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/user/image/${user.image}`}
          alt={`${user.firstName} ${user.lastName}`}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} ${
        rounded ? "rounded-full" : "rounded-sm"
      } bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold ${className}`}
    >
      {user?.firstName?.[0]}
      {user?.lastName?.[0]}
    </div>
  );
}
