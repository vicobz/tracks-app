// app/(tabs)/earn/index.tsx
import { View } from 'react-native';
import { useCallback } from 'react';
import { usePartners } from '../../hooks/usePartners';
import PartnerGrid from '../../components/partners/PartnerGrid';
import { colors } from '../../styles/theme';

export default function EarnScreen() {
    const { getEarnPartners, isLoading, refreshPartners } = usePartners();
    const earnPartners = getEarnPartners();

    const handleRefresh = useCallback(async () => {
        await refreshPartners();
    }, [refreshPartners]);

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundDark }}>
            <PartnerGrid 
                partners={earnPartners} 
                isLoading={isLoading}
                type="EARN"
                onRefresh={handleRefresh}
            />
        </View>
    );
}