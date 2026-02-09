import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Tag } from "antd";
import dayjs from "dayjs";

import { getFeedbackStatusColor, getFeedbackTypeColor } from "@/utils/feedback";
import { IFeedback, FeedbackType, FeedbackStatus } from "@/types/feedback";
import { feedbackApi } from "@/services/feedback";
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import EmptyData from "../EmptyData";

export const FeedbacksList = () => {
  const t = useTranslations("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<IFeedback[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await feedbackApi.getFeedbacks(page, pageSize);
      setMessages(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page, pageSize]);

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: FeedbackType) => (
        <Tag color={getFeedbackTypeColor(type)}>
          {t(`common.enums.feedbackType.${type}`)}
        </Tag>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => <p>{title}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: FeedbackStatus) => (
        <Tag color={getFeedbackStatusColor(status)}>
          {t(`common.enums.feedbackStatus.${status}`)}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("MMM D, YYYY"),
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{t("feedback.title")}</h2>
      {loading ? (
        <Loader size="small" minHeight="min-h-[400px]" />
      ) : messages.length > 0 ? (
        <Table
          columns={columns}
          dataSource={messages}
          rowKey="_id"
          pagination={{
            current: page + 1,
            total,
            pageSize: 10,
            showSizeChanger: false,
            onChange: (page) => {
              setPage(page - 1);
            },
          }}
        />
      ) : (
        <EmptyData />
      )}
    </div>
  );
};
