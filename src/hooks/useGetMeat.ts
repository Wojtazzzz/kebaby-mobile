import { useQuery } from '@tanstack/react-query';
import {
	getKebabSaucesQueryKey,
	getMeatQueryKey,
	getSaucesQueryKey,
} from '../utils/queryKeys';
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

export function useGetMeat() {
	const { isLoading, isError, isSuccess, data, error } = useQuery({
		queryFn: async () =>
			await api.get('/meat').json((response) => {
				schema.validate(response);
				if (!schema.isValidSync(response)) {
					throw new Error('Serwer zwrócił nieprawidłowe dane');
				}

				return response.data;
			}),
		queryKey: getMeatQueryKey(),
	});

	return {
		isLoading,
		isError,
		isSuccess,
		data,
		error,
	};
}
