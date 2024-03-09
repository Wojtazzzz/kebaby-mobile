import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '../../../hooks/useNavigation';
import { getRestaurantListQueryKey } from '../../../utils/queryKeys';
import { API_URL } from '../../../utils/env';
import { api } from '../../../utils/api';

type AddRestaurantPayload = {
	name: string;
	city: string;
};

export function useAddRestaurant() {
	const queryClient = useQueryClient();
	const { goToHomeScreen } = useNavigation();

	const { mutate } = useMutation({
		mutationFn: async (data: AddRestaurantPayload) =>
			api.post(data, '/restaurants'),
		onSuccess: async () => {
			await queryClient.refetchQueries({
				queryKey: getRestaurantListQueryKey(),
			});

			goToHomeScreen();
		},
	});

	function addRestaurant(newRestaurant: AddRestaurantPayload) {
		mutate(newRestaurant);
	}

	return {
		addRestaurant,
	};
}
