export const DEFAULT_ERROR_CODES = {
  tr: {
    AN_ERROR_OCCURED: "Bir hata meydana geldi",
  },
  en: {
    AN_ERROR_OCCURED: "An error occured",
  },
};

export const HTTP_ERROR_CODES = {
  // User errors
  USER_NOT_FOUND: "USER_NOT_FOUND",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  USER_PHONE_ALREADY_VERIFIED: "USER_PHONE_ALREADY_VERIFIED",
  USER_PHONE_ALREADY_EXISTS: "USER_PHONE_ALREADY_EXISTS",
  USER_EMAIL_ALREADY_VERIFIED: "USER_EMAIL_ALREADY_VERIFIED",
  USER_EMAIL_ALREADY_EXISTS: "USER_EMAIL_ALREADY_EXISTS",
  USER_EMAIL_NOT_VERIFIED: "USER_EMAIL_NOT_VERIFIED",
  END_USER_INFORMATION_NOT_FOUND: "END_USER_INFORMATION_NOT_FOUND",

  // Auth errors
  INVALID_USERNAME_OR_PASSWORD: "INVALID_USERNAME_OR_PASSWORD",
  USER_NOT_ACTIVE: "USER_NOT_ACTIVE",
  INVALID_TOKEN: "INVALID_TOKEN",
  INVALID_PASSWORD: "INVALID_PASSWORD",
  INVALID_PERMISSION: "INVALID_PERMISSION",
  RESET_PASSWORD_TOKEN_EXPIRED: "RESET_PASSWORD_TOKEN_EXPIRED",

  // Product errors
  PRODUCT_CATEGORY_NOT_FOUND: "PRODUCT_CATEGORY_NOT_FOUND",
  PRODUCT_NOT_FOUND: "PRODUCT_NOT_FOUND",
  NO_PRODUCTS_FOUND: "NO_PRODUCTS_FOUND",
  MISSING_REQUIRED_FIELDS: "MISSING_REQUIRED_FIELDS",
  PRODUCT_ALREADY_EXISTS: "PRODUCT_ALREADY_EXISTS",
  FAILED_TO_PROCESS_CSV_FILE: "FAILED_TO_PROCESS_CSV_FILE",
  MERCHANT_NOT_ALLOWED: "MERCHANT_NOT_ALLOWED",
  MERCHANT_REQUIRED: "MERCHANT_REQUIRED",
  VARIANT_SKU_HAS_INVALID_OPTION: "VARIANT_SKU_HAS_INVALID_OPTION",
  VARIANT_SKU_HAS_INVALID_VALUE: "VARIANT_SKU_HAS_INVALID_VALUE",

  // Payment errors
  PAYMENT_CARD_NOT_FOUND: "PAYMENT_CARD_NOT_FOUND",
  ADDRESS_NOT_FOUND: "ADDRESS_NOT_FOUND",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  PAYMENT_NOT_FOUND: "PAYMENT_NOT_FOUND",

  // Product Review errors
  PRODUCT_REVIEW_NOT_FOUND: "PRODUCT_REVIEW_NOT_FOUND",
  PRODUCT_REVIEW_ALREADY_EXISTS: "PRODUCT_REVIEW_ALREADY_EXISTS",
  PRODUCT_REVIEW_NOT_ALLOWED: "PRODUCT_REVIEW_NOT_ALLOWED",
  PRODUCT_REVIEW_NOT_PURCHASED: "PRODUCT_REVIEW_NOT_PURCHASED",

  // Refund errors
  PRODUCT_NOT_REFUNDABLE: "PRODUCT_NOT_REFUNDABLE",
  PRODUCT_QUANTITY_LESS_THAN_REFUNDED_QUANTITY:
    "PRODUCT_QUANTITY_LESS_THAN_REFUNDED_QUANTITY",

  // Transaction errors
  TRANSACTION_NOT_FOUND: "TRANSACTION_NOT_FOUND",

  // Iyzico errors
  IYZICO_PAYMENT_ID_NOT_FOUND: "IYZICO_PAYMENT_ID_NOT_FOUND",
};

