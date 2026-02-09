import { forwardRef, useImperativeHandle, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

import { IProductCategoryWithChildren } from "@/types/productCategory";
import Button from "@/components/Button";

interface CategoryFilterProps {
  categories: IProductCategoryWithChildren[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export interface CategoryFilterRef {
  clear: () => void;
}

const CategoryFilter = forwardRef<CategoryFilterRef, CategoryFilterProps>(
  ({ categories, selectedCategory, onCategoryChange }, ref) => {
    const t = useTranslations("products.categoryFilter");
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
      new Set()
    );

    useImperativeHandle(ref, () => ({
      clear: () => {
        onCategoryChange(null);
      },
    }));

    const getAllCategoryIds = (
      categories: IProductCategoryWithChildren[]
    ): string[] => {
      return categories.reduce<string[]>((ids, category) => {
        return [
          ...ids,
          category._id,
          ...getAllCategoryIds(category.subCategories),
        ];
      }, []);
    };

    const handleExpandAll = () => {
      const allIds = getAllCategoryIds(categories);
      setExpandedCategories(new Set(allIds));
    };

    const handleCollapseAll = () => {
      setExpandedCategories(new Set());
    };

    const toggleCategory = (categoryId: string) => {
      setExpandedCategories((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(categoryId)) {
          newSet.delete(categoryId);
        } else {
          newSet.add(categoryId);
        }
        return newSet;
      });
    };

    const renderCategoryTree = (
      category: IProductCategoryWithChildren,
      level = 0
    ) => {
      const isExpanded = expandedCategories.has(category._id);
      const hasChildren = category.subCategories.length > 0;

      return (
        <div key={category._id} className="w-full text-sm">
          <div
            className={`flex items-center gap-2 py-2 px-2 rounded-lg ${
              selectedCategory === category._id
                ? "border-2 border-solid border-primary dark:border-white"
                : "border-2 border-solid border-transparent"
            }`}
            style={{ paddingLeft: `${level * 24 + (hasChildren ? 0 : 8)}px` }}
          >
            {hasChildren && (
              <button
                onClick={() => toggleCategory(category._id)}
                className="cursor-pointer rounded-full border-none p-1 bg-transparent w-6 h-6 flex items-center justify-center"
              >
                <RightOutlined
                  className={`duration-300 ${isExpanded ? "rotate-90" : ""}`}
                />
              </button>
            )}
            <span
              className="w-fit hover:underline cursor-pointer text-gray-900 dark:text-gray-200"
              onClick={() => onCategoryChange(category._id)}
            >
              {category.name}
            </span>
          </div>
          {isExpanded && hasChildren && (
            <div className="w-full">
              {category.subCategories.map((subCategory) =>
                renderCategoryTree(subCategory, level + 1)
              )}
            </div>
          )}
        </div>
      );
    };

    const isAllExpanded = categories.every(
      (category) =>
        expandedCategories.has(category._id) &&
        category.subCategories.every((sub) => expandedCategories.has(sub._id))
    );

    return (
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold m-0 text-light-text dark:text-dark-text">
            {t("title")}
          </h2>
          <Button
            variant="text"
            onClick={isAllExpanded ? handleCollapseAll : handleExpandAll}
          >
            {isAllExpanded ? t("collapseAll") : t("expandAll")}
          </Button>
        </div>
        <div className="space-y-1">
          {categories.map((category) => renderCategoryTree(category))}
        </div>
      </div>
    );
  }
);

CategoryFilter.displayName = "CategoryFilter";

export default CategoryFilter;
