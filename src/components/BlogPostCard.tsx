"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Typography } from "antd";
import Image from "next/image";
import dayjs from "dayjs";

import { IBlogPost } from "@/types/blogPost";
import { PhotoIcon } from "@/icons/Photo";

const { Paragraph } = Typography;

interface BlogPostCardProps {
  blogPost: IBlogPost;
}

export const BlogPostCard = ({ blogPost }: BlogPostCardProps) => {
  const router = useRouter();
  const t = useTranslations("blog");

  return (
    <div
      onClick={() => router.push(`/blog/${blogPost._id}`)}
      className="flex flex-col cursor-pointer item-border group relative duration-300 overflow-hidden h-full"
    >
      <div className="h-[245px] aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-light-card-bg dark:bg-dark-card-bg">
        {blogPost.coverImage ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/blog-post-public/image/${blogPost.coverImage}`}
            alt={blogPost.coverImage}
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
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            {blogPost.title}
          </p>
        </div>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          <p>
            {`${t("createdAt")}: ${dayjs(blogPost.createdAt).format(
              "DD.MM.YYYY"
            )}`}
          </p>
        </div>
      </div>
    </div>
  );
};