export const LOCALIZED_ERROR_CODES = {
  tr: {
    // User errors
    USER_NOT_FOUND: "Kullanıcı bulunamadı",
    USER_ALREADY_EXISTS: "Kullanıcı zaten mevcut",
    USER_PHONE_ALREADY_VERIFIED: "Kullanıcı telefonu zaten doğrulandı",
    USER_PHONE_ALREADY_EXISTS: "Kullanıcı telefonu zaten mevcut",
    USER_EMAIL_ALREADY_VERIFIED: "Kullanıcı emaili zaten doğrulandı",
    USER_EMAIL_ALREADY_EXISTS: "Kullanıcı emaili zaten mevcut",
    USER_EMAIL_NOT_VERIFIED: "Kullanıcı emaili doğrulanmamış",
    END_USER_INFORMATION_NOT_FOUND: "Kullanıcı bilgileri bulunamadı",

    // Auth errors
    INVALID_USERNAME_OR_PASSWORD: "Kullanıcı adı veya şifre hatalı",
    USER_NOT_ACTIVE: "Kullanıcı aktif değil",
    INVALID_TOKEN: "Geçersiz token",
    INVALID_PASSWORD: "Şifre hatalı",
    INVALID_PERMISSION: "Yetkisiz erişim",
    RESET_PASSWORD_TOKEN_EXPIRED: "Şifre sıfırlama tokeni süresi doldu",

    // Product errors
    PRODUCT_CATEGORY_NOT_FOUND: "Ürün kategorisi bulunamadı",
    PRODUCT_NOT_FOUND: "Ürün bulunamadı",
    NO_PRODUCTS_FOUND: "Ürün bulunamadı",
    MISSING_REQUIRED_FIELDS: "Gerekli alanlar eksik",
    PRODUCT_ALREADY_EXISTS: "Ürün zaten mevcut",
    FAILED_TO_PROCESS_CSV_FILE: "CSV dosyası işlenemedi",
    MERCHANT_NOT_ALLOWED: "Satıcı izin verilmedi",
    MERCHANT_REQUIRED: "Satıcı gerekli",
    VARIANT_SKU_HAS_INVALID_OPTION: "Variant SKU geçersiz seçenek",
    VARIANT_SKU_HAS_INVALID_VALUE: "Variant SKU geçersiz değer",

    // Payment errors
    PAYMENT_CARD_NOT_FOUND: "Ödeme kartı bulunamadı",
    ADDRESS_NOT_FOUND: "Adres bulunamadı",
    PAYMENT_FAILED: "Ödeme başarısız",
    PAYMENT_NOT_FOUND: "Ödeme bulunamadı",

    // Product Review errors
    PRODUCT_REVIEW_NOT_FOUND: "Ürün değerlendirmesi bulunamadı",
    PRODUCT_REVIEW_ALREADY_EXISTS: "Ürün değerlendirmesi zaten mevcut",
    PRODUCT_REVIEW_NOT_ALLOWED: "Ürün değerlendirmesi yapılamadı",
    PRODUCT_REVIEW_NOT_PURCHASED: "Ürün değerlendirmesi yapılamadı",

    // Refund errors
    PRODUCT_NOT_REFUNDABLE: "Ürün iade edilemiyor",
    PRODUCT_QUANTITY_LESS_THAN_REFUNDED_QUANTITY:
      "Ürün miktarı iade edilemiyor",

    // Transaction errors
    TRANSACTION_NOT_FOUND: "İşlem bulunamadı",

    // Iyzico errors
    IYZICO_PAYMENT_ID_NOT_FOUND: "Iyzico ödeme id bulunamadı",
  },
  en: {
    // User errors
    USER_NOT_FOUND: "User not found",
    USER_ALREADY_EXISTS: "User already exists",
    USER_PHONE_ALREADY_VERIFIED: "User phone already verified",
    USER_PHONE_ALREADY_EXISTS: "User phone already exists",
    USER_EMAIL_ALREADY_VERIFIED: "User email already verified",
    USER_EMAIL_ALREADY_EXISTS: "User email already exists",
    USER_EMAIL_NOT_VERIFIED: "User email not verified",
    END_USER_INFORMATION_NOT_FOUND: "User information not found",

    // Auth errors
    INVALID_USERNAME_OR_PASSWORD: "Invalid username or password",
    USER_NOT_ACTIVE: "User not active",
    INVALID_TOKEN: "Invalid token",
    INVALID_PASSWORD: "Invalid password",
    INVALID_PERMISSION: "Invalid permission",
    RESET_PASSWORD_TOKEN_EXPIRED: "Reset password token expired",

    // Product errors
    PRODUCT_CATEGORY_NOT_FOUND: "Product category not found",
    PRODUCT_NOT_FOUND: "Product not found",
    NO_PRODUCTS_FOUND: "No products found",
    MISSING_REQUIRED_FIELDS: "Missing required fields",
    PRODUCT_ALREADY_EXISTS: "Product already exists",
    FAILED_TO_PROCESS_CSV_FILE: "Failed to process CSV file",
    MERCHANT_NOT_ALLOWED: "Merchant not allowed",
    MERCHANT_REQUIRED: "Merchant required",
    VARIANT_SKU_HAS_INVALID_OPTION: "Variant SKU has invalid option",
    VARIANT_SKU_HAS_INVALID_VALUE: "Variant SKU has invalid value",

    // Payment errors
    PAYMENT_CARD_NOT_FOUND: "Payment card not found",
    ADDRESS_NOT_FOUND: "Address not found",
    PAYMENT_FAILED: "Payment failed",
    PAYMENT_NOT_FOUND: "Payment not found",

    // Product Review errors
    PRODUCT_REVIEW_NOT_FOUND: "Product review not found",
    PRODUCT_REVIEW_ALREADY_EXISTS: "Product review already exists",
    PRODUCT_REVIEW_NOT_ALLOWED: "Product review not allowed",
    PRODUCT_REVIEW_NOT_PURCHASED: "Product review not purchased",

    // Refund errors
    PRODUCT_NOT_REFUNDABLE: "Product not refundable",
    PRODUCT_QUANTITY_LESS_THAN_REFUNDED_QUANTITY:
      "Product quantity less than refunded quantity",

    // Transaction errors
    TRANSACTION_NOT_FOUND: "Transaction not found",

    // Iyzico errors
    IYZICO_PAYMENT_ID_NOT_FOUND: "Iyzico payment id not found",
  },
};
