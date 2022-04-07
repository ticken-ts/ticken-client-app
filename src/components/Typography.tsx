import React from 'react';
import {Text, TextProps, View} from 'react-native';

const Typography = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        {fontFamily: 'main-light'},
        props.style,
      ]}>
    </Text>
  );
};

export default Typography;
