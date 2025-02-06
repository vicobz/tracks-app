// src/contexts/partners/PartnersProvider.tsx
import { useState, useEffect } from 'react';
import { PartnersContext } from './PartnersContext';
import { TransactionsService } from '../../api/transaction.service';
import { Partner } from '../../types/partner';
import { useAuth } from '../../hooks/useAuth';

export const PartnersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const [partners, setPartners] = useState<Partner[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchPartners = async () => {
        console.log('[Partners] Starting partners fetch...');
        try {
            setIsLoading(true);
            const response = await TransactionsService.listPartners();
            
            // Log la réponse complète pour debug
            console.log('[Partners] Raw response:', JSON.stringify(response, null, 2));
            
            const partnersData = response.data;
            console.log('[Partners] Successfully fetched partners:', {
                count: partnersData.length,
                firstPartnerId: partnersData[0]?.id || 'no partners',
                types: partnersData.map(p => p.type)
            });
            
            setPartners(partnersData);
        } catch (err) {
            console.error('[Partners] Error fetching partners:', {
                error: err instanceof Error ? err.message : 'Unknown error',
                isAuthenticated,
                isAuthLoading
            });
            setError(err instanceof Error ? err : new Error('Failed to fetch partners'));
        } finally {
            setIsLoading(false);
            console.log('[Partners] Fetch attempt completed');
        }
    };

    // Log les changements d'état du provider
    useEffect(() => {
        console.log('[Partners] State updated:', {
            partnersCount: partners.length,
            earnPartnersCount: partners.filter(p => p.type === 'EARN' || p.type === 'BOTH').length,
            spendPartnersCount: partners.filter(p => p.type === 'SPEND' || p.type === 'BOTH').length,
            isLoading,
            hasError: !!error
        });
    }, [partners, isLoading, error]);

    useEffect(() => {
        console.log('[Partners] Auth state changed:', {
            isAuthenticated,
            isAuthLoading
        });

        if (isAuthenticated && !isAuthLoading) {
            console.log('[Partners] Auth requirements met, initiating fetch...');
            fetchPartners();
        } else {
            console.log('[Partners] Waiting for auth:', {
                reason: !isAuthenticated ? 'not authenticated' : 'auth is still loading'
            });
        }
    }, [isAuthenticated, isAuthLoading]);

    // Debug des méthodes de filtrage
    const getEarnPartners = () => {
        const earnPartners = partners.filter(p => p.type === 'EARN' || p.type === 'BOTH');
        console.log('[Partners] Getting EARN partners:', {
            total: partners.length,
            filtered: earnPartners.length
        });
        return earnPartners;
    };

    const getSpendPartners = () => {
        const spendPartners = partners.filter(p => p.type === 'SPEND' || p.type === 'BOTH');
        console.log('[Partners] Getting SPEND partners:', {
            total: partners.length,
            filtered: spendPartners.length
        });
        return spendPartners;
    };

    return (
        <PartnersContext.Provider value={{
            partners,
            isLoading,
            error,
            getEarnPartners,
            getSpendPartners,
            getPartnerById: (id: string) => partners.find(p => p.id === id),
            getPartnerOffers: (partnerId: string) => partners.find(p => p.id === partnerId)?.offers || [],
            refreshPartners: fetchPartners
        }}>
            {children}
        </PartnersContext.Provider>
    );
};