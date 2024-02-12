import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigation } from '../../../hooks/useNavigation';
import { getRestaurantListQueryKey } from '../../../utils/queryKeys';
import { API_URL } from '../../../utils/env';

async function mutationFn(data: AddRestaurantPayload) {
	return await axios.post(`${API_URL}/restaurants`, data).catch((error) => {
		console.log(error);
	});
}

type AddRestaurantPayload = {
	name: string;
	city: string;
};

export function useAddRestaurant() {
	const queryClient = useQueryClient();
	const { goToHomeScreen } = useNavigation();

	const { mutate } = useMutation({
		mutationFn: async (data: AddRestaurantPayload) =>
			await mutationFn(data),
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
