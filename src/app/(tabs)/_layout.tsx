import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#8E8E93',
            tabBarStyle: {
                borderTopWidth: 1,
                borderTopColor: '#E5E5EA',
                backgroundColor: '#FFFFFF'
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    )
                }}
            />
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
        </Tabs>
    );
}