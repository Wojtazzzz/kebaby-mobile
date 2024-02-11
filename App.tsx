import {AppRegistry} from 'react-native';
import HomeScreen from "./src/modules/Home/HomeScreen";
import RestaurantScreen from "./src/modules/Restaurant/RestaurantScreen";
import AddRestaurantScreen from "./src/modules/AddRestaurant/AddRestaurantScreen";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeHeader} from "./src/components/headers/HomeHeader";

const queryClient = new QueryClient()
const Stack = createNativeStackNavigator();

AppRegistry.registerComponent('HomeScreen', () => HomeScreen)
AppRegistry.registerComponent('RestaurantScreen', () => RestaurantScreen)

export default function App() {
    return (
        <NavigationContainer>
            <QueryClientProvider client={queryClient}>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerTitle: (props) => <HomeHeader {...props}/>, }}/>
                    <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} options={({ route }) => ({ title: `${route.params.restaurant.name} - ${route.params.restaurant.city}` })}/>
                    <Stack.Screen name="AddRestaurantScreen" component={AddRestaurantScreen} options={{ title: 'Dodaj lokal' }}/>
                </Stack.Navigator>
            </QueryClientProvider>
        </NavigationContainer>
    );
}