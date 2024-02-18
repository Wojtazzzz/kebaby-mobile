import {
	FlatList,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { useGetRestaurants } from './hooks/useGetRestaurants';
import { useNavigation } from '../../hooks/useNavigation';
import * as React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { List } from '../../components/ui/List/List';
import { ListItem } from '../../components/ui/List/ListItem';
import { ListIcon } from '../../components/ui/List/ListIcon';

export default function HomeScreen() {
	const { goToRestaurantScreen } = useNavigation();
	const { isLoading, isError, isSuccess, data } = useGetRestaurants();
	const [expanded, setExpanded] = React.useState(true);

	const handlePress = () => setExpanded(!expanded);

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (isError || (isSuccess && !data)) {
		return <Text>Error</Text>;
	}

	return (
		<ScreenContainer>
			<List>
				{data.map((restaurant) => (
					<TouchableRipple
						onPress={() => goToRestaurantScreen(restaurant)}
						rippleColor='rgba(0, 0, 0, .32)'
						key={restaurant.id}
					>
						<ListItem
							title={restaurant.name}
							description={restaurant.city}
							right={() => <ListIcon icon='chevron-right' />}
						/>
					</TouchableRipple>
				))}
			</List>
		</ScreenContainer>
	);
}
