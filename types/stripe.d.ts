export type StripeCustomer = {
  id: string;
  name: string;
  email: string;
  subscription: {
    status:
      | "active"
      | "incomplete"
      | "incomplete_expired"
      | "trialing"
      | "past_due"
      | "unpaid"
      | "canceled"
      | "unpaid";
    items: {
      id: string;
      price: {
        id: string;
        product: string;
      };
    }[];
  };
  invoice_settings: {
    default_payment_method: string;
  };
};

export type Product = {
  id: string;
  active: boolean;
  name: string;
  description: string | null;
  image: string | null;
  metadata: Record<string, string>;
};

export type Price = {
  id: string;
  product_id: string;
  active: boolean;
  currency: string;
  type: string;
  unit_amount: number | null;
  interval: string | null;
  interval_count: number | null;
  trial_period_days: number | null;
};

export interface Subscription {
  id: string;
  user_id: string;
  status:
    | "trialing"
    | "active"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "past_due"
    | "unpaid"
    | "paused";
  metadata: Record<string, any>;
  price_id: string;
  quantity: number;
  cancel_at_period_end: boolean;
  created: Date;
  current_period_start: Date;
  current_period_end: Date;
  ended_at?: Date | null;
  cancel_at?: Date | null;
  canceled_at?: Date | null;
  trial_start?: Date | null;
  trial_end?: Date | null;
}
