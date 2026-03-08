"use client";

import {
  ShoppingCartOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { useFavorites } from "@/providers/FavoritesProvider";
import currencyFormatter from "@/utils/currencyFormatter";
import { useCart } from "@/providers/CartProvider";
import { useAuth } from "@/providers/AuthProvider";
import { IProduct } from "@/types/product";
import { PhotoIcon } from "@/icons/Photo";
import Button from "@/components/Button";
import Rate from "@/components/Rate";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const t = useTranslations("components.productCard");
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { items, addToCart } = useCart();
  const {
    items: favorites,
    addToFavorites,
    removeFromFavorites,
  } = useFavorites();

  const isInCart = items.some((item) => item.product._id === product._id);
  const cartItems = items.filter((item) => item.product._id === product._id);
  const isInFavorites = favorites.some((fav) => fav?._id === product._id);

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error(t("loginToAddToCart"));
      return;
    }
    if (isInCart) {
      router.push(`/products/${product._id}`);
    } else {
      const pVariants = product.variants ?? [];
      if (pVariants.length > 1) {
        router.push(`/products/${product._id}`);
      } else {
        if (pVariants[0]?.sku) {
          addToCart(product, pVariants[0].sku, 1);
        }
      }
    }
  };

  const handleFavoritesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error(t("loginToAddToFavorites"));
      return;
    }
    if (isInFavorites) {
      removeFromFavorites(product._id);
    } else {
      addToFavorites(product);
    }
  };

  const getFirstVariantPrice = () => {
    const pVariants = product.variants ?? [];
    if (pVariants.length > 1) {
      return pVariants[0].price;
    }
    return 0;
  };

  return (
    <div
      onClick={() => {
        router.push(`/products/${product._id}`);
      }}
      className="flex flex-col cursor-pointer group item-border relative duration-300 overflow-hidden"
    >
      <div className="h-[245px] aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-light-card-bg dark:bg-dark-card-bg">
        {product.images[0] ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/product-public/image/${product.images[0]}`}
            alt={product.name}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <PhotoIcon className="w-24 h-24 text-gray-400 dark:text-gray-500" />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1 item-border-top">
        <div className="flex-1 flex flex-col gap-1 justify-between items-start">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {product.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Rate disabled value={product.averageRating} />
            {typeof product.reviewCount === "number" && (
              <span className="text-sm text-gray-500 dark:text-gray-200">
                ({product.reviewCount})
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {currencyFormatter.format(getFirstVariantPrice())}
            </p>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleFavoritesClick}
                variant={isInFavorites ? "danger" : "gray-outline"}
                className="!p-2 dark:border-gray-600 dark:hover:border-gray-500"
              >
                {isInFavorites ? (
                  <HeartFilled className="text-lg text-white" />
                ) : (
                  <HeartOutlined className="text-lg text-gray-500 dark:text-gray-400" />
                )}
              </Button>
              <Button
                onClick={handleCartClick}
                variant={isInCart ? "danger-outline" : "primary-outline"}
                className="!p-2"
              >
                {isInCart ? (
                  <DeleteOutlined className="text-lg" />
                ) : (
                  <ShoppingCartOutlined className="text-lg" />
                )}
              </Button>
            </div>
          </div>
          <div className="h-6">
            {isInCart && (
              <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                {t("inCart", {
                  count: (cartItems ?? []).reduce(
                    (acc, item) => acc + item.quantity,
                    0
                  ),
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
