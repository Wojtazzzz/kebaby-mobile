import {
	FlatList,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios/index';
import { useGetRestaurants } from './hooks/useGetRestaurants';
import { useNavigation } from '../../hooks/useNavigation';

export default function HomeScreen() {
	const { goToRestaurantScreen } = useNavigation();
	const { isLoading, isError, isSuccess, data } = useGetRestaurants();

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (isError || (isSuccess && !data)) {
		return <Text>Error</Text>;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<TouchableWithoutFeedback
						onPress={() => goToRestaurantScreen(item)}
					>
						<View style={styles.item}>
							<View style={styles.itemBox}>
								<Text style={styles.itemText}>{item.id}</Text>
							</View>
							<View style={styles.itemBox}>
								<Text style={styles.itemText}>{item.name}</Text>
								<Text
									style={{
										...styles.itemText,
										...styles.itemTextCity,
									}}
								>
									{item.city}
								</Text>
							</View>
						</View>
					</TouchableWithoutFeedback>
				)}
			/>
		</View>
	);
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
		paddingHorizontal: 8,
	},
	itemBox: {
		minWidth: 40,
		paddingTop: 24,
		paddingBottom: 14,
	},
	itemText: {
		fontSize: 20,
	},
	itemTextCity: {
		fontSize: 12,
	},
});
