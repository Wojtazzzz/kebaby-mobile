import { type UseNavigation } from '../../App';
import { useNavigation as useReactNavigation } from '@react-navigation/native';

type Restaurant = {
	id: number;
	name: string;
	city: string;
};

type Kebab = {
	id: number;
	name: string;
	opinions_count: number;
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

	function goToKebabScreen(restaurant: Restaurant, kebab: Kebab) {
		navigation.navigate('KebabScreen', {
			restaurant,
			kebab,
		});
	}

	function goToAddKebabOpinionScreen(restaurant: Restaurant, kebab: Kebab) {
		navigation.navigate('AddKebabOpinionScreen', {
			restaurant,
			kebab,
		});
	}

	return {
		goToAddRestaurantScreen,
		goToRestaurantScreen,
		goToHomeScreen,
		goToKebabScreen,
		goToAddKebabOpinionScreen,
	};
}
