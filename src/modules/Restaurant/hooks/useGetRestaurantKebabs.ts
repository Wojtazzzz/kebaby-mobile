import { useQuery } from '@tanstack/react-query';
import { getRestaurantKebabsListQueryKey } from '../../../utils/queryKeys';
import * as Yup from 'yup';
import { api } from '../../../utils/api';

const schema = Yup.object({
	data: Yup.array(
		Yup.object({
			id: Yup.number().required(),
			name: Yup.string().required(),
			opinions_avg_value: Yup.string()
				.nullable()
				.transform((value) => (value ? value : null)),
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

export type Kebab = Yup.InferType<typeof schema>['data'][0];

export function useGetRestaurantKebabs(restaurantId: number) {
	const { isLoading, isError, isSuccess, data, error } = useQuery({
		queryFn: async () =>
			await api
				.get(`/restaurants/${restaurantId}/kebabs`)
				.json((response) => {
					schema.validate(response);
					if (!schema.isValidSync(response)) {
						throw new Error('Serwer zwrócił nieprawidłowe dane');
					}

					return response.data;
				}),
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
