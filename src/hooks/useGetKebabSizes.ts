import { useQuery } from '@tanstack/react-query';
import { getKebabSizesQueryKey } from '../utils/queryKeys';
import axios from 'axios/index';
import { API_URL } from '../utils/env';

async function fetchData(restaurantId: number, kebabId: number) {
	return await axios
		.get(`${API_URL}/restaurants/${restaurantId}/kebabs/${kebabId}/sizes`)
		.then((response) => response!.data);
}

export function useGetKebabSizes(restaurantId: number, kebabId: number) {
	const { isLoading, isError, isSuccess, data, error } = useQuery({
		queryFn: async () => await fetchData(restaurantId, kebabId),
		queryKey: getKebabSizesQueryKey(kebabId),
	});

	return {
		isLoading,
		isError,
		isSuccess,
		data,
		error,
	};
}
