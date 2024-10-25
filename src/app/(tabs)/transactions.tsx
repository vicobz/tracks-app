import { View, StyleSheet } from 'react-native';
import TransactionList from '../components/profile/TransactionList';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../styles/theme';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TransactionsScreen() {
    const { user } = useAuth();
    const insets = useSafeAreaInsets();

    if (!user) return null;

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Stack.Screen 
                options={{
                    headerTitle: "Transactions History",
                    headerStyle: {
                        backgroundColor: colors.backgroundDark,
                    },
                    headerTitleStyle: {
                        fontWeight: '600',
                    },
                    headerTintColor: '#fff',
                }}
            />
            <TransactionList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark,
    }
});