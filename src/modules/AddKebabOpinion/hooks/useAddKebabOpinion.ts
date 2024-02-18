import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigation } from '../../../hooks/useNavigation';
import {
	getKebabOpinionsListQueryKey,
	getRestaurantListQueryKey,
} from '../../../utils/queryKeys';
import { API_URL } from '../../../utils/env';

async function mutationFn(
	data: AddKebabOpinionPayload,
	restaurant_id: number,
	kebab_id: number,
) {
	return await axios
		.post(
			`${API_URL}/restaurants/${restaurant_id}/kebabs/${kebab_id}/opinions`,
			data,
		)
		.catch((error) => {
			console.log(error);
		});
}

type AddKebabOpinionPayload = {
	user: string;
	value: number;
	content: string;
	sauce_id: number;
	size_id: number;
};

export function useAddKebabOpinion(restaurant, kebab) {
	const queryClient = useQueryClient();
	const { goToKebabScreen } = useNavigation();

	const { mutate } = useMutation({
		mutationFn: async (data: AddKebabOpinionPayload) =>
			await mutationFn(data, restaurant.id, kebab.id),
		onSuccess: async () => {
			await queryClient.refetchQueries({
				queryKey: getKebabOpinionsListQueryKey(kebab.id),
			});

			goToKebabScreen(restaurant, kebab);
		},
	});

	function addKebabOpinion(newKebabOpinion: AddKebabOpinionPayload) {
		mutate(newKebabOpinion);
	}

	return {
		addKebabOpinion,
	};
}
