import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import {colors} from '@app/styles/colors';
import {shadowStyles} from '@app/styles/shadow';
import {squares} from '@app/styles/grid';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {

  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack()
  };

  return (
    <TouchableOpacity onPress={goBack} style={styles.button}>
      <Ionicons name={'chevron-back'} color={colors.white} size={squares(4)} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    ...shadowStyles.normal,
    borderRadius: 100,
    aspectRatio: 1,
    marginLeft: squares(2)
  }
});
