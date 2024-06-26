import { useAddKebabOpinionForm } from './hooks/useAddKebabOpinionForm';
import { useGetKebabSauces } from '../../hooks/useGetKebabSauces';
import { ScreenProps } from '../../utils/types';
import { useGetKebabSizes } from '../../hooks/useGetKebabSizes';
import { useAddKebabOpinion } from './hooks/useAddKebabOpinion';
import { Button } from 'react-native-paper';
import { TextInput } from '../../components/ui/Form/TextInput';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { FormContainer } from '../../components/ui/Form/FormContainer';
import { FieldsContainer } from '../../components/ui/Form/FieldsContainer';
import { InputSelect } from '../../components/ui/Form/InputSelect';
import { TextArea } from '../../components/ui/Form/TextArea';
import { useGetKebabMeat } from '../../hooks/useGetKebabMeat';

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
		meat,
		size,
		onChangeUser,
		onChangeValue,
		onChangeContent,
		onChangeSauce,
		onChangeMeat,
		onChangeSize,
	} = useAddKebabOpinionForm();

	const { data: sauces, isLoading: isLoadingSauces } = useGetKebabSauces(
		restaurant.id,
		kebab.id,
	);

	const { data: meatData, isLoading: isLoadingMeat } = useGetKebabMeat(
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
			sauce_id: sauce,
			meat_id: meat,
			size_id: size,
		});
	}

	return (
		<ScreenContainer>
			<FormContainer>
				<FieldsContainer>
					<TextInput
						value={user}
						label='Podpis *'
						onChange={onChangeUser}
					/>

					<InputSelect
						label='Ocena *'
						placeholder='Ocena'
						options={Array.from({ length: 10 }).map(
							(value, index) => ({
								label: `${10 - index} / 10`,
								value: 10 - index,
							}),
						)}
						value={value}
						onChange={onChangeValue}
					/>

					<InputSelect
						label='Sosiwo *'
						placeholder='Wybierz sosiwo wariacie'
						options={
							isLoadingSauces || !sauces
								? []
								: sauces.map((sauce) => ({
										label: sauce.name,
										value: sauce.id,
									}))
						}
						value={sauce}
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
						onChange={onChangeMeat}
					/>

					<InputSelect
						label='Rozmiar *'
						placeholder='Wybierz rozmiar wariacie'
						options={
							isLoadingSizes || !sizes
								? []
								: sizes.map((size) => ({
										label: size.name,
										value: size.id,
									}))
						}
						value={size}
						onChange={onChangeSize}
					/>

					<TextArea
						label='Treść'
						value={content}
						onChange={onChangeContent}
					/>
				</FieldsContainer>

				<Button mode='contained' onPress={submit}>
					Zapisz
				</Button>
			</FormContainer>
		</ScreenContainer>
	);
}
