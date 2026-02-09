import { IPaymentCard } from "@/types/user";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "@/lib/axios";
import { Modal } from "antd";

import EmptyData from "@/components/EmptyData";
import Button from "@/components/Button";

interface PaymentCardListProps {
  cards: IPaymentCard[];
  defaultCardId?: string;
  onCardUpdate?: () => void;
}

export default function PaymentCardList({
  cards,
  defaultCardId,
  onCardUpdate,
}: PaymentCardListProps) {
  const t = useTranslations("");
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);

  const handleSetDefault = async (cardId: string) => {
    try {
      await axios.put(`/end-user-information/payment-card/${cardId}/default`);
      if (onCardUpdate) {
        onCardUpdate();
      }
    } catch (error) {
      console.error("Error setting default card:", error);
    }
  };

  const handleDelete = async () => {
    if (!cardToDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(`/end-user-information/payment-card/${cardToDelete}`);
      if (onCardUpdate) {
        onCardUpdate();
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    } finally {
      setIsDeleting(false);
      setCardToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold m-0">
          {t("profile.paymentCards")}
        </h2>
        <Button onClick={() => router.push("/profile/payment-cards/new")}>
          {t("payment.addNew")}
        </Button>
      </div>
      <div className="grid gap-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card._id}
              className={`item-border p-6`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{card.cardAlias}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {card.cardAssociation} {card.cardFamily}
                    <br />
                    **** **** {card.binNumber.slice(0, 4)}{" "}
                    {card.binNumber.slice(4)}
                    <br />
                    {card.cardType === "CREDIT_CARD"
                      ? t("payment.creditCard")
                      : t("payment.debitCard")}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {card._id === defaultCardId ? (
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {t("profile.default")}
                    </span>
                  ) : (
                    <Button
                      variant="text"
                      size="sm"
                      onClick={() => handleSetDefault(card._id)}
                      className="mb-2"
                    >
                      {t("payment.setAsDefault")}
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setCardToDelete(card._id)}
                  >
                    {t("common.actions.delete")}
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyData />
        )}
      </div>

      <Modal
        title={t("payment.deleteConfirmTitle")}
        open={!!cardToDelete}
        onOk={handleDelete}
        onCancel={() => setCardToDelete(null)}
        confirmLoading={isDeleting}
        okText={t("common.actions.delete")}
        cancelText={t("common.actions.cancel")}
      >
        <p>{t("payment.deleteConfirmMessage")}</p>
      </Modal>
    </div>
  );
}
