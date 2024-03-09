import { useQuery } from '@tanstack/react-query';
import { getKebabOpinionsListQueryKey } from '../../utils/queryKeys';
import * as Yup from 'yup';
import { api } from '../../utils/api';

const schema = Yup.object({
	data: Yup.array(
		Yup.object({
			id: Yup.number().required(),
			user: Yup.string().required(),
			value: Yup.number().required(),
			content: Yup.string().required(),
			created_at: Yup.string().required(),
			sauce: Yup.object({
				id: Yup.number().required(),
				name: Yup.string().required(),
			})
				.required()
				.strict(true)
				.noUnknown(),
			size: Yup.object({
				id: Yup.number().required(),
				name: Yup.string().required(),
			})
				.required()
				.strict(true)
				.noUnknown(),
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

export function useGetKebabOpinions(restaurantId: number, kebabId: number) {
	const { isLoading, isError, isSuccess, data, error } = useQuery({
		queryFn: async () =>
			await api
				.get(`/restaurants/${restaurantId}/kebabs/${kebabId}/opinions`)
				.json((response) => {
					schema.validate(response);
					if (!schema.isValidSync(response)) {
						throw new Error('Serwer zwrócił nieprawidłowe dane');
					}

					return response.data;
				}),
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
