export function getRestaurantListQueryKey() {
	return ['restaurants'];
}

export function getRestaurantKebabsListQueryKey(restaurantId: number) {
	return ['restaurants', restaurantId, 'kebabs'];
}

export function getKebabOpinionsListQueryKey(kebabId: number) {
	return ['kebab', kebabId, 'opinions'];
}

export function getKebabSaucesQueryKey(kebabId: number) {
	return ['kebab', kebabId, 'sauces'];
}

export function getKebabSizesQueryKey(kebabId: number) {
	return ['kebab', kebabId, 'sizes'];
}
