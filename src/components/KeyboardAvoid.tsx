import React from 'react';
import {KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform, Text, View} from 'react-native';

const KeyboardAvoid = (props: KeyboardAvoidingViewProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding', default: 'height'})}
      {...props}>
      {props.children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoid;
