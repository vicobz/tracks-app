import { Stack } from 'expo-router';
import { colors } from '../../styles/theme';

export default function PartnerLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.backgroundDark,
                },
                headerTintColor: '#fff',
                presentation: 'modal'  // Ajoute une animation de modal
            }}
        />
    );
}