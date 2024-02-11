import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios/index";
import {useNavigation} from "@react-navigation/native";

async function addRestaurant(data: any) {
    return await axios.post('http://192.168.1.45/api/restaurants', data).catch(error => {
        console.log(error)
    });
}

export default function AddRestaurantScreen() {
    const [name, onChangeName] = useState('');
    const [city, onChangeCity] = useState('');

    const queryClient = useQueryClient();
    const navigation = useNavigation();

    const mutation = useMutation({
        mutationFn: async () => await addRestaurant({ name, city}),
        onSuccess: async () => {
            await queryClient.refetchQueries(['restaurants']);
            navigation.navigate('HomeScreen');
        }
    });

     return (
        <View style={styles.container}>
            <Text>Dodawanie restauracji!</Text>

            <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Nazwa"
            />

            <TextInput
                style={styles.input}
                onChangeText={onChangeCity}
                value={city}
                placeholder="Miasto"
            />

            <Button title="Zapisz" onPress={() => mutation.mutate()}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 16,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});