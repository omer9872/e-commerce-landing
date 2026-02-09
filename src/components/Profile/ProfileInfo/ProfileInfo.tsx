"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tag } from "antd";

import Descriptions from "@/components/Descriptions";
import { Avatar } from "@/components/Avatar";
import Button from "@/components/Button";
import { IUser } from "@/types/user";

import UpdatePhoneModal from "./UpdatePhoneModal";
import SendVerificationEmailModal from "./SendVerificationEmailModal";

interface ProfileInfoProps {
  user: IUser & { verification: { email: boolean; phone: boolean } };
  onLogout: () => void;
}

export default function ProfileInfo({ user, onLogout }: ProfileInfoProps) {
  const t = useTranslations("");
  const [updatePhoneModal, setUpdatePhoneModal] = useState(false);
  const [sendVerificationEmailModal, setSendVerificationEmailModal] =
    useState(false);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold m-0">
          {t("profile.information")}
        </h2>
        <Button onClick={onLogout} variant="secondary">
          {t("auth.logout")}
        </Button>
      </div>
      <div className="p-6 item-border flex flex-col gap-4">
        <div className="flex items-center space-x-4">
          <Avatar user={user} size="lg" />
          <h3 className="text-xl font-semibold mb-0">
            {user.firstName} {user.lastName}
          </h3>
        </div>
        <Descriptions
          bordered
          items={[
            {
              label: t("profile.firstName"),
              content: user.firstName,
            },
            {
              label: t("profile.lastName"),
              content: user.lastName,
            },
            {
              label: t("profile.email"),
              content: (
                <div className="flex flex-row items-center gap-2">
                  <p>{user.email || "-"}</p>
                  {user.verification.email ? (
                    <Tag color="green">{t("profile.verified")}</Tag>
                  ) : (
                    <Tag color="red">{t("profile.unverified")}</Tag>
                  )}
                  {!user.verification.email && (
                    <Button
                      variant="text"
                      onClick={() => setSendVerificationEmailModal(true)}
                    >
                      {t("profile.sendVerificationCode")}
                    </Button>
                  )}
                </div>
              ),
            },
            {
              label: t("profile.phone"),
              content: (
                <div className="flex flex-row items-center gap-2">
                  <p>{user.phone || "-"}</p>
                  {user.verification.phone ? (
                    <Tag color="green">{t("profile.verified")}</Tag>
                  ) : (
                    <Tag color="red">{t("profile.unverified")}</Tag>
                  )}
                </div>
              ),
            },
          ]}
        />
        <UpdatePhoneModal
          status={updatePhoneModal}
          onClose={() => setUpdatePhoneModal(false)}
        />
        <SendVerificationEmailModal
          status={sendVerificationEmailModal}
          onClose={() => setSendVerificationEmailModal(false)}
        />
      </div>
    </div>
  );
}
