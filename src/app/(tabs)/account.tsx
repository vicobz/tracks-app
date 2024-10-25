import { View, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../app/hooks/useAuth';
import TracksCard from '../components/profile/TracksCard';
import TransactionList from '../components/profile/TransactionList';
import { colors } from '../styles/theme';

export default function AccountScreen() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.cardContainer}>
                <TracksCard user={user} />
            </View>
            <TransactionList />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark
    },
    cardContainer: {
        padding: 16
    }
});