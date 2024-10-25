export interface Offer {
    id: string;
    partnerId: string;
    name: string;
    description: string;
    imageUrl: string;
    type: 'EARN' | 'SPEND';
    points: number;
    price?: number;
    currency?: string;
    terms?: string;
    validUntil?: Date;
}