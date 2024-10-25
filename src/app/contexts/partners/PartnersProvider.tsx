import React, { useState } from 'react';
import { PartnersContext, PartnersContextType } from './PartnersContext';
import { Partner } from '../../types/partner';
import { Offer } from '../../types/offer';

export function PartnersProvider({ children }: { children: React.ReactNode }) {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const refreshPartners = async () => {
        setIsLoading(true);
        try {
            // TODO: Implement actual API call
            const mockPartners: Partner[] = [
                {
                    id: '1',
                    name: 'Green Railway',
                    logo: '/assets/partners/railway.png',
                    type: 'BOTH',
                    description: 'Eco-friendly rail travel'
                }
            ];
            setPartners(mockPartners);
        } catch (error) {
            console.error('Error fetching partners:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getPartnerOffers = (partnerId: string) => {
        return offers.filter(offer => offer.partnerId === partnerId);
    };

    const getEarnPartners = () => {
        return partners.filter(partner => 
            partner.type === 'EARN' || partner.type === 'BOTH'
        );
    };

    const getSpendPartners = () => {
        return partners.filter(partner => 
            partner.type === 'SPEND' || partner.type === 'BOTH'
        );
    };

    return (
        <PartnersContext.Provider value={{
            partners,
            offers,
            isLoading,
            getPartnerOffers,
            getEarnPartners,
            getSpendPartners,
            refreshPartners
        }}>
            {children}
        </PartnersContext.Provider>
    );
}