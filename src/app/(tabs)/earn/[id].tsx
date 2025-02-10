// app/(tabs)/earn/[id].tsx
import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Linking,
    Platform
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors } from '../../styles/theme';
import { usePartners } from '../../hooks/usePartners';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../contexts/toast/ToastContext';
import OfferRules from '../../components/offer/OfferRules';
import Loader from '../../components/common/Loader';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Component-specific types
interface OfferDetailRouteParams {
    offerId?: string;
    partnerId?: string;
}

interface ConditionItemProps {
    label: string;
    value: string;
}

const ConditionItem: React.FC<ConditionItemProps> = ({ label, value }) => (
    <View style={styles.condition}>
        <Text style={styles.conditionLabel}>{label}</Text>
        <Text style={styles.conditionValue}>{value}</Text>
    </View>
);

export default function OfferDetailScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const { getPartnerById, isLoading } = usePartners();
    const { showToast } = useToast();
    const { user } = useAuth();

    // Vérification précoce des paramètres
    if (!params.id || !params.partnerId) {
        showToast('Invalid offer parameters', 'error');
        router.back();
        return null;
    }

    const partnerId = Array.isArray(params.partnerId) ? params.partnerId[0] : params.partnerId;
    const partner = getPartnerById(partnerId);
    const offer = partner?.offers.find(o => o.id === params.id);

    if (isLoading) {
        return <Loader />;
    }

    if (!offer || !partner) {
        showToast('This offer is not available', 'error');
        router.back();
        return null;
    }

    const handleRedirect = async () => {
        if (offer.tracking_url) {
            try {
                await Linking.openURL(offer.tracking_url);
            } catch (error) {
                showToast('Unable to open the link', 'error');
                console.error('Failed to open tracking URL:', error);
            }
        }
    };

    const renderQuotaInfo = () => {
        if (!offer.remaining_quota || !offer.global_quota) return null;

        const remaining = offer.remaining_quota;
        const total = offer.global_quota;
        const percentage = Math.round((remaining / total) * 100);

        if (percentage <= 20) {
            return (
                <View style={styles.quotaBadge}>
                    <Text style={styles.quotaText}>Only {remaining} offers left!</Text>
                </View>
            );
        }
        return null;
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
                    {/* Header Image */}
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: offer.image_url || partner.logo }}
                            style={styles.headerImage}
                            resizeMode="cover"
                        />
                        <View style={styles.overlay} />
                        <View style={styles.headerContent}>
                            <Text style={styles.offerName}>{offer.name}</Text>
                            {renderQuotaInfo()}
                        </View>
                    </View>

                    {/* Main Content */}
                    <View style={styles.mainContent}>
                        {/* Description */}
                        {offer.description && (
                            <View style={styles.section}>
                                <Text style={styles.description}>{offer.description}</Text>
                            </View>
                        )}

                        {/* Rules Section */}
                        <View style={styles.section}>
                            <OfferRules
                                rules={offer.rules}
                                userSubscriptionType={user?.subscriptionType || 'FREE'}
                            />
                        </View>

                        {/* Conditions Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Conditions</Text>

                            {offer.min_amount > 0 && (
                                <ConditionItem
                                    label="Minimum amount"
                                    value={`${offer.min_amount}€`}
                                />
                            )}

                            {offer.max_points > 0 && (
                                <ConditionItem
                                    label="Maximum points"
                                    value={`${offer.max_points} points`}
                                />
                            )}

                            {offer.valid_to && (
                                <ConditionItem
                                    label="Valid until"
                                    value={format(new Date(offer.valid_to), 'dd MMMM yyyy', { locale: fr })}
                                />
                            )}

                            {offer.user_quota && (
                                <ConditionItem
                                    label="Limit per user"
                                    value={`${offer.user_quota} times`}
                                />
                            )}
                        </View>
                    </View>
                </Animated.View>
            </ScrollView>

            {/* CTA Button */}
            <View style={styles.ctaContainer}>
                <TouchableOpacity
                    style={styles.ctaButton}
                    onPress={handleRedirect}
                    disabled={!offer.tracking_url}
                >
                    <Text style={styles.ctaText}>
                        {offer.type === 'EARN' ? 'Get this offer' : 'Use my points'}
                    </Text>
                </TouchableOpacity>
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
    },
    content: {
        flex: 1,
    },
    imageContainer: {
        height: 240,
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.backgroundDark,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    headerContent: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    offerName: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
    },
    section: {
        marginBottom: 24,
    },
    description: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 16,
    },
    condition: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    conditionLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
    },
    conditionValue: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    quotaBadge: {
        backgroundColor: colors.warning,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    quotaText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    mainContent: {
        padding: 16,
    },
    ctaContainer: {
        padding: 16,
        paddingBottom: Platform.OS === 'ios' ? 34 : 16,
        backgroundColor: colors.backgroundDark,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    ctaButton: {
        backgroundColor: colors.secondary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    ctaText: {
        color: colors.backgroundDark,
        fontSize: 16,
        fontWeight: '600',
    },
});