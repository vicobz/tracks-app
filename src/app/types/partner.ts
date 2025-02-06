// app/types/partner.ts
import { Offer } from './offer';

export interface Partner {
 id: string;
 name: string;
 logo: string;
 type: 'EARN' | 'SPEND' | 'BOTH';
 // Added icon property
 icon?: string;
 color?: string;
 description?: string;
 website?: string;
 offers: Offer[];
}