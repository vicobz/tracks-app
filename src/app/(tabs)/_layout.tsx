// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../styles/theme';

export default function TabLayout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundDark }}>
            <Tabs screenOptions={{
                tabBarActiveTintColor: colors.secondary,
                tabBarInactiveTintColor: '#8E8E93',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.backgroundDark,
                    borderTopColor: colors.backgroundDark
                }
            }}>
                <Tabs.Screen
                    name="earn"
                    options={{
                        title: 'Earn',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="plus-circle" size={size} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="spend"
                    options={{
                        title: 'Spend',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="shopping-cart" size={size} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="account"
                    options={{
                        title: 'Account',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="user" size={size} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="index"
                    options={{
                        href: null, // hides tab
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}