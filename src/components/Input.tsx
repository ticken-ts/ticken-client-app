import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {colors} from '../styles/colors';
import {squares} from '../styles/grid';
import {typographyStyles} from './Typography';

const Input = (props: TextInputProps) => {
  return (
      <TextInput
        {...props}
        style={[
          typographyStyles.mainText,
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
  }
});
