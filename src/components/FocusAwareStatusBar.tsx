import React from 'react';
import {Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {StatusBar, StatusBarProps} from 'expo-status-bar';

const FocusAwareStatusBar = (props: StatusBarProps) => {

  const focused = useIsFocused()

  if (!focused) return null;

  return (
    <StatusBar translucent backgroundColor={'transparent'} {...props} />
  );
};

export default FocusAwareStatusBar;
