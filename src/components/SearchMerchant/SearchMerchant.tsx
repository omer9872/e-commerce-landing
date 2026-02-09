"use client";

import type React from "react";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import axios from "@/lib/axios";

const { Option } = Select;

interface Merchant {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

interface MerchantSearchProps {
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

export const MerchantSearch: React.FC<MerchantSearchProps> = ({
  onChange,
  style,
}) => {
  const [data, setData] = useState<Merchant[]>([]);
  const [value, setValue] = useState<string>();
  const [fetching, setFetching] = useState(false);

  const fetchMerchants = useCallback(async (search: string) => {
    setFetching(true);
    try {
      const response = await axios.get("/merchant", {
        params: {
          page: 0,
          limit: 10,
          search,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching merchants:", error);
    } finally {
      setFetching(false);
    }
  }, []);

  const debounceFetcher = useMemo(() => {
    return debounce(fetchMerchants, 300);
  }, [fetchMerchants]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    debounceFetcher("");
  }, []);

  return (
    <Select
      showSearch
      value={value}
      placeholder="Search for a merchant"
      style={style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={debounceFetcher}
      onChange={handleChange}
      notFoundContent={fetching ? <Spin size="small" /> : null}
    >
      {data.map((merchant) => (
        <Option key={merchant._id} value={merchant._id}>
          {`${merchant.user.firstName} ${merchant.user.lastName}`}
        </Option>
      ))}
    </Select>
  );
};
