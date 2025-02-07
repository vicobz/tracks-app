// src/contexts/partners/PartnersProvider.tsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { PartnersContext } from './PartnersContext';
import { TransactionsService } from '../../api/transaction.service';
import { Partner } from '../../types/partner';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../toast/ToastContext';

// Refresh interval in milliseconds (5 minutes)
const REFRESH_INTERVAL = 5 * 60 * 1000;

export const PartnersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const { showToast } = useToast();
    const [partners, setPartners] = useState<Partner[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    // Use ref to prevent unnecessary re-renders
    const fetchInProgress = useRef(false);

    const fetchPartners = useCallback(async (showError = true) => {
        // Prevent concurrent fetches
        if (fetchInProgress.current) {
            console.log('[Partners] Fetch already in progress, skipping...');
            return;
        }

        console.log('[Partners] Starting partners fetch...');
        fetchInProgress.current = true;

        try {
            setIsLoading(true);
            const response = await TransactionsService.listActivePartnersWithOffers();

            const partnersData = response.data;
            console.log('[Partners] Raw data:', JSON.stringify(response.data, null, 2));

            setPartners(partnersData);
            setLastUpdate(new Date());
            setError(null);
        } catch (err) {
            console.error('[Partners] Error fetching partners:', {
                error: err instanceof Error ? err.message : 'Unknown error',
                isAuthenticated,
                isAuthLoading
            });
            setError(err instanceof Error ? err : new Error('Failed to fetch partners'));
            if (showError) {
                showToast('Failed to fetch partners. Please try again later.', 'error');
            }
        } finally {
            setIsLoading(false);
            fetchInProgress.current = false;
        }
    }, [isAuthenticated, showToast]); // Remove isAuthLoading from dependencies

    // Initial fetch
    useEffect(() => {
        if (isAuthenticated && !isAuthLoading && !lastUpdate) {
            console.log('[Partners] Auth requirements met, initiating fetch...');
            fetchPartners();
        }
    }, [isAuthenticated, isAuthLoading, fetchPartners, lastUpdate]);

    // Setup periodic refresh
    useEffect(() => {
        if (!isAuthenticated) return;

        const intervalId = setInterval(() => {
            console.log('[Partners] Running periodic refresh...');
            fetchPartners(false); // Don't show errors for background refresh
        }, REFRESH_INTERVAL);

        return () => clearInterval(intervalId);
    }, [isAuthenticated, fetchPartners]);

    const getEarnPartners = useCallback(() => {
        return partners.filter(p => p.type === 'EARN' || p.type === 'BOTH');
    }, [partners]);

    const getSpendPartners = useCallback(() => {
        return partners.filter(p => p.type === 'SPEND' || p.type === 'BOTH');
    }, [partners]);

    const getPartnerById = useCallback((id: string) => {
        return partners.find(p => p.id === id);
    }, [partners]);

    return (
        <PartnersContext.Provider value={{
            partners,
            isLoading,
            error,
            lastUpdate,
            getEarnPartners,
            getSpendPartners,
            getPartnerById,
            refreshPartners: () => fetchPartners(true)
        }}>
            {children}
        </PartnersContext.Provider>
    );
};