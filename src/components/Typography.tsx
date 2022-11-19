import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';
import {squares} from '@app/styles/grid';
import {colors} from '@app/styles/colors';

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

export const Title = (props: TextProps) => {
  return (
    <Typography
      {...props}
      style={[
        {fontSize: squares(4), fontFamily: 'main-semibold'},
        props.style,
      ]}
    />
  );
}

export const H1 = (props: TextProps) =>
  <Typography
    {...props}
    style={[
      {fontSize: squares(2), fontFamily: 'main-semibold'},
      props.style,
    ]}
  />

export const H2 = (props: TextProps) =>
  <Typography
    {...props}
    style={[
      {fontSize: squares(1.85), fontFamily: 'main-semibold'},
      props.style,
    ]}
  />

export const H3 = (props: TextProps) =>
  <Typography
    {...props}
    style={[
      {fontSize: squares(1.7), fontFamily: 'main-semibold'},
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
