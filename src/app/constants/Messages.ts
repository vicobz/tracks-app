// src/app/constants/Messages.ts

export const AUTH_MESSAGES = {
    ERRORS: {
        FORM_VALIDATION: 'auth.errors.form_validation',
        ACCOUNT_CREATION: 'auth.errors.account_creation',
        INVALID_EMAIL: 'auth.errors.invalid_email',
        INVALID_PASSWORD: 'auth.errors.invalid_password',
        INVALID_NAME: 'auth.errors.invalid_name',
        REQUIRED_FIELD: 'auth.errors.required_field',
        RESET_PASSWORD_UNAVAILABLE: 'auth.errors.reset_password_unavailable'
    },
    SUCCESS: {
        ACCOUNT_CREATED: 'auth.success.account_created',
        PASSWORD_RESET_SENT: 'auth.success.password_reset_sent'
    },
    VALIDATION: {
        PASSWORD_STRENGTH: {
            WEAK: 'auth.validation.password.weak',
            MEDIUM: 'auth.validation.password.medium',
            STRONG: 'auth.validation.password.strong'
        }
    }
} as const;

// Fonction de traduction temporaire
export const t = (key: string): string => {
    // En attendant l'implémentation i18n, on retourne un message par défaut pour chaque clé
    const messages: Record<string, string> = {
        [AUTH_MESSAGES.ERRORS.FORM_VALIDATION]: 'Please correct the form errors',
        [AUTH_MESSAGES.ERRORS.ACCOUNT_CREATION]: 'Failed to create account',
        [AUTH_MESSAGES.ERRORS.INVALID_EMAIL]: 'Please enter a valid email address',
        [AUTH_MESSAGES.ERRORS.INVALID_PASSWORD]: 'Password must be at least 8 characters with letters and numbers',
        [AUTH_MESSAGES.ERRORS.INVALID_NAME]: 'Name is required',
        [AUTH_MESSAGES.ERRORS.REQUIRED_FIELD]: 'This field is required',
        [AUTH_MESSAGES.SUCCESS.ACCOUNT_CREATED]: 'Account created successfully!',
        [AUTH_MESSAGES.SUCCESS.PASSWORD_RESET_SENT]: 'Password reset instructions have been sent to your email',
        [AUTH_MESSAGES.VALIDATION.PASSWORD_STRENGTH.WEAK]: 'Password is too weak',
        [AUTH_MESSAGES.VALIDATION.PASSWORD_STRENGTH.MEDIUM]: 'Password strength is medium',
        [AUTH_MESSAGES.VALIDATION.PASSWORD_STRENGTH.STRONG]: 'Password strength is strong',
    };

    return messages[key] || key;
};