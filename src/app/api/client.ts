// src/api/client.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { TokenStorage } from '../storage/token.storage';
import { ApiError } from '../types/auth.types';

export const version = Constants.expoConfig?.version ?? "unknown";

const getUserAgent = (): string => {
    return `Tracks-App/${version} (${Platform.OS})`;
};

interface ApiClientConfig {
    baseURL: string;
    timeout?: number;
}

const DEFAULT_CONFIG = {
    timeout: Platform.OS === 'android' ? 15000 : 10000,
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Tracks-App/1.0.0'
    }
};

export function createApiClient(config: ApiClientConfig): AxiosInstance {
    const client = axios.create({
        ...DEFAULT_CONFIG,
        ...config
    });

    // Request interceptor
    client.interceptors.request.use(request => {
        console.log('[API Request]', {
            baseUrl: request.baseURL,
            endpoint: request.url,
            method: request.method?.toUpperCase(),
        });
        return request;
    });

    // Response interceptor
    client.interceptors.response.use(
        response => {
            console.log('[API Response]', {
                status: response.status,
                endpoint: response.config.url
            });
            return response;
        },
        error => {
            console.error('[API Error]', {
                endpoint: error.config?.url,
                status: error.response?.status,
                message: error.message
            });
            return Promise.reject(error);
        }
    );

    return client;
}