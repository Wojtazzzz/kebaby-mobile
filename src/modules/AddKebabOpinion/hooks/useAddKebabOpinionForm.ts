import { useState } from 'react';

export function useAddKebabOpinionForm() {
	const [user, setUser] = useState('');
	const [value, setValue] = useState(10);
	const [content, setContent] = useState('');
	const [sauce, setSauce] = useState(0);
	const [meat, setMeat] = useState(0);
	const [size, setSize] = useState(0);

	function onChangeUser(value: string) {
		setUser(value);
	}

	function onChangeValue(value: string | number) {
		setValue(Number(value));
	}

	function onChangeContent(value: string) {
		setContent(value);
	}

	function onChangeSauce(value: string | number) {
		setSauce(Number(value));
	}

	function onChangeMeat(value: string | number) {
		setMeat(Number(value));
	}

	function onChangeSize(value: string | number) {
		setSize(Number(value));
	}

	return {
		user,
		value,
		content,
		sauce,
		meat,
		size,
		onChangeUser,
		onChangeValue,
		onChangeContent,
		onChangeSauce,
		onChangeMeat,
		onChangeSize,
	};
}
