// src/utils/validation.ts

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
    // Minimum 8 characters, at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

export const getPasswordStrength = (password: string): {
    strength: 'weak' | 'medium' | 'strong';
    message: string;
} => {
    if (password.length < 8) {
        return { 
            strength: 'weak',
            message: 'Password should be at least 8 characters long'
        };
    }

    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasLetter && hasNumber && hasSpecialChar && password.length >= 12) {
        return {
            strength: 'strong',
            message: 'Strong password'
        };
    }

    if (hasLetter && hasNumber) {
        return {
            strength: 'medium',
            message: 'Add special characters to make your password stronger'
        };
    }

    return {
        strength: 'weak',
        message: 'Password should contain both letters and numbers'
    };
};

export const isValidName = (name: string): boolean => {
    return name.trim().length >= 2;
};

export const formatValidationErrors = (errors: Record<string, string>): string => {
    return Object.values(errors).join('\n');
};