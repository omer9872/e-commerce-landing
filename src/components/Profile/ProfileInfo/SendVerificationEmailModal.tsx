"use client";

import { CheckCircleOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { userService } from "@/services/userService";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

interface SendVerificationEmailModalProps {
  status: boolean;
  onClose: () => void;
}

export default function SendVerificationEmailModal({
  status,
  onClose,
}: SendVerificationEmailModalProps) {
  const t = useTranslations("profile.sendVerificationEmailModal");

  const [step, setStep] = useState<"send-verification-code" | "completed">(
    "send-verification-code"
  );

  const sendEmailVerificationCode = async () => {
    await userService.sendEmailVerificationCode();
    setStep("completed");
  };

  const handleClose = () => {
    setStep("send-verification-code");
    onClose();
  };

  return (
    <Modal open={status} onCancel={handleClose} footer={null} centered>
      <div className="flex flex-col gap-4">
        {step === "send-verification-code" && (
          <>
            <h2 className="text-2xl font-semibold m-0">{t("title")}</h2>
            <p className="text-sm text-gray-500">{t("sendCodeDescription")}</p>
            <Button onClick={sendEmailVerificationCode} variant="primary">
              {t("sendCode")}
            </Button>
          </>
        )}
        {step === "completed" && (
          <div className="flex flex-col gap-4">
            <CheckCircleOutlined className="text-green-500 text-4xl" />
            <h2 className="text-2xl font-semibold m-0">{t("completedTitle")}</h2>
            <p className="text-sm text-gray-500">{t("completedDescription")}</p>
            <Button onClick={handleClose} variant="primary">
              {t("close")}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
