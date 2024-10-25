import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

interface TransactionProps {
    icon: string;
    color: string;
    name: string;
    date: string;
    points: number;
}

export default function Transaction({ 
    icon, 
    color, 
    name, 
    date, 
    points 
}: TransactionProps) {
    return (
        <View style={styles.container}>
            <View style={styles.leftContent}>
                <View style={[styles.iconContainer, { backgroundColor: color }]}>
                    <Feather name={icon as any} size={20} color="white" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
            </View>
            <View style={styles.pointsContainer}>
                <Text style={styles.points}>+{points}</Text>
                <Feather name="award" size={16} color="#FFD700" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    leftContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    textContainer: {
      justifyContent: 'center',
    },
    name: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
    },
    date: {
      color: '#8A8A8A',
      fontSize: 14,
    },
    pointsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    points: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
      marginRight: 4,
    },
  });  