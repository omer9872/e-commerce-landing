import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

import { campaignService } from "@/services/campaignService";
import EmptyData from "@/components/EmptyData";
import { ICampaign } from "@/types/campaign";

interface CampaignsSectionProps {}

export default function CampaignsSection(props: CampaignsSectionProps) {
  const t = useTranslations("home.campaigns");
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaignsData = await campaignService.getActiveCampaigns();
      setCampaigns(campaignsData.data);
    };
    fetchCampaigns();
  }, []);

  return (
    (campaigns ?? []).length > 0 && (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("description")}
            </p>
          </div>

          <div className="relative">
            <style jsx global>{`
              .campaign-swiper .swiper-button-next,
              .campaign-swiper .swiper-button-prev {
                color: white;
                background: rgba(0, 0, 0, 0.3);
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
              .campaign-swiper .swiper-button-next:after,
              .campaign-swiper .swiper-button-prev:after {
                font-size: 20px;
              }
              .campaign-swiper .swiper-pagination-bullet {
                background: white;
              }
              .campaign-swiper .swiper-pagination-bullet-active {
                background: white;
              }
            `}</style>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="campaign-swiper"
            >
              {(campaigns ?? []).map((campaign) => (
                <SwiperSlide key={campaign._id}>
                  <div
                    className="relative cursor-pointer active:opacity-50 duration-100 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden min-h-[500px]"
                    onClick={() => {
                      router.push(`/campaigns/${campaign._id}`);
                    }}
                  >
                    {campaign.image && (
                      <div className="absolute top-0 left-0 h-full w-full">
                        <div className="relative h-full w-full">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/campaign-public/image/${campaign.image}`}
                            alt={campaign.name}
                            className="w-full h-full object-cover"
                            fill
                          />
                        </div>
                      </div>
                    )}
                    {/* <div className="absolute bottom-0 left-0 px-6 pb-6 text-white w-full h-full flex flex-col gap-1 justify-center items-center bg-black/50">
                    <h3 className="text-3xl font-semibold m-0">
                      {campaign.name}
                    </h3>
                    <div className="flex items-center justify-between gap-1 m-0">
                      <p className="text-sm">{t("campaignPeriod")}:</p>
                      <span className="text-sm">
                        {dayjs(campaign.startDate).format("DD.MM.YYYY")} -{" "}
                        {dayjs(campaign.endDate).format("DD.MM.YYYY")}
                      </span>
                    </div>
                  </div> */}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    )
  );
}
