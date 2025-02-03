// src/components/common/Toast.tsx
import React, { useEffect } from 'react';
import { Platform, View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors } from '../../styles/theme';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onHide: () => void;
    duration?: number;
}

export default function Toast({ message, type, onHide, duration = 3000 }: ToastProps) {
    const translateY = new Animated.Value(-100);

    useEffect(() => {
        // Slide in
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            speed: 12,
            bounciness: 5
        }).start();

        // Auto hide after duration
        const timer = setTimeout(() => {
            Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true
            }).start(() => onHide());
        }, duration);

        return () => clearTimeout(timer);
    }, []);

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return colors.success;
            case 'error':
                return colors.error;
            default:
                return colors.primary;
        }
    };

    return (
        <Animated.View
            style={[
                styles.container,
                { transform: [{ translateY }], backgroundColor: getBackgroundColor() }
            ]}
        >
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 16,
        paddingTop: Platform.OS === 'ios' ? 50 : 16,
        zIndex: 9999,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    message: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500'
    }
});