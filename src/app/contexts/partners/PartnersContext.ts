import { createContext } from 'react';
import { Partner } from '../../types/partner';
import { Offer } from '../../types/offer';

export interface PartnersContextType {
    partners: Partner[];
    offers: Offer[];
    isLoading: boolean;
    getPartnerOffers: (partnerId: string) => Offer[];
    getEarnPartners: () => Partner[];
    getSpendPartners: () => Partner[];
    refreshPartners: () => Promise<void>;
}

export const PartnersContext = createContext<PartnersContextType | undefined>(undefined);