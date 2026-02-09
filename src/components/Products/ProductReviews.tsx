"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Rate, Pagination, Empty } from "antd";
import Image from "next/image";
import dayjs from "dayjs";

import { IProductReview } from "@/types/productReview";
import axios from "@/lib/axios";
import EmptyData from "../EmptyData";

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const t = useTranslations("product");
  const [reviews, setReviews] = useState<IProductReview[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `/product-review-public/product/${productId}`,
          {
            params: {
              page: currentPage - 1,
              limit: 5,
            },
          }
        );
        setReviews(response.data.data);
        setTotalReviews(response.data.total);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId, currentPage]);

  return (
    <div className="my-4">
      <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-3">
        {t("customerReviews")}
      </h2>
      {reviews.length > 0 ? (
        <>
          <div>
            {reviews.map((review) => (
              <div
                key={review._id}
                className="item-border p-5"
              >
                <div className="flex flex-col items-start gap-2 mb-2">
                  <Rate disabled value={review.rating} />
                  <div className="text-light-text dark:text-dark-text flex items-center gap-2">
                    <p>
                      {review.user.firstName.slice(0, 1).toUpperCase()}.{" "}
                      {review.user.lastName.slice(0, 1).toUpperCase()}.
                    </p>
                    <p>-</p>
                    <p>{dayjs(review.createdAt).format("DD MMMM YYYY")}</p>
                  </div>
                </div>
                {review.comment && (
                  <p className="text-light-text dark:text-dark-text mt-4">
                    {review.comment}
                  </p>
                )}
                {review.images && review.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {review.images.map((image: string, index: number) => (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-lg"
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}/product-review/image/${image}`}
                          alt={`Review image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 25vw, 12vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {totalReviews > 5 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                current={currentPage}
                total={totalReviews}
                pageSize={5}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </>
      ) : (
        <EmptyData
          className="h-full item-border p-5"
          message={t("noReviews")}
        />
      )}
    </div>
  );
};
