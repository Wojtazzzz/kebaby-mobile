import { type UseNavigation } from '../../App';
import { useNavigation as useReactNavigation } from '@react-navigation/native';
import { type Kebab } from '../modules/Restaurant/hooks/useGetRestaurantKebabs';
import { type Restaurant } from '../modules/Home/hooks/useGetRestaurants';

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

	function goToAddKebabScreen(restaurant: Restaurant) {
		navigation.navigate('AddKebabScreen', {
			restaurant,
		});
	}

	return {
		goToAddRestaurantScreen,
		goToRestaurantScreen,
		goToHomeScreen,
		goToKebabScreen,
		goToAddKebabOpinionScreen,
		goToAddKebabScreen,
	};
}
