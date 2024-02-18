import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../utils/env';
import { getKebabOpinionsListQueryKey } from '../../utils/queryKeys';

async function fetchData(restaurantId: number, kebabId: number) {
	return await axios
		.get(
			`${API_URL}/restaurants/${restaurantId}/kebabs/${kebabId}/opinions`,
		)
		.then((response) => response!.data);
}

export function useGetKebabOpinions(restaurantId: number, kebabId: number) {
	const { isLoading, isError, isSuccess, data, error } = useQuery({
		queryFn: async () => await fetchData(restaurantId, kebabId),
		queryKey: getKebabOpinionsListQueryKey(restaurantId),
	});

	return {
		isLoading,
		isError,
		isSuccess,
		data,
		error,
	};
}
