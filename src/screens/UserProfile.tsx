import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {getTranslucentHeader} from '@app/navigation/mainStack/headers';
import BackButton from '@app/components/BackButton';
import {colors} from '@app/styles/colors';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Button from '@app/components/Button';
import {t} from '@app/locale/useLocalization';
import Typography, {H1, H2} from '@app/components/Typography';
import {ScreenProps} from '@app/navigation/mainStack/types';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';
import {AuthContext} from '@app/context/AuthContext';
import {squares} from '@app/styles/grid';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Logo from '@app/assets/logo.svg';
import {useQuery} from 'react-query';
import {fetchMyUser} from '@app/api/api';
import {User} from '@app/model/User';
import Input from '@app/components/Input';
import {Formik} from 'formik';
import LoggedInProfile from '@app/components/UserProfile/LoggedIn';
import Register from '@app/components/UserProfile/Register';
import NotSigned from '@app/components/UserProfile/NotSigned';

const UserProfile = ({navigation}: ScreenProps<ScreenId.UserProfile>) => {


  const {logout, login, ready, token, isLoggedIn} = useContext(AuthContext);

  const {data, isLoading} = useQuery<User | undefined>(['user'],  token ? fetchMyUser(token) : () => undefined)

  const insets = useSafeAreaInsets()

  if (isLoggedIn) {
    if (data) {
      return (
        <LoggedInProfile style={styles.container} onLogout={logout} />
      )
    } else if (isLoading) {
      return (
        <View style={styles.container}>
          <FocusAwareStatusBar style={'dark'} />
          <View style={styles.main}>
            <Logo width={squares(25)} height={squares(25)} />
            <H1>Loading...</H1>
          </View>
          <View style={{height: insets.bottom || squares(2)}} />
        </View>
      )
    } else {
      return (
        <Register style={styles.container} onLogout={logout} />
      )
    }
  } else {
    return (
      <NotSigned style={styles.container} onPressLogin={login} />
    );
  }

};

export default {
  component: UserProfile,
  options: getTranslucentHeader({
    left: () => <BackButton />,
    mid: () => <H2 style={{color: colors.primary}}>User Profile</H2>,
    backgroundColor: colors.primary,
  })
};

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
