import React, { useState } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import { User } from '../../types/user';
import { useProtectedRoute } from '../../hooks/useProtectedRoute';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useProtectedRoute(user);

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // TODO: Implement actual API call
            const mockUser: User = {
                id: '1',
                email,
                firstName: 'John',
                lastName: 'Doe',
                city: 'Paris',
                address: '123 Rail Street',
                tracks_balance: 0,
                tracks_loyalty_number: 'TRK001'
            };
            setUser(mockUser);
        } catch (error) {
            console.error('Sign in error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (userData: Partial<User>, password: string) => {
        setIsLoading(true);
        try {
            // TODO: Implement actual API call
            const mockUser: User = {
                id: '1',
                email: userData.email || '',
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                city: userData.city || '',
                address: userData.address || '',
                tracks_balance: 0,
                tracks_loyalty_number: `TRK${Math.floor(Math.random() * 1000)}`
            };
            setUser(mockUser);
        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}