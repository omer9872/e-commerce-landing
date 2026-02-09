import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Pagination } from "antd";
import Image from "next/image";
import dayjs from "dayjs";

import { IPaginatedResponsePayload } from "@/types/common";
import EmptyData from "@/components/EmptyData";
import { IRefund } from "@/types/refund";
import Loader from "@/components/Loader";
import axios from "@/lib/axios";

interface RefundListProps {
  initialRefunds?: IRefund[];
}

export default function RefundList({ initialRefunds = [] }: RefundListProps) {
  const t = useTranslations("refund");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [refunds, setRefunds] = useState<IRefund[]>(initialRefunds);
  const [totalRefunds, setTotalRefunds] = useState(0);
  const pageSize = 5; // Number of refunds per page

  const fetchRefunds = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get<IPaginatedResponsePayload<IRefund>>(
        `/refund?page=${page - 1}&limit=${pageSize}`
      );
      setRefunds(response.data.data);
      setTotalRefunds(response.data.total);
    } catch (error) {
      console.error("Error fetching refunds:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds(currentPage);
  }, [currentPage]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "APPROVED":
        return t("status.approved");
      case "REJECTED":
        return t("status.rejected");
      case "PENDING":
        return t("status.pending");
      default:
        return status;
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{t("title")}</h2>
      {isLoading ? (
        <Loader size="small" minHeight="min-h-[400px]" />
      ) : (
        <>
          <div className="grid gap-4">
            {refunds.length > 0 ? (
              refunds.map((refund) => (
                <div
                  key={refund._id}
                  className="p-6 item-border"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("refundId")} #{refund._id.slice(-6)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {dayjs(refund.createdAt).format("DD.MM.YYYY HH:mm")}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusColor(
                        refund.status
                      )}`}
                    >
                      {getStatusText(refund.status)}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {refund.refundedItems
                      .filter((item) => item.product)
                      .map((item) => (
                        <div key={item._id} className="flex items-center gap-4">
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}/product-web/image/${item.product.images[0]}`}
                              alt={item.product.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-lg font-medium">
                              {item.product.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {t("sku")}: {item.sku}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {t("quantity")}: {item.quantity}
                            </p>
                            <p className="text-sm">
                              {(item.price * item.quantity).toFixed(2)}₺
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {t("reason")}: {item.reason}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-end gap-2 items-center">
                      <p className="text-lg text-gray-500 dark:text-gray-400">
                        {t("totalRefund")}:
                      </p>
                      <p className="text-lg font-semibold">
                        {refund.totalAmount.toFixed(2)}₺
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyData />
            )}
          </div>
          {totalRefunds > pageSize && (
            <div className="flex justify-center mt-6">
              <Pagination
                current={currentPage}
                total={totalRefunds}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                className="custom-pagination"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
