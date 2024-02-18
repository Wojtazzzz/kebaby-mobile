import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAddRestaurant } from '../AddRestaurant/hooks/useAddRestaurant';
import { useAddKebabOpinionForm } from './hooks/useAddKebabOpinionForm';
import Dropdown from 'react-native-input-select';
import { useGetKebabSauces } from '../../hooks/useGetKebabSauces';
import { ScreenProps } from '../../utils/types';
import { useGetKebabSizes } from '../../hooks/useGetKebabSizes';
import { useAddKebabOpinion } from './hooks/useAddKebabOpinion';

type AddKebabOpinionScreenProps = ScreenProps<'AddKebabOpinionScreen'>;

export default function AddKebabOpinionScreen({
	route,
}: AddKebabOpinionScreenProps) {
	const { restaurant, kebab } = route.params;

	const {
		user,
		value,
		content,
		sauce,
		size,
		onChangeUser,
		onChangeValue,
		onChangeContent,
		onChangeSauce,
		onChangeSize,
	} = useAddKebabOpinionForm();
	const { data: sauces, isLoading: isLoadingSauces } = useGetKebabSauces(
		restaurant.id,
		kebab.id,
	);

	const { data: sizes, isLoading: isLoadingSizes } = useGetKebabSizes(
		restaurant.id,
		kebab.id,
	);

	const { addKebabOpinion } = useAddKebabOpinion(restaurant, kebab);

	function submit() {
		addKebabOpinion({
			user,
			value,
			content,
			size_id: size,
			sauce_id: sauce,
		});
	}

	return (
		<View style={styles.container}>
			<Text>Opinia:</Text>

			<TextInput
				style={styles.input}
				onChangeText={onChangeUser}
				value={user}
				placeholder='Podpis'
			/>

			<Dropdown
				label='Ocena'
				placeholder='Ocena'
				options={Array.from({ length: 10 }).map((value, index) => ({
					label: `${10 - index} / 10`,
					value: 10 - index,
				}))}
				selectedValue={value}
				onValueChange={onChangeValue}
				primaryColor={'green'}
			/>

			<TextInput
				style={styles.input}
				onChangeText={onChangeContent}
				value={content}
				placeholder='Treść'
			/>

			{isLoadingSauces ? (
				<Text>Loading</Text>
			) : (
				<Dropdown
					label='Sosiwo'
					placeholder='Wybierz sosiwo wariacie'
					options={sauces.map((sauce) => ({
						label: sauce.name,
						value: sauce.id,
					}))}
					selectedValue={sauce}
					onValueChange={onChangeSauce}
					primaryColor={'green'}
				/>
			)}

			{isLoadingSizes ? (
				<Text>Loading</Text>
			) : (
				<Dropdown
					label='Rozmiar'
					placeholder='Wybierz rozmiar wariacie'
					options={sizes.map((size) => ({
						label: size.name,
						value: size.id,
					}))}
					selectedValue={size}
					onValueChange={onChangeSize}
					primaryColor={'green'}
				/>
			)}

			<Button title='Zapisz' onPress={submit} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		paddingHorizontal: 16,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});
