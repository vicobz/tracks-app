// app/types/transaction.ts
export interface Transaction {
    id: string;
    userID: string;
    offerID: string;
    partnerID: string;
    type: 'EARN' | 'SPEND';
    status: 'PENDING' | 'VALIDATED' | 'REJECTED' | 'FAILED';
    amount: number;
    currency: string;
    points: number;
    basePoints: number;
    boostPoints: number;
    orderRef?: string;
    proofURL?: string;
    metadata?: Record<string, unknown>;
    validatedAt?: string;
    validatedBy?: string;
    rejectedAt?: string;
    rejectedBy?: string;
    createdAt: string;
    updatedAt: string;

    icon?: string; // for display purpose
    color?: string;
    name?: string;
}

export interface TransactionFilter {
    type?: 'EARN' | 'SPEND';
    status?: 'PENDING' | 'VALIDATED' | 'REJECTED' | 'FAILED';
    fromDate?: string;
    toDate?: string;
    offerID?: string;
}