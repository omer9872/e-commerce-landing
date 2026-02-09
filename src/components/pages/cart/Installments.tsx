import { useEffect, useState } from "react";
import Image from "next/image";

import { paymentService } from "@/services/payment";
import { IInstallment } from "@/types/payment";
import currencyFormatter from "@/utils/currencyFormatter";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";
import Loader from "@/components/Loader";
import { useAuth } from "@/providers/AuthProvider";

interface InstallmentsProps {
  className?: string;
}

const BANK_ICON_MAP = [
  {
    name: "QNB",
    icon: "/bank-icons/qnb.png",
    bg: undefined,
  },
  {
    name: "Halkbank",
    icon: "/bank-icons/halkbank.svg",
    bg: undefined,
  },
  {
    name: "Vakıfbank",
    icon: "/bank-icons/vakifbank.svg",
    bg: undefined,
  },
  {
    name: "Denizbank",
    icon: "/bank-icons/denizbank.svg",
    bg: undefined,
  },
  {
    name: "Akbank",
    icon: "/bank-icons/akbank.svg",
    bg: undefined,
  },
  {
    name: "İş Bankası",
    icon: "/bank-icons/is-bankasi.png",
    bg: undefined,
  },
];

const Installments = ({ className }: InstallmentsProps) => {
  const t = useTranslations("components.installments");
  const tCommon = useTranslations("common");

  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [installments, setInstallments] = useState<IInstallment[]>([]);

  useEffect(() => {
    const fetchInstallments = async () => {
      setLoading(true);
      paymentService
        .getInstallments()
        .then((response) => {
          setInstallments(response);
        })
        .catch((error) => {
          toast.error(tCommon("errors.fetchFailed"));
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (isAuthenticated) {
      fetchInstallments();
    }
  }, [isAuthenticated]);

  return (
    <div className={`mt-4 space-y-6 ${className}`}>
      <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text">
        {t("installmentsSummary")}
      </h2>

      {loading ? (
        <Loader />
      ) : (
        <>
          {(installments ?? []).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {installments.map((item: IInstallment) => (
                <div
                  key={item.binNumber}
                  className="item-border overflow-hidden"
                >
                  {/* Bank Header */}
                  <div className="px-6 pt-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 rounded px-2 dark:bg-light-bg">
                        <div
                          style={{
                            backgroundColor: BANK_ICON_MAP.find(
                              (bank) => bank.name === item.bankName
                            )?.bg,
                          }}
                          className="relative w-[100px] h-8 flex items-center justify-center"
                        >
                          <Image
                            src={
                              BANK_ICON_MAP.find(
                                (bank) => bank.name === item.bankName
                              )?.icon || ""
                            }
                            alt={item.bankName}
                            fill
                            className="object-cover rounded-lg"
                            objectFit="contain"
                          />
                        </div>
                      </div>
                      {item.force3ds === 1 && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Peşin Fiyatına
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Installments Table */}
                  <div className="p-6">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm font-medium text-light-text dark:text-dark-text pb-2 border-b border-light-border dark:border-dark-border">
                        <span>Taksit Sayısı</span>
                        <span>Toplam Tutar (TL)</span>
                      </div>
                      {item.installmentPrices.map((installment, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center py-2 text-sm rounded px-2 -mx-2"
                        >
                          <span className="font-medium text-light-text dark:text-dark-text">
                            {installment.installmentNumber} x{" "}
                            {currencyFormatter.format(
                              installment.installmentPrice
                            )}
                          </span>
                          <span className="font-semibold text-light-text dark:text-dark-text">
                            {currencyFormatter.format(installment.totalPrice)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer with additional info */}
                  {(item.commercial === 1 || item.cardType) && (
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {item.commercial === 1 && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Commercial
                          </span>
                        )}
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.cardType === "CREDIT_CARD"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.cardType === "CREDIT_CARD"
                            ? t("creditCard")
                            : t("debitCard")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No installment options available
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Installment options will be displayed here when available.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Installments;
