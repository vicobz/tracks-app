// src/app/(auth)/reset-password.tsx
import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'expo-router';
import { colors } from '../styles/theme';
import { useToast } from '../contexts/toast/ToastContext';
import { isValidEmail } from '../utils/validation';

export default function ResetPasswordScreen() {
    const router = useRouter();
    const { resetPassword, isLoading } = useAuth();
    const { showToast } = useToast();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleResetPassword = async () => {
        if (!email.trim()) {
            showToast('Please enter your email address', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            await resetPassword(email.trim());
            showToast('Password reset instructions have been sent to your email', 'success');
            router.back();
        } catch (err: any) {
            showToast(err.message || 'Failed to reset password', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>
                    Enter your email address and we'll send you instructions to reset your password
                </Text>

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
                        autoFocus
                    />

                    <TouchableOpacity
                        style={[
                            styles.button,
                            (isSubmitting || isLoading) && styles.buttonDisabled
                        ]}
                        onPress={handleResetPassword}
                        disabled={isSubmitting || isLoading}
                    >
                        {isSubmitting || isLoading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>Send Reset Instructions</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => router.back()}
                        disabled={isSubmitting || isLoading}
                    >
                        <Text style={styles.backButtonText}>Back to Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark
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
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 40,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20
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
        marginBottom: 20,
        fontSize: 16,
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    button: {
        backgroundColor: colors.secondary,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: colors.backgroundDark,
        fontSize: 16,
        fontWeight: '600'
    },
    backButton: {
        marginTop: 20,
        alignItems: 'center'
    },
    backButtonText: {
        color: colors.secondary,
        fontSize: 16
    }
});