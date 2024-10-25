import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';

export default function HomeScreen() {
    const { user } = useAuth();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>
                        Welcome back, {user?.firstName}!
                    </Text>
                    <Text style={styles.pointsText}>
                        {user?.tracks_balance} Tracks points
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA'
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    pointsText: {
        fontSize: 18,
        color: '#007AFF',
        marginTop: 5
    },
    section: {
        margin: 20
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10
    }
});