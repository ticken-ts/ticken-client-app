import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import QRCodeStyled from 'react-native-qrcode-styled';
import { squares } from '@app/styles/grid';

interface Props {
  code: string;
  style?: StyleProp<ViewStyle>;
}

export function QRCode({code, style}: Props) {
  return (
    <View style={[styles.qrCode, style]}>
      <QRCodeStyled
        pieceBorderRadius={squares(0.1)}
        data={code} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  qrCode: {
    alignItems: 'center',
    margin: squares(2),
  },
});
