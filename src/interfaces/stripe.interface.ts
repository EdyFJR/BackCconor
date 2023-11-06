export interface StripeProduct {
    id: string
    object: string
    active: boolean
    created: number
    default_price: string
    description: string
    features: Feature[]
    images: string[]
    livemode: boolean
    name: string
    package_dimensions: any
    shippable: any
    statement_descriptor: string
    tax_code: any
    unit_label: any
    updated: number
    url: any
  }
  export interface Feature {
    name: string
  }
export interface StripePrice {
    id: string;
    object: 'price';
    active: boolean;
    billing_scheme: 'per_unit' | 'tiered';
    created: number;
    currency: string;
    livemode: boolean;
    metadata: Record<string, string>;
    nickname: string;
    product: string | StripeProduct;
    recurring: {
        aggregate_usage: 'sum' | 'last_during_period' | null;
        interval: 'day' | 'week' | 'month' | 'year';
        interval_count: number;
        usage_type: 'licensed' | 'metered';
    };
    type: 'one_time' | 'recurring';
    unit_amount: number;
    unit_amount_decimal: string;
    updated: number;
}

