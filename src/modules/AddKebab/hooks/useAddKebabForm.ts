import { useState } from 'react';

export function useAddKebabForm() {
	const [name, setName] = useState('');
	const [sauce, setSauce] = useState<number[]>([]);
	const [size, setSize] = useState<number[]>([]);

	function onChangeName(value: string) {
		setName(value);
	}

	function onChangeSauce(value: string[] | number[]) {
		setSauce(value.map((sauceId) => Number(sauceId)));
	}

	function onChangeSize(value: string[] | number[]) {
		setSize(value.map((sizeId) => Number(sizeId)));
	}

	return {
		name,
		sauce,
		size,
		onChangeName,
		onChangeSauce,
		onChangeSize,
	};
}
