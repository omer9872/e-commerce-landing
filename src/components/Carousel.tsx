"use client";

import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export type CarouselEffect =
  | "slide"
  | "fade"
  | "coverflow"
  | "cube"
  | "flip"
  | "creative";

export interface CarouselBreakpoint {
  slidesPerView?: number;
  spaceBetween?: number;
}

export interface CarouselProps {
  // Content
  items: ReactNode[];

  // Basic settings
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  loop?: boolean;
  centeredSlides?: boolean;

  // Navigation
  navigation?: boolean;
  pagination?: boolean;
  scrollbar?: boolean;

  // Autoplay
  autoplay?: boolean;

  // Effects
  effect?: CarouselEffect;

  // Responsive breakpoints
  breakpoints?: Record<number, CarouselBreakpoint>;

  // Styling
  className?: string;
  height?: string | number;

  // Advanced settings
  speed?: number;
  direction?: "horizontal" | "vertical";
  grabCursor?: boolean;

  // Events
  onSlideChange?: (swiper: any) => void;
  onSwiper?: (swiper: any) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  slidesPerView = 1,
  spaceBetween = 20,
  loop = false,
  centeredSlides = false,
  navigation = true,
  pagination = true,
  scrollbar = false,
  autoplay = false,
  effect = "slide",
  breakpoints,
  className = "",
  height,
  speed = 500,
  direction = "horizontal",
  grabCursor = true,
  onSlideChange,
  onSwiper,
}) => {
  // Configure modules based on props
  const modules = [A11y];

  if (navigation) modules.push(Navigation);
  if (pagination) modules.push(Pagination);
  if (scrollbar) modules.push(Scrollbar);
  if (autoplay) modules.push(Autoplay);

  // Default responsive breakpoints - ensures slides don't overlap
  const getDefaultBreakpoints = () => {
    // Fade effect should always use slidesPerView: 1
    if (effect === "fade" || effect === "cube" || effect === "flip") {
      return {
        320: { slidesPerView: 1, spaceBetween: 0 },
        768: { slidesPerView: 1, spaceBetween: 0 },
        1024: { slidesPerView: 1, spaceBetween: 0 },
        1280: { slidesPerView: 1, spaceBetween: 0 },
      };
    }

    // Auto slidesPerView
    if (slidesPerView === "auto") {
      return {
        320: {
          slidesPerView: "auto" as const,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: "auto" as const,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: "auto" as const,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: "auto" as const,
          spaceBetween: spaceBetween,
        },
      };
    }

    // Regular responsive breakpoints
    return {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView:
          typeof slidesPerView === "number" ? Math.min(2, slidesPerView) : 2,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView:
          typeof slidesPerView === "number" ? Math.min(3, slidesPerView) : 3,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: slidesPerView,
        spaceBetween: spaceBetween,
      },
    };
  };

  const defaultBreakpoints = getDefaultBreakpoints();

  const containerStyle: React.CSSProperties = {
    height: height || "auto",
  };

  return (
    <div
      className={`carousel-container relative ${className}`}
      style={containerStyle}
    >
      <Swiper
        effect={effect}
        speed={speed}
        direction={direction}
        modules={modules}
        grabCursor={grabCursor}
        loop={loop}
        centeredSlides={centeredSlides}
        breakpoints={breakpoints ?? defaultBreakpoints}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          type: "progressbar",
        }}
        autoplay={autoplay}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>{item}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
