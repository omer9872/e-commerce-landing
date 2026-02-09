import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  ITransaction,
  PaymentStatus,
  ShippingStatus,
} from "@/types/transaction";
import { IPaginatedResponsePayload } from "@/types/common";
import Pagination from "@/components/Pagination";
import EmptyData from "@/components/EmptyData";
import Loader from "@/components/Loader";
import axios from "@/lib/axios";
import currencyFormatter from "@/utils/currencyFormatter";
import dayjs from "dayjs";

interface TransactionListProps {
  initialTransactions?: ITransaction[];
}

export default function TransactionList({
  initialTransactions = [],
}: TransactionListProps) {
  const router = useRouter();
  const t = useTranslations("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] =
    useState<ITransaction[]>(initialTransactions);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const pageSize = 5; // Number of transactions per page

  const fetchTransactions = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get<IPaginatedResponsePayload<ITransaction>>(
        `/transaction/my-transactions?page=${page - 1}&limit=${pageSize}`
      );
      setTransactions(response.data.data);
      setTotalTransactions(response.data.total);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  const getStatusColor = (status: PaymentStatus | ShippingStatus) => {
    switch (status) {
      case PaymentStatus.COMPLETED:
      case ShippingStatus.DELIVERED:
        return "bg-green-100 text-green-800";
      case PaymentStatus.PENDING:
      case ShippingStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case PaymentStatus.FAILED:
      case ShippingStatus.CANCELLED:
        return "bg-red-100 text-red-800";
      case ShippingStatus.SHIPPED:
      case ShippingStatus.ON_THE_WAY:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold m-0">{t("orders.title")}</h2>
      {isLoading ? (
        <Loader size="small" minHeight="min-h-[400px]" />
      ) : (
        <>
          <div className="grid gap-4">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="p-6 cursor-pointer item-border"
                  onClick={() => {
                    router.push(`/orders/${transaction._id}`);
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("orders.placedOn", {
                          date: dayjs(
                            transaction.createdAt
                          ).format("DD MMMM YYYY - HH:mm"),
                        })}
                      </p>
                    </div>

                  </div>
                  <div className="space-y-4">
                    {(transaction.payment?.products ?? []).map(
                      (paymentProduct) => {
                        const productVariant =
                          paymentProduct.product.variants.find(
                            (variant: any) => variant.sku === paymentProduct.sku
                          );
                        return paymentProduct ? (
                          <div
                            key={paymentProduct.product._id}
                            className="flex items-center gap-4"
                          >
                            <div className="relative w-16 h-16 flex-shrink-0">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/product-web/image/${paymentProduct.product.images[0]}`}
                                alt={paymentProduct.product.name}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-lg font-medium">
                                {paymentProduct.product.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {paymentProduct.product.sku}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {t("orders.quantity", {
                                  count: paymentProduct.quantity,
                                })}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {t("orders.price", {
                                  price: currencyFormatter.format(
                                    productVariant.price
                                  ),
                                })}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p>{t("orders.productNotFound")}</p>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusColor(
                            transaction.paymentStatus
                          )}`}
                        >
                          {`${t("orders.paymentStatus")}: ${t(
                            `common.enums.paymentStatus.${transaction.paymentStatus.toLowerCase()}`
                          )}`}
                        </span>
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusColor(
                            transaction.shippingStatus
                          )}`}
                        >
                          {`${t("orders.shippingStatus")}: ${t(
                            `common.enums.shippingStatus.${transaction.shippingStatus.toLowerCase()}`
                          )}`}
                        </span>
                      </div>
                      <p className="text-lg font-semibold">
                        {t("orders.total", {
                          total: currencyFormatter.format(
                            transaction.totalAmount
                          ),
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyData />
            )}
          </div>
          {totalTransactions > pageSize && (
            <div className="flex justify-center mt-6">
              <Pagination
                current={currentPage}
                total={totalTransactions}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
