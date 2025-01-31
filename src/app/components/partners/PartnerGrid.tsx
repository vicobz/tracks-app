// src/components/partners/PartnerGrid.tsx
import { View, FlatList, Text, StyleSheet } from 'react-native';
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

    const featuredPartners = partners.filter(p => p.type === 'BOTH');
    const otherPartners = partners.filter(p => p.type !== 'BOTH');

    const navigateToPartner = (partnerId: string) => {
        const path = type === 'EARN' ? '/earn/[id]' as const : '/spend/[id]' as const;
            
        router.push({
            pathname: path,
            params: { id: partnerId }
        });
    };

    const renderSection = (title: string, data: Partner[]) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <PartnerCard 
                        partner={item}
                        onPress={() => navigateToPartner(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalGrid}
            />
        </View>
    );

    return (
        <FlatList
            ListHeaderComponent={
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        {type === 'EARN' ? 'Collectez des Tracks' : 'Dépensez vos Tracks'}
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        {type === 'EARN' 
                            ? 'Gagnez des points en achetant des produits et des services durables 🌱'
                            : 'Convertissez vos points produits et services éco-responsables 🌱'}
                    </Text>
                </View>
            }
            data={[{ key: 'content' }]}
            renderItem={() => (
                <View>
                    {featuredPartners.length > 0 && renderSection('Nos favoris', featuredPartners)}
                    {otherPartners.length > 0 && renderSection('Toutes les offres', otherPartners)}
                </View>
            )}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 24,
    },
    header: {
        padding: 16,
        paddingTop: 24,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 16,
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    horizontalGrid: {
        paddingHorizontal: 8,
    },
});