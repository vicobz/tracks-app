import { View, Text } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function SignUpScreen() {
    const { signUp } = useAuth();

    return (
        <View>
            <Text>Sign Up Screen</Text>
            {/* Implémentez votre formulaire d'inscription ici */}
        </View>
    );
}