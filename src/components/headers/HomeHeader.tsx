import {View, Text, Button, StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';

export function HomeHeader () {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>Kebaby</Text>
            <Button title="Dodaj lokal" onPress={() => navigation.navigate('AddRestaurantScreen')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 30
    }
})