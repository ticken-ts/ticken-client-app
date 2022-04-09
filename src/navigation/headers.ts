import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationOptions, NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {OpaqueColorValue, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../styles/colors';

export function getHiddenHeader(): NativeStackNavigationOptions {

   return ({
     headerShown: false,
   })

}

type HeaderOptions = {
  left?: () => React.ReactNode,
  mid?: () => React.ReactNode,
  right?: () => React.ReactNode,
  backgroundColor?: string
}

export function getCustomHeader(options: HeaderOptions): NativeStackNavigationOptions {

  return ({
    headerShown: true,
    headerLeft: options.left,
    headerTitle: options.mid ? options.mid : () => null,
    headerTitleAlign: 'center',
    headerRight: options.right,
    headerBackVisible: false,
    // headerTintColor: options.backgroundColor,
    headerStyle: {
      backgroundColor: options.backgroundColor
    }
  })
}

const styles = StyleSheet.create({
});
