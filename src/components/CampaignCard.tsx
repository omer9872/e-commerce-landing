"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Typography } from "antd";
import Image from "next/image";
import dayjs from "dayjs";

import { ICampaign } from "@/types/campaign";
import { PhotoIcon } from "@/icons/Photo";

const { Paragraph } = Typography;

interface CampaignCardProps {
  campaign: ICampaign;
}

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const router = useRouter();
  const t = useTranslations("campaigns");

  return (
    <div
      onClick={() => router.push(`/campaigns/${campaign._id}`)}
      className="flex flex-col cursor-pointer group relative item-border overflow-hidden h-full"
    >
      <div className="h-[245px] aspect-w-1 aspect-h-1 w-full overflow-hidden">
        {campaign.image ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/campaign-public/image/${campaign.image}`}
            alt={campaign.name}
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
            {campaign.name}
          </p>
          <Paragraph
            ellipsis={{ rows: 3 }}
            className="text-gray-600 dark:text-gray-400 text-sm mt-1"
          >
            {campaign.description || ""}
          </Paragraph>
        </div>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          <p>
            {`${t("startDate")}: ${dayjs(campaign.startDate).format(
              "DD.MM.YYYY"
            )}`}
          </p>
          <p>
            {`${t("endDate")}: ${dayjs(campaign.endDate).format("DD.MM.YYYY")}`}
          </p>
        </div>
      </div>
    </div>
  );
};
