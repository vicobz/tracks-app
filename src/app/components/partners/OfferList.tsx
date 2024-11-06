// components/partners/OfferList.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Partner } from '../../types/partner';
import { colors } from '../../styles/theme';
import { Offer } from '../../types/offer';
import Loader from '../common/Loader';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface OfferListProps {
    partner: Partner | undefined;
    type: 'EARN' | 'SPEND';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function OfferList({ partner, type }: OfferListProps) {
    const router = useRouter();

    if (!partner) {
        return <Loader />;
    }

    const offers = partner.offers?.filter(offer => offer.type === type) || [];

    const handleOfferPress = (offer: Offer) => {
        router.push({
            pathname: '/(modals)/offer/[id]',
            params: { 
                id: offer.id, 
                partnerId: partner.id 
            }
        });
    };

    if (offers.length === 0) {
        return (
            <Animated.View
                entering={FadeInDown}
                style={styles.emptyContainer}
            >
                <Text style={styles.emptyText}>
                    Aucune offre {type === 'EARN' ? 'à gagner' : 'à échanger'} disponible
                </Text>
            </Animated.View>
        );
    }

    return (
        <View style={styles.container}>
            {offers.map((offer, index) => (
                <AnimatedPressable
                    key={offer.id}
                    style={({ pressed }) => [
                        styles.offerCard,
                        pressed && styles.offerCardPressed
                    ]}
                    onPress={() => handleOfferPress(offer)}
                    entering={FadeInDown.delay(index * 100)}
                    android_ripple={{
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderless: false
                    }}
                >
                    <Image
                        source={{ uri: offer.imageUrl }}
                        style={styles.offerImage}
                        resizeMode="cover"
                    />
                    <View style={styles.offerContent}>
                        <Text style={styles.offerName} numberOfLines={1}>
                            {offer.name}
                        </Text>
                        <Text style={styles.offerDescription} numberOfLines={2}>
                            {offer.description}
                        </Text>
                        <View style={styles.offerDetails}>
                            <View style={styles.pointsContainer}>
                                <Text style={styles.points}>
                                    {type === 'EARN' ? '+' : ''}{offer.points} Tracks
                                </Text>
                                {offer.validUntil && (
                                    <Text style={styles.validity}>
                                        Expire le {format(new Date(offer.validUntil), 'dd MMM yyyy', { locale: fr })}
                                    </Text>
                                )}
                            </View>
                            {offer.price && (
                                <Text style={styles.price}>
                                    {offer.price} {offer.currency}
                                </Text>
                            )}
                        </View>
                    </View>
                </AnimatedPressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    emptyContainer: {
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 16,
        textAlign: 'center',
    },
    offerCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    offerCardPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
        shadowOpacity: 0.2,
        elevation: 2,
    },
    offerImage: {
        width: '100%',
        height: 160,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    offerContent: {
        padding: 16,
    },
    offerName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    offerDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 12,
        lineHeight: 20,
    },
    offerDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    pointsContainer: {
        flex: 1,
        marginRight: 8,
    },
    points: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.secondary,
        marginBottom: 4,
    },
    validity: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.9)',
    },
});