import { useEffect, useState } from "react";
import { Spin } from "antd";

interface AuthImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageId: string;
  className?: string;
  fallback?: string;
}

export const AuthImage: React.FC<AuthImageProps> = ({
  imageId,
  className = "",
  fallback = "",
  alt = "image",
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (imageId) {
      const fetchImage = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/image/${imageId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );

          if (!response.ok) throw new Error("Failed to load image");

          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
          setError(false);
          setLoading(false);
        } catch (error) {
          console.error("Error loading image:", error);
          setError(true);
          setLoading(false);
        }
      };

      fetchImage();

      return () => {
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
      };
    }
  }, [imageId]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (error || !imageUrl) {
    return fallback ? (
      <img src={fallback} alt={alt} className={className} {...props} />
    ) : null;
  }

  return <img src={imageUrl} alt={alt} className={className} {...props} />;
};
