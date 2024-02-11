import {Button, StyleSheet, Text, View} from "react-native";

export default function RestaurantScreen({route, navigation}: any) {
    const { restaurant } = route.params;

    return (
        <View style={styles.container}>
            <Text>Hello Restaurant {restaurant.name}!</Text>

            <Button title="Dodaj kebsa" onPress={() => null}/>
            <Button title="Oceń lokal" onPress={() => null}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 16,
    }
});