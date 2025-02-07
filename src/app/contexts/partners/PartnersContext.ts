// src/contexts/partners/PartnersContext.ts
import { createContext } from 'react';
import { Partner } from '../../types/partner';

interface PartnersContextType {
    partners: Partner[];
    isLoading: boolean;
    error: Error | null;
    lastUpdate: Date | null;
    getEarnPartners: () => Partner[];
    getSpendPartners: () => Partner[];
    getPartnerById: (id: string) => Partner | undefined;
    refreshPartners: () => Promise<void>;
}

export const PartnersContext = createContext<PartnersContextType>({
    partners: [],
    isLoading: false,
    error: null,
    lastUpdate: null,
    getEarnPartners: () => [],
    getSpendPartners: () => [],
    getPartnerById: () => undefined,
    refreshPartners: async () => {},
});