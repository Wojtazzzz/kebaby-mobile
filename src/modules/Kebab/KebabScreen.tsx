import {
	Button,
	FlatList,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { type ScreenProps } from '../../utils/types';
import { useGetKebabOpinions } from './useGetKebabOpinions';
import { useNavigation } from '../../hooks/useNavigation';

type KebabScreenProps = ScreenProps<'KebabScreen'>;

export default function KebabScreen({ route }: KebabScreenProps) {
	const { restaurant, kebab } = route.params;
	const { goToAddKebabOpinionScreen } = useNavigation();

	const { isLoading, isError, data } = useGetKebabOpinions(
		restaurant.id,
		kebab.id,
	);

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (isError) {
		return <Text>Error...</Text>;
	}

	return (
		<View style={styles.container}>
			<Button
				title='Dodaj opinie'
				onPress={() => goToAddKebabOpinionScreen(restaurant, kebab)}
			/>

			<Text>Opinie</Text>
			<Text>{kebab.name}</Text>
			<Text>{kebab.opinions_count}</Text>
			<Text>{restaurant.name}</Text>

			<FlatList
				data={data}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<TouchableWithoutFeedback onPress={() => null}>
						<View style={styles.itemContainer}>
							<View style={styles.item}>
								<View style={styles.itemBox}>
									<Text style={styles.itemText}>
										{item.id}
									</Text>
								</View>
								<View style={styles.itemBox}>
									<Text style={styles.itemText}>
										{item.user}
									</Text>
								</View>
								<View style={styles.itemBox}>
									<Text style={styles.itemText}>
										{item.value}
									</Text>
								</View>
							</View>
							<View>
								<Text>{item.content}</Text>
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
	itemContainer: {
		borderBottomWidth: 1,
		borderBottomColor: 'gray',
		paddingHorizontal: 8,
		paddingBottom: 12,
	},
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	itemBox: {
		minWidth: 40,
		paddingTop: 24,
		paddingBottom: 14,
		alignItems: 'center',
	},
	itemText: {
		fontSize: 16,
	},
});
