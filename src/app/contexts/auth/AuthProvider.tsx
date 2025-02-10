// src/contexts/auth/AuthProvider.tsx
import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { AuthService } from '../../api/auth.service';
import { TokenStorage } from '../../storage/token.storage';
import { User } from '../../types/user';
import { ApiError } from '../../types/auth.types';
import { useProtectedRoute } from '../../hooks/useProtectedRoute';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    useProtectedRoute(user);

    const checkAuthState = async () => {
        try {
            const refreshToken = await TokenStorage.getRefreshToken();

            if (!refreshToken) {
                setUser(null);
                return;
            }

            const authResponse = await AuthService.refreshToken({ refresh_token: refreshToken });
            setUser({
                id: authResponse.user.id,
                email: authResponse.user.email,
                firstName: authResponse.user.first_name,
                lastName: authResponse.user.last_name,
                tracksBalance: authResponse.user.tracks_balance,
                tracksLoyaltyNumber: authResponse.user.loyalty_number,
                subscriptionType: "FREE", // TODO : update this logic to properly set subscription type
            });
        } catch (error) {
            await TokenStorage.clearTokens();
            setUser(null);
            setError(error as ApiError);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { checkAuthState() }, []);

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await AuthService.login({ email, password });
            console.log("Login response:", response);
            setUser({
                id: response.user.id,
                email: response.user.email,
                firstName: response.user.first_name,
                lastName: response.user.last_name,
                tracksBalance: response.user.tracks_balance,
                tracksLoyaltyNumber: response.user.loyalty_number,
                subscriptionType: "FREE", // TODO : update this logic
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
                subscriptionType: "FREE", // TODO : update this logic
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
}