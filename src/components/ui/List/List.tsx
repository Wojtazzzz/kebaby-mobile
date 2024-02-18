import { ScrollView, Text } from 'react-native';
import { List, TouchableRipple, Button } from 'react-native-paper';
import { type ReactNode } from 'react';

type CustomListProps = {
	title?: string;
	children: ReactNode;
};
function CustomList({ title, children }: CustomListProps) {
	return (
		<ScrollView>
			<List.Section title={title}>{children}</List.Section>
		</ScrollView>
	);
}

export { CustomList as List };
