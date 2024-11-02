// app/index.tsx
import { Redirect } from 'expo-router';
import { useAuth } from './hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';
import { colors } from './styles/theme';

export default function Index() {
    const { isAuthenticated, isLoading } = useAuth();

    // Afficher un loader pendant la vérification de l'authentification
    if (isLoading) {
        return (
            <View style={{ 
                flex: 1, 
                backgroundColor: colors.backgroundDark,
                justifyContent: 'center', 
                alignItems: 'center' 
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    // Redirection en fonction de l'état d'authentification
    return <Redirect href={isAuthenticated ? "/(tabs)/earn" : "/(auth)/signin"} />;
}