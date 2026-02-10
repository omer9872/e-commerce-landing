/**
 * Pricing structure for subscription plans and add-ons.
 * All user-facing text is localized via landing.pricing in messages (en.json / tr.json).
 */

export type PriceRange = { min: number; max: number };

export interface PricingPlan {
  id: string;
  price: number;
  recommended: boolean;
  featureKeys: string[];
  limitationKeys: string[];
}

export interface OneTimeFee {
  id: string;
  priceRange: PriceRange;
}

export interface MobileAppMaintenance {
  monthlyPriceRange: PriceRange;
  includeKeys: string[];
  excludeKeys: string[];
}

export interface CustomWebDesignAddon {
  oneTimePriceRange: PriceRange;
  includeKeys: string[];
}

export interface ExtraAddon {
  id: string;
  price?: number;
  priceRange?: PriceRange;
  billingCycle: string;
}

export interface PricingData {
  currency: string;
  billingCycle: string;
  plans: PricingPlan[];
  addons: {
    mobileApp: {
      oneTimeFees: OneTimeFee[];
      maintenance: MobileAppMaintenance;
    };
    customWebDesign: CustomWebDesignAddon;
    extras: ExtraAddon[];
  };
}

export const pricingData: PricingData = {
  currency: "TR",
  billingCycle: "monthly",
  plans: [
    {
      id: "core",
      price: 4000,
      recommended: false,
      featureKeys: [
        "adminPanelAccess",
        "responsiveWebApp",
        "blog",
        "story",
        "productCategoryManagement",
        "orderTransactionManagement",
        "basicDiscountCampaigns",
        "singleBusinessLocation",
        "emailSupport",
      ],
      limitationKeys: [],
    },
    {
      id: "business",
      price: 17500,
      recommended: false,
      featureKeys: [
        "everythingInCore",
        "multiLocationSupport",
        "advancedCampaignSystem",
        "feedbackModule",
        "refundPartialRefund",
        "analyticsReporting",
        "courierDeliveryModule",
        "webPushNotifications",
        "prioritySupport",
      ],
      limitationKeys: [],
    },
    {
      id: "platform",
      price: 50000,
      recommended: false,
      featureKeys: [
        "everythingInBusiness",
        "subMerchantMultiVendor",
        "roleBasedAdminUsers",
        "apiAccess",
        "systemLogsAuditTrail",
        "customDomain",
        "slaBackedSupport",
      ],
      limitationKeys: [],
    },
  ],
  addons: {
    mobileApp: {
      oneTimeFees: [
        { id: "single_platform", priceRange: { min: 7500, max: 10000 } },
        { id: "both_platforms", priceRange: { min: 15000, max: 20000 } },
      ],
      maintenance: {
        monthlyPriceRange: { min: 2500, max: 5000 },
        includeKeys: [
          "osCompatibilityUpdates",
          "bugFixes",
          "storePolicyUpdates",
          "backendApiCompatibility",
        ],
        excludeKeys: ["newFeatures", "majorUiChanges"],
      },
    },
    customWebDesign: {
      oneTimePriceRange: { min: 5000, max: 10000 },
      includeKeys: ["customUiUxDesign", "brandBasedTheme", "landingStorefrontRedesign"],
    },
    extras: [
      { id: "extra_location", price: 2500, billingCycle: "monthly" },
      { id: "extra_orders", price: 2500, billingCycle: "monthly" },
      { id: "dedicated_server", priceRange: { min: 2500, max: 5000 }, billingCycle: "monthly" },
    ],
  },
};

export function formatPriceTRY(amount: number): string {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(amount);
}

export function formatPriceRangeTRY(range: PriceRange): string {
  return `${formatPriceTRY(range.min)} - ${formatPriceTRY(range.max)}`;
}

