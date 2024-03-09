import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '../../../hooks/useNavigation';
import {
	getKebabOpinionsListQueryKey,
	getRestaurantKebabsListQueryKey,
	getRestaurantListQueryKey,
} from '../../../utils/queryKeys';
import { API_URL } from '../../../utils/env';
import { api } from '../../../utils/api';
import { Restaurant } from '../../Home/hooks/useGetRestaurants';
import { Kebab } from '../../Restaurant/hooks/useGetRestaurantKebabs';

type AddKebabPayload = {
	name: string;
	sizes: {
		id: number;
	}[];
	sauces: {
		id: number;
	}[];
};

export function useAddKebab(restaurant: Restaurant) {
	const queryClient = useQueryClient();
	const { goToRestaurantScreen } = useNavigation();

	const { mutate } = useMutation({
		mutationFn: async (data: AddKebabPayload) =>
			api.post(data, `/restaurants/${restaurant.id}/kebabs`),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: getRestaurantKebabsListQueryKey(restaurant.id),
			});

			goToRestaurantScreen(restaurant);
		},
	});

	function addKebab(newKebab: AddKebabPayload) {
		mutate(newKebab);
	}

	return {
		addKebab,
	};
}
