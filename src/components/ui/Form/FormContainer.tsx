import { StyleSheet, View } from 'react-native';
import { type ReactNode } from 'react';

type FormContainerProps = {
	children: ReactNode;
};
export function FormContainer({ children }: FormContainerProps) {
	return <View style={styles.formContainer}>{children}</View>;
}

const styles = StyleSheet.create({
	formContainer: {
		gap: 26,
	},
});
