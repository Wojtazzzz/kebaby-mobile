import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { type ScreenProps } from '../../utils/types';
import { useGetKebabOpinions } from './useGetKebabOpinions';
import { useNavigation } from '../../hooks/useNavigation';
import { Button } from 'react-native-paper';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { List } from '../../components/ui/List/List';
import { ListItem } from '../../components/ui/List/ListItem';

type KebabScreenProps = ScreenProps<'KebabScreen'>;

export default function KebabScreen({ route }: KebabScreenProps) {
	const { restaurant, kebab } = route.params;
	const { goToAddKebabOpinionScreen } = useNavigation();

	const { isLoading, isError, data } = useGetKebabOpinions(
		restaurant.id,
		kebab.id,
	);

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (isError) {
		return <Text>Error...</Text>;
	}

	return (
		<ScreenContainer>
			<Button
				mode='contained'
				onPress={() => goToAddKebabOpinionScreen(restaurant, kebab)}
			>
				Dodaj opinię
			</Button>

			<List title='Opinie'>
				{data.map((opinion) => (
					<ListItem
						title={opinion.user}
						description={opinion.content}
						right={() => <Text>{opinion.value} / 10</Text>}
						key={opinion.id}
					/>
				))}
			</List>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
});
