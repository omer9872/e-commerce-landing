import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useState } from "react";

import TextArea from "@/components/Textarea";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Rate from "@/components/Rate";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  onSubmit: (review: { rating: number; comment: string }) => Promise<void>;
}

const ReviewModal = ({
  isOpen,
  onClose,
  productName,
  onSubmit,
}: ReviewModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("orders.reviewModal");
  const tCommon = useTranslations("common");

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error(t("ratingRequired"));
      return;
    }
    if (!comment.trim()) {
      toast.error(t("commentRequired"));
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ rating, comment });
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title={t("title", { product: productName })}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">{t("rating")}</p>
          <Rate value={rating} onChange={setRating} className="text-2xl" />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">{t("comment")}</p>
          <TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder={t("commentPlaceholder")}
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

export default ReviewModal;
