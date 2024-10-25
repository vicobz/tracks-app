import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'expo-router';

export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, isLoading } = useAuth();

    const handleSignIn = async () => {
        try {
            await signIn(email, password);
        } catch (error) {
            console.error('Sign in error:', error);
            // Gérer l'erreur (afficher un message, etc.)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Tracks</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignIn}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                </Text>
            </TouchableOpacity>
            
            <Link href="/(auth)/signup" asChild>
                <TouchableOpacity style={styles.linkButton}>
                    <Text style={styles.linkText}>
                        Don't have an account? Sign Up
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600'
    },
    linkButton: {
        marginTop: 20,
        alignItems: 'center'
    },
    linkText: {
        color: '#007AFF',
        fontSize: 16
    }
});