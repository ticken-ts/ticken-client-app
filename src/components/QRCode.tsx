import { View, StyleSheet, StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
import React from 'react';
import QRCodeStyled from 'react-native-qrcode-styled';
import { squares } from '@app/styles/grid';
import { Svg } from 'react-native-svg';
import QRSample from '@app/assets/qr-sample.svg';
import { colors } from '@app/styles/colors';

interface Props {
  code: string;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
}

export function QRCode({code, style, loading}: Props) {
  return (
    <View style={[styles.qrCode, style]}>
      {code ? (
        <QRCodeStyled
          pieceBorderRadius={squares(0)}
          data={code}
        />
      ) : (
        <QRSample width={'100%'} height='100%' />
      )}
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  qrCode: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: squares(2),
    width: squares(30),
    height: squares(30),
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.text,
    opacity: 0.5,
    borderRadius: squares(1),
  },
});
