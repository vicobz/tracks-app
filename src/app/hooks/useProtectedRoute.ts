import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { User } from '../types/user';

export function useProtectedRoute(user: User | null) {
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        console.log("Protected Route Check:", {
            user,
            segments,
        });

        const firstSegment = segments[0] || '';
        const inAuthGroup = firstSegment.includes('(auth)');

        if (!user && !inAuthGroup) {
            console.log("Redirecting to signin");
            router.replace('/(auth)/signin' as const);
        } else if (user && inAuthGroup) {
            console.log("Redirecting to tabs");
            router.replace('/(tabs)/' as const);
        }
    }, [user, segments]);
}