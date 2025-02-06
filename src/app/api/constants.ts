// src/api/constants.ts
/**
 * API configuration constants and utilities
 * Centralizes all API related configuration
 */
import { Platform } from "react-native";

const API_CONFIG = {
    BASE_HOST : Platform.select({
        ios: 'http://localhost',
        android: 'http://10.0.2.2',
    }),
    API_PREFIX: 'api',
    VERSION: 'v1',
    PORTS: {
        AUTH: '8080',
        TRANSACTIONS: '8085',
        // USER: '8081',
    }
} as const;

export const SERVICES = {
    AUTH: {
        PORT: API_CONFIG.PORTS.AUTH,
        BASE_URL: `${API_CONFIG.BASE_HOST}:${API_CONFIG.PORTS.AUTH}/${API_CONFIG.API_PREFIX}/${API_CONFIG.VERSION}`,
        ENDPOINTS: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            REFRESH_TOKEN: '/auth/refresh_token',
            RESET_PASSWORD: '/auth/reset_password',
            LOGOUT: '/auth/logout'
        }
    },
    TRANSACTIONS: {
      PORT: API_CONFIG.PORTS.TRANSACTIONS,
      BASE_URL: `${API_CONFIG.BASE_HOST}:${API_CONFIG.PORTS.TRANSACTIONS}/${API_CONFIG.API_PREFIX}/${API_CONFIG.VERSION}`,
      ENDPOINTS: {
        PARTNERS: '/partners',
        OFFERS: '/offers',
        ACTIVE_OFFERS: '/offers/active',
        USER_TRANSACTIONS: '/users/:userID/transactions',
      }
    }
} as const;