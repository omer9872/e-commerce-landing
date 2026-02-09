"use client";

import type React from "react";
import { useState, useMemo, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import { TreeSelect, Spin } from "antd";
import axios from "@/lib/axios";

import { IProductCategory } from "@/types/productCategory";

interface SearchCategoryProps {
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  mode?: "multiple" | "tags" | undefined;
  preSelectedOptions?: IProductCategory[];
  allowClear?: boolean;
}

export const SearchCategory: React.FC<SearchCategoryProps> = ({
  onChange,
  style,
  mode,
  preSelectedOptions,
  allowClear = false,
}) => {
  const [data, setData] = useState<IProductCategory[]>([]);
  const [value, setValue] = useState<string | string[]>();
  const [fetching, setFetching] = useState(false);

  const fetchSearchCategorys = useCallback(async (search: string) => {
    setFetching(true);
    try {
      const response = await axios.get("/product-category", {
        params: {
          search,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching product categories:", error);
    } finally {
      setFetching(false);
    }
  }, []);

  const debounceFetcher = useMemo(() => {
    return debounce(fetchSearchCategorys, 300);
  }, [fetchSearchCategorys]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    debounceFetcher("");
  }, []);

  useEffect(() => {
    if ((preSelectedOptions ?? []).length > 0) {
      if (mode === "multiple") {
        setValue(preSelectedOptions?.map((option) => option._id));
      } else {
        setValue(preSelectedOptions?.[0]?._id);
      }
    }
  }, [preSelectedOptions]);

  // Convert categories to tree data structure
  const treeData = useMemo(() => {
    const convertToTreeData = (
      categories: IProductCategory[]
    ): { title: string; value: string; children?: any[] }[] => {
      return categories.map((category) => ({
        title: category.name,
        value: category._id,
        children: category.subCategories?.length
          ? convertToTreeData(category.subCategories as IProductCategory[])
          : undefined,
      }));
    };

    return convertToTreeData(data);
  }, [data]);

  return (
    <TreeSelect
      treeData={treeData}
      value={value as any}
      onChange={handleChange}
      style={style}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder="Search for a product category"
      allowClear={allowClear}
      showSearch
      treeDefaultExpandAll
      filterTreeNode={(input, node) =>
        (node?.title as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      loading={fetching}
      multiple={mode === "multiple"}
      treeNodeFilterProp="title"
      notFoundContent={fetching ? <Spin size="small" /> : null}
    />
  );
};
