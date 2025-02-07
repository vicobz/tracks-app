// types/offer.ts
export interface OfferRule {
      type: 'EARN_POINTS_PER_EURO' | 'EARN_FIXED_POINTS' | 'EARN_PERCENT_CASHBACK' |
      'SPEND_POINTS_CONVERSION' | 'SPEND_FIXED_POINTS';
      subscription_type: string;
      base_points: number;
      points_per_euro: number;
      percentage: number;
      conversion_rate: number;
      boost_multiplier: number;
      boost_valid_from: string;
      boost_valid_to: string;
}

export interface Offer {
      id: string;
      type: 'EARN' | 'SPEND';
      status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'ENDED' | 'CANCELLED' | 'ARCHIVED';
      partner_id: string;
      name: string;
      description?: string;
      image_url?: string;
      rules: OfferRule[];
      min_amount: number;
      max_points: number;
      user_quota?: number;
      global_quota?: number;
      remaining_quota?: number;
      valid_from: string;
      valid_to: string;
      created_at: string;
      updated_at: string;
}