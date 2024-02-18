import { StyleSheet, View } from 'react-native';
import { type ReactNode } from 'react';

type ScreenContainerProps = {
	children: ReactNode;
};
export function ScreenContainer({ children }: ScreenContainerProps) {
	return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		paddingHorizontal: 8,
		gap: 8,
		marginTop: 12,
	},
});
