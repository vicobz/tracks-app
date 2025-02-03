// src/contexts/auth/AuthContext.ts
import { createContext } from 'react';
import { User } from '../../types/user';
import { ApiError } from '../../types/auth.types';

export interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: ApiError | null;
    user: User | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (userData: {
        email: string;
        password: string;
        first_name: string;
        last_name: string;
    }) => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);