import { TextInput } from 'react-native-paper';

type TextAreaProps = {
	label: string;
	value: string | number;
	onChange: (newValue: string) => void;
};

export function TextArea({ label, value, onChange }: TextAreaProps) {
	return (
		<TextInput
			label={label}
			value={String(value)}
			onChangeText={onChange}
			multiline={true}
			numberOfLines={5}
			mode='outlined'
		/>
	);
}
