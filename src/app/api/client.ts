// src/api/client.ts
import axios, { AxiosInstance } from 'axios';
import { TokenStorage } from '../storage/token.storage';
import { Platform } from 'react-native';
import { SERVICES } from './api.config';

/**
 * Creates a configured Axios client with optional authentication
 * @param baseURL Base URL for the API
 * @param requiresAuth Whether the client requires authentication
 * @returns Configured Axios instance
 */
export const createAPIClient = (baseURL: string, requiresAuth = true): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout: Platform.OS === 'android' ? 15000 : 10000,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': `Tracks-App/${Platform.OS}`
    }
  });

  // Add authentication token to requests if required
  client.interceptors.request.use(async (config) => {
    if (requiresAuth) {
      const token = await TokenStorage.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Log request details for debugging
    console.log('[API Request]', {
      baseUrl: config.baseURL,
      endpoint: config.url,
      method: config.method?.toUpperCase(),
      requiresAuth
    });

    return config;
  }, error => {
    console.error('Request Interceptor Error', error);
    return Promise.reject(error);
  });

  // Handle response and potential errors
  client.interceptors.response.use(
    response => {
      console.log('[API Response]', {
        status: response.status,
        endpoint: response.config.url
      });
      return response;
    },
    async error => {
      console.error('[API Error]', {
        endpoint: error.config?.url,
        status: error.response?.status,
        message: error.message
      });
      return Promise.reject(error);
    }
  );

  return client;
};

// Create and export singleton instances for each service
export const authClient = createAPIClient(SERVICES.AUTH.BASE_URL, false);
export const transactionsClient = createAPIClient(SERVICES.TRANSACTIONS.BASE_URL);
