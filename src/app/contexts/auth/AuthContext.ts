import { createContext } from 'react';
import { User } from '../../types/user';

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (userData: Partial<User>, password: string) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);