import { Stack } from 'expo-router';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { PartnersProvider } from './contexts/partners/PartnersProvider';

export default function RootLayout() {
    return (
        <AuthProvider>
            <PartnersProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </PartnersProvider>
        </AuthProvider>
    );
}