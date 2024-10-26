export type TFormState = {
  success: boolean;
  errors: { path: string, message: string }[] | null;
  redirectionUrl: string | null;
};

export type TAddiAmounts = {
  minAmount: number;
  maxAmount: number;
  policy: object;
  policies: object[];
  widgetConfig: object;
  checkoutConfig: object;
  isActiveAlly: boolean;
  isActivePayNow: boolean;
};