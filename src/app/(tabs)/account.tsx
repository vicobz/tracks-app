// src/app/(tabs)/account.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'expo-router';
import TracksCard from '../components/profile/TracksCard';
import TransactionList from '../components/profile/TransactionList';
import { colors } from '../styles/theme';
import { Feather } from '@expo/vector-icons';

export default function AccountScreen() {
    const { user, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log('Platform:', Platform.OS);
        console.log('User data:', JSON.stringify(user, null, 2));
    }, [user]);

    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace('/(auth)/signin');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    if (!user) return null;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TracksCard user={user} />
                <TransactionList />
            </View>
            <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={handleSignOut}
            >
                <Feather 
                    name="log-out" 
                    size={20} 
                    color={colors.error} 
                    style={styles.logoutIcon}
                />
                <Text style={styles.logoutText}>Déconnexion</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark
    },
    content: {
        flex: 1
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        backgroundColor: 'rgba(255,255,255,0.05)', 
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    logoutIcon: {
        marginRight: 10
    },
    logoutText: {
        color: colors.error,
        fontSize: 16,
        fontWeight: '600'
    }
});