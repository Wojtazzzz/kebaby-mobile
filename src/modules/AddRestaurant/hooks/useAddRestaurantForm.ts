import { useState } from 'react';

export function useAddRestaurantForm() {
	const [name, setName] = useState('');
	const [city, setCity] = useState('');

	function onChangeName(value: string) {
		setName(value);
	}

	function onChangeCity(value: string) {
		setCity(value);
	}

	return {
		name,
		city,
		onChangeName,
		onChangeCity,
	};
}
