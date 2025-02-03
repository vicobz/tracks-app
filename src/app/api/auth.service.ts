// src/api/auth.service.ts
/**
 * Authentication service implementation
 */
import { createApiClient } from './client';
import { TokenStorage } from '../storage/token.storage';
import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    RefreshTokenRequest,
    ResetPasswordRequest
} from '../types/auth.types';
import { SERVICES } from './constants';

const authClient = createApiClient({
    baseURL: SERVICES.AUTH.BASE_URL
});

export class AuthService {
    /**
     * Registers a new user
     * @param data User registration data
     */
    static async register(data: RegisterRequest): Promise<AuthResponse> {
        try {
            const response = await authClient.post<AuthResponse>(
                SERVICES.AUTH.ENDPOINTS.REGISTER,
                data
            );

            await TokenStorage.saveTokens(
                response.data.access_token,
                response.data.refresh_token
            );

            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Initiates a user login session
     */
    static async login(data: LoginRequest): Promise<AuthResponse> {
        try {
            const response = await authClient.post<AuthResponse>(
                SERVICES.AUTH.ENDPOINTS.LOGIN,
                data
            );

            await TokenStorage.saveTokens(
                response.data.access_token,
                response.data.refresh_token
            );

            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Refreshes the authentication token
     */
    static async refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
        try {
            const response = await authClient.post<AuthResponse>(
                SERVICES.AUTH.ENDPOINTS.REFRESH_TOKEN,
                data
            );

            await TokenStorage.saveTokens(
                response.data.access_token,
                response.data.refresh_token
            );

            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Logs out the current user
     */
    static async logout(): Promise<void> {
        try {
            await authClient.post(SERVICES.AUTH.ENDPOINTS.LOGOUT);
            await TokenStorage.clearTokens();
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Checks if user is authenticated
     */
    static async checkAuth(): Promise<boolean> {
        const token = await TokenStorage.getAccessToken();
        return !!token;
    }

    /**
     * Standardizes error handling across service methods
     */
    private static handleError(error: any) {
        return {
            code: error.response?.status || 500,
            message: error.response?.data?.message || 'Operation failed',
            details: error.response?.data
        };
    }
}