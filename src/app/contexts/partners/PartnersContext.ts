// src/contexts/partners/PartnersContext.ts
import { createContext } from 'react';
import { Partner } from '../../types/partner';
import { Offer } from '../../types/offer';

interface PartnersContextType {
    partners: Partner[];
    isLoading: boolean;
    error: Error | null;
    getEarnPartners: () => Partner[];
    getSpendPartners: () => Partner[];
    getPartnerById: (id: string) => Partner | undefined;
    getPartnerOffers: (partnerId: string) => Offer[];
    refreshPartners: () => Promise<void>;
}

export const PartnersContext = createContext<PartnersContextType>({
    partners: [],
    isLoading: false,
    error: null,
    getEarnPartners: () => [],
    getSpendPartners: () => [],
    getPartnerById: () => undefined,
    getPartnerOffers: () => [],
    refreshPartners: async () => {},
});