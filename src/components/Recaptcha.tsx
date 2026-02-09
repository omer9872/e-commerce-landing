"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useLocale } from "next-intl";
import { useCallback } from "react";

import { useTheme } from "@/providers/ThemeProvider";

interface RecaptchaProps {
  onVerify: (token: string) => void;
  onExpired?: () => void;
}

export const Recaptcha = ({ onVerify, onExpired }: RecaptchaProps) => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const locale = useLocale();
  const { theme } = useTheme();

  const handleVerify = useCallback(
    (token: string | null) => {
      if (token) {
        onVerify(token);
      }
    },
    [onVerify]
  );

  const handleExpired = useCallback(() => {
    if (onExpired) {
      onExpired();
    }
  }, [onExpired]);

  if (!siteKey) {
    console.error("reCAPTCHA site key is not defined");
    return null;
  }

  return (
    <ReCAPTCHA
      key={`${theme}-${locale}`}
      hl={locale}
      sitekey={siteKey}
      theme={theme}
      onChange={handleVerify}
      onExpired={handleExpired}
    />
  );
};
