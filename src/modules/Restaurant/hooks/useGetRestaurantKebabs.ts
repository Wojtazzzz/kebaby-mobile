import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../../utils/env';
import {
	getRestaurantKebabsListQueryKey,
	getRestaurantListQueryKey,
} from '../../../utils/queryKeys';

async function fetchData(restaurantId: number) {
	return await axios
		.get(`${API_URL}/restaurants/${restaurantId}/kebabs`)
		.then((response) => response!.data);
}

export function useGetRestaurantKebabs(restaurantId: number) {
	const { isLoading, isError, isSuccess, data, error } = useQuery({
		queryFn: async () => await fetchData(restaurantId),
		queryKey: getRestaurantKebabsListQueryKey(restaurantId),
	});

	return {
		isLoading,
		isError,
		isSuccess,
		data,
		error,
	};
}
