import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';

interface LoaderProps {
    size?: 'small' | 'large';
    color?: string;
    fullScreen?: boolean;
}

export default function Loader({ 
    size = 'large', 
    color = colors.secondary,
    fullScreen = true
}: LoaderProps) {
    if (!fullScreen) {
        return <ActivityIndicator size={size} color={color} />;
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundDark
    }
});