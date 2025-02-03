// src/app/types/Error.ts
export interface Error {
    code: number;
    message: string;
    details?: unknown;
}

export enum AuthErrorCode {
    MISSING_AUTH_HEADER = 6001,
    INVALID_AUTH_HEADER = 6002,
    INVALID_TOKEN = 6003,
    INVALID_SESSION = 6004,
    NO_SESSION_FOUND = 6005,
    SESSION_VALIDATION_FAILED = 6006,
    INSUFFICIENT_RIGHTS = 6007
}

export const getAuthErrorMessage = (code: number): string => {
    switch (code) {
        case AuthErrorCode.MISSING_AUTH_HEADER:
            return 'Authentication required';
        case AuthErrorCode.INVALID_TOKEN:
            return 'Session expired. Please login again';
        // etc.
        default:
            return 'An unexpected error occurred';
    }
};