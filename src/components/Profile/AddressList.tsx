import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import axios from "@/lib/axios";
import { Modal } from "antd";

import EmptyData from "@/components/EmptyData";
import Button from "@/components/Button";
import { IAddress } from "@/types/user";

interface AddressListProps {
  addresses: IAddress[];
  defaultAddressId?: string;
  onAddressUpdate?: () => void;
}

export default function AddressList({
  addresses,
  defaultAddressId,
  onAddressUpdate,
}: AddressListProps) {
  const t = useTranslations("");
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  const handleSetDefault = async (addressId: string) => {
    try {
      await axios.put(`/end-user-information/address/${addressId}/default`);
      if (onAddressUpdate) {
        onAddressUpdate();
      }
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  const handleDelete = async () => {
    if (!addressToDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(`/end-user-information/address/${addressToDelete}`);
      if (onAddressUpdate) {
        onAddressUpdate();
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    } finally {
      setIsDeleting(false);
      setAddressToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold m-0">{t("profile.addresses")}</h2>
        <Button onClick={() => router.push("/profile/addresses/new")}>
          {t("address.addNew")}
        </Button>
      </div>
      <div className="grid gap-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address._id}
              className={`item-border p-6`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{address.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {address.addressLine1}
                    <br />
                    {address.neighborhood}, {address.street} {t("address.no")}:{" "}
                    {address.no}
                    {address.flat && ` ${t("address.flat")}: ${address.flat}`}
                    <br />
                    {address.county}/{address.city}/{address.country}
                    <br />
                    {address.postalCode}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {address._id === defaultAddressId ? (
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {t("profile.default")}
                    </span>
                  ) : (
                    <Button
                      variant="text"
                      size="sm"
                      onClick={() => handleSetDefault(address._id)}
                      className="mb-2"
                    >
                      {t("address.setAsDefault")}
                    </Button>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        router.push(`/profile/addresses/${address._id}`)
                      }
                    >
                      {t("common.edit")}
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setAddressToDelete(address._id)}
                    >
                      {t("common.actions.delete")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyData />
        )}
      </div>

      <Modal
        title={t("address.deleteConfirmTitle")}
        open={!!addressToDelete}
        onOk={handleDelete}
        onCancel={() => setAddressToDelete(null)}
        confirmLoading={isDeleting}
        okText={t("common.actions.delete")}
        cancelText={t("common.actions.cancel")}
      >
        <p>{t("address.deleteConfirmMessage")}</p>
      </Modal>
    </div>
  );
}
