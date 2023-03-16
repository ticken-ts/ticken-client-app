import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getTranslucentHeader} from '@app/navigation/mainStack/headers';
import BackButton from '@app/components/BackButton';
import {colors} from '@app/styles/colors';
import {ScreenProps} from '@app/navigation/mainStack/types';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';
import {squares} from '@app/styles/grid';
import LoggedInProfile from '@app/components/UserProfile/LoggedIn';
import LoginWall from '@app/components/LoginWall';
import {useAuth} from '@app/hooks/useAuth';

const UserProfile = ({navigation}: ScreenProps<ScreenId.UserProfile>) => {

  const {logout} = useAuth();

  return (
    <LoginWall style={styles.container}>
      {(user) => (
        <LoggedInProfile style={styles.container} onLogout={logout} user={user} />
      )}
    </LoginWall>
  )

};

export default {
  component: UserProfile,
  options: getTranslucentHeader({
    left: () => <BackButton />,
    backgroundColor: colors.transparent,
  })
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',

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
