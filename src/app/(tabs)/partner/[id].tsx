import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function PartnerScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    
    return (
        <View>
            <Text>Partner Details: {id}</Text>
        </View>
    );
}