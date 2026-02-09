"use client";

import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useState } from "react";

import { CheckCircleOutlined } from "@ant-design/icons";
import { userService } from "@/services/userService";
import { useAuth } from "@/providers/AuthProvider";
import InputPhone from "@/components/InputPhone";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";

interface UpdatePhoneModalProps {
  status: boolean;
  onClose: () => void;
}

export default function UpdatePhoneModal({
  status,
  onClose,
}: UpdatePhoneModalProps) {
  const { fetchUser } = useAuth();
  const t = useTranslations("profile.updatePhoneModal");
  const tCommon = useTranslations("common");

  const [step, setStep] = useState<"update-phone" | "send-code" | "completed">(
    "update-phone"
  );
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const updatePhone = async () => {
    if (!phone) {
      toast.error(tCommon("errors.required"));
      return;
    }
    await userService.updatePhone(phone);
    setStep("send-code");
  };

  const sendCode = async () => {
    await userService.verifyPhone(code);
    await fetchUser();
    setStep("completed");
    setPhone("");
    setCode("");
  };

  const handleClose = () => {
    setStep("update-phone");
    setPhone("");
    setCode("");
    onClose();
  };

  return (
    <Modal open={status} onCancel={handleClose} footer={null} centered>
      <div className="flex flex-col gap-4">
        {step === "update-phone" && (
          <>
            <h2 className="text-2xl font-semibold m-0">{t("title")}</h2>
            <p className="text-sm text-gray-500">
              {t("updatePhoneDescription")}
            </p>
            <InputPhone
              placeholder={t("phone")}
              value={phone}
              onChange={setPhone}
            />
            <Button onClick={updatePhone} variant="primary">
              {t("sendCode")}
            </Button>
          </>
        )}
        {step === "send-code" && (
          <>
            <h2 className="text-2xl font-semibold m-0">{t("title")}</h2>
            <p className="text-sm text-gray-500">{t("sendCodeDescription")}</p>
            <Input
              placeholder={t("code")}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button onClick={sendCode} variant="primary">
              {t("verify")}
            </Button>
          </>
        )}
        {step === "completed" && (
          <div className="flex flex-col gap-4">
            <CheckCircleOutlined className="text-green-500 text-4xl" />
            <h2 className="text-2xl font-semibold m-0">{t("title")}</h2>
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
