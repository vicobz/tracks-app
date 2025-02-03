// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';
import { colors } from '../styles/theme';
import { ToastProvider } from '../contexts/toast/ToastContext';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: colors.backgroundDark
            }
        }}>
            <Stack.Screen
                name="signin"
                options={{
                    title: "Sign In"
                }}
            />
            <Stack.Screen
                name="signup"
                options={{
                    title: "Sign Up"
                }}
            />
            <Stack.Screen
                name="reset-password"
                options={{
                    title: "Reset Password"
                }}
            />
        </Stack>
    );
}