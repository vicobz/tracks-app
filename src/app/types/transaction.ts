export interface Transaction {
    id: string;
    icon: string;
    color: string;
    name: string;
    date: string;
    points: number;
    type: 'EARN' | 'SPEND';
    partnerId: string;
}