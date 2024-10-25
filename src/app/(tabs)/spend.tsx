import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, RefreshControl } from 'react-native';
import { usePartners } from '../hooks/usePartners';
import PartnerGrid from '../components/partners/PartnerGrid';
import Loader from '../components/common/Loader';
import { colors } from '../styles/theme';
import { useAuth } from '../hooks/useAuth';

export default function SpendScreen() {
    const { user } = useAuth();
    const { getSpendPartners, isLoading, refreshPartners } = usePartners();
    const [refreshing, setRefreshing] = useState(false);

    const spendPartners = getSpendPartners();

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await refreshPartners();
        setRefreshing(false);
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.secondary}
                    />
                }
            >
                {/* Header avec solde de points */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Spend Tracks Points</Text>
                    <View style={styles.pointsContainer}>
                        <Text style={styles.pointsLabel}>Available Points</Text>
                        <Text style={styles.pointsValue}>
                            {user?.tracks_balance?.toLocaleString() || 0}
                        </Text>
                    </View>
                </View>

                {/* Grille des partenaires */}
                <PartnerGrid 
                    isLoading={isLoading}
                    partners={spendPartners}
                    type="SPEND"
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark
    },
    header: {
        padding: 16,
        backgroundColor: colors.secondary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 16
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 8
    },
    pointsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pointsLabel: {
        fontSize: 16,
        color: '#FFF',
        opacity: 0.8
    },
    pointsValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF'
    }
});