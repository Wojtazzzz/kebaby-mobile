import Dropdown from 'react-native-input-select';
import { StyleSheet } from 'react-native';

type InputSelectOption = {
	label: string;
	value: string | number;
};

type InputSelectProps =
	| {
			label: string;
			placeholder: string;
			options: InputSelectOption[];
			value: string[] | number[];
			isMultiple: true;
			onChange: (newValue: string[] | number[]) => void;
	  }
	| {
			label: string;
			placeholder: string;
			options: InputSelectOption[];
			value: string | number;
			isMultiple?: false;
			onChange: (newValue: string | number) => void;
	  };

export function InputSelect({
	label,
	placeholder,
	options,
	value,
	isMultiple = false,
	onChange,
}: InputSelectProps) {
	return (
		<Dropdown
			dropdownStyle={styles.dropdownStyle}
			labelStyle={styles.labelStyle}
			dropdownContainerStyle={styles.dropdownContainerStyle}
			label={label}
			placeholder={placeholder}
			options={options}
			selectedValue={value}
			onValueChange={onChange}
			primaryColor='green'
			isMultiple={isMultiple}
		/>
	);
}

const styles = StyleSheet.create({
	dropdownStyle: {
		paddingHorizontal: 16,
		backgroundColor: '#FFFBFE',
	},
	dropdownContainerStyle: {
		marginBottom: 0,
	},
	labelStyle: {
		marginBottom: 6,
	},
});
