// app/_layout.tsx
import { Stack } from 'expo-router';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { PartnersProvider } from './contexts/partners/PartnersProvider';
import { ToastProvider } from './contexts/toast/ToastContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './styles/theme';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <ToastProvider>
                <AuthProvider>
                    <PartnersProvider>
                        <Stack
                            screenOptions={{
                                headerStyle: { backgroundColor: colors.backgroundDark },
                                headerTintColor: '#fff',
                                contentStyle: { backgroundColor: colors.backgroundDark },
                                headerBackTitle: 'Retour',
                            }}>
                            <Stack.Screen
                                name="(auth)"
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="(tabs)"
                                options={{ headerShown: false }}
                            />
                        </Stack>
                    </PartnersProvider>
                </AuthProvider>
            </ToastProvider>
        </SafeAreaProvider>
    );
}