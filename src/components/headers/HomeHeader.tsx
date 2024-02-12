import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type UseNavigation } from '../../../App';

export function HomeHeader() {
	const navigation = useNavigation<UseNavigation>();

	function goToRestaurantPage() {
		navigation.navigate('AddRestaurantScreen');
	}

	return (
		<View style={styles.container}>
			<Text>Kebaby</Text>

			<Button title='Dodaj lokal' onPress={goToRestaurantPage} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingRight: 30,
	},
});
