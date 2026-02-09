import React, { useImperativeHandle, useState } from "react";
import { useTranslations } from "next-intl";

import InputNumber from "@/components/InputNumber";

interface PriceFilterProps {
  onPriceChange: (min: number | null, max: number | null) => void;
  initialMinPrice?: number | null;
  initialMaxPrice?: number | null;
}

const PriceFilter = React.forwardRef(
  (
    { onPriceChange, initialMinPrice, initialMaxPrice }: PriceFilterProps,
    ref: React.Ref<{ clear: () => void; setValues: (min: number | null, max: number | null) => void }>
  ) => {
    const t = useTranslations("products.priceFilter");
    const [minPrice, setMinPrice] = useState<number | null>(initialMinPrice || null);
    const [maxPrice, setMaxPrice] = useState<number | null>(initialMaxPrice || null);

    const handleMinPriceChange = (value: number | null) => {
      setMinPrice(value);
      onPriceChange(value, maxPrice);
    };

    const handleMaxPriceChange = (value: number | null) => {
      setMaxPrice(value);
      onPriceChange(minPrice, value);
    };

    useImperativeHandle(
      ref,
      () => ({
        clear: () => {
          setMinPrice(null);
          setMaxPrice(null);
        },
        setValues: (min: number | null, max: number | null) => {
          setMinPrice(min);
          setMaxPrice(max);
        },
      }),
      [minPrice, maxPrice]
    );

    return (
      <div >
        <h2 className="text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
          {t("priceRange")}
        </h2>
        <div className="flex flex-row gap-4">
          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
              {t("min")}
            </label>
            <InputNumber
              className="w-full"
              placeholder="Min"
              min={0}
              value={minPrice}
              onChange={(value) => handleMinPriceChange(value as number | null)}
              formatter={(value) =>
                `₺ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => Number(value?.replace(/₺\s?|(,*)/g, ""))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
              {t("max")}
            </label>
            <InputNumber
              className="w-full"
              placeholder="Max"
              min={0}
              value={maxPrice}
              onChange={(value) => handleMaxPriceChange(value as number | null)}
              formatter={(value) =>
                `₺ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => Number(value?.replace(/₺\s?|(,*)/g, ""))}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default PriceFilter;
