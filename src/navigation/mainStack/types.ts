import {RootStackParamList, ScreenId} from '@app/navigation/mainStack/ScreenIDs';
import {StackNavigationOptions, StackScreenProps as ScrnProps} from '@react-navigation/stack';
import React from 'react';

export type ScreenComponent = {
  component: React.ComponentType<any>,
  options:StackNavigationOptions,
}

export type StackScreenProps = {
  name: ScreenId,
  component: ScreenComponent,
}

export type ScreenProps<T extends ScreenId> = ScrnProps<RootStackParamList, T>
