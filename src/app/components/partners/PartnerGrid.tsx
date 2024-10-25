// src/components/partners/PartnerGrid.tsx
import { View, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Partner } from '../../types/partner';
import PartnerCard from './PartnerCard';
import Loader from '../common/Loader';

interface PartnerGridProps {
    partners: Partner[];
    isLoading: boolean;
    type: 'EARN' | 'SPEND';
}

export default function PartnerGrid({ partners, isLoading, type }: PartnerGridProps) {
    const router = useRouter();

    if (isLoading) return <Loader />;

    return (
        <FlatList
            data={partners}
            renderItem={({ item }) => (
                <PartnerCard 
                    partner={item}
                    onPress={() => {
                        router.push('/(tabs)/partner/${item.id}');
                    }}
                />
            )}  
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.grid}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    grid: {
        // TODO
    }
});