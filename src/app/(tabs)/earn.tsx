// src/app/(tabs)/earn.tsx
import { View, Text } from 'react-native';
import { usePartners } from '../hooks/usePartners';

export default function EarnScreen() {
    const { getEarnPartners } = usePartners();

    return (
        <View>
            <Text>Earn Screen</Text>
            {/* Liste des partenaires EARN */}
        </View>
    );
}