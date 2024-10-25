import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Partner } from '../../types/partner';
import { colors } from '../../styles/theme'

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
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.name} numberOfLines={1}>
                        {partner.name}
                    </Text>
                    <Text style={styles.description} numberOfLines={2}>
                        {partner.description}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: 200,
    },
    imageContainer: {
        height: 120,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    logo: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },
    content: {
        padding: 12,
        flex: 1,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        lineHeight: 20,
    }
});