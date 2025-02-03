// src/contexts/auth/AuthProvider.tsx
import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { AuthService } from '../../api/auth.service';
import { TokenStorage } from '../../storage/token.storage';
import { User } from '../../types/user';
import { useProtectedRoute } from '../../hooks/useProtectedRoute';
import { ApiError } from '../../types/auth.types';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    useProtectedRoute(user);

    useEffect(() => {
        checkAuthState();
    }, []);

    const checkAuthState = async () => {
        try {
            const isAuthenticated = await AuthService.checkAuth();
            if (!isAuthenticated) {
                setUser(null);
                return;
            }
            // TODO: Implement user info endpoint and fetch user data here
        } catch (error) {
            console.error('Auth state check failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await AuthService.login({ email, password });
            setUser({
                id: response.user.id,
                email: response.user.email,
                firstName: response.user.first_name,
                lastName: response.user.last_name,
                tracksBalance: response.user.tracks_balance,
                tracksLoyaltyNumber: response.user.loyalty_number,
                //city: '', // These fields are not in the API response
                // address: '', // Consider updating the User type or the API
            });
        } catch (error) {
            setError(error as ApiError);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (userData: {
        email: string;
        password: string;
        first_name: string;
        last_name: string;
    }) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await AuthService.register(userData);
            setUser({
                id: response.user.id,
                email: response.user.email,
                firstName: response.user.first_name,
                lastName: response.user.last_name,
                tracksBalance: response.user.tracks_balance,
                tracksLoyaltyNumber: response.user.loyalty_number,
                //city: '',
                //address: '',
            });
        } catch (error) {
            setError(error as ApiError);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        setIsLoading(true);
        try {
            await AuthService.logout();
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (email: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await AuthService.resetPassword({ email });
        } catch (error) {
            setError(error as ApiError);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                error,
                signIn,
                signUp,
                signOut,
                resetPassword,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};