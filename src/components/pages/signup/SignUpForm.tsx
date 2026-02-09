"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";

import { useAuth } from "@/providers/AuthProvider";
import Button from "@/components/Button";
import Input from "@/components/Input";

interface SignUpFormProps {
  onSuccess: () => void;
}

const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const t = useTranslations("signup");
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(formData);
      onSuccess();
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-light-text dark:text-dark-text">
      <div className="max-w-md w-full space-y-8 bg-light-card-bg dark:bg-dark-card-bg p-8 rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            {t("createYourAccount")}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  label={t("firstName")}
                  placeholder={t("firstName")}
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  label={t("lastName")}
                  placeholder={t("lastName")}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t("emailAddress")}
                label={t("emailAddress")}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                label={t("password")}
                placeholder={t("password")}
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("creatingAccount") : t("createAccount")}
            </Button>
          </div>

          <div className="text-sm text-center">
            <Link
              href="/login"
              className="font-medium text-light-primary dark:text-dark-primary hover:text-light-primary dark:hover:text-dark-primary"
            >
              {t("alreadyHaveAnAccount")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
