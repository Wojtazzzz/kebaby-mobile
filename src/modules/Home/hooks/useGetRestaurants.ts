import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../../utils/env';
import { getRestaurantListQueryKey } from '../../../utils/queryKeys';

async function fetchData() {
	return await axios
		.get(`${API_URL}/restaurants`)
		.then((response) => response!.data);
}

export function useGetRestaurants() {
	const { isLoading, isError, isSuccess, data, error } = useQuery({
		queryFn: async () => await fetchData(),
		queryKey: getRestaurantListQueryKey(),
	});

	return {
		isLoading,
		isError,
		isSuccess,
		data,
		error,
	};
}
