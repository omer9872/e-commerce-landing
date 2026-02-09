"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";

import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { listStory } from "@/services/story.service";
import Button from "@/components/Button";
import { IStory } from "@/types/story";

interface StoriesSectionProps {
  className?: string;
}

export default function StoriesSection({
  className = "",
}: StoriesSectionProps) {
  const [stories, setStories] = useState<IStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<IStory | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await listStory({ page: 0, limit: 20 });
        setStories(response.data.filter((story) => story.isActive));
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const openStoryModal = (story: IStory, index: number) => {
    setSelectedStory(story);
    setCurrentStoryIndex(index);
  };

  const closeStoryModal = () => {
    setSelectedStory(null);
  };

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      const nextIndex = currentStoryIndex + 1;
      setCurrentStoryIndex(nextIndex);
      setSelectedStory(stories[nextIndex]);
    } else {
      closeStoryModal();
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      const prevIndex = currentStoryIndex - 1;
      setCurrentStoryIndex(prevIndex);
      setSelectedStory(stories[prevIndex]);
    }
  };

  if (loading) {
    return (
      <section className={`${className}`}>
        <div className="container mx-auto px-4">
          <div className="flex space-x-4 justify-center overflow-hidden">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!stories.length) {
    return null;
  }

  return (
    <>
      <section className={`w-fit mx-auto ${className}`}>
        <div className="container mx-auto px-4">
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView="auto"
              navigation={{
                prevEl: ".stories-prev",
                nextEl: ".stories-next",
              }}
              className="stories-swiper"
            >
              {stories.map((story, index) => (
                <SwiperSlide key={story._id} className="!w-auto">
                  <div
                    className="relative cursor-pointer group"
                    onClick={() => openStoryModal(story, index)}
                  >
                    {/* Story Ring */}
                    <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                      <div className="w-full h-full rounded-full p-0.5 bg-white dark:bg-gray-900">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/image/${story.image}`}
                            alt="Story"
                            width={76}
                            height={76}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <Button
              variant="text"
              className="!p-2 stories-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <LeftOutlined className="text-md text-gray-600 dark:text-gray-300" />
            </Button>
            <Button
              variant="text"
              className="!p-2 stories-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <RightOutlined className="text-md text-gray-600 dark:text-gray-300" />
            </Button>
          </div>
        </div>
      </section>

      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative max-w-md w-full mx-4">
            {/* Progress Bars */}
            <div className="absolute top-4 left-4 right-4 z-10 flex space-x-1">
              {stories.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-0.5 bg-white bg-opacity-30 rounded-full overflow-hidden"
                >
                  <div
                    className={`h-full bg-white transition-all duration-300 ${
                      index < currentStoryIndex
                        ? "w-full"
                        : index === currentStoryIndex
                        ? "w-full"
                        : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Close Button */}
            <Button
              onClick={closeStoryModal}
              variant="gray-outline"
              className="absolute top-8 right-4 z-10 !px-1 !py-1"
            >
              <CloseOutlined className="text-md text-gray-600" />
            </Button>

            {/* Story Content */}
            <div className="select-none relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/image/${selectedStory.image}`}
                alt="Story"
                fill
                className="object-cover"
              />

              {/* Navigation Areas */}
              <div className="absolute inset-0 flex">
                <div className="flex-1 cursor-pointer" onClick={prevStory} />
                <div className="flex-1 cursor-pointer" onClick={nextStory} />
              </div>
            </div>

            {/* Navigation Arrows */}
            {currentStoryIndex > 0 && (
              <Button
                onClick={prevStory}
                variant="gray-outline"
                className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-[150%] !px-2 !py-2 rounded-full"
              >
                <LeftOutlined className="text-lg" />
              </Button>
            )}
            {currentStoryIndex < stories.length - 1 && (
              <Button
                onClick={nextStory}
                variant="gray-outline"
                className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-[150%] !px-2 !py-2 rounded-full"
              >
                <RightOutlined className="text-lg" />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
