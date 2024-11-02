// app/(tabs)/index.tsx
import { Redirect } from 'expo-router';

export default function TabIndex() {
    // Rediriger vers l'onglet EARN par défaut
    return <Redirect href="/(tabs)/earn" />;
}