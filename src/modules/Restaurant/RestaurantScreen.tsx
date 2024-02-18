import {
	Button,
	FlatList,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { type ScreenProps } from '../../utils/types';
import { useGetRestaurantKebabs } from './hooks/useGetRestaurantKebabs';
import { useNavigation } from '../../hooks/useNavigation';

type RestaurantScreenProps = ScreenProps<'RestaurantScreen'>;

export default function RestaurantScreen({ route }: RestaurantScreenProps) {
	const { restaurant } = route.params;
	const { goToKebabScreen } = useNavigation();
	const { data } = useGetRestaurantKebabs(restaurant.id);

	return (
		<View style={styles.container}>
			<Button title='Dodaj kebsa' onPress={() => null} />
			<Button
				title='Oceń lokal'
				onPress={() => alert('Już wkrótce...')}
			/>

			<Text>Lista kebsów</Text>

			<FlatList
				data={data}
				contentContainerStyle={styles.list}
				ListHeaderComponent={() => (
					<View style={styles.item}>
						<View style={styles.itemBox}>
							<Text style={styles.itemText}>ID</Text>
						</View>
						<View style={styles.itemBox}>
							<Text style={styles.itemText}>Nazwa</Text>
						</View>
						<View style={styles.itemBox}>
							<Text style={styles.itemText}>Oceny</Text>
						</View>
					</View>
				)}
				renderItem={({ item }) => (
					<TouchableWithoutFeedback
						onPress={() => goToKebabScreen(restaurant, item)}
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
							<View style={styles.itemBox}>
								<Text style={styles.itemText}>
									{item.opinions_count}
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
		paddingVertical: 12,
	},
	list: {
		width: '100%',
		height: '100%',
	},
	item: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: 'gray',
		paddingHorizontal: 8,
		justifyContent: 'space-between',
	},
	itemBox: {
		minWidth: 40,
		paddingTop: 24,
		paddingBottom: 14,
		alignItems: 'center',
	},
	itemText: {
		fontSize: 14,
	},
	itemTextCity: {
		fontSize: 12,
	},
});
