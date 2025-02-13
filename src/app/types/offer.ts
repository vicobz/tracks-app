// types/offer.ts

export type OfferType = 'EARN' | 'SPEND';
export type OfferStatus =
      | 'DRAFT'
      | 'ACTIVE'
      | 'PAUSED'
      | 'ENDED'
      | 'CANCELLED'
      | 'ARCHIVED';

export type RuleType =
      | 'EARN_POINTS_PER_EURO'
      | 'EARN_FIXED_POINTS'
      | 'EARN_PERCENT_CASHBACK'
      | 'SPEND_POINTS_CONVERSION'
      | 'SPEND_FIXED_POINTS';

export interface Rule {
      type: RuleType;
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
      status: OfferStatus;
      partner_id: string;
      type: OfferType;
      name: string;
      description?: string;
      image_url?: string;
      tracking_url?: string;
      rules: Rule[];
      min_amount: number;
      max_points: number;
      user_quota?: number;
      global_quota?: number;
      remaining_quota?: number;
      valid_from: string;
      valid_to: string;
}