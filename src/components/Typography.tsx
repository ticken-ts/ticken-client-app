import React from 'react';
import {Text, TextProps, View} from 'react-native';
import {squares} from '../styles/grid';

const Typography = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: 'main-light',
          fontSize: squares(1.7)
        },
        props.style,
      ]}>
    </Text>
  );
};

export default Typography;
