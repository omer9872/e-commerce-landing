"use client";

import React, { useState } from "react";

interface TextSliderProps {
  texts: string[];
  speed?: number; // Speed in seconds for one complete cycle
  pauseOnHover?: boolean;
  className?: string;
  height?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  separator?: string;
}

const TextSlider: React.FC<TextSliderProps> = ({
  texts,
  speed = 20,
  pauseOnHover = true,
  className = "",
  height = "40px",
  fontSize = "16px",
  separator = " ● ● ● ",
}) => {
  const [isPaused, setIsPaused] = useState(false);

  const duplicatedText = texts.join(separator);

  // Create the scrolling text content
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  if (!texts || texts.length === 0) {
    return null;
  }

  return (
    <div
      className={`overflow-hidden whitespace-nowrap flex align-center bg-light-card-bg dark:bg-dark-card-bg ${className}`}
      style={{
        height,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="animate-scroll text-light-text dark:text-dark-text"
        style={{
          lineHeight: height,
          fontSize,
          fontWeight: "500",
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        <p className="animate-fade-in">{duplicatedText}</p>
      </div>

      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(110%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-110%);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          1% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-scroll {
          animation: scroll-left linear infinite;
          display: inline-flex;
        }
        .animate-fade-in {
          animation: fade-in linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TextSlider;
