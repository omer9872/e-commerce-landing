import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Link from "next/link";

import { ProductCard } from "@/components/ProductCard";
import { listProduct } from "@/services/product";
import { IProduct } from "@/types/product";
import Button from "@/components/Button";

interface FeaturedProductsSectionProps {}

export default function FeaturedProductsSection(
  props: FeaturedProductsSectionProps
) {
  const t = useTranslations("home.featuredProducts");
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await listProduct();
      setProducts(products.data);
    };
    fetchProducts();
  }, []);

  return (
    products.length > 0 && (
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(products ?? []).slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button>{t("viewAll")}</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
}
