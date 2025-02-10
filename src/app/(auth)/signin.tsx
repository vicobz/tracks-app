// src/app/(auth)/signin.tsx
import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { Link, useRouter } from 'expo-router';
import { colors } from '../styles/theme';
import { isValidEmail } from '../utils/validation';

export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();
    
    const { signIn, isLoading, error, isAuthenticated } = useAuth();
    
    useEffect(() => {
        console.log("Authentication state changed:", { 
            isAuthenticated, 
            isLoading 
        });

        if (isAuthenticated && !isLoading) {
            console.log("Navigating to tabs");
            router.replace('/(tabs)/earn');
        }
    }, [isAuthenticated, isLoading]);

    const handleSignIn = async () => {
        // Form validation
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);
        try {
            await signIn(email.trim(), password);
        } catch (err: any) {
            Alert.alert(
                'Sign In Failed',
                err.message || 'An unexpected error occurred'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleForgotPassword = () => {
        // Navigate to reset password screen
        // TODO: Implement navigation to reset password
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Welcome to Tracks</Text>
                    <Text style={styles.subtitle}>Sign in to continue</Text>

                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#666"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            editable={!isSubmitting}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#666"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            editable={!isSubmitting}
                        />

                        <TouchableOpacity
                            style={styles.forgotPassword}
                            onPress={handleForgotPassword}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.forgotPasswordText}>
                                Forgot password?
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                (isSubmitting || isLoading) && styles.buttonDisabled
                            ]}
                            onPress={handleSignIn}
                            disabled={isSubmitting || isLoading}
                        >
                            {isSubmitting || isLoading ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={styles.buttonText}>Sign In</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {error && (
                        <Text style={styles.errorText}>
                            {error.message}
                        </Text>
                    )}

                    <Link href="/(auth)/signup" asChild>
                        <TouchableOpacity
                            style={styles.linkButton}
                            disabled={isSubmitting || isLoading}
                        >
                            <Text style={styles.linkText}>
                                Don't have an account? Sign Up
                            </Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 40,
        textAlign: 'center'
    },
    form: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center'
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: colors.secondary,
        fontSize: 14,
    },
    button: {
        backgroundColor: colors.secondary,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: colors.backgroundDark,
        fontSize: 16,
        fontWeight: '600'
    },
    errorText: {
        color: colors.error,
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14
    },
    linkButton: {
        marginTop: 20,
        alignItems: 'center'
    },
    linkText: {
        color: colors.secondary,
        fontSize: 16
    }
});