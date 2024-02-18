import { useQuery } from '@tanstack/react-query';
import { getKebabSaucesQueryKey } from '../utils/queryKeys';
import axios from 'axios/index';
import { API_URL } from '../utils/env';

async function fetchData(restaurantId: number, kebabId: number) {
	return await axios
		.get(`${API_URL}/restaurants/${restaurantId}/kebabs/${kebabId}/sauces`)
		.then((response) => response!.data);
}

export function useGetKebabSauces(restaurantId: number, kebabId: number) {
	const { isLoading, isError, isSuccess, data, error } = useQuery({
		queryFn: async () => await fetchData(restaurantId, kebabId),
		queryKey: getKebabSaucesQueryKey(kebabId),
	});

	return {
		isLoading,
		isError,
		isSuccess,
		data,
		error,
	};
}
