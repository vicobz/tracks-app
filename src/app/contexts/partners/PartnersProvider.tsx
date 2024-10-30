// src/contexts/partners/PartnersProvider.tsx
import React, { useState, useEffect } from 'react';
import { PartnersContext } from './PartnersContext';
import { Partner } from '../../types/partner';
import { Offer } from '../../types/offer';

// Données mockées pour le développement
const MOCK_PARTNERS: Partner[] = [
    {
        id: '1',
        name: 'Green Transport',
        logo: 'https://picsum.photos/200',
        type: 'BOTH',
        description: 'Leader in sustainable transportation',
        website: 'https://greentransport.com'
    },
    {
        id: '2',
        name: 'Eco Store',
        logo: 'https://picsum.photos/201',
        type: 'EARN',
        description: 'Your sustainable shopping destination',
        website: 'https://ecostoreshop.com'
    },
    {
        id: '3',
        name: 'Clean Energy Co',
        logo: 'https://picsum.photos/202',
        type: 'SPEND',
        description: 'Renewable energy solutions',
        website: 'https://cleanenergyco.com'
    }
];

const MOCK_OFFERS: Offer[] = [
    {
        id: '1',
        partnerId: '1',
        name: 'Train Paris-Lyon',
        description: 'Low-carbon train journey',
        imageUrl: 'https://picsum.photos/203',
        type: 'EARN',
        points: 100,
        price: 50,
        currency: 'EUR'
    },
    {
        id: '2',
        partnerId: '1',
        name: 'Electric Car Rental',
        description: 'Weekend rental of an electric vehicle',
        imageUrl: 'https://picsum.photos/204',
        type: 'SPEND',
        points: 500,
        price: 150,
        currency: 'EUR'
    }
];

export const PartnersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchPartners = async () => {
        try {
            // Simuler un appel API
            await new Promise(resolve => setTimeout(resolve, 1000));
            setPartners(MOCK_PARTNERS);
            setOffers(MOCK_OFFERS);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch partners'));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

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

    const getPartnerById = (id: string) => {
        return partners.find(partner => partner.id === id);
    };

    const getPartnerOffers = (partnerId: string) => {
        return offers.filter(offer => offer.partnerId === partnerId);
    };

    const refreshPartners = async () => {
        setIsLoading(true);
        await fetchPartners();
    };

    return (
        <PartnersContext.Provider
            value={{
                partners,
                isLoading,
                error,
                getEarnPartners,
                getSpendPartners,
                getPartnerById,
                getPartnerOffers,
                refreshPartners
            }}
        >
            {children}
        </PartnersContext.Provider>
    );
};