// app/components/offers/OfferRules.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../styles/theme';
import type { Rule } from '../../types/offer';

interface OfferRulesProps {
    rules: Rule[];
    userSubscriptionType: string;
}

const RuleCard = ({
    rule,
    isUserSubscription,
    index
}: {
    rule: Rule;
    isUserSubscription: boolean;
    index: number;
}) => {
    const getMainText = () => {
        switch (rule.type) {
            case 'EARN_POINTS_PER_EURO':
                return (
                    <Text style={styles.ruleText}>
                        <Text style={styles.highlight}>{rule.points_per_euro}</Text> points per €</Text>
                );
            case 'EARN_FIXED_POINTS':
                return (
                    <Text style={styles.ruleText}>
                        <Text style={styles.highlight}>{rule.base_points}</Text> fixed points</Text>
                );
            case 'EARN_PERCENT_CASHBACK':
                return (
                    <Text style={styles.ruleText}>
                        <Text style={styles.highlight}>{rule.percentage}%</Text> cashback
                    </Text>
                );
        }
    };

    const getBoostText = () => {
        if (rule.boost_multiplier) {
            const boostPercentage = ((rule.boost_multiplier - 1) * 100).toFixed(0);
            return (
                <View style={styles.boostContainer}>
                    <Text style={styles.boostText}>+{boostPercentage}% bonus</Text>
                    {rule.boost_valid_to && (
                        <Text style={styles.boostValidityText}>
                            until {new Date(rule.boost_valid_to).toLocaleDateString()}
                        </Text>
                    )}
                </View>
            );
        }
        return null;
    };

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 200)}
            style={[
                styles.ruleCard,
                isUserSubscription ? styles.activeCard : styles.inactiveCard
            ]}
        >
            <View style={styles.subscriptionBadge}>
                <Text style={styles.subscriptionText}>
                    {rule.subscription_type}
                </Text>
            </View>

            <View style={styles.ruleContent}>
                {getMainText()}
                {getBoostText()}
            </View>
        </Animated.View>
    );
};

export default function OfferRules({ rules, userSubscriptionType }: OfferRulesProps) {
    const sortedRules = [...rules].sort((a, b) => {
        if (a.subscription_type === userSubscriptionType) return -1;
        if (b.subscription_type === userSubscriptionType) return 1;
        return 0;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your rewards</Text>
            {sortedRules.map((rule, index) => (
                <RuleCard
                    key={`${rule.type}-${rule.subscription_type}-${index}`}
                    rule={rule}
                    isUserSubscription={rule.subscription_type === userSubscriptionType}
                    index={index}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 16,
    },
    ruleCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    activeCard: {
        backgroundColor: 'rgba(143, 214, 148, 0.15)',
        borderColor: colors.green,
        borderWidth: 1,
    },
    inactiveCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    subscriptionBadge: {
        position: 'absolute',
        right: 12,
        top: 12,
        backgroundColor: colors.backgroundDark,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    subscriptionText: {
        color: colors.secondary,
        fontSize: 12,
        fontWeight: '600',
    },
    ruleContent: {
        marginTop: 8,
    },
    ruleText: {
        color: '#FFFFFF',
        fontSize: 18,
        marginBottom: 8,
    },
    highlight: {
        color: colors.secondary,
        fontWeight: '600',
    },
    boostContainer: {
        marginTop: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    boostText: {
        color: colors.secondary,
        fontSize: 14,
        fontWeight: '500',
    },
    boostValidityText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
        marginTop: 2,
    },
});