// app/(tabs)/spend/index.tsx
import { View } from 'react-native';
import { usePartners } from '../../hooks/usePartners';
import PartnerGrid from '../../components/partners/PartnerGrid';
import { colors } from '../../styles/theme';

export default function SpendScreen() {
    const { getSpendPartners, isLoading } = usePartners();
    const spendPartners = getSpendPartners();

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundDark }}>
            <PartnerGrid 
                partners={spendPartners} 
                isLoading={isLoading}
                type="SPEND"
            />
        </View>
    );
}