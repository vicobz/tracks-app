// contexts/auth/AuthContext.ts
import { createContext } from 'react';
import { User } from '../../types/user';

export interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);