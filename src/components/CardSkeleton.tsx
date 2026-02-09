"use client";

import { PropsWithChildren } from "react";
import Container from "./Container";

interface CardSkeletonProps extends PropsWithChildren {
  cardCount?: number
  containerClassName?: string
}
const CardSkeleton = ({
  cardCount = 8,
  containerClassName,
}: CardSkeletonProps) => {
  return (
    <Container className={containerClassName}>
      <div className="animate-pulse space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(cardCount)].map((_, i) => (
            <div
              key={i}
              className="bg-light-border dark:bg-dark-border rounded-lg h-96"
            ></div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CardSkeleton;
CardSkeleton.displayName = "CardSkeleton";