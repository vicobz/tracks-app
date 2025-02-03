// src/api/constants.ts

export const API = {
    BASE_URL: 'http://localhost',
    AUTH: {
        PORT: '8080',
        VERSION: 'api/v1',
        ENDPOINTS: {
            LOGIN: 'auth/login',
            REGISTER: 'auth/register',
            REFRESH_TOKEN: 'auth/refresh_token',
            RESET_PASSWORD: 'auth/reset_password',
            LOGOUT: 'auth/logout'
        }
    }
} as const;

export const getAuthUrl = (endpoint: string): string => {
    return `${API.BASE_URL}:${API.AUTH.PORT}/${API.AUTH.VERSION}/${endpoint}`;
};