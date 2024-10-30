// src/components/TracksCard.tsx
import { View, Text, StyleSheet, Image } from 'react-native';
import { User } from '../../types/user';
import { colors } from '../../styles/theme';

interface TracksCardProps {
    user: User;
}

export default function TracksCard({ user }: TracksCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.loyaltyNumber}>
                    N° {user.tracks_loyalty_number}
                </Text>
                <Image
                    source={require('../../../assets/images/logo_master_green_white_stroke.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth: 200,
        maxWidth: 400,
        minHeight: 180,
        maxHeight: 300,
        padding: 20,
        margin: 5,
        backgroundColor: colors.secondary,
        borderRadius: 10,
        flexDirection: 'column',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 10, // Adds some space below the content
    },
    spacer: {
        height: 20, // Minimum space between top and bottom components
        width: 250
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.backgroundDark,
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    loyaltyNumber: {
        fontSize: 14,
        color: colors.backgroundDark,
    },
    logo: {
        width: 50,
        height: 50,
    },
});  