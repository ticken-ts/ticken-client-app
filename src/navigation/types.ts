import {ScreenId} from './ScreenIDs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  [ScreenId.Login]: undefined;
  [ScreenId.Register]: undefined;
}

export type ScreenProps<T extends ScreenId> = NativeStackScreenProps<RootStackParamList, T>
