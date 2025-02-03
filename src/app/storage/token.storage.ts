// src/storage/token.storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEYS = {
    ACCESS_TOKEN: '@tracks/access_token',
    REFRESH_TOKEN: '@tracks/refresh_token',
};

export class TokenStorage {
    static async saveTokens(accessToken: string, refreshToken: string): Promise<void> {
        try {
            await AsyncStorage.multiSet([
                [TOKEN_KEYS.ACCESS_TOKEN, accessToken],
                [TOKEN_KEYS.REFRESH_TOKEN, refreshToken],
            ]);
        } catch (error) {
            console.error('Error saving tokens:', error);
            throw new Error('Failed to save authentication tokens');
        }
    }

    static async getAccessToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
        } catch (error) {
            console.error('Error getting access token:', error);
            return null;
        }
    }

    static async getRefreshToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
        } catch (error) {
            console.error('Error getting refresh token:', error);
            return null;
        }
    }

    static async clearTokens(): Promise<void> {
        try {
            await AsyncStorage.multiRemove([
                TOKEN_KEYS.ACCESS_TOKEN,
                TOKEN_KEYS.REFRESH_TOKEN,
            ]);
        } catch (error) {
            console.error('Error clearing tokens:', error);
            throw new Error('Failed to clear authentication tokens');
        }
    }
}