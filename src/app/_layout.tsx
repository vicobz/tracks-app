import { Stack } from 'expo-router';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { PartnersProvider } from './contexts/partners/PartnersProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <PartnersProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                </PartnersProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}