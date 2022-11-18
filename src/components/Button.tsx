import React from 'react';
import {ButtonProps, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle, TextProps} from 'react-native';
import {colors} from '@app/styles/colors';
import { squares } from '@app/styles/grid';
import {H3} from '@app/components/Typography';

interface Props extends ButtonProps {
  style?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
  TextComponent?: React.FC<TextProps>
}

const Button = (props: Props) => {

  const TextComponent = props.TextComponent || H3

  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      <TextComponent style={[styles.text, props.textStyle]}>{props.title}</TextComponent>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: squares(1),
  },
  text: {
    color: colors.white,
    margin: squares(2),
    textAlign: "center",
  }
});
