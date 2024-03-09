import { AppRegistry } from 'react-native';
import HomeScreen from './src/modules/Home/HomeScreen';
import RestaurantScreen from './src/modules/Restaurant/RestaurantScreen';
import AddRestaurantScreen from './src/modules/AddRestaurant/AddRestaurantScreen';
import KebabScreen from './src/modules/Kebab/KebabScreen';
import AddKebabOpinionScreen from './src/modules/AddKebabOpinion/AddKebabOpinionScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { HomeHeader } from './src/components/headers/HomeHeader';
import { Restaurant } from './src/modules/Home/hooks/useGetRestaurants';
import { Kebab } from './src/modules/Restaurant/hooks/useGetRestaurantKebabs';
import AddKebabScreen from './src/modules/AddKebab/AddKebabScreen';

export type RootStackParamList = {
	HomeScreen: undefined;
	AddRestaurantScreen: undefined;
	RestaurantScreen: {
		restaurant: Restaurant;
	};
	KebabScreen: {
		restaurant: Restaurant;
		kebab: Kebab;
	};
	AddKebabScreen: {
		restaurant: Restaurant;
	};
	AddKebabOpinionScreen: {
		restaurant: Restaurant;
		kebab: Kebab;
	};
};

export type UseNavigation = NativeStackNavigationProp<RootStackParamList>;

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator<RootStackParamList>();

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);

export default function App() {
	return (
		<NavigationContainer>
			<QueryClientProvider client={queryClient}>
				<Stack.Navigator initialRouteName='HomeScreen'>
					<Stack.Screen
						name='HomeScreen'
						component={HomeScreen}
						options={{
							headerTitle: () => <HomeHeader />,
						}}
					/>

					<Stack.Screen
						name='RestaurantScreen'
						component={RestaurantScreen}
						options={({ route }) => ({
							title: `${route.params.restaurant.name} - ${route.params.restaurant.city}`,
						})}
					/>

					<Stack.Screen
						name='AddRestaurantScreen'
						component={AddRestaurantScreen}
						options={{ title: 'Dodaj kebabownie' }}
					/>

					<Stack.Screen
						name='KebabScreen'
						component={KebabScreen}
						options={({ route }) => ({
							title: `${route.params.kebab.name} - ${route.params.restaurant.name}`,
						})}
					/>

					<Stack.Screen
						name='AddKebabScreen'
						component={AddKebabScreen}
						options={({ route }) => ({
							title: `${route.params.restaurant.name} - Dodaj kebsa`,
						})}
					/>

					<Stack.Screen
						name='AddKebabOpinionScreen'
						component={AddKebabOpinionScreen}
						options={({ route }) => ({
							title: `${route.params.kebab.name} - Dodaj opinie`,
						})}
					/>
				</Stack.Navigator>
			</QueryClientProvider>
		</NavigationContainer>
	);
}
