import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

export type ScreenProps<screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, screen>;


type Restaurant: {

}