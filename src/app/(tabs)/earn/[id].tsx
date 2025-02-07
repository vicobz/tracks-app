// app/(tabs)/earn/[id].tsx
import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePartners } from '../../hooks/usePartners';
import { colors } from '../../styles/theme';
import OfferList from '../../components/partners/OfferList';
import Loader from '../../components/common/Loader';

export default function PartnerScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { getPartnerById, isLoading } = usePartners();
    
    const partner = getPartnerById(id);
    console.log('PartnerScreen - Partner:', partner);
    
    // Handle loading state
    if (isLoading && !partner) {
        return <Loader />;
    }
    
    // Handle invalid partner ID
    if (!partner) {
        console.log('PartnerScreen - No partner found for id:', id);
        router.back();
        return null;
    }

    // Filter active offers of the current type (EARN)
    const activeOffers = partner.offers.filter(offer => 
        offer.status === 'ACTIVE' && 
        offer.type === 'EARN' &&
        new Date(offer.valid_to) > new Date()
    );
    
    console.log('PartnerScreen - Filtered offers:', {
        count: activeOffers.length,
        activeOffers
    });

    return (
        <ScrollView style={styles.container} bounces={false}>
            <View style={styles.header}>
                <Image 
                    source={{ uri: partner.logo }}
                    style={styles.logo}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.name}>{partner.name}</Text>
                
                {partner.description && (
                    <Text style={styles.description}>{partner.description}</Text>
                )}

                {partner.website && (
                    <Text style={styles.website}>{partner.website}</Text>
                )}

                <View style={styles.offersSection}>
                    <Text style={styles.offersTitle}>
                        {activeOffers.length > 0 
                            ? `Les offres de ${partner.name}`
                            : 'Aucune offre disponible actuellement'}
                    </Text>
                    
                    <OfferList 
                        offers={activeOffers}
                        isLoading={isLoading}
                        partnerId={partner.id}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 200,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    content: {
        padding: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 16,
        lineHeight: 24,
    },
    website: {
        fontSize: 14,
        color: colors.primary,
        marginBottom: 24,
    },
    offersSection: {
        marginTop: 24,
    },
    offersTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 16,
    }
});