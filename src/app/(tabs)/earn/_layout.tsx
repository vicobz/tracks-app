// app/(tabs)/earn/_layout.tsx
import { Stack } from 'expo-router';
import { colors } from '../../styles/theme';

export default function EarnLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.backgroundDark,
                },
                headerTintColor: '#fff',
                contentStyle: {
                    backgroundColor: colors.backgroundDark
                },
                headerBackTitle: 'Retour',
            }}
        >
            <Stack.Screen 
                name="index"
                options={{ 
                    title: 'Gagnez des Tracks',
                    headerShown: true,
                }}
            />
            <Stack.Screen 
                name="[id]"
                options={{
                    headerTitle: 'Détails du partenaire',
                    headerBackVisible: true,
                }}
            />
        </Stack>
    );
}