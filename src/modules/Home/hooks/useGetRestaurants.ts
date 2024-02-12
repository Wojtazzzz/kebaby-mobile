import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function fetchData() {
	return await axios
		.get('http://192.168.1.45/api/restaurants')
		.then((response) => response!.data);
}

export function useGetRestaurants() {
	const { isLoading, isError, isSuccess, data, error } = useQuery({
		queryFn: async () => await fetchData(),
		queryKey: ['restaurants'],
	});

	return {
		isLoading,
		isError,
		isSuccess,
		data,
		error,
	};
}
