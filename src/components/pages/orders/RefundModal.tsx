import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useState } from "react";

import InputNumber from "@/components/InputNumber";
import TextArea from "@/components/Textarea";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxQuantity: number;
  onSubmit: (refund: { quantity: number; reason: string }) => Promise<void>;
}

const RefundModal = ({
  isOpen,
  onClose,
  maxQuantity,
  onSubmit,
}: RefundModalProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [reason, setReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const t = useTranslations("orders.refund");
  const tCommon = useTranslations("common");

  const handleSubmit = async () => {
    if (quantity < 1) {
      toast.error(t("quantityRequired"));
      return;
    }
    if (!reason.trim()) {
      toast.error(t("reasonRequired"));
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ quantity, reason });
      onClose();
    } catch (error) {
      console.error("Error submitting refund:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal title={t("title")} open={isOpen} onCancel={onClose} footer={null}>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">{t("quantity")}</p>
          <InputNumber
            min={1}
            max={maxQuantity}
            value={quantity}
            onChange={(value) =>
              setQuantity(value ? Number.parseInt(value.toString()) : 1)
            }
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            {t("maxQuantity", { quantity: maxQuantity })}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">{t("reason")}</p>
          <TextArea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            placeholder={t("reasonPlaceholder")}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            {tCommon("actions.cancel")}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            {tCommon("actions.send")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RefundModal;
