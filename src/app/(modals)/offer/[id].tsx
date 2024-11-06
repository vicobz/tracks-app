// src/app/(modals)/offer/[id].tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { usePartners } from '../../hooks/usePartners';
import { colors } from '../../styles/theme';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function OfferModal() {
    const router = useRouter();
    const { id: offerId, partnerId } = useLocalSearchParams();
    const { partners } = usePartners();

    const partner = partners?.find(p => p.id === partnerId);
    const offer = partner?.offers.find(o => o.id === offerId);

    if (!offer || !partner) {
        return (
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={styles.errorContainer}
            >
                <Text style={styles.errorText}>Offre non trouvée</Text>
            </Animated.View>
        );
    }

    const handleRedirect = async () => {
        if (offer.redirectUrl) {
            try {
                await Linking.openURL(offer.redirectUrl);
            } catch (error) {
                console.error('Erreur lors de la redirection:', error);
            }
        }
    };

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.container}
        >
            <ScrollView style={styles.scrollView} bounces={false}>
                <Image
                    source={{ uri: offer.imageUrl }}
                    style={styles.headerImage}
                    resizeMode="cover"
                />

                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: partner.logo }}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{offer.name}</Text>
                        <Text style={styles.subtitle}>{partner.name}</Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <View>
                                <Text style={styles.cardLabel}>
                                    {offer.type === 'EARN' ? 'Gagnez' : 'Coût'}
                                </Text>
                                <Text style={styles.points}>
                                    {offer.type === 'EARN' ? '+' : ''}{offer.points} Tracks
                                </Text>
                            </View>
                            {offer.price && (
                                <View>
                                    <Text style={styles.cardLabel}>
                                        {offer.type === 'EARN' ? 'Prix' : 'Valeur'}
                                    </Text>
                                    <Text style={styles.price}>
                                        {offer.price} {offer.currency}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{offer.description}</Text>
                    </View>

                    {offer.conditions && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Conditions</Text>
                            <Text style={styles.description}>{offer.conditions}</Text>
                        </View>
                    )}

                    {offer.validUntil && (
                        <View style={styles.validityContainer}>
                            <Text style={styles.validityText}>
                                Valable jusqu'au {format(new Date(offer.validUntil), 'dd MMMM yyyy', { locale: fr })}
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <Animated.View
                entering={FadeIn.delay(300)}
                style={styles.ctaContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.ctaButton,
                        !offer.redirectUrl && styles.ctaButtonDisabled,
                        pressed && styles.ctaButtonPressed
                    ]}
                    onPress={handleRedirect}
                    disabled={!offer.redirectUrl}>
                    <Text style={styles.ctaText}>
                        {offer.type === 'EARN'
                            ? `Gagner ${offer.points} Tracks`
                            : `Échanger ${offer.points} Tracks`}
                    </Text>
                </Pressable>
            </Animated.View>
        </Animated.View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    scrollView: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
    },
    headerImage: {
        width: '100%',
        height: 240,
    },
    logoContainer: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 12,
        padding: 8,
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    content: {
        padding: 16,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        marginBottom: 24,
    },
    cardContent: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardLabel: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 4,
    },
    points: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.secondary,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 24,
    },
    validityContainer: {
        marginBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    validityText: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.6)',
    },
    ctaContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        backgroundColor: '#000000',
    },
    ctaButton: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    ctaButtonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
    },
    ctaButtonDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        shadowOpacity: 0,
        elevation: 0,
    },
    ctaText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});