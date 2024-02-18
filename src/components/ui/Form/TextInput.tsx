import { TextInput } from 'react-native-paper';

type TextInputProps = {
	label: string;
	value: string | number;
	onChange: (newValue: string) => void;
};

function CustomTextInput({ label, value, onChange }: TextInputProps) {
	return (
		<TextInput
			label={label}
			value={String(value)}
			onChangeText={onChange}
			mode='outlined'
		/>
	);
}

export { CustomTextInput as TextInput };
