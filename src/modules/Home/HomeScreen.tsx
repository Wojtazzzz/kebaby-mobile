import {FlatList, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {useQuery} from "@tanstack/react-query";
import axios from "axios/index";

async function fetchData() {
    return await axios.get('http://192.168.1.45/api/restaurants').catch(error => {
        console.log(error)
    }).then(response => response!.data)
}

export default function HomeScreen({navigation}: any) {
    const {isLoading, isError, isSuccess, data, error} = useQuery({
        queryFn: async function () {
            return await fetchData();
        },
        queryKey: ['restaurants'],
    });

    if (isLoading) {
        return <Text>Loading...</Text>
    }

    if (isError || (isSuccess && !data)) {
        return <Text>Error</Text>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                contentContainerStyle={styles.list}
                renderItem={({item}) => (
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('RestaurantScreen', {restaurant: item})}>
                        <View style={styles.item}>
                            <View style={styles.itemBox}>
                                <Text style={styles.itemText}>{item.id}</Text>
                            </View>
                            <View style={styles.itemBox}>
                                <Text style={styles.itemText}>{item.name}</Text>
                                <Text style={{...styles.itemText, ...styles.itemTextCity}}>{item.city}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 16,
    },
    list: {
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingHorizontal: 8
    },
    itemBox: {
        minWidth: 40,
        paddingTop: 24,
        paddingBottom: 14,
    },
    itemText: {
        fontSize: 20
    },
    itemTextCity: {
        fontSize: 12
    }
});