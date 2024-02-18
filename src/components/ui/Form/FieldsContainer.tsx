import { StyleSheet, View } from 'react-native';
import { type ReactNode } from 'react';

type FieldsContainerProps = {
	children: ReactNode;
};
export function FieldsContainer({ children }: FieldsContainerProps) {
	return <View style={styles.fieldsContainer}>{children}</View>;
}

const styles = StyleSheet.create({
	fieldsContainer: {
		gap: 12,
	},
});
