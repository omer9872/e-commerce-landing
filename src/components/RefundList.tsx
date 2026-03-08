import { Card, Tag, Typography } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import Image from "next/image";

import { IRefund, IRefundedItem } from "@/types/refund";

const { Text, Title } = Typography;

interface RefundListProps {
  refunds: IRefund[];
}

export default function RefundList({ refunds }: RefundListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "error";
      case "PENDING":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-4">
      {refunds.map((refund) => (
        <Card key={refund._id} className="w-full">
          <div className="flex justify-between items-start mb-4">
            <div>
              <Title level={5} className="!mb-1">
                İade #{refund._id.slice(-6)}
              </Title>
              <Text type="secondary" className="text-sm">
                {dayjs(refund.createdAt)
                  .locale("tr")
                  .format("DD MMMM YYYY HH:mm")}
              </Text>
            </div>
            <Tag color={getStatusColor(refund.status)}>
              {refund.status === "APPROVED"
                ? "Onaylandı"
                : refund.status === "REJECTED"
                ? "Reddedildi"
                : "Beklemede"}
            </Tag>
          </div>

          <div className="space-y-3">
            {refund.refundedItems.map((item: IRefundedItem) => (
              <div key={item._id} className="flex gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/product-public/image/${item.product.images[0]}`}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Text strong className="block">
                    {item.product.name}
                  </Text>
                  <Text type="secondary" className="text-sm">
                    {item.quantity} adet x {item.price} TL
                  </Text>
                  <Text type="secondary" className="text-sm block mt-1">
                    {item.reason}
                  </Text>
                </div>
                <div className="text-right">
                  <Text strong className="block">
                    {(item.price * item.quantity).toFixed(2)} TL
                  </Text>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <Text strong>Toplam İade Tutarı</Text>
              <Text strong className="text-lg">
                {refund.totalAmount.toFixed(2)} TL
              </Text>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
