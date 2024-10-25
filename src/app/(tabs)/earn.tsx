import { View, StyleSheet } from 'react-native';
import { usePartners } from '../hooks/usePartners';
import PartnerGrid from '../components/partners/PartnerGrid';
import { colors } from '../styles/theme';

export default function EarnScreen() {
    const { getEarnPartners, isLoading } = usePartners();
    const earnPartners = getEarnPartners();

    return (
        <View style={styles.container}>
            <PartnerGrid 
                partners={earnPartners} 
                isLoading={isLoading}
                type="EARN"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark
    },
    header: {
        padding: 16,
        backgroundColor: colors.secondary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 16
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 8
    },
    pointsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pointsLabel: {
        fontSize: 16,
        color: '#FFF',
        opacity: 0.8
    },
    pointsValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF'
    }
});