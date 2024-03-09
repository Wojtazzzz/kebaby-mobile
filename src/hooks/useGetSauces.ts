import { useQuery } from '@tanstack/react-query';
import { getKebabSaucesQueryKey, getSaucesQueryKey } from '../utils/queryKeys';
import * as Yup from 'yup';
import { api } from '../utils/api';

const schema = Yup.object({
	data: Yup.array(
		Yup.object({
			id: Yup.number().required(),
			name: Yup.string().required(),
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

export function useGetSauces() {
	const { isLoading, isError, isSuccess, data, error } = useQuery({
		queryFn: async () =>
			await api.get('/sauces').json((response) => {
				schema.validate(response);
				if (!schema.isValidSync(response)) {
					throw new Error('Serwer zwrócił nieprawidłowe dane');
				}

				return response.data;
			}),
		queryKey: getSaucesQueryKey(),
	});

	return {
		isLoading,
		isError,
		isSuccess,
		data,
		error,
	};
}
