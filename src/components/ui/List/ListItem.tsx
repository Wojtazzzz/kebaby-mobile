import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { ComponentProps } from 'react';

export function ListItem(props: ComponentProps<typeof List.Item>) {
	return <List.Item {...props} />;
}
