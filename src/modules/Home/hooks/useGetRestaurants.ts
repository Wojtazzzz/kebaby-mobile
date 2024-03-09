import { useQuery } from '@tanstack/react-query';
import { getRestaurantListQueryKey } from '../../../utils/queryKeys';
import * as Yup from 'yup';
import { api } from '../../../utils/api';

const schema = Yup.object({
	data: Yup.array(
		Yup.object({
			id: Yup.number().required(),
			name: Yup.string().required(),
			city: Yup.string().required(),
		})
			.required()
			.strict(true)
			.noUnknown(),
	)
		.required()
		.strict(true),
})
	.required()
	.strict(true)
	.noUnknown();

export type Restaurant = Yup.InferType<typeof schema>['data'][number];

export function useGetRestaurants() {
	const { isLoading, isError, isSuccess, data, error } = useQuery({
		queryFn: async () =>
			await api.get('/restaurants').json((response) => {
				schema.validate(response);
				if (!schema.isValidSync(response)) {
					throw new Error('Serwer zwrócił nieprawidłowe dane');
				}

				return response.data;
			}),
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
