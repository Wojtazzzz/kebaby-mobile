import {
	FlatList,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { type ScreenProps } from '../../utils/types';
import { useGetRestaurantKebabs } from './hooks/useGetRestaurantKebabs';
import { useNavigation } from '../../hooks/useNavigation';
import { Button, TouchableRipple } from 'react-native-paper';
import * as React from 'react';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { List } from '../../components/ui/List/List';
import { ListItem } from '../../components/ui/List/ListItem';
import { ListIcon } from '../../components/ui/List/ListIcon';

type RestaurantScreenProps = ScreenProps<'RestaurantScreen'>;

export default function RestaurantScreen({ route }: RestaurantScreenProps) {
	const { restaurant } = route.params;
	const { goToKebabScreen, goToAddKebabScreen } = useNavigation();
	const { data, isLoading } = useGetRestaurantKebabs(restaurant.id);

	return (
		<ScreenContainer>
			<View style={styles.buttonsContainer}>
				<Button
					mode='text'
					onPress={() => goToAddKebabScreen(restaurant)}
				>
					Dodaj nowego kebsa
				</Button>
				<Button mode='text' onPress={() => alert('Już wkrótce...')}>
					Oceń lokal
				</Button>
			</View>
			{!isLoading && data && (
				<List title='Oferta'>
					{data.map((kebab) => (
						<TouchableRipple
							onPress={() => goToKebabScreen(restaurant, kebab)}
							rippleColor='rgba(0, 0, 0, .32)'
							key={kebab.id}
						>
							<ListItem
								title={kebab.name}
								description={`${kebab.opinions_avg_value ? `Średnia ocen: ${Number(kebab.opinions_avg_value).toFixed(1)}` : 'Brak ocen'}`}
								right={() => <ListIcon icon='chevron-right' />}
							/>
						</TouchableRipple>
					))}
				</List>
			)}
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	buttonsContainer: {
		gap: 4,
	},
});
