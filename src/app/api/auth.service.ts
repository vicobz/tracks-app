// src/api/auth.service.ts
import { apiClient } from './client';
import { TokenStorage } from '../storage/token.storage';
import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    RefreshTokenRequest,
    ResetPasswordRequest
} from '../types/auth.types';
import { API, getAuthUrl } from './constants';

export class AuthService {
    static async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>(
            getAuthUrl(API.AUTH.ENDPOINTS.LOGIN),
            data
        );
        await TokenStorage.saveTokens(response.data.access_token, response.data.refresh_token);
        return response.data;
    }

    static async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>(
            getAuthUrl(API.AUTH.ENDPOINTS.REGISTER),
            data
        );
        await TokenStorage.saveTokens(response.data.access_token, response.data.refresh_token);
        return response.data;
    }

    static async refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>(
            getAuthUrl(API.AUTH.ENDPOINTS.REFRESH_TOKEN),
            data
        );
        await TokenStorage.saveTokens(response.data.access_token, response.data.refresh_token);
        return response.data;
    }

    static async resetPassword(data: ResetPasswordRequest): Promise<void> {
        await apiClient.post(
            getAuthUrl(API.AUTH.ENDPOINTS.RESET_PASSWORD),
            data
        );
    }

    static async logout(): Promise<void> {
        await apiClient.post(getAuthUrl(API.AUTH.ENDPOINTS.LOGOUT));
        await TokenStorage.clearTokens();
    }

    static async checkAuth(): Promise<boolean> {
        const token = await TokenStorage.getAccessToken();
        return !!token;
    }
}