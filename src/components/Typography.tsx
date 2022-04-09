import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';
import {squares} from '../styles/grid';
import {colors} from '../styles/colors';

const Typography = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        typographyStyles.mainText,
        props.style,
      ]}>
    </Text>
  );
};

export const H1 = (props: TextProps) =>
  <Typography
    {...props}
    style={[
      {fontSize: squares(2.5), fontFamily: 'main-semibold'},
      props.style,
    ]}
  />

export default Typography;

export const typographyStyles = StyleSheet.create({
  mainText: {
    fontFamily: 'main-light',
    fontSize: squares(1.7),
    color: colors.text,
  }
});
