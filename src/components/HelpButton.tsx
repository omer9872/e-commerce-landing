"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

// import { feedbackApi } from "@/services/feedback";
// import { FeedbackType } from "@/types/feedback";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Input from "@/components/Input";
import Modal from "@/components/Modal";

const feedbackSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Message must be at least 10 characters"),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export const HelpButton = () => {
  const t = useTranslations("");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (values: FeedbackFormData) => {
    // try {
    //   setLoading(true);
    //   await feedbackApi.createFeedback(values);
    //   setIsModalOpen(false);
    //   reset();
    //   router.push("/contact/success");
    // } catch (error) {
    //   toast.error(t("contact.form.error"));
    // } finally {
    //   setLoading(false);
    // }
  };

  return <>
    <Button
      variant="primary"
      size="lg"
      shape="circle"
      onClick={() => setIsModalOpen(true)}
      className="fixed bottom-[200px] right-0 shadow-lg z-[999] !rounded-tl-[10px] !rounded-tr-none !rounded-bl-[10px] !rounded-br-none"
    >
      <MessageOutlined className="text-lg" />
    </Button>

    <Modal
      title={t("contact.form.modalTitle")}
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
        reset();
      }}
      footer={null}
      width={600}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <p className="text-sm mb-4">{t("contact.form.modalDescription")}</p>
        <div className="mb-4">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input
                label={t("contact.form.title")}
                placeholder={t("contact.form.titlePlaceholder")}
                error={errors.title?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-4">
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <Textarea
                label={t("contact.form.message")}
                rows={4}
                placeholder={t("contact.form.messagePlaceholder")}
                error={errors.content?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="gray"
            onClick={() => {
              setIsModalOpen(false);
              reset();
            }}
          >
            {t("common.actions.cancel")}
          </Button>
          <Button variant="primary" type="submit" isLoading={loading}>
            {t("common.actions.send")}
          </Button>
        </div>
      </form>
    </Modal>
  </>
};
