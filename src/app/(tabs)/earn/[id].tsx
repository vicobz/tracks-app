// app/(tabs)/earn/[id].tsx
import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePartners } from '../../hooks/usePartners';
import { colors } from '../../styles/theme';
import OfferList from '../../components/partners/OfferList';

export default function PartnerScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { getPartnerById } = usePartners();
    
    const partner = getPartnerById(id);
    
    if (!partner) {
        router.back();
        return null;
    }
    
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
                <Text style={styles.partnerType}>
                    {partner.type === 'BOTH' ? 'EARN & SPEND Partner' : 'EARN Partner'}
                </Text>
                
                <Text style={styles.name}>{partner.name}</Text>
                
                {partner.description && (
                    <Text style={styles.description}>{partner.description}</Text>
                )}

                {partner.website && (
                    <Text style={styles.website}>{partner.website}</Text>
                )}

                <View style={styles.offersSection}>
                    <Text style={styles.offersTitle}>Les offres de {partner.name}</Text>
                    <OfferList 
                        partner={partner}
                        type="EARN"
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
    partnerType: {
        fontSize: 12,
        color: colors.primary,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 8,
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
    },
});