import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Logo from '@app/assets/logo.svg';
import {squares} from '@app/styles/grid';
import Typography, {H1, H2} from '@app/components/Typography';
import {Formik} from 'formik';
import Input from '@app/components/Input';
import Button from '@app/components/Button';
import {t} from '@app/locale/useLocalization';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type PropsWithStyle = {
  style?: StyleProp<ViewStyle>;
  onPressLogin?: () => void;
}

const NotSigned = ({onPressLogin, style}: PropsWithStyle) => {

  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar style={'dark'} />
      <View style={styles.main}>
        <Logo width={squares(25)} height={squares(25)} />
        <H1>You are not logged in</H1>
        <Typography style={styles.subtitle}>Sign In or create an account and start buying tickets!</Typography>
      </View>
      <Button
        onPress={onPressLogin}
        title={t('login')}
        style={styles.signInButton}
      />
      <View style={{height: insets.bottom || squares(2)}} />
    </View>
  );
};

export default NotSigned;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: squares(2)
  },
  subtitle: {
    textAlign: 'center'
  },
  signInButton: {
    margin: squares(2)
  },
  input: {
    alignSelf: 'stretch',
  }
});
