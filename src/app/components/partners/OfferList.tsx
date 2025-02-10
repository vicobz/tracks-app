// components/partners/OfferList.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Offer } from '../../types/offer';
import { colors } from '../../styles/theme';
import Loader from '../common/Loader';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

interface OfferListProps {
    offers: Offer[];
    isLoading?: boolean;
    partnerId: string;
}

export default function OfferList({ offers, isLoading, partnerId }: OfferListProps) {
    const router = useRouter();
    console.log('OfferList - Received offers:', offers);

    if (isLoading) {
        return <Loader />;
    }

    const handleOfferPress = (offer: Offer) => {
        console.log('OfferList - Handling press for offer:', offer);
        router.push({
            pathname: '/offer/[id]',
            params: {
                id: offer.id,
                partnerId: offer.partner_id
            }
        });
    };

    if (!offers || offers.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    Aucune offre disponible
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {offers.map((offer, index) => (
                <Animated.View
                    key={offer.id}
                    entering={FadeInDown.delay(index * 100)}
                    style={styles.cardOuterContainer}
                >
                    <View style={styles.cardShadowContainer}>
                        <View style={styles.cardContainer}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.card,
                                    pressed && styles.cardPressed
                                ]}
                                onPress={() => handleOfferPress(offer)}
                            >
                                <View style={styles.imageWrapper}>
                                    {offer.image_url && (
                                        <Image
                                            source={{ uri: offer.image_url }}
                                            style={styles.image}
                                            resizeMode="cover"
                                        />
                                    )}
                                </View>

                                <View style={styles.contentContainer}>
                                    <Text style={styles.name} numberOfLines={1}>
                                        {offer.name}
                                    </Text>
                                    {offer.description && (
                                        <Text style={styles.description} numberOfLines={2}>
                                            {offer.description}
                                        </Text>
                                    )}
                                    <View style={styles.details}>
                                        <View style={styles.pointsContainer}>
                                            <Text
                                                style={[
                                                    styles.points,
                                                    { color: offer.type === 'EARN' ? colors.green : colors.blueAero }
                                                ]}
                                            >
                                                {offer.type === 'EARN' ? '+' : ''}{offer.max_points} Tracks
                                            </Text>
                                            {offer.valid_to && (
                                                <Text style={styles.validity}>
                                                    Expires on {format(new Date(offer.valid_to), 'dd MMM yyyy', { locale: enGB })}
                                                </Text>
                                            )}
                                        </View>
                                        {offer.min_amount > 0 && (
                                            <View style={styles.priceContainer}>
                                                <Text style={styles.price}>
                                                    Min. {offer.min_amount}€
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </Animated.View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    cardOuterContainer: {
        marginHorizontal: 16,
        marginBottom: 8,
    },
    cardShadowContainer: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.8,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    cardContainer: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    cardPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    imageWrapper: {
        width: '100%',
        height: 180,
        backgroundColor: colors.backgroundDark,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 16,
        lineHeight: 20,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
    },
    pointsContainer: {
        flex: 1,
        marginRight: 8,
    },
    points: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    validity: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.5)',
    },
    priceContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: 8,
    },
    price: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    emptyContainer: {
        margin: 16,
        padding: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 16,
        textAlign: 'center',
    },
});