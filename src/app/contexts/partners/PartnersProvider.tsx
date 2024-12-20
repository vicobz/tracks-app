// src/contexts/partners/PartnersProvider.tsx
import React, { useState, useEffect } from 'react';
import { PartnersContext } from './PartnersContext';
import { Partner } from '../../types/partner';
import { Offer } from '../../types/offer';

const MOCK_PARTNERS: Partner[] = [
    {
        id: '1',
        name: 'European Sleeper',
        logo: 'https://yt3.googleusercontent.com/s3vpPGt5Ch9NFDsuna7Mic2wKlhOGl2_ENcDRR6oTjHbnlJkFldV55xlGMplmmzFoqFGJUlq=s900-c-k-c0x00ffffff-no-rj',
        type: 'BOTH',
        description: 'Night Train Transportation',
        website: 'https://www.europeansleeper.eu/',
        offers: [
            {
                id: '101',
                partnerId: '1',
                name: 'Amsterdam Night Train',
                description: 'Travel overnight from Brussels to Berlin in comfort. Save on hotel costs and wake up refreshed at your destination.',
                imageUrl: 'https://picsum.photos/800/400',
                type: 'EARN',
                points: 250,
                price: 129,
                currency: 'EUR',
                conditions: 'Booking required at least 14 days in advance. Limited seats available.',
                validUntil: new Date('2024-12-31'),
                redirectUrl: 'https://www.europeansleeper.eu/amsterdam'
            },
            {
                id: '102',
                partnerId: '1',
                name: 'Comfort Plus Package',
                description: 'Upgrade your journey with our Comfort Plus package including dinner, breakfast, and private cabin.',
                imageUrl: 'https://picsum.photos/800/401',
                type: 'SPEND',
                points: 1500,
                price: 89,
                currency: 'EUR',
                conditions: 'Valid only with a regular ticket purchase.',
                validUntil: new Date('2024-12-31'),
                redirectUrl: 'https://www.europeansleeper.eu/en/comfort-plus'
            },
            {
                id: '103',
                partnerId: '1',
                name: 'Early Bird Special',
                description: 'Book 3 months in advance and earn extra points while securing the best prices.',
                imageUrl: 'https://picsum.photos/800/402',
                type: 'EARN',
                points: 400,
                price: 99,
                currency: 'EUR',
                conditions: 'Non-refundable. Booking 90 days in advance required.',
                validUntil: new Date('2024-06-30'),
                redirectUrl: 'https://www.europeansleeper.eu/en/early-bird'
            }
        ]
    },
    {
        id: '2',
        name: 'Helios',
        logo: 'https://www.helios.do/_astro/helios-transparent-logo.BxIHIZ-o.png',
        type: 'EARN',
        description: 'Your sustainable banking services',
        website: 'https://www.helios.do',
        offers: [
            {
                id: '201',
                partnerId: '2',
                name: 'Open Green Account',
                description: 'Open your sustainable banking account and earn Tracks points. Banking that benefits the planet.',
                imageUrl: 'https://picsum.photos/800/403',
                type: 'EARN',
                points: 1000,
                conditions: 'New customers only. Account must remain active for 3 months.',
                validUntil: new Date('2024-12-31'),
                redirectUrl: 'https://www.helios.do/account/register'
            },
            {
                id: '202',
                partnerId: '2',
                name: 'Sustainable Card Usage',
                description: 'Earn points for every purchase made with your Helios card on sustainable merchants.',
                imageUrl: 'https://picsum.photos/800/404',
                type: 'EARN',
                points: 50,
                conditions: 'Minimum purchase amount: 20€',
                validUntil: new Date('2024-12-31'),
                redirectUrl: 'https://www.helios.do/card'
            },
            {
                id: '203',
                partnerId: '2',
                name: 'Refer a Friend',
                description: 'Introduce a friend to sustainable banking and earn bonus points when they open an account.',
                imageUrl: 'https://picsum.photos/800/405',
                type: 'EARN',
                points: 500,
                conditions: 'Referral must open and maintain an active account for 1 month.',
                validUntil: new Date('2024-12-31'),
                redirectUrl: 'https://www.helios.do/refer'
            }
        ]
    },
    {
        id: '3',
        name: 'Clean Energy Co',
        logo: 'https://picsum.photos/202',
        type: 'SPEND',
        description: 'Renewable energy solutions',
        website: 'https://cleanenergyco.com',
        offers: [
            {
                id: '301',
                partnerId: '3',
                name: 'Solar Panel Discount',
                description: 'Use your Tracks points for a discount on solar panel installation.',
                imageUrl: 'https://picsum.photos/800/406',
                type: 'SPEND',
                points: 5000,
                price: 500,
                currency: 'EUR',
                conditions: 'Valid for residential installations only.',
                validUntil: new Date('2024-12-31'),
                redirectUrl: 'https://cleanenergyco.com/solar'
            },
            {
                id: '302',
                partnerId: '3',
                name: 'Energy Audit',
                description: 'Get a professional energy audit of your home at a discounted price.',
                imageUrl: 'https://picsum.photos/800/407',
                type: 'SPEND',
                points: 1000,
                price: 99,
                currency: 'EUR',
                conditions: 'Available in selected cities only.',
                validUntil: new Date('2024-12-31'),
                redirectUrl: 'https://cleanenergyco.com/audit'
            },
            {
                id: '303',
                partnerId: '3',
                name: 'Smart Thermostat',
                description: 'Redeem your points for a smart thermostat and reduce your energy consumption.',
                imageUrl: 'https://picsum.photos/800/408',
                type: 'SPEND',
                points: 2000,
                price: 199,
                currency: 'EUR',
                conditions: 'Professional installation not included.',
                validUntil: new Date('2024-12-31'),
                redirectUrl: 'https://cleanenergyco.com/thermostat'
            }
        ]
    },
    {
        id: '4',
        name: 'Rail Europe',
        logo: 'https://cdn.cookielaw.org/logos/9b5a48b9-7c03-4aa4-b72a-2bfee7d1f994/56866d30-80a3-4ddb-97ab-9495b4140e5a/07532ae6-7f93-4687-843e-494e7b3d1c67/Background=White,_Brand=True.png',
        type: 'EARN',
        description: 'Your European rail adventure starts here',
        website: 'https://www.raileurope.com',
        offers: [
            {
                id: '401',
                partnerId: '4',
                name: 'Eurail Pass',
                description: 'Earn bonus points when purchasing your Eurail Pass for sustainable travel across Europe.',
                imageUrl: 'https://picsum.photos/800/409',
                type: 'EARN',
                points: 750,
                price: 299,
                currency: 'EUR',
                conditions: 'Valid for passes of 15 days or more.',
                validUntil: new Date('2024-12-31'),
                redirectUrl: 'https://www.raileurope.com/fr'
            },
            {
                id: '402',
                partnerId: '4',
                name: 'City-to-City Direct',
                description: 'Book direct train connections between major European cities.',
                imageUrl: 'https://picsum.photos/800/410',
                type: 'EARN',
                points: 200,
                price: 79,
                currency: 'EUR',
                conditions: 'Points awarded after travel completion.',
                validUntil: new Date('2024-12-31'),
                redirectUrl: 'https://www.raileurope.com/direct'
            },
            {
                id: '403',
                partnerId: '4',
                name: 'Rail&Stay Package',
                description: 'Combine your train journey with eco-friendly hotel stays.',
                imageUrl: 'https://picsum.photos/800/411',
                type: 'EARN',
                points: 500,
                price: 399,
                currency: 'EUR',
                conditions: 'Minimum 3 nights stay required.',
                validUntil: new Date('2024-12-31'),
                redirectUrl: 'https://www.raileurope.com/packages'
            }
        ]
    }
];

export const PartnersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchPartners = async () => {
        try {
            // Simuler un appel API
            await new Promise(resolve => setTimeout(resolve, 1000));
            setPartners(MOCK_PARTNERS);
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
        const partner = partners.find(p => p.id === partnerId);
        return partner?.offers || [];
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