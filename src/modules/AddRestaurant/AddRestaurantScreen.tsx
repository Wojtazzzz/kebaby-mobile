import { useAddRestaurant } from './hooks/useAddRestaurant';
import { useAddRestaurantForm } from './hooks/useAddRestaurantForm';
import { Button } from 'react-native-paper';
import { TextInput } from '../../components/ui/Form/TextInput';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { FormContainer } from '../../components/ui/Form/FormContainer';
import { FieldsContainer } from '../../components/ui/Form/FieldsContainer';

export default function AddRestaurantScreen() {
	const { name, city, onChangeName, onChangeCity } = useAddRestaurantForm();
	const { addRestaurant } = useAddRestaurant();

	function submit() {
		addRestaurant({
			name,
			city,
		});
	}

	return (
		<ScreenContainer>
			<FormContainer>
				<FieldsContainer>
					<TextInput
						label='Nazwa'
						value={name}
						onChange={onChangeName}
					/>

					<TextInput
						label='Miasto'
						value={city}
						onChange={onChangeCity}
					/>
				</FieldsContainer>

				<Button mode='contained' onPress={submit}>
					Dodaj
				</Button>
			</FormContainer>
		</ScreenContainer>
	);
}
