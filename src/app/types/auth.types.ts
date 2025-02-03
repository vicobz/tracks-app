// src/app/types/auth.ts

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: {
        id: string;
        public_id: string;
        email: string;
        first_name: string;
        last_name: string;
        tracks_balance: number;
        loyalty_number: string;
        roles: string[];
        createdAt: string;
        updatedAt: string;
    }
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export interface RefreshTokenRequest {
    refresh_token: string;
}

export interface ResetPasswordRequest {
    email: string;
}

export interface ApiError {
    code: number;
    message: string;
    details?: unknown;
}