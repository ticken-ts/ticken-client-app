import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Logo from '@app/assets/logo.svg';
import {squares} from '@app/styles/grid';
import Typography, {H1} from '@app/components/Typography';
import Button from '@app/components/Button';
import {t} from '@app/locale/useLocalization';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {User} from '@app/model/User';
import Field from '@app/components/UserProfile/Field';

type PropsWithStyle = {
  style?: StyleProp<ViewStyle>;
  onLogout?: () => void;
  user: User;
}

const LoggedInProfile = ({style, onLogout, user}: PropsWithStyle) => {
  const insets = useSafeAreaInsets()

  return (
    <View style={style}>
      <FocusAwareStatusBar style={'dark'} />
      <View style={styles.main}>
        <View>

        </View>
        <Logo width={squares(25)} height={squares(25)} />
        <View style={styles.profile}>
          <Field.Field style={styles.profileField} content={user.email} label={t("profileEmail")} />
          <Field.Field style={styles.profileField} content={user.firstName} label={t("firstName")} />
          <Field.Field style={styles.profileField} content={user.lastName} label={t("lastName")} />
          <Field.HiddenField style={styles.profileField} content={user.walletAddress} label={t("walletAddress")} />
        </View>
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
  profile: {
    alignSelf: 'stretch',
    marginHorizontal: squares(3),
  },
  profileField: {
    marginBottom: squares(2),
  },
  signInButton: {
    margin: squares(2)
  },
  input: {
    alignSelf: 'stretch',
  }
});
