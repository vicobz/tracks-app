// TransactionList.tsx
import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import Transaction from './Transaction';
import { colors } from '../../styles/theme';
import { Transaction as TransactionType } from '../../types/transaction';

// Mock data - à remplacer par les données réelles de votre API
const transactionsData: TransactionType[] = [
    {
        id: '1',
        icon: 'train',
        color: '#FFD700',
        name: 'SNCF Connect',
        date: 'Today',
        points: 150,
        type: 'EARN',
        partnerId: 'sncf'
    },
    {
        id: '2',
        icon: 'shopping-bag',
        color: '#9370DB',
        name: 'Wild Deo',
        date: 'Yesterday',
        points: -11,
        type: 'SPEND',
        partnerId: 'wilddeo'
    },
    {
        id: '3',
        icon: 'thermometer',
        color: '#FF6347',
        name: 'Cooltra',
        date: 'Yesterday',
        points: 45,
        type: 'EARN',
        partnerId: 'cooltra'
    },
    {
        id: '4',
        icon: 'train',
        color: '#4169E1',
        name: 'Rail Europe',
        date: 'May 17th',
        points: -400,
        type: 'SPEND',
        partnerId: 'raileurope'
    },
    {
        id: '5',
        icon: 'shopping-bag',
        color: '#9370DB',
        name: 'Vinted',
        date: 'May 8th',
        points: 11,
        type: 'EARN',
        partnerId: 'vinted'
    },
];

interface TransactionListProps {
    limit?: number;
    showHeader?: boolean;
    onlyType?: 'EARN' | 'SPEND';
}

export default function TransactionList({
    limit,
    showHeader = true,
    onlyType
}: TransactionListProps) {
    const filteredTransactions = onlyType
        ? transactionsData.filter(t => t.type === onlyType)
        : transactionsData;

    const displayTransactions = limit
        ? filteredTransactions.slice(0, limit)
        : filteredTransactions;

    const totalPoints = displayTransactions.reduce((sum, t) => sum + t.points, 0);

    const renderHeader = () => {
        if (!showHeader) return null;

        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Recent Transactions</Text>
                {limit && (
                    <Link href="/(tabs)/transactions" asChild>
                        <TouchableOpacity style={styles.viewAllButton}>
                            <Text style={styles.viewAllText}>View All</Text>
                            <Feather name="chevron-right" size={16} color={colors.secondary} />
                        </TouchableOpacity>
                    </Link>
                )}
            </View>
        );
    };

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Feather name="inbox" size={48} color="#666" />
            <Text style={styles.emptyText}>No transactions yet</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}

            {displayTransactions.length > 0 && (
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryText}>
                        Total Points:
                        <Text style={[
                            styles.summaryPoints,
                            { color: totalPoints >= 0 ? '#4CAF50' : '#F44336' }
                        ]}>
                            {' '}{totalPoints > 0 ? '+' : ''}{totalPoints}
                        </Text>
                    </Text>
                </View>
            )}

            <FlatList
                data={displayTransactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            // Navigation vers le détail de la transaction si nécessaire
                            console.log(`Transaction ${item.id} pressed`);
                        }}
                    >
                        <Transaction
                            icon={item.icon}
                            color={item.color}
                            name={item.name}
                            date={item.date}
                            points={item.points}
                        />
                    </TouchableOpacity>
                )}
                style={styles.list}
                ListEmptyComponent={renderEmptyState}
                contentContainerStyle={displayTransactions.length === 0 && styles.emptyContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        color: colors.secondary,
        marginRight: 4,
    },
    summaryContainer: {
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    summaryText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    summaryPoints: {
        fontWeight: 'bold',
    },
    list: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    emptyText: {
        color: '#666',
        marginTop: 12,
        fontSize: 16,
    },
});