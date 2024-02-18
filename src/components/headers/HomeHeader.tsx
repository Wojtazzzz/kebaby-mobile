import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type UseNavigation } from '../../../App';
import { Button } from 'react-native-paper';

export function HomeHeader() {
	const navigation = useNavigation<UseNavigation>();

	function goToRestaurantPage() {
		navigation.navigate('AddRestaurantScreen');
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Miejscówki</Text>

			<Button mode='contained' onPress={goToRestaurantPage}>
				Dodaj
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 30,
	},
	title: {
		fontSize: 20,
		fontWeight: '500',
	},
});
