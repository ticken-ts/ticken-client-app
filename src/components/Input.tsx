import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {colors} from '@app/styles/colors';
import {squares} from '@app/styles/grid';
import Typography, {typographyStyles} from '@app/components/Typography';

interface Props extends TextInputProps {
  error?: string,
}

const Input = (props: Props) => {
  return (
    <>
      <TextInput
        placeholderTextColor={colors.text}
        {...props}
        style={[
          typographyStyles.mainText,
          styles.input,
          props.style
        ]}
      />
      {!!props.error && <Typography style={styles.error}>{props.error}</Typography>}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 100,
    paddingVertical: squares(1),
    paddingHorizontal: squares(2),
    backgroundColor: colors.white,
  },
  error: {
    color: colors.red
  }
});
