import { ScreenProps } from '../../utils/types';
import { Button } from 'react-native-paper';
import { TextInput } from '../../components/ui/Form/TextInput';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { FormContainer } from '../../components/ui/Form/FormContainer';
import { FieldsContainer } from '../../components/ui/Form/FieldsContainer';
import { InputSelect } from '../../components/ui/Form/InputSelect';
import { useAddKebabForm } from './hooks/useAddKebabForm';
import { useGetSauces } from '../../hooks/useGetSauces';
import { useGetSizes } from '../../hooks/useGetSizes';
import { useAddKebab } from './hooks/useAddKebab';
import { useGetMeat } from '../../hooks/useGetMeat';

type AddKebabScreenProps = ScreenProps<'AddKebabScreen'>;

export default function AddKebabScreen({ route }: AddKebabScreenProps) {
	const { restaurant } = route.params;

	const { data: sauces, isLoading: isLoadingSauces } = useGetSauces();
	const { data: meatData, isLoading: isLoadingMeat } = useGetMeat();
	const { data: sizes, isLoading: isLoadingSizes } = useGetSizes();

	const {
		name,
		sauce,
		meat,
		size,
		onChangeName,
		onChangeSauce,
		onChangeMeat,
		onChangeSize,
	} = useAddKebabForm();

	const { addKebab } = useAddKebab(restaurant);

	function submit() {
		addKebab({
			name,
			sauces: sauce.map((sauce_id) => ({
				id: sauce_id,
			})),
			sizes: size.map((size_id) => ({
				id: size_id,
			})),
			meat: meat.map((meat_id) => ({
				id: meat_id,
			})),
		});
	}

	return (
		<ScreenContainer>
			<FormContainer>
				<FieldsContainer>
					<TextInput
						value={name}
						label='Nazwa *'
						onChange={onChangeName}
					/>

					<InputSelect
						label='Sosiwa *'
						placeholder='Wybierz sosiwa wariacie'
						options={
							isLoadingSauces || !sauces
								? []
								: sauces.map((sauce) => ({
										label: sauce.name,
										value: sauce.id,
									}))
						}
						value={sauce}
						isMultiple
						onChange={onChangeSauce}
					/>

					<InputSelect
						label='Mięso *'
						placeholder='Wybierz mięso wariacie'
						options={
							isLoadingMeat || !meatData
								? []
								: meatData.map((meat) => ({
										label: meat.name,
										value: meat.id,
									}))
						}
						value={meat}
						isMultiple
						onChange={onChangeMeat}
					/>

					<InputSelect
						label='Rozmiary *'
						placeholder='Wybierz rozmiary wariacie'
						options={
							isLoadingSizes || !sizes
								? []
								: sizes.map((size) => ({
										label: size.name,
										value: size.id,
									}))
						}
						value={size}
						isMultiple
						onChange={onChangeSize}
					/>
				</FieldsContainer>

				<Button mode='contained' onPress={submit}>
					Zapisz
				</Button>
			</FormContainer>
		</ScreenContainer>
	);
}
