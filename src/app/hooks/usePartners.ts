import { useContext } from 'react';
import { PartnersContext } from '../contexts/partners/PartnersContext';

export const usePartners = () => {
    const context = useContext(PartnersContext);
    if (!context) {
        throw new Error('usePartners must be used within a PartnersProvider');
    }
    return context;
};