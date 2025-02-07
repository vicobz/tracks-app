// app/(tabs)/spend/index.tsx
import { View } from 'react-native';
import { useCallback } from 'react';
import { usePartners } from '../../hooks/usePartners';
import PartnerGrid from '../../components/partners/PartnerGrid';
import { colors } from '../../styles/theme';

export default function SpendScreen() {
    const { getSpendPartners, isLoading, refreshPartners } = usePartners();
    const spendPartners = getSpendPartners();

    const handleRefresh = useCallback(async () => {
        await refreshPartners();
    }, [refreshPartners]);

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundDark }}>
            <PartnerGrid 
                partners={spendPartners} 
                isLoading={isLoading}
                type="SPEND"
                onRefresh={handleRefresh}
            />
        </View>
    );
}