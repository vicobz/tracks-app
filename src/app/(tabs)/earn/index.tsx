// app/(tabs)/earn/index.tsx
import { View } from 'react-native';
import { usePartners } from '../../hooks/usePartners';
import PartnerGrid from '../../components/partners/PartnerGrid';
import { colors } from '../../styles/theme';

export default function EarnScreen() {
    const { getEarnPartners, isLoading } = usePartners();
    const earnPartners = getEarnPartners();

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundDark }}>
            <PartnerGrid 
                partners={earnPartners} 
                isLoading={isLoading}
                type="EARN"
            />
        </View>
    );
}