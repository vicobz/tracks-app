export interface Partner {
    id: string;
    name: string;
    logo: string;
    type: 'EARN' | 'SPEND' | 'BOTH';
    description?: string;
    website?: string;
}