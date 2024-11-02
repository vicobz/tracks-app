// components/partners/OfferList.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Offer } from '../../types/offer';
import { colors } from '../../styles/theme';

interface OfferListProps {
    offers: Offer[];
    onOfferPress: (offerId: string) => void;
}

export default function OfferList({ offers, onOfferPress }: OfferListProps) {
    return (
        <View style={styles.container}>
            {offers.map((offer) => (
                <Pressable 
                    key={offer.id}
                    style={styles.offerCard}
                    onPress={() => onOfferPress(offer.id)}
                >
                    <Image
                        source={{ uri: offer.imageUrl }}
                        style={styles.offerImage}
                        resizeMode="cover"
                    />
                    <View style={styles.offerContent}>
                        <Text style={styles.offerName}>{offer.name}</Text>
                        <Text style={styles.offerDescription} numberOfLines={2}>
                            {offer.description}
                        </Text>
                        <View style={styles.offerDetails}>
                            {offer.type === 'EARN' ? (
                                <Text style={styles.points}>+{offer.points} Tracks</Text>
                            ) : (
                                <Text style={styles.points}>{offer.points} Tracks</Text>
                            )}
                            {offer.price && (
                                <Text style={styles.price}>
                                    {offer.price} {offer.currency}
                                </Text>
                            )}
                        </View>
                    </View>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    offerCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        overflow: 'hidden',
    },
    offerImage: {
        width: '100%',
        height: 160,
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
    },
    offerDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    points: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.secondary,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.9)',
    },
});