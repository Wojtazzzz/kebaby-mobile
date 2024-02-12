import { type UseNavigation } from '../../App';
import { useNavigation as useReactNavigation } from '@react-navigation/native';

type Restaurant = {
	id: number;
	name: string;
	city: string;
};

export function useNavigation() {
	const navigation = useReactNavigation<UseNavigation>();

	function goToRestaurantScreen(restaurant: Restaurant) {
		navigation.navigate('RestaurantScreen', {
			restaurant,
		});
	}

	function goToAddRestaurantScreen() {
		navigation.navigate('AddRestaurantScreen');
	}

	function goToHomeScreen() {
		navigation.navigate('HomeScreen');
	}

	return {
		goToAddRestaurantScreen,
		goToRestaurantScreen,
		goToHomeScreen,
	};
}
