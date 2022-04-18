import React from 'react';
import {ButtonProps, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {colors} from '../styles/colors';
import { squares } from '../styles/grid';
import {H3} from './Typography';

interface Props extends ButtonProps {
  style: StyleProp<ViewStyle>,
  textStyle: StyleProp<TextStyle>
}

const Button = (props: Props) => {
  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      <H3 style={[styles.text, props.textStyle]}>{props.title}</H3>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: squares(2),
  },
  text: {
    color: colors.white,
    margin: squares(2)
  }
});
