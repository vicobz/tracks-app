// src/api/auth.service.ts
/**
 * Authentication service implementation
 * Handles all authentication related operations including token management
 */
import { authClient } from './client';
import { TokenStorage } from '../storage/token.storage';
import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    RefreshTokenRequest,
    ResetPasswordRequest
} from '../types/auth.types';
import { SERVICES } from './api.config';

export class AuthService {
    /**
     * Registers a new user and initializes their session
     * @param data User registration data
     * @returns AuthResponse containing tokens and user information
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
     * Authenticates a user with their credentials
     * @param data Login credentials
     * @returns AuthResponse containing tokens and user information
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
     * Refreshes the authentication tokens using a valid refresh token
     * @param data Refresh token request data
     * @returns AuthResponse containing new tokens and user information
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
        } catch (error) {
            await TokenStorage.clearTokens();
            throw this.handleError(error);
        }
    }

    /**
     * Initiates the password reset process for a user
     * @param data Reset password request containing email
     */
    static async resetPassword(data: ResetPasswordRequest): Promise<void> {
        try {
            await authClient.post(SERVICES.AUTH.ENDPOINTS.RESET_PASSWORD, data);
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Logs out the current user and cleans up their session
     * Attempts to notify the backend but will clear local tokens regardless
     */
    static async logout(): Promise<void> {
        try {
            // Optional: Notify backend of logout
            await authClient.post(SERVICES.AUTH.ENDPOINTS.LOGOUT);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always clear local tokens
            await TokenStorage.clearTokens();
        }
    }

    /**
     * Checks if the current session is valid by attempting to refresh the token
     * @returns boolean indicating if the session is valid
     */
    static async checkAuth(): Promise<boolean> {
        try {
            const refreshToken = await TokenStorage.getRefreshToken();
            if (!refreshToken) {
                return false;
            }

            // Validate by attempting a token refresh
            await this.refreshToken({ refresh_token: refreshToken });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Standardizes error handling across service methods
     * @param error Raw error from API call
     * @returns Standardized error object
     */
    private static handleError(error: any) {
        return {
            code: error.response?.status || 500,
            message: error.response?.data?.message || 'Operation failed',
            details: error.response?.data
        };
    }
}