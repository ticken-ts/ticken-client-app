import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationOptions, NativeStackNavigationProp} from '@react-navigation/native-stack';
import {OpaqueColorValue, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../styles/colors';
import {RootStackParamList} from './ScreenIDs';

export function getHiddenHeader(): NativeStackNavigationOptions {

   return ({
     headerShown: false,
   })

}

type HeaderOptions = {
  left?: NativeStackNavigationOptions['headerLeft'],
  mid?: NativeStackNavigationOptions['headerTitle'],
  right?: NativeStackNavigationOptions['headerRight'],
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
