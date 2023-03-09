import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Logo from '@app/assets/logo.svg';
import {squares} from '@app/styles/grid';
import {H1} from '@app/components/Typography';
import Button from '@app/components/Button';
import {t} from '@app/locale/useLocalization';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type PropsWithStyle = {
  style?: StyleProp<ViewStyle>;
  onLogout?: () => void;
}

const LoggedInProfile = ({style, onLogout}: PropsWithStyle) => {
  const insets = useSafeAreaInsets()
  return (
    <View style={style}>
      <FocusAwareStatusBar style={'dark'} />
      <View style={styles.main}>
        <Logo width={squares(25)} height={squares(25)} />
        <H1>Coming soon</H1>
      </View>
      <Button
        onPress={onLogout}
        title={t('logOut')}
        style={styles.signInButton}
      />
      <View style={{height: insets.bottom || squares(2)}} />
    </View>

  );
};

export default LoggedInProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInButton: {
    margin: squares(2)
  },
  input: {
    alignSelf: 'stretch',
  }
});
