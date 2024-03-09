import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '../../../hooks/useNavigation';
import {
	getKebabOpinionsListQueryKey,
	getRestaurantListQueryKey,
} from '../../../utils/queryKeys';
import { API_URL } from '../../../utils/env';
import { api } from '../../../utils/api';
import { Restaurant } from '../../Home/hooks/useGetRestaurants';
import { Kebab } from '../../Restaurant/hooks/useGetRestaurantKebabs';

type AddKebabOpinionPayload = {
	user: string;
	value: number;
	content: string;
	sauce_id: number;
	meat_id: number;
	size_id: number;
};

export function useAddKebabOpinion(restaurant: Restaurant, kebab: Kebab) {
	const queryClient = useQueryClient();
	const { goToKebabScreen } = useNavigation();

	const { mutate } = useMutation({
		mutationFn: async (data: AddKebabOpinionPayload) =>
			api.post(
				data,
				`/restaurants/${restaurant.id}/kebabs/${kebab.id}/opinions`,
			),
		onSuccess: async () => {
			goToKebabScreen(restaurant, kebab);

			await queryClient.invalidateQueries({
				queryKey: ['kebab', kebab.id, 'opinions'],
			});
		},
	});

	function addKebabOpinion(newKebabOpinion: AddKebabOpinionPayload) {
		mutate(newKebabOpinion, {
			onSuccess: async () => {},
		});
	}

	return {
		addKebabOpinion,
	};
}
