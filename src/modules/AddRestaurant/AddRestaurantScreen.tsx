import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAddRestaurant } from './hooks/useAddRestaurant';
import { useAddRestaurantForm } from './hooks/useAddRestaurantForm';

export default function AddRestaurantScreen() {
	const { name, city, onChangeName, onChangeCity } = useAddRestaurantForm();
	const { addRestaurant } = useAddRestaurant();

	function submit() {
		addRestaurant({
			name,
			city,
		});
	}

	return (
		<View style={styles.container}>
			<Text>Dodawanie restauracji!</Text>

			<TextInput
				style={styles.input}
				onChangeText={onChangeName}
				value={name}
				placeholder='Nazwa'
			/>

			<TextInput
				style={styles.input}
				onChangeText={onChangeCity}
				value={city}
				placeholder='Miasto'
			/>

			<Button title='Zapisz' onPress={submit} />
		</View>
	);
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
