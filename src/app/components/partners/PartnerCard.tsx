// src/components/partners/PartnerCard.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Partner } from '../../types/partner';
import { colors } from '../../styles/theme';

interface PartnerCardProps {
    partner: Partner;
    onPress: () => void;
}

export default function PartnerCard({ partner, onPress }: PartnerCardProps) {
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: partner.logo }}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        {partner.type === 'BOTH' && (
                            <View style={styles.verifiedBadge}>
                                <Text style={styles.verifiedText}>★</Text>
                            </View>
                        )}
                        <Text style={styles.name} numberOfLines={1}>
                            {partner.name}
                        </Text>
                    </View>
                    <Text style={styles.partnerType}>
                        {partner.type === 'BOTH' ? 'EARN & SPEND Partner' : `${partner.type} Partner`}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        padding: 8,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: 220,
    },
    imageContainer: {
        height: 160,
        position: 'relative',
    },
    logo: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 80,
    },
    content: {
        padding: 12,
        flex: 1,
        justifyContent: 'space-between',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verifiedBadge: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    verifiedText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    name: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    partnerType: {
        fontSize: 12,
        color: colors.primary,
        fontWeight: '600',
        textTransform: 'uppercase',
    }
});