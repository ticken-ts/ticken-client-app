import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {colors} from '../styles/colors';

const Input = (props: TextInputProps) => {
  return (
      <TextInput
        {...props}
        style={[
          styles.input,
          props.style
        ]}
      />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 100,
    fontFamily: 'main-light'
  }
});
