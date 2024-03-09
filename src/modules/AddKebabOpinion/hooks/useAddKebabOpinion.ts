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
			await queryClient.invalidateQueries({
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
