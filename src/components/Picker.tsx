import React from 'react';
import { Picker as DefaultPicker, PickerProps } from '@react-native-picker/picker';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors } from '@app/styles/colors';
import { squares } from '@app/styles/grid';

type Props = PickerProps & {
  pickerStyle?: StyleProp<ViewStyle>;
}

export default function Picker(props: Props) {
  return (
    <View style={[styles.input, props.style]}>
      <DefaultPicker
        {...props}
        mode='dropdown'
        style={[props.pickerStyle]}
      />
    </View>
  );
}

export const PickerItem = DefaultPicker.Item;

const styles = StyleSheet.create({
    input: {
      borderColor: colors.primary,
      borderWidth: 1,
      borderRadius: 100,
      paddingLeft: squares(2),
      backgroundColor: colors.white,
    },
    error: {
      color: colors.red
    }
  });
  