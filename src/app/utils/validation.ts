// src/utils/validation.ts

export const isValidEmail = (email: string): boolean => {
    console.log('Validating email:', email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    console.log('Email validation result:', isValid);
    return isValid;
};

export const isValidPassword = (password: string): boolean => {
    console.log('Validating password length:', password.length);
    // Minimum 8 characters, at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[\w\W]{8,}$/;
    const isValid = passwordRegex.test(password);
    console.log('Password validation details: is valid ? ' + isValid, {
        length: password.length >= 8,
        hasLetter: /[A-Za-z]/.test(password),
        hasNumber: /\d/.test(password),
        finalResult: isValid
    });
    return isValid;
};

export const isValidName = (name: string): boolean => {
    console.log('Validating name:', name);
    const isValid = name.trim().length >= 2;
    console.log('Name validation result:', isValid);
    return isValid;
};

export const getPasswordStrength = (password: string) => {
    console.log('Checking password strength');
    if (password.length < 8) {
        console.log('Password too short');
        return { 
            strength: 'weak',
            message: 'Password should be at least 8 characters long'
        };
    }

    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    console.log('Password criteria:', {
        hasLetter,
        hasNumber,
        hasSpecialChar,
        length: password.length
    });

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

export const formatValidationErrors = (errors: Record<string, string>): string => {
    return Object.values(errors).join('\n');
};