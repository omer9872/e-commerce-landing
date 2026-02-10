"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { z } from "zod";

import { Recaptcha } from "@/components/Recaptcha";
import Container from "@/components/Container";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function ContactPage() {
  const t = useTranslations("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const contactFormSchema = z.object({
    title: z
      .string({ required_error: t("common.required") })
      .min(3, t("contact.form.titleError")),
    email: z
      .string({ required_error: t("common.required") })
      .email(t("contact.form.emailError")),
    message: z
      .string({ required_error: t("common.required") })
      .min(10, t("contact.form.messageError")),
    recaptchaToken: z.string({ required_error: t("common.required") }),
  });

  type ContactFormData = z.infer<typeof contactFormSchema>;

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setLoading(true);
      // await feedbackApi.createFeedbackPublic({
      //   title: data.title,
      //   content: data.message,
      //   type: FeedbackType.CONTACT,
      //   recaptchaToken: data.recaptchaToken,
      //   email: data.email,
      // });
      reset();
      router.push("/contact/success");
    } catch (error) {
      toast.error(t("contact.form.error"));
      setLoading(false);
    }
  };

  return (
    <Container className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t("contact.title")}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t("contact.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="p-8 item-border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  type="text"
                  id="title"
                  label={t("contact.form.title")}
                  error={errors.title?.message}
                  {...field}
                  placeholder={t("contact.form.titlePlaceholder")}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  type="email"
                  id="email"
                  label={t("contact.form.email")}
                  error={errors.email?.message}
                  {...field}
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              )}
            />

            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <Textarea
                  id="message"
                  label={t("contact.form.message")}
                  error={errors.message?.message}
                  rows={4}
                  {...field}
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              )}
            />

            <Controller
              control={control}
              name="recaptchaToken"
              render={({ field }) => (
                <>
                  <Recaptcha onVerify={(token) => field.onChange(token)} />
                  {errors.recaptchaToken && (
                    <p className="text-red-500 text-sm !m-0">
                      {errors.recaptchaToken.message}
                    </p>
                  )}
                </>
              )}
            />

            <Button className="w-full" type="submit" isLoading={loading}>
              {t("contact.form.submit")}
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="p-8 item-border">
            <h2 className="text-2xl font-semibold mb-6">
              {t("contact.info.title")}
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium ">
                    {t("contact.info.address.title")}
                  </h3>
                  <p className="mt-1 ">
                    {t("contact.info.address.line1")}
                    <br />
                    {t("contact.info.address.line2")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium ">
                    {t("contact.info.email.title")}
                  </h3>
                  <p className="mt-1 ">{t("contact.info.email.address")}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium ">
                    {t("contact.info.phone.title")}
                  </h3>
                  <p className="mt-1 ">{t("contact.info.phone.number")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="p-8 item-border">
            <h2 className="text-2xl font-semibold  mb-6">
              {t("contact.hours.title")}
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="">{t("contact.hours.weekdays")}</span>
                <span className="">{t("contact.hours.weekdaysTime")}</span>
              </div>
              <div className="flex justify-between">
                <span className="">{t("contact.hours.saturday")}</span>
                <span className="">{t("contact.hours.saturdayTime")}</span>
              </div>
              <div className="flex justify-between">
                <span className="">{t("contact.hours.sunday")}</span>
                <span className="">{t("contact.hours.sundayTime")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
