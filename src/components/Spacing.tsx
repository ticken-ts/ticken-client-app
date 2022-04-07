import React from 'react';
import {Text, View} from 'react-native';

type Props = {
  h?: number,
  v?: number,
}

const Spacing = ({h, v}: Props) => {
  return (
    <View style={{
      marginTop: v,
      marginLeft: h
    }}/>
  );
};

export default Spacing;
