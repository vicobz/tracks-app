// src/api/client.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { TokenStorage } from '../storage/token.storage';
import { ApiError } from '../types/auth.types';
import { API, getAuthUrl } from './constants';

export const version = Constants.expoConfig?.version ?? "unknown";

const getUserAgent = (): string => {
    return `Tracks-App/${version} (${Platform.OS})`;
};

class ApiClient {
    private static instance: ApiClient;
    private client: AxiosInstance;
    private isRefreshing: boolean = false;
    private refreshSubscribers: ((token: string) => void)[] = [];

    private constructor() {
        const userAgent = getUserAgent();
        
        this.client = axios.create({
            baseURL: API.BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': userAgent
            },
        });

        this.setupInterceptors();
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    public getClient(): AxiosInstance {
        return this.client;
    }

    private setupInterceptors(): void {
        // Request interceptor
        this.client.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                const token = await TokenStorage.getAccessToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (!error.response || error.response.status !== 401 || originalRequest._retry) {
                    return Promise.reject(this.handleError(error));
                }

                if (this.isRefreshing) {
                    return new Promise(resolve => {
                        this.refreshSubscribers.push((token: string) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(this.client(originalRequest));
                        });
                    });
                }

                originalRequest._retry = true;
                this.isRefreshing = true;

                try {
                    const refreshToken = await TokenStorage.getRefreshToken();
                    if (!refreshToken) {
                        throw new Error('No refresh token available');
                    }

                    const response = await this.client.post(
                        getAuthUrl(API.AUTH.ENDPOINTS.REFRESH_TOKEN),
                        { refreshToken }
                    );
                    const { accessToken, refreshToken: newRefreshToken } = response.data;
                    
                    await TokenStorage.saveTokens(accessToken, newRefreshToken);
                    
                    this.refreshSubscribers.forEach(callback => callback(accessToken));
                    this.refreshSubscribers = [];
                    
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return this.client(originalRequest);
                } catch (refreshError) {
                    await TokenStorage.clearTokens();
                    this.refreshSubscribers = [];
                    throw this.handleError(refreshError);
                } finally {
                    this.isRefreshing = false;
                }
            }
        );
    }

    private handleError(error: any): ApiError {
        if (error.response?.data) {
            return {
                code: error.response.data.code || error.response.status,
                message: error.response.data.message || 'An unexpected error occurred',
                details: error.response.data.details
            };
        }
        return {
            code: 500,
            message: error.message || 'Network error'
        };
    }
}

export const apiClient = ApiClient.getInstance().getClient();