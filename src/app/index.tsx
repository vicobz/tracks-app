// app/index.tsx
import { Redirect } from 'expo-router';
import { useAuth } from './hooks/useAuth';
import Loader from './components/common/Loader';

export default function Index() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <Loader />;
    }

    /* if (isLoading) {
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
    } */

    // Redirect based on authentication state using the existing folder structure
    return <Redirect href={isAuthenticated ? "/(tabs)/earn" : "/(auth)/signin"} />;
}