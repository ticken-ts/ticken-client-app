import {ScreenId} from './ScreenIDs';
import {NativeStackNavigationOptions, NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

export type ScreenComponent = {
  component: React.ComponentType<any>,
  options: NativeStackNavigationOptions,
}

export type StackScreenProps = {
  name: ScreenId,
  component: ScreenComponent,
}

export type RootStackParamList = {
  [ScreenId.Login]: undefined;
  [ScreenId.Register]: undefined;
  [ScreenId.Home]: undefined;
}

export type ScreenProps<T extends ScreenId> = NativeStackScreenProps<RootStackParamList, T>
