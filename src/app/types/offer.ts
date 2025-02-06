// types/offer.ts
export interface OfferRule {
    type: 'EARN_POINTS_PER_EURO' | 'EARN_FIXED_POINTS' | 'EARN_PERCENT_CASHBACK' |
          'SPEND_POINTS_CONVERSION' | 'SPEND_FIXED_POINTS';
    subscriptionType: string;
    basePoints?: number;
    pointsPerEuro?: number; 
    percentage?: number;
    conversionRate?: number;
    boostMultiplier?: number;
    boostValidFrom?: string;
    boostValidTo?: string;
   }
   
   export interface Offer {
    id: string;
    type: 'EARN' | 'SPEND';
    status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'ENDED' | 'CANCELLED' | 'ARCHIVED';
    name: string;
    description?: string;
    imageURL?: string;
    trackingURL?: string;
    rules: OfferRule[];
    minAmount: number;
    maxPoints: number;
    userQuota?: number;
    globalQuota?: number; 
    remainingQuota?: number;
    validFrom: string;
    validTo: string;
   }