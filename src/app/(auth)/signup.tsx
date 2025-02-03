// src/app/(auth)/signup.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { Link, useRouter } from 'expo-router';
import { colors } from '../styles/theme';
import { useToast } from '../contexts/toast/ToastContext';
import { isValidEmail, isValidPassword, isValidName, getPasswordStrength } from '../utils/validation';
import { AUTH_MESSAGES, t } from '../constants/Messages';


interface FormErrors {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
}

export default function SignUpScreen() {
    const router = useRouter();
    const { signUp, isLoading } = useAuth();
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [passwordStrength, setPasswordStrength] = useState({
        strength: 'weak',
        message: ''
    });

    const handleChangePassword = (password: string) => {
        setFormData(prev => ({ ...prev, password }));
        setPasswordStrength(getPasswordStrength(password));
    };

    const handleSignUp = async () => {
        console.log('Starting sign up process');
        if (!validateForm()) {
            console.log('Form validation failed');
            showToast(t(AUTH_MESSAGES.ERRORS.FORM_VALIDATION), 'error');
            return;
        }
    
        console.log('Form validated successfully, proceeding with signup');
        setIsSubmitting(true);
        try {
            const userData = {
                email: formData.email.trim(),
                password: formData.password,
                first_name: formData.firstName.trim(),
                last_name: formData.lastName.trim()
            };
            console.log('Submitting user data:', {
                ...userData,
                password: '***' // masquer le mot de passe dans les logs
            });
    
            await signUp(userData);
            console.log('Signup successful');
            showToast(t(AUTH_MESSAGES.SUCCESS.ACCOUNT_CREATED), 'success');
            router.replace('/(tabs)/');
        } catch (err: any) {
            console.error('Signup error:', err);
            showToast(t(AUTH_MESSAGES.ERRORS.ACCOUNT_CREATION), 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const validateForm = (): boolean => {
        console.log('Starting form validation');
        const errors: FormErrors = {};
        let isValid = true;
    
        console.log('Validating form data:', {
            email: formData.email,
            passwordLength: formData.password.length,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
        });
    
        if (!isValidEmail(formData.email)) {
            console.log('Email validation failed');
            errors.email = t(AUTH_MESSAGES.ERRORS.INVALID_EMAIL);
            isValid = false;
        }
    
        if (!isValidPassword(formData.password)) {
            console.log('Password validation failed');
            errors.password = t(AUTH_MESSAGES.ERRORS.INVALID_PASSWORD);
            isValid = false;
        }
    
        if (!isValidName(formData.firstName)) {
            console.log('First name validation failed');
            errors.firstName = t(AUTH_MESSAGES.ERRORS.INVALID_NAME);
            isValid = false;
        }
    
        if (!isValidName(formData.lastName)) {
            console.log('Last name validation failed');
            errors.lastName = t(AUTH_MESSAGES.ERRORS.INVALID_NAME);
            isValid = false;
        }
    
        console.log('Form errors:', errors);
        console.log('Form is valid:', isValid);
    
        setFormErrors(errors);
        return isValid;
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join Tracks and start earning points</Text>

                    <View style={styles.form}>
                        <TextInput
                            style={[
                                styles.input,
                                formErrors.firstName ? styles.inputError : undefined
                            ]}
                            placeholder="First Name"
                            placeholderTextColor="#666"
                            value={formData.firstName}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
                            editable={!isSubmitting}
                        />
                        {formErrors.firstName && (
                            <Text style={styles.errorText}>{formErrors.firstName}</Text>
                        )}

                        <TextInput
                            style={[
                                styles.input,
                                formErrors.lastName ? styles.inputError : undefined
                            ]}
                            placeholder="Last Name"
                            placeholderTextColor="#666"
                            value={formData.lastName}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
                            editable={!isSubmitting}
                        />
                        {formErrors.lastName && (
                            <Text style={styles.errorText}>{formErrors.lastName}</Text>
                        )}

                        <TextInput
                            style={[
                                styles.input,
                                formErrors.email ? styles.inputError : undefined
                            ]}
                            placeholder="Email"
                            placeholderTextColor="#666"
                            value={formData.email}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            editable={!isSubmitting}
                        />
                        {formErrors.email && (
                            <Text style={styles.errorText}>{formErrors.email}</Text>
                        )}

                        <TextInput
                            style={[styles.input, formErrors.password ? styles.inputError : undefined]}
                            placeholder="Password"
                            placeholderTextColor="#666"
                            value={formData.password}
                            onChangeText={handleChangePassword}
                            secureTextEntry
                            editable={!isSubmitting}
                        />
                        {passwordStrength.message && (
                            <Text style={[
                                styles.passwordStrength,
                                { color: passwordStrength.strength === 'strong' ? colors.success : colors.warning }
                            ]}>
                                {passwordStrength.message}
                            </Text>
                        )}

                        <TouchableOpacity
                            style={[
                                styles.button,
                                (isSubmitting || isLoading) && styles.buttonDisabled
                            ]}
                            onPress={handleSignUp}
                            disabled={isSubmitting || isLoading}
                        >
                            {isSubmitting || isLoading ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={styles.buttonText}>Create Account</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <Link href="/(auth)/signin" asChild>
                        <TouchableOpacity
                            style={styles.linkButton}
                            disabled={isSubmitting || isLoading}
                        >
                            <Text style={styles.linkText}>
                                Already have an account? Sign In
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
    inputError: {
        borderColor: colors.error
    },
    errorText: {
        color: colors.error,
        fontSize: 12,
        marginTop: -10,
        marginBottom: 15,
        marginLeft: 5
    },
    passwordStrength: {
        fontSize: 12,
        marginTop: -10,
        marginBottom: 15,
        marginLeft: 5
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
    linkButton: {
        marginTop: 20,
        alignItems: 'center'
    },
    linkText: {
        color: colors.secondary,
        fontSize: 16
    }
});