// app/components/profile/TransactionList.tsx
import { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, RefreshControl } from 'react-native';
import { TransactionsService } from '../../api/transaction.service';
import { Transaction as TransactionType } from '../../types/transaction';
import Transaction from './Transaction';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../common/Loader';
import { colors } from '../../styles/theme';

const PAGE_SIZE = 10;

interface TransactionListProps {
    showHeader?: boolean;
    onlyType?: 'EARN' | 'SPEND' | undefined;
}

export default function TransactionList({
    showHeader = true,
    onlyType
}: TransactionListProps) {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPoints, setTotalPoints] = useState(0);

    const loadTransactions = async (page: number, refresh = false) => {
        if (!user?.id || (!refresh && !hasMore)) return;

        try {
            setIsLoading(true);
            const response = await TransactionsService.listUserTransactions(user.id, {
                page,
                limit: PAGE_SIZE,
                type: onlyType
            });

            const newTransactions = response.data;

            setTransactions(prev => refresh ? newTransactions : [...prev, ...newTransactions]);
            setHasMore(newTransactions.length === PAGE_SIZE);

            // Calculate total points
            const total = newTransactions.reduce((sum, t) => sum + t.points, 0);
            setTotalPoints(prev => refresh ? total : prev + total);
        } catch (error) {
            console.error('Failed to load transactions:', error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadTransactions(1, true);
    }, [user?.id, onlyType]);

    const handleRefresh = () => {
        setRefreshing(true);
        setCurrentPage(1);
        loadTransactions(1, true);
    };

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            loadTransactions(nextPage);
        }
    };

    const getTransactionIcon = (type: 'EARN' | 'SPEND'): string => {
        return type === 'EARN' ? 'plus-circle' : 'minus-circle';
    };

    const renderHeader = () => {
        if (!showHeader) return null;

        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Recent Transactions</Text>
                {transactions.length > 0 && (
                    <View style={styles.summaryContainer}>
                        <Text style={styles.summaryText}>
                            Total Points:
                            <Text style={[
                                styles.summaryPoints,
                                { color: totalPoints >= 0 ? colors.success : colors.error }
                            ]}>
                                {' '}{totalPoints > 0 ? '+' : ''}{totalPoints}
                            </Text>
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No transactions yet</Text>
        </View>
    );

    if (!user) return null;

    return (
        <FlatList
            data={transactions}
            renderItem={({ item }) => (
                <Transaction
                    icon={getTransactionIcon(item.type)}
                    color={item.type === 'EARN' ? colors.success : colors.error}
                    name={item.name || `Transaction ${item.id.slice(0, 8)}`}
                    date={new Date(item.createdAt).toLocaleDateString()}
                    points={item.points}
                />
            )}
            keyExtractor={item => item.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    tintColor={colors.secondary}
                />
            }
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderEmptyState}
            ListFooterComponent={isLoading ? <Loader fullScreen={false} /> : null}
            style={styles.list}
            contentContainerStyle={
                transactions.length === 0 ? styles.emptyContainer : undefined
            }
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: colors.backgroundDark
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 8
    },
    summaryContainer: {
        marginTop: 8
    },
    summaryText: {
        color: '#FFFFFF',
        fontSize: 16
    },
    summaryPoints: {
        fontWeight: 'bold'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyState: {
        padding: 20,
        alignItems: 'center'
    },
    emptyText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 16
    }
});