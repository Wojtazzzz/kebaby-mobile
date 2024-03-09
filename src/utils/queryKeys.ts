export function getRestaurantListQueryKey() {
	return ['restaurants'];
}

export function getRestaurantKebabsListQueryKey(restaurantId: number) {
	return ['restaurants', restaurantId, 'kebabs'];
}

export function getKebabOpinionsListQueryKey(kebabId: number) {
	return ['kebab', Number(kebabId), 'opinions'];
}

export function getKebabSaucesQueryKey(kebabId: number) {
	return ['kebab', kebabId, 'sauces'];
}

export function getKebabMeatQueryKey(kebabId: number) {
	return ['kebab', kebabId, 'meat'];
}

export function getKebabSizesQueryKey(kebabId: number) {
	return ['kebab', kebabId, 'sizes'];
}

export function getSaucesQueryKey() {
	return ['sauces'];
}

export function getMeatQueryKey() {
	return ['meat'];
}

export function getSizesQueryKey() {
	return ['sizes'];
}
