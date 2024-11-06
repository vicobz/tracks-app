// app/offer/[id].tsx
import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import * as Linking from 'expo-linking';
import { usePartners } from '../hooks/usePartners';
import { colors } from '../styles/theme';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function OfferScreen() {
    const { id: offerId, partnerId } = useLocalSearchParams();
    const router = useRouter();
    const { getPartnerById } = usePartners();

    const partner = getPartnerById(partnerId as string);
    const offer = partner?.offers.find(o => o.id === offerId);

    if (!offer || !partner) {
        router.back();
        return null;
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
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: colors.backgroundDark },
                    headerTintColor: '#FFFFFF',
                    title: partner.name,
                }}
            />

            <ScrollView
                style={styles.scrollView}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View
                    entering={FadeIn}
                    style={styles.content}
                >
                    {/* Header avec image et logo */}
                    <View style={styles.headerContainer}>
                        <Image
                            source={{ uri: offer.imageUrl }}
                            style={styles.headerImage}
                            resizeMode="cover"
                        />
                        <View style={styles.logoContainer}>
                            <Image
                                source={{ uri: partner.logo }}
                                style={styles.partnerLogo}
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    <View style={styles.mainContent}>
                        {/* Badge Type */}
                        <View style={[
                            styles.badge,
                            { backgroundColor: offer.type === 'EARN' ? colors.green : colors.blueAero }
                        ]}>
                            <Text style={styles.badgeText}>
                                {offer.type === 'EARN' ? 'Collect' : 'Spend'}
                            </Text>
                        </View>

                        {/* Titre et Description */}
                        <Text style={styles.title}>{offer.name}</Text>
                        <Text style={styles.description}>{offer.description}</Text>

                        {/* Points et Prix */}
                        <View style={styles.card}>
                            <View style={styles.cardContent}>
                                <View>
                                    <Text style={styles.cardLabel}>
                                        {offer.type === 'EARN' ? 'You collect' : 'Needed Tracks points'}
                                    </Text>
                                    <Text style={[
                                        styles.points,
                                        { color: offer.type === 'EARN' ? colors.green : colors.blueAero }
                                    ]}>
                                        {offer.type === 'EARN' ? '+' : ''}{offer.points} Tracks
                                    </Text>
                                </View>
                                {offer.price && (
                                    <View>
                                        <Text style={styles.cardLabel}>Price</Text>
                                        <Text style={styles.price}>
                                            {offer.price} {offer.currency}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>

                        {/* Conditions */}
                        {offer.conditions && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Conditions</Text>
                                <Text style={styles.sectionText}>{offer.conditions}</Text>
                            </View>
                        )}

                        {/* Date de validité */}
                        {offer.validUntil && (
                            <Text style={styles.validity}>
                                Valid until {format(new Date(offer.validUntil), 'dd MMMM yyyy', { locale: enGB })}
                            </Text>
                        )}
                    </View>
                </Animated.View>
            </ScrollView>

            {/* CTA */}
            <View style={styles.ctaContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.ctaButton,
                        { backgroundColor: offer.type === 'EARN' ? colors.green : colors.blueAero },
                        pressed && styles.ctaButtonPressed
                    ]}
                    onPress={handleRedirect}
                    disabled={!offer.redirectUrl}
                >
                    <Text style={styles.ctaText}>
                        {offer.type === 'EARN'
                            ? `Collect ${offer.points} Tracks`
                            : `Spend ${offer.points} Tracks`}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark,
    },
    scrollView: {
        flex: 1,
        zIndex: 1,
    },
    content: {
        flex: 1,
        paddingBottom: Platform.OS === 'ios' ? 100 : 82,
    },
    headerContainer: {
        position: 'relative',
        width: '100%',
    },
    headerImage: {
        width: '100%',
        height: 240,
        backgroundColor: colors.backgroundDark,
    },
    logoContainer: {
        position: 'absolute',
        left: 16,
        bottom: -32,
        backgroundColor: colors.backgroundDark,
        padding: 4,
        borderRadius: 44,
        elevation: 4,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    partnerLogo: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.backgroundDark,
    },
    mainContent: {
        padding: 16,
        paddingTop: 48,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 16,
    },
    badgeText: {
        color: colors.backgroundDark,
        fontSize: 14,
        fontWeight: '600',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 24,
        lineHeight: 24,
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
        fontWeight: 'bold'
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
    sectionText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 24,
    },
    validity: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.6)',
        textAlign: 'center',
    },
    ctaContainer: {
        padding: 16,
        paddingBottom: Platform.OS === 'ios' ? 34 : 16,
        backgroundColor: colors.backgroundDark,
        elevation: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 2,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
    },
    ctaButton: {
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ctaButtonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    ctaText: {
        color: colors.backgroundDark,
        fontSize: 16,
        fontWeight: '600',
    },
});