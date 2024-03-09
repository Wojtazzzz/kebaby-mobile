import { useState } from 'react';

export function useAddKebabForm() {
	const [name, setName] = useState('');
	const [sauce, setSauce] = useState<number[]>([]);
	const [meat, setMeat] = useState<number[]>([]);
	const [size, setSize] = useState<number[]>([]);

	function onChangeName(value: string) {
		setName(value);
	}

	function onChangeSauce(value: string[] | number[]) {
		setSauce(value.map((sauceId) => Number(sauceId)));
	}

	function onChangeMeat(value: string[] | number[]) {
		setMeat(value.map((meatId) => Number(meatId)));
	}

	function onChangeSize(value: string[] | number[]) {
		setSize(value.map((sizeId) => Number(sizeId)));
	}

	return {
		name,
		sauce,
		meat,
		size,
		onChangeName,
		onChangeSauce,
		onChangeMeat,
		onChangeSize,
	};
}
